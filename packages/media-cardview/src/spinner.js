"use strict";
var tslib_1 = require("tslib");
var React = require("react");
var Component = React.Component;
var styles_less_1 = require("style!./styles.less");
exports.spinnerSize = {
    HEIGHT: 60,
    WIDTH: 60
};
var Spinner = (function (_super) {
    tslib_1.__extends(Spinner, _super);
    function Spinner() {
        return _super.apply(this, arguments) || this;
    }
    Spinner.prototype.render = function () {
        var height = this.props.height || exports.spinnerSize.HEIGHT;
        var width = this.props.width || exports.spinnerSize.WIDTH;
        var style = {
            left: "calc(50% - " + width + "px/2)",
            top: "calc(50% - " + height + "px/2)"
        };
        var className = (this.props.loading) ? styles_less_1.default['spinner'] + " " + styles_less_1.default['active'] : styles_less_1.default['spinner'];
        return (React.createElement("div", { className: className, style: style },
            React.createElement("svg", { viewBox: '0 0 30 30', xmlns: 'http://www.w3.org/2000/svg', style: { height: height + "px", width: width + "px" } },
                React.createElement("circle", { className: styles_less_1.default['path-animate'], fill: 'none', strokeWidth: '1.5', strokeLinecap: 'round', cx: '15', cy: '15', r: '7' }))));
    };
    return Spinner;
}(Component));
exports.Spinner = Spinner;
//# sourceMappingURL=spinner.js.map