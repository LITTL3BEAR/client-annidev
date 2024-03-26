import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MangaFormComponent } from '../manga-form/manga-form.component';
import { MangaService } from '../manga.service';
import { Manga } from '../manga.model';
import { AlertService } from '../../../shared/components/alert/alert.service';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss']
})
export class MangaListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'author', 'chapter', 'status', 'link', 'actions'];
  dataSource!: MatTableDataSource<Manga>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public mangaService: MangaService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.fetchMangas();
  }

  fetchMangas(): void {
    this.mangaService.getAllManga().subscribe((mangas: Manga[]) => {
      this.dataSource = new MatTableDataSource(mangas);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addManga(): void {
    const dialogRef = this.dialog.open(MangaFormComponent, {
      width: '250px',
      data: { manga: {}, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mangaService.addManga(result).subscribe((newManga) => {
          this.fetchMangas();
        });
      }
    });
  }

  viewManga(manga: Manga): void {
    this.dialog.open(MangaFormComponent, {
      width: '250px',
      data: { manga, isEdit: true }
    });
  }

  editManga(manga: Manga): void {
    const dialogRef = this.dialog.open(MangaFormComponent, {
      width: '250px',
      data: { manga, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mangaService.updateManga(manga._id, result).subscribe((updatedManga) => {
          this.fetchMangas();
        });
      }
    });
  }

  deleteManga(manga: Manga): void {
    this.mangaService.deleteManga(manga._id).subscribe((deletedManga) => {
      this.fetchMangas();
    });
  }

  syncManga(): void {
    this.mangaService.syncManga().subscribe((result: string) => {
      console.log('syncManga: ', result);
    })
  }

}