goog.provide('chartEditor.dialog.Sample');

goog.require('chartEditor.dialog.Base');
goog.require('goog.ui.Dialog');



/**
 * Modal dialog for adding custom data on Prepare Data step.
 *
 * @param {string=} opt_class
 * @param {boolean=} opt_useIframeMask
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.dialog.Base}
 */
chartEditor.dialog.Sample = function(opt_class, opt_useIframeMask, opt_domHelper) {
  chartEditor.dialog.Sample.base(this, 'constructor', opt_class, opt_useIframeMask, opt_domHelper);

  this.setButtonSet(goog.ui.Dialog.ButtonSet.createOk());
};
goog.inherits(chartEditor.dialog.Sample, chartEditor.dialog.Base);


/** @inheritDoc */
chartEditor.dialog.Sample.prototype.createDom = function() {
  chartEditor.dialog.Sample.base(this, 'createDom');
  goog.dom.classlist.add(this.getDialogElement(), goog.getCssName('anychart-ce-sample-dialog'));
};


/**
 * @param {string} sampleId
 */
chartEditor.dialog.Sample.prototype.updateContent = function(sampleId) {
  var url;
  switch (sampleId) {
    case '0':
      url = goog.string.Const.from('https://playground.anychart.com/Am9GhFAi/iframe');
      break;
    case '1':
      url = goog.string.Const.from('https://playground.anychart.com/w5ORYMFk/iframe');
      break;
    case '2':
      url = goog.string.Const.from('https://playground.anychart.com/kKPKdynU/iframe');
      break;
    case '3':
      url = goog.string.Const.from('https://playground.anychart.com/0by3leSz/iframe');
      break;
    case '4':
      url = goog.string.Const.from('https://playground.anychart.com/w53HhM4M/iframe');
      break;
    case '5':
      url = goog.string.Const.from('https://playground.anychart.com/iorQnr8z/iframe');
      break;
    case '6':
      url = goog.string.Const.from('https://playground.anychart.com/VQjHcmpS/iframe');
      break;
    case '7':
      url = goog.string.Const.from('https://playground.anychart.com/ZdC5wLrc/iframe');
      break;
    case '8':
      url = goog.string.Const.from('https://playground.anychart.com/cxDZ8inm/iframe');
      break;
    case '9':
      url = goog.string.Const.from('https://playground.anychart.com/de0sksKj/iframe');
      break;
    case '10':
      url = goog.string.Const.from('https://playground.anychart.com/pj0SDe5D/iframe');
      break;
    case '11':
      url = goog.string.Const.from('https://playground.anychart.com/qfPGO1W3/iframe');
      break;
    case '12':
      url = goog.string.Const.from('https://playground.anychart.com/7lJkkH91/iframe');
      break;
    case '13':
      url = goog.string.Const.from('https://playground.anychart.com/ttawqBi3/iframe');
      break;
    case '14':
      url = goog.string.Const.from('https://playground.anychart.com/1t8Cw7kO/iframe');
      break;
    case '15':
      url = goog.string.Const.from('https://playground.anychart.com/6zCq3jJ9/iframe');
      break;
    case '16':
      url = goog.string.Const.from('https://playground.anychart.com/quoyYTa2/iframe');
      break;
    case '17':
      url = goog.string.Const.from('https://playground.anychart.com/haBJcinU/iframe');
      break;
    case '18':
      url = goog.string.Const.from('https://playground.anychart.com/wnH672BM/iframe');
      break;
    case '19':
      url = goog.string.Const.from('https://playground.anychart.com/MEPMaSze/1/iframe');
      break;
  }

  if (url) {
    var trustedUrl = goog.html.TrustedResourceUrl.fromConstant(url);
    var iframe = goog.html.SafeHtml.createIframe(trustedUrl, null, {
      'sandbox': 'allow-scripts',
      'width': '100%',
      'height': '100%'
    });

    this.setTitle('Chart sample');
    this.setSafeHtmlContent(iframe);
  }

  var dom = this.getDomHelper();
  var className = goog.getCssName('anychart-ce-loader');

  var rotatingCover = dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName(className, 'rotating-cover'),
      dom.createDom(
          goog.dom.TagName.DIV,
          goog.getCssName(className, 'rotating-plane'),
          dom.createDom(
              goog.dom.TagName.DIV,
              goog.getCssName(className, 'chart-row'),
              dom.createDom(
                  goog.dom.TagName.DIV,
                  [
                    goog.getCssName(className, 'chart-col'),
                    goog.getCssName(className, 'green')
                  ]),
              dom.createDom(
                  goog.dom.TagName.DIV,
                  [
                    goog.getCssName(className, 'chart-col'),
                    goog.getCssName(className, 'orange')
                  ]),
              dom.createDom(
                  goog.dom.TagName.DIV,
                  [
                    goog.getCssName(className, 'chart-col'),
                    goog.getCssName(className, 'red')
                  ])
          )
      ));

  dom.appendChild(this.getContentElement(), rotatingCover);
};
