# Generated by Django 5.1.1 on 2024-09-17 09:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TravelAgent', '0013_mymodel_partner_alter_user_date_of_birth'),
    ]

    operations = [
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('amount', models.PositiveSmallIntegerField(default=1)),
                ('price', models.FloatField()),
                ('startDate', models.DateField()),
                ('tour', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart_item', to='TravelAgent.tour')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart_item', to='TravelAgent.user')),
            ],
        ),
    ]
