function G(a, e) {
  if (!a)
    throw new Error(e);
}
const zv = 34028234663852886e22, Yv = -34028234663852886e22, $v = 4294967295, Vv = 2147483647, Wv = -2147483648;
function xn(a) {
  if (typeof a != "number")
    throw new Error("invalid int 32: " + typeof a);
  if (!Number.isInteger(a) || a > Vv || a < Wv)
    throw new Error("invalid int 32: " + a);
}
function Fa(a) {
  if (typeof a != "number")
    throw new Error("invalid uint 32: " + typeof a);
  if (!Number.isInteger(a) || a > $v || a < 0)
    throw new Error("invalid uint 32: " + a);
}
function Pi(a) {
  if (typeof a != "number")
    throw new Error("invalid float 32: " + typeof a);
  if (Number.isFinite(a) && (a > zv || a < Yv))
    throw new Error("invalid float 32: " + a);
}
const Di = Symbol("@bufbuild/protobuf/enum-type");
function jv(a) {
  const e = a[Di];
  return G(e, "missing enum type on enum object"), e;
}
function Ai(a, e, n, t) {
  a[Di] = qi(e, n.map((o) => ({
    no: o.no,
    name: o.name,
    localName: a[o.no]
  })));
}
function qi(a, e, n) {
  const t = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null), i = [];
  for (const r of e) {
    const c = Ui(r);
    i.push(c), t[r.name] = c, o[r.no] = c;
  }
  return {
    typeName: a,
    values: i,
    // We do not surface options at this time
    // options: opt?.options ?? Object.create(null),
    findName(r) {
      return t[r];
    },
    findNumber(r) {
      return o[r];
    }
  };
}
function Hv(a, e, n) {
  const t = {};
  for (const o of e) {
    const i = Ui(o);
    t[i.localName] = i.no, t[i.no] = i.localName;
  }
  return Ai(t, a, e), t;
}
function Ui(a) {
  return "localName" in a ? a : Object.assign(Object.assign({}, a), { localName: a.name });
}
class E {
  /**
   * Compare with a message of the same type.
   * Note that this function disregards extensions and unknown fields.
   */
  equals(e) {
    return this.getType().runtime.util.equals(this.getType(), this, e);
  }
  /**
   * Create a deep copy.
   */
  clone() {
    return this.getType().runtime.util.clone(this);
  }
  /**
   * Parse from binary data, merging fields.
   *
   * Repeated fields are appended. Map entries are added, overwriting
   * existing keys.
   *
   * If a message field is already present, it will be merged with the
   * new data.
   */
  fromBinary(e, n) {
    const t = this.getType(), o = t.runtime.bin, i = o.makeReadOptions(n);
    return o.readMessage(this, i.readerFactory(e), e.byteLength, i), this;
  }
  /**
   * Parse a message from a JSON value.
   */
  fromJson(e, n) {
    const t = this.getType(), o = t.runtime.json, i = o.makeReadOptions(n);
    return o.readMessage(t, e, i, this), this;
  }
  /**
   * Parse a message from a JSON string.
   */
  fromJsonString(e, n) {
    let t;
    try {
      t = JSON.parse(e);
    } catch (o) {
      throw new Error(`cannot decode ${this.getType().typeName} from JSON: ${o instanceof Error ? o.message : String(o)}`);
    }
    return this.fromJson(t, n);
  }
  /**
   * Serialize the message to binary data.
   */
  toBinary(e) {
    const n = this.getType(), t = n.runtime.bin, o = t.makeWriteOptions(e), i = o.writerFactory();
    return t.writeMessage(this, i, o), i.finish();
  }
  /**
   * Serialize the message to a JSON value, a JavaScript value that can be
   * passed to JSON.stringify().
   */
  toJson(e) {
    const n = this.getType(), t = n.runtime.json, o = t.makeWriteOptions(e);
    return t.writeMessage(this, o);
  }
  /**
   * Serialize the message to a JSON string.
   */
  toJsonString(e) {
    var n;
    const t = this.toJson(e);
    return JSON.stringify(t, null, (n = e?.prettySpaces) !== null && n !== void 0 ? n : 0);
  }
  /**
   * Override for serialization behavior. This will be invoked when calling
   * JSON.stringify on this message (i.e. JSON.stringify(msg)).
   *
   * Note that this will not serialize google.protobuf.Any with a packed
   * message because the protobuf JSON format specifies that it needs to be
   * unpacked, and this is only possible with a type registry to look up the
   * message type.  As a result, attempting to serialize a message with this
   * type will throw an Error.
   *
   * This method is protected because you should not need to invoke it
   * directly -- instead use JSON.stringify or toJsonString for
   * stringified JSON.  Alternatively, if actual JSON is desired, you should
   * use toJson.
   */
  toJSON() {
    return this.toJson({
      emitDefaultValues: !0
    });
  }
  /**
   * Retrieve the MessageType of this message - a singleton that represents
   * the protobuf message declaration and provides metadata for reflection-
   * based operations.
   */
  getType() {
    return Object.getPrototypeOf(this).constructor;
  }
}
function Kv(a, e, n, t) {
  var o;
  const i = (o = t?.localName) !== null && o !== void 0 ? o : e.substring(e.lastIndexOf(".") + 1), r = {
    [i]: function(c) {
      a.util.initFields(this), a.util.initPartial(c, this);
    }
  }[i];
  return Object.setPrototypeOf(r.prototype, new E()), Object.assign(r, {
    runtime: a,
    typeName: e,
    fields: a.util.newFieldList(n),
    fromBinary(c, d) {
      return new r().fromBinary(c, d);
    },
    fromJson(c, d) {
      return new r().fromJson(c, d);
    },
    fromJsonString(c, d) {
      return new r().fromJsonString(c, d);
    },
    equals(c, d) {
      return a.util.equals(r, c, d);
    }
  }), r;
}
function Xv() {
  let a = 0, e = 0;
  for (let t = 0; t < 28; t += 7) {
    let o = this.buf[this.pos++];
    if (a |= (o & 127) << t, !(o & 128))
      return this.assertBounds(), [a, e];
  }
  let n = this.buf[this.pos++];
  if (a |= (n & 15) << 28, e = (n & 112) >> 4, !(n & 128))
    return this.assertBounds(), [a, e];
  for (let t = 3; t <= 31; t += 7) {
    let o = this.buf[this.pos++];
    if (e |= (o & 127) << t, !(o & 128))
      return this.assertBounds(), [a, e];
  }
  throw new Error("invalid varint");
}
function qa(a, e, n) {
  for (let i = 0; i < 28; i = i + 7) {
    const r = a >>> i, c = !(!(r >>> 7) && e == 0), d = (c ? r | 128 : r) & 255;
    if (n.push(d), !c)
      return;
  }
  const t = a >>> 28 & 15 | (e & 7) << 4, o = !!(e >> 3);
  if (n.push((o ? t | 128 : t) & 255), !!o) {
    for (let i = 3; i < 31; i = i + 7) {
      const r = e >>> i, c = !!(r >>> 7), d = (c ? r | 128 : r) & 255;
      if (n.push(d), !c)
        return;
    }
    n.push(e >>> 31 & 1);
  }
}
const Fn = 4294967296;
function ei(a) {
  const e = a[0] === "-";
  e && (a = a.slice(1));
  const n = 1e6;
  let t = 0, o = 0;
  function i(r, c) {
    const d = Number(a.slice(r, c));
    o *= n, t = t * n + d, t >= Fn && (o = o + (t / Fn | 0), t = t % Fn);
  }
  return i(-24, -18), i(-18, -12), i(-12, -6), i(-6), e ? Gi(t, o) : st(t, o);
}
function Qv(a, e) {
  let n = st(a, e);
  const t = n.hi & 2147483648;
  t && (n = Gi(n.lo, n.hi));
  const o = Li(n.lo, n.hi);
  return t ? "-" + o : o;
}
function Li(a, e) {
  if ({ lo: a, hi: e } = Zv(a, e), e <= 2097151)
    return String(Fn * e + a);
  const n = a & 16777215, t = (a >>> 24 | e << 8) & 16777215, o = e >> 16 & 65535;
  let i = n + t * 6777216 + o * 6710656, r = t + o * 8147497, c = o * 2;
  const d = 1e7;
  return i >= d && (r += Math.floor(i / d), i %= d), r >= d && (c += Math.floor(r / d), r %= d), c.toString() + ni(r) + ni(i);
}
function Zv(a, e) {
  return { lo: a >>> 0, hi: e >>> 0 };
}
function st(a, e) {
  return { lo: a | 0, hi: e | 0 };
}
function Gi(a, e) {
  return e = ~e, a ? a = ~a + 1 : e += 1, st(a, e);
}
const ni = (a) => {
  const e = String(a);
  return "0000000".slice(e.length) + e;
};
function ai(a, e) {
  if (a >= 0) {
    for (; a > 127; )
      e.push(a & 127 | 128), a = a >>> 7;
    e.push(a);
  } else {
    for (let n = 0; n < 9; n++)
      e.push(a & 127 | 128), a = a >> 7;
    e.push(1);
  }
}
function eh() {
  let a = this.buf[this.pos++], e = a & 127;
  if (!(a & 128))
    return this.assertBounds(), e;
  if (a = this.buf[this.pos++], e |= (a & 127) << 7, !(a & 128))
    return this.assertBounds(), e;
  if (a = this.buf[this.pos++], e |= (a & 127) << 14, !(a & 128))
    return this.assertBounds(), e;
  if (a = this.buf[this.pos++], e |= (a & 127) << 21, !(a & 128))
    return this.assertBounds(), e;
  a = this.buf[this.pos++], e |= (a & 15) << 28;
  for (let n = 5; a & 128 && n < 10; n++)
    a = this.buf[this.pos++];
  if (a & 128)
    throw new Error("invalid varint");
  return this.assertBounds(), e >>> 0;
}
function nh() {
  const a = new DataView(new ArrayBuffer(8));
  if (typeof BigInt == "function" && typeof a.getBigInt64 == "function" && typeof a.getBigUint64 == "function" && typeof a.setBigInt64 == "function" && typeof a.setBigUint64 == "function" && (typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
    const o = BigInt("-9223372036854775808"), i = BigInt("9223372036854775807"), r = BigInt("0"), c = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: !0,
      parse(d) {
        const p = typeof d == "bigint" ? d : BigInt(d);
        if (p > i || p < o)
          throw new Error(`int64 invalid: ${d}`);
        return p;
      },
      uParse(d) {
        const p = typeof d == "bigint" ? d : BigInt(d);
        if (p > c || p < r)
          throw new Error(`uint64 invalid: ${d}`);
        return p;
      },
      enc(d) {
        return a.setBigInt64(0, this.parse(d), !0), {
          lo: a.getInt32(0, !0),
          hi: a.getInt32(4, !0)
        };
      },
      uEnc(d) {
        return a.setBigInt64(0, this.uParse(d), !0), {
          lo: a.getInt32(0, !0),
          hi: a.getInt32(4, !0)
        };
      },
      dec(d, p) {
        return a.setInt32(0, d, !0), a.setInt32(4, p, !0), a.getBigInt64(0, !0);
      },
      uDec(d, p) {
        return a.setInt32(0, d, !0), a.setInt32(4, p, !0), a.getBigUint64(0, !0);
      }
    };
  }
  const n = (o) => G(/^-?[0-9]+$/.test(o), `int64 invalid: ${o}`), t = (o) => G(/^[0-9]+$/.test(o), `uint64 invalid: ${o}`);
  return {
    zero: "0",
    supported: !1,
    parse(o) {
      return typeof o != "string" && (o = o.toString()), n(o), o;
    },
    uParse(o) {
      return typeof o != "string" && (o = o.toString()), t(o), o;
    },
    enc(o) {
      return typeof o != "string" && (o = o.toString()), n(o), ei(o);
    },
    uEnc(o) {
      return typeof o != "string" && (o = o.toString()), t(o), ei(o);
    },
    dec(o, i) {
      return Qv(o, i);
    },
    uDec(o, i) {
      return Li(o, i);
    }
  };
}
const V = nh();
var f;
(function(a) {
  a[a.DOUBLE = 1] = "DOUBLE", a[a.FLOAT = 2] = "FLOAT", a[a.INT64 = 3] = "INT64", a[a.UINT64 = 4] = "UINT64", a[a.INT32 = 5] = "INT32", a[a.FIXED64 = 6] = "FIXED64", a[a.FIXED32 = 7] = "FIXED32", a[a.BOOL = 8] = "BOOL", a[a.STRING = 9] = "STRING", a[a.BYTES = 12] = "BYTES", a[a.UINT32 = 13] = "UINT32", a[a.SFIXED32 = 15] = "SFIXED32", a[a.SFIXED64 = 16] = "SFIXED64", a[a.SINT32 = 17] = "SINT32", a[a.SINT64 = 18] = "SINT64";
})(f || (f = {}));
var Je;
(function(a) {
  a[a.BIGINT = 0] = "BIGINT", a[a.STRING = 1] = "STRING";
})(Je || (Je = {}));
function Le(a, e, n) {
  if (e === n)
    return !0;
  if (a == f.BYTES) {
    if (!(e instanceof Uint8Array) || !(n instanceof Uint8Array) || e.length !== n.length)
      return !1;
    for (let t = 0; t < e.length; t++)
      if (e[t] !== n[t])
        return !1;
    return !0;
  }
  switch (a) {
    case f.UINT64:
    case f.FIXED64:
    case f.INT64:
    case f.SFIXED64:
    case f.SINT64:
      return e == n;
  }
  return !1;
}
function rn(a, e) {
  switch (a) {
    case f.BOOL:
      return !1;
    case f.UINT64:
    case f.FIXED64:
    case f.INT64:
    case f.SFIXED64:
    case f.SINT64:
      return e == 0 ? V.zero : "0";
    case f.DOUBLE:
    case f.FLOAT:
      return 0;
    case f.BYTES:
      return new Uint8Array(0);
    case f.STRING:
      return "";
    default:
      return 0;
  }
}
function Bi(a, e) {
  switch (a) {
    case f.BOOL:
      return e === !1;
    case f.STRING:
      return e === "";
    case f.BYTES:
      return e instanceof Uint8Array && !e.byteLength;
    default:
      return e == 0;
  }
}
var B;
(function(a) {
  a[a.Varint = 0] = "Varint", a[a.Bit64 = 1] = "Bit64", a[a.LengthDelimited = 2] = "LengthDelimited", a[a.StartGroup = 3] = "StartGroup", a[a.EndGroup = 4] = "EndGroup", a[a.Bit32 = 5] = "Bit32";
})(B || (B = {}));
class ah {
  constructor(e) {
    this.stack = [], this.textEncoder = e ?? new TextEncoder(), this.chunks = [], this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.chunks.push(new Uint8Array(this.buf));
    let e = 0;
    for (let o = 0; o < this.chunks.length; o++)
      e += this.chunks[o].length;
    let n = new Uint8Array(e), t = 0;
    for (let o = 0; o < this.chunks.length; o++)
      n.set(this.chunks[o], t), t += this.chunks[o].length;
    return this.chunks = [], n;
  }
  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork() {
    return this.stack.push({ chunks: this.chunks, buf: this.buf }), this.chunks = [], this.buf = [], this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    let e = this.finish(), n = this.stack.pop();
    if (!n)
      throw new Error("invalid state, fork stack empty");
    return this.chunks = n.chunks, this.buf = n.buf, this.uint32(e.byteLength), this.raw(e);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(e, n) {
    return this.uint32((e << 3 | n) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(e) {
    return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(e), this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(e) {
    for (Fa(e); e > 127; )
      this.buf.push(e & 127 | 128), e = e >>> 7;
    return this.buf.push(e), this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(e) {
    return xn(e), ai(e, this.buf), this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(e) {
    return this.buf.push(e ? 1 : 0), this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(e) {
    return this.uint32(e.byteLength), this.raw(e);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(e) {
    let n = this.textEncoder.encode(e);
    return this.uint32(n.byteLength), this.raw(n);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(e) {
    Pi(e);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setFloat32(0, e, !0), this.raw(n);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(e) {
    let n = new Uint8Array(8);
    return new DataView(n.buffer).setFloat64(0, e, !0), this.raw(n);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(e) {
    Fa(e);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setUint32(0, e, !0), this.raw(n);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(e) {
    xn(e);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setInt32(0, e, !0), this.raw(n);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(e) {
    return xn(e), e = (e << 1 ^ e >> 31) >>> 0, ai(e, this.buf), this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(e) {
    let n = new Uint8Array(8), t = new DataView(n.buffer), o = V.enc(e);
    return t.setInt32(0, o.lo, !0), t.setInt32(4, o.hi, !0), this.raw(n);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(e) {
    let n = new Uint8Array(8), t = new DataView(n.buffer), o = V.uEnc(e);
    return t.setInt32(0, o.lo, !0), t.setInt32(4, o.hi, !0), this.raw(n);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(e) {
    let n = V.enc(e);
    return qa(n.lo, n.hi, this.buf), this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(e) {
    let n = V.enc(e), t = n.hi >> 31, o = n.lo << 1 ^ t, i = (n.hi << 1 | n.lo >>> 31) ^ t;
    return qa(o, i, this.buf), this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(e) {
    let n = V.uEnc(e);
    return qa(n.lo, n.hi, this.buf), this;
  }
}
class xi {
  constructor(e, n) {
    this.varint64 = Xv, this.uint32 = eh, this.buf = e, this.len = e.length, this.pos = 0, this.view = new DataView(e.buffer, e.byteOffset, e.byteLength), this.textDecoder = n ?? new TextDecoder();
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let e = this.uint32(), n = e >>> 3, t = e & 7;
    if (n <= 0 || t < 0 || t > 5)
      throw new Error("illegal tag: field no " + n + " wire type " + t);
    return [n, t];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(e, n) {
    let t = this.pos;
    switch (e) {
      case B.Varint:
        for (; this.buf[this.pos++] & 128; )
          ;
        break;
      case B.Bit64:
        this.pos += 4;
      case B.Bit32:
        this.pos += 4;
        break;
      case B.LengthDelimited:
        let o = this.uint32();
        this.pos += o;
        break;
      case B.StartGroup:
        for (; ; ) {
          const [i, r] = this.tag();
          if (r === B.EndGroup) {
            if (n !== void 0 && i !== n)
              throw new Error("invalid end group tag");
            break;
          }
          this.skip(r, i);
        }
        break;
      default:
        throw new Error("cant skip wire type " + e);
    }
    return this.assertBounds(), this.buf.subarray(t, this.pos);
  }
  /**
   * Throws error if position in byte array is out of range.
   */
  assertBounds() {
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
  }
  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32() {
    let e = this.uint32();
    return e >>> 1 ^ -(e & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return V.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return V.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [e, n] = this.varint64(), t = -(e & 1);
    return e = (e >>> 1 | (n & 1) << 31) ^ t, n = n >>> 1 ^ t, V.dec(e, n);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [e, n] = this.varint64();
    return e !== 0 || n !== 0;
  }
  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64() {
    return V.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return V.dec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, !0);
  }
  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes() {
    let e = this.uint32(), n = this.pos;
    return this.pos += e, this.assertBounds(), this.buf.subarray(n, n + e);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.textDecoder.decode(this.bytes());
  }
}
function th(a, e, n, t) {
  let o;
  return {
    typeName: e,
    extendee: n,
    get field() {
      if (!o) {
        const i = typeof t == "function" ? t() : t;
        i.name = e.split(".").pop(), i.jsonName = `[${e}]`, o = a.util.newFieldList([i]).list()[0];
      }
      return o;
    },
    runtime: a
  };
}
function Fi(a) {
  const e = a.field.localName, n = /* @__PURE__ */ Object.create(null);
  return n[e] = sh(a), [n, () => n[e]];
}
function sh(a) {
  const e = a.field;
  if (e.repeated)
    return [];
  if (e.default !== void 0)
    return e.default;
  switch (e.kind) {
    case "enum":
      return e.T.values[0].no;
    case "scalar":
      return rn(e.T, e.L);
    case "message":
      const n = e.T, t = new n();
      return n.fieldWrapper ? n.fieldWrapper.unwrapField(t) : t;
    case "map":
      throw "map fields are not allowed to be extensions";
  }
}
function oh(a, e) {
  if (!e.repeated && (e.kind == "enum" || e.kind == "scalar")) {
    for (let n = a.length - 1; n >= 0; --n)
      if (a[n].no == e.no)
        return [a[n]];
    return [];
  }
  return a.filter((n) => n.no === e.no);
}
let de = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), Ta = [];
for (let a = 0; a < de.length; a++)
  Ta[de[a].charCodeAt(0)] = a;
Ta[45] = de.indexOf("+");
Ta[95] = de.indexOf("/");
const ot = {
  /**
   * Decodes a base64 string to a byte array.
   *
   * - ignores white-space, including line breaks and tabs
   * - allows inner padding (can decode concatenated base64 strings)
   * - does not require padding
   * - understands base64url encoding:
   *   "-" instead of "+",
   *   "_" instead of "/",
   *   no padding
   */
  dec(a) {
    let e = a.length * 3 / 4;
    a[a.length - 2] == "=" ? e -= 2 : a[a.length - 1] == "=" && (e -= 1);
    let n = new Uint8Array(e), t = 0, o = 0, i, r = 0;
    for (let c = 0; c < a.length; c++) {
      if (i = Ta[a.charCodeAt(c)], i === void 0)
        switch (a[c]) {
          case "=":
            o = 0;
          case `
`:
          case "\r":
          case "	":
          case " ":
            continue;
          default:
            throw Error("invalid base64 string.");
        }
      switch (o) {
        case 0:
          r = i, o = 1;
          break;
        case 1:
          n[t++] = r << 2 | (i & 48) >> 4, r = i, o = 2;
          break;
        case 2:
          n[t++] = (r & 15) << 4 | (i & 60) >> 2, r = i, o = 3;
          break;
        case 3:
          n[t++] = (r & 3) << 6 | i, o = 0;
          break;
      }
    }
    if (o == 1)
      throw Error("invalid base64 string.");
    return n.subarray(0, t);
  },
  /**
   * Encode a byte array to a base64 string.
   */
  enc(a) {
    let e = "", n = 0, t, o = 0;
    for (let i = 0; i < a.length; i++)
      switch (t = a[i], n) {
        case 0:
          e += de[t >> 2], o = (t & 3) << 4, n = 1;
          break;
        case 1:
          e += de[o | t >> 4], o = (t & 15) << 2, n = 2;
          break;
        case 2:
          e += de[o | t >> 6], e += de[t & 63], n = 0;
          break;
      }
    return n && (e += de[o], e += "=", n == 1 && (e += "=")), e;
  }
};
function ih(a, e, n) {
  zi(e, a);
  const t = e.runtime.bin.makeReadOptions(n), o = oh(a.getType().runtime.bin.listUnknownFields(a), e.field), [i, r] = Fi(e);
  for (const c of o)
    e.runtime.bin.readField(i, t.readerFactory(c.data), e.field, c.wireType, t);
  return r();
}
function rh(a, e, n, t) {
  zi(e, a);
  const o = e.runtime.bin.makeReadOptions(t), i = e.runtime.bin.makeWriteOptions(t);
  if (Ji(a, e)) {
    const p = a.getType().runtime.bin.listUnknownFields(a).filter((T) => T.no != e.field.no);
    a.getType().runtime.bin.discardUnknownFields(a);
    for (const T of p)
      a.getType().runtime.bin.onUnknownField(a, T.no, T.wireType, T.data);
  }
  const r = i.writerFactory();
  let c = e.field;
  !c.opt && !c.repeated && (c.kind == "enum" || c.kind == "scalar") && (c = Object.assign(Object.assign({}, e.field), { opt: !0 })), e.runtime.bin.writeField(c, n, r, i);
  const d = o.readerFactory(r.finish());
  for (; d.pos < d.len; ) {
    const [p, T] = d.tag(), R = d.skip(T, p);
    a.getType().runtime.bin.onUnknownField(a, p, T, R);
  }
}
function Ji(a, e) {
  const n = a.getType();
  return e.extendee.typeName === n.typeName && !!n.runtime.bin.listUnknownFields(a).find((t) => t.no == e.field.no);
}
function zi(a, e) {
  G(a.extendee.typeName == e.getType().typeName, `extension ${a.typeName} can only be applied to message ${a.extendee.typeName}`);
}
function Yi(a, e) {
  const n = a.localName;
  if (a.repeated)
    return e[n].length > 0;
  if (a.oneof)
    return e[a.oneof.localName].case === n;
  switch (a.kind) {
    case "enum":
    case "scalar":
      return a.opt || a.req ? e[n] !== void 0 : a.kind == "enum" ? e[n] !== a.T.values[0].no : !Bi(a.T, e[n]);
    case "message":
      return e[n] !== void 0;
    case "map":
      return Object.keys(e[n]).length > 0;
  }
}
function ti(a, e) {
  const n = a.localName, t = !a.opt && !a.req;
  if (a.repeated)
    e[n] = [];
  else if (a.oneof)
    e[a.oneof.localName] = { case: void 0 };
  else
    switch (a.kind) {
      case "map":
        e[n] = {};
        break;
      case "enum":
        e[n] = t ? a.T.values[0].no : void 0;
        break;
      case "scalar":
        e[n] = t ? rn(a.T, a.L) : void 0;
        break;
      case "message":
        e[n] = void 0;
        break;
    }
}
function We(a, e) {
  if (a === null || typeof a != "object" || !Object.getOwnPropertyNames(E.prototype).every((t) => t in a && typeof a[t] == "function"))
    return !1;
  const n = a.getType();
  return n === null || typeof n != "function" || !("typeName" in n) || typeof n.typeName != "string" ? !1 : e === void 0 ? !0 : n.typeName == e.typeName;
}
function $i(a, e) {
  return We(e) || !a.fieldWrapper ? e : a.fieldWrapper.wrapField(e);
}
f.DOUBLE, f.FLOAT, f.INT64, f.UINT64, f.INT32, f.UINT32, f.BOOL, f.STRING, f.BYTES;
const si = {
  ignoreUnknownFields: !1
}, oi = {
  emitDefaultValues: !1,
  enumAsInteger: !1,
  useProtoFieldName: !1,
  prettySpaces: 0
};
function mh(a) {
  return a ? Object.assign(Object.assign({}, si), a) : si;
}
function ch(a) {
  return a ? Object.assign(Object.assign({}, oi), a) : oi;
}
const Vn = Symbol(), Jn = Symbol();
function lh() {
  return {
    makeReadOptions: mh,
    makeWriteOptions: ch,
    readMessage(a, e, n, t) {
      if (e == null || Array.isArray(e) || typeof e != "object")
        throw new Error(`cannot decode message ${a.typeName} from JSON: ${te(e)}`);
      t = t ?? new a();
      const o = /* @__PURE__ */ new Map(), i = n.typeRegistry;
      for (const [r, c] of Object.entries(e)) {
        const d = a.fields.findJsonName(r);
        if (d) {
          if (d.oneof) {
            if (c === null && d.kind == "scalar")
              continue;
            const p = o.get(d.oneof);
            if (p !== void 0)
              throw new Error(`cannot decode message ${a.typeName} from JSON: multiple keys for oneof "${d.oneof.name}" present: "${p}", "${r}"`);
            o.set(d.oneof, r);
          }
          ii(t, c, d, n, a);
        } else {
          let p = !1;
          if (i?.findExtension && r.startsWith("[") && r.endsWith("]")) {
            const T = i.findExtension(r.substring(1, r.length - 1));
            if (T && T.extendee.typeName == a.typeName) {
              p = !0;
              const [R, S] = Fi(T);
              ii(R, c, T.field, n, T), rh(t, T, S(), n);
            }
          }
          if (!p && !n.ignoreUnknownFields)
            throw new Error(`cannot decode message ${a.typeName} from JSON: key "${r}" is unknown`);
        }
      }
      return t;
    },
    writeMessage(a, e) {
      const n = a.getType(), t = {};
      let o;
      try {
        for (o of n.fields.byNumber()) {
          if (!Yi(o, a)) {
            if (o.req)
              throw "required field not set";
            if (!e.emitDefaultValues || !ph(o))
              continue;
          }
          const r = o.oneof ? a[o.oneof.localName].value : a[o.localName], c = ri(o, r, e);
          c !== void 0 && (t[e.useProtoFieldName ? o.name : o.jsonName] = c);
        }
        const i = e.typeRegistry;
        if (i?.findExtensionFor)
          for (const r of n.runtime.bin.listUnknownFields(a)) {
            const c = i.findExtensionFor(n.typeName, r.no);
            if (c && Ji(a, c)) {
              const d = ih(a, c, e), p = ri(c.field, d, e);
              p !== void 0 && (t[c.field.jsonName] = p);
            }
          }
      } catch (i) {
        const r = o ? `cannot encode field ${n.typeName}.${o.name} to JSON` : `cannot encode message ${n.typeName} to JSON`, c = i instanceof Error ? i.message : String(i);
        throw new Error(r + (c.length > 0 ? `: ${c}` : ""));
      }
      return t;
    },
    readScalar(a, e, n) {
      return vn(a, e, n ?? Je.BIGINT, !0);
    },
    writeScalar(a, e, n) {
      if (e !== void 0 && (n || Bi(a, e)))
        return zn(a, e);
    },
    debug: te
  };
}
function te(a) {
  if (a === null)
    return "null";
  switch (typeof a) {
    case "object":
      return Array.isArray(a) ? "array" : "object";
    case "string":
      return a.length > 100 ? "string" : `"${a.split('"').join('\\"')}"`;
    default:
      return String(a);
  }
}
function ii(a, e, n, t, o) {
  let i = n.localName;
  if (n.repeated) {
    if (G(n.kind != "map"), e === null)
      return;
    if (!Array.isArray(e))
      throw new Error(`cannot decode field ${o.typeName}.${n.name} from JSON: ${te(e)}`);
    const r = a[i];
    for (const c of e) {
      if (c === null)
        throw new Error(`cannot decode field ${o.typeName}.${n.name} from JSON: ${te(c)}`);
      switch (n.kind) {
        case "message":
          r.push(n.T.fromJson(c, t));
          break;
        case "enum":
          const d = Ua(n.T, c, t.ignoreUnknownFields, !0);
          d !== Jn && r.push(d);
          break;
        case "scalar":
          try {
            r.push(vn(n.T, c, n.L, !0));
          } catch (p) {
            let T = `cannot decode field ${o.typeName}.${n.name} from JSON: ${te(c)}`;
            throw p instanceof Error && p.message.length > 0 && (T += `: ${p.message}`), new Error(T);
          }
          break;
      }
    }
  } else if (n.kind == "map") {
    if (e === null)
      return;
    if (typeof e != "object" || Array.isArray(e))
      throw new Error(`cannot decode field ${o.typeName}.${n.name} from JSON: ${te(e)}`);
    const r = a[i];
    for (const [c, d] of Object.entries(e)) {
      if (d === null)
        throw new Error(`cannot decode field ${o.typeName}.${n.name} from JSON: map value null`);
      let p;
      try {
        p = dh(n.K, c);
      } catch (T) {
        let R = `cannot decode map key for field ${o.typeName}.${n.name} from JSON: ${te(e)}`;
        throw T instanceof Error && T.message.length > 0 && (R += `: ${T.message}`), new Error(R);
      }
      switch (n.V.kind) {
        case "message":
          r[p] = n.V.T.fromJson(d, t);
          break;
        case "enum":
          const T = Ua(n.V.T, d, t.ignoreUnknownFields, !0);
          T !== Jn && (r[p] = T);
          break;
        case "scalar":
          try {
            r[p] = vn(n.V.T, d, Je.BIGINT, !0);
          } catch (R) {
            let S = `cannot decode map value for field ${o.typeName}.${n.name} from JSON: ${te(e)}`;
            throw R instanceof Error && R.message.length > 0 && (S += `: ${R.message}`), new Error(S);
          }
          break;
      }
    }
  } else
    switch (n.oneof && (a = a[n.oneof.localName] = { case: i }, i = "value"), n.kind) {
      case "message":
        const r = n.T;
        if (e === null && r.typeName != "google.protobuf.Value")
          return;
        let c = a[i];
        We(c) ? c.fromJson(e, t) : (a[i] = c = r.fromJson(e, t), r.fieldWrapper && !n.oneof && (a[i] = r.fieldWrapper.unwrapField(c)));
        break;
      case "enum":
        const d = Ua(n.T, e, t.ignoreUnknownFields, !1);
        switch (d) {
          case Vn:
            ti(n, a);
            break;
          case Jn:
            break;
          default:
            a[i] = d;
            break;
        }
        break;
      case "scalar":
        try {
          const p = vn(n.T, e, n.L, !1);
          switch (p) {
            case Vn:
              ti(n, a);
              break;
            default:
              a[i] = p;
              break;
          }
        } catch (p) {
          let T = `cannot decode field ${o.typeName}.${n.name} from JSON: ${te(e)}`;
          throw p instanceof Error && p.message.length > 0 && (T += `: ${p.message}`), new Error(T);
        }
        break;
    }
}
function dh(a, e) {
  if (a === f.BOOL)
    switch (e) {
      case "true":
        e = !0;
        break;
      case "false":
        e = !1;
        break;
    }
  return vn(a, e, Je.BIGINT, !0).toString();
}
function vn(a, e, n, t) {
  if (e === null)
    return t ? rn(a, n) : Vn;
  switch (a) {
    case f.DOUBLE:
    case f.FLOAT:
      if (e === "NaN")
        return Number.NaN;
      if (e === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (e === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (e === "" || typeof e == "string" && e.trim().length !== e.length || typeof e != "string" && typeof e != "number")
        break;
      const o = Number(e);
      if (Number.isNaN(o) || !Number.isFinite(o))
        break;
      return a == f.FLOAT && Pi(o), o;
    case f.INT32:
    case f.FIXED32:
    case f.SFIXED32:
    case f.SINT32:
    case f.UINT32:
      let i;
      if (typeof e == "number" ? i = e : typeof e == "string" && e.length > 0 && e.trim().length === e.length && (i = Number(e)), i === void 0)
        break;
      return a == f.UINT32 || a == f.FIXED32 ? Fa(i) : xn(i), i;
    case f.INT64:
    case f.SFIXED64:
    case f.SINT64:
      if (typeof e != "number" && typeof e != "string")
        break;
      const r = V.parse(e);
      return n ? r.toString() : r;
    case f.FIXED64:
    case f.UINT64:
      if (typeof e != "number" && typeof e != "string")
        break;
      const c = V.uParse(e);
      return n ? c.toString() : c;
    case f.BOOL:
      if (typeof e != "boolean")
        break;
      return e;
    case f.STRING:
      if (typeof e != "string")
        break;
      try {
        encodeURIComponent(e);
      } catch {
        throw new Error("invalid UTF8");
      }
      return e;
    case f.BYTES:
      if (e === "")
        return new Uint8Array(0);
      if (typeof e != "string")
        break;
      return ot.dec(e);
  }
  throw new Error();
}
function Ua(a, e, n, t) {
  if (e === null)
    return a.typeName == "google.protobuf.NullValue" ? 0 : t ? a.values[0].no : Vn;
  switch (typeof e) {
    case "number":
      if (Number.isInteger(e))
        return e;
      break;
    case "string":
      const o = a.findName(e);
      if (o !== void 0)
        return o.no;
      if (n)
        return Jn;
      break;
  }
  throw new Error(`cannot decode enum ${a.typeName} from JSON: ${te(e)}`);
}
function ph(a) {
  return a.repeated || a.kind == "map" ? !0 : !(a.oneof || a.kind == "message" || a.opt || a.req);
}
function ri(a, e, n) {
  if (a.kind == "map") {
    G(typeof e == "object" && e != null);
    const t = {}, o = Object.entries(e);
    switch (a.V.kind) {
      case "scalar":
        for (const [r, c] of o)
          t[r.toString()] = zn(a.V.T, c);
        break;
      case "message":
        for (const [r, c] of o)
          t[r.toString()] = c.toJson(n);
        break;
      case "enum":
        const i = a.V.T;
        for (const [r, c] of o)
          t[r.toString()] = La(i, c, n.enumAsInteger);
        break;
    }
    return n.emitDefaultValues || o.length > 0 ? t : void 0;
  }
  if (a.repeated) {
    G(Array.isArray(e));
    const t = [];
    switch (a.kind) {
      case "scalar":
        for (let o = 0; o < e.length; o++)
          t.push(zn(a.T, e[o]));
        break;
      case "enum":
        for (let o = 0; o < e.length; o++)
          t.push(La(a.T, e[o], n.enumAsInteger));
        break;
      case "message":
        for (let o = 0; o < e.length; o++)
          t.push(e[o].toJson(n));
        break;
    }
    return n.emitDefaultValues || t.length > 0 ? t : void 0;
  }
  switch (a.kind) {
    case "scalar":
      return zn(a.T, e);
    case "enum":
      return La(a.T, e, n.enumAsInteger);
    case "message":
      return $i(a.T, e).toJson(n);
  }
}
function La(a, e, n) {
  var t;
  if (G(typeof e == "number"), a.typeName == "google.protobuf.NullValue")
    return null;
  if (n)
    return e;
  const o = a.findNumber(e);
  return (t = o?.name) !== null && t !== void 0 ? t : e;
}
function zn(a, e) {
  switch (a) {
    case f.INT32:
    case f.SFIXED32:
    case f.SINT32:
    case f.FIXED32:
    case f.UINT32:
      return G(typeof e == "number"), e;
    case f.FLOAT:
    case f.DOUBLE:
      return G(typeof e == "number"), Number.isNaN(e) ? "NaN" : e === Number.POSITIVE_INFINITY ? "Infinity" : e === Number.NEGATIVE_INFINITY ? "-Infinity" : e;
    case f.STRING:
      return G(typeof e == "string"), e;
    case f.BOOL:
      return G(typeof e == "boolean"), e;
    case f.UINT64:
    case f.FIXED64:
    case f.INT64:
    case f.SFIXED64:
    case f.SINT64:
      return G(typeof e == "bigint" || typeof e == "string" || typeof e == "number"), e.toString();
    case f.BYTES:
      return G(e instanceof Uint8Array), ot.enc(e);
  }
}
const on = Symbol("@bufbuild/protobuf/unknown-fields"), mi = {
  readUnknownFields: !0,
  readerFactory: (a) => new xi(a)
}, ci = {
  writeUnknownFields: !0,
  writerFactory: () => new ah()
};
function uh(a) {
  return a ? Object.assign(Object.assign({}, mi), a) : mi;
}
function gh(a) {
  return a ? Object.assign(Object.assign({}, ci), a) : ci;
}
function Th() {
  return {
    makeReadOptions: uh,
    makeWriteOptions: gh,
    listUnknownFields(a) {
      var e;
      return (e = a[on]) !== null && e !== void 0 ? e : [];
    },
    discardUnknownFields(a) {
      delete a[on];
    },
    writeUnknownFields(a, e) {
      const t = a[on];
      if (t)
        for (const o of t)
          e.tag(o.no, o.wireType).raw(o.data);
    },
    onUnknownField(a, e, n, t) {
      const o = a;
      Array.isArray(o[on]) || (o[on] = []), o[on].push({ no: e, wireType: n, data: t });
    },
    readMessage(a, e, n, t, o) {
      const i = a.getType(), r = o ? e.len : e.pos + n;
      let c, d;
      for (; e.pos < r && ([c, d] = e.tag(), !(o === !0 && d == B.EndGroup)); ) {
        const p = i.fields.find(c);
        if (!p) {
          const T = e.skip(d, c);
          t.readUnknownFields && this.onUnknownField(a, c, d, T);
          continue;
        }
        li(a, e, p, d, t);
      }
      if (o && // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      (d != B.EndGroup || c !== n))
        throw new Error("invalid end group tag");
    },
    readField: li,
    writeMessage(a, e, n) {
      const t = a.getType();
      for (const o of t.fields.byNumber()) {
        if (!Yi(o, a)) {
          if (o.req)
            throw new Error(`cannot encode field ${t.typeName}.${o.name} to binary: required field not set`);
          continue;
        }
        const i = o.oneof ? a[o.oneof.localName].value : a[o.localName];
        di(o, i, e, n);
      }
      return n.writeUnknownFields && this.writeUnknownFields(a, e), e;
    },
    writeField(a, e, n, t) {
      e !== void 0 && di(a, e, n, t);
    }
  };
}
function li(a, e, n, t, o) {
  let { repeated: i, localName: r } = n;
  switch (n.oneof && (a = a[n.oneof.localName], a.case != r && delete a.value, a.case = r, r = "value"), n.kind) {
    case "scalar":
    case "enum":
      const c = n.kind == "enum" ? f.INT32 : n.T;
      let d = Wn;
      if (n.kind == "scalar" && n.L > 0 && (d = yh), i) {
        let S = a[r];
        if (t == B.LengthDelimited && c != f.STRING && c != f.BYTES) {
          let I = e.uint32() + e.pos;
          for (; e.pos < I; )
            S.push(d(e, c));
        } else
          S.push(d(e, c));
      } else
        a[r] = d(e, c);
      break;
    case "message":
      const p = n.T;
      i ? a[r].push(Yn(e, new p(), o, n)) : We(a[r]) ? Yn(e, a[r], o, n) : (a[r] = Yn(e, new p(), o, n), p.fieldWrapper && !n.oneof && !n.repeated && (a[r] = p.fieldWrapper.unwrapField(a[r])));
      break;
    case "map":
      let [T, R] = kh(n, e, o);
      a[r][T] = R;
      break;
  }
}
function Yn(a, e, n, t) {
  const o = e.getType().runtime.bin, i = t?.delimited;
  return o.readMessage(
    e,
    a,
    i ? t.no : a.uint32(),
    // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    n,
    i
  ), e;
}
function kh(a, e, n) {
  const t = e.uint32(), o = e.pos + t;
  let i, r;
  for (; e.pos < o; ) {
    const [c] = e.tag();
    switch (c) {
      case 1:
        i = Wn(e, a.K);
        break;
      case 2:
        switch (a.V.kind) {
          case "scalar":
            r = Wn(e, a.V.T);
            break;
          case "enum":
            r = e.int32();
            break;
          case "message":
            r = Yn(e, new a.V.T(), n, void 0);
            break;
        }
        break;
    }
  }
  if (i === void 0 && (i = rn(a.K, Je.BIGINT)), typeof i != "string" && typeof i != "number" && (i = i.toString()), r === void 0)
    switch (a.V.kind) {
      case "scalar":
        r = rn(a.V.T, Je.BIGINT);
        break;
      case "enum":
        r = a.V.T.values[0].no;
        break;
      case "message":
        r = new a.V.T();
        break;
    }
  return [i, r];
}
function yh(a, e) {
  const n = Wn(a, e);
  return typeof n == "bigint" ? n.toString() : n;
}
function Wn(a, e) {
  switch (e) {
    case f.STRING:
      return a.string();
    case f.BOOL:
      return a.bool();
    case f.DOUBLE:
      return a.double();
    case f.FLOAT:
      return a.float();
    case f.INT32:
      return a.int32();
    case f.INT64:
      return a.int64();
    case f.UINT64:
      return a.uint64();
    case f.FIXED64:
      return a.fixed64();
    case f.BYTES:
      return a.bytes();
    case f.FIXED32:
      return a.fixed32();
    case f.SFIXED32:
      return a.sfixed32();
    case f.SFIXED64:
      return a.sfixed64();
    case f.SINT64:
      return a.sint64();
    case f.UINT32:
      return a.uint32();
    case f.SINT32:
      return a.sint32();
  }
}
function di(a, e, n, t) {
  G(e !== void 0);
  const o = a.repeated;
  switch (a.kind) {
    case "scalar":
    case "enum":
      let i = a.kind == "enum" ? f.INT32 : a.T;
      if (o)
        if (G(Array.isArray(e)), a.packed)
          hh(n, i, a.no, e);
        else
          for (const r of e)
            hn(n, i, a.no, r);
      else
        hn(n, i, a.no, e);
      break;
    case "message":
      if (o) {
        G(Array.isArray(e));
        for (const r of e)
          pi(n, t, a, r);
      } else
        pi(n, t, a, e);
      break;
    case "map":
      G(typeof e == "object" && e != null);
      for (const [r, c] of Object.entries(e))
        vh(n, t, a, r, c);
      break;
  }
}
function vh(a, e, n, t, o) {
  a.tag(n.no, B.LengthDelimited), a.fork();
  let i = t;
  switch (n.K) {
    case f.INT32:
    case f.FIXED32:
    case f.UINT32:
    case f.SFIXED32:
    case f.SINT32:
      i = Number.parseInt(t);
      break;
    case f.BOOL:
      G(t == "true" || t == "false"), i = t == "true";
      break;
  }
  switch (hn(a, n.K, 1, i), n.V.kind) {
    case "scalar":
      hn(a, n.V.T, 2, o);
      break;
    case "enum":
      hn(a, f.INT32, 2, o);
      break;
    case "message":
      G(o !== void 0), a.tag(2, B.LengthDelimited).bytes(o.toBinary(e));
      break;
  }
  a.join();
}
function pi(a, e, n, t) {
  const o = $i(n.T, t);
  n.delimited ? a.tag(n.no, B.StartGroup).raw(o.toBinary(e)).tag(n.no, B.EndGroup) : a.tag(n.no, B.LengthDelimited).bytes(o.toBinary(e));
}
function hn(a, e, n, t) {
  G(t !== void 0);
  let [o, i] = Vi(e);
  a.tag(n, o)[i](t);
}
function hh(a, e, n, t) {
  if (!t.length)
    return;
  a.tag(n, B.LengthDelimited).fork();
  let [, o] = Vi(e);
  for (let i = 0; i < t.length; i++)
    a[o](t[i]);
  a.join();
}
function Vi(a) {
  let e = B.Varint;
  switch (a) {
    case f.BYTES:
    case f.STRING:
      e = B.LengthDelimited;
      break;
    case f.DOUBLE:
    case f.FIXED64:
    case f.SFIXED64:
      e = B.Bit64;
      break;
    case f.FIXED32:
    case f.SFIXED32:
    case f.FLOAT:
      e = B.Bit32;
      break;
  }
  const n = f[a].toLowerCase();
  return [e, n];
}
function fh() {
  return {
    setEnumType: Ai,
    initPartial(a, e) {
      if (a === void 0)
        return;
      const n = e.getType();
      for (const t of n.fields.byMember()) {
        const o = t.localName, i = e, r = a;
        if (r[o] != null)
          switch (t.kind) {
            case "oneof":
              const c = r[o].case;
              if (c === void 0)
                continue;
              const d = t.findField(c);
              let p = r[o].value;
              d && d.kind == "message" && !We(p, d.T) ? p = new d.T(p) : d && d.kind === "scalar" && d.T === f.BYTES && (p = Tn(p)), i[o] = { case: c, value: p };
              break;
            case "scalar":
            case "enum":
              let T = r[o];
              t.T === f.BYTES && (T = t.repeated ? T.map(Tn) : Tn(T)), i[o] = T;
              break;
            case "map":
              switch (t.V.kind) {
                case "scalar":
                case "enum":
                  if (t.V.T === f.BYTES)
                    for (const [h, I] of Object.entries(r[o]))
                      i[o][h] = Tn(I);
                  else
                    Object.assign(i[o], r[o]);
                  break;
                case "message":
                  const S = t.V.T;
                  for (const h of Object.keys(r[o])) {
                    let I = r[o][h];
                    S.fieldWrapper || (I = new S(I)), i[o][h] = I;
                  }
                  break;
              }
              break;
            case "message":
              const R = t.T;
              if (t.repeated)
                i[o] = r[o].map((S) => We(S, R) ? S : new R(S));
              else {
                const S = r[o];
                R.fieldWrapper ? /* We can't use BytesValue.typeName as that will create a circular import */ R.typeName === "google.protobuf.BytesValue" ? i[o] = Tn(S) : i[o] = S : i[o] = We(S, R) ? S : new R(S);
              }
              break;
          }
      }
    },
    // TODO use isFieldSet() here to support future field presence
    equals(a, e, n) {
      return e === n ? !0 : !e || !n ? !1 : a.fields.byMember().every((t) => {
        const o = e[t.localName], i = n[t.localName];
        if (t.repeated) {
          if (o.length !== i.length)
            return !1;
          switch (t.kind) {
            case "message":
              return o.every((r, c) => t.T.equals(r, i[c]));
            case "scalar":
              return o.every((r, c) => Le(t.T, r, i[c]));
            case "enum":
              return o.every((r, c) => Le(f.INT32, r, i[c]));
          }
          throw new Error(`repeated cannot contain ${t.kind}`);
        }
        switch (t.kind) {
          case "message":
            return t.T.equals(o, i);
          case "enum":
            return Le(f.INT32, o, i);
          case "scalar":
            return Le(t.T, o, i);
          case "oneof":
            if (o.case !== i.case)
              return !1;
            const r = t.findField(o.case);
            if (r === void 0)
              return !0;
            switch (r.kind) {
              case "message":
                return r.T.equals(o.value, i.value);
              case "enum":
                return Le(f.INT32, o.value, i.value);
              case "scalar":
                return Le(r.T, o.value, i.value);
            }
            throw new Error(`oneof cannot contain ${r.kind}`);
          case "map":
            const c = Object.keys(o).concat(Object.keys(i));
            switch (t.V.kind) {
              case "message":
                const d = t.V.T;
                return c.every((T) => d.equals(o[T], i[T]));
              case "enum":
                return c.every((T) => Le(f.INT32, o[T], i[T]));
              case "scalar":
                const p = t.V.T;
                return c.every((T) => Le(p, o[T], i[T]));
            }
            break;
        }
      });
    },
    // TODO use isFieldSet() here to support future field presence
    clone(a) {
      const e = a.getType(), n = new e(), t = n;
      for (const o of e.fields.byMember()) {
        const i = a[o.localName];
        let r;
        if (o.repeated)
          r = i.map(Gn);
        else if (o.kind == "map") {
          r = t[o.localName];
          for (const [c, d] of Object.entries(i))
            r[c] = Gn(d);
        } else o.kind == "oneof" ? r = o.findField(i.case) ? { case: i.case, value: Gn(i.value) } : { case: void 0 } : r = Gn(i);
        t[o.localName] = r;
      }
      for (const o of e.runtime.bin.listUnknownFields(a))
        e.runtime.bin.onUnknownField(t, o.no, o.wireType, o.data);
      return n;
    }
  };
}
function Gn(a) {
  if (a === void 0)
    return a;
  if (We(a))
    return a.clone();
  if (a instanceof Uint8Array) {
    const e = new Uint8Array(a.byteLength);
    return e.set(a), e;
  }
  return a;
}
function Tn(a) {
  return a instanceof Uint8Array ? a : new Uint8Array(a);
}
function Wi(a, e, n) {
  return {
    syntax: a,
    json: lh(),
    bin: Th(),
    util: Object.assign(Object.assign({}, fh()), {
      newFieldList: e,
      initFields: n
    }),
    makeMessageType(t, o, i) {
      return Kv(this, t, o, i);
    },
    makeEnum: Hv,
    makeEnumType: qi,
    getEnumType: jv,
    makeExtension(t, o, i) {
      return th(this, t, o, i);
    }
  };
}
class ji {
  constructor(e, n) {
    this._fields = e, this._normalizer = n;
  }
  findJsonName(e) {
    if (!this.jsonNames) {
      const n = {};
      for (const t of this.list())
        n[t.jsonName] = n[t.name] = t;
      this.jsonNames = n;
    }
    return this.jsonNames[e];
  }
  find(e) {
    if (!this.numbers) {
      const n = {};
      for (const t of this.list())
        n[t.no] = t;
      this.numbers = n;
    }
    return this.numbers[e];
  }
  list() {
    return this.all || (this.all = this._normalizer(this._fields)), this.all;
  }
  byNumber() {
    return this.numbersAsc || (this.numbersAsc = this.list().concat().sort((e, n) => e.no - n.no)), this.numbersAsc;
  }
  byMember() {
    if (!this.members) {
      this.members = [];
      const e = this.members;
      let n;
      for (const t of this.list())
        t.oneof ? t.oneof !== n && (n = t.oneof, e.push(n)) : e.push(t);
    }
    return this.members;
  }
}
function Hi(a, e) {
  const n = Ki(a);
  return e ? n : Mh(bh(n));
}
function Rh(a) {
  return Hi(a, !1);
}
const _h = Ki;
function Ki(a) {
  let e = !1;
  const n = [];
  for (let t = 0; t < a.length; t++) {
    let o = a.charAt(t);
    switch (o) {
      case "_":
        e = !0;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        n.push(o), e = !1;
        break;
      default:
        e && (e = !1, o = o.toUpperCase()), n.push(o);
        break;
    }
  }
  return n.join("");
}
const Sh = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]), Ih = /* @__PURE__ */ new Set([
  // names reserved by the runtime
  "getType",
  "clone",
  "equals",
  "fromBinary",
  "fromJson",
  "fromJsonString",
  "toBinary",
  "toJson",
  "toJsonString",
  // names reserved by the runtime for the future
  "toObject"
]), Xi = (a) => `${a}$`, bh = (a) => Ih.has(a) ? Xi(a) : a, Mh = (a) => Sh.has(a) ? Xi(a) : a;
class Eh {
  constructor(e) {
    this.kind = "oneof", this.repeated = !1, this.packed = !1, this.opt = !1, this.req = !1, this.default = void 0, this.fields = [], this.name = e, this.localName = Rh(e);
  }
  addField(e) {
    G(e.oneof === this, `field ${e.name} not one of ${this.name}`), this.fields.push(e);
  }
  findField(e) {
    if (!this._lookup) {
      this._lookup = /* @__PURE__ */ Object.create(null);
      for (let n = 0; n < this.fields.length; n++)
        this._lookup[this.fields[n].localName] = this.fields[n];
    }
    return this._lookup[e];
  }
}
function Qi(a, e) {
  var n, t, o, i, r, c;
  const d = [];
  let p;
  for (const T of typeof a == "function" ? a() : a) {
    const R = T;
    if (R.localName = Hi(T.name, T.oneof !== void 0), R.jsonName = (n = T.jsonName) !== null && n !== void 0 ? n : _h(T.name), R.repeated = (t = T.repeated) !== null && t !== void 0 ? t : !1, T.kind == "scalar" && (R.L = (o = T.L) !== null && o !== void 0 ? o : Je.BIGINT), R.delimited = (i = T.delimited) !== null && i !== void 0 ? i : !1, R.req = (r = T.req) !== null && r !== void 0 ? r : !1, R.opt = (c = T.opt) !== null && c !== void 0 ? c : !1, T.packed === void 0 && (e ? R.packed = T.kind == "enum" || T.kind == "scalar" && T.T != f.BYTES && T.T != f.STRING : R.packed = !1), T.oneof !== void 0) {
      const S = typeof T.oneof == "string" ? T.oneof : T.oneof.name;
      (!p || p.name != S) && (p = new Eh(S)), R.oneof = p, p.addField(R);
    }
    d.push(R);
  }
  return d;
}
const s = Wi(
  "proto3",
  (a) => new ji(a, (e) => Qi(e, !0)),
  // TODO merge with proto2 and initExtensionField, also see initPartial, equals, clone
  (a) => {
    for (const e of a.getType().fields.byMember()) {
      if (e.opt)
        continue;
      const n = e.localName, t = a;
      if (e.repeated) {
        t[n] = [];
        continue;
      }
      switch (e.kind) {
        case "oneof":
          t[n] = { case: void 0 };
          break;
        case "enum":
          t[n] = 0;
          break;
        case "map":
          t[n] = {};
          break;
        case "scalar":
          t[n] = rn(e.T, e.L);
          break;
      }
    }
  }
), u = Wi(
  "proto2",
  (a) => new ji(a, (e) => Qi(e, !1)),
  // TODO merge with proto3 and initExtensionField, also see initPartial, equals, clone
  (a) => {
    for (const e of a.getType().fields.byMember()) {
      const n = e.localName, t = a;
      if (e.repeated) {
        t[n] = [];
        continue;
      }
      switch (e.kind) {
        case "oneof":
          t[n] = { case: void 0 };
          break;
        case "map":
          t[n] = {};
          break;
      }
    }
  }
);
var m;
(function(a) {
  a[a.Unary = 0] = "Unary", a[a.ServerStreaming = 1] = "ServerStreaming", a[a.ClientStreaming = 2] = "ClientStreaming", a[a.BiDiStreaming = 3] = "BiDiStreaming";
})(m || (m = {}));
var ui;
(function(a) {
  a[a.NoSideEffects = 1] = "NoSideEffects", a[a.Idempotent = 2] = "Idempotent";
})(ui || (ui = {}));
var ne;
(function(a) {
  a[a.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", a[a.EDITION_LEGACY = 900] = "EDITION_LEGACY", a[a.EDITION_PROTO2 = 998] = "EDITION_PROTO2", a[a.EDITION_PROTO3 = 999] = "EDITION_PROTO3", a[a.EDITION_2023 = 1e3] = "EDITION_2023", a[a.EDITION_2024 = 1001] = "EDITION_2024", a[a.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", a[a.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", a[a.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", a[a.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", a[a.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", a[a.EDITION_MAX = 2147483647] = "EDITION_MAX";
})(ne || (ne = {}));
u.util.setEnumType(ne, "google.protobuf.Edition", [
  { no: 0, name: "EDITION_UNKNOWN" },
  { no: 900, name: "EDITION_LEGACY" },
  { no: 998, name: "EDITION_PROTO2" },
  { no: 999, name: "EDITION_PROTO3" },
  { no: 1e3, name: "EDITION_2023" },
  { no: 1001, name: "EDITION_2024" },
  { no: 1, name: "EDITION_1_TEST_ONLY" },
  { no: 2, name: "EDITION_2_TEST_ONLY" },
  { no: 99997, name: "EDITION_99997_TEST_ONLY" },
  { no: 99998, name: "EDITION_99998_TEST_ONLY" },
  { no: 99999, name: "EDITION_99999_TEST_ONLY" },
  { no: 2147483647, name: "EDITION_MAX" }
]);
class Be extends E {
  constructor(e) {
    super(), this.file = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Be().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Be().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Be().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Be, e, n);
  }
}
Be.runtime = u;
Be.typeName = "google.protobuf.FileDescriptorSet";
Be.fields = u.util.newFieldList(() => [
  { no: 1, name: "file", kind: "message", T: se, repeated: !0 }
]);
class se extends E {
  constructor(e) {
    super(), this.dependency = [], this.publicDependency = [], this.weakDependency = [], this.messageType = [], this.enumType = [], this.service = [], this.extension = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new se().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new se().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new se().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(se, e, n);
  }
}
se.runtime = u;
se.typeName = "google.protobuf.FileDescriptorProto";
se.fields = u.util.newFieldList(() => [
  { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
  { no: 2, name: "package", kind: "scalar", T: 9, opt: !0 },
  { no: 3, name: "dependency", kind: "scalar", T: 9, repeated: !0 },
  { no: 10, name: "public_dependency", kind: "scalar", T: 5, repeated: !0 },
  { no: 11, name: "weak_dependency", kind: "scalar", T: 5, repeated: !0 },
  { no: 4, name: "message_type", kind: "message", T: oe, repeated: !0 },
  { no: 5, name: "enum_type", kind: "message", T: ie, repeated: !0 },
  { no: 6, name: "service", kind: "message", T: he, repeated: !0 },
  { no: 7, name: "extension", kind: "message", T: ee, repeated: !0 },
  { no: 8, name: "options", kind: "message", T: Re, opt: !0 },
  { no: 9, name: "source_code_info", kind: "message", T: Ne, opt: !0 },
  { no: 12, name: "syntax", kind: "scalar", T: 9, opt: !0 },
  { no: 14, name: "edition", kind: "enum", T: u.getEnumType(ne), opt: !0 }
]);
class oe extends E {
  constructor(e) {
    super(), this.field = [], this.extension = [], this.nestedType = [], this.enumType = [], this.extensionRange = [], this.oneofDecl = [], this.reservedRange = [], this.reservedName = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new oe().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new oe().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new oe().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(oe, e, n);
  }
}
oe.runtime = u;
oe.typeName = "google.protobuf.DescriptorProto";
oe.fields = u.util.newFieldList(() => [
  { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
  { no: 2, name: "field", kind: "message", T: ee, repeated: !0 },
  { no: 6, name: "extension", kind: "message", T: ee, repeated: !0 },
  { no: 3, name: "nested_type", kind: "message", T: oe, repeated: !0 },
  { no: 4, name: "enum_type", kind: "message", T: ie, repeated: !0 },
  { no: 5, name: "extension_range", kind: "message", T: pe, repeated: !0 },
  { no: 8, name: "oneof_decl", kind: "message", T: ke, repeated: !0 },
  { no: 7, name: "options", kind: "message", T: _e, opt: !0 },
  { no: 9, name: "reserved_range", kind: "message", T: ue, repeated: !0 },
  { no: 10, name: "reserved_name", kind: "scalar", T: 9, repeated: !0 }
]);
class pe extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new pe().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new pe().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new pe().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(pe, e, n);
  }
}
pe.runtime = u;
pe.typeName = "google.protobuf.DescriptorProto.ExtensionRange";
pe.fields = u.util.newFieldList(() => [
  { no: 1, name: "start", kind: "scalar", T: 5, opt: !0 },
  { no: 2, name: "end", kind: "scalar", T: 5, opt: !0 },
  { no: 3, name: "options", kind: "message", T: ge, opt: !0 }
]);
class ue extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new ue().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new ue().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new ue().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(ue, e, n);
  }
}
ue.runtime = u;
ue.typeName = "google.protobuf.DescriptorProto.ReservedRange";
ue.fields = u.util.newFieldList(() => [
  { no: 1, name: "start", kind: "scalar", T: 5, opt: !0 },
  { no: 2, name: "end", kind: "scalar", T: 5, opt: !0 }
]);
class ge extends E {
  constructor(e) {
    super(), this.uninterpretedOption = [], this.declaration = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new ge().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new ge().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new ge().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(ge, e, n);
  }
}
ge.runtime = u;
ge.typeName = "google.protobuf.ExtensionRangeOptions";
ge.fields = u.util.newFieldList(() => [
  { no: 999, name: "uninterpreted_option", kind: "message", T: W, repeated: !0 },
  { no: 2, name: "declaration", kind: "message", T: Te, repeated: !0 },
  { no: 50, name: "features", kind: "message", T: $, opt: !0 },
  { no: 3, name: "verification", kind: "enum", T: u.getEnumType(fn), opt: !0, default: fn.UNVERIFIED }
]);
var fn;
(function(a) {
  a[a.DECLARATION = 0] = "DECLARATION", a[a.UNVERIFIED = 1] = "UNVERIFIED";
})(fn || (fn = {}));
u.util.setEnumType(fn, "google.protobuf.ExtensionRangeOptions.VerificationState", [
  { no: 0, name: "DECLARATION" },
  { no: 1, name: "UNVERIFIED" }
]);
class Te extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Te().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Te().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Te().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Te, e, n);
  }
}
Te.runtime = u;
Te.typeName = "google.protobuf.ExtensionRangeOptions.Declaration";
Te.fields = u.util.newFieldList(() => [
  { no: 1, name: "number", kind: "scalar", T: 5, opt: !0 },
  { no: 2, name: "full_name", kind: "scalar", T: 9, opt: !0 },
  { no: 3, name: "type", kind: "scalar", T: 9, opt: !0 },
  { no: 5, name: "reserved", kind: "scalar", T: 8, opt: !0 },
  { no: 6, name: "repeated", kind: "scalar", T: 8, opt: !0 }
]);
class ee extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new ee().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new ee().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new ee().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(ee, e, n);
  }
}
ee.runtime = u;
ee.typeName = "google.protobuf.FieldDescriptorProto";
ee.fields = u.util.newFieldList(() => [
  { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
  { no: 3, name: "number", kind: "scalar", T: 5, opt: !0 },
  { no: 4, name: "label", kind: "enum", T: u.getEnumType(Hn), opt: !0 },
  { no: 5, name: "type", kind: "enum", T: u.getEnumType(jn), opt: !0 },
  { no: 6, name: "type_name", kind: "scalar", T: 9, opt: !0 },
  { no: 2, name: "extendee", kind: "scalar", T: 9, opt: !0 },
  { no: 7, name: "default_value", kind: "scalar", T: 9, opt: !0 },
  { no: 9, name: "oneof_index", kind: "scalar", T: 5, opt: !0 },
  { no: 10, name: "json_name", kind: "scalar", T: 9, opt: !0 },
  { no: 8, name: "options", kind: "message", T: Se, opt: !0 },
  { no: 17, name: "proto3_optional", kind: "scalar", T: 8, opt: !0 }
]);
var jn;
(function(a) {
  a[a.DOUBLE = 1] = "DOUBLE", a[a.FLOAT = 2] = "FLOAT", a[a.INT64 = 3] = "INT64", a[a.UINT64 = 4] = "UINT64", a[a.INT32 = 5] = "INT32", a[a.FIXED64 = 6] = "FIXED64", a[a.FIXED32 = 7] = "FIXED32", a[a.BOOL = 8] = "BOOL", a[a.STRING = 9] = "STRING", a[a.GROUP = 10] = "GROUP", a[a.MESSAGE = 11] = "MESSAGE", a[a.BYTES = 12] = "BYTES", a[a.UINT32 = 13] = "UINT32", a[a.ENUM = 14] = "ENUM", a[a.SFIXED32 = 15] = "SFIXED32", a[a.SFIXED64 = 16] = "SFIXED64", a[a.SINT32 = 17] = "SINT32", a[a.SINT64 = 18] = "SINT64";
})(jn || (jn = {}));
u.util.setEnumType(jn, "google.protobuf.FieldDescriptorProto.Type", [
  { no: 1, name: "TYPE_DOUBLE" },
  { no: 2, name: "TYPE_FLOAT" },
  { no: 3, name: "TYPE_INT64" },
  { no: 4, name: "TYPE_UINT64" },
  { no: 5, name: "TYPE_INT32" },
  { no: 6, name: "TYPE_FIXED64" },
  { no: 7, name: "TYPE_FIXED32" },
  { no: 8, name: "TYPE_BOOL" },
  { no: 9, name: "TYPE_STRING" },
  { no: 10, name: "TYPE_GROUP" },
  { no: 11, name: "TYPE_MESSAGE" },
  { no: 12, name: "TYPE_BYTES" },
  { no: 13, name: "TYPE_UINT32" },
  { no: 14, name: "TYPE_ENUM" },
  { no: 15, name: "TYPE_SFIXED32" },
  { no: 16, name: "TYPE_SFIXED64" },
  { no: 17, name: "TYPE_SINT32" },
  { no: 18, name: "TYPE_SINT64" }
]);
var Hn;
(function(a) {
  a[a.OPTIONAL = 1] = "OPTIONAL", a[a.REPEATED = 3] = "REPEATED", a[a.REQUIRED = 2] = "REQUIRED";
})(Hn || (Hn = {}));
u.util.setEnumType(Hn, "google.protobuf.FieldDescriptorProto.Label", [
  { no: 1, name: "LABEL_OPTIONAL" },
  { no: 3, name: "LABEL_REPEATED" },
  { no: 2, name: "LABEL_REQUIRED" }
]);
class ke extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new ke().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new ke().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new ke().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(ke, e, n);
  }
}
ke.runtime = u;
ke.typeName = "google.protobuf.OneofDescriptorProto";
ke.fields = u.util.newFieldList(() => [
  { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
  { no: 2, name: "options", kind: "message", T: be, opt: !0 }
]);
class ie extends E {
  constructor(e) {
    super(), this.value = [], this.reservedRange = [], this.reservedName = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new ie().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new ie().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new ie().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(ie, e, n);
  }
}
ie.runtime = u;
ie.typeName = "google.protobuf.EnumDescriptorProto";
ie.fields = u.util.newFieldList(() => [
  { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
  { no: 2, name: "value", kind: "message", T: ve, repeated: !0 },
  { no: 3, name: "options", kind: "message", T: Me, opt: !0 },
  { no: 4, name: "reserved_range", kind: "message", T: ye, repeated: !0 },
  { no: 5, name: "reserved_name", kind: "scalar", T: 9, repeated: !0 }
]);
class ye extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new ye().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new ye().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new ye().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(ye, e, n);
  }
}
ye.runtime = u;
ye.typeName = "google.protobuf.EnumDescriptorProto.EnumReservedRange";
ye.fields = u.util.newFieldList(() => [
  { no: 1, name: "start", kind: "scalar", T: 5, opt: !0 },
  { no: 2, name: "end", kind: "scalar", T: 5, opt: !0 }
]);
class ve extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new ve().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new ve().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new ve().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(ve, e, n);
  }
}
ve.runtime = u;
ve.typeName = "google.protobuf.EnumValueDescriptorProto";
ve.fields = u.util.newFieldList(() => [
  { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
  { no: 2, name: "number", kind: "scalar", T: 5, opt: !0 },
  { no: 3, name: "options", kind: "message", T: Ee, opt: !0 }
]);
class he extends E {
  constructor(e) {
    super(), this.method = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new he().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new he().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new he().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(he, e, n);
  }
}
he.runtime = u;
he.typeName = "google.protobuf.ServiceDescriptorProto";
he.fields = u.util.newFieldList(() => [
  { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
  { no: 2, name: "method", kind: "message", T: fe, repeated: !0 },
  { no: 3, name: "options", kind: "message", T: we, opt: !0 }
]);
class fe extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new fe().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new fe().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new fe().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(fe, e, n);
  }
}
fe.runtime = u;
fe.typeName = "google.protobuf.MethodDescriptorProto";
fe.fields = u.util.newFieldList(() => [
  { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
  { no: 2, name: "input_type", kind: "scalar", T: 9, opt: !0 },
  { no: 3, name: "output_type", kind: "scalar", T: 9, opt: !0 },
  { no: 4, name: "options", kind: "message", T: me, opt: !0 },
  { no: 5, name: "client_streaming", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 6, name: "server_streaming", kind: "scalar", T: 8, opt: !0, default: !1 }
]);
class Re extends E {
  constructor(e) {
    super(), this.uninterpretedOption = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Re().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Re().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Re().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Re, e, n);
  }
}
Re.runtime = u;
Re.typeName = "google.protobuf.FileOptions";
Re.fields = u.util.newFieldList(() => [
  { no: 1, name: "java_package", kind: "scalar", T: 9, opt: !0 },
  { no: 8, name: "java_outer_classname", kind: "scalar", T: 9, opt: !0 },
  { no: 10, name: "java_multiple_files", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 20, name: "java_generate_equals_and_hash", kind: "scalar", T: 8, opt: !0 },
  { no: 27, name: "java_string_check_utf8", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 9, name: "optimize_for", kind: "enum", T: u.getEnumType(Rn), opt: !0, default: Rn.SPEED },
  { no: 11, name: "go_package", kind: "scalar", T: 9, opt: !0 },
  { no: 16, name: "cc_generic_services", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 17, name: "java_generic_services", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 18, name: "py_generic_services", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 23, name: "deprecated", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 31, name: "cc_enable_arenas", kind: "scalar", T: 8, opt: !0, default: !0 },
  { no: 36, name: "objc_class_prefix", kind: "scalar", T: 9, opt: !0 },
  { no: 37, name: "csharp_namespace", kind: "scalar", T: 9, opt: !0 },
  { no: 39, name: "swift_prefix", kind: "scalar", T: 9, opt: !0 },
  { no: 40, name: "php_class_prefix", kind: "scalar", T: 9, opt: !0 },
  { no: 41, name: "php_namespace", kind: "scalar", T: 9, opt: !0 },
  { no: 44, name: "php_metadata_namespace", kind: "scalar", T: 9, opt: !0 },
  { no: 45, name: "ruby_package", kind: "scalar", T: 9, opt: !0 },
  { no: 50, name: "features", kind: "message", T: $, opt: !0 },
  { no: 999, name: "uninterpreted_option", kind: "message", T: W, repeated: !0 }
]);
var Rn;
(function(a) {
  a[a.SPEED = 1] = "SPEED", a[a.CODE_SIZE = 2] = "CODE_SIZE", a[a.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(Rn || (Rn = {}));
u.util.setEnumType(Rn, "google.protobuf.FileOptions.OptimizeMode", [
  { no: 1, name: "SPEED" },
  { no: 2, name: "CODE_SIZE" },
  { no: 3, name: "LITE_RUNTIME" }
]);
class _e extends E {
  constructor(e) {
    super(), this.uninterpretedOption = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new _e().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new _e().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new _e().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(_e, e, n);
  }
}
_e.runtime = u;
_e.typeName = "google.protobuf.MessageOptions";
_e.fields = u.util.newFieldList(() => [
  { no: 1, name: "message_set_wire_format", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 2, name: "no_standard_descriptor_accessor", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 3, name: "deprecated", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 7, name: "map_entry", kind: "scalar", T: 8, opt: !0 },
  { no: 11, name: "deprecated_legacy_json_field_conflicts", kind: "scalar", T: 8, opt: !0 },
  { no: 12, name: "features", kind: "message", T: $, opt: !0 },
  { no: 999, name: "uninterpreted_option", kind: "message", T: W, repeated: !0 }
]);
class Se extends E {
  constructor(e) {
    super(), this.targets = [], this.editionDefaults = [], this.uninterpretedOption = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Se().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Se().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Se().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Se, e, n);
  }
}
Se.runtime = u;
Se.typeName = "google.protobuf.FieldOptions";
Se.fields = u.util.newFieldList(() => [
  { no: 1, name: "ctype", kind: "enum", T: u.getEnumType(_n), opt: !0, default: _n.STRING },
  { no: 2, name: "packed", kind: "scalar", T: 8, opt: !0 },
  { no: 6, name: "jstype", kind: "enum", T: u.getEnumType(Sn), opt: !0, default: Sn.JS_NORMAL },
  { no: 5, name: "lazy", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 15, name: "unverified_lazy", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 3, name: "deprecated", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 10, name: "weak", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 16, name: "debug_redact", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 17, name: "retention", kind: "enum", T: u.getEnumType(Kn), opt: !0 },
  { no: 19, name: "targets", kind: "enum", T: u.getEnumType(Xn), repeated: !0 },
  { no: 20, name: "edition_defaults", kind: "message", T: Ie, repeated: !0 },
  { no: 21, name: "features", kind: "message", T: $, opt: !0 },
  { no: 22, name: "feature_support", kind: "message", T: re, opt: !0 },
  { no: 999, name: "uninterpreted_option", kind: "message", T: W, repeated: !0 }
]);
var _n;
(function(a) {
  a[a.STRING = 0] = "STRING", a[a.CORD = 1] = "CORD", a[a.STRING_PIECE = 2] = "STRING_PIECE";
})(_n || (_n = {}));
u.util.setEnumType(_n, "google.protobuf.FieldOptions.CType", [
  { no: 0, name: "STRING" },
  { no: 1, name: "CORD" },
  { no: 2, name: "STRING_PIECE" }
]);
var Sn;
(function(a) {
  a[a.JS_NORMAL = 0] = "JS_NORMAL", a[a.JS_STRING = 1] = "JS_STRING", a[a.JS_NUMBER = 2] = "JS_NUMBER";
})(Sn || (Sn = {}));
u.util.setEnumType(Sn, "google.protobuf.FieldOptions.JSType", [
  { no: 0, name: "JS_NORMAL" },
  { no: 1, name: "JS_STRING" },
  { no: 2, name: "JS_NUMBER" }
]);
var Kn;
(function(a) {
  a[a.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", a[a.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", a[a.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(Kn || (Kn = {}));
u.util.setEnumType(Kn, "google.protobuf.FieldOptions.OptionRetention", [
  { no: 0, name: "RETENTION_UNKNOWN" },
  { no: 1, name: "RETENTION_RUNTIME" },
  { no: 2, name: "RETENTION_SOURCE" }
]);
var Xn;
(function(a) {
  a[a.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", a[a.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", a[a.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", a[a.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", a[a.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", a[a.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", a[a.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", a[a.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", a[a.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", a[a.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(Xn || (Xn = {}));
u.util.setEnumType(Xn, "google.protobuf.FieldOptions.OptionTargetType", [
  { no: 0, name: "TARGET_TYPE_UNKNOWN" },
  { no: 1, name: "TARGET_TYPE_FILE" },
  { no: 2, name: "TARGET_TYPE_EXTENSION_RANGE" },
  { no: 3, name: "TARGET_TYPE_MESSAGE" },
  { no: 4, name: "TARGET_TYPE_FIELD" },
  { no: 5, name: "TARGET_TYPE_ONEOF" },
  { no: 6, name: "TARGET_TYPE_ENUM" },
  { no: 7, name: "TARGET_TYPE_ENUM_ENTRY" },
  { no: 8, name: "TARGET_TYPE_SERVICE" },
  { no: 9, name: "TARGET_TYPE_METHOD" }
]);
class Ie extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Ie().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Ie().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Ie().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Ie, e, n);
  }
}
Ie.runtime = u;
Ie.typeName = "google.protobuf.FieldOptions.EditionDefault";
Ie.fields = u.util.newFieldList(() => [
  { no: 3, name: "edition", kind: "enum", T: u.getEnumType(ne), opt: !0 },
  { no: 2, name: "value", kind: "scalar", T: 9, opt: !0 }
]);
class re extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new re().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new re().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new re().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(re, e, n);
  }
}
re.runtime = u;
re.typeName = "google.protobuf.FieldOptions.FeatureSupport";
re.fields = u.util.newFieldList(() => [
  { no: 1, name: "edition_introduced", kind: "enum", T: u.getEnumType(ne), opt: !0 },
  { no: 2, name: "edition_deprecated", kind: "enum", T: u.getEnumType(ne), opt: !0 },
  { no: 3, name: "deprecation_warning", kind: "scalar", T: 9, opt: !0 },
  { no: 4, name: "edition_removed", kind: "enum", T: u.getEnumType(ne), opt: !0 }
]);
class be extends E {
  constructor(e) {
    super(), this.uninterpretedOption = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new be().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new be().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new be().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(be, e, n);
  }
}
be.runtime = u;
be.typeName = "google.protobuf.OneofOptions";
be.fields = u.util.newFieldList(() => [
  { no: 1, name: "features", kind: "message", T: $, opt: !0 },
  { no: 999, name: "uninterpreted_option", kind: "message", T: W, repeated: !0 }
]);
class Me extends E {
  constructor(e) {
    super(), this.uninterpretedOption = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Me().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Me().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Me().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Me, e, n);
  }
}
Me.runtime = u;
Me.typeName = "google.protobuf.EnumOptions";
Me.fields = u.util.newFieldList(() => [
  { no: 2, name: "allow_alias", kind: "scalar", T: 8, opt: !0 },
  { no: 3, name: "deprecated", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 6, name: "deprecated_legacy_json_field_conflicts", kind: "scalar", T: 8, opt: !0 },
  { no: 7, name: "features", kind: "message", T: $, opt: !0 },
  { no: 999, name: "uninterpreted_option", kind: "message", T: W, repeated: !0 }
]);
class Ee extends E {
  constructor(e) {
    super(), this.uninterpretedOption = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Ee().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Ee().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Ee().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Ee, e, n);
  }
}
Ee.runtime = u;
Ee.typeName = "google.protobuf.EnumValueOptions";
Ee.fields = u.util.newFieldList(() => [
  { no: 1, name: "deprecated", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 2, name: "features", kind: "message", T: $, opt: !0 },
  { no: 3, name: "debug_redact", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 4, name: "feature_support", kind: "message", T: re, opt: !0 },
  { no: 999, name: "uninterpreted_option", kind: "message", T: W, repeated: !0 }
]);
class we extends E {
  constructor(e) {
    super(), this.uninterpretedOption = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new we().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new we().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new we().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(we, e, n);
  }
}
we.runtime = u;
we.typeName = "google.protobuf.ServiceOptions";
we.fields = u.util.newFieldList(() => [
  { no: 34, name: "features", kind: "message", T: $, opt: !0 },
  { no: 33, name: "deprecated", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 999, name: "uninterpreted_option", kind: "message", T: W, repeated: !0 }
]);
class me extends E {
  constructor(e) {
    super(), this.uninterpretedOption = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new me().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new me().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new me().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(me, e, n);
  }
}
me.runtime = u;
me.typeName = "google.protobuf.MethodOptions";
me.fields = u.util.newFieldList(() => [
  { no: 33, name: "deprecated", kind: "scalar", T: 8, opt: !0, default: !1 },
  { no: 34, name: "idempotency_level", kind: "enum", T: u.getEnumType(In), opt: !0, default: In.IDEMPOTENCY_UNKNOWN },
  { no: 35, name: "features", kind: "message", T: $, opt: !0 },
  { no: 999, name: "uninterpreted_option", kind: "message", T: W, repeated: !0 }
]);
var In;
(function(a) {
  a[a.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", a[a.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", a[a.IDEMPOTENT = 2] = "IDEMPOTENT";
})(In || (In = {}));
u.util.setEnumType(In, "google.protobuf.MethodOptions.IdempotencyLevel", [
  { no: 0, name: "IDEMPOTENCY_UNKNOWN" },
  { no: 1, name: "NO_SIDE_EFFECTS" },
  { no: 2, name: "IDEMPOTENT" }
]);
class W extends E {
  constructor(e) {
    super(), this.name = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new W().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new W().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new W().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(W, e, n);
  }
}
W.runtime = u;
W.typeName = "google.protobuf.UninterpretedOption";
W.fields = u.util.newFieldList(() => [
  { no: 2, name: "name", kind: "message", T: Oe, repeated: !0 },
  { no: 3, name: "identifier_value", kind: "scalar", T: 9, opt: !0 },
  { no: 4, name: "positive_int_value", kind: "scalar", T: 4, opt: !0 },
  { no: 5, name: "negative_int_value", kind: "scalar", T: 3, opt: !0 },
  { no: 6, name: "double_value", kind: "scalar", T: 1, opt: !0 },
  { no: 7, name: "string_value", kind: "scalar", T: 12, opt: !0 },
  { no: 8, name: "aggregate_value", kind: "scalar", T: 9, opt: !0 }
]);
class Oe extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Oe().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Oe().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Oe().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Oe, e, n);
  }
}
Oe.runtime = u;
Oe.typeName = "google.protobuf.UninterpretedOption.NamePart";
Oe.fields = u.util.newFieldList(() => [
  { no: 1, name: "name_part", kind: "scalar", T: 9, req: !0 },
  { no: 2, name: "is_extension", kind: "scalar", T: 8, req: !0 }
]);
class $ extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new $().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new $().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new $().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals($, e, n);
  }
}
$.runtime = u;
$.typeName = "google.protobuf.FeatureSet";
$.fields = u.util.newFieldList(() => [
  { no: 1, name: "field_presence", kind: "enum", T: u.getEnumType(Qn), opt: !0 },
  { no: 2, name: "enum_type", kind: "enum", T: u.getEnumType(Zn), opt: !0 },
  { no: 3, name: "repeated_field_encoding", kind: "enum", T: u.getEnumType(ea), opt: !0 },
  { no: 4, name: "utf8_validation", kind: "enum", T: u.getEnumType(na), opt: !0 },
  { no: 5, name: "message_encoding", kind: "enum", T: u.getEnumType(aa), opt: !0 },
  { no: 6, name: "json_format", kind: "enum", T: u.getEnumType(ta), opt: !0 }
]);
var Qn;
(function(a) {
  a[a.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", a[a.EXPLICIT = 1] = "EXPLICIT", a[a.IMPLICIT = 2] = "IMPLICIT", a[a.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(Qn || (Qn = {}));
u.util.setEnumType(Qn, "google.protobuf.FeatureSet.FieldPresence", [
  { no: 0, name: "FIELD_PRESENCE_UNKNOWN" },
  { no: 1, name: "EXPLICIT" },
  { no: 2, name: "IMPLICIT" },
  { no: 3, name: "LEGACY_REQUIRED" }
]);
var Zn;
(function(a) {
  a[a.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", a[a.OPEN = 1] = "OPEN", a[a.CLOSED = 2] = "CLOSED";
})(Zn || (Zn = {}));
u.util.setEnumType(Zn, "google.protobuf.FeatureSet.EnumType", [
  { no: 0, name: "ENUM_TYPE_UNKNOWN" },
  { no: 1, name: "OPEN" },
  { no: 2, name: "CLOSED" }
]);
var ea;
(function(a) {
  a[a.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", a[a.PACKED = 1] = "PACKED", a[a.EXPANDED = 2] = "EXPANDED";
})(ea || (ea = {}));
u.util.setEnumType(ea, "google.protobuf.FeatureSet.RepeatedFieldEncoding", [
  { no: 0, name: "REPEATED_FIELD_ENCODING_UNKNOWN" },
  { no: 1, name: "PACKED" },
  { no: 2, name: "EXPANDED" }
]);
var na;
(function(a) {
  a[a.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", a[a.VERIFY = 2] = "VERIFY", a[a.NONE = 3] = "NONE";
})(na || (na = {}));
u.util.setEnumType(na, "google.protobuf.FeatureSet.Utf8Validation", [
  { no: 0, name: "UTF8_VALIDATION_UNKNOWN" },
  { no: 2, name: "VERIFY" },
  { no: 3, name: "NONE" }
]);
var aa;
(function(a) {
  a[a.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", a[a.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", a[a.DELIMITED = 2] = "DELIMITED";
})(aa || (aa = {}));
u.util.setEnumType(aa, "google.protobuf.FeatureSet.MessageEncoding", [
  { no: 0, name: "MESSAGE_ENCODING_UNKNOWN" },
  { no: 1, name: "LENGTH_PREFIXED" },
  { no: 2, name: "DELIMITED" }
]);
var ta;
(function(a) {
  a[a.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", a[a.ALLOW = 1] = "ALLOW", a[a.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(ta || (ta = {}));
u.util.setEnumType(ta, "google.protobuf.FeatureSet.JsonFormat", [
  { no: 0, name: "JSON_FORMAT_UNKNOWN" },
  { no: 1, name: "ALLOW" },
  { no: 2, name: "LEGACY_BEST_EFFORT" }
]);
class xe extends E {
  constructor(e) {
    super(), this.defaults = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new xe().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new xe().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new xe().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(xe, e, n);
  }
}
xe.runtime = u;
xe.typeName = "google.protobuf.FeatureSetDefaults";
xe.fields = u.util.newFieldList(() => [
  { no: 1, name: "defaults", kind: "message", T: Ce, repeated: !0 },
  { no: 4, name: "minimum_edition", kind: "enum", T: u.getEnumType(ne), opt: !0 },
  { no: 5, name: "maximum_edition", kind: "enum", T: u.getEnumType(ne), opt: !0 }
]);
class Ce extends E {
  constructor(e) {
    super(), u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Ce().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Ce().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Ce().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Ce, e, n);
  }
}
Ce.runtime = u;
Ce.typeName = "google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault";
Ce.fields = u.util.newFieldList(() => [
  { no: 3, name: "edition", kind: "enum", T: u.getEnumType(ne), opt: !0 },
  { no: 4, name: "overridable_features", kind: "message", T: $, opt: !0 },
  { no: 5, name: "fixed_features", kind: "message", T: $, opt: !0 }
]);
class Ne extends E {
  constructor(e) {
    super(), this.location = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Ne().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Ne().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Ne().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Ne, e, n);
  }
}
Ne.runtime = u;
Ne.typeName = "google.protobuf.SourceCodeInfo";
Ne.fields = u.util.newFieldList(() => [
  { no: 1, name: "location", kind: "message", T: Pe, repeated: !0 }
]);
class Pe extends E {
  constructor(e) {
    super(), this.path = [], this.span = [], this.leadingDetachedComments = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Pe().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Pe().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Pe().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Pe, e, n);
  }
}
Pe.runtime = u;
Pe.typeName = "google.protobuf.SourceCodeInfo.Location";
Pe.fields = u.util.newFieldList(() => [
  { no: 1, name: "path", kind: "scalar", T: 5, repeated: !0, packed: !0 },
  { no: 2, name: "span", kind: "scalar", T: 5, repeated: !0, packed: !0 },
  { no: 3, name: "leading_comments", kind: "scalar", T: 9, opt: !0 },
  { no: 4, name: "trailing_comments", kind: "scalar", T: 9, opt: !0 },
  { no: 6, name: "leading_detached_comments", kind: "scalar", T: 9, repeated: !0 }
]);
class Fe extends E {
  constructor(e) {
    super(), this.annotation = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new Fe().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new Fe().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new Fe().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(Fe, e, n);
  }
}
Fe.runtime = u;
Fe.typeName = "google.protobuf.GeneratedCodeInfo";
Fe.fields = u.util.newFieldList(() => [
  { no: 1, name: "annotation", kind: "message", T: De, repeated: !0 }
]);
class De extends E {
  constructor(e) {
    super(), this.path = [], u.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new De().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new De().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new De().fromJsonString(e, n);
  }
  static equals(e, n) {
    return u.util.equals(De, e, n);
  }
}
De.runtime = u;
De.typeName = "google.protobuf.GeneratedCodeInfo.Annotation";
De.fields = u.util.newFieldList(() => [
  { no: 1, name: "path", kind: "scalar", T: 5, repeated: !0, packed: !0 },
  { no: 2, name: "source_file", kind: "scalar", T: 9, opt: !0 },
  { no: 3, name: "begin", kind: "scalar", T: 5, opt: !0 },
  { no: 4, name: "end", kind: "scalar", T: 5, opt: !0 },
  { no: 5, name: "semantic", kind: "enum", T: u.getEnumType(sa), opt: !0 }
]);
var sa;
(function(a) {
  a[a.NONE = 0] = "NONE", a[a.SET = 1] = "SET", a[a.ALIAS = 2] = "ALIAS";
})(sa || (sa = {}));
u.util.setEnumType(sa, "google.protobuf.GeneratedCodeInfo.Annotation.Semantic", [
  { no: 0, name: "NONE" },
  { no: 1, name: "SET" },
  { no: 2, name: "ALIAS" }
]);
class _ extends E {
  constructor(e) {
    super(), this.seconds = V.zero, this.nanos = 0, s.util.initPartial(e, this);
  }
  fromJson(e, n) {
    if (typeof e != "string")
      throw new Error(`cannot decode google.protobuf.Timestamp from JSON: ${s.json.debug(e)}`);
    const t = e.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
    if (!t)
      throw new Error("cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string");
    const o = Date.parse(t[1] + "-" + t[2] + "-" + t[3] + "T" + t[4] + ":" + t[5] + ":" + t[6] + (t[8] ? t[8] : "Z"));
    if (Number.isNaN(o))
      throw new Error("cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string");
    if (o < Date.parse("0001-01-01T00:00:00Z") || o > Date.parse("9999-12-31T23:59:59Z"))
      throw new Error("cannot decode message google.protobuf.Timestamp from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive");
    return this.seconds = V.parse(o / 1e3), this.nanos = 0, t[7] && (this.nanos = parseInt("1" + t[7] + "0".repeat(9 - t[7].length)) - 1e9), this;
  }
  toJson(e) {
    const n = Number(this.seconds) * 1e3;
    if (n < Date.parse("0001-01-01T00:00:00Z") || n > Date.parse("9999-12-31T23:59:59Z"))
      throw new Error("cannot encode google.protobuf.Timestamp to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive");
    if (this.nanos < 0)
      throw new Error("cannot encode google.protobuf.Timestamp to JSON: nanos must not be negative");
    let t = "Z";
    if (this.nanos > 0) {
      const o = (this.nanos + 1e9).toString().substring(1);
      o.substring(3) === "000000" ? t = "." + o.substring(0, 3) + "Z" : o.substring(6) === "000" ? t = "." + o.substring(0, 6) + "Z" : t = "." + o + "Z";
    }
    return new Date(n).toISOString().replace(".000Z", t);
  }
  toDate() {
    return new Date(Number(this.seconds) * 1e3 + Math.ceil(this.nanos / 1e6));
  }
  static now() {
    return _.fromDate(/* @__PURE__ */ new Date());
  }
  static fromDate(e) {
    const n = e.getTime();
    return new _({
      seconds: V.parse(Math.floor(n / 1e3)),
      nanos: n % 1e3 * 1e6
    });
  }
  static fromBinary(e, n) {
    return new _().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new _().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new _().fromJsonString(e, n);
  }
  static equals(e, n) {
    return s.util.equals(_, e, n);
  }
}
_.runtime = s;
_.typeName = "google.protobuf.Timestamp";
_.fields = s.util.newFieldList(() => [
  {
    no: 1,
    name: "seconds",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  {
    no: 2,
    name: "nanos",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
class F extends E {
  constructor(e) {
    super(), this.seconds = V.zero, this.nanos = 0, s.util.initPartial(e, this);
  }
  fromJson(e, n) {
    if (typeof e != "string")
      throw new Error(`cannot decode google.protobuf.Duration from JSON: ${s.json.debug(e)}`);
    const t = e.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
    if (t === null)
      throw new Error(`cannot decode google.protobuf.Duration from JSON: ${s.json.debug(e)}`);
    const o = Number(t[1]);
    if (o > 315576e6 || o < -315576e6)
      throw new Error(`cannot decode google.protobuf.Duration from JSON: ${s.json.debug(e)}`);
    if (this.seconds = V.parse(o), typeof t[2] == "string") {
      const i = t[2] + "0".repeat(9 - t[2].length);
      this.nanos = parseInt(i), (o < 0 || Object.is(o, -0)) && (this.nanos = -this.nanos);
    }
    return this;
  }
  toJson(e) {
    if (Number(this.seconds) > 315576e6 || Number(this.seconds) < -315576e6)
      throw new Error("cannot encode google.protobuf.Duration to JSON: value out of range");
    let n = this.seconds.toString();
    if (this.nanos !== 0) {
      let t = Math.abs(this.nanos).toString();
      t = "0".repeat(9 - t.length) + t, t.substring(3) === "000000" ? t = t.substring(0, 3) : t.substring(6) === "000" && (t = t.substring(0, 6)), n += "." + t, this.nanos < 0 && Number(this.seconds) == 0 && (n = "-" + n);
    }
    return n + "s";
  }
  static fromBinary(e, n) {
    return new F().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new F().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new F().fromJsonString(e, n);
  }
  static equals(e, n) {
    return s.util.equals(F, e, n);
  }
}
F.runtime = s;
F.typeName = "google.protobuf.Duration";
F.fields = s.util.newFieldList(() => [
  {
    no: 1,
    name: "seconds",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  {
    no: 2,
    name: "nanos",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
class j extends E {
  constructor(e) {
    super(), this.typeUrl = "", this.value = new Uint8Array(0), s.util.initPartial(e, this);
  }
  toJson(e) {
    var n;
    if (this.typeUrl === "")
      return {};
    const t = this.typeUrlToName(this.typeUrl), o = (n = e?.typeRegistry) === null || n === void 0 ? void 0 : n.findMessage(t);
    if (!o)
      throw new Error(`cannot encode message google.protobuf.Any to JSON: "${this.typeUrl}" is not in the type registry`);
    let r = o.fromBinary(this.value).toJson(e);
    return (t.startsWith("google.protobuf.") || r === null || Array.isArray(r) || typeof r != "object") && (r = { value: r }), r["@type"] = this.typeUrl, r;
  }
  fromJson(e, n) {
    var t;
    if (e === null || Array.isArray(e) || typeof e != "object")
      throw new Error(`cannot decode message google.protobuf.Any from JSON: expected object but got ${e === null ? "null" : Array.isArray(e) ? "array" : typeof e}`);
    if (Object.keys(e).length == 0)
      return this;
    const o = e["@type"];
    if (typeof o != "string" || o == "")
      throw new Error('cannot decode message google.protobuf.Any from JSON: "@type" is empty');
    const i = this.typeUrlToName(o), r = (t = n?.typeRegistry) === null || t === void 0 ? void 0 : t.findMessage(i);
    if (!r)
      throw new Error(`cannot decode message google.protobuf.Any from JSON: ${o} is not in the type registry`);
    let c;
    if (i.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(e, "value"))
      c = r.fromJson(e.value, n);
    else {
      const d = Object.assign({}, e);
      delete d["@type"], c = r.fromJson(d, n);
    }
    return this.packFrom(c), this;
  }
  packFrom(e) {
    this.value = e.toBinary(), this.typeUrl = this.typeNameToUrl(e.getType().typeName);
  }
  unpackTo(e) {
    return this.is(e.getType()) ? (e.fromBinary(this.value), !0) : !1;
  }
  unpack(e) {
    if (this.typeUrl === "")
      return;
    const n = e.findMessage(this.typeUrlToName(this.typeUrl));
    if (n)
      return n.fromBinary(this.value);
  }
  is(e) {
    if (this.typeUrl === "")
      return !1;
    const n = this.typeUrlToName(this.typeUrl);
    let t = "";
    return typeof e == "string" ? t = e : t = e.typeName, n === t;
  }
  typeNameToUrl(e) {
    return `type.googleapis.com/${e}`;
  }
  typeUrlToName(e) {
    if (!e.length)
      throw new Error(`invalid type url: ${e}`);
    const n = e.lastIndexOf("/"), t = n >= 0 ? e.substring(n + 1) : e;
    if (!t.length)
      throw new Error(`invalid type url: ${e}`);
    return t;
  }
  static pack(e) {
    const n = new j();
    return n.packFrom(e), n;
  }
  static fromBinary(e, n) {
    return new j().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new j().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new j().fromJsonString(e, n);
  }
  static equals(e, n) {
    return s.util.equals(j, e, n);
  }
}
j.runtime = s;
j.typeName = "google.protobuf.Any";
j.fields = s.util.newFieldList(() => [
  {
    no: 1,
    name: "type_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "value",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
var bn;
(function(a) {
  a[a.NULL_VALUE = 0] = "NULL_VALUE";
})(bn || (bn = {}));
s.util.setEnumType(bn, "google.protobuf.NullValue", [
  { no: 0, name: "NULL_VALUE" }
]);
class l extends E {
  constructor(e) {
    super(), this.fields = {}, s.util.initPartial(e, this);
  }
  toJson(e) {
    const n = {};
    for (const [t, o] of Object.entries(this.fields))
      n[t] = o.toJson(e);
    return n;
  }
  fromJson(e, n) {
    if (typeof e != "object" || e == null || Array.isArray(e))
      throw new Error("cannot decode google.protobuf.Struct from JSON " + s.json.debug(e));
    for (const [t, o] of Object.entries(e))
      this.fields[t] = X.fromJson(o);
    return this;
  }
  static fromBinary(e, n) {
    return new l().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new l().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new l().fromJsonString(e, n);
  }
  static equals(e, n) {
    return s.util.equals(l, e, n);
  }
}
l.runtime = s;
l.typeName = "google.protobuf.Struct";
l.fields = s.util.newFieldList(() => [
  { no: 1, name: "fields", kind: "map", K: 9, V: { kind: "message", T: X } }
]);
class X extends E {
  constructor(e) {
    super(), this.kind = { case: void 0 }, s.util.initPartial(e, this);
  }
  toJson(e) {
    switch (this.kind.case) {
      case "nullValue":
        return null;
      case "numberValue":
        if (!Number.isFinite(this.kind.value))
          throw new Error("google.protobuf.Value cannot be NaN or Infinity");
        return this.kind.value;
      case "boolValue":
        return this.kind.value;
      case "stringValue":
        return this.kind.value;
      case "structValue":
      case "listValue":
        return this.kind.value.toJson(Object.assign(Object.assign({}, e), { emitDefaultValues: !0 }));
    }
    throw new Error("google.protobuf.Value must have a value");
  }
  fromJson(e, n) {
    switch (typeof e) {
      case "number":
        this.kind = { case: "numberValue", value: e };
        break;
      case "string":
        this.kind = { case: "stringValue", value: e };
        break;
      case "boolean":
        this.kind = { case: "boolValue", value: e };
        break;
      case "object":
        e === null ? this.kind = { case: "nullValue", value: bn.NULL_VALUE } : Array.isArray(e) ? this.kind = { case: "listValue", value: ce.fromJson(e) } : this.kind = { case: "structValue", value: l.fromJson(e) };
        break;
      default:
        throw new Error("cannot decode google.protobuf.Value from JSON " + s.json.debug(e));
    }
    return this;
  }
  static fromBinary(e, n) {
    return new X().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new X().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new X().fromJsonString(e, n);
  }
  static equals(e, n) {
    return s.util.equals(X, e, n);
  }
}
X.runtime = s;
X.typeName = "google.protobuf.Value";
X.fields = s.util.newFieldList(() => [
  { no: 1, name: "null_value", kind: "enum", T: s.getEnumType(bn), oneof: "kind" },
  { no: 2, name: "number_value", kind: "scalar", T: 1, oneof: "kind" },
  { no: 3, name: "string_value", kind: "scalar", T: 9, oneof: "kind" },
  { no: 4, name: "bool_value", kind: "scalar", T: 8, oneof: "kind" },
  { no: 5, name: "struct_value", kind: "message", T: l, oneof: "kind" },
  { no: 6, name: "list_value", kind: "message", T: ce, oneof: "kind" }
]);
class ce extends E {
  constructor(e) {
    super(), this.values = [], s.util.initPartial(e, this);
  }
  toJson(e) {
    return this.values.map((n) => n.toJson());
  }
  fromJson(e, n) {
    if (!Array.isArray(e))
      throw new Error("cannot decode google.protobuf.ListValue from JSON " + s.json.debug(e));
    for (let t of e)
      this.values.push(X.fromJson(t));
    return this;
  }
  static fromBinary(e, n) {
    return new ce().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new ce().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new ce().fromJsonString(e, n);
  }
  static equals(e, n) {
    return s.util.equals(ce, e, n);
  }
}
ce.runtime = s;
ce.typeName = "google.protobuf.ListValue";
ce.fields = s.util.newFieldList(() => [
  { no: 1, name: "values", kind: "message", T: X, repeated: !0 }
]);
var w;
(function(a) {
  a[a.Canceled = 1] = "Canceled", a[a.Unknown = 2] = "Unknown", a[a.InvalidArgument = 3] = "InvalidArgument", a[a.DeadlineExceeded = 4] = "DeadlineExceeded", a[a.NotFound = 5] = "NotFound", a[a.AlreadyExists = 6] = "AlreadyExists", a[a.PermissionDenied = 7] = "PermissionDenied", a[a.ResourceExhausted = 8] = "ResourceExhausted", a[a.FailedPrecondition = 9] = "FailedPrecondition", a[a.Aborted = 10] = "Aborted", a[a.OutOfRange = 11] = "OutOfRange", a[a.Unimplemented = 12] = "Unimplemented", a[a.Internal = 13] = "Internal", a[a.Unavailable = 14] = "Unavailable", a[a.DataLoss = 15] = "DataLoss", a[a.Unauthenticated = 16] = "Unauthenticated";
})(w || (w = {}));
function gi(a) {
  const e = w[a];
  return typeof e != "string" ? a.toString() : e[0].toLowerCase() + e.substring(1).replace(/[A-Z]/g, (n) => "_" + n.toLowerCase());
}
class N extends Error {
  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with error.
   */
  constructor(e, n = w.Unknown, t, o, i) {
    super(wh(e, n)), this.name = "ConnectError", Object.setPrototypeOf(this, new.target.prototype), this.rawMessage = e, this.code = n, this.metadata = new Headers(t ?? {}), this.details = o ?? [], this.cause = i;
  }
  /**
   * Convert any value - typically a caught error into a ConnectError,
   * following these rules:
   * - If the value is already a ConnectError, return it as is.
   * - If the value is an AbortError from the fetch API, return the message
   *   of the AbortError with code Canceled.
   * - For other Errors, return the error message with code Unknown by default.
   * - For other values, return the values String representation as a message,
   *   with the code Unknown by default.
   * The original value will be used for the "cause" property for the new
   * ConnectError.
   */
  static from(e, n = w.Unknown) {
    return e instanceof N ? e : e instanceof Error ? e.name == "AbortError" ? new N(e.message, w.Canceled) : new N(e.message, n, void 0, void 0, e) : new N(String(e), n, void 0, void 0, e);
  }
  static [Symbol.hasInstance](e) {
    return e instanceof Error ? Object.getPrototypeOf(e) === N.prototype ? !0 : e.name === "ConnectError" && "code" in e && typeof e.code == "number" && "metadata" in e && "details" in e && Array.isArray(e.details) && "rawMessage" in e && typeof e.rawMessage == "string" && "cause" in e : !1;
  }
  findDetails(e) {
    const n = "typeName" in e ? {
      findMessage: (o) => o === e.typeName ? e : void 0
    } : e, t = [];
    for (const o of this.details) {
      if ("getType" in o) {
        n.findMessage(o.getType().typeName) && t.push(o);
        continue;
      }
      const i = n.findMessage(o.type);
      if (i)
        try {
          t.push(i.fromBinary(o.value));
        } catch {
        }
    }
    return t;
  }
}
function wh(a, e) {
  return a.length ? `[${gi(e)}] ${a}` : `[${gi(e)}]`;
}
function Oh(a, e, n) {
  try {
    const t = ot.dec(a);
    return e ? e.fromBinary(t, n) : t;
  } catch (t) {
    throw N.from(t, w.DataLoss);
  }
}
function Ch(a, e) {
  const n = {};
  for (const [t, o] of Object.entries(a.methods)) {
    const i = e(Object.assign(Object.assign({}, o), {
      localName: t,
      service: a
    }));
    i != null && (n[t] = i);
  }
  return n;
}
const Ti = 1;
function ki(a) {
  let e, n = new Uint8Array(0);
  function t(o) {
    const i = new Uint8Array(n.length + o.length);
    i.set(n), i.set(o, n.length), n = i;
  }
  return new ReadableStream({
    start() {
      e = a.getReader();
    },
    async pull(o) {
      let i;
      for (; ; ) {
        if (i === void 0 && n.byteLength >= 5) {
          let d = 0;
          for (let p = 1; p < 5; p++)
            d = (d << 8) + n[p];
          i = { flags: n[0], length: d };
        }
        if (i !== void 0 && n.byteLength >= i.length + 5)
          break;
        const c = await e.read();
        if (c.done)
          break;
        t(c.value);
      }
      if (i === void 0) {
        if (n.byteLength == 0) {
          o.close();
          return;
        }
        o.error(new N("premature end of stream", w.DataLoss));
        return;
      }
      const r = n.subarray(5, 5 + i.length);
      n = n.subarray(5 + i.length), o.enqueue({
        flags: i.flags,
        data: r
      });
    }
  });
}
function yi(a, e) {
  const n = new Uint8Array(e.length + 5);
  n.set(e, 5);
  const t = new DataView(n.buffer, n.byteOffset, n.byteLength);
  return t.setUint8(0, a), t.setUint32(1, e.length), n;
}
var Nh = function(a) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = a[Symbol.asyncIterator], n;
  return e ? e.call(a) : (a = typeof __values == "function" ? __values(a) : a[Symbol.iterator](), n = {}, t("next"), t("throw"), t("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function t(i) {
    n[i] = a[i] && function(r) {
      return new Promise(function(c, d) {
        r = a[i](r), o(c, d, r.done, r.value);
      });
    };
  }
  function o(i, r, c, d) {
    Promise.resolve(d).then(function(p) {
      i({ value: p, done: c });
    }, r);
  }
}, Mn = function(a) {
  return this instanceof Mn ? (this.v = a, this) : new Mn(a);
}, Ph = function(a, e, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = n.apply(a, e || []), o, i = [];
  return o = {}, c("next"), c("throw"), c("return", r), o[Symbol.asyncIterator] = function() {
    return this;
  }, o;
  function r(h) {
    return function(I) {
      return Promise.resolve(I).then(h, R);
    };
  }
  function c(h, I) {
    t[h] && (o[h] = function(O) {
      return new Promise(function(P, z) {
        i.push([h, O, P, z]) > 1 || d(h, O);
      });
    }, I && (o[h] = I(o[h])));
  }
  function d(h, I) {
    try {
      p(t[h](I));
    } catch (O) {
      S(i[0][3], O);
    }
  }
  function p(h) {
    h.value instanceof Mn ? Promise.resolve(h.value.v).then(T, R) : S(i[0][2], h);
  }
  function T(h) {
    d("next", h);
  }
  function R(h) {
    d("throw", h);
  }
  function S(h, I) {
    h(I), i.shift(), i.length && d(i[0][0], i[0][1]);
  }
}, Dh = function(a) {
  var e, n;
  return e = {}, t("next"), t("throw", function(o) {
    throw o;
  }), t("return"), e[Symbol.iterator] = function() {
    return this;
  }, e;
  function t(o, i) {
    e[o] = a[o] ? function(r) {
      return (n = !n) ? { value: Mn(a[o](r)), done: !1 } : i ? i(r) : r;
    } : i;
  }
};
function Ah() {
  const a = [], e = [];
  let n, t, o, i = new Promise((d, p) => {
    t = d, o = p;
  }), r = !1;
  function c() {
    for (const d of a.splice(0, a.length))
      d({ done: !0, value: void 0 });
  }
  return {
    close() {
      r = !0, c();
    },
    async write(d) {
      if (r)
        throw n ?? new Error("cannot write, WritableIterable already closed");
      const p = a.shift();
      if (p === void 0)
        e.push(d);
      else if (p({ done: !1, value: d }), a.length > 0)
        return;
      const T = e.length + 1;
      for (let R = 0; R < T; R++)
        await i;
    },
    [Symbol.asyncIterator]() {
      return {
        next() {
          t(), i = new Promise((R, S) => {
            t = R, o = S;
          });
          const d = e.shift();
          if (d !== void 0)
            return Promise.resolve({ done: !1, value: d });
          if (r)
            return Promise.resolve({ done: !0, value: void 0 });
          let p;
          const T = new Promise((R) => p = R);
          return a.push(p), T;
        },
        throw(d) {
          return n = d, r = !0, e.splice(0, e.length), i.catch(() => {
          }), o(n), c(), Promise.resolve({ done: !0, value: void 0 });
        },
        return() {
          return r = !0, e.splice(0, e.length), t(), i = Promise.reject(new Error("cannot write, consumer called return")), i.catch(() => {
          }), c(), Promise.resolve({ done: !0, value: void 0 });
        }
      };
    }
  };
}
function Ja(a) {
  return Ph(this, arguments, function* () {
    yield Mn(yield* Dh(Nh(a)));
  });
}
var Zi = function(a) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = a[Symbol.asyncIterator], n;
  return e ? e.call(a) : (a = typeof __values == "function" ? __values(a) : a[Symbol.iterator](), n = {}, t("next"), t("throw"), t("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function t(i) {
    n[i] = a[i] && function(r) {
      return new Promise(function(c, d) {
        r = a[i](r), o(c, d, r.done, r.value);
      });
    };
  }
  function o(i, r, c, d) {
    Promise.resolve(d).then(function(p) {
      i({ value: p, done: c });
    }, r);
  }
}, mn = function(a) {
  return this instanceof mn ? (this.v = a, this) : new mn(a);
}, qh = function(a) {
  var e, n;
  return e = {}, t("next"), t("throw", function(o) {
    throw o;
  }), t("return"), e[Symbol.iterator] = function() {
    return this;
  }, e;
  function t(o, i) {
    e[o] = a[o] ? function(r) {
      return (n = !n) ? { value: mn(a[o](r)), done: !1 } : i ? i(r) : r;
    } : i;
  }
}, Uh = function(a, e, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = n.apply(a, e || []), o, i = [];
  return o = {}, c("next"), c("throw"), c("return", r), o[Symbol.asyncIterator] = function() {
    return this;
  }, o;
  function r(h) {
    return function(I) {
      return Promise.resolve(I).then(h, R);
    };
  }
  function c(h, I) {
    t[h] && (o[h] = function(O) {
      return new Promise(function(P, z) {
        i.push([h, O, P, z]) > 1 || d(h, O);
      });
    }, I && (o[h] = I(o[h])));
  }
  function d(h, I) {
    try {
      p(t[h](I));
    } catch (O) {
      S(i[0][3], O);
    }
  }
  function p(h) {
    h.value instanceof mn ? Promise.resolve(h.value.v).then(T, R) : S(i[0][2], h);
  }
  function T(h) {
    d("next", h);
  }
  function R(h) {
    d("throw", h);
  }
  function S(h, I) {
    h(I), i.shift(), i.length && d(i[0][0], i[0][1]);
  }
};
function oa(a, e) {
  return Ch(a, (n) => {
    switch (n.kind) {
      case m.Unary:
        return Lh(e, a, n);
      case m.ServerStreaming:
        return Gh(e, a, n);
      case m.ClientStreaming:
        return Bh(e, a, n);
      case m.BiDiStreaming:
        return xh(e, a, n);
      default:
        return null;
    }
  });
}
function C(a, e) {
  return oa(a, e);
}
function Lh(a, e, n) {
  return async function(t, o) {
    var i, r;
    const c = await a.unary(e, n, o?.signal, o?.timeoutMs, o?.headers, t, o?.contextValues);
    return (i = o?.onHeader) === null || i === void 0 || i.call(o, c.header), (r = o?.onTrailer) === null || r === void 0 || r.call(o, c.trailer), c.message;
  };
}
function Gh(a, e, n) {
  return function(t, o) {
    return er(a.stream(e, n, o?.signal, o?.timeoutMs, o?.headers, Ja([t]), o?.contextValues), o);
  };
}
function Bh(a, e, n) {
  return async function(t, o) {
    var i, r, c, d, p, T;
    const R = await a.stream(e, n, o?.signal, o?.timeoutMs, o?.headers, t, o?.contextValues);
    (p = o?.onHeader) === null || p === void 0 || p.call(o, R.header);
    let S, h = 0;
    try {
      for (var I = !0, O = Zi(R.message), P; P = await O.next(), i = P.done, !i; I = !0)
        d = P.value, I = !1, S = d, h++;
    } catch (z) {
      r = { error: z };
    } finally {
      try {
        !I && !i && (c = O.return) && await c.call(O);
      } finally {
        if (r) throw r.error;
      }
    }
    if (!S)
      throw new N("protocol error: missing response message", w.Unimplemented);
    if (h > 1)
      throw new N("protocol error: received extra messages for client streaming method", w.Unimplemented);
    return (T = o?.onTrailer) === null || T === void 0 || T.call(o, R.trailer), S;
  };
}
function xh(a, e, n) {
  return function(t, o) {
    return er(a.stream(e, n, o?.signal, o?.timeoutMs, o?.headers, t, o?.contextValues), o);
  };
}
function er(a, e) {
  const n = function() {
    return Uh(this, arguments, function* () {
      var t, o;
      const i = yield mn(a);
      (t = e?.onHeader) === null || t === void 0 || t.call(e, i.header), yield mn(yield* qh(Zi(i.message))), (o = e?.onTrailer) === null || o === void 0 || o.call(e, i.trailer);
    });
  }()[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]: () => ({
      next: () => n.next()
    })
  };
}
function Fh(...a) {
  const e = new AbortController(), n = a.filter((o) => o !== void 0).concat(e.signal);
  for (const o of n) {
    if (o.aborted) {
      t.apply(o);
      break;
    }
    o.addEventListener("abort", t);
  }
  function t() {
    e.signal.aborted || e.abort(nr(this));
    for (const o of n)
      o.removeEventListener("abort", t);
  }
  return e;
}
function Jh(a) {
  const e = new AbortController(), n = () => {
    e.abort(new N("the operation timed out", w.DeadlineExceeded));
  };
  let t;
  return a !== void 0 && (a <= 0 ? n() : t = setTimeout(n, a)), {
    signal: e.signal,
    cleanup: () => clearTimeout(t)
  };
}
function nr(a) {
  if (!a.aborted)
    return;
  if (a.reason !== void 0)
    return a.reason;
  const e = new Error("This operation was aborted");
  return e.name = "AbortError", e;
}
function ia() {
  return {
    get(a) {
      return a.id in this ? this[a.id] : a.defaultValue;
    },
    set(a, e) {
      return this[a.id] = e, this;
    },
    delete(a) {
      return delete this[a.id], this;
    }
  };
}
const Ga = 128;
function vi(a) {
  const e = new Headers(), n = new TextDecoder().decode(a).split(`\r
`);
  for (const t of n) {
    if (t === "")
      continue;
    const o = t.indexOf(":");
    if (o > 0) {
      const i = t.substring(0, o).trim(), r = t.substring(o + 1).trim();
      e.append(i, r);
    }
  }
  return e;
}
const zh = "Content-Type", Yh = "Grpc-Timeout", cn = "Grpc-Status", ar = "Grpc-Message", $h = "Grpc-Status-Details-Bin", Vh = "X-User-Agent", Wh = "X-Grpc-Web", jh = "application/grpc-web+proto", Hh = "application/grpc-web+json";
let ka = class yn extends E {
  constructor(e) {
    super(), this.code = 0, this.message = "", this.details = [], s.util.initPartial(e, this);
  }
  static fromBinary(e, n) {
    return new yn().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new yn().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new yn().fromJsonString(e, n);
  }
  static equals(e, n) {
    return s.util.equals(yn, e, n);
  }
};
ka.runtime = s;
ka.typeName = "google.rpc.Status";
ka.fields = s.util.newFieldList(() => [
  {
    no: 1,
    name: "code",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 2,
    name: "message",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "details", kind: "message", T: j, repeated: !0 }
]);
const Kh = "0";
function tr(a) {
  var e;
  const n = a.get($h);
  if (n != null) {
    const o = Oh(n, ka);
    if (o.code == 0)
      return;
    const i = new N(o.message, o.code, a);
    return i.details = o.details.map((r) => ({
      type: r.typeUrl.substring(r.typeUrl.lastIndexOf("/") + 1),
      value: r.value
    })), i;
  }
  const t = a.get(cn);
  if (t != null) {
    if (t === Kh)
      return;
    const o = parseInt(t, 10);
    return o in w ? new N(decodeURIComponent((e = a.get(ar)) !== null && e !== void 0 ? e : ""), o, a) : new N(`invalid grpc-status: ${t}`, w.Internal, a);
  }
}
function hi(a, e, n) {
  const t = typeof e == "string" ? e : e.typeName, o = typeof n == "string" ? n : n.name;
  return a.toString().replace(/\/?$/, `/${t}/${o}`);
}
function sr(a, e) {
  return e instanceof a ? e : new a(e);
}
function Xh(a, e) {
  function n(t) {
    return t.done === !0 ? t : {
      done: t.done,
      value: sr(a, t.value)
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const t = e[Symbol.asyncIterator](), o = {
        next: () => t.next().then(n)
      };
      return t.throw !== void 0 && (o.throw = (i) => t.throw(i).then(n)), t.return !== void 0 && (o.return = (i) => t.return(i).then(n)), o;
    }
  };
}
function or(a, e) {
  var n;
  return (n = e?.concat().reverse().reduce(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    (t, o) => o(t),
    a
  )) !== null && n !== void 0 ? n : a;
}
function Qh(a) {
  var e;
  const n = Object.assign({}, a);
  return (e = n.ignoreUnknownFields) !== null && e !== void 0 || (n.ignoreUnknownFields = !0), n;
}
function za(a, e, n, t) {
  const o = e ? fi(a.I, t) : Ri(a.I, n);
  return { parse: (e ? fi(a.O, t) : Ri(a.O, n)).parse, serialize: o.serialize };
}
function fi(a, e) {
  return {
    parse(n) {
      try {
        return a.fromBinary(n, e);
      } catch (t) {
        const o = t instanceof Error ? t.message : String(t);
        throw new N(`parse binary: ${o}`, w.Internal);
      }
    },
    serialize(n) {
      try {
        return n.toBinary(e);
      } catch (t) {
        const o = t instanceof Error ? t.message : String(t);
        throw new N(`serialize binary: ${o}`, w.Internal);
      }
    }
  };
}
function Ri(a, e) {
  var n, t;
  const o = (n = e?.textEncoder) !== null && n !== void 0 ? n : new TextEncoder(), i = (t = e?.textDecoder) !== null && t !== void 0 ? t : new TextDecoder(), r = Qh(e);
  return {
    parse(c) {
      try {
        const d = i.decode(c);
        return a.fromJsonString(d, r);
      } catch (d) {
        throw N.from(d, w.InvalidArgument);
      }
    },
    serialize(c) {
      try {
        const d = c.toJsonString(r);
        return o.encode(d);
      } catch (d) {
        throw N.from(d, w.Internal);
      }
    }
  };
}
function ir(a) {
  const e = or(a.next, a.interceptors), [n, t, o] = mr(a), i = Object.assign(Object.assign({}, a.req), { message: sr(a.req.method.I, a.req.message), signal: n });
  return e(i).then((r) => (o(), r), t);
}
function rr(a) {
  const e = or(a.next, a.interceptors), [n, t, o] = mr(a), i = Object.assign(Object.assign({}, a.req), { message: Xh(a.req.method.I, a.req.message), signal: n });
  let r = !1;
  return n.addEventListener("abort", function() {
    var c, d;
    const p = a.req.message[Symbol.asyncIterator]();
    r || (c = p.throw) === null || c === void 0 || c.call(p, this.reason).catch(() => {
    }), (d = p.return) === null || d === void 0 || d.call(p).catch(() => {
    });
  }), e(i).then((c) => Object.assign(Object.assign({}, c), { message: {
    [Symbol.asyncIterator]() {
      const d = c.message[Symbol.asyncIterator]();
      return {
        next() {
          return d.next().then((p) => (p.done == !0 && (r = !0, o()), p), t);
        }
        // We deliberately omit throw/return.
      };
    }
  } }), t);
}
function mr(a) {
  const { signal: e, cleanup: n } = Jh(a.timeoutMs), t = Fh(a.signal, e);
  return [
    t.signal,
    function(i) {
      const r = N.from(e.aborted ? nr(e) : i);
      return t.abort(r), n(), Promise.reject(r);
    },
    function() {
      n(), t.abort();
    }
  ];
}
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, cr = {}, it = {}, ra = H && H.__assign || function() {
  return ra = Object.assign || function(a) {
    for (var e, n = 1, t = arguments.length; n < t; n++) {
      e = arguments[n];
      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (a[o] = e[o]);
    }
    return a;
  }, ra.apply(this, arguments);
};
Object.defineProperty(it, "__esModule", { value: !0 });
var Zh = {
  delayFirstAttempt: !1,
  jitter: "none",
  maxDelay: 1 / 0,
  numOfAttempts: 10,
  retry: function() {
    return !0;
  },
  startingDelay: 100,
  timeMultiple: 2
};
function ef(a) {
  var e = ra(ra({}, Zh), a);
  return e.numOfAttempts < 1 && (e.numOfAttempts = 1), e;
}
it.getSanitizedOptions = ef;
var rt = {}, mt = {}, ya = {}, ct = {}, lt = {};
Object.defineProperty(lt, "__esModule", { value: !0 });
function nf(a) {
  var e = Math.random() * a;
  return Math.round(e);
}
lt.fullJitter = nf;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
function af(a) {
  return a;
}
dt.noJitter = af;
Object.defineProperty(ct, "__esModule", { value: !0 });
var tf = lt, sf = dt;
function of(a) {
  switch (a.jitter) {
    case "full":
      return tf.fullJitter;
    case "none":
    default:
      return sf.noJitter;
  }
}
ct.JitterFactory = of;
Object.defineProperty(ya, "__esModule", { value: !0 });
var rf = ct, mf = (
  /** @class */
  function() {
    function a(e) {
      this.options = e, this.attempt = 0;
    }
    return a.prototype.apply = function() {
      var e = this;
      return new Promise(function(n) {
        return setTimeout(n, e.jitteredDelay);
      });
    }, a.prototype.setAttemptNumber = function(e) {
      this.attempt = e;
    }, Object.defineProperty(a.prototype, "jitteredDelay", {
      get: function() {
        var e = rf.JitterFactory(this.options);
        return e(this.delay);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(a.prototype, "delay", {
      get: function() {
        var e = this.options.startingDelay, n = this.options.timeMultiple, t = this.numOfDelayedAttempts, o = e * Math.pow(n, t);
        return Math.min(o, this.options.maxDelay);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(a.prototype, "numOfDelayedAttempts", {
      get: function() {
        return this.attempt;
      },
      enumerable: !0,
      configurable: !0
    }), a;
  }()
);
ya.Delay = mf;
var cf = H && H.__extends || /* @__PURE__ */ function() {
  var a = function(e, n) {
    return a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, o) {
      t.__proto__ = o;
    } || function(t, o) {
      for (var i in o) o.hasOwnProperty(i) && (t[i] = o[i]);
    }, a(e, n);
  };
  return function(e, n) {
    a(e, n);
    function t() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
  };
}(), lf = H && H.__awaiter || function(a, e, n, t) {
  function o(i) {
    return i instanceof n ? i : new n(function(r) {
      r(i);
    });
  }
  return new (n || (n = Promise))(function(i, r) {
    function c(T) {
      try {
        p(t.next(T));
      } catch (R) {
        r(R);
      }
    }
    function d(T) {
      try {
        p(t.throw(T));
      } catch (R) {
        r(R);
      }
    }
    function p(T) {
      T.done ? i(T.value) : o(T.value).then(c, d);
    }
    p((t = t.apply(a, e || [])).next());
  });
}, df = H && H.__generator || function(a, e) {
  var n = { label: 0, sent: function() {
    if (i[0] & 1) throw i[1];
    return i[1];
  }, trys: [], ops: [] }, t, o, i, r;
  return r = { next: c(0), throw: c(1), return: c(2) }, typeof Symbol == "function" && (r[Symbol.iterator] = function() {
    return this;
  }), r;
  function c(p) {
    return function(T) {
      return d([p, T]);
    };
  }
  function d(p) {
    if (t) throw new TypeError("Generator is already executing.");
    for (; n; ) try {
      if (t = 1, o && (i = p[0] & 2 ? o.return : p[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, p[1])).done) return i;
      switch (o = 0, i && (p = [p[0] & 2, i.value]), p[0]) {
        case 0:
        case 1:
          i = p;
          break;
        case 4:
          return n.label++, { value: p[1], done: !1 };
        case 5:
          n.label++, o = p[1], p = [0];
          continue;
        case 7:
          p = n.ops.pop(), n.trys.pop();
          continue;
        default:
          if (i = n.trys, !(i = i.length > 0 && i[i.length - 1]) && (p[0] === 6 || p[0] === 2)) {
            n = 0;
            continue;
          }
          if (p[0] === 3 && (!i || p[1] > i[0] && p[1] < i[3])) {
            n.label = p[1];
            break;
          }
          if (p[0] === 6 && n.label < i[1]) {
            n.label = i[1], i = p;
            break;
          }
          if (i && n.label < i[2]) {
            n.label = i[2], n.ops.push(p);
            break;
          }
          i[2] && n.ops.pop(), n.trys.pop();
          continue;
      }
      p = e.call(a, n);
    } catch (T) {
      p = [6, T], o = 0;
    } finally {
      t = i = 0;
    }
    if (p[0] & 5) throw p[1];
    return { value: p[0] ? p[1] : void 0, done: !0 };
  }
};
Object.defineProperty(mt, "__esModule", { value: !0 });
var pf = ya, uf = (
  /** @class */
  function(a) {
    cf(e, a);
    function e() {
      return a !== null && a.apply(this, arguments) || this;
    }
    return e.prototype.apply = function() {
      return lf(this, void 0, void 0, function() {
        return df(this, function(n) {
          return [2, this.isFirstAttempt ? !0 : a.prototype.apply.call(this)];
        });
      });
    }, Object.defineProperty(e.prototype, "isFirstAttempt", {
      get: function() {
        return this.attempt === 0;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "numOfDelayedAttempts", {
      get: function() {
        return this.attempt - 1;
      },
      enumerable: !0,
      configurable: !0
    }), e;
  }(pf.Delay)
);
mt.SkipFirstDelay = uf;
var pt = {}, gf = H && H.__extends || /* @__PURE__ */ function() {
  var a = function(e, n) {
    return a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, o) {
      t.__proto__ = o;
    } || function(t, o) {
      for (var i in o) o.hasOwnProperty(i) && (t[i] = o[i]);
    }, a(e, n);
  };
  return function(e, n) {
    a(e, n);
    function t() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
  };
}();
Object.defineProperty(pt, "__esModule", { value: !0 });
var Tf = ya, kf = (
  /** @class */
  function(a) {
    gf(e, a);
    function e() {
      return a !== null && a.apply(this, arguments) || this;
    }
    return e;
  }(Tf.Delay)
);
pt.AlwaysDelay = kf;
Object.defineProperty(rt, "__esModule", { value: !0 });
var yf = mt, vf = pt;
function hf(a, e) {
  var n = ff(a);
  return n.setAttemptNumber(e), n;
}
rt.DelayFactory = hf;
function ff(a) {
  return a.delayFirstAttempt ? new vf.AlwaysDelay(a) : new yf.SkipFirstDelay(a);
}
var Ya = H && H.__awaiter || function(a, e, n, t) {
  function o(i) {
    return i instanceof n ? i : new n(function(r) {
      r(i);
    });
  }
  return new (n || (n = Promise))(function(i, r) {
    function c(T) {
      try {
        p(t.next(T));
      } catch (R) {
        r(R);
      }
    }
    function d(T) {
      try {
        p(t.throw(T));
      } catch (R) {
        r(R);
      }
    }
    function p(T) {
      T.done ? i(T.value) : o(T.value).then(c, d);
    }
    p((t = t.apply(a, e || [])).next());
  });
}, $a = H && H.__generator || function(a, e) {
  var n = { label: 0, sent: function() {
    if (i[0] & 1) throw i[1];
    return i[1];
  }, trys: [], ops: [] }, t, o, i, r;
  return r = { next: c(0), throw: c(1), return: c(2) }, typeof Symbol == "function" && (r[Symbol.iterator] = function() {
    return this;
  }), r;
  function c(p) {
    return function(T) {
      return d([p, T]);
    };
  }
  function d(p) {
    if (t) throw new TypeError("Generator is already executing.");
    for (; n; ) try {
      if (t = 1, o && (i = p[0] & 2 ? o.return : p[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, p[1])).done) return i;
      switch (o = 0, i && (p = [p[0] & 2, i.value]), p[0]) {
        case 0:
        case 1:
          i = p;
          break;
        case 4:
          return n.label++, { value: p[1], done: !1 };
        case 5:
          n.label++, o = p[1], p = [0];
          continue;
        case 7:
          p = n.ops.pop(), n.trys.pop();
          continue;
        default:
          if (i = n.trys, !(i = i.length > 0 && i[i.length - 1]) && (p[0] === 6 || p[0] === 2)) {
            n = 0;
            continue;
          }
          if (p[0] === 3 && (!i || p[1] > i[0] && p[1] < i[3])) {
            n.label = p[1];
            break;
          }
          if (p[0] === 6 && n.label < i[1]) {
            n.label = i[1], i = p;
            break;
          }
          if (i && n.label < i[2]) {
            n.label = i[2], n.ops.push(p);
            break;
          }
          i[2] && n.ops.pop(), n.trys.pop();
          continue;
      }
      p = e.call(a, n);
    } catch (T) {
      p = [6, T], o = 0;
    } finally {
      t = i = 0;
    }
    if (p[0] & 5) throw p[1];
    return { value: p[0] ? p[1] : void 0, done: !0 };
  }
};
Object.defineProperty(cr, "__esModule", { value: !0 });
var Rf = it, _f = rt;
function Sf(a, e) {
  return e === void 0 && (e = {}), Ya(this, void 0, void 0, function() {
    var n, t;
    return $a(this, function(o) {
      switch (o.label) {
        case 0:
          return n = Rf.getSanitizedOptions(e), t = new If(a, n), [4, t.execute()];
        case 1:
          return [2, o.sent()];
      }
    });
  });
}
var Va = cr.backOff = Sf, If = (
  /** @class */
  function() {
    function a(e, n) {
      this.request = e, this.options = n, this.attemptNumber = 0;
    }
    return a.prototype.execute = function() {
      return Ya(this, void 0, void 0, function() {
        var e, n;
        return $a(this, function(t) {
          switch (t.label) {
            case 0:
              if (this.attemptLimitReached) return [3, 7];
              t.label = 1;
            case 1:
              return t.trys.push([1, 4, , 6]), [4, this.applyDelay()];
            case 2:
              return t.sent(), [4, this.request()];
            case 3:
              return [2, t.sent()];
            case 4:
              return e = t.sent(), this.attemptNumber++, [4, this.options.retry(e, this.attemptNumber)];
            case 5:
              if (n = t.sent(), !n || this.attemptLimitReached)
                throw e;
              return [3, 6];
            case 6:
              return [3, 0];
            case 7:
              throw new Error("Something went wrong.");
          }
        });
      });
    }, Object.defineProperty(a.prototype, "attemptLimitReached", {
      get: function() {
        return this.attemptNumber >= this.options.numOfAttempts;
      },
      enumerable: !0,
      configurable: !0
    }), a.prototype.applyDelay = function() {
      return Ya(this, void 0, void 0, function() {
        var e;
        return $a(this, function(n) {
          switch (n.label) {
            case 0:
              return e = _f.DelayFactory(this.options, this.attemptNumber), [4, e.apply()];
            case 1:
              return n.sent(), [
                2
                /*return*/
              ];
          }
        });
      });
    }, a;
  }()
);
const lr = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.v1.Credentials",
  () => [
    {
      no: 1,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "payload",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Wa = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.v1.AuthenticateRequest",
  () => [
    {
      no: 1,
      name: "entity",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "credentials", kind: "message", T: lr }
  ]
), bf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.v1.AuthenticateResponse",
  () => [
    {
      no: 1,
      name: "access_token",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Mf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.v1.AuthenticateToRequest",
  () => [
    {
      no: 1,
      name: "entity",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ef = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.v1.AuthenticateToResponse",
  () => [
    {
      no: 1,
      name: "access_token",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), wf = {
  typeName: "proto.rpc.v1.AuthService",
  methods: {
    /**
     * Authenticate attempts to authenticate the caller claiming to be
     * the given entity. The resulting response contains an access token
     * with the subject as the entity and the audience/issuer as the
     * provider of this service. This token should be used for all future
     * RPC requests.
     *
     * @generated from rpc proto.rpc.v1.AuthService.Authenticate
     */
    authenticate: {
      name: "Authenticate",
      I: Wa,
      O: bf,
      kind: m.Unary
    }
  }
}, Of = {
  typeName: "proto.rpc.v1.ExternalAuthService",
  methods: {
    /**
     * AuthenticateTo attempts to allow the caller to authenticate to another entity.
     * The resulting response contains an access token with the subject
     * as the calling entity, the audience as the other entity, and the issuer
     * as the provider of this service. This token should be used for all
     * future RPC requests to the other entity on the services it provides.
     * This assumes that the caller is already authenticated to the
     * server implementing this service.
     *
     * @generated from rpc proto.rpc.v1.ExternalAuthService.AuthenticateTo
     */
    authenticateTo: {
      name: "AuthenticateTo",
      I: Mf,
      O: Ef,
      kind: m.Unary
    }
  }
}, ln = /* @__PURE__ */ s.makeMessageType(
  "google.rpc.Status",
  () => [
    {
      no: 1,
      name: "code",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 2,
      name: "message",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "details", kind: "message", T: j, repeated: !0 }
  ]
), Nn = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.ICECandidate",
  () => [
    {
      no: 1,
      name: "candidate",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "sdp_mid", kind: "scalar", T: 9, opt: !0 },
    { no: 3, name: "sdpm_line_index", kind: "scalar", T: 13, opt: !0 },
    { no: 4, name: "username_fragment", kind: "scalar", T: 9, opt: !0 }
  ]
), dr = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.CallRequest",
  () => [
    {
      no: 1,
      name: "sdp",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "disable_trickle",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Cf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.CallResponseInitStage",
  () => [
    {
      no: 1,
      name: "sdp",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Nf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.CallResponseUpdateStage",
  () => [
    { no: 1, name: "candidate", kind: "message", T: Nn }
  ]
), Pf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.CallResponse",
  () => [
    {
      no: 1,
      name: "uuid",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "init", kind: "message", T: Cf, oneof: "stage" },
    { no: 3, name: "update", kind: "message", T: Nf, oneof: "stage" }
  ]
), $n = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.CallUpdateRequest",
  () => [
    {
      no: 1,
      name: "uuid",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "candidate", kind: "message", T: Nn, oneof: "update" },
    { no: 3, name: "done", kind: "scalar", T: 8, oneof: "update" },
    { no: 4, name: "error", kind: "message", T: ln, oneof: "update" }
  ]
), Df = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.CallUpdateResponse",
  []
), Af = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.ICEServer",
  () => [
    { no: 1, name: "urls", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 2,
      name: "username",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "credential",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ma = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.WebRTCConfig",
  () => [
    { no: 1, name: "additional_ice_servers", kind: "message", T: Af, repeated: !0 },
    {
      no: 2,
      name: "disable_trickle",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), qf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.AnswerRequestInitStage",
  () => [
    {
      no: 1,
      name: "sdp",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "optional_config", kind: "message", T: ma },
    { no: 3, name: "deadline", kind: "message", T: _, opt: !0 }
  ]
), Uf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.AnswerRequestUpdateStage",
  () => [
    { no: 1, name: "candidate", kind: "message", T: Nn }
  ]
), Lf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.AnswerRequestDoneStage",
  []
), Gf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.AnswerRequestErrorStage",
  () => [
    { no: 1, name: "status", kind: "message", T: ln }
  ]
), Bf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.AnswerRequestHeartbeatStage",
  []
), xf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.AnswerRequest",
  () => [
    {
      no: 1,
      name: "uuid",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "init", kind: "message", T: qf, oneof: "stage" },
    { no: 3, name: "update", kind: "message", T: Uf, oneof: "stage" },
    { no: 4, name: "done", kind: "message", T: Lf, oneof: "stage" },
    { no: 5, name: "error", kind: "message", T: Gf, oneof: "stage" },
    { no: 6, name: "heartbeat", kind: "message", T: Bf, oneof: "stage" }
  ]
), Ff = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.AnswerResponseInitStage",
  () => [
    {
      no: 1,
      name: "sdp",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Jf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.AnswerResponseUpdateStage",
  () => [
    { no: 1, name: "candidate", kind: "message", T: Nn }
  ]
), zf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.AnswerResponseDoneStage",
  []
), Yf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.AnswerResponseErrorStage",
  () => [
    { no: 1, name: "status", kind: "message", T: ln }
  ]
), $f = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.AnswerResponse",
  () => [
    {
      no: 1,
      name: "uuid",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "init", kind: "message", T: Ff, oneof: "stage" },
    { no: 3, name: "update", kind: "message", T: Jf, oneof: "stage" },
    { no: 4, name: "done", kind: "message", T: zf, oneof: "stage" },
    { no: 5, name: "error", kind: "message", T: Yf, oneof: "stage" }
  ]
), Vf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.OptionalWebRTCConfigRequest",
  []
), Wf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.OptionalWebRTCConfigResponse",
  () => [
    { no: 1, name: "config", kind: "message", T: ma }
  ]
), pr = {
  typeName: "proto.rpc.webrtc.v1.SignalingService",
  methods: {
    /**
     * Call makes an offer to a client that it expects an answer to. The host
     * of the client in question should be identified in the rpc-host metadata
     * field.
     * Note: Based on how this is a server streaming responnse to the caller,
     * we do not have a good way of knowing if the caller has disappeared.
     * Depending on answerer timeouts and concurrency limits, this can result in
     * hangs on the answerer waiting for a connection to establish, which in turn
     * can result in the caller waiting for an answerer to be listening.
     *
     * @generated from rpc proto.rpc.webrtc.v1.SignalingService.Call
     */
    call: {
      name: "Call",
      I: dr,
      O: Pf,
      kind: m.ServerStreaming
    },
    /**
     * CallUpdate is used to send additional info in relation to a Call.
     * The host of the client for the call in question should be identified
     * in the rpc-host metadata field.
     * In a world where https://github.com/grpc/grpc-web/issues/24 is fixed,
     * this should be removed in favor of a bidirectional stream on Call.
     *
     * @generated from rpc proto.rpc.webrtc.v1.SignalingService.CallUpdate
     */
    callUpdate: {
      name: "CallUpdate",
      I: $n,
      O: Df,
      kind: m.Unary
    },
    /**
     * Answer sets up an answering service where the caller answers call offers
     * and responds with answers.
     * The host(s) to answer for should be in the rpc-host metadata field.
     *
     * @generated from rpc proto.rpc.webrtc.v1.SignalingService.Answer
     */
    answer: {
      name: "Answer",
      I: $f,
      O: xf,
      kind: m.BiDiStreaming
    },
    /**
     * OptionalWebRTCConfig returns any WebRTC configuration the caller may want to use.
     * The host to get a config for must be in the rpc-host metadata field.
     *
     * @generated from rpc proto.rpc.webrtc.v1.SignalingService.OptionalWebRTCConfig
     */
    optionalWebRTCConfig: {
      name: "OptionalWebRTCConfig",
      I: Vf,
      O: Wf,
      kind: m.Unary
    }
  }
}, ur = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", ja = (a = "") => {
  const e = a;
  let n = "";
  for (let t = 0, o, i = 0, r = ur; e.charAt(Math.trunc(i)) || (r = "=", i % 1); n += r.charAt(63 & t >> 8 - i % 1 * 8)) {
    if (o = e.charCodeAt(i += 3 / 4), o > 255)
      throw new Error(
        "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
      );
    t = t << 8 | o;
  }
  return n;
}, gr = (a = "") => {
  const e = a.replace(/=+$/, "");
  let n = "";
  if (e.length % 4 === 1)
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded."
    );
  for (
    let t = 0, o = 0, i, r = 0;
    i = e.charAt(r++);
    // eslint-disable-line no-cond-assign
    ~i && (o = t % 4 ? o * 64 + i : i, t++ % 4) ? n += String.fromCharCode(255 & o >> (-2 * t & 6)) : 0
  )
    i = ur.indexOf(i);
  return n;
}, Ha = (a, e) => {
  const n = {
    sdp: a?.sdp,
    type: a?.type
  };
  if (e)
    for (const [t, o] of Object.entries(e))
      n.sdp = [n.sdp, `a=${t}:${o}\r
`].join("");
  return n;
}, jf = async (a, e, n) => {
  const t = e ?? {
    iceServers: [
      {
        urls: "stun:global.stun.twilio.com:3478"
      }
    ]
  }, o = new RTCPeerConnection(t);
  let i;
  const r = new Promise((R) => {
    i = R;
  }), c = o.createDataChannel("data", {
    id: 0,
    negotiated: !0,
    ordered: !0
  });
  c.binaryType = "arraybuffer";
  const d = o.createDataChannel("negotiation", {
    id: 1,
    negotiated: !0,
    ordered: !0
  });
  d.binaryType = "arraybuffer";
  let p = !1;
  if (d.addEventListener("open", () => {
    p = !0;
  }), d.addEventListener(
    "message",
    (R) => {
      (async () => {
        const S = new RTCSessionDescription(
          JSON.parse(gr(R.data))
        );
        if (await o.setRemoteDescription(S), S.type === "offer") {
          await o.setLocalDescription();
          const h = Ha(
            o.localDescription,
            n
          );
          d.send(ja(JSON.stringify(h)));
        }
      })().catch(console.error);
    }
  ), o.addEventListener("negotiationneeded", () => {
    (async () => {
      if (!p)
        return;
      await o.setLocalDescription();
      const R = Ha(
        o.localDescription,
        n
      );
      d.send(ja(JSON.stringify(R)));
    })().catch(console.error);
  }), !a)
    return { pc: o, dc: c };
  const T = await o.createOffer({});
  return await o.setLocalDescription(T), o.addEventListener("icecandidate", (R) => {
    R.candidate === null && i({ pc: o, dc: c });
  }), r;
};
function Hf() {
  try {
    new Headers();
  } catch {
    throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
  }
}
function _i(a, e) {
  const n = tr(a);
  if (n)
    throw e.forEach((t, o) => {
      n.metadata.append(o, t);
    }), n;
  if (!e.has(cn) && !a.has(cn))
    throw new N("protocol error: missing status", w.Internal);
}
function Si(a, e, n, t) {
  const o = new Headers(n ?? {});
  return o.set(zh, a ? jh : Hh), o.set(Wh, "1"), o.set(Vh, "connect-es/1.6.1"), e !== void 0 && o.set(Yh, `${e}m`), o;
}
function Kf(a) {
  switch (a) {
    case 400:
      return w.Internal;
    case 401:
      return w.Unauthenticated;
    case 403:
      return w.PermissionDenied;
    case 404:
      return w.Unimplemented;
    case 429:
      return w.Unavailable;
    case 502:
      return w.Unavailable;
    case 503:
      return w.Unavailable;
    case 504:
      return w.Unavailable;
    default:
      return w.Unknown;
  }
}
function Ii(a, e) {
  var n;
  if (a >= 200 && a < 300)
    return {
      foundStatus: e.has(cn),
      headerError: tr(e)
    };
  throw new N(decodeURIComponent((n = e.get(ar)) !== null && n !== void 0 ? n : `HTTP ${a}`), Kf(a), e);
}
var Ve = function(a) {
  return this instanceof Ve ? (this.v = a, this) : new Ve(a);
}, Xf = function(a, e, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = n.apply(a, e || []), o, i = [];
  return o = {}, c("next"), c("throw"), c("return", r), o[Symbol.asyncIterator] = function() {
    return this;
  }, o;
  function r(h) {
    return function(I) {
      return Promise.resolve(I).then(h, R);
    };
  }
  function c(h, I) {
    t[h] && (o[h] = function(O) {
      return new Promise(function(P, z) {
        i.push([h, O, P, z]) > 1 || d(h, O);
      });
    }, I && (o[h] = I(o[h])));
  }
  function d(h, I) {
    try {
      p(t[h](I));
    } catch (O) {
      S(i[0][3], O);
    }
  }
  function p(h) {
    h.value instanceof Ve ? Promise.resolve(h.value.v).then(T, R) : S(i[0][2], h);
  }
  function T(h) {
    d("next", h);
  }
  function R(h) {
    d("throw", h);
  }
  function S(h, I) {
    h(I), i.shift(), i.length && d(i[0][0], i[0][1]);
  }
};
function Qf(a) {
  var e;
  Hf();
  const n = (e = a.useBinaryFormat) !== null && e !== void 0 ? e : !0;
  return {
    async unary(t, o, i, r, c, d, p) {
      var T;
      const { serialize: R, parse: S } = za(o, n, a.jsonOptions, a.binaryOptions);
      return r = r === void 0 ? a.defaultTimeoutMs : r <= 0 ? void 0 : r, await ir({
        interceptors: a.interceptors,
        signal: i,
        timeoutMs: r,
        req: {
          stream: !1,
          service: t,
          method: o,
          url: hi(a.baseUrl, t, o),
          init: {
            method: "POST",
            credentials: (T = a.credentials) !== null && T !== void 0 ? T : "same-origin",
            redirect: "error",
            mode: "cors"
          },
          header: Si(n, r, c),
          contextValues: p ?? ia(),
          message: d
        },
        next: async (h) => {
          var I;
          const P = await ((I = a.fetch) !== null && I !== void 0 ? I : globalThis.fetch)(h.url, Object.assign(Object.assign({}, h.init), { headers: h.header, signal: h.signal, body: yi(0, R(h.message)) })), { headerError: z } = Ii(P.status, P.headers);
          if (!P.body)
            throw z !== void 0 ? z : "missing response body";
          const k = ki(P.body).getReader();
          let v, g;
          for (; ; ) {
            const y = await k.read();
            if (y.done)
              break;
            const { flags: M, data: b } = y.value;
            if ((M & Ti) === Ti)
              throw new N("protocol error: received unsupported compressed output", w.Internal);
            if (M === Ga) {
              if (v !== void 0)
                throw "extra trailer";
              v = vi(b);
              continue;
            }
            if (g !== void 0)
              throw new N("extra message", w.Unimplemented);
            g = S(b);
          }
          if (v === void 0)
            throw z !== void 0 ? z : new N("missing trailer", P.headers.has(cn) ? w.Unimplemented : w.Unknown);
          if (_i(v, P.headers), g === void 0)
            throw new N("missing message", v.has(cn) ? w.Unimplemented : w.Unknown);
          return {
            stream: !1,
            service: t,
            method: o,
            header: P.headers,
            message: g,
            trailer: v
          };
        }
      });
    },
    async stream(t, o, i, r, c, d, p) {
      var T;
      const { serialize: R, parse: S } = za(o, n, a.jsonOptions, a.binaryOptions);
      function h(O, P, z, k, v) {
        return Xf(this, arguments, function* () {
          const y = ki(O).getReader();
          if (P) {
            if (!(yield Ve(y.read())).done)
              throw "extra data for trailers-only";
            return yield Ve(void 0);
          }
          let M = !1;
          for (; ; ) {
            const b = yield Ve(y.read());
            if (b.done)
              break;
            const { flags: Z, data: D } = b.value;
            if ((Z & Ga) === Ga) {
              if (M)
                throw "extra trailer";
              M = !0;
              const Y = vi(D);
              _i(Y, k), Y.forEach((Da, Aa) => z.set(Aa, Da));
              continue;
            }
            if (M)
              throw "extra message";
            yield yield Ve(S(D));
          }
          if ("throwIfAborted" in v && v.throwIfAborted(), !M)
            throw "missing trailer";
        });
      }
      async function I(O) {
        if (o.kind != m.ServerStreaming)
          throw "The fetch API does not support streaming request bodies";
        const P = await O[Symbol.asyncIterator]().next();
        if (P.done == !0)
          throw "missing request message";
        return yi(0, R(P.value));
      }
      return r = r === void 0 ? a.defaultTimeoutMs : r <= 0 ? void 0 : r, rr({
        interceptors: a.interceptors,
        signal: i,
        timeoutMs: r,
        req: {
          stream: !0,
          service: t,
          method: o,
          url: hi(a.baseUrl, t, o),
          init: {
            method: "POST",
            credentials: (T = a.credentials) !== null && T !== void 0 ? T : "same-origin",
            redirect: "error",
            mode: "cors"
          },
          header: Si(n, r, c),
          contextValues: p ?? ia(),
          message: d
        },
        next: async (O) => {
          var P;
          const k = await ((P = a.fetch) !== null && P !== void 0 ? P : globalThis.fetch)(O.url, Object.assign(Object.assign({}, O.init), { headers: O.header, signal: O.signal, body: await I(O.message) })), { foundStatus: v, headerError: g } = Ii(k.status, k.headers);
          if (g != null)
            throw g;
          if (!k.body)
            throw "missing response body";
          const y = new Headers();
          return Object.assign(Object.assign({}, O), { header: k.headers, trailer: y, message: h(k.body, v, y, k.headers, O.signal) });
        }
      });
    }
  };
}
const ca = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.PacketMessage",
  () => [
    {
      no: 1,
      name: "data",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    },
    {
      no: 2,
      name: "eom",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), ut = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.Stream",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    }
  ]
), Ba = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.Request",
  () => [
    { no: 1, name: "stream", kind: "message", T: ut },
    { no: 2, name: "headers", kind: "message", T: Tr, oneof: "type" },
    { no: 3, name: "message", kind: "message", T: Ka, oneof: "type" },
    { no: 4, name: "rst_stream", kind: "scalar", T: 8, oneof: "type" }
  ]
), Tr = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.RequestHeaders",
  () => [
    {
      no: 1,
      name: "method",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "metadata", kind: "message", T: va },
    { no: 3, name: "timeout", kind: "message", T: F }
  ]
), Ka = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.RequestMessage",
  () => [
    {
      no: 1,
      name: "has_message",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 2, name: "packet_message", kind: "message", T: ca },
    {
      no: 3,
      name: "eos",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Zf = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.Response",
  () => [
    { no: 1, name: "stream", kind: "message", T: ut },
    { no: 2, name: "headers", kind: "message", T: eR, oneof: "type" },
    { no: 3, name: "message", kind: "message", T: nR, oneof: "type" },
    { no: 4, name: "trailers", kind: "message", T: aR, oneof: "type" }
  ]
), eR = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.ResponseHeaders",
  () => [
    { no: 1, name: "metadata", kind: "message", T: va }
  ]
), nR = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.ResponseMessage",
  () => [
    { no: 1, name: "packet_message", kind: "message", T: ca }
  ]
), aR = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.ResponseTrailers",
  () => [
    { no: 1, name: "status", kind: "message", T: ln },
    { no: 2, name: "metadata", kind: "message", T: va }
  ]
), kr = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.Strings",
  () => [
    { no: 1, name: "values", kind: "scalar", T: 9, repeated: !0 }
  ]
), va = /* @__PURE__ */ s.makeMessageType(
  "proto.rpc.webrtc.v1.Metadata",
  () => [
    { no: 1, name: "md", kind: "map", K: 9, V: { kind: "message", T: kr } }
  ]
);
class Ae extends Error {
  name = "ConnectionClosedError";
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Ae.prototype);
  }
  static isError(e) {
    return e instanceof Ae || e instanceof N && e.rawMessage === "closed" ? !0 : typeof e == "string" ? e === "Response closed without headers" : e instanceof Error ? e.message === "Response closed without headers" : !1;
  }
}
class tR {
  ready;
  peerConn;
  dataChannel;
  pResolve;
  pReject;
  closed = !1;
  closedReason;
  maxDataChannelSize = 65535;
  constructor(e, n) {
    this.peerConn = e, this.dataChannel = n, this.ready = new Promise((t, o) => {
      this.pResolve = t, this.pReject = o;
    }), n.addEventListener("open", () => this.onChannelOpen()), n.addEventListener("close", () => this.onChannelClose()), n.addEventListener("error", (t) => {
      this.onChannelError(t);
    }), e.addEventListener("iceconnectionstatechange", () => {
      const t = e.iceConnectionState;
      (t === "failed" || t === "disconnected" || t === "closed") && this.pReject?.(new Error(`ICE connection failed with state: ${t}`));
    });
  }
  isClosed() {
    return this.closed;
  }
  isClosedReason() {
    return this.closedReason;
  }
  closeWithReason(e) {
    this.closed || (this.closed = !0, this.closedReason = e, this.pReject?.(e), this.peerConn.close());
  }
  onChannelOpen() {
    this.pResolve?.(void 0);
  }
  onChannelClose() {
    this.closeWithReason(new Ae("data channel closed"));
  }
  onChannelError(e) {
    console.error("channel error", e), this.closeWithReason(new Error(JSON.stringify(e)));
  }
  write(e) {
    this.dataChannel.send(e.toBinary());
  }
}
const bi = 33554432;
class sR {
  grpcStream;
  onDone;
  closed = !1;
  packetBuf = [];
  packetBufSize = 0;
  constructor(e, n) {
    this.grpcStream = e, this.onDone = n;
  }
  closeWithRecvError() {
    this.closed || (this.closed = !0, this.onDone(this.grpcStream.id));
  }
  processPacketMessage(e) {
    const { data: n } = e;
    if (n.length + this.packetBufSize > bi) {
      this.packetBuf.length = 0, this.packetBufSize = 0, console.error(
        `message size larger than max ${bi}; discarding`
      );
      return;
    }
    if (this.packetBuf.push(n), this.packetBufSize += n.length, e.eom) {
      const t = new Uint8Array(this.packetBufSize);
      let o = 0;
      for (const i of this.packetBuf)
        t.set(i, o), o += i.length;
      return this.packetBuf.length = 0, this.packetBufSize = 0, t;
    }
  }
}
const oR = 16373;
class yr extends sR {
  channel;
  service;
  method;
  parseMessage;
  requestHeaders;
  headersReceived = !1;
  trailersReceived = !1;
  constructor(e, n, t, o, i, r) {
    super(n, t), this.channel = e, this.service = o, this.method = i;
    const { parse: c } = za(
      i,
      !0,
      void 0,
      void 0
    );
    this.parseMessage = c;
    const d = `/${o.typeName}/${i.name}`;
    this.requestHeaders = new Tr({
      method: d
    });
    const p = iR(wn(r));
    p && (this.requestHeaders.metadata = p);
  }
  startRequest(e) {
    e && e.addEventListener("abort", () => {
      this.resetStream();
    });
    try {
      this.channel.writeHeaders(this.grpcStream, this.requestHeaders);
    } catch (n) {
      console.error("error writing headers", n), this.closeWithRecvError();
    }
  }
  sendMessage(e) {
    if (e) {
      this.writeMessage(!1, e);
      return;
    }
    this.writeMessage(!1, void 0);
  }
  resetStream() {
    if (!this.closed)
      try {
        this.channel.writeReset(this.grpcStream);
      } catch (e) {
        console.error("error writing reset", e), this.closeWithRecvError();
      }
  }
  writeMessage(e, n) {
    try {
      if (!n || n.length === 0) {
        const o = new ca({
          eom: !0
        }), i = new Ka({
          hasMessage: !!n,
          packetMessage: o,
          eos: e
        });
        this.channel.writeMessage(this.grpcStream, i);
        return;
      }
      let t = n;
      for (; t.length > 0; ) {
        const o = Math.min(
          t.length,
          oR
        ), i = new ca();
        i.data = t.slice(0, o), t = t.slice(o), t.length === 0 && (i.eom = !0);
        const r = new Ka({
          hasMessage: !!t,
          packetMessage: i,
          eos: e
        });
        this.channel.writeMessage(this.grpcStream, r);
      }
    } catch (t) {
      console.error("error writing message", t), this.closeWithRecvError();
    }
  }
  onResponse(e) {
    switch (e.type.case) {
      case "headers": {
        if (this.headersReceived) {
          console.error(
            `invariant: headers already received for ${this.grpcStream.id}`
          );
          return;
        }
        if (this.trailersReceived) {
          console.error(
            `invariant: headers received after trailers for ${this.grpcStream.id}`
          );
          return;
        }
        this.processHeaders(e.type.value);
        break;
      }
      case "message": {
        if (!this.headersReceived) {
          console.error(
            `invariant: headers not yet received for ${this.grpcStream.id}`
          );
          return;
        }
        if (this.trailersReceived) {
          console.error(
            `invariant: headers received after trailers for ${this.grpcStream.id}`
          );
          return;
        }
        this.processMessage(e.type.value);
        break;
      }
      case "trailers": {
        this.processTrailers(e.type.value);
        break;
      }
      default: {
        console.error("unknown response type", e.type.case);
        break;
      }
    }
  }
  processHeaders(e) {
    this.headersReceived = !0, this.onHeaders(e);
  }
  processMessage(e) {
    if (!e.packetMessage)
      return;
    const n = super.processPacketMessage(e.packetMessage);
    n && this.onMessage(n);
  }
  processTrailers(e) {
    this.trailersReceived = !0;
    const { status: n } = e, t = n ? n.code : 0;
    if (this.onTrailers(e), t === 0) {
      this.closeWithRecvError();
      return;
    }
    this.closeWithRecvError();
  }
}
const iR = (a) => {
  if (!a)
    return;
  const e = new va({
    md: Object.fromEntries(
      [...a.entries()].map(([n, t]) => [
        n,
        new kr({ values: [t] })
      ])
    )
  });
  return Object.keys(e.md).length > 0 ? e : void 0;
}, Xa = (a) => {
  const e = Object.entries(a?.md ?? {}).flatMap(
    ([n, { values: t }]) => t.map((o) => [n, o])
  );
  return new Headers(e);
};
class rR extends yr {
  awaitingHeadersResult;
  gotHeaders = !1;
  // trailers will be written to later
  respStream = Ah();
  trailers = new Headers();
  respStreamQueue;
  async run(e, n, t, o) {
    const r = {
      req: {
        stream: !0,
        url: "",
        init: {},
        service: this.service,
        method: this.method,
        header: new Headers(),
        contextValues: o ?? ia(),
        message: t
      },
      /**
       * Next is what actually kicks off the request. The run call below will
       * ultimately call this for us.
       */
      next: async (c) => {
        const p = await new Promise((T, R) => {
          this.awaitingHeadersResult = {
            success: T,
            failure: R
          }, this.startRequest(), this.sendMessages(c.message).catch((S) => {
            console.error("error sending streaming message", S), this.closeWithRecvError();
          });
        });
        return {
          ...c,
          header: p,
          trailer: this.trailers,
          message: this.respStream
        };
      }
    };
    return e && (r.signal = e), n !== void 0 && (r.timeoutMs = n), rr(r);
  }
  async sendMessages(e) {
    for await (const n of e)
      this.sendMessage(n.toBinary());
    this.writeMessage(!0, void 0);
  }
  onHeaders(e) {
    this.gotHeaders = !0, this.awaitingHeadersResult?.success(Xa(e.metadata));
  }
  onTrailers(e) {
    if (e.metadata?.md) {
      for (const n in e.metadata.md)
        if (Object.hasOwn(e.metadata.md, n)) {
          const t = e.metadata.md[n];
          for (const o of t?.values ?? [])
            this.trailers.append(n, o);
        }
    }
    if (this.respStream.close(), !e.status || e.status.code === 0) {
      if (this.gotHeaders)
        return;
      this.awaitingHeadersResult?.success(new Headers());
      return;
    }
    this.gotHeaders || this.awaitingHeadersResult?.failure(e.status.message);
  }
  onMessage(e) {
    const n = this.parseMessage(e);
    this.respStreamQueue = this.respStreamQueue ? this.respStreamQueue.then(async () => this.respStream.write(n)) : this.respStream.write(n), this.respStreamQueue.catch((t) => {
      console.error(
        `error pushing received message into stream; failing: ${t}`
      ), this.resetStream();
    });
  }
}
class mR extends yr {
  result;
  headers;
  message;
  async run(e, n, t, o) {
    const r = {
      req: {
        stream: !1,
        url: "",
        init: {},
        service: this.service,
        method: this.method,
        header: new Headers(),
        contextValues: o ?? ia(),
        message: t
      },
      /**
       * Next is what actually kicks off the request. The run call below will
       * ultimately call this for us.
       */
      next: async (c) => new Promise((d, p) => {
        this.result = { success: d, failure: p }, this.startRequest(), this.sendMessage(c.message.toBinary());
      })
    };
    return e && (r.signal = e), n !== void 0 && (r.timeoutMs = n), ir(r);
  }
  onHeaders(e) {
    if (this.headers !== void 0) {
      this.result?.failure(
        new Error("invariant: received headers more than once")
      );
      return;
    }
    this.headers = Xa(e.metadata);
  }
  onTrailers(e) {
    const n = Xa(e.metadata);
    if (!e.status || e.status.code === 0) {
      if (!this.headers) {
        this.result?.failure(
          new Error(
            "invariant: received trailers for successful unary request without headers"
          )
        );
        return;
      }
      if (this.message === void 0) {
        this.result?.failure(
          new Error(
            "invariant: received trailers for successful unary request without message"
          )
        );
        return;
      }
      this.result?.success({
        stream: !1,
        header: this.headers,
        message: this.message,
        trailer: n,
        service: this.service,
        method: this.method
      });
      return;
    }
    this.result?.failure(e.status.message);
  }
  onMessage(e) {
    if (this.message !== void 0) {
      this.result?.failure(
        new Error("invariant: received two response messages for unary request")
      );
      return;
    }
    this.message = this.parseMessage(e);
  }
}
const cR = 256;
class lR extends tR {
  streamIDCounter = 0;
  streams = /* @__PURE__ */ new Map();
  constructor(e, n) {
    super(e, n), n.addEventListener("message", (t) => {
      this.onChannelMessage(t);
    }), e.addEventListener("iceconnectionstatechange", () => {
      const t = e.iceConnectionState;
      (t === "failed" || t === "disconnected" || t === "closed") && this.onConnectionTerminated();
    }), n.addEventListener("close", () => this.onConnectionTerminated());
  }
  onConnectionTerminated() {
    this.closeWithReason(new Ae("data channel closed"));
    for (const e of this.streams.values())
      e.cs.closeWithRecvError();
  }
  onChannelMessage(e) {
    const n = Zf.fromBinary(new Uint8Array(e.data)), { stream: t } = n;
    if (t === void 0) {
      console.error("no stream id; discarding");
      return;
    }
    const { id: o } = t, i = this.streams.get(o.toString());
    if (i === void 0) {
      console.error("no stream for id; discarding", "id", o);
      return;
    }
    i.cs.onResponse(n);
  }
  nextStreamID() {
    const e = this.streamIDCounter;
    return this.streamIDCounter += 1, new ut({
      id: BigInt(e)
    });
  }
  newStream(e, n, t, o, i) {
    if (this.isClosed())
      throw new Ae("connection closed");
    let r = this.streams.get(n.id.toString());
    if (r !== void 0)
      throw new Error("invariant: stream should not exist yet");
    if (Object.keys(this.streams).length > cR)
      throw new Error("stream limit hit");
    const c = new e(
      this,
      n,
      (d) => this.removeStreamByID(d),
      t,
      o,
      i
    );
    return r = { cs: c }, this.streams.set(n.id.toString(), r), c;
  }
  removeStreamByID(e) {
    this.streams.delete(e.toString());
  }
  writeHeaders(e, n) {
    this.write(
      new Ba({
        stream: e,
        type: {
          case: "headers",
          value: n
        }
      })
    );
  }
  writeMessage(e, n) {
    this.write(
      new Ba({
        stream: e,
        type: {
          case: "message",
          value: n
        }
      })
    );
  }
  writeReset(e) {
    this.write(
      new Ba({
        stream: e,
        type: {
          case: "rstStream",
          value: !0
        }
      })
    );
  }
  async unary(e, n, t, o, i, r, c) {
    return this.newStream(
      mR,
      this.nextStreamID(),
      e,
      n,
      i
    ).run(t, o, r, c);
  }
  async stream(e, n, t, o, i, r, c) {
    return this.newStream(
      rR,
      this.nextStreamID(),
      e,
      n,
      i
    ).run(t, o, r, c);
  }
}
const xa = "invariant: call uuid unset";
class dR {
  constructor(e, n, t, o, i) {
    this.signalingClient = e, this.callOpts = n, this.pc = t, this.dc = o, this.dialOpts = i, this.clientChannel = new lR(this.pc, this.dc);
  }
  clientChannel;
  callUuid;
  // only send once since exchange may end or ICE may end
  sentDoneOrErrorOnce = !1;
  exchangeDone = !1;
  iceComplete = !1;
  haveInitResponse = !1;
  awaitingRemoteDescription;
  remoteDescriptionSet;
  // stats
  numCallUpdates = 0;
  maxCallUpdateDuration = 0;
  totalCallUpdateDuration = 0;
  async doExchange() {
    await this.setup();
    const e = Ha(
      this.pc.localDescription,
      this.dialOpts?.additionalSdpFields
    ), n = ja(JSON.stringify(e)), t = new dr({
      sdp: n
    });
    this.dialOpts && this.dialOpts.disableTrickleICE && (t.disableTrickle = this.dialOpts.disableTrickleICE), this.clientChannel.ready.then(() => {
      this.exchangeDone = !0;
    }).catch(console.error);
    const o = this.signalingClient.call(t, this.callOpts), i = this.processCallResponses(o);
    return await Promise.all([this.clientChannel.ready, i]), this.clientChannel;
  }
  async setup() {
    if (this.remoteDescriptionSet = new Promise((e, n) => {
      this.awaitingRemoteDescription = {
        success: e,
        failure: n
      };
    }), !this.dialOpts?.disableTrickleICE) {
      const e = await this.pc.createOffer({});
      this.pc.addEventListener("iceconnectionstatechange", () => {
        if (this.pc.iceConnectionState !== "completed" || this.numCallUpdates === 0)
          return;
        const n = this.totalCallUpdateDuration / this.numCallUpdates;
        console.groupCollapsed("Caller update statistics"), console.table({
          num_updates: this.numCallUpdates,
          average_duration: `${n}ms`,
          max_duration: `${this.maxCallUpdateDuration}ms`
        }), console.groupEnd();
      }), this.pc.addEventListener(
        "icecandidate",
        (n) => {
          this.onLocalICECandidate(n).catch((t) => {
            console.error(`error processing local ICE candidate ${t}`);
          });
        }
      ), await this.pc.setLocalDescription(e);
    }
  }
  terminate(e) {
    this.clientChannel.closeWithReason(e);
  }
  async processCallResponses(e) {
    try {
      for await (const n of e)
        switch (n.stage.case) {
          case "init": {
            if (!await this.handleInitResponse(
              n.uuid,
              n.stage.value
            ))
              return;
            break;
          }
          case "update": {
            if (!await this.handleUpdateResponse(
              n.uuid,
              n.stage.value
            ))
              return;
            break;
          }
          default: {
            await this.sendError("unknown CallResponse stage");
            return;
          }
        }
    } catch (n) {
      this.handleInitError(n);
    }
  }
  handleInitError(e) {
    if (!(this.exchangeDone || this.pc.iceConnectionState === "connected")) {
      if (e instanceof N && e.code === w.Unimplemented) {
        if (e.message === "Response closed without headers")
          throw new Ae("failed to dial");
        if (this.clientChannel.isClosed())
          throw new Ae("client channel is closed");
        console.error(e.message);
      }
      throw e;
    }
  }
  async handleInitResponse(e, n) {
    if (this.haveInitResponse)
      return await this.sendError("got init stage more than once"), !1;
    this.haveInitResponse = !0, this.callUuid = e;
    const t = new RTCSessionDescription(
      JSON.parse(gr(n.sdp))
    );
    return this.clientChannel.isClosed() ? (await this.sendError("client channel is closed"), !1) : (await this.pc.setRemoteDescription(t), this.awaitingRemoteDescription?.success(!0), this.dialOpts?.disableTrickleICE ? (this.exchangeDone = !0, await this.sendDone(), !1) : !0);
  }
  async handleUpdateResponse(e, n) {
    if (!this.haveInitResponse)
      return await this.sendError("got update stage before init stage"), !1;
    if (e !== this.callUuid)
      return await this.sendError(`uuid mismatch; have=${e} want=${this.callUuid}`), !1;
    if (n.candidate === void 0)
      return await this.sendError("no candidate"), !1;
    const t = pR(n.candidate);
    t.candidate !== void 0 && console.debug(`received remote ICE ${t.candidate}`);
    try {
      await this.pc.addIceCandidate(t);
    } catch (o) {
      throw console.log("error adding ice candidate", o), await this.sendError(JSON.stringify(o)), o;
    }
    return !0;
  }
  async onLocalICECandidate(e) {
    if (await this.remoteDescriptionSet, this.exchangeDone || this.pc.iceConnectionState === "connected")
      return;
    if (e.candidate === null) {
      this.iceComplete = !0, await this.sendDone();
      return;
    }
    if (this.callUuid === void 0 || this.callUuid === "")
      throw new Error(xa);
    e.candidate.candidate !== void 0 && console.debug(`gathered local ICE ${e.candidate.candidate}`);
    const n = uR(e.candidate), t = new $n({
      uuid: this.callUuid,
      update: {
        case: "candidate",
        value: n
      }
    }), o = /* @__PURE__ */ new Date();
    try {
      await this.signalingClient.callUpdate(t, this.callOpts), this.numCallUpdates += 1;
      const r = (/* @__PURE__ */ new Date()).getTime() - o.getTime();
      r > this.maxCallUpdateDuration && (this.maxCallUpdateDuration = r), this.totalCallUpdateDuration += r;
    } catch (i) {
      if (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.exchangeDone || this.iceComplete || // @ts-expect-error tsc is unaware that iceConnectionState can change
        this.pc.iceConnectionState === "connected"
      )
        return;
      console.error(i);
    }
  }
  async sendError(e) {
    if (this.sentDoneOrErrorOnce)
      return;
    if (this.callUuid === void 0 || this.callUuid === "")
      throw new Error(xa);
    this.sentDoneOrErrorOnce = !0;
    const n = new $n({
      uuid: this.callUuid,
      update: {
        case: "error",
        value: new ln({
          code: w.Unknown,
          message: e
        })
      }
    });
    try {
      await this.signalingClient.callUpdate(n, this.callOpts);
    } catch (t) {
      console.error("failed to send call update; continuing", t);
    }
  }
  async sendDone() {
    if (this.sentDoneOrErrorOnce)
      return;
    if (this.callUuid === void 0 || this.callUuid === "")
      throw new Error(xa);
    this.sentDoneOrErrorOnce = !0;
    const e = new $n({
      uuid: this.callUuid,
      update: {
        case: "done",
        value: !0
      }
    });
    try {
      await this.signalingClient.callUpdate(e, this.callOpts);
    } catch (n) {
      console.error(n);
    }
  }
}
const pR = (a) => {
  const e = {
    candidate: a.candidate
  };
  return a.sdpMid !== void 0 && (e.sdpMid = a.sdpMid), a.sdpmLineIndex !== void 0 && (e.sdpMLineIndex = a.sdpmLineIndex), a.usernameFragment !== void 0 && (e.usernameFragment = a.usernameFragment), e;
}, uR = (a) => {
  const e = new Nn();
  return a.candidate !== void 0 && (e.candidate = a.candidate), a.sdpMid !== void 0 && a.sdpMid !== null && (e.sdpMid = a.sdpMid), a.sdpMLineIndex !== void 0 && a.sdpMLineIndex !== null && (e.sdpmLineIndex = a.sdpMLineIndex), a.usernameFragment !== void 0 && a.usernameFragment !== null && (e.usernameFragment = a.usernameFragment), e;
}, En = async (a, e) => {
  hr(e);
  const n = globalThis.VIAM?.GRPC_TRANSPORT_FACTORY ?? Qf, t = {
    baseUrl: a
  };
  if (e?.accessToken !== void 0 && e.accessToken !== "" && !(e.externalAuthAddress !== void 0 && e.externalAuthAddress !== "" && e.externalAuthToEntity !== void 0 && e.externalAuthToEntity !== "")) {
    const o = new Headers(e.extraHeaders);
    return o.set("authorization", `Bearer ${e.accessToken}`), new vr(t, n, o);
  }
  return e === void 0 || e.credentials === void 0 && e.accessToken === void 0 ? n(t) : gR(
    a,
    n,
    e,
    t
  );
}, Qa = /^.*:\/\//u, gR = async (a, e, n, t) => {
  const o = new Headers(n.extraHeaders);
  let i;
  if (n.accessToken === void 0 || n.accessToken === "") {
    const r = new Wa({
      entity: Dn(n.credentials) && n.credentials.authEntity ? n.credentials.authEntity : a.replace(Qa, "")
    });
    n.credentials && (r.credentials = new lr({
      type: n.credentials.type,
      payload: n.credentials.payload
    }));
    const c = n.externalAuthAddress ?? a, d = e({ baseUrl: c });
    i = (await C(wf, d).authenticate(r)).accessToken;
  } else
    i = n.accessToken;
  if (n.externalAuthAddress !== void 0 && n.externalAuthAddress !== "" && n.externalAuthToEntity !== void 0 && n.externalAuthToEntity !== "") {
    const r = new Headers();
    r.set("authorization", `Bearer ${i}`), i = "";
    const c = new Wa({
      entity: n.externalAuthToEntity
    }), d = e({
      baseUrl: n.externalAuthAddress
    });
    i = (await C(
      Of,
      d
    ).authenticateTo(c, {
      headers: r
    })).accessToken;
  }
  return o.set("authorization", `Bearer ${i}`), new vr(t, e, o);
};
class vr {
  transport;
  extraHeaders;
  constructor(e, n, t) {
    this.extraHeaders = t, this.transport = n(e);
  }
  async unary(e, n, t, o, i, r, c) {
    const d = wn(i);
    for (const [p, T] of this.extraHeaders)
      d.set(p, T);
    return this.transport.unary(
      e,
      n,
      t,
      o,
      d,
      r,
      c
    );
  }
  async stream(e, n, t, o, i, r, c) {
    const d = wn(i);
    for (const [p, T] of this.extraHeaders)
      d.set(p, T);
    return this.transport.stream(
      e,
      n,
      t,
      o,
      d,
      r,
      c
    );
  }
}
const wn = (a) => {
  const e = new Headers();
  if (a !== void 0)
    if (Array.isArray(a))
      for (const [n, t] of a)
        e.append(n, t);
    else if ("forEach" in a)
      typeof a.forEach == "function" && a.forEach((n, t) => {
        e.append(t, n);
      });
    else
      for (const [n, t] of Object.entries(a))
        e.append(n, t);
  return e;
}, TR = async (a, e, n) => {
  const t = { ...n }, o = await En(a, t), i = C(
    pr,
    o
  );
  try {
    return (await i.optionalWebRTCConfig({}, e)).config ?? new ma();
  } catch (r) {
    if (r instanceof N && r.code === w.Unimplemented)
      return new ma();
    throw r;
  }
}, kR = async (a, e, n) => {
  const t = a.replace(/\/$/u, "");
  hr(n);
  const o = {
    headers: {
      "rpc-host": e
    }
  }, i = await yR(
    t,
    o,
    n
  ), r = vR(
    t,
    n
  ), { pc: c, dc: d } = await jf(
    i.disableTrickleICE,
    i.rtcConfig,
    i.additionalSdpFields
  );
  let p = !1, T;
  try {
    T = await En(t, r);
  } catch (h) {
    throw c.close(), h;
  }
  const R = C(
    pr,
    T
  ), S = new dR(
    R,
    o,
    c,
    d,
    i
  );
  try {
    n?.dialTimeout !== void 0 && setTimeout(() => {
      p || S.terminate(new Error("timed out"));
    }, n.dialTimeout);
    const h = await S.doExchange();
    return n?.externalAuthAddress !== void 0 && n.externalAuthAddress !== "" || n?.credentials?.type, p = !0, {
      transport: h,
      peerConnection: c,
      dataChannel: d
    };
  } catch (h) {
    throw console.error("error dialing", h), h;
  } finally {
    p || c.close();
  }
}, yR = async (a, e, n) => {
  const t = await TR(
    a,
    e,
    n
  ), o = t.additionalIceServers.map(
    (c) => {
      const d = [];
      for (const p of c.urls)
        p.endsWith("udp") && d.push(`${p.slice(0, -3)}tcp`), d.push(p);
      return {
        urls: d,
        credential: c.credential,
        username: c.username
      };
    }
  ), i = n;
  let r;
  return i.webrtcOptions === void 0 ? r = {
    disableTrickleICE: t.disableTrickle,
    rtcConfig: {
      iceServers: o
    }
  } : (r = JSON.parse(
    JSON.stringify(i.webrtcOptions)
  ), r.rtcConfig === void 0 ? r.rtcConfig = { iceServers: o } : r.rtcConfig.iceServers = [
    ...r.rtcConfig.iceServers ?? [],
    ...o
  ]), r;
}, vR = (a, e) => {
  let n = e;
  return n = { ...e }, e.accessToken === void 0 && (Dn(n.credentials) && !n.credentials.authEntity && (n.credentials.authEntity = n.externalAuthAddress !== void 0 && n.externalAuthAddress !== "" ? n.externalAuthAddress.replace(Qa, "") : a.replace(Qa, "")), n.credentials = e.webrtcOptions?.signalingCredentials, n.accessToken = e.webrtcOptions?.signalingAccessToken), n.externalAuthAddress = e.webrtcOptions?.signalingExternalAuthAddress, n.externalAuthToEntity = e.webrtcOptions?.signalingExternalAuthToEntity, n;
}, hr = (a) => {
  if (a) {
    if (a.accessToken !== void 0 && a.accessToken.length > 0) {
      if (a.credentials)
        throw new Error("cannot set credentials with accessToken");
      if (a.webrtcOptions !== void 0) {
        if (a.webrtcOptions.signalingAccessToken !== void 0)
          throw new Error(
            "cannot set webrtcOptions.signalingAccessToken with accessToken"
          );
        if (a.webrtcOptions.signalingCredentials !== void 0)
          throw new Error(
            "cannot set webrtcOptions.signalingCredentials with accessToken"
          );
      }
    }
    if (a.webrtcOptions?.signalingAccessToken !== void 0 && a.webrtcOptions.signalingAccessToken.length > 0 && a.webrtcOptions.signalingCredentials !== void 0)
      throw new Error(
        "cannot set webrtcOptions.signalingCredentials with webrtcOptions.signalingAccessToken"
      );
  }
}, hR = "v0.1.462", fr = /* @__PURE__ */ s.makeEnum(
  "viam.common.v1.KinematicsFileFormat",
  [
    { no: 0, name: "KINEMATICS_FILE_FORMAT_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "KINEMATICS_FILE_FORMAT_SVA", localName: "SVA" },
    { no: 2, name: "KINEMATICS_FILE_FORMAT_URDF", localName: "URDF" }
  ]
), x = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.ResourceName",
  () => [
    {
      no: 1,
      name: "namespace",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "subtype",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "remote_path", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 6,
      name: "local_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ue = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.Pose",
  () => [
    {
      no: 1,
      name: "x",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "y",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "z",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "o_x",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 5,
      name: "o_y",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 6,
      name: "o_z",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 7,
      name: "theta",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), Rr = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.Orientation",
  () => [
    {
      no: 1,
      name: "o_x",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "o_y",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "o_z",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "theta",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), Ke = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.PoseInFrame",
  () => [
    {
      no: 1,
      name: "reference_frame",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "pose", kind: "message", T: Ue }
  ]
), qe = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.Vector3",
  () => [
    {
      no: 1,
      name: "x",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "y",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "z",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), _r = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.Sphere",
  () => [
    {
      no: 1,
      name: "radius_mm",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), Sr = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.Capsule",
  () => [
    {
      no: 1,
      name: "radius_mm",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "length_mm",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), Ir = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.RectangularPrism",
  () => [
    { no: 1, name: "dims_mm", kind: "message", T: qe }
  ]
), br = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.Mesh",
  () => [
    {
      no: 1,
      name: "content_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "mesh",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), Xe = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.Geometry",
  () => [
    { no: 1, name: "center", kind: "message", T: Ue },
    { no: 2, name: "sphere", kind: "message", T: _r, oneof: "geometry_type" },
    { no: 3, name: "box", kind: "message", T: Ir, oneof: "geometry_type" },
    { no: 5, name: "capsule", kind: "message", T: Sr, oneof: "geometry_type" },
    { no: 6, name: "mesh", kind: "message", T: br, oneof: "geometry_type" },
    {
      no: 4,
      name: "label",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), gt = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.GeometriesInFrame",
  () => [
    {
      no: 1,
      name: "reference_frame",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "geometries", kind: "message", T: Xe, repeated: !0 }
  ]
), Tt = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.PointCloudObject",
  () => [
    {
      no: 1,
      name: "point_cloud",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    },
    { no: 2, name: "geometries", kind: "message", T: gt }
  ]
), ze = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.GeoPoint",
  () => [
    {
      no: 1,
      name: "latitude",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "longitude",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), la = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.GeoGeometry",
  () => [
    { no: 1, name: "location", kind: "message", T: ze },
    { no: 2, name: "geometries", kind: "message", T: Xe, repeated: !0 }
  ]
), Qe = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.Transform",
  () => [
    {
      no: 1,
      name: "reference_frame",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "pose_in_observer_frame", kind: "message", T: Ke },
    { no: 3, name: "physical_object", kind: "message", T: Xe, opt: !0 }
  ]
), Mr = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.WorldState",
  () => [
    { no: 1, name: "obstacles", kind: "message", T: gt, repeated: !0 },
    { no: 3, name: "transforms", kind: "message", T: Qe, repeated: !0 }
  ]
), fR = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.ActuatorStatus",
  () => [
    {
      no: 1,
      name: "is_moving",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Er = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.ResponseMetadata",
  () => [
    { no: 1, name: "captured_at", kind: "message", T: _, opt: !0 }
  ]
), q = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.DoCommandRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "command", kind: "message", T: l }
  ]
), U = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.DoCommandResponse",
  () => [
    { no: 1, name: "result", kind: "message", T: l }
  ]
), kt = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.GetKinematicsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), yt = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.GetKinematicsResponse",
  () => [
    { no: 1, name: "format", kind: "enum", T: s.getEnumType(fr) },
    {
      no: 2,
      name: "kinematics_data",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), J = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.GetGeometriesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), K = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.GetGeometriesResponse",
  () => [
    { no: 1, name: "geometries", kind: "message", T: Xe, repeated: !0 }
  ]
), Ze = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.GetReadingsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), ha = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.GetReadingsResponse",
  () => [
    { no: 1, name: "readings", kind: "map", K: 9, V: { kind: "message", T: X } }
  ]
), Pn = /* @__PURE__ */ s.makeMessageType(
  "viam.common.v1.LogEntry",
  () => [
    {
      no: 1,
      name: "host",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "level",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "time", kind: "message", T: _ },
    {
      no: 4,
      name: "logger_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "message",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 6, name: "caller", kind: "message", T: l },
    {
      no: 7,
      name: "stack",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 8, name: "fields", kind: "message", T: l, repeated: !0 }
  ]
), wr = s.makeExtension(
  "viam.common.v1.safety_heartbeat_monitored",
  me,
  { no: 84260, kind: "scalar", T: 8, opt: !0 }
), Or = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ActuatorStatus: fR,
  Capsule: Sr,
  DoCommandRequest: q,
  DoCommandResponse: U,
  GeoGeometry: la,
  GeoPoint: ze,
  GeometriesInFrame: gt,
  Geometry: Xe,
  GetGeometriesRequest: J,
  GetGeometriesResponse: K,
  GetKinematicsRequest: kt,
  GetKinematicsResponse: yt,
  GetReadingsRequest: Ze,
  GetReadingsResponse: ha,
  KinematicsFileFormat: fr,
  LogEntry: Pn,
  Mesh: br,
  Orientation: Rr,
  PointCloudObject: Tt,
  Pose: Ue,
  PoseInFrame: Ke,
  RectangularPrism: Ir,
  ResourceName: x,
  ResponseMetadata: Er,
  Sphere: _r,
  Transform: Qe,
  Vector3: qe,
  WorldState: Mr,
  safety_heartbeat_monitored: wr
}, Symbol.toStringTag, { value: "Module" })), Za = new Headers({
  "viam-client": `typescript;v0.47.0;${hR}`
}), L = async function(e, n, t, o = {}, i = {}) {
  const r = new q({
    name: n,
    command: t
  });
  o.requestLogger?.(r);
  const d = (await e(r, i)).result?.toJson();
  return d === void 0 ? {} : d;
}, P_ = (a, e) => {
  const n = e ?? { headers: {} };
  let t = "";
  if (a === void 0) {
    const o = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 6; i += 1)
      t += o[Math.floor(Math.random() * 26)];
  } else
    t = a;
  return n.headers.dtname = t, n;
}, D_ = (a) => {
  if (a.headers) {
    const { _: e, ...n } = a.headers;
    a.headers = n;
  }
}, A_ = (a, e, n) => {
  const t = n ?? { headers: {} };
  return t.headers[a] = e, t;
}, q_ = (a, e) => {
  const { [e]: n, ...t } = a.headers;
  a.headers = t;
}, Dn = (a) => a !== void 0 && "authEntity" in a, RR = async (a, e) => e.type === "access-token" ? En(a, {
  accessToken: e.payload,
  extraHeaders: Za
}) : En(a, {
  credentials: e,
  extraHeaders: Za
}), vt = 5e3;
var ae = /* @__PURE__ */ ((a) => (a.CONNECTING = "connecting", a.CONNECTED = "connected", a.DISCONNECTING = "disconnecting", a.DISCONNECTED = "disconnected", a))(ae || {});
class Cr {
  listeners = {};
  on(e, n) {
    const { listeners: t } = this;
    t[e] ??= /* @__PURE__ */ new Set(), t[e]?.add(n);
  }
  once(e, n) {
    const t = (o) => {
      n(o), this.off(e, n);
    };
    this.on(e, t);
  }
  has(e, n) {
    return this.listeners[e]?.has(n);
  }
  off(e, n) {
    this.listeners[e]?.delete(n);
  }
  emit(e, n) {
    for (const t of this.listeners[e] ?? [])
      t(n);
  }
}
const ht = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.GetEndPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Nr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.GetEndPositionResponse",
  () => [
    { no: 1, name: "pose", kind: "message", T: Ue }
  ]
), dn = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.JointPositions",
  () => [
    { no: 1, name: "values", kind: "scalar", T: 1, repeated: !0 }
  ]
), ft = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.GetJointPositionsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Pr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.GetJointPositionsResponse",
  () => [
    { no: 1, name: "positions", kind: "message", T: dn }
  ]
), Rt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.MoveToPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "to", kind: "message", T: Ue },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Dr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.MoveToPositionResponse",
  []
), _t = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.MoveToJointPositionsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "positions", kind: "message", T: dn },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Ar = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.MoveToJointPositionsResponse",
  []
), qr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.MoveThroughJointPositionsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "positions", kind: "message", T: dn, repeated: !0 },
    { no: 3, name: "options", kind: "message", T: Br, opt: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Ur = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.MoveThroughJointPositionsResponse",
  []
), St = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.StopRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Lr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.StopResponse",
  []
), _R = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.Status",
  () => [
    { no: 1, name: "end_position", kind: "message", T: Ue },
    { no: 2, name: "joint_positions", kind: "message", T: dn },
    {
      no: 3,
      name: "is_moving",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), It = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.IsMovingRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Gr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.IsMovingResponse",
  () => [
    {
      no: 1,
      name: "is_moving",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Br = /* @__PURE__ */ s.makeMessageType(
  "viam.component.arm.v1.MoveOptions",
  () => [
    { no: 1, name: "max_vel_degs_per_sec", kind: "scalar", T: 1, opt: !0 },
    { no: 2, name: "max_acc_degs_per_sec2", kind: "scalar", T: 1, opt: !0 }
  ]
), SR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetEndPositionRequest: ht,
  GetEndPositionResponse: Nr,
  GetJointPositionsRequest: ft,
  GetJointPositionsResponse: Pr,
  IsMovingRequest: It,
  IsMovingResponse: Gr,
  JointPositions: dn,
  MoveOptions: Br,
  MoveThroughJointPositionsRequest: qr,
  MoveThroughJointPositionsResponse: Ur,
  MoveToJointPositionsRequest: _t,
  MoveToJointPositionsResponse: Ar,
  MoveToPositionRequest: Rt,
  MoveToPositionResponse: Dr,
  Status: _R,
  StopRequest: St,
  StopResponse: Lr
}, Symbol.toStringTag, { value: "Module" })), xr = {
  typeName: "viam.component.arm.v1.ArmService",
  methods: {
    /**
     * GetEndPosition gets the current position the end of the robot's arm expressed as X,Y,Z,ox,oy,oz,theta
     *
     * @generated from rpc viam.component.arm.v1.ArmService.GetEndPosition
     */
    getEndPosition: {
      name: "GetEndPosition",
      I: ht,
      O: Nr,
      kind: m.Unary
    },
    /**
     * MoveToPosition moves the mount point of the robot's end effector to the requested position.
     * This will block until done or a new operation cancels this one
     *
     * @generated from rpc viam.component.arm.v1.ArmService.MoveToPosition
     */
    moveToPosition: {
      name: "MoveToPosition",
      I: Rt,
      O: Dr,
      kind: m.Unary
    },
    /**
     * GetJointPositions lists the joint positions (in degrees) of every joint on a robot
     *
     * @generated from rpc viam.component.arm.v1.ArmService.GetJointPositions
     */
    getJointPositions: {
      name: "GetJointPositions",
      I: ft,
      O: Pr,
      kind: m.Unary
    },
    /**
     * MoveToJointPositions moves every joint on a robot's arm to specified angles which are expressed in degrees
     * This will block until done or a new operation cancels this one
     *
     * @generated from rpc viam.component.arm.v1.ArmService.MoveToJointPositions
     */
    moveToJointPositions: {
      name: "MoveToJointPositions",
      I: _t,
      O: Ar,
      kind: m.Unary
    },
    /**
     * MoveThroughJointPositions moves every joint on a robot's arm to the specified JointPositions in the order they are specified,
     * obeying the specified velocity and acceleration limits.
     * This will block until done or a new operation cancels this one
     *
     * @generated from rpc viam.component.arm.v1.ArmService.MoveThroughJointPositions
     */
    moveThroughJointPositions: {
      name: "MoveThroughJointPositions",
      I: qr,
      O: Ur,
      kind: m.Unary
    },
    /**
     * Stop stops a robot's arm
     *
     * @generated from rpc viam.component.arm.v1.ArmService.Stop
     */
    stop: {
      name: "Stop",
      I: St,
      O: Lr,
      kind: m.Unary
    },
    /**
     * IsMoving reports if a component is in motion
     *
     * @generated from rpc viam.component.arm.v1.ArmService.IsMoving
     */
    isMoving: {
      name: "IsMoving",
      I: It,
      O: Gr,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.arm.v1.ArmService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetKinematics returns the kinematics file for the component
     *
     * @generated from rpc viam.component.arm.v1.ArmService.GetKinematics
     */
    getKinematics: {
      name: "GetKinematics",
      I: kt,
      O: yt,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.arm.v1.ArmService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    }
  }
}, bt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.MoveStraightRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "distance_mm",
      kind: "scalar",
      T: 3
      /* ScalarType.INT64 */
    },
    {
      no: 3,
      name: "mm_per_sec",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Fr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.MoveStraightResponse",
  []
), Mt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.SpinRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "angle_deg",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "degs_per_sec",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Jr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.SpinResponse",
  []
), Et = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.StopRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), zr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.StopResponse",
  []
), wt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.SetPowerRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "linear", kind: "message", T: qe },
    { no: 3, name: "angular", kind: "message", T: qe },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Yr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.SetPowerResponse",
  []
), Ot = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.SetVelocityRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "linear", kind: "message", T: qe },
    { no: 3, name: "angular", kind: "message", T: qe },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), $r = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.SetVelocityResponse",
  []
), Ct = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.IsMovingRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Vr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.IsMovingResponse",
  () => [
    {
      no: 1,
      name: "is_moving",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), fa = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.GetPropertiesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Wr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.base.v1.GetPropertiesResponse",
  () => [
    {
      no: 1,
      name: "width_meters",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "turning_radius_meters",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "wheel_circumference_meters",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), IR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetPropertiesRequest: fa,
  GetPropertiesResponse: Wr,
  IsMovingRequest: Ct,
  IsMovingResponse: Vr,
  MoveStraightRequest: bt,
  MoveStraightResponse: Fr,
  SetPowerRequest: wt,
  SetPowerResponse: Yr,
  SetVelocityRequest: Ot,
  SetVelocityResponse: $r,
  SpinRequest: Mt,
  SpinResponse: Jr,
  StopRequest: Et,
  StopResponse: zr
}, Symbol.toStringTag, { value: "Module" })), jr = {
  typeName: "viam.component.base.v1.BaseService",
  methods: {
    /**
     * MoveStraight moves a robot's base in a straight line by a given distance, expressed in millimeters
     * and a given speed, expressed in millimeters per second
     * This method blocks until completed or cancelled
     *
     * @generated from rpc viam.component.base.v1.BaseService.MoveStraight
     */
    moveStraight: {
      name: "MoveStraight",
      I: bt,
      O: Fr,
      kind: m.Unary
    },
    /**
     * Spin spins a robot's base by an given angle, expressed in degrees, and a given
     * angular speed, expressed in degrees per second
     * This method blocks until completed or cancelled
     *
     * @generated from rpc viam.component.base.v1.BaseService.Spin
     */
    spin: {
      name: "Spin",
      I: Mt,
      O: Jr,
      kind: m.Unary
    },
    /**
     * SetPower sets the linear and angular power of a base
     * -1 -> 1 in terms of power for each direction
     *
     * @generated from rpc viam.component.base.v1.BaseService.SetPower
     */
    setPower: {
      name: "SetPower",
      I: wt,
      O: Yr,
      kind: m.Unary
    },
    /**
     * SetVelocity sets the linear and angular velocity of a base
     *
     * @generated from rpc viam.component.base.v1.BaseService.SetVelocity
     */
    setVelocity: {
      name: "SetVelocity",
      I: Ot,
      O: $r,
      kind: m.Unary
    },
    /**
     * Stop stops a robot's base
     *
     * @generated from rpc viam.component.base.v1.BaseService.Stop
     */
    stop: {
      name: "Stop",
      I: Et,
      O: zr,
      kind: m.Unary
    },
    /**
     * IsMoving reports if a component is in motion
     *
     * @generated from rpc viam.component.base.v1.BaseService.IsMoving
     */
    isMoving: {
      name: "IsMoving",
      I: Ct,
      O: Vr,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.base.v1.BaseService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.base.v1.BaseService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    },
    /**
     * GetProperties returns the properties of a base in its current configuration
     *
     * @generated from rpc viam.component.base.v1.BaseService.GetProperties
     */
    getProperties: {
      name: "GetProperties",
      I: fa,
      O: Wr,
      kind: m.Unary
    }
  }
}, Hr = /* @__PURE__ */ s.makeEnum(
  "viam.component.board.v1.PowerMode",
  [
    { no: 0, name: "POWER_MODE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "POWER_MODE_NORMAL", localName: "NORMAL" },
    { no: 2, name: "POWER_MODE_OFFLINE_DEEP", localName: "OFFLINE_DEEP" }
  ]
), bR = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.Status",
  () => [
    { no: 1, name: "analogs", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    } },
    { no: 2, name: "digital_interrupts", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 3
      /* ScalarType.INT64 */
    } }
  ]
), Nt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.SetGPIORequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "pin",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "high",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Kr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.SetGPIOResponse",
  []
), Pt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.GetGPIORequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "pin",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Xr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.GetGPIOResponse",
  () => [
    {
      no: 1,
      name: "high",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Dt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.PWMRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "pin",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Qr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.PWMResponse",
  () => [
    {
      no: 1,
      name: "duty_cycle_pct",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), At = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.SetPWMRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "pin",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "duty_cycle_pct",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Zr = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.SetPWMResponse",
  []
), qt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.PWMFrequencyRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "pin",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), em = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.PWMFrequencyResponse",
  () => [
    {
      no: 1,
      name: "frequency_hz",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    }
  ]
), Ut = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.SetPWMFrequencyRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "pin",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "frequency_hz",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), nm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.SetPWMFrequencyResponse",
  []
), Lt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.ReadAnalogReaderRequest",
  () => [
    {
      no: 1,
      name: "board_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "analog_reader_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), am = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.ReadAnalogReaderResponse",
  () => [
    {
      no: 1,
      name: "value",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 2,
      name: "min_range",
      kind: "scalar",
      T: 2
      /* ScalarType.FLOAT */
    },
    {
      no: 3,
      name: "max_range",
      kind: "scalar",
      T: 2
      /* ScalarType.FLOAT */
    },
    {
      no: 4,
      name: "step_size",
      kind: "scalar",
      T: 2
      /* ScalarType.FLOAT */
    }
  ]
), Gt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.WriteAnalogRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "pin",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "value",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), tm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.WriteAnalogResponse",
  []
), Bt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.GetDigitalInterruptValueRequest",
  () => [
    {
      no: 1,
      name: "board_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "digital_interrupt_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), sm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.GetDigitalInterruptValueResponse",
  () => [
    {
      no: 1,
      name: "value",
      kind: "scalar",
      T: 3
      /* ScalarType.INT64 */
    }
  ]
), xt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.StreamTicksRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "pin_names", kind: "scalar", T: 9, repeated: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), om = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.StreamTicksResponse",
  () => [
    {
      no: 1,
      name: "pin_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "time",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    },
    {
      no: 3,
      name: "high",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Ft = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.SetPowerModeRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "power_mode", kind: "enum", T: s.getEnumType(Hr) },
    { no: 3, name: "duration", kind: "message", T: F, opt: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), im = /* @__PURE__ */ s.makeMessageType(
  "viam.component.board.v1.SetPowerModeResponse",
  []
), MR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetDigitalInterruptValueRequest: Bt,
  GetDigitalInterruptValueResponse: sm,
  GetGPIORequest: Pt,
  GetGPIOResponse: Xr,
  PWMFrequencyRequest: qt,
  PWMFrequencyResponse: em,
  PWMRequest: Dt,
  PWMResponse: Qr,
  PowerMode: Hr,
  ReadAnalogReaderRequest: Lt,
  ReadAnalogReaderResponse: am,
  SetGPIORequest: Nt,
  SetGPIOResponse: Kr,
  SetPWMFrequencyRequest: Ut,
  SetPWMFrequencyResponse: nm,
  SetPWMRequest: At,
  SetPWMResponse: Zr,
  SetPowerModeRequest: Ft,
  SetPowerModeResponse: im,
  Status: bR,
  StreamTicksRequest: xt,
  StreamTicksResponse: om,
  WriteAnalogRequest: Gt,
  WriteAnalogResponse: tm
}, Symbol.toStringTag, { value: "Module" })), rm = {
  typeName: "viam.component.board.v1.BoardService",
  methods: {
    /**
     * @generated from rpc viam.component.board.v1.BoardService.SetGPIO
     */
    setGPIO: {
      name: "SetGPIO",
      I: Nt,
      O: Kr,
      kind: m.Unary
    },
    /**
     * GetGPIO gets the high/low state of the given pin of a board of the underlying robot.
     *
     * @generated from rpc viam.component.board.v1.BoardService.GetGPIO
     */
    getGPIO: {
      name: "GetGPIO",
      I: Pt,
      O: Xr,
      kind: m.Unary
    },
    /**
     * PWM gets the duty cycle of the given pin of a board of the underlying robot.
     *
     * @generated from rpc viam.component.board.v1.BoardService.PWM
     */
    pWM: {
      name: "PWM",
      I: Dt,
      O: Qr,
      kind: m.Unary
    },
    /**
     * SetPWM sets the given pin of a board of the underlying robot to the given duty cycle.
     *
     * @generated from rpc viam.component.board.v1.BoardService.SetPWM
     */
    setPWM: {
      name: "SetPWM",
      I: At,
      O: Zr,
      kind: m.Unary
    },
    /**
     * PWMFrequency gets the PWM frequency of the given pin of a board of the underlying robot.
     *
     * @generated from rpc viam.component.board.v1.BoardService.PWMFrequency
     */
    pWMFrequency: {
      name: "PWMFrequency",
      I: qt,
      O: em,
      kind: m.Unary
    },
    /**
     * SetPWMFrequency sets the given pin of a board of the underlying robot to the given PWM frequency. 0 will use the board's default PWM frequency.
     *
     * @generated from rpc viam.component.board.v1.BoardService.SetPWMFrequency
     */
    setPWMFrequency: {
      name: "SetPWMFrequency",
      I: Ut,
      O: nm,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.board.v1.BoardService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * ReadAnalogReader reads off the current value of an analog reader of a board of the underlying robot.
     *
     * @generated from rpc viam.component.board.v1.BoardService.ReadAnalogReader
     */
    readAnalogReader: {
      name: "ReadAnalogReader",
      I: Lt,
      O: am,
      kind: m.Unary
    },
    /**
     * WriteAnalog writes the value to the analog writer of the board.
     *
     * @generated from rpc viam.component.board.v1.BoardService.WriteAnalog
     */
    writeAnalog: {
      name: "WriteAnalog",
      I: Gt,
      O: tm,
      kind: m.Unary
    },
    /**
     * GetDigitalInterruptValue returns the current value of the interrupt which is based on the type of interrupt.
     *
     * @generated from rpc viam.component.board.v1.BoardService.GetDigitalInterruptValue
     */
    getDigitalInterruptValue: {
      name: "GetDigitalInterruptValue",
      I: Bt,
      O: sm,
      kind: m.Unary
    },
    /**
     * StreamTicks starts a stream of ticks for the given digital interrupts.
     *
     * @generated from rpc viam.component.board.v1.BoardService.StreamTicks
     */
    streamTicks: {
      name: "StreamTicks",
      I: xt,
      O: om,
      kind: m.ServerStreaming
    },
    /**
     * `SetPowerMode` sets the power consumption mode of the board to the requested setting for the given duration.
     *
     * @generated from rpc viam.component.board.v1.BoardService.SetPowerMode
     */
    setPowerMode: {
      name: "SetPowerMode",
      I: Ft,
      O: im,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration.
     *
     * @generated from rpc viam.component.board.v1.BoardService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    }
  }
}, Jt = /* @__PURE__ */ s.makeEnum(
  "viam.component.encoder.v1.PositionType",
  [
    { no: 0, name: "POSITION_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "POSITION_TYPE_TICKS_COUNT", localName: "TICKS_COUNT" },
    { no: 2, name: "POSITION_TYPE_ANGLE_DEGREES", localName: "ANGLE_DEGREES" }
  ]
), zt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.encoder.v1.GetPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "position_type", kind: "enum", T: s.getEnumType(Jt), opt: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), mm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.encoder.v1.GetPositionResponse",
  () => [
    {
      no: 1,
      name: "value",
      kind: "scalar",
      T: 2
      /* ScalarType.FLOAT */
    },
    { no: 2, name: "position_type", kind: "enum", T: s.getEnumType(Jt) }
  ]
), Yt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.encoder.v1.ResetPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), cm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.encoder.v1.ResetPositionResponse",
  []
), $t = /* @__PURE__ */ s.makeMessageType(
  "viam.component.encoder.v1.GetPropertiesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), lm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.encoder.v1.GetPropertiesResponse",
  () => [
    {
      no: 1,
      name: "ticks_count_supported",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 2,
      name: "angle_degrees_supported",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), ER = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetPositionRequest: zt,
  GetPositionResponse: mm,
  GetPropertiesRequest: $t,
  GetPropertiesResponse: lm,
  PositionType: Jt,
  ResetPositionRequest: Yt,
  ResetPositionResponse: cm
}, Symbol.toStringTag, { value: "Module" })), dm = {
  typeName: "viam.component.encoder.v1.EncoderService",
  methods: {
    /**
     * Returns position of the encoder which can either be ticks since last
     * zeroing for an incremental encoder or degrees for an absolute encoder.
     *
     * @generated from rpc viam.component.encoder.v1.EncoderService.GetPosition
     */
    getPosition: {
      name: "GetPosition",
      I: zt,
      O: mm,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.component.encoder.v1.EncoderService.ResetPosition
     */
    resetPosition: {
      name: "ResetPosition",
      I: Yt,
      O: cm,
      kind: m.Unary
    },
    /**
     * Returns a list of all the methods that are
     * supported by a given robot.
     *
     * @generated from rpc viam.component.encoder.v1.EncoderService.GetProperties
     */
    getProperties: {
      name: "GetProperties",
      I: $t,
      O: lm,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.component.encoder.v1.EncoderService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.encoder.v1.EncoderService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    }
  }
}, Vt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.GetPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), pm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.GetPositionResponse",
  () => [
    { no: 1, name: "positions_mm", kind: "scalar", T: 1, repeated: !0 }
  ]
), Wt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.MoveToPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "positions_mm", kind: "scalar", T: 1, repeated: !0 },
    { no: 3, name: "speeds_mm_per_sec", kind: "scalar", T: 1, repeated: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), um = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.MoveToPositionResponse",
  []
), jt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.HomeRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), gm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.HomeResponse",
  () => [
    {
      no: 1,
      name: "homed",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Ht = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.GetLengthsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Tm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.GetLengthsResponse",
  () => [
    { no: 1, name: "lengths_mm", kind: "scalar", T: 1, repeated: !0 }
  ]
), Kt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.StopRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), km = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.StopResponse",
  []
), wR = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.Status",
  () => [
    { no: 1, name: "positions_mm", kind: "scalar", T: 1, repeated: !0 },
    { no: 2, name: "lengths_mm", kind: "scalar", T: 1, repeated: !0 },
    {
      no: 3,
      name: "is_moving",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Xt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.IsMovingRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ym = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gantry.v1.IsMovingResponse",
  () => [
    {
      no: 1,
      name: "is_moving",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), U_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetLengthsRequest: Ht,
  GetLengthsResponse: Tm,
  GetPositionRequest: Vt,
  GetPositionResponse: pm,
  HomeRequest: jt,
  HomeResponse: gm,
  IsMovingRequest: Xt,
  IsMovingResponse: ym,
  MoveToPositionRequest: Wt,
  MoveToPositionResponse: um,
  Status: wR,
  StopRequest: Kt,
  StopResponse: km
}, Symbol.toStringTag, { value: "Module" })), vm = {
  typeName: "viam.component.gantry.v1.GantryService",
  methods: {
    /**
     * GetPosition gets the current position of a gantry of the underlying robot.
     *
     * @generated from rpc viam.component.gantry.v1.GantryService.GetPosition
     */
    getPosition: {
      name: "GetPosition",
      I: Vt,
      O: pm,
      kind: m.Unary
    },
    /**
     * MoveToPosition moves a gantry of the underlying robot to the requested position.
     *
     * @generated from rpc viam.component.gantry.v1.GantryService.MoveToPosition
     */
    moveToPosition: {
      name: "MoveToPosition",
      I: Wt,
      O: um,
      kind: m.Unary
    },
    /**
     * Home runs the homing sequence of a gantry and returns true once it's completed.
     *
     * @generated from rpc viam.component.gantry.v1.GantryService.Home
     */
    home: {
      name: "Home",
      I: jt,
      O: gm,
      kind: m.Unary
    },
    /**
     * GetLengths gets the lengths of a gantry of the underlying robot.
     *
     * @generated from rpc viam.component.gantry.v1.GantryService.GetLengths
     */
    getLengths: {
      name: "GetLengths",
      I: Ht,
      O: Tm,
      kind: m.Unary
    },
    /**
     * Stop stops a robot's gantry
     *
     * @generated from rpc viam.component.gantry.v1.GantryService.Stop
     */
    stop: {
      name: "Stop",
      I: Kt,
      O: km,
      kind: m.Unary
    },
    /**
     * IsMoving reports if a component is in motion
     *
     * @generated from rpc viam.component.gantry.v1.GantryService.IsMoving
     */
    isMoving: {
      name: "IsMoving",
      I: Xt,
      O: ym,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.gantry.v1.GantryService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.gantry.v1.GantryService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    }
  }
}, Qt = {
  typeName: "viam.component.generic.v1.GenericService",
  methods: {
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.generic.v1.GenericService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.generic.v1.GenericService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    }
  }
}, L_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GenericService: Qt
}, Symbol.toStringTag, { value: "Module" })), Zt = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gripper.v1.OpenRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), hm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gripper.v1.OpenResponse",
  []
), es = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gripper.v1.GrabRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), fm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gripper.v1.GrabResponse",
  () => [
    {
      no: 1,
      name: "success",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), ns = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gripper.v1.StopRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Rm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gripper.v1.StopResponse",
  []
), as = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gripper.v1.IsMovingRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), _m = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gripper.v1.IsMovingResponse",
  () => [
    {
      no: 1,
      name: "is_moving",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Sm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gripper.v1.IsHoldingSomethingRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Im = /* @__PURE__ */ s.makeMessageType(
  "viam.component.gripper.v1.IsHoldingSomethingResponse",
  () => [
    {
      no: 1,
      name: "is_holding_something",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 99, name: "meta", kind: "message", T: l }
  ]
), G_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GrabRequest: es,
  GrabResponse: fm,
  IsHoldingSomethingRequest: Sm,
  IsHoldingSomethingResponse: Im,
  IsMovingRequest: as,
  IsMovingResponse: _m,
  OpenRequest: Zt,
  OpenResponse: hm,
  StopRequest: ns,
  StopResponse: Rm
}, Symbol.toStringTag, { value: "Module" })), bm = {
  typeName: "viam.component.gripper.v1.GripperService",
  methods: {
    /**
     * Open opens a gripper of the underlying robot.
     *
     * @generated from rpc viam.component.gripper.v1.GripperService.Open
     */
    open: {
      name: "Open",
      I: Zt,
      O: hm,
      kind: m.Unary
    },
    /**
     * Grab requests a gripper of the underlying robot to grab.
     *
     * @generated from rpc viam.component.gripper.v1.GripperService.Grab
     */
    grab: {
      name: "Grab",
      I: es,
      O: fm,
      kind: m.Unary
    },
    /**
     * Stop stops a robot's gripper
     *
     * @generated from rpc viam.component.gripper.v1.GripperService.Stop
     */
    stop: {
      name: "Stop",
      I: ns,
      O: Rm,
      kind: m.Unary
    },
    /**
     * IsMoving reports if a component is in motion
     *
     * @generated from rpc viam.component.gripper.v1.GripperService.IsMoving
     */
    isMoving: {
      name: "IsMoving",
      I: as,
      O: _m,
      kind: m.Unary
    },
    /**
     * IsHoldingSomething returns whether the gripper is currently holding onto an object
     *
     * @generated from rpc viam.component.gripper.v1.GripperService.IsHoldingSomething
     */
    isHoldingSomething: {
      name: "IsHoldingSomething",
      I: Sm,
      O: Im,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.gripper.v1.GripperService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.gripper.v1.GripperService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    },
    /**
     * GetKinematics returns the kinematics file for the component
     *
     * @generated from rpc viam.component.gripper.v1.GripperService.GetKinematics
     */
    getKinematics: {
      name: "GetKinematics",
      I: kt,
      O: yt,
      kind: m.Unary
    }
  }
}, Mm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.inputcontroller.v1.GetControlsRequest",
  () => [
    {
      no: 1,
      name: "controller",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Em = /* @__PURE__ */ s.makeMessageType(
  "viam.component.inputcontroller.v1.GetControlsResponse",
  () => [
    { no: 1, name: "controls", kind: "scalar", T: 9, repeated: !0 }
  ]
), ts = /* @__PURE__ */ s.makeMessageType(
  "viam.component.inputcontroller.v1.GetEventsRequest",
  () => [
    {
      no: 1,
      name: "controller",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), wm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.inputcontroller.v1.GetEventsResponse",
  () => [
    { no: 1, name: "events", kind: "message", T: An, repeated: !0 }
  ]
), ss = /* @__PURE__ */ s.makeMessageType(
  "viam.component.inputcontroller.v1.TriggerEventRequest",
  () => [
    {
      no: 1,
      name: "controller",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "event", kind: "message", T: An },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Om = /* @__PURE__ */ s.makeMessageType(
  "viam.component.inputcontroller.v1.TriggerEventResponse",
  []
), An = /* @__PURE__ */ s.makeMessageType(
  "viam.component.inputcontroller.v1.Event",
  () => [
    { no: 1, name: "time", kind: "message", T: _ },
    {
      no: 2,
      name: "event",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "control",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "value",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), Cm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.inputcontroller.v1.StreamEventsRequest",
  () => [
    {
      no: 1,
      name: "controller",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "events", kind: "message", T: Nm, repeated: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Nm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.inputcontroller.v1.StreamEventsRequest.Events",
  () => [
    {
      no: 1,
      name: "control",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "events", kind: "scalar", T: 9, repeated: !0 },
    { no: 3, name: "cancelled_events", kind: "scalar", T: 9, repeated: !0 }
  ],
  { localName: "StreamEventsRequest_Events" }
), Pm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.inputcontroller.v1.StreamEventsResponse",
  () => [
    { no: 1, name: "event", kind: "message", T: An }
  ]
), OR = /* @__PURE__ */ s.makeMessageType(
  "viam.component.inputcontroller.v1.Status",
  () => [
    { no: 1, name: "events", kind: "message", T: An, repeated: !0 }
  ]
), CR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Event: An,
  GetControlsRequest: Mm,
  GetControlsResponse: Em,
  GetEventsRequest: ts,
  GetEventsResponse: wm,
  Status: OR,
  StreamEventsRequest: Cm,
  StreamEventsRequest_Events: Nm,
  StreamEventsResponse: Pm,
  TriggerEventRequest: ss,
  TriggerEventResponse: Om
}, Symbol.toStringTag, { value: "Module" })), Dm = {
  typeName: "viam.component.inputcontroller.v1.InputControllerService",
  methods: {
    /**
     * GetControls returns a list of GetControls provided by the Controller
     *
     * @generated from rpc viam.component.inputcontroller.v1.InputControllerService.GetControls
     */
    getControls: {
      name: "GetControls",
      I: Mm,
      O: Em,
      kind: m.Unary
    },
    /**
     * GetEvents returns a list of events representing the last event on each control of a give Input Controller
     *
     * @generated from rpc viam.component.inputcontroller.v1.InputControllerService.GetEvents
     */
    getEvents: {
      name: "GetEvents",
      I: ts,
      O: wm,
      kind: m.Unary
    },
    /**
     * StreamEvents starts a stream of InputControllerEvents for the given controls (buttons/axes) on a robot's input controller
     *
     * @generated from rpc viam.component.inputcontroller.v1.InputControllerService.StreamEvents
     */
    streamEvents: {
      name: "StreamEvents",
      I: Cm,
      O: Pm,
      kind: m.ServerStreaming
    },
    /**
     * TriggerEvent, where supported, injects an InputControllerEvent into an input controller to (virtually) generate events
     * like button presses or axis movements
     *
     * @generated from rpc viam.component.inputcontroller.v1.InputControllerService.TriggerEvent
     */
    triggerEvent: {
      name: "TriggerEvent",
      I: ss,
      O: Om,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.inputcontroller.v1.InputControllerService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.inputcontroller.v1.InputControllerService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    }
  }
}, os = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.SetPowerRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "power_pct",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Am = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.SetPowerResponse",
  []
), is = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.GoForRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "rpm",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "revolutions",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), qm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.GoForResponse",
  []
), rs = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.GoToRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "rpm",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "position_revolutions",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Um = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.GoToResponse",
  []
), ms = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.SetRPMRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "rpm",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Lm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.SetRPMResponse",
  []
), cs = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.ResetZeroPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "offset",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Gm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.ResetZeroPositionResponse",
  []
), ls = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.GetPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Bm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.GetPositionResponse",
  () => [
    {
      no: 1,
      name: "position",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), ds = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.StopRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), xm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.StopResponse",
  []
), ps = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.IsPoweredRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Fm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.IsPoweredResponse",
  () => [
    {
      no: 1,
      name: "is_on",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 2,
      name: "power_pct",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), us = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.GetPropertiesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Jm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.GetPropertiesResponse",
  () => [
    {
      no: 1,
      name: "position_reporting",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), NR = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.Status",
  () => [
    {
      no: 1,
      name: "is_powered",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 3,
      name: "position",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "is_moving",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), gs = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.IsMovingRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), zm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.motor.v1.IsMovingResponse",
  () => [
    {
      no: 1,
      name: "is_moving",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), B_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetPositionRequest: ls,
  GetPositionResponse: Bm,
  GetPropertiesRequest: us,
  GetPropertiesResponse: Jm,
  GoForRequest: is,
  GoForResponse: qm,
  GoToRequest: rs,
  GoToResponse: Um,
  IsMovingRequest: gs,
  IsMovingResponse: zm,
  IsPoweredRequest: ps,
  IsPoweredResponse: Fm,
  ResetZeroPositionRequest: cs,
  ResetZeroPositionResponse: Gm,
  SetPowerRequest: os,
  SetPowerResponse: Am,
  SetRPMRequest: ms,
  SetRPMResponse: Lm,
  Status: NR,
  StopRequest: ds,
  StopResponse: xm
}, Symbol.toStringTag, { value: "Module" })), Ym = {
  typeName: "viam.component.motor.v1.MotorService",
  methods: {
    /**
     * SetPower sets the percentage of the motor's total power that should be employed
     * expressed a value between -1 and 1 where negative values indicate a backwards
     * direction and positive values a forward direction
     *
     * @generated from rpc viam.component.motor.v1.MotorService.SetPower
     */
    setPower: {
      name: "SetPower",
      I: os,
      O: Am,
      kind: m.Unary
    },
    /**
     * GoFor instructs the motor to turn at a specified speed, which is expressed in RPM,
     * for a specified number of rotations relative to its starting position
     * This method will return an error if position reporting is not supported
     * If revolutions != 0, this will block until the number of revolutions has been completed or another operation comes in.
     * Deprecated: If revolutions is 0, this will run the motor at rpm indefinitely.
     *
     * @generated from rpc viam.component.motor.v1.MotorService.GoFor
     */
    goFor: {
      name: "GoFor",
      I: is,
      O: qm,
      kind: m.Unary
    },
    /**
     * GoTo requests the robot's motor to move to a specific position that
     * is relative to its home position at a specified speed which is expressed in RPM
     * This method will return an error if position reporting is not supported
     *
     * @generated from rpc viam.component.motor.v1.MotorService.GoTo
     */
    goTo: {
      name: "GoTo",
      I: rs,
      O: Um,
      kind: m.Unary
    },
    /**
     * SetRPM instructs the motor to move at the specified RPM indefinitely.
     *
     * @generated from rpc viam.component.motor.v1.MotorService.SetRPM
     */
    setRPM: {
      name: "SetRPM",
      I: ms,
      O: Lm,
      kind: m.Unary
    },
    /**
     * ResetZeroPosition sets the current position of the motor as the new zero position
     * This method will return an error if position reporting is not supported
     *
     * @generated from rpc viam.component.motor.v1.MotorService.ResetZeroPosition
     */
    resetZeroPosition: {
      name: "ResetZeroPosition",
      I: cs,
      O: Gm,
      kind: m.Unary
    },
    /**
     * Position reports the position of the robot's motor relative to its zero position
     * This method will return an error if position reporting is not supported
     *
     * @generated from rpc viam.component.motor.v1.MotorService.GetPosition
     */
    getPosition: {
      name: "GetPosition",
      I: ls,
      O: Bm,
      kind: m.Unary
    },
    /**
     * GetProperties returns a message of booleans indicating which optional features the robot's motor supports
     *
     * @generated from rpc viam.component.motor.v1.MotorService.GetProperties
     */
    getProperties: {
      name: "GetProperties",
      I: us,
      O: Jm,
      kind: m.Unary
    },
    /**
     * Stop turns the robot's motor off
     *
     * @generated from rpc viam.component.motor.v1.MotorService.Stop
     */
    stop: {
      name: "Stop",
      I: ds,
      O: xm,
      kind: m.Unary
    },
    /**
     * IsPowered returns true if the robot's motor is on
     *
     * @generated from rpc viam.component.motor.v1.MotorService.IsPowered
     */
    isPowered: {
      name: "IsPowered",
      I: ps,
      O: Fm,
      kind: m.Unary
    },
    /**
     * IsMoving reports if a component is in motion
     *
     * @generated from rpc viam.component.motor.v1.MotorService.IsMoving
     */
    isMoving: {
      name: "IsMoving",
      I: gs,
      O: zm,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.motor.v1.MotorService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.motor.v1.MotorService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    }
  }
}, Ts = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetLinearVelocityRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), $m = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetLinearVelocityResponse",
  () => [
    { no: 1, name: "linear_velocity", kind: "message", T: qe }
  ]
), ks = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetAngularVelocityRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Vm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetAngularVelocityResponse",
  () => [
    { no: 1, name: "angular_velocity", kind: "message", T: qe }
  ]
), ys = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetCompassHeadingRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Wm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetCompassHeadingResponse",
  () => [
    {
      no: 1,
      name: "value",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), vs = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetOrientationRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), jm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetOrientationResponse",
  () => [
    { no: 1, name: "orientation", kind: "message", T: Rr }
  ]
), hs = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Hm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetPositionResponse",
  () => [
    { no: 1, name: "coordinate", kind: "message", T: ze },
    {
      no: 2,
      name: "altitude_m",
      kind: "scalar",
      T: 2
      /* ScalarType.FLOAT */
    }
  ]
), fs = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetPropertiesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Km = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetPropertiesResponse",
  () => [
    {
      no: 1,
      name: "linear_velocity_supported",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 2,
      name: "angular_velocity_supported",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 3,
      name: "orientation_supported",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 4,
      name: "position_supported",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 5,
      name: "compass_heading_supported",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 6,
      name: "linear_acceleration_supported",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Rs = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetAccuracyRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Xm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetAccuracyResponse",
  () => [
    { no: 1, name: "accuracy", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 2
      /* ScalarType.FLOAT */
    } },
    { no: 2, name: "position_hdop", kind: "scalar", T: 2, opt: !0 },
    { no: 3, name: "position_vdop", kind: "scalar", T: 2, opt: !0 },
    { no: 4, name: "position_nmea_gga_fix", kind: "scalar", T: 5, opt: !0 },
    { no: 5, name: "compass_degrees_error", kind: "scalar", T: 2, opt: !0 }
  ]
), _s = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetLinearAccelerationRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Qm = /* @__PURE__ */ s.makeMessageType(
  "viam.component.movementsensor.v1.GetLinearAccelerationResponse",
  () => [
    { no: 1, name: "linear_acceleration", kind: "message", T: qe }
  ]
), PR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetAccuracyRequest: Rs,
  GetAccuracyResponse: Xm,
  GetAngularVelocityRequest: ks,
  GetAngularVelocityResponse: Vm,
  GetCompassHeadingRequest: ys,
  GetCompassHeadingResponse: Wm,
  GetLinearAccelerationRequest: _s,
  GetLinearAccelerationResponse: Qm,
  GetLinearVelocityRequest: Ts,
  GetLinearVelocityResponse: $m,
  GetOrientationRequest: vs,
  GetOrientationResponse: jm,
  GetPositionRequest: hs,
  GetPositionResponse: Hm,
  GetPropertiesRequest: fs,
  GetPropertiesResponse: Km
}, Symbol.toStringTag, { value: "Module" })), Zm = {
  typeName: "viam.component.movementsensor.v1.MovementSensorService",
  methods: {
    /**
     * @generated from rpc viam.component.movementsensor.v1.MovementSensorService.GetLinearVelocity
     */
    getLinearVelocity: {
      name: "GetLinearVelocity",
      I: Ts,
      O: $m,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.component.movementsensor.v1.MovementSensorService.GetAngularVelocity
     */
    getAngularVelocity: {
      name: "GetAngularVelocity",
      I: ks,
      O: Vm,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.component.movementsensor.v1.MovementSensorService.GetCompassHeading
     */
    getCompassHeading: {
      name: "GetCompassHeading",
      I: ys,
      O: Wm,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.component.movementsensor.v1.MovementSensorService.GetOrientation
     */
    getOrientation: {
      name: "GetOrientation",
      I: vs,
      O: jm,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.component.movementsensor.v1.MovementSensorService.GetPosition
     */
    getPosition: {
      name: "GetPosition",
      I: hs,
      O: Hm,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.component.movementsensor.v1.MovementSensorService.GetProperties
     */
    getProperties: {
      name: "GetProperties",
      I: fs,
      O: Km,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.component.movementsensor.v1.MovementSensorService.GetAccuracy
     */
    getAccuracy: {
      name: "GetAccuracy",
      I: Rs,
      O: Xm,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.component.movementsensor.v1.MovementSensorService.GetLinearAcceleration
     */
    getLinearAcceleration: {
      name: "GetLinearAcceleration",
      I: _s,
      O: Qm,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.component.movementsensor.v1.MovementSensorService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.movementsensor.v1.MovementSensorService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    },
    /**
     * GetReadings returns the readings of a sensor of the underlying robot.
     *
     * @generated from rpc viam.component.movementsensor.v1.MovementSensorService.GetReadings
     */
    getReadings: {
      name: "GetReadings",
      I: Ze,
      O: ha,
      kind: m.Unary
    }
  }
}, Ss = /* @__PURE__ */ s.makeMessageType(
  "viam.component.powersensor.v1.GetVoltageRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), ec = /* @__PURE__ */ s.makeMessageType(
  "viam.component.powersensor.v1.GetVoltageResponse",
  () => [
    {
      no: 1,
      name: "volts",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "is_ac",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Is = /* @__PURE__ */ s.makeMessageType(
  "viam.component.powersensor.v1.GetCurrentRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), nc = /* @__PURE__ */ s.makeMessageType(
  "viam.component.powersensor.v1.GetCurrentResponse",
  () => [
    {
      no: 1,
      name: "amperes",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "is_ac",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), bs = /* @__PURE__ */ s.makeMessageType(
  "viam.component.powersensor.v1.GetPowerRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), ac = /* @__PURE__ */ s.makeMessageType(
  "viam.component.powersensor.v1.GetPowerResponse",
  () => [
    {
      no: 1,
      name: "watts",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), x_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetCurrentRequest: Is,
  GetCurrentResponse: nc,
  GetPowerRequest: bs,
  GetPowerResponse: ac,
  GetVoltageRequest: Ss,
  GetVoltageResponse: ec
}, Symbol.toStringTag, { value: "Module" })), tc = {
  typeName: "viam.component.powersensor.v1.PowerSensorService",
  methods: {
    /**
     * GetVoltage returns the voltage reading of a power sensor in volts
     *
     * @generated from rpc viam.component.powersensor.v1.PowerSensorService.GetVoltage
     */
    getVoltage: {
      name: "GetVoltage",
      I: Ss,
      O: ec,
      kind: m.Unary
    },
    /**
     * GetCurrent returns the current reading of a power sensor in amperes
     *
     * @generated from rpc viam.component.powersensor.v1.PowerSensorService.GetCurrent
     */
    getCurrent: {
      name: "GetCurrent",
      I: Is,
      O: nc,
      kind: m.Unary
    },
    /**
     * GetPower returns the power reading of a power sensor in watts
     *
     * @generated from rpc viam.component.powersensor.v1.PowerSensorService.GetPower
     */
    getPower: {
      name: "GetPower",
      I: bs,
      O: ac,
      kind: m.Unary
    },
    /**
     * GetReadings returns the readings of a sensor of the underlying robot.
     *
     * @generated from rpc viam.component.powersensor.v1.PowerSensorService.GetReadings
     */
    getReadings: {
      name: "GetReadings",
      I: Ze,
      O: ha,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.powersensor.v1.PowerSensorService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    }
  }
}, Ms = /* @__PURE__ */ s.makeMessageType(
  "viam.component.servo.v1.MoveRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "angle_deg",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), sc = /* @__PURE__ */ s.makeMessageType(
  "viam.component.servo.v1.MoveResponse",
  []
), Es = /* @__PURE__ */ s.makeMessageType(
  "viam.component.servo.v1.GetPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), oc = /* @__PURE__ */ s.makeMessageType(
  "viam.component.servo.v1.GetPositionResponse",
  () => [
    {
      no: 1,
      name: "position_deg",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    }
  ]
), ws = /* @__PURE__ */ s.makeMessageType(
  "viam.component.servo.v1.StopRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), ic = /* @__PURE__ */ s.makeMessageType(
  "viam.component.servo.v1.StopResponse",
  []
), DR = /* @__PURE__ */ s.makeMessageType(
  "viam.component.servo.v1.Status",
  () => [
    {
      no: 1,
      name: "position_deg",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    {
      no: 2,
      name: "is_moving",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Os = /* @__PURE__ */ s.makeMessageType(
  "viam.component.servo.v1.IsMovingRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), rc = /* @__PURE__ */ s.makeMessageType(
  "viam.component.servo.v1.IsMovingResponse",
  () => [
    {
      no: 1,
      name: "is_moving",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), F_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetPositionRequest: Es,
  GetPositionResponse: oc,
  IsMovingRequest: Os,
  IsMovingResponse: rc,
  MoveRequest: Ms,
  MoveResponse: sc,
  Status: DR,
  StopRequest: ws,
  StopResponse: ic
}, Symbol.toStringTag, { value: "Module" })), mc = {
  typeName: "viam.component.servo.v1.ServoService",
  methods: {
    /**
     * Move requests the servo of the underlying robot to move.
     * This will block until done or a new operation cancels this one
     *
     * @generated from rpc viam.component.servo.v1.ServoService.Move
     */
    move: {
      name: "Move",
      I: Ms,
      O: sc,
      kind: m.Unary
    },
    /**
     * GetPosition returns the current set angle (degrees) of the servo of the underlying robot.
     *
     * @generated from rpc viam.component.servo.v1.ServoService.GetPosition
     */
    getPosition: {
      name: "GetPosition",
      I: Es,
      O: oc,
      kind: m.Unary
    },
    /**
     * Stop stops a robot's servo
     *
     * @generated from rpc viam.component.servo.v1.ServoService.Stop
     */
    stop: {
      name: "Stop",
      I: ws,
      O: ic,
      kind: m.Unary
    },
    /**
     * IsMoving reports if a component is in motion
     *
     * @generated from rpc viam.component.servo.v1.ServoService.IsMoving
     */
    isMoving: {
      name: "IsMoving",
      I: Os,
      O: rc,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.servo.v1.ServoService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.servo.v1.ServoService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    }
  }
}, cc = /* @__PURE__ */ s.makeEnum(
  "viam.robot.v1.PeerConnectionType",
  [
    { no: 0, name: "PEER_CONNECTION_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "PEER_CONNECTION_TYPE_GRPC", localName: "GRPC" },
    { no: 2, name: "PEER_CONNECTION_TYPE_WEBRTC", localName: "WEBRTC" }
  ]
), lc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.TunnelRequest",
  () => [
    {
      no: 1,
      name: "destination_port",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    {
      no: 2,
      name: "data",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), dc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.TunnelResponse",
  () => [
    {
      no: 1,
      name: "data",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), pc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ListTunnelsRequest",
  []
), uc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ListTunnelsResponse",
  () => [
    { no: 1, name: "tunnels", kind: "message", T: gc, repeated: !0 }
  ]
), gc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.Tunnel",
  () => [
    {
      no: 1,
      name: "port",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    { no: 2, name: "connection_timeout", kind: "message", T: F }
  ]
), Tc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.FrameSystemConfig",
  () => [
    { no: 1, name: "frame", kind: "message", T: Qe },
    { no: 2, name: "kinematics", kind: "message", T: l }
  ]
), kc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.FrameSystemConfigRequest",
  () => [
    { no: 1, name: "supplemental_transforms", kind: "message", T: Qe, repeated: !0 }
  ]
), yc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.FrameSystemConfigResponse",
  () => [
    { no: 1, name: "frame_system_configs", kind: "message", T: Tc, repeated: !0 }
  ]
), Cs = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.TransformPoseRequest",
  () => [
    { no: 1, name: "source", kind: "message", T: Ke },
    {
      no: 2,
      name: "destination",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "supplemental_transforms", kind: "message", T: Qe, repeated: !0 }
  ]
), vc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.TransformPoseResponse",
  () => [
    { no: 1, name: "pose", kind: "message", T: Ke }
  ]
), Ns = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.TransformPCDRequest",
  () => [
    {
      no: 1,
      name: "point_cloud_pcd",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    },
    {
      no: 2,
      name: "source",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "destination",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), hc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.TransformPCDResponse",
  () => [
    {
      no: 1,
      name: "point_cloud_pcd",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), fc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ResourceNamesRequest",
  []
), Rc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ResourceNamesResponse",
  () => [
    { no: 1, name: "resources", kind: "message", T: x, repeated: !0 }
  ]
), _c = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ResourceRPCSubtype",
  () => [
    { no: 1, name: "subtype", kind: "message", T: x },
    {
      no: 2,
      name: "proto_service",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Sc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ResourceRPCSubtypesRequest",
  []
), Ic = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ResourceRPCSubtypesResponse",
  () => [
    { no: 1, name: "resource_rpc_subtypes", kind: "message", T: _c, repeated: !0 }
  ]
), bc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.Operation",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "method",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "arguments", kind: "message", T: l },
    { no: 4, name: "started", kind: "message", T: _ },
    { no: 5, name: "session_id", kind: "scalar", T: 9, opt: !0 }
  ]
), Mc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetOperationsRequest",
  []
), Ec = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetOperationsResponse",
  () => [
    { no: 1, name: "operations", kind: "message", T: bc, repeated: !0 }
  ]
), wc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.CancelOperationRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Oc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.CancelOperationResponse",
  []
), Cc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.BlockForOperationRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Nc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.BlockForOperationResponse",
  []
), Pc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.PeerConnectionInfo",
  () => [
    { no: 1, name: "type", kind: "enum", T: s.getEnumType(cc) },
    { no: 2, name: "remote_address", kind: "scalar", T: 9, opt: !0 },
    { no: 3, name: "local_address", kind: "scalar", T: 9, opt: !0 }
  ]
), Dc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.Session",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "peer_connection_info", kind: "message", T: Pc, opt: !0 }
  ]
), Ac = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetSessionsRequest",
  []
), qc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetSessionsResponse",
  () => [
    { no: 1, name: "sessions", kind: "message", T: Dc, repeated: !0 }
  ]
), Uc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ModuleModel",
  () => [
    {
      no: 1,
      name: "module_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "model",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "api",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "from_local_module",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Ps = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetModelsFromModulesRequest",
  []
), Lc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetModelsFromModulesResponse",
  () => [
    { no: 1, name: "models", kind: "message", T: Uc, repeated: !0 }
  ]
), Ds = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.Status",
  () => [
    { no: 1, name: "name", kind: "message", T: x },
    { no: 2, name: "status", kind: "message", T: l },
    { no: 3, name: "last_reconfigured", kind: "message", T: _ }
  ]
), Gc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetStatusRequest",
  () => [
    { no: 1, name: "resource_names", kind: "message", T: x, repeated: !0 }
  ]
), Bc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetStatusResponse",
  () => [
    { no: 1, name: "status", kind: "message", T: Ds, repeated: !0 }
  ]
), xc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.StreamStatusRequest",
  () => [
    { no: 1, name: "resource_names", kind: "message", T: x, repeated: !0 },
    { no: 2, name: "every", kind: "message", T: F }
  ]
), Fc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.StreamStatusResponse",
  () => [
    { no: 1, name: "status", kind: "message", T: Ds, repeated: !0 }
  ]
), Jc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.StopExtraParameters",
  () => [
    { no: 1, name: "name", kind: "message", T: x },
    { no: 2, name: "params", kind: "message", T: l }
  ]
), zc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.StopAllRequest",
  () => [
    { no: 99, name: "extra", kind: "message", T: Jc, repeated: !0 }
  ]
), Yc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.StopAllResponse",
  []
), As = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.StartSessionRequest",
  () => [
    {
      no: 1,
      name: "resume",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), $c = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.StartSessionResponse",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "heartbeat_window", kind: "message", T: F }
  ]
), qs = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.SendSessionHeartbeatRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Vc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.SendSessionHeartbeatResponse",
  []
), Wc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.LogRequest",
  () => [
    { no: 1, name: "logs", kind: "message", T: Pn, repeated: !0 }
  ]
), jc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.LogResponse",
  []
), Hc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetCloudMetadataRequest",
  []
), Us = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetCloudMetadataResponse",
  () => [
    {
      no: 1,
      name: "robot_part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "primary_org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "machine_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "machine_part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ls = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.RestartModuleRequest",
  () => [
    { no: 1, name: "module_id", kind: "scalar", T: 9, oneof: "id_or_name" },
    { no: 2, name: "module_name", kind: "scalar", T: 9, oneof: "id_or_name" }
  ]
), Kc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.RestartModuleResponse",
  []
), Xc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ShutdownRequest",
  []
), Qc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ShutdownResponse",
  []
), Zc = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetMachineStatusRequest",
  []
), el = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetMachineStatusResponse",
  () => [
    { no: 1, name: "resources", kind: "message", T: al, repeated: !0 },
    { no: 2, name: "config", kind: "message", T: sl },
    { no: 3, name: "state", kind: "enum", T: s.getEnumType(nl) }
  ]
), nl = /* @__PURE__ */ s.makeEnum(
  "viam.robot.v1.GetMachineStatusResponse.State",
  [
    { no: 0, name: "STATE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "STATE_INITIALIZING", localName: "INITIALIZING" },
    { no: 2, name: "STATE_RUNNING", localName: "RUNNING" }
  ]
), al = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ResourceStatus",
  () => [
    { no: 1, name: "name", kind: "message", T: x },
    { no: 2, name: "state", kind: "enum", T: s.getEnumType(tl) },
    { no: 3, name: "last_updated", kind: "message", T: _ },
    {
      no: 4,
      name: "revision",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "error",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 6, name: "cloud_metadata", kind: "message", T: Us, opt: !0 }
  ]
), tl = /* @__PURE__ */ s.makeEnum(
  "viam.robot.v1.ResourceStatus.State",
  [
    { no: 0, name: "STATE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "STATE_UNCONFIGURED", localName: "UNCONFIGURED" },
    { no: 2, name: "STATE_CONFIGURING", localName: "CONFIGURING" },
    { no: 3, name: "STATE_READY", localName: "READY" },
    { no: 4, name: "STATE_REMOVING", localName: "REMOVING" },
    { no: 5, name: "STATE_UNHEALTHY", localName: "UNHEALTHY" }
  ]
), sl = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.ConfigStatus",
  () => [
    {
      no: 1,
      name: "revision",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "last_updated", kind: "message", T: _ }
  ]
), ol = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetVersionRequest",
  []
), il = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetVersionResponse",
  () => [
    {
      no: 1,
      name: "platform",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "api_version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), rl = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetPoseRequest",
  () => [
    {
      no: 1,
      name: "component_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "destination_frame",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "supplemental_transforms", kind: "message", T: Qe, repeated: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), ml = /* @__PURE__ */ s.makeMessageType(
  "viam.robot.v1.GetPoseResponse",
  () => [
    { no: 1, name: "pose", kind: "message", T: Ke }
  ]
), J_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BlockForOperationRequest: Cc,
  BlockForOperationResponse: Nc,
  CancelOperationRequest: wc,
  CancelOperationResponse: Oc,
  ConfigStatus: sl,
  FrameSystemConfig: Tc,
  FrameSystemConfigRequest: kc,
  FrameSystemConfigResponse: yc,
  GetCloudMetadataRequest: Hc,
  GetCloudMetadataResponse: Us,
  GetMachineStatusRequest: Zc,
  GetMachineStatusResponse: el,
  GetMachineStatusResponse_State: nl,
  GetModelsFromModulesRequest: Ps,
  GetModelsFromModulesResponse: Lc,
  GetOperationsRequest: Mc,
  GetOperationsResponse: Ec,
  GetPoseRequest: rl,
  GetPoseResponse: ml,
  GetSessionsRequest: Ac,
  GetSessionsResponse: qc,
  GetStatusRequest: Gc,
  GetStatusResponse: Bc,
  GetVersionRequest: ol,
  GetVersionResponse: il,
  ListTunnelsRequest: pc,
  ListTunnelsResponse: uc,
  LogRequest: Wc,
  LogResponse: jc,
  ModuleModel: Uc,
  Operation: bc,
  PeerConnectionInfo: Pc,
  PeerConnectionType: cc,
  ResourceNamesRequest: fc,
  ResourceNamesResponse: Rc,
  ResourceRPCSubtype: _c,
  ResourceRPCSubtypesRequest: Sc,
  ResourceRPCSubtypesResponse: Ic,
  ResourceStatus: al,
  ResourceStatus_State: tl,
  RestartModuleRequest: Ls,
  RestartModuleResponse: Kc,
  SendSessionHeartbeatRequest: qs,
  SendSessionHeartbeatResponse: Vc,
  Session: Dc,
  ShutdownRequest: Xc,
  ShutdownResponse: Qc,
  StartSessionRequest: As,
  StartSessionResponse: $c,
  Status: Ds,
  StopAllRequest: zc,
  StopAllResponse: Yc,
  StopExtraParameters: Jc,
  StreamStatusRequest: xc,
  StreamStatusResponse: Fc,
  TransformPCDRequest: Ns,
  TransformPCDResponse: hc,
  TransformPoseRequest: Cs,
  TransformPoseResponse: vc,
  Tunnel: gc,
  TunnelRequest: lc,
  TunnelResponse: dc
}, Symbol.toStringTag, { value: "Module" })), Gs = {
  typeName: "viam.robot.v1.RobotService",
  methods: {
    /**
     * @generated from rpc viam.robot.v1.RobotService.GetOperations
     */
    getOperations: {
      name: "GetOperations",
      I: Mc,
      O: Ec,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.robot.v1.RobotService.GetSessions
     */
    getSessions: {
      name: "GetSessions",
      I: Ac,
      O: qc,
      kind: m.Unary
    },
    /**
     * ResourceNames returns the list of all resources.
     *
     * @generated from rpc viam.robot.v1.RobotService.ResourceNames
     */
    resourceNames: {
      name: "ResourceNames",
      I: fc,
      O: Rc,
      kind: m.Unary
    },
    /**
     * ResourceRPCSubtypes returns the list of all resource types.
     *
     * @generated from rpc viam.robot.v1.RobotService.ResourceRPCSubtypes
     */
    resourceRPCSubtypes: {
      name: "ResourceRPCSubtypes",
      I: Sc,
      O: Ic,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.robot.v1.RobotService.CancelOperation
     */
    cancelOperation: {
      name: "CancelOperation",
      I: wc,
      O: Oc,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.robot.v1.RobotService.BlockForOperation
     */
    blockForOperation: {
      name: "BlockForOperation",
      I: Cc,
      O: Nc,
      kind: m.Unary
    },
    /**
     * GetModelsFromModules returns the list of models supported in modules on the machine.
     *
     * @generated from rpc viam.robot.v1.RobotService.GetModelsFromModules
     */
    getModelsFromModules: {
      name: "GetModelsFromModules",
      I: Ps,
      O: Lc,
      kind: m.Unary
    },
    /**
     * GetStatus returns the list of all statuses requested. An empty request signifies all resources.
     *
     * @generated from rpc viam.robot.v1.RobotService.GetStatus
     * @deprecated
     */
    getStatus: {
      name: "GetStatus",
      I: Gc,
      O: Bc,
      kind: m.Unary
    },
    /**
     * StreamStatus periodically sends the status of all statuses requested. An empty request signifies all resources.
     *
     * @generated from rpc viam.robot.v1.RobotService.StreamStatus
     * @deprecated
     */
    streamStatus: {
      name: "StreamStatus",
      I: xc,
      O: Fc,
      kind: m.ServerStreaming
    },
    /**
     * StopAll will stop all current and outstanding operations for the robot and stops all actuators and movement
     *
     * @generated from rpc viam.robot.v1.RobotService.StopAll
     */
    stopAll: {
      name: "StopAll",
      I: zc,
      O: Yc,
      kind: m.Unary
    },
    /**
     * StartSession creates a new session that expects at least one heartbeat within the returned window.
     * If the window lapses, any resources that have safety heart monitored methods, where this session was
     * the last caller on the resource, will be stopped.
     *
     * @generated from rpc viam.robot.v1.RobotService.StartSession
     */
    startSession: {
      name: "StartSession",
      I: As,
      O: $c,
      kind: m.Unary
    },
    /**
     * SendSessionHeartbeat sends a heartbeat to the given session. If the session has expired, a
     * SESSION_EXPIRED error will be returned.
     *
     * @generated from rpc viam.robot.v1.RobotService.SendSessionHeartbeat
     */
    sendSessionHeartbeat: {
      name: "SendSessionHeartbeat",
      I: qs,
      O: Vc,
      kind: m.Unary
    },
    /**
     * Log sends logs to be logged by this robot. Currently used for module logging.
     *
     * @generated from rpc viam.robot.v1.RobotService.Log
     */
    log: {
      name: "Log",
      I: Wc,
      O: jc,
      kind: m.Unary
    },
    /**
     * GetCloudMetadata returns app-related information about the robot.
     *
     * @generated from rpc viam.robot.v1.RobotService.GetCloudMetadata
     */
    getCloudMetadata: {
      name: "GetCloudMetadata",
      I: Hc,
      O: Us,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.robot.v1.RobotService.RestartModule
     */
    restartModule: {
      name: "RestartModule",
      I: Ls,
      O: Kc,
      kind: m.Unary
    },
    /**
     * Shutdown shuts down the robot.
     *
     * @generated from rpc viam.robot.v1.RobotService.Shutdown
     */
    shutdown: {
      name: "Shutdown",
      I: Xc,
      O: Qc,
      kind: m.Unary
    },
    /**
     * GetMachineStatus returns the current status of the robot.
     *
     * @generated from rpc viam.robot.v1.RobotService.GetMachineStatus
     */
    getMachineStatus: {
      name: "GetMachineStatus",
      I: Zc,
      O: el,
      kind: m.Unary
    },
    /**
     * GetVersion returns version information about the robot.
     *
     * @generated from rpc viam.robot.v1.RobotService.GetVersion
     */
    getVersion: {
      name: "GetVersion",
      I: ol,
      O: il,
      kind: m.Unary
    },
    /**
     * Tunnel tunnels traffic to the destination port of the robot server.
     *
     * @generated from rpc viam.robot.v1.RobotService.Tunnel
     */
    tunnel: {
      name: "Tunnel",
      I: lc,
      O: dc,
      kind: m.BiDiStreaming
    },
    /**
     * ListTunnels lists all available tunnels configured on the robot.
     *
     * @generated from rpc viam.robot.v1.RobotService.ListTunnels
     */
    listTunnels: {
      name: "ListTunnels",
      I: pc,
      O: uc,
      kind: m.Unary
    },
    /**
     * FrameSystemConfig returns the information relevant to building the robot's frame system.
     *
     * @generated from rpc viam.robot.v1.RobotService.FrameSystemConfig
     */
    frameSystemConfig: {
      name: "FrameSystemConfig",
      I: kc,
      O: yc,
      kind: m.Unary
    },
    /**
     * GetPose returns the pose of a component in a desired referenceframe.
     *
     * @generated from rpc viam.robot.v1.RobotService.GetPose
     */
    getPose: {
      name: "GetPose",
      I: rl,
      O: ml,
      kind: m.Unary
    },
    /**
     * TransformPose returns a pose in one referenceframe in a desired referenceframe.
     *
     * @generated from rpc viam.robot.v1.RobotService.TransformPose
     */
    transformPose: {
      name: "TransformPose",
      I: Cs,
      O: vc,
      kind: m.Unary
    },
    /**
     * TransformPose returns a point cloud in one referenceframe in a desired referenceframe.
     *
     * @generated from rpc viam.robot.v1.RobotService.TransformPCD
     */
    transformPCD: {
      name: "TransformPCD",
      I: Ns,
      O: hc,
      kind: m.Unary
    }
  }
}, Bs = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.CredentialsType",
  [
    { no: 0, name: "CREDENTIALS_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "CREDENTIALS_TYPE_INTERNAL", localName: "INTERNAL" },
    { no: 2, name: "CREDENTIALS_TYPE_API_KEY", localName: "API_KEY" },
    { no: 3, name: "CREDENTIALS_TYPE_ROBOT_SECRET", localName: "ROBOT_SECRET" },
    { no: 4, name: "CREDENTIALS_TYPE_ROBOT_LOCATION_SECRET", localName: "ROBOT_LOCATION_SECRET" }
  ]
), cl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RobotConfig",
  () => [
    { no: 1, name: "cloud", kind: "message", T: ul },
    { no: 2, name: "remotes", kind: "message", T: Nl, repeated: !0 },
    { no: 3, name: "components", kind: "message", T: xs, repeated: !0 },
    { no: 4, name: "processes", kind: "message", T: gl, repeated: !0 },
    { no: 5, name: "services", kind: "message", T: Tl, repeated: !0 },
    { no: 6, name: "network", kind: "message", T: kl, opt: !0 },
    { no: 7, name: "auth", kind: "message", T: hl, opt: !0 },
    { no: 8, name: "debug", kind: "scalar", T: 8, opt: !0 },
    { no: 9, name: "modules", kind: "message", T: ql, repeated: !0 },
    { no: 10, name: "disable_partial_start", kind: "scalar", T: 8, opt: !0 },
    { no: 11, name: "packages", kind: "message", T: Ul, repeated: !0 },
    { no: 12, name: "overwrite_fragment_status", kind: "message", T: Ra, repeated: !0 },
    {
      no: 13,
      name: "enable_web_profile",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 14, name: "log", kind: "message", T: ll, repeated: !0 },
    {
      no: 15,
      name: "revision",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 16, name: "maintenance", kind: "message", T: Ll, opt: !0 },
    {
      no: 17,
      name: "disable_log_deduplication",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 18, name: "jobs", kind: "message", T: dl, repeated: !0 }
  ]
), ll = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.LogPatternConfig",
  () => [
    {
      no: 1,
      name: "pattern",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "level",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), dl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.JobConfig",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "schedule",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "resource",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "method",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "command", kind: "message", T: l }
  ]
), pl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.LocationSecret",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "secret",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ra = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.AppValidationStatus",
  () => [
    {
      no: 1,
      name: "error",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ul = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CloudConfig",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "fqdn",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "local_fqdn",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "managed_by",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "signaling_address",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 6,
      name: "signaling_insecure",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 7,
      name: "location_secret",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 8,
      name: "secret",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 9, name: "location_secrets", kind: "message", T: pl, repeated: !0 },
    {
      no: 10,
      name: "primary_org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 11,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 12,
      name: "machine_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), xs = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ComponentConfig",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "namespace",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "model",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "frame", kind: "message", T: Fs },
    { no: 6, name: "depends_on", kind: "scalar", T: 9, repeated: !0 },
    { no: 7, name: "service_configs", kind: "message", T: _a, repeated: !0 },
    { no: 8, name: "attributes", kind: "message", T: l },
    {
      no: 9,
      name: "api",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 10, name: "log_configuration", kind: "message", T: Js }
  ]
), _a = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ResourceLevelServiceConfig",
  () => [
    {
      no: 1,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "attributes", kind: "message", T: l }
  ]
), gl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ProcessConfig",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "args", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 4,
      name: "cwd",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "one_shot",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 6,
      name: "log",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 7,
      name: "stop_signal",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    { no: 8, name: "stop_timeout", kind: "message", T: F },
    { no: 9, name: "env", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    } },
    {
      no: 10,
      name: "username",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Tl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ServiceConfig",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "namespace",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "attributes", kind: "message", T: l },
    { no: 5, name: "depends_on", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 6,
      name: "model",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 9,
      name: "api",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 10, name: "service_configs", kind: "message", T: _a, repeated: !0 },
    { no: 11, name: "log_configuration", kind: "message", T: Js }
  ]
), kl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.NetworkConfig",
  () => [
    {
      no: 1,
      name: "fqdn",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "bind_address",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "tls_cert_file",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "tls_key_file",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "sessions", kind: "message", T: yl },
    { no: 6, name: "traffic_tunnel_endpoints", kind: "message", T: vl, repeated: !0 },
    {
      no: 7,
      name: "no_tls",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), yl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.SessionsConfig",
  () => [
    { no: 1, name: "heartbeat_window", kind: "message", T: F }
  ]
), vl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.TrafficTunnelEndpoint",
  () => [
    {
      no: 1,
      name: "port",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    { no: 2, name: "connection_timeout", kind: "message", T: F }
  ]
), hl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.AuthConfig",
  () => [
    { no: 1, name: "handlers", kind: "message", T: _l, repeated: !0 },
    { no: 2, name: "tls_auth_entities", kind: "scalar", T: 9, repeated: !0 },
    { no: 3, name: "external_auth_config", kind: "message", T: Rl, opt: !0 }
  ]
), fl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.JWKSFile",
  () => [
    { no: 1, name: "json", kind: "message", T: l }
  ]
), Rl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ExternalAuthConfig",
  () => [
    { no: 1, name: "jwks", kind: "message", T: fl }
  ]
), _l = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.AuthHandlerConfig",
  () => [
    { no: 1, name: "type", kind: "enum", T: s.getEnumType(Bs) },
    { no: 5, name: "config", kind: "message", T: l }
  ]
), Fs = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Frame",
  () => [
    {
      no: 1,
      name: "parent",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "translation", kind: "message", T: Sl },
    { no: 3, name: "orientation", kind: "message", T: Il },
    { no: 4, name: "geometry", kind: "message", T: Xe }
  ]
), Js = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.LogConfiguration",
  () => [
    {
      no: 1,
      name: "level",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Sl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Translation",
  () => [
    {
      no: 1,
      name: "x",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "y",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "z",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), Il = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Orientation",
  () => [
    { no: 1, name: "no_orientation", kind: "message", T: bl, oneof: "type" },
    { no: 2, name: "vector_radians", kind: "message", T: Ml, oneof: "type" },
    { no: 3, name: "vector_degrees", kind: "message", T: El, oneof: "type" },
    { no: 4, name: "euler_angles", kind: "message", T: wl, oneof: "type" },
    { no: 5, name: "axis_angles", kind: "message", T: Ol, oneof: "type" },
    { no: 6, name: "quaternion", kind: "message", T: Cl, oneof: "type" }
  ]
), bl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Orientation.NoOrientation",
  [],
  { localName: "Orientation_NoOrientation" }
), Ml = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Orientation.OrientationVectorRadians",
  () => [
    {
      no: 1,
      name: "theta",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "x",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "y",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "z",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ],
  { localName: "Orientation_OrientationVectorRadians" }
), El = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Orientation.OrientationVectorDegrees",
  () => [
    {
      no: 1,
      name: "theta",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "x",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "y",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "z",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ],
  { localName: "Orientation_OrientationVectorDegrees" }
), wl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Orientation.EulerAngles",
  () => [
    {
      no: 1,
      name: "roll",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "pitch",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "yaw",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ],
  { localName: "Orientation_EulerAngles" }
), Ol = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Orientation.AxisAngles",
  () => [
    {
      no: 1,
      name: "theta",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "x",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "y",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "z",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ],
  { localName: "Orientation_AxisAngles" }
), Cl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Orientation.Quaternion",
  () => [
    {
      no: 1,
      name: "w",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 2,
      name: "x",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "y",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "z",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ],
  { localName: "Orientation_Quaternion" }
), Nl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RemoteConfig",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "address",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "frame", kind: "message", T: Fs },
    { no: 4, name: "auth", kind: "message", T: Pl },
    {
      no: 5,
      name: "managed_by",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 6,
      name: "insecure",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 7, name: "connection_check_interval", kind: "message", T: F },
    { no: 8, name: "reconnect_interval", kind: "message", T: F },
    { no: 9, name: "service_configs", kind: "message", T: _a, repeated: !0 },
    {
      no: 10,
      name: "secret",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 11,
      name: "prefix",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Pl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RemoteAuth",
  () => [
    { no: 1, name: "credentials", kind: "message", T: Dl },
    {
      no: 2,
      name: "entity",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Dl = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RemoteAuth.Credentials",
  () => [
    { no: 1, name: "type", kind: "enum", T: s.getEnumType(Bs) },
    {
      no: 2,
      name: "payload",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ],
  { localName: "RemoteAuth_Credentials" }
), Al = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.AgentInfo",
  () => [
    {
      no: 1,
      name: "host",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "os",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "ips", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 4,
      name: "version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "git_revision",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 6, name: "platform", kind: "scalar", T: 9, opt: !0 },
    { no: 7, name: "platform_tags", kind: "scalar", T: 9, repeated: !0 }
  ]
), AR = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ConfigRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "agent_info", kind: "message", T: Al, opt: !0 }
  ]
), qR = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ConfigResponse",
  () => [
    { no: 1, name: "config", kind: "message", T: cl }
  ]
), UR = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CertificateRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), LR = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CertificateResponse",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "tls_certificate",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "tls_private_key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), GR = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.LogRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "logs", kind: "message", T: Pn, repeated: !0 }
  ]
), BR = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.LogResponse",
  []
), xR = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.NeedsRestartRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), FR = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.NeedsRestartResponse",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "must_restart",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 3, name: "restart_check_interval", kind: "message", T: F }
  ]
), ql = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ModuleConfig",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "path",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "log_level",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "module_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 6, name: "env", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    } },
    { no: 7, name: "status", kind: "message", T: Ra },
    { no: 8, name: "first_run_timeout", kind: "message", T: F },
    {
      no: 9,
      name: "tcp_mode",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Ul = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.PackageConfig",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "package",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "status", kind: "message", T: Ra }
  ]
), Ll = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.MaintenanceConfig",
  () => [
    { no: 1, name: "sensor_name", kind: "message", T: x },
    {
      no: 2,
      name: "maintenance_allowed_key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), z_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AgentInfo: Al,
  AppValidationStatus: Ra,
  AuthConfig: hl,
  AuthHandlerConfig: _l,
  CertificateRequest: UR,
  CertificateResponse: LR,
  CloudConfig: ul,
  ComponentConfig: xs,
  ConfigRequest: AR,
  ConfigResponse: qR,
  CredentialsType: Bs,
  ExternalAuthConfig: Rl,
  Frame: Fs,
  JWKSFile: fl,
  JobConfig: dl,
  LocationSecret: pl,
  LogConfiguration: Js,
  LogPatternConfig: ll,
  LogRequest: GR,
  LogResponse: BR,
  MaintenanceConfig: Ll,
  ModuleConfig: ql,
  NeedsRestartRequest: xR,
  NeedsRestartResponse: FR,
  NetworkConfig: kl,
  Orientation: Il,
  Orientation_AxisAngles: Ol,
  Orientation_EulerAngles: wl,
  Orientation_NoOrientation: bl,
  Orientation_OrientationVectorDegrees: El,
  Orientation_OrientationVectorRadians: Ml,
  Orientation_Quaternion: Cl,
  PackageConfig: Ul,
  ProcessConfig: gl,
  RemoteAuth: Pl,
  RemoteAuth_Credentials: Dl,
  RemoteConfig: Nl,
  ResourceLevelServiceConfig: _a,
  RobotConfig: cl,
  ServiceConfig: Tl,
  SessionsConfig: yl,
  TrafficTunnelEndpoint: vl,
  Translation: Sl
}, Symbol.toStringTag, { value: "Module" })), zs = /* @__PURE__ */ s.makeMessageType(
  "viam.service.discovery.v1.DiscoverResourcesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Gl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.discovery.v1.DiscoverResourcesResponse",
  () => [
    { no: 1, name: "discoveries", kind: "message", T: xs, repeated: !0 }
  ]
), Y_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DiscoverResourcesRequest: zs,
  DiscoverResourcesResponse: Gl
}, Symbol.toStringTag, { value: "Module" })), Bl = {
  typeName: "viam.service.discovery.v1.DiscoveryService",
  methods: {
    /**
     * DiscoverResources returns the list of all discovered viam resources connected to the viam-server machine.
     *
     * @generated from rpc viam.service.discovery.v1.DiscoveryService.DiscoverResources
     */
    discoverResources: {
      name: "DiscoverResources",
      I: zs,
      O: Gl,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.service.discovery.v1.DiscoveryService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    }
  }
}, xl = /* @__PURE__ */ s.makeEnum(
  "viam.service.motion.v1.PlanState",
  [
    { no: 0, name: "PLAN_STATE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "PLAN_STATE_IN_PROGRESS", localName: "IN_PROGRESS" },
    { no: 2, name: "PLAN_STATE_STOPPED", localName: "STOPPED" },
    { no: 3, name: "PLAN_STATE_SUCCEEDED", localName: "SUCCEEDED" },
    { no: 4, name: "PLAN_STATE_FAILED", localName: "FAILED" }
  ]
), Ys = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.MoveRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "destination", kind: "message", T: Ke },
    { no: 3, name: "component_name", kind: "message", T: x },
    { no: 4, name: "world_state", kind: "message", T: Mr, opt: !0 },
    { no: 5, name: "constraints", kind: "message", T: Hl, opt: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Fl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.MoveResponse",
  () => [
    {
      no: 1,
      name: "success",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), $s = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.MoveOnMapRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "destination", kind: "message", T: Ue },
    { no: 3, name: "component_name", kind: "message", T: x },
    { no: 4, name: "slam_service_name", kind: "message", T: x },
    { no: 5, name: "motion_configuration", kind: "message", T: Vs, opt: !0 },
    { no: 6, name: "obstacles", kind: "message", T: Xe, repeated: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Jl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.MoveOnMapResponse",
  () => [
    {
      no: 1,
      name: "execution_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), zl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.ObstacleDetector",
  () => [
    { no: 1, name: "vision_service", kind: "message", T: x },
    { no: 2, name: "camera", kind: "message", T: x }
  ]
), Vs = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.MotionConfiguration",
  () => [
    { no: 1, name: "obstacle_detectors", kind: "message", T: zl, repeated: !0 },
    { no: 2, name: "position_polling_frequency_hz", kind: "scalar", T: 1, opt: !0 },
    { no: 3, name: "obstacle_polling_frequency_hz", kind: "scalar", T: 1, opt: !0 },
    { no: 4, name: "plan_deviation_m", kind: "scalar", T: 1, opt: !0 },
    { no: 5, name: "linear_m_per_sec", kind: "scalar", T: 1, opt: !0 },
    { no: 6, name: "angular_degs_per_sec", kind: "scalar", T: 1, opt: !0 }
  ]
), Ws = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.MoveOnGlobeRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "destination", kind: "message", T: ze },
    { no: 3, name: "heading", kind: "scalar", T: 1, opt: !0 },
    { no: 4, name: "component_name", kind: "message", T: x },
    { no: 5, name: "movement_sensor_name", kind: "message", T: x },
    { no: 6, name: "obstacles", kind: "message", T: la, repeated: !0 },
    { no: 7, name: "motion_configuration", kind: "message", T: Vs, opt: !0 },
    { no: 8, name: "bounding_regions", kind: "message", T: la, repeated: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Yl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.MoveOnGlobeResponse",
  () => [
    {
      no: 1,
      name: "execution_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), js = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.GetPoseRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "component_name", kind: "message", T: x },
    {
      no: 3,
      name: "destination_frame",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "supplemental_transforms", kind: "message", T: Qe, repeated: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), $l = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.GetPoseResponse",
  () => [
    { no: 1, name: "pose", kind: "message", T: Ke }
  ]
), Hs = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.StopPlanRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "component_name", kind: "message", T: x },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Vl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.StopPlanResponse",
  []
), Ks = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.ListPlanStatusesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "only_active_plans",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Wl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.ListPlanStatusesResponse",
  () => [
    { no: 1, name: "plan_statuses_with_ids", kind: "message", T: ed, repeated: !0 }
  ]
), Xs = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.GetPlanRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "component_name", kind: "message", T: x },
    {
      no: 3,
      name: "last_plan_only",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 4, name: "execution_id", kind: "scalar", T: 9, opt: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), jl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.GetPlanResponse",
  () => [
    { no: 1, name: "current_plan_with_status", kind: "message", T: et },
    { no: 2, name: "replan_history", kind: "message", T: et, repeated: !0 }
  ]
), Hl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.Constraints",
  () => [
    { no: 1, name: "linear_constraint", kind: "message", T: Kl, repeated: !0 },
    { no: 2, name: "orientation_constraint", kind: "message", T: Xl, repeated: !0 },
    { no: 3, name: "collision_specification", kind: "message", T: Ql, repeated: !0 }
  ]
), Kl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.LinearConstraint",
  () => [
    { no: 1, name: "line_tolerance_mm", kind: "scalar", T: 2, opt: !0 },
    { no: 2, name: "orientation_tolerance_degs", kind: "scalar", T: 2, opt: !0 }
  ]
), Xl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.OrientationConstraint",
  () => [
    { no: 1, name: "orientation_tolerance_degs", kind: "scalar", T: 2, opt: !0 }
  ]
), Ql = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.CollisionSpecification",
  () => [
    { no: 1, name: "allows", kind: "message", T: Zl, repeated: !0 }
  ]
), Zl = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.CollisionSpecification.AllowedFrameCollisions",
  () => [
    {
      no: 1,
      name: "frame1",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "frame2",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ],
  { localName: "CollisionSpecification_AllowedFrameCollisions" }
), et = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.PlanWithStatus",
  () => [
    { no: 1, name: "plan", kind: "message", T: nd },
    { no: 2, name: "status", kind: "message", T: da },
    { no: 3, name: "status_history", kind: "message", T: da, repeated: !0 }
  ]
), ed = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.PlanStatusWithID",
  () => [
    {
      no: 1,
      name: "plan_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "component_name", kind: "message", T: x },
    {
      no: 3,
      name: "execution_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "status", kind: "message", T: da }
  ]
), da = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.PlanStatus",
  () => [
    { no: 1, name: "state", kind: "enum", T: s.getEnumType(xl) },
    { no: 2, name: "timestamp", kind: "message", T: _ },
    { no: 3, name: "reason", kind: "scalar", T: 9, opt: !0 }
  ]
), nd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.Plan",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "component_name", kind: "message", T: x },
    {
      no: 3,
      name: "execution_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "steps", kind: "message", T: ad, repeated: !0 }
  ]
), ad = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.PlanStep",
  () => [
    { no: 1, name: "step", kind: "map", K: 9, V: { kind: "message", T: td } }
  ]
), td = /* @__PURE__ */ s.makeMessageType(
  "viam.service.motion.v1.ComponentState",
  () => [
    { no: 1, name: "pose", kind: "message", T: Ue }
  ]
), JR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CollisionSpecification: Ql,
  CollisionSpecification_AllowedFrameCollisions: Zl,
  ComponentState: td,
  Constraints: Hl,
  GetPlanRequest: Xs,
  GetPlanResponse: jl,
  GetPoseRequest: js,
  GetPoseResponse: $l,
  LinearConstraint: Kl,
  ListPlanStatusesRequest: Ks,
  ListPlanStatusesResponse: Wl,
  MotionConfiguration: Vs,
  MoveOnGlobeRequest: Ws,
  MoveOnGlobeResponse: Yl,
  MoveOnMapRequest: $s,
  MoveOnMapResponse: Jl,
  MoveRequest: Ys,
  MoveResponse: Fl,
  ObstacleDetector: zl,
  OrientationConstraint: Xl,
  Plan: nd,
  PlanState: xl,
  PlanStatus: da,
  PlanStatusWithID: ed,
  PlanStep: ad,
  PlanWithStatus: et,
  StopPlanRequest: Hs,
  StopPlanResponse: Vl
}, Symbol.toStringTag, { value: "Module" })), sd = {
  typeName: "viam.service.motion.v1.MotionService",
  methods: {
    /**
     * @generated from rpc viam.service.motion.v1.MotionService.Move
     */
    move: {
      name: "Move",
      I: Ys,
      O: Fl,
      kind: m.Unary
    },
    /**
     * Generate a plan and move a component to a specific pose
     * with respect to the SLAM map's origin.
     * May replan to avoid obstacles
     *
     * @generated from rpc viam.service.motion.v1.MotionService.MoveOnMap
     */
    moveOnMap: {
      name: "MoveOnMap",
      I: $s,
      O: Jl,
      kind: m.Unary
    },
    /**
     * Generate and begin executing an execution to move a component
     * to a specific GPS coordinate.
     * May replan to avoid obstacles & account for location drift.
     * Creates a new plan upon replanning.
     *
     * @generated from rpc viam.service.motion.v1.MotionService.MoveOnGlobe
     */
    moveOnGlobe: {
      name: "MoveOnGlobe",
      I: Ws,
      O: Yl,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.service.motion.v1.MotionService.GetPose
     * @deprecated
     */
    getPose: {
      name: "GetPose",
      I: js,
      O: $l,
      kind: m.Unary
    },
    /**
     * Stops a Plan
     *
     * @generated from rpc viam.service.motion.v1.MotionService.StopPlan
     */
    stopPlan: {
      name: "StopPlan",
      I: Hs,
      O: Vl,
      kind: m.Unary
    },
    /**
     * Returns the status of plans created by requests to move components
     * that are executing OR are part of an execution which changed it state
     * within the a 24HR TTL OR until the robot reinitializes.
     * This currently only returns plans for MoveOnGlobe and MoveOnMap.
     *
     * @generated from rpc viam.service.motion.v1.MotionService.ListPlanStatuses
     */
    listPlanStatuses: {
      name: "ListPlanStatuses",
      I: Ks,
      O: Wl,
      kind: m.Unary
    },
    /**
     * Returns the plan(s) & state history of the most recent execution to move a
     * component. Returns a result if the last execution is still executing OR
     * changed state within the last 24 hours AND the robot has not reinitialized.
     * Plans are never mutated.
     * Replans always create new plans.
     * Replans share the execution_id of the previously executing plan.
     * This currently only returns plans for MoveOnGlobe and MoveOnMap.
     *
     * @generated from rpc viam.service.motion.v1.MotionService.GetPlan
     */
    getPlan: {
      name: "GetPlan",
      I: Xs,
      O: jl,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.service.motion.v1.MotionService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    }
  }
}, od = /* @__PURE__ */ s.makeEnum(
  "viam.service.navigation.v1.MapType",
  [
    { no: 0, name: "MAP_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "MAP_TYPE_NONE", localName: "NONE" },
    { no: 2, name: "MAP_TYPE_GPS", localName: "GPS" }
  ]
), Qs = /* @__PURE__ */ s.makeEnum(
  "viam.service.navigation.v1.Mode",
  [
    { no: 0, name: "MODE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "MODE_MANUAL", localName: "MANUAL" },
    { no: 2, name: "MODE_WAYPOINT", localName: "WAYPOINT" },
    { no: 3, name: "MODE_EXPLORE", localName: "EXPLORE" }
  ]
), Zs = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetModeRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), id = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetModeResponse",
  () => [
    { no: 1, name: "mode", kind: "enum", T: s.getEnumType(Qs) }
  ]
), eo = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.SetModeRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "mode", kind: "enum", T: s.getEnumType(Qs) },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), rd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.SetModeResponse",
  []
), md = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.Waypoint",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "location", kind: "message", T: ze }
  ]
), no = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetLocationRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), cd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetLocationResponse",
  () => [
    { no: 1, name: "location", kind: "message", T: ze },
    {
      no: 2,
      name: "compass_heading",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), ao = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetWaypointsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), ld = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetWaypointsResponse",
  () => [
    { no: 1, name: "waypoints", kind: "message", T: md, repeated: !0 }
  ]
), to = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.AddWaypointRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "location", kind: "message", T: ze },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), dd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.AddWaypointResponse",
  []
), so = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.RemoveWaypointRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), pd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.RemoveWaypointResponse",
  []
), oo = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetObstaclesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), ud = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetObstaclesResponse",
  () => [
    { no: 1, name: "obstacles", kind: "message", T: la, repeated: !0 }
  ]
), gd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.Path",
  () => [
    {
      no: 1,
      name: "destination_waypoint_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "geopoints", kind: "message", T: ze, repeated: !0 }
  ]
), io = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetPathsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Td = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetPathsResponse",
  () => [
    { no: 1, name: "paths", kind: "message", T: gd, repeated: !0 }
  ]
), ro = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetPropertiesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), kd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.navigation.v1.GetPropertiesResponse",
  () => [
    { no: 1, name: "map_type", kind: "enum", T: s.getEnumType(od) }
  ]
), zR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AddWaypointRequest: to,
  AddWaypointResponse: dd,
  GetLocationRequest: no,
  GetLocationResponse: cd,
  GetModeRequest: Zs,
  GetModeResponse: id,
  GetObstaclesRequest: oo,
  GetObstaclesResponse: ud,
  GetPathsRequest: io,
  GetPathsResponse: Td,
  GetPropertiesRequest: ro,
  GetPropertiesResponse: kd,
  GetWaypointsRequest: ao,
  GetWaypointsResponse: ld,
  MapType: od,
  Mode: Qs,
  Path: gd,
  RemoveWaypointRequest: so,
  RemoveWaypointResponse: pd,
  SetModeRequest: eo,
  SetModeResponse: rd,
  Waypoint: md
}, Symbol.toStringTag, { value: "Module" })), yd = {
  typeName: "viam.service.navigation.v1.NavigationService",
  methods: {
    /**
     * @generated from rpc viam.service.navigation.v1.NavigationService.GetMode
     */
    getMode: {
      name: "GetMode",
      I: Zs,
      O: id,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.service.navigation.v1.NavigationService.SetMode
     */
    setMode: {
      name: "SetMode",
      I: eo,
      O: rd,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.service.navigation.v1.NavigationService.GetLocation
     */
    getLocation: {
      name: "GetLocation",
      I: no,
      O: cd,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.service.navigation.v1.NavigationService.GetWaypoints
     */
    getWaypoints: {
      name: "GetWaypoints",
      I: ao,
      O: ld,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.service.navigation.v1.NavigationService.AddWaypoint
     */
    addWaypoint: {
      name: "AddWaypoint",
      I: to,
      O: dd,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.service.navigation.v1.NavigationService.RemoveWaypoint
     */
    removeWaypoint: {
      name: "RemoveWaypoint",
      I: so,
      O: pd,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.service.navigation.v1.NavigationService.GetObstacles
     */
    getObstacles: {
      name: "GetObstacles",
      I: oo,
      O: ud,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.service.navigation.v1.NavigationService.GetPaths
     */
    getPaths: {
      name: "GetPaths",
      I: io,
      O: Td,
      kind: m.Unary
    },
    /**
     * GetProperties returns properties of the current navigation service, including the
     * map_type being operated on.
     *
     * @generated from rpc viam.service.navigation.v1.NavigationService.GetProperties
     */
    getProperties: {
      name: "GetProperties",
      I: ro,
      O: kd,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.service.navigation.v1.NavigationService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    }
  }
}, vd = /* @__PURE__ */ s.makeEnum(
  "viam.service.slam.v1.MappingMode",
  [
    { no: 0, name: "MAPPING_MODE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "MAPPING_MODE_CREATE_NEW_MAP", localName: "CREATE_NEW_MAP" },
    { no: 2, name: "MAPPING_MODE_LOCALIZE_ONLY", localName: "LOCALIZE_ONLY" },
    { no: 3, name: "MAPPING_MODE_UPDATE_EXISTING_MAP", localName: "UPDATE_EXISTING_MAP" }
  ]
), hd = /* @__PURE__ */ s.makeEnum(
  "viam.service.slam.v1.SensorType",
  [
    { no: 0, name: "SENSOR_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "SENSOR_TYPE_CAMERA", localName: "CAMERA" },
    { no: 2, name: "SENSOR_TYPE_MOVEMENT_SENSOR", localName: "MOVEMENT_SENSOR" }
  ]
), mo = /* @__PURE__ */ s.makeMessageType(
  "viam.service.slam.v1.GetPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), fd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.slam.v1.GetPositionResponse",
  () => [
    { no: 1, name: "pose", kind: "message", T: Ue }
  ]
), co = /* @__PURE__ */ s.makeMessageType(
  "viam.service.slam.v1.GetPointCloudMapRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "return_edited_map", kind: "scalar", T: 8, opt: !0 }
  ]
), Rd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.slam.v1.GetPointCloudMapResponse",
  () => [
    {
      no: 1,
      name: "point_cloud_pcd_chunk",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), lo = /* @__PURE__ */ s.makeMessageType(
  "viam.service.slam.v1.GetInternalStateRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), _d = /* @__PURE__ */ s.makeMessageType(
  "viam.service.slam.v1.GetInternalStateResponse",
  () => [
    {
      no: 1,
      name: "internal_state_chunk",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), po = /* @__PURE__ */ s.makeMessageType(
  "viam.service.slam.v1.GetPropertiesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Sd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.slam.v1.GetPropertiesResponse",
  () => [
    {
      no: 1,
      name: "cloud_slam",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 2, name: "mapping_mode", kind: "enum", T: s.getEnumType(vd) },
    { no: 3, name: "internal_state_file_type", kind: "scalar", T: 9, opt: !0 },
    { no: 4, name: "sensor_info", kind: "message", T: Id, repeated: !0 }
  ]
), Id = /* @__PURE__ */ s.makeMessageType(
  "viam.service.slam.v1.SensorInfo",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "type", kind: "enum", T: s.getEnumType(hd) }
  ]
), YR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetInternalStateRequest: lo,
  GetInternalStateResponse: _d,
  GetPointCloudMapRequest: co,
  GetPointCloudMapResponse: Rd,
  GetPositionRequest: mo,
  GetPositionResponse: fd,
  GetPropertiesRequest: po,
  GetPropertiesResponse: Sd,
  MappingMode: vd,
  SensorInfo: Id,
  SensorType: hd
}, Symbol.toStringTag, { value: "Module" })), bd = {
  typeName: "viam.service.slam.v1.SLAMService",
  methods: {
    /**
     * GetPosition returns the current estimated position of the robot with
     * respect to a returned component reference.
     *
     * @generated from rpc viam.service.slam.v1.SLAMService.GetPosition
     */
    getPosition: {
      name: "GetPosition",
      I: mo,
      O: fd,
      kind: m.Unary
    },
    /**
     * GetPointCloudMap returns the latest pointcloud map available where XY is the ground
     * plane and positive Z is up, following the Right Hand Rule.
     *
     * @generated from rpc viam.service.slam.v1.SLAMService.GetPointCloudMap
     */
    getPointCloudMap: {
      name: "GetPointCloudMap",
      I: co,
      O: Rd,
      kind: m.ServerStreaming
    },
    /**
     * GetInternalState returns the internal map as defined by the specified slam
     * algorithm required to continue mapping/localizing.
     * This endpoint is not intended for end users.
     *
     * @generated from rpc viam.service.slam.v1.SLAMService.GetInternalState
     */
    getInternalState: {
      name: "GetInternalState",
      I: lo,
      O: _d,
      kind: m.ServerStreaming
    },
    /**
     * GetProperties returns properties of the current slam service including mapping_mode
     * and cloud_slam, where mapping_mode is the type of mapping/localizing being performed
     * and cloud_slam is a boolean representing if this SLAM service is being run in the cloud.
     *
     * @generated from rpc viam.service.slam.v1.SLAMService.GetProperties
     */
    getProperties: {
      name: "GetProperties",
      I: po,
      O: Sd,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands.
     *
     * @generated from rpc viam.service.slam.v1.SLAMService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    }
  }
}, Md = /* @__PURE__ */ s.makeEnum(
  "viam.component.camera.v1.Format",
  [
    { no: 0, name: "FORMAT_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "FORMAT_RAW_RGBA", localName: "RAW_RGBA" },
    { no: 2, name: "FORMAT_RAW_DEPTH", localName: "RAW_DEPTH" },
    { no: 3, name: "FORMAT_JPEG", localName: "JPEG" },
    { no: 4, name: "FORMAT_PNG", localName: "PNG" }
  ]
), uo = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.GetImageRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "mime_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Ed = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.GetImageResponse",
  () => [
    {
      no: 1,
      name: "mime_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "image",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), wd = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.GetImagesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Od = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.GetImagesResponse",
  () => [
    { no: 1, name: "images", kind: "message", T: go, repeated: !0 },
    { no: 84260, name: "response_metadata", kind: "message", T: Er }
  ]
), go = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.Image",
  () => [
    {
      no: 1,
      name: "source_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "format", kind: "enum", T: s.getEnumType(Md) },
    {
      no: 3,
      name: "image",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), To = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.RenderFrameRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "mime_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), ko = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.GetPointCloudRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "mime_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Cd = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.GetPointCloudResponse",
  () => [
    {
      no: 1,
      name: "mime_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "point_cloud",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), Nd = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.GetPropertiesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Pd = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.GetPropertiesResponse",
  () => [
    {
      no: 1,
      name: "supports_pcd",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 2, name: "intrinsic_parameters", kind: "message", T: qd },
    { no: 3, name: "distortion_parameters", kind: "message", T: Ud },
    { no: 4, name: "mime_types", kind: "scalar", T: 9, repeated: !0 },
    { no: 5, name: "frame_rate", kind: "scalar", T: 2, opt: !0 }
  ]
), $R = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.Webcams",
  () => [
    { no: 1, name: "webcams", kind: "message", T: Dd, repeated: !0 }
  ]
), Dd = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.Webcam",
  () => [
    {
      no: 1,
      name: "label",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "status",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "properties", kind: "message", T: Ad, repeated: !0 },
    {
      no: 4,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ad = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.Property",
  () => [
    {
      no: 1,
      name: "width_px",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 2,
      name: "height_px",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 3,
      name: "frame_format",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "frame_rate",
      kind: "scalar",
      T: 2
      /* ScalarType.FLOAT */
    }
  ]
), qd = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.IntrinsicParameters",
  () => [
    {
      no: 1,
      name: "width_px",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    {
      no: 2,
      name: "height_px",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    {
      no: 3,
      name: "focal_x_px",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "focal_y_px",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 5,
      name: "center_x_px",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 6,
      name: "center_y_px",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), Ud = /* @__PURE__ */ s.makeMessageType(
  "viam.component.camera.v1.DistortionParameters",
  () => [
    {
      no: 1,
      name: "model",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "parameters", kind: "scalar", T: 1, repeated: !0 }
  ]
), $_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DistortionParameters: Ud,
  Format: Md,
  GetImageRequest: uo,
  GetImageResponse: Ed,
  GetImagesRequest: wd,
  GetImagesResponse: Od,
  GetPointCloudRequest: ko,
  GetPointCloudResponse: Cd,
  GetPropertiesRequest: Nd,
  GetPropertiesResponse: Pd,
  Image: go,
  IntrinsicParameters: qd,
  Property: Ad,
  RenderFrameRequest: To,
  Webcam: Dd,
  Webcams: $R
}, Symbol.toStringTag, { value: "Module" })), yo = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetDetectionsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "image",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    },
    {
      no: 3,
      name: "width",
      kind: "scalar",
      T: 3
      /* ScalarType.INT64 */
    },
    {
      no: 4,
      name: "height",
      kind: "scalar",
      T: 3
      /* ScalarType.INT64 */
    },
    {
      no: 5,
      name: "mime_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Ld = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetDetectionsResponse",
  () => [
    { no: 1, name: "detections", kind: "message", T: Sa, repeated: !0 }
  ]
), vo = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetDetectionsFromCameraRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "camera_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Gd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetDetectionsFromCameraResponse",
  () => [
    { no: 1, name: "detections", kind: "message", T: Sa, repeated: !0 }
  ]
), Sa = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.Detection",
  () => [
    { no: 1, name: "x_min", kind: "scalar", T: 3, opt: !0 },
    { no: 2, name: "y_min", kind: "scalar", T: 3, opt: !0 },
    { no: 3, name: "x_max", kind: "scalar", T: 3, opt: !0 },
    { no: 4, name: "y_max", kind: "scalar", T: 3, opt: !0 },
    {
      no: 5,
      name: "confidence",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 6,
      name: "class_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 7, name: "x_min_normalized", kind: "scalar", T: 1, opt: !0 },
    { no: 8, name: "y_min_normalized", kind: "scalar", T: 1, opt: !0 },
    { no: 9, name: "x_max_normalized", kind: "scalar", T: 1, opt: !0 },
    { no: 10, name: "y_max_normalized", kind: "scalar", T: 1, opt: !0 }
  ]
), ho = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetClassificationsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "image",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    },
    {
      no: 3,
      name: "width",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 4,
      name: "height",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 5,
      name: "mime_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 6,
      name: "n",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Bd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetClassificationsResponse",
  () => [
    { no: 1, name: "classifications", kind: "message", T: Ia, repeated: !0 }
  ]
), fo = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetClassificationsFromCameraRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "camera_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "n",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), xd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetClassificationsFromCameraResponse",
  () => [
    { no: 1, name: "classifications", kind: "message", T: Ia, repeated: !0 }
  ]
), Ia = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.Classification",
  () => [
    {
      no: 1,
      name: "class_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "confidence",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), Ro = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetObjectPointCloudsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "camera_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "mime_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Fd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetObjectPointCloudsResponse",
  () => [
    {
      no: 1,
      name: "mime_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "objects", kind: "message", T: Tt, repeated: !0 }
  ]
), _o = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetPropertiesRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), So = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.CaptureAllFromCameraRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "camera_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "return_image",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 4,
      name: "return_classifications",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 5,
      name: "return_detections",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 6,
      name: "return_object_point_clouds",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Jd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.CaptureAllFromCameraResponse",
  () => [
    { no: 1, name: "image", kind: "message", T: go },
    { no: 2, name: "detections", kind: "message", T: Sa, repeated: !0 },
    { no: 3, name: "classifications", kind: "message", T: Ia, repeated: !0 },
    { no: 4, name: "objects", kind: "message", T: Tt, repeated: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), zd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.vision.v1.GetPropertiesResponse",
  () => [
    {
      no: 1,
      name: "classifications_supported",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 2,
      name: "detections_supported",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 3,
      name: "object_point_clouds_supported",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), VR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CaptureAllFromCameraRequest: So,
  CaptureAllFromCameraResponse: Jd,
  Classification: Ia,
  Detection: Sa,
  GetClassificationsFromCameraRequest: fo,
  GetClassificationsFromCameraResponse: xd,
  GetClassificationsRequest: ho,
  GetClassificationsResponse: Bd,
  GetDetectionsFromCameraRequest: vo,
  GetDetectionsFromCameraResponse: Gd,
  GetDetectionsRequest: yo,
  GetDetectionsResponse: Ld,
  GetObjectPointCloudsRequest: Ro,
  GetObjectPointCloudsResponse: Fd,
  GetPropertiesRequest: _o,
  GetPropertiesResponse: zd
}, Symbol.toStringTag, { value: "Module" })), Yd = {
  typeName: "viam.service.vision.v1.VisionService",
  methods: {
    /**
     * GetDetectionsFromCamera will return a list of detections in the next image given a camera and a detector
     *
     * @generated from rpc viam.service.vision.v1.VisionService.GetDetectionsFromCamera
     */
    getDetectionsFromCamera: {
      name: "GetDetectionsFromCamera",
      I: vo,
      O: Gd,
      kind: m.Unary
    },
    /**
     * GetDetections will return a list of detections in the next image given the image bytes and a detector
     *
     * @generated from rpc viam.service.vision.v1.VisionService.GetDetections
     */
    getDetections: {
      name: "GetDetections",
      I: yo,
      O: Ld,
      kind: m.Unary
    },
    /**
     * GetClassificationsFromCamera will return a list of classifications in the next image given a camera and a classifier
     *
     * @generated from rpc viam.service.vision.v1.VisionService.GetClassificationsFromCamera
     */
    getClassificationsFromCamera: {
      name: "GetClassificationsFromCamera",
      I: fo,
      O: xd,
      kind: m.Unary
    },
    /**
     * GetClassifications will return a list of classifications in the next image given the image bytes and a classifier
     *
     * @generated from rpc viam.service.vision.v1.VisionService.GetClassifications
     */
    getClassifications: {
      name: "GetClassifications",
      I: ho,
      O: Bd,
      kind: m.Unary
    },
    /**
     * GetObjectPointClouds returns all the found objects in a pointcloud from a camera of the underlying robot,
     * as well as the 3-vector center of each of the found objects.
     * A specific MIME type can be requested but may not necessarily be the same one returned.
     *
     * @generated from rpc viam.service.vision.v1.VisionService.GetObjectPointClouds
     */
    getObjectPointClouds: {
      name: "GetObjectPointClouds",
      I: Ro,
      O: Fd,
      kind: m.Unary
    },
    /**
     * GetProperties will return the properties as booleans given the name of the vision service
     *
     * @generated from rpc viam.service.vision.v1.VisionService.GetProperties
     */
    getProperties: {
      name: "GetProperties",
      I: _o,
      O: zd,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.service.vision.v1.VisionService.CaptureAllFromCamera
     */
    captureAllFromCamera: {
      name: "CaptureAllFromCamera",
      I: So,
      O: Jd,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.service.vision.v1.VisionService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    }
  }
}, WR = new Blob(
  [
    `self.onmessage = function(e) {
    setTimeout(() => self.postMessage(""), e.data);
  };`
  ],
  { type: "text/javascript" }
);
class jR {
  constructor(e, n, t = 1e4) {
    this.deferredTransport = e, this.onDisconnect = n, this.heartbeatIntervalMs = t;
  }
  connecting;
  get client() {
    const e = this.deferredTransport();
    return C(Gs, e);
  }
  heartbeat() {
    let e;
    const n = async () => {
      try {
        await this.client.getOperations({});
      } catch {
        this.onDisconnect();
        return;
      }
      e ? e.postMessage(this.heartbeatIntervalMs) : setTimeout(() => {
        n().catch(console.error);
      }, this.heartbeatIntervalMs);
    };
    if (globalThis.Worker !== void 0) {
      const t = window.URL.createObjectURL(WR);
      e = new Worker(t), URL.revokeObjectURL(t), e.addEventListener("message", () => {
        n().catch(console.error);
      });
    }
    n().catch(console.error);
  }
  async start() {
    this.connecting && await this.connecting, this.connecting = new Promise((e, n) => {
      (async () => {
        await this.client.getOperations({});
      })().then(e).catch(n).finally(() => {
        this.connecting = void 0;
      });
    });
    try {
      await this.connecting;
    } finally {
      this.connecting = void 0;
    }
    this.heartbeat();
  }
}
const pa = /* @__PURE__ */ s.makeMessageType(
  "grpc.reflection.v1.ServerReflectionRequest",
  () => [
    {
      no: 1,
      name: "host",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "file_by_filename", kind: "scalar", T: 9, oneof: "message_request" },
    { no: 4, name: "file_containing_symbol", kind: "scalar", T: 9, oneof: "message_request" },
    { no: 5, name: "file_containing_extension", kind: "message", T: HR, oneof: "message_request" },
    { no: 6, name: "all_extension_numbers_of_type", kind: "scalar", T: 9, oneof: "message_request" },
    { no: 7, name: "list_services", kind: "scalar", T: 9, oneof: "message_request" }
  ]
), HR = /* @__PURE__ */ s.makeMessageType(
  "grpc.reflection.v1.ExtensionRequest",
  () => [
    {
      no: 1,
      name: "containing_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "extension_number",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    }
  ]
), KR = /* @__PURE__ */ s.makeMessageType(
  "grpc.reflection.v1.ServerReflectionResponse",
  () => [
    {
      no: 1,
      name: "valid_host",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "original_request", kind: "message", T: pa },
    { no: 4, name: "file_descriptor_response", kind: "message", T: XR, oneof: "message_response" },
    { no: 5, name: "all_extension_numbers_response", kind: "message", T: QR, oneof: "message_response" },
    { no: 6, name: "list_services_response", kind: "message", T: ZR, oneof: "message_response" },
    { no: 7, name: "error_response", kind: "message", T: n1, oneof: "message_response" }
  ]
), XR = /* @__PURE__ */ s.makeMessageType(
  "grpc.reflection.v1.FileDescriptorResponse",
  () => [
    { no: 1, name: "file_descriptor_proto", kind: "scalar", T: 12, repeated: !0 }
  ]
), QR = /* @__PURE__ */ s.makeMessageType(
  "grpc.reflection.v1.ExtensionNumberResponse",
  () => [
    {
      no: 1,
      name: "base_type_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "extension_number", kind: "scalar", T: 5, repeated: !0 }
  ]
), ZR = /* @__PURE__ */ s.makeMessageType(
  "grpc.reflection.v1.ListServiceResponse",
  () => [
    { no: 1, name: "service", kind: "message", T: e1, repeated: !0 }
  ]
), e1 = /* @__PURE__ */ s.makeMessageType(
  "grpc.reflection.v1.ServiceResponse",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), n1 = /* @__PURE__ */ s.makeMessageType(
  "grpc.reflection.v1.ErrorResponse",
  () => [
    {
      no: 1,
      name: "error_code",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 2,
      name: "error_message",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), a1 = {
  typeName: "grpc.reflection.v1.ServerReflection",
  methods: {
    /**
     * The reflection service is structured as a bidirectional stream, ensuring
     * all related requests go to a single server.
     *
     * @generated from rpc grpc.reflection.v1.ServerReflection.ServerReflectionInfo
     */
    serverReflectionInfo: {
      name: "ServerReflectionInfo",
      I: pa,
      O: KR,
      kind: m.BiDiStreaming
    }
  }
};
class t1 {
  constructor(e, n) {
    this.deferredTransport = e, this.sessionManager = n;
  }
  async getSessionMetadata() {
    try {
      return await this.sessionManager.getSessionMetadata();
    } catch (e) {
      throw e instanceof N && e.code === w.InvalidArgument && e.message === "SESSION_EXPIRED" && this.sessionManager.reset(), e;
    }
  }
  async unary(e, n, t, o, i, r, c) {
    const d = wn(i), p = `/${e.typeName}/${n.name}`;
    if (je.heartbeatMonitoredMethods[p] ?? !1) {
      const T = await this.getSessionMetadata();
      for (const [R, S] of T)
        d.set(R, S);
    }
    return this.deferredTransport().unary(
      e,
      n,
      t,
      o,
      d,
      r,
      c
    );
  }
  async stream(e, n, t, o, i, r, c) {
    const d = wn(i), p = `/${e.typeName}/${n.name}`;
    if (je.heartbeatMonitoredMethods[p] ?? !1) {
      const T = await this.getSessionMetadata();
      for (const [R, S] of T)
        d.set(R, S);
    }
    return this.deferredTransport().stream(
      e,
      n,
      t,
      o,
      d,
      r,
      c
    );
  }
}
const s1 = new Blob(
  [
    `self.onmessage = function(e) {
  setTimeout(() => self.postMessage(""), e.data);
};`
  ],
  { type: "text/javascript" }
);
class je {
  constructor(e, n) {
    this.deferredTransport = n, this.host = e, this.transport = new t1(this.deferredTransport, this);
  }
  static heartbeatMonitoredMethods = {};
  transport;
  currentSessionID = "";
  sessionsSupported;
  heartbeatIntervalMs;
  host = "";
  starting;
  get client() {
    const e = this.deferredTransport();
    return oa(Gs, e);
  }
  get sessionID() {
    return this.currentSessionID;
  }
  getSessionMetadataInner() {
    const e = new Headers();
    return this.sessionsSupported && this.currentSessionID !== "" && e.set("viam-sid", this.currentSessionID), e;
  }
  reset() {
    this.starting || (this.sessionsSupported = void 0);
  }
  // Note: maybe support non-worker for foreground presence.
  backgroundHeartbeat = !0;
  async heartbeat() {
    if (!this.sessionsSupported || this.currentSessionID === "")
      return;
    for (; this.starting; )
      await this.starting;
    let e;
    const n = async () => {
      const t = new qs({
        id: this.currentSessionID
      });
      try {
        await this.client.sendSessionHeartbeat(t);
      } catch (o) {
        if (o instanceof N && o.code === w.Unimplemented) {
          console.error("sessions unsupported; will not try again"), this.sessionsSupported = !1;
          return;
        }
        if (o instanceof Ae || o instanceof N && o.rawMessage === "closed") {
          this.reset();
          return;
        }
      }
      e ? e.postMessage(this.heartbeatIntervalMs) : setTimeout(() => {
        n().catch(console.error);
      }, this.heartbeatIntervalMs);
    };
    if (this.backgroundHeartbeat && globalThis.Worker !== void 0) {
      const t = window.URL.createObjectURL(s1);
      e = new Worker(t), URL.revokeObjectURL(t), e.addEventListener("message", () => {
        n().catch(console.error);
      });
    }
    n().catch(console.error);
  }
  async getSessionMetadata() {
    for (; this.starting; )
      await this.starting;
    return this.sessionsSupported !== void 0 ? this.getSessionMetadataInner() : (this.starting = new Promise((e, n) => {
      (async () => {
        const t = new As();
        this.currentSessionID !== "" && (t.resume = this.currentSessionID);
        let o;
        try {
          o = await this.client.startSession(t);
        } catch (r) {
          if (r instanceof N && r.code === w.Unimplemented) {
            console.error("sessions unsupported; will not try again"), this.sessionsSupported = !1;
            return;
          }
          throw r;
        }
        const { heartbeatWindow: i } = o;
        if (!i)
          throw new Error(
            "expected heartbeat window in response to start session"
          );
        this.sessionsSupported = !0, this.currentSessionID = o.id, this.heartbeatIntervalMs = (Number(i.seconds) * 1e3 + i.nanos / 1e6) / 5, await this.applyHeartbeatMonitoredMethods(), e(), this.heartbeat().catch(console.error);
      })().then(e).catch(n).finally(() => {
        this.starting = void 0;
      });
    }), await this.starting, this.getSessionMetadataInner());
  }
  async applyHeartbeatMonitoredMethods() {
    try {
      const e = oa(a1, this.transport), n = new pa({
        host: this.host,
        messageRequest: { case: "listServices", value: "" }
      }), t = e.serverReflectionInfo(
        Ja([n]),
        { timeoutMs: 1e4 }
      );
      for await (const o of t) {
        const i = o.messageResponse.value.service.map((c) => new pa({
          messageRequest: {
            case: "fileContainingSymbol",
            value: c.name
          }
        })), r = e.serverReflectionInfo(
          Ja(i),
          { timeoutMs: 1e4 }
        );
        for await (const c of r)
          for (const d of c.messageResponse.value.fileDescriptorProto) {
            const p = se.fromBinary(d);
            for (const T of p.service)
              for (const R of T.method)
                je.heartbeatMonitoredMethods[`/${p.package}.${T.name}/${R.name}`] = je.hasHeartbeatOption(R.options);
          }
      }
    } catch {
      je.heartbeatMonitoredMethods = {
        "/viam.component.arm.v1.ArmService/MoveToPosition": !0,
        "/viam.component.arm.v1.ArmService/MoveToJointPositions": !0,
        "/viam.component.arm.v1.ArmService/MoveThroughJointPositions": !0,
        "/viam.component.base.v1.BaseService/MoveStraight": !0,
        "/viam.component.base.v1.BaseService/Spin": !0,
        "/viam.component.base.v1.BaseService/SetPower": !0,
        "/viam.component.base.v1.BaseService/SetVelocity": !0,
        "/viam.component.gantry.v1.GantryService/MoveToPosition": !0,
        "/viam.component.gripper.v1.GripperService/Open": !0,
        "/viam.component.gripper.v1.GripperService/Grab": !0,
        "/viam.component.motor.v1.MotorService/SetPower": !0,
        "/viam.component.motor.v1.MotorService/GoFor": !0,
        "/viam.component.motor.v1.MotorService/GoTo": !0,
        "/viam.component.motor.v1.MotorService/SetRPM": !0,
        "/viam.component.servo.v1.ServoService/Move": !0
      };
    }
  }
  static hasHeartbeatOption(e) {
    if (!e)
      return !1;
    const n = new xi(e.toBinary());
    for (; n.pos < n.len; ) {
      const t = n.tag(), [o] = t;
      if (o === wr.field.no)
        return !0;
      n.string();
    }
    return !1;
  }
}
const o1 = /* @__PURE__ */ s.makeEnum(
  "viam.service.mlmodel.v1.LabelType",
  [
    { no: 0, name: "LABEL_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "LABEL_TYPE_TENSOR_VALUE", localName: "TENSOR_VALUE" },
    { no: 2, name: "LABEL_TYPE_TENSOR_AXIS", localName: "TENSOR_AXIS" }
  ]
), $d = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.InferRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "input_tensors", kind: "message", T: Wd },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), i1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.InferResponse",
  () => [
    { no: 3, name: "output_tensors", kind: "message", T: Wd }
  ]
), Vd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.MetadataRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), r1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.MetadataResponse",
  () => [
    { no: 1, name: "metadata", kind: "message", T: m1 }
  ]
), m1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.Metadata",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "description",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "input_info", kind: "message", T: Mi, repeated: !0 },
    { no: 5, name: "output_info", kind: "message", T: Mi, repeated: !0 }
  ]
), Mi = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.TensorInfo",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "description",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "data_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "shape", kind: "scalar", T: 5, repeated: !0 },
    { no: 5, name: "associated_files", kind: "message", T: c1, repeated: !0 },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), c1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.File",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "description",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "label_type", kind: "enum", T: s.getEnumType(o1) }
  ]
), l1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensorDataInt8",
  () => [
    {
      no: 1,
      name: "data",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), d1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensorDataUInt8",
  () => [
    {
      no: 1,
      name: "data",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), p1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensorDataInt16",
  () => [
    { no: 1, name: "data", kind: "scalar", T: 7, repeated: !0 }
  ]
), u1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensorDataUInt16",
  () => [
    { no: 1, name: "data", kind: "scalar", T: 7, repeated: !0 }
  ]
), g1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensorDataInt32",
  () => [
    { no: 1, name: "data", kind: "scalar", T: 15, repeated: !0 }
  ]
), T1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensorDataUInt32",
  () => [
    { no: 1, name: "data", kind: "scalar", T: 7, repeated: !0 }
  ]
), k1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensorDataInt64",
  () => [
    { no: 1, name: "data", kind: "scalar", T: 16, repeated: !0 }
  ]
), y1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensorDataUInt64",
  () => [
    { no: 1, name: "data", kind: "scalar", T: 6, repeated: !0 }
  ]
), v1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensorDataFloat",
  () => [
    { no: 1, name: "data", kind: "scalar", T: 2, repeated: !0 }
  ]
), h1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensorDataDouble",
  () => [
    { no: 1, name: "data", kind: "scalar", T: 1, repeated: !0 }
  ]
), f1 = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensor",
  () => [
    { no: 1, name: "shape", kind: "scalar", T: 6, repeated: !0 },
    { no: 2, name: "int8_tensor", kind: "message", T: l1, oneof: "tensor" },
    { no: 3, name: "uint8_tensor", kind: "message", T: d1, oneof: "tensor" },
    { no: 4, name: "int16_tensor", kind: "message", T: p1, oneof: "tensor" },
    { no: 5, name: "uint16_tensor", kind: "message", T: u1, oneof: "tensor" },
    { no: 6, name: "int32_tensor", kind: "message", T: g1, oneof: "tensor" },
    { no: 7, name: "uint32_tensor", kind: "message", T: T1, oneof: "tensor" },
    { no: 8, name: "int64_tensor", kind: "message", T: k1, oneof: "tensor" },
    { no: 9, name: "uint64_tensor", kind: "message", T: y1, oneof: "tensor" },
    { no: 10, name: "float_tensor", kind: "message", T: v1, oneof: "tensor" },
    { no: 11, name: "double_tensor", kind: "message", T: h1, oneof: "tensor" }
  ]
), Wd = /* @__PURE__ */ s.makeMessageType(
  "viam.service.mlmodel.v1.FlatTensors",
  () => [
    { no: 1, name: "tensors", kind: "map", K: 9, V: { kind: "message", T: f1 } }
  ]
), jd = {
  typeName: "viam.service.mlmodel.v1.MLModelService",
  methods: {
    /**
     * Infer takes an already ordered input tensor as a map, makes an inference on the model, and returns an output data map.
     *
     * @generated from rpc viam.service.mlmodel.v1.MLModelService.Infer
     */
    infer: {
      name: "Infer",
      I: $d,
      O: i1,
      kind: m.Unary
    },
    /**
     * Metadata returns the metadata associated with the ML model.
     *
     * @generated from rpc viam.service.mlmodel.v1.MLModelService.Metadata
     */
    metadata: {
      name: "Metadata",
      I: Vd,
      O: r1,
      kind: m.Unary
    }
  }
};
class A extends Cr {
  serviceHost;
  webrtcOptions;
  directOptions;
  sessionOptions;
  gRPCConnectionManager;
  sessionManager;
  peerConn;
  transport;
  connecting;
  connectResolve;
  savedCreds;
  closed;
  robotServiceClient;
  armServiceClient;
  baseServiceClient;
  boardServiceClient;
  encoderServiceClient;
  gantryServiceClient;
  genericServiceClient;
  gripperServiceClient;
  mlModelServiceClient;
  movementSensorServiceClient;
  powerSensorServiceClient;
  inputControllerServiceClient;
  motorServiceClient;
  navigationServiceClient;
  discoveryServiceClient;
  motionServiceClient;
  visionServiceClient;
  servoServiceClient;
  slamServiceClient;
  constructor(e, n, t, o) {
    super(), this.serviceHost = e, this.webrtcOptions = n, this.directOptions = o, this.sessionOptions = t, this.gRPCConnectionManager = new jR(
      () => {
        if (!this.transport)
          throw new Error(A.notConnectedYetStr);
        return this.transport;
      },
      () => {
        this.onDisconnect();
      }
    ), this.sessionManager = new je(
      this.serviceHost,
      () => {
        if (!this.transport)
          throw new Error(A.notConnectedYetStr);
        return this.transport;
      }
    );
    for (const i of Object.values(ae))
      this.on(i, () => {
        this.emit("connectionstatechange", { eventType: i });
      });
    this.closed = !1;
  }
  onDisconnect(e) {
    if (this.emit(ae.DISCONNECTED, e ?? {}), this.noReconnect !== void 0 && this.noReconnect || this.closed)
      return;
    console.debug("Connection closed, will try to reconnect");
    const n = {
      retry: (t, o) => (console.debug(
        `Failed to connect, attempt ${o} with backoff`,
        t
      ), !0)
    };
    this.reconnectMaxWait !== void 0 && (n.maxDelay = this.reconnectMaxWait), this.reconnectMaxAttempts !== void 0 && (n.numOfAttempts = this.reconnectMaxAttempts), Va(async () => this.connect(), n).then(() => {
      console.debug("Reconnected successfully!");
    }).catch(() => {
      console.debug(`Reached max attempts: ${this.reconnectMaxAttempts}`);
    });
  }
  get noReconnect() {
    return this.webrtcOptions?.noReconnect ?? this.directOptions?.noReconnect;
  }
  get reconnectMaxAttempts() {
    return this.webrtcOptions?.reconnectMaxAttempts ?? this.directOptions?.reconnectMaxAttempts;
  }
  get reconnectMaxWait() {
    return this.webrtcOptions?.reconnectMaxWait ?? this.directOptions?.reconnectMaxWait;
  }
  get sessionId() {
    return this.sessionManager.sessionID;
  }
  static notConnectedYetStr = "not connected yet";
  get robotService() {
    if (!this.robotServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.robotServiceClient;
  }
  get armService() {
    if (!this.armServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.armServiceClient;
  }
  get baseService() {
    if (!this.baseServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.baseServiceClient;
  }
  get boardService() {
    if (!this.boardServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.boardServiceClient;
  }
  get encoderService() {
    if (!this.encoderServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.encoderServiceClient;
  }
  get gantryService() {
    if (!this.gantryServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.gantryServiceClient;
  }
  get genericService() {
    if (!this.genericServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.genericServiceClient;
  }
  get gripperService() {
    if (!this.gripperServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.gripperServiceClient;
  }
  get mlModelService() {
    if (!this.mlModelServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.mlModelServiceClient;
  }
  get movementSensorService() {
    if (!this.movementSensorServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.movementSensorServiceClient;
  }
  get powerSensorService() {
    if (!this.powerSensorServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.powerSensorServiceClient;
  }
  get inputControllerService() {
    if (!this.inputControllerServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.inputControllerServiceClient;
  }
  get motorService() {
    if (!this.motorServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.motorServiceClient;
  }
  get navigationService() {
    if (!this.navigationServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.navigationServiceClient;
  }
  get discoveryService() {
    if (!this.discoveryServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.discoveryServiceClient;
  }
  get motionService() {
    if (!this.motionServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.motionServiceClient;
  }
  get visionService() {
    if (!this.visionServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.visionServiceClient;
  }
  get servoService() {
    if (!this.servoServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.servoServiceClient;
  }
  get slamService() {
    if (!this.slamServiceClient)
      throw new Error(A.notConnectedYetStr);
    return this.slamServiceClient;
  }
  createServiceClient(e) {
    const n = this.sessionOptions?.disabled ? this.transport : this.sessionManager.transport;
    if (!n)
      throw new Error(A.notConnectedYetStr);
    return C(e, n);
  }
  get peerConnection() {
    return this.peerConn;
  }
  async disconnect() {
    for (this.emit(ae.DISCONNECTING, {}); this.connecting; )
      await this.connecting;
    this.peerConn && (this.peerConn.close(), this.peerConn = void 0), this.sessionManager.reset(), this.closed = !0, this.emit(ae.DISCONNECTED, {});
  }
  isConnected() {
    return this.peerConn?.iceConnectionState === "connected";
  }
  // TODO(RSDK-7672): refactor due to cognitive complexity
  // eslint-disable-next-line sonarjs/cognitive-complexity
  async connect({
    creds: e = this.savedCreds,
    priority: n,
    dialTimeout: t
  } = {}) {
    if (this.emit(ae.CONNECTING, {}), this.closed = !1, this.connecting) {
      for (; this.connecting !== void 0; )
        await this.connecting;
      return;
    }
    this.connecting = new Promise((o) => {
      this.connectResolve = o;
    }), this.peerConn && (this.peerConn.close(), this.peerConn = void 0), this.sessionManager.reset();
    try {
      const o = {
        webrtcOptions: {
          disableTrickleICE: !1,
          rtcConfig: this.webrtcOptions?.rtcConfig
        },
        dialTimeout: t ?? vt,
        extraHeaders: Za
      };
      if (e && (Dn(e) ? o.credentials = e : o.accessToken = e.payload), n !== void 0 && o.webrtcOptions && (o.webrtcOptions.additionalSdpFields = { "x-priority": n }), this.savedCreds = e, this.webrtcOptions?.enabled) {
        o.webrtcOptions && (o.webrtcOptions.signalingCredentials = o.credentials);
        const r = await kR(
          this.webrtcOptions.signalingAddress || this.serviceHost,
          this.webrtcOptions.host,
          o
        );
        this.peerConn = r.peerConnection, this.peerConn.addEventListener("iceconnectionstatechange", () => {
          this.peerConn?.iceConnectionState === "connected" ? this.emit(ae.CONNECTED, {}) : this.peerConn?.iceConnectionState === "closed" && this.onDisconnect();
        }), r.dataChannel.addEventListener("close", (c) => {
          this.onDisconnect(c);
        }), this.transport = r.transport, r.peerConnection.addEventListener("track", (c) => {
          const [d] = c.streams;
          if (!d)
            throw this.emit("track", c), new Error("expected event stream to exist");
          const p = d.id.replaceAll("+", ":");
          Object.defineProperty(d, "id", {
            value: p
          }), this.emit("track", c);
        });
      } else
        this.transport = await En(this.serviceHost, o), await this.gRPCConnectionManager.start();
      const i = this.sessionOptions?.disabled ? this.transport : this.sessionManager.transport;
      this.robotServiceClient = C(
        Gs,
        i
      ), this.armServiceClient = C(xr, i), this.baseServiceClient = C(
        jr,
        i
      ), this.boardServiceClient = C(
        rm,
        i
      ), this.encoderServiceClient = C(
        dm,
        i
      ), this.gantryServiceClient = C(
        vm,
        i
      ), this.genericServiceClient = C(
        Qt,
        i
      ), this.gripperServiceClient = C(
        bm,
        i
      ), this.mlModelServiceClient = C(
        jd,
        i
      ), this.movementSensorServiceClient = C(
        Zm,
        i
      ), this.powerSensorServiceClient = C(
        tc,
        i
      ), this.inputControllerServiceClient = C(
        Dm,
        i
      ), this.motorServiceClient = C(
        Ym,
        i
      ), this.navigationServiceClient = C(
        yd,
        i
      ), this.motionServiceClient = C(
        sd,
        i
      ), this.visionServiceClient = C(
        Yd,
        i
      ), this.servoServiceClient = C(
        mc,
        i
      ), this.slamServiceClient = C(
        bd,
        i
      ), this.discoveryServiceClient = C(
        Bl,
        i
      ), this.emit(ae.CONNECTED, {});
    } catch (o) {
      throw this.emit(ae.DISCONNECTED, {}), o;
    } finally {
      this.connectResolve?.(), this.connectResolve = void 0, this.connecting = void 0;
    }
  }
  // SESSIONS
  async getSessions() {
    return (await this.robotService.getSessions({})).sessions;
  }
  // OPERATIONS
  async getOperations() {
    return (await this.robotService.getOperations({})).operations;
  }
  async cancelOperation(e) {
    await this.robotService.cancelOperation({ id: e });
  }
  async blockForOperation(e) {
    await this.robotService.blockForOperation({ id: e });
  }
  async stopAll() {
    await this.robotService.stopAll({});
  }
  // FRAME SYSTEM
  async frameSystemConfig(e) {
    return (await this.robotService.frameSystemConfig({
      supplementalTransforms: e
    })).frameSystemConfigs;
  }
  async transformPose(e, n, t) {
    const o = new Cs({
      source: e,
      destination: n,
      supplementalTransforms: t
    }), r = (await this.robotService.transformPose(o)).pose;
    if (!r)
      throw new Error("no pose");
    return r;
  }
  async transformPCD(e, n, t) {
    const o = new Ns({
      pointCloudPcd: e,
      source: n,
      destination: t
    });
    return (await this.robotService.transformPCD(o)).pointCloudPcd;
  }
  // GET MODELS FROM MODULES
  async getModelsFromModules() {
    const e = new Ps({});
    return (await this.robotService.getModelsFromModules(e)).models;
  }
  // GET CLOUD METADATA
  async getCloudMetadata() {
    return this.robotService.getCloudMetadata({});
  }
  // RESOURCES
  async resourceNames() {
    return (await this.robotService.resourceNames({})).resources;
  }
  async resourceRPCSubtypes() {
    return (await this.robotService.resourceRPCSubtypes({})).resourceRpcSubtypes;
  }
  // MACHINE STATUS
  async getMachineStatus() {
    return this.robotService.getMachineStatus({});
  }
  // VERSION INFO
  async getVersion() {
    return this.robotService.getVersion({});
  }
  // MODULES
  async restartModule(e, n) {
    const t = new Ls();
    e !== void 0 && (t.idOrName.case = "moduleId", t.idOrName.value = e), n !== void 0 && (t.idOrName.case = "moduleName", t.idOrName.value = n), await this.robotService.restartModule(t);
  }
}
const Ei = (a) => !!(a > 0 && Number.isInteger(a)), R1 = (a) => a.includes("local"), wi = async (a) => {
  if (console.debug("dialing via gRPC..."), !R1(a.host))
    throw new Error(
      `cannot dial "${a.host}" directly, please use a local url instead.`
    );
  const e = {
    noReconnect: a.noReconnect,
    reconnectMaxWait: a.reconnectMaxWait,
    reconnectMaxAttempts: a.reconnectMaxAttempts
  };
  let n;
  a.disableSessions && (n = { disabled: !0 });
  const t = new A(a.host, void 0, n, e);
  return await t.connect({
    creds: a.credentials,
    dialTimeout: a.dialTimeout ?? vt
  }), console.debug("connected via gRPC"), t;
}, Oi = async (a) => {
  console.debug("dialing via WebRTC...");
  const e = a.serviceHost ?? a.host, { signalingAddress: n } = a, o = { iceServers: a.iceServers ?? [] }, i = {
    enabled: !0,
    host: a.host,
    signalingAddress: n,
    rtcConfig: o,
    noReconnect: a.noReconnect,
    reconnectMaxWait: a.reconnectMaxWait,
    reconnectMaxAttempts: a.reconnectMaxAttempts
  };
  let r;
  a.disableSessions && (r = { disabled: !0 });
  const c = new A(e, i, r);
  return await c.connect({
    priority: a.priority,
    dialTimeout: a.dialTimeout ?? vt,
    creds: a.credentials
  }), console.debug("connected via WebRTC"), c;
}, _1 = (a) => {
  const e = a;
  return typeof e.signalingAddress != "string" ? !1 : !e.iceServers || Array.isArray(e.iceServers);
}, S1 = async (a) => {
  I1(a);
  const e = {
    retry: (n, t) => (console.debug(
      `Failed to connect, attempt ${t} with backoff`,
      n
    ), !a.reconnectAbortSignal?.abort)
  };
  if (a.reconnectMaxWait !== void 0 && (e.maxDelay = a.reconnectMaxWait), a.reconnectMaxAttempts !== void 0 && (e.numOfAttempts = a.reconnectMaxAttempts), _1(a) && !a.reconnectAbortSignal?.abort)
    try {
      return a.noReconnect ? await Oi(a) : await Va(async () => Oi(a), e);
    } catch {
      console.debug("Failed to connect via WebRTC");
    }
  if (!a.reconnectAbortSignal?.abort)
    try {
      return a.noReconnect ? await wi(a) : await Va(async () => wi(a), e);
    } catch {
      console.debug("Failed to connect via gRPC");
    }
  throw new Error("Failed to connect to robot");
}, I1 = (a) => {
  if (a.credentials && Dn(a.credentials))
    try {
      a.credentials.authEntity = new URL(a.credentials.authEntity).host;
    } catch (e) {
      if (!(e instanceof TypeError))
        throw e;
    }
  if (a.reconnectMaxAttempts !== void 0 && !Ei(a.reconnectMaxAttempts))
    throw new Error(
      `Value of max reconnect attempts (${a.reconnectMaxAttempts}) should be a positive integer`
    );
  if (a.reconnectMaxWait !== void 0 && !Ei(a.reconnectMaxWait))
    throw new Error(
      `Value of max reconnect wait (${a.reconnectMaxWait}) should be a positive integer`
    );
}, en = /* @__PURE__ */ s.makeEnum(
  "viam.app.mltraining.v1.ModelType",
  [
    { no: 0, name: "MODEL_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "MODEL_TYPE_SINGLE_LABEL_CLASSIFICATION", localName: "SINGLE_LABEL_CLASSIFICATION" },
    { no: 2, name: "MODEL_TYPE_MULTI_LABEL_CLASSIFICATION", localName: "MULTI_LABEL_CLASSIFICATION" },
    { no: 3, name: "MODEL_TYPE_OBJECT_DETECTION", localName: "OBJECT_DETECTION" }
  ]
), nn = /* @__PURE__ */ s.makeEnum(
  "viam.app.mltraining.v1.ModelFramework",
  [
    { no: 0, name: "MODEL_FRAMEWORK_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "MODEL_FRAMEWORK_TFLITE", localName: "TFLITE" },
    { no: 2, name: "MODEL_FRAMEWORK_TENSORFLOW", localName: "TENSORFLOW" },
    { no: 3, name: "MODEL_FRAMEWORK_PYTORCH", localName: "PYTORCH" },
    { no: 4, name: "MODEL_FRAMEWORK_ONNX", localName: "ONNX" }
  ]
), Io = /* @__PURE__ */ s.makeEnum(
  "viam.app.mltraining.v1.TrainingStatus",
  [
    { no: 0, name: "TRAINING_STATUS_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "TRAINING_STATUS_PENDING", localName: "PENDING" },
    { no: 2, name: "TRAINING_STATUS_IN_PROGRESS", localName: "IN_PROGRESS" },
    { no: 3, name: "TRAINING_STATUS_COMPLETED", localName: "COMPLETED" },
    { no: 4, name: "TRAINING_STATUS_FAILED", localName: "FAILED" },
    { no: 5, name: "TRAINING_STATUS_CANCELED", localName: "CANCELED" },
    { no: 6, name: "TRAINING_STATUS_CANCELING", localName: "CANCELING" }
  ]
), Hd = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.SubmitTrainingJobRequest",
  () => [
    {
      no: 7,
      name: "dataset_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "model_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "model_version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "model_type", kind: "enum", T: s.getEnumType(en) },
    { no: 8, name: "model_framework", kind: "enum", T: s.getEnumType(nn) },
    { no: 6, name: "tags", kind: "scalar", T: 9, repeated: !0 }
  ]
), Kd = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.SubmitTrainingJobResponse",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Xd = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.SubmitCustomTrainingJobRequest",
  () => [
    {
      no: 1,
      name: "dataset_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "registry_item_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 6,
      name: "registry_item_version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "model_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "model_version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 7, name: "arguments", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    } }
  ]
), Qd = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.SubmitCustomTrainingJobResponse",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Zd = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.GetTrainingJobRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ep = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.GetTrainingJobResponse",
  () => [
    { no: 1, name: "metadata", kind: "message", T: bo }
  ]
), np = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.ListTrainingJobsRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "status", kind: "enum", T: s.getEnumType(Io) }
  ]
), ap = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.ListTrainingJobsResponse",
  () => [
    { no: 1, name: "jobs", kind: "message", T: bo, repeated: !0 }
  ]
), bo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.TrainingJobMetadata",
  () => [
    {
      no: 7,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 11,
      name: "dataset_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 12,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 13,
      name: "model_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 14,
      name: "model_version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 15, name: "model_type", kind: "enum", T: s.getEnumType(en) },
    { no: 17, name: "model_framework", kind: "enum", T: s.getEnumType(nn) },
    {
      no: 18,
      name: "is_custom_job",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 19,
      name: "registry_item_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 20,
      name: "registry_item_version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "status", kind: "enum", T: s.getEnumType(Io) },
    { no: 8, name: "error_status", kind: "message", T: ln },
    { no: 3, name: "created_on", kind: "message", T: _ },
    { no: 4, name: "last_modified", kind: "message", T: _ },
    { no: 9, name: "training_started", kind: "message", T: _ },
    { no: 10, name: "training_ended", kind: "message", T: _ },
    {
      no: 5,
      name: "synced_model_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 16, name: "tags", kind: "scalar", T: 9, repeated: !0 },
    { no: 21, name: "arguments", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    } }
  ]
), tp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.CancelTrainingJobRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), sp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.CancelTrainingJobResponse",
  []
), op = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.DeleteCompletedTrainingJobRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ip = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.DeleteCompletedTrainingJobResponse",
  []
), rp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.TrainingJobLogEntry",
  () => [
    {
      no: 1,
      name: "level",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "time", kind: "message", T: _ },
    {
      no: 3,
      name: "message",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), mp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.GetTrainingJobLogsRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "page_token", kind: "scalar", T: 9, opt: !0 }
  ]
), cp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.mltraining.v1.GetTrainingJobLogsResponse",
  () => [
    { no: 1, name: "logs", kind: "message", T: rp, repeated: !0 },
    {
      no: 2,
      name: "next_page_token",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), V_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CancelTrainingJobRequest: tp,
  CancelTrainingJobResponse: sp,
  DeleteCompletedTrainingJobRequest: op,
  DeleteCompletedTrainingJobResponse: ip,
  GetTrainingJobLogsRequest: mp,
  GetTrainingJobLogsResponse: cp,
  GetTrainingJobRequest: Zd,
  GetTrainingJobResponse: ep,
  ListTrainingJobsRequest: np,
  ListTrainingJobsResponse: ap,
  ModelFramework: nn,
  ModelType: en,
  SubmitCustomTrainingJobRequest: Xd,
  SubmitCustomTrainingJobResponse: Qd,
  SubmitTrainingJobRequest: Hd,
  SubmitTrainingJobResponse: Kd,
  TrainingJobLogEntry: rp,
  TrainingJobMetadata: bo,
  TrainingStatus: Io
}, Symbol.toStringTag, { value: "Module" })), ba = /* @__PURE__ */ s.makeEnum(
  "viam.app.packages.v1.PackageType",
  [
    { no: 0, name: "PACKAGE_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "PACKAGE_TYPE_ARCHIVE", localName: "ARCHIVE" },
    { no: 2, name: "PACKAGE_TYPE_ML_MODEL", localName: "ML_MODEL" },
    { no: 3, name: "PACKAGE_TYPE_MODULE", localName: "MODULE" },
    { no: 4, name: "PACKAGE_TYPE_SLAM_MAP", localName: "SLAM_MAP" },
    { no: 5, name: "PACKAGE_TYPE_ML_TRAINING", localName: "ML_TRAINING" }
  ]
), lp = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.AuthenticationType",
  [
    { no: 0, name: "AUTHENTICATION_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "AUTHENTICATION_TYPE_WEB_OAUTH", localName: "WEB_OAUTH" },
    { no: 2, name: "AUTHENTICATION_TYPE_API_KEY", localName: "API_KEY" },
    { no: 3, name: "AUTHENTICATION_TYPE_ROBOT_PART_SECRET", localName: "ROBOT_PART_SECRET" },
    { no: 4, name: "AUTHENTICATION_TYPE_LOCATION_SECRET", localName: "LOCATION_SECRET" }
  ]
), qn = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.FragmentVisibility",
  [
    { no: 0, name: "FRAGMENT_VISIBILITY_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "FRAGMENT_VISIBILITY_PRIVATE", localName: "PRIVATE" },
    { no: 2, name: "FRAGMENT_VISIBILITY_PUBLIC", localName: "PUBLIC" },
    { no: 3, name: "FRAGMENT_VISIBILITY_PUBLIC_UNLISTED", localName: "PUBLIC_UNLISTED" }
  ]
), dp = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.FragmentErrorType",
  [
    { no: 0, name: "FRAGMENT_ERROR_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "FRAGMENT_ERROR_TYPE_NO_ACCESS", localName: "NO_ACCESS" },
    { no: 2, name: "FRAGMENT_ERROR_TYPE_NESTING_LIMIT_EXCEEDED", localName: "NESTING_LIMIT_EXCEEDED" },
    { no: 3, name: "FRAGMENT_ERROR_TYPE_CHILD_ID_INVALID", localName: "CHILD_ID_INVALID" },
    { no: 4, name: "FRAGMENT_ERROR_TYPE_CYCLE_DETECTED", localName: "CYCLE_DETECTED" }
  ]
), pp = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.RegistryItemStatus",
  [
    { no: 0, name: "REGISTRY_ITEM_STATUS_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "REGISTRY_ITEM_STATUS_PUBLISHED", localName: "PUBLISHED" },
    { no: 2, name: "REGISTRY_ITEM_STATUS_IN_DEVELOPMENT", localName: "IN_DEVELOPMENT" }
  ]
), pn = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.Visibility",
  [
    { no: 0, name: "VISIBILITY_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "VISIBILITY_PRIVATE", localName: "PRIVATE" },
    { no: 2, name: "VISIBILITY_PUBLIC", localName: "PUBLIC" },
    { no: 3, name: "VISIBILITY_PUBLIC_UNLISTED", localName: "PUBLIC_UNLISTED" }
  ]
), up = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.AppType",
  [
    { no: 0, name: "APP_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "APP_TYPE_SINGLE_MACHINE", localName: "SINGLE_MACHINE" },
    { no: 2, name: "APP_TYPE_MULTI_MACHINE", localName: "MULTI_MACHINE" }
  ]
), gp = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.ClientAuthentication",
  [
    { no: 0, name: "CLIENT_AUTHENTICATION_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "CLIENT_AUTHENTICATION_REQUIRED", localName: "REQUIRED" },
    { no: 2, name: "CLIENT_AUTHENTICATION_NOT_REQUIRED", localName: "NOT_REQUIRED" },
    { no: 3, name: "CLIENT_AUTHENTICATION_NOT_REQUIRED_WHEN_USING_PKCE", localName: "NOT_REQUIRED_WHEN_USING_PKCE" }
  ]
), Tp = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.PKCE",
  [
    { no: 0, name: "PKCE_UNSPECIFIED" },
    { no: 1, name: "PKCE_REQUIRED" },
    { no: 2, name: "PKCE_NOT_REQUIRED" },
    { no: 3, name: "PKCE_NOT_REQUIRED_WHEN_USING_CLIENT_AUTHENTICATION" }
  ]
), kp = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.URLValidation",
  [
    { no: 0, name: "URL_VALIDATION_UNSPECIFIED" },
    { no: 1, name: "URL_VALIDATION_EXACT_MATCH" },
    { no: 2, name: "URL_VALIDATION_ALLOW_WILDCARDS" }
  ]
), yp = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.EnabledGrant",
  [
    { no: 0, name: "ENABLED_GRANT_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "ENABLED_GRANT_AUTHORIZATION_CODE", localName: "AUTHORIZATION_CODE" },
    { no: 2, name: "ENABLED_GRANT_IMPLICIT", localName: "IMPLICIT" },
    { no: 3, name: "ENABLED_GRANT_PASSWORD", localName: "PASSWORD" },
    { no: 4, name: "ENABLED_GRANT_REFRESH_TOKEN", localName: "REFRESH_TOKEN" },
    { no: 5, name: "ENABLED_GRANT_DEVICE_CODE", localName: "DEVICE_CODE" }
  ]
), un = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Robot",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "location",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "last_access", kind: "message", T: _ },
    { no: 5, name: "created_on", kind: "message", T: _ }
  ]
), an = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RobotPart",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 10,
      name: "dns_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "secret",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "robot",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 12,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "robot_config", kind: "message", T: l },
    { no: 6, name: "last_access", kind: "message", T: _ },
    { no: 7, name: "user_supplied_info", kind: "message", T: l },
    {
      no: 8,
      name: "main_part",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 9,
      name: "fqdn",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 11,
      name: "local_fqdn",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 13, name: "created_on", kind: "message", T: _ },
    { no: 14, name: "secrets", kind: "message", T: wo, repeated: !0 },
    { no: 15, name: "last_updated", kind: "message", T: _ }
  ]
), vp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RobotPartHistoryEntry",
  () => [
    {
      no: 1,
      name: "part",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "robot",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "when", kind: "message", T: _ },
    { no: 4, name: "old", kind: "message", T: an },
    { no: 5, name: "edited_by", kind: "message", T: Mo }
  ]
), Mo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.AuthenticatorInfo",
  () => [
    { no: 1, name: "type", kind: "enum", T: s.getEnumType(lp) },
    {
      no: 2,
      name: "value",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "is_deactivated",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), hp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListOrganizationsRequest",
  []
), gn = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Organization",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "created_on", kind: "message", T: _ },
    {
      no: 4,
      name: "public_namespace",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "default_region",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 6, name: "cid", kind: "scalar", T: 9, opt: !0 }
  ]
), fp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrganizationMember",
  () => [
    {
      no: 1,
      name: "user_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "emails", kind: "scalar", T: 9, repeated: !0 },
    { no: 3, name: "date_added", kind: "message", T: _ },
    { no: 4, name: "last_login", kind: "message", T: _, opt: !0 },
    { no: 5, name: "last_access", kind: "message", T: _, opt: !0 }
  ]
), Rp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListOrganizationsResponse",
  () => [
    { no: 1, name: "organizations", kind: "message", T: gn, repeated: !0 }
  ]
), Un = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrganizationInvite",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "email",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "created_on", kind: "message", T: _ },
    { no: 4, name: "authorizations", kind: "message", T: Q, repeated: !0 }
  ]
), _p = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateOrganizationRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Sp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateOrganizationResponse",
  () => [
    { no: 1, name: "organization", kind: "message", T: gn }
  ]
), Ip = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetOrganizationRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), bp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetOrganizationResponse",
  () => [
    { no: 1, name: "organization", kind: "message", T: gn }
  ]
), Mp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetOrganizationNamespaceAvailabilityRequest",
  () => [
    {
      no: 1,
      name: "public_namespace",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ep = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetOrganizationNamespaceAvailabilityResponse",
  () => [
    {
      no: 1,
      name: "available",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), wp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOrganizationRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "name", kind: "scalar", T: 9, opt: !0 },
    { no: 3, name: "public_namespace", kind: "scalar", T: 9, opt: !0 },
    { no: 4, name: "region", kind: "scalar", T: 9, opt: !0 },
    { no: 5, name: "cid", kind: "scalar", T: 9, opt: !0 }
  ]
), Op = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOrganizationResponse",
  () => [
    { no: 1, name: "organization", kind: "message", T: gn }
  ]
), Cp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOrganizationNamespaceRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "new_public_namespace",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Np = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOrganizationNamespaceResponse",
  () => [
    { no: 1, name: "organization", kind: "message", T: gn }
  ]
), Pp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteOrganizationRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Dp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteOrganizationResponse",
  []
), Ap = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetOrganizationMetadataRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), qp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetOrganizationMetadataResponse",
  () => [
    { no: 1, name: "data", kind: "message", T: l }
  ]
), Up = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOrganizationMetadataRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "data", kind: "message", T: l }
  ]
), Lp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOrganizationMetadataResponse",
  []
), Gp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListOrganizationMembersRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Bp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListOrganizationMembersResponse",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "members", kind: "message", T: fp, repeated: !0 },
    { no: 3, name: "invites", kind: "message", T: Un, repeated: !0 }
  ]
), xp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateOrganizationInviteRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "email",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "authorizations", kind: "message", T: Q, repeated: !0 },
    { no: 4, name: "send_email_invite", kind: "scalar", T: 8, opt: !0 }
  ]
), Fp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateOrganizationInviteResponse",
  () => [
    { no: 1, name: "invite", kind: "message", T: Un }
  ]
), Jp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOrganizationInviteAuthorizationsRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "email",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "add_authorizations", kind: "message", T: Q, repeated: !0 },
    { no: 4, name: "remove_authorizations", kind: "message", T: Q, repeated: !0 }
  ]
), zp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOrganizationInviteAuthorizationsResponse",
  () => [
    { no: 1, name: "invite", kind: "message", T: Un }
  ]
), Yp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteOrganizationInviteRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "email",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), $p = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteOrganizationInviteResponse",
  []
), Vp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ResendOrganizationInviteRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "email",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "send_email_invite", kind: "scalar", T: 8, opt: !0 }
  ]
), Wp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ResendOrganizationInviteResponse",
  () => [
    { no: 1, name: "invite", kind: "message", T: Un }
  ]
), jp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteOrganizationMemberRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "user_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Hp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteOrganizationMemberResponse",
  []
), Ma = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.BillingAddress",
  () => [
    {
      no: 1,
      name: "address_line_1",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "address_line_2", kind: "scalar", T: 9, opt: !0 },
    {
      no: 3,
      name: "city",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "state",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "zipcode",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 6,
      name: "country",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Kp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.EnableBillingServiceRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "billing_address", kind: "message", T: Ma }
  ]
), Xp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.EnableBillingServiceResponse",
  []
), Qp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateBillingServiceRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "billing_address", kind: "message", T: Ma }
  ]
), Zp = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateBillingServiceResponse",
  []
), eu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetBillingServiceConfigRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), nu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetBillingServiceConfigResponse",
  () => [
    { no: 1, name: "billing_address", kind: "message", T: Ma },
    {
      no: 2,
      name: "support_email",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "logo_url",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "billing_dashboard_url",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), au = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DisableBillingServiceRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), tu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DisableBillingServiceResponse",
  []
), su = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrganizationSetSupportEmailRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "email",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ou = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrganizationSetSupportEmailResponse",
  []
), iu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrganizationGetSupportEmailRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ru = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrganizationGetSupportEmailResponse",
  () => [
    {
      no: 1,
      name: "email",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Eo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrganizationIdentity",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), mu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.LocationOrganization",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "primary",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Ea = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.LocationAuth",
  () => [
    {
      no: 1,
      name: "secret",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "secrets", kind: "message", T: wo, repeated: !0 }
  ]
), cu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.StorageConfig",
  () => [
    {
      no: 1,
      name: "region",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ln = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Location",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "parent_location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "auth", kind: "message", T: Ea },
    { no: 6, name: "organizations", kind: "message", T: mu, repeated: !0 },
    { no: 3, name: "created_on", kind: "message", T: _ },
    {
      no: 7,
      name: "robot_count",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    { no: 8, name: "config", kind: "message", T: cu },
    { no: 9, name: "primary_org_identity", kind: "message", T: Eo, opt: !0 }
  ]
), wo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.SharedSecret",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "secret",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "created_on", kind: "message", T: _ },
    { no: 4, name: "state", kind: "enum", T: s.getEnumType(Oo) }
  ]
), Oo = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.SharedSecret.State",
  [
    { no: 0, name: "STATE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "STATE_ENABLED", localName: "ENABLED" },
    { no: 2, name: "STATE_DISABLED", localName: "DISABLED" }
  ]
), lu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateLocationRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "parent_location_id", kind: "scalar", T: 9, opt: !0 }
  ]
), du = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateLocationResponse",
  () => [
    { no: 1, name: "location", kind: "message", T: Ln }
  ]
), pu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetLocationRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), uu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetLocationResponse",
  () => [
    { no: 1, name: "location", kind: "message", T: Ln }
  ]
), gu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateLocationRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "name", kind: "scalar", T: 9, opt: !0 },
    { no: 3, name: "parent_location_id", kind: "scalar", T: 9, opt: !0 },
    { no: 4, name: "region", kind: "scalar", T: 9, opt: !0 }
  ]
), Tu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateLocationResponse",
  () => [
    { no: 1, name: "location", kind: "message", T: Ln }
  ]
), ku = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteLocationRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), yu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteLocationResponse",
  []
), vu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetLocationMetadataRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), hu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetLocationMetadataResponse",
  () => [
    { no: 1, name: "data", kind: "message", T: l }
  ]
), fu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateLocationMetadataRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "data", kind: "message", T: l }
  ]
), Ru = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateLocationMetadataResponse",
  []
), _u = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetOrganizationsWithAccessToLocationRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Su = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetOrganizationsWithAccessToLocationResponse",
  () => [
    { no: 1, name: "organization_identities", kind: "message", T: Eo, repeated: !0 }
  ]
), Iu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListLocationsRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), bu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ShareLocationRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Mu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ShareLocationResponse",
  []
), Eu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UnshareLocationRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), wu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UnshareLocationResponse",
  []
), Ou = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListLocationsResponse",
  () => [
    { no: 1, name: "locations", kind: "message", T: Ln, repeated: !0 }
  ]
), Cu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateLocationSecretRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Nu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateLocationSecretResponse",
  () => [
    { no: 1, name: "auth", kind: "message", T: Ea }
  ]
), Pu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteLocationSecretRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "secret_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Du = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteLocationSecretResponse",
  []
), Au = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.LocationAuthRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), qu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.LocationAuthResponse",
  () => [
    { no: 1, name: "auth", kind: "message", T: Ea }
  ]
), Uu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Lu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRoverRentalRobotsRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Gu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RoverRentalRobot",
  () => [
    {
      no: 1,
      name: "robot_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "robot_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "robot_main_part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Bu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRoverRentalRobotsResponse",
  () => [
    { no: 1, name: "robots", kind: "message", T: Gu, repeated: !0 }
  ]
), xu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotResponse",
  () => [
    { no: 1, name: "robot", kind: "message", T: un }
  ]
), Fu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartsRequest",
  () => [
    {
      no: 1,
      name: "robot_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ju = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartsResponse",
  () => [
    { no: 1, name: "parts", kind: "message", T: an, repeated: !0 }
  ]
), zu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Yu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartResponse",
  () => [
    { no: 1, name: "part", kind: "message", T: an },
    {
      no: 2,
      name: "config_json",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), $u = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartByNameAndLocationRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Vu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartByNameAndLocationResponse",
  () => [
    { no: 1, name: "part", kind: "message", T: an }
  ]
), Wu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartLogsRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "errors_only",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 3, name: "filter", kind: "scalar", T: 9, opt: !0 },
    { no: 4, name: "page_token", kind: "scalar", T: 9, opt: !0 },
    { no: 5, name: "levels", kind: "scalar", T: 9, repeated: !0 },
    { no: 6, name: "start", kind: "message", T: _, opt: !0 },
    { no: 7, name: "end", kind: "message", T: _, opt: !0 },
    { no: 8, name: "limit", kind: "scalar", T: 3, opt: !0 },
    { no: 9, name: "source", kind: "scalar", T: 9, opt: !0 }
  ]
), ju = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartLogsResponse",
  () => [
    { no: 1, name: "logs", kind: "message", T: Pn, repeated: !0 },
    {
      no: 2,
      name: "next_page_token",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Hu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.TailRobotPartLogsRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "errors_only",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 3, name: "filter", kind: "scalar", T: 9, opt: !0 }
  ]
), Ku = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.TailRobotPartLogsResponse",
  () => [
    { no: 1, name: "logs", kind: "message", T: Pn, repeated: !0 }
  ]
), Xu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartHistoryRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Qu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartHistoryResponse",
  () => [
    { no: 1, name: "history", kind: "message", T: vp, repeated: !0 }
  ]
), Zu = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateRobotPartRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "robot_config", kind: "message", T: l },
    { no: 4, name: "last_known_update", kind: "message", T: _, opt: !0 }
  ]
), eg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateRobotPartResponse",
  () => [
    { no: 1, name: "part", kind: "message", T: an }
  ]
), ng = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.NewRobotPartRequest",
  () => [
    {
      no: 1,
      name: "robot_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "part_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ag = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.NewRobotPartResponse",
  () => [
    {
      no: 1,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), tg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteRobotPartRequest",
  () => [
    {
      no: 1,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), sg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartMetadataRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), og = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotPartMetadataResponse",
  () => [
    { no: 1, name: "data", kind: "message", T: l }
  ]
), ig = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateRobotPartMetadataRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "data", kind: "message", T: l }
  ]
), rg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateRobotPartMetadataResponse",
  []
), mg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotAPIKeysRequest",
  () => [
    {
      no: 1,
      name: "robot_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), cg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.APIKey",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "created_on", kind: "message", T: _ }
  ]
), lg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotAPIKeysResponse",
  () => [
    { no: 1, name: "api_keys", kind: "message", T: Lo, repeated: !0 }
  ]
), dg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteRobotPartResponse",
  []
), Ye = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Fragment",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "fragment", kind: "message", T: l },
    {
      no: 4,
      name: "organization_owner",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "public",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 6, name: "created_on", kind: "message", T: _ },
    {
      no: 7,
      name: "organization_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 9,
      name: "robot_part_count",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 10,
      name: "organization_count",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 11,
      name: "only_used_by_owner",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 12, name: "visibility", kind: "enum", T: s.getEnumType(qn) },
    { no: 13, name: "last_updated", kind: "message", T: _ },
    {
      no: 14,
      name: "revision",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), pg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.FragmentHistoryEntry",
  () => [
    {
      no: 1,
      name: "fragment",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "edited_on", kind: "message", T: _ },
    { no: 3, name: "old", kind: "message", T: Ye },
    { no: 4, name: "edited_by", kind: "message", T: Mo },
    {
      no: 5,
      name: "revision",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 6, name: "config", kind: "message", T: l }
  ]
), ug = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.FragmentRevision",
  () => [
    {
      no: 1,
      name: "revision",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "created_at", kind: "message", T: _ }
  ]
), wa = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.FragmentTag",
  () => [
    {
      no: 1,
      name: "tag",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "revision",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), gg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.FragmentError",
  () => [
    { no: 1, name: "error_type", kind: "enum", T: s.getEnumType(dp) },
    {
      no: 2,
      name: "fragment_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "detail",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Oa = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.FragmentUsage",
  () => [
    {
      no: 1,
      name: "fragment_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "organizations",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 3,
      name: "machines",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 4,
      name: "machines_in_current_org",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    { no: 5, name: "version", kind: "scalar", T: 9, opt: !0 }
  ]
), Co = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ResolvedFragment",
  () => [
    {
      no: 1,
      name: "fragment_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "resolved_config", kind: "message", T: l },
    { no: 3, name: "error", kind: "message", T: gg },
    {
      no: 4,
      name: "revision",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Tg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListFragmentsRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "show_public",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 3, name: "fragment_visibility", kind: "enum", T: s.getEnumType(qn), repeated: !0 }
  ]
), kg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListFragmentsResponse",
  () => [
    { no: 1, name: "fragments", kind: "message", T: Ye, repeated: !0 },
    { no: 2, name: "fragment_usages", kind: "message", T: Oa, repeated: !0 }
  ]
), yg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetFragmentRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "current_organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "version", kind: "scalar", T: 9, opt: !0 }
  ]
), vg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetFragmentResponse",
  () => [
    { no: 1, name: "fragment", kind: "message", T: Ye },
    { no: 2, name: "fragment_usage", kind: "message", T: Oa },
    { no: 3, name: "revisions", kind: "message", T: ug, repeated: !0 },
    { no: 4, name: "tags", kind: "message", T: wa, repeated: !0 }
  ]
), hg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateFragmentRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "config", kind: "message", T: l },
    {
      no: 3,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "visibility", kind: "enum", T: s.getEnumType(qn), opt: !0 }
  ]
), fg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateFragmentResponse",
  () => [
    { no: 1, name: "fragment", kind: "message", T: Ye }
  ]
), Rg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateFragmentRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "config", kind: "message", T: l },
    { no: 4, name: "public", kind: "scalar", T: 8, opt: !0 },
    { no: 5, name: "visibility", kind: "enum", T: s.getEnumType(qn), opt: !0 },
    { no: 6, name: "last_known_update", kind: "message", T: _, opt: !0 }
  ]
), _g = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateFragmentResponse",
  () => [
    { no: 1, name: "fragment", kind: "message", T: Ye }
  ]
), Sg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteFragmentRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ig = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteFragmentResponse",
  []
), bg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetFragmentHistoryRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "page_token", kind: "scalar", T: 9, opt: !0 },
    { no: 3, name: "page_limit", kind: "scalar", T: 3, opt: !0 }
  ]
), Mg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetFragmentHistoryResponse",
  () => [
    { no: 1, name: "history", kind: "message", T: pg, repeated: !0 },
    {
      no: 2,
      name: "next_page_token",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Eg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetFragmentUsageRequest",
  () => [
    {
      no: 1,
      name: "fragment_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), wg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetFragmentUsageResponse",
  () => [
    { no: 1, name: "version_usages", kind: "message", T: Oa, repeated: !0 }
  ]
), Og = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.SetFragmentTagRequest",
  () => [
    {
      no: 1,
      name: "fragment_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "tag",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "revision",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Cg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.SetFragmentTagResponse",
  () => [
    { no: 1, name: "tags", kind: "message", T: wa, repeated: !0 }
  ]
), Ng = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteFragmentTagRequest",
  () => [
    {
      no: 1,
      name: "fragment_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "tag",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Pg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteFragmentTagResponse",
  () => [
    { no: 1, name: "tags", kind: "message", T: wa, repeated: !0 }
  ]
), Dg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListRobotsRequest",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ag = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListRobotsForLocationsRequest",
  () => [
    { no: 1, name: "location_ids", kind: "scalar", T: 9, repeated: !0 }
  ]
), qg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListRobotsForOrgRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), No = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.AdditionalFragment",
  () => [
    {
      no: 1,
      name: "fragment_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "version", kind: "scalar", T: 9, opt: !0 }
  ]
), Ug = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListNestedFragmentsRequest",
  () => [
    { no: 1, name: "fragment_id", kind: "scalar", T: 9, opt: !0 },
    { no: 2, name: "additional_fragments", kind: "message", T: No, repeated: !0 }
  ]
), Lg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListNestedFragmentsResponse",
  () => [
    { no: 1, name: "fragments", kind: "message", T: Ye, repeated: !0 },
    { no: 2, name: "resolved_fragments", kind: "message", T: Co, repeated: !0 }
  ]
), Gg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListMachineFragmentsRequest",
  () => [
    {
      no: 1,
      name: "machine_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "additional_fragment_ids", kind: "scalar", T: 9, repeated: !0 },
    { no: 3, name: "additional_fragments", kind: "message", T: No, repeated: !0 }
  ]
), Bg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListMachineFragmentsResponse",
  () => [
    { no: 1, name: "fragments", kind: "message", T: Ye, repeated: !0 },
    { no: 2, name: "resolved_fragments", kind: "message", T: Co, repeated: !0 }
  ]
), Po = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListMachineSummariesRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "fragment_ids", kind: "scalar", T: 9, repeated: !0 },
    { no: 3, name: "location_ids", kind: "scalar", T: 9, repeated: !0 },
    { no: 4, name: "limit", kind: "scalar", T: 5, opt: !0 }
  ]
), xg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListMachineSummariesResponse",
  () => [
    { no: 1, name: "location_summaries", kind: "message", T: Fg, repeated: !0 }
  ]
), Fg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.LocationSummary",
  () => [
    {
      no: 1,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "location_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "machine_summaries", kind: "message", T: Jg, repeated: !0 }
  ]
), Jg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.MachineSummary",
  () => [
    {
      no: 1,
      name: "machine_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "machine_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "part_summaries", kind: "message", T: Vg, repeated: !0 }
  ]
), zg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.FragmentSummary",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Yg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ViamServerVersion",
  () => [
    { no: 1, name: "major", kind: "scalar", T: 9, oneof: "version" },
    { no: 2, name: "minor", kind: "scalar", T: 9, oneof: "version" }
  ]
), $g = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ViamAgentVersion",
  () => [
    { no: 1, name: "major", kind: "scalar", T: 9, oneof: "version" },
    { no: 2, name: "minor", kind: "scalar", T: 9, oneof: "version" }
  ]
), Vg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.PartSummary",
  () => [
    {
      no: 1,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "part_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "last_online", kind: "message", T: _, opt: !0 },
    { no: 4, name: "viam_server_version", kind: "message", T: Yg, opt: !0 },
    { no: 5, name: "viam_agent_version", kind: "message", T: $g, opt: !0 },
    { no: 6, name: "os", kind: "scalar", T: 9, opt: !0 },
    { no: 7, name: "platform", kind: "scalar", T: 9, opt: !0 },
    { no: 8, name: "public_ip_address", kind: "scalar", T: 9, opt: !0 },
    { no: 9, name: "fragments", kind: "message", T: zg, repeated: !0 }
  ]
), Wg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListRobotsResponse",
  () => [
    { no: 1, name: "robots", kind: "message", T: un, repeated: !0 }
  ]
), jg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListRobotsForLocationsResponse",
  () => [
    { no: 1, name: "robots", kind: "message", T: un, repeated: !0 }
  ]
), Hg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListRobotsForOrgResponse",
  () => [
    { no: 1, name: "robots", kind: "message", T: un, repeated: !0 }
  ]
), Kg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.NewRobotRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "location",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Xg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.NewRobotResponse",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Qg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateRobotRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "location",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Zg = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateRobotResponse",
  () => [
    { no: 1, name: "robot", kind: "message", T: un }
  ]
), eT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteRobotRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), nT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteRobotResponse",
  []
), aT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotMetadataRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), tT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRobotMetadataResponse",
  () => [
    { no: 1, name: "data", kind: "message", T: l }
  ]
), sT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateRobotMetadataRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "data", kind: "message", T: l }
  ]
), oT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateRobotMetadataResponse",
  []
), iT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.MarkPartAsMainRequest",
  () => [
    {
      no: 1,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), rT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.MarkPartAsMainResponse",
  []
), mT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.MarkPartForRestartRequest",
  () => [
    {
      no: 1,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), cT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.MarkPartForRestartResponse",
  []
), lT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateRobotPartSecretRequest",
  () => [
    {
      no: 1,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), dT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateRobotPartSecretResponse",
  () => [
    { no: 1, name: "part", kind: "message", T: an }
  ]
), pT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteRobotPartSecretRequest",
  () => [
    {
      no: 1,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "secret_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), uT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteRobotPartSecretResponse",
  []
), Q = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Authorization",
  () => [
    {
      no: 1,
      name: "authorization_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "authorization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "resource_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "resource_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "identity_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 6,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 7,
      name: "identity_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), gT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.AddRoleRequest",
  () => [
    { no: 1, name: "authorization", kind: "message", T: Q }
  ]
), TT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.AddRoleResponse",
  []
), kT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RemoveRoleRequest",
  () => [
    { no: 1, name: "authorization", kind: "message", T: Q }
  ]
), yT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RemoveRoleResponse",
  []
), vT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ChangeRoleRequest",
  () => [
    { no: 1, name: "old_authorization", kind: "message", T: Q },
    { no: 2, name: "new_authorization", kind: "message", T: Q }
  ]
), hT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ChangeRoleResponse",
  []
), fT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListAuthorizationsRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "resource_ids", kind: "scalar", T: 9, repeated: !0 }
  ]
), RT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListAuthorizationsResponse",
  () => [
    { no: 1, name: "authorizations", kind: "message", T: Q, repeated: !0 }
  ]
), _T = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CheckPermissionsRequest",
  () => [
    { no: 1, name: "permissions", kind: "message", T: Do, repeated: !0 }
  ]
), Do = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.AuthorizedPermissions",
  () => [
    {
      no: 1,
      name: "resource_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "resource_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "permissions", kind: "scalar", T: 9, repeated: !0 }
  ]
), ST = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CheckPermissionsResponse",
  () => [
    { no: 1, name: "authorized_permissions", kind: "message", T: Do, repeated: !0 }
  ]
), IT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ModuleVersion",
  () => [
    {
      no: 1,
      name: "version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "files", kind: "message", T: qo, repeated: !0 },
    { no: 3, name: "models", kind: "message", T: sn, repeated: !0 },
    {
      no: 4,
      name: "entrypoint",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "first_run", kind: "scalar", T: 9, opt: !0 },
    { no: 6, name: "markdown_description", kind: "scalar", T: 9, opt: !0 },
    { no: 7, name: "apps", kind: "message", T: tn, repeated: !0 }
  ]
), bT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ModuleMetadata",
  () => [
    { no: 1, name: "models", kind: "message", T: sn, repeated: !0 },
    { no: 2, name: "versions", kind: "message", T: IT, repeated: !0 },
    {
      no: 3,
      name: "entrypoint",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "first_run", kind: "scalar", T: 9, opt: !0 },
    { no: 5, name: "markdown_description", kind: "scalar", T: 9, opt: !0 },
    { no: 6, name: "apps", kind: "message", T: tn, repeated: !0 }
  ]
), MT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.MLModelMetadata",
  () => [
    { no: 1, name: "versions", kind: "scalar", T: 9, repeated: !0 },
    { no: 2, name: "model_type", kind: "enum", T: s.getEnumType(en) },
    { no: 3, name: "model_framework", kind: "enum", T: s.getEnumType(nn) }
  ]
), ET = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.MLTrainingVersion",
  () => [
    {
      no: 1,
      name: "version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "created_on", kind: "message", T: _ }
  ]
), wT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.MLTrainingMetadata",
  () => [
    { no: 5, name: "versions", kind: "message", T: ET, repeated: !0 },
    { no: 2, name: "model_type", kind: "enum", T: s.getEnumType(en) },
    { no: 3, name: "model_framework", kind: "enum", T: s.getEnumType(nn) },
    {
      no: 4,
      name: "draft",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Ca = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RegistryItem",
  () => [
    {
      no: 1,
      name: "item_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "public_namespace",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "type", kind: "enum", T: s.getEnumType(ba) },
    { no: 6, name: "visibility", kind: "enum", T: s.getEnumType(pn) },
    {
      no: 7,
      name: "url",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 8,
      name: "description",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 9,
      name: "total_robot_usage",
      kind: "scalar",
      T: 3
      /* ScalarType.INT64 */
    },
    {
      no: 13,
      name: "total_external_robot_usage",
      kind: "scalar",
      T: 3
      /* ScalarType.INT64 */
    },
    {
      no: 10,
      name: "total_organization_usage",
      kind: "scalar",
      T: 3
      /* ScalarType.INT64 */
    },
    {
      no: 14,
      name: "total_external_organization_usage",
      kind: "scalar",
      T: 3
      /* ScalarType.INT64 */
    },
    { no: 11, name: "module_metadata", kind: "message", T: bT, oneof: "metadata" },
    { no: 12, name: "ml_model_metadata", kind: "message", T: MT, oneof: "metadata" },
    { no: 18, name: "ml_training_metadata", kind: "message", T: wT, oneof: "metadata" },
    { no: 15, name: "created_at", kind: "message", T: _ },
    { no: 16, name: "updated_at", kind: "message", T: _ }
  ]
), OT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRegistryItemRequest",
  () => [
    {
      no: 1,
      name: "item_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "include_markdown_documentation", kind: "scalar", T: 8, opt: !0 }
  ]
), CT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetRegistryItemResponse",
  () => [
    { no: 1, name: "item", kind: "message", T: Ca }
  ]
), NT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateRegistryItemRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "type", kind: "enum", T: s.getEnumType(ba) }
  ]
), PT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateRegistryItemResponse",
  []
), DT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateRegistryItemRequest",
  () => [
    {
      no: 1,
      name: "item_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "type", kind: "enum", T: s.getEnumType(ba) },
    {
      no: 3,
      name: "description",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "visibility", kind: "enum", T: s.getEnumType(pn) },
    { no: 5, name: "url", kind: "scalar", T: 9, opt: !0 },
    { no: 6, name: "update_module_metadata", kind: "message", T: WT, oneof: "metadata" },
    { no: 7, name: "update_ml_model_metadata", kind: "message", T: jT, oneof: "metadata" },
    { no: 8, name: "update_ml_training_metadata", kind: "message", T: HT, oneof: "metadata" },
    { no: 9, name: "markdown_description", kind: "scalar", T: 9, opt: !0 }
  ]
), AT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateRegistryItemResponse",
  []
), qT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListRegistryItemsRequest",
  () => [
    { no: 1, name: "organization_id", kind: "scalar", T: 9, opt: !0 },
    { no: 2, name: "types", kind: "enum", T: s.getEnumType(ba), repeated: !0 },
    { no: 3, name: "visibilities", kind: "enum", T: s.getEnumType(pn), repeated: !0 },
    { no: 4, name: "platforms", kind: "scalar", T: 9, repeated: !0 },
    { no: 5, name: "statuses", kind: "enum", T: s.getEnumType(pp), repeated: !0 },
    { no: 6, name: "search_term", kind: "scalar", T: 9, opt: !0 },
    { no: 7, name: "page_token", kind: "scalar", T: 9, opt: !0 },
    { no: 8, name: "public_namespaces", kind: "scalar", T: 9, repeated: !0 },
    { no: 9, name: "include_markdown_documentation", kind: "scalar", T: 8, opt: !0 }
  ]
), UT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListRegistryItemsResponse",
  () => [
    { no: 1, name: "items", kind: "message", T: Ca, repeated: !0 }
  ]
), LT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteRegistryItemRequest",
  () => [
    {
      no: 1,
      name: "item_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), GT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteRegistryItemResponse",
  []
), BT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RenameRegistryItemRequest",
  () => [
    {
      no: 1,
      name: "item_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "new_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), xT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RenameRegistryItemResponse",
  () => [
    { no: 1, name: "item", kind: "message", T: Ca }
  ]
), FT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.TransferRegistryItemRequest",
  () => [
    {
      no: 1,
      name: "item_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "new_public_namespace",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), JT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.TransferRegistryItemResponse",
  []
), zT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateModuleRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), YT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateModuleResponse",
  () => [
    {
      no: 1,
      name: "module_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "url",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), $T = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateModuleRequest",
  () => [
    {
      no: 1,
      name: "module_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "visibility", kind: "enum", T: s.getEnumType(pn) },
    {
      no: 3,
      name: "url",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "description",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "models", kind: "message", T: sn, repeated: !0 },
    {
      no: 6,
      name: "entrypoint",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 7, name: "first_run", kind: "scalar", T: 9, opt: !0 },
    { no: 8, name: "apps", kind: "message", T: tn, repeated: !0 },
    { no: 9, name: "markdown_description", kind: "scalar", T: 9, opt: !0 }
  ]
), tn = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.App",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "entrypoint",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "fragment_ids", kind: "scalar", T: 9, repeated: !0 },
    { no: 5, name: "logo_path", kind: "scalar", T: 9, opt: !0 },
    { no: 6, name: "customizations", kind: "message", T: Vk }
  ]
), VT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateModuleResponse",
  () => [
    {
      no: 1,
      name: "url",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), WT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateModuleMetadata",
  () => [
    { no: 1, name: "models", kind: "message", T: sn, repeated: !0 },
    {
      no: 2,
      name: "entrypoint",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "apps", kind: "message", T: tn, repeated: !0 }
  ]
), jT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateMLModelMetadata",
  () => [
    { no: 1, name: "model_type", kind: "enum", T: s.getEnumType(en) },
    { no: 2, name: "model_framework", kind: "enum", T: s.getEnumType(nn) }
  ]
), HT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateMLTrainingMetadata",
  () => [
    { no: 1, name: "model_type", kind: "enum", T: s.getEnumType(en) },
    { no: 2, name: "model_framework", kind: "enum", T: s.getEnumType(nn) },
    {
      no: 3,
      name: "draft",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), sn = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Model",
  () => [
    {
      no: 1,
      name: "api",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "model",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "markdown_documentation", kind: "scalar", T: 9, opt: !0 },
    { no: 4, name: "description", kind: "scalar", T: 9, opt: !0 },
    { no: 5, name: "supported_hardware", kind: "scalar", T: 9, repeated: !0 }
  ]
), KT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ModuleFileInfo",
  () => [
    {
      no: 1,
      name: "module_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "platform",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "platform_tags", kind: "scalar", T: 9, repeated: !0 }
  ]
), XT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UploadModuleFileRequest",
  () => [
    { no: 1, name: "module_file_info", kind: "message", T: KT, oneof: "module_file" },
    { no: 2, name: "file", kind: "scalar", T: 12, oneof: "module_file" }
  ]
), QT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UploadModuleFileResponse",
  () => [
    {
      no: 1,
      name: "url",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ZT = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetModuleRequest",
  () => [
    {
      no: 1,
      name: "module_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "include_markdown_documentation", kind: "scalar", T: 8, opt: !0 }
  ]
), ek = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetModuleResponse",
  () => [
    { no: 1, name: "module", kind: "message", T: Ao }
  ]
), Ao = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Module",
  () => [
    {
      no: 1,
      name: "module_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "visibility", kind: "enum", T: s.getEnumType(pn) },
    { no: 4, name: "versions", kind: "message", T: nk, repeated: !0 },
    {
      no: 5,
      name: "url",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 6,
      name: "description",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 7, name: "models", kind: "message", T: sn, repeated: !0 },
    {
      no: 8,
      name: "total_robot_usage",
      kind: "scalar",
      T: 3
      /* ScalarType.INT64 */
    },
    {
      no: 9,
      name: "total_organization_usage",
      kind: "scalar",
      T: 3
      /* ScalarType.INT64 */
    },
    {
      no: 10,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 11,
      name: "entrypoint",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 12,
      name: "public_namespace",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 13, name: "first_run", kind: "scalar", T: 9, opt: !0 },
    { no: 14, name: "markdown_description", kind: "scalar", T: 9, opt: !0 },
    { no: 15, name: "apps", kind: "message", T: tn, repeated: !0 }
  ]
), nk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.VersionHistory",
  () => [
    {
      no: 1,
      name: "version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "files", kind: "message", T: qo, repeated: !0 },
    { no: 3, name: "models", kind: "message", T: sn, repeated: !0 },
    {
      no: 4,
      name: "entrypoint",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "first_run", kind: "scalar", T: 9, opt: !0 },
    { no: 6, name: "markdown_description", kind: "scalar", T: 9, opt: !0 },
    { no: 7, name: "apps", kind: "message", T: tn, repeated: !0 }
  ]
), qo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.Uploads",
  () => [
    {
      no: 1,
      name: "platform",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "uploaded_at", kind: "message", T: _ }
  ]
), ak = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListModulesRequest",
  () => [
    { no: 1, name: "organization_id", kind: "scalar", T: 9, opt: !0 },
    { no: 2, name: "include_markdown_documentation", kind: "scalar", T: 8, opt: !0 }
  ]
), tk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListModulesResponse",
  () => [
    { no: 1, name: "modules", kind: "message", T: Ao, repeated: !0 }
  ]
), sk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetUserIDByEmailRequest",
  () => [
    {
      no: 1,
      name: "email",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ok = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetUserIDByEmailResponse",
  () => [
    {
      no: 1,
      name: "user_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ik = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListOrganizationsByUserRequest",
  () => [
    {
      no: 1,
      name: "user_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Uo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrgDetails",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "org_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "org_cid", kind: "scalar", T: 9, opt: !0 },
    { no: 4, name: "public_namespace", kind: "scalar", T: 9, opt: !0 },
    { no: 5, name: "billing_tier", kind: "scalar", T: 9, opt: !0 }
  ]
), rk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListOrganizationsByUserResponse",
  () => [
    { no: 1, name: "orgs", kind: "message", T: Uo, repeated: !0 }
  ]
), mk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.SearchOrganizationsRequest",
  () => [
    { no: 1, name: "org_id", kind: "scalar", T: 9, opt: !0 },
    { no: 2, name: "org_name", kind: "scalar", T: 9, opt: !0 },
    { no: 3, name: "cid", kind: "scalar", T: 9, opt: !0 },
    { no: 4, name: "public_namespace", kind: "scalar", T: 9, opt: !0 }
  ]
), ck = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.SearchOrganizationsResponse",
  () => [
    { no: 1, name: "organizations", kind: "message", T: Uo, repeated: !0 }
  ]
), lk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateKeyRequest",
  () => [
    { no: 1, name: "authorizations", kind: "message", T: Q, repeated: !0 },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), dk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateKeyResponse",
  () => [
    {
      no: 1,
      name: "key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), pk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteKeyRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), uk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteKeyResponse",
  []
), gk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RenameKeyRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Tk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RenameKeyResponse",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), kk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.AuthorizationDetails",
  () => [
    {
      no: 1,
      name: "authorization_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "authorization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "resource_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "resource_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Lo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.APIKeyWithAuthorizations",
  () => [
    { no: 1, name: "api_key", kind: "message", T: cg },
    { no: 2, name: "authorizations", kind: "message", T: kk, repeated: !0 }
  ]
), yk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListKeysRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), vk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListKeysResponse",
  () => [
    { no: 1, name: "api_keys", kind: "message", T: Lo, repeated: !0 }
  ]
), hk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RotateKeyRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), fk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.RotateKeyResponse",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Rk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateKeyFromExistingKeyAuthorizationsRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), _k = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateKeyFromExistingKeyAuthorizationsResponse",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Sk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetAppContentRequest",
  () => [
    {
      no: 1,
      name: "public_namespace",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ik = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetAppContentResponse",
  () => [
    {
      no: 1,
      name: "blob_path",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "entrypoint",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "app_type", kind: "enum", T: s.getEnumType(up) }
  ]
), bk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrganizationSetLogoRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "logo",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), Mk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrganizationSetLogoResponse",
  []
), Ek = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrganizationGetLogoRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), wk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OrganizationGetLogoResponse",
  () => [
    {
      no: 1,
      name: "url",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ok = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.EnableAuthServiceRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ck = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.EnableAuthServiceResponse",
  []
), Nk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DisableAuthServiceRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Pk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DisableAuthServiceResponse",
  []
), Dk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateOAuthAppRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "client_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "oauth_config", kind: "message", T: Na }
  ]
), Ak = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.CreateOAuthAppResponse",
  () => [
    {
      no: 1,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "client_secret",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), qk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ReadOAuthAppRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Uk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ReadOAuthAppResponse",
  () => [
    {
      no: 1,
      name: "client_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "client_secret",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "oauth_config", kind: "message", T: Na }
  ]
), Lk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOAuthAppRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "client_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "oauth_config", kind: "message", T: Na }
  ]
), Gk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOAuthAppResponse",
  []
), Bk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteOAuthAppRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), xk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.DeleteOAuthAppResponse",
  []
), Fk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListOAuthAppsRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Jk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ListOAuthAppsResponse",
  () => [
    { no: 1, name: "client_ids", kind: "scalar", T: 9, repeated: !0 }
  ]
), Na = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.OAuthConfig",
  () => [
    { no: 1, name: "client_authentication", kind: "enum", T: s.getEnumType(gp) },
    { no: 2, name: "pkce", kind: "enum", T: s.getEnumType(Tp) },
    { no: 3, name: "url_validation", kind: "enum", T: s.getEnumType(kp) },
    { no: 4, name: "origin_uris", kind: "scalar", T: 9, repeated: !0 },
    { no: 5, name: "redirect_uris", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 6,
      name: "logout_uri",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 7, name: "enabled_grants", kind: "enum", T: s.getEnumType(yp), repeated: !0 }
  ]
), zk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetAppBrandingRequest",
  () => [
    {
      no: 1,
      name: "public_namespace",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Yk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.TextOverrides",
  () => [
    { no: 1, name: "fields", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    } }
  ]
), $k = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetAppBrandingResponse",
  () => [
    { no: 1, name: "logo_path", kind: "scalar", T: 9, opt: !0 },
    { no: 2, name: "text_customizations", kind: "map", K: 9, V: { kind: "message", T: Yk } },
    { no: 3, name: "fragment_ids", kind: "scalar", T: 9, repeated: !0 }
  ]
), Vk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.AppCustomizations",
  () => [
    { no: 1, name: "machine_picker", kind: "message", T: Wk }
  ]
), Wk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.MachinePickerCustomizations",
  () => [
    { no: 1, name: "heading", kind: "scalar", T: 9, opt: !0 },
    { no: 2, name: "subheading", kind: "scalar", T: 9, opt: !0 }
  ]
), W_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APIKey: cg,
  APIKeyWithAuthorizations: Lo,
  AddRoleRequest: gT,
  AddRoleResponse: TT,
  AdditionalFragment: No,
  App: tn,
  AppCustomizations: Vk,
  AppType: up,
  AuthenticationType: lp,
  AuthenticatorInfo: Mo,
  Authorization: Q,
  AuthorizationDetails: kk,
  AuthorizedPermissions: Do,
  BillingAddress: Ma,
  ChangeRoleRequest: vT,
  ChangeRoleResponse: hT,
  CheckPermissionsRequest: _T,
  CheckPermissionsResponse: ST,
  ClientAuthentication: gp,
  CreateFragmentRequest: hg,
  CreateFragmentResponse: fg,
  CreateKeyFromExistingKeyAuthorizationsRequest: Rk,
  CreateKeyFromExistingKeyAuthorizationsResponse: _k,
  CreateKeyRequest: lk,
  CreateKeyResponse: dk,
  CreateLocationRequest: lu,
  CreateLocationResponse: du,
  CreateLocationSecretRequest: Cu,
  CreateLocationSecretResponse: Nu,
  CreateModuleRequest: zT,
  CreateModuleResponse: YT,
  CreateOAuthAppRequest: Dk,
  CreateOAuthAppResponse: Ak,
  CreateOrganizationInviteRequest: xp,
  CreateOrganizationInviteResponse: Fp,
  CreateOrganizationRequest: _p,
  CreateOrganizationResponse: Sp,
  CreateRegistryItemRequest: NT,
  CreateRegistryItemResponse: PT,
  CreateRobotPartSecretRequest: lT,
  CreateRobotPartSecretResponse: dT,
  DeleteFragmentRequest: Sg,
  DeleteFragmentResponse: Ig,
  DeleteFragmentTagRequest: Ng,
  DeleteFragmentTagResponse: Pg,
  DeleteKeyRequest: pk,
  DeleteKeyResponse: uk,
  DeleteLocationRequest: ku,
  DeleteLocationResponse: yu,
  DeleteLocationSecretRequest: Pu,
  DeleteLocationSecretResponse: Du,
  DeleteOAuthAppRequest: Bk,
  DeleteOAuthAppResponse: xk,
  DeleteOrganizationInviteRequest: Yp,
  DeleteOrganizationInviteResponse: $p,
  DeleteOrganizationMemberRequest: jp,
  DeleteOrganizationMemberResponse: Hp,
  DeleteOrganizationRequest: Pp,
  DeleteOrganizationResponse: Dp,
  DeleteRegistryItemRequest: LT,
  DeleteRegistryItemResponse: GT,
  DeleteRobotPartRequest: tg,
  DeleteRobotPartResponse: dg,
  DeleteRobotPartSecretRequest: pT,
  DeleteRobotPartSecretResponse: uT,
  DeleteRobotRequest: eT,
  DeleteRobotResponse: nT,
  DisableAuthServiceRequest: Nk,
  DisableAuthServiceResponse: Pk,
  DisableBillingServiceRequest: au,
  DisableBillingServiceResponse: tu,
  EnableAuthServiceRequest: Ok,
  EnableAuthServiceResponse: Ck,
  EnableBillingServiceRequest: Kp,
  EnableBillingServiceResponse: Xp,
  EnabledGrant: yp,
  Fragment: Ye,
  FragmentError: gg,
  FragmentErrorType: dp,
  FragmentHistoryEntry: pg,
  FragmentRevision: ug,
  FragmentSummary: zg,
  FragmentTag: wa,
  FragmentUsage: Oa,
  FragmentVisibility: qn,
  GetAppBrandingRequest: zk,
  GetAppBrandingResponse: $k,
  GetAppContentRequest: Sk,
  GetAppContentResponse: Ik,
  GetBillingServiceConfigRequest: eu,
  GetBillingServiceConfigResponse: nu,
  GetFragmentHistoryRequest: bg,
  GetFragmentHistoryResponse: Mg,
  GetFragmentRequest: yg,
  GetFragmentResponse: vg,
  GetFragmentUsageRequest: Eg,
  GetFragmentUsageResponse: wg,
  GetLocationMetadataRequest: vu,
  GetLocationMetadataResponse: hu,
  GetLocationRequest: pu,
  GetLocationResponse: uu,
  GetModuleRequest: ZT,
  GetModuleResponse: ek,
  GetOrganizationMetadataRequest: Ap,
  GetOrganizationMetadataResponse: qp,
  GetOrganizationNamespaceAvailabilityRequest: Mp,
  GetOrganizationNamespaceAvailabilityResponse: Ep,
  GetOrganizationRequest: Ip,
  GetOrganizationResponse: bp,
  GetOrganizationsWithAccessToLocationRequest: _u,
  GetOrganizationsWithAccessToLocationResponse: Su,
  GetRegistryItemRequest: OT,
  GetRegistryItemResponse: CT,
  GetRobotAPIKeysRequest: mg,
  GetRobotAPIKeysResponse: lg,
  GetRobotMetadataRequest: aT,
  GetRobotMetadataResponse: tT,
  GetRobotPartByNameAndLocationRequest: $u,
  GetRobotPartByNameAndLocationResponse: Vu,
  GetRobotPartHistoryRequest: Xu,
  GetRobotPartHistoryResponse: Qu,
  GetRobotPartLogsRequest: Wu,
  GetRobotPartLogsResponse: ju,
  GetRobotPartMetadataRequest: sg,
  GetRobotPartMetadataResponse: og,
  GetRobotPartRequest: zu,
  GetRobotPartResponse: Yu,
  GetRobotPartsRequest: Fu,
  GetRobotPartsResponse: Ju,
  GetRobotRequest: Uu,
  GetRobotResponse: xu,
  GetRoverRentalRobotsRequest: Lu,
  GetRoverRentalRobotsResponse: Bu,
  GetUserIDByEmailRequest: sk,
  GetUserIDByEmailResponse: ok,
  ListAuthorizationsRequest: fT,
  ListAuthorizationsResponse: RT,
  ListFragmentsRequest: Tg,
  ListFragmentsResponse: kg,
  ListKeysRequest: yk,
  ListKeysResponse: vk,
  ListLocationsRequest: Iu,
  ListLocationsResponse: Ou,
  ListMachineFragmentsRequest: Gg,
  ListMachineFragmentsResponse: Bg,
  ListMachineSummariesRequest: Po,
  ListMachineSummariesResponse: xg,
  ListModulesRequest: ak,
  ListModulesResponse: tk,
  ListNestedFragmentsRequest: Ug,
  ListNestedFragmentsResponse: Lg,
  ListOAuthAppsRequest: Fk,
  ListOAuthAppsResponse: Jk,
  ListOrganizationMembersRequest: Gp,
  ListOrganizationMembersResponse: Bp,
  ListOrganizationsByUserRequest: ik,
  ListOrganizationsByUserResponse: rk,
  ListOrganizationsRequest: hp,
  ListOrganizationsResponse: Rp,
  ListRegistryItemsRequest: qT,
  ListRegistryItemsResponse: UT,
  ListRobotsForLocationsRequest: Ag,
  ListRobotsForLocationsResponse: jg,
  ListRobotsForOrgRequest: qg,
  ListRobotsForOrgResponse: Hg,
  ListRobotsRequest: Dg,
  ListRobotsResponse: Wg,
  Location: Ln,
  LocationAuth: Ea,
  LocationAuthRequest: Au,
  LocationAuthResponse: qu,
  LocationOrganization: mu,
  LocationSummary: Fg,
  MLModelMetadata: MT,
  MLTrainingMetadata: wT,
  MLTrainingVersion: ET,
  MachinePickerCustomizations: Wk,
  MachineSummary: Jg,
  MarkPartAsMainRequest: iT,
  MarkPartAsMainResponse: rT,
  MarkPartForRestartRequest: mT,
  MarkPartForRestartResponse: cT,
  Model: sn,
  Module: Ao,
  ModuleFileInfo: KT,
  ModuleMetadata: bT,
  ModuleVersion: IT,
  NewRobotPartRequest: ng,
  NewRobotPartResponse: ag,
  NewRobotRequest: Kg,
  NewRobotResponse: Xg,
  OAuthConfig: Na,
  OrgDetails: Uo,
  Organization: gn,
  OrganizationGetLogoRequest: Ek,
  OrganizationGetLogoResponse: wk,
  OrganizationGetSupportEmailRequest: iu,
  OrganizationGetSupportEmailResponse: ru,
  OrganizationIdentity: Eo,
  OrganizationInvite: Un,
  OrganizationMember: fp,
  OrganizationSetLogoRequest: bk,
  OrganizationSetLogoResponse: Mk,
  OrganizationSetSupportEmailRequest: su,
  OrganizationSetSupportEmailResponse: ou,
  PKCE: Tp,
  PartSummary: Vg,
  ReadOAuthAppRequest: qk,
  ReadOAuthAppResponse: Uk,
  RegistryItem: Ca,
  RegistryItemStatus: pp,
  RemoveRoleRequest: kT,
  RemoveRoleResponse: yT,
  RenameKeyRequest: gk,
  RenameKeyResponse: Tk,
  RenameRegistryItemRequest: BT,
  RenameRegistryItemResponse: xT,
  ResendOrganizationInviteRequest: Vp,
  ResendOrganizationInviteResponse: Wp,
  ResolvedFragment: Co,
  Robot: un,
  RobotPart: an,
  RobotPartHistoryEntry: vp,
  RotateKeyRequest: hk,
  RotateKeyResponse: fk,
  RoverRentalRobot: Gu,
  SearchOrganizationsRequest: mk,
  SearchOrganizationsResponse: ck,
  SetFragmentTagRequest: Og,
  SetFragmentTagResponse: Cg,
  ShareLocationRequest: bu,
  ShareLocationResponse: Mu,
  SharedSecret: wo,
  SharedSecret_State: Oo,
  StorageConfig: cu,
  TailRobotPartLogsRequest: Hu,
  TailRobotPartLogsResponse: Ku,
  TextOverrides: Yk,
  TransferRegistryItemRequest: FT,
  TransferRegistryItemResponse: JT,
  URLValidation: kp,
  UnshareLocationRequest: Eu,
  UnshareLocationResponse: wu,
  UpdateBillingServiceRequest: Qp,
  UpdateBillingServiceResponse: Zp,
  UpdateFragmentRequest: Rg,
  UpdateFragmentResponse: _g,
  UpdateLocationMetadataRequest: fu,
  UpdateLocationMetadataResponse: Ru,
  UpdateLocationRequest: gu,
  UpdateLocationResponse: Tu,
  UpdateMLModelMetadata: jT,
  UpdateMLTrainingMetadata: HT,
  UpdateModuleMetadata: WT,
  UpdateModuleRequest: $T,
  UpdateModuleResponse: VT,
  UpdateOAuthAppRequest: Lk,
  UpdateOAuthAppResponse: Gk,
  UpdateOrganizationInviteAuthorizationsRequest: Jp,
  UpdateOrganizationInviteAuthorizationsResponse: zp,
  UpdateOrganizationMetadataRequest: Up,
  UpdateOrganizationMetadataResponse: Lp,
  UpdateOrganizationNamespaceRequest: Cp,
  UpdateOrganizationNamespaceResponse: Np,
  UpdateOrganizationRequest: wp,
  UpdateOrganizationResponse: Op,
  UpdateRegistryItemRequest: DT,
  UpdateRegistryItemResponse: AT,
  UpdateRobotMetadataRequest: sT,
  UpdateRobotMetadataResponse: oT,
  UpdateRobotPartMetadataRequest: ig,
  UpdateRobotPartMetadataResponse: rg,
  UpdateRobotPartRequest: Zu,
  UpdateRobotPartResponse: eg,
  UpdateRobotRequest: Qg,
  UpdateRobotResponse: Zg,
  UploadModuleFileRequest: XT,
  UploadModuleFileResponse: QT,
  Uploads: qo,
  VersionHistory: nk,
  ViamAgentVersion: $g,
  ViamServerVersion: Yg,
  Visibility: pn
}, Symbol.toStringTag, { value: "Module" })), b1 = {
  typeName: "viam.app.v1.AppService",
  methods: {
    /**
     * Get the id of the user with the email
     *
     * @generated from rpc viam.app.v1.AppService.GetUserIDByEmail
     */
    getUserIDByEmail: {
      name: "GetUserIDByEmail",
      I: sk,
      O: ok,
      kind: m.Unary
    },
    /**
     * Create a new organization
     *
     * @generated from rpc viam.app.v1.AppService.CreateOrganization
     */
    createOrganization: {
      name: "CreateOrganization",
      I: _p,
      O: Sp,
      kind: m.Unary
    },
    /**
     * List organizations
     *
     * @generated from rpc viam.app.v1.AppService.ListOrganizations
     */
    listOrganizations: {
      name: "ListOrganizations",
      I: hp,
      O: Rp,
      kind: m.Unary
    },
    /**
     * Get all organizations that have access to a location.
     *
     * @generated from rpc viam.app.v1.AppService.GetOrganizationsWithAccessToLocation
     */
    getOrganizationsWithAccessToLocation: {
      name: "GetOrganizationsWithAccessToLocation",
      I: _u,
      O: Su,
      kind: m.Unary
    },
    /**
     * List the organizations a user belongs to
     *
     * @generated from rpc viam.app.v1.AppService.ListOrganizationsByUser
     */
    listOrganizationsByUser: {
      name: "ListOrganizationsByUser",
      I: ik,
      O: rk,
      kind: m.Unary
    },
    /**
     * Search organizations by a couple fields
     *
     * @generated from rpc viam.app.v1.AppService.SearchOrganizations
     */
    searchOrganizations: {
      name: "SearchOrganizations",
      I: mk,
      O: ck,
      kind: m.Unary
    },
    /**
     * Get an organization
     *
     * @generated from rpc viam.app.v1.AppService.GetOrganization
     */
    getOrganization: {
      name: "GetOrganization",
      I: Ip,
      O: bp,
      kind: m.Unary
    },
    /**
     * Checks for namespace availablity throughout all orgs.
     *
     * @generated from rpc viam.app.v1.AppService.GetOrganizationNamespaceAvailability
     */
    getOrganizationNamespaceAvailability: {
      name: "GetOrganizationNamespaceAvailability",
      I: Mp,
      O: Ep,
      kind: m.Unary
    },
    /**
     * Update an organization
     *
     * @generated from rpc viam.app.v1.AppService.UpdateOrganization
     */
    updateOrganization: {
      name: "UpdateOrganization",
      I: wp,
      O: Op,
      kind: m.Unary
    },
    /**
     * Update an organization's namespace if it's already been set.
     *
     * @generated from rpc viam.app.v1.AppService.UpdateOrganizationNamespace
     */
    updateOrganizationNamespace: {
      name: "UpdateOrganizationNamespace",
      I: Cp,
      O: Np,
      kind: m.Unary
    },
    /**
     * Delete an organization
     *
     * @generated from rpc viam.app.v1.AppService.DeleteOrganization
     */
    deleteOrganization: {
      name: "DeleteOrganization",
      I: Pp,
      O: Dp,
      kind: m.Unary
    },
    /**
     * Get user-defined metadata for an organization
     *
     * @generated from rpc viam.app.v1.AppService.GetOrganizationMetadata
     */
    getOrganizationMetadata: {
      name: "GetOrganizationMetadata",
      I: Ap,
      O: qp,
      kind: m.Unary
    },
    /**
     * Update user-defined metadata for an organization
     *
     * @generated from rpc viam.app.v1.AppService.UpdateOrganizationMetadata
     */
    updateOrganizationMetadata: {
      name: "UpdateOrganizationMetadata",
      I: Up,
      O: Lp,
      kind: m.Unary
    },
    /**
     * List all members of an organization and all invited members to the organization.
     *
     * @generated from rpc viam.app.v1.AppService.ListOrganizationMembers
     */
    listOrganizationMembers: {
      name: "ListOrganizationMembers",
      I: Gp,
      O: Bp,
      kind: m.Unary
    },
    /**
     * Create an organization invite to an organization
     *
     * @generated from rpc viam.app.v1.AppService.CreateOrganizationInvite
     */
    createOrganizationInvite: {
      name: "CreateOrganizationInvite",
      I: xp,
      O: Fp,
      kind: m.Unary
    },
    /**
     * Update the authorizations attached to an organization invite
     *
     * @generated from rpc viam.app.v1.AppService.UpdateOrganizationInviteAuthorizations
     */
    updateOrganizationInviteAuthorizations: {
      name: "UpdateOrganizationInviteAuthorizations",
      I: Jp,
      O: zp,
      kind: m.Unary
    },
    /**
     * Delete an organization member from an organization
     *
     * @generated from rpc viam.app.v1.AppService.DeleteOrganizationMember
     */
    deleteOrganizationMember: {
      name: "DeleteOrganizationMember",
      I: jp,
      O: Hp,
      kind: m.Unary
    },
    /**
     * Delete an organization invite
     *
     * @generated from rpc viam.app.v1.AppService.DeleteOrganizationInvite
     */
    deleteOrganizationInvite: {
      name: "DeleteOrganizationInvite",
      I: Yp,
      O: $p,
      kind: m.Unary
    },
    /**
     * Resend an organization invite
     *
     * @generated from rpc viam.app.v1.AppService.ResendOrganizationInvite
     */
    resendOrganizationInvite: {
      name: "ResendOrganizationInvite",
      I: Vp,
      O: Wp,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.EnableBillingService
     */
    enableBillingService: {
      name: "EnableBillingService",
      I: Kp,
      O: Xp,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.DisableBillingService
     */
    disableBillingService: {
      name: "DisableBillingService",
      I: au,
      O: tu,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.UpdateBillingService
     */
    updateBillingService: {
      name: "UpdateBillingService",
      I: Qp,
      O: Zp,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.GetBillingServiceConfig
     */
    getBillingServiceConfig: {
      name: "GetBillingServiceConfig",
      I: eu,
      O: nu,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.OrganizationSetSupportEmail
     */
    organizationSetSupportEmail: {
      name: "OrganizationSetSupportEmail",
      I: su,
      O: ou,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.OrganizationGetSupportEmail
     */
    organizationGetSupportEmail: {
      name: "OrganizationGetSupportEmail",
      I: iu,
      O: ru,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.OrganizationSetLogo
     */
    organizationSetLogo: {
      name: "OrganizationSetLogo",
      I: bk,
      O: Mk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.OrganizationGetLogo
     */
    organizationGetLogo: {
      name: "OrganizationGetLogo",
      I: Ek,
      O: wk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.EnableAuthService
     */
    enableAuthService: {
      name: "EnableAuthService",
      I: Ok,
      O: Ck,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.DisableAuthService
     */
    disableAuthService: {
      name: "DisableAuthService",
      I: Nk,
      O: Pk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.CreateOAuthApp
     */
    createOAuthApp: {
      name: "CreateOAuthApp",
      I: Dk,
      O: Ak,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.ReadOAuthApp
     */
    readOAuthApp: {
      name: "ReadOAuthApp",
      I: qk,
      O: Uk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.UpdateOAuthApp
     */
    updateOAuthApp: {
      name: "UpdateOAuthApp",
      I: Lk,
      O: Gk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.DeleteOAuthApp
     */
    deleteOAuthApp: {
      name: "DeleteOAuthApp",
      I: Bk,
      O: xk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.ListOAuthApps
     */
    listOAuthApps: {
      name: "ListOAuthApps",
      I: Fk,
      O: Jk,
      kind: m.Unary
    },
    /**
     * Create a location
     *
     * @generated from rpc viam.app.v1.AppService.CreateLocation
     */
    createLocation: {
      name: "CreateLocation",
      I: lu,
      O: du,
      kind: m.Unary
    },
    /**
     * Get a location
     *
     * @generated from rpc viam.app.v1.AppService.GetLocation
     */
    getLocation: {
      name: "GetLocation",
      I: pu,
      O: uu,
      kind: m.Unary
    },
    /**
     * Update a location
     *
     * @generated from rpc viam.app.v1.AppService.UpdateLocation
     */
    updateLocation: {
      name: "UpdateLocation",
      I: gu,
      O: Tu,
      kind: m.Unary
    },
    /**
     * Delete a location
     *
     * @generated from rpc viam.app.v1.AppService.DeleteLocation
     */
    deleteLocation: {
      name: "DeleteLocation",
      I: ku,
      O: yu,
      kind: m.Unary
    },
    /**
     * Get user-defined metadata for a location
     *
     * @generated from rpc viam.app.v1.AppService.GetLocationMetadata
     */
    getLocationMetadata: {
      name: "GetLocationMetadata",
      I: vu,
      O: hu,
      kind: m.Unary
    },
    /**
     * Update user-defined metadata for a location
     *
     * @generated from rpc viam.app.v1.AppService.UpdateLocationMetadata
     */
    updateLocationMetadata: {
      name: "UpdateLocationMetadata",
      I: fu,
      O: Ru,
      kind: m.Unary
    },
    /**
     * Get a list of locations
     *
     * @generated from rpc viam.app.v1.AppService.ListLocations
     */
    listLocations: {
      name: "ListLocations",
      I: Iu,
      O: Ou,
      kind: m.Unary
    },
    /**
     * Share a location with an organization
     *
     * @generated from rpc viam.app.v1.AppService.ShareLocation
     */
    shareLocation: {
      name: "ShareLocation",
      I: bu,
      O: Mu,
      kind: m.Unary
    },
    /**
     * Stop sharing a location with an organization
     *
     * @generated from rpc viam.app.v1.AppService.UnshareLocation
     */
    unshareLocation: {
      name: "UnshareLocation",
      I: Eu,
      O: wu,
      kind: m.Unary
    },
    /**
     * Get a location's authorization secrets
     *
     * @generated from rpc viam.app.v1.AppService.LocationAuth
     */
    locationAuth: {
      name: "LocationAuth",
      I: Au,
      O: qu,
      kind: m.Unary
    },
    /**
     * Create a new generated Secret in the Location.
     *  - Succeeds if there are no more than 2 active secrets after creation.
     *
     * @generated from rpc viam.app.v1.AppService.CreateLocationSecret
     */
    createLocationSecret: {
      name: "CreateLocationSecret",
      I: Cu,
      O: Nu,
      kind: m.Unary
    },
    /**
     * Delete a Secret from the Location.
     *
     * @generated from rpc viam.app.v1.AppService.DeleteLocationSecret
     */
    deleteLocationSecret: {
      name: "DeleteLocationSecret",
      I: Pu,
      O: Du,
      kind: m.Unary
    },
    /**
     * Get a specific robot by ID
     *
     * @generated from rpc viam.app.v1.AppService.GetRobot
     */
    getRobot: {
      name: "GetRobot",
      I: Uu,
      O: xu,
      kind: m.Unary
    },
    /**
     * Get user-defined metadata for a robot
     *
     * @generated from rpc viam.app.v1.AppService.GetRobotMetadata
     */
    getRobotMetadata: {
      name: "GetRobotMetadata",
      I: aT,
      O: tT,
      kind: m.Unary
    },
    /**
     * Update user-defined metadata for an robot
     *
     * @generated from rpc viam.app.v1.AppService.UpdateRobotMetadata
     */
    updateRobotMetadata: {
      name: "UpdateRobotMetadata",
      I: sT,
      O: oT,
      kind: m.Unary
    },
    /**
     * Get Rover Rental Location Robots
     *
     * @generated from rpc viam.app.v1.AppService.GetRoverRentalRobots
     */
    getRoverRentalRobots: {
      name: "GetRoverRentalRobots",
      I: Lu,
      O: Bu,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.GetRobotParts
     */
    getRobotParts: {
      name: "GetRobotParts",
      I: Fu,
      O: Ju,
      kind: m.Unary
    },
    /**
     * Get a specific robot part by ID
     *
     * @generated from rpc viam.app.v1.AppService.GetRobotPart
     */
    getRobotPart: {
      name: "GetRobotPart",
      I: zu,
      O: Yu,
      kind: m.Unary
    },
    /**
     * Get a specific robot part by name and location
     *
     * @generated from rpc viam.app.v1.AppService.GetRobotPartByNameAndLocation
     */
    getRobotPartByNameAndLocation: {
      name: "GetRobotPartByNameAndLocation",
      I: $u,
      O: Vu,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.GetRobotPartLogs
     */
    getRobotPartLogs: {
      name: "GetRobotPartLogs",
      I: Wu,
      O: ju,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.TailRobotPartLogs
     */
    tailRobotPartLogs: {
      name: "TailRobotPartLogs",
      I: Hu,
      O: Ku,
      kind: m.ServerStreaming
    },
    /**
     * Get a specific robot part histy by ID
     *
     * @generated from rpc viam.app.v1.AppService.GetRobotPartHistory
     */
    getRobotPartHistory: {
      name: "GetRobotPartHistory",
      I: Xu,
      O: Qu,
      kind: m.Unary
    },
    /**
     * Update a robot
     *
     * @generated from rpc viam.app.v1.AppService.UpdateRobotPart
     */
    updateRobotPart: {
      name: "UpdateRobotPart",
      I: Zu,
      O: eg,
      kind: m.Unary
    },
    /**
     * Create a new robot part
     *
     * @generated from rpc viam.app.v1.AppService.NewRobotPart
     */
    newRobotPart: {
      name: "NewRobotPart",
      I: ng,
      O: ag,
      kind: m.Unary
    },
    /**
     * Delete a robot part
     *
     * @generated from rpc viam.app.v1.AppService.DeleteRobotPart
     */
    deleteRobotPart: {
      name: "DeleteRobotPart",
      I: tg,
      O: dg,
      kind: m.Unary
    },
    /**
     * Get user-defined metadata for a robot part
     *
     * @generated from rpc viam.app.v1.AppService.GetRobotPartMetadata
     */
    getRobotPartMetadata: {
      name: "GetRobotPartMetadata",
      I: sg,
      O: og,
      kind: m.Unary
    },
    /**
     * Update user-defined metadata for an robot part
     *
     * @generated from rpc viam.app.v1.AppService.UpdateRobotPartMetadata
     */
    updateRobotPartMetadata: {
      name: "UpdateRobotPartMetadata",
      I: ig,
      O: rg,
      kind: m.Unary
    },
    /**
     * Gets the Robot API Keys for the robot
     *
     * @generated from rpc viam.app.v1.AppService.GetRobotAPIKeys
     */
    getRobotAPIKeys: {
      name: "GetRobotAPIKeys",
      I: mg,
      O: lg,
      kind: m.Unary
    },
    /**
     * Marks the given part as the main part, and all the others as not
     *
     * @generated from rpc viam.app.v1.AppService.MarkPartAsMain
     */
    markPartAsMain: {
      name: "MarkPartAsMain",
      I: iT,
      O: rT,
      kind: m.Unary
    },
    /**
     * Marks part for restart. Once the robot part checks-in with the app the flag
     * is reset on the robot part. Calling this multiple times before a robot part
     * checks-in has no affect.
     * Note: This API may be removed in the near future.
     * TODO(APP-388): Remove
     *
     * @generated from rpc viam.app.v1.AppService.MarkPartForRestart
     */
    markPartForRestart: {
      name: "MarkPartForRestart",
      I: mT,
      O: cT,
      kind: m.Unary
    },
    /**
     * Create a new generated Secret in the Robot Part.
     *  - Succeeds if there are no more than 2 active secrets after creation.
     *
     * @generated from rpc viam.app.v1.AppService.CreateRobotPartSecret
     */
    createRobotPartSecret: {
      name: "CreateRobotPartSecret",
      I: lT,
      O: dT,
      kind: m.Unary
    },
    /**
     * Delete a Secret from the RobotPart.
     *
     * @generated from rpc viam.app.v1.AppService.DeleteRobotPartSecret
     */
    deleteRobotPartSecret: {
      name: "DeleteRobotPartSecret",
      I: pT,
      O: uT,
      kind: m.Unary
    },
    /**
     * Get a list of robots at a location
     *
     * @generated from rpc viam.app.v1.AppService.ListRobots
     */
    listRobots: {
      name: "ListRobots",
      I: Dg,
      O: Wg,
      kind: m.Unary
    },
    /**
     * Get a list of robots at multiple locations
     *
     * @generated from rpc viam.app.v1.AppService.ListRobotsForLocations
     */
    listRobotsForLocations: {
      name: "ListRobotsForLocations",
      I: Ag,
      O: jg,
      kind: m.Unary
    },
    /**
     * Get a list of robots at an org
     *
     * @generated from rpc viam.app.v1.AppService.ListRobotsForOrg
     */
    listRobotsForOrg: {
      name: "ListRobotsForOrg",
      I: qg,
      O: Hg,
      kind: m.Unary
    },
    /**
     * NewRobot creates a new robot
     *
     * @generated from rpc viam.app.v1.AppService.NewRobot
     */
    newRobot: {
      name: "NewRobot",
      I: Kg,
      O: Xg,
      kind: m.Unary
    },
    /**
     * UpdateRobot updates a robot
     *
     * @generated from rpc viam.app.v1.AppService.UpdateRobot
     */
    updateRobot: {
      name: "UpdateRobot",
      I: Qg,
      O: Zg,
      kind: m.Unary
    },
    /**
     * DeleteRobot deletes a robot
     *
     * @generated from rpc viam.app.v1.AppService.DeleteRobot
     */
    deleteRobot: {
      name: "DeleteRobot",
      I: eT,
      O: nT,
      kind: m.Unary
    },
    /**
     * Gets a list of fragments
     *
     * @generated from rpc viam.app.v1.AppService.ListFragments
     */
    listFragments: {
      name: "ListFragments",
      I: Tg,
      O: kg,
      kind: m.Unary
    },
    /**
     * Gets a single fragment
     *
     * @generated from rpc viam.app.v1.AppService.GetFragment
     */
    getFragment: {
      name: "GetFragment",
      I: yg,
      O: vg,
      kind: m.Unary
    },
    /**
     * Creates a fragment
     *
     * @generated from rpc viam.app.v1.AppService.CreateFragment
     */
    createFragment: {
      name: "CreateFragment",
      I: hg,
      O: fg,
      kind: m.Unary
    },
    /**
     * Updates a fragment
     *
     * @generated from rpc viam.app.v1.AppService.UpdateFragment
     */
    updateFragment: {
      name: "UpdateFragment",
      I: Rg,
      O: _g,
      kind: m.Unary
    },
    /**
     * Deletes a fragment
     *
     * @generated from rpc viam.app.v1.AppService.DeleteFragment
     */
    deleteFragment: {
      name: "DeleteFragment",
      I: Sg,
      O: Ig,
      kind: m.Unary
    },
    /**
     * List nested fragments for a fragment
     *
     * @generated from rpc viam.app.v1.AppService.ListNestedFragments
     */
    listNestedFragments: {
      name: "ListNestedFragments",
      I: Ug,
      O: Lg,
      kind: m.Unary
    },
    /**
     * Gets top level and nested fragments for a machine, as well as any other specified fragment ids
     *
     * @generated from rpc viam.app.v1.AppService.ListMachineFragments
     */
    listMachineFragments: {
      name: "ListMachineFragments",
      I: Gg,
      O: Bg,
      kind: m.Unary
    },
    /**
     * List all machines and their corresponding machine dashboard information
     *
     * @generated from rpc viam.app.v1.AppService.ListMachineSummaries
     */
    listMachineSummaries: {
      name: "ListMachineSummaries",
      I: Po,
      O: xg,
      kind: m.Unary
    },
    /**
     * Gets fragment history
     *
     * @generated from rpc viam.app.v1.AppService.GetFragmentHistory
     */
    getFragmentHistory: {
      name: "GetFragmentHistory",
      I: bg,
      O: Mg,
      kind: m.Unary
    },
    /**
     * Gets usage for a fragment across versions
     *
     * @generated from rpc viam.app.v1.AppService.GetFragmentUsage
     */
    getFragmentUsage: {
      name: "GetFragmentUsage",
      I: Eg,
      O: wg,
      kind: m.Unary
    },
    /**
     * Sets a fragment tag to a revision
     *
     * @generated from rpc viam.app.v1.AppService.SetFragmentTag
     */
    setFragmentTag: {
      name: "SetFragmentTag",
      I: Og,
      O: Cg,
      kind: m.Unary
    },
    /**
     * Deletes a fragment tag
     *
     * @generated from rpc viam.app.v1.AppService.DeleteFragmentTag
     */
    deleteFragmentTag: {
      name: "DeleteFragmentTag",
      I: Ng,
      O: Pg,
      kind: m.Unary
    },
    /**
     * Creates an IdentityAuthorization
     *
     * @generated from rpc viam.app.v1.AppService.AddRole
     */
    addRole: {
      name: "AddRole",
      I: gT,
      O: TT,
      kind: m.Unary
    },
    /**
     * Deletes an IdentityAuthorization
     *
     * @generated from rpc viam.app.v1.AppService.RemoveRole
     */
    removeRole: {
      name: "RemoveRole",
      I: kT,
      O: yT,
      kind: m.Unary
    },
    /**
     * Changes an IdentityAuthorization to a new IdentityAuthorization
     *
     * @generated from rpc viam.app.v1.AppService.ChangeRole
     */
    changeRole: {
      name: "ChangeRole",
      I: vT,
      O: hT,
      kind: m.Unary
    },
    /**
     * Returns all authorization roles for a given resource
     *
     * @generated from rpc viam.app.v1.AppService.ListAuthorizations
     */
    listAuthorizations: {
      name: "ListAuthorizations",
      I: fT,
      O: RT,
      kind: m.Unary
    },
    /**
     * Validates a permission for the current user
     *
     * @generated from rpc viam.app.v1.AppService.CheckPermissions
     */
    checkPermissions: {
      name: "CheckPermissions",
      I: _T,
      O: ST,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.GetRegistryItem
     */
    getRegistryItem: {
      name: "GetRegistryItem",
      I: OT,
      O: CT,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.CreateRegistryItem
     */
    createRegistryItem: {
      name: "CreateRegistryItem",
      I: NT,
      O: PT,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.UpdateRegistryItem
     */
    updateRegistryItem: {
      name: "UpdateRegistryItem",
      I: DT,
      O: AT,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.ListRegistryItems
     */
    listRegistryItems: {
      name: "ListRegistryItems",
      I: qT,
      O: UT,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.DeleteRegistryItem
     */
    deleteRegistryItem: {
      name: "DeleteRegistryItem",
      I: LT,
      O: GT,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.RenameRegistryItem
     */
    renameRegistryItem: {
      name: "RenameRegistryItem",
      I: BT,
      O: xT,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.TransferRegistryItem
     */
    transferRegistryItem: {
      name: "TransferRegistryItem",
      I: FT,
      O: JT,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.CreateModule
     */
    createModule: {
      name: "CreateModule",
      I: zT,
      O: YT,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.UpdateModule
     */
    updateModule: {
      name: "UpdateModule",
      I: $T,
      O: VT,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.UploadModuleFile
     */
    uploadModuleFile: {
      name: "UploadModuleFile",
      I: XT,
      O: QT,
      kind: m.ClientStreaming
    },
    /**
     * @generated from rpc viam.app.v1.AppService.GetModule
     */
    getModule: {
      name: "GetModule",
      I: ZT,
      O: ek,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.ListModules
     */
    listModules: {
      name: "ListModules",
      I: ak,
      O: tk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.CreateKey
     */
    createKey: {
      name: "CreateKey",
      I: lk,
      O: dk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.DeleteKey
     */
    deleteKey: {
      name: "DeleteKey",
      I: pk,
      O: uk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.ListKeys
     */
    listKeys: {
      name: "ListKeys",
      I: yk,
      O: vk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.RenameKey
     */
    renameKey: {
      name: "RenameKey",
      I: gk,
      O: Tk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.RotateKey
     */
    rotateKey: {
      name: "RotateKey",
      I: hk,
      O: fk,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.CreateKeyFromExistingKeyAuthorizations
     */
    createKeyFromExistingKeyAuthorizations: {
      name: "CreateKeyFromExistingKeyAuthorizations",
      I: Rk,
      O: _k,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.GetAppContent
     */
    getAppContent: {
      name: "GetAppContent",
      I: Sk,
      O: Ik,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.app.v1.AppService.GetAppBranding
     */
    getAppBranding: {
      name: "GetAppBranding",
      I: zk,
      O: $k,
      kind: m.Unary
    }
  }
}, Ci = (a, e, n, t, o, i) => new Q({
  authorizationType: "role",
  identityId: e,
  identityType: o,
  authorizationId: `${t}_${n}`,
  resourceType: t,
  organizationId: a,
  resourceId: i
});
class M1 {
  client;
  constructor(e) {
    this.client = oa(b1, e);
  }
  /**
   * Obtain a user's ID from their email address. Internal use only.
   *
   * @example
   *
   * ```ts
   * // This method is used internally only. To obtain a user's ID, use the listOrganizationsByUser method.
   * const members = await appClient.listOrganizationMembers(
   *   '<YOUR-ORGANIZATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getuseridbyemail).
   *
   * @param email The email address of the user
   * @returns The user's ID
   */
  async getUserIDByEmail(e) {
    return (await this.client.getUserIDByEmail({ email: e })).userId;
  }
  /**
   * Create a new organization.
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#createorganization).
   *
   * @param name The name of the new organization
   * @returns The new organization
   */
  async createOrganization(e) {
    return (await this.client.createOrganization({ name: e })).organization;
  }
  /**
   * List all organizations.
   *
   * @example
   *
   * ```ts
   * const organizations = await appClient.listOrganizations();
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#listorganizations).
   *
   * @returns The organization list
   */
  async listOrganizations() {
    return (await this.client.listOrganizations({})).organizations;
  }
  /**
   * List all organizations with access to a particular location.
   *
   * @example
   *
   * ```ts
   * const organizations =
   *   await appClient.getOrganizationsWithAccessToLocation(
   *     '<YOUR-LOCATION-ID>'
   *   );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getorganizationswithaccesstolocation).
   *
   * @param locationId The ID of the location to query
   * @returns The list of locations with access to the requested location
   */
  async getOrganizationsWithAccessToLocation(e) {
    return (await this.client.getOrganizationsWithAccessToLocation({
      locationId: e
    })).organizationIdentities;
  }
  /**
   * List all organizations associated with a user. Internal use only.
   *
   * @param userId The ID of the user to query
   * @returns The list of locations the requested user has access to
   */
  async listOrganizationsByUser(e) {
    return (await this.client.listOrganizationsByUser({ userId: e })).orgs;
  }
  /**
   * Get details about an organization.
   *
   * @example
   *
   * ```ts
   * const organization = await appClient.getOrganization(
   *   '<YOUR-ORGANIZATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getorganization).
   *
   * @param organizationId The ID of the organization
   * @returns Details about the organization, if it exists
   */
  async getOrganization(e) {
    return (await this.client.getOrganization({ organizationId: e })).organization;
  }
  /**
   * Find out if an organization namespace is available.
   *
   * @example
   *
   * ```ts
   * const isAvailable =
   *   await appClient.getOrganizationNamespaceAvailability('name');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getorganizationnamespaceavailability).
   *
   * @param namespace The namespace to query for availability
   * @returns A boolean indicating whether or not the namespace is available
   */
  async getOrganizationNamespaceAvailability(e) {
    return (await this.client.getOrganizationNamespaceAvailability({
      publicNamespace: e
    })).available;
  }
  /**
   * Updates organization details.
   *
   * @example
   *
   * ```ts
   * const organization = await appClient.updateOrganization(
   *   '<YOUR-ORGANIZATION-ID>',
   *   'newName'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updateorganization).
   *
   * @param organizationId The id of the organization to update
   * @param name Optional name to update the organization with
   * @param publicNamespace Optional namespace to update the organization with
   * @param region Optional region to update the organization with
   * @param cid Optional CRM ID to update the organization with
   * @returns The updated organization details
   */
  async updateOrganization(e, n, t, o, i) {
    return (await this.client.updateOrganization({
      organizationId: e,
      name: n,
      publicNamespace: t,
      region: o,
      cid: i
    })).organization;
  }
  /**
   * Deletes an organization.
   *
   * @example
   *
   * ```ts
   * await appClient.deleteOrganization('<YOUR-ORGANIZATION-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#deleteorganization).
   *
   * @param organizationId The id of the organization to delete
   */
  async deleteOrganization(e) {
    await this.client.deleteOrganization({ organizationId: e });
  }
  /**
   * Lists organization memebers and outstanding invites.
   *
   * @example
   *
   * ```ts
   * const members = await appClient.listOrganizationMembers(
   *   '<YOUR-ORGANIZATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#listorganizationmembers).
   *
   * @param organizationId The id of the organization to query
   * @returns An object containing organization members, pending invites, and
   *   org ID
   */
  async listOrganizationMembers(e) {
    return this.client.listOrganizationMembers({ organizationId: e });
  }
  /**
   * Creates a new invitation to join an organization.
   *
   * @example
   *
   * ```ts
   * const auth = new VIAM.appApi.Authorization({
   *   authorizationType: 'role',
   *   authorizationId: 'organization_operator',
   *   organizationId: '<YOUR-ORGANIZATION-ID>',
   *   resourceId: '<YOUR-RESOURCE-ID>', // The resource to grant access to
   *   resourceType: 'organization', // The type of resource to grant access to
   *   identityId: '<YOUR-USER-ID>', // The user id of the user to grant access to (optional)
   *   roleId: 'owner', // The role to grant access to
   *   identityType: 'user',
   * });
   *
   * const invite = await appClient.createOrganizationInvite(
   *   '<YOUR-ORGANIZATION-ID>',
   *   'youremail@email.com',
   *   [auth]
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#createorganizationinvite).
   *
   * @param organizationId The id of the organization to create the invite for
   * @param email The email address of the user to generate an invite for
   * @param authorizations The authorizations to associate with the new invite
   * @param sendEmailInvite Bool of whether to send an email invite (true) or
   *   automatically add a user. Defaults to true
   * @returns The organization invite
   */
  async createOrganizationInvite(e, n, t, o = !0) {
    return (await this.client.createOrganizationInvite({
      organizationId: e,
      email: n,
      authorizations: t,
      sendEmailInvite: o
    })).invite;
  }
  /**
   * Updates authorizations for an existing org invite.
   *
   * @example
   *
   * ```ts
   * const auth = new VIAM.appApi.Authorization({
   *   authorizationType: 'role',
   *   authorizationId: 'organization_operator',
   *   organizationId: '<YOUR-ORGANIZATION-ID>',
   *   resourceId: '<YOUR-RESOURCE-ID>', // The resource to grant access to
   *   resourceType: 'organization', // The type of resource to grant access to
   *   identityId: '<YOUR-USER-ID>', // The user id of the user to grant access to (optional)
   *   roleId: 'owner', // The role to grant access to
   *   identityType: 'user',
   * });
   * const invite = await appClient.updateOrganizationInviteAuthorizations(
   *   '<YOUR-ORGANIZATION-ID>',
   *   'youremail@email.com',
   *   [auth],
   *   []
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updateorganizationinviteauthorizations).
   *
   * @param organizationId The id of the organization
   * @param email The email address associated with the invite
   * @param addAuthsList List of authorizations to add to the invite
   * @param removeAuthsList List of authorizations to remove from the invite
   * @returns The organization invite
   */
  async updateOrganizationInviteAuthorizations(e, n, t, o) {
    return (await this.client.updateOrganizationInviteAuthorizations({
      organizationId: e,
      email: n,
      addAuthorizations: t,
      removeAuthorizations: o
    })).invite;
  }
  /**
   * Removes a member from an organization.
   *
   * @example
   *
   * ```ts
   * await appClient.deleteOrganizationMember(
   *   '<YOUR-ORGANIZATION-ID>',
   *   '<YOUR-USER-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#deleteorganizationmember).
   *
   * @param organizationId The ID of the organization
   * @param userId The ID of the user
   */
  async deleteOrganizationMember(e, n) {
    await this.client.deleteOrganizationMember({ organizationId: e, userId: n });
  }
  /**
   * Deletes a pending organization invite.
   *
   * @example
   *
   * ```ts
   * await appClient.deleteOrganizationInvite(
   *   '<YOUR-ORGANIZATION-ID>',
   *   'youremail@email.com'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#deleteorganizationinvite).
   *
   * @param organizationId The ID of the organization
   * @param email The email associated with the invite to delete
   */
  async deleteOrganizationInvite(e, n) {
    await this.client.deleteOrganizationInvite({ organizationId: e, email: n });
  }
  /**
   * Resends a pending organization invite.
   *
   * @example
   *
   * ```ts
   * const invite = await appClient.resendOrganizationInvite(
   *   '<YOUR-ORGANIZATION-ID>',
   *   'youremail@email.com'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#resendorganizationinvite).
   *
   * @param organizationId The ID of the organization
   * @param email The email associated with the invite to resend
   * @returns The invite
   */
  async resendOrganizationInvite(e, n) {
    return (await this.client.resendOrganizationInvite({
      organizationId: e,
      email: n
    })).invite;
  }
  /**
   * Creates a new location.
   *
   * @example
   *
   * ```ts
   * const location = await appClient.createLocation(
   *   '<YOUR-ORGANIZATION-ID>',
   *   'name'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#createlocation).
   *
   * @param organizationId The ID of the organization to create the location
   *   under
   * @param name The name of the location to create
   * @param parentLocationId Optional name of a parent location to create the
   *   new location under
   * @returns The location object
   */
  async createLocation(e, n, t) {
    return (await this.client.createLocation({
      organizationId: e,
      name: n,
      parentLocationId: t
    })).location;
  }
  /**
   * Looks up a location.
   *
   * @example
   *
   * ```ts
   * const location = await appClient.getLocation('<YOUR-LOCATION-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getlocation).
   *
   * @param locId The ID of the location to query.
   * @returns The location object
   */
  async getLocation(e) {
    return (await this.client.getLocation({
      locationId: e
    })).location;
  }
  /**
   * Updates location details.
   *
   * @example
   *
   * ```ts
   * const location = await appClient.updateLocation(
   *   '<YOUR-LOCATION-ID>',
   *   'newName'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updatelocation).
   *
   * @param locId The ID of the location to update
   * @param name Optional string to update the location's name to
   * @param parentLocId Optional string to update the location's parent location
   *   to
   * @param region Optional string to update the location's region to
   * @returns The location object
   */
  async updateLocation(e, n, t, o) {
    return (await this.client.updateLocation({
      locationId: e,
      name: n,
      parentLocationId: t,
      region: o
    })).location;
  }
  /**
   * Deletes a location
   *
   * @example
   *
   * ```ts
   * await appClient.deleteLocation('<YOUR-LOCATION-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#deletelocation).
   *
   * @param locId The ID of the location to delete
   */
  async deleteLocation(e) {
    await this.client.deleteLocation({ locationId: e });
  }
  /**
   * Lists all locations under an organization.
   *
   * @example
   *
   * ```ts
   * const locations = await appClient.listLocations(
   *   '<YOUR-ORGANIZATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#listlocations).
   *
   * @param organizationId The ID of the organization to query
   * @returns A list of locations under the organization
   */
  async listLocations(e) {
    return (await this.client.listLocations({ organizationId: e })).locations;
  }
  /**
   * Shares a location with another organization
   *
   * @example
   *
   * ```ts
   * await appClient.shareLocation(
   *   '<OTHER-ORGANIZATION-ID>',
   *   '<YOUR-LOCATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#sharelocation).
   *
   * @param organizationId The ID of the organization to share with
   * @param locId The ID of the location to share
   */
  async shareLocation(e, n) {
    await this.client.shareLocation({ organizationId: e, locationId: n });
  }
  /**
   * Unshares a location with an organization
   *
   * @example
   *
   * ```ts
   * await appClient.unshareLocation(
   *   '<OTHER-ORGANIZATION-ID>',
   *   '<YOUR-LOCATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#unsharelocation).
   *
   * @param organizationId The ID of the organization to unshare with
   * @param locId The ID of the location to unshare
   */
  async unshareLocation(e, n) {
    await this.client.unshareLocation({ organizationId: e, locationId: n });
  }
  /**
   * Get a location's `LocationAuth` (location secret(s)).
   *
   * @example
   *
   * ```ts
   * const locationAuth = await appClient.locationAuth(
   *   '<YOUR-LOCATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#locationauth).
   *
   * @param locId The ID of the location to retrieve `LocationAuth` from.
   * @returns The `LocationAuth` for the requested location.
   */
  async locationAuth(e) {
    return (await this.client.locationAuth({ locationId: e })).auth;
  }
  /**
   * Create a location secret (`LocationAuth`).
   *
   * @example
   *
   * ```ts
   * const locationAuth = await appClient.createLocationSecret(
   *   '<YOUR-LOCATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#createlocationsecret).
   *
   * @param locId The ID of the location to create a `LocationAuth` for
   * @returns The newly created `LocationAuth`
   */
  async createLocationSecret(e) {
    return (await this.client.createLocationSecret({ locationId: e })).auth;
  }
  /**
   * Deletes a location secret (`LocationAuth`).
   *
   * @example
   *
   * ```ts
   * await appClient.deleteLocationSecret(
   *   '<YOUR-LOCATION-ID>',
   *   '<YOUR-SECRET-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#deletelocationsecret).
   *
   * @param locId The ID of the location to delete the `LocationAuth` from
   * @param secretId The ID of the location secret to delete
   */
  async deleteLocationSecret(e, n) {
    await this.client.deleteLocationSecret({ locationId: e, secretId: n });
  }
  /**
   * Queries a robot by its ID.
   *
   * @example
   *
   * ```ts
   * const robot = await appClient.getRobot('<YOUR-ROBOT-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getrobot).
   *
   * @param id The ID of the robot
   * @returns The `Robot` object
   */
  async getRobot(e) {
    return (await this.client.getRobot({ id: e })).robot;
  }
  /**
   * Returns a list of rover rental robots for an organization.
   *
   * @example
   *
   * ```ts
   * const roverRentalRobots = await appClient.getRoverRentalRobots(
   *   '<YOUR-ORGANIZATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getroverrentalrobots).
   *
   * @param orgId The ID of the organization to query
   * @returns The list of `RoverRentalRobot` objects
   */
  async getRoverRentalRobots(e) {
    return (await this.client.getRoverRentalRobots({ orgId: e })).robots;
  }
  /**
   * Returns a list of parts for a given robot
   *
   * @example
   *
   * ```ts
   * const robotParts = await appClient.getRobotParts('<YOUR-ROBOT-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getrobotparts).
   *
   * @param robotId The ID of the robot to query
   * @returns The list of `RobotPart` objects associated with the robot
   */
  async getRobotParts(e) {
    return (await this.client.getRobotParts({ robotId: e })).parts;
  }
  /**
   * Queries a specific robot part by ID.
   *
   * @example
   *
   * ```ts
   * const robotPart = await appClient.getRobotPart('<YOUR-ROBOT-PART-ID>');
   * // Get the part's address
   * const address = robotPart.part.fqdn;
   * // Check if machine is live (last access time less than 10 sec ago)
   * if (
   *   Date.now() - Number(robotPart.part.lastAccess.seconds) * 1000 <=
   *   10000
   * ) {
   *   console.log('Machine is live');
   * }
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getrobotpart).
   *
   * @param id The ID of the requested robot part
   * @returns The robot part and a its json config
   */
  async getRobotPart(e) {
    return this.client.getRobotPart({ id: e });
  }
  /**
   * Queries a specific robot part by name and location id.
   *
   * @example
   *
   * ```ts
   * const robotPart = await appClient.getRobotPartByNameAndLocation(
   *   '<YOUR-ROBOT-PART-NAME>',
   *   '<YOUR-LOCATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getrobotpartbynameandlocation).
   *
   * @param name The name of the requested robot part
   * @param locationId The ID of the location of the requested robot part
   * @returns The robot part
   */
  async getRobotPartByNameAndLocation(e, n) {
    return this.client.getRobotPartByNameAndLocation({ name: e, locationId: n });
  }
  /**
   * Get a page of log entries for a specific robot part. Logs are sorted by
   * descending time (newest first).
   *
   * @example
   *
   * ```ts
   * const robotPartLogs = await appClient.getRobotPartLogs(
   *   '<YOUR-ROBOT-PART-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getrobotpartlogs).
   *
   * @param id The ID of the requested robot part
   * @param filter Optional string to filter logs on
   * @param levels Optional array of log levels to return. Defaults to returning
   *   all log levels
   * @param pageToken Optional string indicating which page of logs to query.
   *   Defaults to the most recent
   * @returns The robot requested logs and the page token for the next page of
   *   logs
   */
  async getRobotPartLogs(e, n, t, o = "") {
    return this.client.getRobotPartLogs({
      id: e,
      filter: n,
      levels: t,
      pageToken: o
    });
  }
  /**
   * Get a stream of log entries for a specific robot part. Logs are sorted by
   * descending time (newest first).
   *
   * @example
   *
   * ```ts
   * const robotPartLogs = await appClient.tailRobotPartLogs(
   *   '<YOUR-ROBOT-PART-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#tailrobotpartlogs).
   *
   * @param id The ID of the requested robot part
   * @param queue A queue to put the log entries into
   * @param filter Optional string to filter logs on
   * @param errorsOnly Optional bool to indicate whether or not only error-level
   *   logs should be returned. Defaults to true
   */
  async tailRobotPartLogs(e, n, t, o = !0) {
    const i = this.client.tailRobotPartLogs({
      id: e,
      errorsOnly: o,
      filter: t
    });
    for await (const r of i)
      for (const c of r.logs)
        n.push(c);
  }
  /**
   * Get a list containing the history of a robot part.
   *
   * @example
   *
   * ```ts
   * const robotPartHistory = await appClient.getRobotPartHistory(
   *   '<YOUR-ROBOT-PART-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getrobotparthistory).
   *
   * @param id The ID of the requested robot part
   * @returns The list of the robot part's history
   */
  async getRobotPartHistory(e) {
    return (await this.client.getRobotPartHistory({ id: e })).history;
  }
  /**
   * Updates a robot part based on its ID.
   *
   * @example
   *
   * ```ts
   * const robotPart = await appClient.updateRobotPart(
   *   '<YOUR-ROBOT-PART-ID>',
   *   'newName'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updaterobotpart).
   *
   * @param id The ID of the requested robot part
   * @param name The new name of the robot part
   * @param robotConfig The new config for the robot part
   * @returns The updated robot part
   */
  async updateRobotPart(e, n, t) {
    return (await this.client.updateRobotPart({ id: e, name: n, robotConfig: t })).part;
  }
  /**
   * Creates a new robot part.
   *
   * @example
   *
   * ```ts
   * const robotPartId = await appClient.newRobotPart(
   *   '<YOUR-ROBOT-ID>',
   *   'newPart'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#newrobotpart).
   *
   * @param robotId The ID of the robot to create a part for
   * @param partName The name for the new robot part
   * @returns The ID of the newly-created robot part
   */
  async newRobotPart(e, n) {
    return (await this.client.newRobotPart({ robotId: e, partName: n })).partId;
  }
  /**
   * Deletes a robot part.
   *
   * @example
   *
   * ```ts
   * await appClient.deleteRobotPart('<YOUR-ROBOT-PART-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#deleterobotpart).
   *
   * @param partId The ID of the part to delete
   */
  async deleteRobotPart(e) {
    await this.client.deleteRobotPart({ partId: e });
  }
  /**
   * Gets a list of a robot's API keys.
   *
   * @example
   *
   * ```ts
   * const robotAPIKeys =
   *   await appClient.getRobotAPIKeys('<YOUR-ROBOT-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getrobotapikeys).
   *
   * @param robotId The ID of the robot to get API keys for
   * @returns A list of the robot's API keys
   */
  async getRobotAPIKeys(e) {
    return (await this.client.getRobotAPIKeys({ robotId: e })).apiKeys;
  }
  /**
   * Marks a robot part as the main part.
   *
   * @example
   *
   * ```ts
   * await appClient.markPartAsMain('<YOUR-ROBOT-PART-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#markpartasmain).
   *
   * @param partId The ID of the part to mark as main
   */
  async markPartAsMain(e) {
    await this.client.markPartAsMain({ partId: e });
  }
  /**
   * Marks a robot part for restart.
   *
   * @example
   *
   * ```ts
   * await appClient.markPartForRestart('<YOUR-ROBOT-PART-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#markpartforrestart).
   *
   * @param partId The ID of the part to mark for restart
   */
  async markPartForRestart(e) {
    await this.client.markPartForRestart({ partId: e });
  }
  /**
   * Creates a new secret for a robot part.
   *
   * @example
   *
   * ```ts
   * const robotPart = await appClient.createRobotPartSecret(
   *   '<YOUR-ROBOT-PART-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#createrobotpartsecret).
   *
   * @param partId The ID of the part to create a secret for
   * @returns The robot part object
   */
  async createRobotPartSecret(e) {
    return (await this.client.createRobotPartSecret({ partId: e })).part;
  }
  /**
   * Deletes a robot secret from a robot part.
   *
   * @example
   *
   * ```ts
   * await appClient.deleteRobotPartSecret(
   *   '<YOUR-ROBOT-PART-ID>',
   *   '<YOUR-SECRET-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#deleterobotpartsecret).
   *
   * @param partId The ID of the part to delete a secret from
   * @param secretId The ID of the secret to delete
   */
  async deleteRobotPartSecret(e, n) {
    await this.client.deleteRobotPartSecret({ partId: e, secretId: n });
  }
  /**
   * Lists all robots in a location.
   *
   * @example
   *
   * ```ts
   * const robots = await appClient.listRobots('<YOUR-LOCATION-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#listrobots).
   *
   * @param locId The ID of the location to list robots for
   * @returns The list of robot objects
   */
  async listRobots(e) {
    return (await this.client.listRobots({ locationId: e })).robots;
  }
  /**
   * Creates a new robot.
   *
   * @example
   *
   * ```ts
   * const robotId = await appClient.newRobot(
   *   '<YOUR-LOCATION-ID>',
   *   'newRobot'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#newrobot).
   *
   * @param locId The ID of the location to create the robot in
   * @param name The name of the new robot
   * @returns The new robot's ID
   */
  async newRobot(e, n) {
    return (await this.client.newRobot({ name: n, location: e })).id;
  }
  /**
   * Change the name of an existing machine. You can only change the name of the
   * machine, not the location.
   *
   * @example
   *
   * ```ts
   * const robot = await appClient.updateRobot(
   *   '<YOUR-ROBOT-ID>',
   *   '<YOUR-LOCATION-ID>',
   *   'newName'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updaterobot).
   *
   * @param robotId The ID of the robot to update
   * @param locId The ID of the location where the robot is
   * @param name The name to update the robot to
   * @returns The newly-modified robot object
   */
  async updateRobot(e, n, t) {
    return (await this.client.updateRobot({
      id: e,
      location: n,
      name: t
    })).robot;
  }
  /**
   * Deletes a robot.
   *
   * @example
   *
   * ```ts
   * await appClient.deleteRobot('<YOUR-ROBOT-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#deleterobot).
   *
   * @param id The ID of the robot to delete
   */
  async deleteRobot(e) {
    await this.client.deleteRobot({ id: e });
  }
  /**
   * Lists all fragments within an organization.
   *
   * @example
   *
   * ```ts
   * const fragments = await appClient.listFragments(
   *   '<YOUR-ORGANIZATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#listfragments).
   *
   * @param organizationId The ID of the organization to list fragments for
   * @param publicOnly Optional, deprecated boolean. Use fragmentVisibilities
   *   instead. If true then only public fragments will be listed. Defaults to
   *   true
   * @param fragmentVisibilities Optional list of fragment visibilities to
   *   include in returned list. An empty fragmentVisibilities list defaults to
   *   normal publicOnly behavior (discludes unlisted public fragments)
   *   Otherwise, fragment visibilities should contain one of the three
   *   visibilities and takes precendence over the publicOnly field
   * @returns The list of fragment objects
   */
  async listFragments(e, n = !0, t = []) {
    return (await this.client.listFragments({
      organizationId: e,
      showPublic: n,
      fragmentVisibility: t
    })).fragments;
  }
  /**
   * Looks up a fragment by ID.
   *
   * @example
   *
   * ```ts
   * const fragment = await appClient.getFragment(
   *   '12a12ab1-1234-5678-abcd-abcd01234567'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getfragment).
   *
   * @param id The ID of the fragment to look up
   * @returns The requested fragment
   */
  async getFragment(e) {
    return (await this.client.getFragment({ id: e })).fragment;
  }
  /**
   * Creates a new fragment.
   *
   * @example
   *
   * ```ts
   * const fragment = await appClient.createFragment(
   *   '<YOUR-ORGANIZATION-ID>',
   *   'newFragment'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#createfragment).
   *
   * @param organizationId The ID of the organization to create the fragment
   *   under
   * @param name The name of the new fragment
   * @param config The new fragment's config
   * @returns The newly created fragment
   */
  async createFragment(e, n, t) {
    return (await this.client.createFragment({
      organizationId: e,
      name: n,
      config: t
    })).fragment;
  }
  /**
   * Updates an existing fragment.
   *
   * @example
   *
   * ```ts
   * const fragment = await appClient.updateFragment(
   *   '12a12ab1-1234-5678-abcd-abcd01234567',
   *   'better_name'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updatefragment).
   *
   * @param id The ID of the fragment to update
   * @param name The name to update the fragment to
   * @param config The config to update the fragment to
   * @param makePublic Optional, deprecated boolean specifying whether the
   *   fragment should be public or not. If not passed, the visibility will be
   *   unchanged. Fragments are private by default when created
   * @param visibility Optional FragmentVisibility specifying the updated
   *   fragment visibility. If not passed, the visibility will be unchanged. If
   *   visibility is not set and makePublic is set, makePublic takes effect. If
   *   makePublic and visibility are set, they must not be conflicting. If
   *   neither is set, the fragment visibility will remain unchanged.
   * @returns The updated fragment
   */
  async updateFragment(e, n, t, o, i) {
    return (await this.client.updateFragment({
      id: e,
      name: n,
      config: t,
      public: o,
      visibility: i
    })).fragment;
  }
  /**
   * Deletes a fragment.
   *
   * @example
   *
   * ```ts
   * await appClient.deleteFragment('12a12ab1-1234-5678-abcd-abcd01234567');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#deletefragment).
   *
   * @param id The ID of the fragment to delete
   */
  async deleteFragment(e) {
    await this.client.deleteFragment({ id: e });
  }
  /**
   * @example
   *
   * ```ts
   * const fragments = await appClient.listMachineFragments(
   *   '<YOUR-MACHINE-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#listmachinefragments).
   *
   * @param machineId The machine ID used to filter fragments defined in a
   *   machine's parts. Also returns any fragments nested within the fragments
   *   defined in parts.
   * @param additionalFragmentIds Additional fragment IDs to append to the
   *   response. Useful when needing to view fragments that will be
   *   provisionally added to the machine alongside existing fragments.
   * @returns The list of top level and nested fragments for a machine, as well
   *   as additionally specified fragment IDs.
   */
  async listMachineFragments(e, n) {
    return (await this.client.listMachineFragments({
      machineId: e,
      additionalFragmentIds: n
    })).fragments;
  }
  /**
   * Add a role under an organization.
   *
   * @example
   *
   * ```ts
   * await appClient.addRole(
   *   '<YOUR-ORGANIZATION-ID>',
   *   '<YOUR-USER-ID>',
   *   'owner',
   *   'robot',
   *   '<YOUR-ROBOT-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#addrole).
   *
   * @param organizationId The ID of the organization to create the role under
   * @param entityId The ID of the entity the role belongs to (for example a
   *   user ID)
   * @param role The role to add ("owner" or "operator")
   * @param resourceType The type of resource to create the role for ("robot",
   *   "location", or "organization")
   * @param resourceId The ID of the resource the role is being created for
   */
  async addRole(e, n, t, o, i) {
    await this.client.addRole({
      authorization: Ci(
        e,
        n,
        t,
        o,
        "",
        i
      )
    });
  }
  /**
   * Removes a role from an organization.
   *
   * @example
   *
   * ```ts
   * await appClient.removeRole(
   *   '<YOUR-ORGANIZATION-ID>',
   *   '<YOUR-USER-ID>',
   *   'owner',
   *   'robot',
   *   '<YOUR-ROBOT-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#removerole).
   *
   * @param organizationId The ID of the organization to remove the role from
   * @param entityId The ID of the entity the role belongs to (for example a
   *   user ID)
   * @param role The role to remove ("owner" or "operator")
   * @param resourceType The type of resource to remove the role from ("robot",
   *   "location", or "organization")
   * @param resourceId The ID of the resource the role is being removes from
   */
  async removeRole(e, n, t, o, i) {
    await this.client.removeRole({
      authorization: Ci(
        e,
        n,
        t,
        o,
        "",
        i
      )
    });
  }
  /**
   * Changes an existing role.
   *
   * @example
   *
   * ```ts
   * const oldAuth = new VIAM.appApi.Authorization({
   *   authorizationType: 'role',
   *   authorizationId: 'organization_owner',
   *   organizationId: '<YOUR-ORGANIZATION-ID>',
   *   resourceId: '<YOUR-RESOURCE-ID>', // The resource to grant access to
   *   resourceType: 'organization', // The type of resource to grant access to
   *   identityId: '<USER-ID>', // The user id of the user to grant access to (optional)
   *   roleId: 'owner', // The role to grant access to
   *   identityType: 'user',
   * });
   * const newAuth = new VIAM.appApi.Authorization({
   *   authorizationType: 'role',
   *   authorizationId: 'organization_operator',
   *   organizationId: '<YOUR-ORGANIZATION-ID>',
   *   resourceId: '<YOUR-RESOURCE-ID>', // The resource to grant access to
   *   resourceType: 'organization', // The type of resource to grant access To
   *   identityId: '<USER-ID>', // The user id of the user to grant access to (optional)
   *   roleId: 'operator', // The role to grant access to
   *   identityType: 'user',
   * });
   * await appClient.changeRole(oldAuth, newAuth);
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#changerole).
   *
   * @param oldAuthorization The existing authorization
   * @param newAuthorization The new authorization to change to
   */
  async changeRole(e, n) {
    await this.client.changeRole({ oldAuthorization: e, newAuthorization: n });
  }
  /**
   * List all authorizations for an organization.
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#listauthorizations).
   *
   * @param organizationId The ID of the organization to list authorizations for
   * @param resourceIds Optional list of IDs of resources to list authorizations
   *   for. If not provided, all resources will be included
   * @returns The list of authorizations
   */
  async listAuthorizations(e, n) {
    return (await this.client.listAuthorizations({
      organizationId: e,
      resourceIds: n
    })).authorizations;
  }
  /**
   * Checks whether requested permissions exist.
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#checkpermissions).
   *
   * @param permissions A list of permissions to check
   * @returns A filtered list of the authorized permissions
   */
  async checkPermissions(e) {
    return (await this.client.checkPermissions({ permissions: e })).authorizedPermissions;
  }
  /**
   * Get an item from the registry.
   *
   * @example
   *
   * ```ts
   * const registryItem = await appClient.getRegistryItem(
   *   '<YOUR-REGISTRY-ITEM-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getregistryitem).
   *
   * @param itemId The ID of the item to get
   * @returns The requested item
   */
  async getRegistryItem(e) {
    return (await this.client.getRegistryItem({ itemId: e })).item;
  }
  /**
   * Create a new registry item.
   *
   * @example
   *
   * ```ts
   * await appClient.createRegistryItem(
   *   '<YOUR-ORGANIZATION-ID>',
   *   'newRegistryItemName',
   *   5
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#createregistryitem).
   *
   * @param organizationId The ID of the organization to create the registry
   *   item under
   * @param name The name of the registry item
   * @param type The type of the item in the registry.
   */
  async createRegistryItem(e, n, t) {
    await this.client.createRegistryItem({
      organizationId: e,
      name: n,
      type: t
    });
  }
  /**
   * Update an existing registry item.
   *
   * @example
   *
   * ```ts
   * await appClient.updateRegistryItem(
   *   '<YOUR-REGISTRY-ITEM-ID>',
   *   5, // Package: ML Model
   *   'new description',
   *   1 // Private
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updateregistryitem).
   *
   * @param itemId The ID of the registry item to update
   * @param type The PackageType to update the item to
   * @param description A description of the item
   * @param visibility A visibility value to update to
   */
  async updateRegistryItem(e, n, t, o) {
    await this.client.updateRegistryItem({
      itemId: e,
      type: n,
      description: t,
      visibility: o
    });
  }
  /**
   * List all registry items for an organization.
   *
   * @example
   *
   * ```ts
   * const registryItems = await appClient.listRegistryItems(
   *   '<YOUR-ORGANIZATION-ID>',
   *   [], // All package types
   *   [1], // Private packages
   *   [],
   *   [1] // Active packages
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#listregistryitems).
   *
   * @param organizationId The ID of the organization to query registry items
   *   for
   * @param types A list of types to query. If empty, will not filter on type
   * @param visibilities A list of visibilities to query for. If empty, will not
   *   filter on visibility
   * @param platforms A list of platforms to query for. If empty, will not
   *   filter on platform
   * @param statuses A list of statuses to query for. If empty, will not filter
   *   on status
   * @param searchTerm Optional search term to filter on
   * @param pageToken Optional page token for results. If not provided, will
   *   return all results
   * @returns The list of registry items
   */
  async listRegistryItems(e, n, t, o, i, r, c) {
    const d = {
      organizationId: e,
      types: n,
      visibilities: t,
      platforms: o,
      statuses: i,
      searchTerm: r,
      pageToken: c
    };
    return (await this.client.listRegistryItems(d)).items;
  }
  /**
   * Deletes a registry item.
   *
   * @example
   *
   * ```ts
   * await appClient.deleteRegistryItem('<YOUR-REGISTRY-ITEM-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#deleteregistryitem).
   *
   * @param itemId The ID of the item to delete
   */
  async deleteRegistryItem(e) {
    await this.client.deleteRegistryItem({
      itemId: e
    });
  }
  /**
   * Creates a new module.
   *
   * @example
   *
   * ```ts
   * const module = await appClient.createModule(
   *   '<YOUR-ORGANIZATION-ID>',
   *   'newModule'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#createmodule).
   *
   * @param organizationId The ID of the organization to create the module under
   * @param name The name of the module
   * @returns The module ID and a URL to its detail page
   */
  async createModule(e, n) {
    return this.client.createModule({
      organizationId: e,
      name: n
    });
  }
  /**
   * Updates an existing module.
   *
   * @example
   *
   * ```ts
   * const module = await appClient.updateModule(
   *   '<YOUR-MODULE-ID>',
   *   1,
   *   'https://example.com',
   *   'new description',
   *   [{ model: 'namespace:group:model1', api: 'rdk:component:generic' }],
   *   'entrypoint'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updatemodule).
   *
   * @param moduleId The ID of the module to update
   * @param visibility The visibility to set for the module
   * @param url The url to reference for documentation, code, etc.
   * @param description A short description of the module
   * @param models A list of models available in the module
   * @param entrypoint The executable to run to start the module program
   * @returns The module URL
   */
  async updateModule(e, n, t, o, i, r) {
    return (await this.client.updateModule({
      moduleId: e,
      visibility: n,
      url: t,
      description: o,
      models: i,
      entrypoint: r
    })).url;
  }
  /**
   * Looks up a particular module.
   *
   * @example
   *
   * ```ts
   * const module = await appClient.getModule('<YOUR-MODULE-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getmodule).
   *
   * @param moduleId The ID of the module
   * @returns The requested module
   */
  async getModule(e) {
    return (await this.client.getModule({ moduleId: e })).module;
  }
  /**
   * Lists all modules for an organization.
   *
   * @example
   *
   * ```ts
   * const modules = await appClient.listModules('<YOUR-ORGANIZATION-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#listmodules).
   *
   * @param organizationId The ID of the organization to query
   * @returns The organization's modules
   */
  async listModules(e) {
    return (await this.client.listModules({ organizationId: e })).modules;
  }
  /**
   * Creates a new API key.
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#createkey).
   *
   * @param authorizations The list of authorizations to provide for the API key
   * @param name An optional name for the key. If none is passed, defaults to
   *   present timestamp
   * @returns The new key and ID
   */
  async createKey(e, n) {
    return this.client.createKey({ name: n, authorizations: e });
  }
  /**
   * Deletes an existing API key.
   *
   * @example
   *
   * ```ts
   * await appClient.deleteKey('<YOUR-KEY-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#deletekey).
   *
   * @param id The ID of the key to delete
   */
  async deleteKey(e) {
    return this.client.deleteKey({ id: e });
  }
  /**
   * List all API keys for an organization.
   *
   * @example
   *
   * ```ts
   * const keys = await appClient.listKeys('<YOUR-ORGANIZATION-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#listkeys).
   *
   * @param orgId The ID of the organization to query
   * @returns The list of API keys
   */
  async listKeys(e) {
    return (await this.client.listKeys({ orgId: e })).apiKeys;
  }
  /**
   * Rotates an existing API key.
   *
   * @example
   *
   * ```ts
   * const key = await appClient.rotateKey('<YOUR-KEY-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#rotatekey).
   *
   * @param id The ID of the key to rotate
   * @returns The updated key and ID
   */
  async rotateKey(e) {
    return this.client.rotateKey({ id: e });
  }
  /**
   * Creates a new key with an existing key's authorizations
   *
   * @example
   *
   * ```ts
   * const key =
   *   await appClient.createKeyFromExistingKeyAuthorizations(
   *     '<YOUR-KEY-ID>'
   *   );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#createkeyfromexistingkeyauthorizations).
   *
   * @param id The ID of the key to duplicate
   * @returns The new key and ID
   */
  async createKeyFromExistingKeyAuthorizations(e) {
    return this.client.createKeyFromExistingKeyAuthorizations({ id: e });
  }
  /**
   * Retrieves the app content for an organization.
   *
   * @example
   *
   * ```ts
   * const appContent = await appClient.getAppContent(
   *   '<YOUR-PUBLIC-NAMESPACE>',
   *   '<YOUR-APP-NAME>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getappcontent).
   *
   * @param publicNamespace The public namespace of the organization
   * @param name The name of the app
   * @returns The blob path and entrypoint of the app content
   */
  async getAppContent(e, n) {
    return this.client.getAppContent({ publicNamespace: e, name: n });
  }
  /**
   * Retrieves user-defined metadata for an organization.
   *
   * @example
   *
   * ```ts
   * const metadata = await appClient.getOrganizationMetadata(
   *   '<YOUR-ORGANIZATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getorganizationmetadata).
   *
   * @param id The ID of the organization
   * @returns The metadata associated with the organization
   */
  async getOrganizationMetadata(e) {
    return (await this.client.getOrganizationMetadata({
      organizationId: e
    })).toJson().data ?? {};
  }
  /**
   * Updates user-defined metadata for an organization.
   *
   * @example
   *
   * ```ts
   * await appClient.updateOrganizationMetadata('<YOUR-ORGANIZATION-ID>', {
   *   key: 'value',
   * });
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updateorganizationmetadata).
   *
   * @param id The ID of the organization
   * @param data The metadata to update
   */
  async updateOrganizationMetadata(e, n) {
    await this.client.updateOrganizationMetadata({
      organizationId: e,
      data: l.fromJson(n)
    });
  }
  /**
   * Retrieves user-defined metadata for a location.
   *
   * @example
   *
   * ```ts
   * const metadata = await appClient.getLocationMetadata(
   *   '<YOUR-LOCATION-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getlocationmetadata).
   *
   * @param id The ID of the location
   * @returns The metadata associated with the location
   */
  async getLocationMetadata(e) {
    return (await this.client.getLocationMetadata({ locationId: e })).toJson().data ?? {};
  }
  /**
   * Updates user-defined metadata for a location.
   *
   * @example
   *
   * ```ts
   * await appClient.updateLocationMetadata('<YOUR-LOCATION-ID>', {
   *   key: 'value',
   * });
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updatelocationmetadata).
   *
   * @param id The ID of the location
   * @param data The metadata to update
   */
  async updateLocationMetadata(e, n) {
    await this.client.updateLocationMetadata({
      locationId: e,
      data: l.fromJson(n)
    });
  }
  /**
   * Retrieves user-defined metadata for a robot.
   *
   * @example
   *
   * ```ts
   * const metadata = await appClient.getRobotMetadata('<YOUR-ROBOT-ID>');
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getrobotmetadata).
   *
   * @param id The ID of the robot
   * @returns The metadata associated with the robot
   */
  async getRobotMetadata(e) {
    return (await this.client.getRobotMetadata({ id: e })).toJson().data ?? {};
  }
  /**
   * Updates user-defined metadata for a robot.
   *
   * @example
   *
   * ```ts
   * await appClient.updateRobotMetadata('<YOUR-ROBOT-ID>', {
   *   key: 'value',
   * });
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updaterobotmetadata).
   *
   * @param id The ID of the robot
   * @param data The metadata to update
   */
  async updateRobotMetadata(e, n) {
    await this.client.updateRobotMetadata({ id: e, data: l.fromJson(n) });
  }
  /**
   * Retrieves user-defined metadata for a robot part.
   *
   * @example
   *
   * ```ts
   * const metadata = await appClient.getRobotPartMetadata(
   *   '<YOUR-ROBOT-PART-ID>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getrobotpartmetadata).
   *
   * @param id The ID of the robot part
   * @returns The metadata associated with the robot part
   */
  async getRobotPartMetadata(e) {
    return (await this.client.getRobotPartMetadata({ id: e })).toJson().data ?? {};
  }
  /**
   * Updates user-defined metadata for a robot part.
   *
   * @example
   *
   * ```ts
   * await appClient.updateRobotPartMetadata('<YOUR-ROBOT-PART-ID>', {
   *   key: 'value',
   * });
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#updaterobotpartmetadata).
   *
   * @param id The ID of the robot part
   * @param data The metadata to update
   */
  async updateRobotPartMetadata(e, n) {
    await this.client.updateRobotPartMetadata({
      id: e,
      data: l.fromJson(n)
    });
  }
  /**
   * Retrieves the app branding for an organization/app.
   *
   * @example
   *
   * ```ts
   * const branding = await appClient.getAppBranding(
   *   '<YOUR-PUBLIC-NAMESPACE>',
   *   '<YOUR-APP-NAME>'
   * );
   * ```
   *
   * For more information, see [App
   * API](https://docs.viam.com/dev/reference/apis/fleet/#getappbranding).
   *
   * @param publicNamespace The public namespace of the organization
   * @param name The name of the app
   * @returns The branding information for the app
   */
  async getAppBranding(e, n) {
    return this.client.getAppBranding({ publicNamespace: e, name: n });
  }
  /**
   * Lists machine summaries for an organization, optionally filtered by
   * fragment IDs, location IDs, and limit.
   *
   * @example
   *
   * ```ts
   * const summaries = await appClient.listMachineSummaries(
   *   'orgId',
   *   ['frag1'],
   *   ['loc1'],
   *   10
   * );
   * ```
   *
   * @param organizationId The ID of the organization
   * @param fragmentIds Optional list of fragment IDs to filter machines
   * @param locationIds Optional list of location IDs to filter machines
   * @param limit Optional max number of machines to return
   * @returns The list of location summaries
   */
  async listMachineSummaries(e, n, t, o) {
    const i = new Po({
      organizationId: e,
      fragmentIds: n,
      locationIds: t,
      limit: o
    });
    return (await this.client.listMachineSummaries(i)).locationSummaries;
  }
}
const jk = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.PaymentMethodType",
  [
    { no: 0, name: "PAYMENT_METHOD_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "PAYMENT_METHOD_TYPE_CARD", localName: "CARD" }
  ]
), Hk = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.UsageCostType",
  [
    { no: 0, name: "USAGE_COST_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "USAGE_COST_TYPE_DATA_UPLOAD", localName: "DATA_UPLOAD" },
    { no: 2, name: "USAGE_COST_TYPE_DATA_EGRESS", localName: "DATA_EGRESS" },
    { no: 3, name: "USAGE_COST_TYPE_REMOTE_CONTROL", localName: "REMOTE_CONTROL" },
    { no: 4, name: "USAGE_COST_TYPE_STANDARD_COMPUTE", localName: "STANDARD_COMPUTE" },
    { no: 5, name: "USAGE_COST_TYPE_CLOUD_STORAGE", localName: "CLOUD_STORAGE" },
    { no: 6, name: "USAGE_COST_TYPE_BINARY_DATA_CLOUD_STORAGE", localName: "BINARY_DATA_CLOUD_STORAGE" },
    { no: 7, name: "USAGE_COST_TYPE_OTHER_CLOUD_STORAGE", localName: "OTHER_CLOUD_STORAGE" },
    { no: 8, name: "USAGE_COST_TYPE_PER_MACHINE", localName: "PER_MACHINE" },
    { no: 9, name: "USAGE_COST_TYPE_TRIGGER_NOTIFICATION", localName: "TRIGGER_NOTIFICATION" },
    { no: 10, name: "USAGE_COST_TYPE_TABULAR_DATA_CLOUD_STORAGE", localName: "TABULAR_DATA_CLOUD_STORAGE" },
    { no: 11, name: "USAGE_COST_TYPE_CONFIG_HISTORY_CLOUD_STORAGE", localName: "CONFIG_HISTORY_CLOUD_STORAGE" },
    { no: 12, name: "USAGE_COST_TYPE_LOGS_CLOUD_STORAGE", localName: "LOGS_CLOUD_STORAGE" },
    { no: 13, name: "USAGE_COST_TYPE_TRAINING_LOGS_CLOUD_STORAGE", localName: "TRAINING_LOGS_CLOUD_STORAGE" },
    { no: 14, name: "USAGE_COST_TYPE_PACKAGES_CLOUD_STORAGE", localName: "PACKAGES_CLOUD_STORAGE" },
    { no: 15, name: "USAGE_COST_TYPE_BINARY_DATA_UPLOAD", localName: "BINARY_DATA_UPLOAD" },
    { no: 16, name: "USAGE_COST_TYPE_TABULAR_DATA_UPLOAD", localName: "TABULAR_DATA_UPLOAD" },
    { no: 17, name: "USAGE_COST_TYPE_LOGS_UPLOAD", localName: "LOGS_UPLOAD" },
    { no: 18, name: "USAGE_COST_TYPE_BINARY_DATA_EGRESS", localName: "BINARY_DATA_EGRESS" },
    { no: 19, name: "USAGE_COST_TYPE_TABULAR_DATA_EGRESS", localName: "TABULAR_DATA_EGRESS" },
    { no: 20, name: "USAGE_COST_TYPE_LOGS_EGRESS", localName: "LOGS_EGRESS" },
    { no: 21, name: "USAGE_COST_TYPE_TRAINING_LOGS_EGRESS", localName: "TRAINING_LOGS_EGRESS" },
    { no: 22, name: "USAGE_COST_TYPE_TABULAR_DATA_DATABASE_CLOUD_STORAGE", localName: "TABULAR_DATA_DATABASE_CLOUD_STORAGE" },
    { no: 23, name: "USAGE_COST_TYPE_TABULAR_DATA_DATABASE_COMPUTE", localName: "TABULAR_DATA_DATABASE_COMPUTE" },
    { no: 24, name: "USAGE_COST_TYPE_BINARY_DATA_CROSS_REGION_EGRESS", localName: "BINARY_DATA_CROSS_REGION_EGRESS" }
  ]
), Kk = /* @__PURE__ */ s.makeEnum(
  "viam.app.v1.SourceType",
  [
    { no: 0, name: "SOURCE_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "SOURCE_TYPE_ORG", localName: "ORG" },
    { no: 2, name: "SOURCE_TYPE_FRAGMENT", localName: "FRAGMENT" }
  ]
), Xk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.InvoiceSummary",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "invoice_date", kind: "message", T: _ },
    {
      no: 3,
      name: "invoice_amount",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "status",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "due_date", kind: "message", T: _ },
    { no: 6, name: "paid_date", kind: "message", T: _ }
  ]
), Qk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.PaymentMethodCard",
  () => [
    {
      no: 1,
      name: "brand",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "last_four_digits",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Zk = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetCurrentMonthUsageRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ey = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UsageCost",
  () => [
    { no: 1, name: "resource_type", kind: "enum", T: s.getEnumType(Hk) },
    {
      no: 2,
      name: "cost",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), ny = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ResourceUsageCostsBySource",
  () => [
    { no: 1, name: "source_type", kind: "enum", T: s.getEnumType(Kk) },
    { no: 2, name: "resource_usage_costs", kind: "message", T: ay },
    {
      no: 3,
      name: "tier_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ay = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.ResourceUsageCosts",
  () => [
    { no: 1, name: "usage_costs", kind: "message", T: ey, repeated: !0 },
    {
      no: 2,
      name: "discount",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "total_with_discount",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "total_without_discount",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), ty = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetCurrentMonthUsageResponse",
  () => [
    { no: 1, name: "start_date", kind: "message", T: _ },
    { no: 2, name: "end_date", kind: "message", T: _ },
    { no: 14, name: "resource_usage_costs_by_source", kind: "message", T: ny, repeated: !0 },
    {
      no: 15,
      name: "subtotal",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 3,
      name: "cloud_storage_usage_cost",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "data_upload_usage_cost",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 5,
      name: "data_egres_usage_cost",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 6,
      name: "remote_control_usage_cost",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 7,
      name: "standard_compute_usage_cost",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 8,
      name: "discount_amount",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 9,
      name: "total_usage_with_discount",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 10,
      name: "total_usage_without_discount",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 11,
      name: "per_machine_usage_cost",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 12,
      name: "binary_data_cloud_storage_usage_cost",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 13,
      name: "other_cloud_storage_usage_cost",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), sy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetOrgBillingInformationRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), oy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetOrgBillingInformationResponse",
  () => [
    { no: 1, name: "type", kind: "enum", T: s.getEnumType(jk) },
    {
      no: 2,
      name: "billing_email",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "method", kind: "message", T: Qk, opt: !0 },
    { no: 4, name: "billing_tier", kind: "scalar", T: 9, opt: !0 }
  ]
), iy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetInvoicesSummaryRequest",
  () => [
    {
      no: 1,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), ry = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetInvoicesSummaryResponse",
  () => [
    {
      no: 1,
      name: "outstanding_balance",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    { no: 2, name: "invoices", kind: "message", T: Xk, repeated: !0 }
  ]
), my = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetInvoicePdfRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), cy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetInvoicePdfResponse",
  () => [
    {
      no: 1,
      name: "chunk",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), ly = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.SendPaymentRequiredEmailRequest",
  () => [
    {
      no: 1,
      name: "customer_org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "billing_owner_org_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), dy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.SendPaymentRequiredEmailResponse",
  []
), py = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetAvailableBillingTiersRequest",
  []
), uy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.GetAvailableBillingTiersResponse",
  () => [
    { no: 1, name: "tiers", kind: "scalar", T: 9, repeated: !0 }
  ]
), gy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOrganizationBillingTierRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "billing_tier",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ty = /* @__PURE__ */ s.makeMessageType(
  "viam.app.v1.UpdateOrganizationBillingTierResponse",
  []
), j_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetAvailableBillingTiersRequest: py,
  GetAvailableBillingTiersResponse: uy,
  GetCurrentMonthUsageRequest: Zk,
  GetCurrentMonthUsageResponse: ty,
  GetInvoicePdfRequest: my,
  GetInvoicePdfResponse: cy,
  GetInvoicesSummaryRequest: iy,
  GetInvoicesSummaryResponse: ry,
  GetOrgBillingInformationRequest: sy,
  GetOrgBillingInformationResponse: oy,
  InvoiceSummary: Xk,
  PaymentMethodCard: Qk,
  PaymentMethodType: jk,
  ResourceUsageCosts: ay,
  ResourceUsageCostsBySource: ny,
  SendPaymentRequiredEmailRequest: ly,
  SendPaymentRequiredEmailResponse: dy,
  SourceType: Kk,
  UpdateOrganizationBillingTierRequest: gy,
  UpdateOrganizationBillingTierResponse: Ty,
  UsageCost: ey,
  UsageCostType: Hk
}, Symbol.toStringTag, { value: "Module" })), E1 = {
  typeName: "viam.app.v1.BillingService",
  methods: {
    /**
     * Detailed breakdown of current month's costs
     *
     * @generated from rpc viam.app.v1.BillingService.GetCurrentMonthUsage
     */
    getCurrentMonthUsage: {
      name: "GetCurrentMonthUsage",
      I: Zk,
      O: ty,
      kind: m.Unary
    },
    /**
     * Org-level information (like billing email and payment details)
     *
     * @generated from rpc viam.app.v1.BillingService.GetOrgBillingInformation
     */
    getOrgBillingInformation: {
      name: "GetOrgBillingInformation",
      I: sy,
      O: oy,
      kind: m.Unary
    },
    /**
     * Total outstanding balance and previous invoices
     *
     * @generated from rpc viam.app.v1.BillingService.GetInvoicesSummary
     */
    getInvoicesSummary: {
      name: "GetInvoicesSummary",
      I: iy,
      O: ry,
      kind: m.Unary
    },
    /**
     * Download a PDF invoice
     *
     * @generated from rpc viam.app.v1.BillingService.GetInvoicePdf
     */
    getInvoicePdf: {
      name: "GetInvoicePdf",
      I: my,
      O: cy,
      kind: m.ServerStreaming
    },
    /**
     * Send an email with a prompt to the user's org's billing page.
     *
     * @generated from rpc viam.app.v1.BillingService.SendPaymentRequiredEmail
     */
    sendPaymentRequiredEmail: {
      name: "SendPaymentRequiredEmail",
      I: ly,
      O: dy,
      kind: m.Unary
    },
    /**
     * Get available billing tiers that can be assigned to organizations
     *
     * @generated from rpc viam.app.v1.BillingService.GetAvailableBillingTiers
     */
    getAvailableBillingTiers: {
      name: "GetAvailableBillingTiers",
      I: py,
      O: uy,
      kind: m.Unary
    },
    /**
     * Update an organization's billing tier
     *
     * @generated from rpc viam.app.v1.BillingService.UpdateOrganizationBillingTier
     */
    updateOrganizationBillingTier: {
      name: "UpdateOrganizationBillingTier",
      I: gy,
      O: Ty,
      kind: m.Unary
    }
  }
};
class w1 {
  client;
  constructor(e) {
    this.client = C(E1, e);
  }
  /**
   * Get the data usage information for the current month for a given
   * organization.
   *
   * @example
   *
   * ```ts
   * const usage = await billing.getCurrentMonthUsage('<organization-id>');
   * ```
   *
   * For more information, see [Billing
   * API](https://docs.viam.com/dev/reference/apis/billing-client/#getcurrentmonthusage).
   *
   * @param orgId - The organization ID.
   */
  async getCurrentMonthUsage(e) {
    const n = await this.client.getCurrentMonthUsage({
      orgId: e
    });
    return n.start = n.startDate?.toDate(), n.end = n.endDate?.toDate(), n;
  }
  /**
   * Get the billing information (payment method, billing tier, etc.) for a
   * given org.
   *
   * @example
   *
   * ```ts
   * const billingInfo = await billing.getOrgBillingInformation(
   *   '<organization-id>'
   * );
   * ```
   *
   * For more information, see [Billing
   * API](https://docs.viam.com/dev/reference/apis/billing-client/#getorgbillinginformation).
   *
   * @param orgId - The organization ID.
   */
  async getOrgBillingInformation(e) {
    return this.client.getOrgBillingInformation({
      orgId: e
    });
  }
  /**
   * Get total outstanding balance plus invoice summaries for a given org.
   *
   * @example
   *
   * ```ts
   * const invoicesSummary = await billing.getInvoicesSummary(
   *   '<organization-id>'
   * );
   * ```
   *
   * For more information, see [Billing
   * API](https://docs.viam.com/dev/reference/apis/billing-client/#getinvoicesummary).
   *
   * @param orgId - The organization ID.
   */
  async getInvoicesSummary(e) {
    return this.client.getInvoicesSummary({
      orgId: e
    });
  }
  /**
   * Get invoice PDF data.
   *
   * @example
   *
   * ```ts
   * const invoicePdf = await billing.getInvoicePdf(
   *   '<invoice-id>',
   *   '<organization-id>'
   * );
   * ```
   *
   * For more information, see [Billing
   * API](https://docs.viam.com/dev/reference/apis/billing-client/#getinvoicepdf).
   *
   * @param id - The invoice ID.
   * @param orgId - The organization ID.
   */
  async getInvoicePdf(e, n) {
    const t = this.client.getInvoicePdf({
      id: e,
      orgId: n
    }), o = [];
    for await (const i of t)
      o.push(i.chunk);
    return O1(o);
  }
}
const O1 = (a) => {
  const e = a.reduce((o, i) => o + i.length, 0), n = new Uint8Array(e);
  let t = 0;
  for (const o of a)
    n.set(o, t), t += o.length;
  return n;
};
var ky = {}, yy = {};
(function(a) {
  Object.defineProperty(a, "__esModule", { value: !0 }), function(e) {
    var n = (
      /** @class */
      function() {
        function k(v) {
          this._id = new Uint8Array(v);
        }
        return k.prototype.buffer = function() {
          return this._id;
        }, k;
      }()
    );
    e.UUID = n;
    var t = (
      /** @class */
      function() {
        function k(v) {
          this._id = new Uint8Array(v);
        }
        return k.prototype.buffer = function() {
          return this._id;
        }, k;
      }()
    );
    e.ObjectId = t;
    var o = (
      /** @class */
      function() {
        function k(v) {
          this._time = typeof v != "string" ? new Uint8Array(v || h(Date.now())) : h(+new Date(v));
        }
        return k.prototype.buffer = function() {
          return this._time;
        }, k.prototype.fromString = function(v) {
          this._time = h(+new Date(v));
        }, k.prototype.toNumber = function() {
          return I(this._time);
        }, k.prototype.toDate = function() {
          return new Date(I(this._time));
        }, k;
      }()
    );
    e.UTC = o;
    function i(k) {
      var v = 5;
      for (var g in k)
        v += r(g, k[g]);
      return v;
    }
    function r(k, v) {
      var g = 1;
      if (k && (g += z(k) + 1), v == null)
        return g;
      switch (v.constructor) {
        case String:
          return g + 4 + z(v) + 1;
        case Number:
          return Math.floor(v) === v && v <= 2147483647 && v >= -2147483647 ? g + 4 : g + 8;
        case Boolean:
          return g + 1;
        case Array:
        case Object:
          return g + i(v);
        case Int8Array:
        case Uint8Array:
          return g + 5 + v.byteLength;
        case Date:
        case o:
          return g + 8;
        case n:
          return g + 5 + 16;
        case t:
          return g + 12;
        default:
          return 0;
      }
    }
    function c(k) {
      var v = new Uint8Array(i(k));
      return d(k, v), v;
    }
    e.serialize = c;
    function d(k, v, g) {
      if (g === void 0 && (g = 0), g += T(v.length, v, g), k.constructor === Array)
        for (var y = 0, M = k.length; y < M; y++)
          g = R(y.toString(), k[y], v, g);
      else
        for (var b in k)
          g = R(b, k[b], v, g);
      return v[g++] = 0, g;
    }
    function p(k, v, g) {
      var y = O(k), M = y.length;
      return v.set(y, g), v[g + M++] = 0, M;
    }
    function T(k, v, g) {
      return v[g++] = k & 255, v[g++] = k >>> 8 & 255, v[g++] = k >>> 16 & 255, v[g++] = k >>> 24 & 255, 4;
    }
    function R(k, v, g, y) {
      if (v == null)
        return g[y++] = 10, y += p(k, g, y), y;
      switch (v.constructor) {
        case String:
          g[y++] = 2, y += p(k, g, y);
          var M = p(v, g, y + 4);
          return y += T(M, g, y), y + M;
        case Number:
          if (Math.floor(v) === v)
            v <= 2147483647 && v >= -2147483647 ? (g[y++] = 16, y += p(k, g, y), y += T(v, g, y)) : (g[y++] = 18, y += p(k, g, y), g.set(h(v), y), y += 8);
          else {
            g[y++] = 1, y += p(k, g, y);
            var b = new Float64Array([v]), Z = new Uint8Array(b.buffer);
            g.set(Z, y), y += 8;
          }
          return y;
        case Boolean:
          return g[y++] = 8, y += p(k, g, y), g[y++] = v ? 1 : 0, y;
        case Array:
        case Object:
          g[y++] = v.constructor === Array ? 4 : 3, y += p(k, g, y);
          var D = d(v, g, y);
          return T(D - y, g, y), D;
        case Int8Array:
        case Uint8Array:
          return g[y++] = 5, y += p(k, g, y), y += T(v.byteLength, g, y), g[y++] = 0, g.set(v, y), y += v.byteLength, y;
        case Date:
          return g[y++] = 9, y += p(k, g, y), g.set(h(v.getTime()), y), y += 8, y;
        case o:
          return g[y++] = 9, y += p(k, g, y), g.set(v.buffer(), y), y += 8, y;
        case n:
          return g[y++] = 5, y += p(k, g, y), y += T(16, g, y), g[y++] = 4, g.set(v.buffer(), y), y += 16, y;
        case t:
          return g[y++] = 7, y += p(k, g, y), g.set(v.buffer(), y), y += 12, y;
        case RegExp:
          return g[y++] = 11, y += p(k, g, y), y += p(v.source, g, y), v.global && (g[y++] = 115), v.ignoreCase && (g[y++] = 105), v.multiline && (g[y++] = 109), g[y++] = 0, y;
        default:
          return y;
      }
    }
    function S(k, v, g, y) {
      if (v === void 0 && (v = !1), g === void 0 && (g = 0), y === void 0 && (y = !1), !(k.length < 5)) {
        var M = k[g++] | k[g++] << 8 | k[g++] << 16 | k[g++] << 24;
        if (!(M < 5 || M > k.length) && k[k.length - 1] === 0) {
          for (var b = y ? [] : {}; ; ) {
            var Z = k[g++];
            if (Z === 0)
              break;
            for (var D = g; k[D] !== 0 && D < k.length; D++)
              ;
            if (D >= k.length - 1)
              return;
            var Y = P(k.subarray(g, D));
            switch (y && (Y = parseInt(Y)), g = ++D, Z) {
              case 1:
                b[Y] = new Float64Array(k.slice(g, g += 8).buffer)[0];
                break;
              case 2:
                M = k[g++] | k[g++] << 8 | k[g++] << 16 | k[g++] << 24, b[Y] = P(k.subarray(g, g += M - 1)), g++;
                break;
              case 3:
                M = k[g] | k[g + 1] << 8 | k[g + 2] << 16 | k[g + 3] << 24, b[Y] = S(k, v, g, !1), g += M;
                break;
              case 4:
                M = k[g] | k[g + 1] << 8 | k[g + 2] << 16 | k[g + 3] << 24, b[Y] = S(k, v, g, !0), g += M;
                break;
              case 5:
                if (M = k[g++] | k[g++] << 8 | k[g++] << 16 | k[g++] << 24, k[g++] === 4) {
                  if (M !== 16)
                    return;
                  b[Y] = new n(k.subarray(g, g += M));
                } else
                  b[Y] = k.slice(g, g += M);
                break;
              case 6:
                b[Y] = null;
                break;
              case 7:
                b[Y] = new t(k.subarray(g, g += 12));
                break;
              case 8:
                b[Y] = k[g++] === 1;
                break;
              case 9:
                b[Y] = v ? new o(k.subarray(g, g += 8)) : new Date(I(k.subarray(g, g += 8)));
                break;
              case 10:
                b[Y] = null;
                break;
              case 11:
                for (D = g; D < k.length && k[D++] !== 0; )
                  ;
                if (D >= k.length)
                  return;
                var Da = P(k.subarray(g, D));
                for (g = D; D < k.length && k[D++] !== 0; )
                  ;
                if (D >= k.length)
                  return;
                var Aa = P(k.subarray(g, D));
                g = D, b[Y] = new RegExp(Da, Aa);
                break;
              case 16:
                b[Y] = k[g++] | k[g++] << 8 | k[g++] << 16 | k[g++] << 24;
                break;
              case 18:
                b[Y] = I(k.subarray(g, g += 8));
                break;
              default:
                return;
            }
          }
          return b;
        }
      }
    }
    e.deserialize = S;
    function h(k) {
      var v = new Uint8Array(8);
      if (Math.floor(k) === k) {
        var g = 4294967296, y = k % g | 0, M = k / g | 0;
        k < 0 && (y = ~(-k % g) | 0, M = ~(-k / g) | 0, y = y + 1 & 4294967295, y || M++);
        var b = 0;
        v[b++] = y & 255, v[b++] = y >>> 8 & 255, v[b++] = y >>> 16 & 255, v[b++] = y >>> 24 & 255, v[b++] = M & 255, v[b++] = M >>> 8 & 255, v[b++] = M >>> 16 & 255, v[b] = M >>> 24 & 255;
      } else {
        var Z = new Float64Array([k]), D = new Uint8Array(Z.buffer);
        v.set(D);
      }
      return v;
    }
    function I(k, v) {
      v === void 0 && (v = 0);
      var g = 4294967296, y = k[v++] | k[v++] << 8 | k[v++] << 16 | k[v++] << 24, M = k[v++] | k[v++] << 8 | k[v++] << 16 | k[v] << 24;
      return M * g + (y >= 0 ? y : g + y);
    }
    function O(k) {
      k = k.replace(/\r\n/g, `
`);
      for (var v = [], g = 0, y = 0, M = k.length; y < M; y++) {
        var b = k.charCodeAt(y);
        b < 128 ? v[g++] = b : b < 2048 ? (v[g++] = b >>> 6 | 192, v[g++] = b & 63 | 128) : (v[g++] = b >>> 12 | 224, v[g++] = b >>> 6 & 63 | 128, v[g++] = b & 63 | 128);
      }
      return new Uint8Array(v);
    }
    function P(k) {
      for (var v = "", g = k.length, y = 0, M, b, Z; y < g; )
        M = k[y], M < 128 ? (v += String.fromCharCode(M), y++) : M > 191 && M < 224 ? (b = k[y + 1], v += String.fromCharCode((M & 31) << 6 | b & 63), y += 2) : (b = k[y + 1], Z = k[y + 2], v += String.fromCharCode((M & 15) << 12 | (b & 63) << 6 | Z & 63), y += 3);
      return v;
    }
    function z(k) {
      return encodeURI(k).split(/%..|./).length - 1;
    }
  }(a.BSON || (a.BSON = {}));
})(yy);
Object.defineProperty(ky, "__esModule", { value: !0 });
var C1 = yy, Bn = ky.BSON = C1.BSON;
const vy = /* @__PURE__ */ s.makeEnum(
  "viam.app.data.v1.Order",
  [
    { no: 0, name: "ORDER_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "ORDER_DESCENDING", localName: "DESCENDING" },
    { no: 2, name: "ORDER_ASCENDING", localName: "ASCENDING" }
  ]
), hy = /* @__PURE__ */ s.makeEnum(
  "viam.app.data.v1.TagsFilterType",
  [
    { no: 0, name: "TAGS_FILTER_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "TAGS_FILTER_TYPE_MATCH_BY_OR", localName: "MATCH_BY_OR" },
    { no: 2, name: "TAGS_FILTER_TYPE_TAGGED", localName: "TAGGED" },
    { no: 3, name: "TAGS_FILTER_TYPE_UNTAGGED", localName: "UNTAGGED" }
  ]
), He = /* @__PURE__ */ s.makeEnum(
  "viam.app.data.v1.TabularDataSourceType",
  [
    { no: 0, name: "TABULAR_DATA_SOURCE_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "TABULAR_DATA_SOURCE_TYPE_STANDARD", localName: "STANDARD" },
    { no: 2, name: "TABULAR_DATA_SOURCE_TYPE_HOT_STORAGE", localName: "HOT_STORAGE" },
    { no: 3, name: "TABULAR_DATA_SOURCE_TYPE_PIPELINE_SINK", localName: "PIPELINE_SINK" }
  ]
), Go = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.DataRequest",
  () => [
    { no: 1, name: "filter", kind: "message", T: $e },
    {
      no: 2,
      name: "limit",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    },
    {
      no: 3,
      name: "last",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "sort_order", kind: "enum", T: s.getEnumType(vy) }
  ]
), $e = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.Filter",
  () => [
    {
      no: 1,
      name: "component_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "component_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "method",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 6,
      name: "robot_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 7,
      name: "robot_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 8,
      name: "part_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 9,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 10, name: "location_ids", kind: "scalar", T: 9, repeated: !0 },
    { no: 11, name: "organization_ids", kind: "scalar", T: 9, repeated: !0 },
    { no: 12, name: "mime_type", kind: "scalar", T: 9, repeated: !0 },
    { no: 13, name: "interval", kind: "message", T: On },
    { no: 14, name: "tags_filter", kind: "message", T: Bo },
    { no: 15, name: "bbox_labels", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 16,
      name: "dataset_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Bo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.TagsFilter",
  () => [
    { no: 1, name: "type", kind: "enum", T: s.getEnumType(hy) },
    { no: 2, name: "tags", kind: "scalar", T: 9, repeated: !0 }
  ]
), Pa = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.CaptureMetadata",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "robot_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "robot_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "part_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 6,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 7,
      name: "component_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 9,
      name: "component_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 10,
      name: "method_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 11, name: "method_parameters", kind: "map", K: 9, V: { kind: "message", T: j } },
    { no: 12, name: "tags", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 13,
      name: "mime_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), On = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.CaptureInterval",
  () => [
    { no: 1, name: "start", kind: "message", T: _ },
    { no: 2, name: "end", kind: "message", T: _ }
  ]
), fy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.TabularDataByFilterRequest",
  () => [
    { no: 1, name: "data_request", kind: "message", T: Go },
    {
      no: 2,
      name: "count_only",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 3,
      name: "include_internal_data",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Ry = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.TabularDataByFilterResponse",
  () => [
    { no: 1, name: "metadata", kind: "message", T: Pa, repeated: !0 },
    { no: 2, name: "data", kind: "message", T: _y, repeated: !0 },
    {
      no: 3,
      name: "count",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    },
    {
      no: 4,
      name: "last",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "total_size_bytes",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    }
  ]
), _y = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.TabularData",
  () => [
    { no: 1, name: "data", kind: "message", T: l },
    {
      no: 2,
      name: "metadata_index",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    { no: 3, name: "time_requested", kind: "message", T: _ },
    { no: 4, name: "time_received", kind: "message", T: _ }
  ]
), Sy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.TabularDataBySQLRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "sql_query",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Iy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.TabularDataBySQLResponse",
  () => [
    { no: 2, name: "raw_data", kind: "scalar", T: 12, repeated: !0 }
  ]
), xo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.TabularDataSource",
  () => [
    { no: 1, name: "type", kind: "enum", T: s.getEnumType(He) },
    { no: 2, name: "pipeline_id", kind: "scalar", T: 9, opt: !0 }
  ]
), by = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.TabularDataByMQLRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "mql_binary", kind: "scalar", T: 12, repeated: !0 },
    { no: 4, name: "use_recent_data", kind: "scalar", T: 8, opt: !0 },
    { no: 6, name: "data_source", kind: "message", T: xo, opt: !0 }
  ]
), My = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.TabularDataByMQLResponse",
  () => [
    { no: 2, name: "raw_data", kind: "scalar", T: 12, repeated: !0 }
  ]
), Ey = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.ExportTabularDataRequest",
  () => [
    {
      no: 1,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "resource_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "resource_subtype",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "method_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "interval", kind: "message", T: On },
    { no: 6, name: "additional_parameters", kind: "message", T: l, opt: !0 }
  ]
), wy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.ExportTabularDataResponse",
  () => [
    {
      no: 1,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "resource_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "resource_subtype",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "method_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "time_captured", kind: "message", T: _ },
    {
      no: 6,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 7,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 8,
      name: "robot_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 9,
      name: "robot_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 10,
      name: "part_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 11, name: "method_parameters", kind: "message", T: l },
    { no: 12, name: "tags", kind: "scalar", T: 9, repeated: !0 },
    { no: 13, name: "payload", kind: "message", T: l }
  ]
), Oy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.GetLatestTabularDataRequest",
  () => [
    {
      no: 1,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "resource_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "method_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "resource_subtype",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "additional_parameters", kind: "message", T: l, opt: !0 }
  ]
), Cy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.GetLatestTabularDataResponse",
  () => [
    { no: 1, name: "time_captured", kind: "message", T: _ },
    { no: 2, name: "time_synced", kind: "message", T: _ },
    { no: 3, name: "payload", kind: "message", T: l }
  ]
), Fo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.BinaryData",
  () => [
    {
      no: 1,
      name: "binary",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    },
    { no: 2, name: "metadata", kind: "message", T: Ly }
  ]
), Ny = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.BinaryDataByFilterRequest",
  () => [
    { no: 1, name: "data_request", kind: "message", T: Go },
    {
      no: 2,
      name: "include_binary",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 3,
      name: "count_only",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 4,
      name: "include_internal_data",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Py = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.BinaryDataByFilterResponse",
  () => [
    { no: 1, name: "data", kind: "message", T: Fo, repeated: !0 },
    {
      no: 2,
      name: "count",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    },
    {
      no: 3,
      name: "last",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "total_size_bytes",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    }
  ]
), le = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.BinaryID",
  () => [
    {
      no: 1,
      name: "file_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "location_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Dy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.BinaryDataByIDsRequest",
  () => [
    {
      no: 2,
      name: "include_binary",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 3, name: "binary_ids", kind: "message", T: le, repeated: !0 },
    { no: 4, name: "binary_data_ids", kind: "scalar", T: 9, repeated: !0 }
  ]
), Ay = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.BinaryDataByIDsResponse",
  () => [
    { no: 1, name: "data", kind: "message", T: Fo, repeated: !0 },
    {
      no: 2,
      name: "count",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    }
  ]
), qy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.BoundingBox",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "label",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "x_min_normalized",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "y_min_normalized",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 5,
      name: "x_max_normalized",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 6,
      name: "y_max_normalized",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    { no: 7, name: "confidence", kind: "scalar", T: 1, opt: !0 }
  ]
), Uy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.Classification",
  () => [
    {
      no: 1,
      name: "label",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "confidence", kind: "scalar", T: 1, opt: !0 }
  ]
), Jo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.Annotations",
  () => [
    { no: 1, name: "bboxes", kind: "message", T: qy, repeated: !0 },
    { no: 2, name: "classifications", kind: "message", T: Uy, repeated: !0 }
  ]
), Ly = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.BinaryMetadata",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "capture_metadata", kind: "message", T: Pa },
    { no: 3, name: "time_requested", kind: "message", T: _ },
    { no: 4, name: "time_received", kind: "message", T: _ },
    {
      no: 5,
      name: "file_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 6,
      name: "file_ext",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 7,
      name: "uri",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 8, name: "annotations", kind: "message", T: Jo },
    { no: 9, name: "dataset_ids", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 10,
      name: "binary_data_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Gy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.DeleteTabularDataRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "delete_older_than_days",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    }
  ]
), By = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.DeleteTabularDataResponse",
  () => [
    {
      no: 1,
      name: "deleted_count",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    }
  ]
), xy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.DeleteBinaryDataByFilterRequest",
  () => [
    { no: 1, name: "filter", kind: "message", T: $e },
    {
      no: 2,
      name: "include_internal_data",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), Fy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.DeleteBinaryDataByFilterResponse",
  () => [
    {
      no: 1,
      name: "deleted_count",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    }
  ]
), Jy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.DeleteBinaryDataByIDsRequest",
  () => [
    { no: 2, name: "binary_ids", kind: "message", T: le, repeated: !0 },
    { no: 3, name: "binary_data_ids", kind: "scalar", T: 9, repeated: !0 }
  ]
), zy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.DeleteBinaryDataByIDsResponse",
  () => [
    {
      no: 1,
      name: "deleted_count",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    }
  ]
), Yy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.AddTagsToBinaryDataByIDsRequest",
  () => [
    { no: 3, name: "binary_ids", kind: "message", T: le, repeated: !0 },
    { no: 4, name: "binary_data_ids", kind: "scalar", T: 9, repeated: !0 },
    { no: 2, name: "tags", kind: "scalar", T: 9, repeated: !0 }
  ]
), $y = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.AddTagsToBinaryDataByIDsResponse",
  []
), Vy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.AddTagsToBinaryDataByFilterRequest",
  () => [
    { no: 1, name: "filter", kind: "message", T: $e },
    { no: 2, name: "tags", kind: "scalar", T: 9, repeated: !0 }
  ]
), Wy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.AddTagsToBinaryDataByFilterResponse",
  []
), jy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.RemoveTagsFromBinaryDataByIDsRequest",
  () => [
    { no: 3, name: "binary_ids", kind: "message", T: le, repeated: !0 },
    { no: 4, name: "binary_data_ids", kind: "scalar", T: 9, repeated: !0 },
    { no: 2, name: "tags", kind: "scalar", T: 9, repeated: !0 }
  ]
), Hy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.RemoveTagsFromBinaryDataByIDsResponse",
  () => [
    {
      no: 1,
      name: "deleted_count",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    }
  ]
), Ky = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.RemoveTagsFromBinaryDataByFilterRequest",
  () => [
    { no: 1, name: "filter", kind: "message", T: $e },
    { no: 2, name: "tags", kind: "scalar", T: 9, repeated: !0 }
  ]
), Xy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.RemoveTagsFromBinaryDataByFilterResponse",
  () => [
    {
      no: 1,
      name: "deleted_count",
      kind: "scalar",
      T: 4
      /* ScalarType.UINT64 */
    }
  ]
), Qy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.TagsByFilterRequest",
  () => [
    { no: 1, name: "filter", kind: "message", T: $e }
  ]
), Zy = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.TagsByFilterResponse",
  () => [
    { no: 1, name: "tags", kind: "scalar", T: 9, repeated: !0 }
  ]
), ev = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.AddBoundingBoxToImageByIDRequest",
  () => [
    { no: 7, name: "binary_id", kind: "message", T: le },
    {
      no: 8,
      name: "binary_data_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "label",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "x_min_normalized",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 4,
      name: "y_min_normalized",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 5,
      name: "x_max_normalized",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    },
    {
      no: 6,
      name: "y_max_normalized",
      kind: "scalar",
      T: 1
      /* ScalarType.DOUBLE */
    }
  ]
), nv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.AddBoundingBoxToImageByIDResponse",
  () => [
    {
      no: 1,
      name: "bbox_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), av = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.RemoveBoundingBoxFromImageByIDRequest",
  () => [
    { no: 3, name: "binary_id", kind: "message", T: le },
    {
      no: 4,
      name: "binary_data_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "bbox_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), tv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.RemoveBoundingBoxFromImageByIDResponse",
  []
), sv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.UpdateBoundingBoxRequest",
  () => [
    { no: 1, name: "binary_id", kind: "message", T: le },
    {
      no: 8,
      name: "binary_data_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "bbox_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "label", kind: "scalar", T: 9, opt: !0 },
    { no: 4, name: "x_min_normalized", kind: "scalar", T: 1, opt: !0 },
    { no: 5, name: "y_min_normalized", kind: "scalar", T: 1, opt: !0 },
    { no: 6, name: "x_max_normalized", kind: "scalar", T: 1, opt: !0 },
    { no: 7, name: "y_max_normalized", kind: "scalar", T: 1, opt: !0 }
  ]
), ov = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.UpdateBoundingBoxResponse",
  []
), iv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.BoundingBoxLabelsByFilterRequest",
  () => [
    { no: 1, name: "filter", kind: "message", T: $e }
  ]
), rv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.BoundingBoxLabelsByFilterResponse",
  () => [
    { no: 1, name: "labels", kind: "scalar", T: 9, repeated: !0 }
  ]
), mv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.ConfigureDatabaseUserRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "password",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), cv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.ConfigureDatabaseUserResponse",
  []
), lv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.GetDatabaseConnectionRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), dv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.GetDatabaseConnectionResponse",
  () => [
    {
      no: 1,
      name: "hostname",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "mongodb_uri",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "has_database_user",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
), pv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.AddBinaryDataToDatasetByIDsRequest",
  () => [
    { no: 1, name: "binary_ids", kind: "message", T: le, repeated: !0 },
    { no: 3, name: "binary_data_ids", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 2,
      name: "dataset_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), uv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.AddBinaryDataToDatasetByIDsResponse",
  []
), gv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.RemoveBinaryDataFromDatasetByIDsRequest",
  () => [
    { no: 1, name: "binary_ids", kind: "message", T: le, repeated: !0 },
    { no: 3, name: "binary_data_ids", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 2,
      name: "dataset_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Tv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.data.v1.RemoveBinaryDataFromDatasetByIDsResponse",
  []
), H_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AddBinaryDataToDatasetByIDsRequest: pv,
  AddBinaryDataToDatasetByIDsResponse: uv,
  AddBoundingBoxToImageByIDRequest: ev,
  AddBoundingBoxToImageByIDResponse: nv,
  AddTagsToBinaryDataByFilterRequest: Vy,
  AddTagsToBinaryDataByFilterResponse: Wy,
  AddTagsToBinaryDataByIDsRequest: Yy,
  AddTagsToBinaryDataByIDsResponse: $y,
  Annotations: Jo,
  BinaryData: Fo,
  BinaryDataByFilterRequest: Ny,
  BinaryDataByFilterResponse: Py,
  BinaryDataByIDsRequest: Dy,
  BinaryDataByIDsResponse: Ay,
  BinaryID: le,
  BinaryMetadata: Ly,
  BoundingBox: qy,
  BoundingBoxLabelsByFilterRequest: iv,
  BoundingBoxLabelsByFilterResponse: rv,
  CaptureInterval: On,
  CaptureMetadata: Pa,
  Classification: Uy,
  ConfigureDatabaseUserRequest: mv,
  ConfigureDatabaseUserResponse: cv,
  DataRequest: Go,
  DeleteBinaryDataByFilterRequest: xy,
  DeleteBinaryDataByFilterResponse: Fy,
  DeleteBinaryDataByIDsRequest: Jy,
  DeleteBinaryDataByIDsResponse: zy,
  DeleteTabularDataRequest: Gy,
  DeleteTabularDataResponse: By,
  ExportTabularDataRequest: Ey,
  ExportTabularDataResponse: wy,
  Filter: $e,
  GetDatabaseConnectionRequest: lv,
  GetDatabaseConnectionResponse: dv,
  GetLatestTabularDataRequest: Oy,
  GetLatestTabularDataResponse: Cy,
  Order: vy,
  RemoveBinaryDataFromDatasetByIDsRequest: gv,
  RemoveBinaryDataFromDatasetByIDsResponse: Tv,
  RemoveBoundingBoxFromImageByIDRequest: av,
  RemoveBoundingBoxFromImageByIDResponse: tv,
  RemoveTagsFromBinaryDataByFilterRequest: Ky,
  RemoveTagsFromBinaryDataByFilterResponse: Xy,
  RemoveTagsFromBinaryDataByIDsRequest: jy,
  RemoveTagsFromBinaryDataByIDsResponse: Hy,
  TabularData: _y,
  TabularDataByFilterRequest: fy,
  TabularDataByFilterResponse: Ry,
  TabularDataByMQLRequest: by,
  TabularDataByMQLResponse: My,
  TabularDataBySQLRequest: Sy,
  TabularDataBySQLResponse: Iy,
  TabularDataSource: xo,
  TabularDataSourceType: He,
  TagsByFilterRequest: Qy,
  TagsByFilterResponse: Zy,
  TagsFilter: Bo,
  TagsFilterType: hy,
  UpdateBoundingBoxRequest: sv,
  UpdateBoundingBoxResponse: ov
}, Symbol.toStringTag, { value: "Module" })), N1 = {
  typeName: "viam.app.data.v1.DataService",
  methods: {
    /**
     * TabularDataByFilter queries tabular data and metadata based on given filters.
     *
     * @generated from rpc viam.app.data.v1.DataService.TabularDataByFilter
     * @deprecated
     */
    tabularDataByFilter: {
      name: "TabularDataByFilter",
      I: fy,
      O: Ry,
      kind: m.Unary
    },
    /**
     * TabularDataBySQL queries tabular data with a SQL query.
     *
     * @generated from rpc viam.app.data.v1.DataService.TabularDataBySQL
     */
    tabularDataBySQL: {
      name: "TabularDataBySQL",
      I: Sy,
      O: Iy,
      kind: m.Unary
    },
    /**
     * TabularDataByMQL queries tabular data with an MQL (MongoDB Query Language) query.
     *
     * @generated from rpc viam.app.data.v1.DataService.TabularDataByMQL
     */
    tabularDataByMQL: {
      name: "TabularDataByMQL",
      I: by,
      O: My,
      kind: m.Unary
    },
    /**
     * ExportTabularData queries tabular data from the specified data source.
     *
     * @generated from rpc viam.app.data.v1.DataService.ExportTabularData
     */
    exportTabularData: {
      name: "ExportTabularData",
      I: Ey,
      O: wy,
      kind: m.ServerStreaming
    },
    /**
     * GetLatestTabularData gets the most recent tabular data captured from the specified data source.
     *
     * @generated from rpc viam.app.data.v1.DataService.GetLatestTabularData
     */
    getLatestTabularData: {
      name: "GetLatestTabularData",
      I: Oy,
      O: Cy,
      kind: m.Unary
    },
    /**
     * BinaryDataByFilter queries binary data and metadata based on given filters.
     *
     * @generated from rpc viam.app.data.v1.DataService.BinaryDataByFilter
     */
    binaryDataByFilter: {
      name: "BinaryDataByFilter",
      I: Ny,
      O: Py,
      kind: m.Unary
    },
    /**
     * BinaryDataByIDs queries binary data and metadata based on given IDs.
     *
     * @generated from rpc viam.app.data.v1.DataService.BinaryDataByIDs
     */
    binaryDataByIDs: {
      name: "BinaryDataByIDs",
      I: Dy,
      O: Ay,
      kind: m.Unary
    },
    /**
     * DeleteTabularData deletes tabular data older than a number of days, based on the given organization ID.
     *
     * @generated from rpc viam.app.data.v1.DataService.DeleteTabularData
     */
    deleteTabularData: {
      name: "DeleteTabularData",
      I: Gy,
      O: By,
      kind: m.Unary
    },
    /**
     * DeleteBinaryDataByFilter deletes binary data based on given filters.
     *
     * @generated from rpc viam.app.data.v1.DataService.DeleteBinaryDataByFilter
     */
    deleteBinaryDataByFilter: {
      name: "DeleteBinaryDataByFilter",
      I: xy,
      O: Fy,
      kind: m.Unary
    },
    /**
     * DeleteBinaryDataByIDs deletes binary data based on given IDs.
     *
     * @generated from rpc viam.app.data.v1.DataService.DeleteBinaryDataByIDs
     */
    deleteBinaryDataByIDs: {
      name: "DeleteBinaryDataByIDs",
      I: Jy,
      O: zy,
      kind: m.Unary
    },
    /**
     * AddTagsToBinaryDataByIDs adds string tags, unless the tags are already present, to binary data based on given IDs.
     *
     * @generated from rpc viam.app.data.v1.DataService.AddTagsToBinaryDataByIDs
     */
    addTagsToBinaryDataByIDs: {
      name: "AddTagsToBinaryDataByIDs",
      I: Yy,
      O: $y,
      kind: m.Unary
    },
    /**
     * AddTagsToBinaryDataByFilter adds string tags, unless the tags are already present, to binary data based on the given filter.
     *
     * @generated from rpc viam.app.data.v1.DataService.AddTagsToBinaryDataByFilter
     */
    addTagsToBinaryDataByFilter: {
      name: "AddTagsToBinaryDataByFilter",
      I: Vy,
      O: Wy,
      kind: m.Unary
    },
    /**
     * RemoveTagsToBinaryDataByIDs removes string tags from binary data based on given IDs.
     *
     * @generated from rpc viam.app.data.v1.DataService.RemoveTagsFromBinaryDataByIDs
     */
    removeTagsFromBinaryDataByIDs: {
      name: "RemoveTagsFromBinaryDataByIDs",
      I: jy,
      O: Hy,
      kind: m.Unary
    },
    /**
     * RemoveTagsToBinaryDataByFilter removes string tags from binary data based on the given filter.
     *
     * @generated from rpc viam.app.data.v1.DataService.RemoveTagsFromBinaryDataByFilter
     */
    removeTagsFromBinaryDataByFilter: {
      name: "RemoveTagsFromBinaryDataByFilter",
      I: Ky,
      O: Xy,
      kind: m.Unary
    },
    /**
     * TagsByFilter gets all unique tags from data based on given filter.
     *
     * @generated from rpc viam.app.data.v1.DataService.TagsByFilter
     */
    tagsByFilter: {
      name: "TagsByFilter",
      I: Qy,
      O: Zy,
      kind: m.Unary
    },
    /**
     * AddBoundingBoxToImageByID adds a bounding box to an image with the given ID.
     *
     * @generated from rpc viam.app.data.v1.DataService.AddBoundingBoxToImageByID
     */
    addBoundingBoxToImageByID: {
      name: "AddBoundingBoxToImageByID",
      I: ev,
      O: nv,
      kind: m.Unary
    },
    /**
     * RemoveBoundingBoxFromImageByID removes a bounding box from an image with the given ID.
     *
     * @generated from rpc viam.app.data.v1.DataService.RemoveBoundingBoxFromImageByID
     */
    removeBoundingBoxFromImageByID: {
      name: "RemoveBoundingBoxFromImageByID",
      I: av,
      O: tv,
      kind: m.Unary
    },
    /**
     * BoundingBoxLabelsByFilter gets all string labels for bounding boxes from data based on given filter.
     *
     * @generated from rpc viam.app.data.v1.DataService.BoundingBoxLabelsByFilter
     */
    boundingBoxLabelsByFilter: {
      name: "BoundingBoxLabelsByFilter",
      I: iv,
      O: rv,
      kind: m.Unary
    },
    /**
     * UpdateBoundingBox updates the bounding box associated with a given binary ID and bounding box ID.
     *
     * @generated from rpc viam.app.data.v1.DataService.UpdateBoundingBox
     */
    updateBoundingBox: {
      name: "UpdateBoundingBox",
      I: sv,
      O: ov,
      kind: m.Unary
    },
    /**
     * GetDatabaseConnection gets a connection to access a MongoDB Atlas Data Federation instance. It
     * returns the hostname of the federated database.
     *
     * @generated from rpc viam.app.data.v1.DataService.GetDatabaseConnection
     */
    getDatabaseConnection: {
      name: "GetDatabaseConnection",
      I: lv,
      O: dv,
      kind: m.Unary
    },
    /**
     * ConfigureDatabaseUser configures a database user for the Viam organization's MongoDB Atlas Data
     * Federation instance. It can also be used to reset the password of the existing database user.
     *
     * @generated from rpc viam.app.data.v1.DataService.ConfigureDatabaseUser
     */
    configureDatabaseUser: {
      name: "ConfigureDatabaseUser",
      I: mv,
      O: cv,
      kind: m.Unary
    },
    /**
     * AddBinaryDataToDatasetByIDs adds the binary data with the given binary IDs to the dataset.
     *
     * @generated from rpc viam.app.data.v1.DataService.AddBinaryDataToDatasetByIDs
     */
    addBinaryDataToDatasetByIDs: {
      name: "AddBinaryDataToDatasetByIDs",
      I: pv,
      O: uv,
      kind: m.Unary
    },
    /**
     * RemoveBinaryDataFromDatasetByIDs removes the binary data with the given binary IDs from the dataset.
     *
     * @generated from rpc viam.app.data.v1.DataService.RemoveBinaryDataFromDatasetByIDs
     */
    removeBinaryDataFromDatasetByIDs: {
      name: "RemoveBinaryDataFromDatasetByIDs",
      I: gv,
      O: Tv,
      kind: m.Unary
    }
  }
}, kv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.dataset.v1.Dataset",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "time_created", kind: "message", T: _ }
  ]
), P1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.dataset.v1.CreateDatasetRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), D1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.dataset.v1.CreateDatasetResponse",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), A1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.dataset.v1.DeleteDatasetRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), q1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.dataset.v1.DeleteDatasetResponse",
  []
), U1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.dataset.v1.RenameDatasetRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), L1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.dataset.v1.RenameDatasetResponse",
  []
), G1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.dataset.v1.ListDatasetsByOrganizationIDRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), B1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.dataset.v1.ListDatasetsByOrganizationIDResponse",
  () => [
    { no: 1, name: "datasets", kind: "message", T: kv, repeated: !0 }
  ]
), x1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.dataset.v1.ListDatasetsByIDsRequest",
  () => [
    { no: 1, name: "ids", kind: "scalar", T: 9, repeated: !0 }
  ]
), F1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.dataset.v1.ListDatasetsByIDsResponse",
  () => [
    { no: 1, name: "datasets", kind: "message", T: kv, repeated: !0 }
  ]
), J1 = {
  typeName: "viam.app.dataset.v1.DatasetService",
  methods: {
    /**
     * CreateDataset makes a new dataset.
     *
     * @generated from rpc viam.app.dataset.v1.DatasetService.CreateDataset
     */
    createDataset: {
      name: "CreateDataset",
      I: P1,
      O: D1,
      kind: m.Unary
    },
    /**
     * DeleteDatasets deletes an existing dataset.
     *
     * @generated from rpc viam.app.dataset.v1.DatasetService.DeleteDataset
     */
    deleteDataset: {
      name: "DeleteDataset",
      I: A1,
      O: q1,
      kind: m.Unary
    },
    /**
     * RenameDataset modifies the name of an existing dataset.
     *
     * @generated from rpc viam.app.dataset.v1.DatasetService.RenameDataset
     */
    renameDataset: {
      name: "RenameDataset",
      I: U1,
      O: L1,
      kind: m.Unary
    },
    /**
     * ListDatasetsByOrganizationID lists all of the datasets for an organization.
     *
     * @generated from rpc viam.app.dataset.v1.DatasetService.ListDatasetsByOrganizationID
     */
    listDatasetsByOrganizationID: {
      name: "ListDatasetsByOrganizationID",
      I: G1,
      O: B1,
      kind: m.Unary
    },
    /**
     * ListDatasetsByIDs lists all of the datasets specified by the given dataset IDs.
     *
     * @generated from rpc viam.app.dataset.v1.DatasetService.ListDatasetsByIDs
     */
    listDatasetsByIDs: {
      name: "ListDatasetsByIDs",
      I: x1,
      O: F1,
      kind: m.Unary
    }
  }
}, z1 = /* @__PURE__ */ s.makeEnum(
  "viam.app.datasync.v1.MimeType",
  [
    { no: 0, name: "MIME_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "MIME_TYPE_IMAGE_JPEG", localName: "IMAGE_JPEG" },
    { no: 2, name: "MIME_TYPE_IMAGE_PNG", localName: "IMAGE_PNG" },
    { no: 3, name: "MIME_TYPE_APPLICATION_PCD", localName: "APPLICATION_PCD" }
  ]
), nt = /* @__PURE__ */ s.makeEnum(
  "viam.app.datasync.v1.DataType",
  [
    { no: 0, name: "DATA_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "DATA_TYPE_BINARY_SENSOR", localName: "BINARY_SENSOR" },
    { no: 2, name: "DATA_TYPE_TABULAR_SENSOR", localName: "TABULAR_SENSOR" },
    { no: 3, name: "DATA_TYPE_FILE", localName: "FILE" }
  ]
), at = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datasync.v1.DataCaptureUploadRequest",
  () => [
    { no: 1, name: "metadata", kind: "message", T: Cn },
    { no: 2, name: "sensor_contents", kind: "message", T: tt, repeated: !0 }
  ]
), Y1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datasync.v1.DataCaptureUploadResponse",
  () => [
    {
      no: 1,
      name: "file_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "binary_data_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), $1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datasync.v1.FileUploadRequest",
  () => [
    { no: 1, name: "metadata", kind: "message", T: Cn, oneof: "upload_packet" },
    { no: 2, name: "file_contents", kind: "message", T: H1, oneof: "upload_packet" }
  ]
), V1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datasync.v1.FileUploadResponse",
  () => [
    {
      no: 1,
      name: "file_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "binary_data_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), W1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datasync.v1.StreamingDataCaptureUploadRequest",
  () => [
    { no: 1, name: "metadata", kind: "message", T: K1, oneof: "upload_packet" },
    { no: 2, name: "data", kind: "scalar", T: 12, oneof: "upload_packet" }
  ]
), j1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datasync.v1.StreamingDataCaptureUploadResponse",
  () => [
    {
      no: 1,
      name: "file_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "binary_data_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), zo = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datasync.v1.SensorMetadata",
  () => [
    { no: 1, name: "time_requested", kind: "message", T: _ },
    { no: 2, name: "time_received", kind: "message", T: _ },
    { no: 3, name: "mime_type", kind: "enum", T: s.getEnumType(z1) },
    { no: 4, name: "annotations", kind: "message", T: Jo }
  ]
), tt = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datasync.v1.SensorData",
  () => [
    { no: 1, name: "metadata", kind: "message", T: zo },
    { no: 2, name: "struct", kind: "message", T: l, oneof: "data" },
    { no: 3, name: "binary", kind: "scalar", T: 12, oneof: "data" }
  ]
), H1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datasync.v1.FileData",
  () => [
    {
      no: 1,
      name: "data",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
), Cn = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datasync.v1.UploadMetadata",
  () => [
    {
      no: 1,
      name: "part_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "component_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "component_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "method_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 6, name: "type", kind: "enum", T: s.getEnumType(nt) },
    {
      no: 7,
      name: "file_name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 8, name: "method_parameters", kind: "map", K: 9, V: { kind: "message", T: j } },
    {
      no: 9,
      name: "file_extension",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 10, name: "tags", kind: "scalar", T: 9, repeated: !0 },
    { no: 12, name: "dataset_ids", kind: "scalar", T: 9, repeated: !0 }
  ]
), K1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datasync.v1.DataCaptureUploadMetadata",
  () => [
    { no: 1, name: "upload_metadata", kind: "message", T: Cn },
    { no: 2, name: "sensor_metadata", kind: "message", T: zo }
  ]
), X1 = {
  typeName: "viam.app.datasync.v1.DataSyncService",
  methods: {
    /**
     * DataCaptureUpload uploads the contents and metadata for tabular data.
     *
     * @generated from rpc viam.app.datasync.v1.DataSyncService.DataCaptureUpload
     */
    dataCaptureUpload: {
      name: "DataCaptureUpload",
      I: at,
      O: Y1,
      kind: m.Unary
    },
    /**
     * FileUpload uploads the contents and metadata for binary (image + file) data,
     * where the first packet must be the UploadMetadata.
     *
     * @generated from rpc viam.app.datasync.v1.DataSyncService.FileUpload
     */
    fileUpload: {
      name: "FileUpload",
      I: $1,
      O: V1,
      kind: m.ClientStreaming
    },
    /**
     * StreamingDataCaptureUpload uploads the streaming contents and metadata for streaming binary (image + file) data,
     * where the first packet must be the UploadMetadata.
     *
     * @generated from rpc viam.app.datasync.v1.DataSyncService.StreamingDataCaptureUpload
     */
    streamingDataCaptureUpload: {
      name: "StreamingDataCaptureUpload",
      I: W1,
      O: j1,
      kind: m.ClientStreaming
    }
  }
}, Q1 = /* @__PURE__ */ s.makeEnum(
  "viam.app.datapipelines.v1.DataPipelineRunStatus",
  [
    { no: 0, name: "DATA_PIPELINE_RUN_STATUS_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "DATA_PIPELINE_RUN_STATUS_SCHEDULED", localName: "SCHEDULED" },
    { no: 2, name: "DATA_PIPELINE_RUN_STATUS_STARTED", localName: "STARTED" },
    { no: 3, name: "DATA_PIPELINE_RUN_STATUS_COMPLETED", localName: "COMPLETED" },
    { no: 4, name: "DATA_PIPELINE_RUN_STATUS_FAILED", localName: "FAILED" }
  ]
), yv = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.DataPipeline",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "mql_binary", kind: "scalar", T: 12, repeated: !0 },
    {
      no: 5,
      name: "schedule",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 6,
      name: "enabled",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 7, name: "created_on", kind: "message", T: _ },
    { no: 8, name: "updated_at", kind: "message", T: _ },
    { no: 9, name: "data_source_type", kind: "enum", T: s.getEnumType(He), opt: !0 }
  ]
), Z1 = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.GetDataPipelineRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), e_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.GetDataPipelineResponse",
  () => [
    { no: 1, name: "data_pipeline", kind: "message", T: yv }
  ]
), n_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.ListDataPipelinesRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), a_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.ListDataPipelinesResponse",
  () => [
    { no: 1, name: "data_pipelines", kind: "message", T: yv, repeated: !0 }
  ]
), t_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.CreateDataPipelineRequest",
  () => [
    {
      no: 1,
      name: "organization_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "mql_binary", kind: "scalar", T: 12, repeated: !0 },
    {
      no: 4,
      name: "schedule",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 5, name: "enable_backfill", kind: "scalar", T: 8, opt: !0 },
    { no: 6, name: "data_source_type", kind: "enum", T: s.getEnumType(He), opt: !0 }
  ]
), s_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.CreateDataPipelineResponse",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), o_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.RenameDataPipelineRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), i_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.RenameDataPipelineResponse",
  []
), r_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.DeleteDataPipelineRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), m_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.DeleteDataPipelineResponse",
  []
), c_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.EnableDataPipelineRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), l_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.EnableDataPipelineResponse",
  []
), d_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.DisableDataPipelineRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), p_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.DisableDataPipelineResponse",
  []
), u_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.ListDataPipelineRunsRequest",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "page_size",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    {
      no: 3,
      name: "page_token",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), g_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.ListDataPipelineRunsResponse",
  () => [
    {
      no: 1,
      name: "pipeline_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "runs", kind: "message", T: T_, repeated: !0 },
    {
      no: 3,
      name: "next_page_token",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), T_ = /* @__PURE__ */ s.makeMessageType(
  "viam.app.datapipelines.v1.DataPipelineRun",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "start_time", kind: "message", T: _ },
    { no: 3, name: "end_time", kind: "message", T: _ },
    { no: 4, name: "data_start_time", kind: "message", T: _ },
    { no: 5, name: "data_end_time", kind: "message", T: _ },
    { no: 6, name: "status", kind: "enum", T: s.getEnumType(Q1) }
  ]
), k_ = {
  typeName: "viam.app.datapipelines.v1.DataPipelinesService",
  methods: {
    /**
     * GetDataPipeline retrieves a specific data pipeline by its id.
     *
     * @generated from rpc viam.app.datapipelines.v1.DataPipelinesService.GetDataPipeline
     */
    getDataPipeline: {
      name: "GetDataPipeline",
      I: Z1,
      O: e_,
      kind: m.Unary
    },
    /**
     * ListDataPipelines returns a list of data pipelines based on organization id.
     *
     * @generated from rpc viam.app.datapipelines.v1.DataPipelinesService.ListDataPipelines
     */
    listDataPipelines: {
      name: "ListDataPipelines",
      I: n_,
      O: a_,
      kind: m.Unary
    },
    /**
     * CreateDataPipeline creates a new data pipeline with the provided configuration.
     *
     * @generated from rpc viam.app.datapipelines.v1.DataPipelinesService.CreateDataPipeline
     */
    createDataPipeline: {
      name: "CreateDataPipeline",
      I: t_,
      O: s_,
      kind: m.Unary
    },
    /**
     * RenameDataPipeline changes a data pipeline's name.
     *
     * @generated from rpc viam.app.datapipelines.v1.DataPipelinesService.RenameDataPipeline
     */
    renameDataPipeline: {
      name: "RenameDataPipeline",
      I: o_,
      O: i_,
      kind: m.Unary
    },
    /**
     * DeleteDataPipeline deletes a data pipeline from the database.
     *
     * @generated from rpc viam.app.datapipelines.v1.DataPipelinesService.DeleteDataPipeline
     */
    deleteDataPipeline: {
      name: "DeleteDataPipeline",
      I: r_,
      O: m_,
      kind: m.Unary
    },
    /**
     * EnableDataPipeline enables a data pipeline.
     *
     * @generated from rpc viam.app.datapipelines.v1.DataPipelinesService.EnableDataPipeline
     */
    enableDataPipeline: {
      name: "EnableDataPipeline",
      I: c_,
      O: l_,
      kind: m.Unary
    },
    /**
     * DisableDataPipeline disables a data pipeline.
     *
     * @generated from rpc viam.app.datapipelines.v1.DataPipelinesService.DisableDataPipeline
     */
    disableDataPipeline: {
      name: "DisableDataPipeline",
      I: d_,
      O: p_,
      kind: m.Unary
    },
    /**
     * ListDataPipelineRuns lists the runs of a data pipeline.
     *
     * @generated from rpc viam.app.datapipelines.v1.DataPipelinesService.ListDataPipelineRuns
     */
    listDataPipelineRuns: {
      name: "ListDataPipelineRuns",
      I: u_,
      O: g_,
      kind: m.Unary
    }
  }
}, Ge = () => {
  console.warn(
    "The BinaryID type is deprecated and will be removed in a future release. Please migrate to the BinaryDataId field instead."
  );
};
class y_ {
  dataClient;
  datasetClient;
  dataSyncClient;
  dataPipelinesClient;
  constructor(e) {
    this.dataClient = C(N1, e), this.datasetClient = C(J1, e), this.dataSyncClient = C(X1, e), this.dataPipelinesClient = C(
      k_,
      e
    );
  }
  /**
   * Obtain unified tabular data and metadata from the specified data source.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.exportTabularData(
   *   '123abc45-1234-5678-90ab-cdef12345678',
   *   'my-sensor',
   *   'rdk:component:sensor',
   *   'Readings',
   *   new Date('2025-03-25'),
   *   new Date('2024-03-27')
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#exporttabulardata).
   *
   * @param partId The ID of the part that owns the data
   * @param resourceName The name of the requested resource that captured the
   *   data
   * @param resourceSubtype The subtype of the requested resource that captured
   *   the data
   * @param methodName The data capture method name
   * @param startTime Optional start time (`Date` object) for requesting a
   *   specific range of data
   * @param endTime Optional end time (`Date` object) for requesting a specific
   *   range of data
   * @returns An array of unified tabular data and metadata.
   */
  async exportTabularData(e, n, t, o, i, r, c) {
    const d = new On();
    i && (d.start = _.fromDate(i)), r && (d.end = _.fromDate(r));
    let p;
    c && (p = l.fromJson(c));
    const T = {
      partId: e,
      resourceName: n,
      resourceSubtype: t,
      methodName: o,
      interval: d,
      additionalParameters: p
    }, R = this.dataClient.exportTabularData(T), S = [];
    for await (const h of R)
      S.push({
        partId: h.partId,
        resourceName: h.resourceName,
        resourceSubtype: h.resourceSubtype,
        methodName: h.methodName,
        timeCaptured: h.timeCaptured.toDate(),
        // eslint-disable-line @typescript-eslint/no-non-null-assertion
        organizationId: h.organizationId,
        locationId: h.locationId,
        robotName: h.robotName,
        robotId: h.robotId,
        partName: h.partName,
        methodParameters: h.methodParameters.toJson(),
        // eslint-disable-line @typescript-eslint/no-non-null-assertion
        tags: h.tags,
        payload: h.payload.toJson()
        // eslint-disable-line @typescript-eslint/no-non-null-assertion
      });
    return S;
  }
  /**
   * Obtain unified tabular data and metadata, queried with SQL.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.tabularDataBySQL(
   *   '123abc45-1234-5678-90ab-cdef12345678',
   *   'SELECT * FROM readings LIMIT 5'
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#exporttabulardata).
   *
   * @param organizationId The ID of the organization that owns the data
   * @param query The SQL query to run
   * @returns An array of data objects
   */
  async tabularDataBySQL(e, n) {
    return (await this.dataClient.tabularDataBySQL({
      organizationId: e,
      sqlQuery: n
    })).rawData.map((o) => Bn.deserialize(o));
  }
  /**
   * Obtain unified tabular data and metadata, queried with MQL.
   *
   * @example
   *
   * ```ts
   * // {@link JsonValue} is imported from @bufbuild/protobuf
   * const mqlQuery: Record<string, JsonValue>[] = [
   *   {
   *     $match: {
   *       component_name: 'sensor-1',
   *     },
   *   },
   *   {
   *     $limit: 5,
   *   },
   * ];
   *
   * const data = await dataClient.tabularDataByMQL(
   *   '123abc45-1234-5678-90ab-cdef12345678',
   *   mqlQuery
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#tabulardatabymql).
   *
   * @param organizationId The ID of the organization that owns the data
   * @param query The MQL query to run as a list of BSON documents
   * @param useRecentData Whether to query blob storage or your recent data
   *   store. Defaults to false. Deprecated - use dataSource instead.
   * @param dataSource The data source to query. Defaults to the standard data
   *   source.
   * @returns An array of data objects
   */
  async tabularDataByMQL(e, n, t, o) {
    const i = n[0] instanceof Uint8Array ? n : n.map((d) => Bn.serialize(d));
    let r = o;
    return t && (!r || r.type === He.UNSPECIFIED) && (r = new xo({
      type: He.HOT_STORAGE
    })), (await this.dataClient.tabularDataByMQL({
      organizationId: e,
      mqlBinary: i,
      dataSource: r
    })).rawData.map((d) => Bn.deserialize(d));
  }
  /**
   * Filter and get a page of tabular data. The returned metadata might be empty
   * if the metadata index of the data is out of the bounds of the returned
   * metadata list. The data will be paginated into pages of `limit` items, and
   * the pagination ID will be included in the returned tuple.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.tabularDataByFilter(
   *   {
   *     componentName: 'sensor-1',
   *     componentType: 'rdk:component:sensor',
   *   } as Filter,
   *   5
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#tabulardatabyfilter).
   *
   * @param filter Optional `pb.Filter` specifying tabular data to retrieve. No
   *   `filter` implies all tabular data.
   * @param limit The maximum number of entries to include in a page. Defaults
   *   to 50 if unspecfied
   * @param sortOrder The desired sort order of the data
   * @param last Optional string indicating the ID of the last-returned data. If
   *   provided, the server will return the next data entries after the `last`
   *   ID.
   * @param countOnly Whether to return only the total count of entries
   * @param includeInternalData Whether to retun internal data. Internal data is
   *   used for Viam-specific data ingestion, like cloud SLAM. Defaults to
   *   `false`.
   * @returns An array of data objects, the count (number of entries), and the
   *   last-returned page ID.
   */
  async tabularDataByFilter(e, n, t, o = "", i = !1, r = !1) {
    const d = {
      dataRequest: {
        filter: e,
        limit: n === void 0 ? void 0 : BigInt(n),
        sortOrder: t,
        last: o
      },
      countOnly: i,
      includeInternalData: r
    }, p = await this.dataClient.tabularDataByFilter(d), T = p.metadata.length, R = [];
    return R.push(
      ...p.data.map((S) => {
        const h = S.metadataIndex, I = T !== 0 && h >= T ? new Pa() : p.metadata[h];
        return {
          data: S.data?.toJson(),
          metadata: I,
          timeRequested: S.timeRequested?.toDate(),
          timeReceived: S.timeRequested?.toDate()
        };
      })
    ), {
      data: R,
      count: p.count,
      last: p.last
    };
  }
  /**
   * Filter and get a page of binary data. The returned metadata might be empty
   * if the metadata index of the data is out of the bounds of the returned
   * metadata list. The data will be paginated into pages of `limit` items, and
   * the pagination ID will be included in the returned tuple.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.binaryDataByFilter(
   *   {
   *     componentName: 'camera-1',
   *     componentType: 'rdk:component:camera',
   *   } as Filter,
   *   1
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#binarydatabyfilter).
   *
   * @param filter Optional `pb.Filter` specifying binary data to retrieve. No
   *   `filter` implies all binary data.
   * @param limit The maximum number of entries to include in a page. Defaults
   *   to 50 if unspecfied
   * @param sortOrder The desired sort order of the data
   * @param last Optional string indicating the ID of the last-returned data. If
   *   provided, the server will return the next data entries after the `last`
   *   ID.
   * @param includeBinary Whether to include binary file data with each
   *   retrieved file
   * @param countOnly Whether to return only the total count of entries
   * @param includeInternalData Whether to retun internal data. Internal data is
   *   used for Viam-specific data ingestion, like cloud SLAM. Defaults to
   *   `false`.
   * @returns An array of data objects, the count (number of entries), and the
   *   last-returned page ID.
   */
  async binaryDataByFilter(e, n, t, o = "", i = !0, r = !1, c = !1) {
    const p = {
      dataRequest: {
        filter: e,
        limit: n === void 0 ? void 0 : BigInt(n),
        sortOrder: t,
        last: o
      },
      includeBinary: i,
      countOnly: r,
      includeInternalData: c
    }, T = await this.dataClient.binaryDataByFilter(p);
    return {
      data: T.data,
      count: T.count,
      last: T.last
    };
  }
  /**
   * Get binary data using the binary data ID.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.binaryDataByIds([
   *   'ccb74b53-1235-4328-a4b9-91dff1915a50/x5vur1fmps/YAEzj5I1kTwtYsDdf4a7ctaJpGgKRHmnM9bJNVyblk52UpqmrnMVTITaBKZctKEh',
   * ]);
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#binarydatabyids).
   *
   * @param ids The IDs of the requested binary data
   * @returns An array of data objects
   */
  async binaryDataByIds(e) {
    return Array.isArray(e) && typeof e[0] == "string" ? (await this.dataClient.binaryDataByIDs({
      binaryDataIds: e,
      includeBinary: !0
    })).data : (Ge(), (await this.dataClient.binaryDataByIDs({
      binaryIds: e,
      includeBinary: !0
    })).data);
  }
  /**
   * Delete tabular data older than a specified number of days.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.deleteTabularData(
   *   '123abc45-1234-5678-90ab-cdef12345678',
   *   10
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#deletetabulardata).
   *
   * @param organizationId The ID of organization to delete data from
   * @param deleteOlderThanDays Delete data that was captured more than this
   *   many days ago. For example if `deleteOlderThanDays` is 10, this deletes
   *   any data that was captured more than 10 days ago. If it is 0, all
   *   existing data is deleted.
   * @returns The number of items deleted
   */
  async deleteTabularData(e, n) {
    return (await this.dataClient.deleteTabularData({
      organizationId: e,
      deleteOlderThanDays: n
    })).deletedCount;
  }
  /**
   * Filter and delete binary data.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.deleteBinaryDataByFilter({
   *   componentName: 'camera-1',
   *   componentType: 'rdk:component:camera',
   *   organizationIds: ['123abc45-1234-5678-90ab-cdef12345678'],
   *   startTime: new Date('2025-03-19'),
   *   endTime: new Date('2025-03-20'),
   * } as Filter);
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#deletebinarydatabyfilter).
   *
   * @param filter Optional `pb.Filter` specifying binary data to delete. No
   *   `filter` implies all binary data.
   * @param includeInternalData Whether or not to delete internal data. Default
   *   is true
   * @returns The number of items deleted
   */
  async deleteBinaryDataByFilter(e, n = !0) {
    return (await this.dataClient.deleteBinaryDataByFilter({
      filter: e,
      includeInternalData: n
    })).deletedCount;
  }
  /**
   * Delete binary data, specified by ID.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.deleteBinaryDataByIds([
   *   'ccb74b53-1235-4328-a4b9-91dff1915a50/x5vur1fmps/YAEzj5I1kTwtYsDdf4a7ctaJpGgKRHmnM9bJNVyblk52UpqmrnMVTITaBKZctKEh',
   * ]);
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#deletebinarydatabyids).
   *
   * @param ids The IDs of the data to be deleted. Must be non-empty.
   * @returns The number of items deleted
   */
  async deleteBinaryDataByIds(e) {
    return Array.isArray(e) && typeof e[0] == "string" ? (await this.dataClient.deleteBinaryDataByIDs({
      binaryDataIds: e
    })).deletedCount : (Ge(), (await this.dataClient.deleteBinaryDataByIDs({
      binaryIds: e
    })).deletedCount);
  }
  /**
   * Add tags to binary data, specified by ID.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.addTagsToBinaryDataByIds(
   *   ['tag1', 'tag2'],
   *   [
   *     'ccb74b53-1235-4328-a4b9-91dff1915a50/x5vur1fmps/YAEzj5I1kTwtYsDdf4a7ctaJpGgKRHmnM9bJNVyblk52UpqmrnMVTITaBKZctKEh',
   *   ]
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#addtagstobinarydatabyids).
   *
   * @param tags The list of tags to add to specified binary data. Must be
   *   non-empty.
   * @param ids The IDs of the data to be tagged. Must be non-empty.
   */
  async addTagsToBinaryDataByIds(e, n) {
    if (Array.isArray(n) && typeof n[0] == "string") {
      await this.dataClient.addTagsToBinaryDataByIDs({
        tags: e,
        binaryDataIds: n
      });
      return;
    }
    Ge(), await this.dataClient.addTagsToBinaryDataByIDs({
      tags: e,
      binaryIds: n
    });
  }
  /**
   * Add tags to binary data, specified by filter.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.addTagsToBinaryDataByFilter(
   *   ['tag1', 'tag2'],
   *   [
   *     {
   *       componentName: 'camera-1',
   *     } as Filter,
   *   ]
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#addtagstobinarydatabyfilter).
   *
   * @param tags The tags to add to the data
   * @param filter Optional `pb.Filter` specifying binary data to add tags to.
   *   No `filter` implies all binary data.
   */
  async addTagsToBinaryDataByFilter(e, n) {
    await this.dataClient.addTagsToBinaryDataByFilter({
      tags: e,
      filter: n
    });
  }
  /**
   * Remove tags from binary data, specified by ID.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.removeTagsFromBinaryDataByIds(
   *   ['tag1', 'tag2'],
   *   [
   *     'ccb74b53-1235-4328-a4b9-91dff1915a50/x5vur1fmps/YAEzj5I1kTwtYsDdf4a7ctaJpGgKRHmnM9bJNVyblk52UpqmrnMVTITaBKZctKEh',
   *   ]
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#removetagsfrombinarydatabyids).
   *
   * @param tags List of tags to remove from specified binary data. Must be
   *   non-empty.
   * @param ids The IDs of the data to be edited. Must be non-empty.
   * @returns The number of items deleted
   */
  async removeTagsFromBinaryDataByIds(e, n) {
    return Array.isArray(n) && typeof n[0] == "string" ? (await this.dataClient.removeTagsFromBinaryDataByIDs({
      tags: e,
      binaryDataIds: n
    })).deletedCount : (Ge(), (await this.dataClient.removeTagsFromBinaryDataByIDs({
      tags: e,
      binaryIds: n
    })).deletedCount);
  }
  /**
   * Remove tags from binary data, specified by filter.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.removeTagsFromBinaryDataByFilter(
   *   ['tag1', 'tag2'],
   *   {
   *     componentName: 'camera-1',
   *     componentType: 'rdk:component:camera',
   *     organizationIds: ['123abc45-1234-5678-90ab-cdef12345678'],
   *     startTime: new Date('2025-03-19'),
   *     endTime: new Date('2025-03-20'),
   *   } as Filter
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#removetagsfrombinarydatabyfilter).
   *
   * @param tags List of tags to remove from specified binary data. Must be
   *   non-empty.
   * @param filter Optional `pb.Filter` specifying binary data to add tags to.
   *   No `filter` implies all binary data.
   * @returns The number of items deleted
   */
  async removeTagsFromBinaryDataByFilter(e, n) {
    return (await this.dataClient.removeTagsFromBinaryDataByFilter({
      tags: e,
      filter: n
    })).deletedCount;
  }
  /**
   * Get a list of tags using a filter.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.tagsByFilter({
   *   componentName: 'camera-1',
   * } as Filter);
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#tagsbyfilter).
   *
   * @param filter Optional `pb.Filter` specifying what data to get tags from.
   *   No `filter` implies all data.
   * @returns The list of tags
   */
  async tagsByFilter(e) {
    return (await this.dataClient.tagsByFilter({ filter: e })).tags;
  }
  /**
   * Add bounding box to an image.
   *
   * @example
   *
   * ```ts
   * const bboxId = await dataClient.addBoundingBoxToImageById(
   *   'ccb74b53-1235-4328-a4b9-91dff1915a50/x5vur1fmps/YAEzj5I1kTwtYsDdf4a7ctaJpGgKRHmnM9bJNVyblk52UpqmrnMVTITaBKZctKEh',
   *   'label1',
   *   0.3,
   *   0.3,
   *   0.6,
   *   0.6
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#addboundingboxtoimagebyid).
   *
   * @param binaryId The ID of the image to add the bounding box to
   * @param label A label for the bounding box
   * @param xMinNormalized The min X value of the bounding box normalized from 0
   *   to 1
   * @param yMinNormalized The min Y value of the bounding box normalized from 0
   *   to 1
   * @param xMaxNormalized The max X value of the bounding box normalized from 0
   *   to 1
   * @param yMaxNormalized The max Y value of the bounding box normalized from 0
   *   to 1
   * @returns The bounding box ID
   */
  async addBoundingBoxToImageById(e, n, t, o, i, r) {
    return typeof e == "string" ? (await this.dataClient.addBoundingBoxToImageByID({
      binaryDataId: e,
      label: n,
      xMinNormalized: t,
      yMinNormalized: o,
      xMaxNormalized: i,
      yMaxNormalized: r
    })).bboxId : (Ge(), (await this.dataClient.addBoundingBoxToImageByID({
      binaryId: e,
      label: n,
      xMinNormalized: t,
      yMinNormalized: o,
      xMaxNormalized: i,
      yMaxNormalized: r
    })).bboxId);
  }
  /**
   * Remove a bounding box from an image.
   *
   * @example
   *
   * ```ts
   * await dataClient.removeBoundingBoxFromImageById(
   *   'ccb74b53-1235-4328-a4b9-91dff1915a50/x5vur1fmps/YAEzj5I1kTwtYsDdf4a7ctaJpGgKRHmnM9bJNVyblk52UpqmrnMVTITaBKZctKEh',
   *   '5Z9ryhkW7ULaXROjJO6ghPYulNllnH20QImda1iZFroZpQbjahK6igQ1WbYigXED'
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#removeboundingboxfromimagebyid).
   *
   * @param binId The ID of the image to remove the bounding box from
   * @param bboxId The ID of the bounding box to remove
   */
  async removeBoundingBoxFromImageById(e, n) {
    if (typeof e == "string") {
      await this.dataClient.removeBoundingBoxFromImageByID({
        binaryDataId: e,
        bboxId: n
      });
      return;
    }
    Ge(), await this.dataClient.removeBoundingBoxFromImageByID({
      binaryId: e,
      bboxId: n
    });
  }
  /**
   * Get a list of bounding box labels using a Filter.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.boundingBoxLabelsByFilter({
   *   componentName: 'camera-1',
   * } as Filter);
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#boundingboxlabelsbyfilter).
   *
   * @param filter Optional `pb.Filter` specifying what data to get tags from.
   *   No `filter` implies all labels.
   * @returns The list of bounding box labels
   */
  async boundingBoxLabelsByFilter(e) {
    return (await this.dataClient.boundingBoxLabelsByFilter({
      filter: e
    })).labels;
  }
  /**
   * Configure a database user for the Viam organization's MongoDB Atlas Data
   * Federation instance. It can also be used to reset the password of the
   * existing database user.
   *
   * @example
   *
   * ```ts
   * await dataClient.configureDatabaseUser(
   *   '123abc45-1234-5678-90ab-cdef12345678',
   *   'Password01!'
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#configuredatabaseuser).
   *
   * @param organizationId The ID of the organization
   * @param password The password of the user
   */
  async configureDatabaseUser(e, n) {
    await this.dataClient.configureDatabaseUser({ organizationId: e, password: n });
  }
  /**
   * Get a connection to access a MongoDB Atlas Data federation instance.
   *
   * @example
   *
   * ```ts
   * const hostname = await dataClient.getDatabaseConnection(
   *   '123abc45-1234-5678-90ab-cdef12345678'
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#getdatabaseconnection).
   *
   * @param organizationId Organization to retrieve connection for
   * @returns Hostname of the federated database
   */
  async getDatabaseConnection(e) {
    return (await this.dataClient.getDatabaseConnection({
      organizationId: e
    })).hostname;
  }
  /**
   * Add BinaryData to the provided dataset.
   *
   * @example
   *
   * ```ts
   * await dataClient.addBinaryDataToDatasetByIds(
   *   [
   *     'ccb74b53-1235-4328-a4b9-91dff1915a50/x5vur1fmps/YAEzj5I1kTwtYsDdf4a7ctaJpGgKRHmnM9bJNVyblk52UpqmrnMVTITaBKZctKEh',
   *   ],
   *   '12ab3de4f56a7bcd89ef0ab1'
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#addbinarydatatodatasetbyids).
   *
   * @param ids The IDs of binary data to add to dataset
   * @param datasetId The ID of the dataset to be added to
   */
  async addBinaryDataToDatasetByIds(e, n) {
    if (Array.isArray(e) && typeof e[0] == "string") {
      await this.dataClient.addBinaryDataToDatasetByIDs({
        binaryDataIds: e,
        datasetId: n
      });
      return;
    }
    Ge(), await this.dataClient.addBinaryDataToDatasetByIDs({
      binaryIds: e,
      datasetId: n
    });
  }
  /**
   * Remove BinaryData from the provided dataset.
   *
   * @example
   *
   * ```ts
   * await dataClient.removeBinaryDataFromDatasetByIds(
   *   [
   *     'ccb74b53-1235-4328-a4b9-91dff1915a50/x5vur1fmps/YAEzj5I1kTwtYsDdf4a7ctaJpGgKRHmnM9bJNVyblk52UpqmrnMVTITaBKZctKEh',
   *   ],
   *   '12ab3de4f56a7bcd89ef0ab1'
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#removebinarydatafromdatasetbyids).
   *
   * @param ids The IDs of the binary data to remove from dataset
   * @param datasetId The ID of the dataset to be removed from
   */
  async removeBinaryDataFromDatasetByIds(e, n) {
    if (Array.isArray(e) && typeof e[0] == "string") {
      await this.dataClient.removeBinaryDataFromDatasetByIDs({
        binaryDataIds: e,
        datasetId: n
      });
      return;
    }
    Ge(), await this.dataClient.removeBinaryDataFromDatasetByIDs({
      binaryIds: e,
      datasetId: n
    });
  }
  /**
   * Create a new dataset.
   *
   * @example
   *
   * ```ts
   * const datasetId = await dataClient.createDataset(
   *   'my-new-dataset',
   *   '123abc45-1234-5678-90ab-cdef12345678'
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#createdataset).
   *
   * @param name The name of the new dataset
   * @param organizationId The ID of the organization the dataset is being
   *   created in
   * @returns The ID of the dataset
   */
  async createDataset(e, n) {
    return (await this.datasetClient.createDataset({
      name: e,
      organizationId: n
    })).id;
  }
  /**
   * Delete a dataset.
   *
   * @example
   *
   * ```ts
   * await dataClient.deleteDataset('12ab3de4f56a7bcd89ef0ab1');
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#deletedataset).
   *
   * @param id The ID of the dataset.
   */
  async deleteDataset(e) {
    await this.datasetClient.deleteDataset({ id: e });
  }
  /**
   * Rename a dataset.
   *
   * @example
   *
   * ```ts
   * await dataClient.renameDataset(
   *   '12ab3de4f56a7bcd89ef0ab1',
   *   'my-new-dataset'
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#renamedataset).
   *
   * @param id The ID of the dataset
   * @param name The new name of the dataset
   */
  async renameDataset(e, n) {
    await this.datasetClient.renameDataset({ id: e, name: n });
  }
  /**
   * List all of the datasets for an organization.
   *
   * @example
   *
   * ```ts
   * const datasets = await dataClient.listDatasetsByOrganizationID(
   *   '123abc45-1234-5678-90ab-cdef12345678'
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#listdatasetsbyorganizationid).
   *
   * @param organizationId The ID of the organization
   * @returns The list of datasets in the organization
   */
  async listDatasetsByOrganizationID(e) {
    return (await this.datasetClient.listDatasetsByOrganizationID({
      organizationId: e
    })).datasets.map((t) => ({
      created: t.timeCreated?.toDate(),
      ...t
    }));
  }
  /**
   * List all of the datasets specified by the given dataset IDs.
   *
   * @example
   *
   * ```ts
   * const datasets = await dataClient.listDatasetsByIds([
   *   '12ab3de4f56a7bcd89ef0ab1',
   * ]);
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#listdatasetsbyids).
   *
   * @param ids The list of IDs of the datasets
   * @returns The list of datasets
   */
  async listDatasetsByIds(e) {
    return (await this.datasetClient.listDatasetsByIDs({
      ids: e
    })).datasets.map((t) => ({
      created: t.timeCreated?.toDate(),
      ...t
    }));
  }
  /**
   * Uploads the content and metadata for tabular data.
   *
   * Upload tabular data collected on a robot through a specific component (for
   * example, a motor) along with the relevant metadata to app.viam.com. Tabular
   * data can be found under the "Sensors" subtab of the Data tab on
   * app.viam.com.
   *
   * @example
   *
   * ```ts
   * const fileId = await dataClient.tabularDataCaptureUpload(
   *   [
   *     {
   *       readings: {
   *         timestamp: '2025-03-26T10:00:00Z',
   *         value: 10,
   *       },
   *     },
   *   ],
   *   '123abc45-1234-5678-90ab-cdef12345678',
   *   'rdk:component:sensor',
   *   'my-sensor',
   *   'Readings',
   *   [
   *     [
   *       new Date('2025-03-26T10:00:00Z'),
   *       new Date('2025-03-26T10:00:00Z'),
   *     ],
   *   ]
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#tabulardatacaptureupload).
   *
   * @param tabularData The list of data to be uploaded, represented tabularly
   *   as an array.
   * @param partId The part ID of the component used to capture the data
   * @param componentType The type of the component used to capture the data
   *   (for example, "movementSensor")
   * @param componentName The name of the component used to capture the data
   * @param methodName The name of the method used to capture the data.
   * @param tags The list of tags to allow for tag-based filtering when
   *   retrieving data
   * @param dataRequestTimes Array of Date tuples, each containing two `Date`
   *   objects denoting the times this data was requested[0] by the robot and
   *   received[1] from the appropriate sensor. Passing a list of tabular data
   *   and Timestamps with length n > 1 will result in n datapoints being
   *   uploaded, all tied to the same metadata.
   * @returns The file ID of the uploaded data
   */
  async tabularDataCaptureUpload(e, n, t, o, i, r, c) {
    if (r.length !== e.length)
      throw new Error("dataRequestTimes and data lengths must be equal.");
    const d = new Cn({
      partId: n,
      componentType: t,
      componentName: o,
      methodName: i,
      type: nt.TABULAR_SENSOR,
      tags: c
    }), p = [];
    for (const [S, h] of e.entries()) {
      const I = new zo(), O = r[S];
      O && (I.timeRequested = _.fromDate(O[0]), I.timeReceived = _.fromDate(O[1])), p.push(
        new tt({
          metadata: I,
          data: {
            case: "struct",
            value: l.fromJson(h)
          }
        })
      );
    }
    const T = new at({
      metadata: d,
      sensorContents: p
    });
    return (await this.dataSyncClient.dataCaptureUpload(T)).fileId;
  }
  /**
   * Uploads the content and metadata for binary data.
   *
   * Upload binary data collected on a robot through a specific component (for
   * example, a motor) along with the relevant metadata to app.viam.com. binary
   * data can be found under the "Sensors" subtab of the Data tab on
   * app.viam.com.
   *
   * @example
   *
   * ```ts
   * const binaryDataId = await dataClient.binaryDataCaptureUpload(
   *   binaryData,
   *   '123abc45-1234-5678-90ab-cdef12345678',
   *   'rdk:component:camera',
   *   'my-camera',
   *   'ReadImage',
   *   '.jpg',
   *   [new Date('2025-03-19'), new Date('2025-03-19')]
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#binarydatacaptureupload).
   *
   * @param binaryData The data to be uploaded, represented in bytes
   * @param partId The part ID of the component used to capture the data
   * @param componentType The type of the component used to capture the data
   *   (for example, "movementSensor")
   * @param componentName The name of the component used to capture the data
   * @param methodName The name of the method used to capture the data.
   * @param fileExtension The file extension of binary data including the
   *   period, for example .jpg, .png, or .pcd. The backend will route the
   *   binary to its corresponding mime type based on this extension. Files with
   *   a .jpeg, .jpg, or .png extension will be saved to the images tab.
   * @param tags The list of tags to allow for tag-based filtering when
   *   retrieving data
   * @param dataRequestTimes Tuple containing `Date` objects denoting the times
   *   this data was requested[0] by the robot and received[1] from the
   *   appropriate sensor.
   * @returns The binary data ID of the uploaded data
   */
  async binaryDataCaptureUpload(e, n, t, o, i, r, c, d) {
    const p = new Cn({
      partId: n,
      componentType: t,
      componentName: o,
      methodName: i,
      type: nt.BINARY_SENSOR,
      tags: d,
      fileExtension: r
    }), T = new tt({
      metadata: {
        timeRequested: _.fromDate(c[0]),
        timeReceived: _.fromDate(c[1])
      },
      data: {
        case: "binary",
        value: e
      }
    }), R = new at({
      metadata: p,
      sensorContents: [T]
    });
    return (await this.dataSyncClient.dataCaptureUpload(R)).binaryDataId;
  }
  // eslint-disable-next-line class-methods-use-this
  createFilter(e) {
    const n = new $e(e);
    if (e.startTime ?? e.endTime) {
      const o = new On();
      e.startTime && (o.start = _.fromDate(e.startTime)), e.endTime && (o.end = _.fromDate(e.endTime)), n.interval = o;
    }
    const t = new Bo();
    return e.tags && (t.tags = e.tags, n.tagsFilter = t), n;
  }
  /**
   * Gets the most recent tabular data captured from the specified data source,
   * as long as it was synced within the last year.
   *
   * @example
   *
   * ```ts
   * const data = await dataClient.getLatestTabularData(
   *   '123abc45-1234-5678-90ab-cdef12345678',
   *   'my-sensor',
   *   'rdk:component:sensor',
   *   'Readings'
   * );
   * ```
   *
   * For more information, see [Data
   * API](https://docs.viam.com/dev/reference/apis/data-client/#getlatesttabulardata).
   *
   * @param partId The ID of the part that owns the data
   * @param resourceName The name of the requested resource that captured the
   *   data. Ex: "my-sensor"
   * @param resourceSubtype The subtype of the requested resource that captured
   *   the data. Ex: "rdk:component:sensor"
   * @param methodName The data capture method name. Ex: "Readings"
   * @returns A tuple containing [timeCaptured, timeSynced, payload] or null if
   *   no data has been synced for the specified resource OR the most recently
   *   captured data was over a year ago
   */
  async getLatestTabularData(e, n, t, o, i) {
    let r;
    i && (r = l.fromJson(i));
    const c = await this.dataClient.getLatestTabularData({
      partId: e,
      resourceName: n,
      resourceSubtype: t,
      methodName: o,
      additionalParameters: r
    });
    return !c.payload || !c.timeCaptured || !c.timeSynced ? null : [
      c.timeCaptured.toDate(),
      c.timeSynced.toDate(),
      c.payload.toJson()
    ];
  }
  /**
   * List all data pipelines for an organization.
   *
   * @example
   *
   * ```ts
   * const pipelines = await dataClient.listDataPipelines(
   *   '123abc45-1234-5678-90ab-cdef12345678'
   * );
   * ```
   *
   * @param organizationId The ID of the organization
   * @returns The list of data pipelines
   */
  async listDataPipelines(e) {
    return (await this.dataPipelinesClient.listDataPipelines({
      organizationId: e
    })).dataPipelines;
  }
  /**
   * Get a data pipeline configuration by its ID.
   *
   * @example
   *
   * ```ts
   * const pipeline = await dataClient.getPipeline(
   *   '123abc45-1234-5678-90ab-cdef12345678'
   * );
   * ```
   *
   * @param pipelineId The ID of the data pipeline
   * @returns The data pipeline configuration or null if it does not exist
   */
  async getDataPipeline(e) {
    return (await this.dataPipelinesClient.getDataPipeline({
      id: e
    })).dataPipeline ?? null;
  }
  /**
   * Creates a new data pipeline using the given query and schedule.
   *
   * @example
   *
   * ```ts
   * // {@link JsonValue} is imported from @bufbuild/protobuf
   * const mqlQuery: Record<string, JsonValue>[] = [
   *   {
   *     $match: {
   *       component_name: 'sensor-1',
   *     },
   *   },
   *   {
   *     $limit: 5,
   *   },
   * ];
   *
   * const pipelineId = await dataClient.createDataPipeline(
   *   '123abc45-1234-5678-90ab-cdef12345678',
   *   'my-pipeline',
   *   mqlQuery,
   *   '0 0 * * *'
   *   false
   * );
   * ```
   *
   * @param organizationId The ID of the organization
   * @param name The name of the data pipeline
   * @param query The MQL query to run as a list of BSON documents
   * @param schedule The schedule to run the query on (cron expression)
   * @param dataSourceType The type of data source to use for the data pipeline
   * @returns The ID of the created data pipeline
   */
  async createDataPipeline(e, n, t, o, i, r) {
    const c = t[0] instanceof Uint8Array ? t : t.map((T) => Bn.serialize(T)), d = r ?? He.STANDARD;
    return (await this.dataPipelinesClient.createDataPipeline({
      organizationId: e,
      name: n,
      mqlBinary: c,
      schedule: o,
      enableBackfill: i,
      dataSourceType: d
    })).id;
  }
  /**
   * Deletes a data pipeline by its ID.
   *
   * @example
   *
   * ```ts
   * await dataClient.deleteDataPipeline(
   *   '123abc45-1234-5678-90ab-cdef12345678'
   * );
   * ```
   *
   * @param pipelineId The ID of the data pipeline
   */
  async deleteDataPipeline(e) {
    await this.dataPipelinesClient.deleteDataPipeline({
      id: e
    });
  }
  /**
   * List all runs of a data pipeline.
   *
   * @example
   *
   * ```ts
   * const page = await dataClient.listDataPipelineRuns(
   *   '123abc45-1234-5678-90ab-cdef12345678'
   * );
   * page.runs.forEach((run) => {
   *   console.log(run);
   * });
   * page = await page.nextPage();
   * page.runs.forEach((run) => {
   *   console.log(run);
   * });
   * ```
   *
   * @param pipelineId The ID of the data pipeline
   * @param pageSize The number of runs to return per page
   * @returns A page of data pipeline runs
   */
  async listDataPipelineRuns(e, n) {
    const t = await this.dataPipelinesClient.listDataPipelineRuns({
      id: e,
      pageSize: n
    });
    return new ua(
      this.dataPipelinesClient,
      e,
      t.runs,
      n,
      t.nextPageToken
    );
  }
}
class ua {
  constructor(e, n, t = [], o, i) {
    this.dataPipelinesClient = e, this.pipelineId = n, this.runs = t, this.pageSize = o, this.nextPageToken = i;
  }
  /**
   * Retrieves the next page of data pipeline runs.
   *
   * @example
   *
   * ```ts
   * const page = await dataClient.listDataPipelineRuns(
   *   '123abc45-1234-5678-90ab-cdef12345678'
   * );
   * const nextPage = await page.nextPage();
   * ```
   *
   * @returns A page of data pipeline runs
   */
  async nextPage() {
    if (this.nextPageToken === void 0 || this.nextPageToken === "")
      return new ua(
        this.dataPipelinesClient,
        this.pipelineId,
        [],
        this.pageSize,
        ""
      );
    const e = await this.dataPipelinesClient.listDataPipelineRuns({
      id: this.pipelineId,
      pageSize: this.pageSize,
      pageToken: this.nextPageToken
    });
    return new ua(
      this.dataPipelinesClient,
      this.pipelineId,
      e.runs,
      this.pageSize,
      e.nextPageToken
    );
  }
}
const v_ = {
  typeName: "viam.app.mltraining.v1.MLTrainingService",
  methods: {
    /**
     * SubmitTrainingJob submits a training job request.
     *
     * @generated from rpc viam.app.mltraining.v1.MLTrainingService.SubmitTrainingJob
     */
    submitTrainingJob: {
      name: "SubmitTrainingJob",
      I: Hd,
      O: Kd,
      kind: m.Unary
    },
    /**
     * SubmitCustomTrainingJob submits a custom training job request.
     *
     * @generated from rpc viam.app.mltraining.v1.MLTrainingService.SubmitCustomTrainingJob
     */
    submitCustomTrainingJob: {
      name: "SubmitCustomTrainingJob",
      I: Xd,
      O: Qd,
      kind: m.Unary
    },
    /**
     * GetTrainingJob retrieves a training job by its ID.
     *
     * @generated from rpc viam.app.mltraining.v1.MLTrainingService.GetTrainingJob
     */
    getTrainingJob: {
      name: "GetTrainingJob",
      I: Zd,
      O: ep,
      kind: m.Unary
    },
    /**
     * ListTrainingJobs lists training jobs for a given organization ID and training status.
     *
     * @generated from rpc viam.app.mltraining.v1.MLTrainingService.ListTrainingJobs
     */
    listTrainingJobs: {
      name: "ListTrainingJobs",
      I: np,
      O: ap,
      kind: m.Unary
    },
    /**
     * CancelTrainingJob cancels a training job that has not yet completed.
     *
     * @generated from rpc viam.app.mltraining.v1.MLTrainingService.CancelTrainingJob
     */
    cancelTrainingJob: {
      name: "CancelTrainingJob",
      I: tp,
      O: sp,
      kind: m.Unary
    },
    /**
     * DeleteCompletedTrainingJob removes a completed training job from the database, whether the job succeeded or failed.
     *
     * @generated from rpc viam.app.mltraining.v1.MLTrainingService.DeleteCompletedTrainingJob
     */
    deleteCompletedTrainingJob: {
      name: "DeleteCompletedTrainingJob",
      I: op,
      O: ip,
      kind: m.Unary
    },
    /**
     * GetTrainingJobLogs gets the logs for a given custom training job.
     *
     * @generated from rpc viam.app.mltraining.v1.MLTrainingService.GetTrainingJobLogs
     */
    getTrainingJobLogs: {
      name: "GetTrainingJobLogs",
      I: mp,
      O: cp,
      kind: m.Unary
    }
  }
};
class h_ {
  client;
  constructor(e) {
    this.client = C(v_, e);
  }
  /**
   * Submit a training job.
   *
   * @example
   *
   * ```ts
   * await mlTrainingClient.submitTrainingJob(
   *   '<organization-id>',
   *   '<dataset-id>',
   *   '<your-model-name>',
   *   '1.0.0',
   *   ModelType.SINGLE_LABEL_CLASSIFICATION,
   *   ['tag1', 'tag2']
   * );
   * ```
   *
   * For more information, see [ML Training
   * API](https://docs.viam.com/dev/reference/apis/ml-training-client/#submittrainingjob).
   *
   * @param organizationId - The organization ID.
   * @param datasetId - The dataset ID.
   * @param modelName - The model name.
   * @param modelVersion - The model version.
   * @param modelType - The model type.
   * @param tags - The tags.
   */
  async submitTrainingJob(e, n, t, o, i, r) {
    return (await this.client.submitTrainingJob({
      organizationId: e,
      datasetId: n,
      modelName: t,
      modelVersion: o,
      modelType: i,
      tags: r
    })).id;
  }
  /**
   * Submit a training job from a custom training script.
   *
   * @example
   *
   * ```ts
   * await mlTrainingClient.submitCustomTrainingJob(
   *   '<organization-id>',
   *   '<dataset-id>',
   *   'viam:classification-tflite',
   *   '1.0.0',
   *   '<your-model-name>',
   *   '1.0.0'
   * );
   * ```
   *
   * For more information, see [ML Training
   * API](https://docs.viam.com/dev/reference/apis/ml-training-client/#submitcustomtrainingjob).
   *
   * @param organizationId - The organization ID.
   * @param datasetId - The dataset ID.
   * @param registryItemId - The registry item ID.
   * @param registryItemVersion - The registry item version.
   * @param modelName - The model name.
   * @param modelVersion - The model version.
   */
  async submitCustomTrainingJob(e, n, t, o, i, r) {
    return (await this.client.submitCustomTrainingJob({
      organizationId: e,
      datasetId: n,
      registryItemId: t,
      registryItemVersion: o,
      modelName: i,
      modelVersion: r
    })).id;
  }
  /**
   * Get a training job metadata.
   *
   * @example
   *
   * ```ts
   * const job = await mlTrainingClient.getTrainingJob('<training-job-id>');
   * ```
   *
   * For more information, see [ML Training
   * API](https://docs.viam.com/dev/reference/apis/ml-training-client/#gettrainingjob).
   *
   * @param id - The training job ID.
   */
  async getTrainingJob(e) {
    return (await this.client.getTrainingJob({ id: e })).metadata;
  }
  /**
   * List training jobs.
   *
   * @example
   *
   * ```ts
   * const jobs = await mlTrainingClient.listTrainingJobs(
   *   '<organization-id>',
   *   TrainingStatus.RUNNING
   * );
   * ```
   *
   * For more information, see [ML Training
   * API](https://docs.viam.com/dev/reference/apis/ml-training-client/#listtrainingjobs).
   *
   * @param organizationId - The organization ID.
   * @param status - The training job status.
   */
  async listTrainingJobs(e, n) {
    return (await this.client.listTrainingJobs({ organizationId: e, status: n })).jobs;
  }
  /**
   * Cancel a training job.
   *
   * @example
   *
   * ```ts
   * await mlTrainingClient.cancelTrainingJob('<training-job-id>');
   * ```
   *
   * For more information, see [ML Training
   * API](https://docs.viam.com/dev/reference/apis/ml-training-client/#canceltrainingjob).
   *
   * @param id - The training job ID.
   */
  async cancelTrainingJob(e) {
    return await this.client.cancelTrainingJob({ id: e }), null;
  }
  /**
   * Delete a completed training job.
   *
   * @example
   *
   * ```ts
   * await mlTrainingClient.deleteCompletedTrainingJob('<training-job-id>');
   * ```
   *
   * For more information, see [ML Training
   * API](https://docs.viam.com/dev/reference/apis/ml-training-client/#deletecompletedtrainingjob).
   *
   * @param id - The training job ID.
   */
  async deleteCompletedTrainingJob(e) {
    return await this.client.deleteCompletedTrainingJob({ id: e }), null;
  }
}
const vv = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.ExitProvisioningRequest",
  []
), hv = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.ExitProvisioningResponse",
  []
), fv = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.GetSmartMachineStatusRequest",
  []
), Rv = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.GetSmartMachineStatusResponse",
  () => [
    { no: 1, name: "provisioning_info", kind: "message", T: wv },
    {
      no: 2,
      name: "has_smart_machine_credentials",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 3,
      name: "is_online",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    { no: 4, name: "latest_connection_attempt", kind: "message", T: Yo },
    { no: 5, name: "errors", kind: "scalar", T: 9, repeated: !0 },
    {
      no: 6,
      name: "agent_version",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), _v = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.SetNetworkCredentialsRequest",
  () => [
    {
      no: 1,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "ssid",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "psk",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Sv = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.SetNetworkCredentialsResponse",
  []
), Iv = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.SetSmartMachineCredentialsRequest",
  () => [
    { no: 1, name: "cloud", kind: "message", T: Ov }
  ]
), bv = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.SetSmartMachineCredentialsResponse",
  []
), Mv = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.GetNetworkListRequest",
  []
), Ev = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.GetNetworkListResponse",
  () => [
    { no: 1, name: "networks", kind: "message", T: Yo, repeated: !0 }
  ]
), wv = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.ProvisioningInfo",
  () => [
    {
      no: 1,
      name: "fragment_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "model",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "manufacturer",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Yo = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.NetworkInfo",
  () => [
    {
      no: 1,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "ssid",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "security",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "signal",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 5,
      name: "connected",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    },
    {
      no: 6,
      name: "last_error",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Ov = /* @__PURE__ */ s.makeMessageType(
  "viam.provisioning.v1.CloudConfig",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "secret",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "app_address",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), K_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CloudConfig: Ov,
  ExitProvisioningRequest: vv,
  ExitProvisioningResponse: hv,
  GetNetworkListRequest: Mv,
  GetNetworkListResponse: Ev,
  GetSmartMachineStatusRequest: fv,
  GetSmartMachineStatusResponse: Rv,
  NetworkInfo: Yo,
  ProvisioningInfo: wv,
  SetNetworkCredentialsRequest: _v,
  SetNetworkCredentialsResponse: Sv,
  SetSmartMachineCredentialsRequest: Iv,
  SetSmartMachineCredentialsResponse: bv
}, Symbol.toStringTag, { value: "Module" })), f_ = {
  typeName: "viam.provisioning.v1.ProvisioningService",
  methods: {
    /**
     * GetSmartMachineStatus is for retrieving the status of the smart machine including networking.
     *
     * @generated from rpc viam.provisioning.v1.ProvisioningService.GetSmartMachineStatus
     */
    getSmartMachineStatus: {
      name: "GetSmartMachineStatus",
      I: fv,
      O: Rv,
      kind: m.Unary
    },
    /**
     * SetNetworkCredentials is to set the wifi credentials.
     *
     * @generated from rpc viam.provisioning.v1.ProvisioningService.SetNetworkCredentials
     */
    setNetworkCredentials: {
      name: "SetNetworkCredentials",
      I: _v,
      O: Sv,
      kind: m.Unary
    },
    /**
     * SetSmartMachineCredentials is to set the smart machine credentials.
     *
     * @generated from rpc viam.provisioning.v1.ProvisioningService.SetSmartMachineCredentials
     */
    setSmartMachineCredentials: {
      name: "SetSmartMachineCredentials",
      I: Iv,
      O: bv,
      kind: m.Unary
    },
    /**
     * GetNetworkList is to retrieve the list of networks that are visible to the smart machine.
     *
     * @generated from rpc viam.provisioning.v1.ProvisioningService.GetNetworkList
     */
    getNetworkList: {
      name: "GetNetworkList",
      I: Mv,
      O: Ev,
      kind: m.Unary
    },
    /**
     * ExitProvisioning is called when "done" with all other calls.
     * It causes the device to exit provisioning mode to try any newly added wifi networks and resume normal operation.
     *
     * @generated from rpc viam.provisioning.v1.ProvisioningService.ExitProvisioning
     */
    exitProvisioning: {
      name: "ExitProvisioning",
      I: vv,
      O: hv,
      kind: m.Unary
    }
  }
};
class R_ {
  client;
  constructor(e) {
    this.client = C(f_, e);
  }
  /**
   * Get the status of the Smart Machine.
   *
   * @returns The Smart Machine status
   */
  async getSmartMachineStatus() {
    return this.client.getSmartMachineStatus({});
  }
  /**
   * Set the network credentials of the Smart Machine, so it can connect to the
   * internet.
   *
   * @param type - The type of network
   * @param ssid - The SSID of the network
   * @param psk - The network's passkey
   */
  async setNetworkCredentials(e, n, t) {
    await this.client.setNetworkCredentials({
      type: e,
      ssid: n,
      psk: t
    });
  }
  /**
   * Set the Viam credentials of the smart machine credentials, so it connect to
   * the Cloud.
   *
   * @param cloud - The configuration of the Cloud
   */
  async setSmartMachineCredentials(e) {
    await this.client.setSmartMachineCredentials({ cloud: e });
  }
  /**
   * Get the networks that are visible to the Smart Machine.
   *
   * @returns A list of networks
   */
  async getNetworkList() {
    return (await this.client.getNetworkList({})).networks;
  }
}
const X_ = async ({
  serviceHost: a = "https://app.viam.com",
  credentials: e
}) => {
  const n = await RR(a, e);
  return new __(n, e);
};
class __ {
  transport;
  credentials;
  dataClient;
  appClient;
  mlTrainingClient;
  provisioningClient;
  billingClient;
  constructor(e, n) {
    this.transport = e, this.credentials = n, this.dataClient = new y_(this.transport), this.appClient = new M1(this.transport), this.mlTrainingClient = new h_(this.transport), this.provisioningClient = new R_(this.transport), this.billingClient = new w1(this.transport);
  }
  async connectToMachine({
    host: e = void 0,
    id: n = void 0
  }) {
    if (e === void 0 && n === void 0)
      throw new Error("Either a machine address or ID must be provided");
    let t = e, o;
    if (n !== void 0 && e === void 0) {
      const c = (await this.appClient.getRobotParts(n)).find((d) => d.mainPart);
      if (!c)
        throw new Error(
          `Could not find a main part for the machine with UUID: ${n}`
        );
      t = c.fqdn, o = c.locationId;
    }
    if (t === void 0 || t === "")
      throw new Error(
        "Host was not provided and could not be obtained from the machine ID"
      );
    let i = this.credentials;
    if (!Dn(i)) {
      if (o === void 0) {
        const c = t.split(".viam.")[0]?.split(".");
        c !== void 0 && (o = c.at(-1));
      }
      o !== void 0 && (i = {
        type: "robot-location-secret",
        payload: (await this.appClient.getLocation(o))?.auth?.secrets.find(
          // eslint-disable-next-line camelcase
          (d) => d.state === Oo.ENABLED
        )?.secret,
        authEntity: t
      });
    }
    return S1({
      host: t,
      credentials: i,
      signalingAddress: "https://app.viam.com:443",
      reconnectMaxAttempts: 1
    });
  }
}
const { JointPositions: Q_ } = SR;
class Z_ {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(xr), this.name = n, this.options = t;
  }
  async getEndPosition(e = {}, n = this.callOptions) {
    const t = new ht({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const i = (await this.client.getEndPosition(t, n)).pose;
    if (!i)
      throw new Error("no pose");
    return i;
  }
  async getGeometries(e = {}, n = this.callOptions) {
    const t = new J({
      name: this.name,
      extra: l.fromJson(e)
    });
    return (await this.client.getGeometries(t, n)).geometries;
  }
  async moveToPosition(e, n = {}, t = this.callOptions) {
    const o = new Rt({
      name: this.name,
      to: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o), await this.client.moveToPosition(o, t);
  }
  async moveToJointPositions(e, n = {}, t = this.callOptions) {
    const o = new dn({
      values: e
    }), i = new _t({
      name: this.name,
      positions: o,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(i), await this.client.moveToJointPositions(i, t);
  }
  async getJointPositions(e = {}, n = this.callOptions) {
    const t = new ft({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const i = (await this.client.getJointPositions(t, n)).positions;
    if (!i)
      throw new Error("no pose");
    return i;
  }
  async stop(e = {}, n = this.callOptions) {
    const t = new St({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t), await this.client.stop(t, n);
  }
  async isMoving(e = this.callOptions) {
    const n = new It({
      name: this.name
    });
    return this.options.requestLogger?.(n), (await this.client.isMoving(n, e)).isMoving;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const { GetPropertiesResponse: eS } = IR;
class nS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(jr), this.name = n, this.options = t;
  }
  async getGeometries(e = {}, n = this.callOptions) {
    const t = new J({
      name: this.name,
      extra: l.fromJson(e)
    });
    return (await this.client.getGeometries(t, n)).geometries;
  }
  async moveStraight(e, n, t = {}, o = this.callOptions) {
    const i = new bt({
      name: this.name,
      mmPerSec: n,
      distanceMm: e ? BigInt(e) : void 0,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.moveStraight(i, o);
  }
  async spin(e, n, t = {}, o = this.callOptions) {
    const i = new Mt({
      name: this.name,
      angleDeg: e,
      degsPerSec: n,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.spin(i, o);
  }
  async setPower(e, n, t = {}, o = this.callOptions) {
    const i = new wt({
      name: this.name,
      linear: e,
      angular: n,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.setPower(i, o);
  }
  async setVelocity(e, n, t = {}, o = this.callOptions) {
    const i = new Ot({
      name: this.name,
      linear: e,
      angular: n,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.setVelocity(i, o);
  }
  async stop(e = {}, n = this.callOptions) {
    const t = new Et({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t), await this.client.stop(t, n);
  }
  async isMoving(e = this.callOptions) {
    const n = new Ct({
      name: this.name
    });
    return this.options.requestLogger?.(n), (await this.client.isMoving(n, e)).isMoving;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
  async getProperties(e = {}, n = this.callOptions) {
    const t = new fa({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), this.client.getProperties(t, n);
  }
}
const { ReadAnalogReaderResponse: aS, PowerMode: tS } = MR;
class sS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(rm), this.name = n, this.options = t;
  }
  async setGPIO(e, n, t = {}, o = this.callOptions) {
    const i = new Nt({
      name: this.name,
      pin: e,
      high: n,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.setGPIO(i, o);
  }
  async getGPIO(e, n = {}, t = this.callOptions) {
    const o = new Pt({
      name: this.name,
      pin: e,
      extra: l.fromJson(n)
    });
    return this.options.requestLogger?.(o), (await this.client.getGPIO(o, t)).high;
  }
  async getPWM(e, n = {}, t = this.callOptions) {
    const o = new Dt({
      name: this.name,
      pin: e,
      extra: l.fromJson(n)
    });
    return this.options.requestLogger?.(o), (await this.client.pWM(o, t)).dutyCyclePct;
  }
  async setPWM(e, n, t = {}, o = this.callOptions) {
    const i = new At({
      name: this.name,
      pin: e,
      dutyCyclePct: n,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.setPWM(i, o);
  }
  async getPWMFrequency(e, n = {}, t = this.callOptions) {
    const o = new qt({
      name: this.name,
      pin: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o);
    const i = await this.client.pWMFrequency(o, t);
    return Number(i.frequencyHz);
  }
  async setPWMFrequency(e, n, t = {}, o = this.callOptions) {
    const i = new Ut({
      name: this.name,
      pin: e,
      frequencyHz: n ? BigInt(n) : void 0,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.setPWMFrequency(i, o);
  }
  async readAnalogReader(e, n = {}, t = this.callOptions) {
    const o = new Lt({
      boardName: this.name,
      analogReaderName: e,
      extra: l.fromJson(n)
    });
    return this.options.requestLogger?.(o), this.client.readAnalogReader(o, t);
  }
  async writeAnalog(e, n, t = {}, o = this.callOptions) {
    const i = new Gt({
      name: this.name,
      pin: e,
      value: n,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.writeAnalog(i, o);
  }
  async getDigitalInterruptValue(e, n = {}, t = this.callOptions) {
    const o = new Bt({
      boardName: this.name,
      digitalInterruptName: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o);
    const i = await this.client.getDigitalInterruptValue(
      o,
      t
    );
    return Number(i.value);
  }
  async streamTicks(e, n, t = {}, o = this.callOptions) {
    const i = new xt({
      name: this.name,
      pinNames: e,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i);
    const r = this.client.streamTicks(i, o);
    for await (const c of r)
      n.push({
        pinName: c.pinName,
        high: c.high,
        time: c.time ? Number(c.time) : 0
      });
  }
  async setPowerMode(e, n, t = {}, o = this.callOptions) {
    const i = new Ft({
      name: this.name,
      powerMode: e,
      duration: n,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.setPowerMode(i, o);
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const $o = /* @__PURE__ */ s.makeMessageType(
  "viam.component.button.v1.PushRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Cv = /* @__PURE__ */ s.makeMessageType(
  "viam.component.button.v1.PushResponse",
  []
), oS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PushRequest: $o,
  PushResponse: Cv
}, Symbol.toStringTag, { value: "Module" })), S_ = {
  typeName: "viam.component.button.v1.ButtonService",
  methods: {
    /**
     * Pushes a button
     *
     * @generated from rpc viam.component.button.v1.ButtonService.Push
     */
    push: {
      name: "Push",
      I: $o,
      O: Cv,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.button.v1.ButtonService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    }
  }
};
class iS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(S_), this.name = n, this.options = t;
  }
  async push(e = {}, n = this.callOptions) {
    const t = new $o({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t), await this.client.push(t, n);
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const I_ = /* @__PURE__ */ s.makeMessageType(
  "google.api.HttpBody",
  () => [
    {
      no: 1,
      name: "content_type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "data",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    },
    { no: 3, name: "extensions", kind: "message", T: j, repeated: !0 }
  ]
), b_ = {
  typeName: "viam.component.camera.v1.CameraService",
  methods: {
    /**
     * GetImage returns a frame from a camera of the underlying robot. A specific MIME type
     * can be requested but may not necessarily be the same one returned.
     *
     * @generated from rpc viam.component.camera.v1.CameraService.GetImage
     */
    getImage: {
      name: "GetImage",
      I: uo,
      O: Ed,
      kind: m.Unary
    },
    /**
     * @generated from rpc viam.component.camera.v1.CameraService.GetImages
     */
    getImages: {
      name: "GetImages",
      I: wd,
      O: Od,
      kind: m.Unary
    },
    /**
     * RenderFrame renders a frame from a camera of the underlying robot to an HTTP response. A specific MIME type
     * can be requested but may not necessarily be the same one returned.
     *
     * @generated from rpc viam.component.camera.v1.CameraService.RenderFrame
     */
    renderFrame: {
      name: "RenderFrame",
      I: To,
      O: I_,
      kind: m.Unary
    },
    /**
     * GetPointCloud returns a point cloud from a camera of the underlying robot. A specific MIME type
     * can be requested but may not necessarily be the same one returned.
     *
     * @generated from rpc viam.component.camera.v1.CameraService.GetPointCloud
     */
    getPointCloud: {
      name: "GetPointCloud",
      I: ko,
      O: Cd,
      kind: m.Unary
    },
    /**
     * GetProperties returns the camera intrinsic parameters and camera distortion parameters from a camera of the underlying robot, if available.
     *
     * @generated from rpc viam.component.camera.v1.CameraService.GetProperties
     */
    getProperties: {
      name: "GetProperties",
      I: Nd,
      O: Pd,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.camera.v1.CameraService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.camera.v1.CameraService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    }
  }
}, M_ = "pointcloud/pcd";
class rS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(b_), this.name = n, this.options = t;
  }
  async getGeometries(e = {}, n = this.callOptions) {
    const t = new J({
      name: this.name,
      extra: l.fromJson(e)
    });
    return (await this.client.getGeometries(t, n)).geometries;
  }
  async getImage(e = "", n = {}, t = this.callOptions) {
    const o = new uo({
      name: this.name,
      mimeType: e,
      extra: l.fromJson(n)
    });
    return this.options.requestLogger?.(o), (await this.client.getImage(o, t)).image;
  }
  async renderFrame(e = "", n = {}, t = this.callOptions) {
    const o = new To({
      name: this.name,
      mimeType: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o);
    const i = await this.client.renderFrame(o, t);
    return new Blob([i.data], { type: e });
  }
  async getPointCloud(e = {}, n = this.callOptions) {
    const t = new ko({
      name: this.name,
      mimeType: M_,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getPointCloud(t, n)).pointCloud;
  }
  async getProperties(e = this.callOptions) {
    const n = new fa({
      name: this.name
    });
    return this.options.requestLogger?.(n), this.client.getProperties(n, e);
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
class mS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(Bl), this.name = n, this.options = t;
  }
  async discoverResources(e = {}, n = this.callOptions) {
    const t = new zs({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.discoverResources(t, n)).discoveries;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const {
  GetPropertiesResponse: cS,
  PositionType: E_
} = ER;
class lS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(dm), this.name = n, this.options = t;
  }
  async resetPosition(e = {}, n = this.callOptions) {
    const t = new Yt({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t), await this.client.resetPosition(t, n);
  }
  async getProperties(e = {}, n = this.callOptions) {
    const t = new $t({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), this.client.getProperties(t, n);
  }
  async getPosition(e = E_.UNSPECIFIED, n = {}, t = this.callOptions) {
    const o = new zt({
      name: this.name,
      positionType: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o);
    const i = await this.client.getPosition(o, t);
    return [i.value, i.positionType];
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
class dS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(vm), this.name = n, this.options = t;
  }
  async getGeometries(e = {}, n = this.callOptions) {
    const t = new J({
      name: this.name,
      extra: l.fromJson(e)
    });
    return (await this.client.getGeometries(t, n)).geometries;
  }
  async getPosition(e = {}, n = this.callOptions) {
    const t = new Vt({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getPosition(t, n)).positionsMm;
  }
  async moveToPosition(e, n, t = {}, o = this.callOptions) {
    const i = new Wt({
      name: this.name,
      positionsMm: e,
      speedsMmPerSec: n,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.moveToPosition(i, o);
  }
  async home(e = {}, n = this.callOptions) {
    const t = new jt({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.home(t, n)).homed;
  }
  async getLengths(e = {}, n = this.callOptions) {
    const t = new Ht({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getLengths(t, n)).lengthsMm;
  }
  async stop(e = {}, n = this.callOptions) {
    const t = new Kt({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t), await this.client.stop(t, n);
  }
  async isMoving(e = this.callOptions) {
    const n = new Xt({
      name: this.name
    });
    return this.options.requestLogger?.(n), (await this.client.isMoving(n, e)).isMoving;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const {
  Capsule: pS,
  GeoGeometry: uS,
  GeoPoint: gS,
  GeometriesInFrame: TS,
  Geometry: kS,
  Orientation: yS,
  Pose: vS,
  PoseInFrame: hS,
  RectangularPrism: fS,
  ResourceName: RS,
  Sphere: _S,
  Transform: SS,
  Vector3: IS,
  WorldState: bS
} = Or, w_ = (a) => {
  const { latitude: e, longitude: n } = a;
  return !(typeof e != "number" || typeof n != "number" || Number.isNaN(e) || Number.isNaN(n));
};
class MS {
  client;
  options;
  name;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(jd), this.name = n, this.options = t;
  }
  async metadata(e = {}, n = this.callOptions) {
    const t = new Vd({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), this.client.metadata(t, n);
  }
  async infer(e, n = {}, t = this.callOptions) {
    const o = new $d({
      name: this.name,
      inputTensors: e,
      extra: l.fromJson(n)
    });
    return this.options.requestLogger?.(o), this.client.infer(o, t);
  }
}
class ES {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(Ym), this.name = n, this.options = t;
  }
  async setPower(e, n = {}, t = this.callOptions) {
    const o = new os({
      name: this.name,
      powerPct: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o), await this.client.setPower(o, t);
  }
  async goFor(e, n, t = {}, o = this.callOptions) {
    const i = new is({
      name: this.name,
      rpm: e,
      revolutions: n,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.goFor(i, o);
  }
  async goTo(e, n, t = {}, o = this.callOptions) {
    const i = new rs({
      name: this.name,
      rpm: e,
      positionRevolutions: n,
      extra: l.fromJson(t)
    });
    this.options.requestLogger?.(i), await this.client.goTo(i, o);
  }
  async setRPM(e, n = {}, t = this.callOptions) {
    const o = new ms({
      name: this.name,
      rpm: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o), await this.client.setRPM(o, t);
  }
  async resetZeroPosition(e, n = {}, t = this.callOptions) {
    const o = new cs({
      name: this.name,
      offset: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o), await this.client.resetZeroPosition(o, t);
  }
  async stop(e = {}, n = this.callOptions) {
    const t = new ds({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t), await this.client.stop(t, n);
  }
  async getProperties(e = {}, n = this.callOptions) {
    const t = new us({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), {
      positionReporting: (await this.client.getProperties(t, n)).positionReporting
    };
  }
  async getPosition(e = {}, n = this.callOptions) {
    const t = new ls({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getPosition(t, n)).position;
  }
  async isPowered(e = {}, n = this.callOptions) {
    const t = new ps({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const o = await this.client.isPowered(t, n);
    return [o.isOn, o.powerPct];
  }
  async isMoving(e = this.callOptions) {
    const n = new gs({
      name: this.name
    });
    return this.options.requestLogger?.(n), (await this.client.isMoving(n, e)).isMoving;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
class wS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(Zm), this.name = n, this.options = t;
  }
  async getLinearVelocity(e = {}, n = this.callOptions) {
    const t = new Ts({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const i = (await this.client.getLinearVelocity(t, n)).linearVelocity;
    if (!i)
      throw new Error("no linear velocity");
    return i;
  }
  async getAngularVelocity(e = {}, n = this.callOptions) {
    const t = new ks({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const i = (await this.client.getAngularVelocity(t, n)).angularVelocity;
    if (!i)
      throw new Error("no angular velocity");
    return i;
  }
  async getCompassHeading(e = {}, n = this.callOptions) {
    const t = new ys({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getCompassHeading(t, n)).value;
  }
  async getOrientation(e = {}, n = this.callOptions) {
    const t = new vs({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const i = (await this.client.getOrientation(t, n)).orientation;
    if (!i)
      throw new Error("no orientation");
    return i;
  }
  async getPosition(e = {}, n = this.callOptions) {
    const t = new hs({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), this.client.getPosition(t, n);
  }
  async getProperties(e = {}, n = this.callOptions) {
    const t = new fs({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), this.client.getProperties(t, n);
  }
  async getAccuracy(e = {}, n = this.callOptions) {
    const t = new Rs({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), this.client.getAccuracy(t, n);
  }
  async getLinearAcceleration(e = {}, n = this.callOptions) {
    const t = new _s({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const i = (await this.client.getLinearAcceleration(
      t,
      n
    )).linearAcceleration;
    if (!i)
      throw new Error("no linear acceleration");
    return i;
  }
  async getReadings(e = {}, n = this.callOptions) {
    const t = new Ze({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const o = await this.client.getReadings(t, n), i = {};
    for (const r of Object.keys(o.readings)) {
      const c = o.readings[r];
      c && (i[r] = c.toJson());
    }
    return i;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const {
  GetAccuracyResponse: OS,
  GetPositionResponse: CS,
  GetPropertiesResponse: NS
} = PR;
class PS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(tc), this.name = n, this.options = t;
  }
  async getVoltage(e = {}, n = this.callOptions) {
    const t = new Ss({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const o = await this.client.getVoltage(t, n);
    return [o.volts, o.isAc];
  }
  async getCurrent(e = {}, n = this.callOptions) {
    const t = new Is({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const o = await this.client.getCurrent(t, n);
    return [o.amperes, o.isAc];
  }
  async getPower(e = {}, n = this.callOptions) {
    const t = new bs({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getPower(t, n)).watts;
  }
  async getReadings(e = {}, n = this.callOptions) {
    const t = new Ze({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const o = await this.client.getReadings(t, n), i = {};
    for (const r of Object.keys(o.readings)) {
      const c = o.readings[r];
      c && (i[r] = c.toJson());
    }
    return i;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const Nv = {
  typeName: "viam.component.sensor.v1.SensorService",
  methods: {
    /**
     * GetReadings returns the readings of a sensor of the underlying robot.
     *
     * @generated from rpc viam.component.sensor.v1.SensorService.GetReadings
     */
    getReadings: {
      name: "GetReadings",
      I: Ze,
      O: ha,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.sensor.v1.SensorService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    },
    /**
     * GetGeometries returns the geometries of the component in their current configuration
     *
     * @generated from rpc viam.component.sensor.v1.SensorService.GetGeometries
     */
    getGeometries: {
      name: "GetGeometries",
      I: J,
      O: K,
      kind: m.Unary
    }
  }
}, DS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SensorService: Nv
}, Symbol.toStringTag, { value: "Module" }));
class AS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(Nv), this.name = n, this.options = t;
  }
  async getReadings(e = {}, n = this.callOptions) {
    const t = new Ze({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const o = await this.client.getReadings(t, n), i = {};
    for (const r of Object.keys(o.readings)) {
      const c = o.readings[r];
      c && (i[r] = c.toJson());
    }
    return i;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const Pv = /* @__PURE__ */ s.makeMessageType(
  "proto.stream.v1.ListStreamsRequest",
  []
), Dv = /* @__PURE__ */ s.makeMessageType(
  "proto.stream.v1.ListStreamsResponse",
  () => [
    { no: 1, name: "names", kind: "scalar", T: 9, repeated: !0 }
  ]
), Vo = /* @__PURE__ */ s.makeMessageType(
  "proto.stream.v1.AddStreamRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Av = /* @__PURE__ */ s.makeMessageType(
  "proto.stream.v1.AddStreamResponse",
  []
), Wo = /* @__PURE__ */ s.makeMessageType(
  "proto.stream.v1.RemoveStreamRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), qv = /* @__PURE__ */ s.makeMessageType(
  "proto.stream.v1.RemoveStreamResponse",
  []
), jo = /* @__PURE__ */ s.makeMessageType(
  "proto.stream.v1.Resolution",
  () => [
    {
      no: 1,
      name: "width",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 2,
      name: "height",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    }
  ]
), Ho = /* @__PURE__ */ s.makeMessageType(
  "proto.stream.v1.GetStreamOptionsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
), Uv = /* @__PURE__ */ s.makeMessageType(
  "proto.stream.v1.GetStreamOptionsResponse",
  () => [
    { no: 1, name: "resolutions", kind: "message", T: jo, repeated: !0 }
  ]
), ga = /* @__PURE__ */ s.makeMessageType(
  "proto.stream.v1.SetStreamOptionsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "resolution", kind: "message", T: jo }
  ]
), Lv = /* @__PURE__ */ s.makeMessageType(
  "proto.stream.v1.SetStreamOptionsResponse",
  []
), qS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AddStreamRequest: Vo,
  AddStreamResponse: Av,
  GetStreamOptionsRequest: Ho,
  GetStreamOptionsResponse: Uv,
  ListStreamsRequest: Pv,
  ListStreamsResponse: Dv,
  RemoveStreamRequest: Wo,
  RemoveStreamResponse: qv,
  Resolution: jo,
  SetStreamOptionsRequest: ga,
  SetStreamOptionsResponse: Lv
}, Symbol.toStringTag, { value: "Module" })), O_ = {
  typeName: "proto.stream.v1.StreamService",
  methods: {
    /**
     * ListStreams returns all streams registered.
     *
     * @generated from rpc proto.stream.v1.StreamService.ListStreams
     */
    listStreams: {
      name: "ListStreams",
      I: Pv,
      O: Dv,
      kind: m.Unary
    },
    /**
     * AddStream requests a particular stream be added.
     *
     * @generated from rpc proto.stream.v1.StreamService.AddStream
     */
    addStream: {
      name: "AddStream",
      I: Vo,
      O: Av,
      kind: m.Unary
    },
    /**
     * GetStreamOptions returns the options for a particular stream.
     *
     * @generated from rpc proto.stream.v1.StreamService.GetStreamOptions
     */
    getStreamOptions: {
      name: "GetStreamOptions",
      I: Ho,
      O: Uv,
      kind: m.Unary
    },
    /**
     * SetStreamOptions sets the options for a particular stream.
     *
     * @generated from rpc proto.stream.v1.StreamService.SetStreamOptions
     */
    setStreamOptions: {
      name: "SetStreamOptions",
      I: ga,
      O: Lv,
      kind: m.Unary
    },
    /**
     * RemoveStream requests a particular stream be removed. If the calling client
     * is the last to be receiving the stream, it will attempt to be stopped to
     * conserve resources.
     *
     * @generated from rpc proto.stream.v1.StreamService.RemoveStream
     */
    removeStream: {
      name: "RemoveStream",
      I: Wo,
      O: qv,
      kind: m.Unary
    }
  }
}, kn = (a) => a.replaceAll(":", "+");
class US extends Cr {
  client;
  options;
  streams;
  constructor(e, n = {}) {
    super(), this.client = e.createServiceClient(O_), this.options = n, this.streams = /* @__PURE__ */ new Set(), e.on("track", (t) => {
      this.emit("track", t);
    }), e.on(ae.CONNECTED, () => {
      for (const t of this.streams.values())
        this.add(t);
    });
  }
  async add(e) {
    const n = new Vo({
      name: kn(e)
    });
    this.options.requestLogger?.(n);
    try {
      await this.client.addStream(n), this.streams.add(e);
    } catch {
      n.name = e, this.options.requestLogger?.(n), await this.client.addStream(n), this.streams.add(e);
    }
  }
  async remove(e) {
    const n = new Wo({
      name: kn(e)
    });
    this.options.requestLogger?.(n);
    try {
      await this.client.removeStream(n), this.streams.delete(e);
    } catch {
      n.name = e, this.options.requestLogger?.(n), await this.client.removeStream(n), this.streams.delete(e);
    }
  }
  /**
   * Get the available livestream resolutions for a camera component. If the
   * stream client cannot find any available resolutions, an empty list will be
   * returned.
   *
   * @param resourceName - The name of a camera component.
   * @returns A list of available resolutions for livestreaming.
   */
  async getOptions(e) {
    const n = async (i) => {
      const r = new Ho({ name: i });
      this.options.requestLogger?.(r);
      try {
        return (await this.client.getStreamOptions(r)).resolutions;
      } catch {
        return [];
      }
    }, t = kn(e);
    let o = await n(t);
    return o.length > 0 || (o = await n(e)), o;
  }
  /**
   * Set the livestream options for a camera component. This will change the
   * resolution of the stream to the specified width and height.
   *
   * @param name - The name of a camera component.
   * @param width - The width of the resolution.
   * @param height - The height of the resolution.
   */
  async setOptions(e, n, t) {
    const o = new ga({
      name: kn(e),
      resolution: {
        width: n,
        height: t
      }
    });
    this.options.requestLogger?.(o);
    try {
      await this.client.setStreamOptions(o);
    } catch {
      o.name = e, this.options.requestLogger?.(o), await this.client.setStreamOptions(o);
    }
  }
  /**
   * Reset the livestream options for a camera component. This will reset the
   * resolution to the default component attributes.
   *
   * @param name - The name of a camera component.
   */
  async resetOptions(e) {
    const n = new ga({
      name: kn(e)
    });
    this.options.requestLogger?.(n);
    try {
      await this.client.setStreamOptions(n);
    } catch {
      n.name = e, this.options.requestLogger?.(n), await this.client.setStreamOptions(n);
    }
  }
  STREAM_TIMEOUT = 5e3;
  /**
   * Get a stream by name from a StreamClient. Will time out if stream is not
   * received within 5 seconds.
   *
   * @param name - The name of a camera component.
   */
  getStream = async (e) => {
    const n = new Promise((t, o) => {
      const i = (r) => {
        const [c] = r.streams;
        c ? c.id === e && (this.off("track", i), t(c)) : (this.off("track", i), o(new Error("Received track event with no streams")));
      };
      this.on("track", i), setTimeout(() => {
        this.off("track", i), o(
          new Error(`Did not receive a stream after ${this.STREAM_TIMEOUT} ms`)
        );
      }, this.STREAM_TIMEOUT);
    });
    return await this.add(e), n;
  };
}
const Ko = /* @__PURE__ */ s.makeMessageType(
  "viam.component.switch.v1.SetPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "position",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Gv = /* @__PURE__ */ s.makeMessageType(
  "viam.component.switch.v1.SetPositionResponse",
  []
), Xo = /* @__PURE__ */ s.makeMessageType(
  "viam.component.switch.v1.GetPositionRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Bv = /* @__PURE__ */ s.makeMessageType(
  "viam.component.switch.v1.GetPositionResponse",
  () => [
    {
      no: 1,
      name: "position",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    }
  ]
), Qo = /* @__PURE__ */ s.makeMessageType(
  "viam.component.switch.v1.GetNumberOfPositionsRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), xv = /* @__PURE__ */ s.makeMessageType(
  "viam.component.switch.v1.GetNumberOfPositionsResponse",
  () => [
    {
      no: 1,
      name: "number_of_positions",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    { no: 2, name: "labels", kind: "scalar", T: 9, repeated: !0 }
  ]
), LS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetNumberOfPositionsRequest: Qo,
  GetNumberOfPositionsResponse: xv,
  GetPositionRequest: Xo,
  GetPositionResponse: Bv,
  SetPositionRequest: Ko,
  SetPositionResponse: Gv
}, Symbol.toStringTag, { value: "Module" })), C_ = {
  typeName: "viam.component.switch.v1.SwitchService",
  methods: {
    /**
     * Set the position of the switch
     *
     * @generated from rpc viam.component.switch.v1.SwitchService.SetPosition
     */
    setPosition: {
      name: "SetPosition",
      I: Ko,
      O: Gv,
      kind: m.Unary
    },
    /**
     * Get the position of the switch
     *
     * @generated from rpc viam.component.switch.v1.SwitchService.GetPosition
     */
    getPosition: {
      name: "GetPosition",
      I: Xo,
      O: Bv,
      kind: m.Unary
    },
    /**
     * Get the number of positions that the switch supports
     *
     * @generated from rpc viam.component.switch.v1.SwitchService.GetNumberOfPositions
     */
    getNumberOfPositions: {
      name: "GetNumberOfPositions",
      I: Qo,
      O: xv,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.component.switch.v1.SwitchService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    }
  }
};
class GS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(C_), this.name = n, this.options = t;
  }
  async setPosition(e, n = {}, t = this.callOptions) {
    const o = new Ko({
      name: this.name,
      position: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o), await this.client.setPosition(o, t);
  }
  async getPosition(e = {}, n = this.callOptions) {
    const t = new Xo({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getPosition(t, n)).position;
  }
  async getNumberOfPositions(e = {}, n = this.callOptions) {
    const t = new Qo({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const o = await this.client.getNumberOfPositions(t, n);
    if (o.labels.length > 0 && o.labels.length !== o.numberOfPositions)
      throw new Error(
        "the number of labels does not match the number of positions"
      );
    return [o.numberOfPositions, o.labels];
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
let BS = class {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(Qt), this.name = n, this.options = t;
  }
  async getGeometries(e = {}, n = this.callOptions) {
    const t = new J({
      name: this.name,
      extra: l.fromJson(e)
    });
    return (await this.client.getGeometries(t, n)).geometries;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
};
class FS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(bm), this.name = n, this.options = t;
  }
  async getGeometries(e = {}, n = this.callOptions) {
    const t = new J({
      name: this.name,
      extra: l.fromJson(e)
    });
    return (await this.client.getGeometries(t, n)).geometries;
  }
  async open(e = {}, n = this.callOptions) {
    const t = new Zt({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t), await this.client.open(t, n);
  }
  async grab(e = {}, n = this.callOptions) {
    const t = new es({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t), await this.client.grab(t, n);
  }
  async stop(e = {}, n = this.callOptions) {
    const t = new ns({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t), await this.client.stop(t, n);
  }
  async isMoving(e = this.callOptions) {
    const n = new as({
      name: this.name
    });
    return this.options.requestLogger?.(n), (await this.client.isMoving(n, e)).isMoving;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
class JS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(Dm), this.name = n, this.options = t;
  }
  async getEvents(e = {}, n = this.callOptions) {
    const t = new ts({
      controller: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getEvents(t, n)).events;
  }
  async triggerEvent(e, n = {}, t = this.callOptions) {
    const o = new ss({
      controller: this.name,
      event: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o), await this.client.triggerEvent(o, t);
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const { Event: zS } = CR, {
  CollisionSpecification: YS,
  Constraints: $S,
  GetPlanResponse: VS,
  LinearConstraint: WS,
  ListPlanStatusesResponse: jS,
  MotionConfiguration: HS,
  ObstacleDetector: KS,
  OrientationConstraint: XS,
  PlanState: QS
} = JR;
class ZS {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(sd), this.name = n, this.options = t;
  }
  async move(e, n, t, o, i = {}, r = this.callOptions) {
    const c = new Ys({
      name: this.name,
      destination: e,
      componentName: n,
      worldState: t,
      constraints: o,
      extra: l.fromJson(i)
    });
    return this.options.requestLogger?.(c), (await this.client.move(c, r)).success;
  }
  async moveOnMap(e, n, t, o, i, r = {}, c = this.callOptions) {
    const d = new $s({
      name: this.name,
      destination: e,
      componentName: n,
      slamServiceName: t,
      motionConfiguration: o,
      obstacles: i,
      extra: l.fromJson(r)
    });
    return this.options.requestLogger?.(d), (await this.client.moveOnMap(d, c)).executionId;
  }
  async moveOnGlobe(e, n, t, o, i, r, c, d = {}, p = this.callOptions) {
    const T = new Ws({
      name: this.name,
      destination: e,
      componentName: n,
      movementSensorName: t,
      heading: o,
      obstacles: i,
      boundingRegions: c,
      motionConfiguration: r,
      extra: l.fromJson(d)
    });
    return this.options.requestLogger?.(T), (await this.client.moveOnGlobe(T, p)).executionId;
  }
  async stopPlan(e, n = {}, t = this.callOptions) {
    const o = new Hs({
      name: this.name,
      componentName: e,
      extra: l.fromJson(n)
    });
    return this.options.requestLogger?.(o), await this.client.stopPlan(o, t), null;
  }
  async getPlan(e, n, t, o = {}, i = this.callOptions) {
    const r = new Xs({
      name: this.name,
      componentName: e,
      lastPlanOnly: n,
      executionId: t,
      extra: l.fromJson(o)
    });
    return this.options.requestLogger?.(r), this.client.getPlan(r, i);
  }
  async listPlanStatuses(e, n = {}, t = this.callOptions) {
    const o = new Ks({
      name: this.name,
      onlyActivePlans: e,
      extra: l.fromJson(n)
    });
    return this.options.requestLogger?.(o), this.client.listPlanStatuses(o, t);
  }
  async getPose(e, n, t, o = {}, i = this.callOptions) {
    const r = new js({
      name: this.name,
      componentName: e,
      destinationFrame: n,
      supplementalTransforms: t,
      extra: l.fromJson(o)
    });
    this.options.requestLogger?.(r);
    const d = (await this.client.getPose(r, i)).pose;
    if (!d)
      throw new Error("no pose");
    return d;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const Zo = /* @__PURE__ */ s.makeMessageType(
  "viam.service.datamanager.v1.SyncRequest",
  () => [
    {
      no: 1,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 99, name: "extra", kind: "message", T: l }
  ]
), Fv = /* @__PURE__ */ s.makeMessageType(
  "viam.service.datamanager.v1.SyncResponse",
  []
), eI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SyncRequest: Zo,
  SyncResponse: Fv
}, Symbol.toStringTag, { value: "Module" })), N_ = {
  typeName: "viam.service.datamanager.v1.DataManagerService",
  methods: {
    /**
     * Sync performs a sync of the non-synced files for the specified service name,
     *
     * @generated from rpc viam.service.datamanager.v1.DataManagerService.Sync
     */
    sync: {
      name: "Sync",
      I: Zo,
      O: Fv,
      kind: m.Unary
    },
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.service.datamanager.v1.DataManagerService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    }
  }
};
class nI {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(N_), this.name = n, this.options = t;
  }
  /**
   * Sync data stored on the machine to the cloud.
   *
   * @example
   *
   * ```ts
   * const dataManager = new VIAM.DataManagerClient(
   *   machine,
   *   'my_data_manager'
   * );
   * await dataManager.sync();
   * ```
   *
   * For more information, see [Data Manager
   * API](https://docs.viam.com/dev/reference/apis/services/data/#sync).
   *
   * @param extra - Extra arguments to pass to the sync request.
   * @param callOptions - Call options for the sync request.
   */
  async sync(e = {}, n = this.callOptions) {
    const t = new Zo({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t), await this.client.sync(t, n);
  }
  /**
   * Do a command on the data manager.
   *
   * @example
   *
   * ```ts
   * const dataManager = new VIAM.DataManagerClient(
   *   machine,
   *   'my_data_manager'
   * );
   * await dataManager.doCommand(new Struct({ cmd: 'test', data1: 500 }));
   * ```
   *
   * For more information, see [Data Manager
   * API](https://docs.viam.com/dev/reference/apis/services/data/#docommand).
   *
   * @param command - The command to do.
   * @param callOptions - Call options for the command.
   */
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
class aI {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(yd), this.name = n, this.options = t;
  }
  async getMode(e = {}, n = this.callOptions) {
    const t = new Zs({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getMode(t, n)).mode;
  }
  async setMode(e, n = {}, t = this.callOptions) {
    const o = new eo({
      name: this.name,
      mode: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o), await this.client.setMode(o, t);
  }
  async getLocation(e = {}, n = this.callOptions) {
    const t = new no({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const o = await this.client.getLocation(t, n);
    if (!o.location)
      throw new Error("no location");
    if (!w_(o.location))
      throw new Error("invalid location");
    return o;
  }
  async getWayPoints(e = {}, n = this.callOptions) {
    const t = new ao({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getWaypoints(t, n)).waypoints;
  }
  async addWayPoint(e, n = {}, t = this.callOptions) {
    const o = new to({
      name: this.name,
      location: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o), await this.client.addWaypoint(o, t);
  }
  async removeWayPoint(e, n = {}, t = this.callOptions) {
    const o = new so({
      name: this.name,
      id: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o), await this.client.removeWaypoint(o, t);
  }
  async getObstacles(e = {}, n = this.callOptions) {
    const t = new oo({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getObstacles(t, n)).obstacles;
  }
  async getPaths(e = {}, n = this.callOptions) {
    const t = new io({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getPaths(t, n)).paths;
  }
  async getProperties(e = this.callOptions) {
    const n = new ro({
      name: this.name
    });
    return this.options.requestLogger?.(n), this.client.getProperties(n, e);
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const {
  GetLocationResponse: tI,
  GetPropertiesResponse: sI,
  Mode: oI,
  Path: iI,
  Waypoint: rI
} = zR;
class mI {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(mc), this.name = n, this.options = t;
  }
  async move(e, n = {}, t = this.callOptions) {
    const o = new Ms({
      name: this.name,
      angleDeg: e,
      extra: l.fromJson(n)
    });
    this.options.requestLogger?.(o), await this.client.move(o, t);
  }
  async getPosition(e = {}, n = this.callOptions) {
    const t = new Es({
      name: this.name,
      extra: l.fromJson(e)
    });
    return this.options.requestLogger?.(t), (await this.client.getPosition(t, n)).positionDeg;
  }
  async stop(e = {}, n = this.callOptions) {
    const t = new ws({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t), await this.client.stop(t, n);
  }
  async isMoving(e = this.callOptions) {
    const n = new Os({
      name: this.name
    });
    return this.options.requestLogger?.(n), (await this.client.isMoving(n, e)).isMoving;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
class cI {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(bd), this.name = n, this.options = t;
  }
  async getPosition(e = this.callOptions) {
    const n = new mo({
      name: this.name
    });
    return this.options.requestLogger?.(n), this.client.getPosition(n, e);
  }
  async getPointCloudMap(e, n = this.callOptions) {
    const t = new co({
      name: this.name,
      returnEditedMap: e
    });
    this.options.requestLogger?.(t);
    const o = [], i = this.client.getPointCloudMap(t, n);
    for await (const r of i)
      o.push(r.pointCloudPcdChunk);
    return Ni(o);
  }
  async getInternalState(e = this.callOptions) {
    const n = new lo({
      name: this.name
    });
    this.options.requestLogger?.(n);
    const t = [], o = this.client.getInternalState(n, e);
    for await (const i of o)
      t.push(i.internalStateChunk);
    return Ni(t);
  }
  async getProperties(e = this.callOptions) {
    const n = new po({
      name: this.name
    });
    return this.options.requestLogger?.(n), this.client.getProperties(n, e);
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const Ni = (a) => {
  const e = a.reduce((o, i) => o + i.length, 0), n = new Uint8Array(e);
  let t = 0;
  for (const o of a)
    n.set(o, t), t += o.length;
  return n;
}, {
  GetPositionResponse: lI,
  GetPropertiesResponse: dI
} = YR;
class pI {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(Yd), this.name = n, this.options = t;
  }
  async getDetectionsFromCamera(e, n = {}, t = this.callOptions) {
    const o = new vo({
      name: this.name,
      cameraName: e,
      extra: l.fromJson(n)
    });
    return this.options.requestLogger?.(o), (await this.client.getDetectionsFromCamera(
      o,
      t
    )).detections;
  }
  async getDetections(e, n, t, o, i = {}, r = this.callOptions) {
    const c = new yo({
      name: this.name,
      image: e,
      width: n ? BigInt(n) : void 0,
      height: t ? BigInt(t) : void 0,
      mimeType: o,
      extra: l.fromJson(i)
    });
    return this.options.requestLogger?.(c), (await this.client.getDetections(c, r)).detections;
  }
  async getClassificationsFromCamera(e, n, t = {}, o = this.callOptions) {
    const i = new fo({
      name: this.name,
      cameraName: e,
      n,
      // eslint-disable-line id-length
      extra: l.fromJson(t)
    });
    return this.options.requestLogger?.(i), (await this.client.getClassificationsFromCamera(
      i,
      o
    )).classifications;
  }
  async getClassifications(e, n, t, o, i, r = {}, c = this.callOptions) {
    const d = new ho({
      name: this.name,
      image: e,
      width: n,
      height: t,
      mimeType: o,
      n: i,
      // eslint-disable-line id-length
      extra: l.fromJson(r)
    });
    return this.options.requestLogger?.(d), (await this.client.getClassifications(d, c)).classifications;
  }
  async getObjectPointClouds(e, n = {}, t = this.callOptions) {
    const o = new Ro({
      name: this.name,
      cameraName: e,
      extra: l.fromJson(n)
    });
    return this.options.requestLogger?.(o), (await this.client.getObjectPointClouds(o, t)).objects;
  }
  async getProperties(e = {}, n = this.callOptions) {
    const t = new _o({
      name: this.name,
      extra: l.fromJson(e)
    });
    this.options.requestLogger?.(t);
    const o = await this.client.getProperties(t, n);
    return {
      classificationsSupported: o.classificationsSupported,
      detectionsSupported: o.detectionsSupported,
      objectPointCloudsSupported: o.objectPointCloudsSupported
    };
  }
  async captureAllFromCamera(e, {
    returnImage: n,
    returnClassifications: t,
    returnDetections: o,
    returnObjectPointClouds: i
  }, r = {}, c = this.callOptions) {
    const d = new So({
      name: this.name,
      cameraName: e,
      returnImage: n,
      returnClassifications: t,
      returnDetections: o,
      returnObjectPointClouds: i,
      extra: l.fromJson(r)
    });
    this.options.requestLogger?.(d);
    const p = await this.client.captureAllFromCamera(
      d,
      c
    );
    return {
      image: p.image,
      classifications: p.classifications,
      detections: p.detections,
      objectPointClouds: p.objects,
      extra: p.extra
    };
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const { Classification: uI, Detection: gI } = VR, { PointCloudObject: TI } = Or, Jv = {
  typeName: "viam.service.generic.v1.GenericService",
  methods: {
    /**
     * DoCommand sends/receives arbitrary commands
     *
     * @generated from rpc viam.service.generic.v1.GenericService.DoCommand
     */
    doCommand: {
      name: "DoCommand",
      I: q,
      O: U,
      kind: m.Unary
    }
  }
}, kI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GenericService: Jv
}, Symbol.toStringTag, { value: "Module" }));
class yI {
  client;
  name;
  options;
  callOptions = { headers: {} };
  constructor(e, n, t = {}) {
    this.client = e.createServiceClient(Jv), this.name = n, this.options = t;
  }
  async doCommand(e, n = this.callOptions) {
    return L(
      this.client.doCommand,
      this.name,
      e,
      this.options,
      n
    );
  }
}
const vI = "0.47.0";
export {
  aS as AnalogValue,
  Z_ as ArmClient,
  Q_ as ArmJointPositions,
  nS as BaseClient,
  eS as BaseProperties,
  sS as BoardClient,
  iS as ButtonClient,
  rS as CameraClient,
  pS as Capsule,
  uI as Classification,
  A as Client,
  Ov as CloudConfig,
  w as Code,
  YS as CollisionSpecification,
  N as ConnectError,
  Ae as ConnectionClosedError,
  $S as Constraints,
  nI as DataManagerClient,
  gI as Detection,
  mS as DiscoveryClient,
  F as Duration,
  lS as EncoderClient,
  E_ as EncoderPositionType,
  cS as EncoderProperties,
  dS as GantryClient,
  BS as GenericComponentClient,
  yI as GenericServiceClient,
  uS as GeoGeometry,
  gS as GeoPoint,
  TS as GeometriesInFrame,
  kS as Geometry,
  FS as GripperClient,
  JS as InputControllerClient,
  zS as InputControllerEvent,
  WS as LinearConstraint,
  jS as ListPlanStatusesResponse,
  MS as MLModelClient,
  ae as MachineConnectionEvent,
  en as ModelType,
  ZS as MotionClient,
  HS as MotionConfiguration,
  ES as MotorClient,
  OS as MovementSensorAccuracy,
  wS as MovementSensorClient,
  CS as MovementSensorPosition,
  NS as MovementSensorProperties,
  aI as NavigationClient,
  tI as NavigationPosition,
  sI as NavigationProperties,
  KS as ObstacleDetector,
  yS as Orientation,
  XS as OrientationConstraint,
  iI as Path,
  TI as PointCloudObject,
  vS as Pose,
  hS as PoseInFrame,
  tS as PowerMode,
  PS as PowerSensorClient,
  fS as RectangularPrism,
  RS as ResourceName,
  A as RobotClient,
  AS as SensorClient,
  mI as ServoClient,
  cI as SlamClient,
  lI as SlamPosition,
  dI as SlamProperties,
  _S as Sphere,
  US as StreamClient,
  l as Struct,
  GS as SwitchClient,
  _ as Timestamp,
  Io as TrainingStatus,
  SS as Transform,
  IS as Vector3,
  pI as VisionClient,
  rI as Waypoint,
  bS as WorldState,
  A_ as addMetadata,
  W_ as appApi,
  z_ as appRobotApi,
  SR as armApi,
  IR as baseApi,
  j_ as billingApi,
  MR as boardApi,
  oS as buttonApi,
  $_ as cameraApi,
  Or as commonApi,
  S1 as createRobotClient,
  X_ as createViamClient,
  H_ as dataApi,
  eI as dataManagerApi,
  q_ as deleteMetadata,
  D_ as disableDebugLogging,
  Y_ as discoveryApi,
  L as doCommandFromClient,
  P_ as enableDebugLogging,
  ER as encoderApi,
  U_ as gantryApi,
  L_ as genericComponentApi,
  kI as genericServiceApi,
  G_ as gripperApi,
  CR as inputControllerApi,
  w_ as isValidGeoPoint,
  V_ as mlTrainingApi,
  JR as motionApi,
  B_ as motorApi,
  PR as movementSensorApi,
  zR as navigationApi,
  x_ as powerSensorApi,
  K_ as provisioningApi,
  J_ as robotApi,
  DS as sensorApi,
  F_ as servoApi,
  YR as slamApi,
  qS as streamApi,
  LS as switchApi,
  vI as version,
  VR as visionApi
};
