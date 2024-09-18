const input = document.getElementById("input-search")
const searchBtn = document.getElementById("search-button")
const nextBtm = document.getElementById("previous-button")
const backBtn = document.getElementById("back-button")
const card = document.getElementById("card")
const autocompleteList =document.getElementById("autocomplete-list");

let pokemonsNames =[];

const fetchPokemonList = async() =>{
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
        const data = await response.json();
        pokemonsNames = data.results.map(p => p.name);

    }catch(error){
        console.error(error)
    }
}

fetchPokemonList();

input.addEventListener('input',()=>{
    debugger
    const query = input.value.toLowerCase();
    autocompleteList.textContent =  '';
    if(query){
        let filteredList = pokemonsNames.filter(p => p.startsWith(query))
         const slicedList = filteredList.slice(0,10)
         slicedList.forEach(pokemon => {
            const paragr = document.createElement("p")
            paragr.textContent = pokemon
            paragr.addEventListener('click',()=>{
                input.value =pokemon;
                autocompleteList.textContent = '';
                autocompleteList.style.display = 'none'; 
                fetchPokemon(pokemon);
                input.value = ''
            })
            autocompleteList.appendChild(paragr)
            autocompleteList.style.display = "block"
        })
    }else{
    autocompleteList.style.display = "none"
   
}
})

let currentPokemon = 1;

const fetchPokemon = async(pokemon) => {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if(!response.ok){
            throw new Error("didn't find");
            
        }

        const data = await response.json();
        displayPokemon(data);
    }
    catch(error){
        console.error(error)
    }
}

const displayPokemon = (data) => {
    currentPokemon = data.id;
    const types = data.types.map(typeInfo => typeInfo.type.name).join(", ");
    card.textContent = `${data.name} ${types} ${data.height}
                        ${data.weight} `
}

searchBtn.addEventListener("click", () => {
    const query =input.value
    if(query){
        fetchPokemon(query)
    }else{
        alert("enter a pokemon")
    }
    input.value = "";
})

nextBtm.addEventListener("click",() => {
     currentPokemon += 1;
    fetchPokemon(currentPokemon)
})

backBtn.addEventListener("click",() => {
    debugger
    currentPokemon -= 1;
   fetchPokemon(currentPokemon)
})

