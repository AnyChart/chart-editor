goog.provide('chartEditor.ui.steps.PrepareData');

goog.require('chartEditor.events');
goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.dataSets.WidgetPreview');
goog.require('chartEditor.ui.dialog.Data');
goog.require('chartEditor.ui.dialog.PresetPreview');
goog.require('chartEditor.ui.presets.Widget');
goog.require('chartEditor.ui.steps.Step');
goog.require('chartEditor.ui.userData.Widget');
goog.require('goog.ui.Button');



/**
 * Chart Editor First Step Class.
 *
 * @constructor
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {chartEditor.ui.steps.Step}
 */
chartEditor.ui.steps.PrepareData = function(index, opt_domHelper) {
  chartEditor.ui.steps.PrepareData.base(this, 'constructor', index, opt_domHelper);

  this.name(chartEditor.enums.EditorSteps.DATA);

  this.title('Data');

  /**
   * @type {?chartEditor.ui.dialog.Data}
   * @private
   */
  this.dataDialog_ = null;
};
goog.inherits(chartEditor.ui.steps.PrepareData, chartEditor.ui.steps.Step);


/** @override */
chartEditor.ui.steps.PrepareData.prototype.createDom = function() {
  chartEditor.ui.steps.PrepareData.base(this, 'createDom');

  var editor = /** @type {chartEditor.editor.Base} */(this.getParent());
  var model = /** @type {chartEditor.model.Base} */(editor.getModel());

  // connected data sets section
  this.dataPreview_ = new chartEditor.ui.dataSets.WidgetPreview(model);
  this.addChild(this.dataPreview_, true);

  // user data and predefined data sets sections wrapper
  var wrapper = new chartEditor.ui.Component();
  wrapper.addClassName('anychart-ce-data-step-wrapper');
  this.addChild(wrapper, true);

  var element = wrapper.getElement();
  var importDataTitle = goog.dom.createDom(goog.dom.TagName.H3, 'title-common', 'Import Data');
  goog.dom.appendChild(element, importDataTitle);

  // user data section
  this.userData_ = new chartEditor.ui.userData.Widget([
    {
      id: 'string-csv',
      type: 'upload',
      caption: 'CSV String',
      icon: 'https://cdn.anychart.com/images/chart_editor/csv-string.png'
    },
    {
      id: 'file-csv',
      type: 'upload',
      caption: 'CSV File',
      icon: 'https://cdn.anychart.com/images/chart_editor/csv-file.png'
    },
    {
      id: 'string-json',
      type: 'upload',
      caption: 'JSON String',
      icon: 'https://cdn.anychart.com/images/chart_editor/json-string.png'
    },
    {
      id: 'file-json',
      type: 'upload',
      caption: 'JSON File',
      icon: 'https://cdn.anychart.com/images/chart_editor/json-file.png'
    },
    {
      id: 'google-spreadsheets',
      type: 'connect',
      caption: 'Google Spreadsheet',
      icon: 'https://cdn.anychart.com/images/chart_editor/google-spreadsheet.png'
    }
  ]);
  wrapper.addChild(this.userData_, true);


  var choosePresetTitle = goog.dom.createDom(goog.dom.TagName.H3, 'title-common', 'Choose Preset');
  goog.dom.appendChild(element, choosePresetTitle);

  var presetPreviewButton = goog.dom.createDom(goog.dom.TagName.SPAN, 'title-button ac-folder-open');
  goog.dom.appendChild(choosePresetTitle, presetPreviewButton);
  goog.events.listen(presetPreviewButton, goog.events.EventType.CLICK, this.onPresetPreviewClick, false, this);

  goog.events.listen(editor.getSteps(), chartEditor.ui.steps.EventType.BEFORE_CHANGE_STEP, function(e) {
    if (e.prevIndex === this.getIndex())
      this.updateData();
  }, void 0, this);
};


/**
 * TODO (A.Kudryavtsev): Descr.
 */
chartEditor.ui.steps.PrepareData.prototype.updateData = function() {
  this.dataPreview_.updateData();
};


/** @override */
chartEditor.ui.steps.PrepareData.prototype.enterDocument = function() {
  chartEditor.ui.steps.PrepareData.base(this, 'enterDocument');

  this.getHandler().listen(this.userData_, chartEditor.ui.userData.Widget.EventType.ACTION, function(e) {
    var tmp = e.value.split('-');
    this.openDataDialog(tmp[0], tmp[1]);
  });
};


/**
 * Opend data dialog.
 * @param {string} dialogType
 * @param {string=} opt_dataType
 */
chartEditor.ui.steps.PrepareData.prototype.openDataDialog = function(dialogType, opt_dataType) {
  this.dialogType_ = dialogType;
  this.dialogDataType_ = opt_dataType;

  if (!this.dataDialog_) {
    this.dataDialog_ = new chartEditor.ui.dialog.Data();
    goog.events.listen(this.dataDialog_, goog.ui.Dialog.EventType.SELECT, this.onCloseDataDialog, void 0, this);
  }

  this.dataDialog_.updateContent(dialogType, opt_dataType);
  this.dataDialog_.setVisible(true);
};


/**
 * Preset preview click handler.
 * @param {goog.events.BrowserEvent} e - Event.
 */
chartEditor.ui.steps.PrepareData.prototype.onPresetPreviewClick = function(e) {
  if (!this.presetsPreview_) {
    this.presetsPreview_ = new chartEditor.ui.dialog.PresetPreview();
    var editor = /** @type {chartEditor.editor.Base} */(this.getParent());
    var model = /** @type {chartEditor.model.Base} */(editor.getModel());
    this.presetsPreview_.setModel(model);
    var ths = this;

    //TODO (A.Kudryavtsev): Redispatching? Is it OK?
    editor.getHandler().listen(this.presetsPreview_, chartEditor.events.EventType.WAIT, function(e) {
      ths.dispatchEvent(e);
    });
    editor.getHandler().listen(this.presetsPreview_, chartEditor.events.EventType.DATA_ADD, function(e) {
      ths.dispatchEvent(e);
    });
  }
  this.presetsPreview_.setVisible(true);
};


/**
 *
 * @param {goog.ui.Dialog.Event} event - Related event to be prevented.
 * @param {chartEditor.ui.dialog.Data} dialog - Related dialog.
 * @param {chartEditor.ui.steps.PrepareData} context - Step itself.
 * @param {string} message - Error message.
 * @return {function(Object)}
 */
chartEditor.ui.steps.PrepareData.prototype.getErrorCallback = function(event, dialog, context, message) {
  event.preventDefault();
  return function() {
    dialog.showError(message);
    context.dispatchEvent({
      type: chartEditor.events.EventType.WAIT,
      wait: false
    });
  };
};


/**
 * Starts processing inputs from data dialog if pressed 'ok'.
 * @param {goog.ui.Dialog.Event} evt
 */
chartEditor.ui.steps.PrepareData.prototype.onCloseDataDialog = function(evt) {
  var dialog = /** @type {chartEditor.ui.dialog.Data} */(evt.target);
  var anychart = /** @type {Object} */(goog.dom.getWindow()['anychart']);

  if (evt.key === 'ok') {
    var self = this;
    var dialogType = this.dialogType_;
    var dataType = this.dialogDataType_;

    var inputValue = dialog.getInputValue();
    if (inputValue) {
      var urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var urlRegex = new RegExp(urlExpression);

      if (dialogType === 'file') {
        if (inputValue.match(urlRegex)) {
          this.dispatchEvent({
            type: chartEditor.events.EventType.WAIT,
            wait: true
          });

          switch (dataType) {
            case 'json':
              anychart['data']['loadJsonFile'](inputValue,
                  function(data) {
                    self.onSuccessDataLoad(data, dataType);
                  },
                  this.getErrorCallback(evt, dialog, this, 'Could not receive a JSON response. Please, check the URL.')
              );

              break;

            case 'csv':
              anychart['data']['loadCsvFile'](inputValue,
                  function(data) {
                    self.onSuccessDataLoad(data, dataType);
                  },
                  this.getErrorCallback(evt, dialog, this, 'Could not receive a CSV response. Please, check the URL.')
              );
              break;

            case 'xml':
              anychart['data']['loadXmlFile'](inputValue,
                  function(data) {
                    self.onSuccessDataLoad(data, dataType);
                  },
                  this.getErrorCallback(evt, dialog, this, 'Could not receive an XML response. Please, check the URL.')
              );
              break;
          }
        } else {
          evt.preventDefault();
          dialog.showError('Invalid URL, please check it.');
        }

      } else if (dialogType === 'string') {
        var result = this.addLoadedData(inputValue, dataType);
        if (!result.status) {
          evt.preventDefault();
          dialog.showError(result.message);
        }
      } else if (dialogType === 'google') {
        var key = {'key': inputValue};
        var keyRegex = new RegExp(/spreadsheets\/d\/([\w|-]+)\//);
        var parseResult = inputValue.match(keyRegex);
        if (parseResult) {
          key['key'] = parseResult[1];
        }
        var input2Value = dialog.getInput2Value();
        if (input2Value)
          key['sheet'] = input2Value;

        this.dispatchEvent({
          type: chartEditor.events.EventType.WAIT,
          wait: true
        });
        anychart['data']['loadGoogleSpreadsheet'](key,
            function(data) {
              self.onSuccessDataLoad(data, dataType);
            },
            this.getErrorCallback(evt, dialog, this, 'Could not receive a Google Spreadsheet response. Please, make sure all inputs are filled correctly.')
        );
      }
    } else {
      evt.preventDefault();
      dialog.showError('Got empty input. Please, fill the fields to make it work.');
    }
  }
};


/**
 * Preprocesses loaded data and adds new data set to Editor Model.
 * @param {*} data
 * @param {string} dataType
 * @return {Object} - Object with state: true if everything is fine, false if has some data issues.
 *  Also, if false, contains error message.
 */
chartEditor.ui.steps.PrepareData.prototype.addLoadedData = function(data, dataType) {
  var anychart = /** @type {Object} */(goog.dom.getWindow()['anychart']);
  var result = null;
  var typeOf = goog.typeOf(data);
  var message = null;
  var filedNames = void 0;
  var emptyDataMessage = 'Received empty result, please check the input data.';
  var dataParsingMessage = 'Got data parsing error, please check the input data.';
  if (dataType !== 'spreadsheets' && (typeOf === 'object' || typeOf === 'array')) {
    result = data;

  } else {
    var error = false;
    switch (dataType) {
      case 'spreadsheets':
        result = data['rows'];
        break;
      case 'json':
        if (typeOf === 'string') {
          try {
            result = goog.json.hybrid.parse(/** @type {string} */(data));
          } catch (err) {
            // parsing error
            error = true;
            message = 'Got JSON parsing error, please check the input data.';
          }
        }
        break;

      case 'csv':
        var csvSettings = this.dataDialog_.getCSVSettings();
        var useFirstRowAsFields = csvSettings['useFirstRowAsFields'];
        if (useFirstRowAsFields) {
          delete csvSettings['useFirstRowAsFields'];
          csvSettings['ignoreFirstRow'] = false;
        }
        var arrResult = anychart['data']['parseText'](/** @type {string} */(data), csvSettings);
        result = [];
        if (useFirstRowAsFields && arrResult.length > 1) {
          var fields = goog.array.splice(arrResult, 0, 1)[0];
          for (var i = 0; i < arrResult.length; i++) {
            var item = arrResult[i];
            var res = {};
            for (var j = 0; j < item.length; j++) {
              var name = fields[j] || ('value' + 'j');
              res[name] = item[j];
            }
            result.push(res);
          }
        } else {
          result = arrResult;
        }
        break;

      case 'xml':
        try {
          result = chartEditor.ui.steps.PrepareData.xmlStringToJson_(/** @type {string} */(data));
        } catch (err) {
          // parsing error
          error = true;
          message = 'Got XML parsing error, please check the input data.';
        }
        break;
    }

    if (!result)
      return {status: false, message: message || emptyDataMessage};

    if (error)
      return {status: false, message: dataParsingMessage};
  }

  if (result) {
    var type = chartEditor.model.DataType.CUSTOM;
    this.uploadedSetId_ = this.uploadedSetId_ ? ++this.uploadedSetId_ : 1;
    var title = "Custom data " + this.uploadedSetId_ + " (" + dataType + ")";
    if (data.title) {
      title = data.title.substr(0, 30) + '..';
    }

    this.dispatchEvent({
      type: chartEditor.events.EventType.DATA_ADD,
      data: result,
      dataType: type,
      setId: this.uploadedSetId_,
      setFullId: type + this.uploadedSetId_,
      title: title,
      fieldNames: filedNames
    });
    return {status: true};
  }

  return {status: false, message: emptyDataMessage};
};


/**
 * @param {string} data
 * @param {string} dataType
 * @return {*}
 */
chartEditor.ui.steps.PrepareData.prototype.onSuccessDataLoad = function(data, dataType) {
  this.dispatchEvent({
    type: chartEditor.events.EventType.WAIT,
    wait: false
  });

  if (!data) return;
  this.addLoadedData(data, dataType);
};


/**
 * Callback in case of error while data load.
 * @param {string} errorCode
 */
chartEditor.ui.steps.PrepareData.prototype.onErrorDataLoad = function(errorCode) {
  this.dispatchEvent({
    type: chartEditor.events.EventType.WAIT,
    wait: false
  });

  console.warn("Invalid data!", errorCode);
};


/**
 * Converts xml-string to xml document.
 * @param {string} xmlString
 * @return {?(Object|string)} XML document
 * @private
 */
chartEditor.ui.steps.PrepareData.xmlStringToJson_ = function(xmlString) {
  var wnd = goog.dom.getWindow();
  var anychart = /** @type {Object} */(wnd['anychart']);
  var parseXml;

  if (wnd.DOMParser) {
    var isParseError = function(parsedDocument) {
      // parser and parsererrorNS could be cached on startup for efficiency
      var parser = new DOMParser(),
          errorneousParse = parser.parseFromString('<', 'text/xml'),
          parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;

      if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
        // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
        return parsedDocument.getElementsByTagName("parsererror").length > 0;
      }
      return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
    };

    parseXml = function(xmlStr) {
      var parser = new DOMParser();
      var dom = parser.parseFromString(xmlStr, 'text/xml');
      if (isParseError(dom)) {
        throw new Error('Error parsing XML');
      }
      return dom;
    };
  } else if (typeof wnd.ActiveXObject !== "undefined" && new wnd.ActiveXObject("Microsoft.XMLDOM")) {
    parseXml = function(xmlStr) {
      var xmlDoc = new wnd.ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
      xmlDoc.loadXML(xmlStr);
      return xmlDoc;
    };
  } else {
    parseXml = function() {
      return null;
    };
  }

  var xmlDoc = parseXml(xmlString);
  if (xmlDoc) {
    return anychart['utils']['xml2json'](xmlDoc);
  }

  return null;
};


/** @inheritDoc */
chartEditor.ui.steps.PrepareData.prototype.disposeInternal = function() {
  goog.dispose(this.userData_);
  this.userData_ = null;

  chartEditor.ui.steps.PrepareData.base(this, 'disposeInternal');
};
