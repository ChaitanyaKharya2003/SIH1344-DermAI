const dropContainer = document.getElementById("dropContainer");
const fileInput = document.getElementById("fileInput");

// Prevent the default behavior of the browser when a file is dragged over the container
dropContainer.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dropContainer.classList.add("highlight");
});

dropContainer.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropContainer.classList.remove("highlight");
});

dropContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});

// Handle the file drop event
dropContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  dropContainer.classList.remove("highlight");
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    handleFile(files[0]); // You can handle the selected file here
  }
});

// Trigger file input when the drop container is clicked
dropContainer.addEventListener("click", () => {
  fileInput.click();
});

// Handle file input change
fileInput.addEventListener("change", () => {
  const selectedFile = fileInput.files[0];
  handleFile(selectedFile); // You can handle the selected file here
});

// Function to handle the selected file (replace with your own logic)
function handleFile(file) {
  if (file) {
    // Display the file name or perform further processing
    console.log("Selected file:", file.name);
  }
}
