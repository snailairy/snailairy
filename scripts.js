const videosJsonUrl = 'videos/content.json'; // Path to the JSON file containing video links

// Fetch video data and update the page
fetch(videosJsonUrl)
    .then(response => response.json())
    .then(data => {
        // Render featured videos
        const featuredVideosList = document.getElementById('featuredVideos');
        data.forEach(videoPath => {
            fetchVideoTitle(videoPath).then(title => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = videoPath;
                link.textContent = title;
                listItem.appendChild(link);
                featuredVideosList.appendChild(listItem);
            });
        });
    })
    .catch(error => console.error('Error fetching video data:', error));

// Fetch the title of the video page from the <title> tag
async function fetchVideoTitle(videoPath) {
    const response = await fetch(videoPath);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.title; // Return the <title> tag text
}

// Search videos based on the title input
function searchVideos() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous results

    fetch(videosJsonUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(videoPath => {
                fetchVideoTitle(videoPath).then(title => {
                    if (title.toLowerCase().includes(searchInput)) {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.href = videoPath;
                        link.textContent = title;
                        listItem.appendChild(link);
                        searchResults.appendChild(listItem);
                    }
                });
            });
        })
        .catch(error => console.error('Error searching videos:', error));
}
