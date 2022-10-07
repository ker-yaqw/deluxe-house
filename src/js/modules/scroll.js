function scroll () {
    const header = document.querySelector('header');

    window.onscroll = () => {
        let scroll = window.scrollY;
        console.log(scroll);
        if(scroll >= 100){
            header.classList.add('sticky');
        }else {
            header.classList.remove('sticky');
        } 
    }
} 

export default scroll;