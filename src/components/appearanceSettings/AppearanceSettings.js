goog.provide('chartEditor.AppearanceSettings');

goog.require('chartEditor.ChartTitlePanel');
goog.require('chartEditor.CircularRangesPanel');
goog.require('chartEditor.ColorRangePanel');
goog.require('chartEditor.ColorScalePanel');
goog.require('chartEditor.Component');
goog.require('chartEditor.ContextMenuPanel');
goog.require('chartEditor.CreditsPanel');
goog.require('chartEditor.DataLabelsPanel');
goog.require('chartEditor.EditorModel');
goog.require('chartEditor.GaugeAxesPanel');
goog.require('chartEditor.GeneralTheming');
goog.require('chartEditor.GridsPanel');
goog.require('chartEditor.LegendPanel');
goog.require('chartEditor.PointersPanel');
goog.require('chartEditor.RadarPolarXAxisPanel');
goog.require('chartEditor.RadarPolarYAxisPanel');
goog.require('chartEditor.ScaleBarsPanel');
goog.require('chartEditor.SeriesSettingsPanel');
goog.require('chartEditor.SpecificPanel');
goog.require('chartEditor.TooltipPanel');
goog.require('chartEditor.XAxesPanel');
goog.require('chartEditor.YAxesPanel');


/**
 * Appearance settings widget.
 *
 * @param {chartEditor.EditorModel} model
 * @param {chartEditor.Component} tabs
 * @param {chartEditor.Component} tabContent
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.AppearanceSettings = function(model, tabs, tabContent, opt_domHelper) {
  chartEditor.AppearanceSettings.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  this.descriptors_ = [
    {
      name: 'GeneralTheming',
      enabled: true,
      classFunc: chartEditor.GeneralTheming,
      instance: null
    },
    {
      name: 'Specific',
      enabled: true,
      classFunc: chartEditor.SpecificPanel,
      instance: null
    },
    {
      name: 'ChartTitle',
      enabled: true,
      classFunc: chartEditor.ChartTitlePanel,
      instance: null
    },
    {
      name: 'Legend',
      enabled: true,
      classFunc: chartEditor.LegendPanel,
      instance: null
    },
    {
      name: 'DataLabels',
      enabled: true,
      classFunc: chartEditor.DataLabelsPanel,
      instance: null
    },
    {
      name: 'SeriesSettings',
      enabled: true,
      classFunc: chartEditor.SeriesSettingsPanel,
      instance: null
    },
    {
      name: 'Pointers',
      enabled: true,
      classFunc: chartEditor.PointersPanel,
      instance: null
    },
    {
      name: 'Ranges',
      enabled: true,
      classFunc: chartEditor.CircularRangesPanel,
      instance: null
    },
    {
      name: 'ScaleBars',
      enabled: true,
      classFunc: chartEditor.ScaleBarsPanel,
      instance: null
    },
    {
      name: 'CartesianXAxes',
      enabled: true,
      classFunc: chartEditor.XAxesPanel,
      instance: null
    },
    {
      name: 'CartesianYAxes',
      enabled: true,
      classFunc: chartEditor.YAxesPanel,
      instance: null
    },
    {
      name: 'RadarXAxes',
      enabled: true,
      classFunc: chartEditor.RadarPolarXAxisPanel,
      instance: null
    },
    {
      name: 'RadarYAxes',
      enabled: true,
      classFunc: chartEditor.RadarPolarYAxisPanel,
      instance: null
    },
    {
      name: 'gaugeAxes',
      enabled: true,
      classFunc: chartEditor.GaugeAxesPanel,
      instance: null
    },
    {
      name: 'Tooltip',
      enabled: true,
      classFunc: chartEditor.TooltipPanel,
      instance: null
    },
    // {
    //   name: 'Grids',
    //   enabled: true,
    //   classFunc: chartEditor.GridsPanel,
    //   instance: null
    // },
    {
      name: 'ColorScale',
      enabled: true,
      classFunc: chartEditor.ColorScalePanel,
      instance: null
    },
    {
      name: 'ColorRange',
      enabled: true,
      classFunc: chartEditor.ColorRangePanel,
      instance: null
    },
    {
      name: 'ContextMenu',
      enabled: true,
      classFunc: chartEditor.ContextMenuPanel,
      instance: null
    }//,
    // {
    //   name: 'Credits',
    //   enabled: true,
    //   classFunc: chartEditor.CreditsPanel,
    //   instance: null
    // }
    ];

  this.currentPanel_ = 0;

  this.buttons_ = [];

  /**
   * @type {chartEditor.Component}
   * @private
   */
  this.tabs_ = tabs;

  /**
   * @type {chartEditor.Component}
   * @private
   */
  this.tabContent_ = tabContent;

  this.addClassName('anychart-appearance-settings');
};
goog.inherits(chartEditor.AppearanceSettings, chartEditor.Component);


/** @inheritDoc */
chartEditor.AppearanceSettings.prototype.createDom = function() {
  chartEditor.AppearanceSettings.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var dom = this.getDomHelper();

  this.buttonsWrapper_ = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-buttons-wrapper');
  goog.dom.appendChild(this.tabs_.getElement(), this.buttonsWrapper_);

  for (var i = 0; i < this.descriptors_.length; i++) {
    var panel = /** @type {?chartEditor.SettingsPanel} */(this.descriptors_[i].instance);
    var classFunc = this.descriptors_[i].classFunc;
    panel = this.descriptors_[i].instance = new classFunc(model);

    this.tabContent_.addChild(panel, true);
    goog.dom.classlist.add(panel.getElement(), 'anychart-settings-panel-' + this.descriptors_[i].name.toLowerCase());
    goog.dom.classlist.add(panel.getTopElement(), 'anychart-chart-editor-section-caption');

    var button = dom.createDom(goog.dom.TagName.DIV, 'button', panel.getName());
    button.setAttribute('data-index', i);
    this.buttons_.push(button);
    this.buttonsWrapper_.appendChild(button);
  }
};


/** @inheritDoc */
chartEditor.AppearanceSettings.prototype.enterDocument = function() {
  chartEditor.AppearanceSettings.base(this, 'enterDocument');

  for (var j = 0; j < this.buttons_.length; j++) {
    var panel = this.descriptors_[j].instance;
    var button = this.buttons_[j];

    goog.dom.classlist.enable(button, 'active', this.currentPanel_ === j);
    goog.dom.classlist.enable(button, 'anychart-hidden', panel.isExcluded());
    goog.dom.classlist.enable(panel.getElement(), 'anychart-hidden', this.currentPanel_ !== j || panel.isExcluded());

    if (!goog.events.hasListener(button, goog.events.EventType.CLICK))
      this.getHandler().listen(button, goog.events.EventType.CLICK, this.onClickCategoryButton_);
  }
};


/**
 * Updates exclusion state of panels.
 */
chartEditor.AppearanceSettings.prototype.updateExclusions = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var panelsExcludes = model.getChartTypeSettings()['panelsExcludes'];

  for (var i = 0; i < this.descriptors_.length; i++) {
    var panel = /** @type {?chartEditor.SettingsPanel} */(this.descriptors_[i].instance);
    var excluded;

    if (this.descriptors_[i].name === 'Specific') {
      panel.updateSpecific();
      excluded = panel.isExcluded();
      if (!excluded)
        this.getDomHelper().setTextContent(this.buttons_[i], /** @type {string} */(panel.getName()));

    } else {
      excluded = !this.descriptors_[i].enabled || panelsExcludes && goog.array.indexOf(panelsExcludes, panel.getStringId()) !== -1;
      panel.exclude(excluded);
    }

    if (excluded && this.currentPanel_ === i)
      this.currentPanel_ = 0;
  }
};


/**
 *
 * @param {Object} evt
 * @private
 */
chartEditor.AppearanceSettings.prototype.onClickCategoryButton_ = function(evt) {
  var index = Number(evt.currentTarget.getAttribute('data-index'));
  if (this.currentPanel_ !== index) {
    this.currentPanel_ = index;

    for (var i = 0; i < this.descriptors_.length; i++) {
      var panel = this.descriptors_[i].instance;
      goog.dom.classlist.enable(panel.getElement(), 'anychart-hidden', this.currentPanel_ !== i);
      goog.dom.classlist.enable(this.buttons_[i], 'active', this.currentPanel_ === i);
    }
  }
};


/**
 * Update descriptors structure. For enablind/disabling panels from api.
 * @param {Object} values
 */
chartEditor.AppearanceSettings.prototype.updateDescriptors = function(values) {
  for (var i = 0; i < this.descriptors_.length; i++) {
    if (values[this.descriptors_[i].name]) {
      this.descriptors_[i].enabled = values[this.descriptors_[i].name].enabled;
    }
  }
};


/**
 * @param {string} name
 * @return {?Object}
 */
chartEditor.AppearanceSettings.prototype.getDescriptorByName_ = function(name) {
  var descriptor = null;
  for (var i = 0; i < this.descriptors_.length; i++) {
    if (this.descriptors_[i].name === name) {
      descriptor = this.descriptors_[i];
      break;
    }
  }
  return descriptor;
};


/**
 * @param {string} name
 * @param {boolean} enabled
 */
chartEditor.AppearanceSettings.prototype.enablePanelByName = function(name, enabled) {
  var descriptor = this.getDescriptorByName_(name);
  if (descriptor && descriptor.enabled !== enabled) {
    descriptor.enabled = enabled;
    this.updateExclusions();
  }
};


/** @inheritDoc */
chartEditor.AppearanceSettings.prototype.disposeInternal = function() {
  this.descriptors_.length = 0;
  this.buttons_.length = 0;
  this.tabs_ = null;
  this.tabContent_ = null;
  this.buttonsWrapper_ = null;

  chartEditor.AppearanceSettings.base(this, 'disposeInternal');
};
