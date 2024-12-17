import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-small-card',
  imports: [],
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.css',
})
export class SmallCardComponent {

  @Input() cardTitle: string = '';
  @Input() showIcon: boolean = false;
  @Input() iconType: 'correct' | 'incorrect' | null = null;
  @Input() isSelected: boolean = false;
  @Output() clicked = new EventEmitter();

  getIconBackgroundColor(title: string): string {
    switch (title) {
      case 'HTML':
        return '#FFF1E9';
      case 'CSS':
        return '#E0FDEF';
      case 'JavaScript':
        return '#EBF0FF';
      case 'Accessibility':
        return '#F6E7FF';
      default:
        return 'transparent';
    }
  }

  onCardClick(): void {
    this.clicked.emit(this.cardTitle);
  }
}
