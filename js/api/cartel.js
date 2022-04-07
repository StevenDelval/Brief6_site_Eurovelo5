/* const url = "http://20.229.152.219:1337";
const cartel = "/api/cartels/";
const recupAll = "?populate=*";
const section = document.querySelector("section.cartels"); */

function printArticle(value) {
    for (let cartel of value.data) {

        article = document.createElement("article");

        //// Creation contenu gauche
        figure = document.createElement("figure");

        imgetape = document.createElement("img");
        imgetape.src = url + cartel.attributes.imgetape.data.attributes.formats.small.url;
        imgetape.classList.add("imgEtape");
        figure.appendChild(imgetape);

        figcaption = document.createElement("figcaption");
        figcaption.innerText = cartel.attributes.km + " Km";
        figure.appendChild(figcaption);

        article.appendChild(figure);

        //// Creation contenu droit
        divContenu = document.createElement("div");
        divContenu.classList.add("contenu");

        ////// Presentation
        divPresentation = document.createElement("div");
        divPresentation.classList.add("presentation");
        presentation = document.createElement("p");
        presentation.innerText = cartel.attributes.presentation
        divPresentation.appendChild(presentation);
        lien = document.createElement("a");
        lien.classList.add("carnet")
        heart = document.createElement("i");
        heart.classList.add("fa-regular");
        heart.classList.add("fa-heart");
        lien.setAttribute("href", "#");
        lien.appendChild(heart);
        divPresentation.appendChild(lien);
        divContenu.appendChild(divPresentation);

        ////// Niveau
        divNiv = document.createElement("div");


        circle = document.createElement("i");
        circle.classList.add("fa-solid");
        circle.classList.add("fa-circle");
        divNiv.appendChild(circle);


        textNiv = document.createElement("p");
        switch (cartel.attributes.niveau) {
            case 1:
                divNiv.classList.add("niveau-deb");
                textNiv.innerText = "Débutant";
                break;
            case 2:
                divNiv.classList.add("niveau-moy");
                textNiv.innerText = "Moyen";
                break;

            case 3:
                divNiv.classList.add("niveau-dif");
                textNiv.innerText = "Difficile";
                break;
            default:
                console.log('erreur');
        }

        divNiv.appendChild(textNiv);
        divContenu.appendChild(divNiv);

        //////Etape
        etape = document.createElement("h2");
        etape.innerText = cartel.attributes.etape
        divContenu.appendChild(etape)

        ////// Description
        description = document.createElement("p");
        description.classList.add("description");
        description.innerText = cartel.attributes.description;
        divContenu.appendChild(description);

        article.appendChild(divContenu);

        //Ajout de l'article a la section
        section.appendChild(article);
        
    }
}

/* fetch(url + cartel + recupAll)
    .then(response => response.json())
    .then(function (response) {
        response.data.sort(function (a, b) {
            return a.id - b.id;
        })

        printArticle(response);
    })
    .catch(error => alert("Erreur :" + error)); */