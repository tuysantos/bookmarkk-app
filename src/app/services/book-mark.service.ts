import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import {Observable, Subject} from 'rxjs';
import { filter } from 'rxjs/operators';
import { BookMark, BookMarkDeleteResponse, BookMarkUpdateResponse } from '../model/bookmark';
import { QUERY_GET_BOOKMARKS, QUERY_GET_BOOKMARK, QUERY_ADD_BOOKMARK, QUERY_UPDATE_BOOKMARK, QUERY_DELETE_BOOKMARK } from '../model/bookmark-queries';

@Injectable({
  providedIn: 'root'
})
export class BookMarkService {

  public query: Observable<ApolloQueryResult<boolean>>;
  constructor(private apollo: Apollo) { }

  getBookMarks(): Observable<ApolloQueryResult<BookMark[]>> {
    return this.apollo.watchQuery<BookMark[]>({query: QUERY_GET_BOOKMARKS}).valueChanges;
  }

  getBookMark(id: string): Observable<ApolloQueryResult<BookMark>> {
    return this.apollo.watchQuery<BookMark>({query: QUERY_GET_BOOKMARK, variables: {id}}).valueChanges;
  }

  addBookMark(bookMark: BookMark): Observable<FetchResult<BookMark>> {
    return this.apollo.mutate<BookMark>({mutation: QUERY_ADD_BOOKMARK, variables: {name: bookMark.name, url: bookMark.url, group: bookMark.group}});
  }

  uppdateBookMark(bookMark: BookMark): Observable<FetchResult<BookMarkUpdateResponse>> {
    return this.apollo.mutate<BookMarkUpdateResponse>({mutation: QUERY_UPDATE_BOOKMARK, variables: {id: bookMark.id, name: bookMark.name, url: bookMark.url, group: bookMark.group}});
  }

  deleteBookMark(id: string): Observable<FetchResult<BookMarkDeleteResponse>> {
     return this.apollo.mutate<BookMarkDeleteResponse>({mutation: QUERY_DELETE_BOOKMARK, variables: {id: id}});
  }
}
