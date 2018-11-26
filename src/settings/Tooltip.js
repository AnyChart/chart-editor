goog.provide('chartEditor.settings.Tooltip');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.Title');
goog.require('chartEditor.settings.TooltipTitle');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.Tooltip = function(model, opt_domHelper) {
  chartEditor.settings.Tooltip.base(this, 'constructor', model, 'Tooltip', opt_domHelper);

  this.allowEnabled(true);

  this.allowReset(true);
};
goog.inherits(chartEditor.settings.Tooltip, chartEditor.SettingsPanel);


/**
 * @type {boolean}
 * @private
 */
chartEditor.settings.Tooltip.prototype.allowEditPositionMode_ = true;


/**
 * @param {boolean} value
 */
chartEditor.settings.Tooltip.prototype.allowEditPositionMode = function(value) {
  this.allowEditPositionMode_ = value;
};


/**
 * @type {boolean}
 * @private
 */
chartEditor.settings.Tooltip.prototype.allowEditDisplayMode_ = true;


/**
 * @param {boolean} value
 */
chartEditor.settings.Tooltip.prototype.allowEditDisplayMode = function(value) {
  this.allowEditDisplayMode_ = value;
};


/** @override */
chartEditor.settings.Tooltip.prototype.createDom = function() {
  chartEditor.settings.Tooltip.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  // Position mode
  if (this.allowEditPositionMode_) {
    var positionMode = new chartEditor.controls.select.DataField({label: 'Position mode'});
    positionMode.getSelect().setOptions(['chart', 'float', 'point']);
    positionMode.init(model, this.genKey('positionMode()'));
    this.addChildControl(positionMode);
  }

  // Display mode
  if (this.allowEditDisplayMode_) {
    var displayMode = new chartEditor.controls.select.DataField({label: 'Display mode'});
    displayMode.getSelect().setOptions(['separated', 'single', 'union']);
    displayMode.init(model, this.genKey('displayMode()'));
    this.addChildControl(displayMode);
  }

  if (this.allowEditPositionMode_ || this.allowEditDisplayMode_)
    this.addContentSeparator();

  // Title
  var title = new chartEditor.settings.TooltipTitle(model, 'Tooltip Title');
  title.setTitleFormatKey(this.genKey('titleFormat()'));
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  this.addContentSeparator();

  // Content
  var contentComponent = new chartEditor.settings.Title(model, 'Tooltip Content');
  contentComponent.allowEnabled(false);
  contentComponent.allowEditPosition(false);
  contentComponent.allowEditAlign(false);
  contentComponent.setTitleKey('format()');
  contentComponent.setKey(this.getKey());
  this.addChildControl(contentComponent);
};
