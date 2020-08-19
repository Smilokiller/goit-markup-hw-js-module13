import templateCountries from "./templates/imagesHbs.hbs";
import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const gallery = document.querySelector('.gallery');
const keyWord = document.querySelector('.keyWord');
const enterKey = document.querySelector('.load')
const loadMore = document.querySelector('.load__more')

console.log(screen.height)

let keyValue;
let page = 0;

const addItem = function(list) {
    const templateItems = templateCountries(list.hits);
    gallery.insertAdjacentHTML('beforeend', templateItems);
}



const screenScroll = function() {
    const sctrrenTime = setTimeout(() => {
        scrollBy({
            top: (screen.height - 250),
            behavior: "smooth"
        });
    }, 100);
}

const addImages = function() {
    keyValue = keyWord.value;
    page += 1;
    loadMore.classList.add('is__active');
    const find = fetch(`
        https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${keyValue}&page=${page}&per_page=12&key=17937639-afdfa4080eb94060ee59a5ab1`)
        .then((list) => list.json())
        .then((list) => addItem(list));
    return find;
};


const addNewItems = function() {
    addImages()
    screenScroll()
}

enterKey.addEventListener('click', addImages);
loadMore.addEventListener('click', addNewItems);