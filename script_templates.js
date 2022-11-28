// Template for each Pokemon Card
function templateCardDiv(i) {
    return `
    <div id="card__container-${i}" class='card__container' onclick="pokemonStats(${i})">
        <div class="card__container--info">
            <h2 id="info__name-${i}"></h2>
            <h2 id="info__id-${i}"></h2>
        </div>
        <div id="card__container--elements-${i}" class="card__container--elements">
        </div>
        <div class="card__container--stats_img">
            <div class="card__container--show_stats">
                <button>Click for stats! </button>
            </div>
            <div id="card__container--img-${i}" class="card__container--img"></div>
        </div>
    </div>`
}


function templateTypeElement(typeElement, i, j) {
    return `
    <div id="type__element--id-${i}-${j}"class="type__element">
        <p>${typeElement}</p>
    </div>
    `
}



//Template for Card Stats 
function templateCardStatDiv(i) {
    return `<div id="stats__show--id-${i}" class ="stats__show" onclick="stopPropagation(event)">
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
                    <button class= "" id= "" onclick= "goPrevious(${i})"><img src="./img/arrow-left-2-32.ico"></button>
                    <button class= "" id= "" onclick= "closeStats()">(close)</button>
                    <button class= "" id= "" onclick= "goNext(${i})"><img src="./img/arrow-right-2-32.ico"></button>
                </div>
            </div>`;
}


function templateBaseStats(baseStats){
    return `<div class="stats_bars">
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
            </div>`;
}


function templateTypeElementStats(typeElement, i, j) {
    return `<div id="stats__type__element--id-${i}-${j}"class="type__element">
                <p>${typeElement}</p>
            </div>`;
}