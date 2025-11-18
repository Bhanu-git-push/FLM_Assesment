import axios from "axios";

export const getCompanies = async () => {
  const response = await axios.get("http://localhost:3000/companies");
  return response.data;
};