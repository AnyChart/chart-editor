goog.provide('chartEditor.settings.specific.TagCloud');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.input.StringArray');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.controls.select.Scales');
goog.require('chartEditor.settings.Font');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.TagCloud = function(model, opt_domHelper) {
  chartEditor.settings.specific.TagCloud.base(this, 'constructor', model, 'TagCloud Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.settings.specific.TagCloud, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.specific.TagCloud.prototype.createDom = function() {
  chartEditor.settings.specific.TagCloud.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var anglesCount = new chartEditor.comboBox.Base();
  anglesCount.setRange(0, 1000);
  anglesCount.setOptions([3, 5, 7, 10]);
  var anglesCountLC = new chartEditor.controls.LabeledControl(anglesCount, 'Angles count');
  anglesCountLC.init(model, this.genKey('anglesCount()'));
  this.addChildControl(anglesCountLC);

  var fromAngle = new chartEditor.comboBox.Base();
  fromAngle.setOptions([0, 45, 90, 180, 270]);
  fromAngle.setRange(0, 360);
  var fromAngleLC = new chartEditor.controls.LabeledControl(fromAngle, 'From angle');
  this.addChildControl(fromAngleLC);
  fromAngleLC.init(model, this.genKey('fromAngle()'));

  var toAngle = new chartEditor.comboBox.Base();
  toAngle.setOptions([0, 45, 90, 180, 270]);
  toAngle.setRange(0, 360);
  var toAngleLC = new chartEditor.controls.LabeledControl(toAngle, 'To angle');
  toAngleLC.init(model, this.genKey('toAngle()'));

  this.addChildControl(toAngleLC);

  var angles = new chartEditor.controls.input.StringArray('Comma separated numbers');
  var anglesLC = new chartEditor.controls.LabeledControl(angles, 'Angles');
  anglesLC.init(model, this.genKey('angles()'));
  this.addChildControl(anglesLC);

  this.addContentSeparator();

  var scale = new chartEditor.controls.select.Scales({label: 'Scale', scaleName: 'Default scale'});
  scale.init(model, this.genKey('scale()'));
  this.addChildControl(scale);

  var mode = new chartEditor.controls.select.DataField({label: 'Mode'});
  mode.init(model, this.genKey('mode()'));
  mode.getSelect().setOptions([
    {'value': 'rect'},
    {'value': 'spiral'}
  ]);
  this.addChildControl(mode);

  this.addContentSeparator();

  var fontSettings = new chartEditor.settings.Font(model);
  fontSettings.hideField('fontDecoration');
  fontSettings.setFontColorKey('fill()');
  fontSettings.setKey(this.getKey());
  this.addChildControl(fontSettings);

  var textSpacing = new chartEditor.comboBox.Base();
  textSpacing.setRange(0, 10000);
  textSpacing.setOptions([1, 5, 10]);
  var textSpacingLC = new chartEditor.controls.LabeledControl(textSpacing, 'Text spacing');
  this.addContentSeparator();
  textSpacingLC.init(model, this.genKey('textSpacing()'));
  this.addChildControl(textSpacingLC);
};
