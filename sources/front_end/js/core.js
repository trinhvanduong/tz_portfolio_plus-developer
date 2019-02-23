// Only define the TZPortfolioPlus namespace if not defined.
TZ_Portfolio_Plus = window.TZ_Portfolio_Plus || {};

// Only define isotope if not defined
TZ_Portfolio_Plus.isotope = TZ_Portfolio_Plus.isotope || {};

// Only define infiniteScroll if not defined
TZ_Portfolio_Plus.infiniteScroll = TZ_Portfolio_Plus.infiniteScroll || {};


(function( $, document, Joomla, TZ_Portfolio_Plus ) {
    "use strict";
    // Generic ajax dialog
    TZ_Portfolio_Plus.dialogAjax = function (tasks) {

        // Get submitform function of Joomla
        var tppOrigSubmitForm = Joomla.submitform;

        Joomla.submitform = function (task, form, validate) {

            if (!form) {
                form = document.getElementById('adminForm');
            }

            var $form = $(form),
                tppmatch = "", layout = task;

            if(task && task.match(".")){
                tppmatch    = task.split(".");
            }

            if(tppmatch.length){
                layout  = tppmatch[tppmatch.length - 1];
            }

            if (tasks.indexOf(task) !== -1) {
                var checkboxes = $form.find("[type=checkbox][id^=cb]:checked"),
                    cids = [],
                    ajaxParams = {
                        "view": "dialog",
                        "layout": layout,
                        "format": "ajax",
                        "tmpl": "component"
                    };
                ajaxParams[Joomla.getOptions("csrf.token")] = 1;
                if (checkboxes.length) {
                    cids = checkboxes.map(function () {
                        return this.value;
                    }).get();
                    ajaxParams["cid[]"] = cids;
                }
                $.ajax({
                    url: "index.php?option=com_tz_portfolio_plus",
                    method: "POST",
                    dataType: "json",
                    data: ajaxParams
                }).done(function (result) {
                    var dataObj = $(result.data);

                    dataObj.attr("data-tpp-dialog-modal", "");
                    dataObj.find("form").append("<input type=\"hidden\" name=\"" + Joomla.getOptions("csrf.token") + "\" value=\"1\"/>");
                    dataObj.modal("show");
                    dataObj.appendTo("body");
                    dataObj.find("[data-submit-button]").on("click", function () {
                        if(dataObj.find("form").length) {
                            dataObj.find("form").submit();
                        }else{
                            tppOrigSubmitForm(task, form);
                        }
                    });
                    $('body').on('hidden.bs.modal', '[data-tpp-dialog-modal]', function () {
                        $(this).removeData('bs.modal').remove();
                    });
                });
                return;
            } else {
                tppOrigSubmitForm(task, form);
            }
        };
    };
})(jQuery, document, window.Joomla, window.TZ_Portfolio_Plus);