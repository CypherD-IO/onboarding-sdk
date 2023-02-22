import { configureStore, createSlice } from '@reduxjs/toolkit';

export const PORTFOLIO_EMPTY = 'EMPTY';
export const PORTFOLIO_NOT_EMPTY = 'NOT_EMPTY';

const portfolioSlice = createSlice({
  name: 'portfolioStore',
  initialState: {
    tokenPortfolio: undefined,
    portfolioState: PORTFOLIO_NOT_EMPTY,
  },
  reducers: {
    setPortfolioStore: (state, action) => {
      state.tokenPortfolio = action.payload.tokenPortfolio;
      state.portfolioState = action.payload.portfolioState;
    }
  }
});

const store = configureStore({
  reducer: {
    portfolioStore: portfolioSlice.reducer
  }
});

export const { setPortfolioStore } = portfolioSlice.actions;

export default store;
