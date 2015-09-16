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
                try {
                    this.LastValueDecodedSuccessfully(true);
                    return atob(encodedValue);
                }
                catch (err) {
                    this.LastValueDecodedSuccessfully(false);
                    return 'The raw value could not be decoded.';
                }
            }

            this.LastValueDecodedSuccessfully = ko.observable(true);

        }
    })(CookieThing.Codecs || (CookieThing.Codecs = {}));
    var Codecs = CookieThing.Codecs;
})(CookieThing || (CookieThing = {}));