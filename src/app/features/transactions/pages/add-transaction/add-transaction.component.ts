import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../../core/services/storage.service';
import { ToastService } from '../../../../core/services/toast.service';
import { UtilService } from '../../../../core/services/util.service';
import {
  localStorageKeys,
  TRANSACTION_CATEGORIES,
} from '../../../../core/constants/constant';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../../core/services/shared.service';

@Component({
  selector: 'app-add-transaction',
  imports: [
    MatIconModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss',
})
export class AddTransactionComponent {
  transactionForm!: FormGroup;
  activeTransactionType = 'IN';
  transactionCategories = TRANSACTION_CATEGORIES;
  mode = 'add';
  editableItem: any;
  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private toastService: ToastService,
    private router: Router,
    private utilService: UtilService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}
  ngOnInit() {
    const mode = this.route.snapshot.queryParams;
    this.mode = (mode['mode'] || 'add').toLowerCase();
    this.initializeForm();
  }
  initializeForm() {
    const today = new Date().toISOString().split('T')[0];
    this.transactionForm = this.fb.group({
      title: ['', Validators.required],
      category: [this.transactionCategories.IN[0]],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: [''],
      date: [today, Validators.required],
    });

    this.editableItem = this.sharedService.editableItem;
    if (this.editableItem && this.mode === 'edit') {
      this.activeTransactionType =
        this.editableItem.type === 'Expense' ? 'EX' : 'IN';

      const categoryObj = this.transactionCategories[
        this.activeTransactionType
      ].find((opt: any) => opt.name === this.editableItem.category.name);

      this.transactionForm.patchValue({
        ...this.editableItem,
        category: categoryObj,
      });
    }
  }

  compareCategory = (o1: any, o2: any): boolean => {
    return o1 && o2 ? o1.name === o2.name : o1 === o2;
  };

  onAmount(eve: any) {
    let rawValue = eve.target.value.replace(/,/g, '');
    let num = Number(rawValue);

    if (!isNaN(num)) {
      const formattedAmount = num.toLocaleString('en-IN');
      this.transactionForm.get('amount')?.setValue(formattedAmount, {
        emitEvent: false,
      });
    } else {
      this.transactionForm.get('amount')?.setValue('', {
        emitEvent: false,
      });
    }
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const payload = {
        ...this.transactionForm.value,
        type: this.activeTransactionType === 'IN' ? 'Income' : 'Expense',
      };
      if (this.mode === 'edit') {
        this.storageService.updateInArray(
          localStorageKeys.TRANSACTIONS,
          this.editableItem.id,
          payload
        );
      } else {
        this.storageService.addToArray(localStorageKeys.TRANSACTIONS, payload);
      }
      this.utilService.setHeroCardDetails();
      this.toastService.showSuccessToast(
        `Transaction ${
          this.mode === 'edit' ? 'Updated' : 'Added'
        } Successfully! `
      );
      this.router.navigateByUrl('/summary');
    }
  }
}
