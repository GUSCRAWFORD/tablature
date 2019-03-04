import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablatureViewComponent } from './tablature-view/tablature-view.component';

const routes: Routes = [
  {
    path:':name',
    component: TablatureViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablatureRoutingModule { }
