goog.provide('anychart.chartEditorModule.dataSetPanelList.Intro');
goog.require('anychart.ui.Component');


/**
 * @constructor
 * @extends {anychart.ui.Component}
 */
anychart.chartEditorModule.dataSetPanelList.Intro = function () {
    anychart.chartEditorModule.dataSetPanelList.Intro.base(this, 'constructor');
    this.addClassName('anychart-connected-data-sets-intro');
};
goog.inherits(anychart.chartEditorModule.dataSetPanelList.Intro, anychart.ui.Component);


/** @inheritDoc */
anychart.chartEditorModule.dataSetPanelList.Intro.prototype.createDom = function () {
    anychart.chartEditorModule.dataSetPanelList.Intro.base(this, 'createDom');

    var element = this.getElement();
    var caption = goog.dom.createDom(
        goog.dom.TagName.DIV,
        'anychart-connected-data-sets-intro-caption',
        'Welcome to AnyChart Charts Editor'
    );
    var p1 = goog.dom.createDom(
        goog.dom.TagName.P,
        'anychart-connected-data-sets-intro-p',
        'To start working with the charts editor, add your data or use one of our ready to use Data Sets.'
    );
    var p2 = goog.dom.createDom(
        goog.dom.TagName.P,
        'anychart-connected-data-sets-intro-p',
        'After the data is added, you can move forward to Setup Chart step and start configuring your chart.'
    );
    goog.dom.appendChild(element, caption);
    goog.dom.appendChild(element, p1);
    goog.dom.appendChild(element, p2);
};
