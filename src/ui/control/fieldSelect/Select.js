goog.provide('chartEditor.ui.control.fieldSelect.Select');
goog.provide('chartEditor.ui.control.fieldSelect.SelectRenderer');

goog.require('chartEditor.ui.control.Menu');
goog.require('chartEditor.ui.control.select.Base');
goog.require('goog.ui.ButtonRenderer');


/**
 * @param {(string|Object)=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 * @constructor
 * @extends {chartEditor.ui.control.select.Base}
 */
chartEditor.ui.control.fieldSelect.Select = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {

  /**
   * @type {goog.ui.MenuRenderer}
   * @private
   */
  this.cMenuRenderer_ = opt_menuRenderer || chartEditor.ui.control.MenuRenderer.getInstance();

  /**
   * @type {?goog.ui.Menu}
   * @private
   */
  this.cMenu_ = goog.isDef(opt_menu) ? opt_menu : null;

  /**
   * @type {string}
   */
  this.menuAdditionalClass = opt_menuAdditionalClass || '';

  chartEditor.ui.control.fieldSelect.Select.base(
      this,
      'constructor',
      goog.isDef(opt_model) ?
          goog.isString(opt_model) ?
              opt_model :
              (opt_model.caption ? opt_model.caption : '') :
          ''
      ,
      opt_menu,
      opt_renderer || chartEditor.ui.control.fieldSelect.SelectRenderer.getInstance(),
      opt_domHelper,
      this.cMenuRenderer_
  );

  this.setModel(opt_model);
};
goog.inherits(chartEditor.ui.control.fieldSelect.Select, chartEditor.ui.control.select.Base);


/** @inheritDoc */
chartEditor.ui.control.fieldSelect.Select.prototype.handleMenuAction = function(e) {
  var item = /** @type {goog.ui.MenuItem} */ (e.target);
  if (item instanceof chartEditor.ui.control.fieldSelect.SelectMenuCaption) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    chartEditor.ui.control.fieldSelect.Select.base(this, 'handleMenuAction', e);
  }
};


/** @inheritDoc */
chartEditor.ui.control.fieldSelect.Select.prototype.getMenu = function() {
  if (!this.cMenu_) {
    this.cMenu_ = new chartEditor.ui.control.Menu(
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
chartEditor.ui.control.fieldSelect.SelectRenderer = function() {
  goog.ui.ButtonRenderer.call(this);
};
goog.inherits(chartEditor.ui.control.fieldSelect.SelectRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(chartEditor.ui.control.fieldSelect.SelectRenderer);


/** @inheritDoc */
chartEditor.ui.control.fieldSelect.SelectRenderer.prototype.createDom = function(control) {
  return control.getDomHelper().createDom(goog.dom.TagName.DIV, this.getClassNames(control).join(' '), [
    control.getDomHelper().createDom(goog.dom.TagName.DIV, 'anychart-ce-field-select-select-content', control.getContent()),
    control.getDomHelper().createDom(goog.dom.TagName.DIV, 'anychart-ui-select-indicator')
  ]);
};


/** @inheritDoc */
chartEditor.ui.control.fieldSelect.SelectRenderer.prototype.getContentElement = function(element) {
  if (element) {
    return goog.dom.getElementByClass('anychart-ce-field-select-select-content', element);
  }
  return null;
};


/** @inheritDoc */
chartEditor.ui.control.fieldSelect.SelectRenderer.prototype.getCssClass = function() {
  return 'anychart-ce-field-select-select';
};
// endregion
