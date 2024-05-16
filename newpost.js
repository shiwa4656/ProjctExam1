async function create(event){
    event.preventDefault();
    try {
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const url = document.getElementById("url").value;
        const data = {
            title,
            body: content,
            media: {
                url,
                alt: title
            }
        }
        const response = await fetch("https://v2.api.noroff.dev/blog/posts/shirwac", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        const result = await response.json();
        console.log(result);
        if(result.errors){
            result.errors.forEach(error => {
                alert(error.message);
            });
        }
        window.location.href = "index.html";
    }
    catch(error){
        alert(error);
    }   
}




function signOut() {
    // Remove the token from localStorage
    localStorage.removeItem("token");
  
    // Redirect the user to the index page
    window.location.href = 'index.html';
  }
  

  document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    const contentElements = document.querySelectorAll('.signup-container'); // Selects both hero and main elements
  
    menuToggle.addEventListener('click', function () {
        menuItems.classList.toggle('active');
        
        contentElements.forEach(element => {
            if (menuItems.classList.contains('active')) {
                element.style.marginTop = '200px'; // Adjust margin if menu is active
            } else {
                element.style.marginTop = '0'; // Reset margin if menu is not active
            }
        });
    });
  });
  