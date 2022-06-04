class Dinosaur {
    constructor(species, height, weight, image, when, where, diet, facts) {
        this.species = species;
        this.height = height;
        this.weight = weight;
        this.image = "/images/" + this.species.toLowerCase() + ".png";
        this.when = when;
        this.where = where;
        this.diet = diet;
        facts = [];
        this.facts = facts;
        this.weightComp = function (user) {
            if (user.weight < this.weight) {
                let ratio = parseFloat((this.weight - user.weight) / user.weight) * 100;
                let number = Math.round(ratio);
                let result = `The ${this.species} was ${number}% heavier than you.`;
                this.facts.push(result)
                return result;
            } else {
                let ratio = parseFloat((user.weight - this.weight) / this.weight) * 100;
                let number = Math.round(ratio);
                let result = `The ${this.species} was ${number}% lighter than you.`;
                this.facts.push(result)
                return result;
        }};
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
        this.dietComp = function(user) {
            switch(this.diet === user.diet) {
                case true:
                    let result1 = `Both the ${this.species} and you are ${this.diet}s.`;
                    this.facts.push(result1);
                    return result1;
                case false:
                    let result2 =  `You are a ${user.diet} and the ${this.species} was a ${this.diet}.`;
                    this.facts.push(result2);
                    return result2;
                default:
                    return `Sorry. Does not compute.`;                
        }};
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
                name_fact = `The ${this.species}'s name is the same length as your name, ${user.name}.`;
                this.facts.push(name_fact);
                return name_fact;
        }};
        
    }        
}

class HumanBeing {
    constructor(name, height, weight, image, diet) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.image = image;
        this.diet = diet;
    }    
}
 
// IIFE, so we don't leak dinoData to the outside world.
// I'm assuming the class definitions SHOULD be global,
// so they're not in the IIFE.

(() => {
    let dinoData = [];
    // fetch dino data and make each dino
    fetch("./dino.json")
        .then(response => response.json())
        .then(json_data => {
            // mapping dino objects from json data    
            dinoData = json_data.Dinos.map(eachDinos =>
                new Dinosaur(eachDinos.species, eachDinos.height, eachDinos.weight,
                    eachDinos.image, eachDinos.when, eachDinos.where, eachDinos.wherewhen,
                    eachDinos.diet, eachDinos.facts));
 
            console.log('dinoData Array Contents:');
            console.log(dinoData);
            console.log(Array.isArray(dinoData));
        });
        
 
    // collect form data and make user
    let button = document.getElementById('btn');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        let name = document.getElementById('name').value; 
        let height_feet = Number(document.getElementById('feet').value) * 12; 
        let height_inches = Number(document.getElementById('inches').value); 
        let height = height_feet + height_inches;
        let weight = Number(document.getElementById('weight').value); 
        let image = "./images/human.png";
        let diet = document.getElementById('diet').value;
        let facts = []; 
        
        let user = new HumanBeing(name, height, weight, image, diet, facts);
        
        console.log(dinoData); // should print dinos and a human
        console.log(typeof dinoData)
        
        // fill facts array for each dino with six facts
        for (let i = 0; i < dinoData.length; i++) {
            weight_data = dinoData[i].weightComp(user);
        }
        for (let i = 0; i < dinoData.length; i++) {
            height_data = dinoData[i].heightComp(user);
        }
        for (let i = 0; i < dinoData.length; i++) {
            diet_data = dinoData[i].dietComp(user);
        }
        for (let i = 0; i < dinoData.length; i++) {
            name_data = dinoData[i].nameComp(user);
        }
        
                
        // Now splice user/human into dinoData array; 
        dinoData.splice(4, 0, user); 

        let form = document.getElementById('dino-compare');
        // If dinoData has nine objects, then remove form
        if (dinoData.length == 9) {
            form.remove(); }
            return dinoData;
});


})();
