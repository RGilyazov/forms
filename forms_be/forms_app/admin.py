from django.contrib import admin
from .models import FormField, ListValue, FormTemplate, Form, FormFieldValue

# Register your models here.


class StringModelAdmin(admin.ModelAdmin):
    list_display = ["__str__", ]


admin.site.register(FormField, StringModelAdmin)
admin.site.register(ListValue)
admin.site.register(FormTemplate)
admin.site.register(Form)
admin.site.register(FormFieldValue)
