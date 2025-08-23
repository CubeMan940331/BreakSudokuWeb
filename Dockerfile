FROM python

WORKDIR /app
COPY . /app

RUN pip3 install -r requirements.txt
RUN make

CMD ["gunicorn", "-w 4", "-b 0.0.0.0:3001", "app:app"]
