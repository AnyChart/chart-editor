goog.provide('chartEditor.Tabs');

goog.require('chartEditor.Component');


/**
 * Tabs panels
 *
 * @param {chartEditor.EditorModel} model
 * @param {chartEditor.Component} tabs
 * @param {chartEditor.Component} tabContent
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.Tabs = function(model, tabs, tabContent, opt_domHelper) {
  chartEditor.Tabs.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  /**
   * This should be overridden in inheritors
   */
  this.descriptors = [
    // {
    //   name: 'GeneralTheming',
    //   enabled: true,
    //   classFunc: chartEditor.GeneralTheming,
    //   instance: null
    // }
  ];

  this.currentPanel = 0;

  this.buttons = [];

  /**
   * @type {chartEditor.Component}
   * @private
   */
  this.tabs = tabs;

  /**
   * @type {chartEditor.Component}
   * @private
   */
  this.tabContent = tabContent;
};
goog.inherits(chartEditor.Tabs, chartEditor.Component);


/** @inheritDoc */
chartEditor.Tabs.prototype.createDom = function() {
  chartEditor.Tabs.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var dom = this.getDomHelper();

  this.buttonsWrapper_ = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-buttons-wrapper');
  goog.dom.appendChild(this.tabs.getElement(), this.buttonsWrapper_);

  for (var i = 0; i < this.descriptors.length; i++) {
    var panel = /** @type {?chartEditor.SettingsPanel} */(this.descriptors[i].instance);
    var classFunc = this.descriptors[i].classFunc;
    panel = this.descriptors[i].instance = new classFunc(model);

    this.tabContent.addChild(panel, true);
    goog.dom.classlist.add(panel.getElement(), 'anychart-ce-settings-panel-' + this.descriptors[i].name.toLowerCase());
    goog.dom.classlist.add(panel.getTopElement(), 'anychart-ce-section-caption');

    var button = dom.createDom(goog.dom.TagName.DIV, 'button', panel.getName());
    button.setAttribute('data-index', i);
    this.buttons.push(button);
    this.buttonsWrapper_.appendChild(button);
  }
};


/** @inheritDoc */
chartEditor.Tabs.prototype.enterDocument = function() {
  chartEditor.Tabs.base(this, 'enterDocument');

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
 * Updates exclusion state of panels.
 */
chartEditor.Tabs.prototype.updateExclusions = function() {
  // Override me
};


/**
 *
 * @param {Object} evt
 * @private
 */
chartEditor.Tabs.prototype.onClickCategoryButton_ = function(evt) {
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
 * Update descriptors structure. For enablind/disabling panels from api.
 * @param {Object} values
 */
chartEditor.Tabs.prototype.updateDescriptors = function(values) {
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
chartEditor.Tabs.prototype.getDescriptorByName_ = function(name) {
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
chartEditor.Tabs.prototype.enablePanelByName = function(name, enabled) {
  var descriptor = this.getDescriptorByName_(name);
  if (descriptor && descriptor.enabled !== enabled) {
    descriptor.enabled = enabled;
    this.updateExclusions();
  }
};


/** @inheritDoc */
chartEditor.Tabs.prototype.disposeInternal = function() {
  goog.disposeAll([this.tabs, this.tabContent, this.buttonsWrapper_]);

  this.tabs = null;
  this.tabContent = null;
  this.buttonsWrapper_ = null;

  this.descriptors.length = 0;
  this.buttons.length = 0;

  chartEditor.Tabs.base(this, 'disposeInternal');
};
