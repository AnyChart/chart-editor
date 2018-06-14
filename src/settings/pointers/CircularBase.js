goog.provide('chartEditor.settings.pointers.CircularBase');

goog.require('chartEditor.SettingsPanelZippy');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.Stroke');


/**
 * @param {chartEditor.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} panelIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.settings.pointers.CircularBase = function(model, type, pointerId, panelIndex, opt_domHelper) {
  chartEditor.settings.pointers.CircularBase.base(this, 'constructor', model, panelIndex, null, opt_domHelper);

  this.pointerId_ = String(pointerId);
  this.pointerType_ = type;

  var stringKey = 'getPointer(\'' + this.pointerId_ + '\')';

  this.key = [['chart'], ['settings'], stringKey];

  var tmp = type.split('.');
  var name = goog.string.capitalize(tmp[tmp.length - 1]);
  this.setName(name);

  this.allowEnabled(false);
  this.addClassName(goog.getCssName('anychart-ce-settings-panel-pointer-single'));
};
goog.inherits(chartEditor.settings.pointers.CircularBase, chartEditor.SettingsPanelZippy);


/** @override */
chartEditor.settings.pointers.CircularBase.prototype.createDom = function() {
  chartEditor.settings.pointers.CircularBase.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  // region ==== Header
  var fill = new chartEditor.colorPicker.Base();
  fill.addClassName(goog.getCssName('anychart-ce-settings-control-right'));
  fill.init(model, this.genKey('fill()'));
  this.addHeaderChildControl(fill);
  // endregion

  var stroke = new chartEditor.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  this.addContentSeparator();

  var axisIndex = new chartEditor.controls.select.DataField({label: 'Axis Index'});
  axisIndex.getSelect().setOptions([{value: '0'}]);
  axisIndex.init(model, this.genKey('axisIndex()'));
  this.zippyContent.addChild(axisIndex, true);
  this.axisIndex_ = axisIndex;
};


/** @inheritDoc */
chartEditor.settings.pointers.CircularBase.prototype.onChartDraw = function(evt) {
  chartEditor.settings.pointers.CircularBase.base(this, 'onChartDraw', evt);
  if (!this.isExcluded()) {
    var target = evt.chart;

    if (this.axisIndex_) {
      var elementsStat = target['getStat']('chartElements');
      var count = elementsStat['axes'];
      if (count > 1) {
        this.axisIndex_.show();
        var options = [];
        for (var i = 0; i < count; i++) {
          options.push({'value': String(i)});
        }
        this.axisIndex_.getSelect().setOptions(options);
        this.axisIndex_.setValueByTarget(target);

      } else {

        this.axisIndex_.hide();
      }
    }
  }
};


/** @override */
chartEditor.settings.pointers.CircularBase.prototype.disposeInternal = function() {
  goog.dispose(this.axisIndex_);
  this.axisIndex_ = null;

  chartEditor.settings.pointers.CircularBase.base(this, 'disposeInternal');
};
