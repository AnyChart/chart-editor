goog.provide('chartEditor.settings.Legend');

goog.require('chartEditor.SettingsPanelIndexed');
goog.require('chartEditor.settings.LegendAppearance');
goog.require('chartEditor.settings.Title');


/**
 * @param {chartEditor.EditorModel} model
 * @param {number=} opt_plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelIndexed}
 */
chartEditor.settings.Legend = function(model, opt_plotIndex, opt_domHelper) {
  chartEditor.settings.Legend.base(
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

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-legend-single'));
};
goog.inherits(chartEditor.settings.Legend,chartEditor.SettingsPanelIndexed);


/** @override */
chartEditor.settings.Legend.prototype.createDom = function() {
  chartEditor.settings.Legend.base(this, 'createDom');

  var content = this.getContentElement();
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var appearance = new chartEditor.settings.LegendAppearance(model);
  appearance.setKey(this.key);
  appearance.allowEnabled(false);
  this.addChildControl(appearance);

  this.addContentSeparator();

  var title = new chartEditor.settings.Title(model, 'Title');
  title.setPositionKey('orientation()');
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  this.appearance_ = appearance;
  this.title_ = title;
};


/** @inheritDoc */
chartEditor.settings.Legend.prototype.updateKeys = function() {
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
  chartEditor.settings.Legend.base(this, 'updateKeys');
};
