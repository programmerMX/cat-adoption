//Html imports.
import { catsContainer } from "../html/elements.js";

const API_KEY = '1a7650d4-ae46-43b3-a4ba-eb34be2c2453'
const API_IMAGES = 'https://api.thecatapi.com/v1/images/search'

// @ts-ignore
const cats = [];
const favorites = [];


//Funcion para obtener todos los gatos de la API
export async function getAll() {
    const response = await fetch(`${API_IMAGES}?limit=12`);
    const data = await response.json();

    cats.push(...data);

    renderCats();
    
}

//renderizar todos los gato
function renderCats() {
    console.log(cats);

    const templates = []
    const template = cats.forEach(cat=>{
        let htmlCode = `
            <div class="main--cat">
                <figure class='main--img-cat-container'>
                    <img src="${cat.url}" alt="cat image" class="main--cat-img">
                </figure>
                <div class="main--cat-btns-container">
                    <button class="main--cat-btn cat-btn">Add favorites</button>
                    <button class="main--cat-btn cat-btn">Adopt Cat</button>
                </div>
            </div>
        `
        templates.push(htmlCode)
    })

    catsContainer.innerHTML = templates.join('');

}