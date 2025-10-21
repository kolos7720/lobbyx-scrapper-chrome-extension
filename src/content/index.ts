import type { Application } from "../types.ts";

window.onload = async () => {
  const applicationNodes = document.querySelectorAll('[data-candidate]')

  applicationNodes.forEach((element, index) => {
    if (index > 0) return;

    const application = parseApplicationObjectFromElement(element as HTMLElement);

    if (!application.scrapped) {
      // send to backend
      markAsScrapped(element as HTMLElement);
    } else {
      finish();
    }
  })
}

function parseApplicationObjectFromElement(element: HTMLElement): Application {
  const fields = {
    id: element.dataset.candidate,
    created: element.querySelector('.divTableCellTime')?.textContent.trim(),
    scrapped: false,
    candidate: {
      fullName: element.querySelector('.form-name')?.textContent,
      email: element.querySelector('.form-info a')?.textContent,
      phoneNumber: element.querySelector('.form-info div:last-child')?.textContent,
    },
    vacancy: {
      title: document.querySelector('h1')?.textContent.split(' - ')[0].trim(),
      url: window.location.href,
    },
  } as Application

  const files = element.querySelector('.display-files')?.children;

  files && Array.from(files).forEach((file) => {
    if (file.textContent.includes('CV')) {
      fields.candidate.cvLink = file.getAttribute('href') || undefined;
    }
  })

  return fields;
}

function markAsScrapped(element: HTMLElement) {
  function enableEditMode() {
    const editButton = element.querySelector('[data-action="vacancies-show#showForm"]') as HTMLElement;
    editButton?.click()
  }

  function addTag() {
    const tag = "scrapped";

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
    saveButton?.click()
  }

  enableEditMode();
  addTag();
  saveChanges();
}

function finish() {

}
