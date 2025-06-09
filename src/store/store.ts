import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of your state
interface AppState {
  currentPage: string; // To manage which page is currently displayed
  isMenuOpen: boolean; // Example: manage menu state globally
  // Add other global states as needed
}

// Initial state
const initialState: AppState = {
  currentPage: 'home', // Default page
  isMenuOpen: false,
};

// Create a slice for your app state
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    // Add other reducers for global state management
  },
});

// Export actions
export const { setCurrentPage, toggleMenu, setMenuOpen } = appSlice.actions;

// Create the store
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

// Define RootState and AppDispatch types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;