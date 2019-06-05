goog.provide('chartEditor.ui.panel.Legend');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.panel.Title');


/**
 * @param {chartEditor.model.Base} model
 * @param {number=} opt_plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
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
goog.inherits(chartEditor.ui.panel.Legend,chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.Legend.prototype.createDom = function() {
  chartEditor.ui.panel.Legend.base(this, 'createDom');

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

  this.addContentSeparator();

  var title = new chartEditor.ui.panel.Title(model, 'Title');
  title.setPositionKey('orientation()');
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);
};
