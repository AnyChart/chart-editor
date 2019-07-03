goog.provide('chartEditor.ui.panel.Labels');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Title');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Labels = function(model, opt_domHelper) {
  chartEditor.ui.panel.Labels.base(this, 'constructor', model, 'Labels', opt_domHelper);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-labels'));
};
goog.inherits(chartEditor.ui.panel.Labels, chartEditor.ui.Panel);


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.panel.Labels.prototype.allowEditPosition_ = true;


/**
 * @param {boolean} value
 */
chartEditor.ui.panel.Labels.prototype.allowEditPosition = function(value) {
  this.allowEditPosition_ = value;
};


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.panel.Labels.prototype.allowEditAnchor_ = true;


/**
 * @param {boolean} value
 */
chartEditor.ui.panel.Labels.prototype.allowEditAnchor = function(value) {
  this.allowEditAnchor_ = value;
};


/** @inheritDoc */
chartEditor.ui.panel.Labels.prototype.createDom = function() {
  chartEditor.ui.panel.Labels.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var settings = new chartEditor.ui.panel.Title(model, null);
  settings.allowEnabled(false);

  settings.allowEditPosition(this.allowEditPosition_);
  settings.setPositionLabel('Position');

  settings.allowEditAlign(this.allowEditAnchor_);
  settings.setAlignLabel('Anchor');
  settings.setAlignKey('anchor()');

  settings.setTitleKey('format()');
  settings.setKey(this.getKey());
  this.addChildControl(settings);
  this.settings_ = settings;

  var rotation = new chartEditor.ui.control.comboBox.Base();
  rotation.setOptions([-90, -45, 0, 45, 90]);
  rotation.setRange(-360, 260);
  var rotationLC = new chartEditor.ui.control.wrapped.Labeled(rotation, 'Rotation');
  rotationLC.init(model, this.genKey('rotation()'));
  this.addChildControl(rotationLC);
};


/** @inheritDoc */
chartEditor.ui.panel.Labels.prototype.enterDocument = function() {
  chartEditor.ui.panel.Labels.base(this, 'enterDocument');

  if (this.allowEditPosition_) {
    var positionValuesEnum;
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    var chartType = model.getModel()['chart']['type'];
    var addValueOption = false;
    switch (chartType) {
      case 'pie3d':
      case 'pie':
        positionValuesEnum = chartEditor.enums.SidePosition;
        break;
      case 'funnel':
      case 'pyramid':
        positionValuesEnum = chartEditor.enums.PyramidLabelsPosition;
        break;
      default:
        positionValuesEnum = chartEditor.enums.Position;
        addValueOption = true;
    }

    var positionValues = goog.object.getValues(positionValuesEnum);
    positionValues = goog.array.filter(positionValues, function(i) {
      return goog.typeOf(i) === 'string';
    });
    if (addValueOption) positionValues.push('value');

    var positionField = /** @type {chartEditor.ui.control.fieldSelect.Base} */(this.settings_.getPositionField());
    positionField.getSelect().setOptions(positionValues);
  }

  if (this.allowEditAnchor_) {
    var alignValues = goog.object.getValues(chartEditor.enums.Anchor);
    alignValues = goog.array.filter(alignValues, function(i) {
      return goog.typeOf(i) == 'string';
    });

    var alignField = /** @type {chartEditor.ui.control.fieldSelect.Base} */(this.settings_.getAlignField());
    alignField.getSelect().setOptions(alignValues);
  }
};


/** @inheritDoc */
chartEditor.ui.panel.Labels.prototype.updateKeys = function() {
  if (!this.isExcluded()) {
    if (this.settings_) this.settings_.setKey(this.getKey());
  }
  chartEditor.ui.panel.Labels.base(this, 'updateKeys');
};
