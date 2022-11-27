// Template for each Pokemon Card
function templateCardDiv(i){
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


function templateTypeElement(typeElement, i, j){
    return `
    <div id="type__element--id-${i}-${j}"class="type__element">
        <p>${typeElement}</p>
    </div>
    `
}
function templateTypeElementStats(typeElement, i, j){
    return `
    <div id="stats__type__element--id-${i}-${j}"class="type__element">
        <p>${typeElement}</p>
    </div>
    `
}