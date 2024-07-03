// When the #search-input element contains the value Red and the #search-button element is clicked, an alert should appear with the text "Pokémon not found"
// When the #search-input element contains the value Pikachu and the #search-button element is clicked, the values in the #pokemon-name, #pokemon-id, #weight, #height, #hp, #attack, #defense, #special-attack, #special-defense, and #speed elements should be PIKACHU, #25 or 25, Weight: 60 or 60, Height: 4 or 4, 35, 55, 40, 50, 50, and 90, respectively
// When the #search-input element contains the value Pikachu and the #search-button element is clicked, you should add an img element with the id of "sprite" and the src set to the Pokémon's front_default sprite to the page
// When the #search-input element contains the value Pikachu and the #search-button element is clicked, the #types element should contain a single inner element with the value ELECTRIC. The #types element content should be cleared between searches
// When the #search-input element contains the value 94 and the #search-button element is clicked, the values in the #pokemon-name, #pokemon-id, #weight, #height, #hp, #attack, #defense, #special-attack, #special-defense, and #speedelements should be GENGAR, #94 or 94, Weight: 405 or 405, Height: 15 or 15, 60, 65, 60, 130, 75, and 110, respectively
// When the #search-input element contains the value 94 and the #search-button element is clicked, you should add an img element with the id of sprite and the src set to the Pokémon's front_default sprite to the page
// When the #search-input element contains the value 94 and the #search-button element is clicked, the #types element should contain two inner elements with the text values GHOST and POISON, respectively. The #types element content should be cleared between searches

const userInput = document.getElementById("search-input");
const searchButton= document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes  = document.getElementById("types");
const pokemonHP = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSPattack = document.getElementById("special-attack");
const pokemonSPdefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonImage = document.getElementById("image");



searchButton.addEventListener("click", () =>{
    if(userInput.value === "Red" || userInput.value === ""){
        alert("Pokemon not found")
    }
    else{
        // if(/[1-9]+/.test(userInput)){
        //     fetchData(parseInt(userInput.value))
        // }else{
        //     fetchData(userInput.value);
        // }
        fetchData(userInput.value.toLowerCase());
        
    }
})




const fetchData = async(userInput) =>{
    try{
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${userInput}`)
        const data = await res.json()
        console.log(data)
        extractData(data);

        
    }   
    catch(err){
        alert(err);
    }
}

// fetchData(1);

const extractData = (data) =>{
    const {height, weight, id, name, stats, sprites, types}= data;
    console.log(height, weight, id, name, stats, sprites, types)
    //stat is an array  object which contain all the information of hp, attack, defense, sp. attack, sp. defense, speed (retrieve it from the value of base_stat)
    //type is also an array object which contain the tye type.name
    // const {id, name, url} = results;

    pokemonName.innerHTML = `<h3>${name.toUpperCase()}</h3>`
    pokemonId.innerHTML = `<h3>#${id}</h3>`
    pokemonWeight.innerHTML = `<p>Height: ${height}</p>`
    pokemonHeight.innerHTML = `<p>Weight: ${weight}</p>`
    pokemonImage.innerHTML = `<img src="${sprites.front_default}" alt="Image of ${name}"/>`

    types.forEach(element => {
        const styles ={
            backgroundColor: element.type.name === "grass" ? 
                             "green" : element.type.name === "poison" ?
                             "purple" : element.type.name === "electric" ? 
                             "yellow" : element.type.name === "water"?
                             "blue" : "gray",
            padding: "1rem",
            borderRadius: "1.4rem",
 
        }
        pokemonTypes.innerHTML += `<h4 style="background-color: ${styles.backgroundColor}; padding: ${styles.padding}; border-radius: ${styles.borderRadius};">${element.type.name.toUpperCase()}</h4>`
        
    })

    pokemonHP.textContent = stats[0].base_stat
    pokemonAttack.textContent = stats[1].base_stat
    pokemonDefense.textContent = stats[2].base_stat
    pokemonSPattack.textContent =stats[3].base_stat
    pokemonSPdefense.textContent = stats[4].base_stat
    pokemonSpeed.textContent =stats[5].base_stat 
}

//Display the pokemon list in case user forget or dunt even know what to search
const listName = document.getElementById("pokemon-list-name");
const listId = document.getElementById("pokemon-list-id");
const openList = document.getElementById("go-pokemon-list");
const list = document.getElementById("pokemon-list");
const listImage = document.getElementById("pokemon-list-image");

openList.addEventListener("click", ()=>{
    fetchList();
})
const fetchList = async() => {
    try{
        const res = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
        const data = await res.json()
        console.log("raw data:", data)
        displayList(data);
    }
    catch(err){
        console.log(err)
    }
}

const displayList = async(data) =>{
    const {results}= data;
    
    //const {height, weight, id, name, stats, sprites, types}= data;
    results.forEach((element, index) => {
        if(index <= 100){
            //retrieve the url from the 
            // const retrieveImage = fetch(element.url).json();
            // const {sprites} = retrieveImage;
            listName.innerHTML += `<h5>${element.name}</h5>`;
            listId.innerHTML += `<h5>${element.id}</h5>`;
            // listImage.innerHTML += `<img src="${element.url.sprites.front_default}"/>`;
        }  
        
    })
    list.style.display ="flex"
}

const closeListButton = document.getElementById("closeList");

closeListButton.addEventListener("click", ()=>{
    list.style.display ="none"
})



