async function register(e){

    e.preventDefault();
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const data = {
            email,
            password,
           
        }

        const response = await fetch("https://v2.api.noroff.dev/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        console.log(result);






        // Save the token to the local storage
        localStorage.setItem("token", result.data.accessToken);


        // 

        if(result.errors){
           
            // looop through the errors
            result.errors.forEach(error => {
                alert(error.message);
            });
        }


        // redirect to the home page
        window.location.href = "index.html";

    }   


    catch(error){
        Alert(error);
    }   
}  


document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    const contentElements = document.querySelectorAll('.hero, .main, .Delete-btn'); // Selects both hero and main elements
  
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
  