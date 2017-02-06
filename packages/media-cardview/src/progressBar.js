"use strict";
var tslib_1 = require("tslib");
var React = require("react");
var Component = React.Component;
var styles_less_1 = require("style!./styles.less");
var ProgressBar = (function (_super) {
    tslib_1.__extends(ProgressBar, _super);
    function ProgressBar() {
        return _super.apply(this, arguments) || this;
    }
    ProgressBar.prototype.render = function () {
        if (typeof this.props.progress !== 'number') {
            return null;
        }
        var progress = Math.min(1, Math.max(0, this.props.progress));
        var progressBarStyle = { width: progress * 100 + "%" };
        return (React.createElement("div", { className: styles_less_1.default['progressWrapper'] },
            React.createElement("div", { className: styles_less_1.default['progressBar'], style: progressBarStyle })));
    };
    return ProgressBar;
}(Component));
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=progressBar.js.map