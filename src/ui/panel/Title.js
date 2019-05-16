goog.provide('chartEditor.ui.panel.Title');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.button.Bold');
goog.require('chartEditor.ui.control.button.Italic');
goog.require('chartEditor.ui.control.button.Underline');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.select.FontFamily');
goog.require('chartEditor.ui.control.wrapped.Base');
goog.require('chartEditor.ui.panel.Font');
goog.require('goog.ui.ButtonSide');



/**
 * @param {chartEditor.model.Base} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Title = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.Title.base(this, 'constructor', model, opt_name, opt_domHelper);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-title'));
};
goog.inherits(chartEditor.ui.panel.Title, chartEditor.ui.Panel);


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.panel.Title.prototype.allowEditTitle_ = true;


/** @param {boolean} value */
chartEditor.ui.panel.Title.prototype.allowEditTitle = function(value) {
  this.allowEditTitle_ = value;
};


/**
 * @type {string}
 * @private
 */
chartEditor.ui.panel.Title.prototype.titleKey_ = 'text()';


/** @param {string} value */
chartEditor.ui.panel.Title.prototype.setTitleKey = function(value) {
  this.titleKey_ = value;
};


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.panel.Title.prototype.allowEditPosition_ = true;


/**
 * @param {boolean} value
 * @param {string=} opt_positionValue
 */
chartEditor.ui.panel.Title.prototype.allowEditPosition = function(value, opt_positionValue) {
  this.allowEditPosition_ = value;
  this.positionValue_ = opt_positionValue;
};


/**
 * @type {string}
 * @private
 */
chartEditor.ui.panel.Title.prototype.positionKey_ = 'position()';


/** @param {string} value */
chartEditor.ui.panel.Title.prototype.setPositionKey = function(value) {
  this.positionKey_ = value;
};


/**
 * @type {string}
 * @private
 */
chartEditor.ui.panel.Title.prototype.positionLabel_ = 'Orientation';


/** @param {string} value */
chartEditor.ui.panel.Title.prototype.setPositionLabel = function(value) {
  this.positionLabel_ = value;
};


/**
 * @return {chartEditor.ui.control.fieldSelect.Base|null}
 */
chartEditor.ui.panel.Title.prototype.getPositionField = function() {
  return this.positionField_;
};


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.panel.Title.prototype.allowEditAlign_ = true;


/** @param {boolean} value */
chartEditor.ui.panel.Title.prototype.allowEditAlign = function(value) {
  this.allowEditAlign_ = value;
};


/**
 * @type {string}
 * @private
 */
chartEditor.ui.panel.Title.prototype.alignKey_ = 'align()';


/** @param {string} value */
chartEditor.ui.panel.Title.prototype.setAlignKey = function(value) {
  this.alignKey_ = value;
};


/**
 * @type {string}
 * @private
 */
chartEditor.ui.panel.Title.prototype.alignLabel_ = 'Align';


/** @param {string} value */
chartEditor.ui.panel.Title.prototype.setAlignLabel = function(value) {
  this.alignLabel_ = value;
};


/**
 * @return {chartEditor.ui.control.fieldSelect.Base|null}
 */
chartEditor.ui.panel.Title.prototype.getAlignField = function() {
  return this.alignField_;
};


/** @override */
chartEditor.ui.panel.Title.prototype.createDom = function() {
  chartEditor.ui.panel.Title.base(this, 'createDom');

  var content = this.getContentElement();
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  if (this.allowEditTitle_) {
    var title = new chartEditor.ui.control.wrapped.Base(new chartEditor.ui.control.input.Base(), true);
    title.init(model, this.genKey(this.titleKey_));
    this.addChildControl(title);
  }

  var fontSettings = new chartEditor.ui.panel.Font(model);
  fontSettings.setKey(this.getKey());
  this.addChildControl(fontSettings);

  if (this.allowEditPosition_ || this.allowEditAlign_) {
    this.addContentSeparator();
  }

  if (this.allowEditPosition_) {
    var positionField = new chartEditor.ui.control.fieldSelect.Base({label: this.positionLabel_});
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
    var alignField = new chartEditor.ui.control.fieldSelect.Base({label: this.alignLabel_});
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
