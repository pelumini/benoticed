import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import Cookies from 'js-cookie';

type StoreProviderProps = {
  children: ReactNode;
};

type InitialStateType = {
  darkMode: boolean;
  cart: any;
  userInfo: any;
};

type ACTIONTYPE =
  | { type: 'DARK_MODE_ON'; payload?: string }
  | { type: 'DARK_MODE_OFF'; payload?: string }
  | { type: 'CART_ADD_ITEM'; payload?: any }
  | { type: 'CART_REMOVE_ITEM'; payload?: any }
  | { type: 'SAVE_SHIPPING_ADDRESS'; payload?: any }
  | { type: 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION'; payload?: any }
  | { type: 'SAVE_PAYMENT_METHOD'; payload?: string }
  | { type: 'CART_CLEAR'; payload?: string }
  | { type: 'USER_LOGIN'; payload?: string }
  | { type: 'USER_LOGOUT'; payload?: string }
  | { type: 'DARK_MODE_OFF'; payload?: string };

const initialState: InitialStateType = {
  darkMode: Cookies.get('darkMode') === 'ON',
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems') as string)
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress') as string)
      : { location: {} },
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo') as string)
    : null,
};

export const Store = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ACTIONTYPE>;
}>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: InitialStateType, action: ACTIONTYPE) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: any) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: any) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item: any) => item._id !== action.payload._id
      );
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    case 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            location: action.payload,
          },
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };

    default:
      return state;
  }
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
