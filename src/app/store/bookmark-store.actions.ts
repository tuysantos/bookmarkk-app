
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import { BookMark, BookMarkDeleteResponse, BookMarkUpdateResponse } from '../model/bookmark';


export class BookmarkActions {
    // getBookMark
    public static getBookMark = createAction(
        '[Bookmark edit Page] Get Bookmark',
        props<{ payload: string }>()
    );

    public static getBookMarkSuccess = createAction(
        '[Bookmark API] Get Bookmark Success',
        props<{ payload: FetchResult<BookMark> }>()
    );

    public static getBookMarkFailure = createAction(
        '[Bookmark API] Get Bookmark Failure',
        props<{ error: HttpErrorResponse }>()
    );

    // getBookMarks
    public static getBookMarks = createAction(
        '[Bookmark List Page] Get Bookmarks',
    );

    public static getBookMarksSuccess = createAction(
        '[Bookmark API] Get Bookmarks Success',
        props<{ payload: ApolloQueryResult<BookMark[]> }>()
    );

    public static getBookMarksFailure = createAction(
        '[Bookmark API] Get Bookmarks Failure',
        props<{ error: HttpErrorResponse }>()
    );

    // deleteBookMarks
    public static deleteBookMark = createAction(
        '[Bookmark delete Page] Delete Bookmark',
        props<{ payload: string }>()
    );

    public static deleteBookMarksSuccess = createAction(
        '[Bookmark API] Delete Bookmark Success',
        props<{ payload: FetchResult<BookMarkDeleteResponse>, id: string }>()
    );

    public static deleteBookMarksFailure = createAction(
        '[Bookmark API] Delete Bookmark Failure',
        props<{ error: HttpErrorResponse }>()
    );

    // addBookMark
    public static addBookMark = createAction(
        '[Bookmark Page] Add Bookmark',
        props<{ payload: BookMark }>()
    );

    public static addBookMarkSuccess = createAction(
        '[Bookmark API] Add Bookmark Success',
        props<{ payload: FetchResult<BookMark> }>()
    );

    public static addBookMarkFailure = createAction(
        '[Bookmark API] Add Bookmark Failure',
        props<{ error: HttpErrorResponse }>()
    );

    // updateBookMark
    public static updateBookMark = createAction(
        '[Bookmark Page] Update Bookmark',
        props<{ payload: BookMark }>()
    );

    public static updateBookMarkSuccess = createAction(
        '[Bookmark API] Update Bookmark Success',
        props<{ payload: FetchResult<BookMarkUpdateResponse>, obj: BookMark }>()
    );

    public static updateBookMarkFailure = createAction(
        '[Bookmark API] Update Bookmark Failure',
        props<{ error: HttpErrorResponse }>()
    );
}