import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor(params) {
        super(params)
        this.setTitle('Champions')
    }

    async getHtml() {

        const championId = this.params.id;

        async function getData(url) { 
            const response = await fetch(url);
            return response.json();
        }

        const data = await getData('/static/js/views/champions.json');


        // const champions = Object.values(data);
        // const champion = champions.find(item => item.id === championId);
        // console.log(champion);

        let listChampionsFighters = "<div class='champion-list'>"
                            for(let i in data) {
                                if(data[i].tags[0] == "Fighter" || data[i].tags[1] == "Fighter") {
                                    listChampionsFighters += `<a href="/champion-view/${data[i].id}" data-link>
                                                                <div class='champion-name'>
                                                                    <img class='mini-logo' src='/static/js/views/champion-images/${data[i].id}.png' alt='${data[i].name}'>
                                                                    ${data[i].name}
                                                                </div>
                                                                </a>`
                                }
                            }
            listChampionsFighters += "</div>"

        let listChampionsTanks = "<div class='champion-list'>"
                            for(let i in data) {
                                if(data[i].tags[0] == "Tank" || data[i].tags[1] == "Tank") {
                                    listChampionsTanks += `<a href='/champion-view/${data[i].id}' data-link>
                                                                <div class='champion-name'>
                                                                    <img class='mini-logo' src='/static/js/views/champion-images/${data[i].id}.png' alt='${data[i].name}'>
                                                                    ${data[i].name}
                                                                </div>
                                                                </a>`
                                }
                            }
            listChampionsTanks += "</div>"

        let listChampionsMages = "<div class='champion-list'>"
                            for(let i in data) {
                                if(data[i].tags[0] == "Mage" || data[i].tags[1] == "Mage") {
                                    listChampionsMages += `<a href='/champion-view/${data[i].id}' data-link>
                                                                <div class='champion-name'>
                                                                    <img class='mini-logo' src='/static/js/views/champion-images/${data[i].id}.png' alt='${data[i].name}'>
                                                                    ${data[i].name}
                                                                </div>
                                                                </a>`
                                }
                            }
            listChampionsMages += "</div>"

        let listChampionsAssassins = "<div class='champion-list'>"
                            for(let i in data) {
                                if(data[i].tags[0] == "Assassin" || data[i].tags[1] == "Assassin") {
                                    listChampionsAssassins += `<a href='/champion-view/${data[i].id}' data-link>
                                                                <div class='champion-name'>
                                                                    <img class='mini-logo' src='/static/js/views/champion-images/${data[i].id}.png' alt='${data[i].name}'>
                                                                    ${data[i].name}
                                                                </div>
                                                                </a>`
                                }
                            }
            listChampionsAssassins += "</div>"

        let listChampionsMarksmans = "<div class='champion-list'>"
                            for(let i in data) {
                                if(data[i].tags[0] == "Marksman" || data[i].tags[1] == "Marksman") {
                                    listChampionsMarksmans += `<a href='/champion-view/${data[i].id}' data-link>
                                                                <div class='champion-name'>
                                                                    <img class='mini-logo' src='/static/js/views/champion-images/${data[i].id}.png' alt='${data[i].name}'>
                                                                    ${data[i].name}
                                                                </div>
                                                                </a>`
                                }
                            }
            listChampionsMarksmans += "</div>"

        let listChampionsSupports = "<div class='champion-list'>"
                            for(let i in data) {
                                if(data[i].tags[0] == "Support" || data[i].tags[1] == "Support") {
                                    listChampionsSupports += `<a href='/champion-view/${data[i].id}' data-link>
                                                                <div class='champion-name'>
                                                                    <img class='mini-logo' src='/static/js/views/champion-images/${data[i].id}.png' alt='${data[i].name}'>
                                                                    ${data[i].name}
                                                                </div>
                                                                </a>`
                                }
                            }
            listChampionsSupports += "</div>"

        return `
            <h1>Champions List</h1>
            <h2>FIGHTERS</h2>
                ${listChampionsFighters}
            <h2>TANKS</h2>
                ${listChampionsTanks}
            <h2>MAGES</h2>
                ${listChampionsMages}
            <h2>ASSASSINS</h2>
                ${listChampionsAssassins}
            <h2>MARKSMANS</h2>
                ${listChampionsMarksmans}
            <h2>SUPPORTS</h2>
                ${listChampionsSupports}

            <a href="/settings" class="nav__link" data-link>Voir les Configurations</a>
            <a href="/" class="nav__link" data-link>Voir l'Accueil</a>
        `
    }
}