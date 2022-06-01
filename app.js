// Create Character Constructor

class Characters {
  constructor (species, height, weight, image, when, where, wherewhen, diet, facts) {
  this.species = species;
  this.height = height;
  this.weight = weight;
  this.image = "/images" + this.species.toLowerCase() + ".png";
  this.when = this.when;
  this.where = this.where;
  this.wherewhen = `The ${this.species} lived in ${this.where}} during the ${this.when}`;
  this.diet = this.diet;
  this.facts = this.facts;
}}

// Create Dinosaur and Human Subclasses

class Dinosaurs extends Characters {
  constructor(species, height, weight, image, when, where, wherewhen, diet, facts) {
    super(species, height, weight, image, when, where, wherewhen, diet, facts);

}}

class HumanBeing extends Characters {
  constructor(species, height, weight, image, diet, facts) {
    super(species, height, weight, image, diet, facts);
}}
// WHAT HAPPENS BEFORE BUTTON CLICK?

// Fetch dino data
// Map Dino objects from json data
// Place objects in array dinoData

let dinoData = [];

const dinos = (function (fn) {
    fetch("./dino.json")
    .then(response => response.json())
    .then(json_data => {
        // mapping dino objects from json data   
        dinoData = json_data.Dinos.map(eachDinos =>new Dinosaurs(eachDinos.species, eachDinos.height, eachDinos.weight, eachDinos.image, eachDinos.when, eachDinos.where, eachDinos.wherewhen, eachDinos.diet, eachDinos.facts));
        console.log('dinoData Array Contents:');
        console.log(dinoData);
        console.log(typeof dinoData);
        // testing array by displaying species
        dinoData.forEach(dino => console.log(dino.species));
        return dinoData
    })})(Dinosaurs)

// WHAT HAPPENS AFTER BUTTON CLICK?
// Use IIFE to get human data from form

let button = document.getElementById('btn');

// Declare user to be an empty object
let userData = {}

// Collect data from form with IIFE image
button.addEventListener('click', (e) => {
    e.preventDefault();
    return (() => {
        let species = document.getElementById('name').value;
        let height_feet = (document.getElementById('feet').value * 12 );
        let height_inches = (document.getElementById('inches').value);
        let height = (+height_feet + +height_inches);
        let weight = document.getElementById('weight').value;
        let diet = document.getElementById('diet').value;
        // Return userData object.
        let userData = {
          species: species,
          height: height,
          weight: weight,
          image: "./images/human.png",
          diet: diet,
          facts: [] };
          console.log("User Data in IIFE Function")
          console.log(userData);
          return userData;
})();
})

// From userData, make new HumanBeing

/*
// Remove form from screen

// Create user object from user input

// Create and/or add "weight_fact" comparision method 1 

// Create and/or add "height_fact" comparision method 2 

// Create and/or add "diet_fact" comparision method 3

// Generate Tiles for each Dino in Array
  
// Arange tiles on screen/Add tiles to DOM

// Prepare and Display Tiles on Screen

*/






