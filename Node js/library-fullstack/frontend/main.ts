import { User } from "../models/types";
import { loginFromApi } from "./services";


const submitLogin = (document.getElementById("submit-login")) as HTMLFormElement;
const submitRegister = (document.getElementById("submit-register")) as HTMLFormElement;
const loginPage = (document.getElementById("login-section"))as HTMLElement;
const listPage = (document.getElementById("bookList-page"))as HTMLElement;

const loginUser = () => {
    const userNameInput = (document.getElementById("userName-input")) as HTMLFormElement;
    const passwordInput = (document.getElementById("password-input")) as HTMLFormElement;

    const loginUser = loginFromApi(userNameInput,passwordInput);

    turnPage();
}

const turnPage = () => {
    loginPage.classList.toggle("hidden"); 
    listPage.classList.toggle("visible");
  };




export function createElement(tag: string, textContent: string, className: string): HTMLElement {
    const element = document.createElement(tag);
    element.textContent = textContent;
    element.className = className;
    return element;
  }


const renderBooks = async() => {
    const tableBody = (document.getElementById("table-body"))as HTMLElement;

    const booksList = await getAllBooksFromApi();
}

const saveToLocalStorage = (user:User): void => {
    localStorage.setItem('scooters', JSON.stringify(user));
  };
  
  const loadFromLocalStorage = ():{}  => {
    const storedScooters = localStorage.getItem('scooters');
    return storedScooters ? JSON.parse(storedScooters) : {}
  }
  

