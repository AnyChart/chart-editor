goog.provide('anychart.chartEditorModule.settings.Stroke');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.colorPicker.Base');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.controls.select.DataFieldSelect');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.Stroke = function(model, opt_name, opt_domHelper) {
  anychart.chartEditorModule.settings.Stroke.base(this, 'constructor', model, null, opt_domHelper);

  this.name = goog.isDef(opt_name) ? opt_name : 'Stroke';

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-settings-stroke'));
};
goog.inherits(anychart.chartEditorModule.settings.Stroke, anychart.chartEditorModule.SettingsPanel);


/** @override */
anychart.chartEditorModule.settings.Stroke.prototype.createDom = function() {
  anychart.chartEditorModule.settings.Stroke.base(this, 'createDom');

  var element = this.getElement();
  var content = this.getContentElement();

  var color = new anychart.chartEditorModule.colorPicker.Base();
  color.addClassName(goog.getCssName('anychart-stroke-color'));
  this.addChild(color, true);
  this.color_ = color;

  var thickness = new anychart.chartEditorModule.comboBox.Base();
  thickness.setOptions([0, 1, 2, 3, 4, 5]);
  thickness.setRange(0, 10);

  this.addChild(thickness, true);
  goog.dom.classlist.add(thickness.getElement(), goog.getCssName('anychart-stroke-thickness'));
  this.thickness_ = thickness;

  var dash = new anychart.chartEditorModule.controls.select.DataFieldSelect('solid');
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

  goog.dom.appendChild(content, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-clearboth')));
  goog.dom.appendChild(element, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-clearboth')));
};


/** @override */
anychart.chartEditorModule.settings.Stroke.prototype.enterDocument = function() {
  anychart.chartEditorModule.settings.Stroke.base(this, 'enterDocument');

  var handler = this.getHandler();
  handler.listen(this.color_, goog.ui.Component.EventType.ACTION, this.onChange);
  handler.listen(this.thickness_, goog.ui.Component.EventType.CHANGE, this.onChange);
  handler.listen(this.dash_, goog.ui.Component.EventType.CHANGE, this.onChange);
};


/**
 * Common handler function for every control in component. Sets value for stroke() key as Object.
 */
anychart.chartEditorModule.settings.Stroke.prototype.onChange = function() {
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
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    if (model) {
      model.setValue(this.key, value);
      this.dispatchEvent(goog.ui.Component.EventType.ACTION);
    }
  }
};


/** @inheritDoc */
anychart.chartEditorModule.settings.Stroke.prototype.onChartDraw = function(evt) {
  anychart.chartEditorModule.settings.Stroke.base(this, 'onChartDraw', evt);
  var target = evt.chart;
  this.setValueByTarget(target);
};


/**
 * Sets values of child controls.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 */
anychart.chartEditorModule.settings.Stroke.prototype.setValueByTarget = function(target) {
  this.target = target;

  var stringKey = anychart.chartEditorModule.EditorModel.getStringKey(this.key);
  var value = /** @type {string} */(anychart.bindingModule.exec(this.target, stringKey));

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
anychart.chartEditorModule.settings.Stroke.prototype.disposeInternal = function() {
  goog.disposeAll([this.color_, this.thickness_, this.dash_]);
  this.color_ = null;
  this.thickness_ = null;
  this.dash_ = null;

  anychart.chartEditorModule.settings.Stroke.base(this, 'disposeInternal');
};
