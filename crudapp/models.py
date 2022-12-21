from django.db import models

# Create your models here.
class Book(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    pages = models.IntegerField()

class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    password = models.CharField(max_length=20)

from rest_framework import serializers

class BookSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    price = serializers.IntegerField()
    pages = serializers.IntegerField()
    id = serializers.IntegerField()
