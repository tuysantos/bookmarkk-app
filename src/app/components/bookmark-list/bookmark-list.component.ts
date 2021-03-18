import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiState } from 'src/app/model/api.satets';
import { BookMark, Group } from 'src/app/model/bookmark';
import { BookmarkActions } from 'src/app/store/bookmark-store.actions';
import { BookMarkStoreState } from 'src/app/store/bookmark-store.reducer';
import { BookMarkSelectors } from 'src/app/store/bookmark-store.selector';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit {

  public apiState$ = this.store.pipe(select(BookMarkSelectors.apiState));
  public bookMarks$ = this.store.select(BookMarkSelectors.bookMarks);
  public bookMarkList: BookMark[] = [];
  public leisureList: BookMark[] = [];
  public personalList: BookMark[] = [];
  public researchList: BookMark[] = [];
  public workList: BookMark[] = [];
  public subscription: Subscription = new Subscription();
  public apiState: ApiState = ApiState.Init;
  
  constructor(
    private store: Store<BookMarkStoreState>,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    ) {  }

  ngOnInit(): void {

    this.subscription.add(this.apiState$
      .pipe(filter(apiState => !! apiState))
      .subscribe((apiState: ApiState) => {
          this.apiState = apiState;
      }));
      this.store.dispatch(BookmarkActions.getBookMarks());
      this.subscription.add(this.bookMarks$
        .pipe(filter(data => !! data))
        .subscribe((data: BookMark[]) => {
            this.resetLists();
            if(data['bookMarks']) {
              this.bookMarkList = data['bookMarks'];
              this.leisureList = this.bookMarkList.filter(item => item.group === Group.LEISURE);
              this.personalList = this.bookMarkList.filter(item => item.group === Group.PERSONAL);
              this.researchList = this.bookMarkList.filter(item => item.group === Group.RESEARCH);
              this.workList = this.bookMarkList.filter(item => item.group === Group.WORK);
              this.cdRef.detectChanges();
            }
            
        }, (err: Error) => {
          this.openSnackBar(err.message, 'Error');
        }));

    this.store.dispatch(BookmarkActions.getBookMarks());
  }

  resetLists(): void {
    this.leisureList = [];
    this.personalList = [];
    this.researchList = [];
    this.workList = [];
  }

  addNew(): void {
    this.router.navigate(['bookmark']);
  }

  editBookMark(id: string): void {
    this.router.navigate([`bookmark/${id}`]);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}


 