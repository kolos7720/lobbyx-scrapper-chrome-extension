// service-worker.js
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.commands.onCommand.addListener((command) => {
  if (command === "open_side_panel") {
    chrome.windows.getCurrent((w) => {
      chrome.sidePanel.open({ windowId: w.id! });
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "add-vacancy-to-list",
    title: "Add vacancy to the list",
    contexts: ["page"],
    documentUrlPatterns: [
      "https://hirefire.thelobbyx.com/vacancies/*"
    ]
  });

  const handleOnPageClick = (info: any, tab: any) => {
    console.log("Context Info: ", info);
    console.log("Context Tab: ", tab);
  };

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    const { menuItemId } = info;

    if (menuItemId === "some-id-page") handleOnPageClick(info, tab);
  });
});
