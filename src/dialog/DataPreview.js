goog.provide('chartEditor.dialog.DataPreview');

goog.require('chartEditor.dialog.Base');
goog.require('goog.ui.Dialog');


/**
 * Modal dialog to show data set as a table.
 *
 * @param {string=} opt_class
 * @param {boolean=} opt_useIframeMask
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.dialog.Base}
 */
chartEditor.dialog.DataPreview = function(opt_class, opt_useIframeMask, opt_domHelper) {
  chartEditor.dialog.DataPreview.base(this, 'constructor', opt_class, opt_useIframeMask, opt_domHelper);

  this.setButtonSet(goog.ui.Dialog.ButtonSet.createOk());

  this.currentRow_ = 0;
  this.rowsPerPage_ = 100;
};
goog.inherits(chartEditor.dialog.DataPreview, chartEditor.dialog.Base);


/** @inheritDoc */
chartEditor.dialog.DataPreview.prototype.createDom = function() {
  chartEditor.dialog.DataPreview.base(this, 'createDom');
  goog.dom.classlist.add(this.getDialogElement(), goog.getCssName('anychart-ce-data-preview-dialog'));

  var window = this.getDomHelper().getWindow();
  this.getHandler().listen(window, goog.events.EventType.RESIZE, this.resizeHeader);
};


/**
 * @param {Object} dataSet
 */
chartEditor.dialog.DataPreview.prototype.updateContent = function(dataSet) {
  this.setTitle('Preview Data: ' + dataSet.title);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var dom = this.getDomHelper();
  var content = this.getContentElement();
  dom.removeChildren(content);

  if (this.headDivEl_)
    dom.removeNode(this.headDivEl_);

  var fields = dataSet.fields;

  this.headRowEl_ = dom.createDom(goog.dom.TagName.TR);
  this.headDivEl_ = dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-data-preview-header');

  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    dom.appendChild(this.headRowEl_,
        dom.createDom(goog.dom.TagName.TH, null,
            dom.createDom(goog.dom.TagName.DIV, 'inner', field.name,
                dom.createDom(goog.dom.TagName.SPAN, null, field.type))
        ));

    dom.appendChild(this.headDivEl_,
        dom.createDom(goog.dom.TagName.DIV, 'item',
            field.name,
            dom.createDom(goog.dom.TagName.SPAN, null, field.type)));
  }

  var table = dom.createDom(goog.dom.TagName.TABLE, goog.getCssName('anychart-ce-data-preview-table'), this.headRowEl_);

  var rawData = model.getRawData(false, this.currentRow_ * this.rowsPerPage_, this.rowsPerPage_);
  for (var r = 0; r < rawData.length; r++) {
    var row = dom.createDom(goog.dom.TagName.TR, r % 2 ? 'odd' : 'even');
    for (var r2 = 0; r2 < fields.length; r2++) {
      var key = fields[r2].key;
      var value = '';
      var className = null;
      if (goog.isDef(rawData[r][key]))
        value = String(rawData[r][key]);
      else
        value = className = 'empty';

      dom.appendChild(row,
          dom.createDom(goog.dom.TagName.TD, className, value));
    }
    dom.appendChild(table, row);
  }

  dom.appendChild(content, table);
  dom.appendChild(this.getDialogElement(), this.headDivEl_);
  
  this.resizeHeader();
};

/**
 * Updates sizes of header div elements
 */
chartEditor.dialog.DataPreview.prototype.resizeHeader = function() {
  if (this.headRowEl_ && this.headDivEl_) {
    var headTableColumns = goog.dom.getChildren(this.headRowEl_);
    var headColumns = goog.dom.getChildren(this.headDivEl_);
    for (var h = 0; h < headTableColumns.length; h++) {
      var divEl = goog.dom.getChildren(headTableColumns[h])[0];
      var size = goog.style.getSize(divEl);
      goog.style.setWidth(headColumns[h], size.width);
      goog.style.setHeight(headColumns[h], size.height);
    }
  }
};