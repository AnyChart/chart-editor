goog.provide('anychart.chartEditorModule.PointersPanel');

goog.require('anychart.chartEditorModule.MultiplePanelsBase');
goog.require('anychart.chartEditorModule.settings.pointers.Bar');
goog.require('anychart.chartEditorModule.settings.pointers.CircularBase');
goog.require('anychart.chartEditorModule.settings.pointers.Knob');
goog.require('anychart.chartEditorModule.settings.pointers.Led');
goog.require('anychart.chartEditorModule.settings.pointers.LinearBase');
goog.require('anychart.chartEditorModule.settings.pointers.LinearMarker');
goog.require('anychart.chartEditorModule.settings.pointers.Marker');
goog.require('anychart.chartEditorModule.settings.pointers.Needle');
goog.require('anychart.chartEditorModule.settings.pointers.RangeBar');
goog.require('anychart.chartEditorModule.settings.pointers.Tank');
goog.require('anychart.chartEditorModule.settings.pointers.Thermometer');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.MultiplePanelsBase}
 */
anychart.chartEditorModule.PointersPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.PointersPanel.base(this, 'constructor', model, 'Pointers', opt_domHelper);

  this.stringId = 'pointers';

  this.allowAddPanels(false);
};
goog.inherits(anychart.chartEditorModule.PointersPanel, anychart.chartEditorModule.MultiplePanelsBase);


/** @override */
anychart.chartEditorModule.PointersPanel.prototype.createPanels = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var mappings = model.getValue([['dataSettings'], 'mappings']);
  var id;
  var type;
  var pointer;

  for (var j = 0; j < mappings[0].length; j++) {
    id = mappings[0][j]['id'] ? mappings[0][j]['id'] : j;
    type = mappings[0][j]['ctor'];
    var className;
    switch (type) {
      case 'gauges.bar':
        className = anychart.chartEditorModule.settings.pointers.Bar;
        break;
      case 'gauges.marker':
        className = anychart.chartEditorModule.settings.pointers.Marker;
        break;
      case 'needle':
        className = anychart.chartEditorModule.settings.pointers.Needle;
        break;
      case 'knob':
        className = anychart.chartEditorModule.settings.pointers.Knob;
        break;
      case 'linearGauge.led':
        className = anychart.chartEditorModule.settings.pointers.Led;
        break;
      case 'linearGauge.marker':
        className = anychart.chartEditorModule.settings.pointers.LinearMarker;
        break;
      case 'linearGauge.tank':
        className = anychart.chartEditorModule.settings.pointers.Tank;
        break;
      case 'linearGauge.thermometer':
        className = anychart.chartEditorModule.settings.pointers.Thermometer;
        break;
      case 'linearGauge.rangeBar':
        className = anychart.chartEditorModule.settings.pointers.RangeBar;
        break;
      default:
        className = anychart.chartEditorModule.settings.pointers.LinearBase;
        break;
    }

    pointer = new className(model, type, id, j);

    this.addPanelInstance(pointer);
  }
};
