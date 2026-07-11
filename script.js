
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".navlinks");
  const reveals = document.querySelectorAll(".reveal");

  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 20);
  });

  menuBtn?.addEventListener("click", () => {
    nav?.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", nav?.classList.contains("open") ? "true" : "false");
  });

  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.14});
  reveals.forEach(el => observer.observe(el));

  document.querySelectorAll(".faq-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      item.classList.toggle("open");
      btn.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
    });
  });

  const calc = document.querySelector("#budget-form");
  calc?.addEventListener("submit", e => {
    e.preventDefault();
    const income = Number(document.querySelector("#income").value || 0);
    const fixed = Number(document.querySelector("#fixed").value || 0);
    const variable = Number(document.querySelector("#variable").value || 0);
    const debts = Number(document.querySelector("#debts").value || 0);
    const total = fixed + variable + debts;
    const balance = income - total;
    const commitment = income > 0 ? (total / income) * 100 : 0;
    const result = document.querySelector("#budget-result");

    result.classList.remove("good","bad");
    result.classList.add(balance >= 0 ? "good" : "bad");

    const money = new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});
    result.innerHTML = `
      <div><strong>Saldo estimado: ${money.format(balance)}</strong></div>
      <p>Despesas comprometem ${commitment.toFixed(1)}% da renda.</p>
      <p>${balance >= 0
        ? "Você está com saldo positivo. Tente separar uma parte para metas e imprevistos."
        : "As despesas ultrapassam a renda. Revise gastos e priorize dívidas mais caras."}</p>`;
  });
});
