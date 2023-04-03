import flask
def BreakSudoku(mtx):
    from subprocess import Popen, PIPE
    p=Popen('/app/solver',stdin=PIPE,stdout=PIPE)
    s=[]
    for row in mtx:
        for col in row: s.append(str(col))
    outs,errs=p.communicate((' '.join(s)).encode())
    gen=(int(n) for n in outs.decode().split(' '))
    val=p.wait()
    return [[gen.__next__() for _ in range(9)] for _ in range(9)],val

app=flask.Flask(__name__)
@app.route('/')
def root_page():
    return flask.render_template(
        'index.html',
        tbl=[[(0,str(i)+str(j)) for j in range(9)] for i in range(9)]
    )

@app.post('/solve')
def solve():
    mtx,val=BreakSudoku(mtx=flask.request.json)
    return flask.jsonify({"mtx": mtx,"val": val})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=3001)
