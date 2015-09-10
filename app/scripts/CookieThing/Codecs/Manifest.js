/// <reference path="Base64Codec.js" />
/// <reference path="Base64UrlCodec.js" />
/// <reference path="UrlEncodingCodec.js" />
/// <reference path="NilCodec.js" />

var CookieThing;
(function (CookieThing) {
    (function (Codecs) {

        Codecs.Manifest = [
            new CookieThing.Codecs.Base64Codec(),
            new CookieThing.Codecs.Base64UrlCodec(),
            new CookieThing.Codecs.UrlEncodingCodec(),
            new CookieThing.Codecs.NilCodec()
        ]

    })(CookieThing.Codecs || (CookieThing.Codecs = {}));
    var Codecs = CookieThing.Codecs;
})(CookieThing || (CookieThing = {}));