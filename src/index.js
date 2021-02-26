import './styles.css';
import 'material-design-icons/iconfont/material-icons.css';

import API from './js/fetchImages';
import galleryTpl from './templates/images.hbs';
import refs from './js/refs';
import openModal from './js/modal';

refs.searchFormRef.addEventListener('submit', inputValue);
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

  refs.modalRef.addEventListener('click', openModal);
  openModal(event);
}

function galleryMarkup(img) {
  const markup = galleryTpl(img);
  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
  refs.loadMoreRef.classList.remove('is-hidden');
}
refs.loadMoreRef.addEventListener('click', () => {
  API.fetchImages(API.searchQuery).then(hits => galleryMarkup(hits));
  refs.loadMoreRef.classList.remove('is-hidden');

  window.scrollBy({
    top: document.documentElement.clientHeight,
    behavior: 'smooth',
  });
});
