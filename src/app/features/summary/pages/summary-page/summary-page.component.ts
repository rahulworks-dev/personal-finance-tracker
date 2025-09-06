import { Component } from '@angular/core';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { TransactionDetailsComponent } from '../../components/transaction-details/transaction-details.component';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-summary-page',
  imports: [TransactionDetailsComponent],
  templateUrl: './summary-page.component.html',
  styleUrl: './summary-page.component.scss',
})
export class SummaryPageComponent {}
