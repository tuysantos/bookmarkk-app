import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { BookMark, BookMarkDeleteResponse, BookMarkUpdateResponse, Group } from '../model/bookmark';
import { BookMarkEffects } from './bookmark-store.effects';
import { BookMarkService } from '../services/book-mark.service';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import { BookmarkActions } from './bookmark-store.actions';

describe('BookMarkEffects', () => {

    let action, bookMarkService;
    let actions: ReplaySubject<any>;
    const errorMode = new HttpErrorResponse({});

    class BookMarkServiceMock {
        public obj = bookMarksMock[0];
        getBookMarks(): Observable<ApolloQueryResult<BookMark[]>> {
            return dataReturned as unknown as any 
        }

        getBookMark(id: string): Observable<ApolloQueryResult<BookMark>> {
            return (id === 'Test') ? throwError(new HttpErrorResponse({ error: 'some error occured' })) : this.obj as unknown as any
        }

        addBookMark(bookMark: BookMark): Observable<FetchResult<BookMark>> {
            return (bookMark.id !== '') ? throwError(new HttpErrorResponse({ error: 'some error occured' })) : {} as unknown as any
        }

        uppdateBookMark(bookMark: BookMark): Observable<FetchResult<BookMarkUpdateResponse>> {
            return (bookMark.id === '') ? throwError(new HttpErrorResponse({ error: 'some error occured' })) : {} as unknown as any
        }

        deleteBookMark(id: string): Observable<FetchResult<BookMarkDeleteResponse>> {
            return (id === '') ? throwError(new HttpErrorResponse({ error: 'some error occured' })) : {} as unknown as any
        }
    }

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

    const bookMarksMock: BookMark[] = [
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

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BookMarkEffects,
                provideMockActions(() => actions),
                {
                    provide: BookMarkService, 
                    useFactory: () => new BookMarkServiceMock(),
                },
                HttpClientTestingModule,
            ],
        });
    });

    beforeEach(() => {
        bookMarkService = TestBed.inject(BookMarkService);
        actions = new ReplaySubject(1);
    });

    it('should be created', () => {
        const effects: BookMarkEffects = TestBed.inject(BookMarkEffects);
        expect(effects).toBeTruthy();
    });

    it('should dispatch getBookMarksSuccess', async() => {
        const effects: BookMarkEffects = TestBed.inject(BookMarkEffects);
        action = BookmarkActions.getBookMarks();
        actions.next(action);
        effects.getBookMarks$.subscribe(result => {
            expect(result.type).toEqual('[Bookmark API] Get Bookmarks Success');
        });
    });

    it('should dispatch getBookMarkSuccess', async() => {
        const effects: BookMarkEffects = TestBed.inject(BookMarkEffects);
        action = BookmarkActions.getBookMark({payload: '123'});
        actions.next(action);
        effects.getBookMark$.subscribe(result => {
            expect(result.type).toEqual('[Bookmark API] Get Bookmark Success');
        });
    });

    xit('should dispatch getBookMarkFailure', async() => {
        const effects: BookMarkEffects = TestBed.inject(BookMarkEffects);
        action = BookmarkActions.getBookMark({payload: 'Test'});
        actions.next(action);
        effects.getBookMarks$.subscribe(result => {
            expect(result.type).toEqual('[Bookmark API] Get Bookmark Failure');
        });
    });

    it('should dispatch addBookMarkSuccess', async() => {
        const obj: BookMark = {
            id: '',
            name: 'Bookmark 2',
            group: Group.WORK,
            url: 'http://xpto.co.uk'
        };
        const effects: BookMarkEffects = TestBed.inject(BookMarkEffects);
        action = BookmarkActions.addBookMark({payload: obj});
        actions.next(action);
        effects.addBookMark$.subscribe(result => {
            expect(result.type).toEqual('[Bookmark API] Add Bookmark Success');
        });
    });

    it('should dispatch addBookMarkFailure', async() => {
        const obj: BookMark = {
            id: '1',
            name: 'Bookmark 2',
            group: Group.WORK,
            url: 'http://xpto.co.uk'
        };

        const effects: BookMarkEffects = TestBed.inject(BookMarkEffects);
        action = BookmarkActions.addBookMark({payload: obj});
        actions.next(action);
        effects.addBookMark$.subscribe(result => {
            expect(result.type).toEqual('[Bookmark API] Delete Bookmark Failure');
        });
    });

    it('should dispatch updateBookMarkSuccess', async() => {
        const obj: BookMark = {
            id: '1111',
            name: 'Bookmark 2',
            group: Group.WORK,
            url: 'http://xpto.co.uk'
        };
        const effects: BookMarkEffects = TestBed.inject(BookMarkEffects);
        action = BookmarkActions.updateBookMark({payload: obj});
        actions.next(action);
        effects.updateBookMark$.subscribe(result => {
            expect(result.type).toEqual('[Bookmark API] Update Bookmark Success');
        });
    });

    it('should dispatch updateBookMarkFailure', async() => {
        const obj: BookMark = {
            id: '',
            name: 'Bookmark 2',
            group: Group.WORK,
            url: 'http://xpto.co.uk'
        };

        const effects: BookMarkEffects = TestBed.inject(BookMarkEffects);
        action = BookmarkActions.updateBookMark({payload: obj});
        actions.next(action);
        effects.updateBookMark$.subscribe(result => {
            expect(result.type).toEqual('[Bookmark API] Update Bookmark Failure');
        });
    });

    it('should dispatch deleteBookMarksSuccess', async() => {
        const effects: BookMarkEffects = TestBed.inject(BookMarkEffects);
        action = BookmarkActions.deleteBookMark({payload: '123'});
        actions.next(action);
        effects.deleteBookMark$.subscribe(result => {
            expect(result.type).toEqual('[Bookmark API] Delete Bookmark Success');
        });
    });

    it('should dispatch deleteBookMarksFailure', async() => {
        const effects: BookMarkEffects = TestBed.inject(BookMarkEffects);
        action = BookmarkActions.deleteBookMark({payload: ''});
        actions.next(action);
        effects.deleteBookMark$.subscribe(result => {
            expect(result.type).toEqual('[Bookmark API] Delete Bookmark Failure');
        });
    });
})
