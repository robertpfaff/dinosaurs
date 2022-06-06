/**
* @description Class constructor
* @constructor Dinosaurs
* @param {Udacity Project 1 Intermediate Javascript} title
* @param {Robert Pfaff} author
*/

// Please note: As mentioned in the comments posted with the project, I did not appropriate any code directly 
// from anyone else's version of the same project. But I did make extensive use of other sources, especially YouTube videos. 

// I could not have completed the project otherwise as it involved concepts not taught in the Udacity curriculum and
// mentors are not immediately available for understandable reasons. The one major idea taken from someone else's GitHub 
// repo was the decision to attach the three comparison functions to the Dinosaur class constructor as methods, 
// which I should attribute to Brian Widgeon's repo at https://github.com/b-widg/project-one-dinosaurs/blob/main/app.js.

// But the code is all original. Please contact me if you have questions.


class Dinosaur {
    constructor(species, height, weight, image, when, where, diet, facts, fun_fact) {
        this.species = species;
        this.height = height;
        this.weight = weight;
        this.image = "/images/" + this.species.toLowerCase() + ".png";
        this.when = when;
        this.where = where;
        this.diet = diet;
        // Each dinosaur has an array of six facts, primed with when and where.
        facts = [`The ${this.species} lived in ${this.where}`, `The ${this.species} lived during the ${this.when} period.`];
        this.facts = facts;
        // Fun fact variable is used to return randomized fact from facts array.
        // See randomFact function on line 158 below.
        this.fun_fact = fun_fact;

        // 1) Weight comparison function
        this.weightComp = function (user) {
            if (user.weight < this.weight) {
                let ratio = parseFloat((this.weight - user.weight) / user.weight) * 100;
                let number = Math.round(ratio);
                // Use comma separators if in thousands
                let result = `The ${this.species} was ${number.toLocaleString('en-US')}% heavier than you.`;
                this.facts.push(result);
                return result;
            } else {
                let ratio = parseFloat((user.weight - this.weight) / this.weight) * 100;
                let number = Math.round(ratio);
                let result = `The ${this.species} was ${number.toLocaleString('en-US')}% lighter than you.`;
                this.facts.push(result);
                return result;
        }};
        // 2) Height comparison functions
        this.heightComp = function (user) {
            if (user.height < this.height) {
                let difference = parseFloat(this.height - user.height);
                let number = Math.round(difference);
                let result = `The ${this.species} was ${number} inches taller than you.`;
                this.facts.push(result)
                return result;
            } else {
                let difference = parseFloat(user.height - this.height);
                let number = Math.round(difference);
                let result = `The ${this.species} was ${number} inches shorter than you.`;
                this.facts.push(result)
                return result;
        }};
        // 3) Diet comparison function
        this.dietComp = function(user) {
            if (this.diet === user.diet) {
              let result = `Both the ${this.species} and you are ${this.diet}s.`;
              this.facts.push(result);
              return result;
            } else {
               let result =  `You are a ${user.diet} and the ${this.species} was a ${this.diet}.`;
               this.facts.push(result);
               return result;          
        }};
        // 4) Diet comparison function
        this.nameComp = function (user) {
            let user_name = String(user.name).trim();
            let dino_name = String(this.name).trim();
            let user_length = user_name.length;
            let dino_length = dino_name.length;
            if (user_length < dino_length) {
                let difference = parseFloat(dino_length - user_length)
                let name_fact = `The ${this.species}'s name is ${difference} letters longer than your name, ${user.name}.`;
                this.facts.push(name_fact);
                return name_fact;
            } else if  (user_length > dino_length) {
                let difference = parseFloat(user_length - dino_length);
                let name_fact = `The ${this.species}'s name is ${difference} letters shorter than your name, ${user.name}.`;
                this.facts.push(name_fact);
                return name_fact;
            } else {
              let name_fact;
              name_fact = `The ${this.species}'s name is the same length as your name, ${user.name}.`;
              this.facts.push(name_fact);
              return name_fact;
        }};
    }
}

/**
* @description Class constructor
* @constructor Human Being
*/

class HumanBeing {
    constructor(name, species, height, weight, image, diet) {
        this.name = name;
        this.species = species;
        this.height = height;
        this.weight = weight;
        this.image = image;
        this.diet = diet;
    }
}
/**
* @description IIFE wrapper
// Code in IIFE wrapper, so we don't leak data to outside world.
// I'm assuming the class definitions SHOULD be global,
// so they're not in the IIFE.
*/

(() => {
    let dinoData = [];
    // Fetch dino data and mint each dino
    fetch("./dino.json")
        .then(response => response.json())
        .then(json_data => {
            // mapping dino objects from json data
            dinoData = json_data.Dinos.map(eachDinos =>
                new Dinosaur(eachDinos.species, eachDinos.height, eachDinos.weight,
                    eachDinos.image, eachDinos.when, eachDinos.where, eachDinos.diet, eachDinos.facts));
    });

    // Collect form data and make user after button click.

    let button = document.getElementById('btn');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let species = "Human Being"
        let height_feet = Number(document.getElementById('feet').value) * 12;
        let height_inches = Number(document.getElementById('inches').value);
        let height = height_feet + height_inches;
        let weight = Number(document.getElementById('weight').value);
        let image = "./images/human.png";
        let diet = document.getElementById('diet').value;
        let facts = [];

        // After form validation mint new human
        let user = new HumanBeing(name, species, height, weight, image, diet, facts);

        // Call weightComp method
        for (let i = 0; i < dinoData.length; i++) {         
          weight_data = dinoData[i].weightComp(user);
        }
        // Call heightComp method
        for (let i = 0; i < dinoData.length; i++) {
            height_data = dinoData[i].heightComp(user);
        }
        // Perform diet comparison
        for (let i = 0; i < dinoData.length; i++) {
            diet_data = dinoData[i].dietComp(user);
        }
        // Perform name comparison
        for (let i = 0; i < dinoData.length; i++) {
            name_data = dinoData[i].nameComp(user);
        }
        // Replace Pigeon facts array with one fact (six times).
        for (let i = 0; i < dinoData.length; i++) {
            if (dinoData[i].species == "Pigeon") {
            dinoData[i].facts = ["All birds are dinosaurs.", "All birds are dinosaurs.","All birds are dinosaurs.","All birds are dinosaurs.","All birds are dinosaurs.","All birds are dinosaurs." ];          
        }}
        // Remove form on click, w/o deleting dinoData.
        let node = document.getElementById("dino-compare");
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }

        // Called on line 209-210 below
        // Function assigns one random fact to fun_fact
        // Randomized after browser refreshed
        // And new user info entered

        function randomFact(arr) {
            let fun_fact = arr[Math.floor(Math.random() * 6)];
            return fun_fact;
        }

        // Shuffle dinoData array before inserting user at four.
        // Dino images appear in random location on grid
        // While person image stays in place

        dinoData.sort(function() { return 0.5 - Math.random() });

        //Splice human/user into dinoData array in middle
        dinoData.splice(4, 0, user);

        // Arrange shuffled tiles on grid.
        // Place fourth tile in center square

        for (let i = 0; i < 9; i++) {
            if (i === 4){
                let grid = document.getElementById('grid');
                const user_tile = document.createElement('div');
                user_tile.classList.add("grid-item");
                user_tile.innerHTML=`<h3>${user.name}</h3>
                <img src="./images/human.png">`;
                grid.appendChild(user_tile);
            } else {
                let grid = document.getElementById('grid');
                const tile = document.createElement('div');
                tile.classList.add("grid-item");
                tile.innerHTML=`<h3>${dinoData[i].species}</h3>
                <p>${randomFact(dinoData[i].facts)}</p>
                <img src="/images/${dinoData[i].species}.png">`;
                grid.appendChild(tile);
            }
        }
})

// End of IIFE wrapper
// See line 107-108
})();
