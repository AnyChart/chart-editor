goog.provide('chartEditor.scales.StandalonePanel');

goog.require("chartEditor.SettingsPanelZippy");
goog.require("chartEditor.controls.input.Base");
goog.require("chartEditor.settings.scales.Base");
goog.require("chartEditor.settings.scales.Standalone");


/**
 * @param {chartEditor.EditorModel} model
 * @param {number} index
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.scales.StandalonePanel = function(model, index, opt_name, opt_domHelper) {
  chartEditor.scales.StandalonePanel.base(this, 'constructor', model, index, null, opt_domHelper);

  this.setKey([['standalones'], ['scale', index]]);

  this.allowEnabled(false);

  this.allowRemove(true);

  this.scale_ = null;
};
goog.inherits(chartEditor.scales.StandalonePanel, chartEditor.SettingsPanelZippy);


/**
 * @param {string} type
 */
chartEditor.scales.StandalonePanel.prototype.setScaleAsDefault = function(type) {
  this.scaleType_ = type;
  this.allowRemove(false);
};


/** @inheritDoc */
chartEditor.scales.StandalonePanel.prototype.createDom = function() {
  chartEditor.scales.StandalonePanel.base(this, 'createDom');
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var name = new chartEditor.controls.input.Base('Scale name');
  name.init(model, this.genKey('name'));
  this.addHeaderChildControl(name);
  this.scaleName_ = name;

  var scale;
  var scaleTypes = ['ordinal', 'linear', 'log', 'date-time'];

  if (this.scaleType_) {
    scale = new chartEditor.settings.scales.Base(model, scaleTypes);
    scale.setFixedScaleType(this.scaleType_);
  } else {
    scale = new chartEditor.settings.scales.Standalone(model, scaleTypes);
  }

  scale.setKey(this.genKey(['settings']));
  this.addChildControl(scale);

  this.scale_ = scale;
};


/** @inheritDoc */
chartEditor.scales.StandalonePanel.prototype.onChartDraw = function(evt) {
  chartEditor.scales.StandalonePanel.base(this, 'onChartDraw', evt);
  this.scaleName_.setValueByModel();

  this.checkScaleType();
};


/**
 * If scale type is not set, adds error style to panel
 */
chartEditor.scales.StandalonePanel.prototype.checkScaleType = function() {
  var errorClass = goog.getCssName('anychart-ce-error');
  if (this.scale_ && this.scale_.getScaleType()) {
    this.removeClassName(errorClass);
  } else {
    this.addClassName(errorClass);
    this.expand();
  }
};


/** @inheritDoc */
chartEditor.scales.StandalonePanel.prototype.disposeInternal = function() {
  goog.dispose(this.scale_);
  this.scale_ = null;
  
  chartEditor.scales.StandalonePanel.base(this, 'disposeInternal');
};
