goog.provide('chartEditor.Editor');
goog.provide('chartEditor.Editor.Dialog');

goog.require("chartEditor.Breadcrumbs");
goog.require("chartEditor.Component");
goog.require("chartEditor.EditorModel");
goog.require("chartEditor.Preloader");
goog.require("chartEditor.Steps");
goog.require("chartEditor.events");
goog.require("goog.net.ImageLoader");
goog.require("goog.ui.Dialog");


/**
 * Chart Editor application Component Class.
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @extends {chartEditor.Component}
 */
chartEditor.Editor = function(opt_domHelper) {
  chartEditor.Editor.base(this, 'constructor', opt_domHelper);

  /**
   * @type {?goog.ui.Dialog}
   * @private
   */
  this.dialog_ = null;

  this.setModel(new chartEditor.EditorModel());

  this.imagesLoaded_ = true;
  this.preloader_ = new chartEditor.Preloader();

  /**
   * @type {chartEditor.Steps}
   * @private
   */
  this.steps_ = new chartEditor.Steps();

  /**
   * @type {chartEditor.Breadcrumbs}
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
  //imageLoader.start();

  goog.events.listen(this, chartEditor.Breadcrumbs.EventType.COMPLETE, this.onComplete_, false, this);

  this.listen(chartEditor.events.EventType.DATA_ADD, this.onDataAdd_);
  this.listen(chartEditor.events.EventType.DATA_REMOVE, this.onDataRemove_);
  this.listen(chartEditor.events.EventType.WAIT, this.onWait_);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  this.getHandler().listen(model, chartEditor.events.EventType.WAIT, this.onWait_);

  /**
   * @type {?string}
   * @private
   */
  this.theme_ = '';

  // Enable Qlik theme
  // this.theme_ = 'qlik';
};
goog.inherits(chartEditor.Editor, chartEditor.Component);


/**
 * CSS class name.
 * @type {string}
 */
chartEditor.Editor.CSS_CLASS = goog.getCssName('anychart-ce');



/** @inheritDoc */
chartEditor.Editor.prototype.render = function(opt_parentElement) {
  chartEditor.Editor.base(this, 'render', opt_parentElement);
  this.waitForImages_();
};


/** @inheritDoc */
chartEditor.Editor.prototype.decorate = function(element) {
  chartEditor.Editor.base(this, 'decorate', element);
  this.waitForImages_();
};


/**
 * @return {?string|undefined}
 */
chartEditor.Editor.prototype.getTheme = function() {
  return this.theme_;
};


/**
 * Renders the Chart Editor as modal dialog.
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to modal-dialog.
 *     This should be a single, valid CSS class name.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 */
chartEditor.Editor.prototype.renderAsDialog = function(opt_class, opt_useIframeMask, opt_domHelper) {
  this.dialog_ = new chartEditor.Editor.Dialog(opt_class, opt_useIframeMask, opt_domHelper);

  if (this.theme_) this.dialog_.setTheme(this.theme_);

  this.dialog_.addChild(this, true);

  this.getHandler().listen(this.dialog_, goog.ui.PopupBase.EventType.HIDE, this.onCloseDialog_);
};


/**
 * Sets the visibility of the dialog box and moves focus to the
 * default button. Lazily renders the component if needed.
 * @param {boolean=} opt_value Whether the dialog should be visible.
 * @return {boolean|!chartEditor.Editor}
 */
chartEditor.Editor.prototype.visible = function(opt_value) {
  if (!this.dialog_) return true;

  if (goog.isDef(opt_value)) {
    var prevVisible = this.dialog_.isVisible();
    this.dialog_.setVisible(opt_value);
    this.waitForImages_();

    if (!prevVisible && opt_value) {
      this.setFirstStep_();
      this.breadcrumbs_.setStep(this.steps_.getCurrentStepIndex(), this.steps_.getDescriptors());
    }

    return this;
  }

  return this.dialog_.isVisible();
};


// region ---- chart export
/**
 * Returns JS code string that creates a configured chart.
 * @param {chartEditor.EditorModel.OutputOptions=} opt_options Output options object.
 * @return {string}
 */
chartEditor.Editor.prototype.getChartAsJsCode = function(opt_options) {
  return (/** @type {chartEditor.EditorModel} */(this.getModel())).getChartAsJsCode(opt_options);
};


/**
 * Returns configured chart in JSON representation.
 * @return {string}
 */
chartEditor.Editor.prototype.getChartAsJson = function() {
  return (/** @type {chartEditor.EditorModel} */(this.getModel())).getChartAsJson();
};


/**
 * Returns configured chart in XML representation.
 * @return {string}
 */
chartEditor.Editor.prototype.getChartAsXml = function() {
  return (/** @type {chartEditor.EditorModel} */(this.getModel())).getChartAsXml();
};
// endregion

/**
 * @param {boolean} show
 * @private
 */
chartEditor.Editor.prototype.showWaitAnimation_ = function(show) {
  if (show && !this.preloader_.isInDocument()) {
    var element = this.getContentElement();
    this.preloader_.render(element);
  }

  this.preloader_.visible(show);
};


/**
 * Check if images are not fully loaded and shows preloader if need.
 * @private
 */
chartEditor.Editor.prototype.waitForImages_ = function() {
  if (!this.imagesLoaded_)
    this.showWaitAnimation_(true);
};


/**
 * Close dialog (if exists) on complete button press.
 * @param {Object} evt
 * @private
 */
chartEditor.Editor.prototype.onComplete_ = function(evt) {
  this.dispatchEvent('complete');
  if (this.dialog_)
    this.dialog_.setVisible(false);
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.Editor.prototype.onCloseDialog_ = function(evt) {
  if (evt.target === this.dialog_) {
    this.dispatchEvent('close');
  }
};


/** @override */
chartEditor.Editor.prototype.createDom = function() {
  chartEditor.Editor.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.Editor.CSS_CLASS);

  if (this.theme_)
    goog.dom.classlist.add(this.getElement(), 'anychart-' + this.theme_ + '-theme');

  // Add breadcrumbs
  var BreadcrumbsEventType = chartEditor.Breadcrumbs.EventType;
  this.breadcrumbs_ = new chartEditor.Breadcrumbs();
  this.addChild(this.breadcrumbs_, true);

  this.getHandler().listen(this.breadcrumbs_, BreadcrumbsEventType.NEXT, function() {
    var nextIndex = this.steps_.getCurrentStepIndex() + 1;
    this.setCurrentStep(nextIndex, true);
  });
  this.getHandler().listen(this.breadcrumbs_, BreadcrumbsEventType.PREV, function() {
    var nextIndex = this.steps_.getCurrentStepIndex() - 1;
    this.setCurrentStep(nextIndex, true);
  });

  this.getHandler().listen(this.breadcrumbs_, BreadcrumbsEventType.COMPLETE, function() {

  });
  this.getHandler().listen(this.breadcrumbs_, BreadcrumbsEventType.CHANGE_STEP, function(e) {
    this.setCurrentStep(e.step, true);
  });

  // Add steps
  var stepNames = ['PrepareData', 'SetupChart', 'VisualAppearance'];
  for (var i = 0; i < stepNames.length; i++) {
    var step = this.steps_.createStep(stepNames[i]);
    this.addChildAt(step, i); // don't render until this.setCurrentStep() call
  }

  this.getHandler().listen(this.steps_, chartEditor.Steps.EventType.BEFORE_CHANGE_STEP, this.onBeforeChangeStep_);
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.Editor.prototype.onBeforeChangeStep_ = function(evt) {
  this.breadcrumbs_.setStep(evt.index, this.steps_.getDescriptors());
  if (evt.index !== 0) this.getModel().onChangeView();
};


/** @override */
chartEditor.Editor.prototype.enterDocument = function() {
  chartEditor.Editor.base(this, 'enterDocument');
  this.setFirstStep_();
};


/** @private */
chartEditor.Editor.prototype.setFirstStep_ = function() {
  var index = this.steps_.getFirstStepIndex();
  this.setCurrentStep(index, false);
};


/**
 * Render the step at the given index.
 * @param {number} index Index of the step to render (-1 to render none).
 * @param {boolean} doAnimation
 * @private
 */
chartEditor.Editor.prototype.setCurrentStep = function(index, doAnimation) {
  if (index > 0 && this.getModel().getDataSetsCount() <= 0) {
    alert('You need at least one data set for the next step!');

  } else {
    this.steps_.setStep(index, doAnimation);
  }
};


/**
 * @return {chartEditor.Steps}
 */
chartEditor.Editor.prototype.steps = function() {
  return this.steps_;
};


/**
 * Add data to editor while initialization.
 * @param {Object} data
 */
chartEditor.Editor.prototype.data = function(data) {
  if (goog.isObject(data)) {
    var preparedData;
    if (goog.isObject(data['data'])) {
      preparedData = data;
      preparedData.setId = data['setId'];
      preparedData.dataType = data['dataType'];
      preparedData.chartType = data['chartType'];
      preparedData.seriesType = data['seriesType'];
      preparedData.activeGeo = data['activeGeo'];
      preparedData.fieldNames = data['fieldNames'];
      preparedData.title = data['title'] || data['caption'] || data['name'];
      preparedData.defaults = data['defaults'];
    } else
      preparedData = {data: data};

    this.getModel().addData(preparedData);
  }
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.Editor.prototype.onDataAdd_ = function(evt) {
  this.getModel().addData(evt);
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.Editor.prototype.onDataRemove_ = function(evt) {
  this.getModel().removeData(evt.setFullId);
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.Editor.prototype.onWait_ = function(evt) {
  this.showWaitAnimation_(evt.wait);
};


/**
 *  @return {string}
 */
chartEditor.Editor.prototype.serializeModel = function() {
  var model = this.getModel().getModel();
  return goog.json.hybrid.stringify(model);
};


/**
 * @param {?string} serializedModel
 */
chartEditor.Editor.prototype.deserializeModel = function(serializedModel) {
  if (serializedModel) {
    var deserialized = /** @type {chartEditor.EditorModel.Model} */(goog.json.hybrid.parse(serializedModel));
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    model.setModel(deserialized);
  }
};


/**
 * @param {Array.<{key: chartEditor.EditorModel.Key, value: (string|boolean|Object) }>} values
 */
chartEditor.Editor.prototype.setDefaults = function(values) {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  model.setDefaults(values);
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
 * @extends {goog.ui.Dialog}
 */
chartEditor.Editor.Dialog = function(opt_class, opt_useIframeMask, opt_domHelper) {
  chartEditor.Editor.Dialog.base(this, 'constructor', opt_class || goog.getCssName('anychart-ce-dialog'), opt_useIframeMask, opt_domHelper);

  /**
   * Element for the logo of the title bar.
   * @type {Element}
   * @private
   */
  this.titleLogoEl_ = null;

  this.setTitle('Chart Editor');
  this.setButtonSet(null);

  /**
   * @type {?string}
   * @private
   */
  this.theme_ = null;
};
goog.inherits(chartEditor.Editor.Dialog, goog.ui.Dialog);


/**
 * @param {?string} value
 */
chartEditor.Editor.Dialog.prototype.setTheme = function(value) {
  this.theme_ = value;
};


/** @override */
chartEditor.Editor.Dialog.prototype.createDom = function() {
  chartEditor.Editor.Dialog.base(this, 'createDom');

  if (this.theme_)
    goog.dom.classlist.add(this.getElement(), 'anychart-ce-dialog-' + this.theme_ + '-theme');

  this.initTitleElements_();
};


/** @override */
chartEditor.Editor.Dialog.prototype.decorateInternal = function(element) {
  chartEditor.Editor.Dialog.base(this, 'decorateInternal', element);
  this.initTitleElements_();
};


/** @private */
chartEditor.Editor.Dialog.prototype.initTitleElements_ = function() {
  var dom = this.getDomHelper();

  var titleElement = this.getTitleElement();
  this.titleLogoEl_ = dom.createDom(
      goog.dom.TagName.A,
      {
        'class': goog.getCssName(this.getCssClass(), 'title-logo'),
        'href': 'https://anychart.com',
        'target': '_blank'
      });
  goog.dom.insertSiblingBefore(this.titleLogoEl_, goog.dom.getFirstElementChild(titleElement));

  this.setTitle('Chart Editor');

  var close = this.getTitleCloseElement();
  goog.dom.appendChild(close, goog.dom.createDom(goog.dom.TagName.I, ['ac', 'ac-remove']));
};


/** @override */
chartEditor.Editor.Dialog.prototype.enterDocument = function() {
  chartEditor.Editor.Dialog.base(this, 'enterDocument');
  var bgEl = this.getBackgroundElement();
  if (bgEl)
    this.getHandler().listen(bgEl, goog.events.EventType.CLICK, this.onBackgroundClick_);
};


/** @override */
chartEditor.Editor.Dialog.prototype.disposeInternal = function() {
  this.titleLogoEl_ = null;
  chartEditor.Editor.Dialog.base(this, 'disposeInternal');
};


/** @private */
chartEditor.Editor.Dialog.prototype.onBackgroundClick_ = function() {
  this.setVisible(false);
};
// endregion


/**
 * Constructor function for Chart Editor.
 * @return {chartEditor.Editor}
 */
chartEditor.editor = function() {
  return new chartEditor.Editor();
};

//exports
(function() {
  goog.exportSymbol('chartEditor.editor', chartEditor.editor);
  var proto = chartEditor.Editor.prototype;
  proto['render'] = proto.render;
  proto['decorate'] = proto.decorate;
  proto['renderAsDialog'] = proto.renderAsDialog;
  proto['visible'] = proto.visible;
  proto['getChartAsJsCode'] = proto.getChartAsJsCode;
  proto['getChartAsJson'] = proto.getChartAsJson;
  proto['getChartAsXml'] = proto.getChartAsXml;
  proto['steps'] = proto.steps;
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
})();
