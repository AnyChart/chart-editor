goog.provide('chartEditor.ExportTabs');

goog.require("chartEditor.Tabs");
goog.require("chartEditor.exportTabs.Embed");
goog.require("chartEditor.exportTabs.Json");
goog.require("chartEditor.exportTabs.SourceCode");


/**
 * Appearance settings widget.
 *
 * @param {chartEditor.EditorModel} model
 * @param {chartEditor.Component} tabs
 * @param {chartEditor.Component} tabContent
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.Tabs}
 */
chartEditor.ExportTabs = function(model, tabs, tabContent, opt_domHelper) {
  chartEditor.ExportTabs.base(this, 'constructor', model, tabs, tabContent, opt_domHelper);

  this.descriptors = [
    {
      name: 'SourceCode',
      enabled: true,
      classFunc: chartEditor.exportTabs.SourceCode,
      instance: null
    }, {
      name: 'Json',
      enabled: true,
      classFunc: chartEditor.exportTabs.Json,
      instance: null
    }, {
      name: 'Embed',
      enabled: true,
      classFunc: chartEditor.exportTabs.Embed,
      instance: null
    }
  ];
};
goog.inherits(chartEditor.ExportTabs, chartEditor.Tabs);
