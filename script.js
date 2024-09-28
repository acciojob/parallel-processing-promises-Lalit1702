const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to load an image and return a promise
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
  });
}

// Event listener for the button
btn.addEventListener("click", () => {
  // Clear previous images
  output.innerHTML = "";

  // Download images in parallel using Promise.all
  Promise.all(images.map(loadImage))
    .then((loadedImages) => {
      // Display all the downloaded images
      loadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((error) => {
      // Display error if an image fails to load
      const errorMsg = document.createElement("p");
      errorMsg.textContent = error;
      output.appendChild(errorMsg);
    });
});
