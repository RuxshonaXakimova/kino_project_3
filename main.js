import { getData } from "./module/helpers";
import { reload } from "./module/ui";

let body = document.body
let box_one_bottom = document.querySelector('.box_one_bottom')
let box_one_top_p = document.querySelectorAll('.box_one_top p')
let film_bg = document.querySelector('.film_bg')
let box_two_middle = document.querySelector('.box_two_middle')



getData('/movie/now_playing?language=ru')
  .then(res => {
    let film = res.results.splice(1,8)
    reload(film, box_one_bottom, film_bg);
  })


  box_one_top_p.forEach(btn => {
  btn.onclick = () => {
    box_one_top_p.forEach(p => {
      p.classList.remove('choosed_janre')
    })
    btn.classList.add('choosed_janre')
  }
})


getData('/movie/{1}/videos?language=ru')
  .then(res => {
    box_two_middle.style.background = `url(https://image.tmdb.org/t/p/original${res.poster_path}) center no-repeat`
    box_two_middle.style.backgroundSize = 'cover'
  })
