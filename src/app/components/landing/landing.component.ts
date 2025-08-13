import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../interface/product';
import { Observable } from 'rxjs';
import { AOSService } from '../../../services/aos-service';
import { ProductCategory } from '../../../interface/categories';
import { Router } from '@angular/router';
import { System } from '../../../shared/system';
@Component({
  selector: 'app-landing',
  imports: [
    ImageModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    MenuModule,
    DataViewModule,
    DataView,
    CommonModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  providers: [ProductService],
})
export class LandingComponent {
  products$!: Observable<any>;

  constructor(
    private productService: ProductService,
    private aosService: AOSService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.product$;
  }

  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warn';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return undefined;
    }
  }

  menuItems = [
    {
      label: 'Clothing',
      value: ProductCategory.CLOTHING,
      command: () =>
        this.selectOptions({ option: { value: ProductCategory.CLOTHING } }),
    },
    {
      label: 'Footwear',
      value: ProductCategory.FOOTWEAR,
      command: () =>
        this.selectOptions({ option: { value: ProductCategory.FOOTWEAR } }),
    },
    {
      label: 'Accessories',
      value: ProductCategory.ACCESSORIES,
      command: () =>
        this.selectOptions({ option: { value: ProductCategory.ACCESSORIES } }),
    },
    {
      label: 'Electronics',
      value: ProductCategory.ELECTRONICS,
      command: () =>
        this.selectOptions({ option: { value: ProductCategory.ELECTRONICS } }),
    },
    {
      label: 'Home Appliances',
      value: ProductCategory.HOME_APPLIANCES,
      command: () =>
        this.selectOptions({
          option: { value: ProductCategory.HOME_APPLIANCES },
        }),
    },
    {
      label: 'Beauty',
      value: ProductCategory.BEAUTY,
      command: () =>
        this.selectOptions({ option: { value: ProductCategory.BEAUTY } }),
    },
    {
      label: 'Sports',
      value: ProductCategory.SPORTS,
      command: () =>
        this.selectOptions({ option: { value: ProductCategory.SPORTS } }),
    },
    {
      label: 'Toys',
      value: ProductCategory.TOYS,
      command: () =>
        this.selectOptions({ option: { value: ProductCategory.TOYS } }),
    },
  ];

  stateOptions: any[] = [
    { label: 'All Products', value: 'all' },
    { label: 'Accessories', value: 'Accessories' },
    { label: 'Body', value: 'body' },
  ];

  value: string = 'all';

  selectOptions(event: any) {
    const value = event.option.value;
    console.log('Select', value);
    this.products$ = this.productService.getProductsByCategory(value);
    this.aosService.refresh();
  }

  getAosDelay(index: number): string {
    return `${index * 150}`; // 300ms delay for each item
  }

  navigateToDetails(item: Product): void {
    console.log('Navigating to product details for item:', item);
    if(item.inventoryStatus === 'OUTOFSTOCK') {
      alert('This product is currently out of stock.');
      return;
    }else{
      this.router.navigate(['/product-item'], { queryParams: { id: item.id } });
    }
  }
}
