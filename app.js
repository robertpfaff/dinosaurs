// 1) Create a Dinosaur constructor function

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
function getdinoData(Dinosaurs){
    fetch("./dino.json")
    .then(response => response.json())
    .then(json_data => {   
        dinoData = json_data.Dinos.map(eachDino => new Dinosaurs(eachDino.species, eachDino.weight, eachDino.height, eachDino.diet, eachDino.where, eachDino.when, eachDino.fact));
        console.log('Table of Dinosaur Data')
        console.table(dinoData);
        const dino_heights = dinoData.map((dino)=> {console.log(dino.height)})
        return dinoData})    
}

getdinoData(Dinosaurs);


// 3) Create Human Object with IIFE Function w/ Form Data     

let button = document.getElementById('btn') //before adding the click event listerner to it
        
button.addEventListener('click', function(e) { // add event listener
    e.preventDefault();                     // prevent default submit
    return (function getHumanData(){        // use iffe function to create human object
    let named = document.getElementById('name').value;
    let height_feet = (document.getElementById('feet').value * 12 ); 
    let height_inches = (document.getElementById('inches').value);
    let height = (+height_feet + +height_inches);
    let weight = document.getElementById('weight').value;
    let diet = document.getElementById('diet').value;
    let species = "Human Being";
    let userData = {};
    // Using placeholder variable so I don't have to fill out form every time.
    userData = {named, height, weight, diet, species};
    console.log("Table User Data")
    console.table(userData);
    if (typeof userData != "undefined");
    const remove_form = document.getElementById('dino-compare');
    remove_form.remove(); // Removes the div with the 'dino-compare' id if humqn object exists
    return userData // Return user data to pass into dino array.
})();
});

// 4) Splice (combine) userData into dinoData at index 4.
// splice(start, deleteCount, item1, item2, itemN)
console.log('Splice Table')
console.table(userData)

