"use strict";
var React = require("react");
var storybook_1 = require("@kadira/storybook");
var index_1 = require("../src/index");
var tallImageBase64 = require("base64!./images/tall.png"); // MEDIA-FIX
var tallImageDataUri = 'data:image/png;base64,' + tallImageBase64;
var CardView = index_1.default.CardView;
var onClick = function (event) {
    storybook_1.action('click');
};
storybook_1.storiesOf('CardView', {})
    .add('Default', function () { return (React.createElement(CardView, { loading: false, selectable: false, selected: false, mediaName: 'some image', mediaType: 'image', mediaSize: 32831, dataURI: tallImageDataUri, onClick: onClick })); })
    .add('Custom sized', function () { return (React.createElement(CardView, { height: 250, width: 380, loading: false, selectable: false, selected: false, mediaName: 'some image', mediaType: 'image', mediaSize: 32831, dataURI: tallImageDataUri, onClick: onClick })); })
    .add('With Progress', function () { return (React.createElement(CardView, { loading: false, selectable: false, selected: false, mediaName: 'with_progress.png', mediaType: 'image', mediaSize: 32831, dataURI: tallImageDataUri, progress: 0.5, onClick: onClick })); });
//# sourceMappingURL=cardview-story.js.map