import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamplesRoutingModule } from './samples-routing.module';
import { SampleListComponent } from './sample-list/sample-list.component';
import { DetailSampleComponent } from './detail-sample/detail-sample.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SampleListComponent,
    DetailSampleComponent
  ],
  imports: [
    CommonModule,
    SamplesRoutingModule,
    SharedModule
  ]
})
export class SamplesModule { }
