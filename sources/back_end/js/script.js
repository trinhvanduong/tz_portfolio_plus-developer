(function ($) {
    "use strict";

    $(document).ready(function(){
        if($("#tmpl-tpPortfolio-footer").length) {
            if($("#j-main-container").length) {
                $("#j-main-container").append($("#tmpl-tpPortfolio-footer").html());
            }else{
                if($("form[name=adminForm]").length){
                    $("form[name=adminForm]").append($("#tmpl-tpPortfolio-footer").html());
                }
            }
        }
    })
})(jQuery);