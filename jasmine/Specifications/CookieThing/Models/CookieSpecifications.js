/// <reference path="../../../SpecRunner.html" />

describe("Within the models", function () {
    describe("A cookie", function () {
        it("sets all properties to defaults if passed a null in constructor.", function () {
            var cookie = new CookieThing.Models.Cookie(null);
            expect(cookie.domain()).toEqual('');
            expect(cookie.expirationDate()).toEqual(0);
            expect(cookie.hostOnly()).toEqual(false);
            expect(cookie.httpOnly()).toEqual(false);
            expect(cookie.name()).toEqual('');
            expect(cookie.path()).toEqual('');
            expect(cookie.secure()).toEqual(false);
            expect(cookie.session()).toEqual(false);
            expect(cookie.storeId()).toEqual('');
            expect(cookie.value()).toEqual('');
        });

        it("sets properties to equal raw cookie value if passed a raw cookie.", function () {
            var rawCookie = function () {
                this.domain = 'domain';
                this.expirationDate = 1;
                this.hostOnly = true;
                this.httpOnly = true;
                this.name = 'name';
                this.path = true;
                this.secure = true;
                this.session = true;
                this.storeId = 'storeId';
                this.value = 'value';
            }

            var cookie = new CookieThing.Models.Cookie(rawCookie);
            expect(cookie.domain()).toEqual(rawCookie.domain);
            expect(cookie.expirationDate()).toEqual(rawCookie.expirationDate);
            expect(cookie.hostOnly()).toEqual(rawCookie.hostOnly);
            expect(cookie.httpOnly()).toEqual(rawCookie.httpOnly);
            expect(cookie.name()).toEqual(rawCookie.name);
            expect(cookie.path()).toEqual(rawCookie.path);
            expect(cookie.secure()).toEqual(rawCookie.secure);
            expect(cookie.session()).toEqual(rawCookie.session);
            expect(cookie.storeId()).toEqual(rawCookie.storeId);
            expect(cookie.value()).toEqual(rawCookie.value);
        });
    });
});

