const url="http://51.137.57.138:1337";
const apiinfo ="/api/infos/";
const img ="?populate=*";

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
function printArticle(data){
    let main = document.querySelector("main");
    let article = data.data;
    let eltArticle = main.appendChild(document.createElement("article"));
    let titre = eltArticle.appendChild(document.createElement("h1"));
    titre.innerText = article.attributes.titre;

    let illu = eltArticle.appendChild(document.createElement("img"));
    illu.setAttribute("src", url + article.attributes.illustration.data.attributes.url);
    let contenu = eltArticle.appendChild(document.createElement("p"));
    contenu.innerText = article.attributes.contenu;

}
function getArticle(){
 fetch(url + apiinfo + getParameterByName("articleID")+img)   
 .then(response => response.json())
 .then(response => printArticle(response))
 .catch(error => alert("error :" +error));
}
getArticle();