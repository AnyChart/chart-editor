goog.provide('chartEditor.ui.appearanceTabs.Theming');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.Title');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.Theming = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Theming.base(this, 'constructor', model, 'Chart Title', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.THEMING;

  this.key = [['anychart'], ['settings'], 'theme()'];

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.Theming, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Theming.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.Theming.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var title = new chartEditor.ui.panel.Title(model, null);
  title.allowEnabled(false);
  title.setPositionKey('orientation()');
  title.setKey([['chart'], ['settings'], 'title()']);
  this.addChildControl(title);
};


