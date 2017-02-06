"use strict";
var tslib_1 = require("tslib");
var React = require("react");
var Component = React.Component;
var placeholder_1 = require("./placeholder"); // MEDIA-FIX
var spinner_1 = require("./spinner"); // MEDIA-FIX
var CardContent = (function (_super) {
    tslib_1.__extends(CardContent, _super);
    function CardContent() {
        return _super.apply(this, arguments) || this;
    }
    CardContent.prototype.render = function () {
        if (this.props.loading) {
            return React.createElement(spinner_1.Spinner, { loading: this.props.loading });
        }
        if (this.props.mediaType === 'image' && this.props.dataURI) {
            return React.createElement("img", { alt: "", src: this.props.dataURI });
        }
        else {
            return React.createElement(placeholder_1.Placeholder, { mediaType: this.props.mediaType });
        }
    };
    return CardContent;
}(Component));
exports.CardContent = CardContent;
//# sourceMappingURL=cardContent.js.map