import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-panel',
  imports: [RouterModule],
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
