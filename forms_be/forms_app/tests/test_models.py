from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from ..models import FormTemplate, FormField, FieldType, ListValue, Form, FormFieldValue


def create_formTemplate(self):
    self.formTemplate = FormTemplate(name='test_template')
    self.formTemplate.save()


def create_field(self, formTemplate):
    self.formFields = []
    for i in range(2):
        formField = FormField(name=f'list field {i}', fieldType=FieldType.LIST,
                              formTemplate=formTemplate)
        formField.save()
        for j in range(3):
            listValue = ListValue(formField=formField, value=f'value {j}')
            listValue.save()
        self.formFields.append(formField)


class testFormFieldValue(APITestCase):

    @ classmethod
    def setUp(self):
        create_formTemplate(self)
        create_field(self, self.formTemplate)

    def testFormFieldValue_save(self):
        form = Form(template=self.formTemplate)
        form.save()
        formField = self.formFields[0]
        formFieldValue = FormFieldValue(
            form=form, formField=formField, listValue=formField.values.all()[0])
        formFieldValue.save()

    def testFormFieldValue_validationOnSave(self):
        form = Form(template=self.formTemplate)
        form.save()
        formField = self.formFields[0]
        formField2 = self.formFields[1]
        formFieldValue = FormFieldValue(
            form=form, formField=formField, listValue=formField2.values.all()[0])
        try:
            formFieldValue.save()
        except ValidationError as e:
            self.assertTrue('listValue' in e.message_dict)

    def tearDown(self):
        self.formTemplate.delete()
