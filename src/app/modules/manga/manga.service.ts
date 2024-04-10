import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Manga } from './manga.model';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private mangaUrl = `${environment.apiUrl}/manga`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllManga(): Observable<Manga[]> {
    return this.http.get<Manga[]>(this.mangaUrl)
      .pipe(catchError(this.handleError));
  }

  getManga(id: string): Observable<Manga> {
    return this.http.get<Manga>(`${this.mangaUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addManga(manga: Manga): Observable<Manga> {
    return this.http.post<Manga>(this.mangaUrl, manga, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateManga(id: string, update: any): Observable<any> {
    return this.http.put(`${this.mangaUrl}/${id}`, update, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteManga(id: string): Observable<Manga> {
    return this.http.delete<Manga>(`${this.mangaUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  syncManga(): Observable<string> {
    return this.http.get<string>(`${this.mangaUrl}/sync`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 0) {
      errorMessage = `Connection error, Please try again later.`;
    } else if (error instanceof HttpErrorResponse) {
      errorMessage = `Error Code: ${error.status}, Message: ${error.error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
