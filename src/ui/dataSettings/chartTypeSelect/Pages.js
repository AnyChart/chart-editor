goog.provide('chartEditor.ui.dataSettings.chartTypeSelect.Page');
goog.provide('chartEditor.ui.dataSettings.chartTypeSelect.Pager');
goog.provide('chartEditor.ui.dataSettings.chartTypeSelect.Pages');

goog.require('chartEditor.ui.Component');
goog.require('goog.fx.AnimationSerialQueue');
goog.require('goog.fx.dom.Slide');


// region ---- Pages
/**
 * Pages ui for chart type select menu.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.dataSettings.chartTypeSelect.Pages = function(opt_domHelper) {
  chartEditor.ui.dataSettings.chartTypeSelect.Pages.base(this, 'constructor', opt_domHelper);

  this.currentPageIndex_ = 0;

  this.itemsPerPage_ = 1;

  this.pages_ = [];

  this.items_ = [];

  this.addClassName(goog.getCssName('anychart-ce-chart-type-pages'));
};
goog.inherits(chartEditor.ui.dataSettings.chartTypeSelect.Pages, chartEditor.ui.Component);


/** @inheritDoc */
chartEditor.ui.dataSettings.chartTypeSelect.Pages.prototype.createDom = function() {
  chartEditor.ui.dataSettings.chartTypeSelect.Pages.base(this, 'createDom');

  this.pager_ = new chartEditor.ui.dataSettings.chartTypeSelect.Pager();
  this.addChild(this.pager_, true);
};


/** @inheritDoc */
chartEditor.ui.dataSettings.chartTypeSelect.Pages.prototype.enterDocument = function() {
  chartEditor.ui.dataSettings.chartTypeSelect.Pages.base(this, 'enterDocument');

  this.getHandler().listen(this.pager_, chartEditor.ui.dataSettings.chartTypeSelect.Pager.EventType.CHANGE_PAGE, function(evt) {
    this.setCurrentPage(evt.index);
  });
};


/**
 * @param {number} value
 */
chartEditor.ui.dataSettings.chartTypeSelect.Pages.prototype.setItemsPerPage = function(value) {
  this.itemsPerPage_ = value;
  this.updatePages();
};


/**
 * Switches pages forward or backward depend on argument value
 *
 * @param {boolean} nextOrPrevious If 'true' - switches forward
 */
chartEditor.ui.dataSettings.chartTypeSelect.Pages.prototype.switchPage = function(nextOrPrevious) {
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
chartEditor.ui.dataSettings.chartTypeSelect.Pages.prototype.setCurrentPage = function(index) {
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
chartEditor.ui.dataSettings.chartTypeSelect.Pages.prototype.getCurrentPageElement = function() {
  return this.pages_[this.currentPageIndex_].getElement();
};


/**
 * Reset widget state to initial condition.
 */
chartEditor.ui.dataSettings.chartTypeSelect.Pages.prototype.resetPages = function() {
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
chartEditor.ui.dataSettings.chartTypeSelect.Pages.prototype.updatePages = function() {
  this.currentPageIndex_ = 0;
  goog.disposeAll(this.pages_);
  this.pages_.length = 0;

  var dom = this.getDomHelper();
  var count = 0;
  var currentPage = null;
  var currentPageIndex = 0;

  for (var i = 0; i < this.items_.length; i++) {
    if (count == 0) {
      currentPage = new chartEditor.ui.dataSettings.chartTypeSelect.Page(currentPageIndex);
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
chartEditor.ui.dataSettings.chartTypeSelect.Pages.prototype.registerItem = function(item) {
  this.items_.push(item);
};
// endregion

// region ---- Page
/**
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.dataSettings.chartTypeSelect.Page = function(index, opt_domHelper) {
  chartEditor.ui.dataSettings.chartTypeSelect.Page.base(this, 'constructor', opt_domHelper);

  this.index_ = index;
};
goog.inherits(chartEditor.ui.dataSettings.chartTypeSelect.Page, chartEditor.ui.Component);

/** @type {string} */
chartEditor.ui.dataSettings.chartTypeSelect.Page.CSS_CLASS = goog.getCssName('anychart-ce-chart-type-page-single');


/** @inheritDoc */
chartEditor.ui.dataSettings.chartTypeSelect.Page.prototype.createDom = function() {
  chartEditor.ui.dataSettings.chartTypeSelect.Page.base(this, 'createDom');

  this.addClassName(chartEditor.ui.dataSettings.chartTypeSelect.Page.CSS_CLASS);
};
// endregion


// region ---- Pager
/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.dataSettings.chartTypeSelect.Pager = function(opt_domHelper) {
  chartEditor.ui.dataSettings.chartTypeSelect.Pager.base(this, 'constructor', opt_domHelper);

  this.numPages_ = 0;
  this.currentPageIndex_ = 0;
};
goog.inherits(chartEditor.ui.dataSettings.chartTypeSelect.Pager, chartEditor.ui.Component);


/** @enum {string} */
chartEditor.ui.dataSettings.chartTypeSelect.Pager.EventType = {
  CHANGE_PAGE: goog.events.getUniqueId('change_page')
};

/** @type {string} */
chartEditor.ui.dataSettings.chartTypeSelect.Pager.CSS_CLASS = goog.getCssName('anychart-ce-pager');


/** @inheritDoc */
chartEditor.ui.dataSettings.chartTypeSelect.Pager.prototype.createDom = function() {
  chartEditor.ui.dataSettings.chartTypeSelect.Pager.base(this, 'createDom');

  this.addClassName(chartEditor.ui.dataSettings.chartTypeSelect.Pager.CSS_CLASS);
};

/** @inheritDoc */
chartEditor.ui.dataSettings.chartTypeSelect.Pager.prototype.enterDocument = function() {
  chartEditor.ui.dataSettings.chartTypeSelect.Pager.base(this, 'enterDocument');

  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK, this.onDotClick);
};


/**
 * Redraws pager dots.
 *
 * @param {number} numPages
 * @param {number} currentPage
 */
chartEditor.ui.dataSettings.chartTypeSelect.Pager.prototype.update = function(numPages, currentPage) {
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
chartEditor.ui.dataSettings.chartTypeSelect.Pager.prototype.onDotClick = function(evt) {
  var index = /** @type {Element} */(evt.target).getAttribute('data-index');

  if (!goog.isNull(index) && Number(index) != this.currentPageIndex_) {
    this.dispatchEvent({
      type: chartEditor.ui.dataSettings.chartTypeSelect.Pager.EventType.CHANGE_PAGE,
      index: Number(index)
    });

    this.update(this.numPages_, Number(index));
  }
};
// endregion