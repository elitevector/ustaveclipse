/* Белый огонь на фоне */
(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c=document.getElementById("fire"),x=c.getContext("2d");let W,H,P=[];
  const spr=document.createElement("canvas");spr.width=spr.height=64;
  const sx=spr.getContext("2d"),g=sx.createRadialGradient(32,32,0,32,32,32);
  g.addColorStop(0,"rgba(255,255,255,1)");g.addColorStop(.4,"rgba(255,255,255,.35)");g.addColorStop(1,"rgba(255,255,255,0)");
  sx.fillStyle=g;sx.fillRect(0,0,64,64);
  function size(){W=c.width=innerWidth;H=c.height=innerHeight}
  addEventListener("resize",size);size();
  function spawn(){P.push({x:Math.random()*W,y:H+10,r:18+Math.random()*34,vy:.7+Math.random()*1.5,ph:Math.random()*6.28,l:0,m:150+Math.random()*130})}
  (function loop(){
    x.clearRect(0,0,W,H);x.globalCompositeOperation="lighter";
    for(let i=0;i<Math.max(1,W/500|0)+1;i++)spawn();
    P=P.filter(p=>p.l<p.m);
    for(const p of P){
      p.l++;p.y-=p.vy;p.x+=Math.sin(p.l*.04+p.ph)*.8;
      const t=p.l/p.m,a=(1-t)*.16*(.6+.4*Math.sin(p.l*.3+p.ph)),r=p.r*(1-t*.6);
      x.globalAlpha=a;x.drawImage(spr,p.x-r,p.y-r,r*2,r*2);
    }
    x.globalAlpha=1;x.globalCompositeOperation="source-over";
    requestAnimationFrame(loop);
  })();
})();
/* Подсветка панелей под курсором */
document.querySelectorAll(".panel").forEach(p=>p.addEventListener("pointermove",e=>{
  const r=p.getBoundingClientRect();p.style.setProperty("--mx",(e.clientX-r.left)+"px");p.style.setProperty("--my",(e.clientY-r.top)+"px");
}));
/* Плавный уход со страницы */
document.querySelectorAll("aside a").forEach(a=>a.addEventListener("click",e=>{
  if(a.classList.contains("on")||e.metaKey||e.ctrlKey)return;
  e.preventDefault();document.body.classList.add("out");setTimeout(()=>location.href=a.href,230);
}));
