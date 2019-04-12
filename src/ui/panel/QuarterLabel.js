goog.provide('chartEditor.ui.panel.QuarterLabel');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Title');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.QuarterLabel = function(model, opt_domHelper) {
  chartEditor.ui.panel.QuarterLabel.base(this, 'constructor', model, 'Labels', opt_domHelper);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-labels'));
};
goog.inherits(chartEditor.ui.panel.QuarterLabel, chartEditor.ui.Panel);


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.panel.QuarterLabel.prototype.allowEditPosition_ = true;


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.panel.QuarterLabel.prototype.allowEditAnchor_ = true;


/** @inheritDoc */
chartEditor.ui.panel.QuarterLabel.prototype.createDom = function() {
  chartEditor.ui.panel.QuarterLabel.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var settings = new chartEditor.ui.panel.Title(model, null);
  settings.allowEnabled(false);

  settings.allowEditPosition(this.allowEditPosition_);
  settings.setPositionLabel('Position');

  settings.allowEditAlign(this.allowEditAnchor_);
  settings.setAlignLabel('Anchor');
  settings.setAlignKey('anchor()');

  settings.setTitleKey('text()');
  settings.setKey(this.getKey());
  this.addChildControl(settings);
  this.settings_ = settings;

  var rotation = new chartEditor.ui.control.comboBox.Base();
  rotation.setOptions([-90, -45, 0, 45, 90]);
  rotation.setRange(-360, 260);
  var rotationLC = new chartEditor.ui.control.wrapped.Labeled(rotation, 'Rotation');
  rotationLC.init(model, this.genKey('rotation()'));
  this.addChildControl(rotationLC);

  var offsetX = new chartEditor.ui.control.comboBox.Percent();
  offsetX.allowNegative(true);
  var offsetXLC = new chartEditor.ui.control.wrapped.Labeled(offsetX, 'Offset X');
  offsetXLC.init(model, this.genKey('offsetX()'));
  this.addChildControl(offsetXLC);

  var offsetY = new chartEditor.ui.control.comboBox.Percent();
  offsetY.allowNegative(true);
  var offsetYLC = new chartEditor.ui.control.wrapped.Labeled(offsetY, 'Offset Y');
  offsetYLC.init(model, this.genKey('offsetY()'));
  this.addChildControl(offsetYLC);
};


/** @inheritDoc */
chartEditor.ui.panel.QuarterLabel.prototype.enterDocument = function() {
  chartEditor.ui.panel.QuarterLabel.base(this, 'enterDocument');

  if (this.allowEditPosition_) {
    var positionValues = goog.object.getValues(chartEditor.enums.Position);
    positionValues = goog.array.filter(positionValues, function(i) {
      return goog.typeOf(i) === 'string';
    });
    positionValues.push('value');

    var positionField = /** @type {chartEditor.ui.control.fieldSelect.Base} */(this.settings_.getPositionField());
    positionField.getSelect().setOptions(positionValues);
  }

  var alignValues = goog.object.getValues(chartEditor.enums.Anchor);
  alignValues = goog.array.filter(alignValues, function(i) {
    return goog.typeOf(i) == 'string';
  });

  var alignField = /** @type {chartEditor.ui.control.fieldSelect.Base} */(this.settings_.getAlignField());
  alignField.getSelect().setOptions(alignValues);
};


/** @inheritDoc */
chartEditor.ui.panel.QuarterLabel.prototype.updateKeys = function() {
  if (!this.isExcluded()) {
    if (this.settings_) this.settings_.setKey(this.getKey());
  }
  chartEditor.ui.panel.QuarterLabel.base(this, 'updateKeys');
};
