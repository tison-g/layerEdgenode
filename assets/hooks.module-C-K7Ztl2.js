function m_(e) {
    var _, t, n = "";
    if (typeof e == "string" || typeof e == "number")
        n += e;
    else if (typeof e == "object")
        if (Array.isArray(e))
            for (_ = 0; _ < e.length; _++)
                e[_] && (t = m_(e[_])) && (n && (n += " "),
                n += t);
        else
            for (_ in e)
                e[_] && (n && (n += " "),
                n += _);
    return n
}
function o_() {
    for (var e, _, t = 0, n = ""; t < arguments.length; )
        (e = arguments[t++]) && (_ = m_(e)) && (n && (n += " "),
        n += _);
    return n
}
const ne = Object.freeze(Object.defineProperty({
    __proto__: null,
    clsx: o_,
    default: o_
}, Symbol.toStringTag, {
    value: "Module"
}));
var L, m, y_, g_, H, u_, b_, k_, $_, Y, G, J, w_, F = {}, C_ = [], j_ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, W = Array.isArray;
function w(e, _) {
    for (var t in _)
        e[t] = _[t];
    return e
}
function Z(e) {
    e && e.parentNode && e.parentNode.removeChild(e)
}
function K(e, _, t) {
    var n, u, r, i = {};
    for (r in _)
        r == "key" ? n = _[r] : r == "ref" ? u = _[r] : i[r] = _[r];
    if (arguments.length > 2 && (i.children = arguments.length > 3 ? L.call(arguments, 2) : t),
    typeof e == "function" && e.defaultProps != null)
        for (r in e.defaultProps)
            i[r] === void 0 && (i[r] = e.defaultProps[r]);
    return A(e, i, n, u, null)
}
function A(e, _, t, n, u) {
    var r = {
        type: e,
        props: _,
        key: t,
        ref: n,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __c: null,
        constructor: void 0,
        __v: u ?? ++y_,
        __i: -1,
        __u: 0
    };
    return u == null && m.vnode != null && m.vnode(r),
    r
}
function O_() {
    return {
        current: null
    }
}
function j(e) {
    return e.children
}
function M(e, _) {
    this.props = e,
    this.context = _
}
function P(e, _) {
    if (_ == null)
        return e.__ ? P(e.__, e.__i + 1) : null;
    for (var t; _ < e.__k.length; _++)
        if ((t = e.__k[_]) != null && t.__e != null)
            return t.__e;
    return typeof e.type == "function" ? P(e) : null
}
function x_(e) {
    var _, t;
    if ((e = e.__) != null && e.__c != null) {
        for (e.__e = e.__c.base = null,
        _ = 0; _ < e.__k.length; _++)
            if ((t = e.__k[_]) != null && t.__e != null) {
                e.__e = e.__c.base = t.__e;
                break
            }
        return x_(e)
    }
}
function Q(e) {
    (!e.__d && (e.__d = !0) && H.push(e) && !z.__r++ || u_ !== m.debounceRendering) && ((u_ = m.debounceRendering) || b_)(z)
}
function z() {
    for (var e, _, t, n, u, r, i, c = 1; H.length; )
        H.length > c && H.sort(k_),
        e = H.shift(),
        c = H.length,
        e.__d && (t = void 0,
        u = (n = (_ = e).__v).__e,
        r = [],
        i = [],
        _.__P && ((t = w({}, n)).__v = n.__v + 1,
        m.vnode && m.vnode(t),
        __(_.__P, t, n, _.__n, _.__P.namespaceURI, 32 & n.__u ? [u] : null, r, u ?? P(n), !!(32 & n.__u), i),
        t.__v = n.__v,
        t.__.__k[t.__i] = t,
        E_(r, t, i),
        t.__e != u && x_(t)));
    z.__r = 0
}
function H_(e, _, t, n, u, r, i, c, f, l, a) {
    var o, p, s, g, k, b, d = n && n.__k || C_, v = _.length;
    for (f = I_(t, _, d, f, v),
    o = 0; o < v; o++)
        (s = t.__k[o]) != null && (p = s.__i === -1 ? F : d[s.__i] || F,
        s.__i = o,
        b = __(e, s, p, u, r, i, c, f, l, a),
        g = s.__e,
        s.ref && p.ref != s.ref && (p.ref && e_(p.ref, null, s),
        a.push(s.ref, s.__c || g, s)),
        k == null && g != null && (k = g),
        4 & s.__u || p.__k === s.__k ? f = S_(s, f, e) : typeof s.type == "function" && b !== void 0 ? f = b : g && (f = g.nextSibling),
        s.__u &= -7);
    return t.__e = k,
    f
}
function I_(e, _, t, n, u) {
    var r, i, c, f, l, a = t.length, o = a, p = 0;
    for (e.__k = new Array(u),
    r = 0; r < u; r++)
        (i = _[r]) != null && typeof i != "boolean" && typeof i != "function" ? (f = r + p,
        (i = e.__k[r] = typeof i == "string" || typeof i == "number" || typeof i == "bigint" || i.constructor == String ? A(null, i, null, null, null) : W(i) ? A(j, {
            children: i
        }, null, null, null) : i.constructor === void 0 && i.__b > 0 ? A(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i).__ = e,
        i.__b = e.__b + 1,
        c = null,
        (l = i.__i = R_(i, t, f, o)) !== -1 && (o--,
        (c = t[l]) && (c.__u |= 2)),
        c == null || c.__v === null ? (l == -1 && (u > a ? p-- : u < a && p++),
        typeof i.type != "function" && (i.__u |= 4)) : l != f && (l == f - 1 ? p-- : l == f + 1 ? p++ : (l > f ? p-- : p++,
        i.__u |= 4))) : e.__k[r] = null;
    if (o)
        for (r = 0; r < a; r++)
            (c = t[r]) != null && !(2 & c.__u) && (c.__e == n && (n = P(c)),
            U_(c, c));
    return n
}
function S_(e, _, t) {
    var n, u;
    if (typeof e.type == "function") {
        for (n = e.__k,
        u = 0; n && u < n.length; u++)
            n[u] && (n[u].__ = e,
            _ = S_(n[u], _, t));
        return _
    }
    e.__e != _ && (_ && e.type && !t.contains(_) && (_ = P(e)),
    t.insertBefore(e.__e, _ || null),
    _ = e.__e);
    do
        _ = _ && _.nextSibling;
    while (_ != null && _.nodeType == 8);
    return _
}
function P_(e, _) {
    return _ = _ || [],
    e == null || typeof e == "boolean" || (W(e) ? e.some(function(t) {
        P_(t, _)
    }) : _.push(e)),
    _
}
function R_(e, _, t, n) {
    var u, r, i = e.key, c = e.type, f = _[t];
    if (f === null && e.key == null || f && i == f.key && c === f.type && !(2 & f.__u))
        return t;
    if (n > (f != null && !(2 & f.__u) ? 1 : 0))
        for (u = t - 1,
        r = t + 1; u >= 0 || r < _.length; ) {
            if (u >= 0) {
                if ((f = _[u]) && !(2 & f.__u) && i == f.key && c === f.type)
                    return u;
                u--
            }
            if (r < _.length) {
                if ((f = _[r]) && !(2 & f.__u) && i == f.key && c === f.type)
                    return r;
                r++
            }
        }
    return -1
}
function i_(e, _, t) {
    _[0] == "-" ? e.setProperty(_, t ?? "") : e[_] = t == null ? "" : typeof t != "number" || j_.test(_) ? t : t + "px"
}
function R(e, _, t, n, u) {
    var r;
    _: if (_ == "style")
        if (typeof t == "string")
            e.style.cssText = t;
        else {
            if (typeof n == "string" && (e.style.cssText = n = ""),
            n)
                for (_ in n)
                    t && _ in t || i_(e.style, _, "");
            if (t)
                for (_ in t)
                    n && t[_] === n[_] || i_(e.style, _, t[_])
        }
    else if (_[0] == "o" && _[1] == "n")
        r = _ != (_ = _.replace($_, "$1")),
        _ = _.toLowerCase()in e || _ == "onFocusOut" || _ == "onFocusIn" ? _.toLowerCase().slice(2) : _.slice(2),
        e.l || (e.l = {}),
        e.l[_ + r] = t,
        t ? n ? t.t = n.t : (t.t = Y,
        e.addEventListener(_, r ? J : G, r)) : e.removeEventListener(_, r ? J : G, r);
    else {
        if (u == "http://www.w3.org/2000/svg")
            _ = _.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (_ != "width" && _ != "height" && _ != "href" && _ != "list" && _ != "form" && _ != "tabIndex" && _ != "download" && _ != "rowSpan" && _ != "colSpan" && _ != "role" && _ != "popover" && _ in e)
            try {
                e[_] = t ?? "";
                break _
            } catch {}
        typeof t == "function" || (t == null || t === !1 && _[4] != "-" ? e.removeAttribute(_) : e.setAttribute(_, _ == "popover" && t == 1 ? "" : t))
    }
}
function l_(e) {
    return function(_) {
        if (this.l) {
            var t = this.l[_.type + e];
            if (_.u == null)
                _.u = Y++;
            else if (_.u < t.t)
                return;
            return t(m.event ? m.event(_) : _)
        }
    }
}
function __(e, _, t, n, u, r, i, c, f, l) {
    var a, o, p, s, g, k, b, d, v, T, x, O, U, r_, I, N, B, $ = _.type;
    if (_.constructor !== void 0)
        return null;
    128 & t.__u && (f = !!(32 & t.__u),
    r = [c = _.__e = t.__e]),
    (a = m.__b) && a(_);
    _: if (typeof $ == "function")
        try {
            if (d = _.props,
            v = "prototype"in $ && $.prototype.render,
            T = (a = $.contextType) && n[a.__c],
            x = a ? T ? T.props.value : a.__ : n,
            t.__c ? b = (o = _.__c = t.__c).__ = o.__E : (v ? _.__c = o = new $(d,x) : (_.__c = o = new M(d,x),
            o.constructor = $,
            o.render = z_),
            T && T.sub(o),
            o.props = d,
            o.state || (o.state = {}),
            o.context = x,
            o.__n = n,
            p = o.__d = !0,
            o.__h = [],
            o._sb = []),
            v && o.__s == null && (o.__s = o.state),
            v && $.getDerivedStateFromProps != null && (o.__s == o.state && (o.__s = w({}, o.__s)),
            w(o.__s, $.getDerivedStateFromProps(d, o.__s))),
            s = o.props,
            g = o.state,
            o.__v = _,
            p)
                v && $.getDerivedStateFromProps == null && o.componentWillMount != null && o.componentWillMount(),
                v && o.componentDidMount != null && o.__h.push(o.componentDidMount);
            else {
                if (v && $.getDerivedStateFromProps == null && d !== s && o.componentWillReceiveProps != null && o.componentWillReceiveProps(d, x),
                !o.__e && (o.shouldComponentUpdate != null && o.shouldComponentUpdate(d, o.__s, x) === !1 || _.__v == t.__v)) {
                    for (_.__v != t.__v && (o.props = d,
                    o.state = o.__s,
                    o.__d = !1),
                    _.__e = t.__e,
                    _.__k = t.__k,
                    _.__k.some(function(D) {
                        D && (D.__ = _)
                    }),
                    O = 0; O < o._sb.length; O++)
                        o.__h.push(o._sb[O]);
                    o._sb = [],
                    o.__h.length && i.push(o);
                    break _
                }
                o.componentWillUpdate != null && o.componentWillUpdate(d, o.__s, x),
                v && o.componentDidUpdate != null && o.__h.push(function() {
                    o.componentDidUpdate(s, g, k)
                })
            }
            if (o.context = x,
            o.props = d,
            o.__P = e,
            o.__e = !1,
            U = m.__r,
            r_ = 0,
            v) {
                for (o.state = o.__s,
                o.__d = !1,
                U && U(_),
                a = o.render(o.props, o.state, o.context),
                I = 0; I < o._sb.length; I++)
                    o.__h.push(o._sb[I]);
                o._sb = []
            } else
                do
                    o.__d = !1,
                    U && U(_),
                    a = o.render(o.props, o.state, o.context),
                    o.state = o.__s;
                while (o.__d && ++r_ < 25);
            o.state = o.__s,
            o.getChildContext != null && (n = w(w({}, n), o.getChildContext())),
            v && !p && o.getSnapshotBeforeUpdate != null && (k = o.getSnapshotBeforeUpdate(s, g)),
            N = a,
            a != null && a.type === j && a.key == null && (N = T_(a.props.children)),
            c = H_(e, W(N) ? N : [N], _, t, n, u, r, i, c, f, l),
            o.base = _.__e,
            _.__u &= -161,
            o.__h.length && i.push(o),
            b && (o.__E = o.__ = null)
        } catch (D) {
            if (_.__v = null,
            f || r != null)
                if (D.then) {
                    for (_.__u |= f ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; )
                        c = c.nextSibling;
                    r[r.indexOf(c)] = null,
                    _.__e = c
                } else
                    for (B = r.length; B--; )
                        Z(r[B]);
            else
                _.__e = t.__e,
                _.__k = t.__k;
            m.__e(D, _, t)
        }
    else
        r == null && _.__v == t.__v ? (_.__k = t.__k,
        _.__e = t.__e) : c = _.__e = q_(t.__e, _, t, n, u, r, i, f, l);
    return (a = m.diffed) && a(_),
    128 & _.__u ? void 0 : c
}
function E_(e, _, t) {
    for (var n = 0; n < t.length; n++)
        e_(t[n], t[++n], t[++n]);
    m.__c && m.__c(_, e),
    e.some(function(u) {
        try {
            e = u.__h,
            u.__h = [],
            e.some(function(r) {
                r.call(u)
            })
        } catch (r) {
            m.__e(r, u.__v)
        }
    })
}
function T_(e) {
    return typeof e != "object" || e == null ? e : W(e) ? e.map(T_) : w({}, e)
}
function q_(e, _, t, n, u, r, i, c, f) {
    var l, a, o, p, s, g, k, b = t.props, d = _.props, v = _.type;
    if (v == "svg" ? u = "http://www.w3.org/2000/svg" : v == "math" ? u = "http://www.w3.org/1998/Math/MathML" : u || (u = "http://www.w3.org/1999/xhtml"),
    r != null) {
        for (l = 0; l < r.length; l++)
            if ((s = r[l]) && "setAttribute"in s == !!v && (v ? s.localName == v : s.nodeType == 3)) {
                e = s,
                r[l] = null;
                break
            }
    }
    if (e == null) {
        if (v == null)
            return document.createTextNode(d);
        e = document.createElementNS(u, v, d.is && d),
        c && (m.__m && m.__m(_, r),
        c = !1),
        r = null
    }
    if (v === null)
        b === d || c && e.data === d || (e.data = d);
    else {
        if (r = r && L.call(e.childNodes),
        b = t.props || F,
        !c && r != null)
            for (b = {},
            l = 0; l < e.attributes.length; l++)
                b[(s = e.attributes[l]).name] = s.value;
        for (l in b)
            if (s = b[l],
            l != "children") {
                if (l == "dangerouslySetInnerHTML")
                    o = s;
                else if (!(l in d)) {
                    if (l == "value" && "defaultValue"in d || l == "checked" && "defaultChecked"in d)
                        continue;
                    R(e, l, null, s, u)
                }
            }
        for (l in d)
            s = d[l],
            l == "children" ? p = s : l == "dangerouslySetInnerHTML" ? a = s : l == "value" ? g = s : l == "checked" ? k = s : c && typeof s != "function" || b[l] === s || R(e, l, s, b[l], u);
        if (a)
            c || o && (a.__html === o.__html || a.__html === e.innerHTML) || (e.innerHTML = a.__html),
            _.__k = [];
        else if (o && (e.innerHTML = ""),
        H_(_.type === "template" ? e.content : e, W(p) ? p : [p], _, t, n, v == "foreignObject" ? "http://www.w3.org/1999/xhtml" : u, r, i, r ? r[0] : t.__k && P(t, 0), c, f),
        r != null)
            for (l = r.length; l--; )
                Z(r[l]);
        c || (l = "value",
        v == "progress" && g == null ? e.removeAttribute("value") : g !== void 0 && (g !== e[l] || v == "progress" && !g || v == "option" && g !== b[l]) && R(e, l, g, b[l], u),
        l = "checked",
        k !== void 0 && k !== e[l] && R(e, l, k, b[l], u))
    }
    return e
}
function e_(e, _, t) {
    try {
        if (typeof e == "function") {
            var n = typeof e.__u == "function";
            n && e.__u(),
            n && _ == null || (e.__u = e(_))
        } else
            e.current = _
    } catch (u) {
        m.__e(u, t)
    }
}
function U_(e, _, t) {
    var n, u;
    if (m.unmount && m.unmount(e),
    (n = e.ref) && (n.current && n.current !== e.__e || e_(n, null, _)),
    (n = e.__c) != null) {
        if (n.componentWillUnmount)
            try {
                n.componentWillUnmount()
            } catch (r) {
                m.__e(r, _)
            }
        n.base = n.__P = null
    }
    if (n = e.__k)
        for (u = 0; u < n.length; u++)
            n[u] && U_(n[u], _, t || typeof e.type != "function");
    t || Z(e.__e),
    e.__c = e.__ = e.__e = void 0
}
function z_(e, _, t) {
    return this.constructor(e, t)
}
function N_(e, _, t) {
    var n, u, r, i;
    _ == document && (_ = document.documentElement),
    m.__ && m.__(e, _),
    u = (n = typeof t == "function") ? null : t && t.__k || _.__k,
    r = [],
    i = [],
    __(_, e = (!n && t || _).__k = K(j, null, [e]), u || F, F, _.namespaceURI, !n && t ? [t] : u ? null : _.firstChild ? L.call(_.childNodes) : null, r, !n && t ? t : u ? u.__e : _.firstChild, n, i),
    E_(r, e, i)
}
function D_(e, _) {
    N_(e, _, D_)
}
function B_(e, _, t) {
    var n, u, r, i, c = w({}, e.props);
    for (r in e.type && e.type.defaultProps && (i = e.type.defaultProps),
    _)
        r == "key" ? n = _[r] : r == "ref" ? u = _[r] : c[r] = _[r] === void 0 && i !== void 0 ? i[r] : _[r];
    return arguments.length > 2 && (c.children = arguments.length > 3 ? L.call(arguments, 2) : t),
    A(e.type, c, n || e.key, u || e.ref, null)
}
function V_(e) {
    function _(t) {
        var n, u;
        return this.getChildContext || (n = new Set,
        (u = {})[_.__c] = this,
        this.getChildContext = function() {
            return u
        }
        ,
        this.componentWillUnmount = function() {
            n = null
        }
        ,
        this.shouldComponentUpdate = function(r) {
            this.props.value !== r.value && n.forEach(function(i) {
                i.__e = !0,
                Q(i)
            })
        }
        ,
        this.sub = function(r) {
            n.add(r);
            var i = r.componentWillUnmount;
            r.componentWillUnmount = function() {
                n && n.delete(r),
                i && i.call(r)
            }
        }
        ),
        t.children
    }
    return _.__c = "__cC" + w_++,
    _.__ = e,
    _.Provider = _.__l = (_.Consumer = function(t, n) {
        return t.children(n)
    }
    ).contextType = _,
    _
}
L = C_.slice,
m = {
    __e: function(e, _, t, n) {
        for (var u, r, i; _ = _.__; )
            if ((u = _.__c) && !u.__)
                try {
                    if ((r = u.constructor) && r.getDerivedStateFromError != null && (u.setState(r.getDerivedStateFromError(e)),
                    i = u.__d),
                    u.componentDidCatch != null && (u.componentDidCatch(e, n || {}),
                    i = u.__d),
                    i)
                        return u.__E = u
                } catch (c) {
                    e = c
                }
        throw e
    }
},
y_ = 0,
g_ = function(e) {
    return e != null && e.constructor == null
}
,
M.prototype.setState = function(e, _) {
    var t;
    t = this.__s != null && this.__s !== this.state ? this.__s : this.__s = w({}, this.state),
    typeof e == "function" && (e = e(w({}, t), this.props)),
    e && w(t, e),
    e != null && this.__v && (_ && this._sb.push(_),
    Q(this))
}
,
M.prototype.forceUpdate = function(e) {
    this.__v && (this.__e = !0,
    e && this.__h.push(e),
    Q(this))
}
,
M.prototype.render = j,
H = [],
b_ = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout,
k_ = function(e, _) {
    return e.__v.__b - _.__v.__b
}
,
z.__r = 0,
$_ = /(PointerCapture)$|Capture$/i,
Y = 0,
G = l_(!1),
J = l_(!0),
w_ = 0;
const re = Object.freeze(Object.defineProperty({
    __proto__: null,
    Component: M,
    Fragment: j,
    cloneElement: B_,
    createContext: V_,
    createElement: K,
    createRef: O_,
    h: K,
    hydrate: D_,
    get isValidElement() {
        return g_
    },
    get options() {
        return m
    },
    render: N_,
    toChildArray: P_
}, Symbol.toStringTag, {
    value: "Module"
}));
var C, h, V, c_, E = 0, A_ = [], y = m, f_ = y.__b, s_ = y.__r, a_ = y.diffed, p_ = y.__c, h_ = y.unmount, d_ = y.__;
function S(e, _) {
    y.__h && y.__h(h, e, E || _),
    E = 0;
    var t = h.__H || (h.__H = {
        __: [],
        __h: []
    });
    return e >= t.__.length && t.__.push({}),
    t.__[e]
}
function M_(e) {
    return E = 1,
    F_(W_, e)
}
function F_(e, _, t) {
    var n = S(C++, 2);
    if (n.t = e,
    !n.__c && (n.__ = [t ? t(_) : W_(void 0, _), function(c) {
        var f = n.__N ? n.__N[0] : n.__[0]
          , l = n.t(f, c);
        f !== l && (n.__N = [l, n.__[1]],
        n.__c.setState({}))
    }
    ],
    n.__c = h,
    !h.__f)) {
        var u = function(c, f, l) {
            if (!n.__c.__H)
                return !0;
            var a = n.__c.__H.__.filter(function(p) {
                return !!p.__c
            });
            if (a.every(function(p) {
                return !p.__N
            }))
                return !r || r.call(this, c, f, l);
            var o = n.__c.props !== c;
            return a.forEach(function(p) {
                if (p.__N) {
                    var s = p.__[0];
                    p.__ = p.__N,
                    p.__N = void 0,
                    s !== p.__[0] && (o = !0)
                }
            }),
            r && r.call(this, c, f, l) || o
        };
        h.__f = !0;
        var r = h.shouldComponentUpdate
          , i = h.componentWillUpdate;
        h.componentWillUpdate = function(c, f, l) {
            if (this.__e) {
                var a = r;
                r = void 0,
                u(c, f, l),
                r = a
            }
            i && i.call(this, c, f, l)
        }
        ,
        h.shouldComponentUpdate = u
    }
    return n.__N || n.__
}
function G_(e, _) {
    var t = S(C++, 3);
    !y.__s && n_(t.__H, _) && (t.__ = e,
    t.u = _,
    h.__H.__h.push(t))
}
function L_(e, _) {
    var t = S(C++, 4);
    !y.__s && n_(t.__H, _) && (t.__ = e,
    t.u = _,
    h.__h.push(t))
}
function J_(e) {
    return E = 5,
    t_(function() {
        return {
            current: e
        }
    }, [])
}
function K_(e, _, t) {
    E = 6,
    L_(function() {
        if (typeof e == "function") {
            var n = e(_());
            return function() {
                e(null),
                n && typeof n == "function" && n()
            }
        }
        if (e)
            return e.current = _(),
            function() {
                return e.current = null
            }
    }, t == null ? t : t.concat(e))
}
function t_(e, _) {
    var t = S(C++, 7);
    return n_(t.__H, _) && (t.__ = e(),
    t.__H = _,
    t.__h = e),
    t.__
}
function Q_(e, _) {
    return E = 8,
    t_(function() {
        return e
    }, _)
}
function X_(e) {
    var _ = h.context[e.__c]
      , t = S(C++, 9);
    return t.c = e,
    _ ? (t.__ == null && (t.__ = !0,
    _.sub(h)),
    _.props.value) : e.__
}
function Y_(e, _) {
    y.useDebugValue && y.useDebugValue(_ ? _(e) : e)
}
function Z_(e) {
    var _ = S(C++, 10)
      , t = M_();
    return _.__ = e,
    h.componentDidCatch || (h.componentDidCatch = function(n, u) {
        _.__ && _.__(n, u),
        t[1](n)
    }
    ),
    [t[0], function() {
        t[1](void 0)
    }
    ]
}
function _e() {
    var e = S(C++, 11);
    if (!e.__) {
        for (var _ = h.__v; _ !== null && !_.__m && _.__ !== null; )
            _ = _.__;
        var t = _.__m || (_.__m = [0, 0]);
        e.__ = "P" + t[0] + "-" + t[1]++
    }
    return e.__
}
function ee() {
    for (var e; e = A_.shift(); )
        if (e.__P && e.__H)
            try {
                e.__H.__h.forEach(q),
                e.__H.__h.forEach(X),
                e.__H.__h = []
            } catch (_) {
                e.__H.__h = [],
                y.__e(_, e.__v)
            }
}
y.__b = function(e) {
    h = null,
    f_ && f_(e)
}
,
y.__ = function(e, _) {
    e && _.__k && _.__k.__m && (e.__m = _.__k.__m),
    d_ && d_(e, _)
}
,
y.__r = function(e) {
    s_ && s_(e),
    C = 0;
    var _ = (h = e.__c).__H;
    _ && (V === h ? (_.__h = [],
    h.__h = [],
    _.__.forEach(function(t) {
        t.__N && (t.__ = t.__N),
        t.u = t.__N = void 0
    })) : (_.__h.forEach(q),
    _.__h.forEach(X),
    _.__h = [],
    C = 0)),
    V = h
}
,
y.diffed = function(e) {
    a_ && a_(e);
    var _ = e.__c;
    _ && _.__H && (_.__H.__h.length && (A_.push(_) !== 1 && c_ === y.requestAnimationFrame || ((c_ = y.requestAnimationFrame) || te)(ee)),
    _.__H.__.forEach(function(t) {
        t.u && (t.__H = t.u),
        t.u = void 0
    })),
    V = h = null
}
,
y.__c = function(e, _) {
    _.some(function(t) {
        try {
            t.__h.forEach(q),
            t.__h = t.__h.filter(function(n) {
                return !n.__ || X(n)
            })
        } catch (n) {
            _.some(function(u) {
                u.__h && (u.__h = [])
            }),
            _ = [],
            y.__e(n, t.__v)
        }
    }),
    p_ && p_(e, _)
}
,
y.unmount = function(e) {
    h_ && h_(e);
    var _, t = e.__c;
    t && t.__H && (t.__H.__.forEach(function(n) {
        try {
            q(n)
        } catch (u) {
            _ = u
        }
    }),
    t.__H = void 0,
    _ && y.__e(_, t.__v))
}
;
var v_ = typeof requestAnimationFrame == "function";
function te(e) {
    var _, t = function() {
        clearTimeout(n),
        v_ && cancelAnimationFrame(_),
        setTimeout(e)
    }, n = setTimeout(t, 100);
    v_ && (_ = requestAnimationFrame(t))
}
function q(e) {
    var _ = h
      , t = e.__c;
    typeof t == "function" && (e.__c = void 0,
    t()),
    h = _
}
function X(e) {
    var _ = h;
    e.__c = e.__(),
    h = _
}
function n_(e, _) {
    return !e || e.length !== _.length || _.some(function(t, n) {
        return t !== e[n]
    })
}
function W_(e, _) {
    return typeof _ == "function" ? _(e) : _
}
const oe = Object.freeze(Object.defineProperty({
    __proto__: null,
    useCallback: Q_,
    useContext: X_,
    useDebugValue: Y_,
    useEffect: G_,
    useErrorBoundary: Z_,
    useId: _e,
    useImperativeHandle: K_,
    useLayoutEffect: L_,
    useMemo: t_,
    useReducer: F_,
    useRef: J_,
    useState: M_
}, Symbol.toStringTag, {
    value: "Module"
}));
export {N_ as E, K as _, ne as a, o_ as c, M_ as d, oe as h, re as p, G_ as y};
