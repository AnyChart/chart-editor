goog.provide('chartEditor.controls.input.Palette');

goog.require('chartEditor.controls.input.StringArray');


/**
 * This creates the label input object.
 * @param {string=} opt_label The text to show as the label.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {chartEditor.controls.input.StringArray}
 */
chartEditor.controls.input.Palette = function(opt_label, opt_domHelper) {
  chartEditor.controls.input.Palette.base(this, 'constructor', opt_label, opt_domHelper);

  var self = this;
  this.setFormatterFunction(function(value){
    return self.valueToString(value);
  });
};
goog.inherits(chartEditor.controls.input.Palette, chartEditor.controls.input.StringArray);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.controls.input.Palette.CSS_CLASS = goog.getCssName('anychart-ce-input-palette');


/** @override */
chartEditor.controls.input.Palette.prototype.createDom = function() {
  chartEditor.controls.input.Palette.base(this, 'createDom');
  goog.dom.classlist.add(this.getElement(), chartEditor.controls.input.Palette.CSS_CLASS);
};


/**
 * @param {?*} colors
 */
chartEditor.controls.input.Palette.prototype.setValueByColors = function(colors) {
  this.noDispatch = true;
  var value = this.valueToString(colors);
  this.setValue(value);
  this.noDispatch = false;
};


/**
 * @param {*=} opt_value
 * @return {string}
 */
chartEditor.controls.input.Palette.prototype.valueToString = function(opt_value) {
  if (!goog.isDef(opt_value))
    return '';

  if (goog.isString(opt_value))
    return /** @type {string} */(opt_value);

  var tmp;
  if (goog.isObject(opt_value) && goog.isFunction(opt_value.items)) {
    tmp = opt_value.items();
    tmp = goog.array.filter(tmp, function(i) {
      return goog.isString(i);
    });
    opt_value = tmp.join();

  } else if (goog.isArray(opt_value)) {
    tmp = goog.array.map(opt_value, function(item) {
      var color;
      if (goog.isString(item))
        color = item;
      else if (item.color) {
        if (goog.isString(item.color))
          color = item.color;
        else if (goog.isArray(item.color))
          color = chartEditor.controls.input.Palette.rgbToHex(item.color[0], item.color[1], item.color[2]);
      }
      return color;
    });
    opt_value = tmp.join();
  }

  return /** @type {string} */(opt_value);
};


/**
 * @param {number} c
 * @return {string}
 */
chartEditor.controls.input.Palette.componentToHex = function(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};


/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {string}
 */
chartEditor.controls.input.Palette.rgbToHex = function(r, g, b) {
  return "#" + chartEditor.controls.input.Palette.componentToHex(r) +
      chartEditor.controls.input.Palette.componentToHex(g) +
      chartEditor.controls.input.Palette.componentToHex(b);
};