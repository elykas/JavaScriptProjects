const getUser =document.getElementById("get-user");
const userNameinput = document.getElementById("username");
const usercard = document.getElementById("user-info");

getUser.addEventListener("click", userName())

const userName = async() => {

    const user = input.value.trim();
    if(!user){
        alert('please enter a username')
        return
    }
    try{
        const response = await fetch(`https://api.github.com/users/${username}`)
        const data = await response.json();

        if(response.ok){
            diplayUserCard(data);
        }
        else{
            alert('user not found')
        }
    }
    catch(error){
        alert('Failed to fetch data. Please try again later.');
        console.error(error);
    }
    input.value ="";

}

const diplayUserCard = (user) => {
    const card = document.createElement("div")
    card.id = user.login;
    card.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login} Avatar">
            <h3>${user.login}</h3>
            <p>Public Repos: ${user.public_repos}</p>
        `;

        card.addEventListener('click', () => {
            window.open(user.html_url, '_blank');
        });

        userCards.appendChild(card);
    }
