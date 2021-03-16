const REQUEST_FILTER_FIELDS = {
  TYPES: { keyWord: 'types', label: 'тип запису', placeholder: 'Книга'},
  AUTHORS: { keyWord: 'authors', label: 'АВТОР', placeholder: 'Пушкин'},
  PUBLISHERS: { keyWord: 'publishers', label: 'ВИДАВНИЦТВО', placeholder: 'довільно'},
  LANGUAGES: { keyWord: 'languages', label: 'МОВА ВИДАННЯ', placeholder: 'Російська'},
  RUBRICS: { keyWord: 'rubrics', label: 'ОСНОВНА РУБРИКА', placeholder: 'Художня література'},
  AUDIENCES: { keyWord: 'audiences', label: 'Аудиторія', placeholder: 'будь-яка аудиторія'}
}
export const SET_FILTER_PARAMS = 'SET_FILTER_PARAMS'
export const CLEAR_FILTER_PARAMS = 'CLEAR_FILTER_PARAMS'
export const SET_FILTER_DATE_FROM = 'SET_FILTER_DATE_FROM'
export const SET_FILTER_DATE_TO = 'SET_FILTER_DATE_TO'
export const SET_QUERY_WORD = 'SET_QUERY_WORD'

export default REQUEST_FILTER_FIELDS
