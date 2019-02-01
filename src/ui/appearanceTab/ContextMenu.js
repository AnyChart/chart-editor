goog.provide('chartEditor.ui.appearanceTabs.ContextMenu');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.Base');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.ContextMenu = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.ContextMenu.base(this, 'constructor', model, 'Context menu', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.CONTEXT_MENU;

  this.key = [['chart'], ['settings'], 'contextMenu()'];

  this.map_ = {
    'exclude': {caption: 'Exclude/include points', checkbox: void 0},
    'marquee': {caption: 'Start selection/zoom marquee', checkbox: void 0},
    'saveAs': {caption: 'Save chart as...', checkbox: void 0},
    'saveDataAs': {caption: 'Save data as...', checkbox: void 0},
    'shareWith': {caption: 'Share with...', checkbox: void 0},
    'printChart': {caption: 'Print', checkbox: void 0},
    'fullScreen': {caption: 'Full screen', checkbox: void 0},
    'about': {caption: 'About', checkbox: void 0}
  };
};
goog.inherits(chartEditor.ui.appearanceTabs.ContextMenu, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.ContextMenu.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.ContextMenu.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  for (var key in this.map_) {
    var row = this.map_[key];
    var checkbox = new chartEditor.ui.control.checkbox.Base();
    checkbox.setCaption(row.caption);
    checkbox.setModel(key);
    checkbox.init(model, [], 'setContextMenuItemEnable');
    this.map_[key].checkbox = checkbox;
    this.addChild(checkbox, true);
  }
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.ContextMenu.prototype.onChartDraw = function(evt) {
  chartEditor.ui.appearanceTabs.ContextMenu.base(this, 'onChartDraw', evt);

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var menuItems = model.contextMenuItems();
  var key;
  var item;
  var checkbox;

  for (key in menuItems) {
    item = menuItems[key];
    checkbox = this.map_[key].checkbox;
    if (checkbox && item) {
      var checked = checkbox.getChecked();
      if (checked != item['enabled'])
        checkbox.setChecked(item['enabled']);
    }
  }
};


/** @override */
chartEditor.ui.appearanceTabs.ContextMenu.prototype.disposeInternal = function() {
  for (var key in this.map_) {
    if (this.map_[key].checkbox) {
      this.map_[key].checkbox.dispose();
      this.map_[key].checkbox = null;
    }
  }

  chartEditor.ui.appearanceTabs.ContextMenu.base(this, 'disposeInternal');
};
