goog.provide('chartEditor.settings.CircularRange');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.SettingsPanelZippy');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.input.Numbers');


/**
 * @param {chartEditor.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.settings.CircularRange = function(model, index, opt_domHelper) {
  chartEditor.settings.CircularRange.base(this, 'constructor', model, index, null, opt_domHelper);
  
  this.name = 'Range(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'range(' + this.index_ + ')'];
  this.enabledKey(this.genKey('enabled', true));

  this.allowEnabled(true);

  this.addClassName(goog.getCssName('anychart-settings-panel-range-single'));
};
goog.inherits(chartEditor.settings.CircularRange, chartEditor.SettingsPanelZippy);


/** @override */
chartEditor.settings.CircularRange.prototype.createDom = function() {
  chartEditor.settings.CircularRange.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var axisIndex = new chartEditor.controls.select.DataField({label: 'Axis Index'});
  axisIndex.getSelect().setOptions([{value: '0'}]);
  axisIndex.init(model, this.genKey('axisIndex', true));
  this.zippyContent.addChild(axisIndex, true);
  this.axisIndex_ = axisIndex;

  var position = new chartEditor.controls.select.DataField({label: 'Position'});
  position.getSelect().setOptions(goog.object.getValues(chartEditor.enums.GaugeSidePosition));
  position.init(model, this.genKey('position', true));
  this.addChildControl(position);

  var from = new chartEditor.input.Numbers('From value');
  var fromlLC = new chartEditor.controls.LabeledControl(from, 'From');
  fromlLC.init(model, this.genKey('from', true));
  this.addChildControl(fromlLC);

  var to = new chartEditor.input.Numbers('To value');
  var tolLC = new chartEditor.controls.LabeledControl(to, 'To');
  tolLC.init(model, this.genKey('to', true));
  this.addChildControl(tolLC);

  var startSize = new chartEditor.comboBox.Percent();
  startSize.setOptions([0, 2, 5, 10, 15, 20, 25]);
  var startSizeLC = new chartEditor.controls.LabeledControl(startSize, 'Start Size');
  startSizeLC.init(model, this.genKey('startSize', true));
  this.addChildControl(startSizeLC);

  var endSize = new chartEditor.comboBox.Percent();
  endSize.setOptions([0, 2, 5, 10, 15, 20, 25]);
  var endSizeLC = new chartEditor.controls.LabeledControl(endSize, 'End Size');
  endSizeLC.init(model, this.genKey('endSize', true));
  this.addChildControl(endSizeLC);

  var cornersRounding = new chartEditor.comboBox.Percent();
  cornersRounding.setOptions([0, 10, 20, 30, 50]);
  var cornersRoundingLC = new chartEditor.controls.LabeledControl(cornersRounding, 'Corners Rounding');
  cornersRoundingLC.init(model, this.genKey('cornersRounding', true));
  this.addChildControl(cornersRoundingLC);

  var radius = new chartEditor.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90, 100]);
  var radiusLC = new chartEditor.controls.LabeledControl(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius', true));
  this.addChildControl(radiusLC);

  var fill = new chartEditor.colorPicker.Base();
  var fillLC = new chartEditor.controls.LabeledControl(fill, 'Range Fill');
  fillLC.init(model, this.genKey('fill', true));
  this.addChildControl(fillLC);
};


/** @inheritDoc */
chartEditor.settings.CircularRange.prototype.onChartDraw = function(evt) {
  chartEditor.settings.CircularRange.base(this, 'onChartDraw', evt);
  if (!this.isExcluded()) {
    var target = evt.chart;

    var count = target.getAxesCount();
    var options = [];
    for (var i = 0; i < count; i++) {
      options.push({'value': String(i)});
    }
    this.axisIndex_.getSelect().setOptions(options);
    this.axisIndex_.setValueByTarget(target);
  }
};


/** @override */
chartEditor.settings.CircularRange.prototype.disposeInternal = function() {
  goog.disposeAll([
    this.axisIndex_
  ]);
  this.axisIndex_ = null;

  chartEditor.settings.CircularRange.base(this, 'disposeInternal');
};