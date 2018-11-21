goog.provide('chartEditor.DataLabelsPanel');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.Labels');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.DataLabelsPanel = function(model, opt_domHelper) {
  chartEditor.DataLabelsPanel.base(this, 'constructor', model, 'Data Labels', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.DATA_LABELS;

  this.key = [['chart'], ['settings'], 'labels()'];

  this.allowReset(true);
};
goog.inherits(chartEditor.DataLabelsPanel, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.DataLabelsPanel.prototype.createDom = function() {
  chartEditor.DataLabelsPanel.base(this, 'createDom');
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  this.enableContentCheckbox.init(model, this.genKey('enabled()'));

  var settings = new chartEditor.settings.Labels(model);
  settings.allowEnabled(false);
  settings.setName(null);
  settings.setKey(this.getKey());
  this.addChildControl(settings);

  this.settings_ = settings;
};
