/// <reference path="../../../SpecRunner.html" />

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

        it("handles decoding-errors gracefully.", function () {
            var codec = new CookieThing.Codecs.Base64Codec();
            var actualResult = codec.Decode(function () { throw new Error('Error'); });
            var expectedResult = 'The raw value could not be decoded.';
            expect(actualResult).toEqual(expectedResult);
        });

    });

    describe("the NilCodec", function () {
        it("encodes values properly.", function () {
            var codec = new CookieThing.Codecs.NilCodec();
            var rawValue = 'Value';
            var actualResult = codec.Decode(rawValue);
            var expectedResult = rawValue;
            expect(actualResult).toEqual(expectedResult);
        });

        it("decodes values properly.", function () {
            var codec = new CookieThing.Codecs.NilCodec();
            var rawValue = 'Value';
            var actualResult = codec.Encode(rawValue);
            var expectedResult = rawValue;
            expect(actualResult).toEqual(expectedResult);
        });

    });

    describe("the Base64UrlCodec", function () {
        it("does nothing at the moment.");
    });

    describe("the UrlEncodingCodec", function () {
        it("encodes values properly.", function () {
            var codec = new CookieThing.Codecs.UrlEncodingCodec();
            var encodedValue = 'this%20is%20a%20test';
            var actualResult = codec.Decode(encodedValue);
            var expectedResult = 'this is a test';
            expect(actualResult).toEqual(expectedResult);
        });

        it("decodes values properly.", function () {
            var codec = new CookieThing.Codecs.UrlEncodingCodec();
            var decodedValue = 'this is a test';
            var actualResult = codec.Encode(decodedValue);
            var expectedResult = 'this%20is%20a%20test';
            expect(actualResult).toEqual(expectedResult);
        });
    });

});