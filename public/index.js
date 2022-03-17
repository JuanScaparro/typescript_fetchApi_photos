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
let originalPhotos = [];
let sourcePhotos = [];
const quantity = 8;
let currentPage = 1;
const rowElement = document.querySelector('#row');
const btnNext = document.getElementById('next');
btnNext.addEventListener('click', next);
const btnPrev = document.querySelector('#prev');
btnPrev.addEventListener('click', prev);
const spinner = document.getElementById('spinner');
const container = document.querySelector('.container');
const pageLabel = document.getElementById('pageLabel');
const inputSearch = document.getElementById('inputSearch');
const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', search);
function loadingStatus() {
    isLoading = !isLoading;
    spinner.style.display = isLoading ? 'block' : 'none';
    container.style.display = !isLoading ? 'block' : 'none';
}
;
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
        ;
    });
}
;
function showError(error) {
    window.alert('UPSSSSS... te invitamos a que vuelvas a intentarlo.');
}
;
// Finder
function search(e) {
    e.preventDefault();
    const text = inputSearch.value.trim();
    if (text === '') {
        return;
    }
    ;
    inputSearch.value = "";
    const filteredPhotos = sourcePhotos.filter(photo => photo.tags.includes(text));
    if (filteredPhotos.length === 0) {
        window.alert('No se encontro resultado de busqueda');
        return;
    }
    ;
    sourcePhotos = filteredPhotos;
    resetGallery();
    buildPage();
}
;
function saveData(data) {
    originalPhotos = data;
    sourcePhotos = originalPhotos;
    buildPage();
}
;
function buildPage() {
    let pages = sourcePhotos.slice(currentPage * quantity - quantity, currentPage * quantity);
    pageLabel.textContent = `${currentPage.toString()} / ${Math.ceil(sourcePhotos.length / quantity)}`;
    pages.forEach(photo => {
        buildPhotoCard(photo);
    });
}
;
function buildPhotoCard(photo) {
    const { previewURL, tags, user, type, largeImageURL } = photo;
    const text = `User: ${user} - Type: ${type}`;
    const template = `<div class="card text-center m-2">
                              <div class="card-body">
                                <a href=${largeImageURL} target="_blank">
                                 <img src=${previewURL} class="card-img-top img-thumbnail" alt="...">
                                </a>
                                <h3 class="card-title">${tags}</h3>
                                <p class="card-text">${text}</p>
                              </div>
                            </div>`;
    const div = document.createElement('div');
    div.innerHTML = template;
    rowElement.appendChild(div);
}
;
function resetGallery() {
    rowElement.innerHTML = '';
}
function next() {
    if (currentPage < Math.ceil(sourcePhotos.length / quantity)) {
        currentPage++;
        resetGallery();
        buildPage();
    }
    else {
        window.alert('Ultima página');
    }
    ;
}
;
function prev() {
    if (currentPage > 1) {
        currentPage--;
        resetGallery();
        buildPage();
    }
    else {
        window.alert('Primer página');
    }
    ;
}
;
function init() {
    loadData();
}
;
init();
