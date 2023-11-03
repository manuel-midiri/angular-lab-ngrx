import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Sample, Test, TestRequest, User } from 'src/app/models/general.models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DialogCreateTestComponent } from 'src/app/shared/components/dialog-create-test/dialog-create-test.component';
import { SampleService } from 'src/app/modules/samples/services/sample.service';
import { TestService } from 'src/app/modules/samples/services/test.service';

@Component({
  selector: 'app-detail-sample',
  templateUrl: './detail-sample.component.html',
  styleUrls: ['./detail-sample.component.scss']
})
export class DetailSampleComponent implements OnInit {

  private sampleId: string = '';
  public sampleDetail: Sample = {} as Sample;
  public testList: Test[] = [];
  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public isAdmin: boolean = false;

  constructor(
    private authServices: AuthService,
    private sampleService: SampleService,
    private testService: TestService,
    private activatedRouter: ActivatedRoute, 
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.checkTypeUser();
    this.getSampleDetail();
  }

  private checkTypeUser(): void {
    const user: User = JSON.parse(this.authServices.getUser());
    this.isAdmin = user.roles?.includes('Admin') ? true : false;
  }

  public getSampleDetail(): void {
    this.activatedRouter.params.pipe(
      tap((param: Params) => this.sampleId = param['id']),
      switchMap(param => this.sampleService.getSampleById(param['id']))
    ).subscribe((sampleDetail: Sample) => {
      this.sampleDetail = sampleDetail;
      this.testList = sampleDetail.tests;
    });
  }

  public addTest(): void {
    const dialogRef = this.dialog.open(DialogCreateTestComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe((test: any) => {
      const requestCreate: TestRequest = {
        sampleId: this.sampleId,
        ...test
      }
      if (test) {
        this.testService.createTest(requestCreate).pipe(
          switchMap(() => this.sampleService.getSampleById(this.sampleId))
        ).subscribe((sampleDetail: Sample) => {
          this.sampleDetail = sampleDetail
          this.testList = sampleDetail.tests;
        });
      }
    });
  }

  public deleteTest(event: any): void {
    this.testService.deleteTest(event).pipe(
      switchMap(() => this.sampleService.getSampleById(this.sampleId))
    ).subscribe((sampleDetail: Sample) => {
      this.sampleDetail = sampleDetail
      this.testList = sampleDetail.tests;
    });
  }

  public editTest(event: any): void {
    const requestEdit: TestRequest = {
      sampleId: this.sampleId,
      ...event.result
    }
    this.testService.updateTest(event.id, requestEdit).pipe(
      switchMap(() => this.sampleService.getSampleById(this.sampleId))
    ).subscribe((sampleDetail: Sample) => {
      this.sampleDetail = sampleDetail
      this.testList = sampleDetail.tests;
    });
  }

}
