goog.provide('chartEditor.enums');



/**
 @namespace
 @name chartEditor.enums
 */


/**
 * Copy of anychart.enums.Anchor
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
 * Position enum. Defines 9 items. Similar to Anchor. Distinct by meaning.
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


//----------------------------------------------------------------------------------------------------------------------
//
//  Errors, Warnings, Info
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * @enum {number}
 */
chartEditor.enums.ErrorCode = {};


/**
 * @enum {number}
 */
chartEditor.enums.InfoCode = {};


/**
 * @enum {number}
 */
chartEditor.enums.WarningCode = {
  EDITOR_MODEL_VALUE_NOT_FOUND: 1
};


/**
 * Names of all the steps
 * @enum {string}
 */
chartEditor.enums.EditorSteps = {
  DATA: 'data',
  CHART: 'chart',
  APPEARANCE: 'appearance',
  EXPORT: 'export'
};


/**
 * Names of all the tabs
 * @enum {string}
 */
chartEditor.enums.EditorTabs = {
  THEMING: 'theming',
  SPECIFIC: 'specific',
  TITLE: 'title',
  LEGEND: 'legend',
  DATA: 'data',
  DATA_LABELS: 'dataLabels',
  SERIES: 'series',
  POINTERS: 'pointers',
  CIRCULAR_RANGES: 'circularRanges',
  SCALE_BARS: 'scaleBars',
  SCALES: 'scales',
  CARTESIAN_AXES: 'cartesianAxes',
  RADAR_POLAR_AXES: 'radarPolarAxes',
  GAUGE_AXES: 'gaugeAxes',
  TOOLTIP: 'tooltip',
  GRIDS: 'grids',
  COLOR_SCALE: 'colorScale',
  COLOR_RANGE: 'colorRange',
  SOURCE_CODE: 'sourceCode',
  JSON: 'json',
  EMBED: 'embed',
  NODE: 'node',
  FLOW: 'flow',
  DROP_OFF: 'dropOff',
  GANTT_TIMELINE_HEADER: 'timeLineHeader',
  GANTT_TIMELINE: 'timeLine',
  GANTT_DATAGRID: 'dataGrid',
  GANTT_GRID_COLORING: 'gridColoring',
  GANTT_TIMELINE_TOOLTIP: 'ganttTimelineTooltip',
  GANTT_DATAGRID_TOOLTIP: 'ganttDataGridTooltip',
  LABEL: 'label',
  QUARTERS: 'quarters',
  CHART_LABELS: 'chartLabels'
};


/**
 * Chart types supported by editor.
 * @enum {string}
 */
chartEditor.enums.ChartType = {
  LINE: 'line',
  AREA: 'area',
  AREA_STACKED_VALUE: 'area-stacked-value',
  AREA_STACKED_PERCENT: 'area-stacked-percent',
  BAR: 'bar',
  BAR_STACKED_VALUE: 'bar-stacked-value',
  BAR_STACKED_PERCENT: 'bar-stacked-percent',
  COLUMN: 'column',
  COLUMN_STACKED_VALUE: 'column-stacked-value',
  COLUMN_STACKED_PERCENT: 'column-stacked-percent',
  DONUT: 'donut',
  SCATTER: 'scatter',
  WATERFALL: 'waterfall',
  BOX: 'box',
  RADAR: 'radar',
  RADAR_STACKED_VALUE: 'radar-stacked-value',
  RADAR_STACKED_PERCENT: 'radar-stacked-percent',
  POLAR: 'polar',
  PIE: 'pie',
  FUNNEL: 'funnel',
  PYRAMID: 'pyramid',
  MEKKO: 'mekko',
  BARMEKKO: 'barmekko',
  MOSAIC: 'mosaic',
  HEATMAP: 'heatMap',
  TREEMAP: 'treeMap',
  SANKEY: 'sankey',
  TAG_CLOUD: 'tag-cloud',
  GAUGES_CIRCULAR: 'gauges_circular',
  GAUGES_LINEAR: 'gauges_linear',
  GAUGES_LINEAR_LED: 'gauges_linear_led',
  GAUGES_LINEAR_TANK: 'gauges_linear_tank',
  GAUGES_LINEAR_THERMOMETER: 'gauges_linear_thermometer',
  STOCK: 'stock',
  MAP: 'map',
  GANTT_PROJECT: 'ganttProject',
  GANTT_RESOURCE: 'ganttResource',
  QUADRANT: 'quadrant'
};


/**
 * Normalizes chart type.
 * @param {string} value
 * @param {chartEditor.enums.ChartType=} opt_default - Default value to set.
 * @return {chartEditor.enums.ChartType}
 */
chartEditor.enums.normalizeChartType = function(value, opt_default) {
  opt_default = opt_default || chartEditor.enums.ChartType.LINE;
  for (var type in chartEditor.enums.ChartType) {
    if (chartEditor.enums.ChartType.hasOwnProperty(type)) {
      var val = chartEditor.enums.ChartType[type];
      if (val === value)
        return val;
    }
  }
  return opt_default;
};


