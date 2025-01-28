import { configureStore, createSlice } from '@reduxjs/toolkit';

// State'in başlangıç değeri
const initialState = {
  value: 0,
};

// Bir örnek slice oluşturuyoruz
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Reducer'ı export ediyoruz
export const { increment, decrement } = counterSlice.actions;

// Redux store'unu oluşturuyoruz
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer, // burada counter reducer'ını ekliyoruz
  },
});

export default store;
