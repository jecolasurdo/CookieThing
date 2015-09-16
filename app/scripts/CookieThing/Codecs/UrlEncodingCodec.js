var CookieThing;
(function (CookieThing) {
    (function (Codecs) {
        Codecs.UrlEncodingCodec = function () {

            this.FriendlyName = 'Url Encoding';

            this.Description = 'Converts to and from a URL encoded string.'

            this.Encode = function (decodedValue) {
                var encodedValue = encodeURI(decodedValue);
                return encodedValue;
            }

            this.Decode = function (encodedValue) {
                var decodedValue = decodeURI(encodedValue);
                return decodedValue;
            }

            this.LastValueDecodedSuccessfully = ko.observable(true);

        }
    })(CookieThing.Codecs || (CookieThing.Codecs = {}));
    var Codecs = CookieThing.Codecs;
})(CookieThing || (CookieThing = {}));