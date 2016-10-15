import nav from './components/nav.js';
import 'Swiper/dist/js/swiper.min';
import './components/fonts.js';
import './components/filter.js';
import './components/slider.js';
import './components/render-card';

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

	$('.slider').css({
		'margin-top': $('.nav-fixed').outerHeight()
	});
	var swiper = new Swiper('.slider',{
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 3000,
		speed:1500,
	});
	$('#content-zoom').css({
		'padding-top': $('.nav-fixed').outerHeight()
	});
})