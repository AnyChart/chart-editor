goog.provide('chartEditor.ui.appearanceTabs.Pointers');

goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.pointers.Bar');
goog.require('chartEditor.ui.panel.pointers.CircularBase');
goog.require('chartEditor.ui.panel.pointers.Knob');
goog.require('chartEditor.ui.panel.pointers.Led');
goog.require('chartEditor.ui.panel.pointers.LinearBase');
goog.require('chartEditor.ui.panel.pointers.LinearMarker');
goog.require('chartEditor.ui.panel.pointers.Marker');
goog.require('chartEditor.ui.panel.pointers.Needle');
goog.require('chartEditor.ui.panel.pointers.RangeBar');
goog.require('chartEditor.ui.panel.pointers.Tank');
goog.require('chartEditor.ui.panel.pointers.Thermometer');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.Pointers = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Pointers.base(this, 'constructor', model, 'Pointers', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.POINTERS;

  this.allowAddPanels(false);
};
goog.inherits(chartEditor.ui.appearanceTabs.Pointers, chartEditor.ui.PanelsGroup);


/** @override */
chartEditor.ui.appearanceTabs.Pointers.prototype.createPanels = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var mappings = model.getValue([['dataSettings'], 'mappings']);
  var id;
  var type;
  var pointer;

  for (var j = 0; j < mappings[0].length; j++) {
    id = mappings[0][j]['id'] ? mappings[0][j]['id'] : j;
    type = mappings[0][j]['ctor'];
    var className;
    switch (type) {
      case 'circularGauge.bar':
        className = chartEditor.ui.panel.pointers.Bar;
        break;
      case 'circularGauge.marker':
        className = chartEditor.ui.panel.pointers.Marker;
        break;
      case 'circularGauge.needle':
        className = chartEditor.ui.panel.pointers.Needle;
        break;
      case 'circularGauge.knob':
        className = chartEditor.ui.panel.pointers.Knob;
        break;
      case 'linearGauge.led':
        className = chartEditor.ui.panel.pointers.Led;
        break;
      case 'linearGauge.marker':
        className = chartEditor.ui.panel.pointers.LinearMarker;
        break;
      case 'linearGauge.tank':
        className = chartEditor.ui.panel.pointers.Tank;
        break;
      case 'linearGauge.thermometer':
        className = chartEditor.ui.panel.pointers.Thermometer;
        break;
      case 'linearGauge.rangeBar':
        className = chartEditor.ui.panel.pointers.RangeBar;
        break;
      default:
        className = chartEditor.ui.panel.pointers.LinearBase;
        break;
    }

    pointer = new className(model, type, id, j);
    pointer.allowReset(true);

    this.addPanelInstance(pointer);
  }
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Pointers.prototype.onModelChange = function(evt) {
  chartEditor.ui.appearanceTabs.Pointers.base(this, 'onModelChange', evt);

  var needRebuildFor = ['addSeries', 'dropSeries', 'setSeriesType'];
  if (!this.isExcluded() && evt && needRebuildFor.indexOf(evt.meta) !== -1) {
    this.rebuildPanels();
  }
};