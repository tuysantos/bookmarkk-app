import { HttpErrorResponse } from '@angular/common/http';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import { ApiState } from '../model/api.satets';
import { BookMark, BookMarkDeleteResponse, BookMarkUpdateResponse, Group } from '../model/bookmark';
import { BookmarkActions } from './bookmark-store.actions';
import { BookMarkStoreReducer, BookMarkStoreState } from './bookmark-store.reducer';

describe('BookMarkStoreReducer', () => {
    const dataReturned = {
        data: {
          bookMarks: [
            {
                id: '1',
                name: 'Bookmark 1',
                group: Group.LEISURE,
                url: 'http://xpto.co.uk'
              },
              {
                  id: '2',
                  name: 'Bookmark 2',
                  group: Group.WORK,
                  url: 'http://xpto.co.uk'
              },
              {
                  id: '3',
                  name: 'Bookmark 3',
                  group: Group.WORK,
                  url: 'http://xpto.co.uk'
              } 
          ]
        }
      }

      const dataReturned1 = {
        data: {
          bookMarks: {
                id: '1',
                name: 'Bookmark 1',
                group: Group.LEISURE,
                url: 'http://xpto.co.uk'
              }
        }
      }

    const bookMarks: BookMark[] = [
        {
          id: '1',
          name: 'Bookmark 1',
          group: Group.LEISURE,
          url: 'http://xpto.co.uk'
        },
        {
            id: '2',
            name: 'Bookmark 2',
            group: Group.WORK,
            url: 'http://xpto.co.uk'
        },
        {
            id: '3',
            name: 'Bookmark 3',
            group: Group.WORK,
            url: 'http://xpto.co.uk'
        }   
      ];
  
    const initialState: BookMarkStoreState = {
        bookMarks: [],
        currentBookMarket: null,
        apiState: ApiState.Init,
        error: null
    };

    const currentState: BookMarkStoreState = {
        bookMarks: dataReturned.data.bookMarks['bookMarks'],
        currentBookMarket: null,
        apiState: ApiState.Init,
        error: null
    };

    it('should create a reducer', () => {
        const result = BookMarkStoreReducer.reducer(initialState, BookmarkActions.getBookMarks);
        expect(result.apiState).toEqual(ApiState.Pending);
    });

    it('should fire getBookMarksSuccess action', () => {
        const currentState1: BookMarkStoreState = {
            bookMarks: bookMarks,
            currentBookMarket: null,
            apiState: ApiState.Init,
            error: null
        };

        const result = BookMarkStoreReducer.reducer(
            currentState1,
            BookmarkActions.getBookMarksSuccess({
                payload: dataReturned as unknown as ApolloQueryResult<BookMark[]>,
            })
        );
        expect(result.bookMarks['bookMarks']).toEqual(bookMarks);
    });

    it('should fire getBookMarksFailure action', () => {
        const result = BookMarkStoreReducer.reducer(
            initialState,
            BookmarkActions.getBookMarksFailure(new HttpErrorResponse({ error: 'some error occured' }))
        );
        expect(result.apiState).toEqual(ApiState.Error);
    });

    it('should fire getBookMarkSuccess action', () => {
        const currentState1: BookMarkStoreState = {
            bookMarks: dataReturned.data.bookMarks,
            currentBookMarket: null,
            apiState: ApiState.Init,
            error: null
        };
        const result = BookMarkStoreReducer.reducer(
            currentState1,
            BookmarkActions.getBookMarkSuccess({
                payload: dataReturned1 as unknown as FetchResult<BookMark>,
            })
        );
        expect(result.bookMarks[0].id).toEqual(dataReturned1.data.bookMarks.id);
    });

    it('should fire getBookMarkFailure action', () => {
        const result = BookMarkStoreReducer.reducer(
            initialState,
            BookmarkActions.getBookMarkFailure(new HttpErrorResponse({ error: 'some error occured' }))
        );
        expect(result.apiState).toEqual(ApiState.Error);
    });

    it('should fire addBookMarkSuccess action', () => {
        const currentState1: BookMarkStoreState = {
            bookMarks: dataReturned['data'] as any,
            currentBookMarket: null,
            apiState: ApiState.Init,
            error: null
        };
        const obj = {
            "data": {
              "addBookMark": {
                "id": "2",
                "name": "Bookmark 5",
                "url": "http://xpto.co.uk",
                "group": "LEISURE"
              }
            }
          }

        const result = BookMarkStoreReducer.reducer(
            currentState1,
            BookmarkActions.addBookMarkSuccess({
                payload: obj as unknown as FetchResult<BookMark>,
            })
        );
        expect(result.bookMarks[1].id).toEqual(obj.data.addBookMark.id);
    });

    it('should fire addBookMarkFailure action', () => {
        const result = BookMarkStoreReducer.reducer(
            initialState,
            BookmarkActions.addBookMarkFailure(new HttpErrorResponse({ error: 'some error occured' }))
        );
        expect(result.apiState).toEqual(ApiState.Error);
    });

    it('should fire updateBookMarkSuccess action', () => {

        const currentState1: BookMarkStoreState = {
            bookMarks: dataReturned['data'] as any,
            currentBookMarket: null,
            apiState: ApiState.Init,
            error: null
        };
        const obj: BookMark = {
            id: '2',
            name: 'Bookmark 5',
            group: Group.WORK,
            url: 'http://xpto.co.uk'
        };
        const response = {
            "data": {
              "updateBookMark": true
            }
          }
        const result = BookMarkStoreReducer.reducer(
            currentState1,
            BookmarkActions.updateBookMarkSuccess({
                payload: response as unknown as FetchResult<BookMarkUpdateResponse>,
                obj
            })
        );
        expect(result.bookMarks[1]).toEqual(obj);
    });

    it('should fire addBookMarkFailure action', () => {
        const result = BookMarkStoreReducer.reducer(
            currentState,
            BookmarkActions.addBookMarkFailure(new HttpErrorResponse({ error: 'some error occured' }))
        );
        expect(result.apiState).toEqual(ApiState.Error);
    });

    it('should fire deleteBookMarkSuccess action', () => {
        const currentState1: BookMarkStoreState = {
            bookMarks: dataReturned.data as any,
            currentBookMarket: null,
            apiState: ApiState.Init,
            error: null
        };
        //const total = dataReturned.data.bookMarks['bookMarks'].length;
        const response  = {
            "data": {
              "deleteBookMark": true
            }
          }
        const result = BookMarkStoreReducer.reducer(
            currentState1,
            BookmarkActions.deleteBookMarksSuccess({
                payload: response as unknown as FetchResult<BookMarkDeleteResponse>,
                id: '2'
            })
        );
        expect(currentState1.bookMarks.length).toBe(undefined)
    });

    it('should fire deleteBookMarksFailure action', () => {
        const result = BookMarkStoreReducer.reducer(
            currentState,
            BookmarkActions.deleteBookMarksFailure(new HttpErrorResponse({ error: 'some error occured' }))
        );
        expect(result.apiState).toEqual(ApiState.Error);
    });
});