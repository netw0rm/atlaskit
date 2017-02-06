"use strict";
var tslib_1 = require("tslib");
var React = require("react");
var Component = React.Component;
var styles_less_1 = require("style!./styles.less");
exports.errorIconSize = {
    HEIGHT: 15,
    WIDTH: 16
};
var ErrorIcon = (function (_super) {
    tslib_1.__extends(ErrorIcon, _super);
    function ErrorIcon() {
        return _super.apply(this, arguments) || this;
    }
    ErrorIcon.prototype.render = function () {
        var height = this.props.height || exports.errorIconSize.HEIGHT;
        var width = this.props.width || exports.errorIconSize.WIDTH;
        var style = {
            width: width + "px",
            height: height + "px"
        };
        return React.createElement("div", { style: style, className: styles_less_1.default['errorIcon'] });
    };
    return ErrorIcon;
}(Component));
exports.ErrorIcon = ErrorIcon;
//# sourceMappingURL=errorIcon.js.map