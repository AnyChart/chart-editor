goog.provide('anychart.chartEditorModule.settings.ColorScaleSingleRange');
goog.provide('anychart.chartEditorModule.settings.scales.OrdinalColorSpecific');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.colorPicker.Base');
goog.require('anychart.chartEditorModule.input.Base');
goog.require('anychart.chartEditorModule.settings.scales.SpecificBase');
goog.require('goog.ui.Button');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.settings.scales.SpecificBase}
 */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.base(this, 'constructor', model, opt_domHelper);

  /**
   * @type {Array.<anychart.chartEditorModule.settings.ColorScaleSingleRange>}
   * @private
   */
  this.ranges_ = [];

  this.addClassName(goog.getCssName('anychart-settings-panel-scale-ordinal-color'));
};
goog.inherits(anychart.chartEditorModule.settings.scales.OrdinalColorSpecific, anychart.chartEditorModule.settings.scales.SpecificBase);


/** @override */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.createDom = function() {
  anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  this.rangesComponent_ = new anychart.chartEditorModule.SettingsPanel(model, null);
  this.rangesComponent_.allowEnabled(false);
  this.rangesComponent_.setKey(this.genKey('ranges', true));
  this.addChild(this.rangesComponent_, true);

  var addRangeBtnRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
      goog.ui.ButtonRenderer,
      'anychart-settings-panel-add-range-btn'));
  this.addRangeBtn_ = new goog.ui.Button('+ Add range', addRangeBtnRenderer);
  this.addChild(this.addRangeBtn_, true);
};


/** @override */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.enterDocument = function() {
  anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.base(this, 'enterDocument');

  if (this.addRangeBtn_)
    this.getHandler().listen(this.addRangeBtn_, goog.ui.Component.EventType.ACTION, this.onAddRange_);
};


/** @inheritDoc */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.onChartDraw = function(evt) {
  anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.base(this, 'onChartDraw', evt);

  if (!this.isExcluded()) {
    this.createAllRanges(evt.chart);
  }
};


/**
 * Add range button handler.
 * @private
 */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.onAddRange_ = function() {
  this.addRange(this.ranges_.length);
};


/**
 * @param {goog.events.Event} evt
 * @private
 */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.onRemoveRange_ = function(evt) {
  evt.stopPropagation();

  var index = /** @type {anychart.chartEditorModule.settings.ColorScaleSingleRange} */(evt.target).index();

  var removedRange = goog.array.splice(this.ranges_, index, 1);
  this.rangesComponent_.removeChild(removedRange[0], true);

  for (var i = 0; i < this.ranges_.length; i++) {
    /** @type {anychart.chartEditorModule.settings.ColorScaleSingleRange} */(this.ranges_[i]).index(i);
  }

  this.onChangeRange_();
};


/**
 * Change range event handler.
 * @private
 */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.onChangeRange_ = function() {
  var rangesValue = [];
  for (var i = 0; i < this.ranges_.length; i++) {
    if (this.ranges_[i]) {
      var rangeValue = /** @type {anychart.chartEditorModule.settings.ColorScaleSingleRange} */(this.ranges_[i]).getValue();
      rangesValue.push(rangeValue);
    }
  }

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  model.setValue(this.rangesComponent_.getKey(), rangesValue, false);
};


/**
 * @param {number} index
 */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.addRange = function(index) {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var range = new anychart.chartEditorModule.settings.ColorScaleSingleRange(model, index);
  range.allowRemove(true);
  this.getHandler().listen(range, anychart.chartEditorModule.events.EventType.PANEL_CLOSE, this.onRemoveRange_);
  this.getHandler().listen(range, goog.ui.Component.EventType.CHANGE, this.onChangeRange_);

  this.rangesComponent_.addChild(range, true);
  this.ranges_.push(range);
};


/** @inheritDoc */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.exclude = function(value) {
  if (value) this.removeAllRanges();
  anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.base(this, 'exclude', value);
};


/** @inheritDoc */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.exitDocument = function() {
  this.removeAllRanges();
  anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.base(this, 'exitDocument');
};


/** @inheritDoc */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.disposeInternal = function() {
  this.removeAllRanges();
  anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.base(this, 'disposeInternal');
};


/**
 * Create ranges components if need
 * @param {Object} chart
 */
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.createAllRanges = function(chart) {
  if (!this.ranges_.length) {
    var stringKey = anychart.chartEditorModule.EditorModel.getStringKey(this.rangesComponent_.getKey());
    var rangesValue = /** @type {?Array} */(anychart.bindingModule.exec(chart, stringKey));
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
anychart.chartEditorModule.settings.scales.OrdinalColorSpecific.prototype.removeAllRanges = function() {
  for (var i = 0; i < this.ranges_.length; i++) {
    this.rangesComponent_.removeChild(this.ranges_[i], true);
  }
  goog.disposeAll(this.ranges_);
  this.ranges_.length = 0;
};


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.ColorScaleSingleRange = function(model, index, opt_domHelper) {
  anychart.chartEditorModule.settings.ColorScaleSingleRange.base(this, 'constructor', model, null, opt_domHelper);

  this.index_ = index;

  this.name = 'Range ' + this.index_;

  this.addClassName(goog.getCssName('anychart-settings-color-scale-range-single'));
};
goog.inherits(anychart.chartEditorModule.settings.ColorScaleSingleRange, anychart.chartEditorModule.SettingsPanel);


/** @override */
anychart.chartEditorModule.settings.ColorScaleSingleRange.prototype.createDom = function() {
  anychart.chartEditorModule.settings.ColorScaleSingleRange.base(this, 'createDom');

  var color = new anychart.chartEditorModule.colorPicker.Base();
  color.addClassName(goog.getCssName('range-color'));
  this.addChild(color, true);
  this.color_ = color;

  var from = new anychart.chartEditorModule.input.Base('From');
  this.addChild(from, true);
  this.from_ = from;

  var to = new anychart.chartEditorModule.input.Base('To');
  this.addChild(to, true);
  this.to_ = to;

  var less = new anychart.chartEditorModule.input.Base('Less');
  this.addChild(less, true);
  this.less_ = less;

  var greater = new anychart.chartEditorModule.input.Base('Greater');
  this.addChild(greater, true);
  this.greater_ = greater;

  this.getHandler().listen(this.color_, goog.ui.Component.EventType.ACTION, this.onChange);
  this.getHandler().listen(this.from_.getElement(), goog.ui.Component.EventType.CHANGE, this.onChange);
  this.getHandler().listen(this.to_.getElement(), goog.ui.Component.EventType.CHANGE, this.onChange);
  this.getHandler().listen(this.less_.getElement(), goog.ui.Component.EventType.CHANGE, this.onChange);
  this.getHandler().listen(this.greater_.getElement(), goog.ui.Component.EventType.CHANGE, this.onChange);
};


/** @param {goog.events.Event} evt */
anychart.chartEditorModule.settings.ColorScaleSingleRange.prototype.onChange = function(evt) {
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
anychart.chartEditorModule.settings.ColorScaleSingleRange.prototype.getValue = function() {
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
anychart.chartEditorModule.settings.ColorScaleSingleRange.prototype.setValue = function(value) {
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
anychart.chartEditorModule.settings.ColorScaleSingleRange.prototype.index = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.index_ = opt_value;
  }
  return this.index_;
};

