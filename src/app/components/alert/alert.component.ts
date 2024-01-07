import {Component, effect, inject, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert/alert.service";
import {Dismiss, InstanceOptions} from "flowbite";
import type {DismissOptions, DismissInterface} from "flowbite";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  protected alertService: AlertService = inject(AlertService);

  ngOnInit(): void {

  }



}
