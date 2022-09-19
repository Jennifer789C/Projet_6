let flecheD = document.querySelector("#films_mieux_notes aside.fleche_droite");
let flecheG = document.querySelector("#films_mieux_notes aside.fleche_gauche");
let films = document.querySelector("#films_mieux_notes article.films");

flecheD.addEventListener("click", function() {
    const liste_index = parseInt(getComputedStyle(films).getPropertyValue
    ("--liste-index"));
    /* convertit un string en entier + va chercher l'élément HTML
    "films" et récupère la valeur de la variable CSS "--liste-index" */
    films.style.setProperty("--liste-index", (liste_index + 1));
    flecheG.style.visibility = "visible";
});

flecheG.addEventListener("click", function() {
    const liste_index = parseInt(getComputedStyle(films).getPropertyValue
    ("--liste-index"));
    if (liste_index != 0) {
        films.style.setProperty("--liste-index", (liste_index - 1));
    };
    if (liste_index == 1) {
        flecheG.style.visibility = "hidden";
    };
});
