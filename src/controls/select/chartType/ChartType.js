goog.provide('chartEditor.select.ChartType');
goog.provide('chartEditor.select.ChartTypeRenderer');

goog.require('chartEditor.controls.chartType.Menu');
goog.require('chartEditor.controls.chartType.MenuRenderer');
goog.require('chartEditor.controls.select.Base');
goog.require('chartEditor.controls.select.MenuItem');
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
 * @extends {chartEditor.controls.select.Base}
 */
chartEditor.select.ChartType = function(opt_caption, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer) {
  /**
   * @type {goog.ui.MenuRenderer}
   * @private
   */
  this.cMenuRenderer_ = opt_menuRenderer || chartEditor.controls.chartType.MenuRenderer.getInstance();

  /**
   * @type {(chartEditor.controls.chartType.Menu|undefined)}
   * @private
   */
  this.cMenu_ = /** @type {chartEditor.controls.chartType.Menu} */(opt_menu) || null;

  chartEditor.select.ChartType.base(this, 'constructor',
      opt_caption,
      this.cMenu_,
      opt_renderer || chartEditor.select.ChartTypeRenderer.getInstance(),
      opt_domHelper,
      this.cMenuRenderer_);
};
goog.inherits(chartEditor.select.ChartType, chartEditor.controls.select.Base);


/** @type {string} */
chartEditor.select.ChartType.CSS_CLASS = goog.getCssName('anychart-chart-editor-select-chart-type');

/** @inheritDoc */
chartEditor.select.ChartType.prototype.createDom = function() {
  chartEditor.select.ChartType.base(this, 'createDom');

  this.addClassName(chartEditor.select.ChartType.CSS_CLASS);

  // Chart Types
  var chartTypeOptions = goog.object.getValues(chartEditor.EditorModel.ChartTypes);
  for (var i = 0; i < chartTypeOptions.length; i++) {
    var chartTypeItem = new chartEditor.controls.select.MenuItem({
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
chartEditor.select.ChartType.prototype.enterDocument = function() {
  chartEditor.select.ChartType.base(this, 'enterDocument');

  var renderer = /** @type {chartEditor.select.ChartTypeRenderer} */(this.getRenderer());
  renderer.updateIcon(this);
};


/** @inheritDoc */
chartEditor.select.ChartType.prototype.getMenu = function() {
  if (!this.cMenu_) {
    this.cMenu_ = new chartEditor.controls.chartType.Menu(
        this.getDomHelper(),
        this.cMenuRenderer_
    );
    this.setMenu(this.cMenu_);
  }
  return this.cMenu_ || null;
};

/** @inheritDoc */
chartEditor.select.ChartType.prototype.handleMenuAction = function(e) {
  chartEditor.select.ChartType.base(this, 'handleMenuAction', e);

  var renderer = /** @type {chartEditor.select.ChartTypeRenderer} */(this.getRenderer());
  renderer.updateIcon(this);
};


/** @override */
chartEditor.select.ChartType.prototype.handleBlur = function(e) {
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
chartEditor.select.ChartTypeRenderer = function() {
  goog.ui.ButtonRenderer.call(this);
};
goog.inherits(chartEditor.select.ChartTypeRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(chartEditor.select.ChartTypeRenderer);


/** @inheritDoc */
chartEditor.select.ChartTypeRenderer.prototype.createDom = function(control) {
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
chartEditor.select.ChartTypeRenderer.prototype.getContentElement = function(element) {
  if (element) {
    return goog.dom.getElementsByTagName(goog.dom.TagName.SPAN, element)[0];
  }
  return null;
};

/** @param {chartEditor.select.ChartType} control */
chartEditor.select.ChartTypeRenderer.prototype.updateIcon = function(control) {
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
chartEditor.select.ChartTypeRenderer.prototype.getCssClass = function() {
  return 'anychart-ui-select-with-icon';
};
// endregion

