"use strict";
var tslib_1 = require("tslib");
var React = require("react");
var Component = React.Component;
var styles_less_1 = require("style!./styles.less");
var Placeholder = (function (_super) {
    tslib_1.__extends(Placeholder, _super);
    function Placeholder() {
        return _super.apply(this, arguments) || this;
    }
    Placeholder.prototype.render = function () {
        return (React.createElement("div", { className: this.classforMediaType(this.props.mediaType) }));
    };
    Placeholder.prototype.classforMediaType = function (mediaType) {
        switch (mediaType) {
            case 'doc': return styles_less_1.default['fallbackUnknown'];
            case 'image': return styles_less_1.default['fallbackUnknown'];
            case 'audio': return styles_less_1.default['fallbackAudio'];
            case 'video': return styles_less_1.default['fallbackVideo'];
            case 'unknown': return styles_less_1.default['fallbackUnknown'];
            default: return styles_less_1.default['fallback'];
        }
    };
    return Placeholder;
}(Component));
exports.Placeholder = Placeholder;
//# sourceMappingURL=placeholder.js.map