import { getData } from "./module/helpers";
import { reload } from "./module/ui";

let body = document.body
let box_one_bottom = document.querySelector('.box_one_bottom')
let box_one_top_p = document.querySelectorAll('.box_one_top_p, .header_middle p')
let film_bg = document.querySelector('.film_bg')
let box_two_middle = document.querySelector('.box_two_middle')
let iframe = document.querySelector('iframe')
let traler_name = document.querySelector('.box_two_bottom_left h2')
let box_three_bottom = document.querySelector('.box_three_bottom')

Promise.all([getData('/movie/now_playing'), getData('/genre/movie/list')])
  .then(([movies, genre]) => {
    let film = movies.results.splice(1, 8)
    reload(film, box_one_bottom, genre.genres);
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
  iframe.src = 'https://www.youtube.com/embed/' + video.key

  traler_name.innerHTML = name.title
}


























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