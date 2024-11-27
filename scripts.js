// Function to fetch video data from content.json
async function fetchVideos() {
  try {
    const response = await fetch('/videos/content.json'); // Adjust path to JSON
    const videos = await response.json();
    displayFeaturedVideos(videos); // Display featured videos
    setupSearch(videos); // Setup search functionality
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
}

// Function to display featured videos
function displayFeaturedVideos(videos) {
  const featuredContainer = document.getElementById('featured-videos');
  featuredContainer.innerHTML = ''; // Clear any existing content

  // Loop through videos and fetch their titles
  videos.forEach(videoPath => {
    fetch(videoPath)
      .then(response => response.text())
      .then(pageContent => {
        const title = pageContent.match(/<title>(.*?)<\/title>/)[1]; // Extract the title
        const link = document.createElement('a');
        link.href = videoPath;
        link.textContent = title;
        link.classList.add('video-link');
        featuredContainer.appendChild(link);
      });
  });
}

// Function to handle search functionality
function setupSearch(videos) {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = ''; // Clear previous results

    // Loop through videos and check if title matches search query
    videos.forEach(videoPath => {
      fetch(videoPath)
        .then(response => response.text())
        .then(pageContent => {
          const title = pageContent.match(/<title>(.*?)<\/title>/)[1];
          if (title.toLowerCase().includes(query)) {
            const link = document.createElement('a');
            link.href = videoPath;
            link.textContent = title;
            link.classList.add('video-link');
            searchResults.appendChild(link);
          }
        });
    });
  });
}

// Initialize the video fetching when the page loads
window.onload = fetchVideos;
