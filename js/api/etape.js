/// Declaration variable
const url = "http://51.137.57.138:1337";
const liencartel = "/api/cartels";
const recupAll = "?populate=*";
const section = document.querySelector("section.etape");
var map = L.map('map').setView([50.62925, 3.057256], 10);

var customOptions =
{
    'className': 'popupCustom'
}
let mapEtape = [];
let popup = [];
/// creation map
var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);



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



function printEtape(response, numEtape) {
    value = response[numEtape - 1]


    // Ajout tracer map
    for (let gpxetape in liengpx) {
        gpxetape = parseInt(gpxetape);
        if (gpxetape == value.id - 1) {
            popup[gpxetape] = L.popup(customOptions);
            mapEtape[gpxetape] = new L.GPX(liengpx[gpxetape], {
                polyline_options: {
                    color: '#e5b9d5',
                    weight: 5,
                    lineCap: 'round'
                }
            }).on('mouseover mousemove', function (e) {
                this.setStyle({
                    color: '#e5b9d5'
                })
                popup[gpxetape]
                    .setLatLng(e.latlng)
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
            g.on("addline", function (e) {
                e.line.options.color = "#e5b9d5";
                el.addData(e.line);
            });

        } else {
            popup[gpxetape] = L.popup(customOptions);
            mapEtape[gpxetape] = new L.GPX(liengpx[gpxetape], {
                polyline_options: {
                    color: '#6f6f6f',
                    weight: 5,
                    lineCap: 'round'
                }
            }).on('mouseover mousemove', function (e) {
                this.setStyle({
                    color: '#00246B'
                })
                popup[gpxetape]
                    .setLatLng(e.latlng)
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
    article = document.createElement("article");
    //////Etape
    etape = document.createElement("h2");

    ///Lien retour
    a = document.createElement("a");
    a.classList.add("back");
    a.href = "itineraire.html";
    arrow = document.createElement("i");
    arrow.classList.add("fa-solid");
    arrow.classList.add("fa-arrow-left-long");
    a.appendChild(arrow);
    etape.appendChild(a);

    span = document.createElement("span")
    span.innerText = value.attributes.etape;
    etape.appendChild(span)
    article.appendChild(etape);
    ///// Presentation
    divPresentation = document.createElement("div");
    divPresentation.classList.add("presentation");
    presentation = document.createElement("p");
    presentation.innerText = value.attributes.presentation;
    divPresentation.appendChild(presentation);
    lien = document.createElement("a");
    lien.classList.add("carnet")
    heart = document.createElement("i");
    heart.classList.add("fa-regular");
    heart.classList.add("fa-heart");
    lien.setAttribute("href", "#");
    lien.appendChild(heart);
    divPresentation.appendChild(lien);
    article.appendChild(divPresentation);

    // Parcour
    divParcour = document.createElement("div");
    divParcour.classList.add("parcour");

    //// Distance
    divDistance = document.createElement("div");
    divDistance.classList.add("distance");

    circle = document.createElement("i");
    circle.classList.add("fa-solid");
    circle.classList.add("fa-circle");
    divDistance.appendChild(circle);

    dis = document.createElement("p");
    dis.innerText = value.attributes.km + " Km";
    divDistance.appendChild(dis);

    divParcour.appendChild(divDistance);

    ////duree
    divDuree = document.createElement("div");
    divDuree.classList.add("duree");

    time = document.createElement("i");
    time.classList.add("fa-solid");
    time.classList.add("fa-clock");
    divDuree.appendChild(time);

    temp = document.createElement("p");
    temp.innerText = value.attributes.duree;
    divDuree.appendChild(temp);

    divParcour.appendChild(divDuree);

    ////// Niveau
    divNiv = document.createElement("div");


    circleA = document.createElement("i");
    circleA.classList.add("fa-solid");
    circleA.classList.add("fa-circle");
    divNiv.appendChild(circleA);


    textNiv = document.createElement("p");
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
    figure = document.createElement("figure");

    imgetape = document.createElement("img");
    imgetape.src = url + value.attributes.imgetape.data.attributes.formats.small.url;
    imgetape.classList.add("imgEtape");
    figure.appendChild(imgetape);
    article.appendChild(figure);

    article.appendChild(document.querySelector(".elevation"));

    ////// Description
    description = document.createElement("p");
    description.classList.add("description");
    description.innerText = value.attributes.description;
    article.appendChild(description);




window.addEventListener('resize',()=>{
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