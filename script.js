/***   Variable     ***/
let currentPokemon;
let loadNrPokemon = 20;
let loadMorePokemon = 0;
let trigger = false;
let noMoreLoading = false;


/***    Objects     ****/
let objColors = {
    normal: "#BBBBAD",
    grass: "#48D0B0",
    fire: "#FB6D6C",
    water: "#76BDFD",
    fighting: "#A55744",
    flying: "#7AA4FF",

    poison: "#A95EA1",
    ground: "peru",
    rock: "#CEBC72",
    bug: "#C2D11E",
    ghost: "#7973D5",
    electric: "#FFD86F",

    psychic: "#FE64B3",
    ice: "#95F1FE",
    dragon: "#8C76FF",
    dark: "#8B6653",
    steel: "#C4C2DA",
    fairy: "#FBACFF",
};

/***    Array       ***/
let currentPokemonArray = [];
let searchPokemonArray = [];
let backupArray = [];
let baseStats = [{
    'HP': '',
    'Attack': '',
    'Defense': '',
    'Special-Attack': '',
    'Special-Defense': '',
    'Speed': '',
}];

/***    Functions   ***/

//Card Deck - Function
function init() { // If the screen is "big", then initial load provide 40 Pokemons
    if (screen.width < 1060) {
        loadPokemonList();
        createBackpup();
    } else {
        loadNrPokemon = 40;
        loadPokemonList();
        createBackpup();
    }
}


async function loadPokemonList() {
    for (let i = 1; i <= loadNrPokemon; i++) {
        if (loadMorePokemon < loadNrPokemon) {
            await loadPokemon(i);
        } else {
            await loadMorePokemonList(i);
            loadNrPokemon += 20;
            break
        }
    }
    if (loadMorePokemon < loadNrPokemon) {
        generateCardDiv();
        renderPokemonInfo();
    }
}


async function loadPokemon(i) { //  Initial download the infos from API
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    moveToArray();
}


async function loadMorePokemonList() { //   Follow up download
    for (let i = loadNrPokemon + 1; i <= loadMorePokemon; i++) {
        await loadPokemon(i);
    }
    await generateMoreCardDiv();
    await renderMorePokemonInfo();
}


async function moveToArray() {
    await currentPokemonArray.push(currentPokemon);
}



//Search for pokemon
function searchPokemon(event) {
    noMoreLoading = true; //Stops the loading of more Pokemons
    let searchInput = event.target.value.toLowerCase();
    let filterPokemon = backupArray.filter((pokemon) => {
        return (pokemon['name'].toLowerCase().includes(searchInput));
    })
    displaySearchOnly(filterPokemon);
    searchIsActive();
    if (searchInput.length == 0) {
        noMoreLoading = false; //Allows to load more Pokemon if "Search" is empty
    }
}


function searchIsActive() {
    resetCurrentArray();
    let a = searchPokemonArray.length;
    let b = currentPokemonArray.length;
    let c = backupArray.length;
    if (a < b && a > 0) {
        currentPokemonArray = searchPokemonArray;
    }
}


function resetCurrentArray() {
    currentPokemonArray = backupArray;
}


function clearSearch(event) {
    searchInput = 0;
    searchIsActive();
    searchPokemon(event)
}


function displaySearchOnly(filterPokemon) {
    searchPokemonArray = filterPokemon;
    clearCardDisplay();
    showSearchedPokemon()
}


function clearCardDisplay() {
    let card_container = document.getElementById('cards__wrapper');
    card_container.innerHTML = ``;
}


function showSearchedPokemon() {
    let card_container = document.getElementById('cards__wrapper');
    generateSearchCardDiv();
    renderPokemonSearch();
}


function generateSearchCardDiv() {
    let card_container = document.getElementById('cards__wrapper');
    for (let i = 0; i < searchPokemonArray.length; i++) {
        card_container.innerHTML += templateCardDiv(i);
    }
}


function renderPokemonSearch() {
    for (let i = 0; i < searchPokemonArray.length; i++) {
        searchBaseInfo(i);
        searchShowElement(i);
        searchShowPhoto(i);
    }
}


function searchBaseInfo(i) {
    let name = searchPokemonArray[i]['name'];
    let Name = capitalizeFirstLetter(name);
    let ID = searchPokemonArray[i]['id'];
    document.getElementById('info__id-' + i).innerHTML = ID + '#';
    document.getElementById('info__name-' + i).innerHTML = Name;
}


function searchShowElement(i) {
    let elementsHTML = document.getElementById('card__container--elements-' + i);
    elementsHTML.innerHTML = '';
    let elementsJSON = searchPokemonArray[i]['types'];
    for (let j = 0; j < elementsJSON.length; j++) {
        let typeElement = elementsJSON[j]['type']['name'];
        elementsHTML.innerHTML += templateTypeElement(typeElement, i, j);
        chooseColorElement(typeElement, i, j);
    }
}


function searchShowPhoto(i) {
    let pokemonImg = searchPokemonArray[i]['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('card__container--img-' + i).innerHTML += `<img src="${pokemonImg}">`;
}


//The function add blur in the background
function addBlur() {
    document.getElementById('cards__wrapper').classList.add('blur');
}


//The function creates a Backup Array
function createBackpup() {
    backupArray = currentPokemonArray;
}


/***    The functions are changing the Background Color of the HTML Elements    ***/
function chooseColorElement(typeElement, i, j) {
    const colorArray = Object.entries(objColors);
    let type_name = '';
    for (let z = 0; z < colorArray.length; z++) {
        if (typeElement == colorArray[z][0]) {
            let color = colorArray[z][1];
            document.getElementById('type__element--id-' + i + '-' + j).style.backgroundColor = (color);
        }
    }
    chooseColorBackground(i);
}


function chooseColorElementStats(typeElement, i, j) {
    const colorArray = Object.entries(objColors);
    let type_name = '';
    for (let z = 0; z < colorArray.length; z++) {
        if (typeElement == colorArray[z][0]) {
            let color = colorArray[z][1];
            document.getElementById('stats__type__element--id-' + i + '-' + j).style.backgroundColor = (color);
        }
    }
    chooseColorBackgroundStats(i);
}


function chooseColorBackground(i) {
    let bgColor = document.getElementById('type__element--id-' + i + '-0').style.backgroundColor;
    var r = document.querySelector(':root');
    document.getElementById('card__container-' + i).style.setProperty('--base-color', bgColor);
}


function chooseColorBackgroundStats(i) {
    let bgColor = document.getElementById('stats__type__element--id-' + i + '-0').style.backgroundColor;
    var r = document.querySelector(':root');
    document.getElementById('stats__show--id-' + i).style.setProperty('--base-color', bgColor);
}