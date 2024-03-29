# TZ Portfolio+ - Joomla 3.x

TZ Portfolio is a really good portfolio developing extensions for Joomla that allows users to display, style and manage their portfolio easily.

Plus it has all layouts and multi-categories you would need for a portfolio with two basic views: Portfolio and Single Article view.

Documentation: http://tzportfolio.com/document.html

Demo: http://demo.tzportfolio.com/

*** Changelog ***

09/06/2022 - 2.6.0

	- Update jquery ui
	- Update jquery lazyload v1.9.7
	- Change scss of file back_end/scss/style.scss

22/11/2019 - 2.3.6

	- Added scss files in back-end.
	- Change scss of file back_end/scss/style.scss

21/05/2019 - 2.2.5

	- Update front_end/js/tz_portfolio_plus.js
	- Update front_end/less/core/import/tzportfolioplus.less
	- Update front_end/less/templates/elegant/template.less
	- Added front_end/vendor/infinite-scroll-2.1.0 library to override it:
		+ Added options "ajaxMethod" and "ajaxData".

13/05/2019 - 2.2.4

	- Remove front_end/js/tz_portfolio_plus.js and change front_end/js/tz_portfolio_plus-j4.js to front_end/js/tz_portfolio_plus.js
	- Update back_end/less/style.less
	- Update front_end/js/tz_portfolio_plus.js
	- Update front_end/less/core/fonts/fontawesome-free-5.8.2
	- Added js file: back_end/js/introguide.js

05/03/2019 - 2.1.6

	- Added js file: back_end/js/tpp-field-permissions.js

27/02/2019 - 2.1.5

	- Update file back_end\less\style.less.
	- Update file front_end\less\core\import\tzportfolioplus.less.
	- Update file front_end\less\templates\elegant\template.less.

23/02/2019 - 2.1.4

	- Override awesome font v5.2.7 with "fa" to "tp" prefix.
	- Change style of file admin-layout in back-end.
	- Added gulp file.

03/12/2018 - 2.0.9

	- Fix error style of extrafield on front-end of version 2.0.8 at file front_end\less\core\import\tzportfolioplus.less

29/11/2018 - 2.0.8

	- Update file back-end/css/style-j4.css
	- Update file front_end/less/core/tzportfolioplus.less
	- Update file front_end/js/core.js
	- Update file front_end/js/tz_portfolio_plus-j4.js

15/10/2018 - 2.0.7

	- Modify styles in file back_end\css\style-j4.css

06/09/2018 - 2.0.5

	- Add styles in file front_end\less\core\import\tzportfolioplus.less

22/08/2018 - 2.0.4

	- Add styles in file front_end\less\core\import\tzportfolioplus.less
	- Change style in file front_end\less\templates\elegant\template.less

09/08/2018 - 2.0.3

	- Update style for message box of free version at file style-j4.css in back-end.

27/07/2018 - 2.0.0

	- Added file style-j4.css in back-end (modified style.css file to change styles for comparetible with Joomla 4).
	- Added file layout-admin-j4.js in back-end (modified layout-admin.js to change script layout builder).
	- Added css files of notification on front-end: ns-default.css, ns-style-attached.css, ns-style-bar.css, ns-style-growl.css and ns-style-other.css
	- Added core.js file on front-end (add object TZ_Portfolio_Plus to register functions ajaxscrollcomplete,...);
	- Added file tz_portfolio_plus-j4.js for front-end (modified of tz_portfolio_plus.js) to call functions at ajaxscrollcomplete;

11/08/2017 - 1.0.7

	- Fix error Layout default_extrafields not found in view users.
	- Fix error placeholder for text and textarea search addons.
	- Added parameters from extrafields for article and category edit form if extrafield support xml files.
	- Fix error addon_task submit. (Changed code substr_count($adtask,'.') > 1 at line 470 of admin/libraries/plugin/plugin.php file).

30/12/2016 - 1.0.6

	- Fix error in router when the addon has have router (Fix in router.php file)
	- Fix error when create group field first. (Fix of file models/group.php file in admin).
	- Added filter module.
	- Added options: List View (Show this field in article list view)
	,  Details View (Show this field in article details view), Advanced Search (This field is searchable in advanced search mode)
	in extrafield.
	- Added search view.
	- Display extrafield info in portfolio view, search view.
	- Fix error sort article by ordering and by category order. (The script in file tz_portfolio_plus.js changed code).
	- Fix error sort categories in back-end.
	- Added option "Filter Secondary Category"
	- Added sort extrafield by group field.
	- Display Categories Assignment & Total fields for Field Groups in back-end.

11/11/2016 - 1.0.5

	- Fix error when install in Joomla v3.2.7
	- Fix error can't use isotope layout (fitRows, straighDown)
	- Update return link for addon edit when addon data created option link.
	- Fix error assign categories in group field with first save group field.
	- Remove block html when columns don't display html.
	- Add return link when save & close add-on.
	- Change error message of addon to display in alert box.
	- Fix error JHtml Icon in view portfolio.
	- Fix error default value of textarea extrafield addon.
	- Change language in view template and template style.
	- Fix error validate in module mod_tz_portfolio_plus_categories.
	- Remove navigation of core in Single layout builder (change to addon).
	- Fix error sort template style in template styles view.
	
06/08/2016 - 1.0.3
	
	- Fix error upload image from server with add-on image of v1.0.2
	
06/07/2016 - 1.0.2
	
	- Fix error select tags with layout portfolio of module mod_tz_portfolio_plus_articles.
	- Fix error upload image with add-ons: image, image gallery of v1.0.1
	- New feature: Preset for template style.
	
05/27/2016 - 1.0.1
	
	- Fix errors with view categories:
		+ Can't display categories.
		+ Insert option category image in global and view.
	- Fix validate html with users view.
	- Fix enter key when choose tags and disable autocommplete when put tags in view create article with joomla 3.5.x
	- Feature: run sql and script.php file for addon as component.

04/11/2016 - 1.0.0
	
	- Release version 1.0.0