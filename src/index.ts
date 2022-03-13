//import { IPhoto } from "./interfaces/iPhoto.interface.js";
import { IPizzaPhotos, IPhoto } from "./interfaces/iPizzaPhotos.interface.js";
import { PB_API_KEY, PB_URL } from "./utils/api.js";


let isLoading: boolean = false
let photos: IPhoto[] = [];
let actualPhotoIndex: number = 0;
const rowElement: HTMLElement = <HTMLElement>document.querySelector( '#row' );
const btnNext: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'next' )
btnNext.addEventListener( 'click', next )
const btnPrev: HTMLButtonElement = <HTMLButtonElement>document.querySelector( '#prev' )
btnPrev.addEventListener( 'click', prev )
const spinner: HTMLElement = <HTMLElement>document.getElementById('spinner')
const container: HTMLElement = <HTMLElement>document.querySelector('.container')

function loadingStatus(){
  isLoading = !isLoading
  spinner.style.display = isLoading ? "block" : "none"
  container.style.display = !isLoading ? "block" : "none"
}

async function loadData(){
  const url = `${PB_URL.base}?key=${PB_API_KEY}&q=`;
  loadingStatus()
    try {
      const resp = await fetch( url )
      const data = await resp.json()
      saveData(data.hits)
    } catch (error: any) {
      showError(error)
    } finally{
      loadingStatus()
    }
}

function showError(error: any){
  window.alert("UPSSSSS... te invitamos a que vuelvas a intentarlo.")
}

function saveData( data: IPhoto[] ) {
  photos = data;
  buildPhotoCard( photos[actualPhotoIndex] )
};

function buildPhotoCard( photo: IPhoto) {
  const { previewURL, tags, user, type, largeImageURL } = photo
  const text = `User: ${user} - Type: ${type}`
  rowElement.innerHTML = '';
  const template: string = `<div class="card text-center">
                              <div class="card-body">
                                <a href=${largeImageURL} target="_blank">
                                 <img src=${previewURL} class="card-img-top img" alt="...">
                                </a>
                                <h3 class="card-title">${tags}</h3>
                                <p class="card-text">${text}</p>
                              </div>
                            </div>`
  const div = document.createElement( 'div' );
  div.innerHTML = template;
  rowElement.appendChild( div );
}

function next() {
  if( actualPhotoIndex < photos.length ) {
    actualPhotoIndex ++;
    buildPhotoCard( photos[actualPhotoIndex] )
  }else{
    window.alert( 'Ultima Imagen' );
  };
};

function prev() {
  if( actualPhotoIndex > 0 ){
    actualPhotoIndex --;
    buildPhotoCard( photos[actualPhotoIndex] )
  }else{
    window.alert( 'Primer Imagen' );
  };
};

function init() {
  loadData();
};

init();
