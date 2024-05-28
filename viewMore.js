document.addEventListener('DOMContentLoaded', function () {
    const postGrid = document.querySelector('.post-grid');
    const searchInput = document.getElementById('search'); // Ensure you have this ID in your HTML
    let posts = [];

    // Fetch posts from your API
    function fetchPosts() {
        fetch("https://v2.api.noroff.dev/blog/posts/shirwac", {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Posts fetched:", data.data);  // Log fetched data for verification
            posts = data.data;
            renderPosts(posts);
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            postGrid.innerHTML = '<p>Error loading posts.</p>'; // Display error message if the fetch fails
        });
    }

    // Render posts to the DOM
    function renderPosts(posts) {
        postGrid.innerHTML = ''; // Clear existing posts
        if (posts.length === 0) {
            postGrid.innerHTML = '<p>No posts found.</p>'; // Display a no results message if no posts match the filter
        } else {
            posts.forEach(post => {
                const postElement = createPostElement(post);
                postGrid.appendChild(postElement);
            });
        }
    }

    // Create individual post elements
    function createPostElement(post) {
        const article = document.createElement('article');
        article.className = 'grid-post';
        article.style.cursor = 'pointer'; // Visually indicate that the post is clickable
        const date = new Date(post.created);
        const formattedDate = `${date.getDate()}. ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        article.innerHTML = `
            <img class="post-image" src="${post.media.url}" alt="Image of the post">
            <div class="post-content">
                <p class="grid-post-date">${formattedDate}</p>
                <h2 class="grid-post-title">${post.title}</h2>
            </div>
        `;

        // Optional: Add a click event listener to redirect to a detailed view
        article.addEventListener('click', function () {
            window.location.href = `post/postDetails.html?id=${post.id}`;
        });

        return article;
    }

    // Filter posts based on input in the search box (by author or title)
    function filterPosts(query) {
        console.log("Filtering posts for:", query);  // Log the current query
        query = query.trim().toLowerCase();
        if (!query) {
            renderPosts(posts); // If the query is empty, display all posts
            return;
        }
        const filteredPosts = posts.filter(post => {
            // Ensure both author and title exist and are strings before calling toLowerCase
            const authorMatch = post.author && typeof post.author === 'string' && post.author.toLowerCase().includes(query);
            const titleMatch = post.title && typeof post.title === 'string' && post.title.toLowerCase().includes(query);
            return authorMatch || titleMatch;
        });
        console.log("Filtered posts:", filteredPosts); // Log the filtered results
        renderPosts(filteredPosts);
    }
    

    // Add event listener for real-time search functionality
    searchInput.addEventListener('input', function () {
        filterPosts(this.value);
    });

    fetchPosts(); // Call to fetch posts on page load
});
