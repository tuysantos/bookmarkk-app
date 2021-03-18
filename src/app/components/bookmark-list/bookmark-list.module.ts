import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkListRoutingModule } from './bookmark-list-routing.module';
import { BookmarkListComponent } from './bookmark-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookMarkStoreReducer } from 'src/app/store/bookmark-store.reducer';
import { BookMarkEffects } from 'src/app/store/bookmark-store.effects';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [BookmarkListComponent],
  imports: [
    CommonModule,
    BookmarkListRoutingModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    StoreModule.forFeature(BookMarkStoreReducer.featureSelectorKey, BookMarkStoreReducer.reducer),
    EffectsModule.forFeature([BookMarkEffects]),
  ]
})
export class BookmarkListModule { }
