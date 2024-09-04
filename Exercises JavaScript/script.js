let lastName = "ely";
const FIRST_NAME = "ely";
console.log(lastName);
let word = 'jbfivbdavb'
let sub = word.substring(1,3)
let subs = word.substring(1)
let char = word.charAt(4);
let index = word.indexOf("t");
let slice = word.slice(0,3);
let trim = word.trim();//take out space betwwen
console.log(sub);
console.log(subs);
console.log(char);
console.log(index);
console.log(slice);

let str = 'x'
let long = 'aaaaaaaaaaaaaaa'
let n = Math.floor(long.length / 2)
let sli = long.substring(0,n)
let sl = long.substring(n)
let x = str + sli +str + sl +str
console.log(x);
console.log(n);

// let numSiblings = prompt('How many siblings doy you have');
// let a = (typeof numSiblings)
// let num = (parseInt(numSiblings))
// console.log(num);

// if(num === "1"){
//     console.log('1 sibling');
    
// }else if(numSiblings > 1){
//     console.log('more tha 1 sibling');
    
// }
// else{
//     console.log("No siblings");
    
// }


let john = [89,120,103]
let mike = [116,94,123]
let merry = [110,95,130]
let avgJohn = john.reduce((sum,value) => sum + value,0)/john.length
let avgMike = mike.reduce((sum,value) => sum + value,0)/mike.length
let avg = merry.reduce((total, value) => total + value, 0)/merry.length
let max = Math.max(avgJohn,avgMike,avg)



let winner = avgJohn === max ? 'john' : 
        avgMike === max? 'mike':'merry';
let win = avgJohn > avgMike ? avgJohn : avgMike;
console.log(`${winner} ${max}`);

function removeDuplicates(arr) {
    return arr.reduce((a, n) => a.includes(n) ? a : [...a, n], []);
  }

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); 


let obj = {
    name: 'david',
    age:32
  }
  let copy = obj

  obj.name = 'ohad'
  copy.name = 'ely'

  console.log(copy)
  console.log(obj)



const people = ["Greg","Mary","Devon","James"]
const removeGreg = people.slice(1)
const removeJames = people.slice(0,people.length - 1)
const AddMatt = people.reduce((c,n) => [...c,n],["Matt"]);
const addName = people.push("elly");
const copyWithoutMary = people.reduce((a, c) => (c === "Mary" ?a : [...a,c]), []);
const indexOfMarry = people.indexOf("Mary");
const indexOfFoo = people.indexOf("Foo");
const redfine = people.splice(2,1,"Elizabeth","Artie");
const withBob = people.push("Bob")
console.log();

const fruits=["Banana","Orange","Apple","Mango"];
fruits.splice(2,0,"Lemon","Kiwi")
console.log(fruits);

const food1 = ["Noodle", "Pasta", "Ice-cream", "Meat", "Cucumber", "Olives"];
const food2 = ["Fries", "Ice-cream", "Pizza", "Olives", "Hamburgers"];

const equals = food1.some(f => food2.includes(f));
console.log(equals);

const myCountry = {
    country:"Brazil",
    capital:"Sao Paulo",
    language:"portugese",
    population:3000000,
    neighbours:'Argentina'
}

myCountry.d

















