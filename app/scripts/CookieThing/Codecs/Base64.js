/// <reference path="Cookie.js" />
var CookieThing;
(function (CookieThing) {
    (function (Codecs) {
        (function (Base64) {
            Base64.Name = 'Base64';

            Base64.Encode = function (decodedValue) {
                var encodedValue = decodedValue;
                return encodedValue;
            }

            Base64.Decode = function (encodedValue) {
                var decodedValue = encodedValue;
                return decodedValue;
            }
        })(Codecs.Base64 || (Codecs.Base64 = {}));
        var Base64 = Codecs.Base64;
    })(CookieThing.Codecs || (CookieThing.Codecs = {}));
    var Codecs = CookieThing.Codecs;
})(CookieThing || (CookieThing = {}));