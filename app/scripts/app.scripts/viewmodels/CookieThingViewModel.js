/// <reference path="../../knockout-3.3.0.js" />d
/// <reference path="../../jquery-2.1.4.js" />

var CookieThingViewModel = function (cookies) {
    this.cookies = ko.observableArray(cookies);
    this.domains = {};
}

ko.applyBindings(
    chrome.cookies.getAll({}, function (cookies) { var ctvm = new CookieThingViewModel(cookies); })
);