goog.provide('chartEditor.ui.panel.CircularRange');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.wrapped.Labeled');



/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.CircularRange = function(model, index, opt_domHelper) {
  chartEditor.ui.panel.CircularRange.base(this, 'constructor', model, index, null, opt_domHelper);
  
  this.name = 'Range(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'range(' + this.index_ + ')'];
  this.enabledKey(this.genKey('enabled', true));

  this.allowEnabled(true);

  this.allowRemove(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-range-single'));
};
goog.inherits(chartEditor.ui.panel.CircularRange, chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.CircularRange.prototype.createDom = function() {
  chartEditor.ui.panel.CircularRange.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var axisIndex = new chartEditor.ui.control.fieldSelect.Base({label: 'Axis Index'});
  axisIndex.getSelect().setOptions([{value: '0'}]);
  axisIndex.init(model, this.genKey('axisIndex', true));
  this.zippyContent.addChild(axisIndex, true);
  this.axisIndex_ = axisIndex;

  var position = new chartEditor.ui.control.fieldSelect.Base({label: 'Position'});
  position.getSelect().setOptions(goog.object.getValues(chartEditor.enums.GaugeSidePosition));
  position.init(model, this.genKey('position', true));
  this.addChildControl(position);

  var from = new chartEditor.ui.control.input.Numbers('From value');
  var fromlLC = new chartEditor.ui.control.wrapped.Labeled(from, 'From');
  fromlLC.init(model, this.genKey('from', true));
  this.addChildControl(fromlLC);

  var to = new chartEditor.ui.control.input.Numbers('To value');
  var tolLC = new chartEditor.ui.control.wrapped.Labeled(to, 'To');
  tolLC.init(model, this.genKey('to', true));
  this.addChildControl(tolLC);

  var startSize = new chartEditor.ui.control.comboBox.Percent();
  startSize.setOptions([0, 2, 5, 10, 15, 20, 25]);
  var startSizeLC = new chartEditor.ui.control.wrapped.Labeled(startSize, 'Start Size');
  startSizeLC.init(model, this.genKey('startSize', true));
  this.addChildControl(startSizeLC);

  var endSize = new chartEditor.ui.control.comboBox.Percent();
  endSize.setOptions([0, 2, 5, 10, 15, 20, 25]);
  var endSizeLC = new chartEditor.ui.control.wrapped.Labeled(endSize, 'End Size');
  endSizeLC.init(model, this.genKey('endSize', true));
  this.addChildControl(endSizeLC);

  var cornersRounding = new chartEditor.ui.control.comboBox.Percent();
  cornersRounding.setOptions([0, 10, 20, 30, 50]);
  var cornersRoundingLC = new chartEditor.ui.control.wrapped.Labeled(cornersRounding, 'Corners Rounding');
  cornersRoundingLC.init(model, this.genKey('cornersRounding', true));
  this.addChildControl(cornersRoundingLC);

  var radius = new chartEditor.ui.control.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90, 100]);
  var radiusLC = new chartEditor.ui.control.wrapped.Labeled(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius', true));
  this.addChildControl(radiusLC);

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Range Fill');
  fillLC.init(model, this.genKey('fill', true));
  this.addChildControl(fillLC);
};


/** @inheritDoc */
chartEditor.ui.panel.CircularRange.prototype.onChartDraw = function(evt) {
  chartEditor.ui.panel.CircularRange.base(this, 'onChartDraw', evt);
  if (!this.isExcluded()) {
    var target = evt.chart;

    var elementsStat = target['getStat']('chartElements');
    var count = elementsStat['axes'];
    var options = [];
    for (var i = 0; i < count; i++) {
      options.push({'value': String(i)});
    }
    this.axisIndex_.getSelect().setOptions(options);
    this.axisIndex_.setValueByTarget(target);
  }
};


/** @override */
chartEditor.ui.panel.CircularRange.prototype.disposeInternal = function() {
  goog.disposeAll([
    this.axisIndex_
  ]);
  this.axisIndex_ = null;

  chartEditor.ui.panel.CircularRange.base(this, 'disposeInternal');
};