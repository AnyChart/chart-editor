goog.provide('chartEditor.ui.appearanceTabs.Quarters');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.Quarter');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.Quarters = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Quarters.base(this, 'constructor', model, 'Quarters', opt_domHelper);
  this.stringId = chartEditor.enums.EditorTabs.QUARTERS;
  this.key = [['chart'], ['settings'], 'quarters()'];
  this.allowEnabled(false);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.Quarters, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Quarters.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.Quarters.base(this, 'createDom');
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var leftTop = new chartEditor.ui.panel.Quarter(model);
  leftTop.setName('Left Top Quarter');
  leftTop.setKey(this.genKey('leftTop()'));
  this.addChildControl(leftTop);

  this.addContentSeparator();

  var rightTop = new chartEditor.ui.panel.Quarter(model);
  rightTop.setName('Right Top Quarter');
  rightTop.setKey(this.genKey('rightTop()'));
  this.addChildControl(rightTop);

  this.addContentSeparator();

  var leftBottom = new chartEditor.ui.panel.Quarter(model);
  leftBottom.setName('Left Bottom Quarter');
  leftBottom.setKey(this.genKey('leftBottom()'));
  this.addChildControl(leftBottom);

  this.addContentSeparator();

  var rightBottom = new chartEditor.ui.panel.Quarter(model);
  rightBottom.setName('Right Bottom Quarter');
  rightBottom.setKey(this.genKey('rightBottom()'));
  this.addChildControl(rightBottom);
};
