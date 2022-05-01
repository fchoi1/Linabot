from flask import Flask, render_template, request, url_for, redirect, jsonify
import socket
app = Flask(__name__)
#think of a way to use a variable so the server depends on the datafile minimally
"""@app.route("/")
def hello():
    return render_template("map_test.html")

@app.route("/ros")
def ros():
    return render_template("ros_test.html")

@app.route("/listener")
def listener():
    return render_template("listener.html")


@app.route("/talker")
def talker():
    return render_template("talker.html")

@app.route("/mjpeg")
def mjpeg():
    return render_template("mjpeg_test.html")

@app.route("/post")
def post():
    return render_template("post.html")
"""
file = open("waypoints.txt","r")
temp = file.read()
file.close()
temp = temp.strip().split("\n")
waypoints = []
num = 0
for i in xrange(len(temp)/5):
   waypoints.append([temp[i*5], temp[i*5+1], temp[i*5+2], temp[i*5+3], temp[i*5+4]])
   num+=1
del temp
print num
print waypoints
@app.route("/")
def index():
    try:
    	return render_template("try.html", waypoints = waypoints)
    except Exception, e:
	return str(e)

@app.route('/setWaypoint', methods=['POST'])
def setWaypoint():
    global num
    title = request.form['title']
    ip = "-1"
    pos = request.form['pos']

    if(title == "" or title is None):
      return jsonify({'error': "ERROR: No title recieved."})
    if("undefined" in pos):
      return jsonify({'error': "ERROR: Undefined position data recieved."})
    for i in xrange(len(waypoints)):
      if(title == waypoints[i][0]):
        return jsonify({'error': "ERROR: This title already exists."})
    #I need this to be saved to a variable
    #refresh everyones dropdown menu upon addition or deletion of element
    #I need Ajax now ---- I GOT AJAX NOW

    file = open("waypoints.txt","a")
    file.write(title+"\n"+ip+"\n"+pos)
    file.close()
    temp = pos.strip().split("\n")
    temp = [ip] + temp
    temp = [title] + temp
    waypoints.append(temp)
    num+=1
    print num
    print waypoints
    return jsonify({'title': waypoints[-1][0]})

@app.route('/delWaypoint', methods=['POST'])
def delWaypoint():
    global num
    index = int(request.form['rem'])
    del waypoints[index]
    num-=1
    print num
    print waypoints
    file = open("waypoints.txt","w")
    for i in xrange(len(waypoints)):
        file.write("\n".join(waypoints[i])+"\n")
    file.truncate()
    file.close()    
    return jsonify({'rem':"HI"})

@app.route('/setIP', methods=['POST'])
def setIP():
    global num
    index = int(request.form['ind'])
    ip = request.form['ip']
    waypoints[index][1] = ip
    file = open("waypoints.txt","w")
    for i in xrange(len(waypoints)):
        file.write("\n".join(waypoints[i])+"\n")
    file.close()    
    return jsonify({'ip': waypoints[index][1]})
"""
@app.route('/setRoutine', methods=['POST'])
def setRoutine():
    global num
    title = request.form['title']
    ip = "-1"
    pos = request.form['pos']

    if(title == "" or title is None):
      return jsonify({'error': "ERROR: No title recieved."})
    if("undefined" in pos):
      return jsonify({'error': "ERROR: Undefined position data recieved."})
    for i in xrange(len(waypoints)):
      if(title == waypoints[i][0]):
        return jsonify({'error': "ERROR: This title already exists."})
    #I need this to be saved to a variable
    #refresh everyones dropdown menu upon addition or deletion of element
    #I need Ajax now ---- I GOT AJAX NOW

    file = open("waypoints.txt","a")
    file.write(title+"\n"+ip+"\n"+pos)
    file.close()
    temp = pos.strip().split("\n")
    temp = [ip] + temp
    temp = [title] + temp
    waypoints.append(temp)
    num+=1
    print num
    print waypoints
    return jsonify({'title': waypoints[-1][0]})

@app.route('/delRoutine', methods=['POST'])
def delRoutine():
    global num
    index = int(request.form['rem'])
    del waypoints[index]
    num-=1
    print num
    print waypoints
    file = open("routines.txt","w")
    for i in xrange(len(waypoints)):
        file.write("\n".join(waypoints[i])+"\n")
    file.truncate()
    file.close()    
    return jsonify({'rem':"HI"})

@app.route('/setIP', methods=['POST'])
def setIP():
    global num
    index = int(request.form['ind'])
    ip = request.form['ip']
    waypoints[index][1] = ip
    file = open("waypoints.txt","w")
    for i in xrange(len(waypoints)):
        file.write("\n".join(waypoints[i])+"\n")
    file.close()    
    return jsonify({'ip': waypoints[index][1]})"""
app.run(host='0.0.0.0')
