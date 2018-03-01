goog.provide('anychart.chartEditorModule.select.ChartType');
goog.provide('anychart.chartEditorModule.select.ChartTypeRenderer');

goog.require('anychart.chartEditorModule.controls.chartType.Menu');
goog.require('anychart.chartEditorModule.controls.chartType.MenuRenderer');
goog.require('anychart.chartEditorModule.controls.select.Base');
goog.require('anychart.chartEditorModule.controls.select.MenuItem');
goog.require('goog.ui.ButtonRenderer');


/**
 * Select control for chart type.
 *
 * @param {goog.ui.ControlContent=} opt_caption Default caption or existing DOM
 *     structure to display as the button's caption when nothing is selected.
 *     Defaults to no caption.
 * @param {goog.ui.Menu=} opt_menu Menu containing selection options.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the control; defaults to {@link goog.ui.MenuButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer Renderer used to render or
 *     decorate the menu; defaults to {@link goog.ui.MenuRenderer}.
 * @constructor
 * @extends {anychart.chartEditorModule.controls.select.Base}
 */
anychart.chartEditorModule.select.ChartType = function(opt_caption, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer) {
  /**
   * @type {goog.ui.MenuRenderer}
   * @private
   */
  this.cMenuRenderer_ = opt_menuRenderer || anychart.chartEditorModule.controls.chartType.MenuRenderer.getInstance();

  /**
   * @type {(anychart.chartEditorModule.controls.chartType.Menu|undefined)}
   * @private
   */
  this.cMenu_ = /** @type {anychart.chartEditorModule.controls.chartType.Menu} */(opt_menu) || null;

  anychart.chartEditorModule.select.ChartType.base(this, 'constructor',
      opt_caption,
      this.cMenu_,
      opt_renderer || anychart.chartEditorModule.select.ChartTypeRenderer.getInstance(),
      opt_domHelper,
      this.cMenuRenderer_);
};
goog.inherits(anychart.chartEditorModule.select.ChartType, anychart.chartEditorModule.controls.select.Base);


/** @type {string} */
anychart.chartEditorModule.select.ChartType.CSS_CLASS = goog.getCssName('anychart-chart-editor-select-chart-type');

/** @inheritDoc */
anychart.chartEditorModule.select.ChartType.prototype.createDom = function() {
  anychart.chartEditorModule.select.ChartType.base(this, 'createDom');

  this.addClassName(anychart.chartEditorModule.select.ChartType.CSS_CLASS);

  // Chart Types
  var chartTypeOptions = goog.object.getValues(anychart.chartEditorModule.EditorModel.ChartTypes);
  for (var i = 0; i < chartTypeOptions.length; i++) {
    var chartTypeItem = new anychart.chartEditorModule.controls.select.MenuItem({
      caption: chartTypeOptions[i]['name'],
      value: chartTypeOptions[i]['value'],
      stackMode: chartTypeOptions[i]['stackMode'],
      icon: 'http://www.anychart.com/_design/img/upload/charts/types/' + chartTypeOptions[i]['icon'],
      filters: chartTypeOptions[i]['filters']
    });
    this.addItem(chartTypeItem);
  }
};


/** @inheritDoc */
anychart.chartEditorModule.select.ChartType.prototype.enterDocument = function() {
  anychart.chartEditorModule.select.ChartType.base(this, 'enterDocument');

  var renderer = /** @type {anychart.chartEditorModule.select.ChartTypeRenderer} */(this.getRenderer());
  renderer.updateIcon(this);
};


/** @inheritDoc */
anychart.chartEditorModule.select.ChartType.prototype.getMenu = function() {
  if (!this.cMenu_) {
    this.cMenu_ = new anychart.chartEditorModule.controls.chartType.Menu(
        this.getDomHelper(),
        this.cMenuRenderer_
    );
    this.setMenu(this.cMenu_);
  }
  return this.cMenu_ || null;
};

/** @inheritDoc */
anychart.chartEditorModule.select.ChartType.prototype.handleMenuAction = function(e) {
  anychart.chartEditorModule.select.ChartType.base(this, 'handleMenuAction', e);

  var renderer = /** @type {anychart.chartEditorModule.select.ChartTypeRenderer} */(this.getRenderer());
  renderer.updateIcon(this);
};


/** @override */
anychart.chartEditorModule.select.ChartType.prototype.handleBlur = function(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
};

// region ---- SelectWithIconRenderer
/**
 * @constructor
 * @extends {goog.ui.ButtonRenderer}
 */
anychart.chartEditorModule.select.ChartTypeRenderer = function() {
  goog.ui.ButtonRenderer.call(this);
};
goog.inherits(anychart.chartEditorModule.select.ChartTypeRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(anychart.chartEditorModule.select.ChartTypeRenderer);


/** @inheritDoc */
anychart.chartEditorModule.select.ChartTypeRenderer.prototype.createDom = function(control) {
  var dom = control.getDomHelper();

  var icon = dom.createDom(goog.dom.TagName.IMG);
  var element = dom.createDom(goog.dom.TagName.DIV, this.getClassNames(control).join(' '), [
    icon,
    dom.createDom(goog.dom.TagName.SPAN, '', control.getContent()),
    dom.createDom(goog.dom.TagName.DIV, 'anychart-ui-select-indicator')
  ]);

  var selectedItem = control.getSelectedItem();
  if (selectedItem) {
    var model = selectedItem.getModel();
    goog.dom.setProperties(icon, {'src': model.icon});
  } else {
    goog.style.setElementShown(icon, false);
  }

  return element;
};

/** @inheritDoc */
anychart.chartEditorModule.select.ChartTypeRenderer.prototype.getContentElement = function(element) {
  if (element) {
    return goog.dom.getElementsByTagName(goog.dom.TagName.SPAN, element)[0];
  }
  return null;
};

/** @param {anychart.chartEditorModule.select.ChartType} control */
anychart.chartEditorModule.select.ChartTypeRenderer.prototype.updateIcon = function(control) {
  var element = control.getElement();
  if (element) {
    var iconElement = goog.dom.getElementsByTagName(goog.dom.TagName.IMG, element)[0];
    var selectedItem = control.getSelectedItem();
    if (selectedItem) {
      var model = selectedItem.getModel();
      goog.dom.setProperties(iconElement, {'src': model.icon});
      if (iconElement) goog.style.setElementShown(iconElement, true);
    } else {
      if (iconElement) goog.style.setElementShown(iconElement, false);
    }
  }
};


/** @inheritDoc */
anychart.chartEditorModule.select.ChartTypeRenderer.prototype.getCssClass = function() {
  return 'anychart-ui-select-with-icon';
};
// endregion

