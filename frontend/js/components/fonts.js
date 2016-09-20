import 'webfontloader/webfontloader';
var loadFonts = function(){
    WebFont.load({
        google: {
            families: ['Roboto:300,400,500,700']
        }
    });
}


module.exports = loadFonts;