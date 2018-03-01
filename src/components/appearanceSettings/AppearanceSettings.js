goog.provide('anychart.chartEditorModule.AppearanceSettings');

goog.require('anychart.chartEditorModule.ChartTitlePanel');
goog.require('anychart.chartEditorModule.CircularRangesPanel');
goog.require('anychart.chartEditorModule.ColorRangePanel');
goog.require('anychart.chartEditorModule.ColorScalePanel');
goog.require('anychart.chartEditorModule.Component');
goog.require('anychart.chartEditorModule.ContextMenuPanel');
goog.require('anychart.chartEditorModule.CreditsPanel');
goog.require('anychart.chartEditorModule.DataLabelsPanel');
goog.require('anychart.chartEditorModule.EditorModel');
goog.require('anychart.chartEditorModule.GaugeAxesPanel');
goog.require('anychart.chartEditorModule.GeneralTheming');
goog.require('anychart.chartEditorModule.GridsPanel');
goog.require('anychart.chartEditorModule.LegendPanel');
goog.require('anychart.chartEditorModule.PointersPanel');
goog.require('anychart.chartEditorModule.RadarPolarXAxisPanel');
goog.require('anychart.chartEditorModule.RadarPolarYAxisPanel');
goog.require('anychart.chartEditorModule.ScaleBarsPanel');
goog.require('anychart.chartEditorModule.SeriesSettingsPanel');
goog.require('anychart.chartEditorModule.SpecificPanel');
goog.require('anychart.chartEditorModule.TooltipPanel');
goog.require('anychart.chartEditorModule.XAxesPanel');
goog.require('anychart.chartEditorModule.YAxesPanel');


/**
 * Appearance settings widget.
 *
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {anychart.ui.Component} tabs
 * @param {anychart.ui.Component} tabContent
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.AppearanceSettings = function(model, tabs, tabContent, opt_domHelper) {
  anychart.chartEditorModule.AppearanceSettings.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  this.descriptors_ = [
    {
      name: 'GeneralTheming',
      enabled: true,
      classFunc: anychart.chartEditorModule.GeneralTheming,
      instance: null
    },
    {
      name: 'Specific',
      enabled: true,
      classFunc: anychart.chartEditorModule.SpecificPanel,
      instance: null
    },
    {
      name: 'ChartTitle',
      enabled: true,
      classFunc: anychart.chartEditorModule.ChartTitlePanel,
      instance: null
    },
    {
      name: 'Legend',
      enabled: true,
      classFunc: anychart.chartEditorModule.LegendPanel,
      instance: null
    },
    {
      name: 'DataLabels',
      enabled: true,
      classFunc: anychart.chartEditorModule.DataLabelsPanel,
      instance: null
    },
    {
      name: 'SeriesSettings',
      enabled: true,
      classFunc: anychart.chartEditorModule.SeriesSettingsPanel,
      instance: null
    },
    {
      name: 'Pointers',
      enabled: true,
      classFunc: anychart.chartEditorModule.PointersPanel,
      instance: null
    },
    {
      name: 'Ranges',
      enabled: true,
      classFunc: anychart.chartEditorModule.CircularRangesPanel,
      instance: null
    },
    {
      name: 'ScaleBars',
      enabled: true,
      classFunc: anychart.chartEditorModule.ScaleBarsPanel,
      instance: null
    },
    {
      name: 'CartesianXAxes',
      enabled: true,
      classFunc: anychart.chartEditorModule.XAxesPanel,
      instance: null
    },
    {
      name: 'CartesianYAxes',
      enabled: true,
      classFunc: anychart.chartEditorModule.YAxesPanel,
      instance: null
    },
    {
      name: 'RadarXAxes',
      enabled: true,
      classFunc: anychart.chartEditorModule.RadarPolarXAxisPanel,
      instance: null
    },
    {
      name: 'RadarYAxes',
      enabled: true,
      classFunc: anychart.chartEditorModule.RadarPolarYAxisPanel,
      instance: null
    },
    {
      name: 'gaugeAxes',
      enabled: true,
      classFunc: anychart.chartEditorModule.GaugeAxesPanel,
      instance: null
    },
    {
      name: 'Tooltip',
      enabled: true,
      classFunc: anychart.chartEditorModule.TooltipPanel,
      instance: null
    },
    {
      name: 'Grids',
      enabled: true,
      classFunc: anychart.chartEditorModule.GridsPanel,
      instance: null
    },
    {
      name: 'ColorScale',
      enabled: true,
      classFunc: anychart.chartEditorModule.ColorScalePanel,
      instance: null
    },
    {
      name: 'ColorRange',
      enabled: true,
      classFunc: anychart.chartEditorModule.ColorRangePanel,
      instance: null
    },
    {
      name: 'ContextMenu',
      enabled: true,
      classFunc: anychart.chartEditorModule.ContextMenuPanel,
      instance: null
    },
    {
      name: 'Credits',
      enabled: true,
      classFunc: anychart.chartEditorModule.CreditsPanel,
      instance: null
    }];

  this.currentPanel_ = 0;

  this.buttons_ = [];

  /**
   * @type {anychart.ui.Component}
   * @private
   */
  this.tabs_ = tabs;

  /**
   * @type {anychart.ui.Component}
   * @private
   */
  this.tabContent_ = tabContent;

  this.addClassName('anychart-appearance-settings');
};
goog.inherits(anychart.chartEditorModule.AppearanceSettings, anychart.chartEditorModule.Component);


/** @inheritDoc */
anychart.chartEditorModule.AppearanceSettings.prototype.createDom = function() {
  anychart.chartEditorModule.AppearanceSettings.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var dom = this.getDomHelper();

  this.buttonsWrapper_ = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-buttons-wrapper');
  goog.dom.appendChild(this.tabs_.getElement(), this.buttonsWrapper_);

  for (var i = 0; i < this.descriptors_.length; i++) {
    var panel = /** @type {?anychart.chartEditorModule.SettingsPanel} */(this.descriptors_[i].instance);
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
anychart.chartEditorModule.AppearanceSettings.prototype.enterDocument = function() {
  anychart.chartEditorModule.AppearanceSettings.base(this, 'enterDocument');

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
anychart.chartEditorModule.AppearanceSettings.prototype.updateExclusions = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var panelsExcludes = model.getChartTypeSettings()['panelsExcludes'];

  for (var i = 0; i < this.descriptors_.length; i++) {
    var panel = /** @type {?anychart.chartEditorModule.SettingsPanel} */(this.descriptors_[i].instance);
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
anychart.chartEditorModule.AppearanceSettings.prototype.onClickCategoryButton_ = function(evt) {
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
anychart.chartEditorModule.AppearanceSettings.prototype.updateDescriptors = function(values) {
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
anychart.chartEditorModule.AppearanceSettings.prototype.getDescriptorByName_ = function(name) {
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
anychart.chartEditorModule.AppearanceSettings.prototype.enablePanelByName = function(name, enabled) {
  var descriptor = this.getDescriptorByName_(name);
  if (descriptor && descriptor.enabled !== enabled) {
    descriptor.enabled = enabled;
    this.updateExclusions();
  }
};


/** @inheritDoc */
anychart.chartEditorModule.AppearanceSettings.prototype.disposeInternal = function() {
  this.descriptors_.length = 0;
  this.buttons_.length = 0;
  this.tabs_ = null;
  this.tabContent_ = null;
  this.buttonsWrapper_ = null;

  anychart.chartEditorModule.AppearanceSettings.base(this, 'disposeInternal');
};
