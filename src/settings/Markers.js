goog.provide('anychart.chartEditorModule.settings.Markers');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.colorPicker.Base');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.controls.select.DataFieldSelect');
goog.require('anychart.chartEditorModule.settings.Stroke');
goog.require('anychart.enums');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.Markers = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.Markers.base(this, 'constructor', model, 'Markers', opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.settings.Markers, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.Markers.CSS_CLASS = goog.getCssName('anychart-chart-editor-settings-markers');


/** @override */
anychart.chartEditorModule.settings.Markers.prototype.createDom = function() {
  anychart.chartEditorModule.settings.Markers.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, anychart.chartEditorModule.settings.Markers.CSS_CLASS);

  var content = this.getContentElement();
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var type = new anychart.chartEditorModule.controls.select.DataFieldSelect('Type');
  type.setOptions(goog.object.getValues(anychart.enums.MarkerType));
  type.init(model, this.genKey('type()'));
  type.addClassName(goog.getCssName('markers-type'));
  this.addChildControl(type);

  var size = new anychart.chartEditorModule.comboBox.Base();
  size.setOptions([6, 10, 12, 15]);
  size.init(model, this.genKey('size()'));
  this.addChildControl(size);
  goog.dom.classlist.add(size.getElement(), goog.getCssName('markers-size'));

  var fill = new anychart.chartEditorModule.colorPicker.Base();
  fill.init(model, this.genKey('fill()'));
  this.addChildControl(fill);
  goog.dom.classlist.add(fill.getElement(), goog.getCssName('markers-fill'));

  goog.dom.appendChild(content, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-clearboth')));

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-gap')));

  var stroke = new anychart.chartEditorModule.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChild(stroke, true);
};
