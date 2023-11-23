import { getData } from "./module/helpers";
import { reload } from "./module/ui";

let body = document.body
let box_one_bottom = document.querySelector('.box_one_bottom')
let box_one_top_p = document.querySelectorAll('.box_one_top p')
let film_bg = document.querySelector('.film_bg')


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
