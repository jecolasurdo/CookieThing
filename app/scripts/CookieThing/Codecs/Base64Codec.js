var CookieThing;
(function (CookieThing) {
    (function (Codecs) {
        Codecs.Base64Codec = function () {

            this.FriendlyName = 'Base64';

            this.Description = 'Converts to and from a Base64 encoded string.'

            this.Encode = function (decodedValue) {
                return btoa(decodedValue);
            }

            this.Decode = function (encodedValue) {
                return atob(encodedValue);
            }

        }
    })(CookieThing.Codecs || (CookieThing.Codecs = {}));
    var Codecs = CookieThing.Codecs;
})(CookieThing || (CookieThing = {}));