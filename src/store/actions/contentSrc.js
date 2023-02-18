import { SOURCE, LOAD_ALL_CONTENTS, START, ERROR } from './content';
import { useDispatch } from 'react-redux';

import source from '../source/source.json';

export function fetchContentStart(contentArr) {
  return {
    type: LOAD_ALL_CONTENTS + START,
    contentArr,
  };
}

export function fetchContentError(e) {
  return {
    type: LOAD_ALL_CONTENTS + ERROR,
    error: e,
  };
}

export function getSourceContent(contentArr) {
  return {
    type: LOAD_ALL_CONTENTS + SOURCE,
    contentArr,
  };
}

export function fetchAllContent() {
  return async (dispatch) => {
    dispatch(fetchContentStart());

    try {
      dispatch(getSourceContent(source));
    } catch (e) {
      dispatch(fetchContentError(e));
    }
  };
}
