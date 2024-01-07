import { Component, inject } from '@angular/core';
import {ToastService} from "../../services/toast/toast.service";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  protected toastService: ToastService = inject(ToastService);

}
