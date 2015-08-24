﻿/// <reference path="../../../SpecRunner.html" />

describe("The viewmodel in general", function () {

    it("must be initialized with an observable array.", function () {
        expect(function () {
            var notTheRightObjectType = { someProperty: 'wtf' };
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(notTheRightObjectType);
        }).toThrow(new Error("The view model must be initialized with an observable array."));
    });

    it("must be initialized with an observable array of cookie objects.", function () {
        expect(function () {
            var arrayOfTheWrongType = ko.observableArray(['wrong type']);
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(arrayOfTheWrongType);
        }).toThrow(new Error("The view model must be initialized with an observable array of cookies."));
    });

    it("doesn't throw an exception when initialized with the correct parameter type.", function () {
        var theCorrectObjectType = ko.observableArray([new CookieThing.Models.Cookie()]);
        var viewModel = new CookieThing.ViewModels.CookieThingViewModel(theCorrectObjectType);
    });

    it("doesn't throw an exception when there are no cookies available.", function () {
        var noCookiesPresent = ko.observableArray([]);
        var viewModel = new CookieThing.ViewModels.CookieThingViewModel(noCookiesPresent);
    });

});

describe("For cookies in general", function () {

    describe("the cookie list", function () {

        it("is set by default.", function () {
            var cookieOne = new CookieThing.Models.Cookie();
            cookieOne.name('cookieOne');
            var cookieTwo = new CookieThing.Models.Cookie();
            cookieTwo.name('cookieTwo');

            var cookies = ko.observableArray([cookieOne, cookieTwo]);
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies);

            expect(viewModel.Cookies().length).toEqual(2);
        });

        it("is sorted alphabetically by cookie name.")

        it("has the first cookie selected by default.");

    });

    describe("selecting a cookie", function () {

        it("has its value decoded by the selected codec.");

    });

});

describe("For domains in general", function () {

    describe("the domain list", function () {

        it("is initialized from the list of cookies.");

        it("is sorted alphabetically.");

        it("has the first domain selected by default.");

    });

    describe("selecting a domain", function() {

        it("sets the cookies for that domain.");

        it("sets the first cookie in the domain as the selected cookie.");

    });

});

describe("For codecs in general", function () {

    describe("the codecs list", function () {

        it("is set by default.");

        it("is sorted alphabetically by friendly name.")

        it("has the first codec selected by default.");

    });

    describe("Selecting a codec", function () {

        it("sets the decoded value of the cookie.");

    });

    describe("Changing the raw value of the selected cookie", function () {
    
        it("decodes the raw value.");

    });

    describe("Changing the decoded value of the selected cookie", function () {

        it("encodes the raw value.");

    });

});