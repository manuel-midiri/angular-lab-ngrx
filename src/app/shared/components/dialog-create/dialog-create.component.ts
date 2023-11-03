import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SampleRequest } from 'src/app/models/general.models';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.scss']
})
export class DialogCreateComponent {

  public createSampleForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<any>, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: SampleRequest) {
    this.createSampleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    if (this.data) {
      this.createSampleForm.setValue({name: this.data.name, description: this.data.description})
    }
  }

  onClick(): void {
    if (this.createSampleForm.valid) {
      this.dialogRef.close(this.createSampleForm.value);
    } else {
      this.createSampleForm.markAllAsTouched();
    }
  }
}
