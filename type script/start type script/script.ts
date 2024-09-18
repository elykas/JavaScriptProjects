console.log("ely");

const bigger : (num1: number, num2: number) => number =  (num1, num2) => {
    return num1 > num2 ? num1 : num2;
} ;

const biggelog : (num1: number, num2: number) => void =  (num1, num2) => {
         num1 > num2 ? console.log( num1) : console.log( num2)
} ;

const isOdd : (num:number) => string = (num) => {
    return num %2 === 0 ? "isOdd" : "isEven" 
}

const srtingLength : (str : string) => number = (str) =>{
    return str.length
}

const arrToN : (num : number) => number[] = (num) => {
    return Array.from({ length: num }, (_, i) => i + 1);
}

const maxNum: (numbers: number[]) => number = (numbers) => {
    return Math.max(...numbers);
};

interface Person {
    Name: string;
    Age: number;
    isStudent: boolean;
}

const person1: Person ={
    Name: "ely",
    Age:35,
    isStudent:true
}

const printPerson : (person:Person) => string = (person) => {
    
    return `Name: ${person.Name}, Age: ${person.Age}, isStudent: ${person.isStudent}`;
}
console.log(printPerson(person1));

const iMinor : (person :Person) => boolean = (person) => {
    return person.Age < 18;
}

// interface Book {
//     Title : string,
//      Author : string;
//     Year :number
// }

type Reader = Person & {
    favoriteBook :Book
}

const oldest: (readers:Reader[]) => Person = (readers) =>{
    return readers.reduce((oldest, current) => 
        (current.Age > oldest.Age ? current : oldest))
}

// const oldestBook: (readers: Reader[]) => Book | null = (readers) => {
//     if (readers.length === 0) return null; // Handle empty array

    // Use Array.reduce to find the book with the earliest publication year
//     const oldestBookReader: Reader = readers.reduce((oldest, current) =>
//         current.favoriteBook.Year < oldest.favoriteBook.Year ? current : oldest);
//     return oldestBookReader.favoriteBook;
// };


interface Address {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNum: number;
    zip: string;
}

class User{
    #_id:number = 0;
    #name : string = "";
    public Adress : Address = {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNum: 0,
        zip: ""
    };
    public phone:string = "";
    #email:string = "";
    #password:string = "";
    #CreateData: Date = new Date();
    #isAdmin:boolean = false;
    #IsBusiness:boolean = false




    public setPhone(phone: string): void {
        if (this.isPhoneValid(phone)) {
            this.phone = phone;
        } else {
            console.error('Invalid phone number');
        }
    }

    // Method to set email if valid
    public setEmail(email: string): void {
        if (this.isEmailValid(email)) {
            this.#email = email;
        } else {
            console.error('Invalid email address');
        }
    }

    // Method to set password if valid
    public setPassword(password: string): void {
        if (this.isPasswordValid(password)) {
            this.#password = password;
        } else {
            console.error('Invalid password');
        }
    }

    // Method to validate phone number
    private isPhoneValid(phone: string): boolean {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }

    // Method to validate email address
    private isEmailValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Method to validate password
    private isPasswordValid(password: string): boolean {
        return password.length >= 8;
    }
}