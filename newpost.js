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

if (localStorage.getItem("token")) {
    document.querySelector(".edit-post-btn").style.display = "inline-block";

    // hide login button
      document.querySelector("#register").style.display = "none";
      document.querySelector("#login").style.display = "none";
      document.querySelector("#logout-btn").style.display = "inline-block";

} else {
    document.querySelector(".edit-post-btn").style.display = "none";
    document.querySelector("#logout-btn").style.display = "none";
}

// Edit post event
document.querySelector(".edit-post-btn").addEventListener("click", function(){
    window.location.href = "editpost.html?id=" + id;
});


function signOut() {
  localStorage.removeItem("token");
  location.reload();
}
