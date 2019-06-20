goog.provide('chartEditor.ui.panel.scales.StockY');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.panel.Title');
goog.require('chartEditor.ui.panel.scales.Linear');


/**
 * @param {chartEditor.model.Base} model
 * @param {number} plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.scales.StockY = function(model, plotIndex, opt_domHelper) {
  chartEditor.ui.panel.scales.StockY.base(
    this,
    'constructor',
    model,
    plotIndex,
    null,
    opt_domHelper);

  this.plotIndex_ = plotIndex;

  var stringKey = 'plot(' + this.plotIndex_ + ').yScale()';
  this.name = 'Y-scale (plot ' + this.plotIndex_ + ')';

  this.key = [['chart'], ['settings'], stringKey];

  this.allowEnabled(false);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-legend-single'));
};
goog.inherits(chartEditor.ui.panel.scales.StockY,chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.scales.StockY.prototype.createDom = function() {
  chartEditor.ui.panel.scales.StockY.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());


  var scaleType = new chartEditor.ui.control.fieldSelect.Base({label: 'Scale type'});
  scaleType.getSelect().setOptions([
    {value: 'linear'},
    {value: 'log'}
  ]);
  /**
   *  Force chart rebuild is required to avoid the AnyChart bug 8.6.0
   *  When the yScale type has changed it requires force redraw
   */
  scaleType.init(model, this.getKey(), void 0, true);

  // TODO: we have to override properly it to get the value by another key
  scaleType.setValueByTarget = function (target) {
    debugger;
    this.target = target;
    // var stringKey = chartEditor.model.Base.getStringKey(this.key);
    // var value = chartEditor.binding.exec(this.target, 'plot(' + this.plotIndex_ + ').yScale().getType()');
    var value = chartEditor.binding.exec(this.target, 'plot(' + 0 + ').yScale().getType()');
    this.setValue(value);
  };
  this.addChildControl(scaleType);

  this.addContentSeparator();

  var scale = new chartEditor.ui.panel.scales.Linear(model);
  scale.setKey(this.getKey());
  this.addChildControl(scale);

  // var layout = new chartEditor.ui.control.fieldSelect.Base({label: 'Layout'});
  // layout.getSelect().setOptions([
  //   {value: 'horizontal'},
  //   {value: 'vertical'}
  // ]);
  // layout.init(model, this.genKey('itemsLayout()'));
  // this.addChildControl(layout);
  //
  // var position = new chartEditor.ui.control.fieldSelect.Base({label: 'Orientation'});
  // position.getSelect().setOptions([
  //   {value: 'left', icon: 'ac ac-position-left'},
  //   {value: 'right', icon: 'ac ac-position-right'},
  //   {value: 'top', icon: 'ac ac-position-top'},
  //   {value: 'bottom', icon: 'ac ac-position-bottom'}
  // ]);
  // position.init(model, this.genKey('position()'));
  // this.addChildControl(position);
  //
  // var align = new chartEditor.ui.control.fieldSelect.Base({label: 'Align'});
  // align.getSelect().setOptions([
  //   {value: 'left', icon: 'ac ac-position-left'},
  //   {value: 'center', icon: 'ac ac-position-center'},
  //   {value: 'right', icon: 'ac ac-position-right'}
  // ]);
  // align.init(model, this.genKey('align()'));
  // this.addChildControl(align);
  //
  // var items = new chartEditor.ui.panel.Title(model, null);
  // items.allowEnabled(false);
  // items.allowEditTitle(false);
  // items.allowEditPosition(false);
  // items.allowEditAlign(false);
  // items.setKey(this.getKey());
  // this.addChildControl(items);
  //
  // this.addContentSeparator();
  //
  // var title = new chartEditor.ui.panel.Title(model, 'Title');
  // title.setPositionKey('orientation()');
  // title.setKey(this.genKey('title()'));
  // this.addChildControl(title);
};
