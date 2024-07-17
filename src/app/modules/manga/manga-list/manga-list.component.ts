import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject } from 'rxjs';

import { MangaService } from '../manga.service';
import { Manga } from '../manga.model';
import { MangaFormComponent } from '../manga-form/manga-form.component';
import { AlertService } from '../../../shared/components/alert/alert.service';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MangaListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'currentChapter', 'latestChapter', 'status', 'actions'];
  dataSource!: MatTableDataSource<Manga>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public mangaService: MangaService,
    public alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.loadData({});
  }

  loadData(conditions?: any): void {
    this.alertService.loading()
    this.mangaService.readManga(conditions).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => this.alertService.error(err),
      complete: () => this.alertService.close()
    })
  }

  trackByFn(index: number, item: any): any {
    return item._id;
  }

  /* Action Buttons */
  onSync(): void {
    this.alertService.loading()
    this.mangaService.syncManga().subscribe({
      next: () => this.loadData({ status: 'new' }),
      error: (err) => this.alertService.error(err),
    })
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(MangaFormComponent, {
      width: '250px',
      data: { manga: {}, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(manga => {
      if (manga) {
        this.alertService.loading()
        this.mangaService.createManga(manga).subscribe({
          next: (res) => this.addTableData(res),
          error: (err) => this.alertService.error(err),
          complete: () => this.alertService.close()
        })
      }
    });
  }

  onEdit(manga: Manga): void {
    const dialogRef = this.dialog.open(MangaFormComponent, {
      width: '250px',
      data: { manga, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(updateValue => {
      if (updateValue) {
        this.mangaService.updateManga(manga._id, updateValue).subscribe({
          next: (res) => this.editTableData(res._id, updateValue),
          error: (err) => this.alertService.error(err),
          complete: () => this.alertService.close()
        })
      }
    });
  }

  onDelete(manga: Manga): void {
    const deleteFn = () => this.mangaService.deleteManga(manga._id).subscribe({
      next: (res) => this.deleteTableData(res._id),
      error: (err) => this.alertService.error(err),
      complete: () => this.alertService.close()
    })

    this.alertService.warning('Are you sure?', '', true, [
      { text: 'Yes', action: () => deleteFn() },
      { text: 'No', action: () => this.alertService.close() }
    ]);
  }

  onComplete(manga: Manga): void {
    const updateValue = { currentChapter: manga.latestChapter, status: 'read' };
    const completeFn = () => this.mangaService.updateManga(manga._id, updateValue).subscribe({
      next: () => this.editTableData(manga._id, updateValue),
      error: (err) => this.alertService.error(err),
      complete: () => this.alertService.close()
    })

    this.alertService.warning('Are you sure?', '', true, [
      { text: 'Yes', action: () => completeFn() },
      { text: 'No', action: () => this.alertService.close() }
    ]);
  }

  /* List Management */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  addTableData(manga: Manga): void {
    this.dataSource.data.push(manga);
    this.dataSource._updateChangeSubscription();
  }

  editTableData(id: string, updatedValue: any): void {
    const index = this.dataSource.data.findIndex(item => item._id === id);

    if (index > -1) {
      this.dataSource.data[index] = { ...this.dataSource.data[index], ...updatedValue };
      this.dataSource._updateChangeSubscription();
    }
  }

  deleteTableData(id: string): void {
    const index = this.dataSource.data.findIndex(item => item._id === id);

    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }


  _alert(v: string): void {
    if (v == 'loading') this.alertService.loading()
    if (v == 'success') this.alertService.success('Operation successful!')
    if (v == 'error') this.alertService.error('Can not add new data', 'Insert Data')
    if (v == 'warning') this.alertService.warning('Are you sure you want to delete this item?', 'Confirm Delete', true, [
      { text: 'Yes', action: () => console.log('Yes') },
      { text: 'No', action: () => console.log('No') }
    ]);
  }

}