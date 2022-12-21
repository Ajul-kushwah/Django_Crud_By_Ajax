from django.shortcuts import render,HttpResponse
from crudapp.models import Book,User,BookSerializer


def index(request):
    return render(request,'crudapp/index.html')
def signupPage(request):
    return render(request,'crudapp/signup.html')

def signup(request):
    name = request.GET.get('name')
    email = request.GET.get('email')
    password = request.GET.get('password')
    user =User(name=name,email=email,password=password)
    try:
        user.save()
        return HttpResponse('true')
    except:
        return HttpResponse('false')


def checkEmail(request):
    # print(request.GET.get('email'))
    # user = User.objects.filter(email =request.GET.get('email') ).exists()
    try:
        user = User.objects.get(email =request.GET.get('email'))
        return HttpResponse('true')
    except:
        return HttpResponse('false')



def addBook(request):
    name = request.GET.get('name')
    price = request.GET.get('price')
    page = request.GET.get('pages')

    book=Book(name = name, price = price, pages = page)
    try:
        book.save()
        return HttpResponse('true')
    except:
        return HttpResponse('false')

def showBook(request):
    l = list()
    print('all books')
    book = Book.objects.all()
    for bk in book:
        sr = BookSerializer(bk)
        l.append(sr.data)
        print(sr.data)#it will return  json formate data
    print(l)
    import json
    return HttpResponse(json.dumps(l))

def deleteBook(request):
    try:
        # print(request.GET.get('id'))
        book = Book.objects.get(id = request.GET.get('id'))
        book.delete()
        return HttpResponse('true')
    except:
        return HttpResponse('false')