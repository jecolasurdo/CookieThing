// This can be handled through reflection, but it'll be manual in this iteration.

/// <reference path="Base64Codec.js" />
/// <reference path="Base64UrlCodec.js" />
/// <reference path="UrlEncodingCodec.js" />

var CookieThing;
(function (CookieThing) {
    (function (Codecs) {

        Codecs.Manifest = [
            new CookieThing.Codecs.Base64Codec(),
            new CookieThing.Codecs.Base64UrlCodec(),
            new CookieThing.Codecs.UrlEncodingCodec()
        ]

    })(CookieThing.Codecs || (CookieThing.Codecs = {}));
    var Codecs = CookieThing.Codecs;
})(CookieThing || (CookieThing = {}));