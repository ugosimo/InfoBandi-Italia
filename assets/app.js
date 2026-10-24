(function(){
  var $=function(id){return document.getElementById(id)};
  var eur=new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'});
  var fig=0;
  function num(id,def){var v=parseFloat(String($(id).value).replace(',','.'));return isFinite(v)&&v>=0?v:def}
  function rows(r){return r.map(function(x){return '<tr class="'+(x[2]||'')+'"><td>'+x[0]+'</td><td class="'+(x[3]||'')+'">'+x[1]+'</td></tr>'}).join('')}

  function calc(){
    var L=num('premio',0), bonusPct=num('p-bonus',15)/100, inpsPct=num('p-inps',9.19)/100, impPct=num('p-imp',1)/100;
    var inps=L*inpsPct, imponibile=L-inps, imposta=imponibile*impPct, cash=imponibile-imposta;
    var soglia=num('p-soglia',1000), ecc=Math.max(0,L-soglia), bonus=ecc*bonusPct, wel=L+bonus, diff=wel-cash;
    $('soglia-txt').textContent=eur.format(soglia);
    $('rule-calc').textContent=ecc>0?'Eccedenza '+eur.format(ecc)+' × '+(bonusPct*100).toLocaleString('it-IT',{maximumFractionDigits:2})+'% = '+eur.format(bonus)+' di extra.':'Sotto la soglia non c’è nessun extra: aggiungi l’eccedenza per vederlo.';

    var v=$('verdict');
    if(L<=0){v.className='verdict even';v.innerHTML='<p>Inserisci l’importo del premio per iniziare.</p>'}
    else if(diff>0.005){v.className='verdict';v.innerHTML='<p>Scegliendo il welfare ricevi in più</p><div class="big">'+eur.format(diff)+'</div><p>'+eur.format(wel)+' di welfare contro '+eur.format(cash)+' netti in busta paga.</p>'}
    else if(diff<-0.005){v.className='verdict cash';v.innerHTML='<p>Con questi parametri conviene il cash, che ti lascia in più</p><div class="big">'+eur.format(-diff)+'</div><p>'+eur.format(cash)+' netti contro '+eur.format(wel)+' di welfare.</p>'}
    else{v.className='verdict even';v.innerHTML='<p>Cash e welfare si equivalgono.</p>'}

    var max=Math.max(cash,wel,1);
    $('b-cash').style.width=(cash/max*100)+'%'; $('b-wel').style.width=(wel/max*100)+'%';
    $('v-cash').textContent=eur.format(cash); $('v-wel').textContent=eur.format(wel);

    $('t-cash').innerHTML='<caption>Se scegli il cash</caption>'+rows([
      ['Premio lordo',eur.format(L)],
      ['Contributi INPS ('+(inpsPct*100).toLocaleString('it-IT',{maximumFractionDigits:2})+'%)','− '+eur.format(inps),'','neg'],
      ['Imponibile',eur.format(imponibile)],
      ['Imposta sostitutiva ('+(impPct*100).toLocaleString('it-IT',{maximumFractionDigits:2})+'%)','− '+eur.format(imposta),'','neg'],
      ['Netto in busta paga',eur.format(cash),'tot']]);
    $('t-wel').innerHTML='<caption>Se scegli il welfare</caption>'+rows([
      ['Premio lordo',eur.format(L)],
      ['Eccedenza oltre '+eur.format(soglia),eur.format(ecc)],
      ['Extra aziendale ('+(bonusPct*100).toLocaleString('it-IT',{maximumFractionDigits:2})+'% sull’eccedenza)','+ '+eur.format(bonus)],
      ['Totale welfare',eur.format(wel),'tot']]);

    var limit=fig?2000:1000, f=$('fringe');
    if(L>0){
      if(wel>limit){f.innerHTML='<div class="note warn"><div class="exc-label">Eccedenza oltre il limite fringe benefit</div><div class="exc-big">'+eur.format(wel-limit)+'</div>Controllo fringe benefit: il totale welfare ('+eur.format(wel)+') supera il limite di '+eur.format(limit)+'. Verifica come viene trattata questa eccedenza.</div>'}
      else{f.innerHTML='<div class="note">Controllo fringe benefit: sei entro il limite di '+eur.format(limit)+' ('+(fig?'con':'senza')+' figli a carico).</div>'}
    } else f.innerHTML='';
    return {L:L,cash:cash,wel:wel,diff:diff};
  }

  ['premio','p-soglia','p-bonus','p-inps','p-imp'].forEach(function(id){$(id).addEventListener('input',calc)});
  document.querySelectorAll('.seg button').forEach(function(b){
    b.addEventListener('click',function(){
      fig=+b.dataset.fig;
      document.querySelectorAll('.seg button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
      calc();
    });
  });
  calc();

  var tt=$('totop');
  function onScroll(){tt.classList.toggle('show',window.scrollY>500)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
})();
