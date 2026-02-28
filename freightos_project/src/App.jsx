import { useState, useEffect } from "react";
import axios from "axios";
import Character from "./Character";
import { API_ENDPOINT } from "./constants";
import Pagination from "./Pagination";
import Header from "./Header";
import Characters from "./Characters";

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
  const paginationLength = Math.ceil(totalCount / 20)
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
          API_ENDPOINT,
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
   
      <Header  filters={filters} handleApplyFilters={handleApplyFilters}/>
      <Characters list={list} loading={loading} error={error} />
      <Pagination 
       totalCount={totalCount} 
       paginationLength={paginationLength}
       page={page}
       setPage={setPage}
       handlePageChange={handlePageChange} />
     
    </>
  );
}

export default App;
