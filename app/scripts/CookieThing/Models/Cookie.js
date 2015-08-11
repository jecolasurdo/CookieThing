var CookieThing;
(function (CookieThing) {
    (function (Models) {
        Models.DefaultCookie = {
            name: "",
            value: "",
            domain: "",
            hostOnly: false,
            path: "",
            secure: false,
            httpOnly: false,
            session: false,
            expirationDate: 0,
            storeId: ""
        }

        Models.Cookie = function (rawCookie) {
            if (rawCookie) {
                this.name = rawCookie.name;
                this.value = rawCookie.value;
                this.domain = rawCookie.domain;
                this.hostOnly = rawCookie.hostOnly;
                this.path = rawCookie.path;
                this.secure = rawCookie.secure;
                this.httpOnly = rawCookie.httpOnly;
                this.session = rawCookie.session;
                this.expirationDate = rawCookie.expirationDate;
                this.storeId = rawCookie.storeId;
            } else {
                return CookieThing.DefaultCookie;
            }
        }
    })(CookieThing.Models || (CookieThing.Models = {}))
    var Models = CookieThing.Models;
})(CookieThing || (CookieThing = {}));