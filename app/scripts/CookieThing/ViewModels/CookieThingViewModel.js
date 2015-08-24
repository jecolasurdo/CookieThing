/// <reference path="../../knockout-3.3.0.js" />d
/// <reference path="../../jquery-2.1.4.js" />
/// <reference path="../../underscore.js" />
/// <reference path="../Models/Cookie.js" />
/// <reference path="../Codecs/Manifest.js" />

var CookieThing;
(function (CookieThing) {
    (function (ViewModels) {
        ViewModels.CookieThingViewModel = function (cookies) {
            if (!ko.isObservable(cookies)) {
                throw new Error("The view model must be initialized with an observable array.");
            }

            if (_.any(cookies(), function(cookie){ return !(cookie instanceof CookieThing.Models.Cookie) })) {
                throw new Error("The view model must be initialized with an observable array of cookies.");
            }

            this.Cookies = cookies;

        }
    })(CookieThing.ViewModels || (CookieThing.ViewModels = {}))
    var ViewModels = CookieThing.ViewModels;
})(CookieThing || (CookieThing = {}));

var ctvm = new CookieThing.ViewModels.CookieThingViewModel();
chrome.cookies.getAll({}, function (cookie) { ctvm.cookies.push(cookie); });
ko.applyBindings(ctvm);