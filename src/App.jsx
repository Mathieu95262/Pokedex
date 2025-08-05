import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import SearchBar from './components/SearchBar';

const typeColors = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const limit = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const detailedPokemon = await Promise.all(
          response.data.results.map((pokemon) =>
            axios.get(pokemon.url).then((res) => res.data)
          )
        );
        setPokemonList((prev) => {
          const newPokemon = detailedPokemon.filter(
            (poke) => !prev.some((p) => p.id === poke.id)
          );
          return [...prev, ...newPokemon];
        });
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [offset]);

  useEffect(() => {
    const searchPokemon = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      const localResults = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (localResults.length > 0) {
        setSearchResults(localResults);
      } else {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
          );
          setSearchResults([response.data]);
        } catch (error) {
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      }
    };

    searchPokemon();
  }, [searchTerm]);

  const displayPokemon = searchTerm ? searchResults : pokemonList;

  const loadMore = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="text-red-500">Poké</span>
            <span className="text-blue-500">dex</span>
          </h1>
          <p className="text-gray-600">Trouvez tous les Pokémon en un seul endroit</p>
        </header>

        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          count={displayPokemon.length} 
        />

        {loading && pokemonList.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {displayPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  typeColors={typeColors}
                  onClick={setSelectedPokemon}
                />
              ))}
            </div>

            {displayPokemon.length === 0 && (
              <div className="text-center py-12">
                <i className="fas fa-exclamation-circle text-4xl text-yellow-500 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700">
                  {searchTerm ? "Aucun Pokémon correspondant" : "Aucun Pokémon chargé"}
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? "Essayez un autre terme de recherche" : "Chargement en cours..."}
                </p>
              </div>
            )}

            {!searchTerm && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className={`px-6 py-2 rounded-full font-medium ${
                    loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-spinner animate-spin"></i> Chargement...
                    </span>
                  ) : (
                    'Charger plus de Pokémon'
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {selectedPokemon && (
          <PokemonModal
            pokemon={selectedPokemon}
            typeColors={typeColors}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
