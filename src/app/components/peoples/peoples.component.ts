import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { People } from '../../People';
import { PeoplesService } from '../../peoples.service';



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

  constructor(private peoplesService : PeoplesService) { }

  ngOnInit(): void{
    this.titleForm = 'New People';
    this.form = new FormGroup({
      name: new FormControl(null),
      lastName: new FormControl(null),
      years: new FormControl(null),
      profession: new FormControl(null)
    });
  }

  SendForm() : void{
    const people : People = this.form.value;
    this.peoplesService.SavePeple(people).subscribe(result => {
      alert("Person saved succefully");
    })
  }
}
