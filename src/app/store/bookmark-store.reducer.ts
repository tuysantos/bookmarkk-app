import { HttpErrorResponse } from "@angular/common/http";
import { Action, createReducer, on } from "@ngrx/store";
import { ApiState } from "../model/api.satets";
import { BookMark } from "../model/bookmark";
import { BookmarkActions } from "./bookmark-store.actions";


export interface BookMarkStoreState {
    bookMarks: BookMark[];
    currentBookMarket: BookMark;
    apiState: ApiState;
    error: HttpErrorResponse;
};

const initialState: BookMarkStoreState = {
    bookMarks: [],
    currentBookMarket: null,
    apiState: ApiState.Init,
    error: null,
};

export function updateBookMark(bookMarks: BookMark[], updatedBookMark: BookMark): BookMark[] {
    let temp: BookMark[] = [];
    bookMarks.forEach(item => {
        (item.id !== updatedBookMark.id) ? temp.push(item) : temp.push(updatedBookMark) ;
    })
    return temp;
}

export class BookMarkStoreReducer {
    public static featureSelectorKey = 'boomarks';

    public static reducer = createReducer(
        initialState,
        //get bookmarks
        on(BookmarkActions.getBookMarks, (state, _) => ({
            ...state,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(BookmarkActions.getBookMarksSuccess, (state, { payload }) => ({
            ...state,
            bookMarks: payload.data,
            apiState: ApiState.Done,
            error: null,
        })),
        on(
            BookmarkActions.getBookMarksFailure,
            (state, { error }) => ({
                ...state,
                currentBookMarket: null,
                apiState: ApiState.Error,
                error,
            })
        ),
        // Delete bookMark
        on(BookmarkActions.deleteBookMark, (state, _) => ({
            ...state,
            apiState: ApiState.Pending,
            currentBookMarket: null,
            error: null,
        })),
        on(BookmarkActions.deleteBookMarksSuccess,
            (state, { payload, id }) => ({
                bookMarks: payload.data.deleteBookMark ? state.bookMarks['bookMarks'].filter(item => item.id !== id) : state.bookMarks,
                currentBookMarket: null,
                apiState: ApiState.Error,
                error: null,
            })
        ),
        on(BookmarkActions.deleteBookMarksFailure,
            (state, { error }) => ({
                ...state,
                currentBookMarket: null,
                apiState: ApiState.Error,
                error,
            })
        ),
        //get bookmark
        on(BookmarkActions.getBookMark, (state, _) => ({
            ...state,
            currentBookMarket: null,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(BookmarkActions.getBookMarkSuccess, (state, { payload }) => ({
            ...state,
            currentBookMarket: payload.data,
            apiState: ApiState.Done,
            error: null,
        })),
        on(BookmarkActions.getBookMarkFailure,
            (state, { error }) => ({
                ...state,
                currentBookMarket: null,
                apiState: ApiState.Error,
                error,
            })
        ),
        //add bookmark
        on(BookmarkActions.addBookMark, (state, _) => ({
            ...state,
            currentBookMarket: null,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(BookmarkActions.addBookMarkSuccess, (state, { payload }) => ({
            bookMarks: [...state.bookMarks['bookMarks'], payload.data],
            currentBookMarket: null,
            apiState: ApiState.Done,
            error: null,
        })),
        on(BookmarkActions.addBookMarkFailure,
            (state, { error }) => ({
                ...state,
                currentBookMarket: null,
                apiState: ApiState.Error,
                error,
            })
        ),
        //update bookmark
        on(BookmarkActions.updateBookMark, (state, _) => ({
            ...state,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(BookmarkActions.updateBookMarkSuccess,
            (state, { payload, obj }) => ({
                bookMarks: payload.data.updateBookMark ? updateBookMark(state.bookMarks['bookMarks'], obj) : state.bookMarks,
                currentBookMarket: null,
                apiState: ApiState.Error,
                error: null,
            })
        ),
        on(BookmarkActions.addBookMarkFailure,
            (state, { error }) => ({
                ...state,
                currentBookMarket: null,
                apiState: ApiState.Error,
                error,
            })
        ),
    );
}

export function reducer(state: BookMarkStoreState, action: Action) {
    return BookMarkStoreReducer.reducer(state, action);
}