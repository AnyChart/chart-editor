goog.provide('anychart.chartEditorModule.settings.LegendAppearance');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.Title');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.LegendAppearance = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.LegendAppearance.base(this, 'constructor', model, null, opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.settings.LegendAppearance, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.LegendAppearance.CSS_CLASS = goog.getCssName('anychart-settings-legend-appearance');


/** @override */
anychart.chartEditorModule.settings.LegendAppearance.prototype.createDom = function() {
  anychart.chartEditorModule.settings.LegendAppearance.base(this, 'createDom');

  var element = this.getElement();
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  goog.dom.classlist.add(element, anychart.chartEditorModule.settings.LegendAppearance.CSS_CLASS);

  var layout = new anychart.chartEditorModule.controls.select.DataField({label: 'Layout'});
  layout.getSelect().setOptions([
    {value: 'horizontal'},
    {value: 'vertical'}
  ]);
  layout.init(model, this.genKey('itemsLayout()'));
  this.addChildControl(layout);

  var position = new anychart.chartEditorModule.controls.select.DataField({label: 'Orientation'});
  position.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'right', icon: 'ac ac-position-right'},
    {value: 'top', icon: 'ac ac-position-top'},
    {value: 'bottom', icon: 'ac ac-position-bottom'}
  ]);
  position.init(model, this.genKey('position()'));
  this.addChildControl(position);

  var align = new anychart.chartEditorModule.controls.select.DataField({label: 'Align'});
  align.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'center', icon: 'ac ac-position-center'},
    {value: 'right', icon: 'ac ac-position-right'}
  ]);
  align.init(model, this.genKey('align()'));
  this.addChildControl(align);

  var items = new anychart.chartEditorModule.settings.Title(model, null);
  items.allowEnabled(false);
  items.allowEditTitle(false);
  items.allowEditPosition(false);
  items.allowEditAlign(false);
  items.allowEditColor(false);
  items.setKey(this.getKey());
  this.addChild(items, true);
};
