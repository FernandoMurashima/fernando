import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService, Movie } from '../movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieSrv: MoviesService
  ) { }
  
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && idParam !== undefined) {
      const id = parseInt(idParam, 10);
      console.log('ID do filme (antes):', idParam);
      console.log('ID do filme (depois):', id);
      if (isNaN(id)) {
        console.error('ID do filme não é um número válido.');
        this.router.navigate(['/error']);
      } else {
        this.movieSrv.get(id).subscribe((movie: Movie) => {
          console.log('Detalhes do filme:', movie);
          this.movie = movie;
        });
      }
    } else {
      console.error('ID do filme não fornecido na URL.');
      this.router.navigate(['/error']);
    }
  }

  markAsFavorite(): void {
    if (this.movie) {
      // Lógica para enviar a solicitação ao backend para marcar ou desmarcar o filme como favorito
      this.movieSrv.markAsFavorite(this.movie.id, !this.movie.isFavorite).subscribe(response => {
        // Atualiza o estado do filme com base na resposta do servidor
        if (this.movie) {
          this.movie.isFavorite = !this.movie.isFavorite;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/movie-list']); // Navega de volta para a lista de filmes
  }
}
