const botao = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

botao.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  botao.setAttribute("aria-expanded", aberto);
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", false);
  });
});

document.getElementById("ano").textContent = new Date().getFullYear();

const elementosRevelaveis = document.querySelectorAll(
  "main section > h2, main section > .card, main section > .grade > *, .rodape"
);
const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (movimentoReduzido || !("IntersectionObserver" in window)) {
  elementosRevelaveis.forEach((elemento) => elemento.classList.add("revelar--visivel"));
} else {
  elementosRevelaveis.forEach((elemento) => elemento.classList.add("revelar"));
  document.documentElement.classList.add("animacoes-prontas");

  const observador = new IntersectionObserver((entradas, observer) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("revelar--visivel");
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });

  elementosRevelaveis.forEach((elemento) => {
    const limites = elemento.getBoundingClientRect();
    if (limites.bottom > 0 && limites.top < window.innerHeight) {
      elemento.classList.add("revelar--visivel");
    } else {
      observador.observe(elemento);
    }
  });
}
