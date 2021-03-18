import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bookmarklist',
    pathMatch: 'full'
  },
  {
    path: 'bookmarklist',
    loadChildren: () => import('./components/bookmark-list/bookmark-list.module').then(m => m.BookmarkListModule)
  },
  {
    path: 'bookmark',
    loadChildren: () => import('./components/book-mark/book-mark.module').then(m => m.BookMarkModule)
  },
  {
    path: 'bookmark/:id',
    loadChildren: () => import('./components/book-mark/book-mark.module').then(m => m.BookMarkModule)
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
