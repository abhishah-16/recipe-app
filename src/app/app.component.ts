import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authservice: AuthService){}
  ngOnInit(): void {
    this.authservice.autoLogin()
  }
  loadedfeature = 'recipe'
  onNavigate(feature: string) {
    this.loadedfeature = feature;
  }
}