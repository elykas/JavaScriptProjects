const users = [
    { email: "user1@example.com", password: "0001" },
    { email: "user2@example.com", password: "0002" },
    { email: "user3@example.com", password: "0003" },
    { email: "user4@example.com", password: "0003" },
];
  
const cardPage = document.getElementsByClassName("card-page")[0];
const loginPage = document.getElementsByClassName("login-page")[0]; 
const emailInput = document.getElementById("email-text");
const passwordInput = document.getElementById("password-text");
const loginButton = document.getElementById("button-login");
const logOutButton = document.getElementById("logout-button");
const darkMode = document.getElementById("mode-button");


const saveUserToLocalStorage = (user) => {
    localStorage.setItem("users", JSON.stringify(user));
};

const loadUserFromLocalStorage = () => {
    const user = localStorage.getItem("users");
    if (user) {
        return JSON.parse(user);
    }
    return null;
};

const validLogin = () => {
    
    const user = users.find(u => u.email === emailInput.value);

    if(user && user.password === passwordInput.value){
        return true;
    }
    return false;
};


const loginAndTurnPage = (event) => {
    event.preventDefault();
    if (validLogin()) {
        saveUserToLocalStorage({
            email:emailInput.value , 
            password: passwordInput.value
        })
        
        loginPage.style.display = "none";  
        cardPage.style.display = "flex";  
        emailInput.value = "";
        passwordInput.value = "";
    } else {
        showModal("Invalid login. Please check your email and password.");
    }
};


const showModal = (message) => {
    const modal = document.getElementById("error-modal");
    const modalMessage = document.getElementById("modal-message");
    const closeButton = document.querySelector(".close-button");

    modalMessage.textContent = message;

    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
    }, 15000);

    closeButton.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
};

const logOut = () =>{
    localStorage.removeItem("users");
    
    cardPage.style.display = "none";  
    loginPage.style.display = "flex";  
}


const checkIfLogin = () => {
    const user = loadUserFromLocalStorage();
    if(user){
        cardPage.style.display = "flex";
        loginPage.style.display = "none"
    }
};

const turnToDarkModel = () => {
    document.body.classList.toggle("dark")
}

loginButton.addEventListener("click",loginAndTurnPage)
logOutButton.addEventListener("click", logOut);
darkMode.addEventListener("click", turnToDarkModel)
window.addEventListener("load", checkIfLogin);


