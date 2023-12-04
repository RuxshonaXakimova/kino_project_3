import axios from "axios";
import { getData } from "./module/helpers";
import Chart from 'chart.js/auto';

let id = location.search.split("=").at(-1)
let img = document.querySelector('.box_one_left img')
let film_title = document.querySelectorAll('.film_title, .film_name')
let film_original_title = document.querySelector('.film_original_title')
let description = document.querySelector('.description')
let watch_trailer_btn= document.querySelector('.watch button')
let director_p = document.querySelectorAll('.movie_three_left p')    

Promise.all([getData(`/movie/${id}`), getData(`/movie/${id}/credits`)])
		.then(([movies, credits]) => {
            let info  = []
            let [...genres] = []
            movies.genres.forEach(genre => {
                genres.push(genre.name)
            })
            info.push(movies.release_date.split("-")[0], movies.production_countries[0].name, movies.tagline, genres)

			console.log(movies)
            console.log(credits);
            let b  = credits.crew
            let jobs = b.filter(smth=> smth.job == "Director"|| smth.job == "Story" || smth.job == "Producer" || smth.job == "Other" || smth.job == "Songs" || smth.job == "Production Design" || smth.job == "Associate Editor" )
            jobs.filter(finded => {
                
                if(info.includes(finded.job)){
                    return
                } else{
                    info.push(finded.job)
                }

            })
            
        
        
        console.log(info);
        img.src = "https://image.tmdb.org/t/p/original/"+movies.poster_path
        film_title.forEach(title => {
            title.innerHTML = movies.title
        })
        film_original_title.innerHTML = movies.original_title
        description.innerHTML = `${movies.overview.slice(0, 300)} ...`
		})
        watch_trailer_btn.onclick = () => {
            
        }


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