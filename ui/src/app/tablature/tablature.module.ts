import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablatureRoutingModule } from './tablature-routing.module';
import { TablatureComponent } from './tablature/tablature.component';
import { TablatureViewComponent } from './tablature-view/tablature-view.component';
import { UiModule } from '../ui/ui.module';
import { StringsComponent } from './tablature/strings/strings.component';
import { StringComponent } from './tablature/strings/string/string.component';

@NgModule({
  declarations: [TablatureComponent, TablatureViewComponent, StringsComponent, StringComponent],
  imports: [
    CommonModule,
    TablatureRoutingModule,
    UiModule
  ]
})
export class TablatureModule { }
