import type { Application } from "../types.ts";

window.onload = async () => {
  const applicationNodes = document.querySelectorAll('[data-candidate]')

  applicationNodes.forEach(element => {
    const application = parseApplicationObjectFromElement(element);

    console.log('application', application);
  })
}

function parseApplicationObjectFromElement(element: Element): Application {
  const fields = {
    // @ts-ignore
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
