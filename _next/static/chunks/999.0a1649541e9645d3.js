"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[999],{5999:(e,t,n)=>{n.r(t),n.d(t,{default:()=>T});var r=n(7795),i=n(4659),o=n(9343),a=n(4856),s=n(2425),l=n(1334),u=n(8686);let c=`
  void main() {
    gl_Position = vec4(position.xy, 0.99999, 1.0);
  }
`,p=`
  uniform vec2 uCentre;   // gradient centre, device px (origin bottom-left)
  uniform vec2 uRadii;    // gradient ellipse radii, device px
  uniform vec2 uObj;      // object centre, device px
  uniform float uMaskR;   // grid mask radius, device px
  uniform float uGrid;    // grid pitch, device px
  uniform vec2 uGridOrigin;
  uniform float uGridAlpha;
  uniform float uLock;    // 0..1 teal lock glow
  uniform float uLockR;
  uniform vec3 uInner;
  uniform vec3 uInnerRT;
  uniform vec3 uOuter;
  uniform vec3 uLine;
  uniform float uStop;
  uniform float uRT;      // 1 inside the transmission pass
  uniform float uPx;      // canvas device px per target px (1 on screen)
  uniform float uGridAlphaRT;

  vec3 toLinear(vec3 c) {
    return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
  }
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - 0.5) * uPx + 0.5;
    float d = length((p - uCentre) / uRadii);
    // Inside the transmission pass the stage reads brighter, so the glass
    // carries light instead of reading as dark tubes.
    vec3 inner = mix(uInner, uInnerRT, uRT);
    vec3 col = mix(inner, uOuter, clamp(d / uStop, 0.0, 1.0));

    // Grid: 1 device-px lines (2 target px in the pass), antialiased, masked around the object.
    vec2 g = abs(fract((p - uGridOrigin) / uGrid + 0.5) - 0.5) * uGrid;
    float lw = mix(1.0, 2.0 * max(1.0, uPx), uRT);
    float line = 1.0 - smoothstep(lw - 1.0, lw, min(g.x, g.y));
    float mask = 1.0 - smoothstep(uMaskR * 0.35, uMaskR, length(p - uObj));
    col = mix(col, uLine, line * mask * mix(uGridAlpha, uGridAlphaRT, uRT));

    // Pass only: soft vertical light strips behind the object (a lightbox), so
    // bright bands refract through the clear tubes.
    float sx = (p.x - uObj.x) / uMaskR;
    float strips = exp(-pow(sx / 0.08, 2.0)) + 0.7 * exp(-pow((abs(sx) - 0.62) / 0.06, 2.0));
    float sy = 1.0 - smoothstep(0.2 * uMaskR, 1.3 * uMaskR, abs(p.y - uObj.y));
    col = mix(col, vec3(0.86, 0.85, 0.83), clamp(strips * sy, 0.0, 1.0) * 0.38 * uRT);

    // Lock glow: rgb(89 207 202 / 0.1) radial, only when the promise is kept.
    float lg = 1.0 - smoothstep(0.0, 0.7, length(p - uObj) / uLockR);
    col = mix(col, vec3(0.349, 0.812, 0.792), lg * 0.1 * uLock);

    gl_FragColor = vec4(toLinear(col), 1.0);
    #include <colorspace_fragment>
    gl_FragColor.rgb += (hash(p) - 0.5) / 255.0;
  }
`;function d(e){let t=new s.Q1f;return t.setStyle(e,s.jf0),new s.Pq0(t.r,t.g,t.b)}var f=n(5714);let m=[new s.Pq0(0,0,1),new s.Pq0(1,0,0),new s.Pq0(0,1,0)],v=[new s.Pq0(0,1,0),new s.Pq0(0,0,1),new s.Pq0(1,0,0)];function w(e,t,n=new s.Pq0){let r=Math.cos(t*Math.PI*2)*l.Zf.a,i=Math.sin(t*Math.PI*2)*l.Zf.b;return 0===e?n.set(r,i,0):1===e?n.set(0,r,i):n.set(i,0,r)}class h extends s.Ipv{constructor(e){super(),this.plane=e}getPoint(e,t=new s.Pq0){return w(this.plane,e,t)}}let x=[new s.Pq0(1,0,0),new s.Pq0(0,1,0),new s.Pq0(0,0,1)],g=new s.Pq0(1,1,1).normalize(),y=new s.Pq0(0,1,0),M=[.41,.53,.37],b=[0,2.1,4.2],R=[1,-1,1];function P({read:e,map:t,tier:n,labelEls:r,onAnchors:a,pointer:u,onReady:P,onFrame:k}){let q=(0,o.D)(e=>e.gl),I=(0,o.D)(e=>e.scene),T=(0,o.D)(e=>e.camera),A=(0,o.D)(e=>e.size),L=(0,i.useMemo)(()=>{let e=[0,1,2].map(e=>{let t=new s.j6(new h(e),l.Zf.tubular,l.Zf.tube,l.Zf.radial,!0);return 0===e&&t.computeTangents(),t}),t=function(){let e={titanium:new s.uSd({color:0xc9cbd1,metalness:1,roughness:.22,anisotropy:.5,anisotropyRotation:0,clearcoat:.3,clearcoatRoughness:.2,envMapIntensity:1.5}),glassA:new s.uSd({color:0xffffff,metalness:0,roughness:.03,transmission:1,thickness:.35,ior:1.5,dispersion:.08,clearcoat:1,clearcoatRoughness:.04,specularIntensity:1,envMapIntensity:1.75,attenuationColor:new s.Q1f(0xeef2f1),attenuationDistance:2.5}),glassB:new s.uSd({color:0xffffff,metalness:0,roughness:.18,transmission:0,transparent:!0,opacity:.55,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:1.4,depthWrite:!1})};return{...e,dispose(){e.titanium.dispose(),e.glassA.dispose(),e.glassB.dispose()}}}(),n=function(){let e={uCentre:{value:new s.I9Y},uRadii:{value:new s.I9Y(1,1)},uObj:{value:new s.I9Y},uMaskR:{value:400},uGrid:{value:l.Z.px},uGridOrigin:{value:new s.I9Y},uGridAlpha:{value:l.Z.alpha},uLock:{value:0},uLockR:{value:400},uInner:{value:d(l.Ld.inner)},uInnerRT:{value:d(l.cj.inner)},uOuter:{value:d(l.Ld.outer)},uLine:{value:d(l.Z.color)},uStop:{value:l.Ld.stop},uRT:{value:0},uPx:{value:1},uGridAlphaRT:{value:l.Z.alphaRT}},t=new s.bdM(2,2),n=new s.BKk({uniforms:e,vertexShader:c,fragmentShader:p,depthWrite:!1,depthTest:!1,toneMapped:!1}),r=new s.eaF(t,n);r.frustumCulled=!1,r.renderOrder=-1;let i=new s.I9Y;return r.onBeforeRender=t=>{let n=t.getRenderTarget();e.uRT.value=+!!n,e.uPx.value=n&&n.width>0?t.getDrawingBufferSize(i).x/n.width:1},{mesh:r,uniforms:e,dispose(){t.dispose(),n.dispose()}}}(),r=new s.YJl,i=new s.YJl,o=new s.YJl,a=e.map((e,n)=>new s.eaF(e,0===n?t.titanium:t.glassA));a.forEach(e=>o.add(e)),i.add(o);let u=new s.B69,f=new s.nCl(l.df.color,0,0,l.df.angle,l.df.penumbra,2);return f.target=u,r.add(n.mesh,i,u,f),{geometries:e,materials:t,backdrop:n,root:r,outer:i,inner:o,rings:a,spot:f,spotTarget:u}},[]),{materials:E,backdrop:C,spotTarget:j}=L,G=(0,i.useMemo)(()=>({v:new s.Pq0,c:new s.Pq0,axis:new s.Pq0,q1:new s.PTz,q2:new s.PTz}),[]),_=(0,i.useRef)({x:0,y:0,cam:0}),F=(0,i.useRef)({x:0,y:0});(0,i.useEffect)(()=>(I.add(L.root),()=>{I.remove(L.root)}),[I,L]),(0,i.useEffect)(()=>()=>{L.geometries.forEach(e=>e.dispose()),L.materials.dispose(),L.backdrop.dispose()},[L]),(0,i.useEffect)(()=>{if(!u||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;let e=e=>{F.current.x=e.clientX/window.innerWidth*2-1,F.current.y=e.clientY/window.innerHeight*2-1};return window.addEventListener("pointermove",e,{passive:!0}),()=>window.removeEventListener("pointermove",e)},[u]);let S=(e,i)=>{let o=L.outer,s=L.inner,{pose:c}=e,p=t(e),d=q.getPixelRatio(),f=A.width,h=A.height,P=(0,l.E2)(l._P.z)/h,k=1-Math.exp(-2.5*i),S=u?c.pointer:0;_.current.x+=(-(.06*F.current.y)*S-_.current.x)*k,_.current.y+=(.09*F.current.x*S-_.current.y)*k,_.current.cam+=(.08*F.current.x*S-_.current.cam)*k;let D=(c.cx-p.ox)*p.s,O=(c.cy-p.oy)*p.s;o.position.set((D-f/2)*P,(h/2-O)*P,0),o.scale.setScalar(c.d*p.s*P/l.pb),o.rotation.set(c.rx+_.current.x,c.ry+_.current.y,c.rz),1===c.spinAxis?s.quaternion.setFromAxisAngle(g,e.spin):(G.axis.copy(y).applyQuaternion(G.q1.copy(o.quaternion).invert()),s.quaternion.setFromAxisAngle(G.axis,e.spin));for(let t=0;t<3;t++){let r=L.rings[t];r.position.copy(m[t]).multiplyScalar(c.offset);let i=c.drift*Math.sin(e.time*M[t]+b[t])+c.tilt*R[t],o=.6*c.drift*Math.sin(e.time*M[(t+1)%3]*1.3+.7*b[t]);G.q1.setFromAxisAngle(v[t],i),G.q2.setFromAxisAngle(x[t],o),r.quaternion.multiplyQuaternions(G.q1,G.q2),r.material=0===t?E.titanium:"A"===n?E.glassA:E.glassB}T.position.set(_.current.cam,0,c.camZ),I.environmentIntensity=c.env;let B=L.spot;B.position.set(o.position.x,o.position.y+1.5,-4),j.position.copy(o.position),j.updateMatrixWorld(),B.intensity=c.rim*l.o_;let Z=C.uniforms,z=e=>(e-p.ox)*p.s*d,Y=e=>(h-(e-p.oy)*p.s)*d;if(Z.uCentre.value.set(z(c.gx),Y(c.gy)),Z.uRadii.value.set(l.Ld.rx*e.vw*p.s*d,l.Ld.ry*e.vh*p.s*d),Z.uObj.value.set(z(c.cx),Y(c.cy)),Z.uMaskR.value=1.05*c.d*p.s*d,Z.uLockR.value=1.1*c.d*p.s*d,Z.uGrid.value=l.Z.px*p.s*d,Z.uGridOrigin.value.set(z(e.vw/2),Y(e.vh/2)),Z.uLock.value=Math.min(1,c.rim/l.df.lit)*(c.rim>l.df.rest?1:.35),r?.current||a){o.updateMatrixWorld(!0),T.updateMatrixWorld(),G.c.copy(o.position).project(T);let e=(.5*G.c.x+.5)*f,t=[];for(let n=0;n<3;n++){let i=L.rings[n];w(n,l.E_[n],G.v),i.localToWorld(G.v).project(T);let o=(.5*G.v.x+.5)*f,a=(-(.5*G.v.y)+.5)*h,s=o<e?"left":"right";t.push({x:o,y:a,side:s});let u=r?.current?.[n];u&&(u.style.transform=`translate3d(${(o/p.s+p.ox).toFixed(1)}px, ${(a/p.s+p.oy).toFixed(1)}px, 0)`,u.dataset.side!==s&&(u.dataset.side=s))}a?.(t)}},D=(0,i.useRef)(S);return(0,i.useLayoutEffect)(()=>{D.current=S}),(0,i.useEffect)(()=>{let t=!1,n=null,r=0,i=e=>{r="function"==typeof window.requestIdleCallback?window.requestIdleCallback(e,{timeout:1e3}):window.setTimeout(e,16)};return i(()=>{if(t)return;I.environment=n=function(e){let t=new s.Z58,n=new s.bdM(1,1),r=[],i=new s.Gu$(40,32,16),o=new s.BKk({side:s.hsX,depthWrite:!1,toneMapped:!1,uniforms:{uTop:{value:new s.Q1f(.42,.4,.37)},uMid:{value:new s.Q1f(.07,.07,.075)},uBottom:{value:new s.Q1f(.006,.006,.007)}},vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uTop;
      uniform vec3 uMid;
      uniform vec3 uBottom;
      varying vec3 vDir;
      void main() {
        float y = vDir.y;
        vec3 c = y > 0.0 ? mix(uMid, uTop, smoothstep(0.0, 0.9, y)) : mix(uMid, uBottom, smoothstep(0.0, 0.5, -y));
        gl_FragColor = vec4(c, 1.0);
      }
    `});r.push(o),t.add(new s.eaF(i,o));let a=(e,i,o,a,l,u)=>{let c=new s.V9B({color:new s.Q1f(o).multiplyScalar(a),side:s.$EB,toneMapped:!1});r.push(c);let p=new s.eaF(n,c);p.scale.set(e,i,1),p.position.set(...l),p.rotation.set(...u),t.add(p)};a(10,5,0xfff6ec,2.2,[0,4.5,0],[Math.PI/2,0,0]),a(1.2,12,0xffffff,1.4,[-4.5,0,1],[0,Math.PI/2,0]),a(1.2,12,0xffffff,1,[4.5,0,1],[0,-Math.PI/2,0]),a(.5,10,0xffffff,1.6,[0,0,-5],[0,0,0]);let l=new f.PMREMGenerator(e),u=l.fromScene(t,.035,.1,100,{size:256});return l.dispose(),n.dispose(),i.dispose(),r.forEach(e=>e.dispose()),u.texture}(q);let r=e();r&&D.current(r,1),i(()=>{t||q.compileAsync(I,T).catch(()=>void 0).then(()=>{t||P?.()})})}),()=>{t=!0,"function"==typeof window.cancelIdleCallback&&window.cancelIdleCallback(r),window.clearTimeout(r),I.environment=null,n?.dispose()}},[q,I,T]),(0,o.F)((t,n)=>{let r=e();r&&(D.current(r,Math.min(n,.1)),k?.(n))}),null}let k={ox:0,oy:0,s:1},q=()=>k,I=[{dpr:1.5,tier:"A"},{dpr:1,tier:"A"},{dpr:1,tier:"B"}];function T({labelEls:e,onReady:t,onFail:n,forced:c}){let[p,d]=(0,i.useState)(0),f=Math.min(I[p].dpr,window.devicePixelRatio||1),m=(0,i.useRef)({frames:0,t:0,warm:0,low:0,slow:0,flips:0,lastDir:0,level:0,paused:!1}),v=(0,i.useCallback)(()=>{let e=(0,u.xN)();return e?{pose:e.pose,spin:e.spin,vw:e.vw,vh:e.vh,time:e.now/1e3}:null},[]);(0,i.useEffect)(()=>()=>(0,u.vh)(null),[]);let w=(0,i.useCallback)(e=>{if(c)return;let t=m.current;if(t.paused){t.paused=!1,t.frames=0,t.t=0;return}if(t.warm<1.5){t.warm+=Math.min(e,.25);return}if(e>.1){t.slow++,t.slow>=2&&n("perf");return}if(t.frames++,t.t+=e,t.t<1)return;let r=t.frames/t.t;t.frames=0,t.t=0,t.low=r<40?t.low+1:0,r>=40&&(t.slow=0);let i=0;if(r<50?i=-1:r>58&&t.level>0&&(i=1),i&&t.lastDir&&i!==t.lastDir&&t.flips++,i&&(t.lastDir=i),t.low>=3||t.flips>=3||-1===i&&t.level>=I.length-1)return void n("perf");i&&(t.level=Math.max(0,Math.min(I.length-1,t.level-i)),t.warm=.5,d(t.level))},[c,n]),h=(0,i.useCallback)(()=>{let e=(0,u.xN)();e&&(0,o.n)(e.now/1e3,!0),t(()=>(0,u.vh)(e=>{e.woke&&(m.current.paused=!0),(0,o.n)(e.now/1e3,!0)},!0))},[t]);return(0,r.jsx)(a.Hl,{frameloop:"never",dpr:[1,f],flat:!1,gl:{antialias:!0,alpha:!1,stencil:!1,depth:!0,powerPreference:"high-performance",toneMapping:s.aJ8,toneMappingExposure:1},camera:{fov:l._P.fov,position:[0,0,l._P.z],near:l._P.near,far:l._P.far},onCreated:({gl:e})=>{e.transmissionResolutionScale=.5,e.domElement.addEventListener("webglcontextlost",e=>{e.preventDefault(),n("lost")},{once:!0})},style:{position:"absolute",inset:0,pointerEvents:"none"},children:(0,r.jsx)(P,{read:v,map:q,tier:I[p].tier,labelEls:e,pointer:!0,onReady:h,onFrame:w})})}}}]);