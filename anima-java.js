// Seleciona todos os elementos químicos e a info-box
const elements = document.querySelectorAll('.element');
const elementsContainer = document.querySelector('.periodic-table');
const infoBox = document.getElementById('infoBox');
const elementSymbol = document.getElementById('elementSymbol');
const elementNumber = document.getElementById('elementNumber');
const elementName = document.getElementById('elementName');
const elementMass = document.getElementById('elementMass');
const legendItems = document.querySelectorAll('.legend-item');
const infoBoxP = document.querySelectorAll('#infoBox p');
const infoBoxH2 = document.querySelector('#infoBox h2');

// Armazena o estado inicial do info-box e sua cor
const initialBackgroundColor = getComputedStyle(infoBox).backgroundColor;

// Aplica a cor de fundo para cada elemento com base no atributo `data-color`
elements.forEach((el) => {
    const color = el.dataset.color; // Obtém o valor de `data-color`
    if (color) {
        el.style.backgroundColor = color; // Define a cor de fundo
    }
});

// Remove destaque de todos os elementos
function clearHighlights() {
    elements.forEach((el) => {
        el.classList.remove('highlight');
    });
}

// Adiciona eventos de clique nos itens da legenda
legendItems.forEach((legend) => {
    legend.addEventListener('click', (event) => {
        // Remove destaques anteriores
        clearHighlights();

        // Obtém o texto do grupo a partir da legenda
        const group = legend.textContent.trim();

        // Destaca os elementos correspondentes
        elements.forEach((el) => {
            if (el.dataset.group === group) {
                el.classList.add('highlight');
            }
        });

        // Evita que o clique na legenda remova o destaque
        event.stopPropagation();
    });
});

// Adiciona um evento para remover o highlight ao clicar fora da legenda
document.addEventListener('click', () => {
    clearHighlights();
});

// Atualiza a info-box ao passar o mouse sobre os elementos
elements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        // Busca valores diretamente do conteúdo visível no DOM
        const symbol = el.querySelector('.symbol')?.textContent.trim() || '-';
        const name = el.querySelector('.name')?.textContent.trim() || 'Desconhecido';
        const atomicNumber = el.querySelector('.number')?.textContent.trim() || '-';
        const atomicMass = el.querySelector('.mass')?.textContent.trim() || '-';
        const color = el.style.backgroundColor || initialBackgroundColor;

        // Aumenta o tamanho da fonte do h2 ao passar o mouse
        infoBoxP.forEach((p) => {
            p.style.fontSize = '1.2rem';
            p.style.transition = 'font-size 0.5s ease';
        });
        infoBoxH2.style.fontSize = '2.5rem';
        infoBoxH2.style.transition = 'font-size 0.5s ease'; // Transição suave

        // Atualiza o conteúdo do info-box
        elementNumber.textContent = atomicNumber; // Apenas o número atômico
        elementSymbol.textContent = symbol; // Símbolo do elemento
        elementName.textContent = name; // Nome do elemento
        elementMass.textContent = atomicMass; // Apenas a massa atômica
        infoBox.style.backgroundColor = color; // Atualiza a cor do info-box
    });

    // Restaura o conteúdo original e cor ao sair do elemento
    el.addEventListener('mouseleave', () => {
        elementNumber.textContent = 'Número Atômico';
        elementSymbol.textContent = 'SÍMBOLO';
        elementName.textContent = 'Nome do Elemento';
        elementMass.textContent = 'Massa Atômica';
        infoBox.style.backgroundColor = initialBackgroundColor;

        // Volta o tamanho da fonte ao normal
        infoBoxP.forEach((p) => {
            p.style.fontSize = '0.9rem';
        });
        infoBoxH2.style.fontSize = '1.5rem';
    });

    // Redireciona ao clicar no elemento
    el.addEventListener('click', () => {
        const url = el.dataset.url;

        // Abre a URL em uma nova aba
        if (url) {
            window.open(url, '_blank'); // '_blank' abre em uma nova aba
        } else {
            console.error('URL não encontrada para este elemento:', el);
        }
    });
});
