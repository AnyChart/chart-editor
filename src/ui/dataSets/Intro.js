goog.provide('chartEditor.ui.dataSets.Intro');
goog.require('chartEditor.ui.Component');


/**
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.dataSets.Intro = function () {
    chartEditor.ui.dataSets.Intro.base(this, 'constructor');
    this.addClassName('anychart-ce-data-set-intro');
};
goog.inherits(chartEditor.ui.dataSets.Intro, chartEditor.ui.Component);


/** @inheritDoc */
chartEditor.ui.dataSets.Intro.prototype.createDom = function () {
    chartEditor.ui.dataSets.Intro.base(this, 'createDom');

    var element = this.getElement();
    var caption = goog.dom.createDom(
        goog.dom.TagName.DIV,
        'anychart-ce-content-caption',
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
