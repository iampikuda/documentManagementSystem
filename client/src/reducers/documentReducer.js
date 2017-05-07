import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DOCUMENT_CREATED:
      return {
        ...state, createStatus: action.status, documents: action.documents
      };
    case actionTypes.DOCUMENT_CREATE_FAILED:
      return { ...state, status: action.status };
    case 'ALL_DOCUMENTS':
      return { ...state, documents: action.documents };
    case actionTypes.VIEW_USER_DOCUMENTS_SUCCESS:
      return { ...state, document: action.documents, pageCount: action.pageCount };
    case actionTypes.SEARCH_DOCS_COMPLETE:
      return { ...state, search: action.documents, status: action.status, searchPageCount: action.pageCount, query: action.query };
    case actionTypes.SEARCH_DOCS_FAILED:
      return { ...state, status: action.status };
    default:
      return state;
  }
};
