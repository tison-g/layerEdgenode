import {a as lt, g as Le} from "./phaser-BO2-Y8fT.js";
import {T as ut, V as ht, W as ft} from "./vendor-CVc5wRpe.js";
import {E as se, _ as g, c as B, d as pe, y as pt} from "./hooks.module-C-K7Ztl2.js";
class _ {
    constructor(e, n) {
        this.scope = e,
        this.module = n
    }
    storeObject(e, n) {
        this.setItem(e, JSON.stringify(n))
    }
    loadObject(e) {
        const n = this.getItem(e);
        return n ? JSON.parse(n) : void 0
    }
    setItem(e, n) {
        localStorage.setItem(this.scopedKey(e), n)
    }
    getItem(e) {
        return localStorage.getItem(this.scopedKey(e))
    }
    removeItem(e) {
        localStorage.removeItem(this.scopedKey(e))
    }
    clear() {
        const e = this.scopedKey("")
          , n = [];
        for (let s = 0; s < localStorage.length; s++) {
            const i = localStorage.key(s);
            typeof i == "string" && i.startsWith(e) && n.push(i)
        }
        n.forEach(s => localStorage.removeItem(s))
    }
    scopedKey(e) {
        return `-${this.scope}${this.module ? `:${this.module}` : ""}:${e}`
    }
    static clearAll() {
        new _("CBWSDK").clear(),
        new _("walletlink").clear()
    }
}
const b = {
    rpc: {
        invalidInput: -32e3,
        resourceNotFound: -32001,
        resourceUnavailable: -32002,
        transactionRejected: -32003,
        methodNotSupported: -32004,
        limitExceeded: -32005,
        parse: -32700,
        invalidRequest: -32600,
        methodNotFound: -32601,
        invalidParams: -32602,
        internal: -32603
    },
    provider: {
        userRejectedRequest: 4001,
        unauthorized: 4100,
        unsupportedMethod: 4200,
        disconnected: 4900,
        chainDisconnected: 4901,
        unsupportedChain: 4902
    }
}
  , ie = {
    "-32700": {
        standard: "JSON RPC 2.0",
        message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
    },
    "-32600": {
        standard: "JSON RPC 2.0",
        message: "The JSON sent is not a valid Request object."
    },
    "-32601": {
        standard: "JSON RPC 2.0",
        message: "The method does not exist / is not available."
    },
    "-32602": {
        standard: "JSON RPC 2.0",
        message: "Invalid method parameter(s)."
    },
    "-32603": {
        standard: "JSON RPC 2.0",
        message: "Internal JSON-RPC error."
    },
    "-32000": {
        standard: "EIP-1474",
        message: "Invalid input."
    },
    "-32001": {
        standard: "EIP-1474",
        message: "Resource not found."
    },
    "-32002": {
        standard: "EIP-1474",
        message: "Resource unavailable."
    },
    "-32003": {
        standard: "EIP-1474",
        message: "Transaction rejected."
    },
    "-32004": {
        standard: "EIP-1474",
        message: "Method not supported."
    },
    "-32005": {
        standard: "EIP-1474",
        message: "Request limit exceeded."
    },
    4001: {
        standard: "EIP-1193",
        message: "User rejected the request."
    },
    4100: {
        standard: "EIP-1193",
        message: "The requested account and/or method has not been authorized by the user."
    },
    4200: {
        standard: "EIP-1193",
        message: "The requested method is not supported by this Ethereum provider."
    },
    4900: {
        standard: "EIP-1193",
        message: "The provider is disconnected from all chains."
    },
    4901: {
        standard: "EIP-1193",
        message: "The provider is disconnected from the specified chain."
    },
    4902: {
        standard: "EIP-3085",
        message: "Unrecognized chain ID."
    }
}
  , Te = "Unspecified error message."
  , gt = "Unspecified server error.";
function ce(t, e=Te) {
    if (t && Number.isInteger(t)) {
        const n = t.toString();
        if (re(ie, n))
            return ie[n].message;
        if (Ne(t))
            return gt
    }
    return e
}
function mt(t) {
    if (!Number.isInteger(t))
        return !1;
    const e = t.toString();
    return !!(ie[e] || Ne(t))
}
function wt(t, {shouldIncludeStack: e=!1}={}) {
    const n = {};
    if (t && typeof t == "object" && !Array.isArray(t) && re(t, "code") && mt(t.code)) {
        const s = t;
        n.code = s.code,
        s.message && typeof s.message == "string" ? (n.message = s.message,
        re(s, "data") && (n.data = s.data)) : (n.message = ce(n.code),
        n.data = {
            originalError: ge(t)
        })
    } else
        n.code = b.rpc.internal,
        n.message = me(t, "message") ? t.message : Te,
        n.data = {
            originalError: ge(t)
        };
    return e && (n.stack = me(t, "stack") ? t.stack : void 0),
    n
}
function Ne(t) {
    return t >= -32099 && t <= -32e3
}
function ge(t) {
    return t && typeof t == "object" && !Array.isArray(t) ? Object.assign({}, t) : t
}
function re(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
}
function me(t, e) {
    return typeof t == "object" && t !== null && e in t && typeof t[e] == "string"
}
const p = {
    rpc: {
        parse: t => E(b.rpc.parse, t),
        invalidRequest: t => E(b.rpc.invalidRequest, t),
        invalidParams: t => E(b.rpc.invalidParams, t),
        methodNotFound: t => E(b.rpc.methodNotFound, t),
        internal: t => E(b.rpc.internal, t),
        server: t => {
            if (!t || typeof t != "object" || Array.isArray(t))
                throw new Error("Ethereum RPC Server errors must provide single object argument.");
            const {code: e} = t;
            if (!Number.isInteger(e) || e > -32005 || e < -32099)
                throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
            return E(e, t)
        }
        ,
        invalidInput: t => E(b.rpc.invalidInput, t),
        resourceNotFound: t => E(b.rpc.resourceNotFound, t),
        resourceUnavailable: t => E(b.rpc.resourceUnavailable, t),
        transactionRejected: t => E(b.rpc.transactionRejected, t),
        methodNotSupported: t => E(b.rpc.methodNotSupported, t),
        limitExceeded: t => E(b.rpc.limitExceeded, t)
    },
    provider: {
        userRejectedRequest: t => j(b.provider.userRejectedRequest, t),
        unauthorized: t => j(b.provider.unauthorized, t),
        unsupportedMethod: t => j(b.provider.unsupportedMethod, t),
        disconnected: t => j(b.provider.disconnected, t),
        chainDisconnected: t => j(b.provider.chainDisconnected, t),
        unsupportedChain: t => j(b.provider.unsupportedChain, t),
        custom: t => {
            if (!t || typeof t != "object" || Array.isArray(t))
                throw new Error("Ethereum Provider custom errors must provide single object argument.");
            const {code: e, message: n, data: s} = t;
            if (!n || typeof n != "string")
                throw new Error('"message" must be a nonempty string');
            return new je(e,n,s)
        }
    }
};
function E(t, e) {
    const [n,s] = De(e);
    return new Oe(t,n || ce(t),s)
}
function j(t, e) {
    const [n,s] = De(e);
    return new je(t,n || ce(t),s)
}
function De(t) {
    if (t) {
        if (typeof t == "string")
            return [t];
        if (typeof t == "object" && !Array.isArray(t)) {
            const {message: e, data: n} = t;
            if (e && typeof e != "string")
                throw new Error("Must specify string message.");
            return [e || void 0, n]
        }
    }
    return []
}
class Oe extends Error {
    constructor(e, n, s) {
        if (!Number.isInteger(e))
            throw new Error('"code" must be an integer.');
        if (!n || typeof n != "string")
            throw new Error('"message" must be a nonempty string.');
        super(n),
        this.code = e,
        s !== void 0 && (this.data = s)
    }
}
class je extends Oe {
    constructor(e, n, s) {
        if (!bt(e))
            throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        super(e, n, s)
    }
}
function bt(t) {
    return Number.isInteger(t) && t >= 1e3 && t <= 4999
}
function de() {
    return t => t
}
const G = de()
  , yt = de()
  , vt = de();
function x(t) {
    return Math.floor(t)
}
const Ue = /^[0-9]*$/
  , We = /^[a-f0-9]*$/;
function D(t) {
    return le(crypto.getRandomValues(new Uint8Array(t)))
}
function le(t) {
    return [...t].map(e => e.toString(16).padStart(2, "0")).join("")
}
function J(t) {
    return new Uint8Array(t.match(/.{1,2}/g).map(e => Number.parseInt(e, 16)))
}
function z(t, e=!1) {
    const n = t.toString("hex");
    return G(e ? `0x${n}` : n)
}
function Z(t) {
    return z(ae(t), !0)
}
function S(t) {
    return vt(t.toString(10))
}
function T(t) {
    return G(`0x${BigInt(t).toString(16)}`)
}
function Ke(t) {
    return t.startsWith("0x") || t.startsWith("0X")
}
function ue(t) {
    return Ke(t) ? t.slice(2) : t
}
function qe(t) {
    return Ke(t) ? `0x${t.slice(2)}` : `0x${t}`
}
function V(t) {
    if (typeof t != "string")
        return !1;
    const e = ue(t).toLowerCase();
    return We.test(e)
}
function kt(t, e=!1) {
    if (typeof t == "string") {
        const n = ue(t).toLowerCase();
        if (We.test(n))
            return G(e ? `0x${n}` : n)
    }
    throw p.rpc.invalidParams(`"${String(t)}" is not a hexadecimal string`)
}
function he(t, e=!1) {
    let n = kt(t, !1);
    return n.length % 2 === 1 && (n = G(`0${n}`)),
    e ? G(`0x${n}`) : n
}
function L(t) {
    if (typeof t == "string") {
        const e = ue(t).toLowerCase();
        if (V(e) && e.length === 40)
            return yt(qe(e))
    }
    throw p.rpc.invalidParams(`Invalid Ethereum address: ${String(t)}`)
}
function ae(t) {
    if (Buffer.isBuffer(t))
        return t;
    if (typeof t == "string") {
        if (V(t)) {
            const e = he(t, !1);
            return Buffer.from(e, "hex")
        }
        return Buffer.from(t, "utf8")
    }
    throw p.rpc.invalidParams(`Not binary data: ${String(t)}`)
}
function F(t) {
    if (typeof t == "number" && Number.isInteger(t))
        return x(t);
    if (typeof t == "string") {
        if (Ue.test(t))
            return x(Number(t));
        if (V(t))
            return x(Number(BigInt(he(t, !0))))
    }
    throw p.rpc.invalidParams(`Not an integer: ${String(t)}`)
}
function q(t) {
    if (t !== null && (typeof t == "bigint" || It(t)))
        return BigInt(t.toString(10));
    if (typeof t == "number")
        return BigInt(F(t));
    if (typeof t == "string") {
        if (Ue.test(t))
            return BigInt(t);
        if (V(t))
            return BigInt(he(t, !0))
    }
    throw p.rpc.invalidParams(`Not an integer: ${String(t)}`)
}
function Et(t) {
    if (typeof t == "string")
        return JSON.parse(t);
    if (typeof t == "object")
        return t;
    throw p.rpc.invalidParams(`Not a JSON string or an object: ${String(t)}`)
}
function It(t) {
    if (t == null || typeof t.constructor != "function")
        return !1;
    const {constructor: e} = t;
    return typeof e.config == "function" && typeof e.EUCLID == "number"
}
async function St() {
    return crypto.subtle.generateKey({
        name: "ECDH",
        namedCurve: "P-256"
    }, !0, ["deriveKey"])
}
async function Ct(t, e) {
    return crypto.subtle.deriveKey({
        name: "ECDH",
        public: e
    }, t, {
        name: "AES-GCM",
        length: 256
    }, !1, ["encrypt", "decrypt"])
}
async function _t(t, e) {
    const n = crypto.getRandomValues(new Uint8Array(12))
      , s = await crypto.subtle.encrypt({
        name: "AES-GCM",
        iv: n
    }, t, new TextEncoder().encode(e));
    return {
        iv: n,
        cipherText: s
    }
}
async function At(t, {iv: e, cipherText: n}) {
    const s = await crypto.subtle.decrypt({
        name: "AES-GCM",
        iv: e
    }, t, n);
    return new TextDecoder().decode(s)
}
function Be(t) {
    switch (t) {
    case "public":
        return "spki";
    case "private":
        return "pkcs8"
    }
}
async function ze(t, e) {
    const n = Be(t)
      , s = await crypto.subtle.exportKey(n, e);
    return le(new Uint8Array(s))
}
async function Fe(t, e) {
    const n = Be(t)
      , s = J(e).buffer;
    return await crypto.subtle.importKey(n, new Uint8Array(s), {
        name: "ECDH",
        namedCurve: "P-256"
    }, !0, t === "private" ? ["deriveKey"] : [])
}
async function xt(t, e) {
    const n = JSON.stringify(t, (s, i) => {
        if (!(i instanceof Error))
            return i;
        const r = i;
        return Object.assign(Object.assign({}, r.code ? {
            code: r.code
        } : {}), {
            message: r.message
        })
    }
    );
    return _t(e, n)
}
async function Mt(t, e) {
    return JSON.parse(await At(e, t))
}
const X = {
    storageKey: "ownPrivateKey",
    keyType: "private"
}
  , ee = {
    storageKey: "ownPublicKey",
    keyType: "public"
}
  , te = {
    storageKey: "peerPublicKey",
    keyType: "public"
};
class Pt {
    constructor() {
        this.storage = new _("CBWSDK","SCWKeyManager"),
        this.ownPrivateKey = null,
        this.ownPublicKey = null,
        this.peerPublicKey = null,
        this.sharedSecret = null
    }
    async getOwnPublicKey() {
        return await this.loadKeysIfNeeded(),
        this.ownPublicKey
    }
    async getSharedSecret() {
        return await this.loadKeysIfNeeded(),
        this.sharedSecret
    }
    async setPeerPublicKey(e) {
        this.sharedSecret = null,
        this.peerPublicKey = e,
        await this.storeKey(te, e),
        await this.loadKeysIfNeeded()
    }
    async clear() {
        this.ownPrivateKey = null,
        this.ownPublicKey = null,
        this.peerPublicKey = null,
        this.sharedSecret = null,
        this.storage.removeItem(ee.storageKey),
        this.storage.removeItem(X.storageKey),
        this.storage.removeItem(te.storageKey)
    }
    async generateKeyPair() {
        const e = await St();
        this.ownPrivateKey = e.privateKey,
        this.ownPublicKey = e.publicKey,
        await this.storeKey(X, e.privateKey),
        await this.storeKey(ee, e.publicKey)
    }
    async loadKeysIfNeeded() {
        if (this.ownPrivateKey === null && (this.ownPrivateKey = await this.loadKey(X)),
        this.ownPublicKey === null && (this.ownPublicKey = await this.loadKey(ee)),
        (this.ownPrivateKey === null || this.ownPublicKey === null) && await this.generateKeyPair(),
        this.peerPublicKey === null && (this.peerPublicKey = await this.loadKey(te)),
        this.sharedSecret === null) {
            if (this.ownPrivateKey === null || this.peerPublicKey === null)
                return;
            this.sharedSecret = await Ct(this.ownPrivateKey, this.peerPublicKey)
        }
    }
    async loadKey(e) {
        const n = this.storage.getItem(e.storageKey);
        return n ? Fe(e.keyType, n) : null
    }
    async storeKey(e, n) {
        const s = await ze(e.keyType, n);
        this.storage.setItem(e.storageKey, s)
    }
}
const $ = "4.3.0"
  , He = "@coinbase/wallet-sdk";
async function fe(t, e) {
    const n = Object.assign(Object.assign({}, t), {
        jsonrpc: "2.0",
        id: crypto.randomUUID()
    })
      , s = await window.fetch(e, {
        method: "POST",
        body: JSON.stringify(n),
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "X-Cbw-Sdk-Version": $,
            "X-Cbw-Sdk-Platform": He
        }
    })
      , {result: i, error: r} = await s.json();
    if (r)
        throw r;
    return i
}
function Rt() {
    return globalThis.coinbaseWalletExtension
}
function Lt() {
    var t, e;
    try {
        const n = globalThis;
        return (t = n.ethereum) !== null && t !== void 0 ? t : (e = n.top) === null || e === void 0 ? void 0 : e.ethereum
    } catch {
        return
    }
}
function Tt({metadata: t, preference: e}) {
    var n, s;
    const {appName: i, appLogoUrl: r, appChainIds: a} = t;
    if (e.options !== "smartWalletOnly") {
        const c = Rt();
        if (c)
            return (n = c.setAppInfo) === null || n === void 0 || n.call(c, i, r, a, e),
            c
    }
    const o = Lt();
    if (o?.isCoinbaseBrowser)
        return (s = o.setAppInfo) === null || s === void 0 || s.call(o, i, r, a, e),
        o
}
function Nt(t) {
    if (!t || typeof t != "object" || Array.isArray(t))
        throw p.rpc.invalidParams({
            message: "Expected a single, non-array, object argument.",
            data: t
        });
    const {method: e, params: n} = t;
    if (typeof e != "string" || e.length === 0)
        throw p.rpc.invalidParams({
            message: "'args.method' must be a non-empty string.",
            data: t
        });
    if (n !== void 0 && !Array.isArray(n) && (typeof n != "object" || n === null))
        throw p.rpc.invalidParams({
            message: "'args.params' must be an object or array if provided.",
            data: t
        });
    switch (e) {
    case "eth_sign":
    case "eth_signTypedData_v2":
    case "eth_subscribe":
    case "eth_unsubscribe":
        throw p.provider.unsupportedMethod()
    }
}
const we = "accounts"
  , be = "activeChain"
  , ye = "availableChains"
  , ve = "walletCapabilities";
class Dt {
    constructor(e) {
        var n, s, i;
        this.metadata = e.metadata,
        this.communicator = e.communicator,
        this.callback = e.callback,
        this.keyManager = new Pt,
        this.storage = new _("CBWSDK","SCWStateManager"),
        this.accounts = (n = this.storage.loadObject(we)) !== null && n !== void 0 ? n : [],
        this.chain = this.storage.loadObject(be) || {
            id: (i = (s = e.metadata.appChainIds) === null || s === void 0 ? void 0 : s[0]) !== null && i !== void 0 ? i : 1
        },
        this.handshake = this.handshake.bind(this),
        this.request = this.request.bind(this),
        this.createRequestMessage = this.createRequestMessage.bind(this),
        this.decryptResponseMessage = this.decryptResponseMessage.bind(this)
    }
    async handshake(e) {
        var n, s, i, r;
        await ((s = (n = this.communicator).waitForPopupLoaded) === null || s === void 0 ? void 0 : s.call(n));
        const a = await this.createRequestMessage({
            handshake: {
                method: e.method,
                params: Object.assign({}, this.metadata, (i = e.params) !== null && i !== void 0 ? i : {})
            }
        })
          , o = await this.communicator.postRequestAndWaitForResponse(a);
        if ("failure"in o.content)
            throw o.content.failure;
        const c = await Fe("public", o.sender);
        await this.keyManager.setPeerPublicKey(c);
        const u = (await this.decryptResponseMessage(o)).result;
        if ("error"in u)
            throw u.error;
        switch (e.method) {
        case "eth_requestAccounts":
            {
                const l = u.value;
                this.accounts = l,
                this.storage.storeObject(we, l),
                (r = this.callback) === null || r === void 0 || r.call(this, "accountsChanged", l);
                break
            }
        }
    }
    async request(e) {
        var n;
        if (this.accounts.length === 0)
            switch (e.method) {
            case "wallet_sendCalls":
                return this.sendRequestToPopup(e);
            default:
                throw p.provider.unauthorized()
            }
        switch (e.method) {
        case "eth_requestAccounts":
            return (n = this.callback) === null || n === void 0 || n.call(this, "connect", {
                chainId: T(this.chain.id)
            }),
            this.accounts;
        case "eth_accounts":
            return this.accounts;
        case "eth_coinbase":
            return this.accounts[0];
        case "net_version":
            return this.chain.id;
        case "eth_chainId":
            return T(this.chain.id);
        case "wallet_getCapabilities":
            return this.storage.loadObject(ve);
        case "wallet_switchEthereumChain":
            return this.handleSwitchChainRequest(e);
        case "eth_ecRecover":
        case "personal_sign":
        case "wallet_sign":
        case "personal_ecRecover":
        case "eth_signTransaction":
        case "eth_sendTransaction":
        case "eth_signTypedData_v1":
        case "eth_signTypedData_v3":
        case "eth_signTypedData_v4":
        case "eth_signTypedData":
        case "wallet_addEthereumChain":
        case "wallet_watchAsset":
        case "wallet_sendCalls":
        case "wallet_showCallsStatus":
        case "wallet_grantPermissions":
            return this.sendRequestToPopup(e);
        default:
            if (!this.chain.rpcUrl)
                throw p.rpc.internal("No RPC URL set for chain");
            return fe(e, this.chain.rpcUrl)
        }
    }
    async sendRequestToPopup(e) {
        var n, s;
        await ((s = (n = this.communicator).waitForPopupLoaded) === null || s === void 0 ? void 0 : s.call(n));
        const i = await this.sendEncryptedRequest(e)
          , a = (await this.decryptResponseMessage(i)).result;
        if ("error"in a)
            throw a.error;
        return a.value
    }
    async cleanup() {
        var e, n;
        this.storage.clear(),
        await this.keyManager.clear(),
        this.accounts = [],
        this.chain = {
            id: (n = (e = this.metadata.appChainIds) === null || e === void 0 ? void 0 : e[0]) !== null && n !== void 0 ? n : 1
        }
    }
    async handleSwitchChainRequest(e) {
        var n;
        const s = e.params;
        if (!s || !(!((n = s[0]) === null || n === void 0) && n.chainId))
            throw p.rpc.invalidParams();
        const i = F(s[0].chainId);
        if (this.updateChain(i))
            return null;
        const a = await this.sendRequestToPopup(e);
        return a === null && this.updateChain(i),
        a
    }
    async sendEncryptedRequest(e) {
        const n = await this.keyManager.getSharedSecret();
        if (!n)
            throw p.provider.unauthorized("No valid session found, try requestAccounts before other methods");
        const s = await xt({
            action: e,
            chainId: this.chain.id
        }, n)
          , i = await this.createRequestMessage({
            encrypted: s
        });
        return this.communicator.postRequestAndWaitForResponse(i)
    }
    async createRequestMessage(e) {
        const n = await ze("public", await this.keyManager.getOwnPublicKey());
        return {
            id: crypto.randomUUID(),
            sender: n,
            content: e,
            timestamp: new Date
        }
    }
    async decryptResponseMessage(e) {
        var n, s;
        const i = e.content;
        if ("failure"in i)
            throw i.failure;
        const r = await this.keyManager.getSharedSecret();
        if (!r)
            throw p.provider.unauthorized("Invalid session");
        const a = await Mt(i.encrypted, r)
          , o = (n = a.data) === null || n === void 0 ? void 0 : n.chains;
        if (o) {
            const d = Object.entries(o).map( ([u,l]) => ({
                id: Number(u),
                rpcUrl: l
            }));
            this.storage.storeObject(ye, d),
            this.updateChain(this.chain.id, d)
        }
        const c = (s = a.data) === null || s === void 0 ? void 0 : s.capabilities;
        return c && this.storage.storeObject(ve, c),
        a
    }
    updateChain(e, n) {
        var s;
        const i = n ?? this.storage.loadObject(ye)
          , r = i?.find(a => a.id === e);
        return r ? (r !== this.chain && (this.chain = r,
        this.storage.storeObject(be, r),
        (s = this.callback) === null || s === void 0 || s.call(this, "chainChanged", T(r.id))),
        !0) : !1
    }
}
const Ot = lt(ut)
  , {keccak_256: jt} = Ot;
function Ge(t) {
    return Buffer.allocUnsafe(t).fill(0)
}
function Ut(t) {
    return t.toString(2).length
}
function $e(t, e) {
    let n = t.toString(16);
    n.length % 2 !== 0 && (n = "0" + n);
    const s = n.match(/.{1,2}/g).map(i => parseInt(i, 16));
    for (; s.length < e; )
        s.unshift(0);
    return Buffer.from(s)
}
function Wt(t, e) {
    const n = t < 0n;
    let s;
    if (n) {
        const i = (1n << BigInt(e)) - 1n;
        s = (~t & i) + 1n
    } else
        s = t;
    return s &= (1n << BigInt(e)) - 1n,
    s
}
function Ye(t, e, n) {
    const s = Ge(e);
    return t = Q(t),
    n ? t.length < e ? (t.copy(s),
    s) : t.slice(0, e) : t.length < e ? (t.copy(s, e - t.length),
    s) : t.slice(-e)
}
function Kt(t, e) {
    return Ye(t, e, !0)
}
function Q(t) {
    if (!Buffer.isBuffer(t))
        if (Array.isArray(t))
            t = Buffer.from(t);
        else if (typeof t == "string")
            Je(t) ? t = Buffer.from(zt(Ve(t)), "hex") : t = Buffer.from(t);
        else if (typeof t == "number")
            t = intToBuffer(t);
        else if (t == null)
            t = Buffer.allocUnsafe(0);
        else if (typeof t == "bigint")
            t = $e(t);
        else if (t.toArray)
            t = Buffer.from(t.toArray());
        else
            throw new Error("invalid type");
    return t
}
function qt(t) {
    return t = Q(t),
    "0x" + t.toString("hex")
}
function Bt(t, e) {
    if (t = Q(t),
    e || (e = 256),
    e !== 256)
        throw new Error("unsupported");
    return Buffer.from(jt(new Uint8Array(t)))
}
function zt(t) {
    return t.length % 2 ? "0" + t : t
}
function Je(t) {
    return typeof t == "string" && t.match(/^0x[0-9A-Fa-f]*$/)
}
function Ve(t) {
    return typeof t == "string" && t.startsWith("0x") ? t.slice(2) : t
}
var Qe = {
    zeros: Ge,
    setLength: Ye,
    setLengthRight: Kt,
    isHexString: Je,
    stripHexPrefix: Ve,
    toBuffer: Q,
    bufferToHex: qt,
    keccak: Bt,
    bitLengthFromBigInt: Ut,
    bufferBEFromBigInt: $e,
    twosFromBigInt: Wt
};
const k = Qe;
function Ze(t) {
    return t.startsWith("int[") ? "int256" + t.slice(3) : t === "int" ? "int256" : t.startsWith("uint[") ? "uint256" + t.slice(4) : t === "uint" ? "uint256" : t.startsWith("fixed[") ? "fixed128x128" + t.slice(5) : t === "fixed" ? "fixed128x128" : t.startsWith("ufixed[") ? "ufixed128x128" + t.slice(6) : t === "ufixed" ? "ufixed128x128" : t
}
function U(t) {
    return Number.parseInt(/^\D+(\d+)$/.exec(t)[1], 10)
}
function ke(t) {
    var e = /^\D+(\d+)x(\d+)$/.exec(t);
    return [Number.parseInt(e[1], 10), Number.parseInt(e[2], 10)]
}
function Xe(t) {
    var e = t.match(/(.*)\[(.*?)\]$/);
    return e ? e[2] === "" ? "dynamic" : Number.parseInt(e[2], 10) : null
}
function O(t) {
    var e = typeof t;
    if (e === "string" || e === "number")
        return BigInt(t);
    if (e === "bigint")
        return t;
    throw new Error("Argument is not a number")
}
function C(t, e) {
    var n, s, i, r;
    if (t === "address")
        return C("uint160", O(e));
    if (t === "bool")
        return C("uint8", e ? 1 : 0);
    if (t === "string")
        return C("bytes", new Buffer(e,"utf8"));
    if (Ht(t)) {
        if (typeof e.length > "u")
            throw new Error("Not an array?");
        if (n = Xe(t),
        n !== "dynamic" && n !== 0 && e.length > n)
            throw new Error("Elements exceed array size: " + n);
        i = [],
        t = t.slice(0, t.lastIndexOf("[")),
        typeof e == "string" && (e = JSON.parse(e));
        for (r in e)
            i.push(C(t, e[r]));
        if (n === "dynamic") {
            var a = C("uint256", e.length);
            i.unshift(a)
        }
        return Buffer.concat(i)
    } else {
        if (t === "bytes")
            return e = new Buffer(e),
            i = Buffer.concat([C("uint256", e.length), e]),
            e.length % 32 !== 0 && (i = Buffer.concat([i, k.zeros(32 - e.length % 32)])),
            i;
        if (t.startsWith("bytes")) {
            if (n = U(t),
            n < 1 || n > 32)
                throw new Error("Invalid bytes<N> width: " + n);
            return k.setLengthRight(e, 32)
        } else if (t.startsWith("uint")) {
            if (n = U(t),
            n % 8 || n < 8 || n > 256)
                throw new Error("Invalid uint<N> width: " + n);
            s = O(e);
            const o = k.bitLengthFromBigInt(s);
            if (o > n)
                throw new Error("Supplied uint exceeds width: " + n + " vs " + o);
            if (s < 0)
                throw new Error("Supplied uint is negative");
            return k.bufferBEFromBigInt(s, 32)
        } else if (t.startsWith("int")) {
            if (n = U(t),
            n % 8 || n < 8 || n > 256)
                throw new Error("Invalid int<N> width: " + n);
            s = O(e);
            const o = k.bitLengthFromBigInt(s);
            if (o > n)
                throw new Error("Supplied int exceeds width: " + n + " vs " + o);
            const c = k.twosFromBigInt(s, 256);
            return k.bufferBEFromBigInt(c, 32)
        } else if (t.startsWith("ufixed")) {
            if (n = ke(t),
            s = O(e),
            s < 0)
                throw new Error("Supplied ufixed is negative");
            return C("uint256", s * BigInt(2) ** BigInt(n[1]))
        } else if (t.startsWith("fixed"))
            return n = ke(t),
            C("int256", O(e) * BigInt(2) ** BigInt(n[1]))
    }
    throw new Error("Unsupported or invalid type: " + t)
}
function Ft(t) {
    return t === "string" || t === "bytes" || Xe(t) === "dynamic"
}
function Ht(t) {
    return t.lastIndexOf("]") === t.length - 1
}
function Gt(t, e) {
    var n = []
      , s = []
      , i = 32 * t.length;
    for (var r in t) {
        var a = Ze(t[r])
          , o = e[r]
          , c = C(a, o);
        Ft(a) ? (n.push(C("uint256", i)),
        s.push(c),
        i += c.length) : n.push(c)
    }
    return Buffer.concat(n.concat(s))
}
function et(t, e) {
    if (t.length !== e.length)
        throw new Error("Number of types are not matching the values");
    for (var n, s, i = [], r = 0; r < t.length; r++) {
        var a = Ze(t[r])
          , o = e[r];
        if (a === "bytes")
            i.push(o);
        else if (a === "string")
            i.push(new Buffer(o,"utf8"));
        else if (a === "bool")
            i.push(new Buffer(o ? "01" : "00","hex"));
        else if (a === "address")
            i.push(k.setLength(o, 20));
        else if (a.startsWith("bytes")) {
            if (n = U(a),
            n < 1 || n > 32)
                throw new Error("Invalid bytes<N> width: " + n);
            i.push(k.setLengthRight(o, n))
        } else if (a.startsWith("uint")) {
            if (n = U(a),
            n % 8 || n < 8 || n > 256)
                throw new Error("Invalid uint<N> width: " + n);
            s = O(o);
            const c = k.bitLengthFromBigInt(s);
            if (c > n)
                throw new Error("Supplied uint exceeds width: " + n + " vs " + c);
            i.push(k.bufferBEFromBigInt(s, n / 8))
        } else if (a.startsWith("int")) {
            if (n = U(a),
            n % 8 || n < 8 || n > 256)
                throw new Error("Invalid int<N> width: " + n);
            s = O(o);
            const c = k.bitLengthFromBigInt(s);
            if (c > n)
                throw new Error("Supplied int exceeds width: " + n + " vs " + c);
            const d = k.twosFromBigInt(s, n);
            i.push(k.bufferBEFromBigInt(d, n / 8))
        } else
            throw new Error("Unsupported or invalid type: " + a)
    }
    return Buffer.concat(i)
}
function $t(t, e) {
    return k.keccak(et(t, e))
}
var Yt = {
    rawEncode: Gt,
    solidityPack: et,
    soliditySHA3: $t
};
const I = Qe
  , H = Yt
  , tt = {
    type: "object",
    properties: {
        types: {
            type: "object",
            additionalProperties: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        type: {
                            type: "string"
                        }
                    },
                    required: ["name", "type"]
                }
            }
        },
        primaryType: {
            type: "string"
        },
        domain: {
            type: "object"
        },
        message: {
            type: "object"
        }
    },
    required: ["types", "primaryType", "domain", "message"]
}
  , ne = {
    encodeData(t, e, n, s=!0) {
        const i = ["bytes32"]
          , r = [this.hashType(t, n)];
        if (s) {
            const a = (o, c, d) => {
                if (n[c] !== void 0)
                    return ["bytes32", d == null ? "0x0000000000000000000000000000000000000000000000000000000000000000" : I.keccak(this.encodeData(c, d, n, s))];
                if (d === void 0)
                    throw new Error(`missing value for field ${o} of type ${c}`);
                if (c === "bytes")
                    return ["bytes32", I.keccak(d)];
                if (c === "string")
                    return typeof d == "string" && (d = Buffer.from(d, "utf8")),
                    ["bytes32", I.keccak(d)];
                if (c.lastIndexOf("]") === c.length - 1) {
                    const u = c.slice(0, c.lastIndexOf("["))
                      , l = d.map(f => a(o, u, f));
                    return ["bytes32", I.keccak(H.rawEncode(l.map( ([f]) => f), l.map( ([,f]) => f)))]
                }
                return [c, d]
            }
            ;
            for (const o of n[t]) {
                const [c,d] = a(o.name, o.type, e[o.name]);
                i.push(c),
                r.push(d)
            }
        } else
            for (const a of n[t]) {
                let o = e[a.name];
                if (o !== void 0)
                    if (a.type === "bytes")
                        i.push("bytes32"),
                        o = I.keccak(o),
                        r.push(o);
                    else if (a.type === "string")
                        i.push("bytes32"),
                        typeof o == "string" && (o = Buffer.from(o, "utf8")),
                        o = I.keccak(o),
                        r.push(o);
                    else if (n[a.type] !== void 0)
                        i.push("bytes32"),
                        o = I.keccak(this.encodeData(a.type, o, n, s)),
                        r.push(o);
                    else {
                        if (a.type.lastIndexOf("]") === a.type.length - 1)
                            throw new Error("Arrays currently unimplemented in encodeData");
                        i.push(a.type),
                        r.push(o)
                    }
            }
        return H.rawEncode(i, r)
    },
    encodeType(t, e) {
        let n = ""
          , s = this.findTypeDependencies(t, e).filter(i => i !== t);
        s = [t].concat(s.sort());
        for (const i of s) {
            if (!e[i])
                throw new Error("No type definition specified: " + i);
            n += i + "(" + e[i].map( ({name: a, type: o}) => o + " " + a).join(",") + ")"
        }
        return n
    },
    findTypeDependencies(t, e, n=[]) {
        if (t = t.match(/^\w*/)[0],
        n.includes(t) || e[t] === void 0)
            return n;
        n.push(t);
        for (const s of e[t])
            for (const i of this.findTypeDependencies(s.type, e, n))
                !n.includes(i) && n.push(i);
        return n
    },
    hashStruct(t, e, n, s=!0) {
        return I.keccak(this.encodeData(t, e, n, s))
    },
    hashType(t, e) {
        return I.keccak(this.encodeType(t, e))
    },
    sanitizeData(t) {
        const e = {};
        for (const n in tt.properties)
            t[n] && (e[n] = t[n]);
        return e.types && (e.types = Object.assign({
            EIP712Domain: []
        }, e.types)),
        e
    },
    hash(t, e=!0) {
        const n = this.sanitizeData(t)
          , s = [Buffer.from("1901", "hex")];
        return s.push(this.hashStruct("EIP712Domain", n.domain, n.types, e)),
        n.primaryType !== "EIP712Domain" && s.push(this.hashStruct(n.primaryType, n.message, n.types, e)),
        I.keccak(Buffer.concat(s))
    }
};
var Jt = {
    TYPED_MESSAGE_SCHEMA: tt,
    TypedDataUtils: ne,
    hashForSignTypedDataLegacy: function(t) {
        return Vt(t.data)
    },
    hashForSignTypedData_v3: function(t) {
        return ne.hash(t.data, !1)
    },
    hashForSignTypedData_v4: function(t) {
        return ne.hash(t.data)
    }
};
function Vt(t) {
    const e = new Error("Expect argument to be non-empty array");
    if (typeof t != "object" || !t.length)
        throw e;
    const n = t.map(function(r) {
        return r.type === "bytes" ? I.toBuffer(r.value) : r.value
    })
      , s = t.map(function(r) {
        return r.type
    })
      , i = t.map(function(r) {
        if (!r.name)
            throw e;
        return r.type + " " + r.name
    });
    return H.soliditySHA3(["bytes32", "bytes32"], [H.soliditySHA3(new Array(t.length).fill("string"), i), H.soliditySHA3(s, n)])
}
const Y = Le(Jt)
  , Qt = "walletUsername"
  , oe = "Addresses"
  , Zt = "AppVersion";
function v(t) {
    return t.errorMessage !== void 0
}
class Xt {
    constructor(e) {
        this.secret = e
    }
    async encrypt(e) {
        const n = this.secret;
        if (n.length !== 64)
            throw Error("secret must be 256 bits");
        const s = crypto.getRandomValues(new Uint8Array(12))
          , i = await crypto.subtle.importKey("raw", J(n), {
            name: "aes-gcm"
        }, !1, ["encrypt", "decrypt"])
          , r = new TextEncoder
          , a = await window.crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: s
        }, i, r.encode(e))
          , o = 16
          , c = a.slice(a.byteLength - o)
          , d = a.slice(0, a.byteLength - o)
          , u = new Uint8Array(c)
          , l = new Uint8Array(d)
          , f = new Uint8Array([...s, ...u, ...l]);
        return le(f)
    }
    async decrypt(e) {
        const n = this.secret;
        if (n.length !== 64)
            throw Error("secret must be 256 bits");
        return new Promise( (s, i) => {
            (async function() {
                const r = await crypto.subtle.importKey("raw", J(n), {
                    name: "aes-gcm"
                }, !1, ["encrypt", "decrypt"])
                  , a = J(e)
                  , o = a.slice(0, 12)
                  , c = a.slice(12, 28)
                  , d = a.slice(28)
                  , u = new Uint8Array([...d, ...c])
                  , l = {
                    name: "AES-GCM",
                    iv: new Uint8Array(o)
                };
                try {
                    const f = await window.crypto.subtle.decrypt(l, r, u)
                      , m = new TextDecoder;
                    s(m.decode(f))
                } catch (f) {
                    i(f)
                }
            }
            )()
        }
        )
    }
}
class en {
    constructor(e, n, s) {
        this.linkAPIUrl = e,
        this.sessionId = n;
        const i = `${n}:${s}`;
        this.auth = `Basic ${btoa(i)}`
    }
    async markUnseenEventsAsSeen(e) {
        return Promise.all(e.map(n => fetch(`${this.linkAPIUrl}/events/${n.eventId}/seen`, {
            method: "POST",
            headers: {
                Authorization: this.auth
            }
        }))).catch(n => console.error("Unabled to mark event as failed:", n))
    }
    async fetchUnseenEvents() {
        var e;
        const n = await fetch(`${this.linkAPIUrl}/events?unseen=true`, {
            headers: {
                Authorization: this.auth
            }
        });
        if (n.ok) {
            const {events: s, error: i} = await n.json();
            if (i)
                throw new Error(`Check unseen events failed: ${i}`);
            const r = (e = s?.filter(a => a.event === "Web3Response").map(a => ({
                type: "Event",
                sessionId: this.sessionId,
                eventId: a.id,
                event: a.event,
                data: a.data
            }))) !== null && e !== void 0 ? e : [];
            return this.markUnseenEventsAsSeen(r),
            r
        }
        throw new Error(`Check unseen events failed: ${n.status}`)
    }
}
var P;
(function(t) {
    t[t.DISCONNECTED = 0] = "DISCONNECTED",
    t[t.CONNECTING = 1] = "CONNECTING",
    t[t.CONNECTED = 2] = "CONNECTED"
}
)(P || (P = {}));
class tn {
    setConnectionStateListener(e) {
        this.connectionStateListener = e
    }
    setIncomingDataListener(e) {
        this.incomingDataListener = e
    }
    constructor(e, n=WebSocket) {
        this.WebSocketClass = n,
        this.webSocket = null,
        this.pendingData = [],
        this.url = e.replace(/^http/, "ws")
    }
    async connect() {
        if (this.webSocket)
            throw new Error("webSocket object is not null");
        return new Promise( (e, n) => {
            var s;
            let i;
            try {
                this.webSocket = i = new this.WebSocketClass(this.url)
            } catch (r) {
                n(r);
                return
            }
            (s = this.connectionStateListener) === null || s === void 0 || s.call(this, P.CONNECTING),
            i.onclose = r => {
                var a;
                this.clearWebSocket(),
                n(new Error(`websocket error ${r.code}: ${r.reason}`)),
                (a = this.connectionStateListener) === null || a === void 0 || a.call(this, P.DISCONNECTED)
            }
            ,
            i.onopen = r => {
                var a;
                e(),
                (a = this.connectionStateListener) === null || a === void 0 || a.call(this, P.CONNECTED),
                this.pendingData.length > 0 && ([...this.pendingData].forEach(c => this.sendData(c)),
                this.pendingData = [])
            }
            ,
            i.onmessage = r => {
                var a, o;
                if (r.data === "h")
                    (a = this.incomingDataListener) === null || a === void 0 || a.call(this, {
                        type: "Heartbeat"
                    });
                else
                    try {
                        const c = JSON.parse(r.data);
                        (o = this.incomingDataListener) === null || o === void 0 || o.call(this, c)
                    } catch {}
            }
        }
        )
    }
    disconnect() {
        var e;
        const {webSocket: n} = this;
        if (n) {
            this.clearWebSocket(),
            (e = this.connectionStateListener) === null || e === void 0 || e.call(this, P.DISCONNECTED),
            this.connectionStateListener = void 0,
            this.incomingDataListener = void 0;
            try {
                n.close()
            } catch {}
        }
    }
    sendData(e) {
        const {webSocket: n} = this;
        if (!n) {
            this.pendingData.push(e),
            this.connect();
            return
        }
        n.send(e)
    }
    clearWebSocket() {
        const {webSocket: e} = this;
        e && (this.webSocket = null,
        e.onclose = null,
        e.onerror = null,
        e.onmessage = null,
        e.onopen = null)
    }
}
const Ee = 1e4
  , nn = 6e4;
class sn {
    constructor({session: e, linkAPIUrl: n, listener: s}) {
        this.destroyed = !1,
        this.lastHeartbeatResponse = 0,
        this.nextReqId = x(1),
        this._connected = !1,
        this._linked = !1,
        this.shouldFetchUnseenEventsOnConnect = !1,
        this.requestResolutions = new Map,
        this.handleSessionMetadataUpdated = r => {
            if (!r)
                return;
            new Map([["__destroyed", this.handleDestroyed], ["EthereumAddress", this.handleAccountUpdated], ["WalletUsername", this.handleWalletUsernameUpdated], ["AppVersion", this.handleAppVersionUpdated], ["ChainId", o => r.JsonRpcUrl && this.handleChainUpdated(o, r.JsonRpcUrl)]]).forEach( (o, c) => {
                const d = r[c];
                d !== void 0 && o(d)
            }
            )
        }
        ,
        this.handleDestroyed = r => {
            var a;
            r === "1" && ((a = this.listener) === null || a === void 0 || a.resetAndReload())
        }
        ,
        this.handleAccountUpdated = async r => {
            var a;
            const o = await this.cipher.decrypt(r);
            (a = this.listener) === null || a === void 0 || a.accountUpdated(o)
        }
        ,
        this.handleMetadataUpdated = async (r, a) => {
            var o;
            const c = await this.cipher.decrypt(a);
            (o = this.listener) === null || o === void 0 || o.metadataUpdated(r, c)
        }
        ,
        this.handleWalletUsernameUpdated = async r => {
            this.handleMetadataUpdated(Qt, r)
        }
        ,
        this.handleAppVersionUpdated = async r => {
            this.handleMetadataUpdated(Zt, r)
        }
        ,
        this.handleChainUpdated = async (r, a) => {
            var o;
            const c = await this.cipher.decrypt(r)
              , d = await this.cipher.decrypt(a);
            (o = this.listener) === null || o === void 0 || o.chainUpdated(c, d)
        }
        ,
        this.session = e,
        this.cipher = new Xt(e.secret),
        this.listener = s;
        const i = new tn(`${n}/rpc`,WebSocket);
        i.setConnectionStateListener(async r => {
            let a = !1;
            switch (r) {
            case P.DISCONNECTED:
                if (!this.destroyed) {
                    const o = async () => {
                        await new Promise(c => setTimeout(c, 5e3)),
                        this.destroyed || i.connect().catch( () => {
                            o()
                        }
                        )
                    }
                    ;
                    o()
                }
                break;
            case P.CONNECTED:
                a = await this.handleConnected(),
                this.updateLastHeartbeat(),
                setInterval( () => {
                    this.heartbeat()
                }
                , Ee),
                this.shouldFetchUnseenEventsOnConnect && this.fetchUnseenEventsAPI();
                break;
            case P.CONNECTING:
                break
            }
            this.connected !== a && (this.connected = a)
        }
        ),
        i.setIncomingDataListener(r => {
            var a;
            switch (r.type) {
            case "Heartbeat":
                this.updateLastHeartbeat();
                return;
            case "IsLinkedOK":
            case "Linked":
                {
                    const o = r.type === "IsLinkedOK" ? r.linked : void 0;
                    this.linked = o || r.onlineGuests > 0;
                    break
                }
            case "GetSessionConfigOK":
            case "SessionConfigUpdated":
                {
                    this.handleSessionMetadataUpdated(r.metadata);
                    break
                }
            case "Event":
                {
                    this.handleIncomingEvent(r);
                    break
                }
            }
            r.id !== void 0 && ((a = this.requestResolutions.get(r.id)) === null || a === void 0 || a(r))
        }
        ),
        this.ws = i,
        this.http = new en(n,e.id,e.key)
    }
    connect() {
        if (this.destroyed)
            throw new Error("instance is destroyed");
        this.ws.connect()
    }
    async destroy() {
        this.destroyed || (await this.makeRequest({
            type: "SetSessionConfig",
            id: x(this.nextReqId++),
            sessionId: this.session.id,
            metadata: {
                __destroyed: "1"
            }
        }, {
            timeout: 1e3
        }),
        this.destroyed = !0,
        this.ws.disconnect(),
        this.listener = void 0)
    }
    get connected() {
        return this._connected
    }
    set connected(e) {
        this._connected = e
    }
    get linked() {
        return this._linked
    }
    set linked(e) {
        var n, s;
        this._linked = e,
        e && ((n = this.onceLinked) === null || n === void 0 || n.call(this)),
        (s = this.listener) === null || s === void 0 || s.linkedUpdated(e)
    }
    setOnceLinked(e) {
        return new Promise(n => {
            this.linked ? e().then(n) : this.onceLinked = () => {
                e().then(n),
                this.onceLinked = void 0
            }
        }
        )
    }
    async handleIncomingEvent(e) {
        var n;
        if (e.type !== "Event" || e.event !== "Web3Response")
            return;
        const s = await this.cipher.decrypt(e.data)
          , i = JSON.parse(s);
        if (i.type !== "WEB3_RESPONSE")
            return;
        const {id: r, response: a} = i;
        (n = this.listener) === null || n === void 0 || n.handleWeb3ResponseMessage(r, a)
    }
    async checkUnseenEvents() {
        if (!this.connected) {
            this.shouldFetchUnseenEventsOnConnect = !0;
            return
        }
        await new Promise(e => setTimeout(e, 250));
        try {
            await this.fetchUnseenEventsAPI()
        } catch (e) {
            console.error("Unable to check for unseen events", e)
        }
    }
    async fetchUnseenEventsAPI() {
        this.shouldFetchUnseenEventsOnConnect = !1,
        (await this.http.fetchUnseenEvents()).forEach(n => this.handleIncomingEvent(n))
    }
    async publishEvent(e, n, s=!1) {
        const i = await this.cipher.encrypt(JSON.stringify(Object.assign(Object.assign({}, n), {
            origin: location.origin,
            location: location.href,
            relaySource: "coinbaseWalletExtension"in window && window.coinbaseWalletExtension ? "injected_sdk" : "sdk"
        })))
          , r = {
            type: "PublishEvent",
            id: x(this.nextReqId++),
            sessionId: this.session.id,
            event: e,
            data: i,
            callWebhook: s
        };
        return this.setOnceLinked(async () => {
            const a = await this.makeRequest(r);
            if (a.type === "Fail")
                throw new Error(a.error || "failed to publish event");
            return a.eventId
        }
        )
    }
    sendData(e) {
        this.ws.sendData(JSON.stringify(e))
    }
    updateLastHeartbeat() {
        this.lastHeartbeatResponse = Date.now()
    }
    heartbeat() {
        if (Date.now() - this.lastHeartbeatResponse > Ee * 2) {
            this.ws.disconnect();
            return
        }
        try {
            this.ws.sendData("h")
        } catch {}
    }
    async makeRequest(e, n={
        timeout: nn
    }) {
        const s = e.id;
        this.sendData(e);
        let i;
        return Promise.race([new Promise( (r, a) => {
            i = window.setTimeout( () => {
                a(new Error(`request ${s} timed out`))
            }
            , n.timeout)
        }
        ), new Promise(r => {
            this.requestResolutions.set(s, a => {
                clearTimeout(i),
                r(a),
                this.requestResolutions.delete(s)
            }
            )
        }
        )])
    }
    async handleConnected() {
        return (await this.makeRequest({
            type: "HostSession",
            id: x(this.nextReqId++),
            sessionId: this.session.id,
            sessionKey: this.session.key
        })).type === "Fail" ? !1 : (this.sendData({
            type: "IsLinked",
            id: x(this.nextReqId++),
            sessionId: this.session.id
        }),
        this.sendData({
            type: "GetSessionConfig",
            id: x(this.nextReqId++),
            sessionId: this.session.id
        }),
        !0)
    }
}
class rn {
    constructor() {
        this._nextRequestId = 0,
        this.callbacks = new Map
    }
    makeRequestId() {
        this._nextRequestId = (this._nextRequestId + 1) % 2147483647;
        const e = this._nextRequestId
          , n = qe(e.toString(16));
        return this.callbacks.get(n) && this.callbacks.delete(n),
        e
    }
}
const Ie = "session:id"
  , Se = "session:secret"
  , Ce = "session:linked";
class W {
    constructor(e, n, s, i=!1) {
        this.storage = e,
        this.id = n,
        this.secret = s,
        this.key = ht(ft(`${n}, ${s} WalletLink`)),
        this._linked = !!i
    }
    static create(e) {
        const n = D(16)
          , s = D(32);
        return new W(e,n,s).save()
    }
    static load(e) {
        const n = e.getItem(Ie)
          , s = e.getItem(Ce)
          , i = e.getItem(Se);
        return n && i ? new W(e,n,i,s === "1") : null
    }
    get linked() {
        return this._linked
    }
    set linked(e) {
        this._linked = e,
        this.persistLinked()
    }
    save() {
        return this.storage.setItem(Ie, this.id),
        this.storage.setItem(Se, this.secret),
        this.persistLinked(),
        this
    }
    persistLinked() {
        this.storage.setItem(Ce, this._linked ? "1" : "0")
    }
}
function an() {
    try {
        return window.frameElement !== null
    } catch {
        return !1
    }
}
function on() {
    try {
        return an() && window.top ? window.top.location : window.location
    } catch {
        return window.location
    }
}
function cn() {
    var t;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test((t = window?.navigator) === null || t === void 0 ? void 0 : t.userAgent)
}
function nt() {
    var t, e;
    return (e = (t = window?.matchMedia) === null || t === void 0 ? void 0 : t.call(window, "(prefers-color-scheme: dark)").matches) !== null && e !== void 0 ? e : !1
}
const dn = '@namespace svg "http://www.w3.org/2000/svg";.-cbwsdk-css-reset,.-cbwsdk-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;counter-increment:none;counter-reset:none;direction:ltr;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;word-spacing:normal;z-index:auto}.-cbwsdk-css-reset strong{font-weight:bold}.-cbwsdk-css-reset *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-cbwsdk-css-reset [class*=container]{margin:0;padding:0}.-cbwsdk-css-reset style{display:none}';
function st() {
    const t = document.createElement("style");
    t.type = "text/css",
    t.appendChild(document.createTextNode(dn)),
    document.documentElement.appendChild(t)
}
const ln = ".-cbwsdk-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-cbwsdk-css-reset .-gear-container *{user-select:none}.-cbwsdk-css-reset .-gear-container svg{opacity:0;position:absolute}.-cbwsdk-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-cbwsdk-css-reset .-cbwsdk-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-cbwsdk-css-reset .-cbwsdk-snackbar *{user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-expanded .-cbwsdk-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}"
  , un = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+"
  , hn = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=";
class fn {
    constructor() {
        this.items = new Map,
        this.nextItemKey = 0,
        this.root = null,
        this.darkMode = nt()
    }
    attach(e) {
        this.root = document.createElement("div"),
        this.root.className = "-cbwsdk-snackbar-root",
        e.appendChild(this.root),
        this.render()
    }
    presentItem(e) {
        const n = this.nextItemKey++;
        return this.items.set(n, e),
        this.render(),
        () => {
            this.items.delete(n),
            this.render()
        }
    }
    clear() {
        this.items.clear(),
        this.render()
    }
    render() {
        this.root && se(g("div", null, g(it, {
            darkMode: this.darkMode
        }, Array.from(this.items.entries()).map( ([e,n]) => g(pn, Object.assign({}, n, {
            key: e
        }))))), this.root)
    }
}
const it = t => g("div", {
    class: B("-cbwsdk-snackbar-container")
}, g("style", null, ln), g("div", {
    class: "-cbwsdk-snackbar"
}, t.children))
  , pn = ({autoExpand: t, message: e, menuItems: n}) => {
    const [s,i] = pe(!0)
      , [r,a] = pe(t ?? !1);
    pt( () => {
        const c = [window.setTimeout( () => {
            i(!1)
        }
        , 1), window.setTimeout( () => {
            a(!0)
        }
        , 1e4)];
        return () => {
            c.forEach(window.clearTimeout)
        }
    }
    );
    const o = () => {
        a(!r)
    }
    ;
    return g("div", {
        class: B("-cbwsdk-snackbar-instance", s && "-cbwsdk-snackbar-instance-hidden", r && "-cbwsdk-snackbar-instance-expanded")
    }, g("div", {
        class: "-cbwsdk-snackbar-instance-header",
        onClick: o
    }, g("img", {
        src: un,
        class: "-cbwsdk-snackbar-instance-header-cblogo"
    }), " ", g("div", {
        class: "-cbwsdk-snackbar-instance-header-message"
    }, e), g("div", {
        class: "-gear-container"
    }, !r && g("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, g("circle", {
        cx: "12",
        cy: "12",
        r: "12",
        fill: "#F5F7F8"
    })), g("img", {
        src: hn,
        class: "-gear-icon",
        title: "Expand"
    }))), n && n.length > 0 && g("div", {
        class: "-cbwsdk-snackbar-instance-menu"
    }, n.map( (c, d) => g("div", {
        class: B("-cbwsdk-snackbar-instance-menu-item", c.isRed && "-cbwsdk-snackbar-instance-menu-item-is-red"),
        onClick: c.onClick,
        key: d
    }, g("svg", {
        width: c.svgWidth,
        height: c.svgHeight,
        viewBox: "0 0 10 11",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, g("path", {
        "fill-rule": c.defaultFillRule,
        "clip-rule": c.defaultClipRule,
        d: c.path,
        fill: "#AAAAAA"
    })), g("span", {
        class: B("-cbwsdk-snackbar-instance-menu-item-info", c.isRed && "-cbwsdk-snackbar-instance-menu-item-info-is-red")
    }, c.info)))))
}
;
class gn {
    constructor() {
        this.attached = !1,
        this.snackbar = new fn
    }
    attach() {
        if (this.attached)
            throw new Error("Coinbase Wallet SDK UI is already attached");
        const e = document.documentElement
          , n = document.createElement("div");
        n.className = "-cbwsdk-css-reset",
        e.appendChild(n),
        this.snackbar.attach(n),
        this.attached = !0,
        st()
    }
    showConnecting(e) {
        let n;
        return e.isUnlinkedErrorState ? n = {
            autoExpand: !0,
            message: "Connection lost",
            menuItems: [{
                isRed: !1,
                info: "Reset connection",
                svgWidth: "10",
                svgHeight: "11",
                path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
                defaultFillRule: "evenodd",
                defaultClipRule: "evenodd",
                onClick: e.onResetConnection
            }]
        } : n = {
            message: "Confirm on phone",
            menuItems: [{
                isRed: !0,
                info: "Cancel transaction",
                svgWidth: "11",
                svgHeight: "11",
                path: "M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z",
                defaultFillRule: "inherit",
                defaultClipRule: "inherit",
                onClick: e.onCancel
            }, {
                isRed: !1,
                info: "Reset connection",
                svgWidth: "10",
                svgHeight: "11",
                path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
                defaultFillRule: "evenodd",
                defaultClipRule: "evenodd",
                onClick: e.onResetConnection
            }]
        },
        this.snackbar.presentItem(n)
    }
}
const mn = ".-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s;background-color:rgba(10,11,13,.5)}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box{display:block;position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);padding:20px;border-radius:8px;background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box p{display:block;font-weight:400;font-size:14px;line-height:20px;padding-bottom:12px;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box button{appearance:none;border:none;background:none;color:#0052ff;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark{background-color:#0a0b0d;color:#fff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark button{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light{background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light button{color:#0052ff}";
class wn {
    constructor() {
        this.root = null,
        this.darkMode = nt()
    }
    attach() {
        const e = document.documentElement;
        this.root = document.createElement("div"),
        this.root.className = "-cbwsdk-css-reset",
        e.appendChild(this.root),
        st()
    }
    present(e) {
        this.render(e)
    }
    clear() {
        this.render(null)
    }
    render(e) {
        this.root && (se(null, this.root),
        e && se(g(bn, Object.assign({}, e, {
            onDismiss: () => {
                this.clear()
            }
            ,
            darkMode: this.darkMode
        })), this.root))
    }
}
const bn = ({title: t, buttonText: e, darkMode: n, onButtonClick: s, onDismiss: i}) => {
    const r = n ? "dark" : "light";
    return g(it, {
        darkMode: n
    }, g("div", {
        class: "-cbwsdk-redirect-dialog"
    }, g("style", null, mn), g("div", {
        class: "-cbwsdk-redirect-dialog-backdrop",
        onClick: i
    }), g("div", {
        class: B("-cbwsdk-redirect-dialog-box", r)
    }, g("p", null, t), g("button", {
        onClick: s
    }, e))))
}
  , yn = "https://keys.coinbase.com/connect"
  , vn = "http://rpc.wallet.coinbase.com"
  , _e = "https://www.walletlink.org"
  , kn = "https://go.cb-w.com/walletlink";
class Ae {
    constructor() {
        this.attached = !1,
        this.redirectDialog = new wn
    }
    attach() {
        if (this.attached)
            throw new Error("Coinbase Wallet SDK UI is already attached");
        this.redirectDialog.attach(),
        this.attached = !0
    }
    redirectToCoinbaseWallet(e) {
        const n = new URL(kn);
        n.searchParams.append("redirect_url", on().href),
        e && n.searchParams.append("wl_url", e);
        const s = document.createElement("a");
        s.target = "cbw-opener",
        s.href = n.href,
        s.rel = "noreferrer noopener",
        s.click()
    }
    openCoinbaseWalletDeeplink(e) {
        this.redirectDialog.present({
            title: "Redirecting to Coinbase Wallet...",
            buttonText: "Open",
            onButtonClick: () => {
                this.redirectToCoinbaseWallet(e)
            }
        }),
        setTimeout( () => {
            this.redirectToCoinbaseWallet(e)
        }
        , 99)
    }
    showConnecting(e) {
        return () => {
            this.redirectDialog.clear()
        }
    }
}
class M {
    constructor(e) {
        this.chainCallbackParams = {
            chainId: "",
            jsonRpcUrl: ""
        },
        this.isMobileWeb = cn(),
        this.linkedUpdated = r => {
            this.isLinked = r;
            const a = this.storage.getItem(oe);
            if (r && (this._session.linked = r),
            this.isUnlinkedErrorState = !1,
            a) {
                const o = a.split(" ")
                  , c = this.storage.getItem("IsStandaloneSigning") === "true";
                o[0] !== "" && !r && this._session.linked && !c && (this.isUnlinkedErrorState = !0)
            }
        }
        ,
        this.metadataUpdated = (r, a) => {
            this.storage.setItem(r, a)
        }
        ,
        this.chainUpdated = (r, a) => {
            this.chainCallbackParams.chainId === r && this.chainCallbackParams.jsonRpcUrl === a || (this.chainCallbackParams = {
                chainId: r,
                jsonRpcUrl: a
            },
            this.chainCallback && this.chainCallback(a, Number.parseInt(r, 10)))
        }
        ,
        this.accountUpdated = r => {
            this.accountsCallback && this.accountsCallback([r]),
            M.accountRequestCallbackIds.size > 0 && (Array.from(M.accountRequestCallbackIds.values()).forEach(a => {
                this.invokeCallback(a, {
                    method: "requestEthereumAccounts",
                    result: [r]
                })
            }
            ),
            M.accountRequestCallbackIds.clear())
        }
        ,
        this.resetAndReload = this.resetAndReload.bind(this),
        this.linkAPIUrl = e.linkAPIUrl,
        this.storage = e.storage,
        this.metadata = e.metadata,
        this.accountsCallback = e.accountsCallback,
        this.chainCallback = e.chainCallback;
        const {session: n, ui: s, connection: i} = this.subscribe();
        this._session = n,
        this.connection = i,
        this.relayEventManager = new rn,
        this.ui = s,
        this.ui.attach()
    }
    subscribe() {
        const e = W.load(this.storage) || W.create(this.storage)
          , {linkAPIUrl: n} = this
          , s = new sn({
            session: e,
            linkAPIUrl: n,
            listener: this
        })
          , i = this.isMobileWeb ? new Ae : new gn;
        return s.connect(),
        {
            session: e,
            ui: i,
            connection: s
        }
    }
    resetAndReload() {
        this.connection.destroy().then( () => {
            const e = W.load(this.storage);
            e?.id === this._session.id && _.clearAll(),
            document.location.reload()
        }
        ).catch(e => {}
        )
    }
    signEthereumTransaction(e) {
        return this.sendRequest({
            method: "signEthereumTransaction",
            params: {
                fromAddress: e.fromAddress,
                toAddress: e.toAddress,
                weiValue: S(e.weiValue),
                data: z(e.data, !0),
                nonce: e.nonce,
                gasPriceInWei: e.gasPriceInWei ? S(e.gasPriceInWei) : null,
                maxFeePerGas: e.gasPriceInWei ? S(e.gasPriceInWei) : null,
                maxPriorityFeePerGas: e.gasPriceInWei ? S(e.gasPriceInWei) : null,
                gasLimit: e.gasLimit ? S(e.gasLimit) : null,
                chainId: e.chainId,
                shouldSubmit: !1
            }
        })
    }
    signAndSubmitEthereumTransaction(e) {
        return this.sendRequest({
            method: "signEthereumTransaction",
            params: {
                fromAddress: e.fromAddress,
                toAddress: e.toAddress,
                weiValue: S(e.weiValue),
                data: z(e.data, !0),
                nonce: e.nonce,
                gasPriceInWei: e.gasPriceInWei ? S(e.gasPriceInWei) : null,
                maxFeePerGas: e.maxFeePerGas ? S(e.maxFeePerGas) : null,
                maxPriorityFeePerGas: e.maxPriorityFeePerGas ? S(e.maxPriorityFeePerGas) : null,
                gasLimit: e.gasLimit ? S(e.gasLimit) : null,
                chainId: e.chainId,
                shouldSubmit: !0
            }
        })
    }
    submitEthereumTransaction(e, n) {
        return this.sendRequest({
            method: "submitEthereumTransaction",
            params: {
                signedTransaction: z(e, !0),
                chainId: n
            }
        })
    }
    getWalletLinkSession() {
        return this._session
    }
    sendRequest(e) {
        let n = null;
        const s = D(8)
          , i = r => {
            this.publishWeb3RequestCanceledEvent(s),
            this.handleErrorResponse(s, e.method, r),
            n?.()
        }
        ;
        return new Promise( (r, a) => {
            n = this.ui.showConnecting({
                isUnlinkedErrorState: this.isUnlinkedErrorState,
                onCancel: i,
                onResetConnection: this.resetAndReload
            }),
            this.relayEventManager.callbacks.set(s, o => {
                if (n?.(),
                v(o))
                    return a(new Error(o.errorMessage));
                r(o)
            }
            ),
            this.publishWeb3RequestEvent(s, e)
        }
        )
    }
    publishWeb3RequestEvent(e, n) {
        const s = {
            type: "WEB3_REQUEST",
            id: e,
            request: n
        };
        this.publishEvent("Web3Request", s, !0).then(i => {}
        ).catch(i => {
            this.handleWeb3ResponseMessage(s.id, {
                method: n.method,
                errorMessage: i.message
            })
        }
        ),
        this.isMobileWeb && this.openCoinbaseWalletDeeplink(n.method)
    }
    openCoinbaseWalletDeeplink(e) {
        if (this.ui instanceof Ae)
            switch (e) {
            case "requestEthereumAccounts":
            case "switchEthereumChain":
                return;
            default:
                window.addEventListener("blur", () => {
                    window.addEventListener("focus", () => {
                        this.connection.checkUnseenEvents()
                    }
                    , {
                        once: !0
                    })
                }
                , {
                    once: !0
                }),
                this.ui.openCoinbaseWalletDeeplink();
                break
            }
    }
    publishWeb3RequestCanceledEvent(e) {
        const n = {
            type: "WEB3_REQUEST_CANCELED",
            id: e
        };
        this.publishEvent("Web3RequestCanceled", n, !1).then()
    }
    publishEvent(e, n, s) {
        return this.connection.publishEvent(e, n, s)
    }
    handleWeb3ResponseMessage(e, n) {
        if (n.method === "requestEthereumAccounts") {
            M.accountRequestCallbackIds.forEach(s => this.invokeCallback(s, n)),
            M.accountRequestCallbackIds.clear();
            return
        }
        this.invokeCallback(e, n)
    }
    handleErrorResponse(e, n, s) {
        var i;
        const r = (i = s?.message) !== null && i !== void 0 ? i : "Unspecified error message.";
        this.handleWeb3ResponseMessage(e, {
            method: n,
            errorMessage: r
        })
    }
    invokeCallback(e, n) {
        const s = this.relayEventManager.callbacks.get(e);
        s && (s(n),
        this.relayEventManager.callbacks.delete(e))
    }
    requestEthereumAccounts() {
        const {appName: e, appLogoUrl: n} = this.metadata
          , s = {
            method: "requestEthereumAccounts",
            params: {
                appName: e,
                appLogoUrl: n
            }
        }
          , i = D(8);
        return new Promise( (r, a) => {
            this.relayEventManager.callbacks.set(i, o => {
                if (v(o))
                    return a(new Error(o.errorMessage));
                r(o)
            }
            ),
            M.accountRequestCallbackIds.add(i),
            this.publishWeb3RequestEvent(i, s)
        }
        )
    }
    watchAsset(e, n, s, i, r, a) {
        const o = {
            method: "watchAsset",
            params: {
                type: e,
                options: {
                    address: n,
                    symbol: s,
                    decimals: i,
                    image: r
                },
                chainId: a
            }
        };
        let c = null;
        const d = D(8)
          , u = l => {
            this.publishWeb3RequestCanceledEvent(d),
            this.handleErrorResponse(d, o.method, l),
            c?.()
        }
        ;
        return c = this.ui.showConnecting({
            isUnlinkedErrorState: this.isUnlinkedErrorState,
            onCancel: u,
            onResetConnection: this.resetAndReload
        }),
        new Promise( (l, f) => {
            this.relayEventManager.callbacks.set(d, m => {
                if (c?.(),
                v(m))
                    return f(new Error(m.errorMessage));
                l(m)
            }
            ),
            this.publishWeb3RequestEvent(d, o)
        }
        )
    }
    addEthereumChain(e, n, s, i, r, a) {
        const o = {
            method: "addEthereumChain",
            params: {
                chainId: e,
                rpcUrls: n,
                blockExplorerUrls: i,
                chainName: r,
                iconUrls: s,
                nativeCurrency: a
            }
        };
        let c = null;
        const d = D(8)
          , u = l => {
            this.publishWeb3RequestCanceledEvent(d),
            this.handleErrorResponse(d, o.method, l),
            c?.()
        }
        ;
        return c = this.ui.showConnecting({
            isUnlinkedErrorState: this.isUnlinkedErrorState,
            onCancel: u,
            onResetConnection: this.resetAndReload
        }),
        new Promise( (l, f) => {
            this.relayEventManager.callbacks.set(d, m => {
                if (c?.(),
                v(m))
                    return f(new Error(m.errorMessage));
                l(m)
            }
            ),
            this.publishWeb3RequestEvent(d, o)
        }
        )
    }
    switchEthereumChain(e, n) {
        const s = {
            method: "switchEthereumChain",
            params: Object.assign({
                chainId: e
            }, {
                address: n
            })
        };
        let i = null;
        const r = D(8)
          , a = o => {
            this.publishWeb3RequestCanceledEvent(r),
            this.handleErrorResponse(r, s.method, o),
            i?.()
        }
        ;
        return i = this.ui.showConnecting({
            isUnlinkedErrorState: this.isUnlinkedErrorState,
            onCancel: a,
            onResetConnection: this.resetAndReload
        }),
        new Promise( (o, c) => {
            this.relayEventManager.callbacks.set(r, d => {
                if (i?.(),
                v(d) && d.errorCode)
                    return c(p.provider.custom({
                        code: d.errorCode,
                        message: "Unrecognized chain ID. Try adding the chain using addEthereumChain first."
                    }));
                if (v(d))
                    return c(new Error(d.errorMessage));
                o(d)
            }
            ),
            this.publishWeb3RequestEvent(r, s)
        }
        )
    }
}
M.accountRequestCallbackIds = new Set;
const xe = "DefaultChainId"
  , Me = "DefaultJsonRpcUrl";
class rt {
    constructor(e) {
        this._relay = null,
        this._addresses = [],
        this.metadata = e.metadata,
        this._storage = new _("walletlink",_e),
        this.callback = e.callback || null;
        const n = this._storage.getItem(oe);
        if (n) {
            const s = n.split(" ");
            s[0] !== "" && (this._addresses = s.map(i => L(i)))
        }
        this.initializeRelay()
    }
    getSession() {
        const e = this.initializeRelay()
          , {id: n, secret: s} = e.getWalletLinkSession();
        return {
            id: n,
            secret: s
        }
    }
    async handshake() {
        await this._eth_requestAccounts()
    }
    get selectedAddress() {
        return this._addresses[0] || void 0
    }
    get jsonRpcUrl() {
        var e;
        return (e = this._storage.getItem(Me)) !== null && e !== void 0 ? e : void 0
    }
    set jsonRpcUrl(e) {
        this._storage.setItem(Me, e)
    }
    updateProviderInfo(e, n) {
        var s;
        this.jsonRpcUrl = e;
        const i = this.getChainId();
        this._storage.setItem(xe, n.toString(10)),
        F(n) !== i && ((s = this.callback) === null || s === void 0 || s.call(this, "chainChanged", T(n)))
    }
    async watchAsset(e) {
        const n = Array.isArray(e) ? e[0] : e;
        if (!n.type)
            throw p.rpc.invalidParams("Type is required");
        if (n?.type !== "ERC20")
            throw p.rpc.invalidParams(`Asset of type '${n.type}' is not supported`);
        if (!n?.options)
            throw p.rpc.invalidParams("Options are required");
        if (!n?.options.address)
            throw p.rpc.invalidParams("Address is required");
        const s = this.getChainId()
          , {address: i, symbol: r, image: a, decimals: o} = n.options
          , d = await this.initializeRelay().watchAsset(n.type, i, r, o, a, s?.toString());
        return v(d) ? !1 : !!d.result
    }
    async addEthereumChain(e) {
        var n, s;
        const i = e[0];
        if (((n = i.rpcUrls) === null || n === void 0 ? void 0 : n.length) === 0)
            throw p.rpc.invalidParams("please pass in at least 1 rpcUrl");
        if (!i.chainName || i.chainName.trim() === "")
            throw p.rpc.invalidParams("chainName is a required field");
        if (!i.nativeCurrency)
            throw p.rpc.invalidParams("nativeCurrency is a required field");
        const r = Number.parseInt(i.chainId, 16);
        if (r === this.getChainId())
            return !1;
        const a = this.initializeRelay()
          , {rpcUrls: o=[], blockExplorerUrls: c=[], chainName: d, iconUrls: u=[], nativeCurrency: l} = i
          , f = await a.addEthereumChain(r.toString(), o, u, c, d, l);
        if (v(f))
            return !1;
        if (((s = f.result) === null || s === void 0 ? void 0 : s.isApproved) === !0)
            return this.updateProviderInfo(o[0], r),
            null;
        throw p.rpc.internal("unable to add ethereum chain")
    }
    async switchEthereumChain(e) {
        const n = e[0]
          , s = Number.parseInt(n.chainId, 16)
          , r = await this.initializeRelay().switchEthereumChain(s.toString(10), this.selectedAddress || void 0);
        if (v(r))
            throw r;
        const a = r.result;
        return a.isApproved && a.rpcUrl.length > 0 && this.updateProviderInfo(a.rpcUrl, s),
        null
    }
    async cleanup() {
        this.callback = null,
        this._relay && this._relay.resetAndReload(),
        this._storage.clear()
    }
    _setAddresses(e, n) {
        var s;
        if (!Array.isArray(e))
            throw new Error("addresses is not an array");
        const i = e.map(r => L(r));
        JSON.stringify(i) !== JSON.stringify(this._addresses) && (this._addresses = i,
        (s = this.callback) === null || s === void 0 || s.call(this, "accountsChanged", i),
        this._storage.setItem(oe, i.join(" ")))
    }
    async request(e) {
        const n = e.params || [];
        switch (e.method) {
        case "eth_accounts":
            return [...this._addresses];
        case "eth_coinbase":
            return this.selectedAddress || null;
        case "net_version":
            return this.getChainId().toString(10);
        case "eth_chainId":
            return T(this.getChainId());
        case "eth_requestAccounts":
            return this._eth_requestAccounts();
        case "eth_ecRecover":
        case "personal_ecRecover":
            return this.ecRecover(e);
        case "personal_sign":
            return this.personalSign(e);
        case "eth_signTransaction":
            return this._eth_signTransaction(n);
        case "eth_sendRawTransaction":
            return this._eth_sendRawTransaction(n);
        case "eth_sendTransaction":
            return this._eth_sendTransaction(n);
        case "eth_signTypedData_v1":
        case "eth_signTypedData_v3":
        case "eth_signTypedData_v4":
        case "eth_signTypedData":
            return this.signTypedData(e);
        case "wallet_addEthereumChain":
            return this.addEthereumChain(n);
        case "wallet_switchEthereumChain":
            return this.switchEthereumChain(n);
        case "wallet_watchAsset":
            return this.watchAsset(n);
        default:
            if (!this.jsonRpcUrl)
                throw p.rpc.internal("No RPC URL set for chain");
            return fe(e, this.jsonRpcUrl)
        }
    }
    _ensureKnownAddress(e) {
        const n = L(e);
        if (!this._addresses.map(i => L(i)).includes(n))
            throw new Error("Unknown Ethereum address")
    }
    _prepareTransactionParams(e) {
        const n = e.from ? L(e.from) : this.selectedAddress;
        if (!n)
            throw new Error("Ethereum address is unavailable");
        this._ensureKnownAddress(n);
        const s = e.to ? L(e.to) : null
          , i = e.value != null ? q(e.value) : BigInt(0)
          , r = e.data ? ae(e.data) : Buffer.alloc(0)
          , a = e.nonce != null ? F(e.nonce) : null
          , o = e.gasPrice != null ? q(e.gasPrice) : null
          , c = e.maxFeePerGas != null ? q(e.maxFeePerGas) : null
          , d = e.maxPriorityFeePerGas != null ? q(e.maxPriorityFeePerGas) : null
          , u = e.gas != null ? q(e.gas) : null
          , l = e.chainId ? F(e.chainId) : this.getChainId();
        return {
            fromAddress: n,
            toAddress: s,
            weiValue: i,
            data: r,
            nonce: a,
            gasPriceInWei: o,
            maxFeePerGas: c,
            maxPriorityFeePerGas: d,
            gasLimit: u,
            chainId: l
        }
    }
    async ecRecover(e) {
        const {method: n, params: s} = e;
        if (!Array.isArray(s))
            throw p.rpc.invalidParams();
        const r = await this.initializeRelay().sendRequest({
            method: "ethereumAddressFromSignedMessage",
            params: {
                message: Z(s[0]),
                signature: Z(s[1]),
                addPrefix: n === "personal_ecRecover"
            }
        });
        if (v(r))
            throw r;
        return r.result
    }
    getChainId() {
        var e;
        return Number.parseInt((e = this._storage.getItem(xe)) !== null && e !== void 0 ? e : "1", 10)
    }
    async _eth_requestAccounts() {
        var e, n;
        if (this._addresses.length > 0)
            return (e = this.callback) === null || e === void 0 || e.call(this, "connect", {
                chainId: T(this.getChainId())
            }),
            this._addresses;
        const i = await this.initializeRelay().requestEthereumAccounts();
        if (v(i))
            throw i;
        if (!i.result)
            throw new Error("accounts received is empty");
        return this._setAddresses(i.result),
        (n = this.callback) === null || n === void 0 || n.call(this, "connect", {
            chainId: T(this.getChainId())
        }),
        this._addresses
    }
    async personalSign({params: e}) {
        if (!Array.isArray(e))
            throw p.rpc.invalidParams();
        const n = e[1]
          , s = e[0];
        this._ensureKnownAddress(n);
        const r = await this.initializeRelay().sendRequest({
            method: "signEthereumMessage",
            params: {
                address: L(n),
                message: Z(s),
                addPrefix: !0,
                typedDataJson: null
            }
        });
        if (v(r))
            throw r;
        return r.result
    }
    async _eth_signTransaction(e) {
        const n = this._prepareTransactionParams(e[0] || {})
          , i = await this.initializeRelay().signEthereumTransaction(n);
        if (v(i))
            throw i;
        return i.result
    }
    async _eth_sendRawTransaction(e) {
        const n = ae(e[0])
          , i = await this.initializeRelay().submitEthereumTransaction(n, this.getChainId());
        if (v(i))
            throw i;
        return i.result
    }
    async _eth_sendTransaction(e) {
        const n = this._prepareTransactionParams(e[0] || {})
          , i = await this.initializeRelay().signAndSubmitEthereumTransaction(n);
        if (v(i))
            throw i;
        return i.result
    }
    async signTypedData(e) {
        const {method: n, params: s} = e;
        if (!Array.isArray(s))
            throw p.rpc.invalidParams();
        const i = d => {
            const u = {
                eth_signTypedData_v1: Y.hashForSignTypedDataLegacy,
                eth_signTypedData_v3: Y.hashForSignTypedData_v3,
                eth_signTypedData_v4: Y.hashForSignTypedData_v4,
                eth_signTypedData: Y.hashForSignTypedData_v4
            };
            return z(u[n]({
                data: Et(d)
            }), !0)
        }
          , r = s[n === "eth_signTypedData_v1" ? 1 : 0]
          , a = s[n === "eth_signTypedData_v1" ? 0 : 1];
        this._ensureKnownAddress(r);
        const c = await this.initializeRelay().sendRequest({
            method: "signEthereumMessage",
            params: {
                address: L(r),
                message: i(a),
                typedDataJson: JSON.stringify(a, null, 2),
                addPrefix: !1
            }
        });
        if (v(c))
            throw c;
        return c.result
    }
    initializeRelay() {
        return this._relay || (this._relay = new M({
            linkAPIUrl: _e,
            storage: this._storage,
            metadata: this.metadata,
            accountsCallback: this._setAddresses.bind(this),
            chainCallback: this.updateProviderInfo.bind(this)
        })),
        this._relay
    }
}
const at = "SignerType"
  , ot = new _("CBWSDK","SignerConfigurator");
function En() {
    return ot.getItem(at)
}
function In(t) {
    ot.setItem(at, t)
}
async function Sn(t) {
    const {communicator: e, metadata: n, handshakeRequest: s, callback: i} = t;
    _n(e, n, i).catch( () => {}
    );
    const r = {
        id: crypto.randomUUID(),
        event: "selectSignerType",
        data: Object.assign(Object.assign({}, t.preference), {
            handshakeRequest: s
        })
    }
      , {data: a} = await e.postRequestAndWaitForResponse(r);
    return a
}
function Cn(t) {
    const {signerType: e, metadata: n, communicator: s, callback: i} = t;
    switch (e) {
    case "scw":
        return new Dt({
            metadata: n,
            callback: i,
            communicator: s
        });
    case "walletlink":
        return new rt({
            metadata: n,
            callback: i
        })
    }
}
async function _n(t, e, n) {
    await t.onMessage( ({event: i}) => i === "WalletLinkSessionRequest");
    const s = new rt({
        metadata: e,
        callback: n
    });
    t.postMessage({
        event: "WalletLinkUpdate",
        data: {
            session: s.getSession()
        }
    }),
    await s.handshake(),
    t.postMessage({
        event: "WalletLinkUpdate",
        data: {
            connected: !0
        }
    })
}
const An = `Coinbase Wallet SDK requires the Cross-Origin-Opener-Policy header to not be set to 'same-origin'. This is to ensure that the SDK can communicate with the Coinbase Smart Wallet app.

Please see https://www.smartwallet.dev/guides/tips/popup-tips#cross-origin-opener-policy for more information.`
  , xn = () => {
    let t;
    return {
        getCrossOriginOpenerPolicy: () => t === void 0 ? "undefined" : t,
        checkCrossOriginOpenerPolicy: async () => {
            if (typeof window > "u") {
                t = "non-browser-env";
                return
            }
            try {
                const e = `${window.location.origin}${window.location.pathname}`
                  , n = await fetch(e, {
                    method: "HEAD"
                });
                if (!n.ok)
                    throw new Error(`HTTP error! status: ${n.status}`);
                const s = n.headers.get("Cross-Origin-Opener-Policy");
                t = s ?? "null",
                t === "same-origin" && console.error(An)
            } catch (e) {
                console.error("Error checking Cross-Origin-Opener-Policy:", e.message),
                t = "error"
            }
        }
    }
}
  , {checkCrossOriginOpenerPolicy: Mn, getCrossOriginOpenerPolicy: Pn} = xn()
  , Pe = 420
  , Re = 540;
function Rn(t) {
    const e = (window.innerWidth - Pe) / 2 + window.screenX
      , n = (window.innerHeight - Re) / 2 + window.screenY;
    Tn(t);
    const s = `wallet_${crypto.randomUUID()}`
      , i = window.open(t, s, `width=${Pe}, height=${Re}, left=${e}, top=${n}`);
    if (i?.focus(),
    !i)
        throw p.rpc.internal("Pop up window failed to open");
    return i
}
function Ln(t) {
    t && !t.closed && t.close()
}
function Tn(t) {
    const e = {
        sdkName: He,
        sdkVersion: $,
        origin: window.location.origin,
        coop: Pn()
    };
    for (const [n,s] of Object.entries(e))
        t.searchParams.append(n, s.toString())
}
class Nn {
    constructor({url: e=yn, metadata: n, preference: s}) {
        this.popup = null,
        this.listeners = new Map,
        this.postMessage = async i => {
            (await this.waitForPopupLoaded()).postMessage(i, this.url.origin)
        }
        ,
        this.postRequestAndWaitForResponse = async i => {
            const r = this.onMessage( ({requestId: a}) => a === i.id);
            return this.postMessage(i),
            await r
        }
        ,
        this.onMessage = async i => new Promise( (r, a) => {
            const o = c => {
                if (c.origin !== this.url.origin)
                    return;
                const d = c.data;
                i(d) && (r(d),
                window.removeEventListener("message", o),
                this.listeners.delete(o))
            }
            ;
            window.addEventListener("message", o),
            this.listeners.set(o, {
                reject: a
            })
        }
        ),
        this.disconnect = () => {
            Ln(this.popup),
            this.popup = null,
            this.listeners.forEach( ({reject: i}, r) => {
                i(p.provider.userRejectedRequest("Request rejected")),
                window.removeEventListener("message", r)
            }
            ),
            this.listeners.clear()
        }
        ,
        this.waitForPopupLoaded = async () => this.popup && !this.popup.closed ? (this.popup.focus(),
        this.popup) : (this.popup = Rn(this.url),
        this.onMessage( ({event: i}) => i === "PopupUnload").then(this.disconnect).catch( () => {}
        ),
        this.onMessage( ({event: i}) => i === "PopupLoaded").then(i => {
            this.postMessage({
                requestId: i.id,
                data: {
                    version: $,
                    metadata: this.metadata,
                    preference: this.preference,
                    location: window.location.toString()
                }
            })
        }
        ).then( () => {
            if (!this.popup)
                throw p.rpc.internal();
            return this.popup
        }
        )),
        this.url = new URL(e),
        this.metadata = n,
        this.preference = s
    }
}
function Dn(t) {
    const e = wt(On(t), {
        shouldIncludeStack: !0
    })
      , n = new URL("https://docs.cloud.coinbase.com/wallet-sdk/docs/errors");
    return n.searchParams.set("version", $),
    n.searchParams.set("code", e.code.toString()),
    n.searchParams.set("message", e.message),
    Object.assign(Object.assign({}, e), {
        docUrl: n.href
    })
}
function On(t) {
    var e;
    if (typeof t == "string")
        return {
            message: t,
            code: b.rpc.internal
        };
    if (v(t)) {
        const n = t.errorMessage
          , s = (e = t.errorCode) !== null && e !== void 0 ? e : n.match(/(denied|rejected)/i) ? b.provider.userRejectedRequest : void 0;
        return Object.assign(Object.assign({}, t), {
            message: n,
            code: s,
            data: {
                method: t.method
            }
        })
    }
    return t
}
var ct = {
    exports: {}
};
(function(t) {
    var e = Object.prototype.hasOwnProperty
      , n = "~";
    function s() {}
    Object.create && (s.prototype = Object.create(null),
    new s().__proto__ || (n = !1));
    function i(c, d, u) {
        this.fn = c,
        this.context = d,
        this.once = u || !1
    }
    function r(c, d, u, l, f) {
        if (typeof u != "function")
            throw new TypeError("The listener must be a function");
        var m = new i(u,l || c,f)
          , w = n ? n + d : d;
        return c._events[w] ? c._events[w].fn ? c._events[w] = [c._events[w], m] : c._events[w].push(m) : (c._events[w] = m,
        c._eventsCount++),
        c
    }
    function a(c, d) {
        --c._eventsCount === 0 ? c._events = new s : delete c._events[d]
    }
    function o() {
        this._events = new s,
        this._eventsCount = 0
    }
    o.prototype.eventNames = function() {
        var d = [], u, l;
        if (this._eventsCount === 0)
            return d;
        for (l in u = this._events)
            e.call(u, l) && d.push(n ? l.slice(1) : l);
        return Object.getOwnPropertySymbols ? d.concat(Object.getOwnPropertySymbols(u)) : d
    }
    ,
    o.prototype.listeners = function(d) {
        var u = n ? n + d : d
          , l = this._events[u];
        if (!l)
            return [];
        if (l.fn)
            return [l.fn];
        for (var f = 0, m = l.length, w = new Array(m); f < m; f++)
            w[f] = l[f].fn;
        return w
    }
    ,
    o.prototype.listenerCount = function(d) {
        var u = n ? n + d : d
          , l = this._events[u];
        return l ? l.fn ? 1 : l.length : 0
    }
    ,
    o.prototype.emit = function(d, u, l, f, m, w) {
        var A = n ? n + d : d;
        if (!this._events[A])
            return !1;
        var h = this._events[A], R = arguments.length, N, y;
        if (h.fn) {
            switch (h.once && this.removeListener(d, h.fn, void 0, !0),
            R) {
            case 1:
                return h.fn.call(h.context),
                !0;
            case 2:
                return h.fn.call(h.context, u),
                !0;
            case 3:
                return h.fn.call(h.context, u, l),
                !0;
            case 4:
                return h.fn.call(h.context, u, l, f),
                !0;
            case 5:
                return h.fn.call(h.context, u, l, f, m),
                !0;
            case 6:
                return h.fn.call(h.context, u, l, f, m, w),
                !0
            }
            for (y = 1,
            N = new Array(R - 1); y < R; y++)
                N[y - 1] = arguments[y];
            h.fn.apply(h.context, N)
        } else {
            var dt = h.length, K;
            for (y = 0; y < dt; y++)
                switch (h[y].once && this.removeListener(d, h[y].fn, void 0, !0),
                R) {
                case 1:
                    h[y].fn.call(h[y].context);
                    break;
                case 2:
                    h[y].fn.call(h[y].context, u);
                    break;
                case 3:
                    h[y].fn.call(h[y].context, u, l);
                    break;
                case 4:
                    h[y].fn.call(h[y].context, u, l, f);
                    break;
                default:
                    if (!N)
                        for (K = 1,
                        N = new Array(R - 1); K < R; K++)
                            N[K - 1] = arguments[K];
                    h[y].fn.apply(h[y].context, N)
                }
        }
        return !0
    }
    ,
    o.prototype.on = function(d, u, l) {
        return r(this, d, u, l, !1)
    }
    ,
    o.prototype.once = function(d, u, l) {
        return r(this, d, u, l, !0)
    }
    ,
    o.prototype.removeListener = function(d, u, l, f) {
        var m = n ? n + d : d;
        if (!this._events[m])
            return this;
        if (!u)
            return a(this, m),
            this;
        var w = this._events[m];
        if (w.fn)
            w.fn === u && (!f || w.once) && (!l || w.context === l) && a(this, m);
        else {
            for (var A = 0, h = [], R = w.length; A < R; A++)
                (w[A].fn !== u || f && !w[A].once || l && w[A].context !== l) && h.push(w[A]);
            h.length ? this._events[m] = h.length === 1 ? h[0] : h : a(this, m)
        }
        return this
    }
    ,
    o.prototype.removeAllListeners = function(d) {
        var u;
        return d ? (u = n ? n + d : d,
        this._events[u] && a(this, u)) : (this._events = new s,
        this._eventsCount = 0),
        this
    }
    ,
    o.prototype.off = o.prototype.removeListener,
    o.prototype.addListener = o.prototype.on,
    o.prefixed = n,
    o.EventEmitter = o,
    t.exports = o
}
)(ct);
var jn = ct.exports;
const Un = Le(jn);
class Wn extends Un {
}
var Kn = function(t, e) {
    var n = {};
    for (var s in t)
        Object.prototype.hasOwnProperty.call(t, s) && e.indexOf(s) < 0 && (n[s] = t[s]);
    if (t != null && typeof Object.getOwnPropertySymbols == "function")
        for (var i = 0, s = Object.getOwnPropertySymbols(t); i < s.length; i++)
            e.indexOf(s[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[i]) && (n[s[i]] = t[s[i]]);
    return n
};
class qn extends Wn {
    constructor(e) {
        var {metadata: n} = e
          , s = e.preference
          , {keysUrl: i} = s
          , r = Kn(s, ["keysUrl"]);
        super(),
        this.signer = null,
        this.isCoinbaseWallet = !0,
        this.metadata = n,
        this.preference = r,
        this.communicator = new Nn({
            url: i,
            metadata: n,
            preference: r
        });
        const a = En();
        a && (this.signer = this.initSigner(a))
    }
    async request(e) {
        try {
            if (Nt(e),
            !this.signer)
                switch (e.method) {
                case "eth_requestAccounts":
                    {
                        const n = await this.requestSignerSelection(e)
                          , s = this.initSigner(n);
                        await s.handshake(e),
                        this.signer = s,
                        In(n);
                        break
                    }
                case "wallet_sendCalls":
                    {
                        const n = this.initSigner("scw");
                        await n.handshake({
                            method: "handshake"
                        });
                        const s = await n.request(e);
                        return await n.cleanup(),
                        s
                    }
                case "wallet_getCallsStatus":
                    return fe(e, vn);
                case "net_version":
                    return 1;
                case "eth_chainId":
                    return T(1);
                default:
                    throw p.provider.unauthorized("Must call 'eth_requestAccounts' before other methods")
                }
            return await this.signer.request(e)
        } catch (n) {
            const {code: s} = n;
            return s === b.provider.unauthorized && this.disconnect(),
            Promise.reject(Dn(n))
        }
    }
    async enable() {
        return console.warn('.enable() has been deprecated. Please use .request({ method: "eth_requestAccounts" }) instead.'),
        await this.request({
            method: "eth_requestAccounts"
        })
    }
    async disconnect() {
        var e;
        await ((e = this.signer) === null || e === void 0 ? void 0 : e.cleanup()),
        this.signer = null,
        _.clearAll(),
        this.emit("disconnect", p.provider.disconnected("User initiated disconnection"))
    }
    requestSignerSelection(e) {
        return Sn({
            communicator: this.communicator,
            preference: this.preference,
            metadata: this.metadata,
            handshakeRequest: e,
            callback: this.emit.bind(this)
        })
    }
    initSigner(e) {
        return Cn({
            signerType: e,
            metadata: this.metadata,
            communicator: this.communicator,
            callback: this.emit.bind(this)
        })
    }
}
function Bn(t) {
    if (t) {
        if (!["all", "smartWalletOnly", "eoaOnly"].includes(t.options))
            throw new Error(`Invalid options: ${t.options}`);
        if (t.attribution && t.attribution.auto !== void 0 && t.attribution.dataSuffix !== void 0)
            throw new Error("Attribution cannot contain both auto and dataSuffix properties")
    }
}
function zn(t) {
    var e;
    const n = {
        metadata: t.metadata,
        preference: t.preference
    };
    return (e = Tt(n)) !== null && e !== void 0 ? e : new qn(n)
}
const Fn = {
    options: "all"
};
function Yn(t) {
    var e;
    new _("CBWSDK").setItem("VERSION", $),
    Mn();
    const s = {
        metadata: {
            appName: t.appName || "Dapp",
            appLogoUrl: t.appLogoUrl || "",
            appChainIds: t.appChainIds || []
        },
        preference: Object.assign(Fn, (e = t.preference) !== null && e !== void 0 ? e : {})
    };
    Bn(s.preference);
    let i = null;
    return {
        getProvider: () => (i || (i = zn(s)),
        i)
    }
}
export {Yn as createCoinbaseWalletSDK};
