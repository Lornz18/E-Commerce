import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../interface/product';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpService } from '../../../services/http-service';
import { HttpClientModule } from '@angular/common/http';
import { System } from '../../../shared/system';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-product-item',
  imports: [
    HttpClientModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DividerModule,
    AvatarModule,
    DataViewModule,
    CommonModule,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  providers: [ProductService, HttpService],
})
export class ProductItemComponent implements OnInit, AfterViewInit {
  product: Product = {};
  products$!: Observable<any>;
  rate: number = 5;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('run');
    const id = this.route.snapshot.queryParamMap.get('id')!;
    console.log('Query Param ID:', id);
    this.product = this.productService.getProductById(id);
    this.products$ = this.productService.product$;
  }

  getAosDelay(index: number): string {
    return `${index * 150}`; // 300ms delay for each item
  }

  navigateToDetails(item: Product): void {
    this.router.navigate(['/product-item'], { queryParams: { id: item.id } });
  }

  ngAfterViewInit(): void {
    console.log({ product: this.product });
  }

  entry(){
    this.httpService.post('buildPayment', { productId: this.product.id, profileId: this.authService.profile.profileId, amount: this.product.price, type: 'credit' })
  }
}
