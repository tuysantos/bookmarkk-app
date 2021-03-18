import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { BookMarkStoreState } from 'src/app/store/bookmark-store.reducer';

import { BookmarkListComponent } from './bookmark-list.component';

describe('BookmarkListComponent', () => {
  let component: BookmarkListComponent;
  let fixture: ComponentFixture<BookmarkListComponent>;
  let store: Store<BookMarkStoreState>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkListComponent ],
      imports: [
        HttpClientTestingModule,
        MatListModule,
        MatButtonModule,
        MatSnackBarModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkListComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    snackBar = TestBed.inject(MatSnackBar);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset list', () => {
    component.resetLists();
    expect(component.leisureList.length).toEqual(0);
    expect(component.personalList.length).toEqual(0);
  })
});
