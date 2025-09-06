import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-alert',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './delete-alert.component.html',
  styleUrl: './delete-alert.component.scss',
})
export class DeleteAlertComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { itemName: string },
    private dialogRef: MatDialogRef<DeleteAlertComponent>
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
