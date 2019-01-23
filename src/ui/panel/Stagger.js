goog.provide('chartEditor.ui.panel.Stagger');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Stagger = function(model, opt_domHelper) {
  chartEditor.ui.panel.Stagger.base(this, 'constructor', model, 'Stagger Mode', opt_domHelper);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-stagger'));
};
goog.inherits(chartEditor.ui.panel.Stagger, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.panel.Stagger.prototype.setKey = function(key) {
  chartEditor.ui.panel.Stagger.base(this, 'setKey', key);
  this.enabledKey(this.genKey('staggerMode()'));
};


/** @inheritDoc */
chartEditor.ui.panel.Stagger.prototype.createDom = function() {
  chartEditor.ui.panel.Stagger.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  // Stagger lines
  var staggerLines = new chartEditor.ui.control.comboBox.Base();
  staggerLines.setOptions([1, 2, 3, 4, 5]);
  staggerLines.setRange(0, 10);
  var staggerLinesLC = new chartEditor.ui.control.wrapped.Labeled(staggerLines, 'Stagger Lines');
  staggerLinesLC.init(model, this.genKey('staggerLines()'));
  this.addChildControl(staggerLinesLC);

  // Stagger max lines
  var staggerMaxLines = new chartEditor.ui.control.comboBox.Base();
  staggerMaxLines.setOptions([1, 2, 3, 4, 5]);
  staggerMaxLines.setRange(0, 10);
  var staggerMaxLinesLC = new chartEditor.ui.control.wrapped.Labeled(staggerMaxLines, 'Stagger Max Lines');
  staggerMaxLinesLC.init(model, this.genKey('staggerMaxLines()'));
  this.addChildControl(staggerMaxLinesLC);
};
