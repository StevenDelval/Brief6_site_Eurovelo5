const url = "http://51.137.57.138:1337";
const apiinfo = "/api/infos";
const img = "?populate=*";

function printinfo(data) {
    let main = document.querySelector("main");

    let compteur = 0;

    for (let article of data.data) {
        console.log(article)
        let eltArticle = document.createElement("article");
        main.appendChild(eltArticle);
        eltArticle.classList.add("info_titre");
        if (compteur === 0 || compteur === 3 || compteur === 8) {
            eltArticle.classList.add("double");
        }
        let titre = document.createElement("h1");
        titre.innerText = article.attributes.titre;
        
        /* let lien = document.createElement("a");
        lien.setAttribute("href","article.html?articleID=" + article.id);
        lien.innerText ="En savoir plus"; */
        /* eltArticle.appendChild(lien); */

        eltArticle.classList.add("info-img")
        eltArticle.appendChild(titre);
        let picture = document.createElement("img");
        picture.setAttribute("src", url + article.attributes.illustration.data.attributes.url);
        eltArticle.appendChild(picture);
        
        

        eltArticle.addEventListener("click", ()=>{
            document.location.href =  article.attributes.redirection ;
        }
        )
        compteur++;
    }
}


function getinfo() {

    fetch(url + apiinfo + img)
        .then(response => response.json())
        .then(function (response) {
            response.data.sort(function (a, b) {
                return a.id - b.id;
            })
            printinfo(response);
        })
        .catch(error => alert("erreur :" + error));
}

getinfo();
