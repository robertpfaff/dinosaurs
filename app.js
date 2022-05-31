// Fetch Dino Data
const getDinoData = async () => {
    const fetchedData = await fetch("./dino.json");
    const data = await fetchedData.json();
    console.table(data);
    return data;
 };
 
// Call before button click
// Step 1: Get the dino json data.
getDinoData();

// Create Dino Constructor
// Step 2 Make the Dinosaur constructor

class Dinosaurs {
    constructor(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet.toLowerCase();
        this.where = `The ${this.species} lived in ${where}`;
        this.when = `The ${this.species} lived during the ${when} period`;
        this.where_when = `The ${this.species} lived in ${where} during the ${when} period`;
        this.fact = fact;
        this.image = "/images" + species.toLowerCase() + ".png";
        
        // call functions under tiles as inner html
        this.weightComp = function () {
            if (user.weight < this.weight) {           
            let ratio = parseFloat((this.weight - user.weight) / user.weight) * 100;
            return `The ${this.species} was ${ratio}% heavier than you.`;
            } else {
            let ratio = parseFloat((user.weight - this.weight) / this.weight) * 100;
            return  `The ${this.species} was ${ratio}% lighter than you.`;
            }}
        
        this.heightComp = function () {
            if (user.height < this.height) {
            let ratio = Math.round(this.weight - user.weight);
            return `The ${this.species} was ${ratio} inches taller than you.`;
            } else {
            let ratio = Math.round(user.weight - this.weight);
                return  `The ${this.species} was ${ratio} shorter than you.`;
            }}

        this.dietComp = function() {
            switch(this.diet === user.diet) {
                case true:
                    return  `Both the ${this.species} and you are ${this.diet}s.`;
                    break;
                case false:
                    return  `You are a ${user.diet} and the ${this.species} was a ${this.diet}.`; 
                    break;
                default:
                    return `Sorry. The ${this.species}'s diet is unknown.`;
            }}
        }}

// Create Dino Objects

let dinoData = [];

// Step 3) Prepare to make dino objects.
// Don't call until user object made after button click.

function MakeDinos(Dinosaurs, user) { 
    dinoData = data.Dinos.map(eachDinos =>new Dinosaurs(eachDinos.species, eachDinos.weight, eachDinos.height, eachDinos.diet, eachDinos.where, eachDinos.when, eachDinos.fact));
    // Splice user object into Dino object
    dinoData.splice(4,0, user)
    console.log('dinoData Array Contents:')
    console.log(dinoData);
    console.log(typeof dinoData);
    // test t0 see if array of objects operational
    console.log('List of Dinosaur Species:')
    dinoData.forEach(dino => console.log(dino.species));
    return dinoData
}

// Step 4) Create Human with Constructor Function
// Call with new keyword after button click.

class Human {
    constructor(name, species, height, weight, diet) {
        this.name = name;
        this.species = species;
        this.height = height;
        this.weight = weight;
        this.diet = diet;
    }
}

// Step 5) Collect User Input with button click event listener
// Use IIFE to get user input, place inside an array
// Make new Human from collected data

let button = document.getElementById('btn');

button.addEventListener('click', (e) => {
    e.preventDefault();
    return (() => {
        let name = document.getElementById('name').value;
        let height_feet = (document.getElementById('feet').value * 12 );
        let height_inches = (document.getElementById('inches').value);
        let height = (+height_feet + +height_inches);
        let weight = document.getElementById('weight').value;
        let diet = document.getElementById('diet').value;
        let species = "Human Being";
        
        // Mint new Human after button click
        let user = new Human;
        console.log(user.name)
        return user      
    })(Human);
})

// Now call MakeDinos with user and Dinosaurs.
const dino = MakeDinos(Dinosaurs, user);


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
