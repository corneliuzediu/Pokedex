// Generate Pokemon Card DIV
function generateCardDiv() {
    let card_container = document.getElementById('cards__wrapper');
    for (let i = 0; i < loadNrPokemon; i++) {
        card_container.innerHTML += templateCardDiv(i);
    }
}

function generateMoreCardDiv() {
    let card_container = document.getElementById('cards__wrapper');
    for (let i = loadNrPokemon; i < loadMorePokemon; i++) {
        card_container.innerHTML += templateCardDiv(i);
    }
}



function renderPokemonInfo() {
    for (let i = 0; i < currentPokemonArray.length; i++) {
        baseInfo(i);
        showElement(i);
        showPhoto(i);
    }
}

function renderMorePokemonInfo() {
    for (let i = loadNrPokemon; i < currentPokemonArray.length; i++) {
        baseInfo(i);
        showElement(i);
        showPhoto(i);
    }
}


function baseInfo(i) {
    let name = currentPokemonArray[i]['name'];
    let Name = capitalizeFirstLetter(name);
    let ID = currentPokemonArray[i]['id'];
    document.getElementById('info__id-' + i).innerHTML = ID + '#';
    document.getElementById('info__name-' + i).innerHTML = Name;
}


function showElement(i) {
    let elementsHTML = document.getElementById('card__container--elements-' + i);
    elementsHTML.innerHTML = '';
    let elementsJSON = currentPokemonArray[i]['types'];
    for (let j = 0; j < elementsJSON.length; j++) {
        let typeElement = elementsJSON[j]['type']['name'];
        elementsHTML.innerHTML += templateTypeElement(typeElement, i, j);
        chooseColorElement(typeElement, i, j);
    }
}


function showPhoto(i) {
    let pokemonImg = currentPokemonArray[i]['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('card__container--img-' + i).innerHTML += `<img src="${pokemonImg}">`;
}


//Capitalize First Letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}