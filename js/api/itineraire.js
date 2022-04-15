const url = "http://51.137.57.138:1337";
const liencartel = "/api/cartels";
const recupAll = "?populate=*";
const section = document.querySelector("section.cartels");
var map = L.map('map').setView([50.829171, 2.5541365], 9);
/// creation map
var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// URL to your GPX file or the GPX itself
//  Ajout Gpx //
var liengpx = ["gpx/calais-ardres.gpx",
    "gpx/ardres-watten.gpx",
    "gpx/watten-st-omer.gpx",
    "gpx/st-omer-aire-sur-la-lys.gpx",
    "gpx/aire-sur-la-lys-st-venant.gpx",
    "gpx/st-venant-bethune.gpx",
    "gpx/bethunes-olhain.gpx",
    "gpx/olhain-angres.gpx",
    "gpx/angres-lens.gpx",
    "gpx/lens-don.gpx",
    "gpx/don-lille.gpx",
    "gpx/lille-wattrelos.gpx"];

var customOptions =
{
    'className': 'popupCustom'
}
let mapEtape = [];
let popup = [];

function printArticle(value) {
    for (let cartel of value.data) {

        let article = document.createElement("article");


        //// Creation contenu gauche
        let figure = document.createElement("figure");

        let imgetape = document.createElement("img");

        imgetape.src = url + cartel.attributes.imgetape.data.attributes.formats.small.url;
        imgetape.classList.add("imgEtape");
        figure.appendChild(imgetape);

        let figcaption = document.createElement("figcaption");
        figcaption.innerText = cartel.attributes.km + " Km";
        figure.appendChild(figcaption);

        article.appendChild(figure);

        //// Creation contenu droit
        let divContenu = document.createElement("div");
        divContenu.classList.add("contenu");

        ////// Presentation
        let divPresentation = document.createElement("div");
        divPresentation.classList.add("presentation");
        let presentation = document.createElement("p");
        presentation.innerText = cartel.attributes.presentation
        divPresentation.appendChild(presentation);
        let lien = document.createElement("a");
        lien.classList.add("carnet")
        let heart = document.createElement("i");
        heart.classList.add("fa-regular");
        heart.classList.add("fa-heart");
        lien.setAttribute("href", "#");
        lien.appendChild(heart);
        divPresentation.appendChild(lien);
        divContenu.appendChild(divPresentation);

        ////// Niveau
        let divNiv = document.createElement("div");


        let circle = document.createElement("i");
        circle.classList.add("fa-solid");
        circle.classList.add("fa-circle");
        divNiv.appendChild(circle);


        let textNiv = document.createElement("p");
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
        let etape = document.createElement("h2");
        etape.innerText = cartel.attributes.etape
        divContenu.appendChild(etape)

        ////// Description
        let description = document.createElement("p");
        description.classList.add("description");
        description.innerText = cartel.attributes.description;
        divContenu.appendChild(description);

        article.appendChild(divContenu);

        popup[cartel.id - 1] = L.popup(customOptions);
        mapEtape[cartel.id - 1] = new L.GPX(liengpx[cartel.id - 1], {
            polyline_options: {
                color: '#00246B',
                weight: 7,
                lineCap: 'round'
            }
        }).on('mouseover mousemove', function (e) {
            this.setStyle({
                color: '#e5b9d5'
            })
            popup[cartel.id - 1]
                .setLatLng([e.latlng.lat + 0.004,e.latlng.lng ])
                .setContent("<h3>" + cartel.attributes.etape.toString() + "</h3>")
                .openOn(map);
        }).on('mouseout', function (e) {
            map.closePopup();
            this.setStyle({
                color: '#00246B'
            }).on('click', function (e) {
                document.location.href = "etape.html?etape=" + cartel.id;
            })
        }).on('loaded', function (e) {
            map.fitBounds(e.target.getBounds());
        }).addTo(map);


        //Ajout de l'article a la section
        section.appendChild(article);

        article.addEventListener('mouseover', () => {
            mapEtape[cartel.id - 1].setStyle({
                color: '#e5b9d5'
            });
        });
        article.addEventListener('mouseout', () => {
            mapEtape[cartel.id - 1].setStyle({
                color: '#00246B'
            });
        });
        article.addEventListener('click', () => {
            document.location.href = "etape.html?etape=" + cartel.id;
        });

    }

}


fetch(url + liencartel + recupAll)
    .then(response => response.json())
    .then(function (response) {
        response.data.sort(function (a, b) {
            return a.id - b.id;
        })

        printArticle(response);


    })
    .catch(error => alert("Erreur :" + error));