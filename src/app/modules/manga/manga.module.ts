import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MangaRoutingModule } from './manga-routing.module';
import { MangaComponent } from './manga.component';
import { MangaFormComponent } from './manga-form/manga-form.component';
import { MangaListComponent } from './manga-list/manga-list.component';
import { MangaService } from './manga.service';

@NgModule({
  declarations: [
    MangaComponent,
    MangaFormComponent,
    MangaListComponent
  ],
  imports: [
    CommonModule,
    MangaRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [MangaService],
})
export class MangaModule { }
