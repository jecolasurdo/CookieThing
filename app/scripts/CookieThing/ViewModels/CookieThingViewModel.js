/// <reference path="../../knockout-3.3.0.js" />d
/// <reference path="../../jquery-2.1.4.js" />
/// <reference path="../../underscore.js" />
/// <reference path="../Models/Cookie.js" />
/// <reference path="../Codecs/Manifest.js" />

var CookieThing;
(function (CookieThing) {
    (function (ViewModels) {
        ViewModels.CookieThingViewModel = function (cookies, codecManifest) {
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

            var _selectedDomainName = ko.observable(_.first(viewModel.DomainNames()));
            this.SelectedDomainName = ko.computed({
                read: function () {
                    return _selectedDomainName();
                },
                write: function (value) {                    
                    _selectedDomainName(value); 
                    var cookiesForSelectedDomain = _.filter(viewModel.Cookies(), function (cookie) {
                        return cookie.domain() === _selectedDomainName();
                    });
                    viewModel.SelectedCookie(_.first(cookiesForSelectedDomain));
                }
            });

            this.CookiesForSelectedDomain = ko.computed(function () {
                return _.filter(viewModel.Cookies(), function (cookie) {
                    return cookie.domain() === _selectedDomainName();
                });
            });

            this.Codecs = codecManifest;

            this.SelectedCodec = ko.observable(_.first(this.Codecs));

            this.SelectedCookieDecodedValue = ko.computed({
                read: function () {
                    if (viewModel.SelectedCookie() === undefined) {
                        return '';
                    }

                    var encodedValue = viewModel.SelectedCookie().value();
                    var decodedValue = viewModel.SelectedCodec().Decode(encodedValue);
                    return decodedValue;
                },
                write: function(decodedValue) {
                    return 'write';
                }
            });

            //this.SelectedCookieDecodedValue = ko.computed({
            //    read: function () {
            //        var encodedValue = viewModel.SelectedCookie().value();
            //        var decodedValue = viewModel.SelectedCodec().Decode(encodedValue);
            //        return decodedValue;
            //    },
            //    write: function (decodedValue) {
            //        var encodedValue = viewModel.SelectedCodec().Encode(decodedValue);
            //        ko.ignoreDependencies(function () {
            //            viewModel.SelectedCookie().value(encodedValue);
            //        });
            //    }
            //});

        }
    })(CookieThing.ViewModels || (CookieThing.ViewModels = {}))
    var ViewModels = CookieThing.ViewModels;
})(CookieThing || (CookieThing = {}));

//var ctvm = new CookieThing.ViewModels.CookieThingViewModel();
//chrome.cookies.getAll({}, function (cookie) { ctvm.cookies.push(cookie); });
//ko.applyBindings(ctvm);