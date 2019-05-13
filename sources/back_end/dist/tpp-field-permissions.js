"use strict";

/* For Joomla 3 */
(function($, window, Joomla){

    if(typeof window.sendPermissions != "undefined") {
        var tppOrginalSendPermissions = sendPermissions;
        window.sendPermissions = function (event) {
            //get values and prepare GET-Parameter
            var asset = "not";
            var component = getUrlParam('component');
            var extension = getUrlParam('extension');
            var option = getUrlParam('option');
            var section = getUrlParam('section');
            var view = getUrlParam('view');
            var title = component;
            var value = this.value;

            if (view == "acl") {

                //        // set the icon while storing the values
                var icon = document.getElementById("icon_" + this.id);
                icon.removeAttribute("class");
                icon.setAttribute("style", "background: url(../media/system/images/modal/spinner.gif); display: inline-block; width: 16px; height: 16px");

                asset = option + "." + section;
                title = document.getElementById('jform_title').value;

                var id = this.id.replace("jform_rules_", "");
                var lastUnderscoreIndex = id.lastIndexOf("_");

                var permission_data = {
                    comp: asset,
                    action: id.substring(0, lastUnderscoreIndex),
                    rule: id.substring(lastUnderscoreIndex + 1),
                    value: value,
                    title: title
                };

                // Remove js messages, if they exist.
                Joomla.removeMessages();

                // doing ajax request
                $.ajax({
                    method: "POST",
                    url: document.getElementById("permissions-sliders").getAttribute("data-ajaxuri"),
                    data: permission_data,
                    datatype: "json"
                })
                    .fail(function (jqXHR, textStatus, error) {
                        // Remove the spinning icon.
                        icon.removeAttribute("style");

                        Joomla.renderMessages(Joomla.ajaxErrorsMessages(jqXHR, textStatus, error));

                        window.scrollTo(0, 0);

                        icon.setAttribute("class", "icon-cancel");
                    })
                    .done(function (response) {
                        // Remove the spinning icon.
                        icon.removeAttribute("style");

                        if (response.data) {
                            // Check if everything is OK
                            if (response.data.result == true) {
                                icon.setAttribute("class", "icon-save");

                                $(event.target).parents().next("td").find("span")
                                    .removeClass()
                                    .addClass(response["data"]["class"])
                                    .html(response.data.text);
                            }
                        }

                        // Render messages, if any. There are only message in case of errors.
                        if (typeof response.messages == "object" && response.messages !== null) {
                            Joomla.renderMessages(response.messages);

                            if (response.data && response.data.result == true) {
                                icon.setAttribute("class", "icon-save");
                            }
                            else {
                                icon.setAttribute("class", "icon-cancel");
                            }

                            window.scrollTo(0, 0);
                        }
                    });
            } else {
                tppOrginalSendPermissions.apply(this, event);
            }
        };
    }

})(jQuery, window, Joomla);

/*
 * For Joomla 4
 * Override js of Joomla
*/
((customElements, Joomla) => {
    class TppFieldPermissions extends HTMLElement {
        constructor() {
            super();

            if (!Joomla) {
                throw new Error('Joomla API is not properly initiated');
            }

            if (!this.getAttribute('data-uri')) {
                throw new Error('No valid url for validation');
            }
        }

        connectedCallback() {
            const buttonDataSelector = 'data-onchange-task';
            const buttons = [].slice.call(document.querySelectorAll('[' + buttonDataSelector + ']'));

            if (buttons) {
                buttons.forEach(button => {
                    button.addEventListener('change', e => {
                        e.preventDefault();
                        const task = e.target.getAttribute(buttonDataSelector);

                        if (task == 'permissions.apply') {
                            this.sendPermissions(e);
                        }
                    });
                });
            }
        }

        sendPermissions(event) {
            const target = event.target; //set the icon while storing the values

            const icon = document.getElementById('icon_' + target.id);
            icon.removeAttribute('class');
            icon.setAttribute('class', 'fa fa-spinner fa-spin'); //get values add prepare GET-Parameter

            let asset = 'not';
            let component = this.getUrlParam('component');
            let extension = this.getUrlParam('extension');
            let option = this.getUrlParam('option');
            let section   = this.getUrlParam('section');
            let view = this.getUrlParam('view');
            let title = component;
            let value = target.value;
            let context = '';

            if (document.getElementById('jform_context')) {
                context = document.getElementById('jform_context').value;
                context = context.split('.')[0];
            }

            if (option == 'com_config' && component == false && extension == false) {
                asset = 'root.1';
            } else if (extension == false && view == 'component') {
                asset = component;
            } else if (context) {
                if (view == 'group') {
                    asset = context + '.fieldgroup.' + this.getUrlParam('id');
                } else {
                    asset = context + '.field.' + this.getUrlParam('id');
                }

                title = document.getElementById('jform_title').value;
            } else if (extension != false && view != false) {
                asset = extension + '.' + view + '.' + this.getUrlParam('id');
                title = document.getElementById('jform_title').value;
            } else if (extension == false && view != false) {
                asset = option + '.' + view + '.' + this.getUrlParam('id');
                title = document.getElementById('jform_title').value;
            }

            if(view == "acl"){
                asset   = option + "." + section;
            }

            const id = target.id.replace('jform_rules_', '');
            const lastUnderscoreIndex = id.lastIndexOf('_');
            const permissionData = {
                comp: asset,
                action: id.substring(0, lastUnderscoreIndex),
                rule: id.substring(lastUnderscoreIndex + 1),
                value: value,
                title: title
            }; // Remove JS messages, if they exist.

            Joomla.removeMessages(); // Ajax request

            Joomla.request({
                url: this.getAttribute('data-uri'),
                method: 'POST',
                data: JSON.stringify(permissionData),
                perform: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                onSuccess: (response, xhr) => {
                    try {
                        response = JSON.parse(response);
                    } catch (e) {
                        console.log(e);
                    }

                    icon.removeAttribute('class'); // Check if everything is OK

                    if (response.data && response.data.result === true) {
                        icon.setAttribute('class', 'fa fa-check');
                        const badgeSpan = target.parentNode.parentNode.nextElementSibling.querySelector('span');
                        badgeSpan.removeAttribute('class');
                        badgeSpan.setAttribute('class', response.data['class']);
                        badgeSpan.innerHTML = response.data.text;
                    } // Render messages, if any. There are only message in case of errors.


                    if (typeof response.messages === 'object' && response.messages !== null) {
                        Joomla.renderMessages(response.messages);

                        if (response.data && response.data.result === true) {
                            icon.setAttribute('class', 'fa fa-check');
                        } else {
                            icon.setAttribute('class', 'fa fa-times');
                        }
                    }
                },
                onError: xhr => {
                    // Remove the spinning icon.
                    icon.removeAttribute('style');
                    Joomla.renderMessages(Joomla.ajaxErrorsMessages(jqXHR, textStatus, error));
                    icon.setAttribute('class', 'fa fa-times');
                }
            });
        }

        getUrlParam(variable) {
            const query = window.location.search.substring(1);
            const vars = query.split('&');

            for (let i = 0; i < vars.length; i += 1) {
                let pair = vars[i].split('=');

                if (pair[0] == variable) {
                    return pair[1];
                }
            }

            return false;
        }

    }

    customElements.define('joomla-field-permissions', TppFieldPermissions);
})(customElements, Joomla);