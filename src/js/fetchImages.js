const keyAPI = '20407857-5cbc70afd557f45317642044e';

export default {
  searchQuery: '',
  page: 1,
  fetchImages(searchQuery) {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${this.page}&per_page=12&key=${keyAPI}`;
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        this.page += 1;
        return res;
      })
      .catch(error => {
        error({ text: 'Network error!' });
        console.log(error);
      });
  },
  resetPage() {
    this.page = 1;
  },
};
