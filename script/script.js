import CARDS from '../pets.js'

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
// generate unique item array
// may cause system overload
let randArray = [];
let set = new Set();

function uniqueArray(size = 8) {
    let set = new Set();
	for(let i = 0; i < i+1; i++) {
  	    if(set.size == size) {
        break
    }
    set.add(Math.floor(Math.random() * (8 - 0) + 0))
  }
  return randArray = Array.from(set)
}
uniqueArray();
console.log(randArray);

/*Unique arrray generation END*/



/*Card generation START*/ // Переделать, не соответствует требованиям
/*Идея для реализации требований*/
// 0) создание трех пустых оберток внутри слайдера
// 1) формирования базы(массив длинна 3) и создание на её основе в центральной оболочке 3 элементов
// 2) при нажатии -> база заносится в ногвый set и догенерируется до уникалных 6 значений 
// 3) форимруется массив из нового set и его вторая половина генерирует новые карточки в оболочке справа
// 4) блок с базой уменьшает свой размер до нуля со скрытым перекрытием
// 5) при дальнейшем нажатии -> действия повторяются
// 6) если просиходит нажатие влево(<-), все повторяется
// с разницей в том, что сгенериврованные элементы второй части массива будут генерироваться в левой оболочке
// при этом на них будет стиль сразу задающий margin с отрицательным значением равным ширине блока
// а затем стиль будет сниматься и блоки плано "задвинут" базу
// ПРОБЛЕМА: может возникунть при нажатии сначала в лево а птотом в право и наоборот,
// ТО есть "сохраняется только одно предыдущее состояние"
// ВОЗМОЖНОЕ РЕШЕНИЕ: нужна константа, для записи предыдущего состояния. В случае если выбрано
// отличное от текущего значение, то боковые оболочки сужаются до 0 а база раскрывается.
// на ширине 1280: база 3, set.size = 6 с соответствующим изменением отступов через media querry
// на ширине 768: база 2, set.size = 4  с соответствующим изменением отступов через media querry
// на ширине 320: база 1, set.size = 2  с соответствующим изменением отступов через media querry
// оболочки тоже придется переставлять с конца на начало если влево, и с начала в конец если вправо
// Готово, но анимацию карусели прикрутить так и не удалось
let baseArr;
let prevArr;
let nextArr;
let currenState = ''


function baseFormation() {
    if(window.innerWidth > 1200) {
       return baseArr = uniqueArray(3);
    };
    if(window.innerWidth < 1200 && window.innerWidth > 760) {
        return baseArr = uniqueArray(2);
    }
    if(window.innerWidth < 761) {
        return baseArr = uniqueArray(1);
    }
}


window.addEventListener("resize", (event) => {
    baseFormation();
    firstGeneration();
});

window.addEventListener("load", (event) => {
    baseFormation();
    firstGeneration();
    console.log("first generation complete");
});

function firstGeneration(arr = baseArr) {
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
        sliderBlock.firstElementChild.nextElementSibling.appendChild(div);
    })
}

function leftGeneration(arr = nextArr) {
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
        sliderBlock.firstElementChild.appendChild(div);
    });
    currenState = 'left';
}

function rightGeneration(arr = nextArr) {
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
        sliderBlock.lastElementChild.appendChild(div);
    });
    currenState = 'right';
}

// randArray as sourse
function cardGeneration() { // currently unused
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
    //moveLeft();
    if(currenState == 'left' || currenState == '') {
        testLeft(nextArr);
    } else if (currenState == 'return') {
        leftGeneration();
        currenState = 'left'
        sliderBlock.lastElementChild.innerHTML = '';
        sliderBlock.insertBefore(sliderBlock.lastElementChild, sliderBlock.firstElementChild);
    } else {
        returnState();
    }
});

controlRight.addEventListener('click', () => {
    if(currenState == 'right' || currenState == '') {
        testRight(nextArr);
    } else if (currenState == 'return') {
        rightGeneration();
        currenState = 'right';
        sliderBlock.firstElementChild.innerHTML = '';
        sliderBlock.firstElementChild.nextElementSibling.innerHTML = '';
        sliderBlock.insertBefore(sliderBlock.firstElementChild, sliderBlock.lastChild);
    } else { 
        returnState();
    }
});

function testLeft(arr = baseArr,) {
    prevArr = arr;
    let LeftSet = new Set(arr);
	for(let i = 0; i < i+1; i++) {
  	    if(LeftSet.size == (arr.length * 2)) {
            break
        }
        LeftSet.add(Math.floor(Math.random() * (8 - 0) + 0))
    }
    nextArr = Array.from(LeftSet).slice((0 - arr.length));
    leftGeneration();
    sliderBlock.lastElementChild.innerHTML = '';
    sliderBlock.insertBefore(sliderBlock.lastElementChild, sliderBlock.firstElementChild);
}

function testRight(arr = baseArr) {
    prevArr = arr;
    let RightSet = new Set(arr);
	for(let i = 0; i < i+1; i++) {
  	    if(RightSet.size == (arr.length * 2)) {
            break
        }
        RightSet.add(Math.floor(Math.random() * (8 - 0) + 0))
    }
    nextArr = Array.from(RightSet).slice((0 - arr.length));
    rightGeneration();
    sliderBlock.firstElementChild.innerHTML = '';
    sliderBlock.firstElementChild.nextElementSibling.innerHTML = '';
    sliderBlock.insertBefore(sliderBlock.firstElementChild, sliderBlock.lastChild);
}

function returnState() {
    sliderBlock.firstElementChild.innerHTML = '';
    sliderBlock.lastElementChild.innerHTML = '';
    sliderBlock.firstElementChild.nextElementSibling.innerHTML = '';
    firstGeneration(prevArr);
    currenState = 'return'
}

function moveLeft() { // currently unused
    let first = sliderBlock.firstElementChild;
    setTimeout(() => {
        first.innerHTML = '';
      }, "0");
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

function moveRight() { // currently unused
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