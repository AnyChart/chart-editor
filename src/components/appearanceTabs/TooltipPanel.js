goog.provide('chartEditor.TooltipPanel');

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
chartEditor.TooltipPanel = function(model, opt_domHelper) {
  chartEditor.TooltipPanel.base(this, 'constructor', model, 'Tooltip', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.TOOLTIP;

  this.key = [['chart'], ['settings'], 'tooltip()'];
};
goog.inherits(chartEditor.TooltipPanel, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.TooltipPanel.prototype.createDom = function() {
  chartEditor.TooltipPanel.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  // Display mode
  var displayMode = new chartEditor.controls.select.DataField({label: 'Display mode'});
  displayMode.getSelect().setOptions(['separated', 'single', 'union']);
  displayMode.init(model, this.genKey('displayMode()'));
  this.addChildControl(displayMode);

  // Position mode
  var positionMode = new chartEditor.controls.select.DataField({label: 'Position mode'});
  positionMode.getSelect().setOptions(['chart', 'float', 'point']);
  positionMode.init(model, this.genKey('positionMode()'));
  this.addChildControl(positionMode);

  this.addContentSeparator();

  // Title
  var title = new chartEditor.settings.TooltipTitle(model, 'Title');
  title.setTitleFormatKey([['chart'], ['settings'], 'tooltip().titleFormat()']);
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  this.addContentSeparator();

  // Content
  var contentComponent = new chartEditor.settings.Title(model, 'Content');
  contentComponent.allowEnabled(false);
  contentComponent.allowEditPosition(false);
  contentComponent.allowEditAlign(false);
  contentComponent.setTitleKey('format()');
  contentComponent.setKey(this.getKey());
  this.addChildControl(contentComponent);
};
