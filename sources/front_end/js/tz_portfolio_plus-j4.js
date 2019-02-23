//Sort

(function($, window, TZ_Portfolio_Plus){
    'use strict';

    // ajaxCompletes array with value is the function
    TZ_Portfolio_Plus.infiniteScroll  = {
        "addAjaxComplete": function(func){
            this.ajaxCompletes.push(func);
        }
        ,"ajaxCompletes": []
    }

    function tzSortFilter(srcObj, desObj, order) {
        if ((!order || order == 'auto')
            && (srcObj.last().attr('data-order') && srcObj.last().data('order').toString().length)) {
            order = 'filter_asc';
        }
        srcObj.sort(function (a, b) {
            var compA = jQuery(a).data('order') ? parseInt(jQuery(a).data('order'), 10) : jQuery(a).text().trim();
            var compB = jQuery(b).data('order') ? parseInt(jQuery(b).data('order'), 10) : jQuery(b).text().trim();
            if (jQuery(a).attr('data-option-value') != '*' &&
                jQuery(b).attr('data-option-value') != '*') {
                if (order.substr(order.length - 3, order.length).toLowerCase() == 'asc') {
                    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
                }
                if (order.substr(order.length - 4, order.length).toLowerCase() == 'desc') {
                    return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
                }
            }
        });
        srcObj.each(function (idx, itm) {
            desObj.append(itm).append('\n');
        });
        return true;
    }

    var $tppUtility =   {};

    $tppUtility.lastClickAvailabled  =   false;

    $tppUtility.createCookie = function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    };

    $tppUtility.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    };

    $tppUtility.eraseCookie = function (name) {
        createCookie(name,"",-1);
    };

    $tppUtility.goToByScroll = function(id) {
        // Remove "link" from the ID
        // id = id.replace("link", "");
        // Scroll
        $('html,body').animate({
            scrollTop: $("#" + id).offset().top
        }, 'slow');
    };

    $.tzPortfolioPlusIsotope  = function(el,options){

        var $tzppIsotope   = $(el),
            $defOptions = $.extend(true,{},$.tzPortfolioPlusIsotope.defaults),
            $var    = $.extend(true,$defOptions,options);

        if(!$var.params.orderby_sec.length){
            $var.params.orderby_sec = 'rdate';
        }

        var $params = $var.params,
            $isotope_options    = $var.isotope_options;

        switch($params.orderby_sec){
            default:
                $isotope_options.core.sortBy        = 'original-order';
                $isotope_options.core.sortAscending = true;
                break;
            case 'order':
            case 'rorder':
                $isotope_options.core.sortBy        = 'original-order';
                $isotope_options.core.sortAscending = true;
                break;
            case 'date':
                $isotope_options.core.sortBy        = 'date';
                $isotope_options.core.sortAscending = true;
                if($var.timeline){
                    $isotope_options.core.sortAscending = false;
                }
                break;
            case 'rdate':
                $isotope_options.core.sortBy        = 'date';
                $isotope_options.core.sortAscending = false;
                break;
            case 'alpha':
                $isotope_options.core.sortBy        = 'name';
                $isotope_options.core.sortAscending = true;
                break;
            case 'ralpha':
                $isotope_options.core.sortBy        = 'name';
                $isotope_options.core.sortAscending = false;
                break;
            case 'author':
                $isotope_options.core.sortBy = 'date';
                $isotope_options.core.sortAscending = false;
                break;
            case 'rauthor':
                $isotope_options.core.sortBy = 'date';
                $isotope_options.core.sortAscending = false;
                break;
            case 'hits':
                $isotope_options.core.sortBy        = 'hits';
                $isotope_options.core.sortAscending = false;
                break;
            case 'rhits':
                $isotope_options.core.sortBy        = 'hits';
                $isotope_options.core.sortAscending = true;
                break;
        }

        if(!$isotope_options.core.layoutMode.length){
            if($params.layout_type.length){
                $isotope_options.core.layoutMode  = $params.layout_type[0];
            }else {
                $isotope_options.core.layoutMode = 'masonry';
            }
        }

        // This is the function to calculate column width for isotope
        $tzppIsotope.tz_init = function(bool){
            var contentWidth    = $($var.mainElementSelector).width();
            var columnWidth     = $params.tz_column_width;
            var curColCount     = 0;

            var maxColCount     = 0;
            var newColCount     = 0;
            var newColWidth     = 0;
            var featureColWidth = 0;

            if(contentWidth < $tzppIsotope.width()){
                contentWidth    = $tzppIsotope.width();
            }

            if($var.columnWidth){
                columnWidth    = $var.columnWidth;
            }

            if($var.timeline) {
                $.extend(true, $.Isotope.prototype, {
                    _sort: function () {
                        var sortBy = this.options.sortBy,
                            getSorter = this._getSorter,
                            sortDir = this.options.sortAscending ? 1 : -1,
                            sortFn = function (alpha, beta) {
                                var a = getSorter(alpha, sortBy),
                                    b = getSorter(beta, sortBy);

                                // fall back to original order if data matches
                                if (a === b && sortBy !== 'original-order') {
                                    a = getSorter(alpha, 'original-order');
                                    b = getSorter(beta, 'original-order');
                                }

                                if(sortBy == 'name' || sortBy == 'hits') {
                                    if ($(alpha).attr('data-category') > $(beta).attr('data-category')) {
                                        return 0;
                                    } else {
                                        if ($(alpha).attr('data-category') == $(beta).attr('data-category')) {
                                            if($(alpha).hasClass('TzDate')){
                                                return 0;
                                            }
                                            if (a > b) {
                                                return 1 * sortDir;
                                            } else {
                                                return 0;
                                            }
                                        }
                                    }
                                }

                                return ( ( a > b ) ? 1 : ( a < b ) ? -1 : 0 ) * sortDir;
                            };
                        this.$filteredAtoms.sort(sortFn);
                    }
                });
            }


            curColCount = Math.floor(contentWidth / columnWidth);
            $var.beforeCalculateColumn(curColCount);

            maxColCount = curColCount + 1;
            if((maxColCount - (contentWidth / columnWidth)) > ((contentWidth / columnWidth) - curColCount)){
                newColCount     = curColCount;
            }
            else{
                newColCount = maxColCount;
            }

            newColWidth = contentWidth;
            featureColWidth = contentWidth;

            if(newColCount > 1){
                newColWidth = Math.floor(contentWidth / newColCount);
                featureColWidth = newColWidth * 2;
            }
            $var.afterCalculateColumn(newColCount,newColWidth);

            $tzppIsotope.find(".element").width(newColWidth);

            $tzppIsotope.find($var.elementFeatureSelector).width(featureColWidth);
            $tzppIsotope.find(".element").find('.element.TzDate').width(contentWidth);

            $var.afterColumnWidth(newColCount,newColWidth);

            if(bool) {
                $tzppIsotope.find('.element').css({opacity: 0});
            }
            $tzppIsotope.imagesLoaded(function(){
                $var.afterImagesLoaded();
                if(bool) {
                    $tzppIsotope.find('.element').css({opacity: 1});
                }

                $tzppIsotope.isotope({
                    resizable: false, // disable normal resizing
                    itemSelector : $isotope_options.core.itemSelector,
                    layoutMode: $isotope_options.core.layoutMode,
                    sortBy: $isotope_options.core.sortBy,
                    sortAscending: $isotope_options.core.sortAscending,
                    filter: $isotope_options.core.filter,
                    masonry:{
                        columnWidth: newColWidth
                    },
                    getSortData: $isotope_options.core.getSortData
                },function(){
                    if(parseInt($params.tz_show_filter,10) && $params.filter_tags_categories_order) {
                        //Sort tags or categories filter
                        if(typeof tzSortFilter != 'undefined') {
                            tzSortFilter($($isotope_options.sortParentTag).find($isotope_options.sortChildTag),
                                $($isotope_options.sortParentTag), $params.filter_tags_categories_order);
                        }
                    }
                    $isotope_options.complete();
                    $tzppIsotope.afterLoadPortfolio();
                });
            });
        };

        $tzppIsotope.loadPortfolio  = function(){

            var $optionSets = $($isotope_options.filterSelector),
                $optionLinks = $optionSets.find($isotope_options.tagFilter);
            var $r_options    = null,
                $container_options=$isotope_options.core;

            $optionLinks.click(function(event){
                event.preventDefault();
                var $isotope_this = $(this);
                // don't proceed if already selected
                if ( $isotope_this.hasClass('selected') ) {
                    return false;
                }
                var $optionSet = $isotope_this.parents('.option-set');
                $optionSet.find('.selected').removeClass('selected');
                $isotope_this.addClass('selected');

                // make option object dynamically, i.e. { filter: '.my-filter-class' }
                var options = $container_options,
                    key = $optionSet.attr('data-option-key'),
                    value = $isotope_this.attr('data-option-value');

                // parse 'false' as false boolean
                value = value === 'false' ? false : value;
                options[ key ] = value;

                if ( key === 'layoutMode' && typeof window.changeLayoutMode === 'function' ) {
                    // changes in layout modes need extra logic
                    window.changeLayoutMode( $isotope_this, options );
                } else {
                    // otherwise, apply new options
                    if(value == 'name'){
                        if($params.orderby_sec == 'alpha' || ($params.orderby_sec != 'alpha'
                            && $params.orderby_sec != 'ralpha')){
                            options.sortAscending    = true;
                        }else{
                            if($params.orderby_sec == 'ralpha'){
                                options.sortAscending    = false;
                            }
                        }
                    }
                    if(value == 'date'){
                        if($params.orderby_sec == 'rdate'
                            || ($params.orderby_sec != 'date'
                                && $params.orderby_sec != 'rdate')){
                            options.sortAscending    = false;
                        }else{
                            if($params.orderby_sec == 'date'){
                                options.sortAscending    = true;
                            }
                        }
                    }
                    if(value == 'hits'){
                        if($params.orderby_sec == 'hits'
                            || ($params.orderby_sec != 'hits'
                                && $params.orderby_sec != 'rhits')){
                            options.sortAscending    = false;
                        }else{
                            if($params.orderby_sec == 'rhits'){
                                options.sortAscending    = true;
                            }
                        }
                    }

                    options = $.extend($r_options,options);
                    $tzppIsotope.isotope(options);
                    $r_options  = options;
                }
                return false;
            });
        };

        $tzppIsotope.triggerOnClickItem = function () {
            $($isotope_options.core.itemSelector).find('a').click(function (event) {
                // event.preventDefault();
                $tppUtility.createCookie('tppLatestItem', $(this).closest($isotope_options.core.itemSelector).attr('id'), 0.5);
            });
        };

        $tzppIsotope.afterLoadPortfolio = function () {
            var index   =   $tppUtility.readCookie('tppLatestItem');
            if (index != null) {
                if(!$tppUtility.lastClickAvailabled && $('#'+ index).length){
                    $tppUtility.goToByScroll(index);
                    $tppUtility.lastClickAvailabled  =   true;
                }
            }
        };

        // Call Function isotope ind document ready function
        $tzppIsotope.tz_init(true);
        $($isotope_options.filterSelector+'[data-option-key=sortBy]').children().removeClass('selected')
            .end().find('[data-option-value='+$isotope_options.core.sortBy + ']').addClass('selected');

        $tzppIsotope.loadPortfolio();
        $tzppIsotope.triggerOnClickItem();
        $tzppIsotope.vars   = $var;

        $.data(el,"tzPortfolioPlusIsotope", $tzppIsotope);

        // Call Function tz_init in window load and resize function
        $(window).smartresize(function(){
            $tzppIsotope.tz_init();
        });
        //$(window).smartresize();

        return this;
    };
    // Create options object
    $.tzPortfolioPlusIsotope.defaults  = { // This is default options
        'columnWidth'               : '',
        'mainElementSelector'       : '#TzContent',
        'containerElementSelector'  : '#portfolio',
        //'elementSelector'           : '.element',
        'elementFeatureSelector'    : '.tz_feature_item',
        'JSON'                      : {},
        "timeline"                    : false,
        'params'                    : {
            'orderby_sec'                   : 'rdate',
            'tz_show_filter'                : 1,
            'filter_tags_categories_order'  : 'auto',
            'tz_portfolio_plus_layout'      : 'ajaxButton',
            'comment_function_type'         : 'default',
            'tz_filter_type'                : 'categories',
            'show_all_filter'               : 0,
            'tz_comment_type'               : 'disqus',
            'tz_show_count_comment'         : 1,
            'tz_column_width'               : 233,
            'layout_type'                   : ['masonry']
        },
        'isotope_options'                   : {
            'core'  : {
                'itemSelector': '.element',
                'layoutMode': '',
                'sortBy': 'date',
                'sortAscending': false,
                'filter': '*',
                'getSortData': {
                    date: function ($elem) {
                        var number = ($elem.hasClass('element') && $elem.attr('data-date').length) ?
                            $elem.attr('data-date') : $elem.find('.create').text();
                        return parseInt(number,10);
                    },
                    hits: function ($elem) {
                        var number = ($elem.hasClass('element') && $elem.attr('data-hits').length) ?
                            $elem.attr('data-hits') : $elem.find('.hits,.tpp-item-hit').text();
                        return parseInt(number,10);
                    },
                    name: function ($elem) {
                        var name = ($elem.hasClass('element') && $elem.find('.TzPortfolioTitle.name,.tpp-item-title.name')
                                .length)?$elem.find('.TzPortfolioTitle.name, .tpp-item-title.name').text().trim():
                            (($elem.attr('data-title').length)?$elem.attr('data-title'):''),
                            itemText = name.length ? name : $elem.text().trim();
                        return itemText;
                    }
                }
            },
            'filterSelector'    : '#tz_options .option-set',
            'tagFilter'         : 'a',
            'sortParentTag'     : '#filter',
            'sortChildTag'      : 'a',
            'complete'  : function(){}
        },
        // Call back function
        beforeCalculateColumn   : function(){},
        afterCalculateColumn    : function(){},
        afterColumnWidth        : function(){},
        afterImagesLoaded       : function(){}
    };
    $.fn.tzPortfolioPlusIsotope = function(options){
        if (options === undefined) options = {};
        if (typeof options === "object") {
            // Call function
            return this.each(function() {
                // Call function
                if ($(this).data("tzPortfolioPlusIsotope") === undefined) {
                    new $.tzPortfolioPlusIsotope(this, options);
                }else{
                    $(this).data('tzPortfolioPlusIsotope');
                }
            });
        }
    };


    // Variable tzPortfolioPlusInfiniteScroll plugin
    $.tzPortfolioPlusInfiniteScroll  = function(el,options){
        var $tzppScroll   = $(el),
            $var    = $.extend(true,$.tzPortfolioPlusInfiniteScroll.defaults,options),
            $params = $var.params;


        var tzpage    = 1;

        // function getTags() {
        //     var tags    =   [];
        //     $($var.sortParentTag + " " + $var.sortChildTag).each(function () {
        //         tags.push($(this).attr('data-option-value').replace(".","") );
        //     });
        //     return window.JSON.encode(tags);
        // }
        //
        // function getCategories() {
        //     var categories    =   [];
        //     $($var.sortParentTag + " " + $var.sortChildTag).each(function () {
        //         categories.push($(this).attr('data-option-value').replace(".category",""));
        //     });
        //     return window.JSON.encode(categories);
        // }


        var $scroll = true;
        var LastDate = $('div.TzDate:last').attr('data-category');

        $tzppScroll.infinitescroll({
                navSelector  : $var.navSelector,    // selector for the paged navigation
                nextSelector : $var.nextSelector,  // selector for the NEXT link (to page 2)
                itemSelector : $var.itemSelector,     // selector for all items you'll retrieve
                dataType     : $var.dataType,
                // path: function(curpage){
                //         // var $url = 'index.php?option=com_tz_portfolio_plus&view=portfolio&task=portfolio.ajax&layout=default:item';
                //
                //     var $url    = $($var.nextSelector).attr('href') + "&tags="+getTags();
                //         // alert(getTags());
                //         // alert($($var.nextSelector).attr('href'));
                //     // alert(encodeURI($url));
                //         return $url;
                // },
                template: function(data){
                    if(data) {
                        if(data.filter){
                            var $newFilter = $(data.filter);
                            var $newFilter = $newFilter.map(function(){
                                var checkFilter = $($var.sortParentTag).find($var.sortChildTag+"[data-option-value=\""+$(this).data("option-value")+"\"]").index();

                                if(checkFilter == -1){
                                    return this;
                                }
                            });
                            $($var.sortParentTag).append($newFilter);
                            var $tzppIsotope    = $tzppScroll.data("tzPortfolioPlusIsotope");
                            $tzppIsotope.loadPortfolio();
                            if(typeof tzSortFilter != 'undefined') {
                                tzSortFilter($($var.sortParentTag).find($var.sortChildTag), $($var.sortParentTag), $params.filter_tags_categories_order);
                            }
                        }
                        return data.articles;
                    }
                },

                // appendCallback: false,
                errorCallback: function() {
                    if(!$var.errorCallback) {
                        $var.loadedText =   tzNoMorePageLoadText;
                        if (!$params.tz_portfolio_plus_layout || $params.tz_portfolio_plus_layout == 'ajaxButton') {
                            $('#tz_append a').unbind('click').html($var.loadedText).show();
                        }

                        if (tzDisplayNoMorePageLoad) {
                            if ($params.tz_portfolio_plus_layout == 'ajaxInfiScroll') {
                                $('#tz_append').removeAttr('style').html('<a class="tzNomore">' + $var.loadedText + '</a>');
                            }
                            $('#tz_append a').addClass('tzNomore');
                        } else {
                            $('#tz_append').empty();
                        }

                        $('#infscr-loading').remove();
                    }
                },
                loading: {
                    msgText: $var.msgText,
                    finishedMsg: '',
                    img: '',
                    selector: '#tz_append'
                }
            },
            // call Isotope as a callback
            function( data, options, url ) {
                var newElements = data;
                if(data) {
                    // Append element if dataType is json
                    if (data.articles && !options.appendCallback) {
                        var box = $("<div/>");
                        box.append(data.articles);

                        newElements =  box.children().get();
                        $tzppScroll.append(newElements);
                    }
                    $('#infscr-loading').css('display','none');

                    var $newElems =   $( newElements ).css({ opacity: 0 });

                    // if($params.comment_function_type == 'js') {
                    //     // Ajax show comment count.
                    //     if (parseInt($params.tz_show_count_comment,10)) {
                    //         if ($params.tz_comment_type == 'facebook' || $params.tz_comment_type == 'disqus'){
                    //             if(typeof ajaxComments != 'undefined') {
                    //                 ajaxComments($newElems, $var.itemID, $var.commentText);
                    //             }
                    //         }
                    //     }
                    // }

                    //$.tzPortfolioPlusInfiniteScroll.ajaxLoadComplete();

                    // ensure that images load before adding to masonry layout
                    $newElems.imagesLoaded(function() {

                        // show elems now they're ready
                        $newElems.animate({opacity: 1});

                        var $tzppIsotope    = $tzppScroll.data("tzPortfolioPlusIsotope");
                        $tzppIsotope.tz_init();
                        if($var.timeline){
                            // trigger scroll again
                            $tzppIsotope.isotope( 'insert', $newElems);
                            // Delete date haved
                            $newElems.each(function(){
                                var tzClass = $(this).attr('class');
                                if(tzClass.match(/.*?TzDate.*?/i)){
                                    var LastDate2 = $(this).attr('data-category');
                                    if(LastDate == LastDate2){

                                        $(this).remove();
                                        $tzppIsotope.isotope('reloadItems');
                                    }
                                    else
                                        LastDate    = LastDate2;
                                }
                            });
                        }else {
                            // trigger scroll again
                            $tzppIsotope.isotope('appended', $newElems);

                            // Append tags filter
                            if (data.filter && !options.appendCallback) {
                                var $newFilter = $(data.filter);
                                var $newFilter = $newFilter.map(function(){
                                    var checkFilter = $($var.sortParentTag).find($var.sortChildTag+"[data-option-value=\""+$(this).data("option-value")+"\"]").index();

                                    if(checkFilter == -1){
                                        return this;
                                    }
                                });
                                $($var.sortParentTag).append($newFilter);
                                $tzppIsotope.loadPortfolio();
                            }
                            $tzppIsotope.afterLoadPortfolio();
                            $tzppIsotope.triggerOnClickItem();

                        }

                        tzpage++;

                        // if(parseInt($params.tz_show_filter,1)) {
                        //     var $lang   = '';
                        //     if($var.lang && $var.lang.length){
                        //         $lang   = '&lang=' + $var.lang;
                        //     }
                        //     if (!parseInt($params.show_all_filter,1)) {
                        //         // if ($params.tz_filter_type == 'tags') {
                        //         //     $.ajax({
                        //         //         url: 'index.php?option=com_tz_portfolio_plus&task=portfolio.ajaxtags' + $lang,
                        //         //         data: {
                        //         //             'tags': getTags(),
                        //         //             'Itemid': $var.Itemid,
                        //         //             'page': tzpage
                        //         //         }
                        //         //     }).success(function (data) {
                        //         //         if (data.length) {
                        //         //             var tztag = $(data);
                        //         //             $($var.sortParentTag).append(tztag);
                        //         //             $tzppIsotope.loadPortfolio();
                        //         //
                        //         //             if ($params.filter_tags_categories_order) {
                        //         //                 //Sort tags or categories filter
                        //         //                 if(typeof tzSortFilter != 'undefined') {
                        //         //                     tzSortFilter($($var.sortParentTag).find($var.sortChildTag), $($var.sortParentTag), $params.filter_tags_categories_order);
                        //         //                 }
                        //         //             }
                        //         //         }
                        //         //
                        //         //         $scroll = true;
                        //         //     });
                        //         // }
                        //
                        //         if ($params.tz_filter_type == 'categories') {
                        //             $.ajax({
                        //                 url: '?option=com_tz_portfolio_plus&task=portfolio.ajaxcategories' + $lang,
                        //                 data: {
                        //                     'catIds': getCategories(),
                        //                     'Itemid': $var.Itemid,
                        //                     'page': tzpage
                        //                 }
                        //             }).success(function (data) {
                        //                 if (data.length) {
                        //                     var tzCategories = $(data);
                        //                     $($var.sortParentTag).append(tzCategories);
                        //                     $tzppIsotope.loadPortfolio();
                        //
                        //                     if ($params.filter_tags_categories_order) {
                        //                         //Sort tags or categories filter
                        //                         if(typeof tzSortFilter != 'undefined') {
                        //                             tzSortFilter($($var.sortParentTag).find($var.sortChildTag), $($var.sortParentTag), $params.filter_tags_categories_order);
                        //                         }
                        //                     }
                        //                 }
                        //
                        //                 $scroll = true;
                        //             });
                        //         }
                        //     }
                        // }else{
                        //     $scroll = true;
                        // }

                        $scroll = true;

                        //if there still more item
                        if($newElems.length){

                            //move item-more to the end
                            $('div#tz_append').find('a:first').show();
                        }

                        // Call functions ajaxComplete added
                        if(TZ_Portfolio_Plus.infiniteScroll.ajaxCompletes.length){
                            $.each(TZ_Portfolio_Plus.infiniteScroll.ajaxCompletes, function(index, func){
                                if(typeof func === 'function') {
                                    func($newElems, $tzppIsotope);
                                }
                            });
                        }
                        // Call load page when system can't find latest item
                        if($params.tz_portfolio_plus_layout == 'ajaxInfiScroll' || $params.tz_portfolio_plus_layout == 'ajaxButton'){
                            var index   =   $tppUtility.readCookie('tppLatestItem');
                            if (index != null) {
                                if(!$('#'+ index).length){
                                    $tzppScroll.infinitescroll('retrieve');
                                }
                            }
                        }
                    });
                }
            }
        );

        if($params.tz_portfolio_plus_layout == 'ajaxInfiScroll'){
            $(window).scroll(function(){
                $(window).unbind('.infscr');
                if($scroll){
                    if(($(window).scrollTop() + $(window).height()) >= ($tzppScroll.offset().top + $tzppScroll.height())){
                        $scroll	= false;
                        $tzppScroll.infinitescroll('retrieve');
                    }
                }
            });

            $(window).bind("load resize",function(){
                if($(document).height() <= $(window).height()){
                    $tzppScroll.infinitescroll('retrieve');
                }
            });

        }

        if(!$params.tz_portfolio_plus_layout || $params.tz_portfolio_plus_layout == 'ajaxButton'){
            $(window).unbind('.infscr');

            $('div#tz_append a').click(function(){
                $(this).stop();
                $('div#tz_append').find('a:first').hide();
                $tzppScroll.infinitescroll('retrieve');
            });
        }

        // Call load page when system can't find latest item
        if($params.tz_portfolio_plus_layout == 'ajaxInfiScroll' || $params.tz_portfolio_plus_layout == 'ajaxButton'){
            var index   =   $tppUtility.readCookie('tppLatestItem');
            if (index != null) {
                if(!$('#'+ index).length){
                    $tzppScroll.infinitescroll('retrieve');
                }
            }
        }
    };

    // Create options object
    $.tzPortfolioPlusInfiniteScroll.defaults  = {
        rootPath        : '',
        msgText         : '<i class="tz-icon-spinner tz-spin"></i><em>Loading the next set of posts...</em>',
        loadedText      : 'No more items to load',
        navSelector     : '#loadaj a',    // selector for the paged navigation
        nextSelector    : '#loadaj a:first',  // selector for the NEXT link (to page 2)
        itemSelector    : '.element',     // selector for all items you'll retrieve
        dataType        : 'json',
        Itemid          : null,
        commentText     : 'Comment count:',
        timeline        : false,
        sortParentTag   : '#filter',
        sortChildTag    : 'a',
        lang            : '',
        errorCallback   : null,
        ajaxComplete    : function(){}

    };
    $.fn.tzPortfolioPlusInfiniteScroll   = function(options){
        if(options === undefined) options   = {};
        if(typeof options === 'object'){
            // Call function
            if ($(this).data("tzPortfolioPlusInfiniteScroll") === undefined) {
                new $.tzPortfolioPlusInfiniteScroll(this, options);
            }else{
                $(this).data('tzPortfolioPlusInfiniteScroll');
            }
        }
    };
})(jQuery,window, window.TZ_Portfolio_Plus);