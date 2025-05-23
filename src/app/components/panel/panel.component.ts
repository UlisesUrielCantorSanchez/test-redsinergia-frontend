import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-panel',
  imports: [RouterLink],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {

  constructor(private router: Router) {}

  logout(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }


}
