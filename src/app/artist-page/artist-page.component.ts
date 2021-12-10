import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dataservice } from '../dataservice.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'],
})
export class ArtistPageComponent implements OnInit {
  subscription!: Subscription;
  artistdata: any = {};
  idNumber!: number;
  albumRows: number = 1;
  singleRows: number = 1;
  albums: any[] = [];
  singles: any[] = [];

  found: string = 'loading';

  constructor(private dataService: Dataservice, private router: Router) {}

  ngOnInit() {
    // Artistin ID saadaan URL:n viimeisestä osasta
    const idFromURL = window.location.href.split('/').pop();

    if (idFromURL) {
      // ID on merkkijonomuotoinen, joten tehdään siitä numero
      this.idNumber = parseInt(idFromURL);

      // Haetaan vain yhden artistin tiedot, eli tietokannan taulukosta artistin ID:n (- 1) mukainen alkio
      this.dataService.getArtistData(this.idNumber).subscribe((loadedData) => {
        this.artistdata = loadedData;

        if (this.artistdata === null) {
          this.found = 'error';
        } else {
          this.artistdata.releases.sort((a: any, b: any) => {
            return a.year - b.year;
          });

          this.artistdata.releases.forEach((release: { type: string }) => {
            if (release.type === 'Album') {
              this.albums.unshift(release);
            } else {
              this.singles.unshift(release);
            }
          });

          this.found = 'found';
        }
      });
    }
  }

  linkClick(a: number) {
    console.log(a);
    this.router.navigate([`/artist/${this.idNumber}/release/${a}`]);
  }

  moreRows(which: string) {
    if (which === 'a') this.albumRows++;
    if (which === 's') this.singleRows++;
  }
}
