import { Component, OnInit, TemplateRef } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { People } from '../../People';
import { PeoplesService } from '../../peoples.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



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
  peoples: People[] = [];
  peopleName : string = '';
  peopleId? : number;

  visibilityTable: boolean = true;
  visibilityForm: boolean = false;

  modalRef?: BsModalRef;

  constructor(private peoplesService: PeoplesService,
    private modalService : BsModalService
  ) { }

  ngOnInit(): void {
    this.peoplesService.GetAll().subscribe(result => {
      this.peoples = result;
    })

    this.titleForm = 'New People';
    this.form = new FormGroup({
      name: new FormControl(null),
      lastName: new FormControl(null),
      years: new FormControl(null),
      profession: new FormControl(null)
    });
  }

  ShowFormRegister(): void {
    this.visibilityTable = false;
    this.visibilityForm = true;

    this.titleForm = 'New People';
    this.form = new FormGroup({
      name: new FormControl(null),
      lastName: new FormControl(null),
      years: new FormControl(null),
      profession: new FormControl(null)
    });
  }

  SendForm(): void {
    const people: People = this.form.value;

    if (people.peopleId !== undefined && people.peopleId > 0) {
      this.peoplesService.UpdatePeople(people).subscribe(x => {
        this.visibilityForm = false;
        this.visibilityTable = true;

        alert("Person updated succefully");

        this.peoplesService.GetAll().subscribe(res => {
          this.peoples = res;
        });
      });
      
    } else {

      this.peoplesService.SavePeople(people).subscribe(result => {
        this.visibilityForm = false;
        this.visibilityTable = true;

        alert("Person saved succefully");

        this.peoplesService.GetAll().subscribe(res => {
          this.peoples = res;
        });
      })
    }
  }

  Back(): void {
    this.visibilityTable = true;
    this.visibilityForm = false;
  }

  ShowUpdateForm(peopleId : number): void {
    this.visibilityTable = false;
    this.visibilityForm = true;

    this.peoplesService.GetById(peopleId).subscribe(result => {
      this.titleForm = `Atualizar ${result.name} ${result.lastName}`;

      this.form = new FormGroup({
        peopleId: new FormControl(result.peopleId),
        name: new FormControl(result.name),
        lastName: new FormControl(result.lastName),
        years: new FormControl(result.years),
        profession: new FormControl(result.profession)
      });
    });

  }

  ShowConfirmationExclude(peopleId : number, peopleName : string, contentModal : TemplateRef<any>) : void{
    this.modalRef = this.modalService.show(contentModal);
    this.peopleId = peopleId;
    this.peopleName = peopleName;
  };

  DeletePeople(peopleId : number){
    this.peoplesService.DeletePeople(peopleId).subscribe(result => {
      this.modalRef?.hide();
      alert("People deleted!");
      this.peoplesService.GetAll().subscribe(records => {
        this.peoples = records;
      });
    });
  }
}
