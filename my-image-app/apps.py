
from sqlite3 import IntegrityError
from flask import Flask, redirect, url_for, request, render_template
import requests
import sqlalchemy as data_engine
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Insert, update, Table, MetaData, select, func, Text as text, text as Text, delete
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime as datetime
from selenium import webdriver
from gunicorn.http import wsgi
import csv
import aiohttp
import aiofiles
import async_to_sync
import re
import asyncio
import pandas as pd
from bokeh.models import ColumnDataSource as aa
from dash import Dash, html, dcc
from dash.dependencies import Input, Output, State


# Flask apps
apps = Flask(__name__, static_folder='./static', template_folder='templates')

apps.secret_key = 'Alexander Oluwaseun Kwesi'

# Dash app
#app = Dash(__name__, server=apps, suppress_callback_exceptions=True)

data_list = []
int_num = []
i = 0
data_stmt = []
contents = []
data_dict = {}
task = ""
key = 0
append_list = []
used_dictS = {}
used_dict = {}

engine = data_engine.create_engine('sqlite:///Todos.db', echo=True) 
connection = engine.connect()
Session = sessionmaker(bind=connection)
session = Session()

print("Successfully connected to the database.")

Base = declarative_base()

class Todos(Base):
    __tablename__ = 'todo'
    task_id = data_engine.Column(Integer, primary_key=True, unique=True, nullable=False)
    todo_task = data_engine.Column(String(50), unique=False, nullable=False)
    check_state = data_engine.Column(String(50), unique=False, nullable=False)
    check_status = data_engine.Column(String(50), unique=False, nullable=False)
    check_date = data_engine.Column(DateTime, default=datetime.datetime.now, nullable=False)





Base.metadata.create_all(engine)



def read_file():
    file_path = "todo_list.txt"
    
    contents = ""
    file = open(file_path, mode='r',)
    contents = file.read()
    line = [line.replace(","," ").replace('\n',"','") for line in contents]
    content =  line

    df = pd.read_csv(file_path, nrows=20, low_memory=1000, header=None, skip_blank_lines=True)
    df.columns  = [0]
        #for i in range(len(content)):
        
            #filtered_list = re.sub(r'\n\s*\n', '\n', content[i])
        
            #async with aiofiles.open('output.txt', 'w') as file:
            # content_ = file.write(filtered_list)

    print(df[:])
    return df[:].to_dict()


async def check_todo_list(task):
    file_path = "todo_list.txt"
    # Simulate a check operation with asyncio.sleep
    await asyncio.sleep(1)
    
    async with aiofiles.open(file_path, mode='r',) as file:
        lines = await file.read()
        
        # Regular expression pattern to match (e.g., strings that contain "e")
        pattern = task
        
        filtered_list = [s for s in lines if not re.search(pattern, s)]
        searched_task = ''.join(filtered_list).strip(",'")
        if not re.search(pattern, searched_task):
            print(searched_task)
            message = 'Task not found'
            return 
        else:
            
            message = "Task found!"
            print("Tasks found!")
            return message
    

async def delete_item(task):
    # Simulate a delete operation with asyncio.sleep
    file_path = "todo_list.txt"
    await asyncio.sleep(1) 
    lines = ""
    list_ = []
    async with aiofiles.open(file_path, mode='r',) as file:
        lines = await file.read()
        ##lines = lines[:1] + lines[:-1]
        lines = str("".join(lines))
        list_ = lines.split(',')
        # Regular expression pattern to match (e.g., strings that contain "e")
        #  pattern = r'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRstuvwxyz0123456789'
        pattern = task
        # Use a list comprehension to filter out strings that match the pattern
        filtered_list = [s for s in list_ if re.search(pattern, s)]

        async with aiofiles.open(file_path, mode='w',) as file:
            list_ = await file.write(filtered_list)
            file = file.writelines(list_)
            print(file)
        return list_
    



async def create_another_file_to_remove_empty_lines():
    await asyncio.sleep(1) 
    async with aiofiles.open( 
    "todo_list.txt", 'r') as r, open( 
        'output.txt', 'w') as o: 
      
        for line in r: 
            #strip() function 
            if line.strip(): 
                o.write(line) 
  
            async with aiofiles.open("output.txt", "r") as f: 
                new_file = f.read() 
                return new_file
##print("New text file:\n",f.read())
    


async def fetch_data(url):
    # Create an asynchronous client session
    async with aiohttp.ClientSession() as session:
        # Asynchronously fetch data from the URL
        async with session.get(url) as response:
            # Return the text content of the response
            return await response.text()
        

async def load_txt_file():
# URL of the data to fetch
    data_url = 'todo_list.txt'
    
    # Fetch the data asynchronously
    data = await fetch_data(data_url)
    
    # Load the fetched data into a DataFrame
    df = pd.read_csv(pd.compat.StringIO(data))
    
    # Print the first few rows of the DataFrame
    print(df.head(), df.loc[0].to_list())
    
    return df.loc[0].to_list()
    
    

##sync_function = async_to_sync(read_file_async('todo_list.txt'))
##contents = sync_function()
##print(contents)


def extract_words_from_do_list(files_):
    words = re.findall(r'\b\w+\b\s', files_)
    if words:
        return words
    else:
        return "No words found or words are not formed properly"
    

    
def extract_words(task):
    file_path = 'todo_list.txt'
    with open(file_path, 'r') as file:
        data = file.read()
        if data:
            pattern = r"/^[Aa-zZ0-9]\w\\d{8,50}"
            match = re.search(pattern, task)
            if match:
                print(match)
                return match
            else:
                return "No words found or words are not formed properly" 
        else:
            pattern = r"/^[Aa-zZ0-9]\w\\d{8,50}"
            match = re.search(pattern, task)
            if match:
                print(match)
                return match
            else:
                return "No words found or words are not formed properly"
  
    
def remove_whitespace_(char_list):
    string_= ''.join(string_.replace(","," ") for string_ in char_list)
    return string_


@apps.route('/', methods=['GET'])
def Todo():
    i = 0
    ##files = await delete_item()
    files = read_file()
    print(files)
    if not files.keys :
        return render_template('new_todo_page.html', task='warning', message='No file Contents returned')
    elif files.keys:
        for file_ in files:
            files_ = files[file_]
        ##files_ = files
        ##for val in files_.__iter__():
            ##print(val)
            ##if i >= 0:
                ##files_ = str("".join(files_))
                ##files_ = files_[files_.index('['):files_.index(']')]
                ##key = i
                ##used_dict[key] = files_[i]
                ##print(used_dict)
            ##continue
            return render_template('new_todo_page.html', used_dict=files_, task="success", message="File Contents returned successfully")



async def add_task_to_file(add_task):
    # Simulate a create operation with asyncio.sleep
    file_path = "todo_list.txt"
    await asyncio.sleep(1)
    if not extract_words(add_task):
        if  await check_todo_list(add_task):
            message = "Task already exist or No words found or words are not formed properly" 
            return message
    elif  extract_words(add_task):
        if not await check_todo_list(add_task):
            async with aiofiles.open(file_path, mode='a') as file:
                file =  await file.write(f'\n'+ add_task)
            return file
 
      


@apps.route('/add_task', methods=['POST'])
async def add_task():
    num = 0
    
    if request.method == 'POST':
        task = request.form.get('task-input')
        ##files = await check_todo_list(task)
        file_ = read_file()
        for file in file_:
            files = file_[file]
        if file_:
            while num < 5000000 or num > 5000000:
                num += 1
                print (num)
                key = num
                used_dict[key] = task
                print(used_dict)
                used_file = await add_task_to_file(task) 
                print(used_file)
                if task == '':
                    return render_template('new_todo_page.html', used_dict=files, task='warning', message='Empty Task Can not be Entered')
                elif used_file is not None:
                    return redirect(url_for('Todo') )
                    #return render_template('new_todo_page.html', used_dict=files, task="success", message='Word extracted successfully and added')
                else:
                    return render_template('new_todo_page.html', used_dict=files, task='warning', message="Task already exist/No words found or words are not formed properly") 
        else:
            return redirect(url_for('Todo'))
            
        
@apps.route('/complete_task', methods=['POST', 'GET'])
def complete_task():    
    key = 0
    if request.method == 'POST':
        file = read_file()
        for file_ in file: # type: ignore
            files = file[file_] # type: ignore
        # Create a Chrome driver
        # driver = webdriver.Chrome()
        # driver.get'http://localhost:8100/complete_task'
        
        task = task_id = str(request.form.get('task_id'))
        task = int(task)
        task_todo = request.form.get('task_todo')
        task_todo = str(task_todo).replace('[', '').replace(']', '').replace("'", '')
        print(task_id)
        # checkbox = driver.find_element_by_id('check'+task_id)
        # print(str(checkbox))
        check_state = request.form.get('check'+task_id)
        check_state = str(check_state).replace('[', '').replace(']', '').replace("'", '')
        print(check_state, task_todo)
        data_ = session.scalars(select(Todos.todo_task).where(Todos.task_id > 0)).all()
        data_ = str(data_)
        if check_state == 'on' and task_todo not in data_:
            max_id = session.scalars(select(func.max(Todos.task_id)).where(Todos.task_id > 0)).one()
            print(max_id)
            max_id = int(max_id) + 1
            new_task = Todos(task_id=max_id, todo_task=task_todo, check_state='checked', check_status='Task Completed' , check_date=datetime.datetime.now())
            session.add(new_task)
            try:
                session.commit()
            except IntegrityError as e:
                session.rollback()
                session.close()
                print(e)
                print(new_task)
            stmt = Text('SELECT task_id, todo_task, check_state, check_status, check_date FROM todo')    
            db_query = session.execute(stmt)
            data_stmt = db_query.fetchall()
            print(data_stmt)
            return render_template('new_todo_page.html', task='Success', info='Task History Retrieved Successfully', data_stmt=data_stmt, used_dict=files)    
        elif not check_state == 'on' and task_todo not in data_:
            max_id = session.scalars(select(func.max(Todos.task_id)).where(Todos.task_id > 0)).one()
            print(max_id)
            max_id = int(max_id) + 1
            new_task = Todos(task_id=max_id, todo_task=task_todo,  check_state='not checked',  check_status='Complete Task' , check_date=datetime.datetime.now())
            session.add(new_task)
            try:
                session.commit()
            except IntegrityError as e:
                session.rollback()
                session.close()
                print(e)
                print(new_task) 
            stmt = Text('SELECT task_id, todo_task, check_state, check_status, check_date FROM todo')    
            db_query = session.execute(stmt).fetchall()
            data_stmt = db_query
            print(data_stmt)
            return render_template('new_todo_page.html', task='Success', info='Task History Retrieved Successfully', data_stmt=data_stmt, used_dict=files)
        else:
            return render_template('new_todo_page.html', task='warning', info='Task already exists enter a different task or clear task history', used_dict=files)    
    elif request.method == 'GET':
        stmt = Text('SELECT task_id, todo_task, check_state, check_status, check_date FROM todo')    
        db_query = session.execute(stmt)
        data_stmt = db_query.all()
        print(data_stmt)
        return render_template('new_todo_page.html', task='Success', info='Task History Retrieved Successfully', data_stmt=data_stmt, used_dict=files)

@apps.route('/show_task_history', methods=['GET'])
def show_task_history():
    if request.method == 'GET':
        files = read_file()
        for file_ in files:
            files_ = files[file_]
        stmt = Text('SELECT task_id, todo_task, check_state, check_status, check_date FROM todo')    
        db_query = session.execute(stmt)
        data_stmt = db_query.all()
        print(data_stmt)
    return render_template('new_todo_page.html', task='Success', info='Task History Listed Successfully Below', data_stmt=data_stmt, used_dict=files_)


@apps.route('/delete_task_history', methods=['GET'])
async def delete_task_history():
    if request.method == 'GET':
        
        task_id = request.form.getlist('task_id')
        print(task_id)
        todo_task = request.form.getlist('todo_task')
        await delete_item(todo_task)
        check_state = request.form.getlist('check'+task_id)
        check_state = str(check_state).replace('[', '').replace(']', '').replace("'", '')
        for checked in check_state:
            stmt = select(Todos).where(Todos.check_state == checked, Todos.task_id == task_id)
            if stmt:
                stmt = delete(Todos).where(Todos.task_id == task_id)
                try:
                    session.execute(stmt)
                    session.commit()
                    return render_template('new_todo_page.html', task='success', info='Task History Deleted Successfully')
                except IntegrityError as e:
                    session.rollback()
                    session.close()
                    print(e)
                    return render_template('new_todo_page.html', task='warning', info='No Task History to Delete')
            else:
                return render_template('new_todo_page.html', task='warning', info='No Task History to Delete')

@apps.route('/inventory')
def inventory_page():
    return render_template('inventory_page.html')

if __name__ == '__main__':
    apps.run(debug=True)
    asyncio.run(add_task())
    