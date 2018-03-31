import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreRoutingModule } from './store-routing.module';
import { SellComponent } from './sell/sell.component';
import { StoreComponent } from './store.component';

const routes: Routes = [
	{
	path: '',
    component: StoreComponent,
    children: [
     {
        path: 'sell',
        component: SellComponent
      }
    ]
    
    }];


@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SellComponent],
  exports: [RouterModule]
})
export class StoreModule { }
