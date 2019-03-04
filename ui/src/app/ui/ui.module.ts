import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogPipe, WarnPipe, ErrorPipe } from './pipes/log.pipe';
import { TablatureLinePipe } from './pipes/tablature-line.pipe';

@NgModule({
  declarations: [LogPipe, WarnPipe, ErrorPipe, TablatureLinePipe],
  imports: [
    CommonModule
  ],
  exports:[LogPipe, WarnPipe, ErrorPipe, TablatureLinePipe]
})
export class UiModule { }
