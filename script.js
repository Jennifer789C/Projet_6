// fonctionnement des flèches de déplacement des films
let fleches = document.querySelectorAll(".fleches");

for (let f of fleches) {
    f.addEventListener("click", function(e) {
        let fleche = e.target
        let films = fleche.parentElement.querySelector(".films");
        let liste_index = parseInt(getComputedStyle(films).getPropertyValue
            ("--liste-index"));
        /* convertit un string en entier + va chercher l'élément HTML
        "films" et récupère la valeur de la variable CSS "--liste-index" */
        if (fleche.classList.contains("fleche_gauche")) {
            if (liste_index != 0) {
                films.style.setProperty("--liste-index", (liste_index - 1));
                fleche.parentElement.querySelector(".fleche_droite").style
                    .visibility = "visible";
            };
            if (liste_index == 1) {
                fleche.style.visibility = "hidden";
            };
        };
        if (fleche.classList.contains("fleche_droite")) {
            let nb_films = films.children.length;
            let films_visibles = parseInt(getComputedStyle(films).
                getPropertyValue("--films-visibles"));
            let nb_pages = Math.ceil(nb_films / films_visibles);
            if ((liste_index + 1) < nb_pages) {
                films.style.setProperty("--liste-index", (liste_index + 1));
                fleche.parentElement.querySelector(".fleche_gauche").style
                    .visibility = "visible";
            };
            if ((liste_index + 2) == nb_pages) {
                fleche.style.visibility = "hidden";
            };
        };
    });
};
// fin de : fonctionnement des flèches de déplacement des films

// requêtes GET
async function requete(url) {
    let promise = await fetch(url)
        .then (function(res) {
            if (res.ok) {
                return res.json();
            };
        })
        .catch (function(err) {
            console.log("Une erreur ressort de la requête");
        });
    return Promise.resolve(promise);
};

const base_url = "http://localhost:8000/api/v1/titles/"

function image_film(num_film, html_film){
    requete(base_url + num_film)
    .then (function(value) {
        html_film.style.backgroundImage = 'url("' + value.image_url + '")';
        html_film.querySelector("span").innerText = value.id;
    })
};

const base_url_1 = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
const base_url_2 = "http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_"
     + "score";

let meilleur_film = document.getElementById("meilleur_film");
let mieux_notes = document.querySelectorAll("#films_mieux_notes .films a");

requete(base_url_1) // requete des meilleurs films (page 1)
.then(function(value){
    let num_film = value.results[0].id;
    requete(base_url + num_film) // requete DU meilleur film
    .then(function(value){
        meilleur_film.querySelector("h1").innerText = value.title;
        meilleur_film.querySelector("p").innerText = value.description;
        meilleur_film.style.backgroundImage = 'url("' + value.image_url + '")';
        meilleur_film.querySelector("span").innerText = value.id;
    });
    for (let i = 0; i < 4; i++) {
        image_film(value.results[i+1].id, mieux_notes[i])
    };
});

requete(base_url_2) // requete des meilleurs films (page 2)
.then(function(value){
    for (let i = 0; i < 3; i++) {
        image_film(value.results[i].id, mieux_notes[i+4]);
    };
});

const genres = ["action", "comedy", "sci-fi"];
genres.forEach(function(genre) {
    let categorie = document.getElementById(genre);
    let films = categorie.querySelectorAll(".films a");
    requete(base_url_1 + "&genre=" + genre) // requete des films par genre (p1)
    .then(function(value){
        for (let i = 0; i < 6; i++) {
            image_film(value.results[i].id, films[i]);
        };
    });
    requete(base_url_2 + "&genre=" + genre) // requete des films par genre (p2)
    .then(function(value){
        for (let i = 0; i < 3; i++) {
            image_film(value.results[i].id, films[i+5]);
        };
    });
});
// fin de : requêtes GET

// gestion de la page modale
const modale = document.getElementById("modale");

function infos_modale(value) {
    modale.querySelector("h1").innerText = value.title;
    modale.querySelector("#genre").innerText = "Genre : " + value.genres;
    modale.querySelector("#sortie").innerText = "Date de sortie : " + value
        .date_published;
    modale.querySelector("#evaluation").innerText = "Evalué : " + value
        .rated;
    modale.querySelector("#imdb").innerText = "Score imdb : " + value
        .imdb_score;
    modale.querySelector("#realisateur").innerText = "Réalisateur : " +
        value.directors;
    modale.querySelector("#acteurs").innerText = "Acteurs : " + value
        .actors;
    modale.querySelector("#duree").innerText = "Durée : " + value.duration
        + " min";
    modale.querySelector("#pays").innerText = "Pays d'origine : " + value
        .countries;
    modale.querySelector("#box_office").innerText = "Résultat au Box " +
        "Office : " + value.metascore;
    modale.querySelector("#resume").innerText = "Résumé : " + value
        .long_description;
    modale.querySelector("img").src = value.image_url;
};

let infos = document.querySelectorAll(".infos");

for (let a of infos) {
    a.addEventListener("click", function(e) {
        let num_film = a.querySelector("span").textContent
        requete(base_url + num_film)
        .then(function(value){
            infos_modale(value);
        });
    });
};
// fin de : gestion de la page modale