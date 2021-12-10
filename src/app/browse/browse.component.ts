import { Component, OnInit } from '@angular/core';
import { Dataservice } from '../dataservice.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class BrowseComponent implements OnInit {
  browseBy: string = 'Newest';

  genresList: any = new Set();
  data: any = [];
  shownType: string = 'Newest';
  releaseList: any = [];
  shownReleases: any = [];
  rows: number = 1;
  ngForStatus: string = 'shown';

  constructor(private dataService: Dataservice, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getAllData().subscribe((loadedData) => {
      this.data = loadedData;
      this.data.genres.forEach((genre: string) => {
        this.genresList.add(genre);
      });
      this.data.music.forEach((e: any) => {
        for (const release of e.releases) {
          this.releaseList.push({
            artist: e.artist,
            artist_id: e.artist_id,
            release: release,
          });
        }
      });

      this.releaseList.sort((a: any, b: any) => {
        return b.release.year - a.release.year;
      });

      this.shownReleases = this.releaseList;
    });
  }

  // Funktio, jolla päivitetään taulukon sisältöä genrefilttereiden mukaisiksi.
  genreFilter(changeToWhat: string) {
    // Taulukko laitetaan pois näkyvistä prosessin ajaksi, jotta se päivittyisi.
    this.ngForStatus = 'loading';

    // Katsotaan onko painetun napin arvo sama kuin suodattimen nykyinen arvo
    // Jos ei ole, suodattimen nykyiseksi arvoksi laitetaan parametri, ja taulukko päivitetään.
    if (changeToWhat !== this.browseBy) {
      this.rows = 1;
      this.shownType = changeToWhat;
      this.browseBy = changeToWhat;

      // Filtteröidään taulukko näyttämään vain halutun genren julkaisut.
      const shownReleasesFiltered = this.releaseList.filter(function (
        itm: any
      ) {
        return itm.release.genre.includes(changeToWhat);
      });

      this.shownReleases = shownReleasesFiltered;
      this.ngForStatus = 'shown';

      // Jos on, genresuodatin poistetaan ja taulukko palautetaan alkuasemaansa.
    } else {
      if (this.shownType !== 'Newest') this.rows = 1;
      this.shownType = 'Newest';
      this.browseBy = 'Newest';
      this.shownReleases = this.releaseList;
      this.ngForStatus = 'shown';
    }
  }

  moreRows() {
    this.rows++;
  }

  linkToRelease(a: any) {
    this.router.navigate([
      `../artist/${a.artist_id}/release/${a.release.release_id}`,
    ]);
  }

  linkToArtist(id: number) {
    this.router.navigate([`../artist/${id}`]);
  }
}
