/// <reference path="../../knockout-3.3.0.js" />d
/// <reference path="../../jquery-2.1.4.js" />
/// <reference path="../../underscore.js" />

var CookieThingViewModel = function () {
    this.cookies = ko.observableArray();

    this.domains = ko.computed(function () {
        return _.sortBy(
                   _.uniq(
                       _.map(this.cookies()[0], function (cookie) {
                           return cookie.domain;
                       })), function (domain) { return domain; });
    }, this);

    this.cookieNamesForSelectedDomain = ko.observable();

    this.getCookiesNamesForDomain = function (domain) {
        this.cookieNamesForSelectedDomain(
            _.map(
                   _.filter(this.cookies()[0], function (cookie) {
                       return cookie.domain === domain;
                   }),
                   function (cookie) {
                       return cookie.name;
                   })
            );
    }


}

var ctvm = new CookieThingViewModel();
chrome.cookies.getAll({}, function (cookie) { ctvm.cookies.push(cookie); });

ko.applyBindings(ctvm);