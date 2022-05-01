
# /*********************************************************************
#  *
#  * Software License Agreement (BSD License)
#  *
#  *  Copyright (c) 2012, Robert Bosch LLC.
#  *  All rights reserved.
#  *
#  *  Redistribution and use in source and binary forms, with or without
#  *  modification, are permitted provided that the following conditions
#  *  are met:
#  *
#  *   * Redistributions of source code must retain the above copyright
#  *     notice, this list of conditions and the following disclaimer.
#  *   * Redistributions in binary form must reproduce the above
#  *     copyright notice, this list of conditions and the following
#  *     disclaimer in the documentation and/or other materials provided
#  *     with the distribution.
#  *   * Neither the name of the Robert Bosch nor the names of its
#  *     contributors may be used to endorse or promote products derived
#  *     from this software without specific prior written permission.
#  *
#  *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
#  *  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
#  *  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
#  *  FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
#  *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
#  *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
#  *  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
#  *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
#  *  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
#  *  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
#  *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
#  *  POSSIBILITY OF SUCH DAMAGE.
#  *
#  *********************************************************************/

#!/usr/bin/env python
import roslib; roslib.load_manifest('wviz')
import rospy
import time

from std_msgs.msg import String
from pr2_pick_and_place_service.srv import *

def listener():
	rospy.init_node('test_service', anonymous=True)
    
	rospy.wait_for_service('pick_and_place_detect_object')
	try:
		detect_object = rospy.ServiceProxy('pick_and_place_detect_object', DetectObjects)
		resp1 = detect_object('d')
		print 'Service call succeeded'
		print 'Received %d objects' % (len(resp1.objects),)
	except rospy.ServiceException, e:
		print "Service call failed"
    
if __name__ == '__main__':
    listener()
