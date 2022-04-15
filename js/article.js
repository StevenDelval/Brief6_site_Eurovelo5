const url= "http://51.137.57.138:1337";
const apitemoignage = "/api/temoignages/";
const img = "?populate=*";

function getParameterByName(param) {  var vars = {};
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

function printarticle(data){
    let main = document.querySelector("main");
    let article = data.data;

    let eltarticle = main.appendChild(document.createElement("article"));

    let name = eltarticle.appendChild(document.createElement("h1"));
    name.innerText = article.attributes.name;

    let illu = eltarticle.appendChild(document.createElement("img"));
    illu.setAttribute("src",url+article.attributes.img.data[0].attributes.formats.large.url)

    let resume = eltarticle.appendChild(document.createElement("P"));
    resume.innerText = article.attributes.resume;

}

function getarticle(){
    fetch(url+ apitemoignage +getParameterByName("articleid")+img)
    .then(response=> response.json())
    .then(response => printarticle(response))
    .catch(error=>alert("error:"+ error));
}
getarticle()