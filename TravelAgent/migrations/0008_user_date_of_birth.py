# Generated by Django 5.0.6 on 2024-05-23 21:30

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TravelAgent', '0007_alter_order_createdat'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='date_of_birth',
            field=models.DateField(default=datetime.date(2024, 5, 23)),
        ),
    ]
