import { useState, useEffect } from "react";
import axios from "axios";
import Character from "./Character";

function App() {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const paginationLength = totalCount / 20;

  const handlePageChange = (currentPage) => {
    setPage(currentPage);
  };

  const handleApplyFilters = (key, value) => {
    setPage(1);
    setFilters((prev) => {
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    async function handleFetchCharacters() {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          "https://rickandmortyapi.com/api/character/",
          {
            params: {
              page: page,
              name: filters?.search || "",
              status: filters?.status || "",
            },
          },
        );

        let apiList = response.data;
        setList(apiList?.results);
        setTotalCount(apiList?.info?.count);
      } catch (error) {
        setList([]);
        console.log(error);
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    }

    handleFetchCharacters();
  }, [page, filters]);

  return (
    <>
      <h3>The Rick and Morty</h3>

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

      <div className="main-container">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}

        <div className="card-container">
          {list?.length > 0 &&
            !loading &&
            list?.map((character) => {
              return <Character key={character?.id} character={character} />;
            })}
        </div>
        <div className="pagination-container">
          {totalCount > 0 && (
            <>
              <button
                onClick={() => {
                  setPage((page) => page - 1);
                }}
              >
                {"<"}
              </button>
              {Array.from({ length: paginationLength }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={page === pageNum ? "active" : ""}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  setPage((page) => page + 1);
                }}
              >
                {">"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
