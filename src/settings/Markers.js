goog.provide('chartEditor.settings.Markers');

goog.require("chartEditor.SettingsPanel");
goog.require("chartEditor.colorPicker.Base");
goog.require("chartEditor.comboBox.Base");
goog.require("chartEditor.controls.select.DataFieldSelect");
goog.require("chartEditor.enums");
goog.require("chartEditor.settings.Stroke");


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.Markers = function(model, opt_domHelper) {
  chartEditor.settings.Markers.base(this, 'constructor', model, 'Markers', opt_domHelper);
};
goog.inherits(chartEditor.settings.Markers, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.Markers.CSS_CLASS = goog.getCssName('anychart-ce-settings-markers');


/** @override */
chartEditor.settings.Markers.prototype.createDom = function() {
  chartEditor.settings.Markers.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, chartEditor.settings.Markers.CSS_CLASS);

  var content = this.getContentElement();
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var type = new chartEditor.controls.select.DataFieldSelect('Type');
  type.setOptions(goog.object.getValues(chartEditor.enums.MarkerType));
  type.init(model, this.genKey('type()'));
  type.addClassName(goog.getCssName('markers-type'));
  this.addChildControl(type);

  var size = new chartEditor.comboBox.Base();
  size.setOptions([6, 10, 12, 15]);
  size.init(model, this.genKey('size()'));
  this.addChildControl(size);
  goog.dom.classlist.add(size.getElement(), goog.getCssName('markers-size'));

  var fill = new chartEditor.colorPicker.Base();
  fill.init(model, this.genKey('fill()'));
  this.addChildControl(fill);
  goog.dom.classlist.add(fill.getElement(), goog.getCssName('markers-fill'));

  goog.dom.appendChild(content, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-gap')));

  var stroke = new chartEditor.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChild(stroke, true);
};
