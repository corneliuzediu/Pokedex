//Variables
let selectedPokemon;

//Generate de HTML Element
function generateStatsDiv(i) {
    let stats_container = document.getElementById('stats__container');
    stats_container.innerHTML = ``;
    stats_container.innerHTML = templateCardStatDiv(i);
}

//Fill the HTML Elements
function pokemonStats(i) {
    selectedPokemon = i;
    if (trigger == false) {
        showMoreInfoOnClick(i);
    } else {
        showBaseStatsOnClick(i);
    }
}


async function showMoreInfoOnClick(i) {
    await searchIsActive();
    document.getElementById('stats__wrapper').classList.remove('d-none');
    generateStatsDiv(i);
    generateBaseStats();
    statsBaseInfo(i);
    statsShowPhoto(i);
    statsShowElement(i);
    showMoreInfo();
    getMoreInfo(i);
    getBaseStats(i);
    stopScroll();
    addBlur();
}


async function showBaseStatsOnClick(i) {
    await searchIsActive();
    document.getElementById('stats__wrapper').classList.remove('d-none');
    generateStatsDiv(i);
    generateBaseStats();
    statsBaseInfo(i);
    statsShowPhoto(i);
    statsShowElement(i);
    getMoreInfo(i);
    getBaseStats(i);
    stopScroll();
}


function stopScroll() { // Stop scrolling the background
    let holder = document.getElementById('stats__wrapper').classList.contains('d-none');
    if (!holder) {
        document.querySelector('body').style.overflowY = ('hidden');
    }
}


function statsBaseInfo(i) { // Show Name and ID
    let name = currentPokemonArray[i]['name'];
    let Name = capitalizeFirstLetter(name);
    document.getElementById('stats__info__id-' + i).innerHTML = currentPokemonArray[i]['id'] + '#';
    document.getElementById('stats__info__name-' + i).innerHTML = Name;
}


function statsShowPhoto(i) { // Show Images 
    let pokemonImg = currentPokemonArray[i]['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('stats__img-1--img-' + i).innerHTML += `<img src="${pokemonImg}">`;
    document.getElementById('stats__img-2--img-' + i).innerHTML += `<img src="${pokemonImg}">`;
}


function statsShowElement(i) { // Show coresponding type element
    let elementsHTML = document.getElementById('stats__card__container--elements-' + i);
    elementsHTML.innerHTML = '';
    let elementsJSON = currentPokemonArray[i]['types'];
    for (let j = 0; j < elementsJSON.length; j++) {
        let typeElement = elementsJSON[j]['type']['name'];
        elementsHTML.innerHTML += templateTypeElementStats(typeElement, i, j);
        chooseColorElementStats(typeElement, i, j)
    }
}


function getMoreInfo(i) { // Call the functions that provide more infos
    getSpecies(i);
    getHeight(i);
    getWeight(i);
    getAbilities(i);
}


function showMoreInfo() { // Show the container with more infos 
    document.getElementById('more__info--container').classList.remove('d-none');
    document.getElementById('base__stats--container').classList.add('d-none');
    trigger = false;
    backgroundStatsSwich();
}


function backgroundStatsSwich() { // Changes the bg from the MI and BS  buttons 
    if (trigger == false) {
        document.getElementById('more__info--button').style.backgroundColor = ('unset');
        document.getElementById('base__stats--button').style.backgroundColor = ('rgba(0, 0, 0, 0.1');
    } else if (trigger == true) {
        document.getElementById('more__info--button').style.backgroundColor = ('rgba(0, 0, 0, 0.1');
        document.getElementById('base__stats--button').style.backgroundColor = ('unset');
    }
}


function showBaseStats(i) { // Shows the container with base stats
    document.getElementById('base__stats--container').classList.remove('d-none');
    document.getElementById('more__info--container').classList.add('d-none');
    generateBaseStats();
    trigger = true;
    backgroundStatsSwich();
}


function getBaseStats(i) { // Call the functions that provide the base stats
    getHP(i);
    getAttack(i);
    getDefense(i);
    getSpecialAttack(i);
    getSpecialDefense(i);
    getSpeed(i);
    generateBaseStats()
}


function getSpecies(i) { // Provide Species DATA
    let species = currentPokemonArray[i]['species']['name'];
    document.getElementById('species--id-' + i).innerHTML = `<h3>Species:</h3>  <p><b>${species}</b></p>`;
}


function getHeight(i) { // Provide Height DATA
    let height = currentPokemonArray[i]['height'];
    document.getElementById('height--id-' + i).innerHTML = `<h3>Height: </h3> <p><b>${height}</b></p>`;
}


function getWeight(i) { // Provide Weight DATA
    let weight = currentPokemonArray[i]['weight'];
    document.getElementById('weight--id-' + i).innerHTML = `<h3>Weight:</h3>  <p><b>${weight}</b></p>`;
}


function getAbilities(i) { // Provide Ability DATA
    let abilities = currentPokemonArray[i]['abilities'];
    let abilitiesHTML = document.getElementById('abilities--id-' + i);
    abilitiesHTML.innerHTML = `<h3>Abilities:</h3> `
    for (let j = 0; j < abilities.length; j++) {
        let holder = abilities[j]['ability']['name'];
        if (j < abilities.length - 1) { //Initial or midle ability template
            abilitiesHTML.innerHTML += `<p><b>${holder}</b> and  </p>`;
        } else { // Last ability template
            abilitiesHTML.innerHTML += `<p><b>${holder}</b>.</p>`;
        }
    }
}


// Base Stats Indicators
function generateBaseStats() {
    let baseStatsHTML = document.getElementById('base__stats--container');
    baseStatsHTML.innerHTML = templateBaseStats(baseStats);
}


function getHP(i) { //Provide HP DATA
    let HP = currentPokemonArray[i]['stats'][0]['base_stat'];
    baseStats['HP'] = HP;
}


function getAttack(i) { // Provide Attack DATA
    let attack = currentPokemonArray[i]['stats'][1]['base_stat'];
    baseStats['Attack'] = attack;
}


function getDefense(i) { // Provide Defense DATA
    let defense = currentPokemonArray[i]['stats'][2]['base_stat'];
    baseStats['Defense'] = defense;
}


function getSpecialAttack(i) { // Provide Special Attack DATA
    let sAttack = currentPokemonArray[i]['stats'][3]['base_stat'];
    baseStats['Special-Attack'] = sAttack;
}


function getSpecialDefense(i) { // Provide Special Defense DATA
    let sDefense = currentPokemonArray[i]['stats'][4]['base_stat'];
    baseStats['Special-Defense'] = sDefense;
}


function getSpeed(i) {  // Provide Speed DATA
    let speed = currentPokemonArray[i]['stats'][5]['base_stat'];
    baseStats['Speed'] = speed;
}


//Manipulates the Pokemon Card Stats
function goPrevious(i) {
    if (i > 0) {
        i--;
        pokemonStats(i);
    } else {
        i = currentPokemonArray.length - 1;
        pokemonStats(i);
    }
}


function goNext(i) {
    if (i < currentPokemonArray.length - 1) {
        i++;
        pokemonStats(i)
    } else {
        i = 0;
        pokemonStats(i);
    }
}


function closeStats() {
    document.getElementById('stats__wrapper').classList.add('d-none');
    document.querySelector('body').style.overflowY = ('unset');
    document.getElementById('cards__wrapper').classList.remove('blur');
    trigger = false;
}


//Load more Pokemon
window.addEventListener('scroll', () => {
    if (noMoreLoading == false) {
        if (window.scrollY + window.innerHeight >= (document.documentElement.scrollHeight - 0.5)) {
            loadMorePokemon = loadNrPokemon + 20;
            waitForMore();
        }
    }
});

async function waitForMore() {
    await loadPokemonList();
}


//Stop Propagation
function stopPropagation(event) {
    event.stopPropagation();
}


//Manipulate Cards
function getControllers() {
    document.addEventListener('keyup', (e) => {
        if (e.keyCode == 39) goNext(selectedPokemon);
        if (e.keyCode == 37) goPrevious(selectedPokemon);
        if (e.keyCode == 27) closeStats();
    })
}