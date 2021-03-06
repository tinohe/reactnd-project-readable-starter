import {
  FETCH_CATEGORIES
} from '../actions'

export const categories = (state = [], action) => {

  switch (action.type) {

    case FETCH_CATEGORIES: {
      return [].concat(action.categories)
    }
    default: {
      return state
    }
  }
}