var CookieThing;
(function (CookieThing) {
    (function (Models) {
        Models.RawCookie = function () {
            this.name = '';
            this.value = '';
            this.domain = '';
            this.hostOnly = false;
            this.path = '';
            this.secure = false;
            this.httpOnly = false;
            this.session = false;
            this.expirationDate = 0;
            this.storeId = '';
        }
    })(CookieThing.Models || (CookieThing.Models = {}))
    var Models = CookieThing.Models;
})(CookieThing || (CookieThing = {}));