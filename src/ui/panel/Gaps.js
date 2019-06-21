goog.provide('chartEditor.ui.panel.Gaps');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Select');
goog.require('chartEditor.ui.control.wrapped.Labeled');



/**
 * @param {chartEditor.model.Base} model
 * @param {string} name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Gaps = function(model, name, opt_domHelper) {
  chartEditor.ui.panel.Gaps.base(this, 'constructor', model, name, opt_domHelper);
  
  this.name = name;

  this.allowEnabled(false);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.Gaps, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.Gaps.prototype.createDom = function() {
  chartEditor.ui.panel.Gaps.base(this, 'createDom');

  this.intervalsCount_ = new chartEditor.ui.control.comboBox.Base();
  this.intervalsCount_.allowReset(false);
  this.intervalsCount_.setOptions([0, 1, 2, 3, 4, 5]);
  this.intervalsCount_.setRange(0, 50);
  var intervalsCountLC = new chartEditor.ui.control.wrapped.Labeled(this.intervalsCount_, 'Intervals Count');
  this.addChildControl(intervalsCountLC);

  this.unitType_ = new chartEditor.ui.control.fieldSelect.Select('Unit type');
  this.unitType_.setOptions([
    {value: 'millisecond'},
    {value: 'second'},
    {value: 'minute'},
    {value: 'hour'},
    {value: 'day'},
    {value: 'week'},
    {value: 'third-of-month'},
    {value: 'month'},
    {value: 'quarter'},
    {value: 'semester'},
    {value: 'year'}
  ]);

  var unitTypeLC = new chartEditor.ui.control.wrapped.Labeled(this.unitType_, 'Unit Type');
  this.addChildControl(unitTypeLC);

  this.unitCount_ = new chartEditor.ui.control.comboBox.Base();
  this.unitCount_.allowReset(false);
  this.unitCount_.setOptions([0, 1, 2, 3, 4, 5]);
  this.unitCount_.setRange(0, 50);
  var unitCountLC = new chartEditor.ui.control.wrapped.Labeled(this.unitCount_, 'Unit Count');
  this.addChildControl(unitCountLC);
};


/** @override */
chartEditor.ui.panel.Gaps.prototype.enterDocument = function() {
  chartEditor.ui.panel.Gaps.base(this, 'enterDocument');

  var handler = this.getHandler();
  handler.listen(this.intervalsCount_, goog.ui.Component.EventType.CHANGE, this.onChange_);
  handler.listen(this.unitType_, goog.ui.Component.EventType.CHANGE, this.onChange_);
  handler.listen(this.unitCount_, goog.ui.Component.EventType.CHANGE, this.onChange_);
};


/**
 * Common handler function for every control in ui. Sets value for stroke() key as Object.
 * @private
 */
chartEditor.ui.panel.Gaps.prototype.onChange_ = function() {
  if (this.noDispatch) return;

  var value = {};
  var intervalsCount = this.intervalsCount_.getToken();
  if (intervalsCount)
    value['intervalsCount'] = intervalsCount;

  var unitType = this.unitType_.getValue();
  if (unitType)
    value['unitType'] = unitType['value'];

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


/** @inheritDoc */
chartEditor.ui.panel.Gaps.prototype.onChartDraw = function(evt) {
  chartEditor.ui.panel.Gaps.base(this, 'onChartDraw', evt);
  this.setValueByTarget(evt.chart);
};


/**
 * Sets values of child controls.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 */
chartEditor.ui.panel.Gaps.prototype.setValueByTarget = function(target) {
  if (this.excluded) return;

  var stringKey = chartEditor.model.Base.getStringKey(this.key);
  var value = /** @type {string|Object|Function} */(chartEditor.binding.exec(target, stringKey));

  this.noDispatch = true;
  // default always is 0
  this.intervalsCount_.setValue((value && value['intervalsCount']) ? value['intervalsCount'] : '0');
  // default is always milliseconds
  this.unitType_.setValue((value && value['unitType']) ? value['unitType'] : 'milliseconds');
  // default is always 1
  this.unitCount_.setValue((value && value['unitCount']) ? value['unitCount'] : '1');
  this.noDispatch = false;
};


/** @override */
chartEditor.ui.panel.Gaps.prototype.disposeInternal = function() {
  goog.disposeAll([this.intervalsCount_, this.unitType_, this.unitCount_]);
  this.intervalsCount_ = null;
  this.unitType_ = null;
  this.unitCount_ = null;

  chartEditor.ui.panel.Gaps.base(this, 'disposeInternal');
};


/** @override */
chartEditor.ui.panel.Gaps.prototype.reset = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  model.removeByKey(this.key);
};
