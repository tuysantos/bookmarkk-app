import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookMarkStoreReducer, BookMarkStoreState } from "./bookmark-store.reducer";

export const bookMarkState = createFeatureSelector(BookMarkStoreReducer.featureSelectorKey);

export class BookMarkSelectors {
    public static bookMarks = createSelector(
        bookMarkState,
        (state: BookMarkStoreState) => (state ? state.bookMarks : [])
    );

    public static currentBookMark = createSelector(
        bookMarkState,
        (state: BookMarkStoreState) => (state ? state.currentBookMarket : null)
    );


    public static error = createSelector(
        bookMarkState,
        (state: BookMarkStoreState) => (state ? state.error : null)
    );

    public static apiState = createSelector(
        bookMarkState,
        (state: BookMarkStoreState) => (state ? state.apiState : null)
    );
}