import axios from "axios";

const BASE_URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";

export const fetchJobs = async (payload: any) => {
  try {
    const response = await axios.post(`${BASE_URL}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
