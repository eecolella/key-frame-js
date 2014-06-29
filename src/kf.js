window.kf = (function (document, undefined) {

    return ({
        _init: function () {
            this.template = {};
            this.support = this._testSupport();
            this._head = document.head || document.getElementsByTagName('head')[0];

            return this;
        },
        create: function (kf) {

            if (this.support) {

                var name = kf.name,
                    css = '';

                delete kf.name;

                for (var key in kf) {
                    css += key + '{';
                    for (var prop in kf[key])
                        css += prop + ':' + kf[key][prop] + ';';
                    css += '}';
                }

                if (document.getElementById(name))
                    this.remove(name);

                this._createStyle('@keyframes ' + name + '{' + css + '}@-webkit-keyframes ' + name + '{' + css + '}', name);

                return this;
            }
            else {
                return false;
            }
        },
        remove: function (name) {
            this._head.removeChild(document.getElementById(name));
            return this;
        },
        _createStyle: function (css, id) {

            var style = document.createElement('style');

            style.type = 'text/css';
            style.id = id;

            if (style.styleSheet)
                style.styleSheet.cssText = css;
            else
                style.appendChild(document.createTextNode(css));

            this._head.appendChild(style);

        },
        _testSupport: function () {
            var b = document.body || document.documentElement,
                s = b.style,
                p = 'transition';

            if (typeof s[p] == 'string')
                return true;

            var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
            p = p.charAt(0).toUpperCase() + p.substr(1);

            for (var i = 0; i < v.length; i++)
                if (typeof s[v[i] + p] == 'string')
                    return true;

            return false;
        }
    })._init();

})(document);










































