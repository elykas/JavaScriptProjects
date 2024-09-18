const cars = ()=>{
    const car1 = createImage("./images/car1.png","cars")
    const car2 = createImage("./images/car2.png","cars")
    const car3 = createImage("./images/car3.png","cars")
    const car4 = createImage("./images/car4.png","cars")

    const listImages = [];
    listImages.push(car1,car2,car3,car4)
    return listImages
};

const createImage = (src,className = '') => {
    const image = document.createElement("img");
    image.src = src
    if(className){
        image.classList.add(className)
    }
    return image
};

const createDiv = (className = '') => {
    const div = document.createElement("div")
    div.classList.add(className);
    return div
};


const numberOfCars = () => {
    const input = document.getElementById("input-race");
    return parseInt(input.value,10);
};


let finishedCars = [];
let totalCars = 0;
let startTime;
let raceState = {};

const saveRaceState = () => {
    localStorage.setItem("raceState", JSON.stringify(raceState));
};

const loadRaceState = () => {
    const savedData = localStorage.getItem("raceState");
    if(savedData){
        raceState = JSON.parse(savedData);
        return true;
    }
    return false;
};

const saveRaceResults = () => {
    localStorage.setItem("raceResults", JSON.stringify(finishedCars));
};

const loadRaceResults = () => {
    const savedResults = localStorage.getItem("raceResults");
    if (savedResults) {
        finishedCars = JSON.parse(savedResults);
        displayPreviousResults();
    }
};


const result = () => {
    const resultDiv = document.getElementById("result-race");
    resultDiv.innerHTML = "";

    finishedCars.forEach((car, index) =>{
        const resultItem = createDiv("result");
        resultItem.textContent = `Place ${index + 1}: Car ${car.id} - Time: ${car.time.toFixed(2)} seconds`;
        resultDiv.appendChild(resultItem);
    });
    const resetButton = document.getElementById("reset-race-button")
    resetButton.style.display = "block";

    saveRaceResults();
};



const moveCar = (car,carId) => {
    let position = raceState[carId] ? raceState[carId].position : 0;
    let start = raceState[carId] ? raceState[carId].startTime : Date.now();
   
    const raceInterval = setInterval(() => {
        if (position >= 95) { 
            clearInterval(raceInterval); 
            const finishTime = (Date.now() - startTime) / 1000;
            if (!finishedCars.some(c => c.id === carId)) {
                finishedCars.push({id:carId,time:finishTime}); 
            }
            if (finishedCars.length === totalCars) {

                result(); 
            }
        } else {
            const randomSpeed = Math.random() * 2;
            position += randomSpeed; 
            car.style.paddingLeft = position + '%';
           
            raceState[carId] = {position, startTime: start};
            saveRaceState();
        }
    }, 100); 
};


const randerCars = () => {
    finishedCars = [];
    const carList = cars();
    const numOfCars = numberOfCars();
   
    if (numOfCars < 2 || numOfCars > 4 || isNaN(numOfCars)) {
        alert("Please enter a number between 2 and 4");
        return;
    }

    totalCars = numOfCars;
    const racesDiv = document.querySelector(".race-contain");
    racesDiv.innerHTML = '';
    const numRaces = carList.slice(0,numOfCars);

    numRaces.forEach((car,index) => {
        const carId = index +1;
        const race = createDiv("race-line");
        const redLine = createDiv("red-line");

        race.appendChild(redLine);
        race.appendChild(car);

        racesDiv.appendChild(race);

        if (raceState[carId]) {
            const savedPosition = raceState[carId].position;
            car.style.paddingLeft = savedPosition + '%';  
        }

        moveCar(car,carId);
    });

    startTime = Date.now();
    
};

const startRaceBuuton = document.getElementById("start-race-button");
startRaceBuuton.addEventListener("click",() => {
    // if (!loadRaceState()) {
        randerCars();
    // }
});

const resetButton = document.getElementById("reset-race-button");
resetButton.addEventListener("click",()=>{
    const racesDiv = document.querySelector(".race-contain");
    racesDiv.innerHTML = '';
    const resultDiv = document.getElementById("result-race");
    resultDiv.innerHTML = "";
    resetButton.style.display = "none";
    localStorage.removeItem("raceResults");
    localStorage.removeItem("raceState");

    raceState = {};
    finishedCars = [];
    const input = document.getElementById("input-race");
    input.value = "";

});


const displayPreviousResults = () => {
    const resultDiv = document.getElementById("result-race");
    resultDiv.innerHTML = "";
    finishedCars.forEach((car, index) => {
        const resultItem = createDiv("result");
        resultItem.textContent = `Place ${index + 1}: Car ${car.id} - Time: ${car.time.toFixed(2)} seconds`;
        resultDiv.appendChild(resultItem);
    });
    const resetButton = document.getElementById("reset-race-button")
    resetButton.style.display = "block";
};

window.addEventListener("load", () => {
    loadRaceResults()});
//     if(loadRaceState()){
//          randerCars();
//      }
// });


    



