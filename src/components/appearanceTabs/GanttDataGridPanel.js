goog.provide('chartEditor.GanttDataGridPanel');

goog.require('chartEditor.MultiplePanelsBase');
goog.require('chartEditor.settings.ganttProject.Column');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.MultiplePanelsBase}
 */
chartEditor.GanttDataGridPanel = function(model, opt_domHelper) {
  chartEditor.GanttDataGridPanel.base(this, 'constructor', model, 'Data grid', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_DATAGRID;

  /** @type {number}*/
  this.lastColumnIndex = 0;

  this.setButtonLabel('+ Add column');
  this.removeFromIndex(2);
  this.addClassName(goog.getCssName('anychart-ce-settings-panel-gantt-datagrid'));
};
goog.inherits(chartEditor.GanttDataGridPanel, chartEditor.MultiplePanelsBase);


/** @override */
chartEditor.GanttDataGridPanel.prototype.createPanel = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  return /**@type {chartEditor.SettingsPanelIndexed}*/(new chartEditor.settings.ganttProject.Column(model, this.lastColumnIndex++));
};


/** @override */
chartEditor.GanttDataGridPanel.prototype.removePanel = function(panelIndex) {
  var model = this.getModel();
  model.dropIndexedSetting(panelIndex, 'dataGrid\\(\\)\\.column');
  this.lastColumnIndex--;
};


/** @override */
chartEditor.GanttDataGridPanel.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];
    this.lastColumnIndex = 0;
    var pattern = '^dataGrid\(\)\.column\(\d\).enabled\\(\\)$';
    var regExp = new RegExp(pattern);

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        this.addPanelInstance(/** @type {chartEditor.SettingsPanelIndexed} */(this.createPanel()));
      }
    }

    if (this.lastColumnIndex == 0) {
      model.suspendDispatch();
      // Always create 2 column for gantt chart
      this.addPanelInstance(/** @type {chartEditor.SettingsPanelIndexed} */(this.createPanel()));
      this.addPanelInstance(/** @type {chartEditor.SettingsPanelIndexed} */(this.createPanel()));

      model.resumeDispatch(true);
    }
  }
};
