import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CaptureComponent } from './capture/capture.component';

const routes: Routes = [
    { path: 'capture',
      component: CaptureComponent},
    { path: '',
      component: HomeComponent
    }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
