// import panel from "card-goods-panel"

$(function(){

    let url = $().data('ajax-url');
    $('.model-list__model-item').on('click', function(){
        var model = $(this).text().trim();
        // panel(model, url).done(function(data){
        //     console.log(data)
        // })
    });
})



