from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('addBook/',views.addBook,name='addBook'),
    path('showBook/',views.showBook,name='showBook'),
    path('deleteBook/',views.deleteBook,name='deleteBook'),
    path('signupPage/',views.signupPage,name='signupPage'),
    path('signup/',views.signup,name='signup'),


    path('checkEmail/',views.checkEmail,name="checkEmail")
]
