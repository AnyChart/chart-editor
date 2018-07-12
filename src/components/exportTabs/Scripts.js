goog.provide('chartEditor.exportTabs.Scripts');

goog.require('chartEditor.SettingsPanel');


/**
 * @param {chartEditor.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.exportTabs.Scripts = function(model, opt_name, opt_domHelper) {
  chartEditor.exportTabs.Scripts.base(this, 'constructor', model, opt_name, opt_domHelper);

  this.key = [];

  this.cdnBaseUrl_ = 'https://cdn.anychart.com/releases/v8';

  this.themesMap_ = {
    'coffee': 'coffee',
    'darkBlue': 'dark_blue',
    'darkEarth': 'dark_earth',
    'darkGlamour': 'dark_glamour',
    'darkProvence': 'dark_provence',
    'darkTurquoise': 'dark_turquoise',
    'lightBlue': 'light_blue',
    'lightEarth': 'light_earth',
    'lightGlamour': 'light_glamour',
    'lightProvence': 'light_provence',
    'lightTurquoise': 'light_turquoise',
    'monochrome': 'monochrome',
    'morning': 'morning',
    'pastel': 'pastel',
    'sea': 'sea',
    'wines': 'wines'
  };
};
goog.inherits(chartEditor.exportTabs.Scripts, chartEditor.SettingsPanel);


/**
 * Returns all the scripts that need to create html page
 * @return {Object}
 */
chartEditor.exportTabs.Scripts.prototype.getScripts = function() {

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var result = {
    bundle: this.cdnBaseUrl_ + '/js/anychart-bundle.min.js',
    css_ui: this.cdnBaseUrl_ + '/css/anychart-ui.min.css',
    css_fonts: this.cdnBaseUrl_ + '/fonts/css/anychart-font.min.css'
  };

  // Include theme if needed
  var theme = model.getValue([['anychart'], 'theme()']);
  if (theme && this.themesMap_[theme]) {
    result.theme = this.cdnBaseUrl_ + '/themes/' + this.themesMap_[theme] + '.min.js';
  }

  // Include proj4js for maps
  var chartType = model.getValue([['chart'], 'type']);
  if (chartType == 'map') {
    var getGeoDataInfo = model.getGeoDataInfo();
    result.geoData = getGeoDataInfo['url'];
    result.proj4js = 'https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.15/proj4.js';
  }

  return result;
};
