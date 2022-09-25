from rest_framework.test import APITestCase
from django.urls import reverse
from ..models import FormTemplate, FormField, FieldType
import json


def create_formTemplate(self):
    self.formTemplate = FormTemplate(name='test_template')
    self.formTemplate.save()


def create_fields(self, formTemplate):
    for choice in FieldType:
        formField = FormField(name='field '+choice, fieldType=choice,
                              formTemplate=formTemplate)
        formField.save()


class formTemplates_Get(APITestCase):

    @classmethod
    def setUp(self):
        create_formTemplate(self)
        create_fields(self, self.formTemplate)

    def testTemplates_get(self):
        api_formTemplates_url = reverse('forms_app:api_formTemplates')
        response = self.client.get(api_formTemplates_url)
        self.assertEqual(response.status_code, 200)
        respData = response.json()
        expectedData = [{'fields': [{'fieldType': 'ST',
                                     'formTemplate': 1,
                                     'name': 'field ST',
                                     'pk': 1,
                                     'values': []},
                                    {'fieldType': 'NU',
                                     'formTemplate': 1,
                                     'name': 'field NU',
                                     'pk': 2,
                                     'values': []},
                                    {'fieldType': 'LS',
                                     'formTemplate': 1,
                                     'name': 'field LS',
                                     'pk': 3,
                                     'values': []}],
                         'name': 'test_template',
                         'pk': 1}]
        self.assertEqual(expectedData, respData)

    def tearDown(self):
        self.formTemplate.delete()


class formTemplates_Post(APITestCase):

    def testTemplates_post_without_name(self):
        api_formTemplates_url = reverse('forms_app:api_formTemplates')
        data = {'name': '',
                        'fields': []}
        response = self.client.post(
            api_formTemplates_url,  json.dumps(
                data), content_type="application/json")
        self.assertEqual(response.status_code, 400)
        respData = response.json()
        self.assertEqual(respData, {'name': ['This field may not be blank.']})

    def testTemplates_post(self):
        api_formTemplates_url = reverse('forms_app:api_formTemplates')
        data = {'name': 'test_template',
                        'fields': [{'fieldType': 'ST',
                                    'formTemplate': 1,
                                    'name': 'field ST',
                                    'values': []},
                                   {'fieldType': 'NU',
                                    'formTemplate': 1,
                                    'name': 'field NU',
                                    'values': []},
                                   {'fieldType': 'LS',
                                    'formTemplate': 1,
                                    'name': 'field LS',
                                    'values': []}], }
        response = self.client.post(
            api_formTemplates_url,  json.dumps(
                data), content_type="application/json")
        self.assertEqual(response.status_code, 201)
        template = FormTemplate.objects.get(pk=1)
        self.assertEqual(template.name, 'test_template')
        self.assertEqual(template.fields.count(), 3)
        template.delete()


class formTemplate_Put(APITestCase):
    @classmethod
    def setUp(self):
        create_formTemplate(self)
        create_fields(self, self.formTemplate)

    def testTemplate_put_empty_name(self):
        api_formTemplates_url = reverse(
            'forms_app:api_formTemplate', args=['1'])
        data = {'pk': 1,
                'fields': []}
        response = self.client.put(
            api_formTemplates_url,  json.dumps(
                data), content_type="application/json")
        self.assertEqual(response.status_code, 400)
        respData = response.json()
        self.assertEqual(respData, {'name': ['This field is required.']})

    def testTemplate_put(self):
        api_formTemplates_url = reverse(
            'forms_app:api_formTemplate', args=['1'])
        data = {'name': 'NEW NAME',
                'pk': 1,
                'fields': []}
        response = self.client.put(
            api_formTemplates_url,  json.dumps(
                data), content_type="application/json")
        self.assertEqual(response.status_code, 204)
        template = FormTemplate.objects.get(pk=1)
        self.assertEqual(template.name, 'NEW NAME')

    def tearDown(self):
        self.formTemplate.delete()


class formTemplate_Delete(APITestCase):
    @classmethod
    def setUp(self):
        create_formTemplate(self)
        create_fields(self, self.formTemplate)

    def testTemplate_delete(self):
        self.assertEqual(FormTemplate.objects.count(), 1)
        api_formTemplates_url = reverse(
            'forms_app:api_formTemplate', args=['1'])
        data = {'pk': 1}
        response = self.client.delete(
            api_formTemplates_url,  json.dumps(
                data), content_type="application/json")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(FormTemplate.objects.count(), 0)
