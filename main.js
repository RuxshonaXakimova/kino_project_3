import { getData } from "./module/helpers";
import { min_videos, popular_person, reload } from "./module/ui";

let body = document.body
let box_one_bottom = document.querySelector('.box_one_bottom')
let box_one_top_p = document.querySelectorAll('.box_one_top_p, .header_middle p')
let film_bg = document.querySelector('.film_bg')
let box_two_middle = document.querySelector('.box_two_middle')
let iframe = document.querySelector('iframe')
let traler_name = document.querySelector('.box_two_bottom_left h2')
let name_origin = document.querySelectorAll('.name_origin')
let popular_right = document.querySelector('.popular_right')
let box_two_mini_videos = document.querySelector('.box_two_mini_videos')
let box_four_bottom = document.querySelector('.box_four_bottom')




Promise.all([getData('/movie/now_playing'), getData('/genre/movie/list')])
  .then(([movies, genre]) => {
    let film = movies.results.splice(1, 8)
    reload(film, box_one_bottom, genre.genres);
    getData(`/movie/${movies.results[0].id}/videos`)
      .then(res => {
        setTrailer(res.results[0].key, res.results[0].name)
      })

  })



box_one_top_p.forEach(btn => {
  btn.onclick = () => {
    box_one_top_p.forEach(p => {
      p.classList.remove('choosed_janre')
    })
    btn.classList.add('choosed_janre')
  }
})

export function setTrailer(video, name) {
  iframe.src = 'https://www.youtube.com/embed/' + video

  traler_name.innerHTML = name
}


getData('/person/popular')
  .then(res => {
    popular_person(res.results, popular_right)
  })



getData(`/movie/top_rated`)
  .then(res => {
    min_videos(res.results, box_two_mini_videos)
  })



Promise.all([getData('/movie/popular'), getData('/genre/movie/list')])
  .then(([movies, genre]) => {
    reload(movies.results, box_four_bottom, genre.genres);
    getData(`/movie/${movies.results[0].id}/videos`)
      .then(res => {
        setTrailer(res.results[0].key, res.results[0].name)
      })

  })




















// getData('/movie/popular')
//   .then(res => {
//   console.log(res);
// reload(res.results, box_four_bottom)
// })




















// getData('/movie/now_playing?language=ru')
//   .then(res => {
//     let film = res.results.splice(1,8)
//     reload(film, box_one_bottom, film_bg);
//   })




// getData('/genre/movie/list')
// .then(res=> {
//   console.log(res);
// })




// box_two_middle.style.background = `url(https://image.tmdb.org/t/p/original${res.poster_path}) center no-repeat`
//   box_two_middle.style.backgroundSize = 'cover'