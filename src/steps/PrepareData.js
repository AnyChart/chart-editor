goog.provide('chartEditor.steps.PrepareData');

goog.require("chartEditor.Component");
goog.require("chartEditor.DataSetPanelList");
goog.require("chartEditor.PresetSelector");
goog.require("chartEditor.UserData");
goog.require("chartEditor.dialog.Data");
goog.require("chartEditor.events");
goog.require("chartEditor.steps.Base");
goog.require("goog.ui.Button");


/**
 * Chart Editor First Step Class.
 *
 * @constructor
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {chartEditor.steps.Base}
 */
chartEditor.steps.PrepareData = function(index, opt_domHelper) {
  chartEditor.steps.PrepareData.base(this, 'constructor', index, opt_domHelper);

  this.name('Configure Data');

  this.title('Configure Data');

  /**
   * @type {?chartEditor.dialog.Data}
   * @private
   */
  this.dataDialog_ = null;
};
goog.inherits(chartEditor.steps.PrepareData, chartEditor.steps.Base);


/** @override */
chartEditor.steps.PrepareData.prototype.createDom = function() {
  chartEditor.steps.PrepareData.base(this, 'createDom');

  var editor = /** @type {chartEditor.Editor} */(this.getParent());
  var model = /** @type {chartEditor.EditorModel} */(editor.getModel());

  // connected data sets section
  this.panelsList_ = new chartEditor.DataSetPanelList(model);
  this.addChild(this.panelsList_, true);

  // user data and predefined data sets sections wrapper
  var wrapper = new chartEditor.Component();
  wrapper.addClassName('anychart-ce-data-step-wrapper');
  this.addChild(wrapper, true);

  // user data section
  this.userData_ = new chartEditor.UserData([
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


  // predefined data set section
  var predefinedDataSelector = new chartEditor.PresetSelector(model);
  wrapper.addChild(predefinedDataSelector, true);
};


/** @override */
chartEditor.steps.PrepareData.prototype.enterDocument = function() {
  chartEditor.steps.PrepareData.base(this, 'enterDocument');

  this.getHandler().listen(this.userData_, chartEditor.UserData.EventType.ACTION, function(e) {
    var tmp = e.value.split('-');
    this.openDataDialog(tmp[0], tmp[1]);
  });
};


/**
 * Opend data dialog.
 * @param {string} dialogType
 * @param {string=} opt_dataType
 */
chartEditor.steps.PrepareData.prototype.openDataDialog = function(dialogType, opt_dataType) {
  this.dialogType_ = dialogType;
  this.dialogDataType_ = opt_dataType;

  if (!this.dataDialog_) {
    this.dataDialog_ = new chartEditor.dialog.Data();
    goog.events.listen(this.dataDialog_, goog.ui.Dialog.EventType.SELECT, this.onCloseDataDialog, void 0, this);
  }

  this.dataDialog_.updateContent(dialogType, opt_dataType);
  this.dataDialog_.setVisible(true);
};


/**
 * Starts processing inputs from data dialog if pressed 'ok'.
 * @param {Object} evt
 */
chartEditor.steps.PrepareData.prototype.onCloseDataDialog = function(evt) {
  var dialog = /** @type {chartEditor.dialog.Data} */(evt.target);
  var anychart = /** @type {Object} */(goog.dom.getWindow()['anychart']);

  if (evt.key === 'ok') {
    var self = this;
    var dialogType = this.dialogType_;
    var dataType = this.dialogDataType_;

    var inputValue = dialog.getInputValue();
    if (inputValue) {
      var urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var urlRegex = new RegExp(urlExpression);
      var errorCallback = goog.bind(this.onErrorDataLoad, this);

      if (dialogType === 'file') {
        if (inputValue.match(urlRegex)) {
          this.dispatchEvent({
            type: chartEditor.events.EventType.WAIT,
            wait: true
          });

          switch (dataType) {
            case 'json':
              anychart['dataAdapterModule']['loadJsonFile'](inputValue,
                  function(data) {
                    self.onSuccessDataLoad(data, dataType);
                  }, errorCallback);

              break;

            case 'csv':
              anychart['dataAdapterModule']['loadCsvFile'](inputValue,
                  function(data) {
                    self.onSuccessDataLoad(data, dataType);
                  }, errorCallback);
              break;

            case 'xml':
              anychart['dataAdapterModule']['loadXmlFile'](inputValue,
                  function(data) {
                    self.onSuccessDataLoad(data, dataType);
                  }, errorCallback);
              break;
          }
        } else {
          console.warn("Invalid url!");
        }

      } else if (dialogType === 'string') {
        this.addLoadedData(inputValue, dataType);

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
        anychart['dataAdapterModule']['loadGoogleSpreadsheet'](key,
            function(data) {
              self.onSuccessDataLoad(data, dataType);
            },
            errorCallback);
      }
    }
  }
};


/**
 * Preprocesses loaded data and adds new data set to Editor Model.
 * @param {*} data
 * @param {string} dataType
 */
chartEditor.steps.PrepareData.prototype.addLoadedData = function(data, dataType) {
  var anychart = /** @type {Object} */(goog.dom.getWindow()['anychart']);
  var result = null;
  var typeOf = goog.typeOf(data);
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
          }
        }
        break;

      case 'csv':
        var csvSettings = this.dataDialog_.getCSVSettings();
        result = anychart['data']['parseText'](/** @type {string} */(data), csvSettings);
        break;

      case 'xml':
        try {
          result = chartEditor.steps.PrepareData.xmlStringToJson_(/** @type {string} */(data));
        } catch (err) {
          // parsing error
          error = true;
        }
        break;
    }

    if (!result || error)
      console.warn("Invalid data!");
  }

  if (result) {
    var type = chartEditor.EditorModel.DataType.CUSTOM;
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
      title: title
    });
  }
};


/**
 * @param {string} data
 * @param {string} dataType
 * @return {*}
 */
chartEditor.steps.PrepareData.prototype.onSuccessDataLoad = function(data, dataType) {
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
chartEditor.steps.PrepareData.prototype.onErrorDataLoad = function(errorCode) {
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
chartEditor.steps.PrepareData.xmlStringToJson_ = function(xmlString) {
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
chartEditor.steps.PrepareData.prototype.disposeInternal = function () {
  goog.dispose(this.userData_);
  this.userData_ = null;

  chartEditor.steps.PrepareData.base(this, 'disposeInternal');
};
