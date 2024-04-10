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
  displayedColumns: string[] = ['title', 'currentChapter', 'latestChapter', 'status', 'actions'];
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
    this.alertService.loading()
    this.mangaService.getAllManga().subscribe({
      next: (mangas) => {
        this.dataSource = new MatTableDataSource(mangas);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => this.alertService.error(err),
      complete: () => this.alertService.close()
    })
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
        this.alertService.loading()
        this.mangaService.addManga(result).subscribe({
          next: (manga) => this.fetchMangas(),
          error: (err) => this.alertService.error(err),
          complete: () => this.alertService.close()
        })
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
        this.mangaService.updateManga(manga._id, result).subscribe({
          next: (manga) => this.fetchMangas(),
          error: (err) => this.alertService.error(err),
          complete: () => this.alertService.close()
        })
      }
    });
  }

  deleteManga(manga: Manga): void {
    const deleteFn = () => this.mangaService.deleteManga(manga._id).subscribe({
      next: (manga) => this.fetchMangas(),
      error: (err) => this.alertService.error(err),
      complete: () => this.alertService.close()
    })

    this.alertService.warning('Are you sure?', '', true, [
      { text: 'Yes', action: () => deleteFn() },
      { text: 'No', action: () => this.alertService.close() }
    ]);
  }

  onSync(): void {
    this.alertService.loading()
    this.mangaService.syncManga().subscribe({
      next: (res) => this.fetchMangas(),
      error: (err) => this.alertService.error(err),
    })
  }

  onComplete(manga: Manga): void {
    const completeFn = () => this.mangaService.updateManga(manga._id, { currentChapter: manga.latestChapter, status: 'read' }).subscribe({
      next: (manga) => this.fetchMangas(),
      error: (err) => this.alertService.error(err),
      complete: () => this.alertService.close()
    })

    this.alertService.warning('Are you sure?', '', true, [
      { text: 'Yes', action: () => completeFn() },
      { text: 'No', action: () => this.alertService.close() }
    ]);
  }

  alert(v: string): void {
    if (v == 'loading') this.alertService.loading()
    if (v == 'success') this.alertService.success('Operation successful!')
    if (v == 'error') this.alertService.error('Can not add new data', 'Insert Data')
    if (v == 'warning') this.alertService.warning('Are you sure you want to delete this item?', 'Confirm Delete', true, [
      { text: 'Yes', action: () => console.log('Yes') },
      { text: 'No', action: () => console.log('No') }
    ]);
  }

}