import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { DashboardService } from './dashboard.service';
import { UsersData } from '@/app/shared/components/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  dashboardStats: { title: string; description: string; value: number }[] = [
    {
      title: 'Total Employees',
      value: 0,
      description:
        'The total number of employees being tracked for compliance.',
    },
    {
      title: 'Trainings Completed',
      value: 0,
      description:
        'Employees who have successfully completed all required trainings.',
    },
    {
      title: 'Trainings In Progress',
      value: 0,
      description: 'Employees actively working on their required trainings.',
    },
    {
      title: 'Trainings Not Started',
      value: 0,
      description: 'Employees who have not started their required trainings.',
    },
  ];

  loading: boolean = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getAllActiveUsers().subscribe({
      next: (data: UsersData[]) => {
        data.forEach((item) => {
          const { node } = item;
          this.dashboardStats[0]['value'] = data.length;
          this.dashboardStats[1]['value'] +=
            node.assigned_learning_resourceCollection.edges.filter(
              (resource) =>
                resource.node.started_at && resource.node.completed_at
            ).length;
          this.dashboardStats[2]['value'] +=
            node.assigned_learning_resourceCollection.edges.filter(
              (resource) =>
                resource.node.started_at && !resource.node.completed_at
            ).length;
          this.dashboardStats[3]['value'] +=
            node.assigned_learning_resourceCollection.edges.filter(
              (resource) =>
                resource.node.started_at === null &&
                resource.node.completed_at === null
            ).length;
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users data', err);
        this.loading = false;
      },
    });
  }
}
