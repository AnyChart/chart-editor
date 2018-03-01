goog.provide('anychart.chartEditorModule.settings.Legend');

goog.require('anychart.chartEditorModule.SettingsPanelIndexed');
goog.require('anychart.chartEditorModule.settings.LegendAppearance');
goog.require('anychart.chartEditorModule.settings.Title');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number=} opt_plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanelIndexed}
 */
anychart.chartEditorModule.settings.Legend = function(model, opt_plotIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.Legend.base(
      this,
      'constructor',
      model,
      goog.isDef(opt_plotIndex) ? opt_plotIndex : 0,
      null,
      opt_domHelper);

  this.plotIndex_ = opt_plotIndex;

  var stringKey = 'legend()';
  if (goog.isDef(this.plotIndex_)) {
    stringKey = 'plot(' + this.plotIndex_ + ').' + stringKey;
    this.name = 'Legend (plot ' + this.plotIndex_ + ')';

  } else {
    this.name = 'Chart Legend';
  }

  this.key = [['chart'], ['settings'], stringKey];

  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-settings-panel-legend-single'));
};
goog.inherits(anychart.chartEditorModule.settings.Legend,anychart.chartEditorModule.SettingsPanelIndexed);


/** @override */
anychart.chartEditorModule.settings.Legend.prototype.createDom = function() {
  anychart.chartEditorModule.settings.Legend.base(this, 'createDom');

  var content = this.getContentElement();
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var appearance = new anychart.chartEditorModule.settings.LegendAppearance(model);
  appearance.setKey(this.key);
  appearance.allowEnabled(false);
  this.addChild(appearance, true);

  goog.dom.appendChild(content, goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator')));

  var title = new anychart.chartEditorModule.settings.Title(model, 'Title');
  title.setPositionKey('orientation()');
  title.setKey(this.genKey('title()'));
  this.addChild(title, true);

  this.appearance_ = appearance;
  this.title_ = title;
};


/** @inheritDoc */
anychart.chartEditorModule.settings.Legend.prototype.updateKeys = function() {
  if (!this.isExcluded()) {
    var stringKey = 'legend()';
    if (goog.isDef(this.plotIndex_))
      stringKey = 'plot(' + this.plotIndex_ + ').' + stringKey;
    this.key = [['chart'], ['settings'], stringKey];

    // Update keys of children
    if (this.appearance_) this.appearance_.setKey(this.key);
    if (this.title_) this.title_.setKey(this.genKey('title()'));
  }

  // Update key of enabled checkbox
  anychart.chartEditorModule.settings.Legend.base(this, 'updateKeys');
};


/** @override */
anychart.chartEditorModule.settings.Legend.prototype.disposeInternal = function() {
  this.appearance_.dispose();
  this.appearance_ = null;
  this.title_ = null;
  anychart.chartEditorModule.settings.Legend.base(this, 'disposeInternal');
};