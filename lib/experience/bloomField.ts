// Materialization renderer for the Your Body "Opening is possible" overlay,
// ported from Anthony's v39 your-body.html (window.BloomField). A dimmed living
// sphere with warm particle text: each quote is chunked into short phrases
// that coalesce out of the field in a nucleation wave, hold, and dissolve back
// into the glow, looping while the overlay is open. Renders only while open; a
// persistent clock keeps the field breathing across opens.
//
// Tuned values below are Anthony's approved defaults — change them there first.

export interface BloomField {
  start: () => void;
  stop: () => void;
  setPhrases: (phrases: string[]) => void;
  destroy: () => void;
}

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FRAG = `precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float pBright, pGlow, pFilAmt, pFilDrift, pSpark, pSparkRate;
vec2 hash2(vec2 p){ p=mod(p,289.0); p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453)*2.-1.; }
float vnoise(vec2 p){ vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  float a=dot(hash2(i+vec2(0,0)),f-vec2(0,0)),b=dot(hash2(i+vec2(1,0)),f-vec2(1,0));
  float c=dot(hash2(i+vec2(0,1)),f-vec2(0,1)),d=dot(hash2(i+vec2(1,1)),f-vec2(1,1));
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
const mat2 M=mat2(1.6,1.2,-1.2,1.6);
float fbm(vec2 p){ float v=.5*vnoise(p); p=M*p; v+=.25*vnoise(p); p=M*p; v+=.125*vnoise(p); p=M*p; v+=.0625*vnoise(p); return v; }
float ss(float a,float b,float x){ float t=clamp((x-a)/(b-a),0.,1.); return t*t*(3.-2.*t); }
float h11(float n){ return fract(sin(n)*43758.5453); }
const vec3 CORE=vec3(1.00,0.98,0.94);
const vec3 MID =vec3(1.00,0.91,0.76);
const vec3 BG  =vec3(0.010,0.010,0.015);
float sparkles(vec2 uv,float t){
  float s=0.0;
  for(int L=0;L<2;L++){
    float dens=(L==0)?9.0:15.0; vec2 g=uv*dens; vec2 id=floor(g); vec2 f=fract(g);
    float rnd=h11(dot(id,vec2(41.3,289.1))+float(L)*7.0);
    if(rnd>0.66){ vec2 pos=vec2(h11(rnd*13.1),h11(rnd*57.7)); float d=length(f-pos);
      float tw=pow(max(0.0,sin(t*pSparkRate*(0.6+rnd)+rnd*6.2831)),6.0);
      s+=smoothstep(0.06,0.0,d)*tw; } }
  return s;
}
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*uRes)/min(uRes.x,uRes.y);
  float r=length(uv);
  float edge=0.60*pGlow, plateau=0.34*pGlow;
  float g=pow(1.0-ss(plateau,edge,r),0.9);
  vec2 q=uv*3.2+vec2(11.0,4.0);
  vec2 flow=0.14*vec2(fbm(uv*1.1+vec2(0.0,0.12*pFilDrift*uTime)),fbm(uv*1.1+vec2(7.0,-0.10*pFilDrift*uTime)));
  q+=flow+0.16*vec2(sin(uTime*0.15*pFilDrift),cos(uTime*0.12*pFilDrift));
  float fil=1.0-abs(fbm(q));
  float band=ss(0.12,0.5,g)*ss(1.0,0.55,g);
  float filC=clamp(fil-0.55,0.0,1.0)*band*pFilAmt;
  float bright=clamp((g+filC)*pBright,0.0,1.3);
  vec3 col=mix(BG,MID,ss(0.0,0.25,bright));
  col=mix(col,CORE,ss(0.55,0.95,bright));
  col*=bright;
  float sp=sparkles(uv,uTime);
  float spVis=mix(0.35,1.0,ss(0.30,0.75,r))*ss(0.85,0.35,r);
  col+=CORE*sp*spVis*pSpark;
  col=pow(clamp(col,0.0,1.0),vec3(0.96));
  gl_FragColor=vec4(col,1.0);
}`;
const PVERT =
  "attribute vec2 aPos;attribute float aBright;attribute float aSize;varying float vB;void main(){gl_Position=vec4(aPos,0.,1.);gl_PointSize=aSize;vB=aBright;}";
const PFRAG =
  "precision highp float;varying float vB;uniform vec3 uWarm;void main(){float r=length(gl_PointCoord-0.5)*2.0;float soft=pow(smoothstep(1.0,0.0,r),1.5);gl_FragColor=vec4(uWarm*vB*soft,1.0);}";

// baked, tuned defaults (slightly quicker holds because a quote is delivered
// as a SEQUENCE of short phrases)
const ST = {
  fieldB: 0.7,
  fieldSize: 1.02,
  letB: 1.08,
  spread: 0.7,
  drift: 10.0,
  coalesce: 1.7,
  hold: 2.5,
  dissolve: 1.4,
  gap: 0.45,
};
const ATMB = 0.16;
const ATMS = 6.0;
const POOL = 2800;

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean);

/**
 * Split a quote into short (2-8 word) phrases at sentence, then comma, then
 * even groups — so every phrase materializes crisply.
 */
export function chunkQuote(quote: string): string[] {
  const sents = (quote.match(/[^.!?]+[.!?]*/g) || [quote]).map((s) => s.trim()).filter(Boolean);
  let out: string[] = [];
  for (const s of sents) {
    const w = words(s);
    if (w.length <= 8) {
      out.push(s);
      continue;
    }
    const raw = s.split(",");
    const parts: string[] = [];
    raw.forEach((r, ri) => {
      const p = r.trim();
      if (p) parts.push(ri < raw.length - 1 ? p + "," : p);
    });
    const acc: string[] = [];
    for (const pp of parts) {
      const pw = words(pp);
      if (pw.length <= 8) {
        acc.push(pp);
      } else {
        const n = Math.ceil(pw.length / 7);
        const per = Math.ceil(pw.length / n);
        for (let k = 0; k < pw.length; k += per) acc.push(pw.slice(k, k + per).join(" "));
      }
    }
    out = out.concat(acc);
  }
  const merged: string[] = [];
  for (const c of out) {
    if (merged.length && words(c).length < 2 && words(merged[merged.length - 1]).length + words(c).length <= 8) {
      merged[merged.length - 1] = (merged[merged.length - 1] + " " + c).trim();
    } else merged.push(c);
  }
  return merged;
}

export function createBloomField(cv: HTMLCanvasElement, fontFamily: string): BloomField {
  let gl: WebGLRenderingContext | null = null;
  let spProg: WebGLProgram | null = null;
  let ptProg: WebGLProgram | null = null;
  let quad: WebGLBuffer | null = null;
  let pbuf: WebGLBuffer | null = null;
  let spPosLoc = 0;
  let uRes: WebGLUniformLocation | null = null;
  let uTime: WebGLUniformLocation | null = null;
  const spU: Record<string, WebGLUniformLocation | null> = {};
  let aPos = 0;
  let aBright = 0;
  let aSize = 0;
  let uWarm: WebGLUniformLocation | null = null;
  let running = false;
  let inited = false;
  const t0 = performance.now();
  let raf = 0;
  let fontsReady = false;
  const font = (fs: number) => `italic 500 ${fs}px ${fontFamily}`;

  const data = new Float32Array(POOL * 4);
  let CW = 0;
  let CH = 0;
  let discR = 0;
  const cell = 44;
  let gridW = 1;
  let gridH = 1;
  let grid: number[][] = [];
  const homeX = new Float32Array(POOL);
  const homeY = new Float32Array(POOL);
  const phx = new Float32Array(POOL);
  const phy = new Float32Array(POOL);
  const wx = new Float32Array(POOL);
  const wy = new Float32Array(POOL);
  const tw = new Float32Array(POOL);
  const role = new Uint8Array(POOL);
  const tX = new Float32Array(POOL);
  const tY = new Float32Array(POOL);
  const delay = new Float32Array(POOL);
  const ddelay = new Float32Array(POOL);
  let phrases: string[] = [];
  let phraseIdx = 0;
  let phraseStart = 0;
  let letS = 12;

  function sh(g: WebGLRenderingContext, type: number, src: string) {
    const o = g.createShader(type)!;
    g.shaderSource(o, src);
    g.compileShader(o);
    if (!g.getShaderParameter(o, g.COMPILE_STATUS)) console.error(g.getShaderInfoLog(o));
    return o;
  }
  function prog(g: WebGLRenderingContext, v: string, f: string) {
    const p = g.createProgram()!;
    g.attachShader(p, sh(g, g.VERTEX_SHADER, v));
    g.attachShader(p, sh(g, g.FRAGMENT_SHADER, f));
    g.linkProgram(p);
    if (!g.getProgramParameter(p, g.LINK_STATUS)) console.error(g.getProgramInfoLog(p));
    return p;
  }

  function init() {
    if (inited) return !!gl;
    inited = true;
    try {
      gl = (cv.getContext("webgl") || cv.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }
    if (!gl) return false;
    spProg = prog(gl, VERT, FRAG);
    ptProg = prog(gl, PVERT, PFRAG);
    quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    spPosLoc = gl.getAttribLocation(spProg, "p");
    uRes = gl.getUniformLocation(spProg, "uRes");
    uTime = gl.getUniformLocation(spProg, "uTime");
    ["pBright", "pGlow", "pFilAmt", "pFilDrift", "pSpark", "pSparkRate"].forEach((n) => {
      spU[n] = gl!.getUniformLocation(spProg!, n);
    });
    pbuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pbuf);
    gl.bufferData(gl.ARRAY_BUFFER, data.byteLength, gl.DYNAMIC_DRAW);
    aPos = gl.getAttribLocation(ptProg, "aPos");
    aBright = gl.getAttribLocation(ptProg, "aBright");
    aSize = gl.getAttribLocation(ptProg, "aSize");
    uWarm = gl.getUniformLocation(ptProg, "uWarm");
    return true;
  }

  function buildHomes() {
    for (let i = 0; i < POOL; i++) {
      const a = Math.random() * 6.2831;
      const rr = Math.sqrt(Math.random()) * discR;
      homeX[i] = CW / 2 + Math.cos(a) * rr;
      homeY[i] = CH / 2 + Math.sin(a) * rr;
      phx[i] = Math.random() * 6.2831;
      phy[i] = Math.random() * 6.2831;
      wx[i] = 0.14 + Math.random() * 0.2;
      wy[i] = 0.14 + Math.random() * 0.2;
      tw[i] = Math.random() * 6.2831;
    }
    gridW = Math.ceil(CW / cell) + 1;
    gridH = Math.ceil(CH / cell) + 1;
    grid = Array.from({ length: gridW * gridH }, () => []);
    for (let i = 0; i < POOL; i++) {
      const gx = Math.floor(homeX[i] / cell);
      const gy = Math.floor(homeY[i] / cell);
      grid[gy * gridW + gx].push(i);
    }
  }

  function wrapLines(g: CanvasRenderingContext2D, text: string, maxw: number) {
    const ws = text.split(/\s+/);
    const lines: string[] = [];
    let cur = "";
    for (const w of ws) {
      const t = (cur + " " + w).trim();
      if (g.measureText(t).width <= maxw || !cur) cur = t;
      else {
        lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  function samplePhrase(text: string) {
    const oc = document.createElement("canvas");
    oc.width = CW;
    oc.height = CH;
    const g = oc.getContext("2d", { willReadFrequently: true })!;
    const maxW = CW * 0.82;
    const cap = Math.floor(POOL * 0.6);
    const fsCap = Math.min(CH * 0.16, CW * 0.16);
    let fs = fsCap;
    let lines = [text];
    for (; fs > 14; fs -= 2) {
      g.font = font(fs);
      lines = wrapLines(g, text, maxW);
      const lh = fs * 1.28;
      const okw = lines.every((ln) => g.measureText(ln).width <= maxW);
      if (lines.length <= 2 && lines.length * lh <= CH * 0.5 && okw) break;
    }
    let stride = Math.max(4, Math.min(8, Math.round(fs / 20)));
    let pts: [number, number][] = [];
    for (let attempt = 0; attempt < 6; attempt++) {
      g.clearRect(0, 0, CW, CH);
      g.fillStyle = "#fff";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.font = font(fs);
      const lh2 = fs * 1.28;
      const total = lines.length * lh2;
      const y0 = CH / 2 - total / 2 + lh2 / 2;
      for (let i = 0; i < lines.length; i++) g.fillText(lines[i], CW / 2, y0 + i * lh2);
      const d = g.getImageData(0, 0, CW, CH).data;
      pts = [];
      for (let y = 0; y < CH; y += stride) {
        for (let x = 0; x < CW; x += stride) {
          if (d[(y * CW + x) * 4 + 3] > 90)
            pts.push([x + (Math.random() - 0.5) * stride * 0.35, y + (Math.random() - 0.5) * stride * 0.35]);
        }
      }
      if (pts.length <= cap) break;
      stride += 1;
    }
    letS = Math.max(10, Math.min(20, stride * 2.3));
    return pts;
  }

  function buildPhrase(idx: number) {
    const targets = samplePhrase(phrases[idx]);
    const M = targets.length;
    role.fill(0);
    if (M < 1) return;
    const K = Math.max(3, Math.min(6, Math.round(M / 160)));
    const seeds: [number, number][] = [];
    for (let s = 0; s < K; s++) seeds.push(targets[(Math.random() * M) | 0]);
    let dmin = 1e9;
    let dmax = -1e9;
    const dl = new Float32Array(M);
    for (let i = 0; i < M; i++) {
      let best = 1e9;
      for (let s = 0; s < K; s++) {
        const dx = targets[i][0] - seeds[s][0];
        const dy = targets[i][1] - seeds[s][1];
        const dd = dx * dx + dy * dy;
        if (dd < best) best = dd;
      }
      dl[i] = Math.sqrt(best);
      if (dl[i] < dmin) dmin = dl[i];
      if (dl[i] > dmax) dmax = dl[i];
    }
    const used = new Uint8Array(POOL);
    for (let i = 0; i < M; i++) {
      const txp = targets[i][0];
      const typ = targets[i][1];
      const gx = Math.floor(txp / cell);
      const gy = Math.floor(typ / cell);
      let bst = -1;
      let bd = 1e18;
      for (let rad = 0; rad < 8 && bst < 0; rad++) {
        for (let oy = -rad; oy <= rad; oy++)
          for (let ox = -rad; ox <= rad; ox++) {
            if (rad > 0 && Math.abs(ox) !== rad && Math.abs(oy) !== rad) continue;
            const cx = gx + ox;
            const cy = gy + oy;
            if (cx < 0 || cy < 0 || cx >= gridW || cy >= gridH) continue;
            for (const pi of grid[cy * gridW + cx]) {
              if (used[pi]) continue;
              const ddx = homeX[pi] - txp;
              const ddy = homeY[pi] - typ;
              const d2 = ddx * ddx + ddy * ddy;
              if (d2 < bd) {
                bd = d2;
                bst = pi;
              }
            }
          }
      }
      if (bst < 0) {
        for (let p2 = 0; p2 < POOL; p2++) {
          if (!used[p2]) {
            bst = p2;
            break;
          }
        }
      }
      if (bst < 0) break;
      used[bst] = 1;
      role[bst] = 1;
      tX[bst] = txp;
      tY[bst] = typ;
      let nd = (dl[i] - dmin) / (dmax - dmin + 1e-6);
      nd = Math.min(1, Math.max(0, nd + (Math.random() - 0.5) * 0.1));
      delay[bst] = nd;
      ddelay[bst] = 1.0 - nd;
    }
  }

  function smoother(x: number) {
    x = Math.min(1, Math.max(0, x));
    return x * x * x * (x * (x * 6 - 15) + 10);
  }

  function resize() {
    if (!gl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const w = Math.round((cv.clientWidth || window.innerWidth) * dpr);
    const h = Math.round((cv.clientHeight || window.innerHeight) * dpr);
    if (w < 2 || h < 2) return;
    if (w === CW && h === CH) return;
    CW = w;
    CH = h;
    cv.width = CW;
    cv.height = CH;
    gl.viewport(0, 0, CW, CH);
    discR = 0.46 * Math.min(CW, CH);
    buildHomes();
    if (running && fontsReady && phrases.length) {
      buildPhrase(phraseIdx);
      phraseStart = (performance.now() - t0) / 1000;
    }
  }

  function frame() {
    if (!running || !gl) return;
    if (!CW) {
      raf = requestAnimationFrame(frame);
      return;
    }
    const t = (performance.now() - t0) / 1000;
    gl.disable(gl.BLEND);
    gl.useProgram(spProg);
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.enableVertexAttribArray(spPosLoc);
    gl.vertexAttribPointer(spPosLoc, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(uRes, CW, CH);
    gl.uniform1f(uTime, t);
    gl.uniform1f(spU.pBright, ST.fieldB);
    gl.uniform1f(spU.pGlow, ST.fieldSize);
    gl.uniform1f(spU.pFilAmt, 0.08);
    gl.uniform1f(spU.pFilDrift, 1.0);
    gl.uniform1f(spU.pSpark, 0.1);
    gl.uniform1f(spU.pSparkRate, 1.0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (phrases.length) {
      const pe = t - phraseStart;
      const { coalesce: Tc, hold: Th, dissolve: Td, spread: sp, drift: amp } = ST;
      for (let i = 0; i < POOL; i++) {
        const dx = homeX[i] + Math.sin(t * wx[i] + phx[i]) * amp;
        const dy = homeY[i] + Math.sin(t * wy[i] + phy[i]) * amp;
        let px: number, py: number, br: number, sz: number;
        if (role[i] === 1) {
          if (pe < Tc) {
            const lp = smoother((pe / Tc) * (1 + sp) - delay[i] * sp);
            px = dx + (tX[i] - dx) * lp;
            py = dy + (tY[i] - dy) * lp;
            br = ATMB + (ST.letB - ATMB) * lp;
            sz = ATMS + (letS - ATMS) * lp;
          } else if (pe < Tc + Th) {
            px = tX[i] + Math.sin(t * 1.7 + phx[i]) * 1.3;
            py = tY[i] + Math.cos(t * 1.6 + phy[i]) * 1.3;
            br = ST.letB * (0.9 + 0.1 * Math.sin(t * 1.3 + tw[i]));
            sz = letS;
          } else if (pe < Tc + Th + Td) {
            const ld = smoother(((pe - Tc - Th) / Td) * (1 + sp) - ddelay[i] * sp);
            px = tX[i] + (dx - tX[i]) * ld;
            py = tY[i] + (dy - tY[i]) * ld;
            br = ST.letB + (ATMB - ST.letB) * ld;
            sz = letS + (ATMS - letS) * ld;
          } else {
            px = dx;
            py = dy;
            br = ATMB;
            sz = ATMS;
          }
        } else {
          px = dx;
          py = dy;
          br = ATMB * (0.65 + 0.55 * Math.max(0.0, Math.sin(t * (0.5 + wx[i]) + tw[i])));
          sz = ATMS;
        }
        data[i * 4] = (px / CW) * 2 - 1;
        data[i * 4 + 1] = 1 - (py / CH) * 2;
        data[i * 4 + 2] = br;
        data[i * 4 + 3] = sz;
      }
      if (pe >= Tc + Th + Td + ST.gap) {
        phraseIdx = (phraseIdx + 1) % phrases.length;
        buildPhrase(phraseIdx);
        phraseStart = t;
      }
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.useProgram(ptProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, pbuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(aBright);
      gl.vertexAttribPointer(aBright, 1, gl.FLOAT, false, 16, 8);
      gl.enableVertexAttribArray(aSize);
      gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 16, 12);
      gl.uniform3f(uWarm, 1.0, 0.95, 0.86);
      gl.drawArrays(gl.POINTS, 0, POOL);
    }
    raf = requestAnimationFrame(frame);
  }

  function beginPhrases() {
    if (!phrases.length || !CW) return;
    phraseIdx = 0;
    const go = () => {
      buildPhrase(0);
      phraseStart = (performance.now() - t0) / 1000;
    };
    try {
      if (document.fonts?.check?.(font(24))) fontsReady = true;
    } catch {
      // older browsers without the font loading API
    }
    if (fontsReady || !document.fonts?.ready) go();
    else {
      document.fonts.ready.then(() => {
        fontsReady = true;
        go();
      });
      setTimeout(() => {
        if (!fontsReady) {
          fontsReady = true;
          go();
        }
      }, 1200);
    }
  }

  const onResize = () => {
    if (running) resize();
  };
  window.addEventListener("resize", onResize);

  return {
    setPhrases(arr) {
      phrases = arr?.length ? arr.slice() : ["Opening is possible."];
      if (running && gl && CW) beginPhrases();
    },
    start() {
      if (!init()) return;
      running = true;
      resize();
      if (!CW) {
        requestAnimationFrame(() => {
          resize();
          beginPhrases();
        });
      } else beginPhrases();
      cancelAnimationFrame(raf);
      frame();
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    },
  };
}
