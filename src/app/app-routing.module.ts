import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/manga/manga.module').then(m => m.MangaModule) },
  { path: 'manga', loadChildren: () => import('./modules/manga/manga.module').then(m => m.MangaModule) },
  { path: 'store', loadChildren: () => import('./modules/store/store.module').then(m => m.StoreModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
