import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { Group } from 'src/app/model/bookmark';
import { BookmarkActions } from 'src/app/store/bookmark-store.actions';
import { BookMarkStoreState } from 'src/app/store/bookmark-store.reducer';


import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let store: Store<BookMarkStoreState>;

  const promise = {
    then: () => {}
  }
  class DbServiceMock {
    deleteAlbum(id: number): any {
      return promise;
    }
  }

  class MatDialogRefMock {
    close(): void {}
  };

  const data = {
    id: '11',
    name: "My Test",
    url: 'http://this.pt',
    group: Group.PERSONAL,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      providers: [
        {provide: MatDialogRef, useClass: MatDialogRefMock},
        {provide: MAT_DIALOG_DATA, useValue: data}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch delete event', () => {
    const action = BookmarkActions.deleteBookMark({payload: '11'});
    component.deleteData();
    
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should have an id', () => {
    component.ngOnInit();
    expect(component.id).toEqual('11');
  });

});
