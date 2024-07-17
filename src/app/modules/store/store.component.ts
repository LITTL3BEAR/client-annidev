import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject } from 'rxjs';

import { StoreService } from './store.service';
import { Manga } from './store.model';
import { AlertService } from '../../shared/components/alert/alert.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  mangaList: BehaviorSubject<Manga[]> = new BehaviorSubject<Manga[]>([]);

  constructor(
    public dialog: MatDialog,
    public storeService: StoreService,
    public alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.loadData({});
  }

  loadData(conditions?: any): void {
    this.alertService.loading()
    this.storeService.readManga(conditions).subscribe({
      next: (res) => this.mangaList.next(res),
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
    this.storeService.syncManga().subscribe({
      next: () => this.loadData({ status: 'new' }),
      error: (err) => this.alertService.error(err),
    })
  }

  onAdd(): void {
    console.log('add');
  }

  onEdit(manga: Manga): void {
    console.log('edit');
  }

  onDelete(manga: Manga): void {
    console.log('delete');
  }

  onComplete(manga: Manga): void {
    console.log('complete');
  }

}
