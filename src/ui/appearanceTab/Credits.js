goog.provide('chartEditor.ui.appearanceTabs.Credits');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.input.Base');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.Credits = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Credits.base(this, 'constructor', model, 'License & Credits', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.CREDITS;

  this.key = [['chart'], ['settings'], 'credits()'];

  this.isValidKey_ = false;
};
goog.inherits(chartEditor.ui.appearanceTabs.Credits, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Credits.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.Credits.base(this, 'createDom');

  var content = this.getContentElement();
  var licenseKeyLabel = goog.dom.createDom(
      goog.dom.TagName.LABEL,
      [
        goog.ui.INLINE_BLOCK_CLASSNAME,
        goog.getCssName('anychart-ce-panel-label'),
        goog.getCssName('anychart-ce-panel-label-block')
      ],
      'License key');
  goog.dom.appendChild(content, licenseKeyLabel);

  var licenseKey = new chartEditor.ui.control.input.Base();  
  this.addChild(licenseKey, true);
  licenseKey.addClassName('wide-width');
  this.licenseKey_ = licenseKey;

  goog.dom.appendChild(content, goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-panel-item-gap')));

  var textLabel = goog.dom.createDom(
      goog.dom.TagName.LABEL,
      [
        goog.ui.INLINE_BLOCK_CLASSNAME,
        goog.getCssName('anychart-ce-panel-label'),
        goog.getCssName('anychart-ce-panel-label-block')
      ],
      'Text');
  goog.dom.appendChild(content, textLabel);
  this.registerLabel(textLabel);

  var text = new chartEditor.ui.control.input.Base('Text');
  this.addChild(text, true);
  text.addClassName('wide-width');
  this.text_ = text;

  goog.dom.appendChild(content, goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-panel-item-gap')));

  var urlLabel = goog.dom.createDom(
      goog.dom.TagName.LABEL,
      [
        goog.ui.INLINE_BLOCK_CLASSNAME,
        goog.getCssName('anychart-ce-panel-label'),
        goog.getCssName('anychart-ce-panel-label-block')
      ],
      'URL');
  goog.dom.appendChild(content, urlLabel);
  this.registerLabel(urlLabel);

  var url = new chartEditor.ui.control.input.Base('Url');
  this.addChild(url, true);
  url.addClassName('wide-width');
  this.url_ = url;

  goog.dom.appendChild(content, goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-panel-item-gap')));

  var logoLabel = goog.dom.createDom(
      goog.dom.TagName.LABEL,
      [
        goog.ui.INLINE_BLOCK_CLASSNAME,
        goog.getCssName('anychart-ce-panel-label'),
        goog.getCssName('anychart-ce-panel-label-block')
      ],
      'Logo URL');
  goog.dom.appendChild(content, logoLabel);
  this.registerLabel(logoLabel);

  var logoSrc = new chartEditor.ui.control.input.Base('Logo');
  this.addChild(logoSrc, true);
  logoSrc.addClassName('wide-width');
  this.logoSrc_ = logoSrc;
};



/** @inheritDoc */
chartEditor.ui.appearanceTabs.Credits.prototype.onChartDraw = function(evt) {
  chartEditor.ui.appearanceTabs.Credits.base(this, 'onChartDraw', evt);

  var ac = goog.dom.getWindow()['anychart'];
  this.isValidKey_ = ac['utils']['printUtilsBoolean']();
  this.setContentEnabled(this.isValidKey_ && this.enableContentCheckbox.getChecked());

  if (this.licenseKey_) this.licenseKey_.setValueByTarget(ac, true);

  var chart = evt.chart;
  if (this.text_) this.text_.setValueByTarget(chart, true);
  if (this.url_) this.url_.setValueByTarget(chart, true);
  if (this.logoSrc_) this.logoSrc_.setValueByTarget(chart, true);
};

/** @inheritDoc */
chartEditor.ui.appearanceTabs.Credits.prototype.updateKeys = function() {
  chartEditor.ui.appearanceTabs.Credits.base(this, 'updateKeys');
  if (this.isExcluded()) return;

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  if (this.licenseKey_) this.licenseKey_.init(model, [['anychart'], 'licenseKey()']);
  if (this.text_) this.text_.init(model, this.genKey('text()'));
  if (this.url_) this.url_.init(model, this.genKey('url()'));
  if (this.logoSrc_) this.logoSrc_.init(model, this.genKey('logoSrc()'));
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Credits.prototype.setContentEnabled = function(enabled) {
  var contentEnabled = this.isValidKey_ && enabled;
  chartEditor.ui.appearanceTabs.Credits.base(this, 'setContentEnabled', contentEnabled);

  if (this.enableContentCheckbox)
    this.enableContentCheckbox.setEnabled(this.isValidKey_);

  if (this.licenseKey_)
    this.licenseKey_.setEnabled(true);
};


/** @override */
chartEditor.ui.appearanceTabs.Credits.prototype.disposeInternal = function() {
  this.licenseKey_ = null;
  this.text_ = null;
  this.url_ = null;
  this.logoSrc_ = null;

  chartEditor.ui.appearanceTabs.Credits.base(this, 'disposeInternal');
};
