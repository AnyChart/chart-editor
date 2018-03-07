goog.provide('chartEditor.settings.Labels');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.settings.Title');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.Labels = function(model, opt_domHelper) {
  chartEditor.settings.Labels.base(this, 'constructor', model, 'Labels', opt_domHelper);
};
goog.inherits(chartEditor.settings.Labels, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.Labels.CSS_CLASS = goog.getCssName('anychart-ce-settings-labels');


/**
 * @type {boolean}
 * @private
 */
chartEditor.settings.Labels.prototype.allowEditPosition_ = true;


/**
 * @param {boolean} value
 */
chartEditor.settings.Labels.prototype.allowEditPosition = function(value) {
  this.allowEditPosition_ = value;
};


/**
 * @type {boolean}
 * @private
 */
chartEditor.settings.Labels.prototype.allowEditAnchor_ = true;


/**
 * @param {boolean} value
 */
chartEditor.settings.Labels.prototype.allowEditAnchor = function(value) {
  this.allowEditAnchor_ = value;
};


/** @inheritDoc */
chartEditor.settings.Labels.prototype.createDom = function() {
  chartEditor.settings.Labels.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, chartEditor.settings.Labels.CSS_CLASS);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var settings = new chartEditor.settings.Title(model, null);
  settings.allowEnabled(false);

  settings.allowEditPosition(this.allowEditPosition_);
  settings.setPositionLabel('Position');

  settings.allowEditAlign(this.allowEditAnchor_);
  settings.setAlignLabel('Anchor');
  settings.setAlignKey('anchor()');

  settings.setTitleKey('format()');
  settings.setKey(this.getKey());
  this.addChild(settings, true);
  this.settings_ = settings;

  var rotation = new chartEditor.comboBox.Base();
  rotation.setOptions([-90, -45, 0, 45, 90]);
  rotation.setRange(-360, 260);
  var rotationLC = new chartEditor.controls.LabeledControl(rotation, 'Rotation');
  rotationLC.init(model, this.genKey('rotation()'));
  this.addChildControl(rotationLC);
};


/** @inheritDoc */
chartEditor.settings.Labels.prototype.enterDocument = function() {
  chartEditor.settings.Labels.base(this, 'enterDocument');

  if (this.allowEditPosition_) {
    var positionValuesEnum;
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    var chartType = model.getModel()['chart']['type'];
    var addValueOption = false;
    switch (chartType) {
      case 'pie':
        positionValuesEnum = chartEditor.enums.SidePosition;
        break;
      case 'funnel':
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

    var positionField = /** @type {chartEditor.controls.select.DataField} */(this.settings_.getPositionField());
    positionField.getSelect().setOptions(positionValues);
  }

  if (this.allowEditAnchor_) {
    var alignValues = goog.object.getValues(chartEditor.enums.Anchor);
    alignValues = goog.array.filter(alignValues, function(i) {
      return goog.typeOf(i) == 'string';
    });

    var alignField = /** @type {chartEditor.controls.select.DataField} */(this.settings_.getAlignField());
    alignField.getSelect().setOptions(alignValues);
  }
};


/**
 * @return {chartEditor.settings.Title|null}
 */
chartEditor.settings.Labels.prototype.getSettingsComponent = function() {
  return this.settings_;
};


/** @inheritDoc */
chartEditor.settings.Labels.prototype.updateKeys = function() {
  if (!this.isExcluded()) {
    if (this.settings_) this.settings_.setKey(this.getKey());
  }

  chartEditor.settings.Labels.base(this, 'updateKeys');
};


/** @override */
chartEditor.settings.Labels.prototype.disposeInternal = function() {
  goog.dispose(this.settings_);
  this.settings_ = null;

  chartEditor.settings.Labels.base(this, 'disposeInternal');
};
