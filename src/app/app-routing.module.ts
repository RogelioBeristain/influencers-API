import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfluencerComponent } from './pages/influencer/influencer.component';
import { InfluencersComponent } from './pages/influencers/influencers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {path:'influencers', component: InfluencersComponent},
  {path: 'influencer/:id', component: InfluencerComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'influencers'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
