"use strict";
console.log("ely");
const bigger = (num1, num2) => {
    return num1 > num2 ? num1 : num2;
};
const biggelog = (num1, num2) => {
    num1 > num2 ? console.log(num1) : console.log(num2);
};
const isOdd = (num) => {
    return num % 2 === 0 ? "isOdd" : "isEven";
};
const srtingLength = (str) => {
    return str.length;
};
const arrToN = (num) => {
    return Array.from({ length: num }, (_, i) => i + 1);
};
const maxNum = (numbers) => {
    return Math.max(...numbers);
};
const person1 = {
    Name: "ely",
    Age: 35,
    isStudent: true
};
const printPerson = (person) => {
    return `Name: ${person.Name}, Age: ${person.Age}, isStudent: ${person.isStudent}`;
};
console.log(printPerson(person1));
const iMinor = (person) => {
    return person.Age < 18;
};
const oldest = (readers) => {
    return readers.reduce((oldest, current) => (current.Age > oldest.Age ? current : oldest));
};
// const oldestBook: (readers: Reader[]) => Book | null = (readers) => {
//     if (readers.length === 0) return null; // Handle empty array
// Use Array.reduce to find the book with the earliest publication year
//     const oldestBookReader: Reader = readers.reduce((oldest, current) =>
//         current.favoriteBook.Year < oldest.favoriteBook.Year ? current : oldest);
//     return oldestBookReader.favoriteBook;
// };
