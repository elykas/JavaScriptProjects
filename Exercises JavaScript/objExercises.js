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
                    .map(f => f.friends);
const newYork = data.filter(f => f.address.city === "New York");
const olderThan30 = data.filter(d => d.age >= 30);
const friendsNames = data.flatMap(person => person.friends).map(friend => friend.name);
const getAllAdresses = data.map(p => {
    const { street, city, state, zip } = p.address;
    return `${street}, ${city}, ${state} ${zip}`;
});
const hobbies = data.map(h => h.hobbies)                       


console.log(getAllAdresses);
