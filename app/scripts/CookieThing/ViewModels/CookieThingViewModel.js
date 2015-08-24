/// <reference path="../../knockout-3.3.0.js" />d
/// <reference path="../../jquery-2.1.4.js" />
/// <reference path="../../underscore.js" />
/// <reference path="../Models/Cookie.js" />
/// <reference path="../Codecs/Manifest.js" />

var CookieThing;
(function (CookieThing) {
    (function (ViewModels) {
        ViewModels.CookieThingViewModel = function (cookies) {
            var viewModel = this;

            if (!ko.isObservable(cookies)) {
                throw new Error("The view model must be initialized with an observable array.");
            }

            if (_.any(cookies(), function (cookie) { return !(cookie instanceof CookieThing.Models.Cookie) })) {
                throw new Error("The view model must be initialized with an observable array of cookies.");
            }

            this.Cookies = ko.computed(function () {
                return _.sortBy(cookies(), function (cookie) { return cookie.name(); });
            });

            this.SelectedCookie = ko.observable(_.first(viewModel.Cookies()));

            this.DomainNames = ko.observableArray(
                _.sortBy(
                    _.map(viewModel.Cookies(), function (cookie) { return cookie.domain(); })
                   , function (domainName) { return domainName; })
                );

            this.SelectedDomainName = ko.observable(_.first(viewModel.DomainNames()));

            this.CookiesForSelectedDomain = ko.computed(function () {
                return _.filter(viewModel.Cookies(), function (cookie) {
                    return cookie.domain() === viewModel.SelectedDomainName();
                });
            });

        }
    })(CookieThing.ViewModels || (CookieThing.ViewModels = {}))
    var ViewModels = CookieThing.ViewModels;
})(CookieThing || (CookieThing = {}));

var ctvm = new CookieThing.ViewModels.CookieThingViewModel();
chrome.cookies.getAll({}, function (cookie) { ctvm.cookies.push(cookie); });
ko.applyBindings(ctvm);