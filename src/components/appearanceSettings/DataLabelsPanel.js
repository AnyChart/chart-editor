goog.provide('chartEditor.DataLabelsPanel');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.Labels');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.DataLabelsPanel = function(model, opt_domHelper) {
  chartEditor.DataLabelsPanel.base(this, 'constructor', model, 'Data Labels', opt_domHelper);

  this.stringId = 'dataLabels';

  this.key = [['chart'], ['settings'], 'labels()'];
};
goog.inherits(chartEditor.DataLabelsPanel, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.DataLabelsPanel.prototype.createDom = function() {
  chartEditor.DataLabelsPanel.base(this, 'createDom');
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  this.enableContentCheckbox.init(model, this.genKey('enabled()'), 'setSettingForSeries');

  var settings = new chartEditor.settings.Labels(model);
  settings.allowEnabled(false);
  settings.setName(null);
  settings.setKey(this.getKey());
  this.addChild(settings, true);

  this.settings_ = settings;
};


/** @inheritDoc */
chartEditor.DataLabelsPanel.prototype.onModelChange = function(evt) {
  chartEditor.DataLabelsPanel.base(this, 'onModelChange', evt);

  // Hardcoding - Set values for all series.
  var lastKey = evt && evt.lastKey;
  if (lastKey) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    model.suspendDispatch();

    var settingsComponent = this.settings_.getSettingsComponent();
    for (var c = 0, count = settingsComponent.getChildCount(); c < count; c++) {
      var child = settingsComponent.getChildAt(c);
      if (goog.isFunction(child.getKey) || goog.isFunction(child.getSelect)) {
        var key = goog.isFunction(child.getKey) ? child.getKey() : child.getSelect().getKey();
        var stringKey = key[key.length - 1];

        if (lastKey === stringKey) {
          var value = model.getValue(key);
          var chartType = model.getModel()['chart']['type'];
          var singleSeries = model.isChartSingleSeries();

          if (!singleSeries) {
            var mappings = model.getValue([['dataSettings'], 'mappings']);
            for (var i = 0; i < mappings.length; i++) {
              for (var j = 0; j < mappings[i].length; j++) {
                var seriesId = mappings[i][j]['id'];
                var stringKey2 = (chartType === 'stock' ? 'plot(' + i + ').' : '') + 'getSeries(\'' + seriesId + '\').' + stringKey;
                var key2 = [['chart'], ['settings'], stringKey2];
                model.setValue(key2, value);
              }
            }
          }
        }
      }
    }
    model.resumeDispatch();
  }
};


/** @override */
chartEditor.DataLabelsPanel.prototype.disposeInternal = function() {
  goog.dispose(this.settings_);
  this.settings_ = null;

  chartEditor.DataLabelsPanel.base(this, 'disposeInternal');
};
