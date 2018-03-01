goog.provide('anychart.chartEditorModule.events');
goog.require('goog.events');


/** @enum {string} */
anychart.chartEditorModule.events.EventType = {
  WAIT: goog.events.getUniqueId('wait'),

  // working with data model
  DATA_ADD: goog.events.getUniqueId('data-add'),
  DATA_REMOVE: goog.events.getUniqueId('data-remove'),
  GEO_DATA_INDEX_LOADED: goog.events.getUniqueId('geo-data-index-loaded'),

  // editor model
  EDITOR_MODEL_UPDATE: goog.events.getUniqueId('editor-model-update'),

  CHART_DRAW: goog.events.getUniqueId('chart-draw'),

  // widgets events
  FILTER_UPDATE: goog.events.getUniqueId('filter-update'),
  PANEL_CLOSE: goog.events.getUniqueId('panel-close')
};
