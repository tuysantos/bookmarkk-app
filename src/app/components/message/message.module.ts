import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MessageRoutingModule } from './message-routing.module';
import {MatCardModule} from '@angular/material/card';
import { MessageComponent } from './message.component';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { BookMarkStoreReducer } from 'src/app/store/bookmark-store.reducer';
import { BookMarkEffects } from 'src/app/store/bookmark-store.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MessageRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forFeature(BookMarkStoreReducer.featureSelectorKey, BookMarkStoreReducer.reducer),
    EffectsModule.forFeature([BookMarkEffects]),
  ],
  declarations: [MessageComponent],
})
export class MessageModule {}
