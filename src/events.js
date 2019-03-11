goog.provide('chartEditor.events');
goog.require('goog.events');


/** @enum {string} */
chartEditor.events.EventType = {
  WAIT: goog.events.getUniqueId('wait'),

  // working with data model
  DATA_ADD: goog.events.getUniqueId('data-add'),
  DATA_REMOVE: goog.events.getUniqueId('data-remove'),
  GEO_DATA_INDEX_LOADED: goog.events.getUniqueId('geo-data-index-loaded'),

  // editor model
  EDITOR_MODEL_UPDATE: goog.events.getUniqueId('editor-model-update'),
  EDITOR_MODEL_UPDATE_SPECIAL: goog.events.getUniqueId('editor-model-update-special'),

  CHART_DRAW: goog.events.getUniqueId('chart-draw'),

  // widgets events
  FILTER_UPDATE: goog.events.getUniqueId('filter-update'),
  PANEL_CLOSE: goog.events.getUniqueId('panel-close'),

  OPEN_SAMPLE_DIALOG: goog.events.getUniqueId('open-sample-dialog'),

  LOCK: goog.events.getUniqueId('lock'),

  EDIT_DATA_SUBMIT: goog.events.getUniqueId('edit-data-submit')
};
