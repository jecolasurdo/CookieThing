/// <reference path="../../knockout-3.3.0.debug.js" />

var CookieThing;
(function (CookieThing) {
    (function (Models) {
        Models.Cookie = function (rawCookie) {
            if (rawCookie) {
                this.name = ko.observable(rawCookie.name);
                this.value = ko.observable(rawCookie.value);
                this.domain = ko.observable(rawCookie.domain);
                this.hostOnly = ko.observable(rawCookie.hostOnly);
                this.path = ko.observable(rawCookie.path);
                this.secure = ko.observable(rawCookie.secure);
                this.httpOnly = ko.observable(rawCookie.httpOnly);
                this.session = ko.observable(rawCookie.session);
                this.expirationDate = ko.observable(rawCookie.expirationDate);
                this.storeId = ko.observable(rawCookie.storeId);
            } else {
                this.name = ko.observable('');
                this.value = ko.observable('');
                this.domain = ko.observable('');
                this.hostOnly = ko.observable(false);
                this.path = ko.observable('');
                this.secure = ko.observable(false);
                this.httpOnly = ko.observable(false);
                this.session = ko.observable(false);
                this.expirationDate = ko.observable(0);
                this.storeId = ko.observable('');
            }
        }
    })(CookieThing.Models || (CookieThing.Models = {}))
    var Models = CookieThing.Models;
})(CookieThing || (CookieThing = {}));