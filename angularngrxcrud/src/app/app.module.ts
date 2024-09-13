// src/app/app.module.ts
import { CommonModule } from '@angular/common';
import { isDevMode, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { routes } from './app-routes';
import { AppComponent } from './app.component';
import { AddassociateComponent } from './components/addassociate/addassociate.component';
import { AssociatelistingComponent } from './components/associatelisting/associatelisting.component';
import { MaterialModule } from './shared/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { associateReducer } from './store/associate/associate.reducer';
import { AssociateEffects } from './store/associate/associate.effects';
import { HttpClientModule } from '@angular/common/http';
import { AppEffects } from './store/common/app.effect';

// import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AssociatelistingComponent,
    AddassociateComponent
    // declare more components here
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot({associate:associateReducer}),
    EffectsModule.forRoot([AssociateEffects,AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({maxAge:25,logOnly:!isDevMode()})
    // HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
