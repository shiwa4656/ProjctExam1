async function register(e){

    e.preventDefault();
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value;

        const data = {
            email,
            password,
            name
        }


        //confirm password  
        const confirmPassword = document.getElementById("confirm-password").value;
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }   


        const response = await fetch("https://v2.api.noroff.dev/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        console.log(result);

        if(result.errors){
           
            // looop through the errors
            result.errors.forEach(error => {
                alert(error.message);
            });
        }

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
  