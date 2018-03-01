goog.provide('anychart.chartEditorModule.settings.Labels');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.settings.Title');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.Labels = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.Labels.base(this, 'constructor', model, 'Labels', opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.settings.Labels, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.Labels.CSS_CLASS = goog.getCssName('anychart-chart-editor-settings-labels');


/**
 * @type {boolean}
 * @private
 */
anychart.chartEditorModule.settings.Labels.prototype.allowEditPosition_ = true;


/**
 * @param {boolean} value
 */
anychart.chartEditorModule.settings.Labels.prototype.allowEditPosition = function(value) {
  this.allowEditPosition_ = value;
};


/**
 * @type {boolean}
 * @private
 */
anychart.chartEditorModule.settings.Labels.prototype.allowEditAnchor_ = true;


/**
 * @param {boolean} value
 */
anychart.chartEditorModule.settings.Labels.prototype.allowEditAnchor = function(value) {
  this.allowEditAnchor_ = value;
};


/** @inheritDoc */
anychart.chartEditorModule.settings.Labels.prototype.createDom = function() {
  anychart.chartEditorModule.settings.Labels.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, anychart.chartEditorModule.settings.Labels.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var settings = new anychart.chartEditorModule.settings.Title(model, null);
  settings.allowEnabled(false);

  settings.allowEditPosition(this.allowEditPosition_);
  settings.setPositionLabel('Position');

  settings.allowEditAlign(this.allowEditAnchor_);
  settings.setAlignLabel('Anchor');
  settings.setAlignKey('anchor()');

  settings.setTitleKey('format()');
  settings.setKey(this.getKey()); // This is for enabled working sake!
  this.addChild(settings, true);

  this.settings_ = settings;
};


/** @inheritDoc */
anychart.chartEditorModule.settings.Labels.prototype.enterDocument = function() {
  anychart.chartEditorModule.settings.Labels.base(this, 'enterDocument');

  if (this.allowEditPosition_) {
    var positionValuesEnum;
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    var chartType = model.getModel()['chart']['type'];
    var addValueOption = false;
    switch (chartType) {
      case 'pie':
        positionValuesEnum = anychart.enums.SidePosition;
        break;
      case 'funnel':
        positionValuesEnum = anychart.enums.PyramidLabelsPosition;
        break;
      default:
        positionValuesEnum = anychart.enums.Position;
        addValueOption = true;
    }

    var positionValues = goog.object.getValues(positionValuesEnum);
    positionValues = goog.array.filter(positionValues, function(i) {
      return goog.typeOf(i) == 'string';
    });
    if (addValueOption) positionValues.push('value');

    var positionField = /** @type {anychart.chartEditorModule.controls.select.DataField} */(this.settings_.getPositionField());
    positionField.getSelect().setOptions(positionValues);
  }

  if (this.allowEditAnchor_) {
    var alignValues = goog.object.getValues(anychart.enums.Anchor);
    alignValues = goog.array.filter(alignValues, function(i) {
      return goog.typeOf(i) == 'string';
    });

    var alignField = /** @type {anychart.chartEditorModule.controls.select.DataField} */(this.settings_.getAlignField());
    alignField.getSelect().setOptions(alignValues);
  }
};


/**
 * @return {anychart.chartEditorModule.settings.Title|null}
 */
anychart.chartEditorModule.settings.Labels.prototype.getSettingsComponent = function() {
  return this.settings_;
};


/** @inheritDoc */
anychart.chartEditorModule.settings.Labels.prototype.updateKeys = function() {
  if (!this.isExcluded()) {
    if (this.settings_) this.settings_.setKey(this.getKey());
  }

  anychart.chartEditorModule.settings.Labels.base(this, 'updateKeys');
};


/** @override */
anychart.chartEditorModule.settings.Labels.prototype.disposeInternal = function() {
  this.settings_.dispose();
  this.settings_ = null;

  anychart.chartEditorModule.settings.Labels.base(this, 'disposeInternal');
};
