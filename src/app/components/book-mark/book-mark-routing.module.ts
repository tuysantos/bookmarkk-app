import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookMarkComponent } from './book-mark.component';

const routes: Routes = [
  {
    path: '',
    component: BookMarkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookMarkRoutingModule { }
