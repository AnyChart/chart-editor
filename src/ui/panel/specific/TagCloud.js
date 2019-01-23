goog.provide('chartEditor.ui.panel.specific.TagCloud');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.input.StringArray');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Font');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.TagCloud = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.TagCloud.base(this, 'constructor', model, 'TagCloud Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.ui.panel.specific.TagCloud, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.TagCloud.prototype.createDom = function() {
  chartEditor.ui.panel.specific.TagCloud.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var anglesCount = new chartEditor.ui.control.comboBox.Base();
  anglesCount.setRange(0, 1000);
  anglesCount.setOptions([3, 5, 7, 10]);
  var anglesCountLC = new chartEditor.ui.control.wrapped.Labeled(anglesCount, 'Angles count');
  anglesCountLC.init(model, this.genKey('anglesCount()'));
  this.addChildControl(anglesCountLC);

  var fromAngle = new chartEditor.ui.control.comboBox.Base();
  fromAngle.setOptions([0, 45, 90, 180, 270]);
  fromAngle.setRange(0, 360);
  var fromAngleLC = new chartEditor.ui.control.wrapped.Labeled(fromAngle, 'From angle');
  this.addChildControl(fromAngleLC);
  fromAngleLC.init(model, this.genKey('fromAngle()'));

  var toAngle = new chartEditor.ui.control.comboBox.Base();
  toAngle.setOptions([0, 45, 90, 180, 270]);
  toAngle.setRange(0, 360);
  var toAngleLC = new chartEditor.ui.control.wrapped.Labeled(toAngle, 'To angle');
  toAngleLC.init(model, this.genKey('toAngle()'));

  this.addChildControl(toAngleLC);

  var angles = new chartEditor.ui.control.input.StringArray('Comma separated numbers');
  var anglesLC = new chartEditor.ui.control.wrapped.Labeled(angles, 'Angles');
  anglesLC.init(model, this.genKey('angles()'));
  this.addChildControl(anglesLC);

  this.addContentSeparator();

  var scale = new chartEditor.ui.control.select.Scales({label: 'Scale', scaleName: 'Default scale'});
  scale.init(model, this.genKey('scale()'));
  this.addChildControl(scale);

  var mode = new chartEditor.ui.control.fieldSelect.Base({label: 'Mode'});
  mode.init(model, this.genKey('mode()'));
  mode.getSelect().setOptions([
    {'value': 'rect'},
    {'value': 'spiral'}
  ]);
  this.addChildControl(mode);

  this.addContentSeparator();

  var fontSettings = new chartEditor.ui.panel.Font(model);
  fontSettings.hideField('fontDecoration');
  fontSettings.setFontColorKey('fill()');
  fontSettings.setKey(this.getKey());
  this.addChildControl(fontSettings);

  var textSpacing = new chartEditor.ui.control.comboBox.Base();
  textSpacing.setRange(0, 10000);
  textSpacing.setOptions([1, 5, 10]);
  var textSpacingLC = new chartEditor.ui.control.wrapped.Labeled(textSpacing, 'Text spacing');
  this.addContentSeparator();
  textSpacingLC.init(model, this.genKey('textSpacing()'));
  this.addChildControl(textSpacingLC);
};
