const data = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: 10001
      },
      hobbies: ["reading", "running", "gaming"],
      friends: [
        {
          id: 2,
          name: "Jane Smith",
          age: 25
        },
        {
          id: 3,
          name: "Bob Johnson",
          age: 35
        }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      address: {
        street: "456 Park Ave",
        city: "Los Angeles",
        state: "CA",
        zip: 90001
      },
      hobbies: ["hiking", "cooking", "traveling"],
      friends: [
        {
          id: 1,
          name: "John Doe",
          age: 30
        },
        {
          id: 4,
          name: "Samantha Brown",
          age: 28
        }
      ]
    },
    {
      id: 3,
      name: "Bob Johnson",
      age: 35,
      address: {
        street: "789 Elm St",
        city: "Chicago",
        state: "IL",
        zip: 60001
      },
      hobbies: ["fishing", "golfing", "watching TV"],
      friends: [
        {
          id: 1,
          name: "John Doe",
          age: 30
        },
        {
          id: 5,
          name: "Emily Davis",
          age: 32
        }
      ]
    }
  ];


const friends = data.filter(f => f.name === "John Doe")
                    .flatMap(f => f.friends)
                    
const newYork = data.filter(f => f.address.city === "New York");
const olderThan30 = data.filter(d => d.age >= 30);
const friendsNames = data.flatMap(person => person.friends).map(friend => friend.name);
const getAllAdresses = data.map(p => {
    const { street, city, state, zip } = p.address;
    return `${street}, ${city}, ${state} ${zip}`;
});
const hobbies = data.map(h => h.hobbies)   

const livesInChicago = data.find(p => p.address.city === "Chicago");
const older30 = data.find(p => p.age > 30);
const hobbieReading = data.find(p => p.hobbies.includes("reading"))


data.forEach(p => {
  console.log(p.name);});

data.forEach(p => {
  p.IsAdult = p.age > 18;
});
console.log(data);

data.forEach(p => {
  console.log(p.name + " " +p.friends.map(f => f.name));
  
})

const isCooking = data.some(p => p.hobbies.includes("cooking"));

const isLivesInCalifornia = data.some(p => p.address.city === ("California"));
const old30 = data.some(p => p.age > 30)
const allReading = data.every(p => p.hobbies.includes("reading"));
const sameState = data.every(p => p.address.state === data[0].address.state)

console.log(sameState);





  



 
