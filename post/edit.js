const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = (params.get("id")).trim();


window.onload = function() {
    console.log(id);
    fetch("https://v2.api.noroff.dev/blog/posts/shirwac/" + id)
        .then(function(response) {
        return response.json();
        })
        .then(function(json) {
        json = json.data;
        console.log(json);


            // populate the form with the post data
            document.getElementById("title").value = json.title;
            document.getElementById("content").value = json.body;
            document.getElementById("url").value = json.media.url;




        });


     
    
}




async function edit(event){
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
        const response = await fetch("https://v2.api.noroff.dev/blog/posts/shirwac/" + id, {
            method: "PUT",
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
        window.location.href = "../index.html";
    }
    catch(error){
        alert(error);
    }   
}