import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { localStorageKeys } from '../constants/constant';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  heroCardDetails$ = new BehaviorSubject<any>(null);
  constructor(private storageService: StorageService) {
    this.setHeroCardDetails();
  }

  setHeroCardDetails() {
    const transactionDetails = this.storageService.getItem(
      localStorageKeys.TRANSACTIONS
    );
    this.heroCardDetails$.next(transactionDetails);
  }

  formatHeroCardDetails(data: any[]) {
    if (!data) return [];
    return data.reduce(
      (acc: any, val: any) => {
        const formattedAmount = this.removeCommasFromNumber(val.amount);
        if (val.type === 'Income') {
          acc['totalIncome'] = acc['totalIncome'] + formattedAmount;
        } else {
          acc['totalExpense'] = acc['totalExpense'] + formattedAmount;
        }
        acc['balance'] = acc['totalIncome'] - acc['totalExpense'];
        return acc;
      },
      {
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
      }
    );
  }

  removeCommasFromNumber(amount: string) {
    if (!amount) return;
    return Number(amount.replaceAll(',', ''));
  }
}
