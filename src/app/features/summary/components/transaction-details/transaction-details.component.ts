import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from '../../../../core/services/storage.service';
import { localStorageKeys } from '../../../../core/constants/constant';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../../../core/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertComponent } from '../../../../shared/components/delete-alert/delete-alert.component';
import { UtilService } from '../../../../core/services/util.service';
import { ToastService } from '../../../../core/services/toast.service';
import { NoDataComponent } from '../../../../shared/components/no-data/no-data.component';
@Component({
  selector: 'app-transaction-details',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    NoDataComponent,
  ],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss',
})
export class TransactionDetailsComponent {
  selectedItem: any;
  transactions: any;
  constructor(
    private storageService: StorageService,
    private router: Router,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private utilService: UtilService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.utilService.heroCardDetails$.subscribe({
      next: (resp) => {
        this.transactions = resp;
      },
    });
  }

  onEdit(item: any) {
    console.log('Edit clicked:', item);
    this.sharedService.editableItem = item;
    this.router.navigateByUrl('/manage-transaction?mode=edit');
  }

  onDelete(item: any) {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: '350px',
      data: { itemName: item.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.storageService.deleteFromArray(
          localStorageKeys.TRANSACTIONS,
          item.id
        );
        this.utilService.setHeroCardDetails();
        this.toast.showSuccessToast('Deleted Successfully');
      }
    });
  }

  onMenuOpen(item: any) {
    this.selectedItem = item;
  }
}
