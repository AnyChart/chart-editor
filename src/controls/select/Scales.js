goog.provide('chartEditor.controls.select.Scales');
goog.provide('chartEditor.controls.select.ScalesDataFieldSelect');

goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.controls.select.DataFieldSelect');


/**
 *
 * @param {Object=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 *
 * @constructor
 * @extends {chartEditor.controls.select.DataField}
 */
chartEditor.controls.select.Scales = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  opt_model = opt_model || {};
  opt_model.label = opt_model.label || 'Scales';
  opt_model.caption = opt_model.caption || 'Select scale';

  // this.availableOptions_ = opt_model.availableOptions || null;
  this.availableOptions_ = null;

  chartEditor.controls.select.Scales.base(this, 'constructor',
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass);

  this.setSelect(new chartEditor.controls.select.ScalesDataFieldSelect(
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass
  ));

  if (opt_model.scaleName)
    this.getControl().setScaleName(opt_model.scaleName);
};
goog.inherits(chartEditor.controls.select.Scales, chartEditor.controls.select.DataField);


/** @inheritDoc */
chartEditor.controls.select.Scales.prototype.enterDocument = function() {
  this.updateOptions();

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  if (model)
    this.getHandler().listen(model, chartEditor.events.EventType.EDITOR_MODEL_UPDATE, this.updateOptions);

  chartEditor.controls.select.Scales.base(this, 'enterDocument');
};


/**
 * Set options of scales select
 */
chartEditor.controls.select.Scales.prototype.updateOptions = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    var scales = model.getModel()['standalones']['scale'];
    var options = [];

    if (scales) {
      for (var i = 0; i < scales.length; i++) {
        if (scales[i]['type'] &&
            (!this.availableOptions_ || this.availableOptions_['indexOf'](scales[i]['type']) != -1)) {
          options.push({value: 'STANDALONE:scale:' + i, caption: scales[i]['name']});
        }
      }
    }

    this.getControl().setOptions(options);
  }
};


/**
 * @param {Object=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 * @constructor
 * @extends {chartEditor.controls.select.DataFieldSelect}
 */
chartEditor.controls.select.ScalesDataFieldSelect = function (opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  chartEditor.controls.select.ScalesDataFieldSelect.base(this, 'constructor',
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass);
};
goog.inherits(chartEditor.controls.select.ScalesDataFieldSelect, chartEditor.controls.select.DataFieldSelect);


/**
 * @param {string} value
 */
chartEditor.controls.select.ScalesDataFieldSelect.prototype.setScaleName = function(value) {
  this.scaleName_ = value;
};


/** @inheritDoc */
chartEditor.controls.select.ScalesDataFieldSelect.prototype.setValueByTarget = function(target) {
  if (!this.isExcluded()) {
    this.target = target;
    var stringKey = chartEditor.EditorModel.getStringKey(this.getKey());
    var value = chartEditor.binding.exec(this.target, stringKey);
    var selectValue;

    this.noDispatch = true;

    if (value) {
      var found = false;
      var scales = this.editorModel.getModel()['standalones']['scale'];
      if (scales) {
        for (var i = scales.length; i--;) {
          if (scales[i]['instance'] == value) {
            found = true;
            selectValue = 'STANDALONE:scale:' + i;
            this.setValue(selectValue);
            break;
          }
        }
      }

      if (!found) {
        console.warn("Scale not found!");
      }

    } else
      this.setValue(null);

    this.noDispatch = false;

    return false;
  }
};
