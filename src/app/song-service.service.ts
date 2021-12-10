import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SongService {
  private eventSubject = new BehaviorSubject<any>(undefined);
  private searchTerm = '';

  callSongFunction(playlistObject: object) {
    this.eventSubject.next(playlistObject);
  }

  getEventSubject(): BehaviorSubject<any> {
    return this.eventSubject;
  }

  setSearchTerm(newSearchTerm: string) {
    this.searchTerm = newSearchTerm;
  }

  getSearchTerm() {
    return this.searchTerm;
  }
}
