import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BookMark } from 'src/app/model/bookmark';
import { BookmarkActions } from 'src/app/store/bookmark-store.actions';
import { BookMarkStoreState } from 'src/app/store/bookmark-store.reducer';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public bookMarkeName = '';
  public id = '';

  constructor(
    //private dbService: DbService,
    private store: Store<BookMarkStoreState>,
    public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookMark) { }

  ngOnInit(): void {
    this.bookMarkeName = this.data.name;
    this.id = this.data.id;
  }

  deleteData(): void {
    this.store.dispatch(BookmarkActions.deleteBookMark({payload: this.id}))
    this.closeForm(true);
  }

  closeForm(result: boolean): void {
    this.dialogRef.close(result);
  }

}
