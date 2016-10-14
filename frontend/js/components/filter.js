import 'ion-rangeslider';
import 'selectize';


$('.range-slide').ionRangeSlider();
$('.custom-select').selectize();
var filter = $('.filter');
if(filter.length){
    var filterW = filter.outerWidth();
    filter.css({
        right : -filterW
    })
    $('.btn-filter').on('click', function(){
        if(filter.is('.is-open')){
            filter.stop().animate({
                right:-filterW
            }, function(){
                $(this).removeClass('is-open')
            })
        }else{
            filter.stop().animate({
                right:0
            }, function(){
                $(this).addClass('is-open')
            })
        }

    })

    $(document).mouseup(function (e)    {
        var container = $(filter);
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            filter.stop().animate({
                right:-filterW
            }, function(){
                $(this).removeClass('is-open')
            })
        }
    });
    if($(window).height() < filter.offset().top + filter.outerHeight()){
        filter.css({
            height: $(window).height() - filter.offset().top,
            'overflow': 'auto'
        })
    }
}




