
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private usersub: Subscription

  isAuthenticated = false
  constructor(private datastorage: DataStorageService,
    private authservice: AuthService) { }

  useremail = ''
  usersub2 = this.authservice.user.subscribe(user => {
    this.useremail = user.email
  })
  ngOnInit() {
    this.usersub = this.authservice.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true
    })
  }
  onSaveData() {
    this.datastorage.storeRecipe()
  }

  onFetchData() {
    this.datastorage.fetchRecipes().subscribe(recipes => {
      console.log(recipes)
    })
  }
  onLogout() {
    this.authservice.logout()
  }
  ngOnDestroy(): void {
    this.usersub.unsubscribe()
    this.usersub2.unsubscribe()
  }
}
