goog.provide('chartEditor.settings.LegendAppearance');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.Title');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.LegendAppearance = function(model, opt_domHelper) {
  chartEditor.settings.LegendAppearance.base(this, 'constructor', model, null, opt_domHelper);
};
goog.inherits(chartEditor.settings.LegendAppearance, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.LegendAppearance.CSS_CLASS = goog.getCssName('anychart-ce-settings-legend-appearance');


/** @override */
chartEditor.settings.LegendAppearance.prototype.createDom = function() {
  chartEditor.settings.LegendAppearance.base(this, 'createDom');

  var element = this.getElement();
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  goog.dom.classlist.add(element, chartEditor.settings.LegendAppearance.CSS_CLASS);

  var layout = new chartEditor.controls.select.DataField({label: 'Layout'});
  layout.getSelect().setOptions([
    {value: 'horizontal'},
    {value: 'vertical'}
  ]);
  layout.init(model, this.genKey('itemsLayout()'));
  this.addChildControl(layout);

  var position = new chartEditor.controls.select.DataField({label: 'Orientation'});
  position.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'right', icon: 'ac ac-position-right'},
    {value: 'top', icon: 'ac ac-position-top'},
    {value: 'bottom', icon: 'ac ac-position-bottom'}
  ]);
  position.init(model, this.genKey('position()'));
  this.addChildControl(position);

  var align = new chartEditor.controls.select.DataField({label: 'Align'});
  align.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'center', icon: 'ac ac-position-center'},
    {value: 'right', icon: 'ac ac-position-right'}
  ]);
  align.init(model, this.genKey('align()'));
  this.addChildControl(align);

  var items = new chartEditor.settings.Title(model, null);
  items.allowEnabled(false);
  items.allowEditTitle(false);
  items.allowEditPosition(false);
  items.allowEditAlign(false);
  items.allowEditColor(false);
  items.setKey(this.getKey());
  this.addChild(items, true);
};
