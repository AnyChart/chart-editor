goog.provide('chartEditor.ui.panel.Gaps');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');
goog.require('chartEditor.ui.panel.scales.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Select');



/**
 * @param {chartEditor.model.Base} model
 * @param {string} name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Gaps = function(model, name, opt_domHelper) {
  chartEditor.ui.panel.Gaps.base(this, 'constructor', model, name, null, opt_domHelper);
  
  this.name = name || '';

  this.allowEnabled(false);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.Gaps, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.Gaps.prototype.createDom = function() {
  chartEditor.ui.panel.Gaps.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());


// TODO: check if the labeld controls available
/*
  var intervals = new chartEditor.ui.control.input.Numbers('Intervals count');
  var intervalsLC = new chartEditor.ui.control.wrapped.Labeled(intervals, 'Intervals count');
  intervalsLC.init(model, this.genKey('intervalsCount', true));
  this.addChildControl(intervalsLC);

  var units = new chartEditor.ui.control.input.Numbers('Unit count');
  var unitsLC = new chartEditor.ui.control.wrapped.Labeled(units, 'Unit count');
  unitsLC.init(model, this.genKey('unitCount', true));
  this.addChildControl(unitsLC);

  var scaleType = new chartEditor.ui.control.fieldSelect.Base({label: 'Unit type'});
  scaleType.getSelect().setOptions([
    {value: 'day'},
    {value: 'hour'},
    {value: 'millisecond'},
    {value: 'minute'},
    {value: 'month'},
    {value: 'quarter'},
    {value: 'second'},
    {value: 'semester'},
    {value: 'third-of-month'},
    {value: 'week'},
    {value: 'year'}
  ]);
  scaleType.init(model, this.genKey('unitType'));
  this.addChildControl(scaleType);
*/

  var intervalsCount = new chartEditor.ui.control.comboBox.Base();
  intervalsCount.allowReset(false);
  intervalsCount.setOptions([0, 1, 2, 3, 4, 5]);
  intervalsCount.setRange(0, 50);
  this.addChild(intervalsCount, true);
  goog.dom.classlist.add(intervalsCount.getElement(), goog.getCssName('anychart-ce-stroke-thickness'));
  this.intervalsCount_ = intervalsCount;

  var unitType = new chartEditor.ui.control.fieldSelect.Select('Unit type');
  unitType.setOptions([
    {value: 'day'},
    {value: 'hour'},
    {value: 'millisecond'},
    {value: 'minute'},
    {value: 'month'},
    {value: 'quarter'},
    {value: 'second'},
    {value: 'semester'},
    {value: 'third-of-month'},
    {value: 'week'},
    {value: 'year'}
  ]);
  this.addChild(unitType, true);
  // goog.dom.classlist.add(dash.getElement(), goog.getCssName('anychart-ce-stroke-dash'));
  this.unitType_ = unitType;

  var unitCount = new chartEditor.ui.control.comboBox.Base();
  unitCount.allowReset(false);
  unitCount.setOptions([0, 1, 2, 3, 4, 5]);
  unitCount.setRange(0, 50);
  this.addChild(unitCount, true);
  goog.dom.classlist.add(unitCount.getElement(), goog.getCssName('anychart-ce-stroke-thickness'));
  this.unitCount_ = unitCount;
};


/** @override */
chartEditor.ui.panel.Gaps.prototype.enterDocument = function() {
  chartEditor.ui.panel.Gaps.base(this, 'enterDocument');

  var handler = this.getHandler();
  handler.listen(this.intervalsCount_, goog.ui.Component.EventType.CHANGE, this.onChange);
  handler.listen(this.unitType_, goog.ui.Component.EventType.CHANGE, this.onChange);
  handler.listen(this.unitCount_, goog.ui.Component.EventType.CHANGE, this.onChange);
};


/**
 * Common handler function for every control in ui. Sets value for stroke() key as Object.
 */
chartEditor.ui.panel.Gaps.prototype.onChange = function() {
  if (this.noDispatch) return;

  debugger;

  var value = {};
  var intervalsCount = this.intervalsCount_.getToken();
  if (intervalsCount)
    value['intervalsCount'] = intervalsCount;

  // var unitType = this.unitType_.getKey();
  var unitType = this.unitType_.getValue()['value'];
  if (unitType)
    value['unitType'] = unitType;

  var unitCount = this.unitCount_.getToken();
  if (unitCount)
    value['unitCount'] = unitCount;

  if (intervalsCount || unitType || unitCount) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    if (model) {
      model.setValue(this.key, value);
      this.dispatchEvent(goog.ui.Component.EventType.ACTION);
    }
  }
};
