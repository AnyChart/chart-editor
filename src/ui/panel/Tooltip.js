goog.provide('chartEditor.ui.panel.Tooltip');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.panel.Title');
goog.require('chartEditor.ui.panel.TooltipTitle');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Tooltip = function(model, opt_domHelper) {
  chartEditor.ui.panel.Tooltip.base(this, 'constructor', model, 'Tooltip', opt_domHelper);

  this.allowEnabled(true);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.Tooltip, chartEditor.ui.Panel);


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.panel.Tooltip.prototype.allowEditPositionMode_ = true;


/**
 * @param {boolean} value
 */
chartEditor.ui.panel.Tooltip.prototype.allowEditPositionMode = function(value) {
  this.allowEditPositionMode_ = value;
};


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.panel.Tooltip.prototype.allowEditDisplayMode_ = true;


/**
 * @param {boolean} value
 */
chartEditor.ui.panel.Tooltip.prototype.allowEditDisplayMode = function(value) {
  this.allowEditDisplayMode_ = value;
};


/** @override */
chartEditor.ui.panel.Tooltip.prototype.createDom = function() {
  chartEditor.ui.panel.Tooltip.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  // Position mode
  if (this.allowEditPositionMode_) {
    var positionMode = new chartEditor.ui.control.fieldSelect.Base({label: 'Position mode'});
    positionMode.getSelect().setOptions(['chart', 'float', 'point']);
    positionMode.init(model, this.genKey('positionMode()'));
    this.addChildControl(positionMode);
  }

  // Display mode
  if (this.allowEditDisplayMode_) {
    var displayMode = new chartEditor.ui.control.fieldSelect.Base({label: 'Display mode'});
    displayMode.getSelect().setOptions(['separated', 'single', 'union']);
    displayMode.init(model, this.genKey('displayMode()'));
    this.addChildControl(displayMode);
  }

  if (this.allowEditPositionMode_ || this.allowEditDisplayMode_)
    this.addContentSeparator();

  // Title
  var title = new chartEditor.ui.panel.TooltipTitle(model, 'Tooltip Title');
  title.setTitleFormatKey(this.genKey('titleFormat()'));
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  this.addContentSeparator();

  // Content
  var contentComponent = new chartEditor.ui.panel.Title(model, 'Tooltip Content');
  contentComponent.allowEnabled(false);
  contentComponent.allowEditPosition(false);
  contentComponent.allowEditAlign(false);
  contentComponent.setTitleKey('format()');
  contentComponent.setKey(this.getKey());
  this.addChildControl(contentComponent);
};
