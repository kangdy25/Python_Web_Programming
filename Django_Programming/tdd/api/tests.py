from django.test import TestCase
from .models import Book

from rest_framework.test import APIClient
from rest_framework import status

class ModelTest(TestCase):
    def setUp(self):
        self.book_title = "My Book"
        self.book_author = "Issac"
        self.book = Book(title=self.book_title, author=self.book_author)

    def test_model_can_create_a_bucketlist(self):
        old_count = Book.objects.count()
        self.book.save()
        new_count = Book.objects.count()
        self.assertNotEqual(old_count, new_count)
