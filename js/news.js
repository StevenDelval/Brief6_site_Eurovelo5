const url = "http://51.137.57.138:1337";
const apiNews = "/api/news"
const img = "?populate=*"

function printNews(data) {
    let gridArticle = document.querySelector(".grid-article");
    for (let article of data.data) {//on a plusieurs données, on vas utiliser le for of
        let eltArticle = document.createElement('article'); //on a créer un article mais il n'est nulle-part
        eltArticle.classList.add("cartel-actu-long");//Sert à attribuer une classe à l'element.
        gridArticle.appendChild(eltArticle);

        let picture = document.createElement("img");
        picture.setAttribute("src", url+article.attributes.image.data.attributes.formats.medium.url);
        eltArticle.appendChild(picture);

        divTextActu =  document.createElement("div");//La div est crée
        divTextActu.classList.add("text-actu");//on lui a mis une classe

        //let content = document.createElement("div");
        //content.innerText
        

        let titre = document.createElement("h6");
        titre.innerText = article.attributes.titre;
        titre.classList.add("titre-actu");//Sert à attribuer une classe à l'element.
        divTextActu.appendChild(titre);

        let date = document.createElement("p");
        date.innerText = article.attributes.date;
        divTextActu.appendChild(date);

        let contenu = document.createElement("p");
        contenu.innerText = article.attributes.contenu;
        contenu.classList.add("contenu-actu");
        divTextActu.appendChild(contenu);

        
        eltArticle.appendChild(divTextActu);
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

