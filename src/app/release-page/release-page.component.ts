import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dataservice } from '../dataservice.service';
import { SongService } from '../song-service.service';

@Component({
  selector: 'app-release-page',
  templateUrl: './release-page.component.html',
  styleUrls: ['./release-page.component.css'],
})
export class ReleasePageComponent implements OnInit {
  subscription!: Subscription;
  artistdata: any = {};
  artistId!: number;
  releaseId!: number;
  found: string = 'loading';

  constructor(
    private dataService: Dataservice,
    private songService: SongService
  ) {}

  ngOnInit() {
    // Artistin ID saadaan URL:n viimeisestä osasta
    const idFromURL = window.location.href.split('artist/').pop();
    const releaseIdFromURL = window.location.href.split('/').pop();

    if (releaseIdFromURL) {
      this.releaseId = parseInt(releaseIdFromURL);
    }

    if (idFromURL) {
      // Poistetaan URL:stä kopioidun merkkijonon tarpeeton loppu
      const removeTheLastPart = idFromURL.split('/').shift();

      if (removeTheLastPart) {
        // ID on merkkijonomuotoinen, joten tehdään siitä numero
        this.artistId = parseInt(removeTheLastPart);

        // Haetaan vain yhden artistin tiedot, eli tietokannan taulukosta artistin ID:n mukainen alkio
        this.dataService
          .getArtistData(this.artistId)
          .subscribe((loadedData) => {
            this.artistdata = loadedData;
            if (
              this.artistdata === null ||
              this.artistdata.releases[this.releaseId] === undefined
            ) {
              this.found = 'error';
            } else {
              this.found = 'found';
            }
          });
      }
    }
  }

  playSong(playlist: any[], index: number, artist: string, img: string) {
    this.songService.callSongFunction({ artist, img, playlist, index });
  }
}
