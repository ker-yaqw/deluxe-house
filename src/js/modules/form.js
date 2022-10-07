function form() {
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/svg/spinner.svg',
        success: 'Спасибо что оставили заявку!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                padding-top: 20px;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    statusMessage.remove();
                    form.reset();
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    }
    const modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('modal--show');
        modal.classList.remove('modal--hide');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('modal--hide');
        modal.classList.remove('modal--show');
        document.body.style.overflow = '';
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal-thanks__dialog');
        thanksModal.innerHTML = `
            <div class="modal-thanks__content">
                <div class="modal-thanks__close" data-close>×</div>
                <div class="modal-thanks__title">${message}</div>
                <p class="modal-thanks__text">
                    А пока вы ждете звонок, можете просмотреть наши 
                    <a class="modal-thanks__link" href="#">лучшие проекты!</a>
                    <span>Мы создаем прекрасное!</span>
                </p>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        },8000);
    }
}

export default form;