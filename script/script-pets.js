import CARDS from '../pets.js'

const burger = document.querySelector('.lines');
const overlay = document.querySelector('.overlay');
const menue = document.querySelector('.navigation-small');
const targetBody = document.querySelector('.body');
const targetItem = document.querySelector('.nav-list-small');

const pageCounter = document.querySelector('.control-counter');
const pageFirst = document.querySelector('.btn-first');
const pagePrev = document.querySelector('.btn-prev');
const pageNext = document.querySelector('.btn-next');
const pageLast = document.querySelector('.btn-last');

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

/*windoww event*/

window.addEventListener("load", (event) => {
    uniqueFormation();
    cardGeneration(completeArray.flat());
    console.log("first generation complete");
});

/*Unique arrray generation START*/

let completeArray = [];
let set = new Set();

function uniqueArray(size = 8) {
    let set = new Set();
	for(let i = 0; i < i+1; i++) {
  	    if(set.size == size) {
        break
    }
    set.add(Math.floor(Math.random() * (8 - 0) + 0))
  }
  return Array.from(set)
};

function uniqueFormation() {
    for(let i = 0; i < i+1; i++) {
        if(completeArray.length == 6) {
        break
        }
        completeArray.push(uniqueArray())
    }
};

uniqueFormation();
console.log(completeArray);
console.log(completeArray.flat());
/*Unique arrray generation END*/

/*card generation START*/
const sliderBlock = document.querySelector('.slider-main_block');

function cardGeneration(arr = completeArray) {
    arr.forEach((el) => {
        let div = document.createElement('div');
        div.classList.add('slider-card');
        div.addEventListener('click', () => {
            let popupContent = document.createElement('div');
                popupContent.classList.add('popup-block');
            let popupClose = document.createElement('div');
                popupClose.addEventListener('click', () => {
                closePopup();
            })
            popupClose.classList.add('popup-close');
            popupContent.addEventListener('click', (e)=> {
                e.stopPropagation();
            })
            popupContent.innerHTML = 
            `<img src="${CARDS[el].img}" alt="${CARDS[el].name}" class="popup-img">
            <div class="popup-content">
                <h4 class="popup-title">${CARDS[el].name}</h4>
                <p class="popup-subtitle">${CARDS[el].type} - ${CARDS[el].breed}</p>
                <p class="popup-description">${CARDS[el].description}</p>
                <ul class="popup-list">
                    <li class="popup-item"><span>Age:</span> ${CARDS[el].age}</li>
                    <li class="popup-item"><span>Inoculations:</span> ${CARDS[el].inoculations}</li>
                    <li class="popup-item"><span>Diseases:</span> ${CARDS[el].diseases}</li>
                    <li class="popup-item"><span>Parasites:</span> ${CARDS[el].parasites}</li>
                </ul>
            </div>`
          openPopup();
          popupContent.appendChild(popupClose);
          cardOverlay.appendChild(popupContent);
        });
        div.innerHTML = `
            <img class="card-img" src="${CARDS[el].img}" alt="${CARDS[el].name}">
            <p class="card-title">${CARDS[el].name}</p>
            <button class="btn-card btn">Learn more</button>`
        sliderBlock.appendChild(div);
    })
}

/*card generation END*/

/*Popup START*/ // Undone
const cardOverlay = document.querySelector('.card-overlay');

cardOverlay.addEventListener('click', () => {
    closePopup();
});

function closePopup() {
    cardOverlay.classList.toggle('show');
    targetBody.classList.toggle('unscroll');
    cardOverlay.innerHTML = '';
}

function openPopup() {
    cardOverlay.innerHTML = '';
    cardOverlay.classList.add('show');
    targetBody.classList.toggle('unscroll');
}

function popupMsg () {
    
}

/*Popup END*/