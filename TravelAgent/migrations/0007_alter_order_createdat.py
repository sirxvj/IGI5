# Generated by Django 5.0.6 on 2024-05-23 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TravelAgent', '0006_climate_country_hotel_tour_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='createdAt',
            field=models.DateField(auto_now_add=True),
        ),
    ]
