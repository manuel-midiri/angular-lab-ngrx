import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { Sample } from 'src/app/models/general.models';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() dataSource: any;
  @Input() displayedColumns: string[] = [];
  @Input() isAdmin: boolean = false;
  @Output() isDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() isEdit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, public dialog: MatDialog){}

  public viewDetails(element: Sample){
    this.router.navigate(['samples', element.id])
  }
  public editItem(element: Sample){
    this.openDialogEdit(element);
  }
  public deleteItem(element: Sample){
    this.openDialogDelete(element);
  }

  public openDialogDelete(element: Sample): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {name: element.name},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isDelete.emit(element.id);
      }
    });
  }

  public openDialogEdit(element: Sample): void {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      data: {name: element.name, description: element.description},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isEdit.emit({result, id: element.id});
      }
    });
  }

}
