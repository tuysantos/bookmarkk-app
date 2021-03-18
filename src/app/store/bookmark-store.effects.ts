import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookMarkService } from '../services/book-mark.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { BookmarkActions } from './bookmark-store.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BookMarkEffects {

    getBookMark$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(BookmarkActions.getBookMark),
            switchMap( action => 
                this.bookMarkService.getBookMark(action.payload).pipe(
                    map(result => {
                            return BookmarkActions.getBookMarkSuccess({ payload: result})
                            }
                        ),
                    catchError((error: HttpErrorResponse) => {
                        return of(BookmarkActions.getBookMarkFailure({ error }))})
                ))
        )
    );

    getBookMarks$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(BookmarkActions.getBookMarks),
            switchMap( action => 
                this.bookMarkService.getBookMarks().pipe(
                    map(bookMarks => {
                            return BookmarkActions.getBookMarksSuccess({ payload: bookMarks})
                            }
                        ),
                    catchError((error: HttpErrorResponse) => of(BookmarkActions.getBookMarksFailure({ error })))
                ))
        )
    );

    addBookMark$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(BookmarkActions.addBookMark),
            switchMap( action => 
                this.bookMarkService.addBookMark(action.payload).pipe(
                    map(result => {
                            return BookmarkActions.addBookMarkSuccess({ payload: result})
                            }
                        ),
                    catchError((error: HttpErrorResponse) => {
                        return of(BookmarkActions.deleteBookMarksFailure({ error }))})
                ))
        )
    );

    updateBookMark$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(BookmarkActions.updateBookMark),
            switchMap( action => 
                this.bookMarkService.uppdateBookMark(action.payload).pipe(
                    map(result => {
                            return BookmarkActions.updateBookMarkSuccess({ payload: result, obj: action.payload})
                            }
                        ),
                    catchError((error: HttpErrorResponse) => {
                        return of(BookmarkActions.updateBookMarkFailure({ error }))})
                ))
        )
    );

    deleteBookMark$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(BookmarkActions.deleteBookMark),
            switchMap( action => 
                this.bookMarkService.deleteBookMark(action.payload).pipe(
                    map(result => {
                            return BookmarkActions.deleteBookMarksSuccess({ payload: result, id: action.payload})
                            }
                        ),
                    catchError((error: HttpErrorResponse) => {
                        return of(BookmarkActions.deleteBookMarksFailure({ error }))})
                ))
        )
    );


    constructor(
        private actions$: Actions,
        private bookMarkService: BookMarkService,
    ) {}
}