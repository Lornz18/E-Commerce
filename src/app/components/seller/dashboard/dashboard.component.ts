import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  imports: [DropdownModule, ChartModule, ButtonModule, TableModule, TagModule, CommonModule, SelectModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  selectedPeriod: string = '30d';
  
  chartPeriods = [
    { label: '7 days', value: '7d' },
    { label: '30 days', value: '30d' },
    { label: '90 days', value: '90d' },
    { label: '1 year', value: '1y' }
  ];

  salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  topProducts = [
    {
      name: 'Wireless Headphones',
      sales: 245,
      revenue: 12250,
      growth: 15.2,
      image: 'https://via.placeholder.com/48/4f46e5/ffffff?text=HP'
    },
    {
      name: 'Smartphone Case',
      sales: 189,
      revenue: 3780,
      growth: 8.7,
      image: 'https://via.placeholder.com/48/059669/ffffff?text=SC'
    },
    {
      name: 'Laptop Stand',
      sales: 156,
      revenue: 7800,
      growth: 22.1,
      image: 'https://via.placeholder.com/48/dc2626/ffffff?text=LS'
    },
    {
      name: 'USB Cable',
      sales: 134,
      revenue: 1340,
      growth: 5.3,
      image: 'https://via.placeholder.com/48/7c3aed/ffffff?text=UC'
    }
  ];

  recentOrders = [
    {
      id: '12345',
      customer: 'John Doe',
      date: new Date('2024-12-01'),
      amount: 299.99,
      status: 'Delivered'
    },
    {
      id: '12346',
      customer: 'Jane Smith',
      date: new Date('2024-12-02'),
      amount: 149.50,
      status: 'Shipped'
    },
    {
      id: '12347',
      customer: 'Bob Johnson',
      date: new Date('2024-12-03'),
      amount: 89.99,
      status: 'Processing'
    },
    {
      id: '12348',
      customer: 'Alice Brown',
      date: new Date('2024-12-04'),
      amount: 199.99,
      status: 'Pending'
    }
  ];

  notifications = [
    {
      message: 'New order received',
      time: '2 minutes ago',
      icon: 'pi pi-shopping-cart',
      iconColor: 'text-blue-500'
    },
    {
      message: 'Low stock alert: Wireless Headphones',
      time: '1 hour ago',
      icon: 'pi pi-exclamation-triangle',
      iconColor: 'text-orange-500'
    },
    {
      message: 'Payment received',
      time: '3 hours ago',
      icon: 'pi pi-check-circle',
      iconColor: 'text-green-500'
    }
  ];

  ngOnInit() {
    // Initialize component
  }

  getStatusSeverity(status: string): any {
    switch (status) {
      case 'Delivered': return 'success';
      case 'Shipped': return 'info';
      case 'Processing': return 'warning';
      case 'Pending': return 'danger';
      default: return 'secondary';
    }
  }

  viewAllOrders() {
    // Navigate to orders page
    console.log('View all orders');
  }

  viewOrder(orderId: string) {
    // Navigate to order details
    console.log('View order:', orderId);
  }

  addProduct() {
    // Navigate to add product page
    console.log('Add product');
  }

  manageInventory() {
    // Navigate to inventory management
    console.log('Manage inventory');
  }

  viewAnalytics() {
    // Navigate to analytics page
    console.log('View analytics');
  }

  customerSupport() {
    // Navigate to customer support
    console.log('Customer support');
  }
}
