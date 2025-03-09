// Seleciona os elementos do menu
const menuToggle = document.querySelector('.menu-toggle'); // Botão do menu hambúrguer
const menu = document.querySelector('.menu'); // Menu de navegação
const menuLinks = document.querySelectorAll('.menu ul li a'); // Todos os links do menu
const dropdownToggle = document.querySelector('.dropdown-toggle'); // Botão do submenu "Serviços"
const dropdown = document.querySelector('.dropdown'); // Container do submenu

// Função para abrir/fechar o menu
function toggleMenu() {
    if (menu.classList.contains('active')) {
        // Fecha o menu com animação
        menu.style.transition = 'opacity 0.3s ease, visibility 0.3s ease, right 0.3s ease'; // Define a transição
        menu.classList.remove('active'); // Remove a classe 'active'
        menuToggle.classList.remove('ativo'); // Remove a classe 'ativo' do botão

        // Aguarda o fim da animação para resetar a transição
        setTimeout(() => {
            menu.style.transition = ''; // Remove a transição após a animação
        }, 300); // Tempo da animação (0.3s)
    } else {
        // Abre o menu
        menu.classList.add('active'); // Adiciona a classe 'active'
        menuToggle.classList.add('ativo'); // Adiciona a classe 'ativo' ao botão
    }
}

// Função para abrir/fechar o submenu
function toggleSubmenu() {
    dropdown.classList.toggle('active'); // Alterna a classe 'active' no submenu
}

// Função para scroll suave
function smoothScroll(target) {
    const element = document.querySelector(target); // Seleciona o elemento alvo
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth', // Scroll suave
            block: 'start' // Alinha o elemento no topo da tela
        });
    }
}

// Adiciona evento de clique ao botão do menu
menuToggle.addEventListener('click', toggleMenu);

// Adiciona evento de clique aos links do menu
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.classList.contains('dropdown-toggle')) { // Ignora o botão "Serviços"
            e.preventDefault(); // Evita o comportamento padrão do link
            const target = link.getAttribute('href'); // Obtém o valor do atributo href
            smoothScroll(target); // Faz o scroll suave até o elemento alvo
            toggleMenu(); // Fecha o menu (caso esteja aberto em mobile)
        }
    });
});

// Comportamento do submenu "Serviços"
if (dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault(); // Evita o comportamento padrão do link
        toggleSubmenu(); // Abre/fecha o submenu
    });
}

// Fecha o menu e o submenu ao clicar fora deles
document.addEventListener('click', (e) => {
    // Verifica se o clique foi fora do menu
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        if (menu.classList.contains('active')) {
            toggleMenu(); // Fecha o menu com animação
        }
    }

    // Verifica se o clique foi fora do submenu
    if (dropdown && !dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
        dropdown.classList.remove('active'); // Fecha o submenu
    }
});

// Fecha o menu ao redimensionar a tela (se o menu estiver aberto em mobile)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu.classList.contains('active')) {
        toggleMenu(); // Fecha o menu se a tela for maior que 768px
    }
});



// Reveal ao Rolar
const sobreMim = document.querySelector('.sobre-mim');

window.addEventListener('scroll', () => {
    const posicaoSobreMim = sobreMim.getBoundingClientRect().top;
    const alturaTela = window.innerHeight;

    if (posicaoSobreMim < alturaTela) {
        sobreMim.classList.add('visible');
    }
});

// Expansão dos itens da timeline
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('click', () => {
        // Fecha todos os cards abertos
        timelineItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Abre ou fecha o card clicado
        item.classList.toggle('active');
    });
});

// Fechar o card ao clicar fora dele
document.addEventListener('click', (event) => {
    if (!event.target.closest('.timeline-item')) {
        timelineItems.forEach(item => {
            item.classList.remove('active');
        });
    }
});


// Exibição dos detalhes dos serviços
const botoesServico = document.querySelectorAll('.botao-servico');

botoesServico.forEach(botao => {
    botao.addEventListener('click', () => {
        const card = botao.closest('.servico-card');
        const detalhes = card.querySelector('.card-details');

        // Alterna a classe 'active' para exibir ou ocultar os detalhes
        detalhes.classList.toggle('active');
    });
});


// Filtro de Categorias
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        // Adiciona a classe 'active' ao botão clicado
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
                item.classList.add('fade-in'); // Adiciona animação de fade-in
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    });
});

// Animação de Fade-In
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('transitionend', () => {
        if (item.classList.contains('fade-in')) {
            item.style.opacity = '1';
        }
    });
});



// Inicialização do Swiper
const swiper = new Swiper('.mySwiper', {
    loop: true, // Loop infinito
    centeredSlides: true, // Centraliza o slide ativo
    slidesPerView: 'auto', // Ajusta o número de slides visíveis automaticamente
    spaceBetween: 20, // Espaço entre os slides
    autoplay: {
        delay: 3000, // Troca de slide a cada 3 segundos
        disableOnInteraction: false, // Continua o autoplay após interação
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Permite clicar nos pontos para navegar
    },
});



// Seção Agendamento
document.getElementById('form-agendamento').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o recarregamento da página

    const btnAgendar = document.getElementById('btn-agendar');
    btnAgendar.classList.add('carregando'); // Ativa o estado de carregamento

    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    // Valida os campos
    if (!nome || !email || !telefone || !servico || !data || !hora) {
        setTimeout(() => {
            btnAgendar.classList.remove('carregando');
            btnAgendar.classList.add('erro'); // Exibe ícone de erro
            setTimeout(() => {
                btnAgendar.classList.remove('erro');
                btnAgendar.querySelector('.texto-btn').style.opacity = '1'; // Restaura o texto
            }, 2000); // Remove o feedback após 2 segundos
        }, 300); // Espera um pouco para garantir a animação de carregamento
        return;
    }

    // Formata a data/hora para o Google Calendar (ISO 8601)
    const dataHoraInicio = new Date(`${data}T${hora}:00`);
    const dataHoraFim = new Date(dataHoraInicio.getTime() + 60 * 60000); // 1 hora de duração

    try {
        // Envia os dados para o servidor
        const response = await fetch('http://3.86.192.199:3000/agendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                summary: `Agendamento: ${servico} - ${nome}`,
                start: { dateTime: dataHoraInicio.toISOString(), timeZone: 'America/Sao_Paulo' },
                end: { dateTime: dataHoraFim.toISOString(), timeZone: 'America/Sao_Paulo' }
            })
        });

        // Exibe feedback de sucesso ou erro
        if (response.ok) {
            setTimeout(() => {
                btnAgendar.classList.remove('carregando');
                btnAgendar.classList.add('sucesso'); // Exibe ícone de sucesso
                setTimeout(() => {
                    btnAgendar.classList.remove('sucesso');
                    btnAgendar.querySelector('.texto-btn').style.opacity = '1'; // Restaura o texto
                    document.getElementById('form-agendamento').reset(); // Limpa o formulário
                }, 2000); // Remove o feedback após 2 segundos
            }, 300); // Espera um pouco para garantir a animação de carregamento
        } else {
            throw new Error('Erro ao agendar');
        }
    } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        setTimeout(() => {
            btnAgendar.classList.remove('carregando');
            btnAgendar.classList.add('erro'); // Exibe ícone de erro
            setTimeout(() => {
                btnAgendar.classList.remove('erro');
                btnAgendar.querySelector('.texto-btn').style.opacity = '1'; // Restaura o texto
            }, 2000); // Remove o feedback após 2 segundos
        }, 300); // Espera um pouco para garantir a animação de carregamento
    }
});



// Scroll Reveal para o rodapé
const rodape = document.querySelector('.rodape');

function revelarRodape() {
    const posicaoRodape = rodape.getBoundingClientRect().top;
    const alturaTela = window.innerHeight;

    if (posicaoRodape < alturaTela) {
        rodape.style.opacity = '1';
        rodape.style.transform = 'translateY(0)';
    }
}

window.addEventListener('scroll', revelarRodape);




// Efeito de digitação nos créditos
const texto = "Gustavo Cazzine";
const elementoTexto = document.querySelector('.rodape-creditos a');
let index = 0;

function digitar() {
    if (index < texto.length) {
        elementoTexto.textContent += texto.charAt(index);
        index++;
        setTimeout(digitar, 100); // Velocidade da digitação
    }
}

digitar();




// Barra Vertical RedesSociais
const socialMenu = document.querySelector(".social-menu");
const socialToggle = document.querySelector(".social-toggle");

socialToggle.addEventListener("click", () => {
    socialMenu.classList.toggle("active");
});
