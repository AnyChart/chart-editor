goog.provide('chartEditor.settings.Title');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.button.Bold');
goog.require('chartEditor.button.Italic');
goog.require('chartEditor.button.Underline');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.input.Base');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.controls.select.FontFamily');
goog.require('chartEditor.settings.Font');
goog.require('goog.ui.ButtonSide');


/**
 * @param {chartEditor.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.Title = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.Title.base(this, 'constructor', model, opt_name, opt_domHelper);
};
goog.inherits(chartEditor.settings.Title, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.Title.CSS_CLASS = goog.getCssName('anychart-ce-settings-title');


/**
 * @type {boolean}
 * @private
 */
chartEditor.settings.Title.prototype.allowEditTitle_ = true;


/** @param {boolean} value */
chartEditor.settings.Title.prototype.allowEditTitle = function(value) {
  this.allowEditTitle_ = value;
};


/**
 * @type {string}
 * @private
 */
chartEditor.settings.Title.prototype.titleKey_ = 'text()';


/** @param {string} value */
chartEditor.settings.Title.prototype.setTitleKey = function(value) {
  this.titleKey_ = value;
};


/**
 * @type {boolean}
 * @private
 */
chartEditor.settings.Title.prototype.allowEditPosition_ = true;


/**
 * @param {boolean} value
 * @param {string=} opt_positionValue
 */
chartEditor.settings.Title.prototype.allowEditPosition = function(value, opt_positionValue) {
  this.allowEditPosition_ = value;
  this.positionValue_ = opt_positionValue;
};


/**
 * @type {string}
 * @private
 */
chartEditor.settings.Title.prototype.positionKey_ = 'position()';


/** @param {string} value */
chartEditor.settings.Title.prototype.setPositionKey = function(value) {
  this.positionKey_ = value;
};


/**
 * @type {string}
 * @private
 */
chartEditor.settings.Title.prototype.positionLabel_ = 'Orientation';


/** @param {string} value */
chartEditor.settings.Title.prototype.setPositionLabel = function(value) {
  this.positionLabel_ = value;
};


/**
 * @return {chartEditor.controls.select.DataField|null}
 */
chartEditor.settings.Title.prototype.getPositionField = function() {
  return this.positionField_;
};


/**
 * @type {boolean}
 * @private
 */
chartEditor.settings.Title.prototype.allowEditAlign_ = true;


/** @param {boolean} value */
chartEditor.settings.Title.prototype.allowEditAlign = function(value) {
  this.allowEditAlign_ = value;
};


/**
 * @type {string}
 * @private
 */
chartEditor.settings.Title.prototype.alignKey_ = 'align()';


/** @param {string} value */
chartEditor.settings.Title.prototype.setAlignKey = function(value) {
  this.alignKey_ = value;
};


/**
 * @type {string}
 * @private
 */
chartEditor.settings.Title.prototype.alignLabel_ = 'Align';


/** @param {string} value */
chartEditor.settings.Title.prototype.setAlignLabel = function(value) {
  this.alignLabel_ = value;
};


/**
 * @return {chartEditor.controls.select.DataField|null}
 */
chartEditor.settings.Title.prototype.getAlignField = function() {
  return this.alignField_;
};


/**
 * @type {boolean}
 * @private
 */
chartEditor.settings.Title.prototype.allowEditColor_ = true;


/** @param {boolean} value */
chartEditor.settings.Title.prototype.allowEditColor = function(value) {
  this.allowEditColor_ = value;
};


/** @override */
chartEditor.settings.Title.prototype.createDom = function() {
  chartEditor.settings.Title.base(this, 'createDom');

  var element = this.getElement();
  var content = this.getContentElement();
  goog.dom.classlist.add(element, chartEditor.settings.Title.CSS_CLASS);

  var textInput = null;
  if (this.allowEditTitle_) {
    textInput = new chartEditor.controls.input.Base(/*'Chart title'*/);
    this.addChild(textInput, true);
    goog.dom.classlist.add(textInput.getElement(), 'title-text');
  }

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var fontSettings = new chartEditor.settings.Font(model, null, {fontColor: !this.allowEditColor_});
  fontSettings.setKey(this.getKey());
  this.addChildControl(fontSettings);

  if (this.allowEditPosition_ || this.allowEditAlign_) {
    this.addContentSeparator();
  }
  if (this.allowEditPosition_) {
    var positionField = new chartEditor.controls.select.DataField({label: this.positionLabel_});

    positionField.getSelect().setOptions([
      {value: 'left', icon: 'ac ac-position-left'},
      {value: 'right', icon: 'ac ac-position-right'},
      {value: 'top', icon: 'ac ac-position-top'},
      {value: 'bottom', icon: 'ac ac-position-bottom'}
    ]);

    this.addChild(positionField, true);
  }

  if (this.allowEditAlign_) {
    var alignField = new chartEditor.controls.select.DataField({label: this.alignLabel_});

    alignField.getSelect().setOptions([
      {value: 'left', icon: 'ac ac-position-left'},
      {value: 'center', icon: 'ac ac-position-center'},
      {value: 'right', icon: 'ac ac-position-right'}
    ]);

    this.addChild(alignField, true);
  }

  goog.dom.appendChild(content, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));

  this.textInput_ = textInput;
  this.positionField_ = positionField;
  this.alignField_ = alignField;
};


/** @inheritDoc */
chartEditor.settings.Title.prototype.onChartDraw = function(evt) {
  chartEditor.settings.Title.base(this, 'onChartDraw', evt);

  if (!this.isExcluded()) {
    var target = evt.chart;
    if (this.textInput_) this.textInput_.setValueByTarget(target, true);
    if (this.positionField_) this.positionField_.getSelect().setValueByTarget(target);
    if (this.alignField_) this.alignField_.getSelect().setValueByTarget(target);
  }
};


/**
 * Update model keys.
 */
chartEditor.settings.Title.prototype.updateKeys = function() {
  chartEditor.settings.Title.base(this, 'updateKeys');
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());

    if (this.textInput_) this.textInput_.init(model, this.genKey(this.titleKey_));
    if (this.positionField_) this.positionField_.init(model, this.genKey(this.positionKey_));
    if (this.alignField_) this.alignField_.init(model, this.genKey(this.alignKey_));
  }
};


/** @override */
chartEditor.settings.Title.prototype.disposeInternal = function() {
  goog.disposeAll(this.positionField_, this.alignField_, this.textInput_);

  this.textInput_ = null;
  this.positionField_ = null;
  this.alignField_ = null;

  chartEditor.settings.Title.base(this, 'disposeInternal');
};
