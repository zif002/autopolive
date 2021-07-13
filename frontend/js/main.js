import nav from './components/nav.js';
import Swiper from  'swiper';
import './components/fonts.js';
import './components/slider.js';
$(function(){
	//nav
	nav();
	//search
	$('.search').hover(function(){
		$(this).find('input').stop().animate({
			width:300
		})

	},function(){
		if($('.search').find('input').is(':focus')){
			return;
		}else{
			setTimeout(function(){
				$('.search').find('input').stop().animate({
					width:0
				},function(){
					$(this).val('')
				})
			},1500)
		}
	
		
	})
	//swiper slider

	// $('.slider').css({
	// 	'margin-top': $('.nav-fixed').outerHeight()
	// });
	var swiper = new Swiper('.slider',{
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: {
      delay: 5000,
    },
		speed: 1500,
		effect: 'fade',
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows : true,
		},
	});
	
})

$(() => {
  const  pswpElement = document.querySelector('.pswp');
  if(!pswpElement) return;
  const options = {
    // optionName: 'option value'
    // for example:
    shareEl: false,
    zoomEl: true,
    closeOnScroll: false,
  };
  const getItems = function() {
    var items = [];
    
    $('.gallery').find('.gallery-item').each(function(index, _) {
        const $el = $('a', this);
        let $href   = $el.attr('href'),
        $title = $(this).find("figcaption").text()
        items.push({
          src : $href,
          w   : 0,
          h   : 0,
          _index: index,
          title: $title
      });
    });
    
    return items;
  }
  const items = getItems();
  
  
  $('.gallery-item').on("click", (e) => {
    options.index = $(e.target).closest(".gallery-item").index();
    const gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items.sort((a, b) => a._index - b.index), options);
    gallery.listen('imageLoadComplete', function (index, item) {
      if (item.h < 1 || item.w < 1) {
        let img = new Image()
        img.onload = () => {
          item.w = img.width
          item.h = img.height
          gallery.invalidateCurrItems()
          gallery.updateSize(true)
        }
        img.src = item.src
      }
    })
    gallery.init();
  })


  $('.gallery-item a').on('click', (e) => {
    e.preventDefault();
  })


})