const cars = [
    {
      "model": "Toyota Corolla",
      "year": 2022,
      "color": "White"
    },
    {
      "model": "Honda Civic",
      "year": 2021,
      "color": "Black"
    },
    {
      "model": "Ford Mustang",
      "year": 2023,
      "color": "Red"
    },
    {
      "model": "Chevrolet Camaro",
      "year": 2020,
      "color": "Blue"
    },
    {
      "model": "Tesla Model 3",
      "year": 2024,
      "color": "Silver"
    },
    {
      "model": "BMW 3 Series",
      "year": 2022,
      "color": "Gray"
    },
    {
      "model": "Audi A4",
      "year": 2021,
      "color": "Black"
    },
    {
      "model": "Mercedes-Benz C-Class",
      "year": 2023,
      "color": "White"
    },
    {
      "model": "Mazda 6",
      "year": 2020,
      "color": "Blue"
    },
    {
      "model": "Volkswagen Passat",
      "year": 2022,
      "color": "Red"
    },
    {
      "model": "Subaru Impreza",
      "year": 2021,
      "color": "Green"
    },
    {
      "model": "Hyundai Elantra",
      "year": 2020,
      "color": "Silver"
    },
    {
      "model": "Kia Optima",
      "year": 2020}
    ];

    const mainDiv = document.getElementById("main-div-cars");
    mainDiv.style.border = "1px solid black";
    mainDiv.style.padding = "10px"; 
    
    const inputcar = document.createElement("input");
    inputcar.placeholder = "Search for a car model..."; 
    mainDiv.appendChild(inputcar);
    
    const resultsDiv = document.createElement("div");
    mainDiv.appendChild(resultsDiv); 
    
    const searchCars = () => {
        const search = inputcar.value.toLowerCase();
        resultsDiv.innerHTML = ''; 
    
        const filteredCars = cars.filter(car =>
            car.model.toLowerCase().includes(search)
        );
    
        filteredCars.forEach(car => {
            const carDiv = document.createElement("div");
            carDiv.textContent = `${car.model} - ${car.year} - ${car.color}`;
            resultsDiv.appendChild(carDiv);
        });
    };
    
    inputcar.addEventListener("input", searchCars);