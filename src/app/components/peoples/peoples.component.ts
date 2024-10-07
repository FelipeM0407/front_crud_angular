import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-peoples',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './peoples.component.html',
  styleUrl: './peoples.component.css'
})
export class PeoplesComponent implements OnInit {
  form: any;
  titleForm: string = '';

  constructor() { }

  ngOnInit(): void{
    this.titleForm = 'New People';
    this.form = new FormGroup({
      name: new FormControl(null),
      lastName: new FormControl(null),
      yeas: new FormControl(null),
      profession: new FormControl(null)
    });
  }
}
