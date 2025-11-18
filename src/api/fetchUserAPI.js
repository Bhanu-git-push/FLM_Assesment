import axios from "axios";

export const getUsers = async (email, password) => {
  const response = await axios.get("http://localhost:3001/users", {
    params: { email, password },
  });
  return response.data;
};
