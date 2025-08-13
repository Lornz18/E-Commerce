import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { AOSService } from '../services/aos-service';
import { System } from '../shared/system';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AOSService, System]
})
export class AppComponent implements OnInit {
  title = 'raffle-eco-css';
  isSignUpPage = false;
  constructor(private aosService: AOSService, private router: Router){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isSignUpPage = this.router.url === '/sign-up' || this.router.url === '/sign-in';
      });
  }
  ngOnInit() {
    this.aosService.initialize();
  }
  /* ngAfterViewInit(): void {
    AOS.refresh();
  } */
}
