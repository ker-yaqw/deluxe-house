
function accordion () {
    const accordion = document.querySelectorAll('.accordion-item');

    accordion.forEach(accordion => {
        accordion.addEventListener('click', e => {
            accordion.classList.toggle('accordion-item--active');

            const accordionPanel = accordion.nextElementSibling;

            if (accordion.classList.contains('accordion-item--active')) {
                accordionPanel.classList.toggle('panel--active');
            } else {
                accordionPanel.classList.toggle('panel--active');
            }
        });
    });

}

export default accordion;