import { Component, OnInit } from '@angular/core';
import { Movie, MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies: Array<Movie> | undefined;
  searchPattern: string = '';

  constructor(
    private moviesSrv: MoviesService,
  ) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    console.log('Carregando filmes com o padrão de pesquisa:', this.searchPattern);
    this.moviesSrv.load(this.searchPattern).subscribe((movies: Movie[]) => {
      console.log('Filmes carregados:', movies);
      this.movies = movies;
    });
  }

  clearSearch(): void {
    this.searchPattern = '';
    this.loadMovies();
  }

  onSearchChange(): void {
    this.loadMovies();
  }

  filterMovies(): void {
    if (this.searchPattern.trim() === '') {
      this.loadMovies(); // Se não houver padrão de pesquisa, recarrega todos os filmes
    } else {
      // Filtra os filmes localmente com base no padrão de pesquisa
      this.movies = this.movies?.filter(movie =>
        movie.title.toLowerCase().includes(this.searchPattern.toLowerCase())
      );
    }
  }
}
