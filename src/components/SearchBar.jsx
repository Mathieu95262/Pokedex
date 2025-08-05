const SearchBar = ({ searchTerm, setSearchTerm, count }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
      <div className="relative w-full sm:w-96">
        <input
          type="text"
          placeholder="Rechercher un Pokémon par nom ou numéro..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
      </div>
      <div className="text-gray-600">{count} Pokémon trouvés</div>
    </div>
  )
}

export default SearchBar