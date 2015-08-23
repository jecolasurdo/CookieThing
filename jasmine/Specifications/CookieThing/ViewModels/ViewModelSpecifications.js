/// <reference path="../../../SpecRunner.html" />

describe("The viewmodel in general", function () {

    it("must be initialized with an observable array of cookie objects (not a raw cookie object array).", function () {
        
        expect(function () {
            var notTheRightObjectType = { someProperty: 'wtf' };
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(notTheRightObjectType);
        }).toThrow(new Error("The viewmodel must be initialized with an observable array of cookie objects."));
  
        var theCorrectObjectType = new CookieThing.Models.Cookie();
        var viewModel = new CookieThing.ViewModels.CookieThingViewModel(theCorrectObjectType);
    });

});

describe("For cookies in general", function () {

    describe("the cookie list", function () {

        it("is set by default.")

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