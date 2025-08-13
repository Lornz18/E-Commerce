import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
@Component({
  selector: 'app-footer',
  imports: [InputTextModule, CommonModule, FormsModule, ReactiveFormsModule, InputGroupAddonModule, InputGroupModule, IconField, InputIcon, ButtonModule, ImageModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone: true
})

export class FooterComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
