import { LOAD_ALL_CONTENTS, SOURCE, START, ERROR } from '../actions/content';

const initialState = {
  loading: false,
  error: null,
  results: {},
};

export default function contentReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_CONTENTS + START:
      return {
        ...state,
        loading: true,
      };
    case LOAD_ALL_CONTENTS + SOURCE:
      return {
        ...state,
        response: action.contentArr,
      };
    case LOAD_ALL_CONTENTS + ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
