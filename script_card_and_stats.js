function generateStatsDiv(i) {
    let stats_container = document.getElementById('stats__container');
    stats_container.innerHTML = ``;
    stats_container.innerHTML = `
    <div id="stats__show--id-${i}" class ="stats__show">
        <div class="stats__info card__container--info">
            <h2 id="stats__info__name-${i}">Name</h2>
            <h2 id="stats__info__id-${i}"></h2>
        </div>
        <div class="stats__img__type">
            <div class="card__container--stats_img stats__img-container">
                <div id="stats__img-1--img-${i}" class="card__container--img"></div>
                <div id="stats__img__logo-id" class="stats__img__logo">
                    <img src="./img/logo.png">
                    <img src="./img/icon_pokemon.png">
                </div>
                <div id="stats__img-2--img-${i}" class="card__container--img flip_img"></div>
            </div>
            <div id="stats__card__container--elements-${i}" class="card__container--elements"></div>
        </div>
        <div class="about__container">
            <div class="info__and__stats">
                <button id="more__info--button" class="more__info--button" onclick="showMoreInfo(${i})">More info</button>
                <button id="base__stats--button" class="base__stats--button" onclick="showBaseStats(${i})">Base stats</button>
            </div>
            <div>
                <div id="more__info--container" class="more__info--container d-none">
                    <div id="species--id-${i}" class="species--class"></div>
                    <div id="height--id-${i}" class="height--class"></div>
                    <div id="weight--id-${i}" class="weight--class"></div>
                    <div id="abilities--id-${i}" class="abilities--class"></div>
                </div>
                    <div id="base__stats--container" class="base__stats--container"></div>                                             
                </div>
            </div>
        <div class="stats__buttons">
            <button class= "" id= "" onclick= "goPrevious(${i})"><img src="../img/arrow-left-2-32.ico"></button>
            <button class= "" id= "" onclick= "closeStats()">(close)</button>
            <button class= "" id= "" onclick= "goNext(${i})"><img src="../img/arrow-right-2-32.ico"></button>
        </div>
    </div>
    `;
}

async function pokemonStats(i) {
    if (trigger == false) {
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
    } else {
        await searchIsActive();
        document.getElementById('stats__wrapper').classList.remove('d-none');
        generateStatsDiv(i);
        generateBaseStats();
        statsBaseInfo(i);
        statsShowPhoto(i);
        statsShowElement(i);
        getMoreInfo(i);
        getBaseStats(i);
        stopScroll()
    }

}

function stopScroll() {
    let holder = document.getElementById('stats__wrapper').classList.contains('d-none');
    if (!holder) {
        document.querySelector('body').style.overflowY = ('hidden');
    }
}
function statsBaseInfo(i) {
    let name = currentPokemonArray[i]['name'];
    let Name = capitalizeFirstLetter(name);
    document.getElementById('stats__info__id-' + i).innerHTML = currentPokemonArray[i]['id'] + '#';
    document.getElementById('stats__info__name-' + i).innerHTML = Name;
}



function statsShowPhoto(i) {
    let pokemonImg = currentPokemonArray[i]['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('stats__img-1--img-' + i).innerHTML += `<img src="${pokemonImg}">`;
    document.getElementById('stats__img-2--img-' + i).innerHTML += `<img src="${pokemonImg}">`;
}

function statsShowElement(i) {
    let elementsHTML = document.getElementById('stats__card__container--elements-' + i);
    elementsHTML.innerHTML = '';
    let elementsJSON = currentPokemonArray[i]['types'];
    for (let j = 0; j < elementsJSON.length; j++) {
        let typeElement = elementsJSON[j]['type']['name'];
        elementsHTML.innerHTML += templateTypeElementStats(typeElement, i, j);
        chooseColorElementStats(typeElement, i, j)
    }
}


function getMoreInfo(i) {
    getSpecies(i);
    getHeight(i);
    getWeight(i);
    getAbilities(i);
}


function showMoreInfo() {
    document.getElementById('more__info--container').classList.remove('d-none');
    document.getElementById('base__stats--container').classList.add('d-none');
    trigger = false;
    backgroundStatsSwich();
}


function backgroundStatsSwich() {
    if (trigger == false) {
        document.getElementById('more__info--button').style.backgroundColor = ('unset');
        document.getElementById('base__stats--button').style.backgroundColor = ('rgba(0, 0, 0, 0.1');
    } else if (trigger == true) {
        document.getElementById('more__info--button').style.backgroundColor = ('rgba(0, 0, 0, 0.1');
        document.getElementById('base__stats--button').style.backgroundColor = ('unset');
    }
}
function showBaseStats(i) {
    document.getElementById('base__stats--container').classList.remove('d-none');
    document.getElementById('more__info--container').classList.add('d-none');
    generateBaseStats();
    trigger = true;
    backgroundStatsSwich();
}


function getBaseStats(i) {
    getHP(i);
    getAttack(i);
    getDefense(i);
    getSpecialAttack(i);
    getSpecialDefense(i);
    getSpeed(i);
    generateBaseStats()
}



function getSpecies(i) {
    let species = currentPokemonArray[i]['species']['name'];
    document.getElementById('species--id-' + i).innerHTML = `<h3>Species:</h3>  <p><b>${species}</b></p>`;
}


function getHeight(i) {
    let height = currentPokemonArray[i]['height'];
    document.getElementById('height--id-' + i).innerHTML = `<h3>Height: </h3> <p><b>${height}</b></p>`;
}


function getWeight(i) {
    let weight = currentPokemonArray[i]['weight'];
    document.getElementById('weight--id-' + i).innerHTML = `<h3>Weight:</h3>  <p><b>${weight}</b></p>`;
}


function getAbilities(i) {
    let abilities = currentPokemonArray[i]['abilities'];
    let abilitiesHTML = document.getElementById('abilities--id-' + i);
    abilitiesHTML.innerHTML = `<h3>Abilities:</h3> `
    for (let j = 0; j < abilities.length; j++) {
        let holder = abilities[j]['ability']['name'];
        if (j < abilities.length - 1) {
            abilitiesHTML.innerHTML += `<p><b>${holder}</b> and  </p>`;
        } else {
            abilitiesHTML.innerHTML += `<p><b>${holder}</b>.</p>`;
        }
    }

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
// Base Stats Indicators

let baseStats = [{
    'HP': '',
    'Attack': '',
    'Defense': '',
    'Special-Attack': '',
    'Special-Defense': '',
    'Speed': '',
}];

function getHP(i) {
    let HP = currentPokemonArray[i]['stats'][0]['base_stat'];
    baseStats['HP'] = HP;
}
function getAttack(i) {
    let attack = currentPokemonArray[i]['stats'][1]['base_stat'];
    baseStats['Attack'] = attack;
}
function getDefense(i) {
    let defense = currentPokemonArray[i]['stats'][2]['base_stat'];
    baseStats['Defense'] = defense;
}
function getSpecialAttack(i) {
    let sAttack = currentPokemonArray[i]['stats'][3]['base_stat'];
    baseStats['Special-Attack'] = sAttack;
}
function getSpecialDefense(i) {
    let sDefense = currentPokemonArray[i]['stats'][4]['base_stat'];
    baseStats['Special-Defense'] = sDefense;
}
function getSpeed(i) {
    let speed = currentPokemonArray[i]['stats'][5]['base_stat'];
    baseStats['Speed'] = speed;
}


function generateBaseStats() {
    let baseStatsHTML = document.getElementById('base__stats--container');
    baseStatsHTML.innerHTML = `
    <div class="stats_bars">
        <h3>Health Points:</h3>
        <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" aria-label="Success example" style="width: ${(baseStats['HP']) * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['HP']} </div>
        </div>
        <h3>Attack:</h3>
        <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" aria-label="Danger example" style="width: ${baseStats['Attack'] * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['Attack']}</div>
        </div>
        <h3>Defense:</h3>
            <div class="progress">
        <div class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style="width: ${baseStats['Defense'] * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['Defense']}</div>
        </div>
        <h3>Special-Attack:</h3>
        <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" aria-label="Danger example" style="width: ${baseStats['Special-Attack'] * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['Special-Attack']}</div>
        </div>
        <h3>Special-Defense:</h3>
        <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style="width: ${baseStats['Special-Defense'] * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['Special-Defense']}</div>
        </div>
        <h3>Speed:</h3>
        <div class="progress">
            <div class="progress-bar bg-info" role="progressbar" aria-label="Info example" style="width: ${baseStats['Speed'] * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['Speed']}</div>
        </div>
    </div>`
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

