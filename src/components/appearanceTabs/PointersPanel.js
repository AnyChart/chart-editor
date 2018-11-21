goog.provide('chartEditor.PointersPanel');

goog.require('chartEditor.MultiplePanelsBase');
goog.require('chartEditor.settings.pointers.Bar');
goog.require('chartEditor.settings.pointers.CircularBase');
goog.require('chartEditor.settings.pointers.Knob');
goog.require('chartEditor.settings.pointers.Led');
goog.require('chartEditor.settings.pointers.LinearBase');
goog.require('chartEditor.settings.pointers.LinearMarker');
goog.require('chartEditor.settings.pointers.Marker');
goog.require('chartEditor.settings.pointers.Needle');
goog.require('chartEditor.settings.pointers.RangeBar');
goog.require('chartEditor.settings.pointers.Tank');
goog.require('chartEditor.settings.pointers.Thermometer');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.MultiplePanelsBase}
 */
chartEditor.PointersPanel = function(model, opt_domHelper) {
  chartEditor.PointersPanel.base(this, 'constructor', model, 'Pointers', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.POINTERS;

  this.allowAddPanels(false);
};
goog.inherits(chartEditor.PointersPanel, chartEditor.MultiplePanelsBase);


/** @override */
chartEditor.PointersPanel.prototype.createPanels = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
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
        className = chartEditor.settings.pointers.Bar;
        break;
      case 'gauges.marker':
        className = chartEditor.settings.pointers.Marker;
        break;
      case 'needle':
        className = chartEditor.settings.pointers.Needle;
        break;
      case 'knob':
        className = chartEditor.settings.pointers.Knob;
        break;
      case 'linearGauge.led':
        className = chartEditor.settings.pointers.Led;
        break;
      case 'linearGauge.marker':
        className = chartEditor.settings.pointers.LinearMarker;
        break;
      case 'linearGauge.tank':
        className = chartEditor.settings.pointers.Tank;
        break;
      case 'linearGauge.thermometer':
        className = chartEditor.settings.pointers.Thermometer;
        break;
      case 'linearGauge.rangeBar':
        className = chartEditor.settings.pointers.RangeBar;
        break;
      default:
        className = chartEditor.settings.pointers.LinearBase;
        break;
    }

    pointer = new className(model, type, id, j);
    pointer.allowReset(true);

    this.addPanelInstance(pointer);
  }
};
