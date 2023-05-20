
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    
    constructor(params) {
        super(params)
        console.log(this.params);
        this.setTitle(this.params.id)
    }

    async getHtml() {
        
        const championId = this.params.id;
        console.log(championId);

        async function getData(url) {
            const response = await fetch(url)
            return response.json()
        }

        const data = await getData('/static/js/views/champions.json')

        const champions = Object.values(data); // Object.Values() est utilisé plutôt que 'find' puisqu'il s'agit d'un objet contenant des objets, et non un array contenant des objets
        const champion = champions.find(item => item.id === championId);


        let tags = ""; // Initialize an empty string for tags
        if (champion.tags && champion.tags.length > 0) {
            tags += `<span class='first-tag'>${champion.tags[0]}</span>`; // On ajoute le premier tag sans virgule

            for (let i = 1; i < champion.tags.length; i++) {
                tags += `, <span>${champion.tags[i]}</span>`; // On ajoute une vergule apres le premier tag, mais seulement si un autre existe
            }
        }

        return `
                <div class='champion-detail-header'>
                    <div class='champion-detail-title'>
                        <h1> ${champion.name} </h1>
                        <h3> ${champion.title} </h3>
                    </div>
                    <p class='blurb'><span>"</span> ${champion.blurb}<span>"</span></p>
                </div>
                <div class='champion-detail-info'>
                    <div class="info-text">
                        <img src="/static/js/views/champion-images/${champion.id}.png" alt="${champion.name}">
                        <div class='bloc-droite-image'>
                            <div class='champion-detail-tags'>
                                <h3>Champion Type : </h3>
                                ${tags}
                            </div>
                            <div class='champion-detail-stats'>
                                <h3>Attack : </h3><span>${champion.info.attack}</span>
                                <h3>Defense : </h3><span>${champion.info.defense}</span>
                                <h3>Magic : </h3><span>${champion.info.magic}</span>
                                <h3>Difficulty : </h3><span>${champion.info.difficulty}</span>
                            </div>
                        </div>
                    </div>
                    <div class='general-info'>
                        <h3 class='statistics'>Statistics</h3>
                        <section>
                            <div class='hp'>
                                <h3>Health Points : </h3><span>${champion.stats.hp}</span>
                            </div>
                            <div class='mp'>
                                <h3>Magic Points : </h3><span>${champion.stats.mp}</span>
                            </div>
                        </section>
                        <section>
                            <div class='magicresist'>
                                <h3>Magic Resist : </h3><span>${champion.stats.spellblock}</span>
                            </div>
                            <div class='armor'>
                                <h3>Armor : </h3><span>${champion.stats.armor}</span>
                            </div>
                        </section>
                        <section>
                            <div class='attackdamage'>
                                <h3>Attack Damage : </h3><span>${champion.stats.attackdamage}</span>
                            </div>
                            <div class='attackspeed'>
                                <h3>Attack Speed : </h3><span>${champion.stats.attackspeed}</span>
                            </div>
                        </section>
                        <section>
                            <div class='movespeed'>
                                <h3>Movespeed : </h3><span>${champion.stats.movespeed}</span>
                            </div>
                        </section>

                    </div>
                </div>

                <div class='back-button'>
                    <a href='/champions' data-link> Back</a>
                </div>
               `
    }
}