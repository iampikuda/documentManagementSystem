import expect from 'expect';
import * as actionTypes from '../../../client/src/actions/actionTypes';
import documentReducer from '../../../client/src/reducers/documentReducer'


describe('Document Reducer', () => {
  const initialDocument = [
  {
    id: 9,
    title: 'Abiku-1',
    content: 'In vain your bangles cast, charms circle at your feet'
  },
  {
    id: 11,
    title: 'Abiku-2',
    content: 'Coming and going these several seasons Do stay'
  },
  {
    id: 13,
    title: 'class-23',
    content: 'the best class ever'

  }
];

const initialState = {
  documents: initialDocument,
  documentDetails: false,
  editMode: false
};
let currentState;

  it('should return the initial state', () => {
    expect(
      documentReducer(undefined, [])
    ).toEqual(
      []
    )
  });

it(`should load all documents in the store and
       return the state with all documents`, () => {
    const documents = [
      { id: 5,
        title: 'butterfly',
        content: 'to pimp a butterfly' },
      { id: 6, title: 'eyez', content: 'for your eyes only' }
    ];

    const action = { type: 'DOCUMENT_CREATED', documents };
    currentState = documentReducer(initialState, action);
    expect(currentState.documents.content).toEqual('to pimp a butterfly');
  });

});
