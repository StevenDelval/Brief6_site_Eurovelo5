const button=document.querySelector('button');
const carte=document.querySelector('button > #carte');
const text=document.querySelector('button > #text');

const contenu=document.getElementById("contenu");
const divMap=document.getElementById("map");
carte.classList.toggle("active");
    text.classList.toggle("active");
    contenu.classList.toggle("active");
    divMap.classList.toggle("active");

button.addEventListener('click',()=>{
    carte.classList.toggle("active");
    text.classList.toggle("active");
    contenu.classList.toggle("active");
    divMap.classList.toggle("active");

});