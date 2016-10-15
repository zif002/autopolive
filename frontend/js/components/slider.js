import 'swiper';


var mySwiper = new Swiper ('.slide-card', {
    // Optional parameters
    loop: true,
    // If we need pagination
    // Navigation arrows
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
})
var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true
});
mySwiper.params.control = galleryThumbs;
galleryThumbs.params.control = mySwiper;