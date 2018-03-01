goog.provide('chartEditor.enums');



/**
 @namespace
 @name chartEditor.enums
 */


//----------------------------------------------------------------------------------------------------------------------
//
//  Chart types enum
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Chart types.
 * @enum {string}
 */
chartEditor.enums.ChartTypes = {
  AREA: 'area',
  VERTICAL_AREA: 'vertical-area',
  AREA_3D: 'area-3d',
  BAR: 'bar',
  BAR_3D: 'bar-3d',
  BOX: 'box',
  BUBBLE: 'bubble',
  BULLET: 'bullet',
  CARTESIAN: 'cartesian',
  CARTESIAN_3D: 'cartesian-3d',
  COLUMN: 'column',
  COLUMN_3D: 'column-3d',
  FINANCIAL: 'financial',
  FUNNEL: 'funnel',
  LINE: 'line',
  LINE_3D: 'line-3d',
  VERTICAL_LINE: 'vertical-line',
  MARKER: 'marker',
  PIE: 'pie',
  PIE_3D: 'pie-3d',
  POLAR: 'polar',
  PYRAMID: 'pyramid',
  RADAR: 'radar',
  SCATTER: 'scatter',
  SPARKLINE: 'sparkline',
  HEAT_MAP: 'heat-map',
  TREE_MAP: 'tree-map',
  STOCK: 'stock',
  PERT: 'pert',
  GANTT_RESOURCE: 'gantt-resource',
  GANTT_PROJECT: 'gantt-project',
  RESOURCE: 'resource',
  JUMP_LINE: 'jump-line',
  STICK: 'stick',
  PARETO: 'pareto',
  QUADRANT: 'quadrant',
  MEKKO: 'mekko',
  MOSAIC: 'mosaic',
  BARMEKKO: 'barmekko',
  TAG_CLOUD: 'tag-cloud',
  VENN: 'venn',
  HILO: 'hilo',
  WATERFALL: 'waterfall'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Gauge types enum
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Gauge types.
 * @enum {string}
 */
chartEditor.enums.GaugeTypes = {
  CIRCULAR: 'circular-gauge',
  LINEAR: 'linear-gauge',
  BULLET: 'bullet',
  THERMOMETER: 'thermometer',
  TANK: 'tank',
  LED: 'led'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Maps types enum
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Map types.
 * @enum {string}
 */
chartEditor.enums.MapTypes = {
  MAP: 'map',
  CHOROPLETH: 'choropleth',
  BUBBLE: 'bubble',
  MARKER: 'marker',
  CONNECTOR: 'connector',
  SEAT_MAP: 'seat-map'
};


/**
 * Map geo data types.
 * @enum {string}
 */
chartEditor.enums.MapGeoDataTypes = {
  SVG: 'svg',
  TOPO_JSON: 'topo-json',
  GEO_JSON: 'geo-json'
};


/**
 * Map unbounding regions mode.
 * @enum {string}
 */
chartEditor.enums.MapUnboundRegionsMode = {
  AS_IS: 'as-is',
  HIDE: 'hide'
};


/**
 * Common normalization of value and default value.
 * @param {Object} enumObj
 * @param {*} value
 * @param {*} defValue
 * @return {*}
 */
chartEditor.enums.normalize = function(enumObj, value, defValue) {
  if (!enumObj.__normalized) {
    var n = {};
    for (var i in enumObj) {
      var name = enumObj[i];
      var key = name.toLowerCase();
      n[key] = name;
      n[key.replace(/-/g, '')] = name;
    }
    enumObj.__normalized = n;
  }
  return enumObj.__normalized[String(value).toLowerCase()] || defValue;
};


/**
 * Normalizes value to MapUnboundRegionsMode enum.
 * @param {*} value Input to normalize.
 * @param {chartEditor.enums.MapUnboundRegionsMode=} opt_default Default value, if input cannot be recognized. Defaults to HIDE.
 * @return {chartEditor.enums.MapUnboundRegionsMode}
 */
chartEditor.enums.normalizeMapUnboundRegionsMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.MapUnboundRegionsMode} */(chartEditor.enums.normalize(chartEditor.enums.MapUnboundRegionsMode, value, opt_default ||
      chartEditor.enums.MapUnboundRegionsMode.HIDE));
};


/**
 * Hover mode enumeration.
 * @enum {string}
 */
chartEditor.enums.HoverMode = {
  BY_SPOT: 'by-spot',
  BY_X: 'by-x',
  SINGLE: 'single'
};


/**
 * Normalizes value to HoverMode enum.
 * @param {*} value Input to normalize.
 * @param {chartEditor.enums.HoverMode=} opt_default Default value, if input cannot be recognized. Defaults to BY_X.
 * @return {chartEditor.enums.HoverMode}
 */
chartEditor.enums.normalizeHoverMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.HoverMode} */(chartEditor.enums.normalize(chartEditor.enums.HoverMode, value, opt_default || chartEditor.enums.HoverMode.BY_X));
};


/**
 * Select mode enumeration.
 * @enum {string}
 */
chartEditor.enums.SelectionMode = {
  NONE: 'none',
  SINGLE_SELECT: 'single-select',
  MULTI_SELECT: 'multi-select',
  DRILL_DOWN: 'drill-down'
};


/**
 * Normalizes value to SelectionMode enum.
 * @param {*} value Input to normalize.
 * @param {chartEditor.enums.SelectionMode=} opt_default Default value, if input cannot be recognized. Defaults to NONE.
 * @return {chartEditor.enums.SelectionMode}
 */
chartEditor.enums.normalizeSelectMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.SelectionMode} */(chartEditor.enums.normalize(chartEditor.enums.SelectionMode, value,
      opt_default || chartEditor.enums.SelectionMode.NONE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Cursor
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Cursor enum. Defines 15 items.
 * @enum {string}
 */
chartEditor.enums.Cursor = {
  /** <span style="cursor:default">Default type</span> */
  DEFAULT: 'default',

  /** <span style="cursor:crosshair">Crosshair type</span> */
  CROSSHAIR: 'crosshair',

  /** <span style="cursor:pointer">Pointer type</span> */
  POINTER: 'pointer',

  /** <span style="cursor:move">Move type</span> */
  MOVE: 'move',

  /** <span style="cursor:text">Text type</span> */
  TEXT: 'text',

  /** <span style="cursor:wait">Wait type</span> */
  WAIT: 'wait',

  /** <span style="cursor:help">Help type</span> */
  HELP: 'help',

  /** <span style="cursor:n-resize">N-resize type</span> */
  N_RESIZE: 'n-resize',

  /** <span style="cursor:ne-resize">NE-resize type</span> */
  NE_RESIZE: 'ne-resize',

  /** <span style="cursor:e-resize">E-resize type</span> */
  E_RESIZE: 'e-resize',

  /** <span style="cursor:se-resize">SE-resize type</span> */
  SE_RESIZE: 'se-resize',

  /** <span style="cursor:s-resize">S-resize type</span> */
  S_RESIZE: 's-resize',

  /** <span style="cursor:sw-resize">SW-resize type</span> */
  SW_RESIZE: 'sw-resize',

  /** <span style="cursor:w-resize">W-resize type</span> */
  W_RESIZE: 'w-resize',

  /** <span style="cursor:nw-resize">NW-resize type</span> */
  NW_RESIZE: 'nw-resize',

  /** <span style="cursor:ns-resize">NS-resize type</span> */
  NS_RESIZE: 'ns-resize',

  /** <span style="cursor:ew-resize">EW-resize type</span> */
  EW_RESIZE: 'ew-resize',

  /** <span style="cursor:nwse-resize">NWSE-resize type</span> */
  NWSE_RESIZE: 'nwse-resize',

  /** <span style="cursor:nesw-resize">NESW-resize type</span> */
  NESW_RESIZE: 'nesw-resize'
};


/**
 * Normalizes value to Cursor enum.
 * @param {*} value Input to normalize.
 * @param {chartEditor.enums.Cursor=} opt_default Default value, if input cannot be recognized. Defaults to DEFAULT.
 * @return {chartEditor.enums.Cursor}
 */
chartEditor.enums.normalizeCursor = function(value, opt_default) {
  return /** @type {chartEditor.enums.Cursor} */(chartEditor.enums.normalize(chartEditor.enums.Cursor, value,
      opt_default || chartEditor.enums.Cursor.DEFAULT));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Anchor
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Anchor enum. Defines 9 items.
 * @illustration <t>simple</t>
 * var orange = '1 orange 1';
 * var star = stage.star5(stage.width()/2, stage.height()/3, stage.height()/4).fill('yellow', 0.5);
 * var pathBounds = star.getBounds();
 * stage.path().fill('none').stroke(orange)
 *     .moveTo(pathBounds.left, pathBounds.top)
 *     .lineTo(pathBounds.left + pathBounds.width, pathBounds.top)
 *     .lineTo(pathBounds.left + pathBounds.width, pathBounds.top + pathBounds.height)
 *     .lineTo(pathBounds.left, pathBounds.top + pathBounds.height)
 *     .close();
 * stage.text(pathBounds.left - 55, pathBounds.top - 15, 'LEFT_TOP');
 * stage.circle(pathBounds.left, pathBounds.top, 3).fill('blue');
 * stage.text(pathBounds.left - 78, pathBounds.top + pathBounds.height/2 - 8, 'LEFT_CENTER');
 * stage.circle(pathBounds.left, pathBounds.top + pathBounds.height/2, 3).fill('blue');
 * stage.text(pathBounds.left - 80, pathBounds.top + pathBounds.height, 'LEFT_BOTTOM');
 * stage.circle(pathBounds.left, pathBounds.top + pathBounds.height, 3).fill('blue');
 * stage.text(pathBounds.left  + pathBounds.width/2 - 10, pathBounds.top - 18, 'CENTER_TOP');
 * stage.circle(pathBounds.left + pathBounds.width/2, pathBounds.top, 3).fill('blue');
 * stage.text(pathBounds.left + pathBounds.width/2 - 20, pathBounds.top + pathBounds.height/2 - 15, 'CENTER');
 * stage.circle(pathBounds.left + pathBounds.width/2, pathBounds.top + pathBounds.height/2, 3).fill('blue');
 * stage.text(pathBounds.left + pathBounds.width/2 - 23, pathBounds.top + pathBounds.height+ 2, 'CENTER_BOTTOM');
 * stage.circle(pathBounds.left + pathBounds.width/2, pathBounds.top + pathBounds.height, 3).fill('blue');
 * stage.text(pathBounds.left + pathBounds.width + 5, pathBounds.top - 15, 'RIGHT_TOP');
 * stage.circle(pathBounds.left + pathBounds.width, pathBounds.top, 3).fill('blue');
 * stage.text(pathBounds.left + pathBounds.width + 5 , pathBounds.top + pathBounds.height/2 - 8, 'RIGHT_CENTER');
 * stage.circle(pathBounds.left + pathBounds.width, pathBounds.top + pathBounds.height/2, 3).fill('blue');
 * stage.text(pathBounds.left + pathBounds.width + 5, pathBounds.top + pathBounds.height, 'RIGHT_BOTTOM');
 * stage.circle(pathBounds.left + pathBounds.width, pathBounds.top + pathBounds.height, 3).fill('blue');
 * @enum {string}
 */
chartEditor.enums.Anchor = {
  /** The left-top anchor of the element. */
  LEFT_TOP: 'left-top',

  /** The left-center anchor of the element. */
  LEFT_CENTER: 'left-center',

  /** The left-bottom anchor of the element. */
  LEFT_BOTTOM: 'left-bottom',

  /** The center-top anchor of the element. */
  CENTER_TOP: 'center-top',

  /** The center anchor of the element. */
  CENTER: 'center',

  /** The center-bottom anchor of the element. */
  CENTER_BOTTOM: 'center-bottom',

  /** The right-top anchor of the element. */
  RIGHT_TOP: 'right-top',

  /** The right-center anchor of the element.*/
  RIGHT_CENTER: 'right-center',

  /** The right-bottom anchor of the element. */
  RIGHT_BOTTOM: 'right-bottom',

  /** Auto anchor of the element. Flips anchor depends on position. */
  AUTO: 'auto'
};


/**
 * Normalizes anchor to an chartEditor.enums.Anchor instance.
 * @param {*} value Input to normalize.
 * @param {T=} opt_default Default value, if input cannot be recognized. Defaults to LEFT_TOP.
 * @return {chartEditor.enums.Anchor|T}
 * @template T
 */
chartEditor.enums.normalizeAnchor = function(value, opt_default) {
  return /** @type {chartEditor.enums.Anchor} */(chartEditor.enums.normalize(chartEditor.enums.Anchor, value,
      goog.isDef(opt_default) ? opt_default : chartEditor.enums.Anchor.LEFT_TOP));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Position
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Position enum. Defines 9 items. Similar to Anchor. Distinct by meaning.
 * @illustration <t>simple</t>
 * var orange = '1 orange 1';
 * var star = stage.star5(stage.width()/2, stage.height()/3, stage.height()/4).fill('yellow', 0.5);
 * var pathBounds = star.getBounds();
 * stage.path().fill('none').stroke(orange)
 *     .moveTo(pathBounds.left, pathBounds.top)
 *     .lineTo(pathBounds.left + pathBounds.width, pathBounds.top)
 *     .lineTo(pathBounds.left + pathBounds.width, pathBounds.top + pathBounds.height)
 *     .lineTo(pathBounds.left, pathBounds.top + pathBounds.height)
 *     .close();
 * stage.text(pathBounds.left - 55, pathBounds.top - 15, 'LEFT_TOP');
 * stage.circle(pathBounds.left, pathBounds.top, 3).fill('blue');
 * stage.text(pathBounds.left - 78, pathBounds.top + pathBounds.height/2 - 8, 'LEFT_CENTER');
 * stage.circle(pathBounds.left, pathBounds.top + pathBounds.height/2, 3).fill('blue');
 * stage.text(pathBounds.left - 80, pathBounds.top + pathBounds.height, 'LEFT_BOTTOM');
 * stage.circle(pathBounds.left, pathBounds.top + pathBounds.height, 3).fill('blue');
 * stage.text(pathBounds.left  + pathBounds.width/2 - 10, pathBounds.top - 18, 'CENTER_TOP');
 * stage.circle(pathBounds.left + pathBounds.width/2, pathBounds.top, 3).fill('blue');
 * stage.text(pathBounds.left + pathBounds.width/2 - 20, pathBounds.top + pathBounds.height/2 - 15, 'CENTER');
 * stage.circle(pathBounds.left + pathBounds.width/2, pathBounds.top + pathBounds.height/2, 3).fill('blue');
 * stage.text(pathBounds.left + pathBounds.width/2 - 23, pathBounds.top + pathBounds.height+ 2, 'CENTER_BOTTOM');
 * stage.circle(pathBounds.left + pathBounds.width/2, pathBounds.top + pathBounds.height, 3).fill('blue');
 * stage.text(pathBounds.left + pathBounds.width + 5, pathBounds.top - 15, 'RIGHT_TOP');
 * stage.circle(pathBounds.left + pathBounds.width, pathBounds.top, 3).fill('blue');
 * stage.text(pathBounds.left + pathBounds.width + 5 , pathBounds.top + pathBounds.height/2 - 8, 'RIGHT_CENTER');
 * stage.circle(pathBounds.left + pathBounds.width, pathBounds.top + pathBounds.height/2, 3).fill('blue');
 * stage.text(pathBounds.left + pathBounds.width + 5, pathBounds.top + pathBounds.height, 'RIGHT_BOTTOM');
 * stage.circle(pathBounds.left + pathBounds.width, pathBounds.top + pathBounds.height, 3).fill('blue');
 * @enum {string}
 */
chartEditor.enums.Position = {
  /** The left-top position of the element. */
  LEFT_TOP: 'left-top',

  /** The left-center position of the element. */
  LEFT_CENTER: 'left-center',

  /** The left-bottom position of the element. */
  LEFT_BOTTOM: 'left-bottom',

  /** The center-top position of the element. */
  CENTER_TOP: 'center-top',

  /** The center position of the element. */
  CENTER: 'center',

  /** The center-bottom position of the element. */
  CENTER_BOTTOM: 'center-bottom',

  /** The right-top position of the element. */
  RIGHT_TOP: 'right-top',

  /** The right-center position of the element.*/
  RIGHT_CENTER: 'right-center',

  /** The right-bottom position of the element. */
  RIGHT_BOTTOM: 'right-bottom'
};


/**
 * Normalizes position to an chartEditor.enums.Position instance.
 * @param {*} value Input to normalize.
 * @param {T=} opt_default Default value, if input cannot be recognized. Defaults to LEFT_TOP.
 * @return {chartEditor.enums.Position|T}
 * @template T
 */
chartEditor.enums.normalizePosition = function(value, opt_default) {
  return /** @type {chartEditor.enums.Position} */(chartEditor.enums.normalize(chartEditor.enums.Position, value, opt_default));
};


/**
 * ChartScroller possible positions.
 * @enum {string}
 */
chartEditor.enums.ChartScrollerPosition = {
  BEFORE_AXES: 'before-axes',
  AFTER_AXES: 'after-axes'
};


/**
 * Normalizes chart scroller position value.
 * @param {*} value
 * @param {chartEditor.enums.ChartScrollerPosition=} opt_default Defaults to AFTER_AXES.
 * @return {chartEditor.enums.ChartScrollerPosition}
 */
chartEditor.enums.normalizeChartScrollerPosition = function(value, opt_default) {
  return /** @type {chartEditor.enums.ChartScrollerPosition} */(chartEditor.enums.normalize(chartEditor.enums.ChartScrollerPosition, value,
      opt_default || chartEditor.enums.ChartScrollerPosition.AFTER_AXES));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Align.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Align enumeration.
 * @enum {string}
 */
chartEditor.enums.Align = {
  /**
   * Center align.
   */
  CENTER: 'center',
  /**
   * Left align.
   */
  LEFT: 'left',
  /**
   * Right align.
   */
  RIGHT: 'right',
  /**
   * Top align.
   */
  TOP: 'top',
  /**
   * Bottom align.
   */
  BOTTOM: 'bottom'
};


/**
 * Normalizes user input align to its enumeration values. Also accepts 'middle'. Defaults to opt_default or
 * 'center'.
 *
 * @param {*} value Align to normalize.
 * @param {chartEditor.enums.Align=} opt_default Align to normalize.
 * @return {chartEditor.enums.Align} Normalized align.
 */
chartEditor.enums.normalizeAlign = function(value, opt_default) {
  return /** @type {chartEditor.enums.Align} */(chartEditor.enums.normalize(chartEditor.enums.Align, value,
      opt_default || chartEditor.enums.Align.CENTER));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Layout.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Layout enumeration.
 * @enum {string}
 */
chartEditor.enums.Layout = {
  /**
   * Vertical layout.
   */
  VERTICAL: 'vertical',
  /**
   * Horizontal layout.
   */
  HORIZONTAL: 'horizontal'
};


/**
 * Normalizes user input layout to its enumeration values. Also accepts null. Defaults to opt_default or 'vertical'.
 *
 * @param {*} value - Layout to normalize.
 * @param {chartEditor.enums.Layout=} opt_default Orientation to normalize.
 * @return {chartEditor.enums.Layout} Normalized orientation.
 */
chartEditor.enums.normalizeLayout = function(value, opt_default) {
  return /** @type {chartEditor.enums.Layout} */(chartEditor.enums.normalize(chartEditor.enums.Layout, value,
      opt_default || chartEditor.enums.Layout.VERTICAL));
};


/**
 * Legend layout enumeration.
 * @enum {string}
 */
chartEditor.enums.LegendLayout = {
  /**
   * Vertical layout.
   */
  VERTICAL: 'vertical',
  /**
   * Horizontal layout.
   */
  HORIZONTAL: 'horizontal',
  /**
   * Places legend items one by one in vertical columns.
   */
  VERTICAL_EXPANDABLE: 'vertical-expandable',
  /**
   * Places legend items one by one in horizontal rows.
   */
  HORIZONTAL_EXPANDABLE: 'horizontal-expandable'
};


/**
 * Normalizes user input legend layout to its enumeration values. Also accepts null. Defaults to opt_default or 'vertical'.
 *
 * @param {*} value - Layout to normalize.
 * @param {chartEditor.enums.LegendLayout=} opt_default Orientation to normalize.
 * @return {chartEditor.enums.LegendLayout} Normalized orientation.
 */
chartEditor.enums.normalizeLegendLayout = function(value, opt_default) {
  return /** @type {chartEditor.enums.LegendLayout} */(chartEditor.enums.normalize(chartEditor.enums.LegendLayout, value,
      opt_default || chartEditor.enums.LegendLayout.VERTICAL));
};


/**
 * Polar layout enumeration.
 * @enum {string}
 */
chartEditor.enums.RadialGridLayout = {
  /**
   * Radial layout.
   */
  RADIAL: 'radial',
  /**
   * Angle layout.
   */
  CIRCUIT: 'circuit'
};


/**
 * Normalizes user input layout to its enumeration values. Also accepts null. Defaults to opt_default or 'radial'.
 *
 * @param {*} value - Layout to normalize.
 * @param {chartEditor.enums.RadialGridLayout=} opt_default Orientation to normalize.
 * @return {chartEditor.enums.RadialGridLayout} Normalized orientation.
 */
chartEditor.enums.normalizePolarLayout = function(value, opt_default) {
  return /** @type {chartEditor.enums.RadialGridLayout} */(chartEditor.enums.normalize(chartEditor.enums.RadialGridLayout, value,
      opt_default || chartEditor.enums.RadialGridLayout.RADIAL));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Orientation.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Orientation enumeration.
 * @enum {string}
 */
chartEditor.enums.Orientation = {
  /**
   * Left orientation.
   */
  LEFT: 'left',
  /**
   * Right orientation.
   */
  RIGHT: 'right',
  /**
   * Top orientation.
   */
  TOP: 'top',
  /**
   * Bottom orientation.
   */
  BOTTOM: 'bottom'
};


/**
 * Normalizes user input orientation to its enumeration values. Also accepts null. Defaults to opt_default or 'top'.
 *
 * @param {*} value Orientation to normalize.
 * @param {chartEditor.enums.Orientation=} opt_default Orientation to normalize.
 * @return {chartEditor.enums.Orientation} Normalized orientation.
 */
chartEditor.enums.normalizeOrientation = function(value, opt_default) {
  return /** @type {chartEditor.enums.Orientation} */(chartEditor.enums.normalize(chartEditor.enums.Orientation, value,
      opt_default || chartEditor.enums.Orientation.TOP));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Position mode.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Position mode enumeration.
 * @enum {string}
 */
chartEditor.enums.LegendPositionMode = {
  /**
   * Left orientation.
   */
  INSIDE: 'inside',
  /**
   * Right orientation.
   */
  OUTSIDE: 'outside'
};


/**
 * Normalizes user input position mode to its enumeration values. Also accepts null. Defaults to opt_default or 'outside'.
 *
 * @param {*} value Position mode to normalize.
 * @param {chartEditor.enums.LegendPositionMode=} opt_default Position mode to normalize.
 * @return {chartEditor.enums.LegendPositionMode} Normalized position mode.
 */
chartEditor.enums.normalizeLegendPositionMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.LegendPositionMode} */(chartEditor.enums.normalize(chartEditor.enums.LegendPositionMode, value,
      opt_default || chartEditor.enums.LegendPositionMode.OUTSIDE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Sort.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Sort enumeration.
 * @enum {string}
 */
chartEditor.enums.Sort = {
  /**
   * Ascending sorting.
   */
  ASC: 'asc',
  /**
   * Descending sorting.
   */
  DESC: 'desc',
  /**
   * No sorting.
   */
  NONE: 'none'
};


/**
 * Normalizes user input sorting to its enumeration values. Also accepts null. Defaults to opt_default or 'none'.
 *
 * @param {*} value Sort to normalize.
 * @param {chartEditor.enums.Sort=} opt_default Default value.
 * @return {chartEditor.enums.Sort} Normalized sort.
 */
chartEditor.enums.normalizeSort = function(value, opt_default) {
  return /** @type {chartEditor.enums.Sort} */(chartEditor.enums.normalize(chartEditor.enums.Sort, value,
      opt_default || chartEditor.enums.Sort.NONE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  MarkerType
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Markers type.
 * @enum {string}
 */
chartEditor.enums.MarkerType = {
  CIRCLE: 'circle',
  SQUARE: 'square',
  DIAMOND: 'diamond',
  TRIANGLE_UP: 'triangle-up',
  TRIANGLE_DOWN: 'triangle-down',
  TRIANGLE_RIGHT: 'triangle-right',
  TRIANGLE_LEFT: 'triangle-left',
  CROSS: 'cross',
  DIAGONAL_CROSS: 'diagonal-cross',
  STAR4: 'star4',
  STAR5: 'star5',
  STAR6: 'star6',
  STAR7: 'star7',
  STAR10: 'star10',
  PENTAGON: 'pentagon',
  TRAPEZIUM: 'trapezium',
  LINE: 'line',
  V_LINE: 'v-line',
  ARROWHEAD: 'arrowhead',
  ARROW_UP: 'arrow-up',
  ARROW_RIGHT: 'arrow-right',
  ARROW_DOWN: 'arrow-down',
  ARROW_LEFT: 'arrow-left'
};


/**
 * Method to get marker drawer.
 * @param {*} value Marker type.
 * @param {chartEditor.enums.MarkerType=} opt_default Default marker type. Defaults to chartEditor.enums.MarkerType.STAR5.
 * @return {chartEditor.enums.MarkerType} Normalized marker type.
 */
chartEditor.enums.normalizeMarkerType = function(value, opt_default) {
  return /** @type {chartEditor.enums.MarkerType} */(chartEditor.enums.normalize(chartEditor.enums.MarkerType, value,
      opt_default || chartEditor.enums.MarkerType.STAR5));
};


/**
 * Method to get marker drawer.
 * @param {*} value Marker type.
 * @return {chartEditor.enums.MarkerType|chartEditor.enums.BulletMarkerType|null} Normalized marker type.
 */
chartEditor.enums.normalizeAnyMarkerType = function(value) {
  return /** @type {chartEditor.enums.MarkerType} */(chartEditor.enums.normalize(chartEditor.enums.MarkerType, value, null)) ||
      /** @type {chartEditor.enums.MarkerType} */(chartEditor.enums.normalize(chartEditor.enums.BulletMarkerType, value, null));
};


//region --- Event markers properties
//------------------------------------------------------------------------------
//
//  Event markers properties
//
//------------------------------------------------------------------------------
/**
 * Markers type.
 * @enum {string}
 */
chartEditor.enums.EventMarkerType = {
  CIRCLE: 'circle',
  RECT: 'rect',
  PIN: 'pin',
  FLAG: 'flag'
};


/**
 * Method to get event marker drawer.
 * @param {*} value Marker type.
 * @param {chartEditor.enums.EventMarkerType=} opt_default Default marker type. Defaults to chartEditor.enums.EventMarkerType.CIRCLE.
 * @return {chartEditor.enums.EventMarkerType} Normalized marker type.
 */
chartEditor.enums.normalizeEventMarkerType = function(value, opt_default) {
  return /** @type {chartEditor.enums.EventMarkerType} */(chartEditor.enums.normalize(chartEditor.enums.EventMarkerType, value,
      opt_default || chartEditor.enums.EventMarkerType.CIRCLE));
};


/**
 * Event marker direction enum.
 * @enum {string}
 */
chartEditor.enums.EventMarkerDirection = {
  UP: 'up',
  DOWN: 'down',
  AUTO: 'auto'
};


/**
 * Method to get event marker direction.
 * @param {*} value
 * @param {chartEditor.enums.EventMarkerDirection=} opt_default
 * @return {chartEditor.enums.EventMarkerDirection}
 */
chartEditor.enums.normalizeEventMarkerDirection = function(value, opt_default) {
  return /** @type {chartEditor.enums.EventMarkerDirection} */(chartEditor.enums.normalize(chartEditor.enums.EventMarkerDirection, value,
      opt_default || chartEditor.enums.EventMarkerDirection.AUTO));
};


/**
 * Event marker position enum.
 * @enum {string}
 */
chartEditor.enums.EventMarkerPosition = {
  SERIES: 'series',
  SERIES_POSITIVE: 'series-positive',
  SERIES_NEGATIVE: 'series-negative',
  ZERO: 'zero',
  AXIS: 'axis'
};


/**
 * Method to get event marker position.
 * @param {*} value
 * @param {chartEditor.enums.EventMarkerPosition=} opt_default
 * @return {chartEditor.enums.EventMarkerPosition}
 */
chartEditor.enums.normalizeEventMarkerPosition = function(value, opt_default) {
  return /** @type {chartEditor.enums.EventMarkerPosition} */(chartEditor.enums.normalize(chartEditor.enums.EventMarkerPosition, value,
      opt_default || chartEditor.enums.EventMarkerPosition.AXIS));
};


//endregion
//----------------------------------------------------------------------------------------------------------------------
//
//  MapAsTableMode
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Modes enum for anychart.data.mapAsTable() function.
 * @enum {string}
 */
chartEditor.enums.MapAsTableMode = {
  /**
   * Single values.<br/>
   * Means, that each series is represented by one column in the table + shared X column (own Y values).
   */
  VALUE: 'value',
  /**
   * High-Low values.<br/>
   * Means, that each series is represented by two columns per series + shared X.
   */
  RANGE: 'range',
  /**
   * Open-High-Low-Close values.<br/>
   * Means, that each series is represented by four columns per series + shared X.
   */
  OHLC: 'ohlc'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  TreeFillMethod
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Data fill method.
 * @enum {string}
 */
chartEditor.enums.TreeFillingMethod = {
  /**
   * Using this method means that the original data will be treated as an array of objects with a hierarchical tree
   * structure.
   *
   * Sample:
   * [code]
   *  var rawData = [
   *    {
   *      _Object_,
   *      children: [ ... ]
   *    },
   *
   *    ...,
   *
   *    {
   *      _Object_,
   *      children: [
   *        {
   *          _Object_,
   *          children: [ ... ]
   *        },
   *        ...
   *      ]
   *    }
   *  ];
   * [/code]
   */
  AS_TREE: 'as-tree',

  /**
   * Using this method means that the original data will be treated as a linear array of objects each of which
   * can be given its own ID and the ID of the parent.
   *
   * Sample:
   * [code]
   *  var rawData = [
   *    {
   *      id: _opt_value_,
   *      parent: _opt_value_,
   *      someData: _some_data_
   *    },
   *
   *    ...,
   *
   *    {
   *      id: _opt_value_,
   *      parent: _opt_value_,
   *      someData: _some_data_
   *    }
   *  ];
   * [/code]
   */
  AS_TABLE: 'as-table'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  LabelsOverlapMode
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Overlap mods.
 * @enum {string}
 */
chartEditor.enums.LabelsOverlapMode = {
  /**
   * Forbids labels overlapping.
   */
  NO_OVERLAP: 'no-overlap',
  /**
   * Allows labels to overlap.
   */
  ALLOW_OVERLAP: 'allow-overlap',
  AUTO_WIDTH: 'auto-width'
};


/**
 * Normalizes labels overlap mode to enum values.
 * @param {*} value Mode to normalize.
 * @param {chartEditor.enums.LabelsOverlapMode=} opt_default Default value. Defaults to ALLOW_OVERLAP.
 * @param {boolean=} opt_allowAutoWidth
 * @return {chartEditor.enums.LabelsOverlapMode}
 */
chartEditor.enums.normalizeLabelsOverlapMode = function(value, opt_default, opt_allowAutoWidth) {
  opt_default = (String(value)).toLowerCase() == 'auto-width' && !opt_allowAutoWidth ? void 0 : opt_default;
  value = (String(value)).toLowerCase() == 'auto-width' && !opt_allowAutoWidth ? opt_default : value;
  return /** @type {chartEditor.enums.LabelsOverlapMode} */(chartEditor.enums.normalize(chartEditor.enums.LabelsOverlapMode, value,
      opt_default || chartEditor.enums.LabelsOverlapMode.ALLOW_OVERLAP));
};


/**
 * Overlap mods.
 * @enum {string}
 */
chartEditor.enums.StockLabelsOverlapMode = {
  /**
   * Forbids labels overlapping.
   */
  NO_OVERLAP: 'no-overlap',
  /**
   * Minor labels can overlap other minor labels, but major labels cannot overlap.
   */
  ALLOW_MINOR_OVERLAP: 'allow-minor-overlap',
  /**
   * Minor labels cannot overlap other minor or major labels, but major labels can overlap major labels.
   */
  ALLOW_MAJOR_OVERLAP: 'allow-major-overlap',
  /**
   * Allows labels to overlap.
   */
  ALLOW_OVERLAP: 'allow-overlap'
};


/**
 * Normalizes labels overlap mode to enum values.
 * @param {*} value Mode to normalize.
 * @param {chartEditor.enums.StockLabelsOverlapMode=} opt_default Default value. Defaults to ALLOW_OVERLAP.
 * @return {chartEditor.enums.StockLabelsOverlapMode}
 */
chartEditor.enums.normalizeStockLabelsOverlapMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.StockLabelsOverlapMode} */(chartEditor.enums.normalize(chartEditor.enums.StockLabelsOverlapMode, value,
      opt_default || chartEditor.enums.StockLabelsOverlapMode.NO_OVERLAP));
};


/**
 * Tag cloud mode.
 * @enum {string}
 */
chartEditor.enums.TagCloudMode = {
  SPIRAL: 'spiral',
  RECT: 'rect'
};


/**
 * Tag cloud mode normalizer.
 * @param {*} value .
 * @param {chartEditor.enums.TagCloudMode=} opt_default .
 * @return {chartEditor.enums.TagCloudMode}
 */
chartEditor.enums.normalizeTagCloudMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.TagCloudMode} */(chartEditor.enums.normalize(chartEditor.enums.TagCloudMode, value,
      opt_default || chartEditor.enums.TagCloudMode.SPIRAL));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  BackgroundCornersType
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Types of the corner.
 * @enum {string}
 */
chartEditor.enums.BackgroundCornersType = {
  /**
   * @illustration
   * stage.width(200).height(30);
   * stage.text(35, 10, 'Square corners').fontSize(12);
   * stage.path()
   *   .moveTo(5, 25)
   *   .lineTo(5, 10)
   *   .lineTo(20, 10)
   *   .stroke('3 #F00')
   * stage.path()
   *   .moveTo(5,30)
   *   .lineTo(5,25)
   *   .moveTo(20, 10)
   *   .lineTo(25, 10)
   *   .stroke('3 #666')
   */
  NONE: 'none',
  /**
   * @illustration
   * stage.width(200).height(30);
   * stage.text(35, 10, 'Round corners')
   * stage.path()
   *   .moveTo(5, 25)
   *   .arcToByEndPoint(20, 10, 15, 15, false, true)
   *   .stroke('3 #F00')
   *  stage.path()
   *   .moveTo(5,30)
   *   .lineTo(5,25)
   *   .moveTo(20, 10)
   *   .lineTo(25, 10)
   *   .stroke('3 #666')
   */
  ROUND: 'round',
  /**
   * @illustration
   * stage.width(200).height(30);
   * stage.text(35, 10, 'Cut corners')
   * stage.path()
   *   .moveTo(5, 25)
   *   .lineTo(20, 10)
   *   .stroke('3 #F00')
   *  stage.path()
   *   .moveTo(5,30)
   *   .lineTo(5,25)
   *   .moveTo(20, 10)
   *   .lineTo(25, 10)
   *   .stroke('3 #666')
   */
  CUT: 'cut',
  /**
   * @illustration
   * stage.width(200).height(30);
   * stage.text(35, 10, 'Round-inner corners')
   * stage.path()
   *   .moveTo(5, 25)
   *   .arcToByEndPoint(20, 10, 15, 15, false, false)
   *   .stroke('3 #F00')
   *  stage.path()
   *   .moveTo(5,30)
   *   .lineTo(5,25)
   *   .moveTo(20, 10)
   *   .lineTo(25, 10)
   *   .stroke('3 #666')
   */
  ROUND_INNER: 'round-inner'
};


/**
 * Normalizes background corner type.
 * @param {*} value Value to normalize.
 * @param {chartEditor.enums.BackgroundCornersType=} opt_default Custom default value (defaults to DEFAULT).
 * @return {chartEditor.enums.BackgroundCornersType} normalized value.
 */
chartEditor.enums.normalizeBackgroundCornerType = function(value, opt_default) {
  return /** @type {chartEditor.enums.BackgroundCornersType} */(chartEditor.enums.normalize(chartEditor.enums.BackgroundCornersType, value,
      opt_default || chartEditor.enums.BackgroundCornersType.NONE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  LegendItemIconType
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Predefined icons type.
 * @enum {string}
 */
chartEditor.enums.LegendItemIconType = {
  // icons by series type
  AREA: 'area',
  BAR: 'bar',
  BUBBLE: 'bubble',
  CANDLESTICK: 'candlestick',
  COLUMN: 'column',
  LINE: 'line',
  OHLC: 'ohlc',
  RANGE_AREA: 'range-area',
  RANGE_BAR: 'range-bar',
  RANGE_COLUMN: 'range-column',
  RANGE_SPLINE_AREA: 'range-spline-area',
  RANGE_STEP_AREA: 'range-step-area',
  SPLINE: 'spline',
  SPLINE_AREA: 'spline-area',
  STEP_LINE: 'step-line',
  STEP_AREA: 'step-area',
  CIRCLE: 'circle',
  SQUARE: 'square',

  // icons by marker type
  TRIANGLE_UP: 'triangle-up',
  TRIANGLE_DOWN: 'triangle-down',
  DIAMOND: 'diamond',
  CROSS: 'cross',
  DIAGONAL_CROSS: 'diagonal-cross',
  STAR4: 'star4',
  STAR5: 'star5',
  STAR6: 'star6',
  STAR7: 'star7',
  STAR10: 'star10',
  PENTAGON: 'pentagon',
  TRAPEZIUM: 'trapezium',
  ARROWHEAD: 'arrowhead',
  V_LINE: 'v-line',
  // special icon types
  MARKER: 'marker',
  RISING_FALLING: 'rising-falling'
};


/**
 * Normalizes legend item icon type.
 * @param {*} value Value to normalize.
 * @param {chartEditor.enums.LegendItemIconType=} opt_default Custom default value (defaults to DEFAULT).
 * @return {chartEditor.enums.LegendItemIconType} normalized value.
 */
chartEditor.enums.normalizeLegendItemIconType = function(value, opt_default) {
  return /** @type {chartEditor.enums.LegendItemIconType} */(chartEditor.enums.normalize(chartEditor.enums.LegendItemIconType, value,
      opt_default || chartEditor.enums.LegendItemIconType.SQUARE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  LegendItemsSourceMode
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Predefined icons type.
 * @enum {string}
 */
chartEditor.enums.LegendItemsSourceMode = {
  DEFAULT: 'default',
  CATEGORIES: 'categories'
};


/**
 * Normalizes legend items source mode.
 * @param {*} value Value to normalize.
 * @param {chartEditor.enums.LegendItemsSourceMode=} opt_default Custom default value (defaults to DEFAULT).
 * @return {chartEditor.enums.LegendItemsSourceMode} normalized value.
 */
chartEditor.enums.normalizeLegendItemsSourceMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.LegendItemsSourceMode} */(chartEditor.enums.normalize(chartEditor.enums.LegendItemsSourceMode, value,
      opt_default || chartEditor.enums.LegendItemsSourceMode.DEFAULT));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  BulletMarkerType
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Predefined bullet marker type.
 * @enum {string}
 */
chartEditor.enums.BulletMarkerType = {
  X: 'x',
  LINE: 'line',
  ELLIPSE: 'ellipse',
  BAR: 'bar'
};


/**
 * Normalizes bullet marker position
 * @param {*} value Value to normalize.
 * @param {chartEditor.enums.BulletMarkerType=} opt_default Custom default value (defaults to BAR).
 * @return {chartEditor.enums.BulletMarkerType}
 */
chartEditor.enums.normalizeBulletMarkerType = function(value, opt_default) {
  return /** @type {chartEditor.enums.BulletMarkerType} */(chartEditor.enums.normalize(chartEditor.enums.BulletMarkerType, value,
      opt_default || chartEditor.enums.BulletMarkerType.BAR));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  SidePosition
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Gauges elements position relative axis.
 * @enum {string}
 */
chartEditor.enums.GaugeSidePosition = {
  /**
   * Outside of a axis, but closer to the gauge center.
   */
  INSIDE: 'inside',
  /**
   * Inside a axis, no matter where the gauge center is.
   */
  CENTER: 'center',
  /**
   * Outside of a axis, but further from the gauge center.
   */
  OUTSIDE: 'outside'
};


/**
 * Normalizes gauge side position. (ticks, labels)
 * @param {*} value Position to normalize.
 * @param {chartEditor.enums.GaugeSidePosition=} opt_default Custom default value (defaults to CENTER).
 * @return {chartEditor.enums.GaugeSidePosition}
 */
chartEditor.enums.normalizeGaugeSidePosition = function(value, opt_default) {
  return /** @type {chartEditor.enums.GaugeSidePosition} */(chartEditor.enums.normalize(chartEditor.enums.GaugeSidePosition, value,
      opt_default || chartEditor.enums.GaugeSidePosition.CENTER));
};


/**
 * Labels position (inside or outside).
 * @enum {string}
 */
chartEditor.enums.LabelsPosition = {
  /**
   * Inside a chart, no matter where an axis is.
   */
  INSIDE: 'inside',
  /**
   * Outside of a chart, no matter where an axis is.
   */
  OUTSIDE: 'outside'
};


/**
 * Ticks position (inside ot outside).
 * @enum {string}
 */
chartEditor.enums.SidePosition = {
  /**
   * Inside a chart, no matter where an axis is.
   */
  INSIDE: 'inside',
  /**
   * Half of tick will be inside a chart, other part - outside, no matter where an axis is.
   */
  CENTER: 'center',
  /**
   * Outside of a chart, no matter where an axis is.
   */
  OUTSIDE: 'outside'
};


/**
 * Normalizes ticks position
 * @param {*} value Ticks position to normalize.
 * @param {chartEditor.enums.SidePosition=} opt_default Custom default value (defaults to OUTSIDE).
 * @return {chartEditor.enums.SidePosition}
 */
chartEditor.enums.normalizeSidePosition = function(value, opt_default) {
  return /** @type {chartEditor.enums.SidePosition} */(chartEditor.enums.normalize(chartEditor.enums.SidePosition, value,
      opt_default || chartEditor.enums.SidePosition.INSIDE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  PyramidLabelsPosition (and FunnelLabelsPosition)
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Labels position (Inside|OutsideLeft|OutsideLeftInColumn|OutsideRight|OutsideRightInColumn).
 * @enum {string}
 */
chartEditor.enums.PyramidLabelsPosition = {
  /**
   * Inside a point.
   */
  INSIDE: 'inside',
  /**
   * Outside of a point to the left.
   */
  OUTSIDE_LEFT: 'outside-left',
  /**
   * Outside of a point to the left in column.
   */
  OUTSIDE_LEFT_IN_COLUMN: 'outside-left-in-column',
  /**
   * Outside of a point to the right.
   */
  OUTSIDE_RIGHT: 'outside-right',
  /**
   * Outside of a point to the right in column.
   */
  OUTSIDE_RIGHT_IN_COLUMN: 'outside-right-in-column'
};


/**
 * Normalizes pyramid/funnel labels position
 * @param {*} value Labels position to normalize.
 * @param {chartEditor.enums.PyramidLabelsPosition=} opt_default Custom default value (defaults to OUTSIDE_LEFT_IN_COLUMN).
 * @return {chartEditor.enums.PyramidLabelsPosition}
 */
chartEditor.enums.normalizePyramidLabelsPosition = function(value, opt_default) {
  value = value == 'outside' ? chartEditor.enums.PyramidLabelsPosition.OUTSIDE_LEFT : value;
  return /** @type {chartEditor.enums.PyramidLabelsPosition} */(chartEditor.enums.normalize(chartEditor.enums.PyramidLabelsPosition, value,
      opt_default || chartEditor.enums.PyramidLabelsPosition.OUTSIDE_LEFT_IN_COLUMN));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  EventType
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Event types enumeration.
 * @enum {string}
 */
chartEditor.enums.EventType = {
  POINT_MOUSE_OUT: 'pointmouseout',
  POINT_MOUSE_OVER: 'pointmouseover',
  POINT_MOUSE_MOVE: 'pointmousemove',
  POINT_MOUSE_DOWN: 'pointmousedown',
  POINT_MOUSE_UP: 'pointmouseup',
  POINT_CLICK: 'pointclick',
  POINT_DBLCLICK: 'pointdblclick',
  //deprecated
  POINT_HOVER: 'pointhover',
  POINTS_SELECT: 'pointsselect',
  POINTS_HOVER: 'pointshover',
  CHART_DRAW: 'chartdraw',
  ANIMATION_START: 'animationstart',
  ANIMATION_END: 'animationend',
  DRILL_CHANGE: 'drillchange',

  ZOOM_START: 'zoomstart',
  ZOOM: 'zoom',
  ZOOM_END: 'zoomend',

  LEGEND_ITEM_MOUSE_OUT: 'legenditemmouseout',
  LEGEND_ITEM_MOUSE_OVER: 'legenditemmouseover',
  LEGEND_ITEM_MOUSE_MOVE: 'legenditemmousemove',
  LEGEND_ITEM_MOUSE_DOWN: 'legenditemmousedown',
  LEGEND_ITEM_MOUSE_UP: 'legenditemmouseup',
  LEGEND_ITEM_CLICK: 'legenditemclick',
  LEGEND_ITEM_DBLCLICK: 'legenditemdblclick',

  EVENT_MARKER_MOUSE_OUT: 'eventmarkermouseout',
  EVENT_MARKER_MOUSE_OVER: 'eventmarkermouseover',
  EVENT_MARKER_MOUSE_MOVE: 'eventmarkermousemove',
  EVENT_MARKER_MOUSE_DOWN: 'eventmarkermousedown',
  EVENT_MARKER_MOUSE_UP: 'eventmarkermouseup',
  EVENT_MARKER_CLICK: 'eventmarkerclick',
  EVENT_MARKER_DBLCLICK: 'eventmarkerdblclick',

  EVENT_MARKERS_HOVER: 'eventmarkershover',
  EVENT_MARKERS_SELECT: 'eventmarkersselect',

  DRAG: 'drag',
  DRAG_START: 'dragstart',
  DRAG_END: 'dragend',

  SCROLL_CHANGE: 'scrollchange',
  SCROLLING: 'scrolling',
  SCROLL_END: 'scrollend',

  SPLITTER_CHANGE: 'splitterchange',

  SCROLLER_CHANGE_START: 'scrollerchangestart',
  SCROLLER_CHANGE: 'scrollerchange',
  SCROLLER_CHANGE_FINISH: 'scrollerchangefinish',

  SELECTED_RANGE_CHANGE_START: 'selectedrangechangestart',
  SELECTED_RANGE_BEFORE_CHANGE: 'selectedrangebeforechange',
  SELECTED_RANGE_CHANGE: 'selectedrangechange',
  SELECTED_RANGE_CHANGE_FINISH: 'selectedrangechangefinish',

  //HIGHLIGHT: 'highlight',
  //UNHIGHLIGHT: 'unhighlight',

  SIGNAL: 'signal',

  //Grid events.
  ROW_SELECT: 'rowSelect',
  ROW_CLICK: 'rowClick',
  ROW_DBL_CLICK: 'rowDblClick',
  ROW_MOUSE_OVER: 'rowMouseOver',
  ROW_MOUSE_OUT: 'rowMouseOut',
  ROW_MOUSE_MOVE: 'rowMouseMove',
  ROW_MOUSE_DOWN: 'rowMouseDown',
  ROW_MOUSE_UP: 'rowMouseUp',
  BEFORE_CREATE_CONNECTOR: 'beforeCreateConnector',
  ROW_COLLAPSE_EXPAND: 'rowcollapseexpand',

  //Connectors events.
  CONNECTOR_SELECT: 'connectorselect',
  CONNECTOR_CLICK: 'connectorclick',
  CONNECTOR_DBL_CLICK: 'connectordblclick',
  CONNECTOR_MOUSE_OVER: 'connectormouseover',
  CONNECTOR_MOUSE_OUT: 'connectormouseout',
  CONNECTOR_MOUSE_MOVE: 'connectormousemove',
  CONNECTOR_MOUSE_DOWN: 'connectormousedown',
  CONNECTOR_MOUSE_UP: 'connectormouseup',

  //Data tree CRUD events.
  TREE_ITEM_MOVE: 'treeItemMove',
  TREE_ITEM_UPDATE: 'treeItemUpdate',
  TREE_ITEM_CREATE: 'treeItemCreate',
  TREE_ITEM_REMOVE: 'treeItemRemove',

  // Annotation events
  ANNOTATION_SELECT: 'annotationSelect',
  ANNOTATION_UNSELECT: 'annotationUnselect',
  ANNOTATION_DRAWING_FINISH: 'annotationDrawingFinish',
  ANNOTATION_CHANGE_START: 'annotationChangeStart',
  ANNOTATION_CHANGE: 'annotationChange',
  ANNOTATION_CHANGE_FINISH: 'annotationChangeFinish',

  // UI events
  CLOSE: 'close',
  COMPLETE: 'complete',

  SELECT_MARQUEE_START: 'selectmarqueestart',
  SELECT_MARQUEE_CHANGE: 'selectmarqueechange',
  SELECT_MARQUEE_FINISH: 'selectmarqueefinish',

  // data changed event for no data label
  DATA_CHANGED: 'datachanged'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  ScaleStackMode
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * @enum {string}
 */
chartEditor.enums.ScaleStackMode = {
  NONE: 'none',
  VALUE: 'value',
  PERCENT: 'percent'
};


/**
 * Normalizes scale stack mode.
 * @param {*} value Stack mode to normalize.
 * @param {chartEditor.enums.ScaleStackMode=} opt_default Custom default value (defaults to NONE).
 * @return {chartEditor.enums.ScaleStackMode}
 */
chartEditor.enums.normalizeScaleStackMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.ScaleStackMode} */(chartEditor.enums.normalize(chartEditor.enums.ScaleStackMode, value,
      opt_default || chartEditor.enums.ScaleStackMode.NONE));
};


/**
 * Enum for scale changes mode. Currently this enum is equal to the ScaleStackMode, so we reuse it.
 * @enum {string}
 */
chartEditor.enums.ScaleComparisonMode = chartEditor.enums.ScaleStackMode;


/**
 * Normalizes scale changes mode.
 * @param {*} value Stack mode to normalize.
 * @param {chartEditor.enums.ScaleComparisonMode=} opt_default Custom default value (defaults to NONE).
 * @return {chartEditor.enums.ScaleComparisonMode}
 */
chartEditor.enums.normalizeScaleComparisonMode = chartEditor.enums.normalizeScaleStackMode;


/**
 * Enum for predefined part of LinearScale.chagnesFrom() acceptable values.
 * @enum {string}
 */
chartEditor.enums.ComparisonDataSource = {
  SERIES_START: 'series-start',
  FIRST_VISIBLE: 'first-visible',
  SERIES_END: 'series-end',
  LAST_VISIBLE: 'last-visible'
};


/**
 * Normalize passed data source value.
 * @param {*} value
 * @return {chartEditor.enums.ComparisonDataSource|number}
 */
chartEditor.enums.normalizeDataSource = function(value) {
  return /** @type {chartEditor.enums.ComparisonDataSource|number} */(chartEditor.enums.normalize(chartEditor.enums.ComparisonDataSource, value, null) ||
      anychart.utils.normalizeTimestamp(value));
};


/**
 * @enum {string}
 */
chartEditor.enums.ScaleStackDirection = {
  DIRECT: 'direct',
  REVERSE: 'reverse'
};


/**
 * Normalizes scale stack direction.
 * @param {*} value - Stack direction to normalize.
 * @param {chartEditor.enums.ScaleStackDirection=} opt_default - Custom default value (defaults to DIRECT).
 * @return {chartEditor.enums.ScaleStackDirection} - Normalized value.
 */
chartEditor.enums.normalizeScaleStackDirection = function(value, opt_default) {
  return /** @type {chartEditor.enums.ScaleStackDirection} */(chartEditor.enums.normalize(chartEditor.enums.ScaleStackDirection, value,
      opt_default || chartEditor.enums.ScaleStackDirection.DIRECT));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  ScatterTicksMode
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Scatter ticks mode enum.
 * @enum {string}
 */
chartEditor.enums.ScatterTicksMode = {
  /**
   * Scatter ticks go with linear interval, e.g. [1, 2, 3, 4, 5]
   */
  LINEAR: 'linear',
  /**
   * Scatter ticks go with log-linear interval, e.g. [0.1, 1, 10, 100, 1000]
   */
  LOGARITHMIC: 'logarithmic'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  MapSeriesTypes
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types for Maps.
 * @enum {string}
 */
chartEditor.enums.MapSeriesType = {
  CHOROPLETH: 'choropleth',
  BUBBLE: 'bubble',
  MARKER: 'marker',
  CONNECTOR: 'connector'
};


/**
 * Normalizes map series type.
 * @param {*} value Series type to normalize.
 * @param {chartEditor.enums.MapSeriesType=} opt_default Custom default value (defaults to CHOROPLETH).
 * @return {chartEditor.enums.MapSeriesType}
 */
chartEditor.enums.normalizeMapSeriesType = function(value, opt_default) {
  return /** @type {chartEditor.enums.MapSeriesType} */(chartEditor.enums.normalize(chartEditor.enums.MapSeriesType, value,
      opt_default || chartEditor.enums.MapSeriesType.CHOROPLETH));
};


/**
 * List of names of common map projections.
 * @enum {string}
 */
chartEditor.enums.MapProjections = {
  BONNE: 'bonne',
  ECKERT1: 'eckert1',
  ECKERT3: 'eckert3',
  FAHEY: 'fahey',
  HAMMER: 'hammer',
  AITOFF: 'aitoff',
  MERCATOR: 'mercator',
  ORTHOGRAPHIC: 'orthographic',
  ROBINSON: 'robinson',
  WAGNER6: 'wagner6',
  WSG84: 'wsg84',
  EQUIRECTANGULAR: 'equirectangular',
  AUGUST: 'august'
};


/**
 * Normalizes map projections names.
 * @param {*} value Projection name to normalize.
 * @return {Object|Function|chartEditor.enums.MapProjections|string}
 */
chartEditor.enums.normalizeMapProjections = function(value) {
  switch (String(value).toLowerCase()) {
    case 'hammeraitoff':
    case 'hammer-aitoff':
    case 'hammer':
      return chartEditor.enums.MapProjections.HAMMER;
      break;
    case 'wagner':
    case 'wagner6':
      return chartEditor.enums.MapProjections.WAGNER6;
      break;
    case 'undefined':
    case 'null':
    case 'none':
    case 'wsg84':
    case 'base':
    case '+proj=longlat +datum=WGS84 +no_defs':
      return chartEditor.enums.MapProjections.WSG84;
      break;
  }
  return /** @type {Object|Function|chartEditor.enums.MapProjections|string} */(value);
};


/**
 * List of grid position relative othe map components. Grid z-index.
 * @enum {number}
 */
chartEditor.enums.MapGridZIndex = {
  UNDER_MAP: 5,
  OVER_MAP: 45
};


/**
 * Defines that middleX and middleY field means.
 * If mode is 'absolute' then coords of middle sets as lat/lon coords.
 * If 'relative' - as ratio of region bounds.
 * @enum {string}
 */
chartEditor.enums.MapPointMiddlePositionMode = {
  ABSOLUTE: 'absolute',
  RELATIVE: 'relative'
};


/**
 * Defines that x and y field of label means.
 * If mode is 'absolute' then coords of middle sets as lat/lon coords.
 * If 'relative' - as ratio of region bounds.
 * If 'offset' - as static position in polar coords, x - angle, y - radius. 0 degrees - 12 o'clock position.
 * @enum {string}
 */
chartEditor.enums.MapPointOutsidePositionMode = {
  ABSOLUTE: 'absolute',
  RELATIVE: 'relative',
  OFFSET: 'offset'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  CartesianSeriesTypes
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types.
 * @enum {string}
 */
chartEditor.enums.CartesianSeriesType = {
  AREA: 'area',
  BAR: 'bar',
  BOX: 'box',
  BUBBLE: 'bubble',
  CANDLESTICK: 'candlestick',
  COLUMN: 'column',
  JUMP_LINE: 'jump-line',
  LINE: 'line',
  MARKER: 'marker',
  OHLC: 'ohlc',
  RANGE_AREA: 'range-area',
  RANGE_BAR: 'range-bar',
  RANGE_COLUMN: 'range-column',
  RANGE_SPLINE_AREA: 'range-spline-area',
  RANGE_STEP_AREA: 'range-step-area',
  SPLINE: 'spline',
  SPLINE_AREA: 'spline-area',
  STEP_AREA: 'step-area',
  STEP_LINE: 'step-line',
  STICK: 'stick',
  HILO: 'hilo'
};


/**
 * Normalizes cartesian series type.
 * @param {*} value Series type to normalize.
 * @param {chartEditor.enums.CartesianSeriesType=} opt_default Custom default value (defaults to LINE).
 * @return {chartEditor.enums.CartesianSeriesType}
 */
chartEditor.enums.normalizeCartesianSeriesType = function(value, opt_default) {
  return /** @type {chartEditor.enums.CartesianSeriesType} */(chartEditor.enums.normalize(chartEditor.enums.CartesianSeriesType, value,
      opt_default || chartEditor.enums.CartesianSeriesType.LINE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Cartesian3dSeriesTypes
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types.
 * @enum {string}
 */
chartEditor.enums.Cartesian3dSeriesType = {
  AREA: 'area',
  BAR: 'bar',
  COLUMN: 'column',
  LINE: 'line',
  LINE_2D: 'line-2d'
};


/**
 * Normalizes cartesian 3D series type.
 * @param {*} value Series type to normalize.
 * @param {chartEditor.enums.Cartesian3dSeriesType=} opt_default Custom default value (defaults to COLUMN).
 * @return {chartEditor.enums.Cartesian3dSeriesType}
 */
chartEditor.enums.normalizeCartesian3dSeriesType = function(value, opt_default) {
  return /** @type {chartEditor.enums.Cartesian3dSeriesType} */(chartEditor.enums.normalize(chartEditor.enums.Cartesian3dSeriesType, value,
      opt_default || chartEditor.enums.Cartesian3dSeriesType.COLUMN));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  StockSeriesTypes
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types.
 * @enum {string}
 */
chartEditor.enums.StockSeriesType = {
  AREA: 'area',
  // BAR: 'bar',
  // BOX: 'box',
  // BUBBLE: 'bubble',
  CANDLESTICK: 'candlestick',
  COLUMN: 'column',
  LINE: 'line',
  MARKER: 'marker',
  OHLC: 'ohlc',
  RANGE_AREA: 'range-area',
  // RANGE_BAR: 'range-bar',
  RANGE_COLUMN: 'range-column',
  RANGE_SPLINE_AREA: 'range-spline-area',
  RANGE_STEP_AREA: 'range-step-area',
  SPLINE: 'spline',
  SPLINE_AREA: 'spline-area',
  STEP_AREA: 'step-area',
  STEP_LINE: 'step-line',
  JUMP_LINE: 'jump-line',
  STICK: 'stick',
  HILO: 'hilo'
};


/**
 * Normalizes stock series type.
 * @param {*} value Series type to normalize.
 * @param {chartEditor.enums.StockSeriesType=} opt_default Custom default value (defaults to LINE).
 * @return {chartEditor.enums.StockSeriesType}
 */
chartEditor.enums.normalizeStockSeriesType = function(value, opt_default) {
  return /** @type {chartEditor.enums.StockSeriesType} */(chartEditor.enums.normalize(chartEditor.enums.StockSeriesType, value,
      opt_default || chartEditor.enums.StockSeriesType.LINE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  StockIndicatorTypes
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types.
 * @enum {string}
 */
chartEditor.enums.StockIndicatorTypes = {
  ADL: 'adl',
  AMA: 'ama',
  AROON: 'aroon',
  ATR: 'atr',
  BBANDS: 'bbands',
  BBANDS_B: 'bbands-b',
  BBANDS_WIDTH: 'bbands-width',
  CCI: 'cci',
  CHO: 'cho',
  CMF: 'cmf',
  DMI: 'dmi',
  EMA: 'ema',
  KDJ: 'kdj',
  MACD: 'macd',
  MFI: 'mfi',
  MMA: 'mma',
  MOMENTUM: 'momentum',
  PSAR: 'psar',
  ROC: 'roc',
  RSI: 'rsi',
  SMA: 'sma',
  STOCHASTIC: 'stochastic',
  WILLIAMS_R: 'williams-r'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  MovingAverageType enum.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all smoothing types.
 * @enum {string}
 */
chartEditor.enums.MovingAverageType = {
  SMA: 'sma',
  EMA: 'ema'
};


/**
 * Normalizes smoothing type.
 * @param {*} value Smoothing value to normalize.
 * @param {chartEditor.enums.MovingAverageType=} opt_default Custom default value (defaults to SMA).
 * @return {chartEditor.enums.MovingAverageType}
 */
chartEditor.enums.normalizeMovingAverageType = function(value, opt_default) {
  return /** @type {chartEditor.enums.MovingAverageType} */(chartEditor.enums.normalize(chartEditor.enums.MovingAverageType, value,
      opt_default || chartEditor.enums.MovingAverageType.SMA));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  SparklineSeriesTypes
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types.
 * @enum {string}
 */
chartEditor.enums.SparklineSeriesType = {
  AREA: 'area',
  COLUMN: 'column',
  LINE: 'line',
  WIN_LOSS: 'win-loss'
};


/**
 * Normalizes sparkline series type.
 * @param {*} value Series type to normalize.
 * @param {chartEditor.enums.SparklineSeriesType=} opt_default Custom default value (defaults to LINE).
 * @return {chartEditor.enums.SparklineSeriesType}
 */
chartEditor.enums.normalizeSparklineSeriesType = function(value, opt_default) {
  return /** @type {chartEditor.enums.SparklineSeriesType} */(chartEditor.enums.normalize(chartEditor.enums.SparklineSeriesType, value,
      opt_default || chartEditor.enums.SparklineSeriesType.LINE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  LinearGaugePointerTypes
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all linear gauge pointers type.
 * @enum {string}
 */
chartEditor.enums.LinearGaugePointerType = {
  BAR: 'bar',
  RANGE_BAR: 'range-bar',
  MARKER: 'marker',
  THERMOMETER: 'thermometer',
  TANK: 'tank',
  LED: 'led'
};


/**
 * Normalizes linear gauge pointers type.
 * @param {*} value Pointer's type to normalize.
 * @param {chartEditor.enums.LinearGaugePointerType=} opt_default Custom default value (defaults to BAR).
 * @return {chartEditor.enums.LinearGaugePointerType}
 */
chartEditor.enums.normalizeLinearGaugePointerType = function(value, opt_default) {
  return /** @type {chartEditor.enums.LinearGaugePointerType} */(chartEditor.enums.normalize(chartEditor.enums.LinearGaugePointerType, value,
      opt_default || chartEditor.enums.LinearGaugePointerType.BAR));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Gantt specific data item field.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Gantt reserved names of field in data items.
 * @enum {string}
 */
chartEditor.enums.GanttDataFields = {
  ID: 'id',
  CHILDREN: 'children',
  ACTUAL: 'actual',
  ACTUAL_START: 'actualStart',
  ACTUAL_END: 'actualEnd',
  BASELINE: 'baseline',
  BASELINE_START: 'baselineStart',
  BASELINE_END: 'baselineEnd',
  PROGRESS: 'progress',
  PROGRESS_VALUE: 'progressValue',
  MILESTONE: 'milestone',
  NAME: 'name',
  COLLAPSED: 'collapsed',
  ROW_HEIGHT: 'rowHeight',
  PERIODS: 'periods',
  PARENT: 'parent',
  START: 'start',
  END: 'end',
  FILL: 'fill',
  STROKE: 'stroke',
  HOVER_FILL: 'hoverFill',
  HOVER_STROKE: 'hoverStroke',
  CONNECTOR: 'connector',
  CONNECT_TO: 'connectTo', // deprecated since 7.7.0
  CONNECTOR_TYPE: 'connectorType',
  START_MARKER: 'startMarker',
  END_MARKER: 'endMarker',
  LABEL: 'label',
  MARKERS: 'markers'
};


/**
 * Gantt range anchor.
 * @enum {string}
 * TODO (A.Kudryavtsev): Actually is chartEditor.enums.StockRangeAnchor from DVF-2364-range-selection-ui.
 */
chartEditor.enums.GanttRangeAnchor = {
  FIRST_DATE: 'first-date',
  FIRST_VISIBLE_DATE: 'first-visible-date',
  LAST_VISIBLE_DATE: 'last-visible-date',
  LAST_DATE: 'last-date'
};


/**
 * Normalizes range anchor.
 * @param {*} value
 * @param {?chartEditor.enums.GanttRangeAnchor=} opt_default Custom default value (defaults to FIRST_VISIBLE_DATE).
 * @return {?chartEditor.enums.GanttRangeAnchor}
 * TODO (A.Kudryavtsev): Actually is chartEditor.enums.normalizeStockRangeAnchor from DVF-2364-range-selection-ui.
 */
chartEditor.enums.normalizeGanttRangeAnchor = function(value, opt_default) {
  return /** @type {chartEditor.enums.GanttRangeAnchor} */(chartEditor.enums.normalize(chartEditor.enums.GanttRangeAnchor, value,
      goog.isDef(opt_default) ? opt_default : chartEditor.enums.GanttRangeAnchor.FIRST_VISIBLE_DATE));
};


/**
 * Timeline visual element types.
 * In current time (21 Jul 2015) doesn't need to be exported.
 * @enum {number}
 */
chartEditor.enums.TLElementTypes = {
  PARENT: 0,
  BASE: 1,
  PROGRESS: 2,
  BASELINE: 3,
  MILESTONE: 4,
  PERIOD: 5,
  CONNECTOR: 6
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Gantt timeline connector types.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Connection types.
 * @enum {string}
 */
chartEditor.enums.ConnectorType = {
  FINISH_START: 'finish-start',
  FINISH_FINISH: 'finish-finish',
  START_FINISH: 'start-finish',
  START_START: 'start-start'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Data Grid column formatting presets.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Column formatting presets.
 * @enum {string}
 */
chartEditor.enums.ColumnFormats = {
  DIRECT_NUMBERING: 'direct-numbering',
  TEXT: 'text',
  SHORT_TEXT: 'short-text',
  PERCENT: 'percent',
  DATE_COMMON_LOG: 'date-common-log',
  DATE_ISO_8601: 'date-iso-8601',
  DATE_US_SHORT: 'date-us-short',
  DATE_DMY_DOTS: 'date-dmy-dots',
  FINANCIAL: 'financial'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Gantt Date Time scale markers.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Gantt Date Time scale markers.
 * @enum {string}
 */
chartEditor.enums.GanttDateTimeMarkers = {
  START: 'start',
  END: 'end',
  CURRENT: 'current'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Reserved data fields.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Data fields.
 * @enum {string}
 */
chartEditor.enums.DataField = {
  DEPENDS_ON: 'dependsOn',
  OPTIMISTIC: 'optimistic',
  PESSIMISTIC: 'pessimistic',
  MOST_LIKELY: 'mostLikely',
  EXPECTED: 'expected',
  DURATION: 'duration',
  FROM: 'from',
  TO: 'to',
  ID: 'id',
  NAME: 'name'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  RadarSeriesTypes
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types.
 * @enum {string}
 */
chartEditor.enums.RadarSeriesType = {
  AREA: 'area',
  LINE: 'line',
  MARKER: 'marker'
};


/**
 * Normalizes radar series type.
 * @param {*} value Series type to normalize.
 * @param {chartEditor.enums.RadarSeriesType=} opt_default Custom default value (defaults to LINE).
 * @return {chartEditor.enums.RadarSeriesType}
 */
chartEditor.enums.normalizeRadarSeriesType = function(value, opt_default) {
  return /** @type {chartEditor.enums.RadarSeriesType} */(chartEditor.enums.normalize(chartEditor.enums.RadarSeriesType, value,
      opt_default || chartEditor.enums.RadarSeriesType.LINE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  PolarSeriesTypes
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types.
 * @enum {string}
 */
chartEditor.enums.PolarSeriesType = {
  AREA: 'area',
  LINE: 'line',
  MARKER: 'marker',
  POLYGON: 'polygon',
  POLYLINE: 'polyline',
  COLUMN: 'column',
  RANGE_COLUMN: 'range-column'
};


/**
 * Normalizes polar series type.
 * @param {*} value Series type to normalize.
 * @param {chartEditor.enums.PolarSeriesType=} opt_default Custom default value (defaults to LINE).
 * @return {chartEditor.enums.PolarSeriesType}
 */
chartEditor.enums.normalizePolarSeriesType = function(value, opt_default) {
  return /** @type {chartEditor.enums.PolarSeriesType} */(chartEditor.enums.normalize(chartEditor.enums.PolarSeriesType, value,
      opt_default || chartEditor.enums.PolarSeriesType.LINE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  ScatterSeriesType
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types.
 * @enum {string}
 */
chartEditor.enums.ScatterSeriesType = {
  BUBBLE: 'bubble',
  LINE: 'line',
  MARKER: 'marker'
};


/**
 * Normalizes scatter series type.
 * @param {*} value Series type to normalize.
 * @param {chartEditor.enums.ScatterSeriesType=} opt_default Custom default value (defaults to LINE).
 * @return {chartEditor.enums.ScatterSeriesType}
 */
chartEditor.enums.normalizeScatterSeriesType = function(value, opt_default) {
  return /** @type {chartEditor.enums.ScatterSeriesType} */(chartEditor.enums.normalize(chartEditor.enums.ScatterSeriesType, value,
      opt_default || chartEditor.enums.ScatterSeriesType.LINE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  HeatMapSeriesType
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types.
 * @enum {string}
 */
chartEditor.enums.HeatMapSeriesType = {
  HEAT_MAP: 'heat-map'
};


/**
 * Normalizes scatter series type.
 * @param {*} value Series type to normalize.
 * @param {chartEditor.enums.HeatMapSeriesType=} opt_default Custom default value (defaults to heatMap).
 * @return {chartEditor.enums.HeatMapSeriesType}
 */
chartEditor.enums.normalizeHeatMapSeriesType = function(value, opt_default) {
  return chartEditor.enums.HeatMapSeriesType.HEAT_MAP;
};


//----------------------------------------------------------------------------------------------------------------------
//
//  MekkoSeriesType
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types.
 * @enum {string}
 */
chartEditor.enums.MekkoSeriesType = {
  MEKKO: 'mekko'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  WaterfallSeriesType
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all series types.
 * @enum {string}
 */
chartEditor.enums.WaterfallSeriesType = {
  WATERFALL: 'waterfall'
};


/**
 * List of waterfall chart data modes.
 * @enum {string}
 */
chartEditor.enums.WaterfallDataMode = {
  ABSOLUTE: 'absolute',
  DIFF: 'diff'
};


/**
 * Normalizes waterfall datamode. Defaults to ABSOLUTE.
 * @param {*} value Value to normalize.
 * @param {chartEditor.enums.WaterfallDataMode=} opt_default Default value.
 * @return {chartEditor.enums.WaterfallDataMode}
 */
chartEditor.enums.normalizeWaterfallDataMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.WaterfallDataMode} */(chartEditor.enums.normalize(chartEditor.enums.WaterfallDataMode, value,
      opt_default || chartEditor.enums.WaterfallDataMode.ABSOLUTE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Scale types
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all scale types.
 * @enum {string}
 */
chartEditor.enums.ScaleTypes = {
  LINEAR: 'linear',
  LOG: 'log',
  DATE_TIME: 'date-time',
  DATE_TIME_WITH_CALENDAR: 'date-time-with-calendar',
  ORDINAL: 'ordinal',
  ORDINAL_COLOR: 'ordinal-color',
  LINEAR_COLOR: 'linear-color',
  STOCK_SCATTER_DATE_TIME: 'stock-scatter-date-time',
  STOCK_ORDINAL_DATE_TIME: 'stock-ordinal-date-time',
  GANTT: 'gantt'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Scatter scale types
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all scale types.
 * @enum {string}
 */
chartEditor.enums.ScatterScaleTypes = {
  LINEAR: 'linear',
  LOG: 'log',
  DATE_TIME: 'date-time'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Gauge scale types
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all scale types.
 * @enum {string}
 */
chartEditor.enums.GaugeScaleTypes = {
  LINEAR: 'linear',
  LOG: 'log'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Maps scale types
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * List of all scale types.
 * @enum {string}
 */
chartEditor.enums.MapsScaleTypes = {
  GEO: 'geo'
};


/**
 * Normalize gauge scale type.
 * @param {string} value .
 * @return {chartEditor.enums.GaugeScaleTypes|string} .
 */
chartEditor.enums.normalizeGaugeScaleTypes = function(value) {
  return /** @type {chartEditor.enums.GaugeScaleTypes} */(chartEditor.enums.normalize(chartEditor.enums.GaugeScaleTypes, value,
      chartEditor.enums.GaugeScaleTypes.LINEAR));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  CSV mode enum
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Csv mode enum.
 * @enum {string}
 */
chartEditor.enums.ChartDataExportMode = {
  DEFAULT: 'default',
  RAW: 'raw',
  SELECTED: 'selected',
  GROUPED: 'grouped'
};


/**
 * Normalizes csv mode.
 * By default normalizes as SPECIFIC.
 * @param {string=} opt_value
 * @return {chartEditor.enums.ChartDataExportMode} Normalized csv mode.
 */
chartEditor.enums.normalizeChartDataExportMode = function(opt_value) {
  return /** @type {chartEditor.enums.ChartDataExportMode} */(chartEditor.enums.normalize(chartEditor.enums.ChartDataExportMode, opt_value,
      chartEditor.enums.ChartDataExportMode.DEFAULT));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Errors, Warnings, Info
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * @enum {number}
 */
chartEditor.enums.ErrorCode = {
  CONTAINER_NOT_SET: 1,
  SCALE_NOT_SET: 2,

  //anychart.tableModule.Table
  WRONG_TABLE_CONTENTS: 3,

  NO_FEATURE_IN_MODULE: 4,

  INCORRECT_SCALE_TYPE: 5,

  EMPTY_CONFIG: 7,

  NO_LEGEND_IN_CHART: 8,

  NO_CREDITS_IN_CHART: 9,

  INVALID_GEO_JSON_OBJECT: 10,

  FEATURE_NOT_SUPPORTED: 11,

  NO_LEGEND_IN_STOCK: 51,

  CSV_DOUBLE_QUOTE_IN_SEPARATOR: 100,

  CSV_PARSING_FAILED: 101,

  TABLE_MAPPING_DIFFERENT_TABLE: 200,
  TABLE_FIELD_NAME_DUPLICATE: 201,
  TABLE_COMPUTER_OUTPUT_FIELD_DUPLICATE: 202,

  WRONG_SHAPES_CONFIG: 300
};


/**
 * @enum {number}
 */
chartEditor.enums.InfoCode = {
  PERFORMANCE_REPORT: 0,
  BULLET_TOO_MUCH_RANGES: 1,
  BULLET_TOO_MUCH_MEASURES: 2,
  PIE_TOO_MUCH_POINTS: 3
};


/**
 * @enum {number}
 */
chartEditor.enums.WarningCode = {
  //anychart.treeDataModule.Tree
  DUPLICATED_DATA_ITEM: 1,
  REFERENCE_IS_NOT_UNIQUE: 2,
  MISSING_PARENT_ID: 3,
  CYCLE_REFERENCE: 4,

  //anychart.data.Mapping
  NOT_MAPPED_FIELD: 5,
  COMPLEX_VALUE_TO_DEFAULT_FIELD: 6,
  NOT_OBJECT_OR_ARRAY: 7,

  CANT_SERIALIZE_FUNCTION: 8,

  //anychart.ganttModule.DataGrid incorrect component usage.
  DG_INCORRECT_METHOD_USAGE: 9, //can't be tested now

  GANTT_FIT_TO_TASK: 11,

  SERIES_DOESNT_SUPPORT_ERROR: 12,

  TOOLBAR_CONTAINER: 13,
  TOOLBAR_METHOD_IS_NOT_DEFINED: 14,
  TOOLBAR_CHART_IS_NOT_SET: 15,

  DATA_ITEM_SET_PATH: 17,

  TREEMAP_MANY_ROOTS: 18,

  MISSING_PROJ4: 19,

  TOO_MANY_TICKS: 20,

  OBJECT_KEY_COLLISION: 21,

  VENN_AREA_NOT_REPRESENTED_ON_SCREEN: 22,

  TABLE_ALREADY_IN_TRANSACTION: 101,

  STOCK_WRONG_MAPPING: 201,

  FEATURE_ID_NOT_FOUND: 301,

  NOT_FOUND: 404,
  DEPRECATED: 405,
  PARSE_DATETIME: 406,
  DEPRECATED_WITHOUT_REPLACEMENT: 407,

  IMMUTABLE_MARKER_SCALE: 500,
  IMMUTABLE_MARKER_LAYOUT: 501

};


//----------------------------------------------------------------------------------------------------------------------
//
//  DateTimeTicks Interval
//
//----------------------------------------------------------------------------------------------------------------------
// /**
// * Returns human readable
// * @param {chartEditor.enums.Interval} value
// * @return {string}
// */
// chartEditor.enums.denormalizeInterval = function(value) {
//   switch (value) {
//     case chartEditor.enums.Interval.YEAR:
//       return 'year';
//     case chartEditor.enums.Interval.SEMESTER:
//       return 'semester';
//     case chartEditor.enums.Interval.QUARTER:
//       return 'quarter';
//     case chartEditor.enums.Interval.MONTH:
//       return 'month';
//     case chartEditor.enums.Interval.THIRD_OF_MONTH:
//       return 'third-of-month';
//     case chartEditor.enums.Interval.WEEK:
//       return 'week';
//     case chartEditor.enums.Interval.DAY:
//       return 'day';
//     case chartEditor.enums.Interval.HOUR:
//       return 'hour';
//     case chartEditor.enums.Interval.MINUTE:
//       return 'minute';
//     case chartEditor.enums.Interval.SECOND:
//       return 'second';
//     case chartEditor.enums.Interval.MILLISECOND:
//       return 'millisecond';
//   }
//   return 'unknown';
// };


/**
 * Additional intervals used in stock. Should merge with main intervals, when the DateTimeTicks will work with
 * DateTimeIntervalGenerator instead of goog.date.Interval.
 * @enum {string}
 */
chartEditor.enums.Interval = {
  YEAR: 'year',
  SEMESTER: 'semester',
  QUARTER: 'quarter',
  MONTH: 'month',
  THIRD_OF_MONTH: 'third-of-month',
  WEEK: 'week',
  DAY: 'day',
  HOUR: 'hour',
  MINUTE: 'minute',
  SECOND: 'second',
  MILLISECOND: 'millisecond'
};


/**
 * Normalizes interval
 * @param {*} value Value to normalize.
 * @param {?chartEditor.enums.Interval=} opt_default Custom default value (defaults to YEARS).
 * @param {boolean=} opt_allowDateOnly If true - no time intervals are allowed, only day.
 * @return {?chartEditor.enums.Interval}
 */
chartEditor.enums.normalizeInterval = function(value, opt_default, opt_allowDateOnly) {
  value = (String(value)).toLowerCase();
  switch (value) {
    case 'years':
    case 'year':
    case 'yyyy':
    case 'yy':
    case 'y':
      return chartEditor.enums.Interval.YEAR;
    case 'semesters':
    case 'semester':
    case 'sem':
      return chartEditor.enums.Interval.SEMESTER;
    case 'quarters':
    case 'quarter':
    case 'q':
      return chartEditor.enums.Interval.QUARTER;
    case 'months':
    case 'month':
    case 'mm':
    case 'm':
      return chartEditor.enums.Interval.MONTH;
    case 'thirdofmonths':
    case 'thirdofmonth':
    case 'decades':
    case 'decade':
    case 'tom':
    case 'dec':
      return chartEditor.enums.Interval.THIRD_OF_MONTH;
    case 'weeks':
    case 'week':
    case 'w':
      return chartEditor.enums.Interval.WEEK;
    case 'days':
    case 'day':
    case 'dd':
    case 'd':
      return chartEditor.enums.Interval.DAY;
    case 'hours':
    case 'hour':
    case 'hh':
    case 'h':
      return opt_allowDateOnly ? chartEditor.enums.Interval.DAY : chartEditor.enums.Interval.HOUR;
    case 'minutes':
    case 'minute':
    case 'min':
    case 'n':
      return opt_allowDateOnly ? chartEditor.enums.Interval.DAY : chartEditor.enums.Interval.MINUTE;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return opt_allowDateOnly ? chartEditor.enums.Interval.DAY : chartEditor.enums.Interval.SECOND;
    case 'milliseconds':
    case 'millisecond':
    case 'millis':
    case 'milli':
    case 'ms':
      return opt_allowDateOnly ? chartEditor.enums.Interval.DAY : chartEditor.enums.Interval.MILLISECOND;
  }
  return goog.isDef(opt_default) ? opt_default : chartEditor.enums.Interval.YEAR;
};


//----------------------------------------------------------------------------------------------------------------------
//
//  ErrorMode enum
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * @enum {string}
 */
chartEditor.enums.ErrorMode = {
  NONE: 'none',
  X: 'x',
  VALUE: 'value',
  BOTH: 'both'
};


/**
 * Normalizes error mode
 * @param {*} value Value to normalize.
 * @param {chartEditor.enums.ErrorMode=} opt_default Custom default value (defaults to BOTH).
 * @return {chartEditor.enums.ErrorMode}
 */
chartEditor.enums.normalizeErrorMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.ErrorMode} */(chartEditor.enums.normalize(chartEditor.enums.ErrorMode, value,
      opt_default || chartEditor.enums.ErrorMode.BOTH));
};


/**
 * Text parsing mode.
 * @enum {string}
 */
chartEditor.enums.TextParsingMode = {
  CSV: 'csv',
  BY_WORD: 'by-word',
  BY_CHAR: 'by-char'
};


/**
 * Normalizes text parsing mode
 * @param {*} value Value to normalize.
 * @param {chartEditor.enums.TextParsingMode=} opt_default Custom default value (defaults to CSV).
 * @return {chartEditor.enums.TextParsingMode}
 */
chartEditor.enums.normalizeTextParsingMode = function(value, opt_default) {
  if (goog.isObject(value)) value = value['mode'];
  return /** @type {chartEditor.enums.TextParsingMode} */(chartEditor.enums.normalize(chartEditor.enums.TextParsingMode, value,
      opt_default || chartEditor.enums.TextParsingMode.CSV));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Text hAlign/vAlign
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Horizontal align enum.
 * @enum {string}
 */
chartEditor.enums.HAlign = {
  /**
   Aligns the text to the left.
   */
  LEFT: 'left',
  /**
   The same as left if direction is left-to-right and right if direction is right-to-left.
   */
  START: 'start',
  /**
   The inline contents are centered within the line box.
   */
  CENTER: 'center',
  /**
   The same as right if direction is left-to-right and left if direction is right-to-left.
   */
  END: 'end',
  /**
   Aligns the text to the right.
   */
  RIGHT: 'right'
};


/**
 * Normalizes HAlign enum.
 * @param {*} value
 * @return {chartEditor.enums.HAlign}
 */
chartEditor.enums.normalizeHAlign = function(value) {
  return /** @type {chartEditor.enums.HAlign} */(chartEditor.enums.normalize(chartEditor.enums.HAlign, value,
      chartEditor.enums.HAlign.START));
};


/**
 * Vertical align enum.
 * @enum {string}
 */
chartEditor.enums.VAlign = {
  /**
   vAlign top.
   */
  TOP: 'top',
  /**
   */
  MIDDLE: 'middle',
  /**
   vAlign bottom.
   */
  BOTTOM: 'bottom'
};


/**
 * Normalizes VAlign enum.
 * @param {*} value
 * @return {chartEditor.enums.VAlign}
 */
chartEditor.enums.normalizeVAlign = function(value) {
  return /** @type {chartEditor.enums.VAlign} */(chartEditor.enums.normalize(chartEditor.enums.VAlign, value, chartEditor.enums.VAlign.TOP));
};


/**
 * Font decoration enumeration.
 * @enum {string}
 */
chartEditor.enums.TextDecoration = {
  /**
   Blinking text. This value is not supported by some browser and is discussed in CSS3,
   animation is recommended instead.
   */
  BLINK: 'blink',
  /**
   Line through decoration.
   */
  LINE_THROUGH: 'line-through',
  /**
   Overline decoration.
   */
  OVERLINE: 'overline',
  /**
   Underline decoration.
   */
  UNDERLINE: 'underline',
  /**
   Cancels all decorations, including links underline.
   */
  NONE: 'none'
};


/**
 * Normalizes font decoration.
 * @param {*} value
 * @return {chartEditor.enums.TextDecoration}
 */
chartEditor.enums.normalizeFontDecoration = function(value) {
  return /** @type {chartEditor.enums.TextDecoration} */(chartEditor.enums.normalize(chartEditor.enums.TextDecoration, value,
      chartEditor.enums.TextDecoration.NONE));
};


/**
 * Font style enumeration.
 * @enum {string}
 */
chartEditor.enums.FontStyle = {
  /**
   Normal.
   */
  NORMAL: 'normal',
  /**
   Italic.
   */
  ITALIC: 'italic',
  /**
   Oblique.
   */
  OBLIQUE: 'oblique'
};


/**
 * Normalizes font style.
 * @param {*} value
 * @return {chartEditor.enums.FontStyle}
 */
chartEditor.enums.normalizeFontStyle = function(value) {
  return /** @type {chartEditor.enums.FontStyle} */(chartEditor.enums.normalize(chartEditor.enums.FontStyle, value,
      chartEditor.enums.FontStyle.NORMAL));
};


/**
 * Font variant enumeration.
 * @enum {string}
 */
chartEditor.enums.FontVariant = {
  /**
   Leave lovercase as is.
   */
  NORMAL: 'normal',
  /**
   Make lowercase smaller.
   */
  SMALL_CAP: 'small-caps'
};


/**
 * Normalizes font variant.
 * @param {*} value
 * @return {chartEditor.enums.FontVariant}
 */
chartEditor.enums.normalizeFontVariant = function(value) {
  return /** @type {chartEditor.enums.FontVariant} */(chartEditor.enums.normalize(chartEditor.enums.FontVariant, value,
      chartEditor.enums.FontVariant.NORMAL));
};


/**
 * Text direction enumeration.
 * @enum {string}
 */
chartEditor.enums.TextDirection = {
  /**
   Left to right.
   */
  LTR: 'ltr',
  /**
   Right to left.
   */
  RTL: 'rtl'
};


/**
 * Normalizes text direction.
 * @param {*} value
 * @return {chartEditor.enums.TextDirection}
 */
chartEditor.enums.normalizeTextDirection = function(value) {
  return /** @type {chartEditor.enums.TextDirection} */(chartEditor.enums.normalize(chartEditor.enums.TextDirection, value,
      chartEditor.enums.TextDirection.LTR));
};


/**
 * Text WordBreak mode.
 * @enum {string}
 */
chartEditor.enums.WordBreak = {
  /**
   Break words according to their usual rules.
   */
  NORMAL: 'normal',
  /**
   Don't allow word breaks for CJK text.  Non-CJK text behavior is the same as for normal.
   */
  KEEP_ALL: 'keep-all',
  /**
   Word breaks may be inserted between any character.
   */
  BREAK_ALL: 'break-all'
};


/**
 * Text WordWrap mode.
 * @enum {string}
 */
chartEditor.enums.WordWrap = {
  /**
   Indicates that lines may only break at normal word break points.
   */
  NORMAL: 'normal',
  /**
   Indicates that normally unbreakable words may be broken at arbitrary points if there are no otherwise acceptable break points in the line.
   */
  BREAK_WORD: 'break-word'
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Stock
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Aggregation type for table columns.
 * @enum {string}
 */
chartEditor.enums.AggregationType = {
  /**
   * Choose the first non-NaN value in a group as a value of a point.
   */
  FIRST: 'first',

  /**
   * Choose the last non-NaN value in a group as a value of a point.
   */
  LAST: 'last',

  /**
   * Choose the biggest non-NaN value in a group as a value of a point.
   */
  MAX: 'max',

  /**
   * Choose the lowest non-NaN value in a group as a value of a point.
   */
  MIN: 'min',

  /**
   * Calculate average value in a group and use it as a value of a point.
   */
  AVERAGE: 'average',

  /**
   * Calculate average value in a group using other column values as weights and use it as a value of a point.
   */
  WEIGHTED_AVERAGE: 'weighted-average',

  /**
   * Choose the first non-undefined value as a value of a point.
   */
  FIRST_VALUE: 'first-value',

  /**
   * Choose the last non-undefined value as a value of a point.
   */
  LAST_VALUE: 'last-value',

  /**
   * Calculate the sum of values in a group and use it as a value of a point.
   */
  SUM: 'sum',

  /**
   * Put all non-undefined values in a group to an array and us it as a value of a point.
   */
  LIST: 'list'
};


/**
 * Normalizes passed value to a normal aggregation type.
 * @param {*} value
 * @return {chartEditor.enums.AggregationType}
 */
chartEditor.enums.normalizeAggregationType = function(value) {
  value = String(value).toLowerCase();
  switch (value) {
    case 'first':
    case 'open':
      return chartEditor.enums.AggregationType.FIRST;
    case 'last':
    case 'close':
      return chartEditor.enums.AggregationType.LAST;
    case 'max':
    case 'high':
    case 'maximum':
    case 'highest':
      return chartEditor.enums.AggregationType.MAX;
    case 'min':
    case 'low':
    case 'minimum':
    case 'lowest':
      return chartEditor.enums.AggregationType.MIN;
    case 'average':
    case 'avg':
      return chartEditor.enums.AggregationType.AVERAGE;
    case 'weightedaverage':
    case 'weightedavg':
    case 'wavg':
    case 'weights':
    case 'weighted':
      return chartEditor.enums.AggregationType.WEIGHTED_AVERAGE;
    case 'firstvalue':
    case 'firstval':
    case 'openvalue':
    case 'openval':
      return chartEditor.enums.AggregationType.FIRST_VALUE;
    case 'lastvalue':
    case 'lastval':
    case 'closevalue':
    case 'closeval':
    case 'fill':
    case 'hoverfill':
    case 'risingfill':
    case 'hoverrisingfill':
    case 'fallingfill':
    case 'hoverfallingfill':
    case 'stroke':
    case 'hoverstroke':
    case 'lowstroke':
    case 'hoverlowstroke':
    case 'highstroke':
    case 'hoverhighstroke':
    case 'risingstroke':
    case 'hoverrisingstroke':
    case 'fallingstroke':
    case 'hoverfallingstroke':
    case 'hatchfill':
    case 'hoverhatchfill':
    case 'risinghatchfill':
    case 'hoverrisinghatchfill':
    case 'fallinghatchfill':
    case 'hoverfallinghatchfill':
    case 'marker':
    case 'hovermarker':
      return chartEditor.enums.AggregationType.LAST_VALUE;
    case 'sum':
    case 'add':
      return chartEditor.enums.AggregationType.SUM;
    case 'list':
    case 'group':
    case 'array':
      return chartEditor.enums.AggregationType.LIST;
    default:
      return chartEditor.enums.AggregationType.LAST;
  }
};


// /**
//  * X determining mode.
//  * @enum {string}
//  */
// chartEditor.enums.XGroupingMode = {
//   FIRST: 'first',
//   LAST: 'last'
// };
//
//
// /**
//  * Normalizes X grouping mode.
//  * @param {*} value
//  * @return {chartEditor.enums.XGroupingMode|Function}
//  */
// chartEditor.enums.normalizeXGroupingMode = function(value) {
//   var res;
//   if (goog.isFunction(value)) {
//     res = value;
//   } else {
//     res = String(value).toLowerCase();
//     if (res != 'last')
//       res = chartEditor.enums.XGroupingMode.FIRST;
//   }
//   return /** @type {chartEditor.enums.XGroupingMode|Function} */(res);
// };


/**
 * Enum for data table search modes.
 * @enum {string}
 */
chartEditor.enums.TableSearchMode = {
  EXACT_OR_PREV: 'exact-or-prev',
  EXACT: 'exact',
  EXACT_OR_NEXT: 'exact-or-next',
  NEAREST: 'nearest'
};


/**
 * Normalization for data table search mode.
 * @param {*} value
 * @return {chartEditor.enums.TableSearchMode}
 */
chartEditor.enums.normalizeTableSearchMode = function(value) {
  return /** @type {chartEditor.enums.TableSearchMode} */(chartEditor.enums.normalize(chartEditor.enums.TableSearchMode, value,
      chartEditor.enums.TableSearchMode.EXACT));
};


/**
 * Scroller range changing possible initiators.
 * @enum {string}
 */
chartEditor.enums.ScrollerRangeChangeSource = {
  THUMB_DRAG: 'thumb-drag',
  SELECTED_RANGE_DRAG: 'selected-range-drag',
  BACKGROUND_CLICK: 'background-click'
};


/**
 * Stock range changing possible initiators.
 * @enum {string}
 */
chartEditor.enums.StockRangeChangeSource = {
  SCROLLER_THUMB_DRAG: 'scroller-thumb-drag',
  SCROLLER_DRAG: 'scroller-drag',
  SCROLLER_CLICK: 'scroller-click',
  PLOT_DRAG: 'plot-drag',
  DATA_CHANGE: 'data-update',
  SELECT_RANGE: 'select-range',
  MARQUEE: 'marquee',
  MOUSE_WHEEL: 'mouse-wheel'
};


/**
 * Stock period range type.
 * @enum {string}
 */
chartEditor.enums.StockRangeType = {
  UNIT: 'unit',
  POINTS: 'points',
  YTD: 'ytd',
  QTD: 'qtd',
  MTD: 'mtd',
  MAX: 'max'
};


/**
 * Normalizes StockRangePeriodType enum.
 * @param {*} value
 * @param {?chartEditor.enums.StockRangeType=} opt_default Custom default value (defaults to MAX).
 * @return {?chartEditor.enums.StockRangeType}
 */
chartEditor.enums.normalizeStockRangeType = function(value, opt_default) {
  return /** @type {chartEditor.enums.StockRangeType} */(chartEditor.enums.normalize(chartEditor.enums.StockRangeType, value,
      goog.isDef(opt_default) ? opt_default : chartEditor.enums.StockRangeType.MAX));
};


/**
 * Stock range anchor.
 * @enum {string}
 */
chartEditor.enums.StockRangeAnchor = {
  FIRST_DATE: 'first-date',
  FIRST_VISIBLE_DATE: 'first-visible-date',
  LAST_VISIBLE_DATE: 'last-visible-date',
  LAST_DATE: 'last-date'
};


/**
 * Normalizes range anchor.
 * @param {*} value
 * @param {?chartEditor.enums.StockRangeAnchor=} opt_default Custom default value (defaults to LAST_DATE).
 * @return {?chartEditor.enums.StockRangeAnchor}
 */
chartEditor.enums.normalizeStockRangeAnchor = function(value, opt_default) {
  return /** @type {chartEditor.enums.StockRangeAnchor} */(chartEditor.enums.normalize(chartEditor.enums.StockRangeAnchor, value,
      goog.isDef(opt_default) ? opt_default : chartEditor.enums.StockRangeAnchor.LAST_DATE));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Tooltip.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * @enum {string}
 */
chartEditor.enums.TooltipDisplayMode = {
  UNION: 'union',
  SEPARATED: 'separated',
  SINGLE: 'single'
};


/**
 * Normalizes tooltips display mode.
 * @param {*} value
 * @return {chartEditor.enums.TooltipDisplayMode}
 */
chartEditor.enums.normalizeTooltipDisplayMode = function(value) {
  return /** @type {chartEditor.enums.TooltipDisplayMode} */(chartEditor.enums.normalize(chartEditor.enums.TooltipDisplayMode, value,
      chartEditor.enums.TooltipDisplayMode.SINGLE));
};


/**
 * @enum {string}
 */
chartEditor.enums.TooltipPositionMode = {
  FLOAT: 'float',
  POINT: 'point',
  CHART: 'chart'
};


/**
 * Normalizes tooltips position mode.
 * @param {*} value
 * @return {chartEditor.enums.TooltipPositionMode}
 */
chartEditor.enums.normalizeTooltipPositionMode = function(value) {
  return /** @type {chartEditor.enums.TooltipPositionMode} */(chartEditor.enums.normalize(chartEditor.enums.TooltipPositionMode, value,
      chartEditor.enums.TooltipPositionMode.FLOAT));
};


/**
 * @enum {string}
 */
chartEditor.enums.CrosshairDisplayMode = {
  FLOAT: 'float',
  STICKY: 'sticky'
};


/**
 * Normalizes tooltips position mode.
 * @param {*} value
 * @return {chartEditor.enums.CrosshairDisplayMode}
 */
chartEditor.enums.normalizeCrosshairDisplayMode = function(value) {
  return /** @type {chartEditor.enums.CrosshairDisplayMode} */(chartEditor.enums.normalize(chartEditor.enums.CrosshairDisplayMode, value,
      chartEditor.enums.CrosshairDisplayMode.FLOAT));
};


/**
 * @enum {string}
 */
chartEditor.enums.LabelsDisplayMode = {
  ALWAYS_SHOW: 'always-show',
  CLIP: 'clip',
  DROP: 'drop'
};


/**
 * Normalizes labels display mode.
 * @param {*} value Display mode to normalize.
 * @param {chartEditor.enums.LabelsDisplayMode=} opt_default Custom default value (defaults to CLIP).
 * @return {chartEditor.enums.LabelsDisplayMode}
 */
chartEditor.enums.normalizeLabelsDisplayMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.LabelsDisplayMode} */(chartEditor.enums.normalize(chartEditor.enums.LabelsDisplayMode, value,
      opt_default || chartEditor.enums.LabelsDisplayMode.CLIP));
};


/**
 * @enum {string}
 */
chartEditor.enums.AdjustFontSizeMode = {
  SAME: 'same',
  DIFFERENT: 'different'
};


/**
 * Normalizes adjust font size mode.
 * @param {*} value Mode mode to normalize.
 * @param {chartEditor.enums.AdjustFontSizeMode=} opt_default Custom default value (defaults to DIFFERENT).
 * @return {chartEditor.enums.AdjustFontSizeMode}
 */
chartEditor.enums.normalizeAdjustFontSizeMode = function(value, opt_default) {
  return /** @type {chartEditor.enums.AdjustFontSizeMode} */(chartEditor.enums.normalize(chartEditor.enums.AdjustFontSizeMode, value,
      opt_default || chartEditor.enums.AdjustFontSizeMode.DIFFERENT));
};


/**
 * @enum {string}
 */
chartEditor.enums.StepDirection = {
  CENTER: 'center',
  FORWARD: 'forward',
  BACKWARD: 'backward'
};


/**
 * Normalizes step direction.
 * @param {*} value - Value to normalize.
 * @param {chartEditor.enums.StepDirection=} opt_default - Custom default value (defaults to CENTER).
 * @return {chartEditor.enums.StepDirection}
 */
chartEditor.enums.normalizeStepDirection = function(value, opt_default) {
  return /** @type {chartEditor.enums.StepDirection} */(chartEditor.enums.normalize(chartEditor.enums.StepDirection, value,
      opt_default || chartEditor.enums.StepDirection.CENTER));
};


/**
 * Token types enum.
 * @enum {string}
 */
chartEditor.enums.TokenType = {
  UNKNOWN: '',
  NUMBER: 'number',
  STRING: 'string',
  DATE_TIME: 'date-time',
  DATE: 'date',
  TIME: 'time',
  PERCENT: 'percent'
};


/**
 * String token enum.
 * @enum {string}
 */
chartEditor.enums.StringToken = {
  /**
   Average.
   */
  AVERAGE: '%Average',
  ///**
  // The average value of all points in series that are bound this axis.
  // */
  //AXIS_AVERAGE: '%AxisAverage',
  ///**
  // The maximal bubble size of all points in series that are bound this axis.
  // */
  //AXIS_BUBBLE_SIZE_MAX: '%AxisBubbleSizeMax',
  ///**
  // The minimal bubble size of all points in series that are bound this axis.
  // */
  //AXIS_BUBBLE_SIZE_MIN: '%AxisBubbleSizeMin',
  ///**
  // The sum of all bubble sizes of all points in series that are bound this axis.
  // */
  //AXIS_BUBBLE_SIZE_SUM: '%AxisBubbleSizeSum',
  ///**
  // The maximal value of all points in series that are bound this axis.
  // */
  //AXIS_MAX: '%AxisMax',
  ///**
  // The median value of all points in series that are bound this axis.
  // */
  //AXIS_MEDIAN: '%AxisMedian',
  ///**
  // The minimal value of all points in series that are bound this axis.
  // */
  //AXIS_MIN: '%AxisMin',
  ///**
  // The mode value of all points in series that are bound this axis.
  // */
  //AXIS_MODE: '%AxisMode',
  /**
   The name of the axis.
   */
  AXIS_NAME: '%AxisName',
  /**
   The maximal scale value.
   */
  AXIS_SCALE_MAX: '%AxisScaleMax',
  /**
   The minimal scale value.
   */
  AXIS_SCALE_MIN: '%AxisScaleMin',
  ///**
  // The sum of all y values of all points in series that are bound this axis.
  // */
  //AXIS_SUM: '%AxisSum',
  /**
   The bubble size value of this point (Bubble chart).
   */
  BUBBLE_SIZE: '%BubbleSize',
  /**
   The percentage of all the points with the same name this point represents (Categorized charts).
   */
  BUBBLE_SIZE_PERCENT_OF_CATEGORY: '%BubbleSizePercentOfCategory',
  /**
   The percentage of the series this point represents.
   */
  BUBBLE_SIZE_PERCENT_OF_SERIES: '%BubbleSizePercentOfSeries',
  /**
   The percentage of all the series on the chart this point represents.
   */
  BUBBLE_SIZE_PERCENT_OF_TOTAL: '%BubbleSizePercentOfTotal',
  /**
   The name of the category.
   */
  CATEGORY_NAME: '%CategoryName',
  /**
   The average of all the points within this category.
   */
  CATEGORY_Y_AVERAGE: '%CategoryYAverage',
  /**
   The median of all the points within this category.
   */
  CATEGORY_Y_MEDIAN: '%CategoryYMedian',
  /**
   The mode of all the points within this category.
   */
  CATEGORY_Y_MODE: '%CategoryYMode',
  /**
   The percent of all the data on the chart this category represents.
   */
  CATEGORY_Y_PERCENT_OF_TOTAL: '%CategoryYPercentOfTotal',
  /**
   Cat y range average.
   */
  CATEGORY_Y_RANGE_AVERAGE: '%CategoryYRangeAverage',
  /**
   The maximal range in this category (Range charts).
   */
  CATEGORY_Y_RANGE_MAX: '%CategoryYRangeMax',
  /**
   The minimal range in this category (Range charts).
   */
  CATEGORY_Y_RANGE_MIN: '%CategoryYRangeMin',
  /**
   The median range in this category (Range charts).
   */
  CATEGORY_Y_RANGE_MEDIAN: '%CategoryYRangeMedian',
  /**
   The mode range in this category (Range charts).
   */
  CATEGORY_Y_RANGE_MODE: '%CategoryYRangeMode',
  /**
   The sum of all ranges in this category (Range charts).
   */
  CATEGORY_Y_RANGE_SUM: '%CategoryYRangeSum',
  /**
   Category Y range percent of total (Range charts).
   */
  CATEGORY_Y_RANGE_PERCENT_OF_TOTAL: '%CategoryYRangePercentOfTotal',
  /**
   The sum of all the points within this category.
   */
  CATEGORY_Y_SUM: '%CategoryYSum',
  /**
   The close value of this point (OHLC, Candlestick).
   */
  CLOSE: '%Close',
  /**
   The maximal of all the points bubble sizes (Bubble chart).
   */
  DATA_PLOT_BUBBLE_MAX_SIZE: '%DataPlotBubbleMaxSize',
  /**
   The minimal of all the points bubble sizes (Bubble chart).
   */
  DATA_PLOT_BUBBLE_MIN_SIZE: '%DataPlotBubbleMinSize',
  /**
   The average bubble size of all the points (Scatter plot charts).
   */
  DATA_PLOT_BUBBLE_SIZE_AVERAGE: '%DataPlotBubbleSizeAverage',
  /**
   The sum of all the points bubble sizes (Bubble chart).
   */
  DATA_PLOT_BUBBLE_SIZE_SUM: '%DataPlotBubbleSizeSum',
  /**
   The name of the series with a maximal sum of the points y values.
   */
  DATA_PLOT_MAX_Y_SUM_SERIES_NAME: '%DataPlotMaxYSumSeriesName',
  /**
   The name of the point with a maximal of all the points y values.
   */
  DATA_PLOT_MAX_Y_VALUE_POINT_NAME: '%DataPlotMaxYValuePointName',
  /**
   The name of the series with a maximal of all the points y values.
   */
  DATA_PLOT_MAX_Y_VALUE_POINT_SERIES_NAME: '%DataPlotMaxYValuePointSeriesName',
  /**
   The name of the series with a minimal sum of the points y values.
   */
  DATA_PLOT_MIN_Y_SUM_SERIES_NAME: '%DataPlotMinYSumSeriesName',
  /**
   The name of the point with a minimal of all the points y values.
   */
  DATA_PLOT_MIN_Y_VALUE_POINT_NAME: '%DataPlotMinYValuePointName',
  /**
   The name of the series with a minimal of all the points y values.
   */
  DATA_PLOT_MIN_Y_VALUE_POINT_SERIES_NAME: '%DataPlotMinYValuePointSeriesName',
  /**
   The number of the points within the chart.
   */
  DATA_PLOT_POINT_COUNT: '%DataPlotPointCount',
  /**
   The number of the series within the chart.
   */
  DATA_PLOT_SERIES_COUNT: '%DataPlotSeriesCount',
  /**
   The average x value of all the points (Scatter plot charts).
   */
  DATA_PLOT_X_AVERAGE: '%DataPlotXAverage',
  /**
   The maximal of all the points x values (Scatter plot chart).
   */
  DATA_PLOT_X_MAX: '%DataPlotXMax',
  /**
   The minimal of all the points x values (Scatter plot chart).
   */
  DATA_PLOT_X_MIN: '%DataPlotXMin',
  /**
   The sum of all the points x values (Scatter plot charts).
   */
  DATA_PLOT_X_SUM: '%DataPlotXSum',
  /**
   The average y value of all the points.
   */
  DATA_PLOT_Y_AVERAGE: '%DataPlotYAverage',
  /**
   The maximal of all the points y values.
   */
  DATA_PLOT_Y_MAX: '%DataPlotYMax',
  /**
   The minimal of all the points y values.
   */
  DATA_PLOT_Y_MIN: '%DataPlotYMin',
  /**
   The maximal of the ranges of the points within the chart.
   */
  DATA_PLOT_Y_RANGE_MAX: '%DataPlotYRangeMax',
  /**
   The minimal of the ranges of the points within the chart.
   */
  DATA_PLOT_Y_RANGE_MIN: '%DataPlotYRangeMin',
  /**
   The sum of the ranges of the points within the chart.
   */
  DATA_PLOT_Y_RANGE_SUM: '%DataPlotYRangeSum',
  /**
   The sum of all the points y values.
   */
  DATA_PLOT_Y_SUM: '%DataPlotYSum',
  /**
   The high value of this point (OHLC, Candlestick).
   */
  HIGH: '%High',
  ///**
  // Returns series or point specific icon.
  // */
  //ICON: '%Icon',
  /**
   The index of this point in the series this point represents (zero-based).
   */
  INDEX: '%Index',
  /**
   The low value of this point (OHLC, Candlestick).
   */
  LOW: '%Low',
  /**
   The name of this point.
   */
  NAME: '%Name',
  /**
   The open value of this point (OHLC, Candlestick).
   */
  OPEN: '%Open',
  /**
   PERT chart statistics - standard deviation for critical path.
   */
  PERT_CHART_CRITICAL_PATH_STANDARD_DEVIATION: '%PertChartCriticalPathStandardDeviation',
  /**
   PERT chart statistics - project duration.
   */
  PERT_CHART_PROJECT_DURATION: '%PertChartProjectDuration',
  /**
   The range of this point (RangeEnd - RangeStart).
   */
  RANGE: '%Range',
  /**
   The ending value of this point (Range charts).
   */
  RANGE_END: '%RangeEnd',
  /**
   The starting value of this point (Range charts).
   */
  RANGE_START: '%RangeStart',
  /**
   The maximal bubble size value of all the points within this series (Bubble chart).
   */
  SERIES_BUBBLE_MAX_SIZE: '%SeriesBubbleMaxSize',
  /**
   The minimal bubble size value of all the points within this series (Bubble chart).
   */
  SERIES_BUBBLE_MIN_SIZE: '%SeriesBubbleMinSize',
  /**
   The average bubble size value of all the points within this series (Bubble chart).
   */
  SERIES_BUBBLE_SIZE_AVERAGE: '%SeriesBubbleSizeAverage',
  /**
   The median bubble size value of all the points within this series (Bubble chart).
   */
  SERIES_BUBBLE_SIZE_MEDIAN: '%SeriesBubbleSizeMedian',
  /**
   The mode bubble size value of all the points within this series (Bubble chart).
   */
  SERIES_BUBBLE_SIZE_MODE: '%SeriesBubbleSizeMode',
  /**
   The sum of all the points bubble sizes (Bubble chart).
   */
  SERIES_BUBBLE_SIZE_SUM: '%SeriesBubbleSizeSum',
  /**
   The x value of the first point in this series (Scatter plot charts).
   */
  SERIES_FIRST_X_VALUE: '%SeriesFirstXValue',
  /**
   The y value of the first point in this series.
   */
  SERIES_FIRST_Y_VALUE: '%SeriesFirstYValue',
  /**
   The x value of the last point in this series (Scatter plot charts).
   */
  SERIES_LAST_X_VALUE: '%SeriesLastXValue',
  /**
   The y value of the first point in this series.
   */
  SERIES_LAST_Y_VALUE: '%SeriesLastYValue',
  /**
   Series min value.
   */
  SERIES_MIN: '%SeriesMin',
  /**
   Series max value.
   */
  SERIES_MAX: '%SeriesMax',
  /**
   The name of this series.
   */
  SERIES_NAME: '%SeriesName',
  /**
   The number of points in this series.
   */
  SERIES_POINT_COUNT: '%SeriesPointCount',
  /**
   The number of points in this series.
   */
  SERIES_POINTS_COUNT: '%SeriesPointsCount',
  /**
   The average x value of all the points within this series.
   */
  SERIES_X_AVERAGE: '%SeriesXAverage',
  /**
   The title text of the X Axis.
   */
  SERIES_X_AXIS_NAME: '%SeriesXAxisName',
  /**
   The maximal x value of all the elements within this series (Scatter plot charts).
   */
  SERIES_X_MAX: '%SeriesXMax',
  /**
   The median x value of all the points within this series (Scatter plot charts).
   */
  SERIES_X_MEDIAN: '%SeriesXMedian',
  /**
   The minimal x value of all the elements within this series (Scatter plot charts).
   */
  SERIES_X_MIN: '%SeriesXMin',
  /**
   The mode x value of all the points within this series (Scatter plot charts).
   */
  SERIES_X_MODE: '%SeriesXMode',
  /**
   The sum of all the points x values (Scatter plot charts).
   */
  SERIES_X_SUM: '%SeriesXSum',
  /**
   The average y value of all the points within this series.
   */
  SERIES_Y_AVERAGE: '%SeriesYAverage',
  /**
   The title text of the Y Axis.
   */
  SERIES_Y_AXIS_NAME: '%SeriesYAxisName',
  /**
   The maximal y value of all the elements within this series.
   */
  SERIES_Y_MAX: '%SeriesYMax',
  /**
   The median y value of all the points within this series.
   */
  SERIES_Y_MEDIAN: '%SeriesYMedian',
  /**
   The minimal y value of all the elements within this series.
   */
  SERIES_Y_MIN: '%SeriesYMin',
  /**
   The mode y value of all the points within this series.
   */
  SERIES_Y_MODE: '%SeriesYMode',
  /**
   The maximal range in this series (Range charts).
   */
  SERIES_Y_RANGE_MAX: '%SeriesYRangeMax',
  /**
   The minimal range in this series (Range charts).
   */
  SERIES_Y_RANGE_MIN: '%SeriesYRangeMin',
  /**
   The sum of all ranges in this series (Range charts).
   */
  SERIES_Y_RANGE_SUM: '%SeriesYRangeSum',
  /**
   The sum of all the points y values.
   */
  SERIES_Y_SUM: '%SeriesYSum',
  /**
   The y value of this point.
   */
  VALUE: '%Value',
  /**
   The percent y value of this point.
   */
  PERCENT_VALUE: '%PercentValue',
  ///**
  // The average x value of all points in series.
  // */
  //X_AXIS_AVERAGE: '%XAxisAverage',
  ///**
  // The maximal bubble size of all points in series.
  // */
  //X_AXIS_BUBBLE_SIZE_MAX: '%XAxisBubbleSizeMax',
  ///**
  // The minimal bubble size of all points in series.
  // */
  //X_AXIS_BUBBLE_SIZE_MIN: '%XAxisBubbleSizeMin',
  ///**
  // The sum of all bubble sizes of all points in series.
  // */
  //X_AXIS_BUBBLE_SIZE_SUM: '%XAxisBubbleSizeSum',
  ///**
  // The maximal x value of all points in series.
  // */
  //X_AXIS_MAX: '%XAxisMax',
  ///**
  // The median x value of all points in series.
  // */
  //X_AXIS_MEDIAN: '%XAxisMedian',
  ///**
  // The minimal x value of all points in series.
  // */
  //X_AXIS_MIN: '%XAxisMin',
  ///**
  // The mode x value of all points in series.
  // */
  //X_AXIS_MODE: '%XAxisMode',
  ///**
  // The name of the axis.
  // */
  //X_AXIS_NAME: '%XAxisName',
  ///**
  // The maximal scale value.
  // */
  //X_AXIS_SCALE_MAX: '%XAxisScaleMax',
  ///**
  // The minimal scale value.
  // */
  //X_AXIS_SCALE_MIN: '%XAxisScaleMin',
  ///**
  // The sum of all x values of all points in series.
  // */
  //X_AXIS_SUM: '%XAxisSum',
  /**
   The percentage of the series this point represents (Scatter Plot charts).
   */
  X_PERCENT_OF_SERIES: '%XPercentOfSeries',
  /**
   The percentage of all the series on the chart this point represents.
   */
  X_PERCENT_OF_TOTAL: '%XPercentOfTotal',
  /**
   The x value of this point (Scatter Plot charts).
   */
  X_VALUE: '%XValue',
  ///**
  // The average y value of all points in series that are bound this axis.
  // */
  //Y_AXIS_AVERAGE: '%YAxisAverage',
  ///**
  // The maximal bubble size of all points in series that are bound this axis.
  // */
  //Y_AXIS_BUBBLE_SIZE_MAX: '%YAxisBubbleSizeMax',
  ///**
  // The minimal bubble size of all points in series that are bound this axis.
  // */
  //Y_AXIS_BUBBLE_SIZE_MIN: '%YAxisBubbleSizeMin',
  ///**
  // The sum of all bubble sizes of all points in series that are bound this axis.
  // */
  //Y_AXIS_BUBBLE_SIZE_SUM: '%YAxisBubbleSizeSum',
  ///**
  // The maximal y value of all points in series that are bound this axis.
  // */
  //Y_AXIS_MAX: '%YAxisMax',
  ///**
  // The median y value of all points in series that are bound this axis.
  // */
  //Y_AXIS_MEDIAN: '%YAxisMedian',
  ///**
  // The minimal y value of all points in series that are bound this axis.
  // */
  //Y_AXIS_MIN: '%YAxisMin',
  ///**
  // The mode y value of all points in series that are bound this axis.
  // */
  //Y_AXIS_MODE: '%YAxisMode',
  ///**
  // The name of the axis.
  // */
  //Y_AXIS_NAME: '%YAxisName',
  ///**
  // The maximal scale value.
  // */
  //Y_AXIS_SCALE_MAX: '%YAxisScaleMax',
  ///**
  // The minimal scale value.
  // */
  //Y_AXIS_SCALE_MIN: '%YAxisScaleMin',
  ///**
  // The sum of all y values of all points in series that are bound this axis.
  // */
  //Y_AXIS_SUM: '%YAxisSum',
  /**
   The percentage of all the points with the same name this point represents.
   */
  Y_PERCENT_OF_CATEGORY: '%YPercentOfCategory',
  /**
   The percentage of the series this point represents.
   */
  Y_PERCENT_OF_SERIES: '%YPercentOfSeries',
  /**
   The percentage of all the series on the chart this point represents.
   */
  Y_PERCENT_OF_TOTAL: '%YPercentOfTotal',
  /**
   The y value of this point.*/
  Y_VALUE: '%YValue',

  /**
   * Cumulative frequency of the point. Used in pareto series.
   */
  CUMULATIVE_FREQUENCY: '%CF',

  /**
   * Relative frequency of the point. Used in pareto series.
   */
  RELATIVE_FREQUENCY: '%RF',

  /**
   * Point value relative to the previous point. Used in Waterfall series.
   */
  DIFF: '%Diff',

  /**
   * Absolute point value. Used in Waterfall series.
   */
  ABSOLUTE: '%Absolute',

  /**
   * If the point is a total point. Used in Waterfall series.
   */
  IS_TOTAL: '%IsTotal',

  /**
   * Resource index that holds the activity. Used in Resource charts.
   */
  RESOURCE_INDEX: '%resourceIndex',

  /**
   * Activity index. Used in Resource charts.
   */
  ACTIVITY_INDEX: '%activityIndex',

  /**
   * Activity start date. Used in Resource charts.
   */
  START: '%start',

  /**
   * Activity end date. Used in Resource charts.
   */
  END: '%end',

  /**
   * Activity minutes per day. Used in Resource charts.
   */
  MINUTES_PER_DAY: '%minutesPerDay'
};


/**
 * Statistics enum.
 * @enum {string}
 */
chartEditor.enums.Statistics = {
  /**
   Average.
   */
  AVERAGE: 'average',
  ///**
  // The average value of all points in series that are bound this axis.
  // */
  //AXIS_AVERAGE: 'axisAverage',
  ///**
  // The maximal bubble size of all points in series that are bound this axis.
  // */
  //AXIS_BUBBLE_SIZE_MAX: 'axisBubbleSizeMax',
  ///**
  // The minimal bubble size of all points in series that are bound this axis.
  // */
  //AXIS_BUBBLE_SIZE_MIN: 'axisBubbleSizeMin',
  ///**
  // The sum of all bubble sizes of all points in series that are bound this axis.
  // */
  //AXIS_BUBBLE_SIZE_SUM: 'axisBubbleSizeSum',
  ///**
  // The maximal value of all points in series that are bound this axis.
  // */
  //AXIS_MAX: 'axisMax',
  ///**
  // The median value of all points in series that are bound this axis.
  // */
  //AXIS_MEDIAN: 'axisMedian',
  ///**
  // The minimal value of all points in series that are bound this axis.
  // */
  //AXIS_MIN: 'axisMin',
  ///**
  // The mode value of all points in series that are bound this axis.
  // */
  //AXIS_MODE: 'axisMode',
  ///**
  // The name of the axis.
  // */
  //AXIS_NAME: 'axisName',
  ///**
  // The maximal scale value.
  // */
  //AXIS_SCALE_MAX: 'axisScaleMax',
  ///**
  // The minimal scale value.
  // */
  //AXIS_SCALE_MIN: 'axisScaleMin',
  ///**
  // The sum of all y values of all points in series that are bound this axis.
  // */
  //AXIS_SUM: 'axisSum',
  /**
   The bubble size value of this point (Bubble chart).
   */
  BUBBLE_SIZE: 'bubbleSize',
  /**
   The percentage of all the points with the same name this point represents (Categorized charts).
   */
  BUBBLE_SIZE_PERCENT_OF_CATEGORY: 'bubbleSizePercentOfCategory',
  /**
   The percentage of the series this point represents.
   */
  BUBBLE_SIZE_PERCENT_OF_SERIES: 'bubbleSizePercentOfSeries',
  /**
   The percentage of all the series on the chart this point represents.
   */
  BUBBLE_SIZE_PERCENT_OF_TOTAL: 'bubbleSizePercentOfTotal',
  /**
   The name of the category.
   */
  CATEGORY_NAME: 'categoryName',
  /**
   The average of all the points within this category.
   */
  CATEGORY_Y_AVERAGE: 'categoryYAverage',
  /**
   The max of all the points within this category.
   */
  CATEGORY_Y_MAX: 'categoryYMax',
  /**
   The median of all the points within this category.
   */
  CATEGORY_Y_MEDIAN: 'categoryYMedian',
  /**
   The min of all the points within this category.
   */
  CATEGORY_Y_MIN: 'categoryYMin',
  /**
   The mode of all the points within this category.
   */
  CATEGORY_Y_MODE: 'categoryYMode',
  /**
   The percent of all the data on the chart this category represents.
   */
  CATEGORY_Y_PERCENT_OF_TOTAL: 'categoryYPercentOfTotal',
  /**
   The average range in this category (Range charts).
   */
  CATEGORY_Y_RANGE_AVERAGE: 'categoryYRangeAverage',
  /**
   The maximal range in this category (Range charts).
   */
  CATEGORY_Y_RANGE_MAX: 'categoryYRangeMax',
  /**
   The median range in this category (Range charts).
   */
  CATEGORY_Y_RANGE_MEDIAN: 'categoryYRangeMedian',
  /**
   The minimal range in this category (Range charts).
   */
  CATEGORY_Y_RANGE_MIN: 'categoryYRangeMin',
  /**
   The mode range in this category (Range charts).
   */
  CATEGORY_Y_RANGE_MODE: 'categoryYRangeMode',
  /**
   The minimal range in this category (Range charts).
   */
  CATEGORY_Y_RANGE_PERCENT_OF_TOTAL: 'categoryYRangePercentOfTotal',
  /**
   The sum of all ranges in this category (Range charts).
   */
  CATEGORY_Y_RANGE_SUM: 'categoryYRangeSum',
  /**
   The sum of all the points within this category.
   */
  CATEGORY_Y_SUM: 'categoryYSum',
  /**
   The close value of this point (OHLC, Candlestick).
   */
  CLOSE: 'close',
  /**
   Count.
   */
  COUNT: 'count',
  /**
   The maximal of all the points bubble sizes (Bubble chart).
   */
  DATA_PLOT_BUBBLE_MAX_SIZE: 'dataPlotBubbleMaxSize',
  /**
   The minimal of all the points bubble sizes (Bubble chart).
   */
  DATA_PLOT_BUBBLE_MIN_SIZE: 'dataPlotBubbleMinSize',
  /**
   The average bubble size of all the points (Scatter plot charts).
   */
  DATA_PLOT_BUBBLE_SIZE_AVERAGE: 'dataPlotBubbleSizeAverage',
  /**
   The sum of all the points bubble sizes (Bubble chart).
   */
  DATA_PLOT_BUBBLE_SIZE_SUM: 'dataPlotBubbleSizeSum',
  /**
   The name of the series with a maximal sum of the points x values.
   */
  DATA_PLOT_MAX_X_SUM_SERIES_NAME: 'dataPlotMaxXSumSeriesName',
  /**
   The name of the series with a maximal sum of the points y values.
   */
  DATA_PLOT_MAX_Y_SUM_SERIES_NAME: 'dataPlotMaxYSumSeriesName',
  ///**
  // The name of the point with a maximal of all the points y values.
  // */
  //DATA_PLOT_MAX_Y_VALUE_POINT_NAME: 'dataPlotMaxYValuePointName',
  /**
   The name of the series with a maximal of all the points x values.
   */
  DATA_PLOT_MAX_X_VALUE_POINT_SERIES_NAME: 'dataPlotMaxXValuePointSeriesName',
  /**
   The name of the series with a maximal of all the points y values.
   */
  DATA_PLOT_MAX_Y_VALUE_POINT_SERIES_NAME: 'dataPlotMaxYValuePointSeriesName',
  /**
   The name of the series with a minimal sum of the points x values.
   */
  DATA_PLOT_MIN_X_SUM_SERIES_NAME: 'dataPlotMinXSumSeriesName',
  /**
   The name of the series with a minimal sum of the points y values.
   */
  DATA_PLOT_MIN_Y_SUM_SERIES_NAME: 'dataPlotMinYSumSeriesName',
  ///**
  // The name of the point with a minimal of all the points y values.
  // */
  //DATA_PLOT_MIN_Y_VALUE_POINT_NAME: 'dataPlotMinYValuePointName',
  /**
   The name of the series with a minimal of all the points x values.
   */
  DATA_PLOT_MIN_X_VALUE_POINT_SERIES_NAME: 'dataPlotMinXValuePointSeriesName',
  /**
   The name of the series with a minimal of all the points y values.
   */
  DATA_PLOT_MIN_Y_VALUE_POINT_SERIES_NAME: 'dataPlotMinYValuePointSeriesName',
  /**
   The number of the points within the chart.
   */
  DATA_PLOT_POINT_COUNT: 'dataPlotPointCount',
  /**
   The number of the series within the chart.
   */
  DATA_PLOT_SERIES_COUNT: 'dataPlotSeriesCount',
  /**
   The average x value of all the points (Scatter plot charts).
   */
  DATA_PLOT_X_AVERAGE: 'dataPlotXAverage',
  /**
   The maximal of all the points x values (Scatter plot chart).
   */
  DATA_PLOT_X_MAX: 'dataPlotXMax',
  /**
   The minimal of all the points x values (Scatter plot chart).
   */
  DATA_PLOT_X_MIN: 'dataPlotXMin',
  /**
   The sum of all the points x values (Scatter plot charts).
   */
  DATA_PLOT_X_SUM: 'dataPlotXSum',
  /**
   The average y value of all the points.
   */
  DATA_PLOT_Y_AVERAGE: 'dataPlotYAverage',
  /**
   The maximal of all the points y values.
   */
  DATA_PLOT_Y_MAX: 'dataPlotYMax',
  /**
   The minimal of all the points y values.
   */
  DATA_PLOT_Y_MIN: 'dataPlotYMin',
  /**
   The maximal of the ranges of the points within the chart.
   */
  DATA_PLOT_Y_RANGE_MAX: 'dataPlotYRangeMax',
  /**
   The minimal of the ranges of the points within the chart.
   */
  DATA_PLOT_Y_RANGE_MIN: 'dataPlotYRangeMin',
  /**
   The sum of the ranges of the points within the chart.
   */
  DATA_PLOT_Y_RANGE_SUM: 'dataPlotYRangeSum',
  /**
   The sum of all the points y values.
   */
  DATA_PLOT_Y_SUM: 'dataPlotYSum',
  /**
   The high value of this point (OHLC, Candlestick).
   */
  HIGH: 'high',
  ///**
  // Returns series or point specific icon.
  // */
  //ICON: 'icon',
  /**
   The index of this point in the series this point represents (zero-based).
   */
  INDEX: 'index',
  /**
   The low value of this point (OHLC, Candlestick).
   */
  LOW: 'low',
  /**
   Max.
   */
  MAX: 'max',
  /**
   Min.
   */
  MIN: 'min',
  /**
   The name of this point.
   */
  NAME: 'name',
  /**
   The open value of this point (OHLC, Candlestick).
   */
  OPEN: 'open',
  /**
   Points count.
   */
  POINTS_COUNT: 'pointsCount',
  /**
   PERT chart statistics - Standard deviation for critical path.
   */
  PERT_CHART_CRITICAL_PATH_STANDARD_DEVIATION: 'pertChartCriticalPathStandardDeviation',
  /**
   PERT chart statistics - duration of project.
   */
  PERT_CHART_PROJECT_DURATION: 'pertChartProjectDuration',
  /**
   The range of this point (RangeEnd - RangeStart).
   */
  RANGE: 'range',
  /**
   The ending value of this point (Range charts).
   */
  RANGE_END: 'rangeEnd',
  /**
   The starting value of this point (Range charts).
   */
  RANGE_START: 'rangeStart',
  /**
   Series average.
   */
  SERIES_AVERAGE: 'seriesAverage',
  /**
   The maximal bubble size value of all the points within this series (Bubble chart).
   */
  SERIES_BUBBLE_MAX_SIZE: 'seriesBubbleMaxSize',
  /**
   The minimal bubble size value of all the points within this series (Bubble chart).
   */
  SERIES_BUBBLE_MIN_SIZE: 'seriesBubbleMinSize',
  /**
   The average bubble size value of all the points within this series (Bubble chart).
   */
  SERIES_BUBBLE_SIZE_AVERAGE: 'seriesBubbleSizeAverage',
  /**
   The median bubble size value of all the points within this series (Bubble chart).
   */
  SERIES_BUBBLE_SIZE_MEDIAN: 'seriesBubbleSizeMedian',
  /**
   The mode bubble size value of all the points within this series (Bubble chart).
   */
  SERIES_BUBBLE_SIZE_MODE: 'seriesBubbleSizeMode',
  /**
   The sum of all the points bubble sizes (Bubble chart).
   */
  SERIES_BUBBLE_SIZE_SUM: 'seriesBubbleSizeSum',
  /**
   The x value of the first point in this series (Scatter plot charts).
   */
  SERIES_FIRST_X_VALUE: 'seriesFirstXValue',
  /**
   The y value of the first point in this series.
   */
  SERIES_FIRST_Y_VALUE: 'seriesFirstYValue',
  /**
   The x value of the last point in this series (Scatter plot charts).
   */
  SERIES_LAST_X_VALUE: 'seriesLastXValue',
  /**
   The y value of the first point in this series.
   */
  SERIES_LAST_Y_VALUE: 'seriesLastYValue',
  /**
   Series max.
   */
  SERIES_MAX: 'seriesMax',
  /**
   Series min.
   */
  SERIES_MIN: 'seriesMin',
  /**
   The name of this series.
   */
  SERIES_NAME: 'seriesName',
  /**
   The number of points in this series.
   */
  SERIES_POINT_COUNT: 'seriesPointCount',
  /**
   The number of points in this series.
   */
  SERIES_POINTS_COUNT: 'seriesPointsCount',
  /**
   Series sum.
   */
  SERIES_SUM: 'seriesSum',
  /**
   The average x value of all the points within this series.
   */
  SERIES_X_AVERAGE: 'seriesXAverage',
  ///**
  // The title text of the X Axis.
  // */
  //SERIES_X_AXIS_NAME: 'seriesXAxisName',
  /**
   The maximal x value of all the elements within this series (Scatter plot charts).
   */
  SERIES_X_MAX: 'seriesXMax',
  /**
   The median x value of all the points within this series (Scatter plot charts).
   */
  SERIES_X_MEDIAN: 'seriesXMedian',
  /**
   The minimal x value of all the elements within this series (Scatter plot charts).
   */
  SERIES_X_MIN: 'seriesXMin',
  /**
   The mode x value of all the points within this series (Scatter plot charts).
   */
  SERIES_X_MODE: 'seriesXMode',
  /**
   The sum of all the points x values (Scatter plot charts).
   */
  SERIES_X_SUM: 'seriesXSum',
  /**
   The average y value of all the points within this series.
   */
  SERIES_Y_AVERAGE: 'seriesYAverage',
  ///**
  // The title text of the Y Axis.
  // */
  //SERIES_Y_AXIS_NAME: 'seriesYAxisName',
  /**
   The maximal y value of all the elements within this series.
   */
  SERIES_Y_MAX: 'seriesYMax',
  /**
   The median y value of all the points within this series.
   */
  SERIES_Y_MEDIAN: 'seriesYMedian',
  /**
   The minimal y value of all the elements within this series.
   */
  SERIES_Y_MIN: 'seriesYMin',
  /**
   The mode y value of all the points within this series.
   */
  SERIES_Y_MODE: 'seriesYMode',
  /**
   The average of all ranges in this series (Range charts).
   */
  SERIES_Y_RANGE_AVERAGE: 'seriesYRangeAverage',
  /**
   The maximal range in this series (Range charts).
   */
  SERIES_Y_RANGE_MAX: 'seriesYRangeMax',
  /**
   The median range in this series (Range charts).
   */
  SERIES_Y_RANGE_MEDIAN: 'seriesYRangeMedian',
  /**
   The minimal range in this series (Range charts).
   */
  SERIES_Y_RANGE_MIN: 'seriesYRangeMin',
  /**
   The mode range in this series (Range charts).
   */
  SERIES_Y_RANGE_MODE: 'seriesYRangeMode',
  /**
   The sum of all ranges in this series (Range charts).
   */
  SERIES_Y_RANGE_SUM: 'seriesYRangeSum',
  /**
   The sum of all the points y values.
   */
  SERIES_Y_SUM: 'seriesYSum',
  /**
   The sum of all the points y values.
   */
  SUM: 'sum',
  /**
   The y value of this point.
   */
  VALUE: 'value',
  /**
   The percent y value of this point.
   */
  PERCENT_VALUE: 'percentValue',
  ///**
  // The average x value of all points in series.
  // */
  //X_AXIS_AVERAGE: 'xAxisAverage',
  ///**
  // The maximal bubble size of all points in series.
  // */
  //X_AXIS_BUBBLE_SIZE_MAX: 'xAxisBubbleSizeMax',
  ///**
  // The minimal bubble size of all points in series.
  // */
  //X_AXIS_BUBBLE_SIZE_MIN: 'xAxisBubbleSizeMin',
  ///**
  // The sum of all bubble sizes of all points in series.
  // */
  //X_AXIS_BUBBLE_SIZE_SUM: 'xAxisBubbleSizeSum',
  ///**
  // The maximal x value of all points in series.
  // */
  //X_AXIS_MAX: 'xAxisMax',
  ///**
  // The median x value of all points in series.
  // */
  //X_AXIS_MEDIAN: 'xAxisMedian',
  ///**
  // The minimal x value of all points in series.
  // */
  //X_AXIS_MIN: 'xAxisMin',
  ///**
  // The mode x value of all points in series.
  // */
  //X_AXIS_MODE: 'xAxisMode',
  ///**
  // The name of the axis.
  // */
  //X_AXIS_NAME: 'xAxisName',
  ///**
  // The maximal scale value.
  // */
  //X_AXIS_SCALE_MAX: 'xAxisScaleMax',
  ///**
  // The minimal scale value.
  // */
  //X_AXIS_SCALE_MIN: 'xAxisScaleMin',
  ///**
  // The sum of all x values of all points in series.
  // */
  //X_AXIS_SUM: 'xAxisSum',
  /**
   The percentage of the series this point represents (Scatter Plot charts).
   */
  X_PERCENT_OF_SERIES: 'xPercentOfSeries',
  /**
   The percentage of all the series on the chart this point represents.
   */
  X_PERCENT_OF_TOTAL: 'xPercentOfTotal',
  /**
   The x value of this point (Scatter Plot charts).
   */
  X_VALUE: 'xValue',
  ///**
  // The average y value of all points in series that are bound this axis.
  // */
  //Y_AXIS_AVERAGE: 'yAxisAverage',
  ///**
  // The maximal bubble size of all points in series that are bound this axis.
  // */
  //Y_AXIS_BUBBLE_SIZE_MAX: 'yAxisBubbleSizeMax',
  ///**
  // The minimal bubble size of all points in series that are bound this axis.
  // */
  //Y_AXIS_BUBBLE_SIZE_MIN: 'yAxisBubbleSizeMin',
  ///**
  // The sum of all bubble sizes of all points in series that are bound this axis.
  // */
  //Y_AXIS_BUBBLE_SIZE_SUM: 'yAxisBubbleSizeSum',
  ///**
  // The maximal y value of all points in series that are bound this axis.
  // */
  //Y_AXIS_MAX: 'yAxisMax',
  ///**
  // The median y value of all points in series that are bound this axis.
  // */
  //Y_AXIS_MEDIAN: 'yAxisMedian',
  ///**
  // The minimal y value of all points in series that are bound this axis.
  // */
  //Y_AXIS_MIN: 'yAxisMin',
  ///**
  // The mode y value of all points in series that are bound this axis.
  // */
  //Y_AXIS_MODE: 'yAxisMode',
  ///**
  // The name of the axis.
  // */
  //Y_AXIS_NAME: 'yAxisName',
  ///**
  // The maximal scale value.
  // */
  //Y_AXIS_SCALE_MAX: 'yAxisScaleMax',
  ///**
  // The minimal scale value.
  // */
  //Y_AXIS_SCALE_MIN: 'yAxisScaleMin',
  ///**
  // The sum of all y values of all points in series that are bound this axis.
  // */
  //Y_AXIS_SUM: 'yAxisSum',
  /**
   The percentage of all the points with the same name this point represents.
   */
  Y_PERCENT_OF_CATEGORY: 'yPercentOfCategory',
  /**
   The percentage of the series this point represents.
   */
  Y_PERCENT_OF_SERIES: 'yPercentOfSeries',
  /**
   The percentage of all the series on the chart this point represents.
   */
  Y_PERCENT_OF_TOTAL: 'yPercentOfTotal',
  /**
   The y value of this point.*/
  Y_VALUE: 'yValue',

  X_SCALES_MIN: 'xScalesMin',
  X_SCALES_MAX: 'xScalesMax',
  Y_SCALES_MIN: 'yScalesMin',
  Y_SCALES_MAX: 'yScalesMax',

  //--------------------------------------------------------------------------------------------------------------------
  // Private values. Do not export.
  //--------------------------------------------------------------------------------------------------------------------
  CATEGORY_Y_SUM_ARR_: 'catYSumArr_',
  CATEGORY_Y_MIN_ARR_: 'catYMinArr_',
  CATEGORY_Y_MAX_ARR_: 'catYMaxArr_',
  CATEGORY_Y_AVG_ARR_: 'catYAvgArr_',
  CATEGORY_Y_MEDIAN_ARR_: 'catYMedianArr_',
  CATEGORY_Y_MODE_ARR_: 'catYModeArr_',

  CATEGORY_Y_RANGE_SUM_ARR_: 'catYRangeSumArr_',
  CATEGORY_Y_RANGE_MIN_ARR_: 'catYRangeMinArr_',
  CATEGORY_Y_RANGE_MAX_ARR_: 'catYRangeMaxArr_',
  CATEGORY_Y_RANGE_AVG_ARR_: 'catYRangeAvgArr_',
  CATEGORY_Y_RANGE_MEDIAN_ARR_: 'catYRangeMedianArr_',
  CATEGORY_Y_RANGE_MODE_ARR_: 'catYRangeModeArr_'

};


/**
 * Statistics enums lower case representation.
 * NOTE: for internal usage only.
 * @type {Object.<chartEditor.enums.Statistics>}
 */
chartEditor.enums.StatisticsLowerCase = {};


(function() {
  for (var key in chartEditor.enums.Statistics) {
    if (chartEditor.enums.Statistics.hasOwnProperty(key))
      chartEditor.enums.StatisticsLowerCase[key] = chartEditor.enums.Statistics[key].toLowerCase();
  }
}());


//region General series related enums
//----------------------------------------------------------------------------------------------------------------------
//
//  General series related enums
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Drawers type.
 * @enum {number}
 */
chartEditor.enums.SeriesDrawerTypes = {
  BASE: 0,
  AREA: 1,
  AREA_3D: 2,
  BOX: 3,
  BUBBLE: 4,
  CANDLESTICK: 5,
  COLUMN: 6,
  COLUMN_3D: 7,
  LINE: 8,
  MARKER: 9,
  OHLC: 10,
  RANGE_AREA: 11,
  RANGE_COLUMN: 12,
  RANGE_SPLINE_AREA: 13,
  RANGE_STEP_AREA: 14,
  SPLINE: 15,
  SPLINE_AREA: 16,
  STEP_AREA: 17,
  STEP_LINE: 18,
  JUMP_LINE: 19,
  STICK: 20,
  CONNECTOR: 21,
  MAP_MARKER: 22,
  MAP_BUBBLE: 23,
  CHOROPLETH: 24,
  POLAR_LINE: 25,
  POLAR_AREA: 26,
  POLAR_COLUMN: 27,
  POLAR_RANGE_COLUMN: 28,
  MEKKO: 29,
  HEAT_MAP: 30,
  RANGE_STICK: 31,
  WATERFALL: 32,
  LINE_3D: 33
};


/**
 * Shape manager type enum.
 * @enum {number}
 */
chartEditor.enums.ShapeManagerTypes = {
  PER_SERIES: 1,
  PER_POINT: 2
};


/**
 * Shape type enum.
 * @enum {string}
 */
chartEditor.enums.ShapeType = {
  PATH: 'path',
  CIRCLE: 'circle',
  RECT: 'rect',
  ELLIPSE: 'ellipse',
  NONE: 'none'
};


/**
 * Color type.
 * @enum {number}
 */
chartEditor.enums.ColorType = {
  FILL: 1,
  STROKE: 2,
  HATCH_FILL: 3
};


/**
 * Series properties handler type.
 * @enum {number}
 */
chartEditor.enums.PropertyHandlerType = {
  SINGLE_ARG: 0,
  MULTI_ARG: 1,
  SINGLE_ARG_DEPRECATED: 2,
  MULTI_ARG_DEPRECATED: 3
};


//endregion
/**
 * Accessibility mode.
 * @enum {string}
 */
chartEditor.enums.A11yMode = {
  CHART_ELEMENTS: 'chart-elements',
  DATA_TABLE: 'data-table'
};


/**
 * Normalizes a11y mode.
 * @param {chartEditor.enums.A11yMode|string} value - A11y mode.
 * @return {chartEditor.enums.A11yMode} - Normalized mode.
 */
chartEditor.enums.normalizeA11yMode = function(value) {
  return /** @type {chartEditor.enums.A11yMode} */(chartEditor.enums.normalize(chartEditor.enums.A11yMode, value,
      chartEditor.enums.A11yMode.CHART_ELEMENTS));
};


//region Annotations
//----------------------------------------------------------------------------------------------------------------------
//
//  Annotations
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Enum of annotation types.
 * @enum {string}
 */
chartEditor.enums.AnnotationTypes = {
  RAY: 'ray',
  LINE: 'line',
  INFINITE_LINE: 'infinite-line',
  VERTICAL_LINE: 'vertical-line',
  HORIZONTAL_LINE: 'horizontal-line',
  RECTANGLE: 'rectangle',
  ELLIPSE: 'ellipse',
  TRIANGLE: 'triangle',
  TREND_CHANNEL: 'trend-channel',
  ANDREWS_PITCHFORK: 'andrews-pitchfork',
  FIBONACCI_FAN: 'fibonacci-fan',
  FIBONACCI_ARC: 'fibonacci-arc',
  FIBONACCI_RETRACEMENT: 'fibonacci-retracement',
  FIBONACCI_TIMEZONES: 'fibonacci-timezones',
  MARKER: 'marker',
  LABEL: 'label'
};


/**
 * Normalizes annotation type string to a enum.
 * @param {*} value
 * @return {chartEditor.enums.AnnotationTypes}
 */
chartEditor.enums.normalizeAnnotationType = function(value) {
  return /** @type {chartEditor.enums.AnnotationTypes} */(chartEditor.enums.normalize(chartEditor.enums.AnnotationTypes, value,
      chartEditor.enums.AnnotationTypes.LINE));
};


//endregion
/**
 * Paper sizes.
 * @enum {string}
 */
chartEditor.enums.PaperSize = {
  /**
   * It measures 8.5 by 11 inches (215.9 mm x 279.4 mm). US Letter size is a recognized standard adopted by the American National Standards Institute (ANSI) whereas the A4 is the International Standard (ISO) used in most countries.
   */
  US_LETTER: 'us-letter',

  /**
   * The base A0 size of paper is defined as having an area of 1 m2. Rounded to the nearest millimetre, the A0 paper size is 841 by 1,189 millimetres (33.1 in × 46.8 in). Successive paper sizes in the series A1, A2, A3, and so forth, are defined by halving the preceding paper size across the larger dimension.
   */
  A0: 'a0',

  /**
   * A1 measures 594 × 841 millimeters or 23.4 × 33.1 inches.
   */
  A1: 'a1',

  /**
   * A2 measures 420 × 594 millimeters or 16.5 × 23.4 inches.
   */
  A2: 'a2',

  /**
   * The A3 size print measures 29.7 x 42.0cm, 11.69 x 16.53 inches, if mounted 40.6 x 50.8cm, 15.98 x 20 inches. The A4 size print measures 21.0 x 29.7cm, 8.27 x 11.69 inches, if mounted 30.3 x 40.6cm, 11.93 x 15.98 inches.
   */
  A3: 'a3',

  /**
   * A transitional size called PA4 (210 mm × 280 mm or 8.27 in × 11.02 in) was proposed for inclusion into the ISO 216 standard in 1975. It has the height of Canadian P4 paper (215 mm × 280 mm, about 8½ in × 11 in) and the width of international A4 paper (210 mm × 297 mm or 8.27 in × 11.69 in).
   */
  A4: 'a4',

  /**
   * A5 measures 148 × 210 millimeters or 5.83 × 8.27 inches.
   */
  A5: 'a5',

  /**
   * A6 measures 105 × 148 millimeters or 4.13 × 5.83 inches. In PostScript, its dimensions are rounded off to 298 × 420 points. The matching envelope format is C6 (114 × 162 mm).
   */
  A6: 'a6'
};


/**
 * Prettify name of paper size. Used in anychart.ui.ganttToolbar.
 * @param {chartEditor.enums.PaperSize} paperSize - Paper size.
 * @return {string} - Prettified name of paper size.
 */
chartEditor.enums.normalizePaperSizeCaption = function(paperSize) {
  if (paperSize == chartEditor.enums.PaperSize.US_LETTER) return 'US Letter';
  return goog.string.toTitleCase(paperSize);
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Pert enums
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * A enum for milestones shape.
 * @enum {string}
 */
chartEditor.enums.MilestoneShape = {
  CIRCLE: 'circle',
  RHOMBUS: 'rhombus',
  RECTANGLE: 'rectangle'
};


/**
 * Normalizes milestone type string to a enum.
 * @param {*} value
 * @return {chartEditor.enums.MilestoneShape}
 */
chartEditor.enums.normalizeMilestoneShape = function(value) {
  return /** @type {chartEditor.enums.MilestoneShape} */(chartEditor.enums.normalize(chartEditor.enums.MilestoneShape, value,
      chartEditor.enums.MilestoneShape.CIRCLE));
};


//region --- Locale DateTime Interval Format Names
//------------------------------------------------------------------------------
//
//  Locale DateTime Interval Format Names
//
//------------------------------------------------------------------------------
/**
 * Locale date time interval format names.
 * @enum {string}
 */
chartEditor.enums.LocaleDateTimeFormat = {
  YEAR: 'year',
  YEAR_SEMESTER: 'year-semester',
  YEAR_QUARTER: 'year-quarter',
  YEAR_MONTH: 'year-month',
  YEAR_THIRD_OF_MONTH: 'year-third-of-month',
  YEAR_WEEK: 'year-week',
  YEAR_DAY: 'year-day',
  YEAR_HOUR: 'year-hour',
  YEAR_MINUTE: 'year-minute',
  YEAR_SECOND: 'year-second',
  YEAR_MILLISECOND: 'year-millisecond',
  SEMESTER: 'semester',
  SEMESTER_QUARTER: 'semester-quarter',
  SEMESTER_MONTH: 'semester-month',
  SEMESTER_THIRD_OF_MONTH: 'semester-third-of-month',
  SEMESTER_WEEK: 'semester-week',
  SEMESTER_DAY: 'semester-day',
  SEMESTER_HOUR: 'semester-hour',
  SEMESTER_MINUTE: 'semester-minute',
  SEMESTER_SECOND: 'semester-second',
  SEMESTER_MILLISECOND: 'semester-millisecond',
  QUARTER: 'quarter',
  QUARTER_MONTH: 'quarter-month',
  QUARTER_THIRD_OF_MONTH: 'quarter-third-of-month',
  QUARTER_WEEK: 'quarter-week',
  QUARTER_DAY: 'quarter-day',
  QUARTER_HOUR: 'quarter-hour',
  QUARTER_MINUTE: 'quarter-minute',
  QUARTER_SECOND: 'quarter-second',
  QUARTER_MILLISECOND: 'quarter-millisecond',
  MONTH: 'month',
  MONTH_THIRD_OF_MONTH: 'month-third-of-month',
  MONTH_WEEK: 'month-week',
  MONTH_DAY: 'month-day',
  MONTH_HOUR: 'month-hour',
  MONTH_MINUTE: 'month-minute',
  MONTH_SECOND: 'month-second',
  MONTH_MILLISECOND: 'month-millisecond',
  THIRD_OF_MONTH: 'third-of-month',
  THIRD_OF_MONTH_WEEK: 'third-of-month-week',
  THIRD_OF_MONTH_DAY: 'third-of-month-day',
  THIRD_OF_MONTH_HOUR: 'third-of-month-hour',
  THIRD_OF_MONTH_MINUTE: 'third-of-month-minute',
  THIRD_OF_MONTH_SECOND: 'third-of-month-second',
  THIRD_OF_MONTH_MILLISECOND: 'third-of-month-millisecond',
  WEEK: 'week',
  WEEK_DAY: 'week-day',
  WEEK_HOUR: 'week-hour',
  WEEK_MINUTE: 'week-minute',
  WEEK_SECOND: 'week-second',
  WEEK_MILLISECOND: 'week-millisecond',
  DAY: 'day',
  DAY_HOUR: 'day-hour',
  DAY_MINUTE: 'day-minute',
  DAY_SECOND: 'day-second',
  DAY_MILLISECOND: 'day-millisecond',
  HOUR: 'hour',
  HOUR_MINUTE: 'hour-minute',
  HOUR_SECOND: 'hour-second',
  HOUR_MILLISECOND: 'hour-millisecond',
  MINUTE: 'minute',
  MINUTE_SECOND: 'minute-second',
  MINUTE_MILLISECOND: 'minute-millisecond',
  SECOND: 'second',
  SECOND_MILLISECOND: 'second-millisecond',
  MILLISECOND: 'millisecond'
};


/**
 * Locale date time interval format prefixes.
 * @enum {string}
 */
chartEditor.enums.IntervalFormatPrefix = {
  NONE: '',
  FULL: 'full'
};


//endregion
//region --- Calendar items
//------------------------------------------------------------------------------
//
//  Calendar items
//
//------------------------------------------------------------------------------
/**
 * Availability period.
 * @enum {string}
 */
chartEditor.enums.AvailabilityPeriod = {
  YEAR: 'year',
  WEEK: 'week',
  DAY: 'day',
  NONE: 'none'
};


/**
 * Normalizes availability period.
 * @param {*} value
 * @return {chartEditor.enums.AvailabilityPeriod}
 */
chartEditor.enums.normalizeAvailabilityPeriod = function(value) {
  return /** @type {chartEditor.enums.AvailabilityPeriod} */(chartEditor.enums.normalize(chartEditor.enums.AvailabilityPeriod, value,
      chartEditor.enums.AvailabilityPeriod.NONE));
};


//endregion
//region --- Resource Chart items
//------------------------------------------------------------------------------
//
//  Resource Chart items
//
//------------------------------------------------------------------------------
/**
 * Time tracking mode.
 * @enum {string}
 */
chartEditor.enums.TimeTrackingMode = {
  AVAILABILITY_PER_CHART: 'availability-per-chart',
  AVAILABILITY_PER_RESOURCE: 'availability-per-resource',
  ACTIVITY_PER_CHART: 'activity-per-chart',
  ACTIVITY_PER_RESOURCE: 'activity-per-resource'
};


/**
 * Normalizes time tracking mode string.
 * @param {*} value
 * @return {chartEditor.enums.TimeTrackingMode}
 */
chartEditor.enums.normalizeTimeTrackingMode = function(value) {
  return /** @type {chartEditor.enums.TimeTrackingMode} */(chartEditor.enums.normalize(chartEditor.enums.TimeTrackingMode, value,
      chartEditor.enums.TimeTrackingMode.ACTIVITY_PER_RESOURCE));
};
//endregion
