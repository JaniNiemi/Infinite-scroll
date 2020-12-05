const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

const randomImagesCount = 5; // Initial images loaded

let randomImg;

// Lorem Picsum
const randomPicUrl = "https://picsum.photos/200/300";

// helper function to set attributed on dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, then add to dom
function displayPhotos(photo) {
    const item = document.createElement("a");
    setAttributes(item, {
        href: photo.url,
        target: "_blank",
    });

    // create <img>
    const img = document.createElement("img");
    setAttributes(img, {
        src: photo.url,
        alt: "Lorem Picsum random photo",
        title: "Lorem Picsum random photo",
    });

    // put <img> inside <a>, then put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
}

// Get random photos from lorem picsum
async function getPhotos() {
    try {
        const response = await fetch(randomPicUrl);
        randomImg = await response;
        displayPhotos(randomImg);
    } catch (error) {
        console.log("error", error);
    }
}

// Check if scrolling is near bottom, -> load more photos
window.addEventListener("scroll", async () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        await getPhotos();
    }
})

// Get photos on page load
for (let i = 0; i < randomImagesCount; i++) {
    getPhotos();
}