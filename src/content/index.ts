import type { Application, Settings } from "../types.ts";
import {
  type ApplicationScrappedMessage,
  type FailMessage,
  type GetSettingsMessage,
  MessageTypes,
  type PageScrappedMessage
} from "../messages.ts";
import sleep from "../utils/sleep.ts";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

const tag = "scrapped";

window.onload = async () => {
  chrome.runtime.sendMessage<GetSettingsMessage>({ type: MessageTypes.GetSettings }, async (response) => {
    await init(response.settings)
  });
}

async function init(settings: Settings) {
  try {
    const applicationNodes = document.querySelectorAll('[data-candidate]')

    for (const element of applicationNodes) {
      const application = parseApplicationObjectFromElement(element as HTMLElement);
      const isSkipBeforeOptionsNotExist = !settings.skipBefore;
      const laterThanSkipBeforeOptionValue = dayjs(application.created).isAfter(dayjs(settings.skipBefore));

      const isApplicationShouldBeProcessed = !application.scrapped && (isSkipBeforeOptionsNotExist || laterThanSkipBeforeOptionValue);

      if (isApplicationShouldBeProcessed) {
        await handleApplication(application);
        await markAsScrapped(element as HTMLElement);
      } else {
        await finish();
      }
    }

    const nextPageURL = getNextPageURL();

    await finish(nextPageURL);
  } catch (error) {
    console.error(error);

    await chrome.runtime.sendMessage<FailMessage>({
      type: MessageTypes.Fail,
      error: error?.toString(),
    })
  }
}

function parseApplicationObjectFromElement(element: HTMLElement): Application {
  const fullName = element.querySelector('.form-name')!.textContent.trim();
  const fullNameSplit = fullName.split(' ');
  const firstName = fullNameSplit[0].trim();
  const middleName = fullNameSplit.length >= 3 ? fullNameSplit[1].trim() : null;
  const lastName = fullNameSplit[fullNameSplit.length - 1].trim();
  const created = element.querySelector('.divTableCellTime')?.textContent?.trim();
  const isScrapped = element.querySelectorAll('.divTableCellTags')?.[0]?.textContent?.trim().includes(tag) || false;

  const fields = {
    id: element.dataset.candidate,
    created: dayjs(created, "DD.MM.YYYY HH:mm").toString(),
    scrapped: isScrapped,
    status: element.querySelector('.divTableCellStatus [data-controller="candidates-index"]')?.textContent?.trim(),
    candidate: {
      fullName,
      firstName,
      middleName,
      lastName,
      email: element.querySelector('.form-info a')?.textContent,
      phoneNumber: element.querySelector('.form-info div:last-child')?.textContent,
      age: Number(element.querySelector('.divTableCellAge')?.textContent?.trim()!),
      serviceman: element.querySelectorAll('.divTableCellStatus')?.[1]?.textContent?.trim() === 'Так',
      rank: element.querySelector('.divTableCellRank')?.textContent?.trim(),
      source: element.querySelector('.divTableCellSourse')?.textContent?.trim(),
    },
    vacancy: {
      title: document.querySelector('h1')?.textContent.split(' - ')[0].trim(),
      url: window.location.href,
    },
  } as Application

  const files = element.querySelector('.display-files')?.children;

  let addendumFilesCounter = 1;

  files && Array.from(files).forEach((file) => {
    if (file.textContent.includes('CV')) {
      fields.candidate.cvLink = window.location.origin + file.getAttribute('href');
    }

    if (file.textContent.includes('Cover Letter')) {
      fields.candidate.coverLetterLink = window.location.origin + file.getAttribute('href');
    }

    if (file.textContent.includes('Addendum')) {
      // @ts-ignore
      fields.candidate[`addendumLink${addendumFilesCounter}`] = window.location.origin + file.getAttribute('href');

      addendumFilesCounter++
    }
  })

  return fields;
}

async function handleApplication(application: Application) {
  await chrome.runtime.sendMessage<ApplicationScrappedMessage>({ type: MessageTypes.ApplicationScrapped, application });
}

async function markAsScrapped(element: HTMLElement) {
  function enableEditMode() {
    const editButton = element.querySelector('[data-action="vacancies-show#showForm"]') as HTMLElement;
    editButton.click()
  }

  async function addTag() {
    const input = element.querySelector('[data-target="candidate-line.tags"]') as HTMLInputElement
    const currentInputValue = input.value ? JSON.parse(input.value) : [];
    const newInputValue = [...currentInputValue, { value: tag }];
    input.value = JSON.stringify(newInputValue)

    const tagHTML = `
      <tag title="${tag}" contenteditable="false" spellcheck="false" value="${tag}">
        <x title=""></x>
        <div>
          <span class="tagify__tag-text">scrapped</span>
        </div>
      </tag>
    `

    const tagsContainer = element.querySelector('.tagify') as HTMLElement;
    tagsContainer.insertAdjacentHTML('beforeend', tagHTML);
  }

  function saveChanges() {
    const saveButton = element.querySelector('[type="submit"]') as HTMLElement;
    saveButton.click()
  }

  enableEditMode();
  // I know it's not the best way to do it, but it works and
  // I don't have time to make it better.
  await sleep(300);
  await addTag();
  saveChanges();
  await sleep(100);
}

function getNextPageURL() {
  const pagination = document.querySelector('.pagination')
  const currentPage = pagination?.querySelector('.page.current')
  const nextPage = currentPage?.nextElementSibling;
  const nextPageLink = nextPage?.querySelector('a');

  return nextPageLink?.href;
}

async function finish(nextPageURL?: string) {
  await chrome.runtime.sendMessage<PageScrappedMessage>({
    type: MessageTypes.PageScrapped,
    nextPageURL,
  });

  window.close();
}
