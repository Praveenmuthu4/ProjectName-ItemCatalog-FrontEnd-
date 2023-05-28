import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.product],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.itemId
        ),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const removeFromCart = (dispatch, productId) => {
  return dispatch({
    type: "REMOVE_FROM_CART",
    payload: {
      productId: productId,
    },
  });
};

const CartProviderFunction = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
  });

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

const useCartState = () => useContext(CartStateContext);
const useCartDispatch = () => useContext(CartDispatchContext);

export { CartProviderFunction, useCartState, useCartDispatch };
