// src/app/app.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { routes } from './app-routes';
import { AppComponent } from './app.component';
import { AddassociateComponent } from './components/addassociate/addassociate.component';
import { AssociatelistingComponent } from './components/associatelisting/associatelisting.component';
import { MaterialModule } from './shared/material.module';

// import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AssociatelistingComponent,
    AddassociateComponent
    // declare more components here
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    ReactiveFormsModule
    // HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
