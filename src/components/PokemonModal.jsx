const PokemonModal = ({ pokemon, typeColors, onClose }) => {
  if (!pokemon) return null

  const primaryType = pokemon.types[0].type.name
  const bgColor = typeColors[primaryType] || 'bg-gray-200'

  const stats = [
    { name: 'HP', value: pokemon.stats[0].base_stat },
    { name: 'Attack', value: pokemon.stats[1].base_stat },
    { name: 'Defense', value: pokemon.stats[2].base_stat },
    { name: 'Sp. Atk', value: pokemon.stats[3].base_stat },
    { name: 'Sp. Def', value: pokemon.stats[4].base_stat },
    { name: 'Speed', value: pokemon.stats[5].base_stat },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-xl overflow-hidden shadow-2xl max-w-md w-full ${bgColor} bg-opacity-90`}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
          >
            <i className="fas fa-times text-gray-800"></i>
          </button>

          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white capitalize">
                  {pokemon.name}
                </h2>
                <div className="flex gap-2 mt-1">
                  {pokemon.types.map((type, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-white text-sm font-bold ${
                        typeColors[type.type.name] || 'bg-gray-400'
                      } brightness-110`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-white font-bold">
                #{pokemon.id.toString().padStart(3, '0')}
              </span>
            </div>

            <div className="flex justify-center my-4">
              <img
                src={
                  pokemon.sprites.other['official-artwork'].front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                className="w-48 h-48 object-contain"
              />
            </div>

            <div className="bg-white rounded-lg p-4 mt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-bold text-gray-700">Height</h4>
                  <p>{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700">Weight</h4>
                  <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700">Abilities</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pokemon.abilities.map((ability, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-2 py-1 rounded text-xs capitalize"
                      >
                        {ability.ability.name.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-gray-700 mb-2">Stats</h4>
              <div className="space-y-2">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-16 text-sm font-medium text-gray-600">
                      {stat.name}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          stat.value > 50 ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(100, stat.value)}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-right text-sm font-medium">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonModal