import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spartan-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 border rounded-lg">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <ng-content />
      <div *ngIf="footer" class="mt-4 text-sm text-gray-600">
        {{ footer }}
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() title: string = 'Card Title';
  @Input() footer?: string; // Optional footer
}
