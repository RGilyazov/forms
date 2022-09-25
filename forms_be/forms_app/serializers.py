from rest_framework import serializers
from .models import FormField, FormTemplate, ListValue, FormFieldValue, Form
from drf_writable_nested import WritableNestedModelSerializer


class ListValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListValue
        fields = ('pk', 'value', 'formField')


class FormFieldSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    values = ListValueSerializer(many=True)

    class Meta:
        model = FormField
        fields = ('pk', 'name', 'fieldType', 'FormTemplate', 'values')


class FormTemplateSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    fields = FormFieldSerializer(many=True)

    class Meta:
        model = FormTemplate
        fields = ('pk', 'name', 'fields')


class FormFieldValueSerializer(serializers.ModelSerializer):
    fieldType = serializers.CharField(
        source='formField.fieldType', required=False, read_only=True)
    name = serializers.CharField(
        source='formField.name', required=False, read_only=True)
    valueAsString = serializers.CharField(
        required=False, read_only=True)

    class Meta:
        model = FormFieldValue
        fields = ('pk', 'form', 'formField', 'stringValue', 'numberValue',
                  'listValue', 'fieldType', 'name', 'valueAsString')


class FormSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    values = FormFieldValueSerializer(many=True)

    class Meta:
        model = Form
        fields = ('pk', 'template', 'values')
