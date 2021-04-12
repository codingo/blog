

// Polygon Rendering
import { default as Poly } from './polygons';
let container = document.getElementById('fss-container');
if(container){
    Poly.initialise(container);
}


// Hamburger menu
let hamburger = document.querySelector('.navigation-menu .hamburger');
let navigationMenu = document.querySelector('.navigation-menu');
let navigationList = document.querySelector('.navigation-menu .menu-list');

if(hamburger){
    hamburger.addEventListener("click", (event)=>{
        event.preventDefault();
        navigationList.classList.toggle("hidden");
    })

    // If clicked outside, then close the menu
    document.addEventListener("click", (event)=>{
        const flyoutElement = navigationMenu;
        let targetElement = event.target; 
        do {
            if (targetElement == flyoutElement) {
                return;
            }
            targetElement = targetElement.parentNode;
        } while (targetElement);
        if(!navigationList.classList.contains('hidden')){
            navigationList.classList.add("hidden");
        }
    })
}


document.addEventListener('sticky-change', e => {
    const header = e.detail.target;  // header became sticky or stopped sticking.
    const sticking = e.detail.stuck; // true when header is sticky.
    header.classList.toggle('shadow', sticking); // add drop shadow when sticking.
    console.log('Sticket')
    document.querySelector('.who-is-sticking').textContent = header.textContent;
});
