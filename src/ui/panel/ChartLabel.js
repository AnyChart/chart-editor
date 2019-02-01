goog.provide('chartEditor.ui.panel.ChartLabel');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Title');


/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.ChartLabel = function(model, index, opt_domHelper) {
  chartEditor.ui.panel.ChartLabel.base(this, 'constructor', model, index, null, opt_domHelper);

  this.name = 'Label(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'label(' + this.index_ + ')'];
  this.enabledKey(this.genKey('enabled', true));

  this.allowEnabled(true);

  this.allowRemove(true);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-range-single'));
};
goog.inherits(chartEditor.ui.panel.ChartLabel, chartEditor.ui.PanelZippy);


/** @inheritDoc */
chartEditor.ui.panel.ChartLabel.prototype.createDom = function() {
  chartEditor.ui.panel.ChartLabel.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var title = new chartEditor.ui.panel.Title(model, null);
  title.allowEnabled(false);
  title.allowEditAlign(false);
  title.allowEditPosition(false);
  title.setKey(this.getKey());

  // title.setAlignLabel('Text Anchor');
  // title.setAlignKey('text().anchor()');
  // title.allowEditAlign(true);

  this.addChildControl(title);

  // var textAnchor = title.getAlignField();
  // textAnchor.getSelect().setOptions([
  //   {value: 'auto'},
  //   {value: 'center'},
  //   {value: 'center-bottom'},
  //   {value: 'center-top'},
  //   {value: 'left-bottom'},
  //   {value: 'left-center'},
  //   {value: 'left-top'},
  //   {value: 'right-bottom'},
  //   {value: 'right-center'},
  //   {value: 'right-top'}
  // ]);

  this.addContentSeparator();

  var anchorField = new chartEditor.ui.control.fieldSelect.Base({label: 'Anchor'});
  anchorField.getSelect().setOptions([
    {value: 'auto'},
    {value: 'center'},
    {value: 'center-bottom'},
    {value: 'center-top'},
    {value: 'left-bottom'},
    {value: 'left-center'},
    {value: 'left-top'},
    {value: 'right-bottom'},
    {value: 'right-center'},
    {value: 'right-top'}
  ]);
  anchorField.init(model, this.genKey('anchor()'));
  this.addChildControl(anchorField);

  var width = new chartEditor.ui.control.comboBox.Base();
  width.setOptions([20, 40, 60, 100, 200]);
  width.setRange(-1000, 1000);
  var widthLC = new chartEditor.ui.control.wrapped.Labeled(width, 'Width');
  widthLC.init(model, this.genKey('width()'));
  this.addChildControl(widthLC);

  var height = new chartEditor.ui.control.comboBox.Base();
  height.setOptions([20, 40, 60, 100, 200]);
  height.setRange(-1000, 1000);
  var heightLC = new chartEditor.ui.control.wrapped.Labeled(height, 'Height');
  heightLC.init(model, this.genKey('height()'));
  this.addChildControl(heightLC);

  var offsetX = new chartEditor.ui.control.comboBox.Percent();
  offsetX.allowNegative(true);
  var offsetXLC = new chartEditor.ui.control.wrapped.Labeled(offsetX, 'Offset X');
  offsetXLC.init(model, this.genKey('offsetX()'));
  this.addChildControl(offsetXLC);

  var offsetY = new chartEditor.ui.control.comboBox.Percent();
  offsetY.allowNegative(true);
  var offsetYLC = new chartEditor.ui.control.wrapped.Labeled(offsetY, 'Offset Y');
  offsetYLC.init(model, this.genKey('offsetY()'));
  this.addChildControl(offsetYLC);

  // var offsetX = new chartEditor.ui.control.comboBox.Base();
  // offsetX.setOptions([-100, -50, -10, 0, 10, 50, 100, 200]);
  // offsetX.setRange(-1000, 1000);
  // var offsetXLC = new chartEditor.ui.control.wrapped.Labeled(offsetX, 'X Offset');
  // offsetXLC.init(model, this.genKey('offsetX()'));
  // this.addChildControl(offsetXLC);
  //
  // var offsetY = new chartEditor.ui.control.comboBox.Base();
  // offsetY.setOptions([-100, -50, -10, 0, 10, 50, 100, 200]);
  // offsetY.setRange(-1000, 1000);
  // var offsetYLC = new chartEditor.ui.control.wrapped.Labeled(offsetY, 'Y Offset');
  // offsetYLC.init(model, this.genKey('offsetY()'));
  // this.addChildControl(offsetYLC);

  var rotation = new chartEditor.ui.control.comboBox.Base();
  rotation.setOptions([-90, -45, 0, 45, 90]);
  rotation.setRange(-360, 260);
  var rotationLC = new chartEditor.ui.control.wrapped.Labeled(rotation, 'Rotation');
  rotationLC.init(model, this.genKey('rotation()'));
  this.addChildControl(rotationLC);
};


