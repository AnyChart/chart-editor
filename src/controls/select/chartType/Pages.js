goog.provide('anychart.chartEditorModule.controls.chartType.Page');
goog.provide('anychart.chartEditorModule.controls.chartType.Pager');
goog.provide('anychart.chartEditorModule.controls.chartType.Pages');

goog.require('anychart.chartEditorModule.Component');
goog.require('goog.fx.AnimationSerialQueue');
goog.require('goog.fx.dom.Slide');


// region ---- Pages
/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.controls.chartType.Pages = function(opt_domHelper) {
  anychart.chartEditorModule.controls.chartType.Pages.base(this, 'constructor', opt_domHelper);

  this.currentPageIndex_ = 0;

  this.itemsPerPage_ = 1;

  this.pages_ = [];

  this.items_ = [];
};
goog.inherits(anychart.chartEditorModule.controls.chartType.Pages, anychart.chartEditorModule.Component);


/** @type {string} */
anychart.chartEditorModule.controls.chartType.Pages.CSS_CLASS = goog.getCssName('anychart-chart-editor-chart-type-pages');


/** @inheritDoc */
anychart.chartEditorModule.controls.chartType.Pages.prototype.createDom = function() {
  anychart.chartEditorModule.controls.chartType.Pages.base(this, 'createDom');

  this.addClassName(anychart.chartEditorModule.controls.chartType.Pages.CSS_CLASS);

  this.pager_ = new anychart.chartEditorModule.controls.chartType.Pager();
  this.addChild(this.pager_, true);
};


/** @inheritDoc */
anychart.chartEditorModule.controls.chartType.Pages.prototype.enterDocument = function() {
  anychart.chartEditorModule.controls.chartType.Pages.base(this, 'enterDocument');

  this.getHandler().listen(this.pager_, anychart.chartEditorModule.controls.chartType.Pager.EventType.CHANGE_PAGE, function(evt) {
    this.setCurrentPage(evt.index);
  });
};


/**
 * @param {number} value
 */
anychart.chartEditorModule.controls.chartType.Pages.prototype.setItemsPerPage = function(value) {
  this.itemsPerPage_ = value;
  this.updatePages();
};


/**
 * Switches pages forward or backward depend on argument value
 *
 * @param {boolean} nextOrPrevious If 'true' - switches forward
 */
anychart.chartEditorModule.controls.chartType.Pages.prototype.switchPage = function(nextOrPrevious) {
  var nextIndex = this.currentPageIndex_ + (nextOrPrevious ? 1 : -1);
  if (nextIndex < 0 || nextIndex == this.pages_.length)
    return;

  this.setCurrentPage(nextIndex);
  this.pager_.update(this.pages_.length, this.currentPageIndex_);
};


/**
 * Sets current page to page with 'index' index
 * @param {number} index
 */
anychart.chartEditorModule.controls.chartType.Pages.prototype.setCurrentPage = function(index) {
  if (this.locked_) return;

  var self = this;
  this.locked_ = true;
  var animationSpeed = 300;

  var size = goog.style.getSize(this.getElement());
  var endPointOld = this.currentPageIndex_ < index ? [-size.width, 0] : [size.width, 0];
  var startPointNew = this.currentPageIndex_ < index ? [size.width, 0] : [-size.width, 0];

  var oldPage = this.pages_[this.currentPageIndex_];
  this.currentPageIndex_ = index;
  var newPage = this.pages_[this.currentPageIndex_];

  var removeAnimation = new goog.fx.AnimationSerialQueue();
  removeAnimation.add(new goog.fx.dom.Slide(oldPage.getElement(), [0, 0], endPointOld, animationSpeed));
  goog.events.listenOnce(
      removeAnimation,
      goog.fx.Transition.EventType.END,
      function() {
        oldPage.hide(true);
        self.locked_ = false;
      });
  removeAnimation.play();

  var appearAnimation = new goog.fx.AnimationSerialQueue();
  appearAnimation.add(new goog.fx.dom.Slide(newPage.getElement(), startPointNew, [0, 0], animationSpeed));
  newPage.hide(false);
  appearAnimation.play();

  // this.currentPageIndex_ = index;
  // for (var i = 0; i < this.pages_.length; i++) {
  //   var page = this.pages_[i];
  //   page.hide(i != this.currentPageIndex_);
  // }
};


/**
 * @return {Element}
 */
anychart.chartEditorModule.controls.chartType.Pages.prototype.getCurrentPageElement = function() {
  return this.pages_[this.currentPageIndex_].getElement();
};


/**
 * Reset widget state to initial condition.
 */
anychart.chartEditorModule.controls.chartType.Pages.prototype.resetPages = function() {
  var dom = this.getDomHelper();
  var element = this.getElement();

  for (var i = 0; i < this.items_.length; i++) {
    var item = this.items_[i];
    dom.appendChild(element, item);
  }

  this.items_.length = 0;

  goog.disposeAll(this.pages_);
  this.pages_.length = 0;
};


/**
 * Create proper number of pages depend on items and fill in these pages with items.
 * Updates pager also.
 */
anychart.chartEditorModule.controls.chartType.Pages.prototype.updatePages = function() {
  this.currentPageIndex_ = 0;
  goog.disposeAll(this.pages_);
  this.pages_.length = 0;

  var dom = this.getDomHelper();
  var count = 0;
  var currentPage = null;
  var currentPageIndex = 0;

  for (var i = 0; i < this.items_.length; i++) {
    if (count == 0) {
      currentPage = new anychart.chartEditorModule.controls.chartType.Page(currentPageIndex);
      this.addChild(currentPage, true);
      this.pages_.push(currentPage);

      if (this.currentPageIndex_ != currentPageIndex) {
        currentPage.hide();
      }
    }
    var item = this.items_[i];
    dom.appendChild(currentPage.getElement(), item);

    count++;
    if (count > this.itemsPerPage_ - 1) {
      count = 0;
      currentPageIndex++;
    }
  }

  // Update pager
  this.pager_.update(this.pages_.length, this.currentPageIndex_);
};


/**
 * @param {Element} item
 */
anychart.chartEditorModule.controls.chartType.Pages.prototype.registerItem = function(item) {
  this.items_.push(item);
};
// endregion

// region ---- Page
/**
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.controls.chartType.Page = function(index, opt_domHelper) {
  anychart.chartEditorModule.controls.chartType.Page.base(this, 'constructor', opt_domHelper);

  this.index_ = index;
};
goog.inherits(anychart.chartEditorModule.controls.chartType.Page, anychart.chartEditorModule.Component);

/** @type {string} */
anychart.chartEditorModule.controls.chartType.Page.CSS_CLASS = goog.getCssName('anychart-chart-editor-chart-type-page-single');


/** @inheritDoc */
anychart.chartEditorModule.controls.chartType.Page.prototype.createDom = function() {
  anychart.chartEditorModule.controls.chartType.Page.base(this, 'createDom');

  this.addClassName(anychart.chartEditorModule.controls.chartType.Page.CSS_CLASS);
};
// endregion


// region ---- Pager
/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.controls.chartType.Pager = function(opt_domHelper) {
  anychart.chartEditorModule.controls.chartType.Pager.base(this, 'constructor', opt_domHelper);

  this.numPages_ = 0;
  this.currentPageIndex_ = 0;
};
goog.inherits(anychart.chartEditorModule.controls.chartType.Pager, anychart.chartEditorModule.Component);


/** @enum {string} */
anychart.chartEditorModule.controls.chartType.Pager.EventType = {
  CHANGE_PAGE: goog.events.getUniqueId('change_page')
};

/** @type {string} */
anychart.chartEditorModule.controls.chartType.Pager.CSS_CLASS = goog.getCssName('anychart-chart-editor-pager');


/** @inheritDoc */
anychart.chartEditorModule.controls.chartType.Pager.prototype.createDom = function() {
  anychart.chartEditorModule.controls.chartType.Pager.base(this, 'createDom');

  this.addClassName(anychart.chartEditorModule.controls.chartType.Pager.CSS_CLASS);
};

/** @inheritDoc */
anychart.chartEditorModule.controls.chartType.Pager.prototype.enterDocument = function() {
  anychart.chartEditorModule.controls.chartType.Pager.base(this, 'enterDocument');

  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK, this.onDotClick);
};


/**
 * Redraws pager dots.
 *
 * @param {number} numPages
 * @param {number} currentPage
 */
anychart.chartEditorModule.controls.chartType.Pager.prototype.update = function(numPages, currentPage) {
  this.numPages_ = numPages;
  this.currentPageIndex_ = currentPage;

  var element = this.getElement();
  var dom = this.getDomHelper();

  dom.removeChildren(element);
  if (this.numPages_ > 1) {
    for (var i = 0; i < this.numPages_; i++) {
      var dot = dom.createDom(goog.dom.TagName.DIV, {
        'data-index': i,
        'class': (i == this.currentPageIndex_ ? 'current' : '')
      });
      dom.appendChild(element, dot);
    }
  }
};


/**
 * Dot click handler.
 *
 * @param {Object} evt
 */
anychart.chartEditorModule.controls.chartType.Pager.prototype.onDotClick = function(evt) {
  var index = /** @type {Element} */(evt.target).getAttribute('data-index');

  if (!goog.isNull(index) && Number(index) != this.currentPageIndex_) {
    this.dispatchEvent({
      type: anychart.chartEditorModule.controls.chartType.Pager.EventType.CHANGE_PAGE,
      index: Number(index)
    });

    this.update(this.numPages_, Number(index));
  }
};
// endregion