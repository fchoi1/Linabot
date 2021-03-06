/*
 * Copyright (c) 2009, Willow Garage, Inc.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Willow Garage, Inc. nor the names of its
 *       contributors may be used to endorse or promote products derived from
 *       this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
#include <ros/ros.h>
#include <ping/Ping.h>
#include <ping/Pong.h>

namespace ping {

class PingServer {
public:
  PingServer(ros::NodeHandle& node);
  void pingCallback(const PingConstPtr& ping_msg_ptr);
private:
  ros::NodeHandle node_;
  ros::Publisher pub_;
  ros::Subscriber sub_;
};

PingServer::PingServer(ros::NodeHandle& node)
: node_(node)
{
  sub_ = node_.subscribe<Ping>("/ping", 100, &PingServer::pingCallback, this);
  pub_ = node_.advertise<Pong>("/pong", 1, true);
}

void PingServer::pingCallback(const PingConstPtr& ping_msg_ptr)
{
  Pong pong_msg;
  pong_msg.stamp = ping_msg_ptr->stamp;
  pong_msg.hash = ping_msg_ptr->hash;
  pub_.publish(pong_msg);
}

}

int main(int argc, char** argv)
{
  ros::init(argc, argv, "ping_server");
  ros::NodeHandle nh;
  ping::PingServer server(nh);
  ros::spin();
  return 0;
}
