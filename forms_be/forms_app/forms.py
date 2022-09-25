from argparse import ArgumentError
import django.forms as forms
from .models import *
from crispy_forms.helper import FormHelper
from django.forms.models import modelformset_factory

class FormTemplateForm(forms.ModelForm):
    class Meta:
        model = FormTemplate
        exclude = []

class FormFieldFormSet(forms.BaseModelFormSet):
    def __init__(self, formTemplate, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.queryset = FormField.objects.filter(FormTemplate=formTemplate)


class FormFieldForm(forms.ModelForm):
    class Meta:
        model = FormField
        exclude = []

    def __init__(self, *args, **kwargs):
        self.formTemplate_id = kwargs.pop('formTemplate_id')
        super(FormFieldForm, self).__init__(*args, **kwargs)

        self.fields['FormTemplate'].queryset = FormTemplate.objects.filter(id = self.formTemplate_id)


BaseFormFieldFormSet = modelformset_factory(FormField,form=FormFieldForm,extra=1, can_delete=True)

class FormFieldFormSet(BaseFormFieldFormSet):

    def __init__(self, *args, **kwargs):
        #  create a user attribute and take it out from kwargs
        # so it doesn't messes up with the other formset kwargs
        self.formTemplate_id = kwargs.pop('formTemplate_id')
        super(FormFieldFormSet, self).__init__(*args, **kwargs)
        for form in self.forms:
            form.empty_permitted = False

    def _construct_form(self, *args, **kwargs):
        # inject user in each form on the formset
        kwargs['formTemplate_id'] = self.formTemplate_id
        return super(FormFieldFormSet, self)._construct_form(*args, **kwargs)