import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor(params) {
        super(params)
        this.setTitle('Settings')
    }

    async getHtml() {
        return `
            <h1>Bienvenu sur le panneau de Configuration</h1>

            <p> Pas grands configurations... Voila!</p>

            <div class='on-duty'>
                <img src='/static/image/on_duty.png' alt='on-duty'>
            </div>

            <a href="/" class="nav__link" data-link>Voir l'Accueil</a>
            <a href="/posts" class="nav__link" data-link>Voir les Champions</a>
        `
    }
}