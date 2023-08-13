// contentScript.js
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "scanImages") {
    const images = document.querySelectorAll("img");
    const backgroundImages = getBackgroundImages();

    const allImages = Array.from(images).map((img) => img.src);
    allImages.push(...backgroundImages);

    const logoDetectedImages = await Promise.all(
      allImages.map((imageUrl) => checkForLogo(imageUrl))
    );

    const detectedUrls = logoDetectedImages.filter(Boolean);

    const currentPage = window.location.href;

    console.log(detectedUrls, window.location.href);

    if (detectedUrls.length > 0) {
      chrome.runtime.sendMessage({
        action: "showWarning",
        urls: detectedUrls,
        current: currentPage,
      });
    }
  }
});

function getBackgroundImages() {
  const backgroundImages = [];
  const elements = document.querySelectorAll("*");

  elements.forEach((element) => {
    const backgroundImage = getComputedStyle(element).backgroundImage;
    if (backgroundImage && backgroundImage !== "none") {
      const url = extractUrlFromBackgroundImage(backgroundImage);
      if (url) {
        backgroundImages.push(url);
      }
    }
  });

  return backgroundImages;
}

function extractUrlFromBackgroundImage(backgroundImage) {
  const match = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
  return match ? match[1] : null;
}

async function checkForLogo(imageUrl) {
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTMwOTNhNmQtMDVlMy00Y2VmLTk5ZGItMzBlYzViMzI0ZWMyIiwidHlwZSI6ImFwaV90b2tlbiJ9.RWcFXj59VQdHNxASDXURDa52Wn37CnSsFhkJVCTSJG8";

  const edenApiUrl = "https://api.edenai.run/v2/image/logo_detection";

  const data = {
    providers: "google",
    file_url: imageUrl,
  };

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(edenApiUrl, requestOptions);
    const responseData = await response.json();

    console.log(
      responseData,
      responseData?.google?.items[0]?.description,
      responseData?.google?.items[0]?.score
    );
    const logoDetected = responseData?.google?.items[0]?.description;
    const score = responseData?.google?.items[0]?.score;

    if (logoDetected === "University of Ilorin" && score >= 0.5) {
      console.log("Logo detected:", logoDetected);
      console.log(imageUrl);
      return imageUrl; // Logo detected
    } else {
      return null; // No logo detected
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
