import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusDirective } from './directives/status.directive';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    StatusDirective,
    FilterPipe,
  ],
  exports: [
    StatusDirective,
    FilterPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
