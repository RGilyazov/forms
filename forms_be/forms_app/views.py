from django.http import HttpResponseNotFound
from django.shortcuts import get_object_or_404, render, redirect
from django.urls import reverse
from .models import FormTemplate
from .forms import *


def formTemplates(request):
    context = {'formTemplates': FormTemplate.objects.all()}
    if request.method == "GET":
        return render(request, 'forms_app/formTemplates.html', context)
    else:
        return HttpResponseNotFound(request.url)


def formTemplate(request, formTemplate_id):
    formTemplate = get_object_or_404(FormTemplate, pk=formTemplate_id)
    form = FormTemplateForm(instance=formTemplate)
    context = {'formTemplate': formTemplate, 'form': form}
    return render(request, 'forms_app/formTemplate.html', context)


def form(request, formTemplate_id):
    formTemplate = get_object_or_404(FormTemplate, pk=formTemplate_id)
    context = {formTemplate: formTemplate}
    return render(request, 'forms_app/formTemplate.html', context)
