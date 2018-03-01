goog.provide('anychart.chartEditorModule.settings.CircularRange');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.SettingsPanelZippy');
goog.require('anychart.chartEditorModule.colorPicker.Base');
goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.input.Numbers');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanelZippy}
 */
anychart.chartEditorModule.settings.CircularRange = function(model, index, opt_domHelper) {
  anychart.chartEditorModule.settings.CircularRange.base(this, 'constructor', model, index, null, opt_domHelper);
  
  this.name = 'Range(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'range(' + this.index_ + ')'];
  this.enabledKey(this.genKey('enabled', true));

  this.allowEnabled(true);

  this.addClassName(goog.getCssName('anychart-settings-panel-range-single'));
};
goog.inherits(anychart.chartEditorModule.settings.CircularRange, anychart.chartEditorModule.SettingsPanelZippy);


/** @override */
anychart.chartEditorModule.settings.CircularRange.prototype.createDom = function() {
  anychart.chartEditorModule.settings.CircularRange.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var axisIndex = new anychart.chartEditorModule.controls.select.DataField({label: 'Axis Index'});
  axisIndex.getSelect().setOptions([{value: '0'}]);
  axisIndex.init(model, this.genKey('axisIndex', true));
  this.zippyContent.addChild(axisIndex, true);
  this.axisIndex_ = axisIndex;

  var position = new anychart.chartEditorModule.controls.select.DataField({label: 'Position'});
  position.getSelect().setOptions(goog.object.getValues(anychart.enums.GaugeSidePosition));
  position.init(model, this.genKey('position', true));
  this.addChildControl(position);

  var from = new anychart.chartEditorModule.input.Numbers('From value');
  var fromlLC = new anychart.chartEditorModule.controls.LabeledControl(from, 'From');
  fromlLC.init(model, this.genKey('from', true));
  this.addChildControl(fromlLC);

  var to = new anychart.chartEditorModule.input.Numbers('To value');
  var tolLC = new anychart.chartEditorModule.controls.LabeledControl(to, 'To');
  tolLC.init(model, this.genKey('to', true));
  this.addChildControl(tolLC);

  var startSize = new anychart.chartEditorModule.comboBox.Percent();
  startSize.setOptions([0, 2, 5, 10, 15, 20, 25]);
  var startSizeLC = new anychart.chartEditorModule.controls.LabeledControl(startSize, 'Start Size');
  startSizeLC.init(model, this.genKey('startSize', true));
  this.addChildControl(startSizeLC);

  var endSize = new anychart.chartEditorModule.comboBox.Percent();
  endSize.setOptions([0, 2, 5, 10, 15, 20, 25]);
  var endSizeLC = new anychart.chartEditorModule.controls.LabeledControl(endSize, 'End Size');
  endSizeLC.init(model, this.genKey('endSize', true));
  this.addChildControl(endSizeLC);

  var cornersRounding = new anychart.chartEditorModule.comboBox.Percent();
  cornersRounding.setOptions([0, 10, 20, 30, 50]);
  var cornersRoundingLC = new anychart.chartEditorModule.controls.LabeledControl(cornersRounding, 'Corners Rounding');
  cornersRoundingLC.init(model, this.genKey('cornersRounding', true));
  this.addChildControl(cornersRoundingLC);

  var radius = new anychart.chartEditorModule.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90, 100]);
  var radiusLC = new anychart.chartEditorModule.controls.LabeledControl(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius', true));
  this.addChildControl(radiusLC);

  var fill = new anychart.chartEditorModule.colorPicker.Base();
  var fillLC = new anychart.chartEditorModule.controls.LabeledControl(fill, 'Range Fill');
  fillLC.init(model, this.genKey('fill', true));
  this.addChildControl(fillLC);
};


/** @inheritDoc */
anychart.chartEditorModule.settings.CircularRange.prototype.onChartDraw = function(evt) {
  anychart.chartEditorModule.settings.CircularRange.base(this, 'onChartDraw', evt);
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
anychart.chartEditorModule.settings.CircularRange.prototype.disposeInternal = function() {
  goog.disposeAll([
    this.axisIndex_
  ]);
  this.axisIndex_ = null;

  anychart.chartEditorModule.settings.CircularRange.base(this, 'disposeInternal');
};