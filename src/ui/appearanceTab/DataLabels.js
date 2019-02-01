goog.provide('chartEditor.ui.appearanceTabs.DataLabels');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.Labels');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.DataLabels = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.DataLabels.base(this, 'constructor', model, 'Data Labels', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.DATA_LABELS;

  this.key = [['chart'], ['settings'], 'labels()'];

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.DataLabels, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.DataLabels.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.DataLabels.base(this, 'createDom');
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  this.enableContentCheckbox.init(model, this.genKey('enabled()'));

  var settings = new chartEditor.ui.panel.Labels(model);
  settings.allowEnabled(false);
  settings.setName(null);
  settings.setKey(this.getKey());
  this.addChildControl(settings);

  this.settings_ = settings;
};
