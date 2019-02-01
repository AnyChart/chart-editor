goog.provide('chartEditor.ui.panel.Legend');

goog.require('chartEditor.ui.PanelIndexed');
goog.require('chartEditor.ui.panel.LegendAppearance');
goog.require('chartEditor.ui.panel.Title');


/**
 * @param {chartEditor.model.Base} model
 * @param {number=} opt_plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelIndexed}
 */
chartEditor.ui.panel.Legend = function(model, opt_plotIndex, opt_domHelper) {
  chartEditor.ui.panel.Legend.base(
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

  this.addClassName(goog.getCssName('anychart-ce-panel-legend-single'));
};
goog.inherits(chartEditor.ui.panel.Legend,chartEditor.ui.PanelIndexed);


/** @override */
chartEditor.ui.panel.Legend.prototype.createDom = function() {
  chartEditor.ui.panel.Legend.base(this, 'createDom');

  var content = this.getContentElement();
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var appearance = new chartEditor.ui.panel.LegendAppearance(model);
  appearance.setKey(this.key);
  appearance.allowEnabled(false);
  this.addChildControl(appearance);

  this.addContentSeparator();

  var title = new chartEditor.ui.panel.Title(model, 'Title');
  title.setPositionKey('orientation()');
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  this.appearance_ = appearance;
  this.title_ = title;
};


/** @inheritDoc */
chartEditor.ui.panel.Legend.prototype.updateKeys = function() {
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
  chartEditor.ui.panel.Legend.base(this, 'updateKeys');
};
