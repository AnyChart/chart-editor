goog.provide('anychart.chartEditorModule.ChartTitlePanel');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.settings.Title');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.ChartTitlePanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.ChartTitlePanel.base(this, 'constructor', model, 'Chart Title', opt_domHelper);

  this.key = [['chart'], ['settings'], 'title()'];
};
goog.inherits(anychart.chartEditorModule.ChartTitlePanel, anychart.chartEditorModule.SettingsPanel);


/** @inheritDoc */
anychart.chartEditorModule.ChartTitlePanel.prototype.createDom = function() {
  anychart.chartEditorModule.ChartTitlePanel.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var title = new anychart.chartEditorModule.settings.Title(model, null);
  title.allowEnabled(false);
  title.setPositionKey('orientation()');
  title.setKey([['chart'], ['settings'], 'title()']);
  this.addChild(title, true);

  this.title_ = title;
};


