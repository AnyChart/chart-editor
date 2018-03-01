goog.provide('anychart.chartEditorModule.settings.axes.LinearGauge');

goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.settings.axes.Linear');
goog.require('anychart.chartEditorModule.settings.scales.Base');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.settings.axes.Linear}
 */
anychart.chartEditorModule.settings.axes.LinearGauge = function(model, index, opt_domHelper) {
  anychart.chartEditorModule.settings.axes.LinearGauge.base(this, 'constructor', model, index, opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.settings.axes.LinearGauge, anychart.chartEditorModule.settings.axes.Linear);


/** @override */
anychart.chartEditorModule.settings.axes.LinearGauge.prototype.createDom = function() {
  anychart.chartEditorModule.settings.axes.LinearGauge.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var offset = new anychart.chartEditorModule.comboBox.Percent();
  offset.allowNegative(true);
  var offsetLC = new anychart.chartEditorModule.controls.LabeledControl(offset, 'Offset');
  offsetLC.init(model, this.genKey('offset()'));
  this.addChildControl(offsetLC, 0);

  this.addContentSeparator();

  var scale = new anychart.chartEditorModule.settings.scales.Base(model, ['linear', 'log']);
  scale.setKey([['chart'], ['settings'], 'scale()']);
  scale.setName('Scale');
  scale.skipSettings(['stackMode()', 'stackDirection()']);
  this.addChildControl(scale);
};
