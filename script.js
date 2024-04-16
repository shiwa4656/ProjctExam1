// Function to handle registration form submission
function handleRegistrationFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const bio = document.getElementById('bio').value;
    const avatarUrl = document.getElementById('avatar-url').value;
    const avatarAlt = document.getElementById('avatar-alt').value;
    const bannerUrl = document.getElementById('banner-url').value;
    const bannerAlt = document.getElementById('banner-alt').value;

    // Validate inputs
    if (!isValidEmail(email)) {
        console.error('Invalid email address');
        return;
    }
    if (password.length < 8) {
        console.error('Password must be at least 8 characters');
        return;
    }
    if (bio.length > 160) {
        console.error('Bio must be less than 160 characters');
        return;
    }
    if (avatarUrl && !isValidUrl(avatarUrl)) {
        console.error('Invalid avatar URL');
        return;
    }
    if (avatarAlt.length > 120) {
        console.error('Avatar alt text must be less than 120 characters');
        return;
    }
    if (bannerUrl && !isValidUrl(bannerUrl)) {
        console.error('Invalid banner URL');
        return;
    }
    if (bannerAlt.length > 120) {
        console.error('Banner alt text must be less than 120 characters');
        return;
    }

    // Send registration request
    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, bio, avatar: { url: avatarUrl, alt: avatarAlt }, banner: { url: bannerUrl, alt: bannerAlt } })
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
    .catch(error => console.error('Registration error:', error.message));
}

// Function to handle login form submission
function handleLoginFormSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send login request
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
    .catch(error => console.error('Login error:', error.message));
}

// Function to create an API key
function createApiKey() {
    fetch('/auth/create-api-key', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: 'My API Key name' })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to create API key.');
        }
    })
    .then(data => {
        console.log('API key created successfully:', data);
        // Store or display the API key as needed
    })
    .catch(error => console.error('Error creating API key:', error.message));
}

// Function to validate email format
function isValidEmail(email) {
    // Use a regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate URL format
function isValidUrl(url) {
    // Use a regular expression to validate URL format
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
}

// Add event listeners for form submissions
document.getElementById('registerForm').addEventListener('submit', handleRegistrationFormSubmit);
document.getElementById('loginForm').addEventListener('submit', handleLoginFormSubmit);

// Call createApiKey function to create an API key (optional)
createApiKey();

