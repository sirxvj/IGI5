# Generated by Django 5.0.6 on 2024-05-23 14:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('TravelAgent', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='phone_number',
            new_name='phone',
        ),
    ]
