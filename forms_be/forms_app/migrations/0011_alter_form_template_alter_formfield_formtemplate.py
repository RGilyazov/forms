# Generated by Django 4.1.1 on 2022-09-25 07:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('forms_app', '0010_alter_formfieldvalue_form'),
    ]

    operations = [
        migrations.AlterField(
            model_name='form',
            name='template',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='forms', to='forms_app.formtemplate'),
        ),
        migrations.AlterField(
            model_name='formfield',
            name='formTemplate',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fields', to='forms_app.formtemplate'),
        ),
    ]
