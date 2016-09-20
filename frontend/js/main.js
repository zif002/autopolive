import nav from './components/nav.js';
import 'Swiper/dist/js/swiper.min';
import './components/fonts.js';

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

	$('.swiper-container').css({
		'margin-top': $('.nav-fixed').outerHeight()
	});
	var swiper = new Swiper('.swiper-container',{
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 3000,
		speed:1500, 
	});
	$('.swiper-container').hover(function(){
		swiper.stopAutoplay()
	},function(){
		swiper.startAutoplay()
	})
})