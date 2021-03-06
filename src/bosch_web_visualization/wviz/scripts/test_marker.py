
# /*********************************************************************
#  *
#  * Software License Agreement (BSD License)
#  *
#  *  Copyright (c) 2010, Robert Bosch LLC.
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
from visualization_msgs.msg import Marker

def callback(marker):
    rospy.loginfo(rospy.get_name()+"Got a marker of type %d",marker.type)
    #time.sleep(10)

def listener():
    rospy.init_node('marker_listener', anonymous=True)
    rospy.Subscriber("/tabletop_detector_markers", Marker, callback)
    rospy.spin()

if __name__ == '__main__':
    listener()
