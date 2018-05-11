goog.provide('chartEditor.dataSetPanelList.Intro');
goog.require('chartEditor.Component');


/**
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.dataSetPanelList.Intro = function () {
    chartEditor.dataSetPanelList.Intro.base(this, 'constructor');
    this.addClassName('anychart-ce-data-set-intro');
};
goog.inherits(chartEditor.dataSetPanelList.Intro, chartEditor.Component);


/** @inheritDoc */
chartEditor.dataSetPanelList.Intro.prototype.createDom = function () {
    chartEditor.dataSetPanelList.Intro.base(this, 'createDom');

    var element = this.getElement();
    var caption = goog.dom.createDom(
        goog.dom.TagName.DIV,
        'anychart-ce-data-set-intro-caption',
        'Welcome to AnyChart Charts Editor'
    );
    var p1 = goog.dom.createDom(
        goog.dom.TagName.P,
        'anychart-ce-data-set-intro-p',
        'To start working with the charts editor, add your data or use one of our ready to use Data Sets.'
    );
    var p2 = goog.dom.createDom(
        goog.dom.TagName.P,
        'anychart-ce-data-set-intro-p',
        'After the data is added, you can move forward to Setup Chart step and start configuring your chart.'
    );
    goog.dom.appendChild(element, caption);
    goog.dom.appendChild(element, p1);
    goog.dom.appendChild(element, p2);
};
