import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BookMarkRoutingModule } from './book-mark-routing.module';
import { BookMarkComponent } from './book-mark.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { BookMarkStoreReducer } from 'src/app/store/bookmark-store.reducer';
import { BookMarkEffects } from 'src/app/store/bookmark-store.effects';
import { EffectsModule } from '@ngrx/effects';
import { MessageModule } from '../message/message.module';


@NgModule({
  declarations: [BookMarkComponent],
  imports: [
    CommonModule,
    BookMarkRoutingModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MessageModule,
    StoreModule.forFeature(BookMarkStoreReducer.featureSelectorKey, BookMarkStoreReducer.reducer),
    EffectsModule.forFeature([BookMarkEffects]),
  ]
})
export class BookMarkModule { }
