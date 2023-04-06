import CARDS from '../pets.js'
console.log(CARDS);

const burger = document.querySelector('.lines');
const overlay = document.querySelector('.overlay');
const menue = document.querySelector('.navigation-small');
const targetBody = document.querySelector('.body');
const targetItem = document.querySelector('.nav-list-small');

const controlLeft = document.querySelector('.left');
const controlRight = document.querySelector('.right');
const sliderBlock = document.querySelector('.slider-main_block');

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

/*Unique arrray generation START*/
// generate 8 unique item array
// may cause system overload
let randArray = [];
let set = new Set();

function test () {
    let set = new Set();
	for(let i = 0; i < i+1; i++) {
  	    if(set.size == 8) {
        break
    }
    set.add(Math.floor(Math.random() * (8 - 0) + 0))
  }
  return randArray = Array.from(set)
}
test ();
console.log(randArray);

/*Unique arrray generation END*/



/*Card generation START*/
window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    cardGeneration();
});
// randArray as sourse
function cardGeneration() {
    randArray.forEach((el) => {
        let div = document.createElement('div');
        div.classList.add('slider-card');
        div.addEventListener('click', () => {
            closePopup();
        });
        div.innerHTML = `
            <img class="card-img" src="${CARDS[el].img}" alt="${CARDS[el].name}">
            <p class="card-title">${CARDS[el].name}</p>
            <button class="btn-card btn">Learn more</button>`
        sliderBlock.appendChild(div);
    })
}

/*Card generation END*/



/*Infinite carousel START*/ // Done https://quirksmode.org/dom/core/nodeTreeWithEmpty.html
controlLeft.addEventListener('click', () => {
    moveLeft();
});

controlRight.addEventListener('click', () => {
    moveRight();
});

function moveLeft() {
    let first = sliderBlock.firstElementChild;
    setTimeout(() => {
        first.classList.add('hide-first');
      }, "0");
    setTimeout(() => {
        sliderBlock.insertBefore(sliderBlock.firstElementChild, sliderBlock.lastChild);
      }, "200");
      setTimeout(() => {
        first.classList.remove('hide-first');
      }, "200"); 
}

function moveRight() {
    let last = sliderBlock.lastElementChild;
    setTimeout(() => {
        last.classList.add('hide-last');
      }, "0");
    setTimeout(() => {
        sliderBlock.insertBefore(sliderBlock.lastElementChild, sliderBlock.firstElementChild);
      }, "0");
    setTimeout(() => {
        last.classList.remove('hide-last');
    }, "50"); 
}

/*Infinite carousel START*/



/*Popup START*/ // Undone
const cardOverlay = document.querySelector('.card-overlay');

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