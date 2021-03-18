import { HttpErrorResponse } from '@angular/common/http';
import { ApiState } from '../model/api.satets';
import { BookMark, Group } from '../model/bookmark';
import { BookMarkStoreState } from './bookmark-store.reducer';
import { BookMarkSelectors } from './bookmark-store.selector';


describe('BookMarkSelectors', () => {

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

    const initialDataState: BookMarkStoreState = {
        bookMarks: [],
        currentBookMarket: null,
        apiState: ApiState.Init,
        error: null
    };

    const loadedDataState: BookMarkStoreState = {
        bookMarks,
        currentBookMarket: null,
        apiState: ApiState.Done,
        error: null
    };

    const initialErrorDataState: BookMarkStoreState = {
        bookMarks: [],
        apiState: ApiState.Init,
        currentBookMarket: null,
        error: undefined,
    };

    const errorDataState: BookMarkStoreState = {
        bookMarks: [],
        apiState: ApiState.Error,
        currentBookMarket: null,
        error: new HttpErrorResponse({
            headers: null,
            status: 400,
            statusText: 'error',
            url: '',
            error: {
                Errors: [
                    {
                        Code: 'Error occurred',
                        PropertyName: 'my property',
                        PropertyValues: null,
                        Message: 'error in this country',
                    },
                ],
            },
        }),
    };

    it('should returns initial state', () => {
        const bookMarks = BookMarkSelectors.bookMarks.projector(initialDataState);
        expect(bookMarks).toBe(initialDataState.bookMarks);
    });

    it('should returns loaded state', () => {
        const bookMarks = BookMarkSelectors.bookMarks.projector(loadedDataState);
        expect(bookMarks).toBe(loadedDataState.bookMarks);
    });

    it('should returns error state', () => {
        const error = BookMarkSelectors.error.projector(initialDataState);
        expect(error).toBe(initialDataState.error);
    });

    it('should returns empty bookMarks', () => {
        const bookMarks = BookMarkSelectors.bookMarks.projector(initialErrorDataState);
        expect(bookMarks).toEqual([]);
    });

    it('should returns undefined', () => {
        const error = BookMarkSelectors.error.projector(initialErrorDataState);
        expect(error).toBe(undefined);
    });

    it('should returns error state', () => {
        const error = BookMarkSelectors.error.projector(errorDataState);
        expect(error.statusText).toBe('error');
    });

    it('should returns apiState', () => {
        const apiState = BookMarkSelectors.apiState.projector(initialDataState);
        expect(apiState).toBe(initialDataState.apiState);
    });
});