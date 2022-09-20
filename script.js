let flecheD = document.querySelector("#films_mieux_notes aside.fleche_droite");
let flecheG = document.querySelector("#films_mieux_notes aside.fleche_gauche");
let films = document.querySelector("#films_mieux_notes article.films");

flecheD.addEventListener("click", function() {
    let liste_index = parseInt(getComputedStyle(films).getPropertyValue
    ("--liste-index"));
    /* convertit un string en entier + va chercher l'élément HTML
    "films" et récupère la valeur de la variable CSS "--liste-index" */
    let nb_films = films.children.length
    let films_visibles = parseInt(getComputedStyle(films).getPropertyValue
    ("--films-visibles"))
    let nb_pages = Math.ceil(nb_films / films_visibles)
    if ((liste_index + 1) < nb_pages) {
        films.style.setProperty("--liste-index", (liste_index + 1));
        flecheG.style.visibility = "visible";
    };
    if ((liste_index + 2) == nb_pages) {
        flecheD.style.visibility = "hidden";
    }
});

flecheG.addEventListener("click", function() {
    let liste_index = parseInt(getComputedStyle(films).getPropertyValue
    ("--liste-index"));
    if (liste_index != 0) {
        films.style.setProperty("--liste-index", (liste_index - 1));
        flecheD.style.visibility = "visible";
    };
    if (liste_index == 1) {
        flecheG.style.visibility = "hidden";
    };
});
