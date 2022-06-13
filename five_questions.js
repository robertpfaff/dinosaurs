// Total Count ---------------------------------------------
let json_init = {method:'GET',
                 headers: {
                    'Content-Type': 'application/json'
                 },
                 mode: 'cors',
                 cache: 'default' };

let json_request = new Request("http://192.168.4.71:2000/nasaData.json", json_init);

fetch(json_request)
.then(function(resp) {
    return resp.json();
})
.then(function(data) {
    console.log(data);
    amount = data.element_count;
    // 1. How many near-earth objects did NASA register for the date of the search? Return the asteroid count.
    console.log("Number Near Earth Objects:")
    console.log(amount);

    console.log("Absolute Magnitudes:")

    let magArray1 = [];

    for (let i = 0; i < 14; i++) {
        magArray1.push(data.near_earth_objects["2019-12-01"][i].absolute_magnitude_h)
    };

    console.log("First Magnitude Array:");
    console.log(magArray1);

    let magArray2 = [];

    for (let i = 0; i < 11; i++) {
        magArray2.push(data.near_earth_objects["2019-12-02"][i].absolute_magnitude_h)
    };

    console.log("Second Magnitude Array:");
    console.log(magArray2);

    // Merge two arrays
    magArray1.push(...magArray2);

    console.log("Merged Magnitude Array:");
    console.log(magArray1);

    // 2. What was the average absolute magnitude of all the near earth objects in this data set? Return the average absolute_magnitude_h.
    const average = magArray1.reduce((previous, current) => previous + current, 0)/magArray1.length;
    console.log("Near Earth Objects: Average Absolute Magnitude:")
    console.log(parseFloat(average).toFixed(4));

    // 3. is potentially dangerous??
    let hazardous = [];

    const data_source120219 = data.near_earth_objects["2019-12-02"];

    data_source120219.map(item => { if (item.is_potentially_hazardous_asteroid == true) {
        hazardous.push(Object.entries(item));
    }});

    const data_source120119 = data.near_earth_objects["2019-12-01"];

    data_source120119.map(item => { if (item.is_potentially_hazardous_asteroid == true) {
        hazardous.push(Object.entries(item));
    }});

    console.log("Potentially Hazardous Asteroids: December 01-02, 2019:");
    console.log(hazardous);

    // 4. A list of all objects (their id, name, max size in miles, and closest approach in miles) that have a miss_distance of less than 900,000 miles.
    const missedDistanceMiles = data.near_earth_objects["2019-12-02"];
    missedDistanceMiles.map(item => { if (item.close_approach_data.missed_distance.miles < 900000) {
    console.log(item)}});

});



// Too Close for Comfort -----------------------------------
// 4. A list of all objects (their id, name, max size in miles, and closest approach in miles) that have a miss_distance of less than 900,000 miles

// Alert ---------------------------------------------------
// 5. Of all the near-earth objects for this date, find the time that the asteroid with the nearest miss will be closest to earth. 

