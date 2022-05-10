import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('alert')
  }
  @Input () message: string
  @Output() closerrr = new EventEmitter<void>()

  onClose(){
    this.closerrr.emit()
  }
}
