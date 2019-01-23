goog.provide('chartEditor.ui.control.input.StringArray');

goog.require('chartEditor.ui.control.input.Base');


/**
 * This creates the label input object.
 * @param {string=} opt_label The text to show as the label.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {chartEditor.ui.control.input.Base}
 */
chartEditor.ui.control.input.StringArray = function(opt_label, opt_domHelper) {
  chartEditor.ui.control.input.StringArray.base(this, 'constructor', opt_label, opt_domHelper);

  this.setFormatterFunction(function(value){
    if (goog.isFunction(value))
      value = '';

    else if (goog.isArray(value))
      value = /** @type {Array} */(value).join(',');

    return value ? String(value) : '';
  });
};
goog.inherits(chartEditor.ui.control.input.StringArray, chartEditor.ui.control.input.Base);


/** @inheritDoc */
chartEditor.ui.control.input.StringArray.prototype.enterDocument = function() {
  chartEditor.ui.control.input.StringArray.base(this, 'enterDocument');
  goog.events.unlisten(this.inputHandler_, goog.events.InputHandler.EventType.INPUT, this.onChange, false, this);
  goog.events.listen(this.getElement(), goog.events.EventType.BLUR, this.onChange, false, this);
};


/** @inheritDoc */
chartEditor.ui.control.input.StringArray.prototype.onChange = function() {
  var value = this.getValue();

  if (!this.noDispatch && value !== this.lastValue && this.editorModel) {
    value = value.split(',');
    for (var i = 0; i < value.length; i++)
      value[i] = value[i].trim();
    if (value.length == 1 && !value[0])
      value = null;

    var caretPosition = goog.dom.selection.getStart(this.getElement());

    if (this.callback)
      this.editorModel.callbackByString(this.callback, this);
    else
      this.editorModel.setValue(this.key, value, false, this.noRebuild, this.noRebuildMapping);

    goog.dom.selection.setCursorPosition(this.getElement(), caretPosition);
  }
  this.revisionCount1++;
};
