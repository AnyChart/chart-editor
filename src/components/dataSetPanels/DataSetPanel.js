goog.provide('anychart.chartEditorModule.DataSetPanel');

goog.require('anychart.chartEditorModule.Component');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuButton');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.MenuSeparator');



/**
 * Uploaded dataset's panel with dataset's name and with 'remove' button.
 *
 * @param {Object} dataSet Data set object
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.DataSetPanel = function(dataSet, opt_domHelper) {
  anychart.chartEditorModule.DataSetPanel.base(this, 'constructor', opt_domHelper);

  this.disabled = false;
  this.dataSet_ = dataSet;

  this.addClassName('anychart-border-box');
  this.addClassName('anychart-connected-data-sets-item');
};
goog.inherits(anychart.chartEditorModule.DataSetPanel, anychart.chartEditorModule.Component);


/** @inheritDoc */
anychart.chartEditorModule.DataSetPanel.prototype.createDom = function() {
  anychart.chartEditorModule.DataSetPanel.base(this, 'createDom');

  var element = /** @type {Element} */(this.getElement());

  // region ----  menu and menu button
  var menu = new goog.ui.Menu();
  goog.array.forEach(['Preview', 'Remove'], function(label) {
    var item = new goog.ui.MenuItem(label);
    item.setDispatchTransitionEvents(goog.ui.Component.State.ALL, true);
    menu.addChild(item, true);
  }, this);
  this.menu_ = menu;

  var menuBtn = new goog.ui.MenuButton('...', menu);
  menuBtn.addClassName('anychart-connected-data-sets-item-menuBtn');
  menuBtn.setTooltip('Data Set Settings');
  menuBtn.setDispatchTransitionEvents(goog.ui.Component.State.ALL, true);
  goog.events.listen(menuBtn, goog.ui.Component.EventType.ACTION, function(e) {
    if (e.target.getCaption() === 'Remove') {
      this.removeDataSet();
    }
  }, false, this);

  this.addChild(menuBtn, true);
  // endregion

  // region ---- caption
  var caption = goog.dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-connected-data-sets-item-caption',
      this.dataSet_['title']
  );
  goog.dom.appendChild(element, caption);
  // endregion

  // region ---- fields
  if (goog.isArray(this.dataSet_.fields)) {
    for (var i = 0; i < this.dataSet_.fields.length; i++) {
      var field = goog.dom.createDom(
          goog.dom.TagName.DIV,
          'anychart-connected-data-sets-item-field',
          this.dataSet_.fields[i].name,
          goog.dom.createDom(
              goog.dom.TagName.SPAN,
              'anychart-connected-data-sets-item-token',
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
anychart.chartEditorModule.DataSetPanel.prototype.removeDataSet = function() {
  this.dispatchEvent({
    type: anychart.chartEditorModule.events.EventType.DATA_REMOVE,
    setId: this.dataSet_.setId,
    dataType: this.dataSet_.type,
    setFullId: this.dataSet_.setFullId
  });
};


/**
 * Getter for data set's full Id.
 * @return {string}
 */
anychart.chartEditorModule.DataSetPanel.prototype.getSetFullId = function() {
  return this.dataSet_.setFullId;
};


/**
 * @param {boolean} value
 */
anychart.chartEditorModule.DataSetPanel.prototype.setDisabled = function(value) {
  if (this.disabled !== value) {
    this.disabled = value;
    goog.dom.classlist.enable(this.getElement(), 'anychart-connected-data-sets-item-disabled', this.disabled);
  }
  for(var i = 0; i < this.menu_.getChildCount(); i++) {
    var menuItem = this.menu_.getChildAt(i);
    if (menuItem.getCaption() === 'Remove') {
      menuItem.setEnabled(this.disabled && this.dataSet_.type != anychart.chartEditorModule.EditorModel.DataType.GEO);
    }
  }
  // this.menuBtn_.setEnabled(this.disabled);
};


/**
 * @param {boolean} isActiveGeo
 */
anychart.chartEditorModule.DataSetPanel.prototype.setActiveGeo = function(isActiveGeo) {
  goog.dom.classlist.enable(this.getElement(), 'active-geo', isActiveGeo);
};


/** @inheritDoc */
anychart.chartEditorModule.DataSetPanel.prototype.disposeInternal = function() {
  this.menu_.dispose();
  this.menu_ = null;

  this.menuBtn_.dispose();
  this.menuBtn_ = null;

  anychart.chartEditorModule.DataSetPanel.base(this, 'disposeInternal');
};
