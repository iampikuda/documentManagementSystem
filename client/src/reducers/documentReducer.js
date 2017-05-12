import * as actionTypes from '../actions/actionTypes';

/**
 * @export
 * @param {Object} [state={}]
 * @param {Object} action
 * @returns {Object} return object
 */
export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DOCUMENT_CREATED: {
      let data = action.document.data;
      return Object.assign({}, state, {
        ...state,
        createStatus: action.status,
        document: [
          ...state.document,
          data
        ]
      }
      );
    }
    case actionTypes.DOCUMENT_UPDATED: {
      let updatedData = action.document.data;
      // console.log(updatedData, '0909090909');
      // console.log(state.document, '-=-=-=-');
      return Object.assign({}, state, {
        ...state,
        document: [...state.document].map(document => 
        (document.id === updatedData.id) ?
        updatedData : document )
      }
      );
    }
    case actionTypes.DOCUMENT_DELETED: {
      let deletedData = action.data;
      let data = state.document.filter(document => (parseInt(document.id, 10) !== parseInt(deletedData.id, 10)));
      console.log(data, 'state.document');
      return Object.assign({}, state, {
        ...state,
        document: data
      });
      // results: [...state.documents.results].filter(document =>
      //       (parseInt(document.id, 10) !== parseInt(action.payload.id, 10))) } });
    }
    case actionTypes.DOCUMENT_CREATE_FAILED:
      return { ...state, status: action.status };
    // case 'ALL_DOCUMENTS':
    //   return { ...state, documents: action.documents };
    case actionTypes.GET_ALL_DOCUMENTS:
      return {
        ...state,
        document: action.data,
        pageCount: action.pageCount
      };
    case actionTypes.SEARCH_DOCS_COMPLETE:
      return {
        ...state,
        search: action.data,
        status: action.status,
        searchPageCount: action.pageCount,
        query: action.query
      };
    case actionTypes.SEARCH_DOCS_FAILED:
      return { ...state, status: action.status };
    default:
      return state;
  }
};
