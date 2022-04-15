const url = "http://51.137.57.138:1337";
const apiNews = "/api/news"
const img = "?populate=*"

function getParameterByName(param) {
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

function printNews(article) {
    let gridArticle = document.querySelector(".page-article");
    
        let eltArticle = document.createElement('article'); //on a créer un article mais il n'est nulle-part
        eltArticle.classList.add("espace-actu");//Sert à attribuer une classe à l'element.
        gridArticle.appendChild(eltArticle);

        let picture = document.createElement("img");
        picture.setAttribute("src", url + article.attributes.image.data.attributes.url);
        eltArticle.appendChild(picture);

        divTextActu = document.createElement("div");//La div est crée
        divTextActu.classList.add("text-actu-bien");//on lui a mis une classe

        //let content = document.createElement("div");
        //content.innerText

        let titre = document.createElement("h6");
        titre.innerText = article.attributes.titre;
        titre.classList.add("titre-actu-article");//Sert à attribuer une classe à l'element.
        divTextActu.appendChild(titre);

        let date = document.createElement("p");
        date.innerText = article.attributes.date;
        divTextActu.appendChild(date);

        let contenu = document.createElement("p");
        contenu.innerText = article.attributes.contenu;
        contenu.classList.add("contenu-actu-article");
        divTextActu.appendChild(contenu);

        

        eltArticle.appendChild(divTextActu);
    
}
function getNews() {
    fetch(url + apiNews + img) //fetch est une commade js qui permet de faire des appels d'API
        .then(response => response.json())//on vas récupérer des données en convertisant nos données en Json
        .then(function (response) {
            response.data.sort(function (a, b) {
                return a.id - b.id;
            })
            numArticle = getParameterByName("articleId")
            printNews(response.data[numArticle - 1])
        })
        .catch(error => alert("erreur : " + error)); //pour prevenir quand on tombe sur une erreur
}

getNews();