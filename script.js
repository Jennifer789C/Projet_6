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

let modale = document.getElementById("modale");
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

function infos_film(num_film, html_film) {
// recherche des informations spécifiques à ce film
    fetch("http://localhost:8000/api/v1/titles/" + num_film)
    .then (function(res) {
        if (res.ok) {
            return res.json();
        };
    })
    .then (function(value) {
        html_film.style.backgroundImage = 'url("' + value.image_url + '")';
        infos_modale(value);
    })
    .catch (function(err) {
        console.log("Une erreur ressort de la requête du film")
    });
};

let meilleur_film = document.getElementById("meilleur_film");
let mieux_notes = document.querySelectorAll("#films_mieux_notes .films a")

fetch ("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
// recherche du meilleur film en les filtrant par leur score imdb
    .then (function(res) {
        if (res.ok) {
            return res.json();
        };
    })
    .then (function(value) {
        let num_film = value.results[0].id;
        // isole l'id du meilleur film
        fetch("http://localhost:8000/api/v1/titles/" + num_film)
            .then (function(res) {
                if (res.ok) {
                    return res.json();
                };
            })
            .then (function(value) {
                meilleur_film.querySelector("h1").innerText = value.title;
                meilleur_film.querySelector("p").innerText = value.description;
                meilleur_film.style.backgroundImage = 'url("' + value.
                    image_url + '")';
                infos_modale(value);
            })
            .catch (function(err) {
                console.log("Une erreur ressort de la requête du meilleur " +
                "film")
            });
        for (let i = 0; i < 4; i++) {
            infos_film(value.results[i+1].id, mieux_notes[i])
        };
    })
    .catch (function(err) {
        console.log("Une erreur ressort de la requête des films filtrés par "
            + "score imdb (page 1)")
    });

fetch ("http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score")
    .then (function(res) {
        if (res.ok) {
            return res.json();
        };
    })
    .then (function(value) {
        for (let i = 0; i < 3; i++) {
            infos_film(value.results[i].id, mieux_notes[i+4]);
        };
    })
    .catch (function(err) {
        console.log("Une erreur ressort de la requête des films filtrés par "
            + "score imdb (page 2)")
    });

let genres = [action, comedy, sci-fy];

