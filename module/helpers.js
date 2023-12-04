import axios from "axios"

const base_url = import.meta.env.VITE_BASE_URL

export async function  getData (path) {
  try {
    const res = await axios.get(base_url + path, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWJiOTM1YmEyYThiZWRiMzM1ODYxNmVkZDU4YmIxYSIsInN1YiI6IjY1NWU1ODAwYjI2ODFmMDExYjAwYzlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pe2bsFBMYg3FFK0WJrcSI3xRYsEAutS9t4ScvparZck'
      }
    })

    const data = res.data

    return data
  } catch (e) {
    console.log(e);
  }
}
