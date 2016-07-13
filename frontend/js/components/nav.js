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

};

module.exports = nav;