from django.db import models


class FieldType(models.TextChoices):
    STRING = 'ST', ('string')
    NUMBER = 'NU', ('number')
    LIST = 'LS', ('list')

    @staticmethod
    def getFieldName(fieldType):
        match fieldType:
            case FieldType.STRING:
                return 'stringValue'
            case FieldType.NUMBER:
                return 'numberValue'
            case FieldType.LIST:
                return 'listValue'


class FormTemplate(models.Model):
    name = models.CharField(max_length=80)

    def __str__(self) -> str:
        return f'{self.name}'


class FormField(models.Model):
    name = models.CharField(max_length=80)
    fieldType = models.CharField(max_length=2, choices=FieldType.choices)
    FormTemplate = models.ForeignKey(
        FormTemplate,  on_delete=models.CASCADE, related_name='fields', blank=False, null=True)

    def __str__(self) -> str:
        return f'{self.FormTemplate}.{self.name}({self.fieldType})'


class ListValue(models.Model):
    formField = models.ForeignKey(
        FormField,  on_delete=models.CASCADE, related_name='values')
    value = models.CharField(max_length=30)

    def __str__(self) -> str:
        return f'{self.value}'


class Form(models.Model):
    template = models.ForeignKey(
        FormTemplate,
        on_delete=models.CASCADE,
        related_name='forms', blank=False, null=True)

    def __str__(self) -> str:
        return f'{self.template}.{self.id}'


class FormFieldValue(models.Model):
    form = models.ForeignKey(
        Form, on_delete=models.CASCADE, blank=False, null=True, related_name='values')
    formField = models.ForeignKey(FormField,  on_delete=models.CASCADE)
    stringValue = models.CharField(max_length=50, blank=True, null=True)
    numberValue = models.FloatField(blank=True, null=True)
    listValue = models.ForeignKey(
        ListValue, blank=True, null=True, on_delete=models.CASCADE)

    @property
    def valueAsString(self):
        fieldName = FieldType.getFieldName(self.formField.fieldType)
        if fieldName:
            return getattr(self, FieldType.getFieldName(self.formField.fieldType))
        else:
            return ''

    def __str__(self) -> str:
        return f'{self.form.template.name}.{self.formField.name}.form_{self.form.template.id}={self.getValue()}'
