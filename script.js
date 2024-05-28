//Carousal JS code

let order = [1, 2, 3]; // Start with the initial order

function move(direction) {
  // Rotate the order based on the direction
  if (direction === 'right') {
    order.unshift(order.pop()); // Move the last item to the first position
  } else {
    order.push(order.shift()); // Move the first item to the last position
  }

  // Apply the new order to the posts
  const posts = document.querySelectorAll('.carousel .post');
  posts.forEach((post, index) => {
    post.style.order = order[index];
  });
}

function moveLeft() {
  move('left');
}

function moveRight() {
  move('right');
}

// Add event listeners for arrows
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.left-arrow').addEventListener('click', moveLeft);
  document.querySelector('.right-arrow').addEventListener('click', moveRight);
});

//end of Carousal JS code

//Authentication js code






window.addEventListener("DOMContentLoaded", function () {

// check if the user is logged in
if (localStorage.getItem("token")) {



  document.querySelector("#login-btn").style.display = "none";
  document.querySelector("#logout-btn").style.display = "inline-block";
  document.querySelector("#register-btn").style.display = "none";
}else{
  // show the login button
  document.querySelector("#login-btn").style.display = "inline-block";
  document.querySelector("#logout-btn").style.display = "none";
  document.querySelector("#newpost-btn").style.display = "none";
}









  // fetch all posts
  fetch("https://v2.api.noroff.dev/blog/posts/shirwac",{
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const posts = data.data;
      console.log(posts);


      // loop through the first 3 posts, and display them in the carousel last three
      for (let i = 0; i < 3; i++) {

        console.log(posts[i]);
        
        // replace content of .carousel .post

        const post = posts[i];



        // format date post.create, as `4. april 2024`

        const date = new Date(post.created);

        const formattedDate = `${date.getDate()}. ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;




        const postsDiv = document.querySelectorAll('.carousel .post');

        const postDiv = postsDiv[i];

          console.log(postDiv);


          // add id attribute to the postDiv
          postDiv.setAttribute("id", post.id);

          // add event listener to the postDiv
          postDiv.addEventListener("click", function () {
            // redirect to the post details page
            window.location.href = `post/postDetails.html?id=${post.id}`;
          });


          postDiv.innerHTML = `
          <div class="imageArticleContainer">
          <img class="post-image" src="${post.media.url}" alt="Image Description">
          </div>
          
          <p class="post-date">${formattedDate}</p>
          <h2 class="post-title">${post.title}</h2>
  
          
          `


     


    


      }



    });
     // fetch all posts
     fetch("https://v2.api.noroff.dev/blog/posts/shirwac",{
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const posts = data.data;
        console.log(posts);
  
  
        for (let i = 0; i < 12; i++) {
  
          console.log(posts[i]);
          
          // replace content of .carousel .post
  
          const post = posts[i];
  
  
  
          // format date post.create, as `4. april 2024`
  
          const date = new Date(post.created);
  
          const formattedDate = `${date.getDate()}. ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  
  
  
  
          const postsDiv = document.querySelectorAll('.post-grid .grid-post');
  
          const postDiv = postsDiv[i];
  
            console.log(postDiv);
  
  
            // add id attribute to the postDiv
            postDiv.setAttribute("id", post.id);
  
            // add event listener to the postDiv
            postDiv.addEventListener("click", function () {
              // redirect to the post details page
              window.location.href = `post/postDetails.html?id=${post.id}`;
            });
  
  
            postDiv.innerHTML = `
            <div class="imageArticleContainer">
            <img class="post-image" src="${post.media.url}" alt="Image Description">
            </div>
            <p class="grid-post-date">${formattedDate}</p>
            <h2 class="grid-post-title">${post.title}</h2>
           
    
            
            `

      
  
  
        }
  
  
  
      });


}

);

document.addEventListener('DOMContentLoaded', function () {
  const newestBtn = document.querySelector('.newest-btn');
  const oldestBtn = document.querySelector('.oldest-btn');
  const postGrid = document.querySelector('.post-grid');

  function sortPosts(ascending = true) {
      // Convert NodeList to Array to sort
      let postsArray = Array.from(postGrid.querySelectorAll('.grid-post'));
      postsArray.sort(function (a, b) {
          const dateA = new Date(a.querySelector('.grid-post-date').textContent.trim());
          const dateB = new Date(b.querySelector('.grid-post-date').textContent.trim());
          return ascending ? dateA - dateB : dateB - dateA;
      });

      // Clear the current posts
      postGrid.innerHTML = '';

      // Append sorted posts
      postsArray.forEach(post => postGrid.appendChild(post));
  }

  function restoreSortOrder() {
      const sortOrder = localStorage.getItem('sortOrder');
      if (sortOrder === 'oldest') {
          sortPosts(true);
      } else if (sortOrder === 'newest') {
          sortPosts(false);
      }
  }

  newestBtn.addEventListener('click', function () {
      sortPosts(false); // Sort by newest
      localStorage.setItem('sortOrder', 'newest'); 
  });

  oldestBtn.addEventListener('click', function () {
      sortPosts(true); // Sort by oldest
      localStorage.setItem('sortOrder', 'oldest');
  });

  restoreSortOrder(); 
});

document.addEventListener('DOMContentLoaded', function () {
  const viewMoreBtn = document.querySelector('.view-more');

 
  viewMoreBtn.addEventListener('click', function () {
      window.location.href = 'viewMore.html';
  });
});

const latestNews = "Latest posts";
const LaPost = document.getElementById("LatestNews");
let count = 0;
let interval = setInterval(() => {
  if (count === latestNews.length) {
    count = 0;
    LaPost.innerHTML = "";
  } else {
    LaPost.innerHTML += latestNews.charAt(count);
    count++;
  }
}, 200);

function signOut() {
  localStorage.removeItem("token");
  location.reload();
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

