import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [MaterialModule],
  exports: [MaterialModule, CommonModule],
})
export class SharedModule {}