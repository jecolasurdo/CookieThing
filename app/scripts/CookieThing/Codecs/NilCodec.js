var CookieThing;
(function (CookieThing) {
    (function (Codecs) {
        Codecs.NilCodec = function () {

            this.FriendlyName = 'None';

            this.Description = 'Performs no conversion';

            this.Encode = function (decodedValue) {
                return decodedValue;
            }

            this.Decode = function (encodedValue) {
                return encodedValue;
            }

            this.LastValueDecodedSuccessfully = ko.observable(true);

        }
    })(CookieThing.Codecs || (CookieThing.Codecs = {}));
    var Codecs = CookieThing.Codecs;
})(CookieThing || (CookieThing = {}));