document.addEventListener("click", e => {
    let fleches
    if (e.target.matches(".fleches")) {
        fleches = e.target
    } else {
        fleches = e.target.closest(".fleches")
    }
    if (fleches != null) surFlechesClic(fleches)
})

function surFlechesClic(fleches) {
    const article = fleches.closest(".categorie__contenu").querySelector
    ("article")
    const listeIndex = parseInt(getComputedStyle(article).getPropertyValue
    ("--liste-index"))
    if (fleches.classList.contains("fleche_gauche")) {
        article.style.setProperty("--liste-index", listeIndex - 1)
    }

    if (fleches.classList.contains("fleche_droite")) {
        article.style.setProperty("--liste-index", listeIndex + 1)
    }
}