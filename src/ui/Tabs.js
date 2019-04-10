goog.provide('chartEditor.ui.Tabs');

goog.require('chartEditor.ui.Component');


/**
 * Tabs panel
 *
 * @param {chartEditor.model.Base} model
 * @param {chartEditor.ui.Component=} opt_buttonsWrapper
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.Tabs = function(model, opt_buttonsWrapper, opt_domHelper) {
  chartEditor.ui.Tabs.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  /**
   * This should be overridden in inheritors
   */
  this.descriptors = [
    // {
    //   name: 'theming',
    //   enabled: true,
    //   classFunc: chartEditor.ui.appearanceTabs.GeneralTheming,
    //   instance: null
    // }
  ];

  this.currentPanel = 0;

  this.buttons = [];

  this.buttonsWrapper_ = opt_buttonsWrapper;
};
goog.inherits(chartEditor.ui.Tabs, chartEditor.ui.Component);


/** @inheritDoc */
chartEditor.ui.Tabs.prototype.createDom = function() {
  chartEditor.ui.Tabs.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var dom = this.getDomHelper();

  if (!this.buttonsWrapper_) {
    this.buttonsWrapper_ = new chartEditor.ui.Component();
    this.buttonsWrapper_.addClassName('anychart-ce-tabs-buttons-wrapper');
    this.addChild(this.buttonsWrapper_, true);
  }

  this.buttonsEl_ = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-buttons');
  goog.dom.appendChild(this.buttonsWrapper_.getElement(), this.buttonsEl_);

  var tabContent = new chartEditor.ui.Component();
  tabContent.addClassName('anychart-ce-tabs-tab-content');
  this.addChild(tabContent, true);

  for (var i = 0; i < this.descriptors.length; i++) {
    var panel = /** @type {?chartEditor.ui.Panel} */(this.descriptors[i].instance);
    var classFunc = this.descriptors[i].classFunc;
    panel = this.descriptors[i].instance = new classFunc(model);

    tabContent.addChild(panel, true);

    // if (this.descriptors[i].docsUrl) {
    //   var descriptionHtml = goog.dom.createDom(
    //       goog.dom.TagName.A,
    //       {'href': this.descriptors[i].docsUrl, 'target': '_blank'},
    //       ' Read docs');
    //
    //   panel.addDescription(descriptionHtml);
    // }

    goog.dom.classlist.add(panel.getElement(), 'anychart-ce-panel-' + this.descriptors[i].name.toLowerCase());
    goog.dom.classlist.add(panel.getTopElement(), 'anychart-ce-section-caption');

    var button = dom.createDom(goog.dom.TagName.DIV, 'button', panel.getName());
    button.setAttribute('data-index', i);
    this.buttons.push(button);
    this.buttonsEl_.appendChild(button);
  }
};


/** @inheritDoc */
chartEditor.ui.Tabs.prototype.enterDocument = function() {
  chartEditor.ui.Tabs.base(this, 'enterDocument');

  for (var j = 0; j < this.buttons.length; j++) {
    var panel = this.descriptors[j].instance;
    var button = this.buttons[j];

    goog.dom.classlist.enable(button, 'active', this.currentPanel === j);
    goog.dom.classlist.enable(button, 'anychart-ce-hidden', panel.isExcluded());
    goog.dom.classlist.enable(panel.getElement(), 'anychart-ce-hidden', this.currentPanel !== j || panel.isExcluded());

    if (!goog.events.hasListener(button, goog.events.EventType.CLICK))
      this.getHandler().listen(button, goog.events.EventType.CLICK, this.onClickCategoryButton_);
  }
};


/**
 * Updates exclusion state of panel.
 */
chartEditor.ui.Tabs.prototype.updateExclusions = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var excludedPanels = model.getChartTypeSettings().excludedPanels;
  var firstNonExcludedPanel = null;

  for (var i = 0; i < this.descriptors.length; i++) {
    var panel = /** @type {chartEditor.ui.Panel} */(this.descriptors[i].instance);
    var panelId = panel.getStringId();
    if (!goog.isDef(this.descriptors[i].enabled))
      this.descriptors[i].enabled = true;

    var excluded = !this.descriptors[i].enabled || (excludedPanels && goog.array.indexOf(excludedPanels, panel.getStringId()) !== -1);
    panel.exclude(excluded);
    if (!excluded && goog.isNull(firstNonExcludedPanel))
      firstNonExcludedPanel = i;
    if (panelId === 'specific' && !excluded) {
      /** @type {chartEditor.ui.appearanceTabs.ChartSpecific} */(panel).updateSpecific();
      this.getDomHelper().setTextContent(this.buttons[i], /** @type {string} */(panel.getName()));
    }
  }

  if (this.descriptors[this.currentPanel] && !this.descriptors[this.currentPanel].excluded)
    this.currentPanel = firstNonExcludedPanel;
};


/**
 *
 * @param {Object} evt
 * @private
 */
chartEditor.ui.Tabs.prototype.onClickCategoryButton_ = function(evt) {
  var index = Number(evt.currentTarget.getAttribute('data-index'));
  if (this.currentPanel !== index) {
    this.currentPanel = index;

    for (var i = 0; i < this.descriptors.length; i++) {
      var panel = this.descriptors[i].instance;
      goog.dom.classlist.enable(panel.getElement(), 'anychart-ce-hidden', this.currentPanel !== i);
      goog.dom.classlist.enable(this.buttons[i], 'active', this.currentPanel === i);
    }
  }
};


/**
 * Update descriptors structure. For enablind/disabling panel from api.
 * @param {Object} values
 */
chartEditor.ui.Tabs.prototype.updateDescriptors = function(values) {
  for (var i = 0; i < this.descriptors.length; i++) {
    if (values[this.descriptors[i].name]) {
      this.descriptors[i].enabled = values[this.descriptors[i].name].enabled;
    }
  }
};


/**
 * @param {string} name
 * @return {?Object}
 */
chartEditor.ui.Tabs.prototype.getDescriptorByName_ = function(name) {
  var descriptor = null;
  for (var i = 0; i < this.descriptors.length; i++) {
    if (this.descriptors[i].name === name) {
      descriptor = this.descriptors[i];
      break;
    }
  }
  return descriptor;
};


/**
 * @param {string} name
 * @param {boolean} enabled
 */
chartEditor.ui.Tabs.prototype.enableTabByName = function(name, enabled) {
  var descriptor = this.getDescriptorByName_(name);
  if (descriptor && descriptor.enabled !== enabled) {
    descriptor.enabled = enabled;
    this.updateExclusions();
  }
};


/** @inheritDoc */
chartEditor.ui.Tabs.prototype.disposeInternal = function() {
  var tabsPanels = goog.array.map(this.descriptors, function(item){
    return item.instance;
  });
  goog.disposeAll(tabsPanels);

  goog.dispose(this.buttonsWrapper_);
  this.buttonsWrapper_ = null;

  goog.disposeAll(this.buttons);
  this.buttons.length = 0;
  this.descriptors.length = 0;
  this.buttonsEl_ = null;

  chartEditor.ui.Tabs.base(this, 'disposeInternal');
};
