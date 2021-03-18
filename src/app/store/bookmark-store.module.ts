import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookMarkStoreReducer } from './bookmark-store.reducer';
import { BookMarkEffects } from './bookmark-store.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(BookMarkStoreReducer.featureSelectorKey, BookMarkStoreReducer.reducer),
        EffectsModule.forFeature([BookMarkEffects]),
    ],
})

export class BookMarkStoreModule {}