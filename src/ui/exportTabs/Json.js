goog.provide('chartEditor.ui.exportTabs.Json');

goog.require('chartEditor.ui.Panel');
goog.require('goog.Timer');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.exportTabs.Json = function(model, opt_domHelper) {
  chartEditor.ui.exportTabs.Json.base(this, 'constructor', model, 'JSON', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.JSON;

  this.key = [];
};
goog.inherits(chartEditor.ui.exportTabs.Json, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.exportTabs.Json.prototype.enterDocument = function() {
  chartEditor.ui.exportTabs.Json.base(this, 'enterDocument');

  if (!this.isExcluded()) {
    this.dispatchEvent({
      type: chartEditor.events.EventType.WAIT,
      wait: true
    });
  }
};


/** @inheritDoc */
chartEditor.ui.exportTabs.Json.prototype.onChartDraw = function(evt) {
  chartEditor.ui.exportTabs.Json.base(this, 'onChartDraw', evt);

  var self = this;
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var json = model.getChartAsJson();

  var dom = this.getDomHelper();
  if (this.preEl)
    dom.removeNode(this.preEl);

  this.codeEl = dom.createDom(goog.dom.TagName.CODE, 'language-json', json);
  this.preEl = dom.createDom(goog.dom.TagName.PRE, 'language-json', this.codeEl);
  dom.appendChild(this.getContentElement(), this.preEl);

  var chartContainer = dom.getElementByClass('anychart-ce-chart-container');
  if (chartContainer) {
    var h = goog.style.getSize(chartContainer).height;
    goog.style.setHeight(this.preEl, h);
  }

  var wrapperEl = dom.getAncestorByClass( this.preEl, 'anychart-ce-tabs-tab-content');
  if (wrapperEl) {
    goog.style.setStyle(wrapperEl, 'overflow-y', 'hidden');
  }

  var prism = goog.dom.getWindow()['Prism'];
  if (prism) {
    prism['highlightElement'](this.codeEl);
  }

  goog.Timer.callOnce(function(){
    self.dispatchEvent({
      type: chartEditor.events.EventType.WAIT,
      wait: false
    });
  }, 10);
};


/** @inheritDoc */
chartEditor.ui.exportTabs.Json.prototype.disposeInternal = function() {
  this.preEl = this.codeEl = null;

  chartEditor.ui.exportTabs.Json.base(this, 'disposeInternal');
};
