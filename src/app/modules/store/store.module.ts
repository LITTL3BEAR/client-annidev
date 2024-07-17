import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    StoreComponent,
    CustomerComponent,
    OrderComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    SharedModule
  ]
})
export class StoreModule { }
