import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoComponent } from './components/photo/photo.component';
import { PhotoFormComponent} from './components/photo-form/photo-form.component'

const routes: Routes = [
  {path: '', redirectTo: '/photo', pathMatch: 'full'},
  {path: 'photo', component: PhotoComponent },
  {path: 'photo-form', component: PhotoFormComponent},
  {path: 'photo/:id', component: PhotoFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
