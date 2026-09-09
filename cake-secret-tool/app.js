(() => {
  const canvas = document.getElementById('cakeCanvas');
  const ctx = canvas.getContext('2d');
  const DPR = 2;
  const state = {
    shape:'round', mode:'cream', cream:'#fff7ef', topping:'🍓',
    strokes:[], toppings:[], history:[], drawing:false, currentStroke:null,
    preset:'birthday'
  };

  const presets = {
    birthday:{surface:'恭喜又活一年',secret:'其实我最想说的是，谢谢你一直陪着我。',shape:'round',cream:'#fff7ef'},
    cheer:{surface:'你已经很厉害啦',secret:'别总盯着没做到的那些，你已经走了很远。',shape:'star',cream:'#ffd166'},
    luck:{surface:'霉运到此为止',secret:'接下来该轮到你好事连连了。',shape:'cloud',cream:'#b8e0c8'},
    crazy:{surface:'今天禁止内耗',secret:'不许偷偷努力，先奖励自己发疯十分钟。',shape:'square',cream:'#ff9db2'},
    self:{surface:'这一块只给自己',secret:'你也值得被认真庆祝，不需要任何理由。',shape:'heart',cream:'#bca7e8'},
    nothing:{surface:'没什么事 就想吃',secret:'今天没有纪念日，但想到你就想送你一块。',shape:'cloud',cream:'#fff7ef'}
  };

  const ideas = [
    ['一口吃掉焦虑','明天的事明天再焦虑，今天先吃蛋糕。'],
    ['祝今年没有紧急需求','愿你的每一个需求都有排期，每一个Bug都有人认领。'],
    ['钱来 钱来 钱从四面八方来','暴富以后记得养我。'],
    ['别死 加油','你不需要一直状态很好，我会等你慢慢回血。'],
    ['允许你摆烂一天','今天的KPI只有一件：让自己舒服一点。'],
    ['岸上见','愿你写过的每一道题，都变成未来的底气。'],
    ['漂亮得很具体','你最近真的有在闪闪发光。'],
    ['没关系 下辈子注意点','骗你的，这辈子也可以重新来。']
  ];

  function pathForShape(c,x,y,r,shape){
    c.beginPath();
    if(shape==='round') c.arc(x,y,r,0,Math.PI*2);
    else if(shape==='square'){
      const s=r*1.62, rr=36; roundedRectPath(c,x-s/2,y-s/2,s,s,rr);
    } else if(shape==='heart'){
      c.moveTo(x,y+r*.72); c.bezierCurveTo(x-r*1.12,y+r*.05,x-r*.9,y-r*.88,x-r*.26,y-r*.72); c.bezierCurveTo(x,y-r*.98,x+r*.26,y-r*.98,x+r*.5,y-r*.72); c.bezierCurveTo(x+r*1.12,y-r*.55,x+r*1.12,y+r*.08,x,y+r*.72);
    } else if(shape==='cloud'){
      const pts=[[-.72,.28],[-.9,-.02],[-.68,-.36],[-.34,-.38],[-.1,-.7],[.28,-.64],[.48,-.38],[.78,-.26],[.92,.08],[.72,.38],[.34,.5],[-.08,.53],[-.46,.48]];
      c.moveTo(x+pts[0][0]*r,y+pts[0][1]*r); for(let i=1;i<pts.length;i++){let p=pts[i];c.lineTo(x+p[0]*r,y+p[1]*r)} c.closePath();
    } else if(shape==='star'){
      for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5; const rr=i%2===0?r:r*.5; const px=x+Math.cos(a)*rr, py=y+Math.sin(a)*rr; i?c.lineTo(px,py):c.moveTo(px,py)} c.closePath();
    }
  }
  function roundedRectPath(c,x,y,w,h,r){
    c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();
  }

  function cakeGeom(){ return {x:360,y:365,r:220}; }
  function isInsideCake(x,y){
    const {x:cx,y:cy,r}=cakeGeom();
    ctx.save(); pathForShape(ctx,cx,cy,r,state.shape); const inside=ctx.isPointInPath(x,y); ctx.restore(); return inside;
  }

  function draw(){
    ctx.clearRect(0,0,720,720);
    ctx.save(); ctx.globalAlpha=.45; ctx.fillStyle='#fff';
    [[82,112,5],[631,115,4],[120,600,4],[611,570,6],[574,178,3]].forEach(([x,y,r])=>{ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}); ctx.restore();
    const g=cakeGeom();
    ctx.save(); ctx.fillStyle='rgba(112,80,63,.12)'; ctx.beginPath(); ctx.ellipse(g.x,g.y+196,270,52,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#fff8f1'; ctx.beginPath(); ctx.ellipse(g.x,g.y+178,264,45,0,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='rgba(166,126,102,.18)'; ctx.lineWidth=3; ctx.stroke(); ctx.restore();
    ctx.save(); pathForShape(ctx,g.x,g.y+29,g.r,state.shape); ctx.fillStyle='#d8a47d';ctx.shadowColor='rgba(67,42,29,.18)';ctx.shadowBlur=20;ctx.shadowOffsetY=12;ctx.fill();ctx.restore();
    ctx.save(); pathForShape(ctx,g.x,g.y,g.r,state.shape); ctx.fillStyle='#f1c39d';ctx.fill(); ctx.lineWidth=7;ctx.strokeStyle='rgba(112,70,49,.1)';ctx.stroke();
    ctx.clip(); const grad=ctx.createRadialGradient(g.x-80,g.y-100,20,g.x,g.y,280);grad.addColorStop(0,'#fff3e6');grad.addColorStop(1,'#e7b487');ctx.globalAlpha=.45;ctx.fillStyle=grad;ctx.fillRect(0,0,720,720);ctx.restore();

    ctx.save(); pathForShape(ctx,g.x,g.y,g.r-4,state.shape); ctx.clip();
    state.strokes.forEach(s=>drawStroke(s));
    ctx.restore();

    state.toppings.forEach(t=>{ctx.save();ctx.font=`${t.size||48}px Apple Color Emoji,Segoe UI Emoji`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.translate(t.x,t.y);ctx.rotate(t.rot||0);ctx.fillText(t.emoji,0,0);ctx.restore();});

    const txt=document.getElementById('surfaceText').value.trim();
    if(txt){
      ctx.save(); const maxW=310; const fontSize=txt.length>10?28:32; ctx.font=`800 ${fontSize}px -apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif`; const metrics=ctx.measureText(txt); const w=Math.min(maxW,metrics.width+50); const h=62; const px=g.x-w/2, py=g.y+88;
      ctx.beginPath();roundedRectPath(ctx,px,py,w,h,18);ctx.fillStyle='rgba(255,255,255,.92)';ctx.shadowColor='rgba(80,48,35,.16)';ctx.shadowBlur=12;ctx.shadowOffsetY=5;ctx.fill();ctx.shadowColor='transparent';ctx.strokeStyle='rgba(135,91,70,.13)';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#352720';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(txt.length>18?txt.slice(0,18):txt,g.x,py+h/2+1,maxW-28);ctx.restore();
    }
  }

  function drawStroke(s){
    if(!s.points.length) return;
    ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=s.color;ctx.lineWidth=s.width||26;ctx.shadowColor='rgba(91,56,41,.13)';ctx.shadowBlur=5;ctx.shadowOffsetY=3;
    ctx.beginPath();ctx.moveTo(s.points[0].x,s.points[0].y);for(let i=1;i<s.points.length;i++){const p=s.points[i],prev=s.points[i-1];const mx=(prev.x+p.x)/2,my=(prev.y+p.y)/2;ctx.quadraticCurveTo(prev.x,prev.y,mx,my)}ctx.stroke();
    ctx.shadowColor='transparent';ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=(s.width||26)*.22;ctx.beginPath();ctx.moveTo(s.points[0].x-2,s.points[0].y-3);for(let i=1;i<s.points.length;i++){ctx.lineTo(s.points[i].x-2,s.points[i].y-3)}ctx.stroke();ctx.restore();
  }

  function pointerPos(e){const rect=canvas.getBoundingClientRect();return{x:(e.clientX-rect.left)*(canvas.width/rect.width),y:(e.clientY-rect.top)*(canvas.height/rect.height)}}
  canvas.addEventListener('pointerdown',e=>{
    const p=pointerPos(e); if(!isInsideCake(p.x,p.y)) return;
    if(state.mode==='cream'){
      state.drawing=true; state.currentStroke={color:state.cream,width:26,points:[p]}; state.strokes.push(state.currentStroke); canvas.setPointerCapture(e.pointerId);
    } else {
      saveHistory(); state.toppings.push({emoji:state.topping,x:p.x,y:p.y,size:46+Math.random()*12,rot:(Math.random()-.5)*.45}); draw();
    }
  });
  canvas.addEventListener('pointermove',e=>{if(!state.drawing||state.mode!=='cream')return;const p=pointerPos(e);if(isInsideCake(p.x,p.y)){state.currentStroke.points.push(p);draw();}});
  const stopDraw=()=>{if(state.drawing){state.drawing=false;state.currentStroke=null;saveHistory();}};
  canvas.addEventListener('pointerup',stopDraw);canvas.addEventListener('pointercancel',stopDraw);

  function saveHistory(){
    state.history.push(JSON.stringify({strokes:state.strokes,toppings:state.toppings})); if(state.history.length>30)state.history.shift();
  }
  function initialHistory(){state.history=[JSON.stringify({strokes:[],toppings:[]})]}
  initialHistory();

  document.querySelectorAll('.tool[data-mode]').forEach(b=>b.addEventListener('click',()=>{
    state.mode=b.dataset.mode;document.querySelectorAll('.tool[data-mode]').forEach(x=>x.classList.toggle('active',x===b));
    const topping=state.mode==='topping';document.getElementById('modeHint').textContent=topping?'点一下蛋糕，放下配料':'按住拖动，挤奶油';document.getElementById('statusText').textContent=topping?`配料模式：点击蛋糕放置 ${state.topping}`:'奶油模式：在蛋糕上按住并拖动';
  }));
  document.getElementById('shapeList').addEventListener('click',e=>{const b=e.target.closest('[data-shape]');if(!b)return;state.shape=b.dataset.shape;document.querySelectorAll('.shape').forEach(x=>x.classList.toggle('active',x===b));draw();});
  document.getElementById('colorList').addEventListener('click',e=>{const b=e.target.closest('[data-color]');if(!b)return;state.cream=b.dataset.color;document.querySelectorAll('.swatch').forEach(x=>x.classList.toggle('active',x===b));state.mode='cream';document.querySelectorAll('.tool[data-mode]').forEach(x=>x.classList.toggle('active',x.dataset.mode==='cream'));document.getElementById('statusText').textContent='奶油模式：在蛋糕上按住并拖动';});
  document.getElementById('toppingList').addEventListener('click',e=>{const b=e.target.closest('[data-top]');if(!b)return;state.topping=b.dataset.top;document.querySelectorAll('.topper').forEach(x=>x.classList.toggle('active',x===b));state.mode='topping';document.querySelectorAll('.tool[data-mode]').forEach(x=>x.classList.toggle('active',x.dataset.mode==='topping'));document.getElementById('statusText').textContent=`配料模式：点击蛋糕放置 ${state.topping}`;});
  document.getElementById('surfaceText').addEventListener('input',draw);

  document.getElementById('undoBtn').addEventListener('click',()=>{
    if(state.history.length>1)state.history.pop(); const prev=JSON.parse(state.history[state.history.length-1]);state.strokes=prev.strokes;state.toppings=prev.toppings;draw();
  });
  document.getElementById('cleanBtn').addEventListener('click',()=>{state.strokes=[];state.toppings=[];saveHistory();draw();showToast('装饰已清空');});
  document.getElementById('crazyBtn').addEventListener('click',crazy);
  function crazy(){
    const colors=['#ff9db2','#ffd166','#b8e0c8','#bca7e8','#fff7ef','#704c3d']; const emojis=['🍓','🍒','🫐','🎀','🍀','💰','☕','💻','🐱','🔥']; const g=cakeGeom();
    for(let k=0;k<8;k++){let pts=[];for(let i=0;i<7;i++){const a=Math.random()*Math.PI*2,rad=Math.random()*g.r*.7;pts.push({x:g.x+Math.cos(a)*rad,y:g.y+Math.sin(a)*rad})}state.strokes.push({color:colors[Math.floor(Math.random()*colors.length)],width:20+Math.random()*18,points:pts});}
    for(let k=0;k<11;k++){let p;do{p={x:135+Math.random()*450,y:145+Math.random()*430}}while(!isInsideCake(p.x,p.y));state.toppings.push({emoji:emojis[Math.floor(Math.random()*emojis.length)],x:p.x,y:p.y,size:38+Math.random()*18,rot:(Math.random()-.5)*.8});}
    saveHistory();draw();showToast('精神状态已加入蛋糕 💥');
  }

  document.getElementById('presetRow').addEventListener('click',e=>{const b=e.target.closest('[data-preset]');if(!b)return;applyPreset(b.dataset.preset);});
  function applyPreset(key){
    state.preset=key; const p=presets[key];document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x.dataset.preset===key));document.getElementById('surfaceText').value=p.surface;document.getElementById('secretText').value=p.secret;state.shape=p.shape;state.cream=p.cream;
    document.querySelectorAll('.shape').forEach(x=>x.classList.toggle('active',x.dataset.shape===p.shape));document.querySelectorAll('.swatch').forEach(x=>x.classList.toggle('active',x.dataset.color===p.cream));
    document.getElementById('suggestText').textContent='例如：'+p.surface;draw();
  }

  document.getElementById('randomBtn').addEventListener('click',()=>{const [s,h]=ideas[Math.floor(Math.random()*ideas.length)];document.getElementById('surfaceText').value=s;document.getElementById('secretText').value=h;draw();showToast('换了一组灵感');});
  document.getElementById('resetBtn').addEventListener('click',()=>{state.strokes=[];state.toppings=[];initialHistory();applyPreset('birthday');showToast('重新做一块');});

  const reveal=document.getElementById('revealPage'),stage=document.getElementById('revealStage');
  document.getElementById('previewBtn').addEventListener('click',()=>{
    draw(); const url=canvas.toDataURL('image/png');document.getElementById('leftPiece').style.backgroundImage=`url(${url})`;document.getElementById('rightPiece').style.backgroundImage=`url(${url})`;document.getElementById('secretRevealText').textContent=document.getElementById('secretText').value.trim()||'这里藏着一句还没写的话。';document.getElementById('revealSurface').textContent='“'+(document.getElementById('surfaceText').value.trim()||'送你一块蛋糕')+'”';stage.classList.remove('cut');document.getElementById('cutBtn').textContent='🔪 切开看看';reveal.classList.add('show');document.body.style.overflow='hidden';
  });
  document.getElementById('cutBtn').addEventListener('click',()=>{stage.classList.add('cut');document.getElementById('cutBtn').textContent='蛋糕里有句话给你 💌';});
  document.getElementById('backBtn').addEventListener('click',()=>{reveal.classList.remove('show');document.body.style.overflow='';});
  document.getElementById('shareBtn').addEventListener('click',async()=>{
    const surface=document.getElementById('surfaceText').value.trim()||'送你一块蛋糕'; const secret=document.getElementById('secretText').value.trim(); const shareText=`我给你做了一块蛋糕：${surface}\n切开后还有一句悄悄话。`;
    if(navigator.share){try{await navigator.share({title:'给你一块',text:shareText});return;}catch(e){}}
    try{await navigator.clipboard.writeText(shareText);showToast('分享文案已复制');}catch(e){showToast('可以截图分享给 TA');}
  });
  function showToast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),1700)}

  state.strokes=[{color:'#fff7ef',width:28,points:[{x:220,y:292},{x:270,y:260},{x:325,y:276},{x:380,y:250},{x:438,y:282},{x:495,y:260}]}];
  state.toppings=[{emoji:'🍓',x:260,y:385,size:52,rot:-.15},{emoji:'🍓',x:458,y:360,size:50,rot:.18},{emoji:'🎀',x:365,y:214,size:49,rot:0}];saveHistory();draw();
})();
