

const Header = ({filters,handleApplyFilters}) => {
  return (
    <>
    <h2 className="header">The Rick and Morty</h2>

    <input
        placeholder="Search a Character"
        value={filters?.search}
        onChange={(e) => handleApplyFilters("search", e.target.value)}
        className="search-input"
      />

      <select
        className="character-status-select"
        value={filters?.status}
        onChange={(e) => {
          handleApplyFilters("status", e.target.value);
        }}
      >
        <option value=""> All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
      </select>
    </>
  )
}

export default Header