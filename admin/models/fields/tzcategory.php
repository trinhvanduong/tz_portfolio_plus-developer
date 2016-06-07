<?php
/*------------------------------------------------------------------------

# TZ Portfolio Plus Extension

# ------------------------------------------------------------------------

# author    DuongTVTemPlaza

# copyright Copyright (C) 2015 templaza.com. All Rights Reserved.

# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL

# Websites: http://www.templaza.com

# Technical Support:  Forum - http://templaza.com/Forum

-------------------------------------------------------------------------*/

defined('JPATH_PLATFORM') or die;

JFormHelper::loadFieldClass('list');
JHtml::addIncludePath(COM_TZ_PORTFOLIO_PLUS_ADMIN_PATH.DIRECTORY_SEPARATOR.'helpers'.DIRECTORY_SEPARATOR.'html');

/**
 * Form Field class for the Joomla Platform.
 * Supports an HTML select list of categories
 *
 * @since  11.1
 */
class JFormFieldTZCategory extends JFormFieldList
{
    /**
     * The form field type.
     *
     * @var    string
     * @since  11.1
     */
    public $type = 'TZCategory';

    /**
     * Method to get the field options for category
     * Use the extension attribute in a form to specify the.specific extension for
     * which categories should be displayed.
     * Use the show_root attribute to specify whether to show the global category root in the list.
     *
     * @return  array    The field option objects.
     *
     * @since   11.1
     */
    protected function getOptions()
    {
        $options = array();
        $extension = $this->element['extension'] ? (string) $this->element['extension'] : (string) $this->element['scope'];
        $published = (string) $this->element['published'];

        if(!$extension){
            $extension  = 'com_tz_portfolio_plus';
        }

        $config = array();

        // Load the category options for a given extension.
        if (!empty($extension))
        {
            // Filter over published state or not depending upon if it is present.
            if ($published)
            {
                $config['filter.published'] = explode(',', $published);
//                $options = JHtml::_('tzcategory.options', $extension, array('filter.published' => explode(',', $published)));
            }
            else
            {
                $config['filter.published'] = array(0, 1);
//                $options = JHtml::_('tzcategory.options', $extension);
            }

            if(isset($this -> element['parent'])){
                $config['filter.parent']    = (string) $this -> element['parent'];
            }


            $options = JHtml::_('tzcategory.options', $extension, $config);

            // Verify permissions.  If the action attribute is set, then we scan the options.
            if ((string) $this->element['action'])
            {
                // Get the current user object.
                $user = JFactory::getUser();

                foreach ($options as $i => $option)
                {
                    /*
                     * To take save or create in a category you need to have create rights for that category
                     * unless the item is already in that category.
                     * Unset the option if the user isn't authorised for it. In this field assets are always categories.
                     */
                    if ($user->authorise('core.create', $extension . '.category.' . $option->value) != true)
                    {
                        unset($options[$i]);
                    }
                }
            }

            if (isset($this->element['show_root']))
            {
                array_unshift($options, JHtml::_('select.option', '0', JText::_('JGLOBAL_ROOT')));
            }
        }
        else
        {
            JLog::add(JText::_('JLIB_FORM_ERROR_FIELDS_CATEGORY_ERROR_EXTENSION_EMPTY'), JLog::WARNING, 'jerror');
        }

        // Merge any additional options in the XML definition.
        $options = array_merge(parent::getOptions(), $options);

        return $options;
    }
}
