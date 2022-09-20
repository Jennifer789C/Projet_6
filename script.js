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
                fleche.nextElementSibling.nextElementSibling.style.visibility =
                     "visible";
            };
            if (liste_index == 1) {
                fleche.style.visibility = "hidden";
            };
        };
        if (fleche.classList.contains("fleche_droite")) {
            let nb_films = films.children.length;
            let films_visibles = parseInt(getComputedStyle(films).getPropertyValue
                ("--films-visibles"));
            let nb_pages = Math.ceil(nb_films / films_visibles);
            if ((liste_index + 1) < nb_pages) {
                films.style.setProperty("--liste-index", (liste_index + 1));
                fleche.previousElementSibling.previousElementSibling.style
                    .visibility = "visible";
            };
            if ((liste_index + 2) == nb_pages) {
                fleche.style.visibility = "hidden";
            };
        };
    });
};
