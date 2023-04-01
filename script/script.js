const burger = document.querySelector('.lines');
const overlay = document.querySelector('.overlay');
const menue = document.querySelector('.navigation-small');
const targetBody = document.querySelector('.body');
const targetItem = document.querySelector('.nav-list-small')

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