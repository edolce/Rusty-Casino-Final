# Generated by Django 3.2.8 on 2021-11-24 08:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webinventory', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='depositDate',
        ),
        migrations.RemoveField(
            model_name='item',
            name='inInventory',
        ),
        migrations.RemoveField(
            model_name='item',
            name='withDate',
        ),
    ]
