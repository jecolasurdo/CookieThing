﻿/// <reference path="../../knockout-3.3.0.js" />d
/// <reference path="../../jquery-2.1.4.js" />
/// <reference path="../../underscore.js" />
/// <reference path="../Models/Cookie.js" />

var CookieThingViewModel = function () {
    this.cookies = ko.observableArray([]);
    this.selectedCookieName = ko.observable('');
    this.selectedDomain = ko.observable('');

    this.domains = ko.computed(
        function () {
            return _.sortBy(
                       _.uniq(
                           _.map(this.cookies()[0]
                                , function (cookie) { return cookie.domain; }
                                , this)
                          , false
                          , function (a) { return a }
                          , this)
                     , function (domain) { return domain; }
                     , this);
        }
        , this);

    this.cookieNamesForSelectedDomain = ko.computed(
        function () {
            return _.map(
                       _.filter(this.cookies()[0]
                           , function (cookie) { return cookie.domain === this.selectedDomain(); }
                           , this)
                       , function (cookie) { return cookie.name; }
                       , this);
        }, this);

    this.selectedRawCookie = ko.computed(function () {
        return _.filter(this.cookies()[0]
             , function (cookie) {
                 return cookie.name === this.selectedCookieName()
                     && cookie.domain === this.selectedDomain();
             }
             , this)[0];
    }, this);

    this.selectedCookie = ko.computed(function () {
        return new CookieThing.Models.Cookie(this.selectedRawCookie());
    }, this);

}

var ctvm = new CookieThingViewModel();
chrome.cookies.getAll({}, function (cookie) { ctvm.cookies.push(cookie); });
ko.applyBindings(ctvm);