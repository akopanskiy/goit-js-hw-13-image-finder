import './styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import API from './js/fetchImages';
import galleryTpl from './templates/images.hbs';
import refs from './js/refs';

refs.searchFormRef.addEventListener('submit', inputValue);
refs.galleryRef.addEventListener('click', openModal);
refs.scrollButton.addEventListener('click', scrollToTop);

function inputValue(event) {
  event.preventDefault();

  API.searchQuery = event.target.elements.query.value.trim();
  if (!API.searchQuery) {
    return;
  }
  refs.galleryRef.innerHTML = '';
  refs.searchFormRef.reset();

  API.resetPage();
  refs.loadMoreRef.classList.add('is-hidden');
  API.fetchImages(API.searchQuery).then(hits => galleryMarkup(hits));
}

function galleryMarkup(img) {
  const markup = galleryTpl(img);
  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
  refs.loadMoreRef.classList.remove('is-hidden');
}
refs.loadMoreRef.addEventListener('click', () => {
  API.fetchImages(API.searchQuery)
    .then(hits => galleryMarkup(hits))
    .then(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight,
        behavior: 'smooth',
      });
    });
  refs.loadMoreRef.classList.remove('is-hidden');
  refs.scrollButton.classList.remove('is-hidden');
});

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    basicLightbox
      .create(
        `
    <img src="${event.target.getAttribute(
      'data-source',
    )}" width="800" height="600">
`,
      )
      .show();
  }
}
function scrollToTop() {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}
