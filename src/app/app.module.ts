import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { SiteInitComponent } from './site-init/site-init/site-init.component';
import { CatalogLoadComponent } from './catalog-load/catalog-load/catalog-load.component';

import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', component: SiteInitComponent },
    { path: 'siteInit', component: SiteInitComponent },
    { path: 'catalogLoad', component: CatalogLoadComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogLoadComponent,
    SiteInitComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( appRoutes ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
