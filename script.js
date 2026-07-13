
document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".site-header");
  const menuBtn=document.querySelector(".menu-btn");
  const nav=document.querySelector(".navlinks");
  const onScroll=()=>header?.classList.toggle("scrolled",window.scrollY>20);
  window.addEventListener("scroll",onScroll); onScroll();
  menuBtn?.addEventListener("click",()=>nav?.classList.toggle("open"));
  nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");obs.unobserve(e.target)}}),{threshold:.14});
  document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
  document.querySelectorAll(".faq-btn").forEach(btn=>btn.addEventListener("click",()=>btn.closest(".faq-item").classList.toggle("open")));
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
    const st=document.querySelector("#status"); st.textContent=nivel; st.className="status "+cls;
    document.querySelector("#comp").textContent=pct.toFixed(1)+"%";
    document.querySelector("#mensagem").textContent=msg;
    document.querySelector("#donut").style.background=`conic-gradient(var(--teal) ${Math.min(pct,100)*3.6}deg,#e5eeeb 0deg)`;
    document.querySelector("#l-fixas").textContent=fmt.format(fixas);
    document.querySelector("#l-var").textContent=fmt.format(variaveis);
    document.querySelector("#l-div").textContent=fmt.format(dividas);
  });
});
