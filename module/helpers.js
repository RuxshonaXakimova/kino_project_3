const base_url = "https://api.themoviedb.org/3"

export const getData = async (path) => {
  try {
    const res = await fetch(base_url + path, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWJiOTM1YmEyYThiZWRiMzM1ODYxNmVkZDU4YmIxYSIsInN1YiI6IjY1NWU1ODAwYjI2ODFmMDExYjAwYzlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pe2bsFBMYg3FFK0WJrcSI3xRYsEAutS9t4ScvparZck'
      }
    })

    const data = await res.json()

    return data
  } catch (e) {
    console.log(e);
  }
}
