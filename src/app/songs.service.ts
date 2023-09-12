import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

export interface Song {
  name: string;
  artist: string;
}

export const SERVICE_URL = 'https://65006a7818c34dee0cd4dee4.mockapi.io/api/v1/song';

export interface GetSongsFilters {
  artistName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(
    private readonly httpClient: HttpClient
    ) { 
  }

  getSongs(filters: GetSongsFilters = {}): Observable<Song[]> {
    return this.httpClient.get<Song[]>(SERVICE_URL)
      .pipe(map(songs => {
        return songs.filter(song => !filters.artistName || song.artist.includes(filters.artistName));
      }));
  }
}
