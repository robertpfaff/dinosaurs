class Character {
    constructor(species, height, weight, image, when, where, wherewhen, diet, facts) {
        this.species = species;
        this.height = height;
        this.weight = weight;
        this.image = "/images" + this.species.toLowerCase() + ".png";
        this.when = when;
        this.where = where;
        this.wherewhen = `The ${this.species} lived in ${this.where}} during the ${this.when}`;
        this.diet = diet;
        this.facts = facts;
    }
}
 
class Dinosaur extends Character {
    constructor(species, height, weight, image, when, where, wherewhen, diet, facts) {
        super(species, height, weight, image, when, where, wherewhen, diet, facts);
    }
}
 
class HumanBeing extends Character {
    constructor(species, height, weight, image, diet, facts) {
        super(species, height, weight, image, diet, facts);
    }
}
 
// IIFE, so we don't leak dinoData to the outside world.
// I'm assuming the class definitions SHOULD be global,
// so they're not in the IIFE.
(() => {
    let dinoData = [];
 
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
            console.log(typeof dinoData);
        });
 
    let button = document.getElementById('btn');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        let species = document.getElementById('name').value; 
        let height_feet = Number(document.getElementById('feet').value) * 12; 
        let height_inches = Number(document.getElementById('inches').value); 
        let height = height_feet + height_inches;
        let weight = Number(document.getElementById('weight').value); 
        let diet = document.getElementById('diet').value; 
        let form = document.getElementById('dino-compare');
        let user = new HumanBeing(species, height, weight, image, diet, facts);
        
        // splice human data into dinoData 
        dinoData.splice(4, 0, user);
        console.log(dinoData); // should print dinos and a human
        
        // If dinoData not undefined, remove form
        if (dinoData.length == 9) {
            form.remove(); }
            return dinoData;
    });
})();
