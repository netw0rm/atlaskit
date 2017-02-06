"use strict";
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var styles_less_1 = require("style!./styles.less");
var DropdownItem = require("@atlaskit/droplist-item");
var DropdownGroup = require("@atlaskit/droplist-group");
var Dropdown = (function (_super) {
    tslib_1.__extends(Dropdown, _super);
    function Dropdown() {
        return _super.apply(this, arguments) || this;
    }
    Dropdown.prototype.render = function () {
        var _this = this;
        var Group = DropdownGroup.default;
        var items = this.props.items.map(function (item) { return _this._itemElement(item.label, item.handler); });
        return (React.createElement("div", { className: styles_less_1.default['dropdown'] },
            React.createElement(Group, null, items)));
    };
    Dropdown.prototype._itemElement = function (name, handler) {
        var Item = DropdownItem.default;
        return (React.createElement(Item, { onActivate: handler, key: name }, name));
    };
    return Dropdown;
}(react_1.Component));
exports.Dropdown = Dropdown;
//# sourceMappingURL=dropdown.js.map