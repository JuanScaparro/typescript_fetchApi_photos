var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PB_API_KEY, PB_URL } from "./utils/api.js";
let isLoading = false;
let photos = [];
let actualPhotoIndex = 0;
const rowElement = document.querySelector('#row');
const btnNext = document.getElementById('next');
btnNext.addEventListener('click', next);
const btnPrev = document.querySelector('#prev');
btnPrev.addEventListener('click', prev);
const spinner = document.getElementById('spinner');
const container = document.querySelector('.container');
function loadingStatus() {
    isLoading = !isLoading;
    spinner.style.display = isLoading ? "block" : "none";
    container.style.display = !isLoading ? "block" : "none";
}
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${PB_URL.base}?key=${PB_API_KEY}&q=`;
        loadingStatus();
        try {
            const resp = yield fetch(url);
            const data = yield resp.json();
            saveData(data.hits);
        }
        catch (error) {
            showError(error);
        }
        finally {
            loadingStatus();
        }
    });
}
function showError(error) {
    window.alert("UPSSSSS... te invitamos a que vuelvas a intentarlo.");
}
function saveData(data) {
    photos = data;
    buildPhotoCard(photos[actualPhotoIndex]);
}
;
function buildPhotoCard(photo) {
    const { previewURL, tags, user, type, largeImageURL } = photo;
    const text = `User: ${user} - Type: ${type}`;
    rowElement.innerHTML = '';
    const template = `<div class="card text-center">
                              <div class="card-body">
                                <a href=${largeImageURL} target="_blank">
                                 <img src=${previewURL} class="card-img-top img" alt="...">
                                </a>
                                <h3 class="card-title">${tags}</h3>
                                <p class="card-text">${text}</p>
                              </div>
                            </div>`;
    const div = document.createElement('div');
    div.innerHTML = template;
    rowElement.appendChild(div);
}
function next() {
    if (actualPhotoIndex < photos.length) {
        actualPhotoIndex++;
        buildPhotoCard(photos[actualPhotoIndex]);
    }
    else {
        window.alert('Ultima Imagen');
    }
    ;
}
;
function prev() {
    if (actualPhotoIndex > 0) {
        actualPhotoIndex--;
        buildPhotoCard(photos[actualPhotoIndex]);
    }
    else {
        window.alert('Primer Imagen');
    }
    ;
}
;
function init() {
    loadData();
}
;
init();
