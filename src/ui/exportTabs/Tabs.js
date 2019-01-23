goog.provide('chartEditor.ui.exportTabs.Tabs');

goog.require("chartEditor.ui.Tabs");
goog.require("chartEditor.ui.exportTabs.Embed");
goog.require("chartEditor.ui.exportTabs.Json");
goog.require("chartEditor.ui.exportTabs.SourceCode");


/**
 * Appearance panel widget.
 *
 * @param {chartEditor.model.Base} model
 * @param {chartEditor.ui.Component=} opt_buttonsWrapper
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Tabs}
 */
chartEditor.ui.exportTabs.Tabs = function(model, opt_buttonsWrapper, opt_domHelper) {
  chartEditor.ui.exportTabs.Tabs.base(this, 'constructor', model, opt_buttonsWrapper, opt_domHelper);

  this.descriptors = [
    {
      name: chartEditor.enums.EditorTabs.SOURCE_CODE,
      enabled: true,
      classFunc: chartEditor.ui.exportTabs.SourceCode,
      instance: null
    }, {
      name: chartEditor.enums.EditorTabs.JSON,
      enabled: true,
      classFunc: chartEditor.ui.exportTabs.Json,
      instance: null
    }, {
      name: chartEditor.enums.EditorTabs.EMBED,
      enabled: true,
      classFunc: chartEditor.ui.exportTabs.Embed,
      instance: null
    }
  ];
};
goog.inherits(chartEditor.ui.exportTabs.Tabs, chartEditor.ui.Tabs);
