(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const canvas = $('cakeCanvas'), ctx = canvas.getContext('2d');
  const film = $('filmCanvas'), fc = film.getContext('2d');
  const KEY = 'cake-note-studio-v2';
  const COLORS = [['香草','#fff5df'],['草莓','#efb4bd'],['抹茶','#bdc7a3'],['芋泥','#c7bbd5'],['芒果','#edce87'],['可可','#96715f']];
  const FLAVORS = {vanilla:['原味','#e8bf85','#f6d7a7'], cocoa:['可可','#80543d','#b38360'], strawberry:['草莓','#d79d99','#efbfaf']};
  const SHAPES = {round:['圆形','M35 20a15 15 0 1 1-30 0a15 15 0 1 1 30 0'],heart:['爱心','M20 35C-9 16 9-2 20 12C31-2 49 16 20 35Z'],flower:['花朵','M20 8C27-3 39 6 32 16C45 20 36 36 27 30C24 43 9 39 11 28C-3 29 0 12 12 14C8 3 18 1 20 8Z'],cloud:['云朵','M8 30C-3 30 0 15 9 16C8 1 27 0 28 14C42 9 44 29 33 30Z'],square:['方形','M6 6H34V34H6Z']};
  const TOPPINGS = {strawberry:'草莓',blueberry:'蓝莓',cherry:'樱桃',flower:'小花',bow:'蝴蝶结',candle:'蜡烛'};
  const steps = ['蛋糕胚','奶油','装饰','藏句话','送给你'];
  const blank = () => ({version:2,shape:'round',flavor:'vanilla',coat:null,strokes:[],toppings:[],message:'',recipient:'',sender:'',step:0});
  let state = blank(), history=[], future=[], tool='pipe', cream=COLORS[0][1], topping='strawberry', size=29;
  let drawing=null, lastPoint=null, toastTimer, animation=0, exporting=false, cancelRequested=false, recording=null, exportBlob=null;
  let saved=false, saveTimer, textSnapshot=null;
  try {const raw=JSON.parse(localStorage.getItem(KEY));if(validDraft(raw)){state=raw;saved=true;}} catch (_) {}
  function validDraft(s){return s?.version===2 && s.shape in SHAPES && s.flavor in FLAVORS && Array.isArray(s.strokes) && s.strokes.length<=500 && s.strokes.every(v=>Array.isArray(v.points)&&v.points.length<=6000&&v.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y))) && Array.isArray(s.toppings) && s.toppings.length<=400 && s.toppings.every(t=>t.kind in TOPPINGS&&Number.isFinite(t.x)&&Number.isFinite(t.y)) && typeof s.message==='string' && s.message.length<=160 && typeof s.sender==='string' && typeof s.recipient==='string' && Number.isInteger(s.step)&&s.step>=0&&s.step<=4;}
  const clone = v => JSON.parse(JSON.stringify(v));
  function remember(){flushText();history.push(clone(state));if(history.length>70)history.shift();future=[];}
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));$('draftStatus').textContent='草稿已保存';}catch(_){$('draftStatus').textContent='当前浏览器无法保存草稿';}}
  function changed(redraw=true){saved=true;persist();syncHistory();if(redraw)draw();}
  function syncHistory(){$('undoBtn').disabled=!history.length&&!textSnapshot;$('redoBtn').disabled=!future.length;}
  function flushText(){if(!textSnapshot)return;if(JSON.stringify(textSnapshot)!==JSON.stringify(state)){history.push(textSnapshot);if(history.length>70)history.shift();future=[];}textSnapshot=null;clearTimeout(saveTimer);syncHistory();}
  function undo(){endDraw();flushText();if(!history.length)return;future.push(clone(state));state=history.pop();renderUI();changed();}
  function redo(){endDraw();flushText();if(!future.length)return;history.push(clone(state));state=future.pop();renderUI();changed();}
  function toast(t){$('toast').textContent=t;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3000);}
  function setStep(n){endDraw();flushText();state.step=Math.max(0,Math.min(4,n));if(state.step===1&&!['pipe','rosette'].includes(tool))tool='pipe';if(state.step===2&&!['place','move','erase'].includes(tool))tool='place';renderUI();persist();draw();}
  function heading(k,title,body){return `<p class="eyebrow">${k}</p><h1>${title}</h1><p class="intro">${body}</p>`;}
  function palette(){return `<div class="palette">${COLORS.map(([n,c])=>`<button class="swatch ${c===cream?'selected':''}" data-color="${c}" aria-label="${n}奶油" aria-pressed="${c===cream}" style="--swatch:${c}"><i></i><small>${n}</small></button>`).join('')}</div>`;}
  function renderUI(){
    $('stepNav').innerHTML=steps.map((n,i)=>`<button class="step-tab ${i===state.step?'active':''}" data-step="${i}" ${i===state.step?'aria-current="step"':''}><span>0${i+1}</span>${n}</button>`).join('');
    const panel=$('stepContent');
    if(state.step===0)panel.innerHTML=heading('01 / THE BEGINNING','先选一块蛋糕胚。','圆圆的，或是特别一点。<br>这块蛋糕，慢慢做成你的样子。')+`<div class="field-label">挑个形状</div><div class="shape-options">${Object.entries(SHAPES).map(([k,[n,p]])=>`<button class="shape-option ${k===state.shape?'selected':''}" data-shape="${k}" aria-label="${n}蛋糕胚" aria-pressed="${k===state.shape}"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="${p}"/></svg><small>${n}</small></button>`).join('')}</div><div class="field-label">蛋糕口味</div><div class="flavors">${Object.entries(FLAVORS).map(([k,[n]])=>`<button class="flavor ${k===state.flavor?'selected':''}" data-flavor="${k}">${n}</button>`).join('')}</div><p class="recipe-note">下一步，给它抹上奶油。<br>做错了也没关系，随时可以撤销。</p>`;
    if(state.step===1)panel.innerHTML=heading('02 / A LITTLE CREAM','给它一层温柔。','先铺满奶油，再亲手挤上花纹。<br>不必整齐，你做的就很好。')+`<div class="field-label">奶油颜色</div>${palette()}<div class="tool-options"><button class="tool-option ${tool==='pipe'?'selected':''}" data-tool="pipe">〰 挤奶油</button><button class="tool-option ${tool==='rosette'?'selected':''}" data-tool="rosette">✿ 挤奶油花</button></div><button class="secondary full-width" id="coatBtn">用这个颜色铺满奶油</button><label class="tool-line">粗细 <input id="brushSize" aria-label="奶油粗细" type="range" min="12" max="44" value="${size}"></label><p class="recipe-note">手指按住蛋糕拖动，就能留下奶油。<br>点一下，也能挤出一朵小奶油花。</p>`;
    if(state.step===2)panel.innerHTML=heading('03 / FINISHING TOUCHES','放一点小小的快乐。','选一颗水果，点在蛋糕上。<br>多放一点也可以。')+`<div class="toppings">${Object.entries(TOPPINGS).map(([k,n])=>`<button class="topping ${k===topping?'selected':''}" data-topping="${k}" aria-pressed="${k===topping}"><canvas width="96" height="96" data-icon="${k}" aria-hidden="true"></canvas><small>${n}</small></button>`).join('')}</div><div class="tool-options"><button class="tool-option ${tool==='move'?'selected':''}" data-tool="move">↔ 移动装饰</button><button class="tool-option ${tool==='erase'?'selected':''}" data-tool="erase">× 移除装饰</button></div><button class="secondary full-width" id="rimBtn">沿边缘挤一圈奶油花</button><p class="recipe-note">选中「移动装饰」后可以拖动摆好的配料。<br>每次摆放、移动和移除，都可以单独撤销。</p>`;
    if(state.step===3){panel.innerHTML=heading('04 / JUST BETWEEN US','把话，藏在里面。','蛋糕表面不写字。<br>只有切开后，这句话才会出现。')+`<label class="field-label" for="recipient">送给 <small>选填</small></label><input id="recipient" type="text" maxlength="16" placeholder="一个值得收到蛋糕的人" autocomplete="off"><label class="field-label" for="message">想悄悄说的话</label><textarea id="message" maxlength="120" placeholder="今天没有纪念日，\n但想到你，就想送你一块蛋糕。"></textarea><div class="message-meta"><span>留言只在切开后揭晓</span><span id="messageCount">${state.message.length} / 120</span></div><div class="ideas"><button class="idea" data-idea="今天没有纪念日，但想到你，就想送你一块蛋糕。">没理由，只想你</button><button class="idea" data-idea="祝你暴富。\n暴富以后，记得养我。">一点小心愿</button><button class="idea" data-idea="不需要一直很厉害。\n在我这里，你可以休息一下。">给你撑腰</button></div><label class="field-label" for="sender">落款 <small>选填</small></label><input id="sender" type="text" maxlength="16" placeholder="你的名字" autocomplete="off">`;for(const k of ['recipient','message','sender'])$(k).value=state[k];}
    if(state.step===4)panel.innerHTML=heading('05 / MADE FOR SOMEONE','好了，送给你。','这一块独一无二。<br>让藏在里面的话，慢慢被看见。')+`<ol class="finish-list"><li><b>01</b> 先看到，你亲手做的完整蛋糕</li><li><b>02</b> 轻轻切开，蛋糕向两边分开</li><li><b>03</b> 留言出现，把心意送到</li></ol><p class="recipe-note">预览后可直接导出竖屏小视频。<br>保存到手机，或直接把视频发给朋友。</p><button id="saveImage" class="text-btn">也可以保存完整蛋糕图片 ↓</button>`;
    $('prevBtn').disabled=state.step===0;
    $('nextBtn').innerHTML=state.step===4?'预览与导出 <span>↗</span>':'下一步 <span>→</span>';
    updateHint();syncHistory();
    panel.querySelectorAll('[data-icon]').forEach(el=>{const c=el.getContext('2d');c.translate(48,54);drawTopping(c,{kind:el.dataset.icon,size:27,rot:0},false);});
  }
  function updateHint(){const hints=['先挑一个喜欢的形状。',tool==='rosette'?'按住拖动，挤出一串奶油花。':'按住拖动挤奶油，点一下也可以。',tool==='move'?'按住装饰，拖到喜欢的位置。':tool==='erase'?'点一下想移除的装饰。':'选好配料，点在蛋糕上。','把想说的话写在右侧或下方，切开后才会出现。','蛋糕做好了。去看看里面的小惊喜。'];$('stageHint').textContent=hints[state.step];canvas.style.cursor=state.step===1?'crosshair':state.step===2?(tool==='move'?'grab':'crosshair'):'default';}
  $('stepNav').onclick=e=>{const b=e.target.closest('[data-step]');if(b)setStep(+b.dataset.step);};
  $('stepContent').onclick=e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.shape){remember();state.shape=b.dataset.shape;renderUI();changed();}
    if(b.dataset.flavor){remember();state.flavor=b.dataset.flavor;renderUI();changed();}
    if(b.dataset.color){cream=b.dataset.color;renderUI();}
    if(b.dataset.tool){tool=b.dataset.tool;renderUI();}
    if(b.dataset.topping){topping=b.dataset.topping;tool='place';renderUI();}
    if(b.id==='coatBtn'){remember();state.coat=cream;changed();toast('奶油铺好了，继续挤点花纹吧');}
    if(b.id==='rimBtn'){if(state.strokes.length>=480){toast('装饰已经很多了，先撤销一些吧');return;}remember();const points=outline(state.shape);const step=Math.max(1,Math.floor(points.length/34));for(let i=0;i<points.length;i+=step){const p=points[i];state.strokes.push({kind:'rosette',color:cream,size:21,points:[{x:p.x*.90,y:p.y*.90}]});}changed();}
    if(b.dataset.idea){remember();state.message=b.dataset.idea;renderUI();changed();}
    if(b.id==='saveImage')saveImage();
  };
  $('stepContent').addEventListener('input',e=>{const el=e.target;if(el.id==='brushSize'){size=+el.value;return;}if(['message','recipient','sender'].includes(el.id)){if(!textSnapshot)textSnapshot=clone(state);state[el.id]=el.value;if(el.id==='message')$('messageCount').textContent=`${el.value.length} / 120`;clearTimeout(saveTimer);saveTimer=setTimeout(flushText,700);changed(false);}});
  $('stepContent').addEventListener('focusout',flushText);
  $('prevBtn').onclick=()=>setStep(state.step-1);
  $('nextBtn').onclick=()=>{if(state.step===4)openPreview();else setStep(state.step+1);};
  $('undoBtn').onclick=undo;$('redoBtn').onclick=redo;
  document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA/.test(e.target.tagName)||$('previewDialog').open)return;if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();e.shiftKey?redo():undo();}});
  $('resetBtn').onclick=()=>$('resetDialog').showModal();$('cancelReset').onclick=()=>$('resetDialog').close();$('confirmReset').onclick=()=>{state=blank();history=[];future=[];textSnapshot=null;tool='pipe';cream=COLORS[0][1];$('resetDialog').close();renderUI();changed();};

  // Every decoration is drawn locally, so preview, PNG and video share the same renderer.
  const outlineCache={};
  function outline(shape){if(outlineCache[shape])return outlineCache[shape];let a=[];for(let i=0;i<160;i++){const t=i/160*Math.PI*2;let x,y;if(shape==='heart'){x=16*Math.sin(t)**3*12.6;y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*12.6;}else if(shape==='square'){x=185*Math.sign(Math.cos(t))*Math.abs(Math.cos(t))**.35;y=185*Math.sign(Math.sin(t))*Math.abs(Math.sin(t))**.35;}else if(shape==='flower'){const r=179+23*Math.cos(t*6);x=r*Math.cos(t);y=r*Math.sin(t);}else if(shape==='cloud'){const r=178+19*Math.sin(5*t);x=1.12*r*Math.cos(t);y=.80*r*Math.sin(t);}else{x=202*Math.cos(t);y=202*Math.sin(t);}a.push({x,y});}outlineCache[shape]=a;return a;}
  function shapePath(c,shape){const a=outline(shape);c.beginPath();a.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.closePath();}
  function inside(p,margin=1){const c=hitContext;c.setTransform(1,0,0,1,0,0);shapePath(c,state.shape);return c.isPointInPath(p.x/margin,p.y/margin);}
  const hitContext=document.createElement('canvas').getContext('2d');
  function tint(hex,delta){return '#'+hex.slice(1).match(/../g).map(n=>Math.min(255,Math.max(0,parseInt(n,16)+delta)).toString(16).padStart(2,'0')).join('');}
  function ellipse(c,x,y,rx,ry,color){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=color;c.fill();}
  function rosette(c,x,y,r,color){c.save();c.translate(x,y);c.shadowColor='#6d48252a';c.shadowBlur=4;c.shadowOffsetY=3;const grad=c.createRadialGradient(-r*.3,-r*.35,1,0,0,r);grad.addColorStop(0,tint(color,15));grad.addColorStop(.7,color);grad.addColorStop(1,tint(color,-24));c.fillStyle=grad;c.beginPath();for(let i=0;i<=90;i++){const a=i/90*Math.PI*2,rr=r*(.86+.14*Math.cos(a*9));i?c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr*.8):c.moveTo(Math.cos(a)*rr,Math.sin(a)*rr*.8);}c.fill();c.shadowColor='transparent';c.strokeStyle='#ffffff65';c.lineWidth=1.4;c.beginPath();for(let i=0;i<=50;i++){const a=i/50*Math.PI*4,rr=r*.68*(1-i/58);const x=Math.cos(a)*rr,y=Math.sin(a)*rr*.8;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();c.restore();}
  function drawTopping(c,t,shadow=true){c.save();c.rotate(t.rot||0);const r=t.size||29;c.scale(r/29,r/29);if(shadow){c.shadowColor='#49342235';c.shadowBlur=7;c.shadowOffsetY=5;}
    if(t.kind==='strawberry'){const g=c.createLinearGradient(-16,-28,15,20);g.addColorStop(0,'#e87568');g.addColorStop(.45,'#c94039');g.addColorStop(1,'#8e2527');c.fillStyle=g;c.beginPath();c.moveTo(0,25);c.bezierCurveTo(-9,22,-29,-2,-22,-19);c.bezierCurveTo(-17,-31,15,-33,23,-17);c.bezierCurveTo(31,0,9,24,0,25);c.fill();c.shadowColor='transparent';for(let row=0;row<4;row++){for(let i=0;i<4-row%2;i++){const x=(i-(3-row%2)/2)*9,y=-15+row*10;if(Math.abs(x)<22-row*3)ellipse(c,x,y,1.15,2,'#ffdc9e');}}c.fillStyle='#59774b';for(let i=0;i<5;i++){c.save();c.translate(0,-23);c.rotate((i-2)*.67);c.beginPath();c.moveTo(0,2);c.quadraticCurveTo(-8,-7,0,-14);c.quadraticCurveTo(5,-6,0,2);c.fill();c.restore();}}
    if(t.kind==='blueberry'){for(const [x,y,r] of [[-11,1,16],[11,6,15],[0,-12,15]]){const g=c.createRadialGradient(x-5,y-6,1,x,y,r);g.addColorStop(0,'#8798b5');g.addColorStop(.6,'#506387');g.addColorStop(1,'#34445f');ellipse(c,x,y,r,r,g);c.shadowColor='transparent';c.fillStyle='#283750';c.beginPath();for(let i=0;i<10;i++){let a=i*Math.PI/5,rr=i%2?3:6;i?c.lineTo(x+Math.cos(a)*rr,y-3+Math.sin(a)*rr):c.moveTo(x+Math.cos(a)*rr,y-3+Math.sin(a)*rr);}c.closePath();c.fill();}}
    if(t.kind==='cherry'){c.shadowColor='transparent';c.strokeStyle='#65704a';c.lineWidth=2.6;c.beginPath();c.moveTo(-14,4);c.quadraticCurveTo(-13,-20,9,-32);c.quadraticCurveTo(7,-12,16,6);c.stroke();for(const [x,y] of [[-14,9],[15,11]]){const g=c.createRadialGradient(x-5,y-7,0,x,y,17);g.addColorStop(0,'#e26c63');g.addColorStop(.4,'#b73940');g.addColorStop(1,'#772631');ellipse(c,x,y,16,17,g);ellipse(c,x-5,y-7,3,2,'#ffdbbcaa');}}
    if(t.kind==='flower'){for(let i=0;i<5;i++){const a=i*Math.PI*2/5;ellipse(c,Math.cos(a)*14,Math.sin(a)*14,12,11,'#fff8e6');}c.shadowColor='transparent';ellipse(c,0,0,9,9,'#dcb35b');ellipse(c,-2,-3,4,3,'#edce83');}
    if(t.kind==='bow'){c.fillStyle='#ae5360';c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-43,-37,-38,29,0,0);c.bezierCurveTo(43,-37,38,29,0,0);c.fill();c.fillStyle='#c36c76';c.beginPath();c.moveTo(-5,1);c.lineTo(-19,34);c.lineTo(-7,28);c.lineTo(0,33);c.lineTo(7,3);c.moveTo(4,1);c.lineTo(23,27);c.lineTo(10,25);c.lineTo(7,32);c.lineTo(-4,3);c.fill();c.shadowColor='transparent';ellipse(c,0,0,7,9,'#d99098');c.strokeStyle='#e5aab0';c.lineWidth=2;c.beginPath();c.moveTo(-7,-3);c.quadraticCurveTo(-28,-18,-24,-2);c.moveTo(7,-3);c.quadraticCurveTo(28,-18,24,-2);c.stroke();}
    if(t.kind==='candle'){c.fillStyle='#f6e0b9';c.fillRect(-6,-36,12,57);c.shadowColor='transparent';c.save();c.beginPath();c.rect(-6,-36,12,57);c.clip();c.strokeStyle='#b77770';c.lineWidth=4;for(let y=-45;y<30;y+=14){c.beginPath();c.moveTo(-10,y);c.lineTo(10,y+12);c.stroke();}c.restore();c.strokeStyle='#5d4b37';c.lineWidth=2;c.beginPath();c.moveTo(0,-36);c.lineTo(0,-43);c.stroke();c.fillStyle='#e9b655';c.beginPath();c.moveTo(0,-66);c.bezierCurveTo(17,-45,6,-38,0,-41);c.bezierCurveTo(-12,-44,-4,-57,0,-66);c.fill();ellipse(c,0,-47,3,6,'#fff2b5');}
    c.restore();
  }
  const cakeLayer=document.createElement('canvas');cakeLayer.width=1080;cakeLayer.height=1020;const lc=cakeLayer.getContext('2d');let dirty=true;
  function paintCake(){lc.setTransform(1.5,0,0,1.5,0,0);lc.clearRect(0,0,720,680);const colors=FLAVORS[state.flavor];
    // Extruded shape, with two sponge layers and a filling seam.
    for(let depth=87;depth>=0;depth-=2){lc.save();lc.translate(360,296+depth);lc.scale(1,.66);shapePath(lc,state.shape);let color=state.coat?tint(state.coat,-26+Math.floor((87-depth)/12)):(depth>51?colors[1]:depth>37?'#fff0d0':colors[1]);lc.fillStyle=color;lc.fill();lc.restore();}
    lc.save();lc.translate(360,296);lc.scale(1,.66);shapePath(lc,state.shape);const g=lc.createLinearGradient(-180,-180,200,220);g.addColorStop(0,state.coat?tint(state.coat,9):colors[1]);g.addColorStop(1,state.coat||colors[0]);lc.fillStyle=g;lc.fill();lc.strokeStyle=state.coat?tint(state.coat,-12):'#d6ad7a';lc.lineWidth=1.5;lc.stroke();lc.clip();
    if(!state.coat){for(let i=0;i<450;i++){let x=Math.sin(i*78.233)*223,y=Math.cos(i*17.37)*221;ellipse(lc,x,y,.7+(i%3)*.4,.8,i%2?'#ffffff24':'#9c713d18');}}
    for(const s of state.strokes){if(s.kind==='rosette'){for(const p of s.points)rosette(lc,p.x,p.y,s.size*.6,s.color);}else{lc.save();lc.lineWidth=s.size;lc.strokeStyle=s.color;lc.lineCap='round';lc.lineJoin='round';lc.shadowColor='#6d482535';lc.shadowBlur=4;lc.shadowOffsetY=4;lc.beginPath();s.points.forEach((p,i)=>i?lc.lineTo(p.x,p.y):lc.moveTo(p.x,p.y));if(s.points.length===1){const p=s.points[0];ellipse(lc,p.x,p.y,s.size/2,s.size/2,s.color);}else lc.stroke();lc.shadowColor='transparent';lc.strokeStyle='#ffffff4a';lc.lineWidth=s.size*.2;lc.translate(-2,-3);lc.stroke();lc.restore();}}
    lc.restore();
    state.toppings.slice().sort((a,b)=>a.y-b.y).forEach(t=>{if(!inside(t))return;lc.save();lc.translate(360+t.x,296+t.y*.66);drawTopping(lc,t);lc.restore();});dirty=false;
  }
  function cakeScene(c,split=0){if(dirty)paintCake();c.save();c.shadowColor='#725b402a';c.shadowBlur=25;c.shadowOffsetY=14;ellipse(c,360,422,270,107,'#ebe3d6');c.shadowColor='transparent';ellipse(c,360,412,276,109,'#fffcf4');c.strokeStyle='#d7cbbc';c.lineWidth=1;c.beginPath();c.ellipse(360,412,261,97,0,0,Math.PI*2);c.stroke();c.strokeStyle='#efe6d8';c.beginPath();c.ellipse(360,412,240,85,0,0,Math.PI*2);c.stroke();c.restore();
    for(const side of [-1,1]){c.save();c.translate(side*split,split*.10);c.beginPath();c.rect(side<0?0:360,0,360,680);c.clip();c.drawImage(cakeLayer,0,0,720,680);c.restore();}
    if(split>1){const top=outline(state.shape).filter(p=>Math.abs(p.x)<12);const ys=top.map(p=>296+p.y*.66);const y1=Math.min(...ys),y2=Math.max(...ys);for(const side of [-1,1]){const x=360+side*split;const w=Math.min(17,split*.38);c.save();c.beginPath();c.moveTo(x,y1+split*.1);c.lineTo(x-side*w,y1+15+split*.1);c.lineTo(x-side*w,y2+78+split*.1);c.lineTo(x,y2+87+split*.1);c.closePath();c.clip();c.fillStyle=FLAVORS[state.flavor][1];c.fillRect(x-w-1,y1,w*2+2,y2-y1+110);for(let y=y1+32;y<y2+80;y+=55){c.fillStyle='#fff0db';c.fillRect(x-w-1,y,w*2+2,9);}c.restore();}}
  }
  function draw(){dirty=true;ctx.setTransform(1.5,0,0,1.5,0,0);ctx.clearRect(0,0,720,680);cakeScene(ctx);}
  function pos(e){const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*720-360,y:((e.clientY-r.top)/r.height*680-296)/.66};}
  function topAt(p){for(let i=state.toppings.length-1;i>=0;i--){const t=state.toppings[i];if(Math.hypot(t.x-p.x,(t.y-p.y)*.66)<t.size*1.35)return i;}return -1;}
  canvas.addEventListener('pointerdown',e=>{if(drawing||state.step<1||state.step>2)return;const p=pos(e);if(!inside(p,.98))return;e.preventDefault();canvas.setPointerCapture(e.pointerId);
    if(state.step===1){if(state.strokes.length>=480){toast('这块蛋糕装饰得很满啦');return;}remember();const s={kind:tool==='rosette'?'rosette':'pipe',color:cream,size,points:[p]};state.strokes.push(s);drawing={kind:'stroke',stroke:s,id:e.pointerId};lastPoint=p;}
    else if(tool==='move'||tool==='erase'){const i=topAt(p);if(i<0)return;remember();if(tool==='erase'){state.toppings.splice(i,1);changed();return;}drawing={kind:'move',index:i,id:e.pointerId,offset:{x:state.toppings[i].x-p.x,y:state.toppings[i].y-p.y}};}
    else{if(state.toppings.length>=400){toast('配料已经很丰富啦');return;}remember();state.toppings.push({kind:topping,x:p.x,y:p.y,size:29,rot:(Math.random()-.5)*.32});changed();return;}draw();syncHistory();
  });
  canvas.addEventListener('pointermove',e=>{if(!drawing||e.pointerId!==drawing.id)return;const p=pos(e);if(drawing.kind==='move'){const q={x:p.x+drawing.offset.x,y:p.y+drawing.offset.y};if(inside(q,.95))Object.assign(state.toppings[drawing.index],q);}else if(inside(p)){const s=drawing.stroke;const min=s.kind==='rosette'?s.size*.88:3;if(Math.hypot(p.x-lastPoint.x,p.y-lastPoint.y)>min&&s.points.length<6000){s.points.push(p);lastPoint=p;}}draw();});
  function endDraw(){if(!drawing)return;const id=drawing.id;drawing=null;if(canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);changed();}
  canvas.addEventListener('pointerup',endDraw);canvas.addEventListener('pointercancel',endDraw);canvas.addEventListener('lostpointercapture',endDraw);

  const ease = x => {x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
  const duration=()=>Math.max(10,5.2+Array.from(state.message).length*.13);
  function textLines(c,text,maxWidth){const lines=[];let paragraphs=text.replace(/\n{3,}/g,'\n\n').split('\n');if(paragraphs.length>6)paragraphs=[paragraphs.filter(Boolean).join(' ')];for(const paragraph of paragraphs){let line='';for(const ch of Array.from(paragraph)){if(line&&c.measureText(line+ch).width>maxWidth){lines.push(line);line=ch;}else line+=ch;}lines.push(line);}return lines;}
  function drawFilm(t=0){const c=fc;const split=ease((t-2.9)/1.15)*64,reveal=ease((t-3.8)/1);c.setTransform(1,0,0,1,0,0);c.fillStyle='#f7f3eb';c.fillRect(0,0,720,1280);
    c.strokeStyle='#d8cabb';c.lineWidth=1;c.strokeRect(28,28,664,1224);c.textAlign='center';c.fillStyle='#986754';c.font='17px Georgia,serif';c.fillText('A CAKE, JUST FOR YOU',360,110);c.fillStyle='#493e32';c.font='38px "Songti SC","Noto Serif CJK SC",serif';c.fillText(state.recipient?`给 ${state.recipient}`:'亲手做了一块，送给你。',360,172,590);
    c.save();c.translate(0,72-reveal*18);cakeScene(c,split);c.restore();
    if(t>=2&&t<3.75){const down=ease((t-2)/.75),out=ease((t-3.05)/.7);c.save();c.globalAlpha=1-out;c.translate(360,170+down*205);c.rotate(-.10);const blade=c.createLinearGradient(-12,0,22,0);blade.addColorStop(0,'#b6babc');blade.addColorStop(.55,'#f5f6f4');blade.addColorStop(1,'#a0a6a8');c.fillStyle=blade;c.beginPath();c.moveTo(-12,-100);c.lineTo(20,-100);c.lineTo(14,105);c.quadraticCurveTo(-12,84,-12,65);c.closePath();c.fill();c.fillStyle='#6d4a38';c.fillRect(-12,-174,31,76);ellipse(c,3,-159,2,2,'#c5b3a1');ellipse(c,3,-118,2,2,'#c5b3a1');c.restore();}
    if(reveal>0){c.save();c.globalAlpha=reveal;c.translate(0,(1-reveal)*65);const text=state.message.trim();let fs=32;c.font=`${fs}px "Songti SC","Noto Serif CJK SC",serif`;let lines=textLines(c,text,474);while(lines.length*fs*1.65>320&&fs>22){fs--;c.font=`${fs}px "Songti SC","Noto Serif CJK SC",serif`;lines=textLines(c,text,474);}const height=Math.max(256,lines.length*fs*1.65+130);const y=647;c.shadowColor='#67412613';c.shadowBlur=20;c.shadowOffsetY=10;c.fillStyle='#fffdf7';c.fillRect(85,y,550,height);c.shadowColor='transparent';c.fillStyle='#883c33';c.font='13px Georgia,serif';c.fillText('A NOTE INSIDE',360,y+42);c.fillStyle='#4c4035';c.font=`${fs}px "Songti SC","Noto Serif CJK SC",serif`;lines.forEach((line,i)=>c.fillText(line,360,y+92+i*fs*1.65));if(state.sender){c.font='18px "Songti SC","Noto Serif CJK SC",serif';c.fillStyle='#8b7062';c.fillText(`— ${state.sender}`,360,y+height-28);}c.restore();}
    else{c.save();c.globalAlpha=1-ease((t-2.4)/1);c.fillStyle='#8e7e6b';c.font='24px "Songti SC","Noto Serif CJK SC",serif';c.fillText('有句话，藏在里面。',360,747);c.font='15px Georgia,serif';c.fillText('a little sweetness, a little secret',360,790);c.restore();}
    c.fillStyle='#a49480';c.font='14px "Songti SC","Noto Serif CJK SC",serif';c.fillText('不必是生日，也值得被惦记。',360,1188);
  }
  function stopAnimation(){cancelAnimationFrame(animation);animation=0;}
  function play(){if(exporting)return;stopAnimation();film.hidden=false;film.hidden=false;const start=performance.now();$('cutBtn').textContent='重新看一遍 ↻';const loop=now=>{const t=(now-start)/1000;drawFilm(t);if(t<duration())animation=requestAnimationFrame(loop);};animation=requestAnimationFrame(loop);}
  function clearExport(){exportBlob=null;$('shareActions').hidden=true;film.hidden=false;}
  function openPreview(){endDraw();flushText();if(!state.message.trim()){setStep(3);toast('先藏一句话，再送给 TA 吧');$('message').focus();return;}stopAnimation();clearExport();drawFilm(0);$('cutBtn').textContent='切开看看 ↗';$('previewDialog').showModal();document.body.style.overflow='hidden';}
  $('cutBtn').onclick=play;
  $('closePreview').onclick=()=>{if(exporting)return;stopAnimation();$('previewDialog').close();};
  $('previewDialog').addEventListener('cancel',e=>{if(exporting)e.preventDefault();});
  $('previewDialog').addEventListener('close',()=>{stopAnimation();document.body.style.overflow='';});
  
  function saveImage(){const out=document.createElement('canvas');out.width=1080;out.height=1080;const c=out.getContext('2d');c.scale(1.5,1.5);c.fillStyle='#f7f3eb';c.fillRect(0,0,720,720);cakeScene(c);const data=out.toDataURL('image/png');const bridge=window.xhs&&window.xhs.miniTool;if(bridge&&bridge.writeTempFile&&bridge.saveImageToPhotosAlbum){bridge.writeTempFile({data:data}).then(r=>bridge.saveImageToPhotosAlbum({filePath:r.filePath})).then(()=>toast('完整蛋糕图已保存到相册')).catch(()=>toast('保存失败，请截图保存完整蛋糕图'));}else toast('当前浏览器没有相册接口，请截图保存完整蛋糕图');}
  function recorderFormat(){if(!window.MediaRecorder||!film.captureStream)return null;for(const mime of ['video/mp4;codecs=avc1.42001f','video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm']){if(MediaRecorder.isTypeSupported(mime))return mime;}return null;}
  function exportUI(busy){exporting=busy;for(const id of ['closePreview','cutBtn','exportBtn'])$(id).disabled=busy;$('exportProgress').hidden=!busy;}
  $('cancelExport').onclick=()=>{cancelRequested=true;if(recording?.state==='recording')recording.stop();};
  // Recording is cancelled on backgrounding to avoid silently exporting frozen frames.
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&exporting){cancelRequested=true;if(recording?.state==='recording')recording.stop();toast('生成已暂停，请保持页面在前台后重试');}});
  $('exportBtn').onclick=async()=>{
    if(exporting)return;const mime=recorderFormat();if(!mime){toast('这个浏览器暂不支持视频生成，请用 Safari 或 Chrome 打开');return;}
    stopAnimation();clearExport();drawFilm(0);exportUI(true);cancelRequested=false;
    $('progressLabel').textContent='正在准备视频…';$('exportProgress').querySelector('progress').value=0;
    let stream,watchdog;const chunks=[];
    try{
      stream=film.captureStream(30);recording=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:6000000});
      const done=new Promise((resolve,reject)=>{recording.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};recording.onerror=e=>reject(e.error||new Error('录制失败'));recording.onstop=resolve;});
      recording.start(250);const start=performance.now(),length=duration();
      const loop=now=>{if(cancelRequested)return;const elapsed=(now-start)/1000;drawFilm(Math.min(elapsed,length));const pct=Math.min(99,Math.round(elapsed/length*100));$('exportProgress').querySelector('progress').value=pct;$('progressLabel').textContent=`正在生成 ${pct}% · 请保持页面打开`;if(elapsed<length)animation=requestAnimationFrame(loop);else if(recording.state==='recording')recording.stop();};animation=requestAnimationFrame(loop);
      watchdog=setTimeout(()=>{cancelRequested=true;if(recording?.state==='recording')recording.stop();},(length+12)*1000);
      await done;stopAnimation();if(cancelRequested){drawFilm(0);return;}
      const type=recording.mimeType.split(';')[0],ext=type.includes('mp4')?'mp4':'webm';const blob=new Blob(chunks,{type});if(blob.size<1000)throw new Error('视频没有成功生成');
      exportBlob=blob;
      $('shareActions').hidden=false;
      film.hidden=false;
      $('exportNote').textContent=`${Math.round(length)} 秒 · 720 × 1280 · ${ext.toUpperCase()} · ${(blob.size/1048576).toFixed(1)} MB。视频已在内存生成，可在小红书容器中发布。`;
      toast('小视频做好了，可以保存或发给朋友');
    }catch(e){toast('视频生成失败，请重试或换浏览器打开');console.error('Video export:',e);}finally{clearTimeout(watchdog);stopAnimation();stream?.getTracks().forEach(t=>t.stop());recording=null;exportUI(false);}
  };
  $('publishBtn').onclick=async()=>{if(!exportBlob){toast('先生成分享视频');return;}const bridge=window.xhs&&window.xhs.miniTool;if(!bridge||!bridge.postNote){toast('当前浏览器没有发布接口，请在小红书容器中打开');return;}const reader=new FileReader();reader.onload=async()=>{try{await bridge.postNote({pageType:'video_publish',mediaInfo:{video_resources:{video_url:reader.result}}});toast('已打开视频发布页');}catch(_){toast('发布失败，请重新生成视频');}};reader.readAsDataURL(exportBlob);};
  $('saveImageBtn').onclick=saveImage;
  window.addEventListener('pagehide',()=>{flushText();persist();});
  renderUI();draw();if(saved)$('draftStatus').textContent='已接着上次的草稿';
})();
