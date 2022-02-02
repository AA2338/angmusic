import { Component, OnInit } from '@angular/core';
import { Dataservice } from '../dataservice.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  data: any = [];
  artists: any = [];
  releases: any = [];

  showResults: string = 'initial';

  artistRows: number = 1;
  releaseRows: number = 1;

  searchTerm!: string;

  constructor(private dataService: Dataservice) {}

  ngOnInit(): void {
    this.dataService.getAllData().subscribe((loadedData) => {
      this.data = loadedData;
    });
  }

  filterResults() {
    this.showResults = 'loading';

    this.artists = [];
    this.releases = [];

    for (const artist of this.data.music) {
      if (
        artist.artist.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      ) {
        this.artists.unshift(artist);
      } else {
        if (artist.artist.toLowerCase().includes(this.searchTerm.toLowerCase()))
          this.artists.push(artist);
      }

      artist.releases.forEach((release: any) => {
        if (
          release.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())
        ) {
          this.releases.unshift({
            ...release,
            artist: artist.artist,
            artist_id: artist.artist_id,
          });
        } else {
          if (
            release.title.toLowerCase().includes(this.searchTerm.toLowerCase())
          ) {
            this.releases.push({
              ...release,
              artist: artist.artist,
              artist_id: artist.artist_id,
            });
          }
        }
      });
    }
    this.searchTerm = '';
    this.showResults = 'shown';
  }

  moreRows(what: string) {
    if (what === 'a') {
      this.artistRows++;
    } else {
      this.releaseRows++;
    }
  }
}
