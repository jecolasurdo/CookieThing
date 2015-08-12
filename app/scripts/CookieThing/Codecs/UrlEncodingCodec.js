var CookieThing;
(function (CookieThing) {
    (function (Codecs) {
        Codecs.UrlEncodingCodec = function () {

            this.FriendlyName = 'Url Encoding';

            this.Description = 'Converts to and from a URL encoded string.'

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