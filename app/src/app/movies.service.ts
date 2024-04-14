import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Movie {
  id: number;
  title: string;
  year: number;
  cover: string;
  description: string;
  midia: string;
  isFavorite: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  load(searchPattern: string): Observable<Array<Movie>> {
    let url = `${environment.apiURL}/movies/`;
    if (searchPattern) {
      url += `?search=${searchPattern}`;
    }
    console.log('URL da solicitação:', url); // Adiciona um log para imprimir a URL da solicitação
    return this.http.get<Array<Movie>>(url).pipe(
      catchError(this.handleError)
    );
  }

  get(id: number): Observable<Movie> {
    const url = `${environment.apiURL}/movies/${id}/`;
    console.log('URL do filme:', url); // Adiciona um log para imprimir a URL do filme
    return this.http.get<Movie>(url).pipe(
      catchError(this.handleError)
    );
  }

  markAsFavorite(movieId: number, isFavorite: boolean): Observable<any> {
    const url = `${environment.apiURL}/favourite-movie/`;
    const payload = {
      id: movieId,
      state: isFavorite ? 'true' : 'false'
    };
    return this.http.post<any>(url, payload).pipe(
      catchError(this.handleError)
    );
  }

  addMovie(movie: Movie): Observable<any> {
    const url = `${environment.apiURL}/movies/`;
    return this.http.post<any>(url, movie).pipe(
      catchError(this.handleError)
    );
  }

  updateMovie(id: number, movie: Movie): Observable<any> {
    const url = `${environment.apiURL}/movies/${id}/`;
    return this.http.put<any>(url, movie).pipe(
      catchError(this.handleError)
    );
  }

  deleteMovie(id: number): Observable<any> {
    const url = `${environment.apiURL}/movies/${id}/`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro do lado do cliente:', error.error.message);
    } else {
      console.error(
        `Código do erro ${error.status}, ` +
        `corpo do erro: ${error.error}`
      );
    }
    return throwError('Ocorreu um erro. Por favor, tente novamente mais tarde.');
  }
}

