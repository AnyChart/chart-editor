/**
 * Created by graph on 2018-03-02.
 */
goog.provide('chartEditor.reporting');

goog.require('chartEditor.enums');


//----------------------------------------------------------------------------------------------------------------------
//  Errors and Warnings.
//----------------------------------------------------------------------------------------------------------------------
/**
 * Last info code.
 * @type {number}
 * @private
 */
chartEditor.reporting.lastInfoCode_ = -1;


/**
 * Last warning code.
 * @type {number}
 * @private
 */
chartEditor.reporting.lastWarningCode_ = -1;


/**
 * Log en error by code.
 * @param {chartEditor.enums.ErrorCode} code Error internal code,. @see chartEditor.enums.ErrorCode.
 * @param {*=} opt_exception Exception.
 * @param {Array.<*>=} opt_descArgs Description message arguments.
 */
chartEditor.reporting.error = function(code, opt_exception, opt_descArgs) {
  chartEditor.reporting.callLog_(
      'error',
      ('Error: ' + code + '\nDescription: ' + chartEditor.reporting.getErrorDescription_(code, opt_descArgs)),
      (opt_exception || '')
  );
};


/**
 * @param {chartEditor.enums.ErrorCode} code Warning code.
 * @param {Array.<*>=} opt_arguments Message arguments.
 * @return {string}
 * @private
 */
chartEditor.reporting.getErrorDescription_ = function(code, opt_arguments) {
  switch (code) {
    default:
      return 'Unknown error occurred. Please, contact support team at http://support.anychart.com/.\n' +
          'We will be very grateful for your report.';
  }
};


/**
 * Logs an info.
 * @param {chartEditor.enums.InfoCode|string} codeOrMsg Info internal code,. @see chartEditor.enums.InfoCode.
 * @param {Array.<*>=} opt_descArgs Description message arguments.
 */
chartEditor.reporting.info = function(codeOrMsg, opt_descArgs) {
  if (chartEditor.DEVELOP) {
    if (goog.isNumber(codeOrMsg)) {
      if (chartEditor.reporting.lastInfoCode_ !== codeOrMsg) {
        chartEditor.reporting.lastInfoCode_ = /** @type {number} */ (codeOrMsg);
        chartEditor.reporting.callLog_(
            'info',
            ('Info: ' + codeOrMsg + '\nDescription: ' + chartEditor.reporting.getInfoDescription_(codeOrMsg, opt_descArgs)),
            ''
        );
      }
    } else {
      chartEditor.reporting.callLog_('info', codeOrMsg, '');
    }
  }
};


/**
 * @param {chartEditor.enums.InfoCode} code Warning code.
 * @param {Array.<*>=} opt_arguments Message arguments.
 * @return {string}
 * @private
 */
chartEditor.reporting.getInfoDescription_ = function(code, opt_arguments) {
  switch (code) {
    default:
      return 'We think we can help you improve your data visualization, please contact us at http://support.anychart.com/.';
  }
};


/**
 * Log en warning by code.
 * @param {chartEditor.enums.WarningCode} code Warning internal code,. @see chartEditor.enums.WarningCode.
 * @param {*=} opt_exception Exception.
 * @param {Array.<*>=} opt_descArgs Description message arguments.
 * @param {boolean=} opt_forceProd
 */
chartEditor.reporting.warning = function(code, opt_exception, opt_descArgs, opt_forceProd) {
  if ((chartEditor.DEVELOP || opt_forceProd) && chartEditor.reporting.lastWarningCode_ !== code) {
    chartEditor.reporting.lastWarningCode_ = code;
    chartEditor.reporting.callLog_(
        'warn',
        ('Warning: ' + code + '\nDescription: ' + chartEditor.reporting.getWarningDescription_(code, opt_descArgs)),
        (opt_exception || '')
    );
  }
};


/**
 * @param {chartEditor.enums.WarningCode} code Warning code.
 * @param {Array.<*>=} opt_arguments Message arguments.
 * @return {string}
 * @private
 */
chartEditor.reporting.getWarningDescription_ = function(code, opt_arguments) {
  switch (code) {
    case chartEditor.enums.WarningCode.EDITOR_MODEL_VALUE_NOT_FOUND:
      return 'Editor model value not found by key: ' + opt_arguments;

    default:
      return 'Unknown error. Please, contact support team at http://support.anychart.com/.\n' +
          'We will be very grateful for your report!';
  }
};


/**
 * @param {string} name Log function name.
 * @param {string} message Message text.
 * @param {*=} opt_exception Exception.
 * @private
 */
chartEditor.reporting.callLog_ = function(name, message, opt_exception) {
  var wnd = goog.dom.getWindow();
  var console = wnd['console'];
  if (console) {
    var log = console[name] || console['log'];
    if (typeof log !== 'object') {
      log.call(console, message, opt_exception);
    }
  }
};
