/// <reference path="../../knockout-3.3.0.js" />d
/// <reference path="../../jquery-2.1.4.js" />
/// <reference path="../../underscore.js" />


var CookieThingViewModel = function (cookies) {
    this.cookies = ko.observableArray(cookies);
    this.domains = ko.computed(function () {
        return _.sortBy(
                   _.uniq(
                       _.map(this.cookies(), function (cookie) {
                           return cookie.domain;
                       })), function (domain) { return domain; });
        }, this);
}

ko.applyBindings(
    chrome.cookies.getAll({}, function (cookies) { var ctvm = new CookieThingViewModel(cookies); })
);