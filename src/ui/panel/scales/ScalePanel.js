goog.provide('chartEditor.scales.ScalePanel');

goog.require("chartEditor.ui.PanelZippy");
goog.require("chartEditor.ui.control.input.Base");
goog.require("chartEditor.ui.panel.scales.Standalone");


/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.scales.ScalePanel = function(model, index, opt_name, opt_domHelper) {
  chartEditor.scales.ScalePanel.base(this, 'constructor', model, index, null, opt_domHelper);

  this.setKey([['standalones'], ['scale', index]]);

  this.allowEnabled(false);

  this.allowRemove(true);

  this.scale_ = null;

  this.addClassName(goog.getCssName('anychart-ce-panel-scale-wrapper'));
};
goog.inherits(chartEditor.scales.ScalePanel, chartEditor.ui.PanelZippy);


/**
 * @param {string} type
 */
chartEditor.scales.ScalePanel.prototype.setScaleAsDefault = function(type) {
  this.scaleType_ = type;
  this.allowRemove(false);
};


/** @inheritDoc */
chartEditor.scales.ScalePanel.prototype.createDom = function() {
  chartEditor.scales.ScalePanel.base(this, 'createDom');
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var self = this;
  var name = new chartEditor.ui.control.input.Base('Scale name');
  name.init(model, this.genKey('name'));
  this.addHeaderChildControl(name);
  this.scaleName_ = name;

  var scaleTypes = ['ordinal', 'linear', 'log', 'date-time'];
  var scale = new chartEditor.ui.panel.scales.Standalone(model, scaleTypes);
  scale.setKey(this.genKey(['settings']));
  this.getHandler().listen(scale, chartEditor.events.EventType.LOCK, function(evt){
    self.lock(evt.lock);
  });

  if (this.scaleType_)
    scale.setFixedScaleType(this.scaleType_);

  this.addChildControl(scale);

  this.scale_ = scale;
};


/** @inheritDoc */
chartEditor.scales.ScalePanel.prototype.onChartDraw = function(evt) {
  chartEditor.scales.ScalePanel.base(this, 'onChartDraw', evt);
  this.scaleName_.setValueByModel();

  this.checkScaleType();
};


/**
 * If scale type is not set, adds error style to panel
 */
chartEditor.scales.ScalePanel.prototype.checkScaleType = function() {
  var errorClass = goog.getCssName('anychart-ce-error');
  if (this.scale_ && this.scale_.getScaleType()) {
    this.removeClassName(errorClass);
  } else {
    this.addClassName(errorClass);
    this.expand();
  }
};


/** @inheritDoc */
chartEditor.scales.ScalePanel.prototype.disposeInternal = function() {
  goog.dispose(this.scale_);
  this.scale_ = null;
  
  chartEditor.scales.ScalePanel.base(this, 'disposeInternal');
};
