goog.provide('chartEditor.settings.ColorScaleSingleRange');
goog.provide('chartEditor.settings.scales.Ranges');

goog.require("chartEditor.SettingsPanel");
goog.require("chartEditor.colorPicker.Base");
goog.require("chartEditor.controls.input.Base");
goog.require("goog.ui.Button");


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.scales.Ranges = function(model, opt_domHelper) {
  chartEditor.settings.scales.Ranges.base(this, 'constructor', model, 'Ranges', opt_domHelper);

  /**
   * @type {Array.<chartEditor.settings.ColorScaleSingleRange>}
   * @private
   */
  this.ranges_ = [];

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-scale-ranges'));
};
goog.inherits(chartEditor.settings.scales.Ranges, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.scales.Ranges.prototype.createDom = function() {
  chartEditor.settings.scales.Ranges.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  this.rangesComponent_ = new chartEditor.SettingsPanel(model, null);
  this.rangesComponent_.allowEnabled(false);
  this.rangesComponent_.setKey(this.genKey('ranges', true));
  this.addChild(this.rangesComponent_, true);

  var addRangeBtnRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
      goog.ui.ButtonRenderer,
      'anychart-ce-settings-panel-add-range-btn'));
  this.addRangeBtn_ = new goog.ui.Button('+ Add range', addRangeBtnRenderer);
  this.addChild(this.addRangeBtn_, true);
};


/** @override */
chartEditor.settings.scales.Ranges.prototype.enterDocument = function() {
  chartEditor.settings.scales.Ranges.base(this, 'enterDocument');

  if (this.addRangeBtn_)
    this.getHandler().listen(this.addRangeBtn_, goog.ui.Component.EventType.ACTION, this.onAddRange_);
};


/** @inheritDoc */
chartEditor.settings.scales.Ranges.prototype.onChartDraw = function(evt) {
  chartEditor.settings.scales.Ranges.base(this, 'onChartDraw', evt);

  if (!this.isExcluded()) {
    this.createAllRanges(evt.chart);
  }
};


/**
 * Add range button handler.
 * @private
 */
chartEditor.settings.scales.Ranges.prototype.onAddRange_ = function() {
  this.addRange(this.ranges_.length);
};


/**
 * @param {goog.events.Event} evt
 * @private
 */
chartEditor.settings.scales.Ranges.prototype.onRemoveRange_ = function(evt) {
  evt.stopPropagation();

  var index = /** @type {chartEditor.settings.ColorScaleSingleRange} */(evt.target).index();

  var removedRange = goog.array.splice(this.ranges_, index, 1);
  this.rangesComponent_.removeChild(removedRange[0], true);

  for (var i = 0; i < this.ranges_.length; i++) {
    /** @type {chartEditor.settings.ColorScaleSingleRange} */(this.ranges_[i]).index(i);
  }

  this.onChangeRange_();
};


/**
 * Change range event handler.
 * @private
 */
chartEditor.settings.scales.Ranges.prototype.onChangeRange_ = function() {
  var rangesValue = [];
  for (var i = 0; i < this.ranges_.length; i++) {
    if (this.ranges_[i]) {
      var rangeValue = /** @type {chartEditor.settings.ColorScaleSingleRange} */(this.ranges_[i]).getValue();
      rangesValue.push(rangeValue);
    }
  }

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  model.setValue(this.rangesComponent_.getKey(), rangesValue, false);
};


/**
 * @param {number} index
 */
chartEditor.settings.scales.Ranges.prototype.addRange = function(index) {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var range = new chartEditor.settings.ColorScaleSingleRange(model, index);
  range.allowRemove(true);
  this.getHandler().listen(range, chartEditor.events.EventType.PANEL_CLOSE, this.onRemoveRange_);
  this.getHandler().listen(range, goog.ui.Component.EventType.CHANGE, this.onChangeRange_);

  this.rangesComponent_.addChild(range, true);
  this.ranges_.push(range);
};


/** @inheritDoc */
chartEditor.settings.scales.Ranges.prototype.exclude = function(value) {
  if (value) this.removeAllRanges();
  chartEditor.settings.scales.Ranges.base(this, 'exclude', value);
};


/** @inheritDoc */
chartEditor.settings.scales.Ranges.prototype.exitDocument = function() {
  this.removeAllRanges();
  chartEditor.settings.scales.Ranges.base(this, 'exitDocument');
};


/** @inheritDoc */
chartEditor.settings.scales.Ranges.prototype.disposeInternal = function() {
  this.removeAllRanges();
  chartEditor.settings.scales.Ranges.base(this, 'disposeInternal');
};


/**
 * Create ranges components if need
 * @param {Object} chart
 */
chartEditor.settings.scales.Ranges.prototype.createAllRanges = function(chart) {
  if (!this.ranges_.length) {
    var stringKey = chartEditor.EditorModel.getStringKey(this.rangesComponent_.getKey());
    var rangesValue = /** @type {?Array} */(chartEditor.binding.exec(chart, stringKey));
    if (rangesValue && rangesValue.length) {
      for (var i = 0; i < rangesValue.length; i++) {
        this.addRange(i);
        this.ranges_[i].setValue(rangesValue[i]);
      }
    }
  }
};


/**
 * Removes ranges components.
 */
chartEditor.settings.scales.Ranges.prototype.removeAllRanges = function() {
  for (var i = 0; i < this.ranges_.length; i++) {
    this.rangesComponent_.removeChild(this.ranges_[i], true);
  }
  goog.disposeAll(this.ranges_);
  this.ranges_.length = 0;
};


/**
 * @param {chartEditor.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.ColorScaleSingleRange = function(model, index, opt_domHelper) {
  chartEditor.settings.ColorScaleSingleRange.base(this, 'constructor', model, null, opt_domHelper);

  this.index_ = index;

  this.name = 'Range ' + this.index_;

  this.addClassName(goog.getCssName('anychart-ce-settings-color-scale-range-single'));
};
goog.inherits(chartEditor.settings.ColorScaleSingleRange, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.ColorScaleSingleRange.prototype.createDom = function() {
  chartEditor.settings.ColorScaleSingleRange.base(this, 'createDom');

  var color = new chartEditor.colorPicker.Base();
  color.addClassName(goog.getCssName('range-color'));
  this.addChild(color, true);
  this.color_ = color;

  var from = new chartEditor.controls.input.Base('From');
  this.addChild(from, true);
  this.from_ = from;

  var to = new chartEditor.controls.input.Base('To');
  this.addChild(to, true);
  this.to_ = to;

  var equal = new chartEditor.controls.input.Base('Equal');
  this.addChild(equal, true);
  this.equal_ = equal;

  var less = new chartEditor.controls.input.Base('Less');
  this.addChild(less, true);
  this.less_ = less;

  var greater = new chartEditor.controls.input.Base('Greater');
  this.addChild(greater, true);
  this.greater_ = greater;

  this.getHandler().listen(this.color_, goog.ui.Component.EventType.ACTION, this.onChange);
  this.getHandler().listen(this.from_.getElement(), goog.ui.Component.EventType.CHANGE, this.onChange);
  this.getHandler().listen(this.to_.getElement(), goog.ui.Component.EventType.CHANGE, this.onChange);
  this.getHandler().listen(this.less_.getElement(), goog.ui.Component.EventType.CHANGE, this.onChange);
  this.getHandler().listen(this.greater_.getElement(), goog.ui.Component.EventType.CHANGE, this.onChange);
};


/** @param {goog.events.Event} evt */
chartEditor.settings.ColorScaleSingleRange.prototype.onChange = function(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  this.dispatchEvent({
    type: goog.ui.Component.EventType.CHANGE,
    value: this.getValue()
  });
};


/**
 * @return {Object}
 */
chartEditor.settings.ColorScaleSingleRange.prototype.getValue = function() {
  var value = {};

  var colorValue = this.color_.getSelectedColor();
  if (colorValue)
    value['color'] = colorValue;

  var fromValue = this.from_.getValue();
  if (fromValue)
    value['from'] = fromValue;

  var toValue = this.to_.getValue();
  if (toValue)
    value['to'] = toValue;

  var equalValue = this.equal_.getValue();
  if (equalValue)
    value['equal'] = equalValue;

  var lessValue = this.less_.getValue();
  if (lessValue)
    value['less'] = lessValue;

  var greaterValue = this.greater_.getValue();
  if (greaterValue)
    value['greater'] = greaterValue;

  return value;
};


/**
 * @param {Object} value
 */
chartEditor.settings.ColorScaleSingleRange.prototype.setValue = function(value) {
  if (goog.isObject(value)) {
    for (var i in value) {
      switch (i) {
        case 'color':
          this.color_.setSelectedColor(value[i]);
          break;
        case 'from':
          this.from_.setValue(value[i]);
          break;
        case 'to':
          this.to_.setValue(value[i]);
          break;
        case 'equal':
          this.equal_.setValue(value[i]);
          break;
        case 'less':
          this.less_.setValue(value[i]);
          break;
        case 'greater':
          this.greater_.setValue(value[i]);
          break;
      }
    }
  }
};


/**
 * @param {number=} opt_value
 * @return {number}
 */
chartEditor.settings.ColorScaleSingleRange.prototype.index = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.index_ = opt_value;
  }
  return this.index_;
};

