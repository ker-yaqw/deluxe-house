function preloader() {
    document.body.style.overflow = "hidden";

    window.onload = function () {
        window.setTimeout(function () {
            document.body.style.overflow = "";
            document.body.classList.add('loaded');
        }, 500);
    }
}
export default preloader;