from django.urls import path

def _index_view(request, *args, **kwargs):
    from .views import index
    return index(request, *args, **kwargs)

urlpatterns = [
    path("", _index_view, name="assets-index"),
]
