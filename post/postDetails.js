window.onload = function() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id").trim();
    console.log(id);
    fetch("https://v2.api.noroff.dev/blog/posts/shirwac/" + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            json = json.data;
  
            // Format date, as `4. April 2024 12:00`
            const date = new Date(json.created);
            const formattedDate = `${date.getDate()}. ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()} ${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
            const title = json.title;
            const content = json.body;
            const media = json.media.url;
            const alt = json.media.alt;
            const author = json.author.name;
  
            // Update the document title and other elements
            document.title = title;
            document.querySelector(".titleD").innerHTML = title;
  
            // Handle the paragraph formatting
            const paragraphs = content.split('\n').map(p => `<p>${p}</p>`).join('');
            document.querySelector(".contentD").innerHTML = paragraphs;
            document.querySelector(".mediaD img").src = media;
            document.querySelector(".mediaD img").alt = alt;
            document.querySelector(".dateD").innerHTML = "Published: " + formattedDate;
            document.querySelector(".authorD").innerHTML = "Author: " + author;
        });
  
    // Show edit button if user is logged in
    if (localStorage.getItem("token")) {
        document.querySelector(".edit-post-btn").style.display = "inline-block";
        document.querySelector("#register").style.display = "none";
        document.querySelector("#login").style.display = "none";
        document.querySelector("#logout-btn").style.display = "inline-block";
    } else {
        document.querySelector(".edit-post-btn").style.display = "none";
        document.querySelector("#logout-btn").style.display = "none";
        document.querySelector(".Delete-btnD").style.display = "none";
    }
  
    // Add event listener to the delete button
    // Add event listener to the delete button
        document.querySelector(".Delete-btnD").addEventListener("click", function(){
            if (confirm("Are you sure you want to delete this post?")) {
                fetch("https://v2.api.noroff.dev/blog/posts/shirwac/" + id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token") // Assuming authorization is required
                    }
                })
                .then(response => {
                    if(response.status === 204) { // Check for the 204 No Content status
                        alert('Post deleted successfully.');
                        window.location.href = '/'; // Redirect to the home page or another page
                    } else {
                        response.text().then(text => alert('Failed to delete the post: ' + text)); // Display server error response
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        });

  
    // Edit post event
    document.querySelector(".edit-post-btn").addEventListener("click", function(){
        window.location.href = "edit.html?id=" + id;
    });
  }
  
  function signOut() {
      localStorage.removeItem("token");
      location.reload();
  }
  