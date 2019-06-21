goog.provide('chartEditor.ui.panel.Gaps');

goog.require('chartEditor.ui.Panel');
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
  chartEditor.ui.panel.Gaps.base(this, 'constructor', model, name, opt_domHelper);
  
  this.name = name || '';

  this.allowEnabled(false);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.Gaps, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.Gaps.prototype.createDom = function() {
  chartEditor.ui.panel.Gaps.base(this, 'createDom');

  var intervalsCount = new chartEditor.ui.control.comboBox.Base();
  intervalsCount.allowReset(false);
  intervalsCount.setOptions([0, 1, 2, 3, 4, 5]);
  intervalsCount.setRange(0, 50);
  this.addChild(intervalsCount, true);
  goog.dom.classlist.add(intervalsCount.getElement(), goog.getCssName('anychart-ce-stroke-thickness'));
  // goog.dom.classlist.add(intervalsCount.getElement(), goog.getCssName('anychart-ce-stockGaps'));
  this.intervalsCount_ = intervalsCount;


  // TODO: adjust CSS and try to wrap it to a private function
  var element = intervalsCount.getElement();
  // this.intervalsCountLabel_ = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-labeled-control-label', 'LOOOL');
  this.intervalsCountLabel_ = goog.dom.createDom(goog.dom.TagName.LABEL, void 0, 'Intervals Count');
  goog.dom.insertChildAt(element, this.intervalsCountLabel_, 0);

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

  element = unitType.getElement();
  this.intervalsCountLabel_ = goog.dom.createDom(goog.dom.TagName.LABEL, void 0, 'Unit type');
  goog.dom.insertChildAt(element, this.intervalsCountLabel_, 0);

  var unitCount = new chartEditor.ui.control.comboBox.Base();
  unitCount.allowReset(false);
  unitCount.setOptions([0, 1, 2, 3, 4, 5]);
  unitCount.setRange(0, 50);
  this.addChild(unitCount, true);
  goog.dom.classlist.add(unitCount.getElement(), goog.getCssName('anychart-ce-stroke-thickness'));
  this.unitCount_ = unitCount;

  element = unitCount.getElement();
  this.intervalsCountLabel_ = goog.dom.createDom(goog.dom.TagName.LABEL, void 0, 'Unit count');
  goog.dom.insertChildAt(element, this.intervalsCountLabel_, 0);
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
