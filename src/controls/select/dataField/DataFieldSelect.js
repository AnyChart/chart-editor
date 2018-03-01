goog.provide('anychart.chartEditorModule.controls.select.DataFieldSelect');
goog.provide('anychart.chartEditorModule.controls.select.DataFieldSelectRenderer');

goog.require('anychart.chartEditorModule.controls.Menu');
goog.require('anychart.chartEditorModule.controls.select.Base');
goog.require('goog.ui.ButtonRenderer');


/**
 * @param {(string|Object)=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 * @constructor
 * @extends {anychart.chartEditorModule.controls.select.Base}
 */
anychart.chartEditorModule.controls.select.DataFieldSelect = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {

  /**
   * @type {goog.ui.MenuRenderer}
   * @private
   */
  this.cMenuRenderer_ = opt_menuRenderer || anychart.chartEditorModule.controls.MenuRenderer.getInstance();

  /**
   * @type {?goog.ui.Menu}
   * @private
   */
  this.cMenu_ = goog.isDef(opt_menu) ? opt_menu : null;

  /**
   * @type {string}
   */
  this.menuAdditionalClass = opt_menuAdditionalClass || '';

  anychart.chartEditorModule.controls.select.DataFieldSelect.base(
      this,
      'constructor',
      goog.isDef(opt_model) ?
          goog.isString(opt_model) ?
              opt_model :
              (opt_model.caption ? opt_model.caption : '') :
          ''
      ,
      opt_menu,
      opt_renderer || anychart.chartEditorModule.controls.select.DataFieldSelectRenderer.getInstance(),
      opt_domHelper,
      this.cMenuRenderer_
  );

  this.setModel(opt_model);
};
goog.inherits(anychart.chartEditorModule.controls.select.DataFieldSelect, anychart.chartEditorModule.controls.select.Base);


/** @inheritDoc */
anychart.chartEditorModule.controls.select.DataFieldSelect.prototype.handleMenuAction = function(e) {
  var item = /** @type {goog.ui.MenuItem} */ (e.target);
  if (item instanceof anychart.chartEditorModule.controls.select.DataFieldSelectMenuCaption) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    anychart.chartEditorModule.controls.select.DataFieldSelect.base(this, 'handleMenuAction', e);
  }
};


/** @inheritDoc */
anychart.chartEditorModule.controls.select.DataFieldSelect.prototype.getMenu = function() {
  if (!this.cMenu_) {
    this.cMenu_ = new anychart.chartEditorModule.controls.Menu(
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
anychart.chartEditorModule.controls.select.DataFieldSelectRenderer = function() {
  goog.ui.ButtonRenderer.call(this);
};
goog.inherits(anychart.chartEditorModule.controls.select.DataFieldSelectRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(anychart.chartEditorModule.controls.select.DataFieldSelectRenderer);


/** @inheritDoc */
anychart.chartEditorModule.controls.select.DataFieldSelectRenderer.prototype.createDom = function(control) {
  return control.getDomHelper().createDom(goog.dom.TagName.DIV, this.getClassNames(control).join(' '), [
    control.getDomHelper().createDom(goog.dom.TagName.DIV, 'anychart-select-data-field-select-content', control.getContent()),
    control.getDomHelper().createDom(goog.dom.TagName.DIV, 'anychart-ui-select-indicator')
  ]);
};


/** @inheritDoc */
anychart.chartEditorModule.controls.select.DataFieldSelectRenderer.prototype.getContentElement = function(element) {
  if (element) {
    return goog.dom.getElementByClass('anychart-select-data-field-select-content', element);
  }
  return null;
};


/** @inheritDoc */
anychart.chartEditorModule.controls.select.DataFieldSelectRenderer.prototype.getCssClass = function() {
  return 'anychart-select-data-field-select';
};
// endregion
