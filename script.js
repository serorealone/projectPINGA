/* ============================================================
   Imobiliária Prime - PWA
   Projeto PWA - Etec São Mateus
   ============================================================ */

// ====== DADOS DOS IMÓVEIS ======
const imoveis = [
    {
        id: 1,
        tipo: "casa",
        tipoLabel: "Casa",
        titulo: "Casa Térrea 3 Quartos",
        endereco: "Rua das Flores, 123 - Jardim Primavera",
        preco: "R$ 450.000",
        operacao: "Venda",
        quartos: 3,
        banheiros: 2,
        vagas: 2,
        area: 120,
        cor: "#1B3B6F"
    },
    {
        id: 2,
        tipo: "apartamento",
        tipoLabel: "Apartamento",
        titulo: "Apto 2 Quartos - Centro",
        endereco: "Av. Brasil, 500 - Centro",
        preco: "R$ 1.800/mês",
        operacao: "Aluguel",
        quartos: 2,
        banheiros: 1,
        vagas: 1,
        area: 65,
        cor: "#0F2747"
    },
    {
        id: 3,
        tipo: "terreno",
        tipoLabel: "Terreno",
        titulo: "Terreno 300m²",
        endereco: "Loteamento Bosque Verde - Zona Rural",
        preco: "R$ 120.000",
        operacao: "Venda",
        quartos: 0,
        banheiros: 0,
        vagas: 0,
        area: 300,
        cor: "#2D5A3D"
    },
    {
        id: 4,
        tipo: "comercial",
        tipoLabel: "Comercial",
        titulo: "Sala Comercial 50m²",
        endereco: "Rua Comercial, 88 - Centro",
        preco: "R$ 2.500/mês",
        operacao: "Aluguel",
        quartos: 0,
        banheiros: 1,
        vagas: 1,
        area: 50,
        cor: "#5D3A1B"
    },
    {
        id: 5,
        tipo: "casa",
        tipoLabel: "Casa",
        titulo: "Casa em Condomínio Fechado",
        endereco: "Residencial Alphaville - Bairro Nobre",
        preco: "R$ 780.000",
        operacao: "Venda",
        quartos: 4,
        banheiros: 3,
        vagas: 3,
        area: 200,
        cor: "#4A2C2A"
    },
    {
        id: 6,
        tipo: "apartamento",
        tipoLabel: "Apartamento",
        titulo: "Cobertura Duplex 3 Quartos",
        endereco: "Av. Beira Mar, 1000 - Praia",
        preco: "R$ 950.000",
        operacao: "Venda",
        quartos: 3,
        banheiros: 3,
        vagas: 2,
        area: 150,
        cor: "#1B3B6F"
    },
    {
        id: 7,
        tipo: "terreno",
        tipoLabel: "Terreno",
        titulo: "Terreno Esquina 500m²",
        endereco: "Bairro Industrial - Próximo à rodovia",
        preco: "R$ 200.000",
        operacao: "Venda",
        quartos: 0,
        banheiros: 0,
        vagas: 0,
        area: 500,
        cor: "#2D5A3D"
    },
    {
        id: 8,
        tipo: "comercial",
        tipoLabel: "Comercial",
        titulo: "Galpão Industrial 800m²",
        endereco: "Distrito Industrial - Setor B",
        preco: "R$ 8.500/mês",
        operacao: "Aluguel",
        quartos: 0,
        banheiros: 2,
        vagas: 5,
        area: 800,
        cor: "#5D3A1B"
    }
];

// ====== ÍCONES POR TIPO DE IMÓVEL ======
const iconesImovel = {
    casa: "🏡",
    apartamento: "🏢",
    terreno: "🌳",
    comercial: "🏬"
};

// ====== RENDERIZAÇÃO DOS IMÓVEIS ======
function renderImoveis(filtro = "all") {
    const grid = document.getElementById("imoveisGrid");
    const noResults = document.getElementById("noResults");

    const filtrados = filtro === "all"
        ? imoveis
        : imoveis.filter(im => im.tipo === filtro);

    if (filtrados.length === 0) {
        grid.innerHTML = "";
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    grid.innerHTML = filtrados.map(im => `
        <article class="imovel-card" data-tipo="${im.tipo}">
            <div class="imovel-img" style="background: linear-gradient(135deg, ${im.cor}, ${im.cor}cc);">
                <span class="imovel-tag">${im.operacao}</span>
                <span style="font-size: 4rem; z-index: 1;">${iconesImovel[im.tipo]}</span>
            </div>
            <div class="imovel-info">
                <span class="imovel-tipo">${im.tipoLabel}</span>
                <h3 class="imovel-titulo">${im.titulo}</h3>
                <p class="imovel-endereco">📍 ${im.endereco}</p>
                <div class="imovel-detalhes">
                    ${im.quartos > 0 ? `<span>🛏️ ${im.quartos}</span>` : ""}
                    ${im.banheiros > 0 ? `<span>🚿 ${im.banheiros}</span>` : ""}
                    ${im.vagas > 0 ? `<span>🚗 ${im.vagas}</span>` : ""}
                    <span>📐 ${im.area}m²</span>
                </div>
                <div class="imovel-preco">${im.preco}</div>
            </div>
        </article>
    `).join("");
}

// ====== FILTROS ======
document.getElementById("filters").addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        renderImoveis(e.target.dataset.filter);
    }
});

// ====== MENU MOBILE ======
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Fecha menu ao clicar em um link
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

// ====== NAVBAR SCROLL EFFECT ======
const navbar = document.getElementById("navbar");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
        backTop.classList.add("show");
    } else {
        navbar.classList.remove("scrolled");
        backTop.classList.remove("show");
    }
});

// ====== BUSCA (form) ======
document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const tipo = document.getElementById("tipo").value;
    const operacao = document.getElementById("operacao").value;

    let filtrados = imoveis;
    if (tipo) filtrados = filtrados.filter(im => im.tipo === tipo);
    if (operacao) filtrados = filtrados.filter(im =>
        im.operacao.toLowerCase() === operacao.toLowerCase()
    );

    // Atualiza filtros ativos
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    if (tipo) {
        const btn = document.querySelector(`.filter-btn[data-filter="${tipo}"]`);
        if (btn) btn.classList.add("active");
    } else {
        document.querySelector('.filter-btn[data-filter="all"]').classList.add("active");
    }

    const grid = document.getElementById("imoveisGrid");
    const noResults = document.getElementById("noResults");

    if (filtrados.length === 0) {
        grid.innerHTML = "";
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";
    grid.innerHTML = filtrados.map(im => `
        <article class="imovel-card" data-tipo="${im.tipo}">
            <div class="imovel-img" style="background: linear-gradient(135deg, ${im.cor}, ${im.cor}cc);">
                <span class="imovel-tag">${im.operacao}</span>
                <span style="font-size: 4rem; z-index: 1;">${iconesImovel[im.tipo]}</span>
            </div>
            <div class="imovel-info">
                <span class="imovel-tipo">${im.tipoLabel}</span>
                <h3 class="imovel-titulo">${im.titulo}</h3>
                <p class="imovel-endereco">📍 ${im.endereco}</p>
                <div class="imovel-detalhes">
                    ${im.quartos > 0 ? `<span>🛏️ ${im.quartos}</span>` : ""}
                    ${im.banheiros > 0 ? `<span>🚿 ${im.banheiros}</span>` : ""}
                    ${im.vagas > 0 ? `<span>🚗 ${im.vagas}</span>` : ""}
                    <span>📐 ${im.area}m²</span>
                </div>
                <div class="imovel-preco">${im.preco}</div>
            </div>
        </article>
    `).join("");

    // Rola até a seção de imóveis
    document.getElementById("imoveis").scrollIntoView({ behavior: "smooth" });
});

// ====== FORMULÁRIO DE CONTATO ======
document.getElementById("contatoForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const successMsg = document.getElementById("formSuccess");
    successMsg.classList.add("show");

    setTimeout(() => {
        successMsg.classList.remove("show");
        e.target.reset();
    }, 4000);
});

// ====== BANNER DE INSTALAÇÃO PWA ======
let deferredPrompt;
const installBanner = document.getElementById("installBanner");
const installBtn = document.getElementById("installBtn");
const closeBanner = document.getElementById("closeBanner");

window.addEventListener("beforeinstallprompt", (e) => {
    // Previne o prompt automático
    e.preventDefault();
    deferredPrompt = e;

    // Mostra o banner após 3 segundos
    setTimeout(() => {
        installBanner.classList.add("show");
    }, 3000);
});

installBtn.addEventListener("click", async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            console.log("PWA instalado com sucesso!");
        }
        deferredPrompt = null;
        installBanner.classList.remove("show");
    }
});

closeBanner.addEventListener("click", () => {
    installBanner.classList.remove("show");
});

window.addEventListener("appinstalled", () => {
    console.log("App instalado com sucesso!");
    installBanner.classList.remove("show");
});

// ====== REGISTRO DO SERVICE WORKER ======
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("sw.js")
            .then(registration => {
                console.log("✓ Service Worker registrado com sucesso. Escopo:", registration.scope);
            })
            .catch(error => {
                console.log("✗ Falha ao registrar Service Worker:", error);
            });
    });
}

// ====== INICIALIZAÇÃO ======
document.addEventListener("DOMContentLoaded", () => {
    renderImoveis();
    console.log("🏠 Imobiliária Prime - PWA carregado com sucesso!");
});
