import {movies} from './db.js'

let ul = document.querySelector('.promo__interactive-list')
let promo_bg =  document.querySelector('.promo__bg')
let promo__genre = document.querySelector('.promo__genre')
let promo__title = document.querySelector('.promo__title')
let promo__descr = document.querySelector('.promo__descr')
let IMDB = document.querySelector('.IMDB')
let kinop = document.querySelector('.kinop')
let inpSearch = document.getElementById('search')
let items = document.querySelectorAll('.promo__menu-item')

items.forEach((item) => {
    item.onclick = (e) => {
        let filter_geners = []
        movies.filter((i) => {
            if(i.Genre.includes(e.target.innerHTML)) {
                filter_geners.push(i)
                reload(filter_geners)
            }
        })
    }
})

inpSearch.onkeyup = () => {
    let search_key = inpSearch.value.trim().toLowerCase()
    let filtered = movies.filter(item =>{
        let title = item.Title.toLowerCase()

        if(title.includes(search_key)){
            return item 
        }
    })
    reload (filtered)
}

function reload(arr) {
    ul.innerHTML = ""
    showMovie(arr[0])
    for(let item of arr){
        
        let li = document.createElement('li')
        let del = document.createElement('div')

        li.classList.add('promo__interactive-item')
        del.classList.add('delete')

        li.innerHTML = `${arr.indexOf(item) + 1}. ${item.Title}`

        li.append(del)
        ul.append(li)

        li.onclick = () =>{
            showMovie (item)
        }
    }
}
reload (movies)

function showMovie(data) {
    promo_bg.style.backgroundImage = `url("${data.Poster}")`
    promo__genre.innerHTML = data.Genre
    promo__title.innerHTML = data.Title
    promo__descr.innerHTML = data.Plot
    IMDB.innerHTML =  `IMDb: ${data.imdbRating}`
    kinop.innerHTML = `Кинопоиск: ${data.Metascore}`
    // if (name.innerHTML.length > 15) {
    //     name.innerHTML = name.innerHTML.substring(0, 23) + '...';
    // }

}
showMovie()
