goog.provide('chartEditor.ui.dialog.Data');

goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.dialog.Base');
goog.require('chartEditor.ui.dialog.Confirm');
goog.require('goog.ui.Dialog');


/**
 * Modal dialog for adding custom data on Prepare Data step.
 *
 * @param {string=} opt_class
 * @param {boolean=} opt_useIframeMask
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.dialog.Base}
 */
chartEditor.ui.dialog.Data = function(opt_class, opt_useIframeMask, opt_domHelper) {
  chartEditor.ui.dialog.Data.base(this, 'constructor', opt_class, opt_useIframeMask, opt_domHelper);

  this.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());

  /**
   * @type {string}
   * @private
   */
  this.lastClass_ = '';
};
goog.inherits(chartEditor.ui.dialog.Data, chartEditor.ui.dialog.Base);


/** @inheritDoc */
chartEditor.ui.dialog.Data.prototype.createDom = function(){
  chartEditor.ui.dialog.Data.base(this, 'createDom');

  goog.dom.classlist.add(this.getDialogElement(), goog.getCssName('anychart-ce-data-dialog'));
};

/**
 * Updates dialog content for chosen type.
 *
 * @param {string} dialogType
 * @param {string=} opt_dataType
 */
chartEditor.ui.dialog.Data.prototype.updateContent = function(dialogType, opt_dataType){
  this.type_ = dialogType;
  this.dataType_ = opt_dataType;

  var title;
  if (dialogType == 'file') {
    title = opt_dataType.toUpperCase() + ' file';
  } else if (dialogType == 'string') {
    title = opt_dataType.toUpperCase() + ' string';
  } else {
    title = 'Google Spreadsheet';
  }
  this.setTitle(title);

  var dialogEl = this.getDialogElement();
  if (this.lastClass_)
    goog.dom.classlist.remove(dialogEl, this.lastClass_);
  this.lastClass_ = 'anychart-ce-dialog-' + this.type_ + '-' + this.dataType_;
  goog.dom.classlist.add(dialogEl, this.lastClass_);

  var dom = this.getDomHelper();
  var contentEl = this.getContentElement();

  this.input_ = null;
  this.input2_ = null;
  while (contentEl.firstChild) {
    contentEl.removeChild(contentEl.firstChild);
  }

  var pholder = '';
  if (dialogType == 'file') {
    pholder = 'Enter URL to ' + opt_dataType.toUpperCase() + ' file';
    this.input_ = dom.createDom(goog.dom.TagName.INPUT, {'class': 'anychart-ce-input', 'placeholder': pholder});
    contentEl.appendChild(this.input_);

  } else if (dialogType == 'string') {
    pholder = 'Paste ' + opt_dataType.toUpperCase() + ' string';
    this.input_ = dom.createDom(goog.dom.TagName.TEXTAREA, {'class': 'anychart-ce-input', 'placeholder': pholder});
    contentEl.appendChild(this.input_);

  } else {
    pholder = 'ID or URL to spreadsheet';
    this.input_ = dom.createDom(goog.dom.TagName.INPUT, {'class': 'anychart-ce-input', 'placeholder': pholder});

    pholder = 'Sheet ID or index';
    this.input2_ = dom.createDom(goog.dom.TagName.INPUT, {'class': 'anychart-ce-input', 'placeholder': pholder});

    contentEl.appendChild(this.input_);
    contentEl.appendChild(this.input2_);
  }

  if (this.dataType_ == 'csv') {
    this.csvRSeparator_ = dom.createDom(goog.dom.TagName.INPUT, 'anychart-ce-input');
    this.csvRSeparator_.value = '\\n';
    contentEl.appendChild(dom.createDom(goog.dom.TagName.LABEL, null, ['Rows Separator', this.csvRSeparator_]));

    this.csvCSeparator_ = dom.createDom(goog.dom.TagName.INPUT, 'anychart-ce-input');
    this.csvCSeparator_.value = ',';
    contentEl.appendChild(dom.createDom(goog.dom.TagName.LABEL, null, ['Columns Separator', this.csvCSeparator_]));

    this.csvIgnoreFirstRow_ = new chartEditor.ui.control.checkbox.Base();
    this.addChild(this.csvIgnoreFirstRow_, true);
    contentEl.appendChild(dom.createDom(goog.dom.TagName.LABEL, null, ['Ignore First Row', this.csvIgnoreFirstRow_.getElement()]));

    this.csvUseFirstRowAsFields_ = new chartEditor.ui.control.checkbox.Base();
    this.addChild(this.csvUseFirstRowAsFields_, true);
    contentEl.appendChild(dom.createDom(goog.dom.TagName.LABEL, null, ['Use First Row As Fields', this.csvUseFirstRowAsFields_.getElement()]));

    this.csvTrailingSpaces_ = new chartEditor.ui.control.checkbox.Base();
    this.addChild(this.csvTrailingSpaces_, true);
    contentEl.appendChild(dom.createDom(goog.dom.TagName.LABEL, null, ['Ignore Trailing Spaces', this.csvTrailingSpaces_.getElement()]));

    contentEl.appendChild(this.dom_.createDom(goog.dom.TagName.DIV, 'anychart-ce-clearboth'));

  } else if (this.csvIgnoreFirstRow_) {
    this.removeChild(this.csvIgnoreFirstRow_, true);
    this.removeChild(this.csvUseFirstRowAsFields_, true);
    this.removeChild(this.csvTrailingSpaces_, true);
    goog.disposeAll([this.csvIgnoreFirstRow_, this.csvTrailingSpaces_, this.csvUseFirstRowAsFields_]);
    this.csvIgnoreFirstRow_ = this.csvTrailingSpaces_ = this.csvUseFirstRowAsFields_ = null;
  }
};


/**
 * Shows error dialog.
 * @param {string} message - Error message.
 */
chartEditor.ui.dialog.Data.prototype.showError = function(message) {
  var confirm = new chartEditor.ui.dialog.Confirm();
  confirm.setTitle('Data Input Error');
  confirm.setTextContent(message);
  confirm.setButtonSet(goog.ui.Dialog.ButtonSet.createOk());
  confirm.getTitleElement().style.color = '#ff5f7f';

  goog.events.listen(confirm, goog.ui.Dialog.EventType.SELECT, function(e) {
    if (e.key == 'ok') {
      confirm.dispose();
    }
  });
  confirm.setVisible(true);
};


/** @return {string} */
chartEditor.ui.dialog.Data.prototype.getType = function(){
  return this.type_;
};


/**
 * Returns value of input field.
 * @return {?string}
 */
chartEditor.ui.dialog.Data.prototype.getInputValue = function(){
  return this.input_ && this.input_.value;
};


/**
 * Returns value of input2 field.
 * @return {?string}
 */
chartEditor.ui.dialog.Data.prototype.getInput2Value = function(){
  return this.input2_ && this.input2_.value;
};


/**
 * Returns prepared object with CSV import panel.
 *
 * @return {{rowsSeparator: string, columnsSeparator: string, ignoreFirstRow: boolean, ignoreTrailingSpaces: boolean}}
 */
chartEditor.ui.dialog.Data.prototype.getCSVSettings = function() {
  return {
    'rowsSeparator': this.processSpecialChars_(this.csvRSeparator_.value),
    'columnsSeparator': this.processSpecialChars_(this.csvCSeparator_.value),
    'ignoreFirstRow': this.csvIgnoreFirstRow_.isChecked(),
    'ignoreTrailingSpaces': this.csvTrailingSpaces_.isChecked(),
    'useFirstRowAsFields': this.csvUseFirstRowAsFields_.isChecked()
  };
};


/**
 * Replaces escaped special chars to real special chars.
 *
 * @param {string} string String to process.
 * @return {string}
 * @private
 */
chartEditor.ui.dialog.Data.prototype.processSpecialChars_ = function(string) {
  return string.replace(/\\(r|n|t)/g, function(part, g1) {
    switch (g1) {
      case 'r':
        return '\r';
      case 'n':
        return '\n';
      case 't':
        return '\t';
    }
    return part;
  });
};
