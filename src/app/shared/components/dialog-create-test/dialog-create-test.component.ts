import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestRequest } from 'src/app/models/general.models';

@Component({
  selector: 'app-dialog-create-test',
  templateUrl: './dialog-create-test.component.html',
  styleUrls: ['./dialog-create-test.component.scss']
})
export class DialogCreateTestComponent {
  public createTestForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<any>, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: TestRequest) {
    this.createTestForm = this.fb.group({
      name: ['', Validators.required]
    });
    if (this.data) {
      this.createTestForm.setValue({name: this.data.name})
    }
  }

  onClick(): void {
    if (this.createTestForm.valid) {
      this.dialogRef.close(this.createTestForm.value);
    } else {
      this.createTestForm.markAllAsTouched();
    }
  }
}
