goog.provide('chartEditor.binding');


/**
 @namespace
 @name chartEditor.binding
 */


/**
 *
 * @param {(Object|string)} targetOrPath
 * @param {(string|number|boolean)} pathOrValue
 * @param {(string|number|boolean| Array)=} opt_valueOrPathArgs
 * @param {...(string|number)} var_args
 * @return {*}
 */
chartEditor.binding.exec = function(targetOrPath, pathOrValue, opt_valueOrPathArgs, var_args) {
  if (goog.isString(targetOrPath)) {
    var wnd = goog.dom.getWindow();
    var args = [wnd];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    return chartEditor.binding.exec.apply(null, args);
  }

  var target = /** @type {Object} */(targetOrPath);
  var path = /** @type {string} */(pathOrValue);
  var value = opt_valueOrPathArgs;
  var pathArgsIndex = 3;

  var pathParsed = chartEditor.binding.parsePath_(path);
  if (pathParsed) {
    var pathArgs = [];
    for (var j = pathArgsIndex; j < arguments.length; j++) {
      pathArgs.push(arguments[j]);
    }
    return chartEditor.binding.applyPath_(target, /** @type {Array} */(pathParsed), pathArgs, value);
  }

  return void 0;
};


/**
 * Parses panel path for exec() methods.
 * @param {string} path
 * @return {(Array|boolean)} Array of panel with it's arguments or false in case of wrong path format.
 * @private
 */
chartEditor.binding.parsePath_ = function(path) {
  var elementExp = /\s*\.?\s*(([\w_]+)(\(\s*(,?\s*([\d\.]+|\".+\"|\'.+\'|\{\d+\}))*\s*\))?)/;
  var result = [];
  var error = false;
  var match;
  do {
    match = path.match(elementExp);
    if (!match) {
      error = true;
      break;
    }
    var call = match[3];
    var args = void 0;
    if (call) {
      var argsStr = /\(\s*(.*)\s*\)/.exec(call);
      if (argsStr[1]) {
        args = argsStr[1].split(/\s*,\s*/);
      }
      call = true;
    }
    result.push([match[2], call, args]);
    path = path.replace(match[0], '');
  } while (path.length);

  return error ? false : result;
};


/**
 * Tries to apply panel returned by this.parsePath_() method in chaining style starting from target object.
 * @param {Object} target
 * @param {Array.<Array>} path
 * @param {Array.<(string|number)>} pathArguments
 * @param {(string|number|boolean|Function|Object)=} opt_lastArgument
 * @param {boolean=} opt_test - If set, the method returns true if operation succeeded and false otherwise.
 * @return {*}
 * @private
 */
chartEditor.binding.applyPath_ = function(target, path, pathArguments, opt_lastArgument, opt_test) {
  var part;
  var name;
  var call;
  var args;

  try {
    for (var i = 0; i < path.length; i++) {
      part = path[i];

      name = part[0];
      call = part[1];
      args = part[2];

      if (args) {
        for (var j = 0; j < args.length; j++) {
          var tmp = args[j].replace(/^'(.*)'$/, '$1');
          tmp = tmp.replace(/^"(.*)"$/, '$1');
          if (tmp === args[j]) {
            var substMatch = args[j].match(/^\{(\d+)\}$/);
            if (substMatch) {
              var a = Number(substMatch[1]);
              args[j] = goog.isDef(pathArguments[a]) ? pathArguments[a] : void 0;
            }
          } else {
            args[j] = tmp;
          }
        }
      }

      if (opt_lastArgument !== void 0 && i === path.length - 1) {
        if (typeof opt_lastArgument === 'string' && (new RegExp(/^function\s?\(.+\)\s?\{(.|\n)+\};?$/)).test(opt_lastArgument)) {
          opt_lastArgument = /** @type {Function} */(eval('(function(){return ' + opt_lastArgument + '})()'));
        }

        args = args ? args : [];
        args.push(opt_lastArgument);
      }

      target = call ? target[name].apply(target, args) : target[name];
    }
  } catch (e) {
    if (opt_test) {
      return false;
    } else {
      var message = 'Could not apply key \'' + name;
      if (call) message += '()';
      message += '\'';
      if (args) message += ' with arguments [' + args + ']';

      var wnd = goog.dom.getWindow();
      var console = wnd['console'];
      if (console) {
        var log = console['warn'] || console['log'];
        if (typeof log !== 'object') {
          log.call(console, message);
        }
      }
      return null;
    }
  }

  return opt_test ? true : target;
};


/**
 * Executes the path and returns true if the execution succeeded and false otherwise.
 * @param {Object} target
 * @param {string} path
 * @param {(string|number|boolean|Object)=} opt_value
 * @return {boolean}
 */
chartEditor.binding.testExec = function(target, path, opt_value) {
  var pathParsed = chartEditor.binding.parsePath_(path);
  if (pathParsed) {
    return !!chartEditor.binding.applyPath_(target, /** @type {Array} */(pathParsed), [], opt_value, true);
  }
  return false;
};


//exports
(function() {
  goog.exportSymbol('chartEditor.binding.exec', chartEditor.binding.exec);
})();

