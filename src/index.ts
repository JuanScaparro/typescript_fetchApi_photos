import { IPhoto } from "./interfaces/iPhoto.interface.js";



let photos: IPhoto[] = [];
let actualPhotoIndex: number = 0;
const rowElement: HTMLElement = <HTMLElement>document.querySelector( '#row' );
const btnNext: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'next' )
btnNext.addEventListener( 'click', next )
const btnPrev: HTMLButtonElement = <HTMLButtonElement>document.querySelector( '#prev' )
btnPrev.addEventListener( 'click', prev )


function loadData() {
  const url = 'https://jsonplaceholder.typicode.com/photos';
  
  fetch( url )
    .then( res => res.json() )
    .then( jsonRes => saveData( jsonRes ) )
};

function saveData( data: IPhoto[] ) {
  photos = data;
  buildPhotoCard( photos[actualPhotoIndex] )
};

function buildPhotoCard( photo: IPhoto) {
  rowElement.innerHTML = '';
  const template: string = `<div class="card text-center">
                              <div class="card-body">
                                <img src=${photo.url} class="card-img-top img" alt="...">
                                <h3 class="card-title">${photo.title}</h3>
                                <p class="card-text">Id: ${photo.id} - Album Id: ${photo.albumId}</p>
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
    window.alert( 'Ultimo Imagen' );
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
