from django.views.decorators.csrf import csrf_exempt
from .models import FormTemplate,Form

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import FormTemplateSerializer,FormSerializer

@api_view(['GET', 'POST'])
@csrf_exempt
def formTemplates(request):
    if request.method == "GET":
        data = FormTemplate.objects.all()
        serializer = FormTemplateSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method =="POST":
        serializer = FormTemplateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE'])
@csrf_exempt
def formTemplate(request, formTemplate_id):
    try:
        formTemplate = FormTemplate.objects.get(pk=formTemplate_id)
    except formTemplate.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method =="PUT":
        serializer = FormTemplateSerializer(formTemplate, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        formTemplate.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
@csrf_exempt
def forms(request):
    if request.method == "GET":
        data = Form.objects.all()
        serializer = FormSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method =="POST":
        serializer = FormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
