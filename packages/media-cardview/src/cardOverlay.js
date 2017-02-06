"use strict";
var tslib_1 = require("tslib");
var React = require("react");
var Component = React.Component;
var bytes = require("bytes");
var styles_less_1 = require("style!./styles.less");
var progressBar_1 = require("./progressBar");
var dropdown_1 = require("./dropdown");
var media_domain_1 = require("@atlaskit/media-domain");
var fileIcon_1 = require("./fileIcon"); // MEDIA-FIX
var CardOverlay = (function (_super) {
    tslib_1.__extends(CardOverlay, _super);
    function CardOverlay(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isMenuExpanded: false
        };
        return _this;
    }
    Object.defineProperty(CardOverlay, "defaultProps", {
        get: function () {
            var menuActions = [];
            return {
                menuActions: menuActions
            };
        },
        enumerable: true,
        configurable: true
    });
    CardOverlay.prototype.render = function () {
        var active = (typeof this.props.progress === 'number');
        var classNames = [styles_less_1.default['overlay']];
        if (active) {
            classNames.push(styles_less_1.default['active']);
        }
        if (this.props.selectable) {
            classNames.push(styles_less_1.default['selectable']);
        }
        if (this.props.selected) {
            classNames.push(styles_less_1.default['selected']);
        }
        if (this.props.mediaType === 'image') {
            classNames.push(styles_less_1.default['image']);
        }
        if (this.props.mediaType === 'video') {
            classNames.push(styles_less_1.default['video']);
        }
        if (typeof this.props.progress === 'number') {
            classNames.push(styles_less_1.default['inProgress']);
        }
        if (this.state.isMenuExpanded) {
            classNames.push(styles_less_1.default['active']);
        }
        var fileSize = this.props.mediaSize && bytes.format(this.props.mediaSize, { unitSeparator: ' ' });
        return (React.createElement("div", { className: classNames.join(' ') },
            React.createElement("div", { className: styles_less_1.default['topRow'] },
                React.createElement("div", { className: styles_less_1.default['title'] }, this.props.mediaName),
                this.tickBox()),
            React.createElement("div", { className: styles_less_1.default['bottomRow'] },
                React.createElement("div", { className: styles_less_1.default['leftColumn'] },
                    React.createElement("div", { className: styles_less_1.default['metadata'] },
                        React.createElement("div", { className: styles_less_1.default['fileTypeIcon'] },
                            React.createElement(fileIcon_1.FileIcon, { mediaType: this.props.mediaType })),
                        React.createElement("div", { className: styles_less_1.default['fileSize'] }, fileSize)),
                    React.createElement(progressBar_1.ProgressBar, { progress: this.props.progress })),
                React.createElement("div", { className: styles_less_1.default['rightColumn'] }, this.moreBtn())),
            this.dropdown()));
    };
    CardOverlay.prototype.tickBox = function () {
        return this.props.selectable && (React.createElement("div", { className: styles_less_1.default['tickbox'] }));
    };
    CardOverlay.prototype.moreBtn = function () {
        var actions = this.props.menuActions;
        if (!actions.length) {
            return null;
        }
        if (actions.length === 1 && actions[0].type === media_domain_1.Actions.CardActionType.delete) {
            var deleteAction = actions[0];
            return (React.createElement("div", { className: styles_less_1.default['deleteBtn'], onClick: this.removeBtnClick(deleteAction.handler) }));
        }
        var moreBtnClasses = [styles_less_1.default['moreBtn']];
        if (this.state.isMenuExpanded) {
            moreBtnClasses.push(styles_less_1.default['active']);
        }
        return (React.createElement("div", { className: moreBtnClasses.join(' '), onClick: this.moreBtnClick.bind(this) }));
    };
    CardOverlay.prototype.dropdown = function () {
        if (!this.state.isMenuExpanded) {
            return null;
        }
        return (React.createElement("div", { className: styles_less_1.default['dropdownWrapper'], onClick: this.dropdownClick },
            React.createElement(dropdown_1.Dropdown, { items: this.props.menuActions })));
    };
    CardOverlay.prototype.removeBtnClick = function (handler) {
        return function (e) {
            e.preventDefault();
            e.stopPropagation();
            handler();
        };
    };
    CardOverlay.prototype.dropdownClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    CardOverlay.prototype.moreBtnClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.isMenuExpanded) {
            document.removeEventListener('click', this._clickDetector);
        }
        else {
            this._clickDetector = this.newClickDetector.bind(this);
            document.addEventListener('click', this._clickDetector);
        }
        this.setState({
            isMenuExpanded: !this.state.isMenuExpanded
        });
    };
    CardOverlay.prototype.newClickDetector = function (e) {
        this.setState({
            isMenuExpanded: false
        });
        document.removeEventListener('click', this._clickDetector);
    };
    return CardOverlay;
}(Component));
exports.CardOverlay = CardOverlay;
//# sourceMappingURL=cardOverlay.js.map