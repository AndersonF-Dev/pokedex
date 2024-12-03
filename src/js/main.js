
const pokemonList = document.getElementById('pokemonList');
const modalContent = document.getElementById('modalContent');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 4;
let offset = 0;

// Função para converter um Pokémon em HTML de lista
function convertPokemonToLi(pokemon) {
    return `
        // <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
        //     <span class="number">#${pokemon.number}</span>
        //     <span class="name">${pokemon.name}</span>

        //     <div class="detail">
        //         <ol class="types">
        //             ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        //         </ol>
        //         <img src="${pokemon.photo}" alt="${pokemon.name}">
        //     </div>
        // </li>
    `;
}

// Função para carregar um Pokémon específico no modal
function carregarPokemonNoModal(pokemon) {
    return `
        <li class="modalPokemon ${pokemon.type}">
            <div class="nome-pokemonModal-posicao">
            <span class="nome-pokemonModal">${pokemon.name}</span>
            <span class="numeroModal">#${pokemon.number}</span>
            </div>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            
            <div class="modalDetalhis">
                <ol class="typesModal typesModalPosition">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
        </li>
    `;
}


// Função para carregar Pokémon na lista principal
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

// Evento de clique em um Pokémon específico
pokemonList.addEventListener('click', (event) => {
    const pokemonItem = event.target.closest('li.pokemon');
    if (!pokemonItem) return; // Ignorar se não clicou em um Pokémon

    const pokemonId = pokemonItem.getAttribute('data-id'); // Obter o ID do Pokémon
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    // Carregar os detalhes do Pokémon clicado no modal
    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error(`Erro ao buscar Pokémon: ${response.status}`);
            return response.json();
        })
        .then((pokeDetail) => {
            const pokemon = convertPokeApiDetailToPokemon(pokeDetail);
            const pokemonHtml = carregarPokemonNoModal(pokemon);

            modalContent.innerHTML = pokemonHtml; // Atualiza o modal com o Pokémon clicado
            abrirModal(); // Abre o modal
        })
        .catch((error) => {
            console.error(error);
            modalContent.innerHTML = '<li>Erro ao carregar Pokémon. Tente novamente.</li>';
        });
});

// Inicialização
loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

