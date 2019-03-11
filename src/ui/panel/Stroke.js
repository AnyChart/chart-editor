goog.provide('chartEditor.ui.panel.Stroke');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.button.Base');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Select');



/**
 * @param {chartEditor.model.Base} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Stroke = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.Stroke.base(this, 'constructor', model, null, opt_domHelper);

  this.name = goog.isDef(opt_name) ? opt_name : 'Stroke';

  this.allowEnabled(false);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-stroke'));
};
goog.inherits(chartEditor.ui.panel.Stroke, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.Stroke.prototype.createDom = function() {
  chartEditor.ui.panel.Stroke.base(this, 'createDom');

  var dash = new chartEditor.ui.control.fieldSelect.Select('solid');
  dash.setOptions([
    {value: '0', icon: 'ac ac-position-bottom'},
    {value: '5 5', icon: 'ac ac-position-top'},
    {value: '5 10', icon: 'ac ac-position-bottom'},
    {value: '10 5', icon: 'ac ac-position-top'}
  ]);
  this.addChild(dash, true);
  goog.dom.classlist.add(dash.getElement(), goog.getCssName('anychart-ce-stroke-dash'));
  this.dash_ = dash;

  var thickness = new chartEditor.ui.control.comboBox.Base();
  thickness.allowReset(false);
  thickness.setOptions([0, 1, 2, 3, 4, 5]);
  thickness.setRange(0, 10);
  this.addChild(thickness, true);
  goog.dom.classlist.add(thickness.getElement(), goog.getCssName('anychart-ce-stroke-thickness'));
  this.thickness_ = thickness;

  var color = new chartEditor.ui.control.colorPicker.Base();
  color.allowReset(false);
  color.addClassName(goog.getCssName('anychart-ce-stroke-color'));
  this.addChild(color, true);
  this.color_ = color;

  // if (!this.name) { // Always draw as control
  this.getContentElement().appendChild(this.resetButton_.getElement());
  // }

  goog.dom.appendChild(this.getElement(), goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));
};

/** @override */
chartEditor.ui.panel.Stroke.prototype.enterDocument = function() {
  chartEditor.ui.panel.Stroke.base(this, 'enterDocument');

  var handler = this.getHandler();
  handler.listen(this.color_, goog.ui.Component.EventType.ACTION, this.onChange);
  handler.listen(this.thickness_, goog.ui.Component.EventType.CHANGE, this.onChange);
  handler.listen(this.dash_, goog.ui.Component.EventType.CHANGE, this.onChange);
};


/**
 * Common handler function for every control in ui. Sets value for stroke() key as Object.
 */
chartEditor.ui.panel.Stroke.prototype.onChange = function() {
  if (this.noDispatch) return;

  var value = {};
  var colorValue = this.color_.getSelectedColor();
  if (colorValue && colorValue != 'none')
    value['color'] = colorValue;

  var thicknessValue = this.thickness_.getToken();
  if (thicknessValue)
    value['thickness'] = thicknessValue;

  var dashValue = this.dash_.getValue();
  if (dashValue)
    value['dash'] = dashValue.value;

  if (colorValue || thicknessValue || dashValue) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    if (model) {
      model.setValue(this.key, value);
      this.dispatchEvent(goog.ui.Component.EventType.ACTION);
    }
  }
};


/** @inheritDoc */
chartEditor.ui.panel.Stroke.prototype.onChartDraw = function(evt) {
  chartEditor.ui.panel.Stroke.base(this, 'onChartDraw', evt);
  this.setValueByTarget(evt.chart);
};


/**
 * Sets values of child controls.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 */
chartEditor.ui.panel.Stroke.prototype.setValueByTarget = function(target) {
  if (this.excluded) return;

  var stringKey = chartEditor.model.Base.getStringKey(this.key);
  var value = /** @type {string|Object|Function} */(chartEditor.binding.exec(target, stringKey));

  if (goog.isFunction(value)) {
    // Should not call this function because of barmekko series stroke
    // value = value();
    value = {};
  }

  if (goog.isString(value))
    value = {'color': value};

  this.noDispatch = true;
  this.color_.setSelectedColor((value && value['color'] && value['color'] != 'none') ? value['color'] : null);
  this.thickness_.setValue((value && value['thickness']) ? value['thickness'] : void 0);
  this.dash_.setValue((value && value['dash']) ? value['dash'] : void 0);
  this.noDispatch = false;
};


/** @override */
chartEditor.ui.panel.Stroke.prototype.disposeInternal = function() {
  goog.disposeAll([this.color_, this.thickness_, this.dash_]);
  this.color_ = null;
  this.thickness_ = null;
  this.dash_ = null;

  chartEditor.ui.panel.Stroke.base(this, 'disposeInternal');
};
