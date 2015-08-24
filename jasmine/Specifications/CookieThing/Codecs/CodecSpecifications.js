﻿/// <reference path="../../../SpecRunner.html" />

describe("For the codecs in general", function () {

    describe("the Base64Codec", function () {
        it("encodes values properly.", function () {
            var codec = new CookieThing.Codecs.Base64Codec();
            var rawValue = 'Base64 Value';        
            var actualResult = codec.Encode(rawValue);
            var expectedResult = 'QmFzZTY0IFZhbHVl';
            expect(actualResult).toEqual(expectedResult);
        });

        it("decodes values properly.", function () {
            var codec = new CookieThing.Codecs.Base64Codec();
            var rawValue = 'QmFzZTY0IFZhbHVl';
            var actualResult = codec.Decode(rawValue);
            var expectedResult = 'Base64 Value';
            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe("the Base64UrlCodec", function () {
        it("does nothing at the moment.");
    });

    describe("the UrlEncodingCodec", function() {
        it("does nothing at the moment.")
    });

});