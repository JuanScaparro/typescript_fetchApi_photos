import { IPhoto } from "./interfaces/iPizzaPhotos.interface.js";
import { PB_API_KEY, PB_URL } from "./utils/api.js";


let isLoading: boolean = false;
let originalPhotos: IPhoto[] = [];
let sourcePhotos: IPhoto[] = [];
const quantity: number = 8;
let currentPage: number = 1;

const rowElement: HTMLElement = <HTMLElement>document.querySelector( '#row' );
const btnNext: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'next' );
btnNext.addEventListener( 'click', next );
const btnPrev: HTMLButtonElement = <HTMLButtonElement>document.querySelector( '#prev' );
btnPrev.addEventListener( 'click', prev );
const spinner: HTMLElement = <HTMLElement>document.getElementById( 'spinner' );
const container: HTMLElement = <HTMLElement>document.querySelector( '.container' );
const pageLabel: HTMLElement = <HTMLElement>document.getElementById( 'pageLabel' );
const inputSearch: HTMLInputElement = <HTMLInputElement>document.getElementById( 'inputSearch' );
const btnSearch: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'btnSearch' );
btnSearch.addEventListener( 'click', search );


function loadingStatus(){
  isLoading = !isLoading;
  spinner.style.display = isLoading ? 'block' : 'none';
  container.style.display = !isLoading ? 'block' : 'none';
};

async function loadData(){
  const url = `${ PB_URL.base }?key=${ PB_API_KEY }&q=`;
  loadingStatus();
    try {
      const resp = await fetch( url )
      const data = await resp.json()
      saveData( data.hits );
    } catch ( error: any ) {
      showError( error );
    } finally{
      loadingStatus();
    };
};

function showError( error: any ){
  window.alert( 'UPSSSSS... te invitamos a que vuelvas a intentarlo.' );
};

// Finder
function search(e: any) {
  e.preventDefault();
  const text: string = inputSearch.value.trim();
  if( text === '' ){
    return;
  };
  inputSearch.value = "";
  const filteredPhotos: IPhoto[] = sourcePhotos.filter( photo => photo.tags.includes( text ) );
  if( filteredPhotos.length === 0 ){
    window.alert( 'No se encontro resultado de busqueda' );
    return;
  };
  sourcePhotos = filteredPhotos;
  resetGallery();
  buildPage();
};


function saveData( data: IPhoto[] ) {
  originalPhotos = data;
  sourcePhotos = originalPhotos;
  buildPage();
};

function buildPage() {
  let pages = sourcePhotos.slice( currentPage*quantity-quantity, currentPage*quantity )
  pageLabel.textContent = `${ currentPage.toString() } / ${ Math.ceil( sourcePhotos.length / quantity ) }`;
  pages.forEach( photo => {
    buildPhotoCard( photo );
  });
};

function buildPhotoCard( photo: IPhoto ) {
  const { previewURL, tags, user, type, largeImageURL } = photo;
  const text = `User: ${ user } - Type: ${ type }`;
  const template: string = `<div class="card text-center m-2">
                              <div class="card-body">
                                <a href=${ largeImageURL } target="_blank">
                                 <img src=${ previewURL } class="card-img-top img-thumbnail" alt="...">
                                </a>
                                <h3 class="card-title">${ tags }</h3>
                                <p class="card-text">${ text }</p>
                              </div>
                            </div>`;
  const div = document.createElement( 'div' );
  div.innerHTML = template;
  rowElement.appendChild( div );
};

function resetGallery() {
  rowElement.innerHTML = '';
}

function next() {
  if( currentPage < Math.ceil( sourcePhotos.length / quantity ) ) {
    currentPage ++;
    resetGallery();
    buildPage();
  }else{
    window.alert( 'Ultima página' );
  };
};

function prev() {
  if( currentPage > 1 ){
    currentPage --;
    resetGallery();
    buildPage();
  }else{
    window.alert( 'Primer página' );
  };
};

function init() {
  loadData();
};

init();
