import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { MangaRoutingModule } from './manga-routing.module';
import { MangaService } from './manga.service';
import { MangaComponent } from './manga.component';
import { MangaFormComponent } from './manga-form/manga-form.component';
import { MangaListComponent } from './manga-list/manga-list.component';

import { SharedModule } from '../../shared/shared.module';

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
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    ScrollingModule,
    MatProgressSpinnerModule
  ],
  providers: [MangaService],
})
export class MangaModule { }
