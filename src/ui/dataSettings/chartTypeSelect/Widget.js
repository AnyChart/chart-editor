goog.provide('chartEditor.ui.dataSettings.chartTypeSelect.Widget');
goog.provide('chartEditor.ui.dataSettings.chartTypeSelect.WidgetRenderer');

goog.require('chartEditor.ui.control.select.Base');
goog.require('chartEditor.ui.control.select.MenuItem');
goog.require('chartEditor.ui.dataSettings.chartTypeSelect.Menu');
goog.require('chartEditor.ui.dataSettings.chartTypeSelect.MenuRenderer');
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
 * @extends {chartEditor.ui.control.select.Base}
 */
chartEditor.ui.dataSettings.chartTypeSelect.Widget = function(opt_caption, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer) {
  /**
   * @type {goog.ui.MenuRenderer}
   * @private
   */
  this.cMenuRenderer_ = opt_menuRenderer || chartEditor.ui.dataSettings.chartTypeSelect.MenuRenderer.getInstance();

  /**
   * @type {(chartEditor.ui.dataSettings.chartTypeSelect.Menu|undefined)}
   * @private
   */
  this.cMenu_ = /** @type {chartEditor.ui.dataSettings.chartTypeSelect.Menu} */(opt_menu) || null;

  chartEditor.ui.dataSettings.chartTypeSelect.Widget.base(this, 'constructor',
      opt_caption,
      this.cMenu_,
      opt_renderer || chartEditor.ui.dataSettings.chartTypeSelect.WidgetRenderer.getInstance(),
      opt_domHelper,
      this.cMenuRenderer_);
};
goog.inherits(chartEditor.ui.dataSettings.chartTypeSelect.Widget, chartEditor.ui.control.select.Base);


/** @type {string} */
chartEditor.ui.dataSettings.chartTypeSelect.Widget.CSS_CLASS = goog.getCssName('anychart-ce-select-chart-type');

/** @inheritDoc */
chartEditor.ui.dataSettings.chartTypeSelect.Widget.prototype.createDom = function() {
  chartEditor.ui.dataSettings.chartTypeSelect.Widget.base(this, 'createDom');

  this.addClassName(chartEditor.ui.dataSettings.chartTypeSelect.Widget.CSS_CLASS);

  var unavailableItemClass = goog.getCssName('anychart-ce-menuitem-unavailable');

  // Chart Types
  var chartTypeOptions = goog.object.getValues(chartEditor.model.ChartTypes);
  var enabledItemCount = 0;

  for (var i = 0; i < chartTypeOptions.length; i++) {
    var itemUnavailable = chartTypeOptions[i].product != chartEditor.PRODUCT || !(chartEditor.PRODUCT == chartEditor.model.Product.BUNDLE);
    var item = new chartEditor.ui.control.select.MenuItem({
      caption: chartTypeOptions[i]['name'],
      value: chartTypeOptions[i]['value'],
      stackMode: chartTypeOptions[i]['stackMode'],
      icon: 'https://cdn.anychart.com/anydata/editor/icons/' + chartTypeOptions[i]['icon'],
      filters: chartTypeOptions[i].filters,
      product: chartTypeOptions[i].product,
      unavailable: itemUnavailable
    });
    if (itemUnavailable) {
      this.addItem(item);
      item.addClassName(unavailableItemClass);
    } else
      this.addItemAt(item, enabledItemCount++);
  }
};


/** @inheritDoc */
chartEditor.ui.dataSettings.chartTypeSelect.Widget.prototype.enterDocument = function() {
  chartEditor.ui.dataSettings.chartTypeSelect.Widget.base(this, 'enterDocument');

  var renderer = /** @type {chartEditor.ui.dataSettings.chartTypeSelect.WidgetRenderer} */(this.getRenderer());
  renderer.updateIcon(this);
};


/** @inheritDoc */
chartEditor.ui.dataSettings.chartTypeSelect.Widget.prototype.getMenu = function() {
  if (!this.cMenu_) {
    this.cMenu_ = new chartEditor.ui.dataSettings.chartTypeSelect.Menu(
        this.getDomHelper(),
        this.cMenuRenderer_
    );
    this.setMenu(this.cMenu_);
  }
  return this.cMenu_ || null;
};

/** @inheritDoc */
chartEditor.ui.dataSettings.chartTypeSelect.Widget.prototype.handleMenuAction = function(e) {
  chartEditor.ui.dataSettings.chartTypeSelect.Widget.base(this, 'handleMenuAction', e);

  var renderer = /** @type {chartEditor.ui.dataSettings.chartTypeSelect.WidgetRenderer} */(this.getRenderer());
  renderer.updateIcon(this);
};


/** @override */
chartEditor.ui.dataSettings.chartTypeSelect.Widget.prototype.handleBlur = function(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
};


/**
 * @inheritDoc
 */
chartEditor.ui.dataSettings.chartTypeSelect.Widget.prototype.init = function(model, key, opt_callback, opt_noRebuild) {
  chartEditor.ui.dataSettings.chartTypeSelect.Widget.base(this, 'init', model, key, opt_callback, opt_noRebuild);
  this.setEnabled(!goog.isDefAndNotNull(model.lockedChartType));
  this.addClassName('anychart-ce-select-chart-type-locked');
};

// region ---- SelectWithIconRenderer
/**
 * @constructor
 * @extends {goog.ui.ButtonRenderer}
 */
chartEditor.ui.dataSettings.chartTypeSelect.WidgetRenderer = function() {
  goog.ui.ButtonRenderer.call(this);
};
goog.inherits(chartEditor.ui.dataSettings.chartTypeSelect.WidgetRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(chartEditor.ui.dataSettings.chartTypeSelect.WidgetRenderer);


/** @inheritDoc */
chartEditor.ui.dataSettings.chartTypeSelect.WidgetRenderer.prototype.createDom = function(control) {
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
chartEditor.ui.dataSettings.chartTypeSelect.WidgetRenderer.prototype.getContentElement = function(element) {
  if (element) {
    return goog.dom.getElementsByTagName(goog.dom.TagName.SPAN, element)[0];
  }
  return null;
};

/** @param {chartEditor.ui.dataSettings.chartTypeSelect.Widget} control */
chartEditor.ui.dataSettings.chartTypeSelect.WidgetRenderer.prototype.updateIcon = function(control) {
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
chartEditor.ui.dataSettings.chartTypeSelect.WidgetRenderer.prototype.getCssClass = function() {
  return 'anychart-ui-select-with-icon';
};
// endregion

