// Function to handle form submission for login
function handleLoginFormSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Make a POST request to authenticate the user
    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        // Handle successful login
        console.log('Login successful!', data);
        // Redirect user to dashboard or another page
    })
    .catch(error => {
        // Handle login error
        console.error('Login error:', error);
    });
}

// Function to handle form submission for registration
function handleRegisterFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Make a POST request to register the user
    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        // Handle successful registration
        console.log('Registration successful!', data);
        // Redirect user to login page
    })
    .catch(error => {
        // Handle registration error
        console.error('Registration error:', error);
    });
}

// Add event listeners for form submissions
document.getElementById('loginForm').addEventListener('submit', handleLoginFormSubmit);
document.getElementById('registerForm').addEventListener('submit', handleRegisterFormSubmit);
// Fetch latest posts with authentication token
fetch('/blog/posts/latest', {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})
.then(response => response.json())
.then(posts => {
    // Code to handle fetched posts
})
.catch(error => console.error('Error fetching posts:', error));

// Function to fetch and display latest posts
function fetchLatestPosts() {
    fetch('/blog/posts/latest')
    .then(response => response.json())
    .then(posts => {
        // Code to populate carousel and thumbnail grid with latest posts
        // For example:
        const carouselContainer = document.querySelector('.carousel');
        const thumbnailsContainer = document.querySelector('.thumbnails');

        posts.data.forEach(post => {
            // Create carousel item
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            carouselItem.innerHTML = `
                <img src="${post.media.url}" alt="${post.media.alt}">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button data-post-id="${post.id}" class="read-more">Read More</button>
            `;
            carouselContainer.appendChild(carouselItem);

            // Create thumbnail item
            const thumbnailItem = document.createElement('div');
            thumbnailItem.classList.add('thumbnail-item');
            thumbnailItem.innerHTML = `
                <img src="${post.media.url}" alt="${post.media.alt}">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button data-post-id="${post.id}" class="read-more">Read More</button>
            `;
            thumbnailsContainer.appendChild(thumbnailItem);
        });

        // Add event listeners to "Read More" buttons
        const readMoreButtons = document.querySelectorAll('.read-more');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', handleReadMore);
        });
    })
    .catch(error => console.error('Error fetching latest posts:', error));
}

// Function to handle "Read More" button click
function handleReadMore(event) {
    const postId = event.target.dataset.postId;
    window.location.href = `/post/index.html?id=${postId}`;
}

// Call fetchLatestPosts when the page loads
window.addEventListener('load', fetchLatestPosts);

// Function to handle form submission for creating a post
function handleCreatePostFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const mediaUrl = document.getElementById('media').value;
    const mediaAlt = document.getElementById('media-alt').value;

    const postData = {
        title,
        body,
        tags,
        media: {
            url: mediaUrl,
            alt: mediaAlt
        }
    };

    fetch('/blog/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post created successfully:', data);
        // Redirect to blog feed page or show success message
    })
    .catch(error => console.error('Error creating post:', error));
}

// Add event listener for create post form submission
document.getElementById('createForm').addEventListener('submit', handleCreatePostFormSubmit);

// Function to handle form submission for updating a post
function handleUpdatePostFormSubmit(event) {
    event.preventDefault();
    const postId = event.target.dataset.postId; // Assume postId is stored as data attribute
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const mediaUrl = document.getElementById('media').value;
    const mediaAlt = document.getElementById('media-alt').value;

    const postData = {
        title,
        body,
        tags,
        media: {
            url: mediaUrl,
            alt: mediaAlt
        }
    };

    fetch(`/blog/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post updated successfully:', data);
        // Redirect to blog feed page or show success message
    })
    .catch(error => console.error('Error updating post:', error));
}

// Add event listener for update post form submission
document.getElementById('updateForm').addEventListener('submit', handleUpdatePostFormSubmit);

// Function to delete a post
function deletePost(postId) {
    fetch(`/blog/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Post deleted successfully');
            // Reload page or update UI as needed
        } else {
            console.error('Failed to delete post:', response.statusText);
        }
    })
    .catch(error => console.error('Error deleting post:', error));
}

// Function to fetch and display a specific post
function fetchPostById(postId) {
    fetch(`/blog/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
        // Populate the HTML elements with post data
        const postContainer = document.querySelector('article');
        postContainer.innerHTML = `
            <h2>${post.title}</h2>
            <p>Author: ${post.author.name}</p>
            <p>Date: ${post.created}</p>
            <img src="${post.media.url}" alt="${post.media.alt}">
            <p>${post.body}</p>
        `;
    })
    .catch(error => console.error('Error fetching post:', error));
}

// Function to extract post ID from URL query parameter
function getPostIdFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('id');
}

// Call fetchPostById when the page loads
window.addEventListener('load', () => {
    const postId = getPostIdFromUrl();
    if (postId) {
        fetchPostById(postId);
    } else {
        console.error('Post ID not found in URL');
    }
});

// Function to fetch and pre-fill the edit form with existing post data
function fetchAndPopulateEditForm(postId) {
    fetch(`/blog/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
        // Populate form fields with post data
        document.getElementById('title').value = post.title;
        document.getElementById('body').value = post.body;
        document.getElementById('tags').value = post.tags.join(',');
        document.getElementById('media').value = post.media.url;
        document.getElementById('media-alt').value = post.media.alt;
    })
    .catch(error => console.error('Error fetching post for editing:', error));
}

// Function to handle form submission for updating a post
function handleUpdatePostFormSubmit(event) {
    event.preventDefault();
    const postId = getPostIdFromUrl(); // Assume postId is extracted from URL
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const mediaUrl = document.getElementById('media').value;
    const mediaAlt = document.getElementById('media-alt').value;

    const postData = {
        title,
        body,
        tags,
        media: {
            url: mediaUrl,
            alt: mediaAlt
        }
    };

    fetch(`/blog/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post updated successfully:', data);
        // Redirect to blog feed page or show success message
    })
    .catch(error => console.error('Error updating post:', error));
}

// Add event listener for update post form submission
document.getElementById('updateForm').addEventListener('submit', handleUpdatePostFormSubmit);

// Call fetchAndPopulateEditForm when the page loads
window.addEventListener('load', () => {
    const postId = getPostIdFromUrl();
    if (postId) {
        fetchAndPopulateEditForm(postId);
    } else {
        console.error('Post ID not found in URL');
    }
});

// Function to handle form submission for user login
function handleLoginFormSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Make a POST request to authenticate the user
    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login failed. Please check your credentials.');
        }
    })
    .then(data => {
        // Store the authentication token securely (e.g., in local storage)
        localStorage.setItem('accessToken', data.accessToken);
        console.log('Login successful!', data);
        // Redirect user to dashboard or another page
    })
    .catch(error => {
        console.error('Login error:', error.message);
        // Display error message to the user
    });
}

// Function to handle form submission for user registration
function handleRegisterFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Make a POST request to register the user
    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Registration failed. Please try again.');
        }
    })
    .then(data => {
        console.log('Registration successful!', data);
        // Redirect user to login page or show success message
    })
    .catch(error => {
        console.error('Registration error:', error.message);
        // Display error message to the user
    });
}

// Add event listeners for form submissions
document.getElementById('loginForm').addEventListener('submit', handleLoginFormSubmit);
document.getElementById('registerForm').addEventListener('submit', handleRegisterFormSubmit);
