import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
  } else if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  } else if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true }
  } else if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured_products = action.payload.filter((p) => { return p.featured === true })
    return { ...state, products_loading: false, featured_products, products: action.payload }
  } else if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_error: true, products_loading: false }
  }
  throw new Error(`No Matching "${action.type}" - action type from products_reducer`)
}

export default products_reducer
