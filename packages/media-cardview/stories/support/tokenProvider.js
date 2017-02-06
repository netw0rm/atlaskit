"use strict";
var axios_1 = require("axios");
var StoryBookTokenProvider = (function () {
    function StoryBookTokenProvider() {
    }
    StoryBookTokenProvider.tokenProvider = function (collectionName) {
        var params = { collection: collectionName };
        return Promise.resolve(axios_1.default.get('/token', {
            baseURL: 'https://media-playground.internal.app.dev.atlassian.io',
            headers: {},
            params: params
        }).then(function (response) { return response.data.token; }));
    };
    return StoryBookTokenProvider;
}());
exports.StoryBookTokenProvider = StoryBookTokenProvider;
//# sourceMappingURL=tokenProvider.js.map