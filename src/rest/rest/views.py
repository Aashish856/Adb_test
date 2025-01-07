from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']

class TodoListView(APIView):

    def get(self, request):
        try:
            todos = db.todos.find()
            todos_list = []
            for todo in todos:
                todo['_id'] = str(todo['_id'])
                todos_list.append(todo)
            return Response(todos_list, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"msg" : "Error Fetching Todos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request):
        try:
            if(not request.data.get("title") or not request.data.get("content")):
                return Response({"msg" : "Title and Content are required"}, status=status.HTTP_400_BAD_REQUEST)
            db.todos.insert_one(request.data)
            return Response({"msg" : "Todo item created successfully"},status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"msg" : "Error Adding Todo"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request):
        result = db.todos.delete_many({}) 
        return Response(
            {
                "msg": "All todo items deleted successfully",
                "deleted_count": result.deleted_count,
            },
            status=status.HTTP_200_OK,
        )

