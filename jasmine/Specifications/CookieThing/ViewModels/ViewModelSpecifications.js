/// <reference path="../../../SpecRunner.html" />

describe("Within the viewmodels", function () {

    describe("domains viewmodel", function () {

        it("domain names are extracted from the list of cookies", function () {
            var rawCookieOne = new CookieThing.Models.RawCookie();
            rawCookieOne.domain = 'DomainOne';
            var rawCookieTwo = new CookieThing.Models.RawCookie();
            rawCookieTwo.domain = 'DomainTwo';

            var ctvm = new CookieThing.ViewModels.CookieThingViewModel();
            ctvm.cookies.push([rawCookieOne, rawCookieTwo]);

            expect(ctvm.domains()).toEqual(['DomainOne', 'DomainTwo']);
        });

        xit("setting a selected domain also sets the cookie names for that domain.", function () {

        });

        xit("the first domain is selected by default.", function () {

        });

        xit("setting the selected domain and seleced cookie name also sets the selected raw cookie.", function () {

        });

    });

    describe("cookies viewmodel", function () {

        xit("the first cookie name is selected by default.", function () {

        });

        xit("when the raw cookie is set, the selected cookie model is also set.", function () {

        });

    });

    describe("codecs viewmodel", function () {

        xit("the codec names list is set by default.", function () {

        });

        xit("the first codec is selected by default.", function () {

        });

        xit("setting the selected codec decodes the selected cookie's raw value.", function () {

        });

        xit("changing the selected cookie raw value decodes the raw value.", function () {

        });

        xit("changing the selected cookie decoded value encodes the value.", function () {

        });

    });

});