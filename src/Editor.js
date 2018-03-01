goog.provide('anychart.chartEditorModule.Editor');
goog.provide('anychart.chartEditorModule.Editor.Dialog');

goog.require('anychart.chartEditorModule.Breadcrumbs');
goog.require('anychart.chartEditorModule.Component');
goog.require('anychart.chartEditorModule.EditorModel');
goog.require('anychart.chartEditorModule.Steps');
goog.require('anychart.chartEditorModule.events');
goog.require('anychart.ui.Preloader');
goog.require('goog.net.ImageLoader');
goog.require('goog.ui.Dialog');



/**
 * Chart Editor application Component Class.
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.Editor = function(opt_domHelper) {
  anychart.chartEditorModule.Editor.base(this, 'constructor', opt_domHelper);

  /**
   * @type {?goog.ui.Dialog}
   * @private
   */
  this.dialog_ = null;

  this.setModel(new anychart.chartEditorModule.EditorModel());

  this.imagesLoaded_ = true;
  this.preloader_ = new anychart.ui.Preloader();

  /**
   * @type {anychart.chartEditorModule.Steps}
   * @private
   */
  this.steps_ = new anychart.chartEditorModule.Steps();

  /**
   * @type {anychart.chartEditorModule.Breadcrumbs}
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

  goog.events.listen(this, anychart.chartEditorModule.Breadcrumbs.EventType.COMPLETE, this.onComplete_, false, this);

  this.listen(anychart.chartEditorModule.events.EventType.DATA_ADD, this.onDataAdd_);
  this.listen(anychart.chartEditorModule.events.EventType.DATA_REMOVE, this.onDataRemove_);
  this.listen(anychart.chartEditorModule.events.EventType.WAIT, this.onWait_);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  this.getHandler().listen(model, anychart.chartEditorModule.events.EventType.WAIT, this.onWait_);

  /**
   * @type {?string}
   * @private
   */
  //this.theme_ = '';

  // Enable Qlik theme
  this.theme_ = 'qlik';
};
goog.inherits(anychart.chartEditorModule.Editor, anychart.chartEditorModule.Component);


/**
 * CSS class name.
 * @type {string}
 */
anychart.chartEditorModule.Editor.CSS_CLASS = goog.getCssName('anychart-chart-editor');


/** @inheritDoc */
anychart.chartEditorModule.Editor.prototype.render = function(opt_parentElement) {
  anychart.chartEditorModule.Editor.base(this, 'render', opt_parentElement);
  this.waitForImages_();
};


/** @inheritDoc */
anychart.chartEditorModule.Editor.prototype.decorate = function(element) {
  anychart.chartEditorModule.Editor.base(this, 'decorate', element);
  this.waitForImages_();
};


/**
 * @return {?string|undefined}
 */
anychart.chartEditorModule.Editor.prototype.getTheme = function() {
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
anychart.chartEditorModule.Editor.prototype.renderAsDialog = function(opt_class, opt_useIframeMask, opt_domHelper) {
  this.dialog_ = new anychart.chartEditorModule.Editor.Dialog(opt_class, opt_useIframeMask, opt_domHelper);

  if (this.theme_) this.dialog_.setTheme(this.theme_);

  this.dialog_.addChild(this, true);

  this.getHandler().listen(this.dialog_, goog.ui.PopupBase.EventType.HIDE, this.onCloseDialog_);
};


/**
 * Sets the visibility of the dialog box and moves focus to the
 * default button. Lazily renders the component if needed.
 * @param {boolean=} opt_value Whether the dialog should be visible.
 * @return {boolean|!anychart.chartEditorModule.Editor}
 */
anychart.chartEditorModule.Editor.prototype.visible = function(opt_value) {
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
 * @param {anychart.chartEditorModule.EditorModel.OutputOptions=} opt_options Output options object.
 * @return {string}
 */
anychart.chartEditorModule.Editor.prototype.getChartAsJsCode = function(opt_options) {
  return (/** @type {anychart.chartEditorModule.EditorModel} */(this.getModel())).getChartAsJsCode(opt_options);
};


/**
 * Returns configured chart in JSON representation.
 * @return {string}
 */
anychart.chartEditorModule.Editor.prototype.getChartAsJson = function() {
  return (/** @type {anychart.chartEditorModule.EditorModel} */(this.getModel())).getChartAsJson();
};


/**
 * Returns configured chart in XML representation.
 * @return {string}
 */
anychart.chartEditorModule.Editor.prototype.getChartAsXml = function() {
  return (/** @type {anychart.chartEditorModule.EditorModel} */(this.getModel())).getChartAsXml();
};
// endregion

/**
 * @param {boolean} show
 * @private
 */
anychart.chartEditorModule.Editor.prototype.showWaitAnimation_ = function(show) {
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
anychart.chartEditorModule.Editor.prototype.waitForImages_ = function() {
  if (!this.imagesLoaded_)
    this.showWaitAnimation_(true);
};


/**
 * Close dialog (if exists) on complete button press.
 * @param {Object} evt
 * @private
 */
anychart.chartEditorModule.Editor.prototype.onComplete_ = function(evt) {
  this.dispatchEvent(anychart.enums.EventType.COMPLETE);
  if (this.dialog_)
    this.dialog_.setVisible(false);
};


/**
 * @param {Object} evt
 * @private
 */
anychart.chartEditorModule.Editor.prototype.onCloseDialog_ = function(evt) {
  if (evt.target == this.dialog_) {
    this.dispatchEvent(anychart.enums.EventType.CLOSE);
  }
};


/** @override */
anychart.chartEditorModule.Editor.prototype.createDom = function() {
  anychart.chartEditorModule.Editor.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.Editor.CSS_CLASS);

  if (this.theme_)
    goog.dom.classlist.add(this.getElement(), 'anychart-' + this.theme_ + '-theme');

  // Add breadcrumbs
  var BreadcrumbsEventType = anychart.chartEditorModule.Breadcrumbs.EventType;
  this.breadcrumbs_ = new anychart.chartEditorModule.Breadcrumbs();
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

  this.getHandler().listen(this.steps_, anychart.chartEditorModule.Steps.EventType.BEFORE_CHANGE_STEP, this.onBeforeChangeStep_);
};


/**
 * @param {Object} evt
 * @private
 */
anychart.chartEditorModule.Editor.prototype.onBeforeChangeStep_ = function(evt) {
  this.breadcrumbs_.setStep(evt.index, this.steps_.getDescriptors());
  if (evt.index !== 0) this.getModel().onChangeView();
};


/** @override */
anychart.chartEditorModule.Editor.prototype.enterDocument = function() {
  anychart.chartEditorModule.Editor.base(this, 'enterDocument');
  this.setFirstStep_();
};


/** @private */
anychart.chartEditorModule.Editor.prototype.setFirstStep_ = function() {
  var index = this.steps_.getFirstStepIndex();
  this.setCurrentStep(index, false);
};


/**
 * Render the step at the given index.
 * @param {number} index Index of the step to render (-1 to render none).
 * @param {boolean} doAnimation
 * @private
 */
anychart.chartEditorModule.Editor.prototype.setCurrentStep = function(index, doAnimation) {
  if (index > 0 && this.getModel().getDataSetsCount() <= 0) {
    alert('You need at least one data set for the next step!');

  } else {
    this.steps_.setStep(index, doAnimation);
  }
};


/**
 * @return {anychart.chartEditorModule.Steps}
 */
anychart.chartEditorModule.Editor.prototype.steps = function() {
  return this.steps_;
};


/**
 * Add data to editor while initialization.
 * @param {Object} data
 */
anychart.chartEditorModule.Editor.prototype.data = function(data) {
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
anychart.chartEditorModule.Editor.prototype.onDataAdd_ = function(evt) {
  this.getModel().addData(evt);
};


/**
 * @param {Object} evt
 * @private
 */
anychart.chartEditorModule.Editor.prototype.onDataRemove_ = function(evt) {
  this.getModel().removeData(evt.setFullId);
};


/**
 * @param {Object} evt
 * @private
 */
anychart.chartEditorModule.Editor.prototype.onWait_ = function(evt) {
  this.showWaitAnimation_(evt.wait);
};


/**
 *  @return {string}
 */
anychart.chartEditorModule.Editor.prototype.serializeModel = function() {
  var model = this.getModel().getModel();
  return goog.json.hybrid.stringify(model);
};


/**
 * @param {?string} serializedModel
 */
anychart.chartEditorModule.Editor.prototype.deserializeModel = function(serializedModel) {
  if (serializedModel) {
    var deserialized = /** @type {anychart.chartEditorModule.EditorModel.Model} */(goog.json.hybrid.parse(serializedModel));
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    model.setModel(deserialized);
  }
};


/**
 * @param {Array.<{key: anychart.chartEditorModule.EditorModel.Key, value: (string|boolean|Object) }>} values
 */
anychart.chartEditorModule.Editor.prototype.setDefaults = function(values) {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
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
anychart.chartEditorModule.Editor.Dialog = function(opt_class, opt_useIframeMask, opt_domHelper) {
  anychart.chartEditorModule.Editor.Dialog.base(this, 'constructor', opt_class || goog.getCssName('anychart-chart-editor-dialog'), opt_useIframeMask, opt_domHelper);

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
goog.inherits(anychart.chartEditorModule.Editor.Dialog, goog.ui.Dialog);


/**
 * @param {?string} value
 */
anychart.chartEditorModule.Editor.Dialog.prototype.setTheme = function(value) {
  this.theme_ = value;
};


/** @override */
anychart.chartEditorModule.Editor.Dialog.prototype.createDom = function() {
  anychart.chartEditorModule.Editor.Dialog.base(this, 'createDom');

  if (this.theme_)
    goog.dom.classlist.add(this.getElement(), 'anychart-chart-editor-dialog-' + this.theme_ + '-theme');

  this.initTitleElements_();
};


/** @override */
anychart.chartEditorModule.Editor.Dialog.prototype.decorateInternal = function(element) {
  anychart.chartEditorModule.Editor.Dialog.base(this, 'decorateInternal', element);
  this.initTitleElements_();
};


/** @private */
anychart.chartEditorModule.Editor.Dialog.prototype.initTitleElements_ = function() {
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
anychart.chartEditorModule.Editor.Dialog.prototype.enterDocument = function() {
  anychart.chartEditorModule.Editor.Dialog.base(this, 'enterDocument');
  var bgEl = this.getBackgroundElement();
  if (bgEl)
    this.getHandler().listen(bgEl, goog.events.EventType.CLICK, this.onBackgroundClick_);
};


/** @override */
anychart.chartEditorModule.Editor.Dialog.prototype.disposeInternal = function() {
  this.titleLogoEl_ = null;
  anychart.chartEditorModule.Editor.Dialog.base(this, 'disposeInternal');
};


/** @private */
anychart.chartEditorModule.Editor.Dialog.prototype.onBackgroundClick_ = function() {
  this.setVisible(false);
};
// endregion


/**
 * Constructor function for Chart Editor.
 * @return {anychart.chartEditorModule.Editor}
 */
anychart.ui.editor = function() {
  return new anychart.chartEditorModule.Editor();
};

//exports
(function() {
  goog.exportSymbol('anychart.ui.editor', anychart.ui.editor);
  var proto = anychart.chartEditorModule.Editor.prototype;
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
