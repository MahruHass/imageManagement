// Toast notification function
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.display = 'block';
  toast.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
  
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

// Load images function
async function loadImages() {
  try {
    const response = await fetch("/api/images");
    const images = await response.json();

    const imageGrid = document.getElementById("imageGrid");
    imageGrid.innerHTML = images
      .map(
        (image) => `
          <div class="image-item">
            <img src="/api/images/${image._id}" alt="${image.filename}">
            <p>${image.filename}</p>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading images:", error);
    showToast("Error loading images", "error");
  }
}

// Handle form submission
document.getElementById("uploadForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  try {
    const response = await fetch("/api/images/upload", {
      method: "POST",
      body: formData,
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast("Image uploaded successfully!");
      event.target.reset();
      loadImages(); // Refresh the image grid
    } else {
      showToast("Failed to upload image", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showToast("Error uploading image", "error");
  }
});

// Load images when page loads
document.addEventListener("DOMContentLoaded", loadImages); 