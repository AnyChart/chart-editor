goog.provide('chartEditor.ui.control.select.DataType');


//region -- Requirements.
goog.require('chartEditor.ui.control.Menu');
goog.require('chartEditor.ui.control.MenuRenderer');
goog.require('chartEditor.ui.control.fieldSelect.SelectMenuItem');
goog.require('goog.ui.Select');



//endregion
//region -- Constructor.
/**
 * TODO (A.Kudryavtsev): Describe.
 * @param {chartEditor.ui.dataSets.edit.ColumnsController.Column} column - Related column.
 * @param {goog.ui.ControlContent=} opt_caption Default caption or existing DOM
 *     structure to display as the button's caption when nothing is selected.
 *     Defaults to no caption.
 * @param {goog.ui.Menu=} opt_menu Menu containing selection options.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the control; defaults to {@link goog.ui.MenuButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer Renderer used to render or
 *     decorate the menu; defaults to {@link goog.ui.MenuRenderer}.
 * @constructor
 * @extends {goog.ui.Select}
 */
chartEditor.ui.control.select.DataType = function(column, opt_caption, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer) {
  chartEditor.ui.control.select.DataType.base(this, 'constructor', opt_caption, opt_menu, chartEditor.ui.control.fieldSelect.SelectRenderer.getInstance(), opt_domHelper, opt_menuRenderer);

  /**
   * Related column.
   * @type {chartEditor.ui.dataSets.edit.ColumnsController.Column}
   */
  this.column = column;
  var stringItem = new chartEditor.ui.control.fieldSelect.SelectMenuItem({caption: 'string'});
  stringItem.addClassName('anychart-ce-control-menu-item');
  var numberItem = new chartEditor.ui.control.fieldSelect.SelectMenuItem({caption: 'number'});
  numberItem.addClassName('anychart-ce-control-menu-item');

  this.addItem(stringItem);
  this.addItem(numberItem);

  //TODO (A.Kudryavtsev): Left for a while until more Data Types will be added.
  if (column.type == chartEditor.ui.dataSets.edit.ColumnsController.DataType.STRING) {
    this.setSelectedIndex(0);
  } else if (column.type == chartEditor.ui.dataSets.edit.ColumnsController.DataType.NUMBER) {
    this.setSelectedIndex(1);
  }

  this.addClassName('anychart-ce-menu-button-data-type');
  // this.addClassName('anychart-ce-flat-menu-button');
};
goog.inherits(chartEditor.ui.control.select.DataType, goog.ui.Select);


//endregion

/** @inheritDoc */
chartEditor.ui.control.select.DataType.prototype.getMenu = function() {
  if (!this.cMenu_) {
    this.cMenu_ = new chartEditor.ui.control.Menu(
        'anychart-ce-menu-data-type',
        this.getDomHelper(),
        chartEditor.ui.control.MenuRenderer.getInstance()
    );
    this.setMenu(this.cMenu_);
  }
  return this.cMenu_ || null;
};


/**
 * @inheritDoc
 */
chartEditor.ui.control.select.DataType.prototype.handleMenuAction = function(e) {
  e.stopPropagation();
  chartEditor.ui.control.select.DataType.base(this, 'handleMenuAction', e);
};