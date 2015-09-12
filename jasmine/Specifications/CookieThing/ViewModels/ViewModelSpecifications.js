/// <reference path="../../../SpecRunner.html" />

describe("The viewmodel in general", function () {

    it("must be initialized with an observable array.", function () {
        expect(function () {
            var notTheRightObjectType = { someProperty: 'wtf' };
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(notTheRightObjectType, CookieThing.Codecs.Manifest);
        }).toThrow(new Error("The view model must be initialized with an observable array."));
    });

    it("must be initialized with an observable array of cookie objects.", function () {
        expect(function () {
            var arrayOfTheWrongType = ko.observableArray(['wrong type']);
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(arrayOfTheWrongType, CookieThing.Codecs.Manifest);
        }).toThrow(new Error("The view model must be initialized with an observable array of cookies."));
    });

    it("doesn't throw an exception when initialized with the correct parameter type.", function () {
        var theCorrectObjectType = ko.observableArray([new CookieThing.Models.Cookie()]);
        var viewModel = new CookieThing.ViewModels.CookieThingViewModel(theCorrectObjectType, CookieThing.Codecs.Manifest);
    });

    it("doesn't throw an exception when there are no cookies available.", function () {
        var noCookiesPresent = ko.observableArray([]);
        var viewModel = new CookieThing.ViewModels.CookieThingViewModel(noCookiesPresent, CookieThing.Codecs.Manifest);
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

            var cookies = ko.observable([cookieA, cookieB]);

            var fakeCodec = function () {
                    this.FriendlyName = 'Fake Codec';
                    this.Description = 'Fake Codec';
                    this.Encode = function (decodedValue) { return decodedValue / 3; }
                    this.Decode = function (encodedValue) { return encodedValue * 3; }
                }
            fakeCodecManifest = [new fakeCodec()];

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

        it("has the distinct list of domain names.", function () {
            var cookieA = new CookieThing.Models.Cookie();
            cookieA.domain('domainA');
            var cookieB = new CookieThing.Models.Cookie();
            cookieB.domain('domainB');
            var cookieC = new CookieThing.Models.Cookie();
            cookieC.domain('domainB');

            var cookies = ko.observableArray([cookieA, cookieB, cookieC]);
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, CookieThing.Codecs.Manifest);

            expect(viewModel.DomainNames()).toEqual(['domainA', 'domainB']);
        })

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
            var codecManifest = [
                new function() {this.FriendlyName = 'some codec';}
            ];

            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(new ko.observable([]), codecManifest);
            var expectedCodecNames = ['some codec'];
            var actualCodecNames = _.map(viewModel.Codecs, function (codec) { return codec.FriendlyName; });
            expect(actualCodecNames).toEqual(expectedCodecNames);
        });

        it("has the first codec selected by default.", function () {
            var codecManifest = [
                new function () { this.FriendlyName = 'codec 1'; },
                new function () { this.FriendlyName = 'codec 2'; }
            ];

            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(new ko.observable([]), codecManifest);
            var expectedCodecName = 'codec 1';
            var actualCodecName = viewModel.SelectedCodec().FriendlyName;
            expect(actualCodecName).toEqual(expectedCodecName);
        });

    });

    describe("Selecting a codec", function () {

        it("sets the decoded value of the cookie.", function() {
            var cookie = new CookieThing.Models.Cookie();
            cookie.value(2);
            var cookies = ko.observable([cookie]);
            var codecA = new function () {
                this.Encode = function (decodedValue) { return decodedValue / 3; }
                this.Decode = function (encodedValue) { return encodedValue * 3; }
            }
            var codecB = new function () {
                this.Encode = function (decodedValue) { return decodedValue / 2; }
                this.Decode = function (encodedValue) { return encodedValue * 2; }
            }
            var codecManifest = [codecA, codecB];
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, codecManifest);

            // simulate toggling between codecs
            viewModel.SelectedCodec(codecA);
            viewModel.SelectedCodec(codecB);

            var actualDecodedValue = viewModel.SelectedCookieDecodedValue();
            var expectedDecodedValue = 4;

            expect(actualDecodedValue).toEqual(expectedDecodedValue);        
        });

    });

    describe("Changing the raw value of the selected cookie", function () {
    
        it("decodes the raw value.", function () {
            var cookie = new CookieThing.Models.Cookie();
            cookie.value(2);
            var cookies = ko.observable([cookie]);
            var codec = new function () {
                this.Encode = function (decodedValue) { return decodedValue / 3; }
                this.Decode = function (encodedValue) { return encodedValue * 3; }
            }
            var codecManifest = [codec];
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, codecManifest);

            var actualInitialDecodedValue = viewModel.SelectedCookieDecodedValue();
            var expectedIniitalDecodedValue = 6;

            expect(actualInitialDecodedValue).toEqual(expectedIniitalDecodedValue);

            viewModel.SelectedCookie().value(3);
            var actualNewDecodedValue = viewModel.SelectedCookieDecodedValue();
            var expectedNewDecodedValue = 9;

            expect(actualNewDecodedValue).toEqual(expectedNewDecodedValue);
        });

    });

    describe("Changing the decoded value of the selected cookie", function () {

        it("encodes the raw value.", function () {
            var cookie = new CookieThing.Models.Cookie();
            cookie.value(3);
            var cookies = ko.observable([cookie]);
            var codec = new function () {
                this.Encode = function (decodedValue) { return decodedValue * 3; }
                this.Decode = function (encodedValue) { return encodedValue / 3; }
            }
            var codecManifest = [codec];
            var viewModel = new CookieThing.ViewModels.CookieThingViewModel(cookies, codecManifest);

            var actualInitialEncodedValue = viewModel.SelectedCookie().value();
            var expectedInitialEncodedValue = 3;

            expect(actualInitialEncodedValue).toEqual(expectedInitialEncodedValue);

            viewModel.SelectedCookieDecodedValue(2);
            var actualNewEncodedValue = viewModel.SelectedCookie().value();
            var expectedNewEncodedValue = 6;

            expect(actualNewEncodedValue).toEqual(expectedNewEncodedValue);
        });

    });

});