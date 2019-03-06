goog.provide('chartEditor.help');

/**
 @namespace
 @name chartEditor.help
 */


/**
 * Hints for helop balloon.
 * @enum {string}
 */
chartEditor.help.Hints = {
  // General Theming
  'theme()': 'Hint about theme',
  'palette()': 'a:pointWidth()', // alias for pointWidth()

  // Cartesian specific
  'pointWidth()': 'Text about pointWidth() setting',

  // Series
  'getSeries().name()': 'Text for key getSeries(\'SERIES ID\').name()'
};