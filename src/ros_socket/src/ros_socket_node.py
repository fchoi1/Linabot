#!/usr/bin/python
import socket
import rospy
from ros_socket.msg import robocom
import sys
import time 

s = socket.socket()

def callback(msg):
	global s
	robot_status = msg.robot_status
	client_ip = msg.client_ip
	try:
		s.connect((client_ip,9006))
		message = "In pos"
		s.sendall(message)
		while True:
			data = s.recv(1024)
			if not data: break
	except:
		print "Unexpected error:", sys.exc_info()[0]
	finally:
		s.close()
	print test, test2

def robot_status():
	rospy.init_node("robocom_listener",anonymous=True)
	rospy.Subscriber("robocom", robocom, callback)
	rospy.spin()

if __name__ == '__main__':
	try:
		#s.connect(('10.193.38.21',9006))
		print "connected"
		

		#Look for responce
		message = "In pos"
		amount_rec = 0
		amount_exp = len(message)
		'''
		while amount_rec < amount_exp:
			data = s.recv(16)
			amount_rec += len(data)
			print >>sys.stderr, 'received "%s"' % data
		'''      
		robot_status()
	except rospy.ROSInterruptException: pass

	finally:
		print >>sys.stderr, 'closing socket'




