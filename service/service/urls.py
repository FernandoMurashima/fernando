from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views as auth_views
from django.contrib import admin

from streaming import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'movies', views.MovieViewSet)
router.register(r'favourite', views.FavouriteViewSet)
router.register(r'movies-watched', views.MovieWatchedViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', auth_views.obtain_auth_token),
    path('favourite-movie/', views.FavouriteView.as_view(), name='favourite-movies'),
    path('movies/search/', views.MovieSearchView.as_view(), name='movie-search'),
]



