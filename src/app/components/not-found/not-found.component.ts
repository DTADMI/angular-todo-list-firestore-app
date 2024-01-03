import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  private router: Router = inject(Router)

  goBackHome = () => {
    this.router.navigate(['todolist']);
  }
}
