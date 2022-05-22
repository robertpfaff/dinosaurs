class Dinosaurs {
    constructor(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.image = "images/" + species.toLowerCase() + ".png";
    }
}

// 2) Fetch Dino JSON Data, Create Array of Dino Objects 

let dinoData = [];
(function (){
    fetch("./dino.json")
    .then(response => response.json())
    .then(json_data => {   
        dinoData = json_data.Dinos.map(eachDinos =>new Dinosaurs(eachDinos.species, eachDinos.weight, eachDinos.height, eachDinos.diet, eachDinos.where, eachDinos.when, eachDinos.fact));
        console.log(dinoData);
        return dinoData
    })    
})();

printDinos(dinoData);

function printDinos(dinoData) {
    for (i=0; i < dinoData.length; i++) {
        console.log(dinoData[i]);
    }
}


// 3) Create Human Object with IIFE Function w/ Form Data     

let button = document.getElementById('btn') //before adding the click event listerner to it
        
button.addEventListener('click', function(e) { // add event listener
    e.preventDefault();                     // prevent default submit
    return (function getHumanData(){        // use iffe function to create human object
    let name = document.getElementById('name').value;
    let height_feet = (document.getElementById('feet').value * 12 ); 
    let height_inches = (document.getElementById('inches').value);
    let height = (+height_feet + +height_inches);
    let weight = document.getElementById('weight').value;
    let diet = document.getElementById('diet').value;
    let species = "Human Being";
    let userData = [];
    userData = ["Human Being", 185, 70, "omnivor", "Robert Pfaff"];
    console.log(userData);
    if (typeof userData != "undefined");
    const remove_form = document.getElementById('dino-compare');
    remove_form.remove(); // Removes the div with the 'dino-compare' id if humqn object exists
    return userData; // Return user data to pass into dino array.
})();
});



    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
