var self = this;
this.cookies = ko.observableArray([]);
this.selectedCookieName = ko.observable('');
this.selectedDomain = ko.observable('');
this.selectedCodecName = ko.observable({});

this.domains = ko.computed(
    function () {
        return _.sortBy(
                   _.uniq(
                       _.map(this.cookies()[0]
                            , function (cookie) { return cookie.domain; }
                            , this)
                      , false
                      , function (a) { return a }
                      , this)
                 , function (domain) { return domain; }
                 , this);
    }
    , this);

this.cookieNamesForSelectedDomain = ko.computed(
    function () {
        return _.map(
                   _.filter(this.cookies()[0]
                       , function (cookie) { return cookie.domain === this.selectedDomain(); }
                       , this)
                   , function (cookie) { return cookie.name; }
                   , this);
    }, this);

this.selectedRawCookie = ko.computed(function () {
    return _.filter(this.cookies()[0]
         , function (cookie) {
             return cookie.name === this.selectedCookieName()
                 && cookie.domain === this.selectedDomain();
         }
         , this)[0];
}, this);

this.selectedCookie = ko.computed(function () {
    return new CookieThing.Models.Cookie(this.selectedRawCookie());
}, this);

this.codecNames = _.map(CookieThing.Codecs.Manifest, function (codec) { return codec.FriendlyName });

this.selectedCodecName(this.codecNames[0]);

this.selectedCodec = ko.computed(function () {
    return _.filter(CookieThing.Codecs.Manifest, function (codec) { return codec.FriendlyName === this.selectedCodecName() }, this)[0];
}, this);

this.selectedCookieDecodedValue = ko.computed({
    read: function () {
        var encodedValue = self.selectedCookie().value();
        var decodedValue = self.selectedCodec().Decode(encodedValue);
        return decodedValue;
    },
    write: function (decodedValue) {
        var encodedValue = self.selectedCodec().Encode(decodedValue);
        ko.ignoreDependencies(function () {
            self.selectedCookie().value(encodedValue);
        });
    }
});

}
