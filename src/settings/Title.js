goog.provide('chartEditor.settings.Title');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.button.Bold');
goog.require('chartEditor.button.Italic');
goog.require('chartEditor.button.Underline');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.WrappedControl');
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

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-settings-title'));
};
goog.inherits(chartEditor.settings.Title, chartEditor.SettingsPanel);


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

  var content = this.getContentElement();
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  if (this.allowEditTitle_) {
    var title = new chartEditor.controls.WrappedControl(new chartEditor.controls.input.Base(), true);
    title.init(model, this.genKey(this.titleKey_));
    this.addChildControl(title);
  }

  var fontSettings = new chartEditor.settings.Font(model);
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
    positionField.init(model, this.genKey(this.positionKey_));
    this.addChildControl(positionField);
    this.positionField_ = positionField;
  }

  if (this.allowEditAlign_) {
    var alignField = new chartEditor.controls.select.DataField({label: this.alignLabel_});
    alignField.getSelect().setOptions([
      {value: 'left', icon: 'ac ac-position-left'},
      {value: 'center', icon: 'ac ac-position-center'},
      {value: 'right', icon: 'ac ac-position-right'}
    ]);
    alignField.init(model, this.genKey(this.alignKey_));
    this.addChildControl(alignField);
    this.alignField_ = alignField;
  }

  goog.dom.appendChild(content, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));
};
