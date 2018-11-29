(function (document) {
    "use strict";
    document.addEventListener('DOMContentLoaded', function() {
        var btngroups   = document.querySelectorAll(".btn-group.switcher");
        for (var i = 0, l = btngroups.length; l>i; i++) {
            btngroups[i].classList.remove("btn-group");
        }
    });
})(document);