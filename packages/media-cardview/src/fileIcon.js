"use strict";
var tslib_1 = require("tslib");
var React = require("react");
var Component = React.Component;
var styles = require("./fileIcon.less");
var FileIcon = (function (_super) {
    tslib_1.__extends(FileIcon, _super);
    function FileIcon() {
        return _super.apply(this, arguments) || this;
    }
    FileIcon.prototype.render = function () {
        var fileTypeIconClass = styles['fileTypeIcon'] + " " + styles[this.props.mediaType];
        return (React.createElement("div", { className: fileTypeIconClass }));
    };
    return FileIcon;
}(Component));
exports.FileIcon = FileIcon;
//# sourceMappingURL=fileIcon.js.map