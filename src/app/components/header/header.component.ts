import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

 @Input() headerLogo: string = '';
 @Input() headerIconBackground: string = '';
 @Input() headerTitle: string = '';
 @Input() isFirstPage: boolean = true;
}
