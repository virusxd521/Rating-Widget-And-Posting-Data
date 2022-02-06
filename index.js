const stars = document.querySelectorAll('.rating__star');
const body = document.querySelector("body");
const displayingValue = document.querySelector(".rating__value");
const onTopStar = "rating__star--on";
const ratingClass = "rating";
const starsRating  = "rating__stars";
const starRating = "rating__star";
const ratingValue = "rating__value";
const API_KEY = "8dba81fe";
const url = `https://test-api.codingbootcamp.cz/api/${API_KEY}/ratings`;

class Widget{
    constructor(movieName){
        this.movieName = movieName;
        this.ratingDiv = document.createElement("div");
        this.nameH2 = document.createElement("h2");
        this.ratingValue = document.createElement("div");
        this.ratingStars = document.createElement("div");
        this.ratingStar = [];
    }
    
    // function for creating the review
    creatingRating(){
        // Creating the stars
        for(let i = 0; i < 5; i++){
            this.ratingStar.push(document.createElement("div"));
            this.ratingStar[i].classList.add(starRating);    
        }

        this.nameH2.textContent = this.movieName;
        // Appending the stars to their parent div
        this.ratingStars.append(...this.ratingStar);
        // Adding the appropriate class to the parent div of the stars
        this.ratingStars.classList.add(starsRating);
        // place golder for now
        this.ratingValue.textContent = 0;
        // adding class to that place holder
        this.ratingValue.classList.add(ratingValue);        
        this.ratingDiv.classList.add(ratingClass);
        this.ratingDiv.append(this.nameH2, this.ratingValue, this.ratingStars);
        
        // Appending a new div of ratings to the body
        body.appendChild(this.ratingDiv);
    }
    
    async sendingToServer(id){
        try{
            const sending = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({rating_subject: this.movieName , rating_value: id + 1})
            });
            if(!sending.ok){
                throw "Something went wrong please read the docs again and retry";
            }
        } catch (error){
            alert(error);
        }

    }

    // Adding functionionality to the buttons
    addingClick(){
        // Looping over the items
        this.ratingStar.forEach((star, index) => {
            // adding event to each item (star)
            star.addEventListener('click', (e) => {
                // Removes all lighting class from the items in the list
                console.log(star);
                this.ratingStar.forEach(item => item.classList.remove(onTopStar));
                // Function which will iterate over the elements and 
                // add the appropriate class to those elements
                this.iterationFunction(this.ratingStar, index);
                this.sendingToServer(index);

            })
        })
    }

    // Function which will iterate over the elements
    iterationFunction(allItems, itemIndex){
        // displaying the numbers of the highlighted stars
        this.ratingValue.textContent = itemIndex + 1;
        
        // Fetch with the init object so that we will be able to POST the data

        console.log(itemIndex + 1);
        // looping over the array and add the class which will highlight the right elements
        for(let i = 0; i <= itemIndex ; i++){
            allItems[i].classList.toggle(onTopStar);
        }
    }
}


const allMovies = ["Peaky Blinders", "TheMatrix", "John Wick", "Empire", "Fast And Furious", "Mission Impossible", "Harry Potter", "Spider Man", "Super Man", "The God Father"];

for(let i = 0; i < 10; i++){
    const newMovie = new Widget(allMovies[i]);
    newMovie.creatingRating();
    newMovie.addingClick();
}



