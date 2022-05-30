//Html imports.
import { catsContainer } from "../html/elements.js";

const API_KEY = '1a7650d4-ae46-43b3-a4ba-eb34be2c2453'
const API = 'https://api.thecatapi.com/v1'
const API_IMAGES = 'https://api.thecatapi.com/v1/images/search';
const API_FAVORITES = `${API}/favourites`

// @ts-ignore
const cats = [];
const favorites = [];


//Funcion para obtener todos los gatos de la API
export async function getAll() {
    const response = await fetch(`${API_IMAGES}?limit=12`);
    const data = await response.json();

    cats.push(...data);

    console.log(cats);

    renderCats();
    
}

//renderizar todos los gato
function renderCats() {
    const templates = []
    const template = cats.forEach(cat=>{
        let htmlCode = `
            <div class="main--cat">
                <figure class='main--img-cat-container'>
                    <img src="${cat.url}" alt="cat image" class="main--cat-img">
                </figure>
                <div class="main--cat-btns-container">
                    <button class="main--cat-btn cat-btn favorite-cat-btn" cat_data='${cat.id}'>Add favorites</button>
                    <button class="main--cat-btn cat-btn">Adopt Cat</button>
                </div>
            </div>
        `
        templates.push(htmlCode)
    })

    catsContainer.innerHTML = templates.join('');

    //obtuve todos los botones de agregar a favoritos.
    const favoriteBtns = document.querySelectorAll('.favorite-cat-btn');

    //agregue un listener a cada boton de agregar a favoritos.
    favoriteBtns.forEach(btn=>{
        btn.addEventListener('click', ()=>{addFavorites(btn.getAttribute('cat_data'))})
    })
}

export async function addFavorites(image_id){
    const response = await fetch(API_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },

        body: JSON.stringify({   
            image_id: image_id   
        })
    })

    const data = await response.json();

    getFavorites();
}

export async function getFavorites(params) {
    const response = await fetch(`${API_FAVORITES}?api_key=${API_KEY}`);

    const data = await response.json();

    favorites.splice(0, favorites.length);

    favorites.push(...data);

    console.log(favorites);
}