// Seleciona todos os elementos químicos e a info-box
const elements = document.querySelectorAll('.element');
const infoBox = document.getElementById('infoBox');
const elementSymbol = document.getElementById('elementSymbol');
const elementNumber = document.getElementById('elementNumber');
const elementName = document.getElementById('elementName');
const elementMass = document.getElementById('elementMass');
const legendItems = document.querySelectorAll('.legend-item');

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
        // Evita que o clique na legenda remova o destaque
        event.stopPropagation();

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
    });
});

// Adiciona um evento para remover o destaque ao clicar fora da tabela
document.addEventListener('click', (event) => {
    // Verifica se o clique foi fora da legenda ou dos elementos
    if (
        !event.target.closest('.legend') && // Fora da legenda
        !event.target.closest('.element')  // Fora dos elementos
    ) {
        clearHighlights();
    }
});

// Atualiza a info-box ao passar o mouse sobre os elementos
elements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        const symbol = el.dataset.symbol || '-';
        const name = el.dataset.name || 'Desconhecido';
        const atomicNumber = el.dataset.atomicNumber || '-';
        const atomicMass = el.dataset.atomicMass || '-';
        const color = el.dataset.color || getComputedStyle(infoBox).backgroundColor;

        // Atualiza o conteúdo do info-box
        elementNumber.textContent = atomicNumber;
        elementSymbol.textContent = symbol;
        elementName.textContent = name;
        elementMass.textContent = atomicMass;
        infoBox.style.backgroundColor = color;
    });

    // Restaura o conteúdo original e cor ao sair do elemento
    el.addEventListener('mouseleave', () => {
        elementNumber.textContent = 'Número Atômico';
        elementSymbol.textContent = 'SÍMBOLO';
        elementName.textContent = 'Nome do Elemento';
        elementMass.textContent = 'Massa Atômica';
        infoBox.style.backgroundColor = '';
    });

    // Redireciona ao clicar no elemento
    el.addEventListener('click', () => {
        const url = el.dataset.url;

        // Abre a URL em uma nova aba
        if (url) {
            window.open(url, '_blank');
        } else {
            console.error('URL não encontrada para este elemento:', el);
        }
    });
});
