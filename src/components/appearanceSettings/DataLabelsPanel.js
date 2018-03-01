goog.provide('anychart.chartEditorModule.DataLabelsPanel');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.settings.Labels');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.DataLabelsPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.DataLabelsPanel.base(this, 'constructor', model, 'Data Labels', opt_domHelper);

  this.stringId = 'dataLabels';

  this.key = [['chart'], ['settings'], 'labels()'];
};
goog.inherits(anychart.chartEditorModule.DataLabelsPanel, anychart.chartEditorModule.SettingsPanel);


/** @inheritDoc */
anychart.chartEditorModule.DataLabelsPanel.prototype.createDom = function() {
  anychart.chartEditorModule.DataLabelsPanel.base(this, 'createDom');
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  this.enableContentCheckbox.init(model, this.genKey('enabled()'), 'setSettingForSeries');

  var settings = new anychart.chartEditorModule.settings.Labels(model);
  settings.allowEnabled(false);
  settings.setName(null);
  settings.setKey(this.getKey());
  this.addChild(settings, true);

  this.settings_ = settings;
};


/** @inheritDoc */
anychart.chartEditorModule.DataLabelsPanel.prototype.onModelChange = function(evt) {
  anychart.chartEditorModule.DataLabelsPanel.base(this, 'onModelChange', evt);

  // Hardcoding - Set values for all series.
  var lastKey = evt && evt.lastKey;
  if (lastKey) {
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
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
anychart.chartEditorModule.DataLabelsPanel.prototype.disposeInternal = function() {
  goog.dispose(this.settings_);
  this.settings_ = null;

  anychart.chartEditorModule.DataLabelsPanel.base(this, 'disposeInternal');
};
