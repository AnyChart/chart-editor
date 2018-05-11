goog.provide('chartEditor.DataSetPanel');
goog.provide('chartEditor.DataSetPanelMenuItem');
goog.provide('chartEditor.DataSetPanelMenuItemRenderer');

goog.require("chartEditor.Component");
goog.require("chartEditor.dialog.DataPreview");
goog.require("goog.ui.Menu");
goog.require("goog.ui.MenuButton");
goog.require("goog.ui.MenuItem");
goog.require("goog.ui.MenuItemRenderer");
goog.require("goog.ui.MenuSeparator");


/**
 * Uploaded dataset's panel with dataset's name and with 'remove' button.
 *
 * @param {chartEditor.EditorModel} model
 * @param {Object} dataSet Data set object
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.DataSetPanel = function(model, dataSet, opt_domHelper) {
  chartEditor.DataSetPanel.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  this.disabled = false;

  this.dataSet_ = dataSet;

  this.addClassName('anychart-ce-border-box');
  this.addClassName('anychart-ce-data-set-item');
};
goog.inherits(chartEditor.DataSetPanel, chartEditor.Component);


/** @inheritDoc */
chartEditor.DataSetPanel.prototype.createDom = function() {
  chartEditor.DataSetPanel.base(this, 'createDom');

  var element = /** @type {Element} */(this.getElement());

  // region ----  menu and menu button
  var menu = new goog.ui.Menu();
  goog.array.forEach(['Preview', 'Remove'], function(label) {
    var item = new chartEditor.DataSetPanelMenuItem(label, {icon: label == 'Preview' ? 'ac-preview' : 'ac-remove'});
    // item.addClassName("ac-preview");
    item.setDispatchTransitionEvents(goog.ui.Component.State.ALL, true);
    menu.addChild(item, true);
  }, this);
  this.menu_ = menu;

  var menuBtn = new goog.ui.MenuButton('...', menu);
  menuBtn.addClassName('anychart-ce-data-set-item-menuBtn');
  menuBtn.setTooltip('Data Set Menu');
  menuBtn.setDispatchTransitionEvents(goog.ui.Component.State.ALL, true);
  goog.events.listen(menuBtn, goog.ui.Component.EventType.ACTION, function(e) {
    var caption = e.target.getCaption();
    if (caption === 'Remove') {
      this.removeDataSet();
    } else if (caption === 'Preview') {
      this.previewData();
    }
  }, false, this);

  this.addChild(menuBtn, true);
  // endregion

  // region ---- caption
  var caption = goog.dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-ce-data-set-item-caption',
      this.dataSet_['title']
  );
  goog.dom.appendChild(element, caption);
  // endregion

  // region ---- fields
  if (goog.isArray(this.dataSet_.fields)) {
    for (var i = 0; i < this.dataSet_.fields.length; i++) {
      var field = goog.dom.createDom(
          goog.dom.TagName.DIV,
          'anychart-ce-data-set-item-field',
          this.dataSet_.fields[i].name,
          goog.dom.createDom(
              goog.dom.TagName.SPAN,
              'anychart-ce-data-set-item-token',
              '{%' + this.dataSet_.fields[i].key+ '}'));

      goog.dom.appendChild(element, field);
    }
  }
  // endregion

  this.menuBtn_ = menuBtn;
};


/**
 * Dispatches event to remove data set from model.
 */
chartEditor.DataSetPanel.prototype.removeDataSet = function() {
  this.dispatchEvent({
    type: chartEditor.events.EventType.DATA_REMOVE,
    setId: this.dataSet_.setId,
    dataType: this.dataSet_.type,
    setFullId: this.dataSet_.setFullId
  });
};


/**
 * Create and open data preview dialog
 */
chartEditor.DataSetPanel.prototype.previewData = function() {
  if (!this.previewDialog_) {
    this.previewDialog_ = new chartEditor.dialog.DataPreview();
    this.previewDialog_.setModel(this.getModel());
  }

  this.previewDialog_.setVisible(true);
  this.previewDialog_.updateContent(this.dataSet_);
};


/**
 * Getter for data set's full Id.
 * @return {string}
 */
chartEditor.DataSetPanel.prototype.getSetFullId = function() {
  return this.dataSet_.setFullId;
};


/**
 * @param {boolean} isActiveGeo
 */
chartEditor.DataSetPanel.prototype.setActiveGeo = function(isActiveGeo) {
  goog.dom.classlist.enable(this.getElement(), 'active-geo', isActiveGeo);
};


/**
 * @param {boolean} value
 */
chartEditor.DataSetPanel.prototype.setDisabled = function(value) {
  if (this.disabled !== value) {
    this.disabled = value;
    goog.dom.classlist.enable(this.getElement(), 'anychart-ce-data-set-item-disabled', this.disabled);
  }
  for(var i = 0; i < this.menu_.getChildCount(); i++) {
    var menuItem = this.menu_.getChildAt(i);
    if (menuItem.getCaption() === 'Remove') {
      menuItem.setEnabled(this.disabled && this.dataSet_.type != chartEditor.EditorModel.DataType.GEO);
    }
  }
};


/** @inheritDoc */
chartEditor.DataSetPanel.prototype.disposeInternal = function() {
  goog.disposeAll([this.menu_, this.menuBtn_, this.previewDialog_]);

  this.menu_ = null;
  this.menuBtn_ = null;
  this.previewDialog_ = null;

  chartEditor.DataSetPanel.base(this, 'disposeInternal');
};


/**
 * Class representing an item in a menu.
 *
 * @param {goog.ui.ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {*=} opt_model Data/model associated with the menu item.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for
 *     document interactions.
 * @param {goog.ui.MenuItemRenderer=} opt_renderer Optional renderer.
 * @constructor
 * @extends {goog.ui.MenuItem}
 */
chartEditor.DataSetPanelMenuItem = function(content, opt_model, opt_domHelper, opt_renderer) {
  goog.ui.MenuItem.call(this, content, opt_model, opt_domHelper,
      opt_renderer || chartEditor.DataSetPanelMenuItemRenderer.getInstance());

  this.addClassName('anychart-ce-data-set-item-menu-item');
};
goog.inherits(chartEditor.DataSetPanelMenuItem, goog.ui.MenuItem);
goog.tagUnsealableClass(chartEditor.DataSetPanelMenuItem);


/**
 * Default renderer for {@link chartEditor.DataSetPanelMenuItem}s.
 * @constructor
 * @extends {goog.ui.MenuItemRenderer}
 */
chartEditor.DataSetPanelMenuItemRenderer = function() {
  goog.ui.MenuItemRenderer.call(this);
};
goog.inherits(chartEditor.DataSetPanelMenuItemRenderer, goog.ui.MenuItemRenderer);
goog.addSingletonGetter(chartEditor.DataSetPanelMenuItemRenderer);


/** @inheritDoc */
chartEditor.DataSetPanelMenuItemRenderer.prototype.createDom = function(item) {
  var element = chartEditor.DataSetPanelMenuItemRenderer.base(this, 'createDom', item);

  if (item.getModel().icon) {
    var icon = goog.dom.createDom(goog.dom.TagName.DIV, 'icon ' + item.getModel().icon);
    goog.dom.insertChildAt(element, icon, 0);
  }

  return element;
};