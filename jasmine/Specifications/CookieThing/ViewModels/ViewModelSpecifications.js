/// <reference path="../../../SpecRunner.html" />

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
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, CookieThing.Codecs.Manifest);

            expect(viewModel.Cookies().length).toEqual(2);
        });

        it("is sorted alphabetically by cookie name.", function () {
            var cookieA = new CookieThing.Models.Cookie();
            cookieA.name('cookieA');
            var cookieB = new CookieThing.Models.Cookie();
            cookieB.name('cookieB');
            var cookieC = new CookieThing.Models.Cookie();
            cookieC.name('cookieC');

            var cookies = ko.observableArray([cookieC, cookieA, cookieB]);
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, CookieThing.Codecs.Manifest);

            expect(viewModel.Cookies()).toEqual([cookieA, cookieB, cookieC]);
        });

        it("has the first cookie selected by default.", function () {
            var cookieA = new CookieThing.Models.Cookie();
            cookieA.name('cookieA');
            var cookieB = new CookieThing.Models.Cookie();
            cookieB.name('cookieB');
            var cookieC = new CookieThing.Models.Cookie();
            cookieC.name('cookieC');

            var cookies = ko.observableArray([cookieC, cookieA, cookieB]);
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, CookieThing.Codecs.Manifest);

            expect(viewModel.SelectedCookie()).toBe(cookieA);
        });

    });

    describe("selecting a cookie", function () {

        it("has its value decoded by the selected codec.", function () {

            var cookieA = new CookieThing.Models.Cookie();
            cookieA.name('cookieA');
            var encodedValueA = 1;
            cookieA.value(encodedValueA);

            var cookieB = new CookieThing.Models.Cookie();
            cookieB.name('cookieB');
            var encodedValueB = 2;
            cookieB.value(encodedValueB);

            var cookies = ko.observableArray([cookieA, cookieB]);

            var fakeCodec = function () {
                    this.FriendlyName = 'Fake Codec';
                    this.Description = 'Fake Codec';
                    this.Encode = function (decodedValue) { return decodedValue * 3; }
                    this.Decode = function (encodedValue) { return encodedValue / 3; }
                }
            fakeCodecManifest = [ new fakeCodec() ]

            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, fakeCodecManifest);

            viewModel.SelectedCookie(cookieB);
            var actualDecodedValue = viewModel.SelectedCookieDecodedValue();
            var expectedDecodedValue = 6;

            expect(actualDecodedValue).toEqual(expectedDecodedValue);

        });

    });

});

describe("For domains in general", function () {

    describe("the domain list", function () {

        it("is initialized from the list of cookies.", function () {
            var cookieA = new CookieThing.Models.Cookie();
            cookieA.domain('domainA');
            var cookieB = new CookieThing.Models.Cookie();
            cookieB.domain('domainB');
            var cookieC = new CookieThing.Models.Cookie();
            cookieC.domain('domainC');

            var cookies = ko.observableArray([cookieC, cookieA, cookieB]);
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, CookieThing.Codecs.Manifest);

            expect(viewModel.DomainNames()).toEqual(['domainA', 'domainB', 'domainC']);
        });

        it("is sorted alphabetically.", function () {
            var cookieA = new CookieThing.Models.Cookie();
            cookieA.domain('domainA');
            var cookieB = new CookieThing.Models.Cookie();
            cookieB.domain('domainB');
            var cookieC = new CookieThing.Models.Cookie();
            cookieC.domain('domainC');

            var cookies = ko.observableArray([cookieC, cookieA, cookieB]);
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, CookieThing.Codecs.Manifest);

            expect(viewModel.DomainNames()).toEqual(['domainA', 'domainB', 'domainC']);
        });

        it("has the first domain selected by default.", function () {
            var cookieA = new CookieThing.Models.Cookie();
            cookieA.domain('domainA');
            var cookieB = new CookieThing.Models.Cookie();
            cookieB.domain('domainB');
            var cookieC = new CookieThing.Models.Cookie();
            cookieC.domain('domainC');

            var cookies = ko.observableArray([cookieC, cookieA, cookieB]);
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, CookieThing.Codecs.Manifest);

            expect(viewModel.SelectedDomainName()).toEqual('domainA');
        });

    });

    describe("selecting a domain", function() {

        it("sets the cookies for that domain.", function () {
            var cookieA = new CookieThing.Models.Cookie();
            cookieA.name('cookieA');
            cookieA.domain('domain1');

            var cookieB = new CookieThing.Models.Cookie();
            cookieB.name('cookieB');
            cookieB.domain('domain2');

            var cookieC = new CookieThing.Models.Cookie();
            cookieC.name('cookieC');
            cookieC.domain('domain2');

            var cookies = ko.observableArray([cookieA, cookieB, cookieC]);
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, CookieThing.Codecs.Manifest);
            viewModel.SelectedDomainName('domain2');

            expect(viewModel.CookiesForSelectedDomain()).toEqual([cookieB, cookieC])      
        });

        it("sets the first cookie in the domain as the selected cookie.", function () {
            var cookieA = new CookieThing.Models.Cookie();
            cookieA.name('cookieA');
            cookieA.domain('domain1');

            var cookieB = new CookieThing.Models.Cookie();
            cookieB.name('cookieB');
            cookieB.domain('domain2');

            var cookieC = new CookieThing.Models.Cookie();
            cookieC.name('cookieC');
            cookieC.domain('domain2');

            var cookies = ko.observableArray([cookieA, cookieB, cookieC]);
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, CookieThing.Codecs.Manifest);
            viewModel.SelectedDomainName('domain2');

            expect(viewModel.SelectedCookie().name()).toEqual(cookieB.name())
        });

    });

});

describe("For codecs in general", function () {

    describe("the codecs list", function () {

        it("is set by default.", function () {
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(new ko.observable([]), CookieThing.Codecs.Manifest);
            var expectedCodecNames = ['Base64','Base64-Url Encoding','Url Encoding'];
            var actualCodecNames = _.map(viewModel.Codecs, function (codec) { return codec.FriendlyName; });
            expect(actualCodecNames).toEqual(expectedCodecNames);
        });

        it("has the first codec selected by default.", function () {
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(new ko.observable([]), CookieThing.Codecs.Manifest);
            var expectedCodecName = 'Base64';
            var actualCodecName = viewModel.SelectedCodec().FriendlyName;
            expect(actualCodecName).toEqual(expectedCodecName);
        });

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