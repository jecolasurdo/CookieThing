/// <reference path="../../../CookieThing.html" />

var cookies = ko.observable();
chrome.cookies.getAll({}, function (rawCookies) {
    var wrappedCookies = _.map(rawCookies, function (rawCookie) {
        return new CookieThing.Models.Cookie(rawCookie);
    })
    cookies(wrappedCookies);
});
var ctvm = new CookieThing.ViewModels.CookieThingViewModel(cookies, CookieThing.Codecs.Manifest);
ko.applyBindings(ctvm);