let app = angular.module("keepSimpleApp", ["ngMaterial", "LocalForageModule"]);

/*$(document).ready(function() {
    let layoutWrapper = $("#layout-wrapper");

    layoutWrapper.sortable({

        start: function(event, ui) {            
            console.log(ui); 
            ui.item.removeClass('masonry-brick');
            ui.item.parent().masonry('reloadItems')
        },

        change:function(event, ui) {
            ui.item.parent().masonry('reloadItems');
        },

        stop: function(event, ui) { 
            ui.item.addClass('masonry-brick');
            ui.item.parent().masonry('reloadItems');
        }
    });
});
*/