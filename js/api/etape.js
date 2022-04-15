/// fonction recup parametre url
function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}
/// Declaration variable
const url = "http://51.137.57.138:1337";
const liencartel = "/api/cartels";
const recupAll = "?populate=*";
const section = document.querySelector("section.etape");

/// creation map

switch ($_GET('etape')) {
    case "1":
        var map = L.map('map').setView([50.911651, 1.916826], 11);
        break;
    case "2":
        var map = L.map('map').setView([50.8442935, 2.093722], 11);
        break;

    case "3":
        var map = L.map('map').setView([50.7927515, 2.2378635], 11);
        break;
    case "4":
        var map = L.map('map').setView([50.698865, 2.3364895], 11);
        break;
    case "5":
        var map = L.map('map').setView([50.6342025, 2.4784015], 11);
        break;

    case "6":
        var map = L.map('map').setView([50.572714, 2.596145], 11);
        break;
    case "7":
        var map = L.map('map').setView([50.4877470506626, 2.61091588876953], 11);
        break;
    case "8":
        var map = L.map('map').setView([50.4262547, 2.66713895], 11);
        break;

    case "9":
        var map = L.map('map').setView([50.4140043, 2.78623805], 11);
        break;
    case "10":
        var map = L.map('map').setView([50.4875647550378, 2.86976085518646], 11);
        break;
    case "11":
        var map = L.map('map').setView([50.6099415, 2.9910585], 11);
        break;
    case "12":
        var map = L.map('map').setView([50.6824235, 3.1582875], 11);
        break;
    default:
        var map = L.map('map').setView([50.829171, 2.5541365], 10);
}

var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

var customOptions =
{
    'className': 'popupCustom'
}
let mapEtape = [];
let popup = [];

// URL to your GPX file or the GPX itself
//  Ajout Gpx //
var liengpx = ["../gpx/calais-ardres.gpx",
    "../gpx/ardres-watten.gpx",
    "../gpx/watten-st-omer.gpx",
    "../gpx/st-omer-aire-sur-la-lys.gpx",
    "../gpx/aire-sur-la-lys-st-venant.gpx",
    "../gpx/st-venant-bethune.gpx",
    "../gpx/bethunes-olhain.gpx",
    "../gpx/olhain-angres.gpx",
    "../gpx/angres-lens.gpx",
    "../gpx/lens-don.gpx",
    "../gpx/don-lille.gpx",
    "../gpx/lille-wattrelos.gpx"];



function printEtape(response, numEtape) {
    let value = response[numEtape - 1]


    // Ajout tracer map
    for (let gpxetape in liengpx) {
        gpxetape = parseInt(gpxetape);
        if (gpxetape == value.id - 1) {
            popup[gpxetape] = L.popup(customOptions);
            mapEtape[gpxetape] = new L.GPX(liengpx[gpxetape], {
                polyline_options: {
                    color: '#e5b9d5',
                    weight: 7,
                    lineCap: 'round'
                }
            }).on('mouseover mousemove', function (e) {
                this.setStyle({
                    color: '#e5b9d5'
                })
                popup[gpxetape]
                    .setLatLng([e.latlng.lat + 0.004,e.latlng.lng ] )
                    .setContent("<h3>" + value.attributes.etape.toString() + "</h3>")
                    .openOn(map);
            }).on('mouseout', function (e) {
                map.closePopup();
                this.setStyle({
                    color: '#e5b9d5'
                }).on('click', function (e) {
                    document.location.href = "etape.html?etape=" + parseInt(gpxetape + 1);
                })
            }).on('loaded', function (e) {
                map.fitBounds(e.target.getBounds());
            }).addTo(map);
            if (window.innerWidth <= 790) {
                var el = L.control.elevation({
                    width: 0.8 * window.innerWidth
                });
            } else {
                var el = L.control.elevation({
                    width: 0.45 * window.innerWidth
                });
            }
            el.addTo(map);
            var g = new L.GPX(liengpx[gpxetape], { async: true });
            g.on('loaded', function(e) {
                console.log(e)
                map.fitBounds(e.target.getBounds());
      });
            g.on("addline", function (e) {
                e.line.options.color = "#e5b9d5";
                el.addData(e.line);
            });

        } else {
            popup[gpxetape] = L.popup(customOptions);
            mapEtape[gpxetape] = new L.GPX(liengpx[gpxetape], {
                polyline_options: {
                    color: '#6f6f6f',
                    weight: 7,
                    lineCap: 'round'
                }
            }).on('mouseover mousemove', function (e) {
                this.setStyle({
                    color: '#00246B'
                })
                popup[gpxetape]
                    .setLatLng([e.latlng.lat + 0.004,e.latlng.lng ])
                    .setContent("<h3>" + response[gpxetape].attributes.etape.toString() + "</h3>")
                    .openOn(map);
            }).on('mouseout', function (e) {
                map.closePopup();
                this.setStyle({
                    color: '#6f6f6f'
                }).on('click', function (e) {
                    document.location.href = "etape.html?etape=" + parseInt(gpxetape + 1);
                })
            }).on('loaded', function (e) {
                map.fitBounds(e.target.getBounds());
            }).addTo(map);

        }
    }
    let article = document.createElement("article");
    //////Etape
    let etape = document.createElement("h2");

    ///Lien retour
    let a = document.createElement("a");
    a.classList.add("back");
    a.href = "itineraire.html";

    let arrow = document.createElement("i");
    arrow.classList.add("fa-solid");
    arrow.classList.add("fa-arrow-left-long");

    a.appendChild(arrow);
    etape.appendChild(a);

    /// titre etape
    let span = document.createElement("span")
    span.innerText = value.attributes.etape;

    etape.appendChild(span)
    article.appendChild(etape);
    ///// Presentation
    let divPresentation = document.createElement("div");
    divPresentation.classList.add("presentation");

    let presentation = document.createElement("p");
    presentation.innerText = value.attributes.presentation;
    divPresentation.appendChild(presentation);

    let lien = document.createElement("a");
    lien.classList.add("div");

    let heart = document.createElement("i");
    heart.classList.add("fa-regular");
    heart.classList.add("fa-heart");

    lien.setAttribute("href", "#");
    lien.appendChild(heart);

    divPresentation.appendChild(lien);
    article.appendChild(divPresentation);

    // Parcour
    let divParcour = document.createElement("div");
    divParcour.classList.add("parcour");

    //// Distance
    let divDistance = document.createElement("div");
    divDistance.classList.add("distance");

    let circle = document.createElement("i");
    circle.classList.add("fa-solid");
    circle.classList.add("fa-road");
    divDistance.appendChild(circle);

    let dis = document.createElement("p");
    dis.innerText = value.attributes.km + " Km";
    divDistance.appendChild(dis);

    divParcour.appendChild(divDistance);

    ////duree
    let divDuree = document.createElement("div");
    divDuree.classList.add("duree");

    let time = document.createElement("i");
    time.classList.add("fa-solid");
    time.classList.add("fa-clock");
    divDuree.appendChild(time);

    let temp = document.createElement("p");
    temp.innerText = value.attributes.duree;
    divDuree.appendChild(temp);

    divParcour.appendChild(divDuree);

    ////// Niveau
    let divNiv = document.createElement("div");


    let circleA = document.createElement("i");
    circleA.classList.add("fa-solid");
    circleA.classList.add("fa-circle");
    divNiv.appendChild(circleA);


    let textNiv = document.createElement("p");
    switch (value.attributes.niveau) {
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
    divParcour.appendChild(divNiv);

    article.appendChild(divParcour);





    //// Creation contenu image
    let figure = document.createElement("figure");

    let imgetape = document.createElement("img");
    imgetape.src = url + value.attributes.imgetape.data.attributes.formats.large.url;
    imgetape.classList.add("imgEtape");
    figure.appendChild(imgetape);
    article.appendChild(figure);



    // info ville
    let divVil = document.createElement("div");
    divVil.classList.add("villes");

    let depart = document.createElement("p");
    depart.innerText = value.attributes.depart;
    divVil.appendChild(depart);

    let echange = document.createElement("i");
    echange.classList.add("fa-solid");
    echange.classList.add("fa-arrow-right-arrow-left");
    divVil.appendChild(echange);

    let arrivee = document.createElement("p");
    arrivee.innerText = value.attributes.arrivee;
    divVil.appendChild(arrivee);

    echange.addEventListener("click", (e) => {
        divVil.classList.toggle("active");
    });

    article.appendChild(divVil);
    /// ajout elevation
    article.appendChild(document.querySelector(".elevation"));
    ////// Description


    let description = document.createElement("div");
    description.classList.add("description");

    let titre = document.createElement("h3");
    titre.innerText = value.attributes.titre;
    description.appendChild(titre);

    let pdescri = document.createElement("p");
    pdescri.innerText = value.attributes.description;
    description.appendChild(pdescri);

    article.appendChild(description);




    window.addEventListener('resize', () => {
        location.reload()
    })





    //Ajout de l'article a la section
    section.appendChild(article);

}




fetch(url + liencartel + recupAll)
    .then(response => response.json())
    .then(function (response) {
        response.data.sort(function (a, b) {
            return a.id - b.id;
        })

        numEtape = $_GET('etape');
        printEtape(response.data, numEtape);




    })
    .catch(error => alert("Erreur :" + error));