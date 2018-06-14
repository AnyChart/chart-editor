goog.provide('chartEditor.ExportTabs');

goog.require("chartEditor.Tabs");
goog.require("chartEditor.exportTabs.Embed");
goog.require("chartEditor.exportTabs.Json");
goog.require("chartEditor.exportTabs.SourceCode");


/**
 * Appearance settings widget.
 *
 * @param {chartEditor.EditorModel} model
 * @param {chartEditor.Component=} opt_buttonsWrapper
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.Tabs}
 */
chartEditor.ExportTabs = function(model, opt_buttonsWrapper, opt_domHelper) {
  chartEditor.ExportTabs.base(this, 'constructor', model, opt_buttonsWrapper, opt_domHelper);

  this.descriptors = [
    {
      name: chartEditor.enums.EditorTabs.SOURCE_CODE,
      enabled: true,
      classFunc: chartEditor.exportTabs.SourceCode,
      instance: null
    }, {
      name: chartEditor.enums.EditorTabs.JSON,
      enabled: true,
      classFunc: chartEditor.exportTabs.Json,
      instance: null
    }, {
      name: chartEditor.enums.EditorTabs.EMBED,
      enabled: true,
      classFunc: chartEditor.exportTabs.Embed,
      instance: null
    }
  ];
};
goog.inherits(chartEditor.ExportTabs, chartEditor.Tabs);
