goog.provide('anychart.chartEditorModule.TooltipPanel');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.Title');
goog.require('anychart.chartEditorModule.settings.TooltipTitle');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.TooltipPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.TooltipPanel.base(this, 'constructor', model, 'Tooltip', opt_domHelper);

  this.key = [['chart'], ['settings'], 'tooltip()'];
};
goog.inherits(anychart.chartEditorModule.TooltipPanel, anychart.chartEditorModule.SettingsPanel);


/** @inheritDoc */
anychart.chartEditorModule.TooltipPanel.prototype.createDom = function() {
  anychart.chartEditorModule.TooltipPanel.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  // Display mode
  var displayMode = new anychart.chartEditorModule.controls.select.DataField({label: 'Display mode'});
  displayMode.getSelect().setOptions(['separated', 'single', 'union']);
  displayMode.init(model, this.genKey('displayMode()'));
  this.addChildControl(displayMode);

  // Position mode
  var positionMode = new anychart.chartEditorModule.controls.select.DataField({label: 'Position mode'});
  positionMode.getSelect().setOptions(['chart', 'float', 'point']);
  positionMode.init(model, this.genKey('positionMode()'));
  this.addChildControl(positionMode);

  this.addContentSeparator();

  // Title
  var title = new anychart.chartEditorModule.settings.TooltipTitle(model, 'Title');
  title.setTitleFormatKey([['chart'], ['settings'], 'tooltip().titleFormat()']);
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  this.addContentSeparator();

  // Content
  var contentComponent = new anychart.chartEditorModule.settings.Title(model, 'Content');
  contentComponent.allowEnabled(false);
  contentComponent.allowEditPosition(false);
  contentComponent.allowEditAlign(false);
  contentComponent.setTitleKey('format()');
  contentComponent.setKey(this.getKey());
  this.addChildControl(contentComponent);
};
