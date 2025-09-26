
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Item, User, ItemStatus } from '../types';
import { MOCK_ITEMS, MOCK_CURRENT_USER } from '../constants';

interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  items: Item[];
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'UPDATE_ITEM_STATUS'; payload: { id: string; status: ItemStatus } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  isAuthenticated: false,
  user: null,
  items: MOCK_ITEMS,
  isLoading: false,
  error: null,
};

const AppReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    case 'ADD_ITEM':
      return { ...state, items: [action.payload, ...state.items] };
    case 'UPDATE_ITEM_STATUS':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, status: action.payload.status } : item
        ),
      };
    case 'SET_LOADING':
        return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
        return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
