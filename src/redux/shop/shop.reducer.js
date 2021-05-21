import SHOP_DATA from "./shop.data";
import ShopActionsTypes from "./shop.types";


const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
}

const ShopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionsTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            }
        case ShopActionsTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case ShopActionsTypes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case ShopActionsTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        default: 
             return state
    }
}

export default ShopReducer;