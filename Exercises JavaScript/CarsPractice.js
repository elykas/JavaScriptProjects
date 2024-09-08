const carStore = {
    staff: {
      manager: {
        name: "Yossi Nissan",
        salary: 40000,
        phone: "+972-524-385-937",
      },
      workers: [
        {
          name: "Guy Peretz",
          salary: 4000,
          role: "Clerk",
        },
        {
          name: "Ronen Haim",
          salary: 9000,
          role: "Agent",
        },
        {
          name: "Idan Avinoam",
          salary: 7000,
          role: "Agent",
        },
        {
          name: "Ohad Rot",
          salary: 28500,
          role: "Agent",
        },
      ],
    },
    cars: [
      {
        type: "Lamborghini Diabolo VT 6.0",
        price: "1000000$",
        color: "Red",
      },
      {
        type: "Mercedes",
        price: "100000$",
        color: "Red",
      },
      {
        type: "Honda",
        price: "20000$",
        color: "black",
      },
      {
        type: "Honda",
        price: "21000$",
        color: "blue",
      },
    ],
  };

  const getManagerDetails = store => `${store.staff.manager.name}
                                    ${store.staff.manager.salary} 
                                        ${store.staff.manager.phone}`;

  const getAmountOfCars = carStore => carStore.cars.length;

  const getAmountPayed = carStore => carStore.workers.staff.workers
                        .reruce((highest,worker) => worker.salary > highest.salary ? worker : highest)

  const getMostExpensiveCar = store => store.cars
                        .reduce((exp, car) => 
                            parseFloat(car.price.replace(/[$,]/g, '')) >
                             parseFloat(exp.price.replace(/[$,]/g, '')) ? car : exp);
  console.log(getMostExpensiveCar(carStore));

  const getMostExpensive = store => { 
    const mostExpensiveCar =store.cars
        .reduce((exp, car) => 
        parseFloat(car.price.replace(/[$,]/g, '')) >
        parseFloat(exp.price.replace(/[$,]/g, '')) ? car : exp);
        return `${mostExpensiveCar.type} ${mostExpensiveCar.price}`;
}

const Honda = store => 
     store.cars
    .filter(c => c.name === "Honda")
    .length


console.log(Honda(carStore));
