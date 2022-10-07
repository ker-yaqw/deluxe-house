function modal () {

     const modal = document.querySelector('.modal');
     
    setTimeout(() => {
        openModal();   
    }, 35000);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.add('modal--hide');
        modal.classList.remove('modal--show');
        document.body.style.overflow = '';
    }
    function openModal() {
        modal.classList.add('modal--show');
        modal.classList.remove('modal--hide');
        document.body.style.overflow = 'hidden';
    }
}

export default modal;