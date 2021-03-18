import { Component, OnInit } from '@angular/core';
import { BookMark } from 'src/app/model/bookmark';
import {MatDialog} from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  deleteBookMark(bookMark: BookMark): void {
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '400px',
      disableClose: true,
      data: bookMark
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

  openDialog(): void {
    
  }
}
