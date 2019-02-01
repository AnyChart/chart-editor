goog.provide('chartEditor.ui.panel.LegendAppearance');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.panel.Title');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.LegendAppearance = function(model, opt_domHelper) {
  chartEditor.ui.panel.LegendAppearance.base(this, 'constructor', model, null, opt_domHelper);

  this.addClassName(goog.getCssName('anychart-ce-panel-legend-appearance'));
};
goog.inherits(chartEditor.ui.panel.LegendAppearance, chartEditor.ui.Panel);



/** @override */
chartEditor.ui.panel.LegendAppearance.prototype.createDom = function() {
  chartEditor.ui.panel.LegendAppearance.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var layout = new chartEditor.ui.control.fieldSelect.Base({label: 'Layout'});
  layout.getSelect().setOptions([
    {value: 'horizontal'},
    {value: 'vertical'}
  ]);
  layout.init(model, this.genKey('itemsLayout()'));
  this.addChildControl(layout);

  var position = new chartEditor.ui.control.fieldSelect.Base({label: 'Orientation'});
  position.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'right', icon: 'ac ac-position-right'},
    {value: 'top', icon: 'ac ac-position-top'},
    {value: 'bottom', icon: 'ac ac-position-bottom'}
  ]);
  position.init(model, this.genKey('position()'));
  this.addChildControl(position);

  var align = new chartEditor.ui.control.fieldSelect.Base({label: 'Align'});
  align.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'center', icon: 'ac ac-position-center'},
    {value: 'right', icon: 'ac ac-position-right'}
  ]);
  align.init(model, this.genKey('align()'));
  this.addChildControl(align);

  var items = new chartEditor.ui.panel.Title(model, null);
  items.allowEnabled(false);
  items.allowEditTitle(false);
  items.allowEditPosition(false);
  items.allowEditAlign(false);
  items.setKey(this.getKey());
  this.addChildControl(items);
};
