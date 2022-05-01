/*********************************************************************
 *
 * Software License Agreement (BSD License)
 *
 *  Copyright (c) 2012, Robert Bosch LLC.
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions
 *  are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above
 *     copyright notice, this list of conditions and the following
 *     disclaimer in the documentation and/or other materials provided
 *     with the distribution.
 *   * Neither the name of the Robert Bosch nor the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 *  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 *  FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 *  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 *  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 *  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 *
 *********************************************************************/

#include "ros/ros.h"
#include "std_msgs/String.h"
#include "std_msgs/Int64MultiArray.h"
#include "std_msgs/MultiArrayLayout.h"
#include "std_msgs/MultiArrayDimension.h"
#include "nav_msgs/OccupancyGrid.h"
#include "map_compressor/CompressedOccupancyGrid.h"
#include <vector>
#include <sstream>

ros::Publisher comp_map_pub;

void compressCallback(const nav_msgs::OccupancyGrid::ConstPtr& msg)
{
  ROS_INFO("Map width: [%d]\n Map height: [%d] ", msg->info.width, msg->info.height);
  uint32_t w = msg->info.width;
  uint32_t h = msg->info.height;
  uint32_t s_uncomp = w*h;
  uint32_t c0 = 0;
  uint32_t c1 = 0;
  uint32_t c2 = 0;
  int8_t current_val = msg->data[0];
  int8_t prev_val = msg->data[0];
  uint64_t count = 0;
  int num_switch = 0;
  std::vector<int64_t> compressed_data;
  map_compressor::CompressedOccupancyGrid compressed_map;
  
  for(uint32_t i=0; i<s_uncomp; i++){
    
    current_val = msg->data[i];
    
    if(current_val == -1)c0++;
    else if(current_val == 100)c1++;
    else if(current_val == 0)c2++;

    if(current_val != prev_val){
      num_switch++;
      //ROS_INFO("%d %ds;", count, prev_val);

      compressed_data.push_back(count);
      compressed_data.push_back((int64_t)prev_val);      

      count=0;
      prev_val = current_val;
    }
       
    count++;  
  }

  // Let's pack and publish our compressed map
  compressed_map.header = msg->header;
  compressed_map.info = msg->info;
  compressed_map.data = compressed_data;
  
  ROS_INFO("Map histogram:\n[%d] -1s,\n[%d] 100s,\n[%d] 0s ", c0, c1, c2);

  ROS_INFO("Map size before compression: %d\n", s_uncomp);
  
  ROS_INFO("Grid value changed %d times\n", (int)(compressed_data.size()/2));

  //for(uint32_t i=0; i<compressed_data.size()-1; i+=2){
  //  printf("[%d]: %d; ",compressed_data[i], compressed_data[i+1]);
  //}

  comp_map_pub.publish(compressed_map);
    
}

int main(int argc, char **argv)
{
  ros::init(argc, argv, "map_compressor");
  ros::NodeHandle n;
  ros::Subscriber map_sub = n.subscribe("map",1,compressCallback);
  comp_map_pub = n.advertise<map_compressor::CompressedOccupancyGrid>("compressed_map",1);
  ros::spin();
  return 0;
}
