goog.provide('chartEditor.controls.select.DataFieldSelect');
goog.provide('chartEditor.controls.select.DataFieldSelectRenderer');

goog.require('chartEditor.controls.Menu');
goog.require('chartEditor.controls.select.Base');
goog.require('goog.ui.ButtonRenderer');


/**
 * @param {(string|Object)=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 * @constructor
 * @extends {chartEditor.controls.select.Base}
 */
chartEditor.controls.select.DataFieldSelect = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {

  /**
   * @type {goog.ui.MenuRenderer}
   * @private
   */
  this.cMenuRenderer_ = opt_menuRenderer || chartEditor.controls.MenuRenderer.getInstance();

  /**
   * @type {?goog.ui.Menu}
   * @private
   */
  this.cMenu_ = goog.isDef(opt_menu) ? opt_menu : null;

  /**
   * @type {string}
   */
  this.menuAdditionalClass = opt_menuAdditionalClass || '';

  chartEditor.controls.select.DataFieldSelect.base(
      this,
      'constructor',
      goog.isDef(opt_model) ?
          goog.isString(opt_model) ?
              opt_model :
              (opt_model.caption ? opt_model.caption : '') :
          ''
      ,
      opt_menu,
      opt_renderer || chartEditor.controls.select.DataFieldSelectRenderer.getInstance(),
      opt_domHelper,
      this.cMenuRenderer_
  );

  this.setModel(opt_model);
};
goog.inherits(chartEditor.controls.select.DataFieldSelect, chartEditor.controls.select.Base);


/** @inheritDoc */
chartEditor.controls.select.DataFieldSelect.prototype.handleMenuAction = function(e) {
  var item = /** @type {goog.ui.MenuItem} */ (e.target);
  if (item instanceof chartEditor.controls.select.DataFieldSelectMenuCaption) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    chartEditor.controls.select.DataFieldSelect.base(this, 'handleMenuAction', e);
  }
};


/** @inheritDoc */
chartEditor.controls.select.DataFieldSelect.prototype.getMenu = function() {
  if (!this.cMenu_) {
    this.cMenu_ = new chartEditor.controls.Menu(
        this.menuAdditionalClass,
        this.getDomHelper(),
        this.cMenuRenderer_
    );
    this.setMenu(this.cMenu_);
  }
  return this.cMenu_ || null;
};


// region ---- DataFieldSelectRenderer
/**
 * @constructor
 * @extends {goog.ui.ButtonRenderer}
 */
chartEditor.controls.select.DataFieldSelectRenderer = function() {
  goog.ui.ButtonRenderer.call(this);
};
goog.inherits(chartEditor.controls.select.DataFieldSelectRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(chartEditor.controls.select.DataFieldSelectRenderer);


/** @inheritDoc */
chartEditor.controls.select.DataFieldSelectRenderer.prototype.createDom = function(control) {
  return control.getDomHelper().createDom(goog.dom.TagName.DIV, this.getClassNames(control).join(' '), [
    control.getDomHelper().createDom(goog.dom.TagName.DIV, 'anychart-select-data-field-select-content', control.getContent()),
    control.getDomHelper().createDom(goog.dom.TagName.DIV, 'anychart-ui-select-indicator')
  ]);
};


/** @inheritDoc */
chartEditor.controls.select.DataFieldSelectRenderer.prototype.getContentElement = function(element) {
  if (element) {
    return goog.dom.getElementByClass('anychart-select-data-field-select-content', element);
  }
  return null;
};


/** @inheritDoc */
chartEditor.controls.select.DataFieldSelectRenderer.prototype.getCssClass = function() {
  return 'anychart-select-data-field-select';
};
// endregion
