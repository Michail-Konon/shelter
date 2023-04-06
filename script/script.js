import CARDS from '../pets.js'
console.log(CARDS)
const burger = document.querySelector('.lines');
const overlay = document.querySelector('.overlay');
const menue = document.querySelector('.navigation-small');
const targetBody = document.querySelector('.body');
const targetItem = document.querySelector('.nav-list-small')

const cardOverlay = document.querySelector('.card-overlay');
const petCard = document.querySelector('.slider-card');

/*Minimise menu START*/

burger.addEventListener('click', () => {
    close();
});

overlay.addEventListener('click', () => {
    close();
});

targetItem.addEventListener('click', () => {
    close();
});

function close() {
    burger.classList.toggle('action');
    overlay.classList.toggle('show');
    menue.classList.toggle('show-menu');
    targetBody.classList.toggle('unscroll')
}

/*Minimise menu END*/

/*Popup START*/

petCard.addEventListener('click', () => {
    closePopup();
});

cardOverlay.addEventListener('click', () => {
    closePopup();
});

function closePopup() {
    overlay.classList.toggle('show');
    targetBody.classList.toggle('unscroll');
}

function popupMsg () {
    
}

/*Popup END*/

/*Unique arrray generation START*/
// generate 8 unique item array
// may cause system overload
let arr = [];
let set = new Set();

function test () {
    let set = new Set();
	for(let i = 0; i < i+1; i++) {
  	    if(set.size == 8) {
        break
    }
    set.add(Math.floor(Math.random() * (8 - 0) + 0))
  }
  return arr = Array.from(set)
}
test ();
console.log(arr);

/*Unique arrray generation END*/

/*Card generation START*/
window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
  });

/*Card generation END*/