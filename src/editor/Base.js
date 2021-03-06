goog.provide('chartEditor.editor.Base');
goog.provide('chartEditor.editor.Base.Dialog');

goog.require('chartEditor.events');
goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.Preloader');
goog.require('chartEditor.ui.breadcrumbs.Breadcrumbs');
goog.require('chartEditor.ui.dialog.Base');
goog.require('chartEditor.ui.dialog.Confirm');
goog.require('chartEditor.ui.steps.Widget');
goog.require('goog.Uri');
goog.require('goog.net.ImageLoader');
goog.require('goog.net.XhrIo');



/**
 * Chart Editor application Component Class.
 *
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @extends {chartEditor.ui.Component}
 */
chartEditor.editor.Base = function (opt_domHelper, opt_lockedChartType) {
  chartEditor.editor.Base.base(this, 'constructor', opt_domHelper);

  /**
   * @type {?chartEditor.ui.dialog.Base}
   * @private
   */
  this.dialog_ = null;

  /**
   * Locked chart type.
   * TODO (A.Kudryavtsev): Do we need default for chartEditor.enums.normalizeChartType(value, opt_default)?
   * @type {chartEditor.enums.ChartType|undefined}
   */
  this.lockedChartType = goog.isDefAndNotNull(opt_lockedChartType) ?
    chartEditor.enums.normalizeChartType(opt_lockedChartType) :
    void 0;

  this.imagesLoaded_ = true;
  this.preloader_ = new chartEditor.ui.Preloader();
  this.waitQueue_ = 0;

  /**
   * @type {chartEditor.ui.steps.Widget}
   * @private
   */
  this.steps_ = new chartEditor.ui.steps.Widget();

  /**
   * @type {chartEditor.ui.breadcrumbs.Breadcrumbs}
   * @private
   */
  this.breadcrumbs_ = null;

  // var imageLoader = new goog.net.ImageLoader();
  // this.registerDisposable(imageLoader);
  // goog.events.listen(imageLoader, goog.net.EventType.COMPLETE, function() {
  //   this.imagesLoaded_ = true;
  //   this.preloader_.visible(false);
  // }, false, this);
  // goog.array.forEach(this.sharedModel_.presetsList, function(category) {
  //   goog.array.forEach(category.list, function(chart) {
  //     imageLoader.addImage(chart.type, 'https://cdn.anychart.com/images/chartopedia/' + chart.image);
  //   });
  // });
  // imageLoader.start();

  goog.events.listen(this, chartEditor.ui.breadcrumbs.Breadcrumbs.EventType.CANCEL, this.onCancel_, false, this);
  goog.events.listen(this, chartEditor.ui.breadcrumbs.Breadcrumbs.EventType.COMPLETE, this.onComplete_, false, this);

  this.listen(chartEditor.events.EventType.DATA_ADD, this.onDataAdd_);
  this.listen(chartEditor.events.EventType.DATA_REMOVE, this.onDataRemove_);
  this.listen(chartEditor.events.EventType.WAIT, this.onWait_);

  this.addClassName(chartEditor.editor.Base.CSS_CLASS);
};
goog.inherits(chartEditor.editor.Base, chartEditor.ui.Component);


chartEditor.editor.Base.CSS_CLASS = goog.getCssName('anychart-ce');


/**
 * Chart editor statistics service url
 * @type {string}
 */
chartEditor.editor.Base.CLOUD_URL = 'https://static.anychart.com/ce-cloud/';


/**
 * Current version of the Editor.
 * @define {string} Replaced on compile time.
 */
chartEditor.editor.Base.VERSION = '';


/**
 * @inheritDoc
 */
chartEditor.editor.Base.prototype.setModel = function (model) {
  model.lockedChartType = this.lockedChartType;
  chartEditor.editor.Base.base(this, 'setModel', model);
};


/**
 * @return {string} Current editor version
 */
chartEditor.editor.Base.prototype.version = function () {
  return chartEditor.editor.Base.VERSION;
};


/**
 * Set specific settings for using editor in different plugins
 * @param {string} value
 */
chartEditor.editor.Base.prototype.pluginMode = function(value) {
  this.getModel().setValue([['editorSettings'], 'pluginMode'], value);
  switch (value) {
    case 'freeboard':
      chartEditor.model.Scales.CARTESIAN[0]['type'] = 'date-time';
  }
};


/** @inheritDoc */
chartEditor.editor.Base.prototype.render = function (opt_parentElement) {
  chartEditor.editor.Base.base(this, 'render', opt_parentElement);
  this.waitForImages_();
  this.dispatchEvent('editorshow');
};


/** @inheritDoc */
chartEditor.editor.Base.prototype.decorate = function (element) {
  chartEditor.editor.Base.base(this, 'decorate', element);
  this.waitForImages_();
  this.dispatchEvent('editorshow');
};


/**
 * @return {?string|undefined}
 */
chartEditor.editor.Base.prototype.getTheme = function () {
  return chartEditor.model.Base.SOLUTION;
};


/**
 * Renders the Chart Editor as modal dialog.
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to 'anychart-ce-dialog'.
 *     This should be a single, valid CSS class name.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 */
chartEditor.editor.Base.prototype.dialogRender = function (opt_class, opt_useIframeMask, opt_domHelper) {
  this.dialog_ = new chartEditor.editor.Base.Dialog(goog.getCssName('anychart-ce-dialog'), opt_useIframeMask, opt_domHelper);

  this.dialogAdditionalClass_ = opt_class;

  if (chartEditor.model.Base.SOLUTION)
    this.dialog_.setTheme(chartEditor.model.Base.SOLUTION);

  this.dialog_.addChild(this, true);

  this.getHandler().listen(this.dialog_, goog.ui.PopupBase.EventType.BEFORE_HIDE, this.onBeforeCloseDialog_);
  this.getHandler().listen(this.dialog_, goog.ui.PopupBase.EventType.HIDE, this.onHideDialog_);
  this.getHandler().listen(this.dialog_, goog.ui.PopupBase.EventType.SHOW, this.onShowDialog_);
};


/**
 * Sets/gets the visibility of the dialog box.
 * @param {boolean=} opt_value Whether the dialog should be visible.
 * @param {boolean=} opt_forceClose
 * @return {boolean|chartEditor.editor.Base} Current visibility state or self for chaining.
 */
chartEditor.editor.Base.prototype.dialogVisible = function (opt_value, opt_forceClose) {
  if (!this.dialog_) return true;

  if (goog.isDef(opt_value)) {
    if (this.dialog_.isVisible() !== opt_value) {
      this.forceClose = !!opt_forceClose;
      this.dialog_.setVisible(opt_value);
      if (this.dialogAdditionalClass_)
        goog.dom.classlist.add(this.dialog_.getElement(), this.dialogAdditionalClass_);

      this.waitForImages_();
    }
    return this;
  }

  return this.dialog_.isVisible();
};


// region ---- chart export
/**
 * Returns JS code string that creates a configured chart.
 * @param {chartEditor.model.Base.JavascriptOptions=} opt_outputOptions Output options object.
 * @param {Array.<{key: {chartEditor.model.Base.Key}, value: *}>=} opt_overrides Model values to override. Will be applied anyway.
 * @param {Array.<{key: {chartEditor.model.Base.Key}, value: *}>=} opt_defaults Default model values. Will be applied if these settings are empty.
 * @return {string}
 */
chartEditor.editor.Base.prototype.getJavascript = function (
    opt_outputOptions,
    opt_overrides,
    opt_defaults) {
  var model = /** @type {chartEditor.model.Base} */ (this.getModel());

  if (!model.getValue([['chart'], 'type']))
    model.generateInitialDefaults();

  if (opt_overrides) {
    // todo: (chernetsky) Портит модель оверрайдами
    model.suspendDispatch();
    for (var i = 0; i < opt_overrides.length; i++) {
      model.setValue(opt_overrides[i]['key'], opt_overrides[i]['value']);
    }
    model.resumeDispatch(false);
  }
  if (opt_defaults) {
    model.suspendDispatch();
    for (var j = 0; j < opt_defaults.length; j++) {
      model.setValue(opt_defaults[j]['key'], opt_defaults[j]['value'], false, true);
    }
    model.resumeDispatch(false);
  }
  return model.getChartAsJsCode(opt_outputOptions);
};


/**
 * Returns configured chart in JSON representation.
 * @return {string}
 */
chartEditor.editor.Base.prototype.getJson = function () {
  return ( /** @type {chartEditor.model.Base} */ (this.getModel())).getChartAsJson();
};


/**
 * Returns configured chart in XML representation.
 * @return {string}
 */
chartEditor.editor.Base.prototype.getXml = function () {
  return ( /** @type {chartEditor.model.Base} */ (this.getModel())).getChartAsXml();
};
// endregion

/**
 * @param {boolean} show
 * @private
 */
chartEditor.editor.Base.prototype.showWaitAnimation_ = function (show) {
  if (show && !this.preloader_.isInDocument()) {
    // var element = this.getContentElement();
    // this.preloader_.render(element);

    //TODO (A.Kudryavtsev): Get body with goog.
    this.preloader_.render(document.body);
  }

  this.preloader_.visible(show);
};


/**
 * Check if images are not fully loaded and shows preloader if need.
 * @private
 */
chartEditor.editor.Base.prototype.waitForImages_ = function () {
  if (!this.imagesLoaded_)
    this.showWaitAnimation_(true);
};


/**
 * Close dialog (if exists) on Cancel button press.
 * @param {Object} evt
 * @private
 */
chartEditor.editor.Base.prototype.onCancel_ = function (evt) {
  if (this.dialog_) {
    this.dialog_.setVisible(false);
  }
};


/**
 * Close dialog (if exists) on complete button press.
 * @param {Object} evt
 * @private
 */
chartEditor.editor.Base.prototype.onComplete_ = function (evt) {
  this.dispatchEvent('editorcomplete');
  // if (this.dialog_ && this.dialog_.isVisible()) {
  //   this.forceClose = true;
  //   this.dialog_.setVisible(false);
  // }
};


/**
 * @param {Object} evt
 * @return {boolean}
 * @private
 */
chartEditor.editor.Base.prototype.onBeforeCloseDialog_ = function (evt) {
  if (this.forceClose)
    return true;

  var confirm = new chartEditor.ui.dialog.Confirm();
  confirm.setTitle('Cancel');
  confirm.setTextContent('Are you sure you want to discard changes?');

  var self = this;
  goog.events.listen(confirm, goog.ui.Dialog.EventType.SELECT, function(e) {
    if (e.key == 'ok') {
      self.forceClose = true;
      self.dialog_.setVisible(false);
    }
    confirm.dispose();
  });
  confirm.setVisible(true);

  return false;
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.editor.Base.prototype.onShowDialog_ = function (evt) {
  if (evt.target === this.dialog_) {
    this.dispatchEvent('editorshow');
  }
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.editor.Base.prototype.onHideDialog_ = function (evt) {
  if (evt.target === this.dialog_) {
    this.dispatchEvent('editorclose');
  }
};


/** @override */
chartEditor.editor.Base.prototype.createDom = function () {
  chartEditor.editor.Base.base(this, 'createDom');

  if (chartEditor.model.Base.SOLUTION)
    goog.dom.classlist.add(this.getElement(), 'anychart-' + chartEditor.model.Base.SOLUTION + '-theme');

  // Add breadcrumbs
  var BreadcrumbsEventType = chartEditor.ui.breadcrumbs.Breadcrumbs.EventType;
  this.breadcrumbs_ = new chartEditor.ui.breadcrumbs.Breadcrumbs();
  this.addChild(this.breadcrumbs_, true);

  var self = this;
  this.getHandler().listen(this.breadcrumbs_, BreadcrumbsEventType.NEXT, function () {
    var nextIndex = self.steps_.getStepIndex(chartEditor.ui.steps.StepRole.NEXT);
    this.setCurrentStep(nextIndex, true);
  });
  this.getHandler().listen(this.breadcrumbs_, BreadcrumbsEventType.PREV, function () {
    var nextIndex = self.steps_.getStepIndex(chartEditor.ui.steps.StepRole.PREVIOUS);
    this.setCurrentStep(nextIndex, true);
  });

  this.getHandler().listen(this.breadcrumbs_, BreadcrumbsEventType.CHANGE_STEP, function (e) {
    this.setCurrentStep(e.step, true);
  });

  // Add steps
  var stepsCount = this.steps_.getStepsCount();
  for (var i = 0; i < stepsCount; i++) {
    var step = this.steps_.getStepByIndex(i);
    this.addChildAt(step, i); // don't render until this.setCurrentStep() call
  }

  this.getHandler().listen(this.steps_, chartEditor.ui.steps.EventType.BEFORE_CHANGE_STEP, this.onBeforeChangeStep_);
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.editor.Base.prototype.onBeforeChangeStep_ = function (evt) {
  this.breadcrumbs_.setStep(evt.index, this.steps_);
  this.getModel().onChangeStep(evt.index);
};


/** @override */
chartEditor.editor.Base.prototype.enterDocument = function () {
  chartEditor.editor.Base.base(this, 'enterDocument');

  var model = /** @type {chartEditor.model.Base} */ (this.getModel());
  this.getHandler().listen(model, chartEditor.events.EventType.WAIT, this.onWait_);

  this.setFirstStep_();
};


/**
 * @return {number} First step index
 * @private
 */
chartEditor.editor.Base.prototype.setFirstStep_ = function () {
  var index = this.steps_.getStepIndex(chartEditor.ui.steps.StepRole.FIRST);
  if (index >= 0)
    this.setCurrentStep(index, false);

  return index;
};


/**
 * Render the step at the given index.
 * @param {number} index Index of the step to render (-1 to render none).
 * @param {boolean} doAnimation
 * @private
 */
chartEditor.editor.Base.prototype.setCurrentStep = function (index, doAnimation) {
  if (index > 0 && this.getModel().getDataSetsCount() <= 0) {
    alert('To use these steps you should have data set to be added.\nPlease use data() method or enable data step.');

  } else {
    this.steps_.setStep(index, doAnimation);
  }
};


/**
 * Allows to get step by it's name.
 * Call this method only before render chart editor.
 * @param {chartEditor.enums.EditorSteps} stepName Step name
 * @param {(boolean|Object)=} opt_value Boolean value to enable/disable step or configuration object.
 * @return {chartEditor.ui.steps.Step|chartEditor.editor.Base|null} Step or self for chaining
 */
chartEditor.editor.Base.prototype.step = function (stepName, opt_value) {
  if (goog.isDef(opt_value)) {
    var step = this.steps_.getStepByName(stepName);
    if (step)
      step.setup(opt_value);
    return this;
  } else
    return this.steps_.getStepByName(stepName);
};


/**
 * Sets anychart locale panel
 * @param {Object} values
 * @return {chartEditor.editor.Base} self for chaining
 */
chartEditor.editor.Base.prototype.localization = function (values) {
  this.getModel().localization(values);
  return this;
};


/**
 * Add data to editor programmatically.
 * @param {Array.<Object>|Object|anychart.data.Set} dataOrConfig Raw data or config object with raw data in 'data' field.
 */
chartEditor.editor.Base.prototype.data = function (dataOrConfig) {
  var preparedData = null;

  if (goog.isArray(dataOrConfig) || goog.isFunction(dataOrConfig['mapAs'])) {
    // Passed plain raw data or anychart.data.Set instance
    preparedData = {
      data: dataOrConfig
    };

  } else if (goog.isObject(dataOrConfig) && goog.isObject(dataOrConfig['data'])) {
    // Passed config object with raw data in 'data' field
    preparedData = dataOrConfig;
    preparedData.setId = dataOrConfig['setId'] || 'qlikData';
    preparedData.dataType = dataOrConfig['dataType'];
    preparedData.chartType = dataOrConfig['chartType'];
    preparedData.seriesType = dataOrConfig['seriesType'];
    preparedData.activeGeo = dataOrConfig['activeGeo'];
    preparedData.fieldNames = dataOrConfig['fieldNames'];
    preparedData.title = dataOrConfig['title'] || dataOrConfig['caption'] || dataOrConfig['name'];
    preparedData.defaults = dataOrConfig['defaults'];
  }

  if (preparedData)
    this.getModel().addData(preparedData);
};


/**
 * Steps getter.
 * @return {chartEditor.ui.steps.Widget}
 */
chartEditor.editor.Base.prototype.getSteps = function () {
  return this.steps_;
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.editor.Base.prototype.onDataAdd_ = function (evt) {
  this.getModel().addData(evt);
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.editor.Base.prototype.onDataRemove_ = function (evt) {
  this.getModel().removeData(evt.setFullId);
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.editor.Base.prototype.onWait_ = function (evt) {
  this.waitQueue_ += evt.wait ? 1 : -1;

  if (this.waitQueue_ > 0 && !this.preloader_.visible()) {
    this.showWaitAnimation_(true);
  } else if (this.waitQueue_ == 0) {
    this.showWaitAnimation_(false);
  }

  if (this.waitQueue_ < 0)
    console.warn('Wait queue error!');
};


/**
 * Serialize model structure
 * @return {string} Serialized model
 */
chartEditor.editor.Base.prototype.serializeModel = function () {
  var model = this.getModel().getModel();
  if (model['standalones'] && model['standalones']['scale']) {
    for (var i = 0; i < model['standalones']['scale'].length; i++) {
      model['standalones']['scale'][i]['instance'] = null;
    }
  }
  return goog.json.hybrid.stringify(model);
};


/**
 * Deserialize model structure from string
 * @param {?string} serializedModel
 */
chartEditor.editor.Base.prototype.deserializeModel = function (serializedModel) {
  if (serializedModel) {
    var deserialized = /** @type {chartEditor.model.Base.Model} */ (goog.json.hybrid.parse(serializedModel));
    if (!deserialized['standalones']) {
      deserialized['standalones'] = {
        'scale': []
      };
    }
    var model = /** @type {chartEditor.model.Base} */ (this.getModel());
    model.setModel(deserialized);
  }
};


/**
 * Allows to set defaults for created chart. This is for Qlik
 * @param {Object} values
 */
chartEditor.editor.Base.prototype.setDefaults = function (values) {
  var model = /** @type {chartEditor.model.Base} */ (this.getModel());
  model.defaults(values);
};


/**
 * @param {chartEditor.model.Base.Key} key
 * @return {*} Input's value
 */
chartEditor.editor.Base.prototype.getModelValue = function (key) {
  var model = /** @type {chartEditor.model.Base} */ (this.getModel());
  return model.getValue(key);
};


/**
 * Chart editor statistics service url
 */
//chartEditor.editor.Base.CLOUD_URL = 'https://static.anychart.com/ce-cloud/';


/**
 *
 * @param {Function} callback Function to call when response has come
 * @param {Object} params
 */
chartEditor.editor.Base.prototype.saveToCloud = function (callback, params) {
  var qd = new goog.Uri.QueryData();
  if (goog.isDef(params['id']))
    qd.add('id', params['id']);
  qd.add('code', params['code'] || this.getJavascript());
  qd.add('model', params['model'] || this.serializeModel());
  qd.add('key', window['anychart']['utils']['printUtilsBoolean']());

  goog.net.XhrIo.send(chartEditor.editor.Base.CLOUD_URL, function (e) {
    var xhr = e.target;
    if (xhr.getStatus() === 200)
      callback(null, xhr.getResponse());
    else
      callback(xhr.getStatusText(), null);
  }, 'post', qd.toString());
};


/** @override */
chartEditor.editor.Base.prototype.disposeInternal = function () {
  goog.disposeAll(this.dialog_);
  this.dialog_ = null;

  chartEditor.editor.Base.base(this, 'disposeInternal');
};


// region Editor.Dialog
/**
 * @constructor
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to modal-dialog.
 *     This should be a single, valid CSS class name.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *     goog.ui.Component} for semantics.
 * @extends {chartEditor.ui.dialog.Base}
 */
chartEditor.editor.Base.Dialog = function (opt_class, opt_useIframeMask, opt_domHelper) {
  chartEditor.editor.Base.Dialog.base(this, 'constructor', opt_class, opt_useIframeMask, opt_domHelper);

  /**
   * Element for the logo of the title bar.
   * @type {Element}
   * @private
   */
  this.titleLogoEl_ = null;

  this.setTitle('AnyChart Advanced Settings Panel');

  this.setButtonSet(null);

  /**
   * @type {?string}
   * @private
   */
  this.theme_ = null;
};
goog.inherits(chartEditor.editor.Base.Dialog, chartEditor.ui.dialog.Base);


/**
 * @param {?string} value
 */
chartEditor.editor.Base.Dialog.prototype.setTheme = function (value) {
  this.theme_ = value;
};


/** @override */
chartEditor.editor.Base.Dialog.prototype.createDom = function () {
  chartEditor.editor.Base.Dialog.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), goog.getCssName('anychart-ce-editor-dialog'));

  if (this.theme_)
    goog.dom.classlist.add(this.getElement(), 'anychart-ce-dialog-' + this.theme_ + '-theme');

  this.initTitleElements_();
};


/** @override */
chartEditor.editor.Base.Dialog.prototype.decorateInternal = function (element) {
  chartEditor.editor.Base.Dialog.base(this, 'decorateInternal', element);
  this.initTitleElements_();
};


/** @private */
chartEditor.editor.Base.Dialog.prototype.initTitleElements_ = function () {
  var dom = this.getDomHelper();

  var titleElement = this.getTitleElement();

  this.titleLogoEl_ = dom.createDom(
    goog.dom.TagName.A, {
      'class': goog.getCssName(this.getCssClass(), 'title-logo'),
      'href': chartEditor.model.Base.SOLUTION_DATA.overviewUrl,
      'target': '_blank'
    });
  goog.dom.insertSiblingBefore(this.titleLogoEl_, goog.dom.getFirstElementChild(titleElement));

  this.setTitle('AnyChart Advanced Settings Panel');
};


/** @override */
chartEditor.editor.Base.Dialog.prototype.enterDocument = function () {
  chartEditor.editor.Base.Dialog.base(this, 'enterDocument');
  var bgEl = this.getBackgroundElement();
  if (bgEl)
    this.getHandler().listen(bgEl, goog.events.EventType.CLICK, this.onBackgroundClick_);
};


/** @override */
chartEditor.editor.Base.Dialog.prototype.disposeInternal = function () {
  this.titleLogoEl_ = null;
  chartEditor.editor.Base.Dialog.base(this, 'disposeInternal');
};


/** @private */
chartEditor.editor.Base.Dialog.prototype.onBackgroundClick_ = function () {
  this.setVisible(false);
};
// endregion


window['anychart'] = window['anychart'] || {};


//exports
(function () {
  goog.exportSymbol('chartEditor.editor.Base.VERSION', chartEditor.editor.Base.VERSION);
  // goog.exportSymbol('anychart.editor', window['anychart'].editor);
  var proto = chartEditor.editor.Base.prototype;
  proto['render'] = proto.render;
  proto['decorate'] = proto.decorate;
  proto['dialogRender'] = proto.dialogRender;
  proto['dialogVisible'] = proto.dialogVisible;
  proto['getJavascript'] = proto.getJavascript;
  proto['getJson'] = proto.getJson;
  proto['getXml'] = proto.getXml;
  proto['step'] = proto.step;
  proto['localization'] = proto.localization;
  proto['data'] = proto.data;
  proto['setDefaults'] = proto.setDefaults;
  proto['listen'] = proto.listen;
  proto['listenOnce'] = proto.listenOnce;
  proto['unlisten'] = proto.unlisten;
  proto['unlistenByKey'] = proto.unlistenByKey;
  proto['removeAllListeners'] = proto.removeAllListeners;
  proto['getModel'] = proto.getModel;
  proto['serializeModel'] = proto.serializeModel;
  proto['deserializeModel'] = proto.deserializeModel;
  proto['dispose'] = proto.dispose;
  proto['version'] = proto.version;
  proto['addClassName'] = proto.addClassName;
  proto['removeClassName'] = proto.removeClassName;
  proto['saveToCloud'] = proto.saveToCloud;
  proto['pluginMode'] = proto.pluginMode;
  proto['getModelValue'] = proto.getModelValue;
})();