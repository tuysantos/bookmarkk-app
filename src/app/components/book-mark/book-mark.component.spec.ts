import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ApiState } from 'src/app/model/api.satets';
import { BookMark, Group } from 'src/app/model/bookmark';
import { BookmarkActions } from 'src/app/store/bookmark-store.actions';
import { BookMarkStoreState } from 'src/app/store/bookmark-store.reducer';
import { BookMarkComponent } from './book-mark.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

describe('BookMarkComponent', () => {
  let component: BookMarkComponent;
  let fixture: ComponentFixture<BookMarkComponent>;
  let store: Store<BookMarkStoreState>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookMarkComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      providers: [
        {provide: ActivatedRoute,
        useValue: {snapshot: {params: {'id': '123'}}}}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMarkComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    snackBar = TestBed.inject(MatSnackBar);
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should dispatch BookmarkActions.getBookMark', () => {
    component.bookMarkId = '123';
    component.ngOnInit();
    const action = BookmarkActions.getBookMark({ payload: '123' });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should load groups', () => {
    component.groupList = [];
    component.loadGroups();
    expect(component.groupList.length).toEqual(4);
  });

  it('should put firstCapital', () => {
    let value = 'MYWORD';
    value = component.firstCapital(value);
    expect(value).toEqual('Myword');
  });

  it('should edit bookMark', () => {
    const bookMark: BookMark = {id: '111', name: 'Test', url: 'http://eeee.com', group: Group.PERSONAL}
    component.editForm(bookMark);
    expect(component.bookMarkId).toEqual(bookMark.id);
  });

  it('should dispatch save data', () => {
    const data: BookMark = {id: '', name: 'Test', url: 'http://eeee.com', group: Group.PERSONAL};
    const action = BookmarkActions.addBookMark({payload: data});
    component.bookMarkId = '';
    component.bookMarkForm.get('bookMarkName').setValue(data.name);
    component.bookMarkForm.get('url').setValue(data.url);
    component.bookMarkForm.get('groupId').setValue(data.group);
    component.saveBookMark();
    
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch update data', () => {
    const data: BookMark = {id: '111', name: 'Test', url: 'http://eeee.com', group: Group.PERSONAL};
    const action = BookmarkActions.updateBookMark({payload: data});
    component.bookMarkId = '111';
    component.bookMarkForm.get('bookMarkName').setValue(data.name);
    component.bookMarkForm.get('url').setValue(data.url);
    component.bookMarkForm.get('groupId').setValue(data.group);
    component.saveBookMark();
    
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });


  it('should have a done state', () => {
    component.apiState$ = of(ApiState.Done);
    component.ngOnInit();
    expect(component.apiState).toEqual(ApiState.Done);
  })
});
