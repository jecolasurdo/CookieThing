var CookieThing;
(function (CookieThing) {
    (function (Codecs) {
        Codecs.Base64UrlCodec = function () {

            this.FriendlyName = 'Base64-Url Encoding';

            this.Description = 'Converts to and from a Base64 -> URL encoded string.'

            this.Encode = function (decodedValue) {
                var encodedValue = decodedValue;
                return encodedValue;
            }

            this.Decode = function (encodedValue) {
                var decodedValue = encodedValue;
                return decodedValue;
            }

        }
    })(CookieThing.Codecs || (CookieThing.Codecs = {}));
    var Codecs = CookieThing.Codecs;
})(CookieThing || (CookieThing = {}));