goog.provide('chartEditor.ui.appearanceTabs.GanttDataGrid');

goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.ganttProject.Column');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.GanttDataGrid = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.GanttDataGrid.base(this, 'constructor', model, 'Data grid', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_DATAGRID;

  /** @type {number}*/
  this.lastColumnIndex = 0;

  this.setButtonLabel('+ Add column');
  this.removeFromIndex(2);
  this.addClassName(goog.getCssName('anychart-ce-panel-gantt-datagrid'));
};
goog.inherits(chartEditor.ui.appearanceTabs.GanttDataGrid, chartEditor.ui.PanelsGroup);


/** @override */
chartEditor.ui.appearanceTabs.GanttDataGrid.prototype.createPanel = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  return /**@type {chartEditor.ui.PanelIndexed}*/(new chartEditor.ui.panel.ganttProject.Column(model, this.lastColumnIndex++));
};


/** @override */
chartEditor.ui.appearanceTabs.GanttDataGrid.prototype.removePanel = function(panelIndex) {
  var model = this.getModel();
  model.dropIndexedSetting(panelIndex, 'dataGrid\\(\\)\\.column');
  this.lastColumnIndex--;
};


/** @override */
chartEditor.ui.appearanceTabs.GanttDataGrid.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];
    this.lastColumnIndex = 0;
    var pattern = '^dataGrid\(\)\.column\(\d\).enabled\\(\\)$';
    var regExp = new RegExp(pattern);

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        this.addPanelInstance(/** @type {chartEditor.ui.PanelIndexed} */(this.createPanel()));
      }
    }

    if (this.lastColumnIndex == 0) {
      model.suspendDispatch();
      // Always create 2 column for gantt chart
      this.addPanelInstance(/** @type {chartEditor.ui.PanelIndexed} */(this.createPanel()));
      this.addPanelInstance(/** @type {chartEditor.ui.PanelIndexed} */(this.createPanel()));

      model.resumeDispatch(true);
    }
  }
};
