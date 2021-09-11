from django.db import models

# Create your models here.
class Notes(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length = 200)
    description = models.CharField(max_length = 200)
    date = models.DateField()

    def __str__(self):
        return self.title