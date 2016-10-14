import 'swiper';


var mySwiper = new Swiper ('.slide-card', {
    // Optional parameters
    loop: true,
    // If we need pagination

    // Navigation arrows
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',

    // And if we need scrollbar
    scrollbar: '.swiper-scrollbar',
})
// var galleryThumbs = new Swiper('.gallery-thumbs', {
//     pagination: '.swiper-pagination',
//     paginationClickable: true,
//     spaceBetween: 58,
//     slidesPerView:'auto',
//     visibilityFullFit: true,
//     autoResize: false,
//     initialSlide : 3,
//     loop : true,
//     loopedSlides : 3,
// });
// mySwiper.params.control = galleryThumbs;
// galleryThumbs.params.control = mySwiper;