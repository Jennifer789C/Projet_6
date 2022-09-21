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

let meilleur_film = document.getElementById("meilleur_film")

fetch ("http://localhost:8000/api/v1/titles/8571428")
    .then (function(res) {
        if (res.ok) {
            return res.json();
        };
    })
    .then (function(value) {
        meilleur_film.querySelector("h1").innerText = value.title;
        meilleur_film.querySelector("p").innerText = value.description;
        meilleur_film.style.backgroundImage = 'url("'+ value.image_url +'")';
    })
    .catch (function(err) {
        console.log("Une erreur ressort de la requête")
    });