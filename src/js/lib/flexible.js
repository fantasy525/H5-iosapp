(function (d, g) {
    function m() {
        var k = h.getBoundingClientRect().width;
        k /= 10;
        h.style.fontSize = k + "px";
        l.rem = d.rem = k
    }

    var c = d.document, h = c.documentElement, e = c.querySelector('meta[name="viewport"]'),
        f = c.querySelector('meta[name="flexible"]'), a = 0, b = 0, n, l = g.flexible || (g.flexible = {});
    if (e) {
        if (console.warn("\u5c06\u6839\u636e\u5df2\u6709\u7684meta\u6807\u7b7e\u6765\u8bbe\u7f6e\u7f29\u653e\u6bd4\u4f8b"), g = e.getAttribute("content").match(/initial\-scale=([\d\.]+)/)) b = parseFloat(g[1]), a = parseInt(1 / b)
    } else f && (f = f.getAttribute("content")) && (g = f.match(/initial\-dpr=([\d\.]+)/), f = f.match(/maximum\-dpr=([\d\.]+)/), g && (a = parseFloat(g[1]), b = parseFloat((1 / a).toFixed(2))), f && (a = parseFloat(f[1]), b = parseFloat((1 / a).toFixed(2))));
    a || b || (d.navigator.appVersion.match(/android/gi), d.navigator.appVersion.match(/iphone/gi), b = d.devicePixelRatio, a = 3 <= b && (!a || 3 <= a) ? 3 : 2 <= b && (!a || 2 <= a) ? 2 : 1, b = 1 / a);
    h.setAttribute("data-dpr", a);
    e || (e = c.createElement("meta"), e.setAttribute("name", "viewport"), e.setAttribute("content", "initial-scale=" + b + ", maximum-scale=" + b + ", minimum-scale=" + b + ", user-scalable=no"), h.firstElementChild ? h.firstElementChild.appendChild(e) : (b = c.createElement("div"), b.appendChild(e), c.write(b.innerHTML)));
    d.addEventListener("resize", function () {
        clearTimeout(n);
        n = setTimeout(m, 300)
    }, !1);
    d.addEventListener("pageshow", function (a) {
        a.persisted && (clearTimeout(n), n = setTimeout(m, 300))
    }, !1);
    "complete" === c.readyState ? c.body.style.fontSize = 12 * a + "px" : c.addEventListener("DOMContentLoaded", function (b) {
        c.body.style.fontSize = 12 * a + "px"
    }, !1);
    m();
    l.dpr = d.dpr = a;
    l.refreshRem = m;
    l.rem2px = function (a) {
        var b = parseFloat(a) * this.rem;
        "string" === typeof a && a.match(/rem$/) && (b += "px");
        return b
    };
    l.px2rem = function (a) {
        var b = parseFloat(a) / this.rem;
        "string" === typeof a && a.match(/px$/) && (b += "rem");
        return b
    }
})(window, window.lib || (window.lib = {}));