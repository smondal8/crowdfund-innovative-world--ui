import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userLoggedIn : boolean;
  constructor(
  private router: Router
  ){ }

  ngOnInit(): void {
  }

  signOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
    this.userLoggedIn = false;
  }

}
