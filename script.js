var searchInput=document.getElementById("search-input");
var moviesList = document.getElementById("allMovies");
var favourtiesList = document.getElementById("favouritesList");
var Favourites = document.getElementById("movies");
var h1 = document.getElementById("h1");
// The Api key that i got from omdb website
var apiKey="1e4456bf";
function  getMovie(){
    // searchTerm here refers to the word that the user typed in the search box
    async function getapi(searchTerm) {
        const api_url = 
      `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=1e4456bf`;
    //   We Fetch the data from the above url based on the search term
        const response = await fetch(`${api_url}`);
        // We convert the data to the json format
        var data = await response.json();
        // If the response is true then we continue displaying the movies we got from fetching
        if(data.Response === 'True'){
            // data.search here is the array containing all the related movies that the user is searching for 
            const movies = data.Search;
            moviesList.innerHTML=''
            // We map through the movies and display them by creating some elements and pushing the content inside it
            movies.map((movie)=>{
                const url = movie.Poster;
                var div = document.createElement('div');
                var wrappedDiv = document.createElement('div');
                wrappedDiv.classList.add('wrapped');
                var img = document.createElement('img');
                img.src=url;
                img.height=50;
                img.width=50;
                
                div.appendChild(img);
                var p = document.createElement('p');
                var button = document.createElement('button');
                p.classList.add("text");
                p.innerHTML=`${movie.Title} (${movie.Year})`;
                div.appendChild(p);
                div.classList.add("movie");
                wrappedDiv.appendChild(div);
                wrappedDiv.appendChild(button);
                button.innerText="Add To Favourites"
                // AddEventListener triggers when the user clicks on Add to Favourites button
                button.addEventListener("click",function(){
                    this.innerText="Added To Favourites";
                    // We need the list of favourites even after refreshing the page so we use local storage to store the data of the favourites
                    localStorage.setItem(movie.imdbID,`${movie.Title} (${movie.Year})`);
                    // We update the count of favourites with the help of localStorage.length which contains all the favourite movies of user
                    document.getElementById('count').innerHTML=localStorage.length;
                })
                moviesList.appendChild(wrappedDiv);

                // If the user clicks on any movie then div addEventListener triggers 
                div.addEventListener("click",async function(){
                    // We open a new tab showing info about that movie when user wishes to click on any movie in search results
                    window.open(`https://www.imdb.com/title/${movie.imdbID}/`,"_blank");

                })
               
            });
        }
        else{
            // We clear off the moviesList's innerhtml when the data.Response is false;
            moviesList.innerHTML='';
        }
    }
    // Calling that async function with the phrase the user has typed
    getapi(searchInput.value);
}
function showMovies(){
    document.getElementById('count').innerHTML=localStorage.length;
    var heading = h1;
    // We update the heading accordingly when the user clicks on the show favourite movies and display the results
    if(heading.innerHTML === "Show Favourite Movies"){
        heading.innerHTML="Hide Favourite Movies";
        // We show the favourite movies from local storage
        for(var i=0;i<localStorage.length;i++){
            var div = document.createElement('div');
            var mainDiv = document.createElement('div');
            mainDiv.classList.add('main-div');
            div.classList.add('size');
            var p = document.createElement('p');
            p.classList.add("fontEdit");
            p.innerHTML = localStorage.getItem(localStorage.key(i));
            div.appendChild(p);
            var btn=document.createElement("button");
            btn.innerText="Remove";
            btn.classList.add('btn-class');
            btn.setAttribute("id",localStorage.key(i));
            btn.onclick=function(){
                console.log(this.parentNode.remove());
                localStorage.removeItem(this.getAttribute("id"));
                document.getElementById('count').innerHTML=localStorage.length;

            }
            mainDiv.appendChild(div);
            mainDiv.appendChild(btn)
            favourtiesList.appendChild(mainDiv);
        }
    }
    else{
        // We hide the results when user clicks on the Hide movies 
        heading.innerHTML ="Show Favourite Movies";
        favourtiesList.innerHTML=' ';
    }
}

// We use this to stop displaying the results when user clicks on any part of the screen so it won't be disrupting user experience
window.addEventListener("click",function(){
    moviesList.innerHTML='';
})