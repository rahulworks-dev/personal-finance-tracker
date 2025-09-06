import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeroCardComponent } from "../../../features/summary/components/hero-card/hero-card.component";
@Component({
  selector: 'app-header',
  imports: [MatIconModule, HeroCardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
