goog.provide('chartEditor.ChartTitlePanel');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.Title');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.ChartTitlePanel = function(model, opt_domHelper) {
  chartEditor.ChartTitlePanel.base(this, 'constructor', model, 'Chart Title', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.TITLE;

  this.key = [['chart'], ['settings'], 'title()'];

  this.allowReset(true);
};
goog.inherits(chartEditor.ChartTitlePanel, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.ChartTitlePanel.prototype.createDom = function() {
  chartEditor.ChartTitlePanel.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var title = new chartEditor.settings.Title(model, null);
  title.allowEnabled(false);
  title.setPositionKey('orientation()');
  title.setKey([['chart'], ['settings'], 'title()']);
  this.addChildControl(title);
};


