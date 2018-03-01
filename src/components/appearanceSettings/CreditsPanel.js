goog.provide('anychart.chartEditorModule.CreditsPanel');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.input.Base');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.CreditsPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.CreditsPanel.base(this, 'constructor', model, 'License & Credits', opt_domHelper);

  this.key = [['chart'], ['settings'], 'credits()'];

  this.isValidKey_ = false;
};
goog.inherits(anychart.chartEditorModule.CreditsPanel, anychart.chartEditorModule.SettingsPanel);


/** @inheritDoc */
anychart.chartEditorModule.CreditsPanel.prototype.createDom = function() {
  anychart.chartEditorModule.CreditsPanel.base(this, 'createDom');

  var content = this.getContentElement();
  var licenseKeyLabel = goog.dom.createDom(
      goog.dom.TagName.LABEL,
      [
        goog.ui.INLINE_BLOCK_CLASSNAME,
        goog.getCssName('anychart-settings-label'),
        goog.getCssName('anychart-settings-label-block')
      ],
      'License key');
  goog.dom.appendChild(content, licenseKeyLabel);

  var licenseKey = new anychart.chartEditorModule.input.Base();
  this.addChild(licenseKey, true);
  this.licenseKey_ = licenseKey;

  goog.dom.appendChild(content, goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-gap')));

  var textLabel = goog.dom.createDom(
      goog.dom.TagName.LABEL,
      [
        goog.ui.INLINE_BLOCK_CLASSNAME,
        goog.getCssName('anychart-settings-label'),
        goog.getCssName('anychart-settings-label-block')
      ],
      'Text');
  goog.dom.appendChild(content, textLabel);
  this.registerLabel(textLabel);

  var text = new anychart.chartEditorModule.input.Base('Text');
  this.addChild(text, true);
  this.text_ = text;

  goog.dom.appendChild(content, goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-gap')));

  var urlLabel = goog.dom.createDom(
      goog.dom.TagName.LABEL,
      [
        goog.ui.INLINE_BLOCK_CLASSNAME,
        goog.getCssName('anychart-settings-label'),
        goog.getCssName('anychart-settings-label-block')
      ],
      'URL');
  goog.dom.appendChild(content, urlLabel);
  this.registerLabel(urlLabel);

  var url = new anychart.chartEditorModule.input.Base('Url');
  this.addChild(url, true);
  this.url_ = url;

  goog.dom.appendChild(content, goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-gap')));

  var logoLabel = goog.dom.createDom(
      goog.dom.TagName.LABEL,
      [
        goog.ui.INLINE_BLOCK_CLASSNAME,
        goog.getCssName('anychart-settings-label'),
        goog.getCssName('anychart-settings-label-block')
      ],
      'Logo URL');
  goog.dom.appendChild(content, logoLabel);
  this.registerLabel(logoLabel);

  var logoSrc = new anychart.chartEditorModule.input.Base('Logo');
  this.addChild(logoSrc, true);
  this.logoSrc_ = logoSrc;
};



/** @inheritDoc */
anychart.chartEditorModule.CreditsPanel.prototype.onChartDraw = function(evt) {
  anychart.chartEditorModule.CreditsPanel.base(this, 'onChartDraw', evt);

  var ac = goog.dom.getWindow()['anychart'];
  this.isValidKey_ = ac['isValidKey']();
  this.setContentEnabled(this.isValidKey_ && this.enableContentCheckbox.getChecked());

  if (this.licenseKey_) this.licenseKey_.setValueByTarget(ac, true);

  var chart = evt.chart;
  if (this.text_) this.text_.setValueByTarget(chart, true);
  if (this.url_) this.url_.setValueByTarget(chart, true);
  if (this.logoSrc_) this.logoSrc_.setValueByTarget(chart, true);


};

/** @inheritDoc */
anychart.chartEditorModule.CreditsPanel.prototype.updateKeys = function() {
  anychart.chartEditorModule.CreditsPanel.base(this, 'updateKeys');
  if (this.isExcluded()) return;

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  if (this.licenseKey_) this.licenseKey_.init(model, [['anychart'], 'licenseKey()']);
  if (this.text_) this.text_.init(model, this.genKey('text()'));
  if (this.url_) this.url_.init(model, this.genKey('url()'));
  if (this.logoSrc_) this.logoSrc_.init(model, this.genKey('logoSrc()'));
};


/** @inheritDoc */
anychart.chartEditorModule.CreditsPanel.prototype.setContentEnabled = function(enabled) {
  var contentEnabled = this.isValidKey_ && enabled;
  anychart.chartEditorModule.CreditsPanel.base(this, 'setContentEnabled', contentEnabled);

  if (this.enableContentCheckbox)
    this.enableContentCheckbox.setEnabled(this.isValidKey_);

  if (this.licenseKey_)
    this.licenseKey_.setEnabled(true);
};


/** @override */
anychart.chartEditorModule.CreditsPanel.prototype.disposeInternal = function() {
  this.licenseKey_ = null;
  this.text_ = null;
  this.url_ = null;
  this.logoSrc_ = null;

  anychart.chartEditorModule.CreditsPanel.base(this, 'disposeInternal');
};
