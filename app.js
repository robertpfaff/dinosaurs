// Create Dino Constructor

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
    }
}

// Parse dino.json, create dino objects

let dinoData = [];

(function (Dinosaurs, user) {
    fetch("./dino.json")
    .then(response => response.json())
    .then(json_data => {   
        dinoData = json_data.Dinos.map(eachDinos =>new Dinosaurs(eachDinos.species, eachDinos.weight, eachDinos.height, eachDinos.diet, eachDinos.where, eachDinos.when, eachDinos.fact));
        dinoData.splice(4,0, user);
        console.log('dinoData Array Contents:')
        console.log(dinoData);
        console.log(typeof dinoData);
        dinoData.forEach(dino => console.log(dino.species));
        return dinoData
    }).then(dinoData=> console.table(dinoData))   
  })(Dinosaurs, user);

// Build constructor function to collect human data

function Human (){
        let user_name = document.getElementById('name').value;
        let height_feet = (document.getElementById('feet').value * 12 );
        let height_inches = (document.getElementById('inches').value);
        let user_height = (+height_feet + +height_inches);
        let user_weight = document.getElementById('weight').value;
        let user_diet = document.getElementById('diet').value;
        let user_species = "Human Being";
        let userData = {
            name: user_name,
            species: user_species,
            height: user_height,
            weight: user_weight,
            diet: user_diet };
    console.log("User Data in Human Constructor")
    console.table(userData);
    return userData;
}

// Instantiate new instance of human on form submit

const button = document.getElementById("btn");
button.addEventListener("click", function(e){
  e.preventDefault();
  let user = new Human
  console.log("User in Instantiate Function")
  console.table(user);
    return user
})

// Create Dino Compare Method 1
