# Generated by Django 4.0.4 on 2022-05-08 22:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Build',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('relic_count', models.PositiveSmallIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Relic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('description', models.TextField(blank=True, null=True)),
                ('is_active_relic', models.BooleanField(default=False)),
                ('icon', models.CharField(blank=True, max_length=256, null=True)),
                ('builds', models.ManyToManyField(to='builder.build')),
            ],
        ),
        migrations.CreateModel(
            name='StatIncreases',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attack_speed', models.PositiveSmallIntegerField(default=0, null=True)),
                ('strength', models.PositiveSmallIntegerField(default=0, null=True)),
                ('stamina', models.PositiveSmallIntegerField(default=0, null=True)),
                ('energy', models.PositiveSmallIntegerField(default=0, null=True)),
                ('armor', models.PositiveSmallIntegerField(default=0, null=True)),
                ('relic', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='builder.relic')),
            ],
        ),
    ]
