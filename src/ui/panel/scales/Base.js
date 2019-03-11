goog.provide('chartEditor.ui.panel.scales.Base');

goog.require("chartEditor.ui.Component");
goog.require("chartEditor.ui.Panel");
goog.require("chartEditor.ui.control.select.ScaleType");
goog.require("chartEditor.ui.panel.scales.DateTime");
goog.require("chartEditor.ui.panel.scales.Linear");
goog.require("chartEditor.ui.panel.scales.LinearColor");
goog.require("chartEditor.ui.panel.scales.Logarithmic");
goog.require("chartEditor.ui.panel.scales.Ordinal");
goog.require("chartEditor.ui.panel.scales.OrdinalColor");


/**
 * @param {chartEditor.model.Base} model
 * @param {string|Array.<string>} types
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.scales.Base = function(model, types, opt_domHelper) {
  chartEditor.ui.panel.scales.Base.base(this, 'constructor', model, null, opt_domHelper);

  this.scaleTypes_ = types;

  this.scaleType_ = '';

  this.fixedScaleType_ = void 0;

  this.allowEnabled(false);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-scale'));
};
goog.inherits(chartEditor.ui.panel.scales.Base, chartEditor.ui.Panel);


chartEditor.ui.panel.scales.Base.descriptors = {
  'ordinal': {
    name: 'Ordinal',
    classFunc: chartEditor.ui.panel.scales.Ordinal,
    ctor: 'scales.ordinal()'
  },
  'linear': {
    name: 'Linear',
    classFunc: chartEditor.ui.panel.scales.Linear,
    ctor: 'scales.linear()'
  },
  'log': {
    name: 'Logarithmic',
    classFunc: chartEditor.ui.panel.scales.Logarithmic,
    ctor: 'scales.log()'
  },
  'date-time': {
    name: 'DateTime',
    classFunc: chartEditor.ui.panel.scales.DateTime,
    ctor: 'scales.dateTime()'
  },
  'linear-color': {
    name: 'Linear Color',
    classFunc: chartEditor.ui.panel.scales.LinearColor
  },
  'ordinal-color': {
    name: 'Ordinal Color',
    classFunc: chartEditor.ui.panel.scales.OrdinalColor
  }
};


/**
 * Sets scale type to fixed value. Scale type selec control will be disabled.
 * @param {string} value
 */
chartEditor.ui.panel.scales.Base.prototype.setFixedScaleType = function(value) {
  this.fixedScaleType_ = value;
};


/** @override */
chartEditor.ui.panel.scales.Base.prototype.createDom = function() {
  chartEditor.ui.panel.scales.Base.base(this, 'createDom');

  this.typeOptions_ = [];

  var types = goog.isString(this.scaleTypes_) ? [this.scaleTypes_] : this.scaleTypes_;

  for (var i = 0; i < types.length; i++) {
    var scaleType = types[i];
    this.typeOptions_.push({value: scaleType, caption: chartEditor.ui.panel.scales.Base.descriptors[scaleType].name});
  }

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var type = new chartEditor.ui.control.select.ScaleType({
    label: 'Type',
    caption: 'Choose scale type'
  });
  type.getControl().setOptions(this.typeOptions_);
  type.init(model, this.genKey('type', true));
  this.addChild(type, true);
  this.scaleTypeField = type;

  this.getContentElement().appendChild(this.resetButton_.getElement());

  var specificWrapper = new chartEditor.ui.Component();
  this.addChild(specificWrapper, true);
  this.specificWrapper_ = specificWrapper;

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));
};


/** @inheritDoc */
chartEditor.ui.panel.scales.Base.prototype.enterDocument = function() {
  chartEditor.ui.panel.scales.Base.base(this, 'enterDocument');

  this.scaleTypeField.setEnabled(!this.fixedScaleType_);
};


/** @inheritDoc */
chartEditor.ui.panel.scales.Base.prototype.onModelChange = function(evt) {
  chartEditor.ui.panel.scales.Base.base(this, 'onModelChange', evt);

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  if (!this.isExcluded()) {
    var scaleType = this.fixedScaleType_;
    if (!scaleType) {
      var scale = model.getValue(this.getKey());
      scaleType = scale ? scale.type : void 0;
    }

    this.scaleTypeField.setValue(scaleType ? scaleType : null, true);
    this.updateSpecific();
  }
};


/** @inheritDoc */
chartEditor.ui.panel.scales.Base.prototype.onChartDraw = function(evt) {
  chartEditor.ui.panel.scales.Base.base(this, 'onChartDraw', evt);

  if (!this.isExcluded()) {
    var scaleType = this.fixedScaleType_;
    if (!scaleType) {
      var target = evt.chart;
      var stringKey = chartEditor.model.Base.getStringKey(this.key);
      var scale = /** @type {Object} */(chartEditor.binding.exec(target, stringKey));
      scaleType = scale && scale['getType']();
    }

    if (scaleType) {
      this.scaleTypeField.setValue(scaleType, true);
    } else
      this.scaleTypeField.setValue(null, true);

    this.updateSpecific();
  }
};


/**
 * Creates dom for specific section.
 * @param {boolean=} opt_force
 * @return {boolean}
 */
chartEditor.ui.panel.scales.Base.prototype.updateSpecific = function(opt_force) {
  var selectValue = this.scaleTypeField.getValue();
  var newScaleType = selectValue && selectValue.value;

  if (newScaleType && (opt_force || newScaleType !== this.scaleType_)) {
    this.scaleType_ = newScaleType;
    var model = /** @type {chartEditor.model.Base} */(this.getModel());

    if (this.specificComponent) {
      this.specificWrapper_.removeChild(this.specificComponent, true);
      goog.dispose(this.specificComponent);
    }

    this.specificComponent = new chartEditor.ui.panel.scales.Base.descriptors[this.scaleType_].classFunc(model);
    this.specificComponent.setKey(this.getKey());
    this.specificComponent.allowEnabled(false);
    this.specificComponent.allowReset(true);
    this.specificComponent.skipSettings(this.skippedSettings);

    this.specificWrapper_.addChild(this.specificComponent, true);

    return true;
  }

  return false;
};


/**
 * @return {string|null} Scale type
 */
chartEditor.ui.panel.scales.Base.prototype.getScaleType = function() {
  var value = this.scaleTypeField && this.scaleTypeField.getValue();
  return value && value.value;
};


/** @inheritDoc */
chartEditor.ui.panel.scales.Base.prototype.reset = function() {
  if (this.specificComponent) {
    this.specificComponent.reset();
  }

  if (!this.fixedScaleType_ ) {
    this.scaleTypeField.setValue(null);
    this.scaleType_ = '';

    if (this.specificComponent) {
      this.specificWrapper_.removeChild(this.specificComponent, true);
      goog.dispose(this.specificComponent);
      this.specificComponent = null;
    }
  }

  this.updateSpecific();
};


/** @override */
chartEditor.ui.panel.scales.Base.prototype.disposeInternal = function() {
  goog.disposeAll([
    this.scaleTypeField,
    this.specificComponent
  ]);

  this.scaleTypeField = null;
  this.specificComponent = null;

  chartEditor.ui.panel.scales.Base.base(this, 'disposeInternal');
};
