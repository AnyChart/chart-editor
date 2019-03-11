goog.provide('chartEditor.ui.dataSets.DataSet');
goog.provide('chartEditor.ui.dataSets.DataSetMenuItem');
goog.provide('chartEditor.ui.dataSets.DataSetMenuItemRenderer');

goog.require("chartEditor.ui.Component");
goog.require("chartEditor.ui.dialog.DataPreview");
goog.require("goog.ui.Menu");
goog.require("goog.ui.MenuButton");
goog.require("goog.ui.MenuItem");
goog.require("goog.ui.MenuItemRenderer");
goog.require("goog.ui.MenuSeparator");


/**
 * Uploaded dataset's panel with dataset's name and with 'remove' button.
 *
 * @param {chartEditor.model.Base} model
 * @param {Object} dataSet Data set object
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.dataSets.DataSet = function(model, dataSet, opt_domHelper) {
  chartEditor.ui.dataSets.DataSet.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  this.disabled = false;

  this.dataSet_ = dataSet;

  this.addClassName('anychart-ce-border-box');
  this.addClassName('anychart-ce-data-set-item');
};
goog.inherits(chartEditor.ui.dataSets.DataSet, chartEditor.ui.Component);


/**
 * Initializes specific DOM-structure.
 */
chartEditor.ui.dataSets.DataSet.prototype.initContent = function() {
  var element = /** @type {Element} */(this.getElement());

  var caption = goog.dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-ce-data-set-item-caption',
      this.dataSet_['title']
  );
  goog.dom.appendChild(element, caption);

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

};

/** @inheritDoc */
chartEditor.ui.dataSets.DataSet.prototype.createDom = function() {
  chartEditor.ui.dataSets.DataSet.base(this, 'createDom');

  var menu = new goog.ui.Menu();
  goog.array.forEach(['Preview', 'Remove'], function(label) {
    var item = new chartEditor.ui.dataSets.DataSetMenuItem(label, {icon: label == 'Preview' ? 'ac-preview' : 'ac-remove'});
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
  this.menuButton = menuBtn;
  
  this.initContent();
};


/**
 * Dispatches event to remove data set from model.
 */
chartEditor.ui.dataSets.DataSet.prototype.removeDataSet = function() {
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
chartEditor.ui.dataSets.DataSet.prototype.previewData = function() {
  if (!this.previewDialog_) {
    this.previewDialog_ = new chartEditor.ui.dialog.DataPreview();
    this.previewDialog_.setModel(this.getModel());
  }

  this.previewDialog_.setVisible(true);
  this.previewDialog_.updateContent(this.dataSet_);
};


/**
 * Getter for data set's full Id.
 * @return {string}
 */
chartEditor.ui.dataSets.DataSet.prototype.getSetFullId = function() {
  return this.dataSet_.setFullId;
};


/**
 * Updates data.
 */
chartEditor.ui.dataSets.DataSet.prototype.updateData = goog.nullFunction;


/**
 * @param {boolean} isActiveGeo
 */
chartEditor.ui.dataSets.DataSet.prototype.activatePanelGeo = function(isActiveGeo) {
  goog.dom.classlist.enable(this.getElement(), 'active-geo', isActiveGeo);
};


/**
 * @param {boolean} value
 */
chartEditor.ui.dataSets.DataSet.prototype.setDisabled = function(value) {
  if (this.disabled !== value) {
    this.disabled = value;
    goog.dom.classlist.enable(this.getElement(), 'anychart-ce-data-set-item-disabled', this.disabled);
  }
  for(var i = 0; i < this.menu_.getChildCount(); i++) {
    var menuItem = this.menu_.getChildAt(i);
    if (menuItem.getCaption() === 'Remove') {
      menuItem.setEnabled(this.disabled && this.dataSet_.type != chartEditor.model.DataType.GEO);
    }
  }
};


/** @inheritDoc */
chartEditor.ui.dataSets.DataSet.prototype.disposeInternal = function() {
  goog.disposeAll(this.menu_, this.menuButton, this.previewDialog_);

  this.menu_ = null;
  this.menuButton = null;
  this.previewDialog_ = null;

  chartEditor.ui.dataSets.DataSet.base(this, 'disposeInternal');
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
chartEditor.ui.dataSets.DataSetMenuItem = function(content, opt_model, opt_domHelper, opt_renderer) {
  goog.ui.MenuItem.call(this, content, opt_model, opt_domHelper,
      opt_renderer || chartEditor.ui.dataSets.DataSetMenuItemRenderer.getInstance());

  this.addClassName('anychart-ce-data-set-item-menu-item');
};
goog.inherits(chartEditor.ui.dataSets.DataSetMenuItem, goog.ui.MenuItem);
goog.tagUnsealableClass(chartEditor.ui.dataSets.DataSetMenuItem);


/**
 * Default renderer for {@link chartEditor.ui.dataSets.DataSetMenuItem}s.
 * @constructor
 * @extends {goog.ui.MenuItemRenderer}
 */
chartEditor.ui.dataSets.DataSetMenuItemRenderer = function() {
  goog.ui.MenuItemRenderer.call(this);
};
goog.inherits(chartEditor.ui.dataSets.DataSetMenuItemRenderer, goog.ui.MenuItemRenderer);
goog.addSingletonGetter(chartEditor.ui.dataSets.DataSetMenuItemRenderer);


/** @inheritDoc */
chartEditor.ui.dataSets.DataSetMenuItemRenderer.prototype.createDom = function(item) {
  var element = chartEditor.ui.dataSets.DataSetMenuItemRenderer.base(this, 'createDom', item);

  if (item.getModel().icon) {
    var icon = goog.dom.createDom(goog.dom.TagName.DIV, 'icon ' + item.getModel().icon);
    goog.dom.insertChildAt(element, icon, 0);
  }

  return element;
};