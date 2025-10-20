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
