import Swiper from 'swiper/bundle';


function slider ()  {
    const Indexswiper = new Swiper('.swiper', {
        loop: true,

        pagination: {
            el: '.swiper-pagination',
            clickable:true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
       speed: 800,


        autoplay: {
           delay: 5000,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
};

export default slider;