# Generated by Django 3.2 on 2021-09-09 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0003_alter_notes_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notes',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
