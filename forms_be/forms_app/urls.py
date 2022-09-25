from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views
from . import api

app_name = 'Language Cards'
urlpatterns = [
    # path(route='', view=views.formTemplates, name='index'),
    # path(route='formTemplate/<int:formTemplate_id>/', view=views.formTemplate, name='formTemplate'),
    # path(route='form/<int:formTemplate_id>/', view=views.formTemplate, name='form'),

    path(route='api/formTemplates/<int:formTemplate_id>/', view=api.formTemplate, name='api_formTemplate'),
    path(route='api/formTemplates', view=api.formTemplates, name='api_formTemplates'),
    path(route='api/forms', view=api.forms, name='api_forms'),
 
 

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
