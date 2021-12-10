import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistPageComponent } from './artist-page/artist-page.component';
import { BrowseComponent } from './browse/browse.component';
import { ReleasePageComponent } from './release-page/release-page.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: BrowseComponent },
  { path: 'search', component: SearchComponent },
  { path: 'artist/:artist_id', component: ArtistPageComponent },
  {
    path: 'artist/:artist_id/release/:release_id',
    component: ReleasePageComponent,
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
