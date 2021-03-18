import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiState } from 'src/app/model/api.satets';
import { BookMark, Group } from 'src/app/model/bookmark';
import { BookmarkActions } from 'src/app/store/bookmark-store.actions';
import { BookMarkStoreState } from 'src/app/store/bookmark-store.reducer';
import { BookMarkSelectors } from 'src/app/store/bookmark-store.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { MatDialog } from '@angular/material/dialog';

export interface IGroup {
  id: Group;
  name: string;
}

@Component({
  selector: 'app-book-mark',
  templateUrl: './book-mark.component.html',
  styleUrls: ['./book-mark.component.scss']
})
export class BookMarkComponent implements OnInit {

  public bookMarkForm: FormGroup;
  public error_messages: any;
  public isFormModeEdit = false;
  public bookMarkId = '';
  public savingEditMode = false;
  public submitted = false;
  public groupList: IGroup[] = [];
  public bookMark: BookMark;
  public apiState$ = this.store.pipe(select(BookMarkSelectors.apiState));
  public bookMark$ = this.store.select(BookMarkSelectors.currentBookMark);
  public bookMarks$ = this.store.select(BookMarkSelectors.bookMarks);
  public subscription: Subscription = new Subscription();
  public apiState: ApiState = ApiState.Init;
  public isFirstTime = true;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<BookMarkStoreState>,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.savingEditMode = false;
    this.submitted = false;
    this.loadGroups();
    if(this.activatedRoute.snapshot.params.id) {
      this.bookMarkId = this.activatedRoute.snapshot.params.id;
      this.isFormModeEdit = true;
      this.store.dispatch(BookmarkActions.getBookMark({payload: this.bookMarkId}));
    }

    this.subscription.add(this.bookMark$
        .pipe(filter(data => !! data))
        .subscribe((data: BookMark) => {
          if(data['bookMark']) {
            this.bookMark = data['bookMark'];
            this.editForm(this.bookMark);
          }

            
        }, (err: Error) => {
          this.openSnackBar(err.message, 'Error');
        }));

    this.subscription.add(this.apiState$
        .pipe(filter(apiState => !! apiState))
        .subscribe((apiState: ApiState) => {
            this.apiState = apiState;
            if(!this.isFirstTime) {
              if(this.submitted && this.apiState === ApiState.Done) {
                if(this.isFormModeEdit) {
                  console.log('update and exit')
                } else {
                  console.log('save and exit')
                }
                
              }
            }
            this.isFirstTime = false;
        }, err => this.openSnackBar(err.message, 'Error')));

    this.setupForm();
    this.error_messages = this.loadErrors();
  }

  setupForm(): void {
    this.bookMarkForm = this.formBuilder.group({
      bookMarkName: new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])),
      url: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern("^(http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?")
      ])),
      groupId: new FormControl('',Validators.compose([
        Validators.required,
      ])),
    })
  }

  loadErrors(): any {
    return {
      'bookMarkName':[
        { type:'required', message: 'name is required'}
      ],
      'url':[
        { type:'required', message: 'url is required'},
        //{ type:'pattern', message: 'invalid url'},
      ],
      'groupId': [
        { type:'required', message: 'group is required'}
      ],
    }
  }

  loadGroups(): void {
    this.groupList.push({id: Group.LEISURE, name: this.firstCapital(Group.LEISURE.toString())});
    this.groupList.push({id: Group.PERSONAL, name: this.firstCapital(Group.PERSONAL.toString())});
    this.groupList.push({id: Group.RESEARCH, name: this.firstCapital(Group.RESEARCH.toString())});
    this.groupList.push({id: Group.WORK, name: this.firstCapital(Group.WORK.toString())});
  }

  firstCapital(value: string): string {
    return `${value.substring(0,1)}${value.substring(1,value.length).toLocaleLowerCase()}`;
  }

  editForm(data: BookMark): void {
    this.bookMarkForm.get('bookMarkName').setValue(data.name);
    this.bookMarkForm.get('url').setValue(data.url);
    this.bookMarkForm.get('groupId').setValue(data.group);
    this.bookMarkId = data.id;
  }

  saveBookMark(): void {
    if(this.bookMarkForm.valid) {
      this.savingEditMode = this.bookMarkId !== '';
      this.bookMark = {
        id: this.bookMarkId,
        name: this.bookMarkForm.get('bookMarkName').value,
        url: this.bookMarkForm.get('url').value,
        group: this.bookMarkForm.get('groupId').value,
      }
      this.submitted = true;

      this.bookMarkId === '' ? 
          this.store.dispatch(BookmarkActions.addBookMark({payload: this.bookMark})) : 
          this.store.dispatch(BookmarkActions.updateBookMark({payload: this.bookMark}));
    }
  }

  deleteBookMark(): void {
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '400px',
      disableClose: true,
      data: this.bookMark
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result){
        this.goToList();
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  goToList(): void {
    this.router.navigateByUrl('bookmarklist');
  }
}
