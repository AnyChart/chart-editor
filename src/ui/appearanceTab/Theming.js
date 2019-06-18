goog.provide('chartEditor.ui.appearanceTabs.Theming');

goog.require('chartEditor.ui.Panel');
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

  this.key = [['anychart'], 'appendTheme()'];

  this.anychart_ = goog.dom.getWindow()['anychart'];

  this.allowReset(true);
  this.allowEnabled(false);
};
goog.inherits(chartEditor.ui.appearanceTabs.Theming, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Theming.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.Theming.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  this.themeTextArea = new chartEditor.ui.control.textArea.Base();
  this.themeTextArea.init(model, this.getKey(), void 0, true);
  this.themeTextArea.setPlaceholder('Type in custom theme code');

  this.addChildControl(this.themeTextArea);
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Theming.prototype.onChartDraw = function(evt) {
  if (this.themeTextArea)
    this.themeTextArea.setValueByTarget();
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Theming.prototype.reset = function() {
  // drop the custom theme
  chartEditor.binding.exec(this.anychart_, 'theme()', []);

  // clear model and text area content
  this.themeTextArea.reset();
  this.themeTextArea.setValue('');
};

