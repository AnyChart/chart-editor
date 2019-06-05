goog.provide('chartEditor.ui.panel.ganttProject.elements.Base');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Labels');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.ganttProject.elements.Base = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.elements.Base.base(this, 'constructor', model, -1, opt_name, opt_domHelper);

  this.options['above'] = false;
  this.options['depth'] = false;

  this.allowEnabled(true);
  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.ganttProject.elements.Base, chartEditor.ui.PanelZippy);



/** @override */
chartEditor.ui.panel.ganttProject.elements.Base.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.elements.Base.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  if (this.getOption('above')) {
    var above = new chartEditor.ui.control.checkbox.Base();
    above.init(model, this.genKey('above()'));
    above.setCaption('Above');
    this.addChildControl(above);
  }

  if (this.getOption('depth')) {
    var depth = new chartEditor.ui.control.comboBox.Base();
    depth.setOptions([0, 1, 2, 3, 4, 5]);
    depth.setRange(0, 20);
    var depthLC = new chartEditor.ui.control.wrapped.Labeled(depth, 'Depth');
    depthLC.init(model, this.genKey('depth()'));
    this.addChildControl(depthLC);
  }

  var stroke = new chartEditor.ui.panel.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var height = new chartEditor.ui.control.input.Base();
  var heightLC = new chartEditor.ui.control.wrapped.Labeled(height, 'Height', true);
  heightLC.init(model, this.genKey('height()'));
  this.addChildControl(heightLC);

  var position = new chartEditor.ui.control.fieldSelect.Base({label: 'Position'});
  position.getSelect().setOptions([
    chartEditor.enums.Anchor.LEFT_BOTTOM,
    chartEditor.enums.Anchor.LEFT_CENTER,
    chartEditor.enums.Anchor.LEFT_TOP
  ]);
  position.init(model, this.genKey('position()'));
  this.addChildControl(position);

  var anchor = new chartEditor.ui.control.fieldSelect.Base({label: 'Anchor'});
  anchor.getSelect().setOptions([
    chartEditor.enums.Anchor.LEFT_BOTTOM,
    chartEditor.enums.Anchor.LEFT_CENTER,
    chartEditor.enums.Anchor.LEFT_TOP,
    chartEditor.enums.Anchor.AUTO
  ]);
  anchor.init(model, this.genKey('anchor()'));
  this.addChildControl(anchor);

  var offset = new chartEditor.ui.control.input.Base();
  // todo: check if we can use *.input.Numbers
  offset.setFormatterFunction(function(value) {
    value = parseFloat(value);
    if (isNaN(value))
      value = 0;
    return String(value);
  });
  var offsetLC = new chartEditor.ui.control.wrapped.Labeled(offset, 'Offset');
  offsetLC.init(model, this.genKey('offset()'));
  this.addChildControl(offsetLC);

  this.addContentSeparator();
  var labels = new chartEditor.ui.panel.Labels(model);
  labels.allowEnabled(true);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);
};
