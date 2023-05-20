import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor(params) {
        super(params)
        this.setTitle('Dashboard')
    }

    async getHtml() {
        return `
            <h1>Leagues of Legends Champions API</h1>

            <p class='accueil'>Il s'agît d'un simple API contenant tous les informations pertinantes de chacun des héros existant dans le jeu Leagues of Legends. Puisqu'il s'agît d'un projet 100% SPA, j'ai cru bon faire un fetch regroupant tout (même les images) qui seront par la suite fetch localement dans le fichier JSON Champions.json (les images sont, elles, retrouvé dans leur dossier respectif, dossier créé lors de votre arrivé sur cette page-ci du site, de façon a ce qu'aucun autre fetch d'API soit executé).</p>

            <a href="/champions" class="nav__link" data-link>Voir les Champions</a>
            <a href="/settings" class="nav__link" data-link>Voir les Settings</a>
        `
    }
}