import './sass/main.scss';
import './js/apiService.js';
import NewApiService from './js/apiService.js';
import imgCardTpl from './tpl/imgCardTpl';
import { error } from '@pnotify/core';
import { info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import _ from 'lodash';

const refs = {
  searchForm: document.querySelector('.search-form'),
  cardsContainer: document.querySelector('.cards-container'),
  loadMoreNode: document.querySelector('.more'),
};

const newApiService = new NewApiService();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreNode.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  newApiService.query = e.currentTarget.elements.query.value;
  newApiService.resetPage();
  newApiService.fetchHits().then(addNewQueryCards);
  refs.loadMoreNode.classList.remove('is-hidden');
}

function onLoadMore() {
  newApiService.fetchHits().then(appendCards);
}

function addNewQueryCards(hits) {
  refs.cardsContainer.innerHTML = imgCardTpl(hits);
}

function appendCards(hits) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', imgCardTpl(hits));
  refs.loadMoreNode.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
