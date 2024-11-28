import { Component } from '@angular/core';
import { SmallCardComponent } from "../small-card/small-card.component";

@Component({
  selector: 'app-main-content',
  imports: [SmallCardComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {

}
