(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const canvas = $('cakeCanvas'), ctx = canvas.getContext('2d');
  const canvasStage = $('canvasStage'), canvasWrap = $('canvasWrap');
  const shareCanvas = $('shareCanvas'), shareContext = shareCanvas.getContext('2d');
  const SHARE_W=720,SHARE_H=1280;
  function exportScale(){return state.messageMode==='photo'?2:1.5;}
  function configureShareCanvas(){const scale=exportScale(),w=Math.round(SHARE_W*scale),h=Math.round(SHARE_H*scale);if(shareCanvas.width!==w||shareCanvas.height!==h){shareCanvas.width=w;shareCanvas.height=h;}return scale;}
  function resetShareContext(){const scale=configureShareCanvas();shareContext.setTransform(scale,0,0,scale,0,0);shareContext.imageSmoothingEnabled=true;shareContext.imageSmoothingQuality='high';}
  const KEY = 'cake-note-studio-v4';
  const COLORS = [['香草','#fff5df'],['草莓','#efb4bd'],['抹茶','#bdc7a3'],['芋泥','#c7bbd5'],['芒果','#edce87'],['可可','#96715f']];
  const FLAVORS = {vanilla:['原味','#e8bf85','#f6d7a7'], cocoa:['可可','#80543d','#b38360'], strawberry:['草莓','#d79d99','#efbfaf']};
  const SHAPES = {round:['圆形','M35 20a15 15 0 1 1-30 0a15 15 0 1 1 30 0'],heart:['爱心','M20 35C-9 16 9-2 20 12C31-2 49 16 20 35Z'],flower:['花朵','M20 8C27-3 39 6 32 16C45 20 36 36 27 30C24 43 9 39 11 28C-3 29 0 12 12 14C8 3 18 1 20 8Z'],cloud:['云朵','M8 30C-3 30 0 15 9 16C8 1 27 0 28 14C42 9 44 29 33 30Z'],square:['方形','M6 6H34V34H6Z']};
  const TOPPINGS = {strawberry:'草莓',blueberry:'蓝莓',cherry:'樱桃',flower:'小雏菊',bow:'丝带结',candle:'蜡烛',macaron:'马卡龙',rose:'糖霜玫瑰',pearl:'珍珠糖',chocolate:'巧克力',mint:'薄荷叶',meringue:'蛋白霜'};
  const warmQuotes = ["辛苦啦，先吃一口甜的吧", "愿你今天也被温柔接住", "慢一点也没关系，你已经很好了", "普通的一天，也值得好好庆祝", "你在，平常的日子也会发光", "所有小小的快乐，都值得收藏", "愿你的每一天，都有柔软的甜", "谢谢你，成为这样温暖的人", "见到你，今天就有了好心情", "愿你被爱，也自在地爱自己", "今天也要记得，好好照顾自己", "花会慢慢开，你也会慢慢变好", "愿今晚的风，把好梦送给你", "愿所有期待，都在合适的时候来到", "希望你的身边，总有温柔和热气", "祝你开心，在数不尽的明天！", "事事顺心，好运常伴。", "人生是旷野，请你肆意绽放。", "你的存在本身就是一份独特的礼物。", "美好的事情，即将发生。", "好好爱自己。", "如果生活将你击倒，那你就幸福地睡一觉。", "命运会引领你到柳暗花明的那一天。", "人生无解，多喝拿铁。", "喜欢自己比喜欢世界更重要。", "今天值得庆祝，明天也是！", "做自己的光，千万次为自己绽放。", "祝你的生活一切都漂亮。", "幸福，手拿把掐！", "生活给我一拳，我出布！", "我要有能做我自己的自由，和敢做我自己的胆量。 ——林语堂", "我与我周旋久，宁作我。 ——《世说新语》", "一定要爱着点什么，恰似草木对光阴的钟情。 ——汪曾祺", "人生少忧虑，生活才好玩。 ——汪曾祺", "人不管走到哪一步，总得找点乐子，想一点办法。 ——汪曾祺", "所谓无底深渊，下去，也是前程万里。 ——木心", "且视他人之疑目如盏盏鬼火，大胆地去走你的夜路。 ——史铁生", "行到水穷处，坐看云起时。 ——王维", "莫听穿林打叶声，何妨吟啸且徐行。 ——苏轼", "一蓑烟雨任平生。 ——苏轼", "愿你有一个灿烂的前程。 ——海子", "愿你在尘世获得幸福。 ——海子", "人生在世，还不是有时笑笑人家，有时给人家笑笑。 ——林语堂", "一个人只拥有此生此世是不够的，他还应该拥有诗意的世界。 ——王小波", "人是为活着本身而活着的，而不是为了活着之外的任何事物所活着。 ——余华", "生活是属于每个人自己的感受，不属于任何别人的看法。 ——余华", "一个人不想攀高就不怕下跌，可以保其天真，成其自然。 ——杨绛", "世界上只有一种真正的英雄主义，那就是认清生活的真相后依然热爱生活。 ——罗曼·罗兰", "世界是个美好的地方，值得为之战斗。 ——海明威", "黄金时代，不在我们背后，乃在我们面前；不在过去，乃在将来。 ——李大钊", "你的时间有限，不要浪费在过别人的生活上。 ——Steve Jobs", "不要让别人的意见淹没你内心的声音。 ——Steve Jobs", "要有勇气追随自己的内心和直觉。 ——Steve Jobs", "乐观是通往成就的信念；没有希望，什么也做不成。 ——Helen Keller", "没有任何灾难能阻止春天归来。 ——Helen Keller", "一扇幸福之门关闭时，另一扇就会打开。 ——Helen Keller", "爱自己，是一场终身浪漫的开始。 ——Oscar Wilde", "隆冬时节，我终于发现，我心里有一个不可战胜的夏天。 ——Albert Camus", "我不怕风暴，因为我正在学习如何驾驶自己的船。 ——Louisa May Alcott", "杀不死我的，会让我更强大。 ——Friedrich Nietzsche", "如果还没有找到你热爱的，就继续找，别将就。 ——Steve Jobs"];
  const blank = () => ({version:4,messageMode:null,shape:'round',flavor:'vanilla',lace:'none',coat:null,strokes:[],toppings:[],message:'',photo:'',step:0});
  let giftOpened=false,giftProgress=0,giftAnimation=0;
  let viewZoom=1,viewTilt=.72,presentationRendering=false;
  let activeWorkId=null,restoreAfterShare=null,cabinetItems=[],selectedWork=null,archiveBusy=false;
  const cabinetUrls=[];
  let state = blank(), history=[], future=[], tool='pipe', cream=COLORS[0][1], topping='strawberry', size=29;
  let drawing=null, lastPoint=null, toastTimer, animation=0, drawFrame=0, fitFrame=0, cutAnimation=0, cutProgress=0, cutReveal=0, cutComplete=false, canvasObserver=null, exporting=false, cancelRequested=false, recording=null, imageDataUrl='', videoBlob=null;
  let exportWarmPromise=null,exportWarmKey='';
  let photoAsset=null,photoAssetSource='',photoAssetWait=null;
  let saved=false, saveTimer, textSnapshot=null, fitUntil=0;
  const originalPhotos=new Map();
  let photoDatabase;
  function photoDB(){if(!photoDatabase)photoDatabase=new Promise((resolve,reject)=>{const request=indexedDB.open('cake-original-photos',2);request.onupgradeneeded=()=>{for(const name of ['photos','works'])if(!request.result.objectStoreNames.contains(name))request.result.createObjectStore(name);};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});return photoDatabase;}
  async function storeOriginalPhoto(id,file){const db=await photoDB();await new Promise((resolve,reject)=>{const tx=db.transaction('photos','readwrite');tx.objectStore('photos').put(file,id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
  async function readOriginalPhoto(id){if(originalPhotos.has(id))return originalPhotos.get(id);const db=await photoDB();return new Promise((resolve,reject)=>{const request=db.transaction('photos').objectStore('photos').get(id);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
  try {const raw=JSON.parse(localStorage.getItem(KEY));if(validDraft(raw)){state=raw;delete state.tiers;state.photo=state.photo||'';if(!state.strokes.length&&!state.toppings.length&&!state.coat&&state.lace==='shell'&&state.step===0)state.lace='none';if(state.messageMode==='surprise'&&!warmQuotes.includes(state.message)){state.message=warmQuotes[Math.floor(Math.random()*warmQuotes.length)];localStorage.setItem(KEY,JSON.stringify(state));}saved=true;}} catch (_) {}
  function validDraft(s){return s && s.version===4 && [null,'custom','surprise','photo'].includes(s.messageMode) && s.shape in SHAPES && s.flavor in FLAVORS && Array.isArray(s.strokes) && s.strokes.length<=500 && s.strokes.every(v=>Array.isArray(v.points)&&v.points.length<=6000&&v.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y))) && Array.isArray(s.toppings) && s.toppings.length<=400 && s.toppings.every(t=>t.kind in TOPPINGS&&Number.isFinite(t.x)&&Number.isFinite(t.y)) && typeof s.message==='string' && s.message.length<=160 && (s.photo===undefined||typeof s.photo==='string'&&s.photo.length<=1500000&&(!s.photo||/^data:image\/(?:png|jpeg|webp);base64,/.test(s.photo))) && Number.isInteger(s.step)&&s.step>=0&&s.step<=2;}
  const clone = v => JSON.parse(JSON.stringify(v));
  function remember(){flushText();history.push(clone(state));if(history.length>70)history.shift();future=[];}
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(_){}
  }
  function invalidateExportCache(){exportWarmPromise=null;exportWarmKey='';imageDataUrl='';videoBlob=null;}
  function changed(redraw=true){invalidateExportCache();saved=true;persist();syncHistory();if(redraw)draw();}
  function syncHistory(){$('undoBtn').disabled=!history.length&&!textSnapshot;$('redoBtn').disabled=!future.length;}
  function flushText(){if(!textSnapshot)return;if(JSON.stringify(textSnapshot)!==JSON.stringify(state)){history.push(textSnapshot);if(history.length>70)history.shift();future=[];}textSnapshot=null;clearTimeout(saveTimer);syncHistory();}
  function undo(){endDraw();flushText();if(!history.length)return;future.push(clone(state));state=history.pop();activeWorkId=state.workId||null;renderUI();changed();}
  function redo(){endDraw();flushText();if(!future.length)return;history.push(clone(state));state=future.pop();activeWorkId=state.workId||null;renderUI();changed();}
  function toast(t){$('toast').textContent=t;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3000);}
  function setStep(n){endDraw();flushText();const next=Math.max(0,Math.min(2,n));if(next!==state.step)resetCut();state.step=next;invalidateExportCache();if(next===2){giftOpened=true;giftProgress=1;if(state.messageMode==='photo')waitForPhotoAsset();}setDrawer(false);renderUI();persist();draw();}
  function heading(k,title,body){return `<h1>${title}</h1><p class="intro">${body}</p>`;}
  function palette(){return `<div class="palette">${COLORS.map(([n,c])=>`<button class="swatch ${c===cream?'selected':''}" data-color="${c}" aria-label="${n}奶油" aria-pressed="${c===cream}" style="--swatch:${c}"><i></i><small>${n}</small></button>`).join('')}</div>`;}
  const bagIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10l2 5-5 8v3h-4v-3L5 8Z"/><path d="M10 19h4v2h-4"/></svg>';
  const eraserIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 16 8-10 5 4-8 10H8l-4-3 3-4"/><path d="M12 20h8"/></svg>';
  let drawerSection='cake',drawerOpen=false,lastTool='pipe';
  function renderCanvasTools(){const box=$('canvasTools');box.innerHTML=state.step===0?`<button class="canvas-tool ${tool==='erase'?'active':''}" data-canvas-tool="erase" aria-label="橡皮擦：擦掉奶油或装饰" title="橡皮擦">${eraserIcon}</button>`:'';}
  function renderDrawer(){const tabs=[['cake','蛋糕'],['cream','奶油'],['decorate','装饰']];$('drawerTabs').innerHTML=tabs.map(([k,n])=>`<button class="drawer-tab ${drawerSection===k?'active':''}" data-drawer-section="${k}">${n}</button>`).join('');const panel=$('drawerContent');if(drawerSection==='cake')panel.innerHTML=`<div class="field-label">形状</div><div class="shape-options">${Object.entries(SHAPES).map(([k,[n,p]])=>`<button class="shape-option ${k===state.shape?'selected':''}" data-shape="${k}" aria-label="${n}蛋糕胚" aria-pressed="${k===state.shape}"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="${p}"/></svg><small>${n}</small></button>`).join('')}</div><div class="field-label">口味</div><div class="flavors">${Object.entries(FLAVORS).map(([k,[n]])=>`<button class="flavor ${k===state.flavor?'selected':''}" data-flavor="${k}">${n}</button>`).join('')}</div>`;if(drawerSection==='cream')panel.innerHTML=`<div class="field-label">奶油颜色</div>${palette()}<div class="tool-options"><button class="tool-option ${tool==='pipe'?'selected':''}" data-tool="pipe">〰 挤奶油</button><button class="tool-option ${tool==='rosette'?'selected':''}" data-tool="rosette">✿ 挤奶油花</button></div><div class="cream-actions"><button id="coatBtn">铺满奶油</button><button id="rimBtn">沿边缘挤花</button></div><label class="tool-line">粗细 <input id="brushSize" aria-label="奶油粗细" type="range" min="12" max="44" value="${size}"></label>`;if(drawerSection==='decorate')panel.innerHTML=`<div class="toppings">${Object.entries(TOPPINGS).map(([k,n])=>`<button class="topping ${tool==='place'&&k===topping?'selected':''}" data-topping="${k}" aria-pressed="${tool==='place'&&k===topping}"><canvas width="96" height="96" data-icon="${k}" aria-hidden="true"></canvas><small>${n}</small></button>`).join('')}</div>`;if(drawerSection==='cream')panel.insertAdjacentHTML('afterbegin',`<div class="field-label">奶油花边</div><div class="design-options"><button data-lace="none" class="${state.lace==='none'?'selected':''}">简约</button><button data-lace="shell" class="${(state.lace||'shell')==='shell'?'selected':''}">贝壳裱花</button><button data-lace="swag" class="${state.lace==='swag'?'selected':''}">复古垂花</button></div>`);panel.querySelectorAll('[data-icon]').forEach(el=>{const c=el.getContext('2d');c.translate(48,54);drawTopping(c,{kind:el.dataset.icon,size:27,rot:0},false);});}
  function setDrawer(open){drawerOpen=open&&state.step===0;$('toolDrawer').classList.toggle('open',drawerOpen);document.body.classList.toggle('drawer-open',drawerOpen);$('toolDrawer').setAttribute('aria-hidden',String(!drawerOpen));$('drawerToggle').setAttribute('aria-expanded',String(drawerOpen));$('drawerToggle').querySelector('span').textContent=drawerOpen?'⌄':'⌃';if(drawerOpen)dismissCoach();fitUntil=performance.now()+360;fitCanvas();}
  function dismissCoach(){if(!$('drawerCoach').hidden){$('drawerCoach').hidden=true;try{localStorage.setItem('cake-tool-drawer-coach','seen');}catch(_){}}}
  function renderUI(){
    const panel=$('stepContent');
    if(state.step===0)panel.innerHTML='';
    if(state.step===1){const modes=`<div class="mode-picker" aria-label="选择藏进蛋糕的心意"><button class="mode-card ${state.messageMode==='custom'?'active':''}" data-message-mode="custom"><span class="mode-mark">写</span><span><b>亲手写一句</b></span></button><button class="mode-card ${state.messageMode==='surprise'?'active':''}" data-message-mode="surprise"><span class="mode-mark">抽</span><span><b>抽一句惊喜</b></span></button><button class="mode-card ${state.messageMode==='photo'?'active':''}" data-message-mode="photo"><span class="mode-mark">照</span><span><b>放一张回忆</b><small>把回忆放进去</small></span></button></div>`;const photoPanel=state.photo?`<div class="photo-picker"><img src="${state.photo}" alt="已选择的照片"><div><button id="photoPick" class="secondary">换一张照片</button><button id="removePhoto" class="text-btn">移除照片</button></div></div>`:`<div class="photo-empty"><span>把一张喜欢的照片放进去</span><button id="photoPick" class="secondary">选择一张照片</button></div>`;panel.innerHTML=modes+(state.messageMode==='custom'?`<div class="ideas">${warmQuotes.slice(0,8).map(q=>`<button class="idea" data-idea="${q}">${q}</button>`).join('')}</div><textarea id="message" maxlength="120" placeholder="写下你想说的话"></textarea><div class="message-meta"><span id="messageCount">${state.message.length} / 120</span></div>`:state.messageMode==='surprise'?`<p class="recipe-note">惊喜已经放好了，切开蛋糕时再看。</p>`:state.messageMode==='photo'?`${photoPanel}<input id="photoInput" type="file" accept="image/*" hidden>`:'');if(state.messageMode==='custom')$('message').value=state.message;}
    if(state.step===2)panel.innerHTML='';
    document.body.classList.toggle('is-building',state.step===0);
    document.body.classList.toggle('is-cutting',state.step===2);
    document.body.classList.toggle('cut-complete',state.step===2&&cutComplete);
    if(state.step!==0)document.body.classList.remove('drawer-open');
    if(state.step!==0)$('drawerCoach').hidden=true;
    $('prevBtn').disabled=state.step===0;
    $('drawerToggle').hidden=state.step!==0;
    $('nextBtn').hidden=false;
    $('viewControls').hidden=state.step!==0;
    $('inspirationBtn').hidden=state.step!==0;
    $('nextBtn').disabled=state.step===2&&!cutComplete;
    $('nextBtn').innerHTML=state.step===2?(cutComplete?'去导出 <span>↗</span>':'切开蛋糕后继续'):state.step===1?'去切开蛋糕 <span>→</span>':'下一步 <span>→</span>';
    $('cutBubble').hidden=state.step!==2||cutComplete;
    $('giftOpenBtn').hidden=true;
    renderCanvasTools();renderDrawer();syncHistory();
    panel.querySelectorAll('[data-icon]').forEach(el=>{const c=el.getContext('2d');c.translate(48,54);drawTopping(c,{kind:el.dataset.icon,size:27,rot:0},false);});
  }
  $('drawerToggle').onclick=()=>setDrawer(!drawerOpen);$('drawerClose').onclick=()=>setDrawer(false);$('dismissCoach').onclick=dismissCoach;
  document.addEventListener('pointerdown',e=>{if(!drawerOpen||state.step!==0)return;if(e.target.closest('#toolDrawer,#drawerToggle,#drawerCoach,dialog'))return;setDrawer(false);},true);
  $('drawerTabs').onclick=e=>{const b=e.target.closest('[data-drawer-section]');if(!b)return;drawerSection=b.dataset.drawerSection;renderDrawer();};
  $('canvasTools').onclick=e=>{const b=e.target.closest('[data-canvas-tool]');if(!b)return;if(tool==='erase')tool=lastTool;else{lastTool=tool;tool='erase';}setDrawer(false);renderCanvasTools();draw();};
  function handleAction(e){
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.shape){remember();state.shape=b.dataset.shape;renderDrawer();changed();}
    if(b.dataset.flavor){remember();state.flavor=b.dataset.flavor;renderDrawer();changed();}
    
    if(b.dataset.lace){remember();state.lace=b.dataset.lace;renderDrawer();changed();}
    if(b.dataset.color){cream=b.dataset.color;renderDrawer();}
    if(b.dataset.tool){tool=b.dataset.tool;lastTool=tool;renderDrawer();renderCanvasTools();setDrawer(false);}
    if(b.dataset.topping){topping=b.dataset.topping;tool='place';lastTool=tool;renderDrawer();renderCanvasTools();setDrawer(true);}
    if(b.id==='coatBtn'){remember();state.coat=cream;changed();toast('奶油铺好了');}
    if(b.id==='rimBtn'){if(state.strokes.length>=480){toast('装饰已经很多了，先擦掉一些吧');return;}remember();const points=outline(state.shape);const step=Math.max(1,Math.floor(points.length/34));for(let i=0;i<points.length;i+=step){const p=points[i];state.strokes.push({kind:'rosette',color:cream,size:21,points:[{x:p.x*.90,y:p.y*.90}]});}changed();}
    if(b.dataset.messageMode){remember();state.messageMode=b.dataset.messageMode;if(state.messageMode==='surprise')state.message=warmQuotes[Math.floor(Math.random()*warmQuotes.length)];else if(state.messageMode!=='photo')state.message='';renderUI();changed();}
    if(b.dataset.idea){remember();state.message=b.dataset.idea;renderUI();changed();}
    if(b.id==='photoPick')$('photoInput').click();
    if(b.id==='removePhoto'){remember();state.photo='';delete state.photoOriginalId;photoAsset=null;photoAssetSource='';photoAssetWait=null;renderUI();changed();}
  }
  $('drawerContent').onclick=handleAction;
  $('drawerContent').addEventListener('input',e=>{if(e.target.id==='brushSize')size=+e.target.value;});
  $('stepContent').onclick=e=>{
    handleAction(e);
  };
  $('stepContent').addEventListener('input',e=>{const el=e.target;if(el.id==='brushSize'){size=+el.value;return;}if(el.id==='message'){if(!textSnapshot)textSnapshot=clone(state);state.message=el.value;$('messageCount').textContent=`${el.value.length} / 120`;clearTimeout(saveTimer);saveTimer=setTimeout(flushText,700);changed(false);}});
  $('stepContent').addEventListener('change',async e=>{const el=e.target;if(el.id!=='photoInput'||!el.files||!el.files[0])return;try{const draft=state;const data=await preparePhoto(el.files[0]);if(state!==draft||state.step!==1||state.messageMode!=='photo')return;remember();state.photo=data.preview;state.photoOriginalId=data.id;photoAsset=null;photoAssetSource='';photoAssetWait=null;renderUI();changed();toast(data.stored?'照片放进蛋糕里了':'原图本次可用，但未能保存到草稿；重新打开后需重新选择');}catch(_){toast('照片没有读取成功，请换一张试试');}});
  $('stepContent').addEventListener('focusout',flushText);
  $('prevBtn').onclick=()=>setStep(state.step-1);
  $('nextBtn').onclick=()=>{if(state.step===0){setStep(1);return;}if(state.step===1&&!state.messageMode){toast('先选择一句话、惊喜或照片');return;}if(state.step===1&&state.messageMode==='custom'&&!state.message.trim()){toast('先写一句想放进蛋糕里的话');return;}if(state.step===1&&state.messageMode==='photo'&&!state.photo){toast('先选择一张想放进蛋糕里的照片');return;}if(state.step===1){setStep(2);return;}if(state.step===2&&!cutComplete){toast('沿虚线把蛋糕切开，再去导出');return;}openExport();};
  $('undoBtn').onclick=undo;$('redoBtn').onclick=redo;
  document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA/.test(e.target.tagName)||$('previewDialog').open)return;if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();e.shiftKey?redo():undo();}});
  $('resetBtn').onclick=()=>$('resetDialog').showModal();$('cancelReset').onclick=()=>$('resetDialog').close();$('confirmReset').onclick=()=>{state=blank();activeWorkId=null;viewZoom=1;viewTilt=.72;syncViewControls();history=[];future=[];textSnapshot=null;tool='pipe';lastTool='pipe';cream=COLORS[0][1];resetCut();$('resetDialog').close();renderUI();changed();};

  // Every decoration is drawn locally, so the editor and final share image use the same renderer.
  const outlineCache={};
  function outline(shape){if(outlineCache[shape])return outlineCache[shape];let a=[];for(let i=0;i<160;i++){const t=i/160*Math.PI*2;let x,y;if(shape==='heart'){x=16*Math.sin(t)**3*12.6;y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*12.6;}else if(shape==='square'){x=185*Math.sign(Math.cos(t))*Math.abs(Math.cos(t))**.35;y=185*Math.sign(Math.sin(t))*Math.abs(Math.sin(t))**.35;}else if(shape==='flower'){const r=179+23*Math.cos(t*6);x=r*Math.cos(t);y=r*Math.sin(t);}else if(shape==='cloud'){const r=178+19*Math.sin(5*t);x=1.12*r*Math.cos(t);y=.80*r*Math.sin(t);}else{x=202*Math.cos(t);y=202*Math.sin(t);}a.push({x,y});}if(a.reduce((sum,p,i)=>{const q=a[(i+1)%a.length];return sum+p.x*q.y-q.x*p.y;},0)<0)a.reverse();outlineCache[shape]=a;return a;}
  function shapePath(c,shape){const a=outline(shape);c.beginPath();a.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.closePath();}
  function inside(p,margin=1){const c=hitContext;c.setTransform(1,0,0,1,0,0);shapePath(c,state.shape);return c.isPointInPath(p.x/margin,p.y/margin);}
  const hitContext=document.createElement('canvas').getContext('2d');
  function tint(hex,delta){return '#'+hex.slice(1).match(/../g).map(n=>Math.min(255,Math.max(0,parseInt(n,16)+delta)).toString(16).padStart(2,'0')).join('');}
  function ellipse(c,x,y,rx,ry,color){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=color;c.fill();}
  function roundedRectPath(c,x,y,w,h,r){r=Math.max(0,Math.min(r,Math.abs(w)/2,Math.abs(h)/2));c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);c.closePath();}
  function clearElement(el){while(el.firstChild)el.removeChild(el.firstChild);}
  function smoothPath(c,points){c.beginPath();c.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length-1;i++){const p=points[i],n=points[i+1];c.quadraticCurveTo(p.x,p.y,(p.x+n.x)/2,(p.y+n.y)/2);}if(points.length>1){const p=points[points.length-1];c.lineTo(p.x,p.y);}}
  function rosette(c,x,y,r,color){c.save();c.translate(x,y);c.shadowColor='#6d48252a';c.shadowBlur=4;c.shadowOffsetY=3;const grad=c.createRadialGradient(-r*.3,-r*.35,1,0,0,r);grad.addColorStop(0,tint(color,15));grad.addColorStop(.7,color);grad.addColorStop(1,tint(color,-24));c.fillStyle=grad;c.beginPath();for(let i=0;i<=90;i++){const a=i/90*Math.PI*2,rr=r*(.86+.14*Math.cos(a*9));i?c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr*.8):c.moveTo(Math.cos(a)*rr,Math.sin(a)*rr*.8);}c.fill();c.shadowColor='transparent';c.strokeStyle='#ffffff65';c.lineWidth=1.4;c.beginPath();for(let i=0;i<=50;i++){const a=i/50*Math.PI*4,rr=r*.68*(1-i/58);const x=Math.cos(a)*rr,y=Math.sin(a)*rr*.8;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();c.restore();}
  function drawTopping(c,t,shadow=true){c.save();c.rotate(t.rot||0);const r=t.size||29;c.scale(r/29,r/29);if(shadow){c.shadowColor='#49342235';c.shadowBlur=7;c.shadowOffsetY=5;}
    if(t.kind==='strawberry'){const g=c.createLinearGradient(-16,-28,15,20);g.addColorStop(0,'#e87568');g.addColorStop(.45,'#c94039');g.addColorStop(1,'#8e2527');c.fillStyle=g;c.beginPath();c.moveTo(0,25);c.bezierCurveTo(-9,22,-29,-2,-22,-19);c.bezierCurveTo(-17,-31,15,-33,23,-17);c.bezierCurveTo(31,0,9,24,0,25);c.fill();c.shadowColor='transparent';for(let row=0;row<4;row++){for(let i=0;i<4-row%2;i++){const x=(i-(3-row%2)/2)*9,y=-15+row*10;if(Math.abs(x)<22-row*3)ellipse(c,x,y,1.15,2,'#ffdc9e');}}c.fillStyle='#59774b';for(let i=0;i<5;i++){c.save();c.translate(0,-23);c.rotate((i-2)*.67);c.beginPath();c.moveTo(0,2);c.quadraticCurveTo(-8,-7,0,-14);c.quadraticCurveTo(5,-6,0,2);c.fill();c.restore();}}
    if(t.kind==='blueberry'){for(const [x,y,r] of [[-11,1,16],[11,6,15],[0,-12,15]]){const g=c.createRadialGradient(x-5,y-6,1,x,y,r);g.addColorStop(0,'#8798b5');g.addColorStop(.6,'#506387');g.addColorStop(1,'#34445f');ellipse(c,x,y,r,r,g);c.shadowColor='transparent';c.fillStyle='#283750';c.beginPath();for(let i=0;i<10;i++){let a=i*Math.PI/5,rr=i%2?3:6;i?c.lineTo(x+Math.cos(a)*rr,y-3+Math.sin(a)*rr):c.moveTo(x+Math.cos(a)*rr,y-3+Math.sin(a)*rr);}c.closePath();c.fill();}}
    if(t.kind==='cherry'){c.shadowColor='transparent';c.strokeStyle='#65704a';c.lineWidth=2.6;c.beginPath();c.moveTo(-14,4);c.quadraticCurveTo(-13,-20,9,-32);c.quadraticCurveTo(7,-12,16,6);c.stroke();for(const [x,y] of [[-14,9],[15,11]]){const g=c.createRadialGradient(x-5,y-7,0,x,y,17);g.addColorStop(0,'#e26c63');g.addColorStop(.4,'#b73940');g.addColorStop(1,'#772631');ellipse(c,x,y,16,17,g);ellipse(c,x-5,y-7,3,2,'#ffdbbcaa');}}
    if(t.kind==='flower'){for(let i=0;i<5;i++){const a=i*Math.PI*2/5;ellipse(c,Math.cos(a)*14,Math.sin(a)*14,12,11,'#fff8e6');}c.shadowColor='transparent';ellipse(c,0,0,9,9,'#dcb35b');ellipse(c,-2,-3,4,3,'#edce83');}
    if(t.kind==='bow'){c.fillStyle='#ae5360';c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-43,-37,-38,29,0,0);c.bezierCurveTo(43,-37,38,29,0,0);c.fill();c.fillStyle='#c36c76';c.beginPath();c.moveTo(-5,1);c.lineTo(-19,34);c.lineTo(-7,28);c.lineTo(0,33);c.lineTo(7,3);c.moveTo(4,1);c.lineTo(23,27);c.lineTo(10,25);c.lineTo(7,32);c.lineTo(-4,3);c.fill();c.shadowColor='transparent';ellipse(c,0,0,7,9,'#d99098');c.strokeStyle='#e5aab0';c.lineWidth=2;c.beginPath();c.moveTo(-7,-3);c.quadraticCurveTo(-28,-18,-24,-2);c.moveTo(7,-3);c.quadraticCurveTo(28,-18,24,-2);c.stroke();}
    if(t.kind==='candle'){c.fillStyle='#f6e0b9';c.fillRect(-6,-36,12,57);c.shadowColor='transparent';c.save();c.beginPath();c.rect(-6,-36,12,57);c.clip();c.strokeStyle='#b77770';c.lineWidth=4;for(let y=-45;y<30;y+=14){c.beginPath();c.moveTo(-10,y);c.lineTo(10,y+12);c.stroke();}c.restore();c.strokeStyle='#5d4b37';c.lineWidth=2;c.beginPath();c.moveTo(0,-36);c.lineTo(0,-43);c.stroke();c.fillStyle='#e9b655';c.beginPath();c.moveTo(0,-66);c.bezierCurveTo(17,-45,6,-38,0,-41);c.bezierCurveTo(-12,-44,-4,-57,0,-66);c.fill();ellipse(c,0,-47,3,6,'#fff2b5');}

    if(t.kind==='meringue')creamPeak(c,0,5,23,'#fff4dd');
    if(t.kind==='pearl'){for(const [x,y,r] of [[-13,7,9],[8,10,11],[0,-8,8]]){const g=c.createRadialGradient(x-3,y-4,0,x,y,r);g.addColorStop(0,'#ffffff');g.addColorStop(.55,'#f8e9ce');g.addColorStop(1,'#c1a987');ellipse(c,x,y,r,r,g);}}
    if(t.kind==='macaron'){ellipse(c,0,10,28,15,'#a889a3');ellipse(c,0,4,28,14,'#fff1dd');ellipse(c,0,-2,29,16,'#c6a7c2');ellipse(c,0,-8,28,15,'#dfc6d8');c.shadowColor='transparent';c.strokeStyle='#f6e6ec';c.lineWidth=2;c.beginPath();c.ellipse(0,-8,23,10,0,Math.PI,Math.PI*2);c.stroke();for(let i=0;i<11;i++)ellipse(c,-24+i*4.8,3,1.4,1.8,'#b897b1');}
    if(t.kind==='rose'){c.shadowColor='transparent';for(let i=8;i>=0;i--){c.save();c.rotate(i*2.4);const r=7+i*2.1;ellipse(c,r*.28,0,r,r*.67,i%2?'#ce8791':'#e8abb2');c.strokeStyle='#f7cbd0';c.lineWidth=1;c.beginPath();c.ellipse(r*.28,0,r*.85,r*.56,0,Math.PI,Math.PI*1.8);c.stroke();c.restore();}ellipse(c,0,0,4,3,'#ae5c6e');}
    if(t.kind==='mint'){c.shadowColor='transparent';for(const side of [-1,1]){c.save();c.rotate(side*.65);c.fillStyle=side<0?'#819b69':'#9eb58b';c.beginPath();c.moveTo(0,20);c.bezierCurveTo(-26,0,-18,-21,0,-29);c.bezierCurveTo(20,-10,22,8,0,20);c.fill();c.strokeStyle='#d0dcb3';c.lineWidth=1.2;c.beginPath();c.moveTo(0,17);c.lineTo(0,-24);for(let y=-12;y<12;y+=8){c.moveTo(0,y+4);c.lineTo(-10,y-4);c.moveTo(0,y+4);c.lineTo(10,y-4);}c.stroke();c.restore();}}
    if(t.kind==='chocolate'){c.rotate(-.22);const g=c.createLinearGradient(-24,-27,24,24);g.addColorStop(0,'#885444');g.addColorStop(1,'#43291f');c.fillStyle=g;c.fillRect(-23,-26,46,49);c.shadowColor='transparent';for(let row=0;row<3;row++)for(let col=0;col<2;col++){c.fillStyle='#946353';c.fillRect(-20+col*22,-23+row*15,19,12);c.fillStyle='#674131';c.fillRect(-18+col*22,-21+row*15,16,9);}}
    c.restore();
  }
  let dirty=true;
  const topScale=()=>1;
  const topY=()=>296;
  const isPiping=()=>state.step===0&&(tool==='pipe'||tool==='rosette');
  const cakeTilt=()=>presentationRendering||state.step!==0 ? .66 : viewTilt;
  const cakeDepth=()=>116*Math.sqrt(1-cakeTilt()**2);
  function fillingPalette(){const kinds=state.toppings.map(t=>t.kind);if(kinds.includes('blueberry'))return{jam:'#69749a',fruit:'#46577b',light:'#aeb8d3'};if(kinds.includes('strawberry')||kinds.includes('cherry')||state.flavor==='strawberry')return{jam:'#c96870',fruit:'#a94753',light:'#efadb1'};if(state.flavor==='cocoa')return{jam:'#9f5260',fruit:'#713845',light:'#d58b91'};return{jam:'#d77d78',fruit:'#b7525a',light:'#f1aca4'};}
  // A section is a plane running from the back to the front of the cake.
  // Project its sponge/cream layers by depth, not by screen height.
  function cutSection(){
    const points=outline(state.shape),crossings=[],slope=1.35;
    for(let i=0;i<points.length;i++){
      const a=points[i],b=points[(i+1)%points.length],da=a.x-slope*a.y*.66,db=b.x-slope*b.y*.66;
      if((da<=0&&db>0)||(db<=0&&da>0)){const t=da/(da-db);crossings.push({x:360+(a.x+(b.x-a.x)*t)*topScale(),y:topY()+(a.y+(b.y-a.y)*t)*.66*topScale()});}
    }
    crossings.sort((a,b)=>a.y-b.y);
    return{back:crossings[0],front:crossings[crossings.length-1],slope};
  }
  function cutPoint(p){
    const {back,front}=cutSection(),dx=front.x-back.x,dy=front.y-back.y;
    const t=Math.max(0,Math.min(1,((p.x-back.x)*dx+(p.y-back.y)*dy)/(dx*dx+dy*dy)));
    return{x:back.x+dx*t,y:back.y+dy*t,t};
  }
  function splitOffset(side,split,section){
    const dx=section.front.x-section.back.x,dy=section.front.y-section.back.y,length=Math.hypot(dx,dy)||1;
    return{x:side*split*dy/length,y:-side*split*dx/length};
  }
  function drawCutFace(c,offset,section){
    const {back,front}=section;
    const filling=fillingPalette(),colors=FLAVORS[state.flavor],length=320,depth=section.depth||87;
    const blueberry=state.toppings.some(t=>t.kind==='blueberry');
    c.save();
    c.transform(0,depth/87,(front.x-back.x)/length,(front.y-back.y)/length,back.x+offset.x,back.y+offset.y);
    c.beginPath();c.rect(0,0,87,length);c.clip();
    const sponge=c.createLinearGradient(0,0,depth,0);
    sponge.addColorStop(0,colors[2]);sponge.addColorStop(.6,tint(colors[2],-5));sponge.addColorStop(1,tint(colors[2],-20));
    c.fillStyle=sponge;c.fillRect(0,0,87,length);
    // Fixed grain positions keep the exported animation from flickering.
    for(let i=0;i<180;i++){
      const d=5+(i*31%77),u=4+(i*73%312);
      ellipse(c,d,u,.6+(i%3)*.45,.8+(i%2)*.7,i%3?'#fff8e65c':'#69472c20');
    }
    function ribbon(d,thickness,color,phase=0){
      c.beginPath();
      for(let u=0;u<=length;u+=4){const v=d+Math.sin(u*.085+phase)*.7+Math.cos(u*.037)*.35;u?c.lineTo(v,u):c.moveTo(v,u);}
      for(let u=length;u>=0;u-=4)c.lineTo(d+thickness+Math.sin(u*.085+phase)*.6,u);
      c.closePath();c.fillStyle=color;c.fill();
    }
    for(const [layer,d] of [25,57].entries()){
      ribbon(d-1,19,'#b8957430',layer);
      ribbon(d,17,'#fff7e9',layer);
      ribbon(d+5,6,filling.light+'a6',layer);
      ribbon(d+11,2,filling.jam+'9c',layer);
      for(let i=0;i<8;i++){
        const u=19+i*40+(layer?13:0),v=d+8+Math.sin(i*2.7)*1.2;
        c.save();c.translate(v,u);c.rotate(Math.sin(i*4.2)*.2);
        if(blueberry){
          ellipse(c,0,0,6.3,8,filling.fruit);
          ellipse(c,-.5,-.3,4.6,6.2,filling.light);
          ellipse(c,0,.4,2.3,3.4,'#e1dced');
          for(let j=0;j<5;j++){const a=j*Math.PI*2/5;ellipse(c,Math.cos(a)*3,Math.sin(a)*4,.55,.75,filling.jam);}
        }else{
          c.beginPath();c.moveTo(-6,-6);c.bezierCurveTo(-9,0,-4,10,1,10);c.bezierCurveTo(8,7,8,-3,4,-8);c.quadraticCurveTo(0,-10,-6,-6);c.fillStyle=filling.jam;c.fill();
          c.beginPath();c.moveTo(-4,-4);c.quadraticCurveTo(-2,4,1,7);c.quadraticCurveTo(5,2,3,-6);c.closePath();c.fillStyle='#ffe4ce';c.fill();
          for(const [dx,dy] of [[-5,0],[4,1],[0,-6]])ellipse(c,dx,dy,.55,1,'#ffe9b4');
        }
        c.restore();
      }
      ribbon(d,2,'#fffdf3',layer);
    }
    ribbon(0,4,state.coat?tint(state.coat,8):'#ffefd3');
    ribbon(84,3,tint(colors[1],-8));
    c.restore();
  }
  function polygon(c,points){c.beginPath();points.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.closePath();}
  function halfOutline(points,side){
    if(!side)return points;
    const out=[],distance=p=>side*(p.x-1.35*p.y*.66);
    for(let i=0;i<points.length;i++){
      const a=points[i],b=points[(i+1)%points.length],da=distance(a),db=distance(b);
      if(da>=0)out.push(a);
      if((da>=0)!==(db>=0)){const t=da/(da-db);out.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});}
    }
    return out;
  }
  function creamPeak(c,x,y,r,color){
    c.save();c.translate(x,y);
    const g=c.createLinearGradient(-r,-r,r,r);g.addColorStop(0,tint(color,10));g.addColorStop(.45,color);g.addColorStop(1,tint(color,-27));
    c.shadowColor='#79563424';c.shadowBlur=3;c.shadowOffsetY=2;
    c.beginPath();c.moveTo(-r,r*.35);c.bezierCurveTo(-r*1.1,-r*.2,-r*.3,-r*.5,-r*.1,-r*1.4);c.bezierCurveTo(r*.4,-r*.7,r*1.3,-r*.15,r,r*.35);c.bezierCurveTo(r*.5,r*.8,-r*.5,r*.8,-r,r*.35);c.fillStyle=g;c.fill();
    c.shadowColor='transparent';c.strokeStyle='#ffffff80';c.lineWidth=1.3;
    for(const k of [-.5,0,.5]){c.beginPath();c.moveTo(k*r,r*.4);c.quadraticCurveTo(k*r*.4,-r*.25,-r*.1,-r);c.stroke();}c.restore();
  }
  function renderTier(c,tier,side,offset){
    const tilt=cakeTilt(),points=halfOutline(outline(state.shape),side),project=p=>({x:360+p.x*tier.scale+offset.x,y:tier.y+p.y*tilt*tier.scale+offset.y});
    const projected=points.map(project),colors=FLAVORS[state.flavor],coat=state.coat;
    // Extrude the actual half polygon. Only front-facing outer walls are visible.
    const edges=[];
    for(let i=0;i<points.length;i++){
      const p=points[i],q=points[(i+1)%points.length],a=projected[i],b=projected[(i+1)%points.length];
      const cut=side&&Math.abs(p.x-1.35*p.y*.66)<.01&&Math.abs(q.x-1.35*q.y*.66)<.01;
      if(a.x>b.x+.001)edges.push({a,b,cut});
    }
    // Fill all adjacent walls as one path: individual antialiased quads leave seams.
    const outer=edges.filter(edge=>!edge.cut);
    for(const edge of edges.filter(edge=>edge.cut))drawCutFace(c,{x:0,y:0},{back:edge.b,front:edge.a,depth:tier.depth});
    function wallPath(start,end){c.beginPath();for(const {a,b} of outer){c.moveTo(a.x,a.y+start);c.lineTo(b.x,b.y+start);c.lineTo(b.x,b.y+end);c.lineTo(a.x,a.y+end);c.closePath();}}
    wallPath(0,tier.depth);
    const wall=c.createLinearGradient(150,tier.y,550,tier.y+140);wall.addColorStop(0,coat?tint(coat,-8):colors[2]);wall.addColorStop(.55,coat?tint(coat,-20):colors[1]);wall.addColorStop(1,coat?tint(coat,-36):tint(colors[1],-14));c.fillStyle=wall;c.fill();
    if(!coat){wallPath(tier.depth*.42,tier.depth*.58);c.fillStyle='#fff4dc';c.fill();}
    else{
      c.save();wallPath(0,tier.depth);c.clip();
      c.beginPath();for(const {a,b} of outer){const drop=p=>20+5*Math.sin((p.x-150)/17);c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.lineTo(b.x,b.y+drop(b));c.lineTo(a.x,a.y+drop(a));c.closePath();}
      const icing=c.createLinearGradient(0,tier.y,0,tier.y+180);icing.addColorStop(0,tint(coat,5));icing.addColorStop(1,tint(coat,-8));c.fillStyle=icing;c.fill();c.restore();
    }
    polygon(c,projected);const top=c.createLinearGradient(160,tier.y-140,520,tier.y+140);top.addColorStop(0,coat?tint(coat,9):colors[2]);top.addColorStop(.5,coat||colors[2]);top.addColorStop(1,coat?tint(coat,-8):tint(colors[2],-7));c.fillStyle=top;c.fill();
    c.strokeStyle=coat?'#fff9eea0':'#d9b48266';c.lineWidth=1.5;c.stroke();
    c.save();polygon(c,projected);c.clip();const sheen=c.createRadialGradient(270,tier.y-74,5,280,tier.y-30,245);sheen.addColorStop(0,'#ffffff30');sheen.addColorStop(.5,'#ffffff09');sheen.addColorStop(1,'#ffffff00');c.fillStyle=sheen;c.fillRect(100,80,520,470);c.restore();
    if(tier.editable){
      c.save();polygon(c,projected);c.clip();c.translate(360+offset.x,tier.y+offset.y);c.scale(tier.scale,tier.scale*tilt);
      for(const s of state.strokes){if(s.kind==='rosette')s.points.forEach(p=>rosette(c,p.x,p.y,s.size*.6,s.color));else{c.save();c.lineCap='round';c.lineJoin='round';c.lineWidth=s.size;c.strokeStyle=s.color;c.shadowColor='#6d48252b';c.shadowBlur=3;c.shadowOffsetY=3;if(s.points.length===1)ellipse(c,s.points[0].x,s.points[0].y,s.size/2,s.size/2,s.color);else{smoothPath(c,s.points);c.stroke();c.shadowColor='transparent';c.lineWidth=s.size*.22;c.strokeStyle='#ffffff55';c.translate(-1,-2);smoothPath(c,s.points);c.stroke();}c.restore();}}
      c.restore();
    }
    const lace=state.lace||'shell',icing=coat||'#fff5df',ring=outline(state.shape);
    if(lace!=='none'){
      // Upright piped cream follows the surface rather than flattening with it.
      for(let i=0;i<ring.length;i+=10){const p={x:ring[i].x*.92,y:ring[i].y*.92};if(side&&side*(p.x-1.35*p.y*.66)<0)continue;const q=project(p);creamPeak(c,q.x,q.y,15*tier.scale,icing);}
      if(lace==='swag'){
        for(let i=0;i<ring.length-16;i+=16){const p=ring[i],q=ring[i+16];if(p.y<0||q.y<0)continue;if(side&&(side*(p.x-1.35*p.y*.66)<0||side*(q.x-1.35*q.y*.66)<0))continue;const a=project(p),b=project(q);c.save();c.strokeStyle=tint(icing,9);c.lineWidth=4*tier.scale;c.lineCap='round';c.beginPath();c.moveTo(a.x,a.y+12);c.quadraticCurveTo((a.x+b.x)/2,(a.y+b.y)/2+42*tier.scale,b.x,b.y+12);c.stroke();ellipse(c,a.x,a.y+12,3*tier.scale,3*tier.scale,'#fff9ed');c.restore();}
      }
    }
    if(tier.editable)state.toppings.slice().sort((a,b)=>a.y-b.y).forEach(t=>{
      if(!inside(t)||(side&&side*(t.x-1.35*t.y*.66)<0))return;
      const p=project(t);c.save();c.translate(p.x,p.y);c.scale(tier.scale,tier.scale);drawTopping(c,t);c.restore();
    });
  }
  function cakeScene(c,split=0){
    c.save();c.shadowColor='#725b4028';c.shadowBlur=22;c.shadowOffsetY=12;ellipse(c,360,444,277,104,'#ede4d5');c.shadowColor='transparent';ellipse(c,360,435,280,105,'#fffcf5');c.strokeStyle='#e5d9c8';c.lineWidth=1;for(const r of [263,250]){c.beginPath();c.ellipse(360,435,r,r*.35,0,0,Math.PI*2);c.stroke();}c.restore();
    const tiers=[{y:296,scale:1,depth:cakeDepth(),editable:true}];
    // Render back half of the entire stack before its foreground half.
    for(const side of split>0?[1,-1]:[0]){
      const offset=side?splitOffset(side,split,cutSection()):{x:0,y:0};
      for(const tier of tiers)renderTier(c,tier,side,offset);
    }
    dirty=false;
  }
  function drawPipingBag(c,p){const x=360+p.x*topScale(),y=topY()+p.y*cakeTilt()*topScale();c.save();c.translate(x+30,y-58);c.rotate(.22);c.shadowColor='#49342235';c.shadowBlur=8;c.shadowOffsetY=5;const g=c.createLinearGradient(-24,-45,22,26);g.addColorStop(0,'#fffdf7');g.addColorStop(1,'#ead9c7');c.fillStyle=g;c.beginPath();c.moveTo(-24,-42);c.lineTo(24,-42);c.lineTo(16,8);c.quadraticCurveTo(8,25,0,35);c.quadraticCurveTo(-8,25,-16,8);c.closePath();c.fill();c.shadowColor='transparent';c.strokeStyle='#ad8f78';c.lineWidth=2;c.stroke();c.fillStyle='#9c765f';c.fillRect(-4,34,8,14);c.fillStyle=cream;c.beginPath();c.moveTo(-4,48);c.lineTo(4,48);c.lineTo(0,56);c.closePath();c.fill();c.restore();}
  function drawKnife(c,x,y){c.save();c.translate(x,y);c.rotate(-Math.atan(1.35));c.shadowColor='#49342235';c.shadowBlur=9;c.shadowOffsetY=5;const blade=c.createLinearGradient(-10,0,18,0);blade.addColorStop(0,'#aeb2b3');blade.addColorStop(.55,'#fafbf8');blade.addColorStop(1,'#9da2a3');c.fillStyle=blade;c.beginPath();c.moveTo(-10,-82);c.lineTo(18,-82);c.lineTo(13,62);c.quadraticCurveTo(-10,50,-10,34);c.closePath();c.fill();c.shadowColor='transparent';c.fillStyle='#795140';c.fillRect(-10,-137,28,58);c.fillStyle='#c7b09d';ellipse(c,4,-121,2.2,2.2,'#d9c8ba');ellipse(c,4,-94,2.2,2.2,'#d9c8ba');c.restore();}
  async function preparePhoto(file){
    if(!file||!/^image\//.test(file.type)||file.size>40*1024*1024)throw new Error('invalid photo');
    const preview=await new Promise((resolve,reject)=>{
      const url=URL.createObjectURL(file),img=new Image();
      img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('photo decode failed'));};
      img.onload=()=>{try{const scale=Math.min(1,840/Math.max(img.naturalWidth,img.naturalHeight)),out=document.createElement('canvas');out.width=Math.max(1,Math.round(img.naturalWidth*scale));out.height=Math.max(1,Math.round(img.naturalHeight*scale));const c=out.getContext('2d');c.drawImage(img,0,0,out.width,out.height);resolve(out.toDataURL('image/jpeg',.82));}catch(e){reject(e);}finally{URL.revokeObjectURL(url);}};
      img.src=url;
    });
    const canUuid=typeof crypto!=='undefined'&&typeof crypto.randomUUID==='function';
    const id=canUuid?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2);
    originalPhotos.set(id,file);
    let stored=true;try{await storeOriginalPhoto(id,file);}catch(_){stored=false;}
    return {id,preview,stored};
  }
  function ensurePhotoAsset(){
    if(!state.photo)return null;
    const source=state.photoOriginalId||state.photo;
    if(photoAssetSource!==source){
      photoAssetSource=source;photoAsset=null;
      const preview=state.photo,originalId=state.photoOriginalId;
      photoAssetWait=(async()=>{
        let original=null;try{if(originalId)original=await readOriginalPhoto(originalId);}catch(_){}
        if(originalId&&!original){toast('原图暂时无法读取，请重新选择照片后高清导出');return null;}
        const url=original?URL.createObjectURL(original):preview;
        return new Promise(resolve=>{const img=new Image();img.onload=()=>{if(original)URL.revokeObjectURL(url);if(photoAssetSource===source){photoAsset=img;scheduleDraw();}resolve(img);};img.onerror=()=>{if(original)URL.revokeObjectURL(url);resolve(null);};img.src=url;});
      })();
    }
    return photoAsset;
  }
  async function waitForPhotoAsset(){const image=ensurePhotoAsset();if(image)return image;if(photoAssetWait)return photoAssetWait;return null;}
  function drawPhotoCover(c,img,x,y,w,h){const scale=Math.min(w/img.naturalWidth,h/img.naturalHeight),dw=img.naturalWidth*scale,dh=img.naturalHeight*scale;c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';c.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);}
  function drawPaper(c,x,y,w,h){c.save();c.shadowColor='#49342225';c.shadowBlur=22;c.shadowOffsetY=12;c.fillStyle='#fffdf7';c.fillRect(x,y,w,h);c.shadowColor='transparent';c.strokeStyle='#e1d7ca';c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);c.strokeStyle='#d9d1c455';c.setLineDash([1,6]);for(let yy=y+40;yy<y+h-20;yy+=28){c.beginPath();c.moveTo(x+22,yy);c.lineTo(x+w-22,yy);c.stroke();}c.setLineDash([]);c.save();c.translate(x+w*.18,y+8);c.rotate(-.08);c.fillStyle='#e6b7a5cc';c.fillRect(-38,-10,76,20);c.restore();c.save();c.translate(x+w*.79,y+8);c.rotate(.07);c.fillStyle='#b9cbaecc';c.fillRect(-34,-10,68,20);c.restore();c.restore();}
  function drawPhotoCard(c,x,y,w,h){drawPaper(c,x,y,w,h);const img=ensurePhotoAsset(),pad=26;if(img){c.save();c.beginPath();c.rect(x+pad,y+pad,w-pad*2,h-pad*2);c.clip();drawPhotoCover(c,img,x+pad,y+pad,w-pad*2,h-pad*2);c.restore();}}
  function drawMessageCard(c,x,y,w,minHeight,fontSize=27){const text=state.message.trim();let fs=fontSize;c.font=`${fs}px "Songti SC","Noto Serif CJK SC",serif`;let lines=textLines(c,text,w-76);while(lines.length*fs*1.65>300&&fs>20){fs--;c.font=`${fs}px "Songti SC","Noto Serif CJK SC",serif`;lines=textLines(c,text,w-76);}const h=Math.max(minHeight,lines.length*fs*1.55+72);drawPaper(c,x,y,w,h);c.textAlign='center';c.fillStyle='#43382f';c.font=`${fs}px "Songti SC","Noto Serif CJK SC",serif`;const first=y+(h-lines.length*fs*1.55)/2+fs;lines.forEach((line,i)=>c.fillText(line,x+w/2,first+i*fs*1.55));c.fillStyle='#b76d63';c.font='20px Georgia,serif';c.fillText('✦',x+w-28,y+h-20);return h;}
  function drawNote(c,reveal){c.save();c.globalAlpha=reveal;c.translate(0,(1-reveal)*32);if(state.messageMode==='photo')drawPhotoCard(c,130,442,460,205);else drawMessageCard(c,105,462,510,148,27);c.restore();}

  function drawConfetti(c,age){
    if(age<0||age>2.6)return;c.save();c.globalAlpha=Math.min(1,age*4)*(1-ease((age-1.3)/1.3));
    const colors=['#d7a26c','#d9939c','#b9cbaa','#c6b6d9','#ecd4a2'];
    for(let i=0;i<42;i++){const angle=i*2.399,velocity=65+(i*37%110),x=360+Math.cos(angle)*velocity*age,y=190+Math.sin(angle)*velocity*age+55*age*age;c.save();c.translate(x,y);c.rotate(angle+age*(i%2?2:-2));c.fillStyle=colors[i%colors.length];if(i%3===0){c.beginPath();c.moveTo(0,-6);c.quadraticCurveTo(1,0,6,1);c.quadraticCurveTo(0,2,-1,6);c.quadraticCurveTo(-2,0,-6,-1);c.quadraticCurveTo(0,-2,0,-6);c.fill();}else c.fillRect(-3,-5,6,10);c.restore();}c.restore();
  }
  function drawGiftScene(c,progress){
    const p=ease(progress);c.save();c.beginPath();roundedRectPath(c,120-p*100,190-p*180,480+p*220,325+p*175,20);c.clip();c.translate(360,350);const scale=.84+.16*p;c.scale(scale,scale);c.translate(-360,-350);cakeScene(c);c.restore();drawGiftBox(c,progress);drawConfetti(c,progress*2.9-.3);
  }
  function drawGiftBox(c,progress=0){
    const p=ease(progress);if(p>=1)return;
    c.save();c.globalAlpha=1-ease((p-.42)/.58);
    c.save();c.translate(0,p*190);
    c.shadowColor='#795c3930';c.shadowBlur=18;c.shadowOffsetY=8;
    const paper=c.createLinearGradient(100,180,610,530);paper.addColorStop(0,'#fff0d8');paper.addColorStop(.65,'#efd6b4');paper.addColorStop(1,'#d9b891');
    c.beginPath();roundedRectPath(c,98,180,524,360,17);roundedRectPath(c,128,207,459,296,16);c.fillStyle=paper;c.fill('evenodd');c.shadowColor='transparent';
    c.strokeStyle='#fff8e8';c.lineWidth=2;c.beginPath();roundedRectPath(c,127,206,460,298,16);c.stroke();
    c.fillStyle='#ffffff16';c.beginPath();c.moveTo(143,216);c.lineTo(285,216);c.lineTo(165,492);c.lineTo(143,492);c.closePath();c.fill();
    const ribbon=c.createLinearGradient(522,0,554,0);ribbon.addColorStop(0,'#a85948');ribbon.addColorStop(.45,'#d89472');ribbon.addColorStop(1,'#b56b52');c.fillStyle=ribbon;c.fillRect(522,180,32,358);
    c.save();c.translate(547,272);c.rotate(-.13);c.shadowColor='#80543b24';c.shadowBlur=7;c.fillStyle='#fffdf2';c.beginPath();roundedRectPath(c,-30,0,60,92,5);c.fill();c.shadowColor='transparent';ellipse(c,0,9,2.5,2.5,'#bc9676');c.fillStyle='#a15f49';c.textAlign='center';c.font='italic 18px Georgia';c.fillText('For',0,37);c.fillText('you',0,57);c.beginPath();c.moveTo(0,80);c.bezierCurveTo(-17,68,-2,64,0,70);c.bezierCurveTo(3,64,16,69,0,80);c.fill();c.restore();c.restore();
    c.save();c.translate(p*35,-p*225);c.translate(360,170);c.rotate(p*.09);c.translate(-360,-170);
    c.shadowColor='#72513725';c.shadowBlur=12;c.shadowOffsetY=8;const lid=c.createLinearGradient(0,126,0,203);lid.addColorStop(0,'#fff0d9');lid.addColorStop(1,'#ebcba3');c.fillStyle=lid;polygon(c,[{x:94,y:183},{x:142,y:135},{x:582,y:135},{x:627,y:183}]);c.fill();c.fillRect(94,180,533,25);c.shadowColor='transparent';c.strokeStyle='#fff8e8';c.lineWidth=2;c.beginPath();c.moveTo(96,181);c.lineTo(626,181);c.stroke();
    c.fillStyle='#b97659';polygon(c,[{x:341,y:182},{x:353,y:135},{x:382,y:135},{x:374,y:182}]);c.fill();c.fillRect(341,182,33,23);
    c.save();c.translate(356,150);c.scale(2,1.7);drawTopping(c,{kind:'bow',size:29,rot:0},false);c.restore();c.restore();c.restore();
  }
  function openGift(){
    if(giftOpened||giftAnimation)return;
    $('giftOpenBtn').hidden=true;const start=performance.now();
    const tick=now=>{giftProgress=Math.min(1,(now-start)/1700);draw();if(giftProgress<1)giftAnimation=requestAnimationFrame(tick);else{giftAnimation=0;giftOpened=true;renderUI();draw();}};
    giftAnimation=requestAnimationFrame(tick);
  }
  $('giftOpenBtn').onclick=openGift;

  function drawCutStage(){if(!giftOpened){drawGiftScene(ctx,giftProgress);return;}const split=ease(cutReveal)*24;cakeScene(ctx,split);if(!cutComplete&&cutReveal===0){ctx.save();ctx.setLineDash([10,11]);ctx.strokeStyle='#8f3e3590';ctx.lineWidth=2;ctx.beginPath();const {back,front}=cutSection();ctx.moveTo(back.x,back.y);ctx.lineTo(front.x,front.y);ctx.stroke();ctx.setLineDash([]);ctx.restore();if(drawing&&drawing.kind==='cut'&&drawing.cursor)drawKnife(ctx,drawing.cursor.x,drawing.cursor.y);}if(cutReveal>.38)drawNote(ctx,ease((cutReveal-.38)/.62));}
  function resetCut(){cancelAnimationFrame(giftAnimation);giftAnimation=0;giftOpened=false;giftProgress=0;cancelAnimationFrame(cutAnimation);cutAnimation=0;cutProgress=0;cutReveal=0;cutComplete=false;if(drawing&&drawing.kind==='cut'){drawing=null;lastPoint=null;}}
  function completeCut(){if(cutAnimation||cutComplete)return;const captureId=drawing&&drawing.kind==='cut'?drawing.captureId:null;drawing=null;if(captureId!==null){try{if(canvas.hasPointerCapture(captureId))canvas.releasePointerCapture(captureId);}catch(_){}}const start=performance.now();const loop=now=>{cutReveal=Math.min(1,(now-start)/720);draw();if(cutReveal<1)cutAnimation=requestAnimationFrame(loop);else{cutAnimation=0;cutComplete=true;renderUI();draw();requestAnimationFrame(()=>{warmExportAssets().catch(()=>{});});}};cutAnimation=requestAnimationFrame(loop);}
  function draw(){if(drawFrame){cancelAnimationFrame(drawFrame);drawFrame=0;}dirty=true;const ratio=canvas.width/720;ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,720,680);ctx.save();if(state.step===0){ctx.translate(360,350);ctx.scale(viewZoom,viewZoom);ctx.translate(-360,-350);}if(state.step===2)drawCutStage();else cakeScene(ctx);if(drawing&&drawing.kind==='stroke'&&drawing.cursor)drawPipingBag(ctx,drawing.cursor);ctx.restore();}
  function scheduleDraw(){if(drawFrame)return;drawFrame=requestAnimationFrame(()=>{drawFrame=0;draw();});}
  function fitCanvas(){
    if(fitFrame)return;
    fitFrame=requestAnimationFrame(()=>{
      fitFrame=0;
      const r=canvasStage.getBoundingClientRect(),ratio=720/680;
      if(r.width>1&&r.height>1){
        const isCompact=state.step===0&&drawerOpen;
        const w=Math.min(r.width,r.height*ratio);
        canvasWrap.style.width=w+'px';canvasWrap.style.height=w/ratio+'px';
      }
      if(performance.now()<fitUntil)fitCanvas();
    });
  }

  function canvasPoint(clientX,clientY){const r=canvas.getBoundingClientRect();return{x:(clientX-r.left)/r.width*720,y:(clientY-r.top)/r.height*680};}
  function posClient(clientX,clientY){const p=canvasPoint(clientX,clientY),z=state.step===0?viewZoom:1;return{x:(p.x-360)/z,y:((p.y-350)/z+350-topY())/cakeTilt()};}
  function topAt(p){const tilt=cakeTilt();for(let i=state.toppings.length-1;i>=0;i--){const t=state.toppings[i];if(Math.hypot(t.x-p.x,(t.y-p.y)*tilt)<t.size*1.35)return i;}return -1;}
  function eraseAt(p){const tilt=cakeTilt();let erased=false;for(let i=state.toppings.length-1;i>=0;i--){const t=state.toppings[i];if(Math.hypot(t.x-p.x,(t.y-p.y)*tilt)<Math.max(28,t.size*1.35)){state.toppings.splice(i,1);erased=true;}}for(let i=state.strokes.length-1;i>=0;i--){const s=state.strokes[i],radius=Math.max(20,s.size*.85);if(s.points.some(q=>Math.hypot(q.x-p.x,(q.y-p.y)*tilt)<radius)){state.strokes.splice(i,1);erased=true;}}return erased;}
  function beginCutInput(clientX,clientY,id,captureId){if(!giftOpened||cutComplete||cutAnimation)return false;const p=canvasPoint(clientX,clientY),q=cutPoint(p);if(Math.hypot(p.x-q.x,p.y-q.y)>80||q.t>.65)return false;cutProgress=0;drawing={kind:'cut',id,captureId,startProgress:q.t,cursor:q};draw();return true;}
  function beginInput(clientX,clientY,id,captureId=null){if(drawing)return false;if(state.step===2)return beginCutInput(clientX,clientY,id,captureId);if(state.step!==0)return false;const p=posClient(clientX,clientY);if(!inside(p,.98)){if(tool==='erase'){tool=lastTool;renderCanvasTools();draw();}return false;}
    if(tool==='erase'){remember();eraseAt(p);drawing={kind:'erase',id,captureId,cursor:p};lastPoint=p;}
    else{const i=topAt(p);if(i>=0){remember();drawing={kind:'move',index:i,id,captureId,offset:{x:state.toppings[i].x-p.x,y:state.toppings[i].y-p.y},cursor:p};}
      else if(tool==='pipe'||tool==='rosette'){if(state.strokes.length>=480){toast('这块蛋糕装饰得很满啦');return false;}remember();const s={kind:tool==='rosette'?'rosette':'pipe',color:cream,size,points:[p]};state.strokes.push(s);drawing={kind:'stroke',stroke:s,id,captureId,cursor:p};lastPoint=p;}
      else{if(!inside(p,.84))return false;if(state.toppings.length>=400){toast('配料已经很丰富啦');return false;}remember();state.toppings.push({kind:topping,x:p.x,y:p.y,size:29,rot:(Math.random()-.5)*.32});drawing={kind:'move',index:state.toppings.length-1,id,captureId,offset:{x:0,y:0},cursor:p};}
    }draw();syncHistory();return true;
  }
  function moveInput(samples,id){if(!drawing||drawing.id!==id||!samples.length)return false;const last=samples[samples.length-1];if(drawing.kind==='cut'){const q=cutPoint(canvasPoint(last.clientX,last.clientY));drawing.cursor=q;cutProgress=Math.max(cutProgress,Math.max(0,(q.t-drawing.startProgress)/(1-drawing.startProgress)));if(cutProgress>=.88){cutProgress=1;completeCut();}else scheduleDraw();return true;}const p=posClient(last.clientX,last.clientY);drawing.cursor=p;
    if(drawing.kind==='erase'){if(inside(p,1.02))eraseAt(p);lastPoint=p;}
    else if(drawing.kind==='move'){const q={x:p.x+drawing.offset.x,y:p.y+drawing.offset.y};if(inside(q,.84))Object.assign(state.toppings[drawing.index],q);}
    else{const s=drawing.stroke,min=s.kind==='rosette'?s.size*.78:2.4;for(const sample of samples){const q=posClient(sample.clientX,sample.clientY);if(inside(q)&&Math.hypot(q.x-lastPoint.x,q.y-lastPoint.y)>min&&s.points.length<6000){s.points.push(q);lastPoint=q;}}}
    scheduleDraw();return true;
  }
  function endInput(id){if(!drawing||(id!==undefined&&drawing.id!==id))return;const finished=drawing,captureId=finished.captureId;drawing=null;lastPoint=null;if(captureId!==null){try{if(canvas.hasPointerCapture(captureId))canvas.releasePointerCapture(captureId);}catch(_){}}if(finished.kind==='cut'){if(cutProgress>=.72)completeCut();else{cutProgress=0;draw();toast('沿虚线向下划到底');}return;}changed();}
  function endDraw(){endInput();}
  const contactPoints=new Map();let pinch=null,gestureBaseline=null;
  function startContact(id,x,y,captureId){
    if(state.step!==0){beginInput(x,y,id,captureId);return;}
    if(!contactPoints.size)gestureBaseline={state:clone(state),history:history.slice(),future:future.slice()};
    contactPoints.set(id,{x,y});
    if(contactPoints.size===2){
      endDraw();state=gestureBaseline.state;history=gestureBaseline.history;future=gestureBaseline.future;persist();syncHistory();
      const [a,b]=[...contactPoints.values()];pinch={distance:Math.hypot(a.x-b.x,a.y-b.y)||1,zoom:viewZoom};draw();return;
    }
    if(!pinch)beginInput(x,y,id,captureId);
  }
  function moveContact(id,x,y,samples){
    if(contactPoints.has(id))contactPoints.set(id,{x,y});
    if(pinch){if(contactPoints.size>=2){const [a,b]=[...contactPoints.values()];viewZoom=Math.max(.8,Math.min(1.6,pinch.zoom*Math.hypot(a.x-b.x,a.y-b.y)/pinch.distance));syncViewControls();scheduleDraw();}return true;}
    return moveInput(samples||[{clientX:x,clientY:y}],id);
  }
  function finishContact(id){
    contactPoints.delete(id);
    if(pinch){if(!contactPoints.size){pinch=null;gestureBaseline=null;}return;}
    endInput(id);if(!contactPoints.size)gestureBaseline=null;
  }
  if(window.PointerEvent){
    canvas.addEventListener('pointerdown',e=>{if(state.step!==0&&state.step!==2)return;e.preventDefault();startContact('p:'+e.pointerId,e.clientX,e.clientY,e.pointerId);try{canvas.setPointerCapture(e.pointerId);}catch(_){}},{passive:false});
    window.addEventListener('pointermove',e=>{let samples=[e];try{const list=typeof e.getCoalescedEvents==='function'?e.getCoalescedEvents():null;if(list&&list.length)samples=list;}catch(_){}if(moveContact('p:'+e.pointerId,e.clientX,e.clientY,samples))e.preventDefault();},{passive:false});
    window.addEventListener('pointerup',e=>finishContact('p:'+e.pointerId));
    window.addEventListener('pointercancel',e=>finishContact('p:'+e.pointerId));
  }else{
    canvas.addEventListener('touchstart',e=>{e.preventDefault();for(const t of e.changedTouches)startContact('t:'+t.identifier,t.clientX,t.clientY,null);},{passive:false});
    window.addEventListener('touchmove',e=>{let handled=false;for(const t of e.changedTouches)handled=moveContact('t:'+t.identifier,t.clientX,t.clientY)||handled;if(handled)e.preventDefault();},{passive:false});
    for(const name of ['touchend','touchcancel'])window.addEventListener(name,e=>{for(const t of e.changedTouches)finishContact('t:'+t.identifier);},{passive:false});
    canvas.addEventListener('dragstart',e=>e.preventDefault());canvas.addEventListener('contextmenu',e=>e.preventDefault());canvas.addEventListener('selectstart',e=>e.preventDefault());
  }
  canvas.addEventListener('wheel',e=>{if(state.step!==0)return;e.preventDefault();setZoom(viewZoom-e.deltaY*.001);},{passive:false});

  const ease = x => {x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
  function textLines(c,text,maxWidth){const lines=[];let paragraphs=text.replace(/\n{3,}/g,'\n\n').split('\n');if(paragraphs.length>6)paragraphs=[paragraphs.filter(Boolean).join(' ')];for(const paragraph of paragraphs){let line='';for(const ch of Array.from(paragraph)){if(line&&c.measureText(line+ch).width>maxWidth){lines.push(line);line=ch;}else line+=ch;}lines.push(line);}return lines;}
  const duration=()=>state.messageMode==='photo'?12.4:Math.max(9.6,6.8+Array.from(state.message||'').length*.11);
  function drawShareImage(){withPresentation(drawShareImageContent);}
  function withPresentation(fn){const previous=presentationRendering;presentationRendering=true;try{return fn();}finally{presentationRendering=previous;}}
  function drawShareImageContent(){const c=shareContext;resetShareContext();c.fillStyle='#f7f3eb';c.fillRect(0,0,720,1280);c.strokeStyle='#d8cabb';c.lineWidth=1;c.strokeRect(28,28,664,1224);c.textAlign='center';c.save();c.translate(0,-4);cakeScene(c,0);c.restore();if(state.messageMode==='photo')drawPhotoCard(c,45,515,630,660);else drawMessageCard(c,85,647,550,240,32);c.fillStyle='#a49480';c.font='14px "Songti SC","Noto Serif CJK SC",serif';c.fillText('蛋糕工坊',360,1218);}
  function drawVideoFrame(time=0){withPresentation(()=>drawVideoContent(time));}
  function drawVideoContent(time=0){const t=Math.max(0,time-2.4);const c=shareContext,split=ease((t-2.9)/1.15)*24*(1-ease((time-8.4)/1.2)),reveal=ease((t-3.8)/1);resetShareContext();c.fillStyle='#f7f3eb';c.fillRect(0,0,720,1280);c.strokeStyle='#d8cabb';c.lineWidth=1;c.strokeRect(28,28,664,1224);c.textAlign='center';c.save();c.translate(0,28-reveal*12);if(time<3)drawGiftScene(c,(time-.65)/2.35);else{cakeScene(c,split);drawConfetti(c,time-1.5);}c.restore();if(t>=2&&t<3.75){const down=ease((t-2)/.75),out=ease((t-3.05)/.7);c.save();c.globalAlpha=1-out;const {back,front}=cutSection();c.translate(back.x+(front.x-back.x)*down,28+back.y+(front.y-back.y)*down);c.rotate(-Math.atan(1.35));const blade=c.createLinearGradient(-12,0,22,0);blade.addColorStop(0,'#b6babc');blade.addColorStop(.55,'#f5f6f4');blade.addColorStop(1,'#a0a6a8');c.fillStyle=blade;c.beginPath();c.moveTo(-12,-100);c.lineTo(20,-100);c.lineTo(14,105);c.quadraticCurveTo(-12,84,-12,65);c.closePath();c.fill();c.fillStyle='#6d4a38';c.fillRect(-12,-174,31,76);ellipse(c,3,-159,2,2,'#c5b3a1');ellipse(c,3,-118,2,2,'#c5b3a1');c.restore();}if(reveal>0){c.save();c.globalAlpha=reveal;c.translate(0,(1-reveal)*65);if(state.messageMode==='photo')drawPhotoCard(c,45,515,630,660);else drawMessageCard(c,85,647,550,240,32);c.restore();}c.fillStyle='#a49480';c.font='14px "Songti SC","Noto Serif CJK SC",serif';c.fillText('蛋糕工坊',360,1218);}
  function stopAnimation(){cancelAnimationFrame(animation);animation=0;}
  function exportKey(){return JSON.stringify([state.shape,state.flavor,state.lace,state.coat,state.strokes,state.toppings,state.messageMode,state.message,state.photoOriginalId||state.photo,cutComplete]);}
  function setExportProgress(text,progress,hide){const wrap=$('exportProgress');if(hide){wrap.hidden=true;return;}wrap.hidden=false;$('exportProgressText').textContent=text||'正在准备导出内容…';$('exportProgressBar').style.width=Math.max(0,Math.min(100,Math.round((progress||0)*100)))+'%';}
  async function warmExportAssets(){if(!cutComplete)return null;const key=exportKey();if(exportWarmKey===key&&imageDataUrl)return imageDataUrl;if(exportWarmPromise&&exportWarmKey===key)return exportWarmPromise;exportWarmKey=key;exportWarmPromise=(async()=>{try{if(state.messageMode==='photo'&&!await waitForPhotoAsset())throw new Error('photo unavailable');drawShareImage();imageDataUrl=shareCanvas.toDataURL('image/png');await saveWork();return imageDataUrl;}catch(e){if(exportWarmKey===key)imageDataUrl='';throw e;}finally{if(exportWarmKey===key)exportWarmPromise=null;}})();return exportWarmPromise;}
  function clearExport(keepImage){stopAnimation();if(!keepImage)imageDataUrl='';videoBlob=null;cancelRequested=false;setExportProgress('正在准备导出内容…',keepImage ? .35 : .08,false);$('replayPreviewBtn').hidden=true;$('replayPreviewBtn').disabled=true;$('shareActions').hidden=false;$('exportVideoBtn').textContent='视频准备中…';$('exportVideoBtn').disabled=true;$('publishBtn').disabled=!keepImage;}
  function openExport(){endDraw();flushText();stopAnimation();const keepImage=!!imageDataUrl&&exportWarmKey===exportKey();clearExport(keepImage);drawShareImage();$('previewDialog').showModal();document.body.style.overflow='hidden';requestAnimationFrame(prepareExport);}
  $('previewDialog').addEventListener('cancel',()=>{cancelRequested=true;if(recording&&recording.state==='recording')recording.stop();});
  $('previewDialog').addEventListener('close',()=>{cancelRequested=true;stopAnimation();if(recording&&recording.state==='recording')recording.stop();document.body.style.overflow='';setExportProgress('',0,true);if(restoreAfterShare){state=restoreAfterShare.state;activeWorkId=restoreAfterShare.activeWorkId;restoreAfterShare=null;renderUI();draw();}});
  $('closePreviewBtn').onclick=()=>$('previewDialog').close();
  function recorderFormat(){if(!window.MediaRecorder||!shareCanvas.captureStream)return null;for(const mime of ['video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm']){if(MediaRecorder.isTypeSupported(mime))return mime;}return null;}
  function previewButtons(){const ready=!!videoBlob;$('exportVideoBtn').disabled=exporting||!ready;$('publishBtn').disabled=exporting||!imageDataUrl;$('replayPreviewBtn').disabled=exporting;$('replayPreviewBtn').hidden=!imageDataUrl;}
  function animatePreview(){return new Promise(resolve=>{stopAnimation();const start=performance.now(),length=duration();$('replayPreviewBtn').disabled=true;const loop=now=>{if(cancelRequested||!$('previewDialog').open){animation=0;resolve(false);return;}const elapsed=(now-start)/1000;drawVideoFrame(Math.min(elapsed,length));if(elapsed<length)animation=requestAnimationFrame(loop);else{animation=0;$('replayPreviewBtn').disabled=false;resolve(true);}};animation=requestAnimationFrame(loop);});}
  async function generateVideoPreview(){const mime=recorderFormat();if(!mime){setExportProgress('当前环境不支持保存视频',1,false);await animatePreview();$('exportVideoBtn').textContent='当前环境不支持保存视频';$('exportVideoBtn').disabled=true;return;}cancelRequested=false;$('exportVideoBtn').textContent='视频准备中…';setExportProgress('正在生成礼物视频…',.55,false);let stream,watchdog;const chunks=[];try{drawVideoFrame(0);stream=shareCanvas.captureStream(30);recording=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:state.messageMode==='photo'?16000000:10000000});const done=new Promise((resolve,reject)=>{recording.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};recording.onerror=e=>reject(e.error||new Error('录制失败'));recording.onstop=resolve;});recording.start(250);const start=performance.now(),length=duration();const loop=now=>{if(cancelRequested||!$('previewDialog').open){if(recording&&recording.state==='recording')recording.stop();return;}const elapsed=(now-start)/1000;drawVideoFrame(Math.min(elapsed,length));setExportProgress('正在生成礼物视频… '+Math.min(99,Math.round((elapsed/length)*100))+'%',.55+Math.min(1,elapsed/length)*.45,false);if(elapsed<length)animation=requestAnimationFrame(loop);else if(recording.state==='recording')recording.stop();};animation=requestAnimationFrame(loop);watchdog=setTimeout(()=>{cancelRequested=true;if(recording&&recording.state==='recording')recording.stop();},(length+12)*1000);await done;stopAnimation();if(cancelRequested||!$('previewDialog').open)return;const type=recording.mimeType.split(';')[0],result=new Blob(chunks,{type});if(result.size<1000)throw new Error('empty video');videoBlob=result;$('exportVideoBtn').textContent='保存视频';setExportProgress('',1,true);}catch(e){if(!cancelRequested){$('exportVideoBtn').textContent='视频生成失败';setExportProgress('视频生成失败，你仍然可以发布图片笔记',1,false);toast('视频生成失败，仍可发布图片笔记');console.error('Video export:',e);}}finally{clearTimeout(watchdog);stopAnimation();if(stream)stream.getTracks().forEach(t=>t.stop());recording=null;}}
  async function prepareExport(){if(exporting)return;exporting=true;cancelRequested=false;previewButtons();try{setExportProgress('正在准备导出内容…',imageDataUrl ? .35 : .12,false);if(!imageDataUrl){await warmExportAssets();setExportProgress('图片已准备好，正在生成视频…',.45,false);}else setExportProgress('图片已准备好，正在生成视频…',.45,false);$('publishBtn').disabled=false;if(cancelRequested||!$('previewDialog').open)return;await generateVideoPreview();}catch(e){if(!cancelRequested){setExportProgress('导出内容准备失败，请返回重试',1,false);toast('导出内容准备失败，请返回重试');console.error('Export prepare:',e);}}finally{exporting=false;previewButtons();}}
  async function shareVideo(){if(!videoBlob){toast(exporting?'视频还在准备，请稍等':'当前环境暂时不能保存视频');return;}const type=videoBlob.type||'video/mp4',ext=type.indexOf('mp4')>=0?'mp4':'webm',name='蛋糕工坊.'+ext;try{const file=typeof File==='function'?new File([videoBlob],name,{type:type}):null;if(!file||typeof navigator.share!=='function'){toast('当前环境不支持直接保存视频');return;}if(typeof navigator.canShare==='function'&&!navigator.canShare({files:[file]})){toast('当前环境不支持直接保存视频');return;}await navigator.share({files:[file],title:'蛋糕工坊'});}catch(e){if(e&&e.name!=='AbortError')toast('没有打开系统保存面板，请稍后重试');}}
  $('exportVideoBtn').onclick=shareVideo;
  $('replayPreviewBtn').onclick=()=>{if(exporting||animation)return;cancelRequested=false;animatePreview();};
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&exporting){cancelRequested=true;if(recording&&recording.state==='recording')recording.stop();}});
  $('publishBtn').onclick=async()=>{if(!imageDataUrl){toast('分享图片还没有生成');return;}const bridge=window.xhs&&window.xhs.miniTool;if(!bridge||!bridge.postNote){toast('当前浏览器没有发布接口，请在小红书容器中打开');return;}try{const options={title:'蛋糕工坊',pageType:'photo_publish',mediaInfo:{image_resources:[{url:imageDataUrl}]}};if(state.messageMode!=='photo'&&state.message.trim())options.content=state.message.trim();await bridge.postNote(options);toast('已打开图片笔记发布页');}catch(_){toast('发布失败，请稍后重试');}};
  document.addEventListener('selectstart',e=>{if(!e.target.closest('input,textarea,[contenteditable="true"]'))e.preventDefault();});
  document.addEventListener('contextmenu',e=>{if(!e.target.closest('input,textarea,[contenteditable="true"]'))e.preventDefault();});
  window.addEventListener('pagehide',()=>{flushText();persist();});
  if(window.ResizeObserver){canvasObserver=new ResizeObserver(fitCanvas);canvasObserver.observe(canvasStage);canvasObserver.observe(document.querySelector('.atelier'));}
  document.querySelector('.atelier').addEventListener('transitionend',fitCanvas);
  window.addEventListener('resize',fitCanvas);window.addEventListener('orientationchange',fitCanvas);

  // The editor camera never changes the saved cake geometry or export resolution.
  function syncViewControls(){$('zoomSlider').value=Math.round(viewZoom*100);$('zoomLabel').textContent=Math.round(viewZoom*100)+'%';$('angleSlider').value=Math.round(viewTilt*100);}
  function setZoom(value){endDraw();viewZoom=Math.max(.8,Math.min(1.6,value));syncViewControls();draw();}
  $('zoomSlider').oninput=e=>setZoom(+e.target.value/100);
  $('zoomIn').onclick=()=>setZoom(viewZoom+.1);$('zoomOut').onclick=()=>setZoom(viewZoom-.1);
  $('angleSlider').oninput=e=>{endDraw();viewTilt=+e.target.value/100;syncViewControls();draw();};
  $('resetView').onclick=()=>{endDraw();viewZoom=1;viewTilt=.72;syncViewControls();draw();};

  const THEMES=[
    {name:'草莓奶油日',prompt:'粉色奶油，搭配草莓和一片薄荷。',shape:'round',coat:'#f4c7c5',lace:'shell',items:['strawberry','mint','meringue'],flavor:'vanilla'},
    {name:'月光蓝莓',prompt:'让蓝莓、珍珠糖和淡紫色一起发光。',shape:'round',coat:'#d6cce1',lace:'swag',items:['blueberry','pearl','macaron'],flavor:'vanilla'},
    {name:'花园来信',prompt:'在心形蛋糕上种下玫瑰与小雏菊。',shape:'heart',coat:'#f6e8d2',lace:'swag',items:['rose','flower','mint'],flavor:'strawberry'},
    {name:'可可下午茶',prompt:'巧克力与樱桃，送给需要休息的人。',shape:'square',coat:'#b7917d',lace:'shell',items:['chocolate','cherry','macaron'],flavor:'cocoa'},
    {name:'薄荷小云朵',prompt:'做一朵轻盈的云，留住一个好心情。',shape:'cloud',coat:'#d1d8bd',lace:'swag',items:['mint','pearl','meringue'],flavor:'vanilla'},
    {name:'花朵庆祝会',prompt:'花朵、丝带和蜡烛，庆祝平常的一天。',shape:'flower',coat:'#f5e4b8',lace:'shell',items:['bow','flower','candle'],flavor:'vanilla'}
  ];
  function themedState(theme){
    const result=blank();Object.assign(result,{shape:theme.shape,coat:theme.coat,lace:theme.lace,flavor:theme.flavor});
    for(let i=0;i<6;i++){const a=i*Math.PI/3,resultKind=theme.items[i%theme.items.length];result.toppings.push({kind:resultKind,x:Math.cos(a)*118,y:Math.sin(a)*110,size:resultKind==='mint'?23:29,rot:Math.sin(i)*.12});}
    return result;
  }
  function dailyIndex(){const date=new Date();return Math.floor(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())/86400000)%THEMES.length;}
  function openInspiration(){
    const todayComplete=cabinetItems.some(item=>!item.deletedAt&&new Date(item.updated).toDateString()===new Date().toDateString()&&item.snapshot.themeIndex===dailyIndex()&&new Set(item.snapshot.toppings.map(t=>t.kind)).size>=2);const daily=THEMES[dailyIndex()];$('dailyPrompt').textContent=(todayComplete?'✦ 今日灵感已收藏。再试试自己的新搭配。 ':'')+'今日灵感 · '+daily.name+' — '+daily.prompt+' 自由搭配两种装饰，收藏你自己的版本。';
    const grid=$('themeGrid');clearElement(grid);
    THEMES.forEach((theme,index)=>{
      const button=document.createElement('button');button.className='theme-card';
      const thumb=document.createElement('canvas');thumb.width=360;thumb.height=300;button.append(thumb);
      const current=state;try{state=themedState(theme);const c=thumb.getContext('2d');c.scale(.5,.5);c.translate(0,-60);withPresentation(()=>cakeScene(c));}finally{state=current;}
      const title=document.createElement('b');title.textContent=theme.name;const desc=document.createElement('small');desc.textContent=theme.prompt;
      const cta=document.createElement('small');cta.className='theme-cta';cta.textContent='套用这款 ↗';button.append(title,desc,cta);
      button.onclick=()=>{endDraw();remember();const next=themedState(theme);Object.assign(state,{shape:next.shape,flavor:next.flavor,coat:next.coat,lace:next.lace,strokes:[],toppings:next.toppings,themeIndex:index});$('inspirationDialog').close();renderUI();changed();toast('灵感已放上手作台，还可以继续自由改造');};
      grid.append(button);
    });$('inspirationDialog').showModal();
  }
  $('inspirationBtn').onclick=openInspiration;$('closeInspiration').onclick=()=>$('inspirationDialog').close();
  async function worksRequest(mode,action){const db=await photoDB();return new Promise((resolve,reject)=>{const tx=db.transaction('works',mode);let value;const request=action(tx.objectStore('works'));request.onsuccess=()=>{value=request.result;};tx.oncomplete=()=>resolve(value);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('保存中断'));});}
  async function refreshWorks(){cabinetItems=(await worksRequest('readonly',store=>store.getAll())).filter(item=>item&&item.id&&validDraft(item.snapshot)).sort((a,b)=>b.updated-a.updated);$('cabinetCount').textContent=cabinetItems.filter(item=>!item.deletedAt).length;}
  function clearCabinetUrls(){cabinetUrls.splice(0).forEach(URL.revokeObjectURL);}
  function drawCabinet(){
    clearCabinetUrls();const items=cabinetItems.filter(item=>!item.deletedAt),grid=$('cabinetGrid');clearElement(grid);
    const shapes=new Set(items.map(item=>item.snapshot.shape)),paletteCount=new Set(items.map(item=>item.snapshot.coat)).size;
    const badges=[['第一份甜蜜',items.length>=1,Math.min(items.length,1),1],['造型收藏家',shapes.size>=3,Math.min(shapes.size,3),3],['配色实验家',paletteCount>=3,Math.min(paletteCount,3),3],['小小蛋糕店',items.length>=6,Math.min(items.length,6),6]];
    const badgeBox=$('collectionBadges');clearElement(badgeBox);badges.forEach(([name,earned,count,goal])=>{const el=document.createElement('span');el.className='badge'+(earned?' earned':'');el.textContent=(earned?'✦ ':'○ ')+name+(earned?'':' · '+count+'/'+goal);el.title=({第一份甜蜜:'收藏 1 件作品',造型收藏家:'收藏 3 种形状',配色实验家:'收藏 3 种奶油配色',小小蛋糕店:'收藏 6 件作品'})[name];badgeBox.appendChild(el);});
    $('cabinetStatus').textContent=items.length?'已收藏 '+items.length+' 份甜蜜 · 点开查看、再次分享，或改做一款新变化':'这里等着你的第一块蛋糕。完成制作后会自动收进蛋糕柜。';
    items.forEach(item=>{const button=document.createElement('button');button.className='cabinet-card';const img=document.createElement('img');img.loading='lazy';img.alt=item.title;const url=URL.createObjectURL(item.thumbnail||item.image);cabinetUrls.push(url);img.src=url;const title=document.createElement('b');title.textContent=item.title;const date=document.createElement('small');date.textContent=new Date(item.created).toLocaleDateString('zh-CN');button.append(img,title,date);button.onclick=()=>openWork(item);grid.append(button);});
  }
  async function openCabinet(){$('cabinetDialog').showModal();$('cabinetStatus').textContent='正在打开蛋糕柜…';try{await refreshWorks();drawCabinet();}catch(e){$('cabinetStatus').textContent='当前浏览器暂时无法读取收藏，请保留页面后重试。';}}
  $('cabinetBtn').onclick=openCabinet;$('closeCabinet').onclick=()=>$('cabinetDialog').close();
  $('cabinetDialog').addEventListener('close',clearCabinetUrls);
  function canvasBlob(element){return new Promise((resolve,reject)=>element.toBlob(blob=>blob?resolve(blob):reject(new Error('无法生成图片')),'image/png'));}
  function dataUrlToBlob(dataUrl){const parts=dataUrl.split(','),header=parts[0]||'',match=/data:([^;]+);base64/.exec(header),mime=match?match[1]:'image/png',binary=atob(parts[1]||''),bytes=new Uint8Array(binary.length);for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);return new Blob([bytes],{type:mime});}
  function autoWorkTitle(){if(state.workTitle)return state.workTitle;const theme=Number.isInteger(state.themeIndex)&&THEMES[state.themeIndex]?THEMES[state.themeIndex].name:SHAPES[state.shape][0]+'小蛋糕',d=new Date();return theme+' · '+(d.getMonth()+1)+'/'+d.getDate();}
  async function saveWork(){
    if(archiveBusy||!imageDataUrl||restoreAfterShare)return;
    archiveBusy=true;
    try{
      const snapshot=clone(state);delete snapshot.tiers;snapshot.step=1;
      const canUuid=typeof crypto!=='undefined'&&typeof crypto.randomUUID==='function';
      const id=activeWorkId||state.workId||(canUuid?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2));
      const old=cabinetItems.find(item=>item.id===id),image=dataUrlToBlob(imageDataUrl),thumb=document.createElement('canvas');
      thumb.width=288;thumb.height=512;thumb.getContext('2d').drawImage(shareCanvas,0,0,288,512);
      const item={id:id,title:autoWorkTitle(),snapshot:snapshot,image:image,thumbnail:await canvasBlob(thumb),created:old?old.created:Date.now(),updated:Date.now()};
      await worksRequest('readwrite',store=>store.put(item,id));activeWorkId=id;state.workId=id;state.workTitle=item.title;persist();
      await refreshWorks();
    }catch(e){toast('蛋糕柜自动保存失败，但仍可以继续导出');console.error('Cabinet save:',e);}
    finally{archiveBusy=false;}
  }
  let detailUrl=null,removedWork=null;
  function openWork(item){selectedWork=item;$('workDetailTitle').textContent=item.title;$('workZoom').value=100;$('workImage').style.width='100%';if(detailUrl)URL.revokeObjectURL(detailUrl);detailUrl=URL.createObjectURL(item.image);$('workImage').src=detailUrl;$('workDialog').showModal();}
  $('closeWork').onclick=()=>$('workDialog').close();
  $('workDialog').addEventListener('close',()=>{if(detailUrl)URL.revokeObjectURL(detailUrl);detailUrl=null;$('workImage').removeAttribute('src');});
  $('workZoom').oninput=e=>{$('workImage').style.width=e.target.value+'%';};
  $('removeWork').onclick=async()=>{if(!selectedWork)return;const item=selectedWork;$('removeWork').disabled=true;try{const removed=Object.assign({},item,{deletedAt:Date.now()});await worksRequest('readwrite',store=>store.put(removed,item.id));removedWork=item;$('undoRemove').hidden=false;$('workDialog').close();await refreshWorks();drawCabinet();toast('已移出蛋糕柜，可点击“撤销刚刚的移除”恢复');}catch(_){toast('移除失败，请重试');}finally{$('removeWork').disabled=false;}};
  $('undoRemove').onclick=async()=>{if(!removedWork)return;try{await worksRequest('readwrite',store=>store.put(removedWork,removedWork.id));removedWork=null;$('undoRemove').hidden=true;await refreshWorks();drawCabinet();}catch(_){toast('恢复失败，请重试');}};
  $('shareWork').onclick=()=>{if(!selectedWork)return;const item=selectedWork;restoreAfterShare={state,activeWorkId};state=clone(item.snapshot);activeWorkId=item.id;state.workTitle=item.title;$('workDialog').close();$('cabinetDialog').close();openExport();};
  $('remixWork').onclick=()=>{if(!selectedWork)return;remember();state=clone(selectedWork.snapshot);delete state.tiers;delete state.workId;delete state.workTitle;activeWorkId=null;state.step=0;resetCut();viewZoom=1;syncViewControls();$('workDialog').close();$('cabinetDialog').close();renderUI();changed();toast('新变化已放上手作台，原作品仍在蛋糕柜');};
  refreshWorks().catch(()=>{$('cabinetCount').textContent='—';});
  syncViewControls();

  activeWorkId=state.workId||null;renderUI();fitCanvas();draw();
  try{if(state.step===0&&localStorage.getItem('cake-tool-drawer-coach')!=='seen')$('drawerCoach').hidden=false;}catch(_){if(state.step===0)$('drawerCoach').hidden=false;}
})();
