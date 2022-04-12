const url = "http://51.137.57.138:1337";
const apiinfo = "/api/infos";
const img = "?populate=*";

function printinfo(data){
    let main = document.querySelector("main");
    console.log(data)

    let compteur = 0;

    for (let article of data.data){
        let eltArticle = document.createElement("article");
        main.appendChild(eltArticle);
        eltArticle.classList.add("info_titre");
        if (compteur === 1 ||compteur === 3 || compteur === 8 ) {
            eltArticle.classList.add("double");
        } 
        let titre = document.createElement("h1");
        titre.innerText = article.attributes.titre;

        
        eltArticle.classList.add("info-img") 
        eltArticle.appendChild(titre);
        let picture = document.createElement("img");
        picture.setAttribute("src", url + article.attributes.illustration.data.attributes.url);
        eltArticle.appendChild(picture);
        compteur ++;
    }
}

function getinfo(){

    fetch(url + apiinfo + img)
    .then(response => response.json())
    .then(response => printinfo(response))
    .catch(error => alert("erreur :" + error));
}

getinfo();
