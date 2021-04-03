import { default as Poly } from './polygons';

var container = document.getElementById('fss-container');

if(container){
    Poly.initialise(container);
}