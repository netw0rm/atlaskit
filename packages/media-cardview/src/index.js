"use strict";
var tslib_1 = require("tslib");
var React = require("react");
var styles_less_1 = require("style!./styles.less");
var react_1 = require("react");
/* Child stateless components*/
var cardContent_1 = require("./cardContent");
var cardOverlay_1 = require("./cardOverlay");
exports.DEFAULT_CARD_DIMENSIONS = {
    WIDTH: 156,
    HEIGHT: 104
};
var CardView = (function (_super) {
    tslib_1.__extends(CardView, _super);
    function CardView() {
        return _super.apply(this, arguments) || this;
    }
    CardView.prototype.render = function () {
        var height = this.props.height || exports.DEFAULT_CARD_DIMENSIONS.HEIGHT;
        var width = this.props.width || exports.DEFAULT_CARD_DIMENSIONS.WIDTH;
        var cardStyle = { height: height + "px", width: width + "px" };
        return (React.createElement("div", { style: cardStyle, className: styles_less_1.default['card'], onClick: this.onClick.bind(this) },
            React.createElement("div", { className: styles_less_1.default['wrapper'] },
                React.createElement("div", { className: styles_less_1.default['imgWrapper'] },
                    React.createElement(cardContent_1.CardContent, { loading: this.props.loading, mediaType: this.props.mediaType, dataURI: this.props.dataURI }))),
            React.createElement(cardOverlay_1.CardOverlay, { selectable: this.props.selectable, selected: this.props.selected, mediaName: this.props.mediaName, mediaType: this.props.mediaType, mediaSize: this.props.mediaSize, progress: this.props.progress, menuActions: this.props.menuActions })));
    };
    CardView.prototype.onClick = function (event) {
        this.props.onClick(event.nativeEvent);
    };
    return CardView;
}(react_1.Component));
exports.CardView = CardView;
//# sourceMappingURL=index.js.map