import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';
import { UtilService } from '../../../../core/services/util.service';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  DoughnutController,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from '../../../../shared/components/no-data/no-data.component';

// ✅ Register required parts for doughnut charts
ChartJS.register(
  DoughnutController,
  BarController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  BarElement,
  LineElement,
  PointElement
);

@Component({
  selector: 'app-insights-page',
  imports: [BaseChartDirective, CommonModule, NoDataComponent],
  templateUrl: './insights-page.component.html',
  styleUrl: './insights-page.component.scss',
})
export class InsightsPageComponent {
  pieChartLabels = ['Income', 'Expense', 'Balance'];
  pieChartData: ChartData<'doughnut'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
      },
    ],
  };
  pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
    },
  };
  incomeBarChartData: any = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Expenses',
        backgroundColor: [],
      },
    ],
  };
  expenseBarChartData: any = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Expenses',
        backgroundColor: [],
      },
    ],
  };
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };
  hasNoData = false;

  constructor(private utilService: UtilService) {}

  ngOnInit() {
    this.getFormattedHeroDetails();
  }

  getFormattedHeroDetails() {
    this.utilService.heroCardDetails$.subscribe({
      next: (resp) => {
        if (resp) {
          this.hasNoData = false;
          this.setPieChartData(resp);
          this.setBarChartData(resp, 'income', this.incomeBarChartData);
          this.setBarChartData(resp, 'expense', this.expenseBarChartData);
        } else {
          this.hasNoData = true;
        }
      },
    });
  }

  setPieChartData(resp: any) {
    const formatHeroCardDetails = this.utilService.formatHeroCardDetails(resp);
    this.pieChartData.datasets[0].data = Object.values(formatHeroCardDetails);
  }

  setBarChartData(resp: any, type: 'income' | 'expense', chartData: any) {
    const filteredData = resp
      .filter((item: any) => item.type.toLowerCase() === type)
      .reduce((acc: any, val: any) => {
        const formattedAmount = this.utilService.removeCommasFromNumber(
          val.amount
        );
        if (acc[val.category.name]) {
          acc[val.category.name].totalAmount += formattedAmount;
        } else {
          acc[val.category.name] = {
            totalAmount: formattedAmount,
            color: val.category.color,
          };
        }
        return acc;
      }, {});

    chartData.labels = Object.keys(filteredData);

    chartData.datasets[0].data = Object.values(filteredData).map(
      (item: any) => item.totalAmount
    );
    chartData.datasets[0].backgroundColor = Object.values(filteredData).map(
      (item: any) => item.color
    );
  }
}
