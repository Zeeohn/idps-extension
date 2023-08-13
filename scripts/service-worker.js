chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId === 0) {
    // The "frameId === 0" condition ensures that the event is triggered only for the main frame
    chrome.tabs.sendMessage(details.tabId, { action: "scanImages" });
  }
});

// Add an event listener to handle clicks on the notification
chrome.notifications.onClicked.addListener((clickedId) => {
  if (clickedId === "unilorin-warning-notification") {
    // Open the original web page when notification is clicked
    chrome.tabs.create({
      url: "https://uilugportal.unilorin.edu.ng/login.php",
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showWarning") {
    const detectedUrls = message.urls.join("<br>");
    const currentPage = message.current;

    const unilorin = "https://uilugportal.unilorin.edu.ng/login.php";

    if (
      currentPage !== "https://uilugportal.unilorin.edu.ng/login.php" &&
      !["https://uilugportal.unilorin.edu.ng/", "https://unilorin.edu.ng"].some(
        (url) => currentPage.startsWith(url)
      )
    ) {
      const notificationOptions = {
        type: "basic",
        iconUrl: "/images/icon-48.png",
        title: "Unilorin Phishing Site Detected",
        message: `WARNING!!! This is a phishing site, do not enter your matriculation number and password if requested on this site! Do so at your own risk! Click here to go to the original web page ${unilorin}`,
        contextMessage: "University of Ilorin fake site detected!",
        priority: 2, // Increase priority for a more noticeable notification
        isClickable: true,
      };
      chrome.notifications.create(
        "unilorin-warning-notification",
        notificationOptions
      );
    }
  }
});
