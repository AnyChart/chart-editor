goog.provide('chartEditor.ui.dialog.Crosslink');

goog.require('chartEditor.ui.dialog.Base');
goog.require('goog.html.SafeHtml');
goog.require('goog.html.sanitizer.HtmlSanitizer');
goog.require('goog.ui.Dialog');



/**
 * Modal dialog for crosslink message when user tries to use unavailable chart type.
 *
 * @param {string=} opt_class
 * @param {boolean=} opt_useIframeMask
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.dialog.Base}
 */
chartEditor.ui.dialog.Crosslink = function(opt_class, opt_useIframeMask, opt_domHelper) {
  chartEditor.ui.dialog.Crosslink.base(this, 'constructor', opt_class, opt_useIframeMask, opt_domHelper);

  this.setButtonSet(goog.ui.Dialog.ButtonSet.createOk());
};
goog.inherits(chartEditor.ui.dialog.Crosslink, chartEditor.ui.dialog.Base);


/** @inheritDoc */
chartEditor.ui.dialog.Crosslink.prototype.createDom = function(){
  chartEditor.ui.dialog.Crosslink.base(this, 'createDom');

  goog.dom.classlist.add(this.getDialogElement(), goog.getCssName('anychart-ce-dialog-crosslink'));

  this.setTitle('Chart type is not available');
};


/**
 * @param {number} productId
 */
chartEditor.ui.dialog.Crosslink.prototype.updateContent = function(productId) {
  var element = this.getContentElement();
  goog.dom.removeChildren(element);

  var currentProduct = chartEditor.model.ProductDescription[chartEditor.PRODUCT];
  var requredProduct = chartEditor.model.ProductDescription[productId];

  var sanitizer = new goog.html.sanitizer.HtmlSanitizer.Builder().build();var fragment1 =  goog.dom.safeHtmlToNode(sanitizer.sanitize( 'This chart type is not available in <b>' + currentProduct.name + '</b> extension'));
  var fragment2 =  goog.dom.safeHtmlToNode(sanitizer.sanitize( 'If you want to use this chart type you need <b>' + requredProduct.name + '</b> extension!'));
  var fragment3 = goog.dom.createDom(
      goog.dom.TagName.A,
      {'href': requredProduct.url, 'target': '_blank'},
      'Download and install ' + requredProduct.name + ' extension at ' + chartEditor.model.Base.SOLUTION_DATA.marketName);

  goog.dom.appendChild(element, goog.dom.createDom(goog.dom.TagName.P, null, fragment1));
  goog.dom.appendChild(element, goog.dom.createDom(goog.dom.TagName.P, null, fragment2));
  goog.dom.appendChild(element, goog.dom.createDom(goog.dom.TagName.P, null, fragment3));
};
