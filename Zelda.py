# Taken from
# https://gist.github.com/thenoviceoof/5465084
# but modified to work on my Roomba 770

import time
import create
from multiprocessing import Process

ROOMBA_PORT = "/dev/ttyUSB1"

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

# define some note lengths
# change the top MEASURE (4/4 time) to get faster/slower speeds
MEASURE = 150
HALF = MEASURE/2
HALFd = MEASURE*3/4
Q = MEASURE/4
Qd = MEASURE*3/8
E = MEASURE/8
Ed = MEASURE*3/16
S = MEASURE/16
Z1 = HALF + E
Z2 = HALFd + E
Z3 = Q/3  
MEASURE_TIME = MEASURE/64.



def play_Zelda(robot):



  Zelda1 = [(bes4,Z1), (f4,E), (f4,E), (bes4,E), (gis4,S), (ges4,S), (gis4,Z2), (bes4, Z1), (ges4,E), (ges4,E), (bes4,E), (a4,S), (g4,S), (a4,Z1)]
  
  Zelda2 = [(bes4,Q),(f4,Qd),(bes4,E),(bes4,S),(c5,S),(d5,S),(ees5,S),(f5,HALF),(f5,E),(f5,E),(f5,Z3),(ges5,Z3),(aes5,Z3)]
  
  Zelda3 = [(bes5,Z1),(bes5,E),(bes5,Z3),(aes5,Z3),(ges5,Z3),(aes5,Ed),(ges5,S),(f5,HALF),(f5,Q)]
  
  Zelda4 = [(ees5,Ed),(f5,S),(ges5,HALF),(f5,E),(ees5,E),(des5,Ed),(ees5,S),(f5,HALF),(ees5,E),(des5,E)]
  
  Zelda5 = [(c5,Ed),(d5,S),(e5,HALF),(g5,Q),(f5,E),(des4,S),(des4,S),(des4,E),(des4,S),(des4,S),(des4,E),(des4,S),(des4,S),(des4,E),(des4,E)]
  


  robot.setSong( 1, Zelda1 )
  robot.setSong( 2, Zelda2 )
  robot.setSong( 3, Zelda3 )
  robot.setSong( 4, Zelda4 )
  robot.setSong( 5, Zelda5 )
  
  time.sleep(4)
  print("playing part 1")
  robot.playSongNumber(1)
  time.sleep(MEASURE_TIME*3.76)
  print("playing part 2")
  robot.playSongNumber(2)
  time.sleep(MEASURE_TIME*2.04)
  print("playing part 3")
  robot.playSongNumber(3)
  time.sleep(MEASURE_TIME*2.04)
  print("playing part 4")
  robot.playSongNumber(4)
  time.sleep(MEASURE_TIME*2.04)
  print("playing part 5")
  robot.playSongNumber(5)
  time.sleep(MEASURE_TIME*2.04)

robot = create.Create(ROOMBA_PORT)
robot.toSafeMode()
play_Zelda(robot)

robot.close()
