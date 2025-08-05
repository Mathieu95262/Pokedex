const PokemonCard = ({ pokemon, typeColors, onClick }) => {
  const primaryType = pokemon.types[0].type.name
  const bgColor = typeColors[primaryType] || 'bg-gray-200'

  return (
    <div 
      onClick={() => onClick(pokemon)}
      className={`pokemon-card rounded-lg overflow-hidden shadow-md cursor-pointer ${bgColor} bg-opacity-70 hover:bg-opacity-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="p-4 flex flex-col items-center">
        <div className="text-gray-700 font-semibold text-sm">
          #{pokemon.id.toString().padStart(3, '0')}
        </div>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 object-contain"
          style={{ animation: 'float 3s ease-in-out infinite' }}
        />
        <h3 className="text-xl font-bold text-gray-800 capitalize mt-2">
          {pokemon.name}
        </h3>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-white text-xs font-bold ${typeColors[type.type.name] || 'bg-gray-400'} brightness-110`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonCard