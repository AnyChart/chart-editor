goog.provide('chartEditor.ui.appearanceTabs.Theming');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.Title');
goog.require('chartEditor.ui.control.textArea.Base');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.Theming = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Theming.base(this, 'constructor', model, 'Chart Theme', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.THEMING;

  this.key = [['anychart'], 'theme()'];

  this.anychart_ = goog.dom.getWindow()['anychart'];

  this.allowReset(false);
  this.allowEnabled(false);
};
goog.inherits(chartEditor.ui.appearanceTabs.Theming, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Theming.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.Theming.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  this.themeTextArea = new chartEditor.ui.control.textArea.Base('{"column":{"title":{"text":"Bar Chart","enabled":true}}}');
  this.themeTextArea = new chartEditor.ui.control.textArea.Base();
  this.themeTextArea.init(model, this.getKey(), void 0, true);
  // debugger;
  // this.themeTextArea.setPlaceholder('LOOOL');

  this.addChildControl(this.themeTextArea);
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Theming.prototype.onChartDraw = function(evt) {
  // TODO: why I should execute this? it breaks targeting
  // chartEditor.ui.appearanceTabs.Theming.base(this, 'onChartDraw', evt);

  if (this.themeTextArea)
    this.themeTextArea.setValueByTarget(this.anychart_);
};

