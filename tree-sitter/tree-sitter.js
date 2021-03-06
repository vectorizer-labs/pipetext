var Module = void 0 !== Module ? Module : {};
! function(e, t) { "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.TreeSitter = t() }(0, function() { var e, t = {}; for (e in Module) Module.hasOwnProperty(e) && (t[e] = Module[e]);
    Module.arguments = [], Module.thisProgram = "./this.program", Module.quit = function(e, t) { throw t }, Module.preRun = [], Module.postRun = []; var n, r = !1,
        a = !1,
        i = !1;
    r = "object" == typeof window, a = "function" == typeof importScripts, i = "object" == typeof process && "function" == typeof require && !r && !a, n = !r && !i && !a; var o, l, u = "";
    i ? (u = __dirname + "/", Module.read = function shell_read(e, t) { var n; return o || (o = require("fs")), l || (l = require("path")), e = l.normalize(e), n = o.readFileSync(e), t ? n : n.toString() }, Module.readBinary = function readBinary(e) { var t = Module.read(e, !0); return t.buffer || (t = new Uint8Array(t)), assert(t.buffer), t }, process.argv.length > 1 && (Module.thisProgram = process.argv[1].replace(/\\/g, "/")), Module.arguments = process.argv.slice(2), "undefined" != typeof module && (module.exports = Module), process.on("uncaughtException", function(e) { if (!(e instanceof ExitStatus)) throw e }), process.on("unhandledRejection", abort), Module.quit = function(e) { process.exit(e) }, Module.inspect = function() { return "[Emscripten Module object]" }) : n ? ("undefined" != typeof read && (Module.read = function shell_read(e) { return read(e) }), Module.readBinary = function readBinary(e) { var t; return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : (assert("object" == typeof(t = read(e, "binary"))), t) }, "undefined" != typeof scriptArgs ? Module.arguments = scriptArgs : void 0 !== arguments && (Module.arguments = arguments), "function" == typeof quit && (Module.quit = function(e) { quit(e) })) : (r || a) && (a ? u = self.location.href : document.currentScript && (u = document.currentScript.src), u = 0 !== u.indexOf("blob:") ? u.substr(0, u.lastIndexOf("/") + 1) : "", Module.read = function shell_read(e) { var t = new XMLHttpRequest; return t.open("GET", e, !1), t.send(null), t.responseText }, a && (Module.readBinary = function readBinary(e) { var t = new XMLHttpRequest; return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response) }), Module.readAsync = function readAsync(e, t, n) { var r = new XMLHttpRequest;
        r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function xhr_onload() { 200 == r.status || 0 == r.status && r.response ? t(r.response) : n() }, r.onerror = n, r.send(null) }, Module.setWindowTitle = function(e) { document.title = e }); var s = Module.print || ("undefined" != typeof console ? console.log.bind(console) : "undefined" != typeof print ? print : null),
        _ = Module.printErr || ("undefined" != typeof printErr ? printErr : "undefined" != typeof console && console.warn.bind(console) || s); for (e in t) t.hasOwnProperty(e) && (Module[e] = t[e]);
    t = void 0; var d = 16;

    function dynamicAlloc(e) { var t = S[T >> 2],
            n = t + e + 15 & -16; if (n <= _emscripten_get_heap_size()) S[T >> 2] = n;
        else if (!_emscripten_resize_heap(n)) return 0; return t }

    function alignMemory(e, t) { return t || (t = d), Math.ceil(e / t) * t }

    function getNativeTypeSize(e) { switch (e) {
            case "i1":
            case "i8":
                return 1;
            case "i16":
                return 2;
            case "i32":
                return 4;
            case "i64":
                return 8;
            case "float":
                return 4;
            case "double":
                return 8;
            default:
                if ("*" === e[e.length - 1]) return 4; if ("i" === e[0]) { var t = parseInt(e.substr(1)); return assert(t % 8 == 0, "getNativeTypeSize invalid bits " + t + ", type " + e), t / 8 } return 0 } } var c = { "f64-rem": function(e, t) { return e % t }, debugger: function() {} },
        m = { nextHandle: 1, loadedLibs: { "-1": { refcount: 1 / 0, name: "__self__", module: Module, global: !0 } }, loadedLibNames: { __self__: -1 } };

    function loadDynamicLibrary(e, t) { t = t || { global: !0, nodelete: !0 }; var n, r = m.loadedLibNames[e]; if (r) return n = m.loadedLibs[r], t.global && !n.global && (n.global = !0, "loading" !== n.module && mergeLibSymbols(n.module)), t.nodelete && n.refcount !== 1 / 0 && (n.refcount = 1 / 0), n.refcount++, t.loadAsync ? Promise.resolve(r) : r;

        function loadLibData() { if (t.fs) { var n = t.fs.readFile(e, { encoding: "binary" }); return n instanceof Uint8Array || (n = new Uint8Array(lib_data)), t.loadAsync ? Promise.resolve(n) : n } return t.loadAsync ? function fetchBinary(e) { return fetch(e, { credentials: "same-origin" }).then(function(t) { if (!t.ok) throw "failed to load binary file at '" + e + "'"; return t.arrayBuffer() }).then(function(e) { return new Uint8Array(e) }) }(e) : Module.readBinary(e) }

        function createLibModule(e) { return loadWebAssemblyModule(e, t) }

        function getLibModule() { if (void 0 !== Module.preloadedWasm && void 0 !== Module.preloadedWasm[e]) { var n = Module.preloadedWasm[e]; return t.loadAsync ? Promise.resolve(n) : n } return t.loadAsync ? loadLibData().then(function(e) { return createLibModule(e) }) : createLibModule(loadLibData()) }

        function mergeLibSymbols(e) { for (var t in e)
                if (e.hasOwnProperty(t)) { var n = t; "_" === t[0] && (Module.hasOwnProperty(n) || (Module[n] = e[t])) } }

        function moduleLoaded(e) { n.global && mergeLibSymbols(e), n.module = e } return r = m.nextHandle++, n = { refcount: t.nodelete ? 1 / 0 : 1, name: e, module: "loading", global: t.global }, m.loadedLibNames[e] = r, m.loadedLibs[r] = n, t.loadAsync ? getLibModule().then(function(e) { return moduleLoaded(e), r }) : (moduleLoaded(getLibModule()), r) }

    function loadWebAssemblyModule(e, t) { assert(1836278016 == new Uint32Array(new Uint8Array(e.subarray(0, 24)).buffer)[0], "need to see wasm magic number"), assert(0 === e[8], "need the dylink section to be first"); var n = 9;

        function getLEB() { for (var t = 0, r = 1;;) { var a = e[n++]; if (t += (127 & a) * r, r *= 128, !(128 & a)) break } return t }
        getLEB();
        assert(6 === e[n]), assert(e[++n] === "d".charCodeAt(0)), assert(e[++n] === "y".charCodeAt(0)), assert(e[++n] === "l".charCodeAt(0)), assert(e[++n] === "i".charCodeAt(0)), assert(e[++n] === "n".charCodeAt(0)), assert(e[++n] === "k".charCodeAt(0)), n++; for (var r = getLEB(), a = getLEB(), i = getLEB(), o = getLEB(), l = getLEB(), u = [], s = 0; s < l; ++s) { var _ = getLEB(),
                m = e.subarray(n, n + _);
            n += _; var f = UTF8ArrayToString(m, 0);
            u.push(f) }

        function loadModule() { a = Math.pow(2, a), o = Math.pow(2, o), a = Math.max(a, d); for (var n = alignMemory(getMemory(r + a), a), l = n; l < n + r; ++l) v[l] = 0; var u = X,
                s = p,
                _ = s.length,
                m = s;
            s.grow(i), assert(s === m); for (l = n; l < n + r; l++) v[l] = 0; for (l = _; l < _ + i; l++) s.set(l, null); var f = {},
                y = function(e, t) { var n = Module[e]; return n || (n = f[e]), n }; for (var h in Module) h in u || (u[h] = Module[h]); var g = { global: { NaN: NaN, Infinity: 1 / 0 }, "global.Math": Math, env: new Proxy(u, { get: function(e, t) { switch (t) {
                            case "__memory_base":
                            case "gb":
                                return n;
                            case "__table_base":
                            case "fb":
                                return _ } if (t in e) return e[t]; if (t.startsWith("g$")) { var r = t.substr(2); return e[t] = function() { return y(r) } } if (t.startsWith("fp$")) { var a = t.split("$");
                            assert(3 == a.length);
                            r = a[1]; var i = a[2],
                                o = 0; return e[t] = function() { if (!o) { var e = y(r);
                                    o = function addFunctionWasm(e, t) { var n = p,
                                            r = n.length; try { n.grow(1) } catch (e) { if (!e instanceof RangeError) throw e; throw "Unable to grow wasm table. Use a higher value for RESERVED_FUNCTION_POINTERS or set ALLOW_TABLE_GROWTH." } try { n.set(r, e) } catch (i) { if (!i instanceof TypeError) throw i;
                                            assert(void 0 !== t, "Missing signature argument to addFunction"); var a = function convertJsFunctionToWasm(e, t) { var n = [1, 0, 1, 96],
                                                    r = t.slice(0, 1),
                                                    a = t.slice(1),
                                                    i = { i: 127, j: 126, f: 125, d: 124 };
                                                n.push(a.length); for (var o = 0; o < a.length; ++o) n.push(i[a[o]]); "v" == r ? n.push(0) : n = n.concat([1, i[r]]);
                                                n[1] = n.length - 2; var l = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0].concat(n, [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0])),
                                                    u = new WebAssembly.Module(l); return new WebAssembly.Instance(u, { e: { f: e } }).exports.f }(e, t);
                                            n.set(r, a) } return r }(e, i) } return o } } return t.startsWith("invoke_") ? e[t] = invoke_X : e[t] = function() { return y(t).apply(null, arguments) } } }), asm2wasm: c };

            function postInstantiation(e, t) { var r = {}; for (var a in e.exports) { var i = e.exports[a]; "object" == typeof i && (i = i.value), "number" == typeof i && (i += n), r[a] = i, t[a] = i } var o = r.__post_instantiate; return o && (L ? o() : F.push(o)), r } return t.loadAsync ? WebAssembly.instantiate(e, g).then(function(e) { return postInstantiation(e.instance, f) }) : postInstantiation(new WebAssembly.Instance(new WebAssembly.Module(e), g), f) } return t.loadAsync ? Promise.all(u.map(function(e) { return loadDynamicLibrary(e, t) })).then(function() { return loadModule() }) : (u.forEach(function(e) { loadDynamicLibrary(e, t) }), loadModule()) }
    Module.loadWebAssemblyModule = loadWebAssemblyModule, Module.registerFunctions = function registerFunctions(e, t) { e.forEach(function(e) { Module["FUNCTION_TABLE_" + e] || (Module["FUNCTION_TABLE_" + e] = []) }); var n = alignFunctionTables(),
            r = alignFunctionTables(t),
            a = n + r;
        e.forEach(function(e) { var r = t["FUNCTION_TABLE_" + e],
                i = Module["FUNCTION_TABLE_" + e];
            assert(r !== i), assert(i.length === n); for (var o = 0; o < r.length; o++) i.push(r[o]);
            assert(i.length === a) }), assert(a === alignFunctionTables()) }; var f, p, y = 0,
        h = 1024;

    function getValue(e, t, n) { switch ("*" === (t = t || "i8").charAt(t.length - 1) && (t = "i32"), t) {
            case "i1":
            case "i8":
                return v[e >> 0];
            case "i16":
                return E[e >> 1];
            case "i32":
            case "i64":
                return S[e >> 2];
            case "float":
                return N[e >> 2];
            case "double":
                return A[e >> 3];
            default:
                abort("invalid type for getValue: " + t) } return null }
    h = alignMemory(h, 16), "object" != typeof WebAssembly && _("no native wasm support detected"); var g = !1;

    function assert(e, t) { e || abort("Assertion failed: " + t) }

    function setValue(e, t, n, r) { switch ("*" === (n = n || "i8").charAt(n.length - 1) && (n = "i32"), n) {
            case "i1":
            case "i8":
                v[e >> 0] = t; break;
            case "i16":
                E[e >> 1] = t; break;
            case "i32":
                S[e >> 2] = t; break;
            case "i64":
                tempI64 = [t >>> 0, (tempDouble = t, +P(tempDouble) >= 1 ? tempDouble > 0 ? (0 | B(+U(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+k((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], S[e >> 2] = tempI64[0], S[e + 4 >> 2] = tempI64[1]; break;
            case "float":
                N[e >> 2] = t; break;
            case "double":
                A[e >> 3] = t; break;
            default:
                abort("invalid type for setValue: " + n) } } var M = 3;

    function getMemory(e) { return L ? Q(e) : dynamicAlloc(e) } var b = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

    function UTF8ArrayToString(e, t, n) { for (var r = t + n, a = t; e[a] && !(a >= r);) ++a; if (a - t > 16 && e.subarray && b) return b.decode(e.subarray(t, a)); for (var i = ""; t < a;) { var o = e[t++]; if (128 & o) { var l = 63 & e[t++]; if (192 != (224 & o)) { var u = 63 & e[t++]; if ((o = 224 == (240 & o) ? (15 & o) << 12 | l << 6 | u : (7 & o) << 18 | l << 12 | u << 6 | 63 & e[t++]) < 65536) i += String.fromCharCode(o);
                    else { var s = o - 65536;
                        i += String.fromCharCode(55296 | s >> 10, 56320 | 1023 & s) } } else i += String.fromCharCode((31 & o) << 6 | l) } else i += String.fromCharCode(o) } return i }

    function UTF8ToString(e, t) { return e ? UTF8ArrayToString(C, e, t) : "" }

    function stringToUTF8Array(e, t, n, r) { if (!(r > 0)) return 0; for (var a = n, i = n + r - 1, o = 0; o < e.length; ++o) { var l = e.charCodeAt(o); if (l >= 55296 && l <= 57343) l = 65536 + ((1023 & l) << 10) | 1023 & e.charCodeAt(++o); if (l <= 127) { if (n >= i) break;
                t[n++] = l } else if (l <= 2047) { if (n + 1 >= i) break;
                t[n++] = 192 | l >> 6, t[n++] = 128 | 63 & l } else if (l <= 65535) { if (n + 2 >= i) break;
                t[n++] = 224 | l >> 12, t[n++] = 128 | l >> 6 & 63, t[n++] = 128 | 63 & l } else { if (n + 3 >= i) break;
                t[n++] = 240 | l >> 18, t[n++] = 128 | l >> 12 & 63, t[n++] = 128 | l >> 6 & 63, t[n++] = 128 | 63 & l } } return t[n] = 0, n - a }

    function lengthBytesUTF8(e) { for (var t = 0, n = 0; n < e.length; ++n) { var r = e.charCodeAt(n);
            r >= 55296 && r <= 57343 && (r = 65536 + ((1023 & r) << 10) | 1023 & e.charCodeAt(++n)), r <= 127 ? ++t : t += r <= 2047 ? 2 : r <= 65535 ? 3 : 4 } return t } "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");

    function allocateUTF8OnStack(e) { var t = lengthBytesUTF8(e) + 1,
            n = te(t); return stringToUTF8Array(e, v, n, t), n } var w, v, C, E, S, N, A;

    function alignUp(e, t) { return e % t > 0 && (e += t - e % t), e }

    function updateGlobalBufferViews() { Module.HEAP8 = v = new Int8Array(w), Module.HEAP16 = E = new Int16Array(w), Module.HEAP32 = S = new Int32Array(w), Module.HEAPU8 = C = new Uint8Array(w), Module.HEAPU16 = new Uint16Array(w), Module.HEAPU32 = new Uint32Array(w), Module.HEAPF32 = N = new Float32Array(w), Module.HEAPF64 = A = new Float64Array(w) } var T = 28832,
        D = Module.TOTAL_MEMORY || 33554432;

    function callRuntimeCallbacks(e) { for (; e.length > 0;) { var t = e.shift(); if ("function" != typeof t) { var n = t.func; "number" == typeof n ? void 0 === t.arg ? Module.dynCall_v(n) : Module.dynCall_vi(n, t.arg) : n(void 0 === t.arg ? null : t.arg) } else t() } }
    D < 5242880 && _("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + D + "! (TOTAL_STACK=5242880)"), Module.buffer ? w = Module.buffer : "object" == typeof WebAssembly && "function" == typeof WebAssembly.Memory ? (f = new WebAssembly.Memory({ initial: D / 65536 }), w = f.buffer) : w = new ArrayBuffer(D), updateGlobalBufferViews(), S[T >> 2] = 5271744; var I = [],
        F = [],
        x = [],
        R = [],
        L = !1;

    function ensureInitRuntime() { L || (L = !0, callRuntimeCallbacks(F)) }

    function addOnPreRun(e) { I.unshift(e) } var P = Math.abs,
        k = Math.ceil,
        U = Math.floor,
        B = Math.min,
        V = 0,
        W = null,
        O = null;

    function addRunDependency(e) { V++, Module.monitorRunDependencies && Module.monitorRunDependencies(V) }

    function removeRunDependency(e) { if (V--, Module.monitorRunDependencies && Module.monitorRunDependencies(V), 0 == V && (null !== W && (clearInterval(W), W = null), O)) { var t = O;
            O = null, t() } }
    Module.preloadedImages = {}, Module.preloadedAudios = {}, Module.preloadedWasm = {}, addOnPreRun(function() { if (Module.dynamicLibraries && Module.dynamicLibraries.length > 0 && !Module.readBinary) return addRunDependency(), void Promise.all(Module.dynamicLibraries.map(function(e) { return loadDynamicLibrary(e, { loadAsync: !0, global: !0, nodelete: !0 }) })).then(function() { removeRunDependency() });! function loadDynamicLibraries(e) { e && e.forEach(function(e) { loadDynamicLibrary(e, { global: !0, nodelete: !0 }) }) }(Module.dynamicLibraries) }); var Y = "data:application/octet-stream;base64,";

    function isDataURI(e) { return String.prototype.startsWith ? e.startsWith(Y) : 0 === e.indexOf(Y) } var z = "tree-sitter.wasm";

    function getBinary() { try { if (Module.wasmBinary) return new Uint8Array(Module.wasmBinary); if (Module.readBinary) return Module.readBinary(z); throw "both async and sync fetching of the wasm failed" } catch (e) { abort(e) } }

    function createWasm(e) { var t = { env: e, global: { NaN: NaN, Infinity: 1 / 0 }, "global.Math": Math, asm2wasm: c };

        function receiveInstance(e, t) { var n = e.exports;
            Module.asm = n, removeRunDependency() } if (addRunDependency(), Module.instantiateWasm) try { return Module.instantiateWasm(t, receiveInstance) } catch (e) { return _("Module.instantiateWasm callback failed with error: " + e), !1 }

        function receiveInstantiatedSource(e) { receiveInstance(e.instance) }

        function instantiateArrayBuffer(e) {
            (function getBinaryPromise() { return Module.wasmBinary || !r && !a || "function" != typeof fetch ? new Promise(function(e, t) { e(getBinary()) }) : fetch(z, { credentials: "same-origin" }).then(function(e) { if (!e.ok) throw "failed to load wasm binary file at '" + z + "'"; return e.arrayBuffer() }).catch(function() { return getBinary() }) })().then(function(e) { return WebAssembly.instantiate(e, t) }).then(e, function(e) { _("failed to asynchronously prepare wasm: " + e), abort(e) }) } return Module.wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || isDataURI(z) || "function" != typeof fetch ? instantiateArrayBuffer(receiveInstantiatedSource) : WebAssembly.instantiateStreaming(fetch(z, { credentials: "same-origin" }), t).then(receiveInstantiatedSource, function(e) { _("wasm streaming compile failed: " + e), _("falling back to ArrayBuffer instantiation"), instantiateArrayBuffer(receiveInstantiatedSource) }), {} }
    isDataURI(z) || (z = function locateFile(e) { return Module.locateFile ? Module.locateFile(e, u) : u + e }(z)), Module.asm = function(e, t, n) { return t.memory = f, t.table = p = new WebAssembly.Table({ initial: 512, element: "anyfunc" }), t.__memory_base = 1024, t.__table_base = 0, createWasm(t) }, F.push({ func: function() { ee() } });

    function ___assert_fail(e, t, n, r) { abort("Assertion failed: " + UTF8ToString(e) + ", at: " + [t ? UTF8ToString(t) : "unknown filename", n, r ? UTF8ToString(r) : "unknown function"]) }

    function ___setErrNo(e) { return Module.___errno_location && (S[Module.___errno_location() >> 2] = e), e }
    Module.___assert_fail = ___assert_fail; var Z = { splitPath: function(e) { return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1) }, normalizeArray: function(e, t) { for (var n = 0, r = e.length - 1; r >= 0; r--) { var a = e[r]; "." === a ? e.splice(r, 1) : ".." === a ? (e.splice(r, 1), n++) : n && (e.splice(r, 1), n--) } if (t)
                    for (; n; n--) e.unshift(".."); return e }, normalize: function(e) { var t = "/" === e.charAt(0),
                    n = "/" === e.substr(-1); return (e = Z.normalizeArray(e.split("/").filter(function(e) { return !!e }), !t).join("/")) || t || (e = "."), e && n && (e += "/"), (t ? "/" : "") + e }, dirname: function(e) { var t = Z.splitPath(e),
                    n = t[0],
                    r = t[1]; return n || r ? (r && (r = r.substr(0, r.length - 1)), n + r) : "." }, basename: function(e) { if ("/" === e) return "/"; var t = e.lastIndexOf("/"); return -1 === t ? e : e.substr(t + 1) }, extname: function(e) { return Z.splitPath(e)[3] }, join: function() { var e = Array.prototype.slice.call(arguments, 0); return Z.normalize(e.join("/")) }, join2: function(e, t) { return Z.normalize(e + "/" + t) } },
        j = { DEFAULT_POLLMASK: 5, mappings: {}, umask: 511, calculateAt: function(e, t) { if ("/" !== t[0]) { var n; if (-100 === e) n = FS.cwd();
                    else { var r = FS.getStream(e); if (!r) throw new FS.ErrnoError(9);
                        n = r.path }
                    t = Z.join2(n, t) } return t }, doStat: function(e, t, n) { try { var r = e(t) } catch (e) { if (e && e.node && Z.normalize(t) !== Z.normalize(FS.getPath(e.node))) return -20; throw e } return S[n >> 2] = r.dev, S[n + 4 >> 2] = 0, S[n + 8 >> 2] = r.ino, S[n + 12 >> 2] = r.mode, S[n + 16 >> 2] = r.nlink, S[n + 20 >> 2] = r.uid, S[n + 24 >> 2] = r.gid, S[n + 28 >> 2] = r.rdev, S[n + 32 >> 2] = 0, tempI64 = [r.size >>> 0, (tempDouble = r.size, +P(tempDouble) >= 1 ? tempDouble > 0 ? (0 | B(+U(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+k((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], S[n + 40 >> 2] = tempI64[0], S[n + 44 >> 2] = tempI64[1], S[n + 48 >> 2] = 4096, S[n + 52 >> 2] = r.blocks, S[n + 56 >> 2] = r.atime.getTime() / 1e3 | 0, S[n + 60 >> 2] = 0, S[n + 64 >> 2] = r.mtime.getTime() / 1e3 | 0, S[n + 68 >> 2] = 0, S[n + 72 >> 2] = r.ctime.getTime() / 1e3 | 0, S[n + 76 >> 2] = 0, tempI64 = [r.ino >>> 0, (tempDouble = r.ino, +P(tempDouble) >= 1 ? tempDouble > 0 ? (0 | B(+U(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+k((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], S[n + 80 >> 2] = tempI64[0], S[n + 84 >> 2] = tempI64[1], 0 }, doMsync: function(e, t, n, r) { var a = new Uint8Array(C.subarray(e, e + n));
                FS.msync(t, a, 0, n, r) }, doMkdir: function(e, t) { return "/" === (e = Z.normalize(e))[e.length - 1] && (e = e.substr(0, e.length - 1)), FS.mkdir(e, t, 0), 0 }, doMknod: function(e, t, n) { switch (61440 & t) {
                    case 32768:
                    case 8192:
                    case 24576:
                    case 4096:
                    case 49152:
                        break;
                    default:
                        return -22 } return FS.mknod(e, t, n), 0 }, doReadlink: function(e, t, n) { if (n <= 0) return -22; var r = FS.readlink(e),
                    a = Math.min(n, lengthBytesUTF8(r)),
                    i = v[t + a]; return function stringToUTF8(e, t, n) { return stringToUTF8Array(e, C, t, n) }(r, t, n + 1), v[t + a] = i, a }, doAccess: function(e, t) { if (-8 & t) return -22; var n;
                n = FS.lookupPath(e, { follow: !0 }).node; var r = ""; return 4 & t && (r += "r"), 2 & t && (r += "w"), 1 & t && (r += "x"), r && FS.nodePermissions(n, r) ? -13 : 0 }, doDup: function(e, t, n) { var r = FS.getStream(n); return r && FS.close(r), FS.open(e, t, 0, n, n).fd }, doReadv: function(e, t, n, r) { for (var a = 0, i = 0; i < n; i++) { var o = S[t + 8 * i >> 2],
                        l = S[t + (8 * i + 4) >> 2],
                        u = FS.read(e, v, o, l, r); if (u < 0) return -1; if (a += u, u < l) break } return a }, doWritev: function(e, t, n, r) { for (var a = 0, i = 0; i < n; i++) { var o = S[t + 8 * i >> 2],
                        l = S[t + (8 * i + 4) >> 2],
                        u = FS.write(e, v, o, l, r); if (u < 0) return -1;
                    a += u } return a }, varargs: 0, get: function(e) { return j.varargs += 4, S[j.varargs - 4 >> 2] }, getStr: function() { return UTF8ToString(j.get()) }, getStreamFromFD: function() { var e = FS.getStream(j.get()); if (!e) throw new FS.ErrnoError(9); return e }, get64: function() { var e = j.get();
                j.get(); return e }, getZero: function() { j.get() } };

    function _abort() { Module.abort() }

    function _emscripten_get_now() { abort() }

    function _emscripten_get_heap_size() { return v.length }

    function _emscripten_resize_heap(e) { var t = _emscripten_get_heap_size(); if (e > 2147418112) return !1; for (var n = Math.max(t, 16777216); n < e;) n = n <= 536870912 ? alignUp(2 * n, 65536) : Math.min(alignUp((3 * n + 2147483648) / 4, 65536), 2147418112); return !! function emscripten_realloc_buffer(e) { e = alignUp(e, 65536); var t = w.byteLength; try { return -1 !== f.grow((e - t) / 65536) && (w = f.buffer, !0) } catch (e) { return !1 } }(n) && (updateGlobalBufferViews(), !0) }
    Module._abort = _abort; var H = {};

    function _llvm_stacksave() { var e = _llvm_stacksave; return e.LLVM_SAVEDSTACKS || (e.LLVM_SAVEDSTACKS = []), e.LLVM_SAVEDSTACKS.push(re()), e.LLVM_SAVEDSTACKS.length - 1 }

    function __isLeapYear(e) { return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0) }

    function __arraySum(e, t) { for (var n = 0, r = 0; r <= t; n += e[r++]); return n } var K = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        q = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function __addDays(e, t) { for (var n = new Date(e.getTime()); t > 0;) { var r = __isLeapYear(n.getFullYear()),
                a = n.getMonth(),
                i = (r ? K : q)[a]; if (!(t > i - n.getDate())) return n.setDate(n.getDate() + t), n;
            t -= i - n.getDate() + 1, n.setDate(1), a < 11 ? n.setMonth(a + 1) : (n.setMonth(0), n.setFullYear(n.getFullYear() + 1)) } return n }

    function _strftime(e, t, n, r) { var a = S[r + 40 >> 2],
            i = { tm_sec: S[r >> 2], tm_min: S[r + 4 >> 2], tm_hour: S[r + 8 >> 2], tm_mday: S[r + 12 >> 2], tm_mon: S[r + 16 >> 2], tm_year: S[r + 20 >> 2], tm_wday: S[r + 24 >> 2], tm_yday: S[r + 28 >> 2], tm_isdst: S[r + 32 >> 2], tm_gmtoff: S[r + 36 >> 2], tm_zone: a ? UTF8ToString(a) : "" },
            o = UTF8ToString(n),
            l = { "%c": "%a %b %d %H:%M:%S %Y", "%D": "%m/%d/%y", "%F": "%Y-%m-%d", "%h": "%b", "%r": "%I:%M:%S %p", "%R": "%H:%M", "%T": "%H:%M:%S", "%x": "%m/%d/%y", "%X": "%H:%M:%S" }; for (var u in l) o = o.replace(new RegExp(u, "g"), l[u]); var s = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            _ = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        function leadingSomething(e, t, n) { for (var r = "number" == typeof e ? e.toString() : e || ""; r.length < t;) r = n[0] + r; return r }

        function leadingNulls(e, t) { return leadingSomething(e, t, "0") }

        function compareByDay(e, t) {
            function sgn(e) { return e < 0 ? -1 : e > 0 ? 1 : 0 } var n; return 0 === (n = sgn(e.getFullYear() - t.getFullYear())) && 0 === (n = sgn(e.getMonth() - t.getMonth())) && (n = sgn(e.getDate() - t.getDate())), n }

        function getFirstWeekStartDate(e) { switch (e.getDay()) {
                case 0:
                    return new Date(e.getFullYear() - 1, 11, 29);
                case 1:
                    return e;
                case 2:
                    return new Date(e.getFullYear(), 0, 3);
                case 3:
                    return new Date(e.getFullYear(), 0, 2);
                case 4:
                    return new Date(e.getFullYear(), 0, 1);
                case 5:
                    return new Date(e.getFullYear() - 1, 11, 31);
                case 6:
                    return new Date(e.getFullYear() - 1, 11, 30) } }

        function getWeekBasedYear(e) { var t = __addDays(new Date(e.tm_year + 1900, 0, 1), e.tm_yday),
                n = new Date(t.getFullYear(), 0, 4),
                r = new Date(t.getFullYear() + 1, 0, 4),
                a = getFirstWeekStartDate(n),
                i = getFirstWeekStartDate(r); return compareByDay(a, t) <= 0 ? compareByDay(i, t) <= 0 ? t.getFullYear() + 1 : t.getFullYear() : t.getFullYear() - 1 } var d = { "%a": function(e) { return s[e.tm_wday].substring(0, 3) }, "%A": function(e) { return s[e.tm_wday] }, "%b": function(e) { return _[e.tm_mon].substring(0, 3) }, "%B": function(e) { return _[e.tm_mon] }, "%C": function(e) { return leadingNulls((e.tm_year + 1900) / 100 | 0, 2) }, "%d": function(e) { return leadingNulls(e.tm_mday, 2) }, "%e": function(e) { return leadingSomething(e.tm_mday, 2, " ") }, "%g": function(e) { return getWeekBasedYear(e).toString().substring(2) }, "%G": function(e) { return getWeekBasedYear(e) }, "%H": function(e) { return leadingNulls(e.tm_hour, 2) }, "%I": function(e) { var t = e.tm_hour; return 0 == t ? t = 12 : t > 12 && (t -= 12), leadingNulls(t, 2) }, "%j": function(e) { return leadingNulls(e.tm_mday + __arraySum(__isLeapYear(e.tm_year + 1900) ? K : q, e.tm_mon - 1), 3) }, "%m": function(e) { return leadingNulls(e.tm_mon + 1, 2) }, "%M": function(e) { return leadingNulls(e.tm_min, 2) }, "%n": function() { return "\n" }, "%p": function(e) { return e.tm_hour >= 0 && e.tm_hour < 12 ? "AM" : "PM" }, "%S": function(e) { return leadingNulls(e.tm_sec, 2) }, "%t": function() { return "\t" }, "%u": function(e) { return new Date(e.tm_year + 1900, e.tm_mon + 1, e.tm_mday, 0, 0, 0, 0).getDay() || 7 }, "%U": function(e) { var t = new Date(e.tm_year + 1900, 0, 1),
                    n = 0 === t.getDay() ? t : __addDays(t, 7 - t.getDay()),
                    r = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday); if (compareByDay(n, r) < 0) { var a = __arraySum(__isLeapYear(r.getFullYear()) ? K : q, r.getMonth() - 1) - 31,
                        i = 31 - n.getDate() + a + r.getDate(); return leadingNulls(Math.ceil(i / 7), 2) } return 0 === compareByDay(n, t) ? "01" : "00" }, "%V": function(e) { var t, n = new Date(e.tm_year + 1900, 0, 4),
                    r = new Date(e.tm_year + 1901, 0, 4),
                    a = getFirstWeekStartDate(n),
                    i = getFirstWeekStartDate(r),
                    o = __addDays(new Date(e.tm_year + 1900, 0, 1), e.tm_yday); return compareByDay(o, a) < 0 ? "53" : compareByDay(i, o) <= 0 ? "01" : (t = a.getFullYear() < e.tm_year + 1900 ? e.tm_yday + 32 - a.getDate() : e.tm_yday + 1 - a.getDate(), leadingNulls(Math.ceil(t / 7), 2)) }, "%w": function(e) { return new Date(e.tm_year + 1900, e.tm_mon + 1, e.tm_mday, 0, 0, 0, 0).getDay() }, "%W": function(e) { var t = new Date(e.tm_year, 0, 1),
                    n = 1 === t.getDay() ? t : __addDays(t, 0 === t.getDay() ? 1 : 7 - t.getDay() + 1),
                    r = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday); if (compareByDay(n, r) < 0) { var a = __arraySum(__isLeapYear(r.getFullYear()) ? K : q, r.getMonth() - 1) - 31,
                        i = 31 - n.getDate() + a + r.getDate(); return leadingNulls(Math.ceil(i / 7), 2) } return 0 === compareByDay(n, t) ? "01" : "00" }, "%y": function(e) { return (e.tm_year + 1900).toString().substring(2) }, "%Y": function(e) { return e.tm_year + 1900 }, "%z": function(e) { var t = e.tm_gmtoff,
                    n = t >= 0; return t = (t = Math.abs(t) / 60) / 60 * 100 + t % 60, (n ? "+" : "-") + String("0000" + t).slice(-4) }, "%Z": function(e) { return e.tm_zone }, "%%": function() { return "%" } }; for (var u in d) o.indexOf(u) >= 0 && (o = o.replace(new RegExp(u, "g"), d[u](i))); var c = function intArrayFromString(e, t, n) { var r = n > 0 ? n : lengthBytesUTF8(e) + 1,
                a = new Array(r),
                i = stringToUTF8Array(e, a, 0, a.length);
            t && (a.length = i); return a }(o, !1); return c.length > t ? 0 : (function writeArrayToMemory(e, t) { v.set(e, t) }(c, e), c.length - 1) }
    _emscripten_get_now = i ? function _emscripten_get_now_actual() { var e = process.hrtime(); return 1e3 * e[0] + e[1] / 1e6 } : "undefined" != typeof dateNow ? dateNow : "object" == typeof performance && performance && "function" == typeof performance.now ? function() { return performance.now() } : Date.now; var G = h;

    function dynCall_X(e) { return e |= 0, mftCall_X(e) }

    function dynCall_i(e) { return e |= 0, 0 | mftCall_i(e) }

    function dynCall_ii(e, t) { return e |= 0, t |= 0, 0 | mftCall_ii(e, 0 | t) }

    function dynCall_iidiiii(e, t, n, r, a, i, o) { return e |= 0, t |= 0, n = +n, r |= 0, a |= 0, i |= 0, o |= 0, 0 | mftCall_iidiiii(e, 0 | t, +n, 0 | r, 0 | a, 0 | i, 0 | o) }

    function dynCall_iii(e, t, n) { return e |= 0, t |= 0, n |= 0, 0 | mftCall_iii(e, 0 | t, 0 | n) }

    function dynCall_iiii(e, t, n, r) { return e |= 0, t |= 0, n |= 0, r |= 0, 0 | mftCall_iiii(e, 0 | t, 0 | n, 0 | r) }

    function dynCall_iiiii(e, t, n, r, a) { return e |= 0, t |= 0, n |= 0, r |= 0, a |= 0, 0 | mftCall_iiiii(e, 0 | t, 0 | n, 0 | r, 0 | a) }

    function dynCall_iiiiid(e, t, n, r, a, i) { return e |= 0, t |= 0, n |= 0, r |= 0, a |= 0, i = +i, 0 | mftCall_iiiiid(e, 0 | t, 0 | n, 0 | r, 0 | a, +i) }

    function dynCall_iiiiii(e, t, n, r, a, i) { return e |= 0, t |= 0, n |= 0, r |= 0, a |= 0, i |= 0, 0 | mftCall_iiiiii(e, 0 | t, 0 | n, 0 | r, 0 | a, 0 | i) }

    function dynCall_iiiiiid(e, t, n, r, a, i, o) { return e |= 0, t |= 0, n |= 0, r |= 0, a |= 0, i |= 0, o = +o, 0 | mftCall_iiiiiid(e, 0 | t, 0 | n, 0 | r, 0 | a, 0 | i, +o) }

    function dynCall_iiiiiii(e, t, n, r, a, i, o) { return e |= 0, t |= 0, n |= 0, r |= 0, a |= 0, i |= 0, o |= 0, 0 | mftCall_iiiiiii(e, 0 | t, 0 | n, 0 | r, 0 | a, 0 | i, 0 | o) }

    function dynCall_iiiiiiii(e, t, n, r, a, i, o, l) { return e |= 0, t |= 0, n |= 0, r |= 0, a |= 0, i |= 0, o |= 0, l |= 0, 0 | mftCall_iiiiiiii(e, 0 | t, 0 | n, 0 | r, 0 | a, 0 | i, 0 | o, 0 | l) }

    function dynCall_iiiiiiiii(e, t, n, r, a, i, o, l, u) { return e |= 0, t |= 0, n |= 0, r |= 0, a |= 0, i |= 0, o |= 0, l |= 0, u |= 0, 0 | mftCall_iiiiiiiii(e, 0 | t, 0 | n, 0 | r, 0 | a, 0 | i, 0 | o, 0 | l, 0 | u) }

    function dynCall_v(e) { e |= 0, mftCall_v(e) }

    function dynCall_vi(e, t) { e |= 0, t |= 0, mftCall_vi(e, 0 | t) }

    function dynCall_vii(e, t, n) { e |= 0, t |= 0, n |= 0, mftCall_vii(e, 0 | t, 0 | n) }

    function dynCall_viii(e, t, n, r) { e |= 0, t |= 0, n |= 0, r |= 0, mftCall_viii(e, 0 | t, 0 | n, 0 | r) }

    function dynCall_viiii(e, t, n, r, a) { e |= 0, t |= 0, n |= 0, r |= 0, a |= 0, mftCall_viiii(e, 0 | t, 0 | n, 0 | r, 0 | a) }

    function dynCall_viiiii(e, t, n, r, a, i) { e |= 0, t |= 0, n |= 0, r |= 0, a |= 0, i |= 0, mftCall_viiiii(e, 0 | t, 0 | n, 0 | r, 0 | a, 0 | i) }

    function dynCall_viiiiii(e, t, n, r, a, i, o) { e |= 0, t |= 0, n |= 0, r |= 0, a |= 0, i |= 0, o |= 0, mftCall_viiiiii(e, 0 | t, 0 | n, 0 | r, 0 | a, 0 | i, 0 | o) } var X = { I: abort, j: function(e) { y = e }, h: function() { return y }, f: ___assert_fail, v: function ___cxa_pure_virtual() { throw g = !0, "Pure virtual function called!" }, p: function ___lock() {}, u: function ___map_file(e, t) { return ___setErrNo(1), -1 }, o: ___setErrNo, t: function ___syscall140(e, t) { j.varargs = t; try { var n = j.getStreamFromFD(),
                        r = j.get(),
                        a = j.get(),
                        i = j.get(),
                        o = j.get(); if (!(-1 == r && a < 0 || 0 == r && a >= 0)) return -75; var l = a; return FS.llseek(n, l, o), tempI64 = [n.position >>> 0, (tempDouble = n.position, +P(tempDouble) >= 1 ? tempDouble > 0 ? (0 | B(+U(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+k((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], S[i >> 2] = tempI64[0], S[i + 4 >> 2] = tempI64[1], n.getdents && 0 === l && 0 === o && (n.getdents = null), 0 } catch (e) { return "undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e), -e.errno } }, s: function ___syscall145(e, t) { j.varargs = t; try { var n = j.getStreamFromFD(),
                        r = j.get(),
                        a = j.get(); return j.doReadv(n, r, a) } catch (e) { return "undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e), -e.errno } }, r: function ___syscall146(e, t) { j.varargs = t; try { var n = j.getStreamFromFD(),
                        r = j.get(),
                        a = j.get(); return j.doWritev(n, r, a) } catch (e) { return "undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e), -e.errno } }, H: function ___syscall54(e, t) { j.varargs = t; try { var n = j.getStreamFromFD(),
                        r = j.get(); switch (r) {
                        case 21509:
                        case 21505:
                            return n.tty ? 0 : -25;
                        case 21510:
                        case 21511:
                        case 21512:
                        case 21506:
                        case 21507:
                        case 21508:
                            return n.tty ? 0 : -25;
                        case 21519:
                            if (!n.tty) return -25; var a = j.get(); return S[a >> 2] = 0, 0;
                        case 21520:
                            return n.tty ? -22 : -25;
                        case 21531:
                            return a = j.get(), FS.ioctl(n, r, a);
                        case 21523:
                        case 21524:
                            return n.tty ? 0 : -25;
                        default:
                            abort("bad ioctl syscall " + r) } } catch (e) { return "undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e), -e.errno } }, G: function ___syscall6(e, t) { j.varargs = t; try { var n = j.getStreamFromFD(); return FS.close(n), 0 } catch (e) { return "undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e), -e.errno } }, F: function ___syscall91(e, t) { j.varargs = t; try { var n = j.get(),
                        r = j.get(),
                        a = j.mappings[n]; if (!a) return 0; if (r === a.len) { var i = FS.getStream(a.fd);
                        j.doMsync(n, i, r, a.flags), FS.munmap(i), j.mappings[n] = null, a.allocated && J(a.malloc) } return 0 } catch (e) { return "undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e), -e.errno } }, n: function ___unlock() {}, i: _abort, q: function _clock_gettime(e, t) { var n; if (0 === e) n = Date.now();
                else { if (1 !== e || ! function _emscripten_get_now_is_monotonic() { return i || "undefined" != typeof dateNow || "object" == typeof performance && performance && "function" == typeof performance.now }()) return ___setErrNo(22), -1;
                    n = _emscripten_get_now() } return S[t >> 2] = n / 1e3 | 0, S[t + 4 >> 2] = n % 1e3 * 1e3 * 1e3 | 0, 0 }, E: _emscripten_get_heap_size, D: function _emscripten_memcpy_big(e, t, n) { C.set(C.subarray(t, t + n), e) }, C: _emscripten_resize_heap, g: function _exit(e) { exit(e) }, m: function _getenv(e) { return 0 === e ? 0 : (e = UTF8ToString(e), H.hasOwnProperty(e) ? (_getenv.ret && J(_getenv.ret), _getenv.ret = function allocateUTF8(e) { var t = lengthBytesUTF8(e) + 1,
                        n = Q(t); return n && stringToUTF8Array(e, v, n, t), n }(H[e]), _getenv.ret) : 0) }, l: function _llvm_stackrestore(e) { var t = _llvm_stacksave,
                    n = t.LLVM_SAVEDSTACKS[e];
                t.LLVM_SAVEDSTACKS.splice(e, 1), ne(n) }, k: _llvm_stacksave, B: function _llvm_trap() { abort("trap!") }, A: function _pthread_cond_wait() { return 0 }, z: function _strftime_l(e, t, n, r) { return _strftime(e, t, n, r) }, y: function _tree_sitter_log_callback(e, t, n) { if (he) { const e = UTF8ToString(n);
                    he(e, 0 !== t) } }, x: function _tree_sitter_parse_callback(e, t, n, r, a) { var i = ye(t, { row: n, column: r }); "string" == typeof i ? (setValue(a, i.length, "i32"), function stringToUTF16(e, t, n) { if (void 0 === n && (n = 2147483647), n < 2) return 0; for (var r = t, a = (n -= 2) < 2 * e.length ? n / 2 : e.length, i = 0; i < a; ++i) { var o = e.charCodeAt(i);
                        E[t >> 1] = o, t += 2 } return E[t >> 1] = 0, t - r }(i, e, 10240)) : setValue(a, 0, "i32") }, w: function abortOnCannotGrowMemory(e) { abort("OOM") }, a: 28848, b: T, c: G, d: 0, e: 28864 },
        $ = Module.asm({}, X, w);
    Module.asm = $;
    Module.__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm = function() { return Module.asm.J.apply(null, arguments) }, Module.__ZNKSt3__220__vector_base_commonILb1EE20__throw_length_errorEv = function() { return Module.asm.K.apply(null, arguments) }, Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm = function() { return Module.asm.L.apply(null, arguments) }, Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm = function() { return Module.asm.M.apply(null, arguments) }, Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm = function() { return Module.asm.N.apply(null, arguments) }, Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc = function() { return Module.asm.O.apply(null, arguments) }, Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC2ERKS5_ = function() { return Module.asm.P.apply(null, arguments) }, Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev = function() { return Module.asm.Q.apply(null, arguments) }, Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw = function() { return Module.asm.R.apply(null, arguments) }, Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev = function() { return Module.asm.S.apply(null, arguments) }, Module.__ZdlPv = function() { return Module.asm.T.apply(null, arguments) }, Module.__Znwm = function() { return Module.asm.U.apply(null, arguments) }, Module._calloc = function() { return Module.asm.V.apply(null, arguments) }; var J = Module._free = function() { return Module.asm.W.apply(null, arguments) },
        Q = (Module._iswalnum = function() { return Module.asm.X.apply(null, arguments) }, Module._iswalpha = function() { return Module.asm.Y.apply(null, arguments) }, Module._iswdigit = function() { return Module.asm.Z.apply(null, arguments) }, Module._iswlower = function() { return Module.asm._.apply(null, arguments) }, Module._iswspace = function() { return Module.asm.$.apply(null, arguments) }, Module._malloc = function() { return Module.asm.aa.apply(null, arguments) }),
        ee = (Module._memchr = function() { return Module.asm.ba.apply(null, arguments) }, Module._memcmp = function() { return Module.asm.ca.apply(null, arguments) }, Module._memcpy = function() { return Module.asm.da.apply(null, arguments) }, Module._strlen = function() { return Module.asm.ea.apply(null, arguments) }, Module._towupper = function() { return Module.asm.fa.apply(null, arguments) }, Module._ts_init = function() { return Module.asm.ga.apply(null, arguments) }, Module._ts_language_field_count = function() { return Module.asm.ha.apply(null, arguments) }, Module._ts_language_field_name_for_id = function() { return Module.asm.ia.apply(null, arguments) }, Module._ts_language_symbol_count = function() { return Module.asm.ja.apply(null, arguments) }, Module._ts_language_symbol_name = function() { return Module.asm.ka.apply(null, arguments) }, Module._ts_language_symbol_type = function() { return Module.asm.la.apply(null, arguments) }, Module._ts_language_version = function() { return Module.asm.ma.apply(null, arguments) }, Module._ts_node_child_count_wasm = function() { return Module.asm.na.apply(null, arguments) }, Module._ts_node_child_wasm = function() { return Module.asm.oa.apply(null, arguments) }, Module._ts_node_children_wasm = function() { return Module.asm.pa.apply(null, arguments) }, Module._ts_node_descendant_for_index_wasm = function() { return Module.asm.qa.apply(null, arguments) }, Module._ts_node_descendant_for_position_wasm = function() { return Module.asm.ra.apply(null, arguments) }, Module._ts_node_end_index_wasm = function() { return Module.asm.sa.apply(null, arguments) }, Module._ts_node_end_point_wasm = function() { return Module.asm.ta.apply(null, arguments) }, Module._ts_node_has_changes_wasm = function() { return Module.asm.ua.apply(null, arguments) }, Module._ts_node_has_error_wasm = function() { return Module.asm.va.apply(null, arguments) }, Module._ts_node_is_missing_wasm = function() { return Module.asm.wa.apply(null, arguments) }, Module._ts_node_is_named_wasm = function() { return Module.asm.xa.apply(null, arguments) }, Module._ts_node_named_child_count_wasm = function() { return Module.asm.ya.apply(null, arguments) }, Module._ts_node_named_child_wasm = function() { return Module.asm.za.apply(null, arguments) }, Module._ts_node_named_children_wasm = function() { return Module.asm.Aa.apply(null, arguments) }, Module._ts_node_named_descendant_for_index_wasm = function() { return Module.asm.Ba.apply(null, arguments) }, Module._ts_node_named_descendant_for_position_wasm = function() { return Module.asm.Ca.apply(null, arguments) }, Module._ts_node_next_named_sibling_wasm = function() { return Module.asm.Da.apply(null, arguments) }, Module._ts_node_next_sibling_wasm = function() { return Module.asm.Ea.apply(null, arguments) }, Module._ts_node_parent_wasm = function() { return Module.asm.Fa.apply(null, arguments) }, Module._ts_node_prev_named_sibling_wasm = function() { return Module.asm.Ga.apply(null, arguments) }, Module._ts_node_prev_sibling_wasm = function() { return Module.asm.Ha.apply(null, arguments) }, Module._ts_node_start_index_wasm = function() { return Module.asm.Ia.apply(null, arguments) }, Module._ts_node_start_point_wasm = function() { return Module.asm.Ja.apply(null, arguments) }, Module._ts_node_symbol_wasm = function() { return Module.asm.Ka.apply(null, arguments) }, Module._ts_node_to_string_wasm = function() { return Module.asm.La.apply(null, arguments) }, Module._ts_parser_delete = function() { return Module.asm.Ma.apply(null, arguments) }, Module._ts_parser_enable_logger_wasm = function() { return Module.asm.Na.apply(null, arguments) }, Module._ts_parser_new_wasm = function() { return Module.asm.Oa.apply(null, arguments) }, Module._ts_parser_parse_wasm = function() { return Module.asm.Pa.apply(null, arguments) }, Module._ts_parser_set_language = function() { return Module.asm.Qa.apply(null, arguments) }, Module._ts_tree_cursor_current_field_id_wasm = function() { return Module.asm.Ra.apply(null, arguments) }, Module._ts_tree_cursor_current_node_id_wasm = function() { return Module.asm.Sa.apply(null, arguments) }, Module._ts_tree_cursor_current_node_is_missing_wasm = function() { return Module.asm.Ta.apply(null, arguments) }, Module._ts_tree_cursor_current_node_is_named_wasm = function() { return Module.asm.Ua.apply(null, arguments) }, Module._ts_tree_cursor_current_node_type_id_wasm = function() { return Module.asm.Va.apply(null, arguments) }, Module._ts_tree_cursor_current_node_wasm = function() { return Module.asm.Wa.apply(null, arguments) }, Module._ts_tree_cursor_delete_wasm = function() { return Module.asm.Xa.apply(null, arguments) }, Module._ts_tree_cursor_end_index_wasm = function() { return Module.asm.Ya.apply(null, arguments) }, Module._ts_tree_cursor_end_position_wasm = function() { return Module.asm.Za.apply(null, arguments) }, Module._ts_tree_cursor_goto_first_child_wasm = function() { return Module.asm._a.apply(null, arguments) }, Module._ts_tree_cursor_goto_next_sibling_wasm = function() { return Module.asm.$a.apply(null, arguments) }, Module._ts_tree_cursor_goto_parent_wasm = function() { return Module.asm.ab.apply(null, arguments) }, Module._ts_tree_cursor_new_wasm = function() { return Module.asm.bb.apply(null, arguments) }, Module._ts_tree_cursor_reset_wasm = function() { return Module.asm.cb.apply(null, arguments) }, Module._ts_tree_cursor_start_index_wasm = function() { return Module.asm.db.apply(null, arguments) }, Module._ts_tree_cursor_start_position_wasm = function() { return Module.asm.eb.apply(null, arguments) }, Module._ts_tree_delete = function() { return Module.asm.fb.apply(null, arguments) }, Module._ts_tree_edit_wasm = function() { return Module.asm.gb.apply(null, arguments) }, Module._ts_tree_get_changed_ranges_wasm = function() { return Module.asm.hb.apply(null, arguments) }, Module._ts_tree_root_node_wasm = function() { return Module.asm.ib.apply(null, arguments) }, Module.globalCtors = function() { return Module.asm.Db.apply(null, arguments) }),
        te = Module.stackAlloc = function() { return Module.asm.Eb.apply(null, arguments) },
        ne = Module.stackRestore = function() { return Module.asm.Fb.apply(null, arguments) },
        re = Module.stackSave = function() { return Module.asm.Gb.apply(null, arguments) },
        dynCall_X = Module.dynCall_X = function() { return Module.asm.jb.apply(null, arguments) },
        dynCall_i = Module.dynCall_i = function() { return Module.asm.kb.apply(null, arguments) },
        dynCall_ii = Module.dynCall_ii = function() { return Module.asm.lb.apply(null, arguments) },
        dynCall_iidiiii = Module.dynCall_iidiiii = function() { return Module.asm.mb.apply(null, arguments) },
        dynCall_iii = Module.dynCall_iii = function() { return Module.asm.nb.apply(null, arguments) },
        dynCall_iiii = Module.dynCall_iiii = function() { return Module.asm.ob.apply(null, arguments) },
        dynCall_iiiii = Module.dynCall_iiiii = function() { return Module.asm.pb.apply(null, arguments) },
        dynCall_iiiiid = Module.dynCall_iiiiid = function() { return Module.asm.qb.apply(null, arguments) },
        dynCall_iiiiii = Module.dynCall_iiiiii = function() { return Module.asm.rb.apply(null, arguments) },
        dynCall_iiiiiid = Module.dynCall_iiiiiid = function() { return Module.asm.sb.apply(null, arguments) },
        dynCall_iiiiiii = Module.dynCall_iiiiiii = function() { return Module.asm.tb.apply(null, arguments) },
        dynCall_iiiiiiii = Module.dynCall_iiiiiiii = function() { return Module.asm.ub.apply(null, arguments) },
        dynCall_iiiiiiiii = Module.dynCall_iiiiiiiii = function() { return Module.asm.vb.apply(null, arguments) },
        dynCall_v = Module.dynCall_v = function() { return Module.asm.wb.apply(null, arguments) },
        dynCall_vi = Module.dynCall_vi = function() { return Module.asm.xb.apply(null, arguments) },
        dynCall_vii = Module.dynCall_vii = function() { return Module.asm.yb.apply(null, arguments) },
        dynCall_viii = Module.dynCall_viii = function() { return Module.asm.zb.apply(null, arguments) },
        dynCall_viiii = Module.dynCall_viiii = function() { return Module.asm.Ab.apply(null, arguments) },
        dynCall_viiiii = Module.dynCall_viiiii = function() { return Module.asm.Bb.apply(null, arguments) },
        dynCall_viiiiii = Module.dynCall_viiiiii = function() { return Module.asm.Cb.apply(null, arguments) };
    Module.dynCall_X = dynCall_X, Module.dynCall_i = dynCall_i, Module.dynCall_ii = dynCall_ii, Module.dynCall_iidiiii = dynCall_iidiiii, Module.dynCall_iii = dynCall_iii, Module.dynCall_iiii = dynCall_iiii, Module.dynCall_iiiii = dynCall_iiiii, Module.dynCall_iiiiid = dynCall_iiiiid, Module.dynCall_iiiiii = dynCall_iiiiii, Module.dynCall_iiiiiid = dynCall_iiiiiid, Module.dynCall_iiiiiii = dynCall_iiiiiii, Module.dynCall_iiiiiiii = dynCall_iiiiiiii, Module.dynCall_iiiiiiiii = dynCall_iiiiiiiii, Module.dynCall_v = dynCall_v, Module.dynCall_vi = dynCall_vi, Module.dynCall_vii = dynCall_vii, Module.dynCall_viii = dynCall_viii, Module.dynCall_viiii = dynCall_viiii, Module.dynCall_viiiii = dynCall_viiiii, Module.dynCall_viiiiii = dynCall_viiiiii; var ae = { _ZZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwPKvE5__fmt: 18887, _ZZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwmE5__fmt: 18898 }; for (var ie in ae) Module["_" + ie] = G + ae[ie]; for (var ie in Module.NAMED_GLOBALS = ae, ae) ! function(e) { var t = Module["_" + e];
        Module["g$_" + e] = function() { return t } }(ie);

    function ExitStatus(e) { this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e }
    Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC1ERKS5_ = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC2ERKS5_, Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED1Ev = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev, Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED1Ev = Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev, Module.asm = $, Module.allocate = function allocate(e, t, n, r) { var a, i; "number" == typeof e ? (a = !0, i = e) : (a = !1, i = e.length); var o, l = "string" == typeof t ? t : null; if (o = n == M ? r : [Q, te, dynamicAlloc][n](Math.max(i, l ? 1 : t.length)), a) { var u; for (r = o, assert(0 == (3 & o)), u = o + (-4 & i); r < u; r += 4) S[r >> 2] = 0; for (u = o + i; r < u;) v[r++ >> 0] = 0; return o } if ("i8" === l) return e.subarray || e.slice ? C.set(e, o) : C.set(new Uint8Array(e), o), o; for (var s, _, d, c = 0; c < i;) { var m = e[c];
            0 !== (s = l || t[c]) ? ("i64" == s && (s = "i32"), setValue(o + c, m, s), d !== s && (_ = getNativeTypeSize(s), d = s), c += _) : c++ } return o }, Module.getMemory = getMemory, ExitStatus.prototype = new Error, ExitStatus.prototype.constructor = ExitStatus;

    function run(e) {
        function doRun() { Module.calledRun || (Module.calledRun = !0, g || (ensureInitRuntime(), function preMain() { callRuntimeCallbacks(x) }(), Module.onRuntimeInitialized && Module.onRuntimeInitialized(), Module._main && oe && Module.callMain(e), function postRun() { if (Module.postRun)
                    for ("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]); Module.postRun.length;) e = Module.postRun.shift(), R.unshift(e); var e;
                callRuntimeCallbacks(R) }())) }
        e = e || Module.arguments, V > 0 || (! function preRun() { if (Module.preRun)
                for ("function" == typeof Module.preRun && (Module.preRun = [Module.preRun]); Module.preRun.length;) addOnPreRun(Module.preRun.shift());
            callRuntimeCallbacks(I) }(), V > 0 || Module.calledRun || (Module.setStatus ? (Module.setStatus("Running..."), setTimeout(function() { setTimeout(function() { Module.setStatus("") }, 1), doRun() }, 1)) : doRun())) }

    function exit(e, t) { t && Module.noExitRuntime && 0 === e || (Module.noExitRuntime || (g = !0, e, function exitRuntime() {!0 }(), Module.onExit && Module.onExit(e)), Module.quit(e, new ExitStatus(e))) }

    function abort(e) { throw Module.onAbort && Module.onAbort(e), void 0 !== e ? (s(e), _(e), e = JSON.stringify(e)) : e = "", g = !0, 1, "abort(" + e + "). Build with -s ASSERTIONS=1 for more info." } if (O = function runCaller() { Module.calledRun || run(), Module.calledRun || (O = runCaller) }, Module.callMain = function callMain(e) { e = e || [], ensureInitRuntime(); var t = e.length + 1,
                n = te(4 * (t + 1));
            S[n >> 2] = allocateUTF8OnStack(Module.thisProgram); for (var r = 1; r < t; r++) S[(n >> 2) + r] = allocateUTF8OnStack(e[r - 1]);
            S[(n >> 2) + t] = 0; try { exit(Module._main(t, n, 0), !0) } catch (e) { if (e instanceof ExitStatus) return; if ("SimulateInfiniteLoop" == e) return void(Module.noExitRuntime = !0); var a = e;
                e && "object" == typeof e && e.stack && (a = [e, e.stack]), _("exception thrown: " + a), Module.quit(1, e) } finally {!0 } }, Module.run = run, Module.abort = abort, Module.preInit)
        for ("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]); Module.preInit.length > 0;) Module.preInit.pop()(); var oe = !0;
    Module.noInitialRun && (oe = !1), Module.noExitRuntime = !0, run(); const le = Module,
        ue = {},
        se = 4,
        _e = 5 * se,
        de = 2 * se,
        ce = 2 * se + 2 * de; var me, fe, pe, ye, he, ge = new Promise(e => { Module.onRuntimeInitialized = e }).then(() => { pe = le._ts_init(), me = getValue(pe, "i32"), fe = getValue(pe + se, "i32") });
    class Parser { static init() { return ge }
        constructor() { if (null == pe) throw new Error("You must first call Parser.init() and wait for it to resolve.");
            le._ts_parser_new_wasm(), this[0] = getValue(pe, "i32"), this[1] = getValue(pe + se, "i32") }
        delete() { le._ts_parser_delete(this[0]), le._free(this[1]) }
        setLanguage(e) { let t; if (e) { if (e.constructor !== Language) throw new Error("Argument must be a Language"); { t = e[0]; const n = le._ts_language_version(t); if (n < fe || me < n) throw new Error(`Incompatible language version ${n}. ` + `Compatibility range ${fe} through ${me}.`) } } else t = 0, e = null; return this.language = e, le._ts_parser_set_language(this[0], t), this }
        getLanguage() { return this.language }
        parse(e, t, n) { if ("string" == typeof e) ye = (t => e.slice(t));
            else { if ("function" != typeof e) throw new Error("Argument must be a string or a function");
                ye = e }
            this.logCallback ? (he = this.logCallback, le._ts_parser_enable_logger_wasm(this[0], 1)) : (he = null, le._ts_parser_enable_logger_wasm(this[0], 0)); let r = 0,
                a = 0; if (n && n.includedRanges) { r = n.includedRanges.length; let e = a = le._calloc(r, ce); for (let t = 0; t < r; t++) marshalRange(e, n.includedRanges[t]), e += ce } const i = le._ts_parser_parse_wasm(this[0], this[1], t ? t[0] : 0, a, r); if (!i) throw ye = null, he = null, new Error("Parsing failed"); const o = new Tree(ue, i, this.language, ye); return ye = null, he = null, o }
        reset() { le._ts_parser_parse_wasm(this[0]) }
        setTimeoutMicros(e) { le._ts_parser_set_timeout_micros(this[0], e) }
        getTimeoutMicros(e) { le._ts_parser_timeout_micros(this[0]) }
        setLogger(e) { if (e) { if ("function" != typeof e) throw new Error("Logger callback must be a function") } else e = null; return this.logCallback = e, this }
        getLogger() { return this.logCallback } }
    class Tree { constructor(e, t, n, r) { if (e !== ue) throw new Error("Illegal constructor");
            this[0] = t, this.language = n, this.textCallback = r }
        copy() { const e = le._ts_tree_copy(this[0]); return new Tree(ue, e, this.language, this.textCallback) }
        delete() { le._ts_tree_delete(this[0]) }
        edit(e) {! function marshalEdit(e) { let t = pe;
                marshalPoint(t, e.startPosition), marshalPoint(t += de, e.oldEndPosition), marshalPoint(t += de, e.newEndPosition), setValue(t += de, e.startIndex, "i32"), setValue(t += se, e.oldEndIndex, "i32"), setValue(t += se, e.newEndIndex, "i32"), t += se }(e), le._ts_tree_edit_wasm(this[0]) }
        get rootNode() { return le._ts_tree_root_node_wasm(this[0]), unmarshalNode(this) }
        getLanguage() { return this.language }
        walk() { return this.rootNode.walk() }
        getChangedRanges(e) { if (e.constructor !== Tree) throw new TypeError("Argument must be a Tree");
            le._ts_tree_get_changed_ranges_wasm(this[0], e[0]); const t = getValue(pe, "i32"),
                n = getValue(pe + se, "i32"),
                r = new Array(t); if (t > 0) { let e = n; for (let n = 0; n < t; n++) r[n] = unmarshalRange(e), e += ce;
                le._free(n) } return r } }
    class Node { constructor(e, t) { if (e !== ue) throw new Error("Illegal constructor");
            this.tree = t }
        get id() { return this[0] }
        get typeId() { return marshalNode(this), le._ts_node_symbol_wasm(this.tree) }
        get type() { return this.tree.language.types[this.typeId] || "ERROR" }
        get startPosition() { return marshalNode(this), le._ts_node_start_point_wasm(this.tree[0]), unmarshalPoint(pe) }
        get endPosition() { return marshalNode(this), le._ts_node_end_point_wasm(this.tree[0]), unmarshalPoint(pe) }
        get startIndex() { return marshalNode(this), le._ts_node_start_index_wasm(this.tree[0]) }
        get endIndex() { return marshalNode(this), le._ts_node_end_index_wasm(this.tree[0]) }
        get text() { const e = this.startIndex,
                t = this.endIndex - e; let n = this.tree.textCallback(e); for (; n.length < t;) n += this.tree.textCallback(e + n.length); return n.slice(0, t) }
        isNamed() { return marshalNode(this), 1 === le._ts_node_is_named_wasm(this.tree[0]) }
        hasError() { return marshalNode(this), 1 === le._ts_node_has_error_wasm(this.tree[0]) }
        hasChanges() { return marshalNode(this), 1 === le._ts_node_has_changes_wasm(this.tree[0]) }
        isMissing() { return marshalNode(this), 1 === le._ts_node_is_missing_wasm(this.tree[0]) }
        equals(e) { if (this === e) return !0; for (let t = 0; t < 5; t++)
                if (this[t] !== e[t]) return !1;
            return !0 }
        child(e) { return marshalNode(this), le._ts_node_child_wasm(this.tree[0], e), unmarshalNode(this.tree) }
        namedChild(e) { return marshalNode(this), le._ts_node_named_child_wasm(this.tree[0], e), unmarshalNode(this.tree) }
        get childCount() { return marshalNode(this), le._ts_node_child_count_wasm(this.tree[0]) }
        get namedChildCount() { return marshalNode(this), le._ts_node_named_child_count_wasm(this.tree[0]) }
        get firstChild() { return this.child(0) }
        get firstNamedChild() { return this.namedChild(0) }
        get lastChild() { return this.child(this.childCount - 1) }
        get lastNamedChild() { return this.namedChild(this.namedChildCount - 1) }
        get children() { if (!this._children) { marshalNode(this), le._ts_node_children_wasm(this.tree[0]); const e = getValue(pe, "i32"),
                    t = getValue(pe + se, "i32"); if (this._children = new Array(e), e > 0) { let n = t; for (let t = 0; t < e; t++) this._children[t] = unmarshalNode(this.tree, n), n += _e;
                    le._free(t) } } return this._children }
        get namedChildren() { if (!this._namedChildren) { marshalNode(this), le._ts_node_named_children_wasm(this.tree[0]); const e = getValue(pe, "i32"),
                    t = getValue(pe + se, "i32"); if (this._namedChildren = new Array(e), e > 0) { let n = t; for (let t = 0; t < e; t++) this._namedChildren[t] = unmarshalNode(this.tree, n), n += _e;
                    le._free(t) } } return this._namedChildren }
        get nextSibling() { return marshalNode(this), le._ts_node_next_sibling_wasm(this.tree[0]), unmarshalNode(this.tree) }
        get previousSibling() { return marshalNode(this), le._ts_node_prev_sibling_wasm(this.tree[0]), unmarshalNode(this.tree) }
        get nextNamedSibling() { return marshalNode(this), le._ts_node_next_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree) }
        get previousNamedSibling() { return marshalNode(this), le._ts_node_prev_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree) }
        get parent() { return marshalNode(this), le._ts_node_parent_wasm(this.tree[0]), unmarshalNode(this.tree) }
        descendantForIndex(e, t = e) { if ("number" != typeof e || "number" != typeof t) throw new Error("Arguments must be numbers");
            marshalNode(this); let n = pe + _e; return setValue(n, e, "i32"), setValue(n + se, t, "i32"), le._ts_node_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree) }
        namedDescendantForIndex(e, t = e) { if ("number" != typeof e || "number" != typeof t) throw new Error("Arguments must be numbers");
            marshalNode(this); let n = pe + _e; return setValue(n, e, "i32"), setValue(n + se, t, "i32"), le._ts_node_named_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree) }
        descendantForPosition(e, t = e) { if (!isPoint(e) || !isPoint(t)) throw new Error("Arguments must be {row, column} objects");
            marshalNode(this); let n = pe + _e; return marshalPoint(n, e), marshalPoint(n + de, t), le._ts_node_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree) }
        namedDescendantForPosition(e, t = e) { if (!isPoint(e) || !isPoint(t)) throw new Error("Arguments must be {row, column} objects");
            marshalNode(this); let n = pe + _e; return marshalPoint(n, e), marshalPoint(n + de, t), le._ts_node_named_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree) }
        walk() { return marshalNode(this), le._ts_tree_cursor_new_wasm(this.tree[0]), new TreeCursor(ue, this.tree) }
        toString() { marshalNode(this); const e = le._ts_node_to_string_wasm(this.tree[0]),
                t = function AsciiToString(e) { for (var t = "";;) { var n = C[e++ >> 0]; if (!n) return t;
                        t += String.fromCharCode(n) } }(e); return le._free(e), t } }
    class TreeCursor { constructor(e, t) { if (e !== ue) throw new Error("Illegal constructor");
            this.tree = t, unmarshalTreeCursor(this) }
        delete() { marshalTreeCursor(this), le._ts_tree_cursor_delete_wasm(this.tree[0]) }
        reset(e) { marshalNode(e), marshalTreeCursor(this, pe + _e), le._ts_tree_cursor_reset_wasm(this.tree[0]), unmarshalTreeCursor(this) }
        get nodeType() { return this.tree.language.types[this.nodeTypeId] || "ERROR" }
        get nodeTypeId() { return marshalTreeCursor(this), le._ts_tree_cursor_current_node_type_id_wasm(this.tree[0]) }
        get nodeId() { return marshalTreeCursor(this), le._ts_tree_cursor_current_node_id_wasm(this.tree[0]) }
        get nodeIsNamed() { return marshalTreeCursor(this), 1 === le._ts_tree_cursor_current_node_is_named_wasm(this.tree[0]) }
        get nodeIsMissing() { return marshalTreeCursor(this), 1 === le._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0]) }
        get startPosition() { return marshalTreeCursor(this), le._ts_tree_cursor_start_position_wasm(this.tree[0]), unmarshalPoint(pe) }
        get endPosition() { return marshalTreeCursor(this), le._ts_tree_cursor_end_position_wasm(this.tree[0]), unmarshalPoint(pe) }
        get startIndex() { return marshalTreeCursor(this), le._ts_tree_cursor_start_index_wasm(this.tree[0]) }
        get endIndex() { return marshalTreeCursor(this), le._ts_tree_cursor_end_index_wasm(this.tree[0]) }
        currentNode() { return marshalTreeCursor(this), le._ts_tree_cursor_current_node_wasm(this.tree[0]), unmarshalNode(this.tree) }
        currentFieldName() { marshalTreeCursor(this); const e = le._ts_tree_cursor_current_field_id_wasm(this.tree[0]); return this.tree.language.fields[e] }
        gotoFirstChild() { marshalTreeCursor(this); const e = le._ts_tree_cursor_goto_first_child_wasm(this.tree[0]); return unmarshalTreeCursor(this), 1 === e }
        gotoNextSibling() { marshalTreeCursor(this); const e = le._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]); return unmarshalTreeCursor(this), 1 === e }
        gotoParent() { marshalTreeCursor(this); const e = le._ts_tree_cursor_goto_parent_wasm(this.tree[0]); return unmarshalTreeCursor(this), 1 === e } }
    class Language { constructor(e, t) { if (e !== ue) throw new Error("Illegal constructor");
            this[0] = t, this.types = new Array(le._ts_language_symbol_count(this[0])); for (let e = 0, t = this.types.length; e < t; e++) le._ts_language_symbol_type(this[0], e) < 2 && (this.types[e] = UTF8ToString(le._ts_language_symbol_name(this[0], e)));
            this.fields = new Array(le._ts_language_field_count(this[0]) + 1); for (let e = 0, t = this.fields.length; e < t; e++) { const t = le._ts_language_field_name_for_id(this[0], e);
                this.fields[e] = 0 !== t ? UTF8ToString(t) : null } }
        get version() { return le._ts_language_version(this[0]) }
        static load(e) { let t; if ("undefined" != typeof process && process.versions && process.versions.node) { const n = require("fs");
                t = Promise.resolve(n.readFileSync(e)) } else t = fetch(e).then(e => e.arrayBuffer().then(t => { if (e.ok) return new Uint8Array(t); { const n = new TextDecoder("utf-8").decode(t); throw new Error(`Language.load failed with status ${e.status}.\n\n${n}`) } })); return t.then(e => loadWebAssemblyModule(e, { loadAsync: !0 })).then(e => { const t = e[Object.keys(e).find(e => e.includes("tree_sitter_"))](); return new Language(ue, t) }) } }

    function isPoint(e) { return e && "number" == typeof e.row && "number" == typeof e.column }

    function marshalNode(e) { let t = pe; for (let n = 0; n < 5; n++) setValue(t, e[n], "i32"), t += se }

    function unmarshalNode(e, t = pe) { const n = getValue(t, "i32"); if (0 === n) return null; const r = new Node(ue, e);
        r[0] = n, t += se; for (let e = 1; e < 5; e++) r[e] = getValue(t, "i32"), t += se; return r }

    function marshalTreeCursor(e, t = pe) { setValue(t + 0 * se, e[0], "i32"), setValue(t + 1 * se, e[1], "i32"), setValue(t + 2 * se, e[2], "i32") }

    function unmarshalTreeCursor(e) { e[0] = getValue(pe + 0 * se, "i32"), e[1] = getValue(pe + 1 * se, "i32"), e[2] = getValue(pe + 2 * se, "i32") }

    function marshalPoint(e, t) { setValue(e, t.row, "i32"), setValue(e + se, t.column, "i32") }

    function unmarshalPoint(e) { return { row: getValue(e, "i32"), column: getValue(e + se, "i32") } }

    function marshalRange(e, t) { marshalPoint(e, t.startPosition), marshalPoint(e += de, t.endPosition), setValue(e += de, t.startIndex, "i32"), setValue(e += se, t.endIndex, "i32"), e += se }

    function unmarshalRange(e) { const t = {}; return t.startPosition = unmarshalPoint(e), e += de, t.endPosition = unmarshalPoint(e), e += de, t.startIndex = getValue(e, "i32"), e += se, t.endIndex = getValue(e, "i32"), t } return Parser.Language = Language, Parser });