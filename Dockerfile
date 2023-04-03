FROM python:3.9

WORKDIR /app
COPY . /app

RUN pip3 install -r requirements.txt
RUN g++ solve.cpp -O2 -std=c++11 -o solver

CMD gunicorn -w 4 -b 0.0.0.0:3001 app:app
