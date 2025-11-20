import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompaniesRequest,
  fetchCompaniesSuccess,
  fetchCompaniesFailure,
} from "../redux/CompaniesDataReducer/actions";
import { getCompanies } from "../api/fetchCompanyAPI";
import { FaSort } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";

const CompaniesList = () => {
  const dispatch = useDispatch();
  const { companies, isLoading, isError } = useSelector(
    (state) => state.companyFetchReducer
  );

  const [sortOrder, setSortOrder] = useState("asc"); // asc rating / desc rating
  const [filtered, setFiltered] = useState([]); //asc country / desc country
  const [originalData, setOriginalData] = useState([]);

  // filter states
  const [searchName, setSearchName] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const [activeSortColumn, setActiveSortColumn] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showAll, setShowAll] = useState(false);

  const isFiltering =
    searchName.trim() !== "" || industryFilter !== "" || countryFilter !== "";

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchCompaniesRequest());
      try {
        const data = await getCompanies();
        dispatch(fetchCompaniesSuccess(data));
        console.log(data);
        // setCompanies(data);
        setFiltered(data);
        setOriginalData(data);
      } catch (error) {
        dispatch(fetchCompaniesFailure(error));
        console.error("Error fetching companies:", error);
      }
    };

    fetchData();
  }, []);

  const sortByCompany = () => {
    const sorted = [...filtered].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    setFiltered(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setActiveSortColumn("company");
  };

  const sortByIndustry = () => {
    const sorted = [...filtered].sort((a, b) => {
      return sortOrder === "asc"
        ? a.industry.localeCompare(b.industry)
        : b.industry.localeCompare(a.industry);
    });

    setFiltered(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setActiveSortColumn("industry");
  };

  const sortByFounded = () => {
    const sorted = [...filtered].sort((a, b) => {
      return sortOrder === "asc"
        ? a.foundedYear - b.foundedYear
        : b.foundedYear - a.foundedYear;
    });

    setFiltered(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setActiveSortColumn("founded");
  };

  const sortByCEO = () => {
    const sorted = [...filtered].sort((a, b) => {
      return sortOrder === "asc"
        ? a.ceo.localeCompare(b.ceo)
        : b.ceo.localeCompare(a.ceo);
    });

    setFiltered(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setActiveSortColumn("ceo");
  };

  // Filter Logic
  useEffect(() => {
    if (!companies.length) return;
    let updated = [...companies];

    // Name search filter
    if (searchName.trim() !== "") {
      updated = updated.filter((c) =>
        c.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Industry dropdown filter
    if (industryFilter !== "") {
      updated = updated.filter((c) => c.industry === industryFilter);
    }

    // Country dropdown filter
    if (countryFilter !== "") {
      updated = updated.filter((c) => c.headquarters.country === countryFilter);
    }

    // Sorting
    if (activeSortColumn === "company") {
      updated.sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }

    if (activeSortColumn === "industry") {
      updated.sort((a, b) =>
        sortOrder === "asc"
          ? a.industry.localeCompare(b.industry)
          : b.industry.localeCompare(a.industry)
      );
    }

    if (activeSortColumn === "founded") {
      updated.sort((a, b) =>
        sortOrder === "asc"
          ? a.foundedYear - b.foundedYear
          : b.foundedYear - a.foundedYear
      );
    }

    if (activeSortColumn === "ceo") {
      updated.sort((a, b) =>
        sortOrder === "asc"
          ? a.ceo.localeCompare(b.ceo)
          : b.ceo.localeCompare(a.ceo)
      );
    }

    setFiltered(updated);
    setCurrentPage(1);
  }, [
    searchName,
    industryFilter,
    countryFilter,
    companies,
    sortOrder,
    activeSortColumn,
  ]);

  // Extract unique industries and countries for dropdowns
  const industries = [...new Set(companies.map((c) => c.industry))];
  const countries = [...new Set(companies.map((c) => c.headquarters.country))];

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  //   const currentData = filtered.slice(indexOfFirst, indexOfLast);
  const currentData = showAll
    ? filtered
    : filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleReset = () => {
    alert("All filters cleared");
    if (showAll) {
      setSearchName("");
      setIndustryFilter("");
      setCountryFilter("");
      setActiveSortColumn("");
      setSortOrder("asc");
      companies(originalData);
      setFiltered(originalData);
      return;
    }
    setSearchName("");
    setIndustryFilter("");
    setCountryFilter("");
    setActiveSortColumn("");
    setSortOrder("asc");
    setShowAll(false);
    setCurrentPage(1);
    companies(originalData);
    setFiltered(originalData);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <TailSpin height="60" width="60" color="#000000" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* filter section */}
      <div className="flex flex-column flex-wrap gap-4 mb-6 bg-gray-100 p-4 rounded-lg">
        {/* Search by Name */}
        <div>
          <input
            type="text"
            placeholder="Search by company name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-black placeholder-black p-2 rounded w-64 m-1"
          />

          {/* Industry Dropdown */}
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="border border-black p-2 rounded m-1"
          >
            <option value="">All Industries</option>
            {[...industries].sort().map((ind, index) => (
              <option key={index} value={ind}>
                {ind}
              </option>
            ))}
          </select>

          {/* Country Dropdown */}
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="border border-black p-2 rounded m-1"
          >
            <option value="">All Countries</option>
            {[...countries].sort().map((ctry, index) => (
              <option key={index} value={ctry}>
                {ctry}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* <span className="font-bold text-green-400 text-lg">To view all Company data and to remove all filters, click here: </span> */}
          <span className="font-bold text-green-400 text-lg">
            To view all Company data and to remove all filters,{" "}
            <span className="text-indigo-500">click here: </span>
          </span>

          <button className="btn btn-dark" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      {/* companies table */}
      <div>
        {/* {filtered.length === 0 && (
          // <h3 className="text-gray-500">No companies found.</h3>
          <h3 className="text-black font-semibold text-center mt-5">
            No companies found.
          </h3>
        )} */}
        {/* API Error Message */}
        {isError && (
          <h3 className="text-danger font-bold text-center mt-5">
            Something went wrong. Please try again later.
          </h3>
        )}

        {/* No Companies Found */}
        {!isError && filtered.length === 0 && (
          <h3 className="text-black font-semibold text-center mt-5">
            No companies found.
          </h3>
        )}
        {filtered.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-3">Company List</h2>
            <table className="w-full border-collapse mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                      Company Name
                      {/* {showAll && (
                        <FaSort
                          className={`inline-block cursor-pointer ${
                            activeSortColumn === "company"
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                          onClick={sortByCompany}
                        />
                      )} */}
                      <FaSort
                        className={`inline-block cursor-pointer ${
                          activeSortColumn === "company"
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                        onClick={sortByCompany}
                      />
                    </div>
                  </th>
                  <th className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                      Industry
                      {/* {showAll && (
                        <FaSort
                          className={`inline-block cursor-pointer ${
                            activeSortColumn === "industry"
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                          onClick={sortByIndustry}
                        />
                      )} */}
                      <FaSort
                        className={`inline-block cursor-pointer ${
                          activeSortColumn === "industry"
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                        onClick={sortByIndustry}
                      />
                    </div>
                  </th>
                  <th className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                      Founded
                      {/* {showAll && (
                        <FaSort
                          className={`inline-block cursor-pointer ${
                            activeSortColumn === "founded"
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                          onClick={sortByFounded}
                        />
                      )} */}
                      <FaSort
                        className={`inline-block cursor-pointer ${
                          activeSortColumn === "founded"
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                        onClick={sortByFounded}
                      />
                    </div>
                  </th>
                  <th className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                      CEO
                      {/* {showAll && (
                        <FaSort
                          className={`inline-block cursor-pointer ${
                            activeSortColumn === "ceo"
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                          onClick={sortByCEO}
                        />
                      )} */}
                      <FaSort
                        className={`inline-block cursor-pointer ${
                          activeSortColumn === "ceo"
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                        onClick={sortByCEO}
                      />
                    </div>
                  </th>
                  <th className="border p-2">Headquarters</th>
                  <th className="border p-2">Website</th>
                  <th className="border p-2">Description</th>
                </tr>
              </thead>

              <tbody>
                {/* {filtered.map((company, index) => ( */}
                {currentData.map((company, index) => (
                  <tr key={company.id} className="odd:bg-white even:bg-gray-50">
                    <td className="border p-2 text-center">
                      {indexOfFirst + index + 1}
                    </td>
                    <td className="border p-2 font-semibold">{company.name}</td>
                    <td className="border p-2">{company.industry}</td>
                    <td className="border p-2">{company.foundedYear}</td>
                    <td className="border p-2">{company.ceo}</td>
                    <td className="border p-2">
                      {company.headquarters.city}, {company.headquarters.state},{" "}
                      {company.headquarters.country}
                    </td>
                    <td className="border p-2">
                      <a
                        style={{ textDecoration: "none" }}
                        className="hover:text-indigo-600"
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {company.website}
                      </a>
                    </td>
                    <td className="border p-2">{company.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* pagination */}
      <div>
        {/* {filtered.length > 1 <=10 && ( */}
        {!showAll && filtered.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-6">
            {/* Previous */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded transition ${
                currentPage === 1
                  ? "bg-blue-500 text-gray-600 hover:bg-blue-600"
                  : "btn btn-warning text-gray-600 cursor-not-allowed"
              }`}
            >
              Previous
            </button>
            {/* <span className="font-semibold text-lg">
              Page {currentPage} of {totalPages}
            </span> */}
            <span className="font-semibold text-lg">{currentPage}</span>
            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded transition ${
                currentPage === totalPages
                  ? "bg-blue-500 text-gray-600 hover:bg-blue-600"
                  : "btn btn-success text-white cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {/* show all */}
      <div className="mt-4">
        {/* <button
          onClick={() => setShowAll((prev) => !prev)}
          className="px-4 py-2 btn btn-primary rounded"
        >
          {showAll ? "Show Pagination" : "Show All Company Data"}
        </button> */}
        {/* {filtered.length !== 0 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-4 py-2 btn btn-primary rounded"
          >
            {showAll ? "Show Pagination" : "Show All Company Data"}
          </button>
        )} */}
        {filtered.length !== 0 && !isFiltering && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-4 py-2 btn btn-primary rounded"
          >
            {showAll ? "Show Pagination" : "Show All Company Data"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CompaniesList;
