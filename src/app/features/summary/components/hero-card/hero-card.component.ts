import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UtilService } from '../../../../core/services/util.service';
import { AmountPipe } from '../../../../core/pipes/amount.pipe';
import { heroDetails } from '../../../../core/model/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-card',
  imports: [MatIconModule, AmountPipe, CommonModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  formattedDetails: heroDetails = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  };
  constructor(private utilService: UtilService) {}
  ngOnInit() {
    this.getFormattedHeroDetails();
  }

  getFormattedHeroDetails() {
    this.utilService.heroCardDetails$.subscribe({
      next: (resp) => {
        if (resp) {
          this.formattedDetails = this.utilService.formatHeroCardDetails(resp);
        }
      },
    });
  }
}
