import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SERVICE_URL, Song, SongsService } from './songs.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('SongsService', () => {
  let service: SongsService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(SongsService);
  });

  function mockReturnedSongs(...songs: Song[]) {
    const req = httpTestingController.expectOne(SERVICE_URL);
    req.flush(songs);
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return songs', () => {
    service.getSongs()
      .subscribe((songs: Song[]) => {
        expect(songs).not.toBeFalsy();
        console.log("i got " + songs!.length + " songs")
        expect(Array.isArray(songs)).toBe(true);
        expect(songs!.length).toBeGreaterThan(0);
      });

    mockReturnedSongs(
      {
        artist: "2 be 3",
        name: "2 be 3"
      },
      {
        artist: "Britney Spears",
        name: "Toxic"
      });
  });

  it('should return songs with artist and name properly filled', () => {
    service.getSongs()
      .subscribe((songs: Song[]) => {
        for (const song of songs!) {
          assertSongIsProperlyFIlled(song);
        }
      });

    mockReturnedSongs({
      artist: "2 be 3",
      name: "2 be 3"
    },
      {
        artist: "Britney Spears",
        name: "Toxic"
      });
  });


  it('should return empty list if Web API has no songs', () => {
    service.getSongs()
      .subscribe((songs: Song[]) => {
        expect(songs.length).toBe(0);
      });

    mockReturnedSongs();
  });


  it('should return songs with artist name containing given filter', () => {
    service.getSongs({ artistName: "Britney" })
      .subscribe((songs: Song[]) => {
        expect(songs.length).toBe(1);
        expect(songs[0].name).toBe("Toxic");
      });

    mockReturnedSongs({
      artist: "2 be 3",
      name: "2 be 3"
    },
      {
        artist: "Britney Spears",
        name: "Toxic"
      },
      {
        artist: "Mickael Jackson",
        name: "Bad"
      });
  });

  it('should return songs with artist name containing given filter', () => {
    service.getSongs({ artistName: "Jackson" })
      .subscribe((songs: Song[]) => {
        expect(songs.length).toBe(1);
        expect(songs[0].name).toBe("Bad");
      });

    mockReturnedSongs({
      artist: "2 be 3",
      name: "2 be 3"
    },
      {
        artist: "Britney Spears",
        name: "Toxic"
      },
      {
        artist: "Mickael Jackson",
        name: "Bad"
      });
  });

});

function assertSongIsProperlyFIlled(song: Song) {
  expect(typeof song == 'object').toBe(true);
  expect(song.artist).not.toBeFalsy();
  expect(song.name).not.toBeFalsy();
}

