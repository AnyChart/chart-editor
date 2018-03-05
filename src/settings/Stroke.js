goog.provide('chartEditor.settings.Stroke');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.select.DataFieldSelect');


/**
 * @param {chartEditor.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.Stroke = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.Stroke.base(this, 'constructor', model, null, opt_domHelper);

  this.name = goog.isDef(opt_name) ? opt_name : 'Stroke';

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-settings-stroke'));
};
goog.inherits(chartEditor.settings.Stroke, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.Stroke.prototype.createDom = function() {
  chartEditor.settings.Stroke.base(this, 'createDom');

  var element = this.getElement();
  var content = this.getContentElement();

  var color = new chartEditor.colorPicker.Base();
  color.addClassName(goog.getCssName('anychart-stroke-color'));
  this.addChild(color, true);
  this.color_ = color;

  var thickness = new chartEditor.comboBox.Base();
  thickness.setOptions([0, 1, 2, 3, 4, 5]);
  thickness.setRange(0, 10);

  this.addChild(thickness, true);
  goog.dom.classlist.add(thickness.getElement(), goog.getCssName('anychart-stroke-thickness'));
  this.thickness_ = thickness;

  var dash = new chartEditor.controls.select.DataFieldSelect('solid');
  dash.setOptions([
    {value: '0', icon: 'ac ac-position-bottom'},
    {value: '5 5', icon: 'ac ac-position-top'},
    {value: '5 10', icon: 'ac ac-position-bottom'},
    {value: '10 5', icon: 'ac ac-position-top'},
    {value: '15 10 5 10', icon: 'ac ac-position-bottom'},
    {value: '5 5 1 5', icon: 'ac ac-position-top'}
  ]);

  this.addChild(dash, true);
  goog.dom.classlist.add(dash.getElement(), goog.getCssName('anychart-stroke-dash'));
  this.dash_ = dash;

  goog.dom.appendChild(content, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));
  goog.dom.appendChild(element, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));
};


/** @override */
chartEditor.settings.Stroke.prototype.enterDocument = function() {
  chartEditor.settings.Stroke.base(this, 'enterDocument');

  var handler = this.getHandler();
  handler.listen(this.color_, goog.ui.Component.EventType.ACTION, this.onChange);
  handler.listen(this.thickness_, goog.ui.Component.EventType.CHANGE, this.onChange);
  handler.listen(this.dash_, goog.ui.Component.EventType.CHANGE, this.onChange);
};


/**
 * Common handler function for every control in component. Sets value for stroke() key as Object.
 */
chartEditor.settings.Stroke.prototype.onChange = function() {
  if (this.noDispatch) return;

  var value = {};
  var colorValue = this.color_.getSelectedColor();
  if (colorValue)
    value['color'] = colorValue;

  var thicknessValue = this.thickness_.getToken();
  if (thicknessValue)
    value['thickness'] = thicknessValue;

  var dashValue = this.dash_.getValue();
  if (dashValue)
    value['dash'] = dashValue.value;

  if (colorValue || thicknessValue || dashValue) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    if (model) {
      model.setValue(this.key, value);
      this.dispatchEvent(goog.ui.Component.EventType.ACTION);
    }
  }
};


/** @inheritDoc */
chartEditor.settings.Stroke.prototype.onChartDraw = function(evt) {
  chartEditor.settings.Stroke.base(this, 'onChartDraw', evt);
  var target = evt.chart;
  this.setValueByTarget(target);
};


/**
 * Sets values of child controls.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 */
chartEditor.settings.Stroke.prototype.setValueByTarget = function(target) {
  this.target = target;

  var stringKey = chartEditor.EditorModel.getStringKey(this.key);
  var value = /** @type {string} */(chartEditor.binding.exec(this.target, stringKey));

  if (goog.isObject(value)) {
    this.colorValue_ = value['color'];
    this.thicknessValue_ = value['thickness'];
    this.dashValue_ = value['dash'];
  } else
    this.colorValue_ = value;

  this.noDispatch = true;

  if (this.colorValue_)
    this.color_.setSelectedColor(this.colorValue_);

  if (this.thicknessValue_)
    this.thickness_.setValue(this.thicknessValue_);

  if (this.dashValue_)
    this.dash_.setValue(this.dashValue_);

  this.noDispatch = false;
};


/** @override */
chartEditor.settings.Stroke.prototype.disposeInternal = function() {
  goog.disposeAll([this.color_, this.thickness_, this.dash_]);
  this.color_ = null;
  this.thickness_ = null;
  this.dash_ = null;

  chartEditor.settings.Stroke.base(this, 'disposeInternal');
};
