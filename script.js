
document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".site-header"), progress=document.querySelector(".top-progress");
  const menuBtn=document.querySelector(".menu-btn"), nav=document.querySelector(".navlinks");
  const updateScroll=()=>{header?.classList.toggle("scrolled",scrollY>20);const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h?scrollY/h*100:0)+"%"};
  addEventListener("scroll",updateScroll);updateScroll();
  menuBtn?.addEventListener("click",()=>{nav?.classList.toggle("open");menuBtn.setAttribute("aria-expanded",nav?.classList.contains("open")?"true":"false")});
  nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");obs.unobserve(e.target)}}),{threshold:.13});
  document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
  const chart=document.querySelector(".chart");
  if(chart){new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){chart.querySelectorAll(".bar").forEach(b=>b.style.height=b.dataset.h);}}),{threshold:.4}).observe(chart)}
  document.querySelectorAll(".faq-btn").forEach(btn=>btn.addEventListener("click",()=>{const item=btn.closest(".faq-item");item.classList.toggle("open");btn.setAttribute("aria-expanded",item.classList.contains("open")?"true":"false")}));
  const calc=document.querySelector("#budget-form");
  calc?.addEventListener("submit",e=>{
    e.preventDefault();
    const renda=+document.querySelector("#renda").value||0, fixas=+document.querySelector("#fixas").value||0, variaveis=+document.querySelector("#variaveis").value||0, dividas=+document.querySelector("#dividas").value||0;
    const total=fixas+variaveis+dividas, saldo=renda-total, pct=renda?total/renda*100:0;
    const fmt=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});
    let nivel="Saudável", cls="good", msg="Há espaço para metas e reserva.";
    if(pct>=80&&pct<=100){nivel="Atenção";cls="warn";msg="Revise gastos variáveis e aumente sua margem de segurança."}
    if(pct>100){nivel="Crítico";cls="bad";msg="As despesas ultrapassam a renda. Priorize cortes e renegociação."}
    document.querySelector("#saldo").textContent=fmt.format(saldo);
    const st=document.querySelector("#status");st.textContent=nivel;st.className="status "+cls;
    document.querySelector("#comp").textContent=pct.toFixed(1)+"%";
    document.querySelector("#mensagem").textContent=msg;
    document.querySelector("#donut").style.background=`conic-gradient(var(--teal) ${Math.min(pct,100)*3.6}deg,#e5eeeb 0deg)`;
    document.querySelector("#l-fixas").textContent=fmt.format(fixas);
    document.querySelector("#l-var").textContent=fmt.format(variaveis);
    document.querySelector("#l-div").textContent=fmt.format(dividas);
  });
});
