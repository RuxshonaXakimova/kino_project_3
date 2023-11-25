import { getData } from "./module/helpers";
import Chart from 'chart.js/auto';

let id = location.search.split("=").at(-1)
let img = document.querySelector('.box_one_left img')
let film_title = document.querySelectorAll('.film_title, .film_name')
let film_original_title = document.querySelector('.film_original_title')
let description = document.querySelector('.description')

getData(`/movie/${id}`)
    .then(res=> {
        console.log(res)
        img.src = "https://image.tmdb.org/t/p/original/"+res.poster_path
        film_title.forEach(title => {
            title.innerHTML = res.title
        })
        film_original_title.innerHTML = res.original_title
        description.innerHTML = `${res.overview.slice(0, 300)} ...`
    }) 




















    // let ctx = document.querySelector('#chart_one')
    // const chart = new Chart(ctx, {
    //     type: 'doughnut',
    //     data: {
    //         datasets: [{
    //             label: 'My First Dataset',
    //             data: [62.5],
    //             hoverOffset: 4
    //           }],
    //         labels: [
    //             'green'
    //         ]
    //     },
    //     options: {
    //         plugins: {
    //           legend: {
    //             display: false
    //           }
    //         },
    //         cutout: {
    
    //         }
    //       }
        
    //   });