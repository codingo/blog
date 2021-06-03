
// Polygon Rendering
import { default as Poly } from './polygons';

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    
    let container = document.getElementById('fss-container');
    if(container){
        Poly.initialise(container);
    }

    // let footer = document.getElementById('fss-container-footer');
    // console.log(footer)
    // if(footer){
    //     console.log('footin found')
    //     Poly.initialise(footer);
    // }

    
    // Hamburger menu
    let hamburger = document.querySelector('.navigation-menu .hamburger');
    let navigationMenu = document.querySelector('#site-menu');
    let navigationList = document.querySelector('#site-menu .menu-list');

    if(hamburger){
        hamburger.addEventListener("click", (event)=>{
            event.preventDefault();
            navigationMenu.classList.toggle("hidden");
            if(document.documentElement.scrollTop < 50){
                window.scrollTo({
                    top: 100
                })
            }
        })

        // If clicked outside, then close the menu
        // document.addEventListener("click", (event)=>{
        //     const flyoutElement = navigationMenu;
        //     let targetElement = event.target; 
        //     do {
        //         if (targetElement == flyoutElement) {
        //             return;
        //         }
        //         targetElement = targetElement.parentNode;
        //     } while (targetElement);
        //     if(!flyoutElement.classList.contains('hidden')){
        //         flyoutElement.classList.add("hidden");
        //     }
        // })
    }

    let secondMenu = document.getElementById('second-menu');
    let pageMenu = document.getElementById('page-menu');
    let compactLogo = document.getElementById('video-logo-compact');
    let niceClassyName = 'its-your-time-to-shine';
    window.addEventListener("scroll", ()=>{
        
        if(secondMenu){
            let fromTop = secondMenu.offsetParent.offsetTop;
            if(window.pageYOffset >= fromTop){
                if(!secondMenu.classList.contains(niceClassyName)){
                    secondMenu.classList.toggle(niceClassyName);
                    compactLogo.currentTime = 0;
                    compactLogo.play();
                }
            }else{
                if(secondMenu.classList.contains(niceClassyName)){
                    secondMenu.classList.toggle(niceClassyName);
                }
                if(!navigationMenu.classList.contains('hidden')){
                    navigationMenu.classList.add("hidden");
                }
            }
        }

        if(pageMenu){
            let fromTop = pageMenu.offsetParent.offsetTop;
            if(window.pageYOffset >= fromTop){
                if(!pageMenu.parentElement.classList.contains('niceClassyName')){
                    pageMenu.parentElement.classList.toggle('niceClassyName');                    
                }
            }else{
                if(pageMenu.parentElement.classList.contains('niceClassyName')){
                    pageMenu.parentElement.classList.toggle('niceClassyName');
                }
            }
        }
    })

});

document.addEventListener('sticky-change', e => {
    const header = e.detail.target;  // header became sticky or stopped sticking.
    const sticking = e.detail.stuck; // true when header is sticky.
    header.classList.toggle('shadow', sticking); // add drop shadow when sticking.
    console.log('Sticket')
    document.querySelector('.who-is-sticking').textContent = header.textContent;
});
