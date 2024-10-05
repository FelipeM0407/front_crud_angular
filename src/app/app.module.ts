import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PeoplesService } from './peoples.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [PeoplesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
