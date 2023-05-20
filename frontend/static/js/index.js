// 7. ========== IMPORT VIEW ===========

import Dashboard from "./views/Dashboard.js"
import Champions from "./views/Champions.js"
import Settings from "./views/Settings.js"
import ChampionView from "./views/ChampionView.js"

// 10. ========== REGEX ==========

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

// 11. ========== GET PARAMS ==========

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}

// 1. ========== ROUTER ==========

const router = async()=> {

    // ========== 10.1 TEST REGEX ==========
    const routes = [
        {path: "/",                  view: Dashboard},
        {path: "/champions",         view: Champions},
        {path: "/settings",          view: Settings},
        {path: "/champion-view/:id", view: ChampionView}
    ]

// 2. ========== MATCH FUNCTION ==========

    const potentialMatches = routes.map(route => {
        return{
            route: route,
            result: location.pathname.match(pathToRegex(route.path)) // boolean, true false
        }
    })
    // console.log(potentialMatches);

// 3. ========== FIND VIEW ==========

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)
    if(!match) {
        match = {
            route: routes[0], // si la route n'existe pas, elle sera redirigé vers route 0, ou "/"
            result: [location.pathname]
        }
    }
    //console.log(match.result);

// 8. ========== RENDER VIEW ==========

    const view = new match.route.view(getParams(match));

    // console.log(getParams(match));
    document.querySelector("#app").innerHTML = await view.getHtml()

}

// 4. ========== NAVIGATE STATE ==========

    const navigateTo = url => {
        history.pushState(null, null, url)
        router()
    }

// 9. ========== USE NAV BACK BUTTON ==========

window.addEventListener("popstate", router) // Pour utiliser le bouton "back"

// 5. ========== EXECUTER LA ROUTE ==========

document.addEventListener("DOMContentLoaded", ()=> { // on demarre pour voir ce qui a ete fait plus haut

// 6. ========== SPA LINK ===========

document.body.addEventListener("click", (evt) => {
    let target = evt.target;
    while (target && !target.matches("[data-link]")) {
      target = target.parentElement;
    }
    if (target && target.matches("[data-link]")) {
      evt.preventDefault();
      navigateTo(target.href);
    }
  });
    router()
})