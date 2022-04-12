const url = "http://51.137.57.138:1337";
const apiNews = "/api/news"
const img = "?populate=*"

function printNews(data) {
    let gridArticle = document.querySelector(".grid-article");
    for (let article of data.data) {//on a plusieurs données, on vas utiliser le for of
        let eltArticle = document.createElement('article'); //on a créer un article mais il n'est nulle-part
        gridArticle.appendChild(eltArticle);
        let titre = document.createElement("h6");
        titre.innerText = article.attributes.titre;
        eltArticle.classList.add("cartel-actu-long");
        eltArticle.appendChild(titre);
    }
}
function getNews() {
    fetch(url + apiNews + img) //fetch est une commade js qui permet de faire des appels d'API
        .then(response => response.json())//on vas récupérer des données en convertisant nos données en Json
        .then(response => printNews(response))
        .catch(error => alert("erreur : " + error)); //pour prevenir quand on tombe sur une erreur
}

getNews();
//pour appeler la fonction qu'on viens de faire

