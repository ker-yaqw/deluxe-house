import preloader from './modules/preloader';
import slider from './modules/slider';
import modal from './modules/modal';
import accordion from './modules/accordion';
import tabs from './modules/tabs';
import form from './modules/form';
import scroll from './modules/scroll';
import AOS from 'aos';


window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    
    preloader();
    AOS.init();
    scroll();
    slider();
    modal();    
    accordion();
    tabs();
    form();
});    