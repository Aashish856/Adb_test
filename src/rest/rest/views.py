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
        todos = db.todos.find()
        todos_list = []
        
        # Convert ObjectId to string for JSON serialization
        for todo in todos:
            todo['_id'] = str(todo['_id'])
            todos_list.append(todo)
        
        return Response(todos_list, status=status.HTTP_200_OK)
        
    def post(self, request):
        # Insert the new todo item into the database
        db.todos.insert_one(request.data)
        
        # Return success response with status 201 Created
        return Response({"msg" : "Todo item created successfully"},status=status.HTTP_201_CREATED)

    def delete(self, request):
        result = db.todos.delete_many({})  # No filter means all documents will be deleted
        return Response(
            {
                "msg": "All todo items deleted successfully",
                "deleted_count": result.deleted_count,  # Optional: Include the count of deleted items
            },
            status=status.HTTP_200_OK,
        )

