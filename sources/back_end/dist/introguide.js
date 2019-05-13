(function ($, window) {
    "use strict";

    window.tppIntroGuide   = function(view, steps, stripped, token){
        if(typeof introJs === "undefined"){
            return;
        }

        var introguide  = introJs();

        if(!steps){
            return;
        }

        introguide.addSteps(steps);

        introguide.onbeforechange(function(targetElement) {
            $(this._targetElement).addClass("tpp-intro-guide__loaded");
        });

        introguide.onbeforeexit(function() {
            $(this._targetElement).removeClass("tpp-intro-guide__loaded");
        });

        introguide.onexit(function() {
            var data        = {};
            data["v"]       = view;
            data[token]   = 1;
            data["task"]   = "introguide";
            $.ajax({
                method: "POST",
                url: "index.php?option=com_tz_portfolio_plus",
                data: data
            }).done(function(){
                $("#toolbar-support").show();
            });
        });

        $("#toolbar-support").on("click", function(){
            introguide.start();
        });

        if(!stripped){
            $("#toolbar-support").hide();
            introguide.start();
        }

        return introguide;
    };
})(jQuery, window);