import { error } from '@pnotify/core';
import { info } from '@pnotify/core';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 12;
    this.key = '22773171-6fe03cddc33c3049d7faab277';
  }
  fetchHits() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${this.key}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length < 1) {
          error({
            text: 'The request is incorrect',
            type: 'info',
          });
        }
        this.page += 1;
        return data.hits;
      });
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
