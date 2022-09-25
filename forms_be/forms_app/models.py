from django.db import models
from django.core.exceptions import ValidationError


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


class validateOnSaveModel(models.Model):
    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    class Meta:
        abstract = True


class FormTemplate(validateOnSaveModel):
    name = models.CharField(max_length=80)

    def __str__(self) -> str:
        return f'{self.name}'


class FormField(validateOnSaveModel):
    name = models.CharField(max_length=80)
    fieldType = models.CharField(max_length=2, choices=FieldType.choices)
    formTemplate = models.ForeignKey(
        FormTemplate,  on_delete=models.CASCADE, related_name='fields')

    def __str__(self) -> str:
        return f'{self.formTemplate}.{self.name}({self.fieldType})'


class ListValue(validateOnSaveModel):
    formField = models.ForeignKey(
        FormField,  on_delete=models.CASCADE, related_name='values')
    value = models.CharField(max_length=30)

    def __str__(self) -> str:
        return f'{self.value}'


class Form(validateOnSaveModel):
    template = models.ForeignKey(
        FormTemplate,
        on_delete=models.CASCADE,
        related_name='forms')

    def __str__(self) -> str:
        return f'{self.template}.{self.id}'


class FormFieldValue(validateOnSaveModel):
    form = models.ForeignKey(
        Form, on_delete=models.CASCADE,  related_name='values')
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
        return f'{self.form.template.name}.{self.formField.name}.form_{self.form.template.id}={self.valueAsString}'

    def clean(self):
        fieldType = self.formField.fieldType
        for choice in FieldType:
            fieldName = FieldType.getFieldName(choice)
            if choice != self.formField.fieldType and getattr(self, fieldName) != None:
                raise ValidationError(
                    {fieldName: f"{fieldName} should be Null for field with type {fieldType}"})
        match fieldType:
            case FieldType.LIST:
                if self.listValue != None and self.formField != self.listValue.formField:
                    raise ValidationError(
                        {'listValue': "listValue should belong to formField"})
            case FieldType.STRING:
                if self.stringValue == None or len(self.stringValue) < 1:
                    raise ValidationError(
                        {'stringValue': "value length should be at least 1"})
