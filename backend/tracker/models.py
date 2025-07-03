from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

# Create your models here.
