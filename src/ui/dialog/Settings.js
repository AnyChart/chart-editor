goog.provide('chartEditor.ui.dialog.Settings');

goog.require('chartEditor.ui.control.fieldSelect.Select');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.dialog.Base');
goog.require('goog.ui.Dialog');


/**
 * Universal dialog to with settings controld
 *
anychart.onDocumentReady(function() {
  var dialog = new chartEditor.ui.dialog.Settings(
      {
        'id': 'someId',
        'title': 'My awesome indicator',
        'subtitle': 'Accumulation Distribution Line (ADL)',
        'description': 'Developed by Marc Chaikin, the Accumulation Distribution Line is a volume-based indicator designed to measure the cumulative flow of money into and out of a security. Chaikin originally referred to the indicator as the Cumulative Money Flow Line. As with cumulative indicators, the Accumulation Distribution Line is a running total of each period\'s Money Flow Volume. First, a multiplier is calculated based on the relationship of the close to the high-low range. Second, the Money Flow Multiplier is multiplied by the period\'s volume to come up with a Money Flow Volume. A running total of the Money Flow Volume forms the Accumulation Distribution Line. Chartists can use this indicator to affirm a security\'s underlying trend or anticipate reversals when the indicator diverges from the security price.\n\nNote that ADL indicator needs to be built on a separate plot due to rather huge difference between the indicator values and the data values.\n\nADL indicator requires a mapping with five fields in it: "open", "high", "low", "close", and "volume".',
        'controls': [{
          'label': 'Period',
          'name': 'period',
          'control': 'number',
          'default': 20
        }, {
          'label': 'Fast Period',
          'name': 'fastPeriod',
          'control': 'number',
          'default': 2
        }, {
          'label': 'Slow Period',
          'name': 'slowPeriod',
          'control': 'number',
          'default': 30
        }, {
          'label': 'Series Type',
          'name': 'seriesType',
          'control': 'select',
          'options': chartEditor.enums.StockSeriesType,
          'default': 'line'
        }]
      }
  );

  dialog.setVisible(true);

  dialog['listen']('dialogselect', function(evt) {
    // evt.preventDefault();
    if (evt.key === 'ok') {
      dialog.getValues();
    }
  });
});
 *
 * @param {Object} config
 * @constructor
 * @extends {chartEditor.ui.dialog.Base}
 */
chartEditor.ui.dialog.Settings = function(config) {
  chartEditor.ui.dialog.Settings.base(this, 'constructor');

  this.dialogId_ = config['id'];

  if (config['title'])
    this.setTitle(config['title']);

  if (config['subtitle'])
    this.subtitle_ = config['subtitle'];

  this.description_ = config['description'] || '';

  this.controlsConfig_ = config['controls'] || [];

  this.controls_ = [];

  this.setDraggable(false);

  //this.setTextContent(message);

  this.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());
};
goog.inherits(chartEditor.ui.dialog.Settings, chartEditor.ui.dialog.Base);


/** @inheritDoc */
chartEditor.ui.dialog.Settings.prototype.createDom = function() {
  chartEditor.ui.dialog.Settings.base(this, 'createDom');

  goog.dom.classlist.add(this.getDialogElement(), goog.getCssName('anychart-ce-dialog-settings'));

  var dom = this.getDomHelper();

  if (this.subtitle_) {
    var titleEl = this.getTitleElement();

    this.subtitleTextEl_ = goog.dom.createDom(
        goog.dom.TagName.SPAN,
        {'className': goog.getCssName('anychart-ce-dialog-subtitle')}, this.subtitle_);
    titleEl.appendChild(this.subtitleTextEl_);
  }

  this.controlsWrapper_ = dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-dialog-settings-controls'));

  dom.appendChild(this.getContentElement(), this.controlsWrapper_);

  for (var i = 0; i < this.controlsConfig_.length; i++) {
    var controlDescription = this.controlsConfig_[i];
    var control = null;

    switch (controlDescription.control) {
      case 'select':
        control = new chartEditor.ui.control.fieldSelect.Select();
        if (goog.isArray(controlDescription['options']))
          control.setOptions(controlDescription['options']);
        else if (goog.isObject(controlDescription['options']))
          control.setOptions(goog.object.getValues(controlDescription['options']));
        break;
      case 'number':
        control = new chartEditor.ui.control.input.Numbers();
        break;
      default:
        control = new chartEditor.ui.control.input.Base();
    }

    if (control) {
      this.controls_.push(control);
      control.setModel(controlDescription);
      var labeledControl = new chartEditor.ui.control.wrapped.Labeled(control, controlDescription['label']);
      this.addChild(labeledControl, true);
      dom.appendChild(this.controlsWrapper_, labeledControl.getElement());
      if (goog.isDef(controlDescription['default']))
        control.setValue(controlDescription['default']);
    }
  }

  dom.appendChild(this.getContentElement(), dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clear')));

  dom.appendChild(this.getContentElement(),
      dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-dialog-settings-description'), this.description_));
};


/**
 * Returns values of all controls.
 * By default returns array of values in the same order as controls were added.
 *
 * @param {boolean=} opt_asObject
 * @return {Array.<string|number|boolean>|Object}
 */
chartEditor.ui.dialog.Settings.prototype.getValues = function(opt_asObject) {
  var result = opt_asObject ? {} : [];
  for (var i = 0; i < this.controls_.length; i++) {
    var control = this.controls_[i];
    var value = control.getValue();
    value = (goog.isObject(value) && goog.isDef(value.value)) ? value.value : value;
    if (opt_asObject)
      result[control.getModel()['name']] = goog.isObject(value) && goog.isDef(value.value) ? value.value : value;
    else
      result.push(value);
  }
  return result;
};


/**
 * @return {?string}
 */
chartEditor.ui.dialog.Settings.prototype.getDialogId = function() {
  return this.dialogId_;
};


//exports
(function() {
  goog.exportSymbol('chartEditor.ui.dialog.Settings', chartEditor.ui.dialog.Settings);
  var proto = chartEditor.ui.dialog.Settings.prototype;
  proto['getValues'] = proto.getValues;
  proto['setVisible'] = proto.setVisible;
  proto['listen'] = proto.listen;
  proto['getDialogId'] = proto.getDialogId;
  proto['dispose'] = proto.dispose;
})();