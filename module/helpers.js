const base_url = "https://api.themoviedb.org/3"

export const getData = async (path) => {
  try {
    const res = await fetch(base_url + path, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGI2YzRjMDczYWVhN2M5NjZlMDdjMWU3YTc0MjY3OSIsInN1YiI6IjY1NWU1ODAwYjI2ODFmMDExYjAwYzlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zjDMPRNFQAZSMz-q8NFHojqHnUGH1F-ruVgemplnINo'
      }
    })

    const data = await res.json()

    return data
  } catch (e) {
    console.log(e);
  }
}
