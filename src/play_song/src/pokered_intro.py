#!/usr/bin/env python

# Taken from
# https://gist.github.com/thenoviceoof/5465084
# but modified to work on my Roomba 770

import time
import create
import rospy
from create_node.msg import TurtlebotSensorState #Import the msg file from the package 


def callback(msg):
  hit = msg.bumps_wheeldrops
  #hitR = msg.state
  #hitL = msg.is_left_pressed
  #hitR = msg.is_right_pressed
  rospy.loginfo('Did it hit:' +str(hit))
  if (hit >= 1):
    robot = create.Create(ROOMBA_PORT)
    robot.toSafeMode()
    play_pokemon(robot)
    robot.close()

def main():
  rospy.init_node('play_song') #node name
  rospy.Subscriber("/turtlebot/sensor_state", TurtlebotSensorState, callback) #topic name , message class, callback function
  rospy.spin() #causes to run the program forever


if __name__=='__main__':
  main()



ROOMBA_PORT = "/dev/ttyUSB0"

# define silence
r = 30

# map note names in the lilypad notation to irobot commands
c4 = 60
cis4 = des4 = 61
d4 = 62
dis4 = ees4 = 63
e4 = 64
f4 = 65
fis4 = ges4 = 66
g4 = 67
gis4 = aes4 = 68
a4 = 69
ais4 = bes4 = 70
b4 = 71
c5 = 72
cis5 = des5 = 73
d5 = 74
dis5 = ees5 = 75
e5 = 76
f5 = 77
fis5 = ges5 = 78
g5 = 79
gis5 = aes5 = 80
a5 = 81
ais5 = bes5 = 82
b5 = 83
c6 = 84
cis6 = des6 = 85
d6 = 86
dis6 = ees6 = 87
e6 = 88
f6 = 89
fis6 = ges6 = 90
g6 = 91
gis6 = aes6 = 92
a6 = 93
ais6 = bes6 = 94
b6 = 95
c7 = 96
cis7 = 97
d7 = 98

# define some note lengths
# change the top MEASURE (4/4 time) to get faster/slower speeds
MEASURE = 120
HALF = MEASURE/2
HALFd = MEASURE * 3/4
Q = MEASURE/4
Qd = MEASURE * 3/8
E = MEASURE/8
Ed = MEASURE*3/16
S = MEASURE/16

Qt = HALF/3
Et = Q/3

MEASURE_TIME = MEASURE/64.



def play_pokemon(robot):
  counter = 1
  pokemon = []
  
  #1
  pokemon.append([(d5,E), (d5,E), (a5,Q), (d5,E), (d5,E), (bes5,Q), (d5,E), (d5,E), (a5,Q), (d5,E), (d5,E), (fis5,Q)])
  #2
  pokemon.append([(d5,E), (d5,E), (a5,Q), (d5,E), (d5,E), (cis6,Q), (d6,HALF), (d5,HALF)])
  #3
  pokemon.append([(c6,HALF), (d5, HALF), (d5,E), (d5,E), (a5,Q), (d5,E), (d5,E), (bes5,Q)])
  #4
  pokemon.append([(d5,E), (d5,E), (b5,Q), (d5,E), (d5,E), (c6,Q), (d6, MEASURE)])
  ##Line2
  pokemon.append([(d6, Q), (r, HALF), (g4,S), (b4,S), (d5,S), (fis5,S), (g5,Q), (g5,Q), (r,E), (g5,S), (g5,S), (g5,Q)])
  #6
  pokemon.append([(g5,Q), (g5,Q), (f5,Et), (f5,Et), (f5,Et), (f5,Et), (f5,Et), (fis5,Et),(g5,Qd), (b5,E), (d6,HALF)])
  #7
  pokemon.append([(f5,HALF), (f6,Qd), (e6,S), (dis6,S), (d6,HALF), (f5,Qd), (e5,S), (ees5,S)])
  ##Line3
  pokemon.append([ (d5,HALF), (c5,Qt), (b4,Qt), (c5,Qt), (g5,Qd), (b5,E), (d6,HALF)])
  #9
  pokemon.append([(f5,HALF), (c6,Qt), (b5,Qt), (c6,Qt), (d6,HALF), (f5,Qd), (e5,S), (ees5,S)])
  #10
  pokemon.append([(d5,HALF), (r,E), (b4,E), (c5,E), (d5,E), (g5,Qd), (b5,E), (d6,HALF)])
  #11
  pokemon.append([(f5,HALF), (f6,Qd), (e6,S), (ees6,S), (d6,HALF),(f5,Qd), (e5,S), (ees5,S)])
  ##Line4
  pokemon.append([(d5,HALF), (c5,Qt), (b4,Qt), (c5,Qt), (g5,Qd), (b5,E), (d6,HALF)])
  #13
  pokemon.append([(f5,Qd), (c5,E), (f6,Qt), (e6,Qt), (f6,Qt), (g6,Qd), (ais6,E), (g6,HALF)])
  #14
  pokemon.append([(g6,Qd), (a5,E), (a6,E), (f5,E), (a5,E), (c6,E), (ais6,Qd), (f6,HALF), (ees5,E)])
  #15
  pokemon.append([(d5,HALF), (ais6,Q), (b6,Q), (c7,Qd), (g6,HALF), (f5,E)])
  #16
  pokemon.append([(e5,HALF), (c7,Q), (cis7,Q), (d7,E), (r,Q), (c6,E), (c5,Q), (r,E), (c7,E)])
  ##Line5
  pokemon.append([(d6,E), (c6,E), (d5,Q), (c7,Qt), (c7,Qt), (cis7,Qt), (d7,E), (r,Q), (c7,E), (d6,Q), (r,E), (c6,E)])
  ##Line18
  pokemon.append([(d5,E), (r,Qd), (c7,Qt), (c7,Qt), (b6,Qt)])
  #pokemon.append([(b4,MEASURE), (a4,MEASURE)])
  #pokemon.append([(g4,MEASURE), (a4,MEASURE)])
  ##Line6
  pokemon.append([(g5,Q), (g5,Q), (r,E), (g5,S), (g5,S), (g5,Q), (f5,Et), (f5,Et), (f5,Et), (f5,Et), (f5,Et), (f5,Et), (e5,Et), (f5,Et), (fis5,Et), (g5,Q)])
  #pokemon.append([(f5,Et), (f5,Et), (f5,Et), (e5,Et), (f5,Et), (fis5,Et), (g5,Q), (r,Q)])

  print("uploading songs")
  for i in pokemon:
	 
  	print("Part: " +str(counter))
	robot.setSong( 1, i )
	robot.playSongNumber(1)
	if (counter == 18):
		time.sleep(MEASURE_TIME*1.01)
	else:
		time.sleep(MEASURE_TIME*2.01)
	counter += 1
 	
   
  




