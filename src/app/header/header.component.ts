import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false
  private usersub: Subscription
  constructor(private datastorage: DataStorageService,
    private authservice: AuthService) { }

  ngOnInit() {
    this.usersub = this.authservice.user.subscribe(user => {
      this.isAuthenticated = !!user 
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
  }
}
