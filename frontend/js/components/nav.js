var nav = function(){
	let flag = true;
	$(window).on('scroll', function(e){
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if(scrollTop < 1 ){
			$('.nav-fixed').removeClass('nav--scroll');
		}else{
			if($('.nav-fixed').is('.nav--scroll')){
				
			}else{
				$('.nav-fixed').addClass('nav--scroll');
			}
			
		}
	})
	$('.main-nav').css({
		left: - $('.main-nav').outerWidth()
	}); 
	// comp nav menu slide left
	var navClose = function(nav){
		let navW = nav.outerWidth();
		nav.stop().animate({
			left: - navW
		},function(){
			nav.removeClass('nav-opened');
		});
	};
	$('.burger').on('click', function(e){
		e.stopPropagation();
		$(this).toggleClass('burger-close');
		var nav = $('.main-nav');
		nav.height($(window).height() - $('.nav-fixed').outerHeight());
		if(nav.is('.nav-opened')){
			navClose(nav);
			$('#content-zoom').removeClass('zoom')
			$('.overlay').fadeOut()
			$(this).removeClass('burger-close');
		} else {
			nav.addClass('nav-opened');
			nav.stop().animate({
				left: 0
			});
			$('#content-zoom').addClass('zoom')
			$('.overlay').fadeIn()
			$(this).addClass('burger-close');
		}
		
	});
	$(document).mouseup(function (e){
		var container = $('.main-nav');
		if (!container.is(e.target) // if the target of the click isn't the container...
			&& container.has(e.target).length === 0) // ... nor a descendant of the container		{
			if(container.is('.nav-opened')){
				navClose(container);
				$('#content-zoom').removeClass('zoom')
				$('.overlay').fadeOut()
				if($('.burger').is('.burger-close')){
					$('.burger').removeClass('burger-close')
				}
			}
			
	});

};

module.exports = nav;