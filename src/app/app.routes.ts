import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'summary',
        pathMatch: 'full',
      },
      {
        path: 'summary',
        loadComponent: () =>
          import(
            './features/summary/pages/summary-page/summary-page.component'
          ).then((m) => m.SummaryPageComponent),
      },
      {
        path: 'manage-transaction',
        loadComponent: () =>
          import(
            './features/transactions/pages/add-transaction/add-transaction.component'
          ).then((m) => m.AddTransactionComponent),
      },
      {
        path: 'insights',
        loadComponent: () =>
          import(
            './features/insights/pages/insights-page/insights-page.component'
          ).then((m) => m.InsightsPageComponent),
      },
    ],
  },
];
