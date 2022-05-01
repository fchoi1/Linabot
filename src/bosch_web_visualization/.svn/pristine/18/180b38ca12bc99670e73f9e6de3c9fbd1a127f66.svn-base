/*********************************************************************
 *
 * Software License Agreement (BSD License)
 *
 *  Copyright (c) 2010, Robert Bosch LLC.
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
#include "wviz_scene_manager/wviz_scene_manager.h"
#include <wviz_scene_manager/VisualizationScene.h>

namespace wviz_scene_manager {

Scene::Scene() : is_dirty_(false)
{
}

SceneManager::SceneManager(ros::NodeHandle& node) :
  node_(node)
{
  ros::NodeHandle private_node("~");

  scene_pub_ = node_.advertise<wviz_scene_manager::VisualizationScene>("scene", 5);
  add_marker_srv_ = private_node.advertiseService("add_marker", &SceneManager::addMarker, this);
  remove_marker_srv_ = private_node.advertiseService("remove_marker", &SceneManager::removeMarker, this);
}

SceneManager::~SceneManager()
{
}

void SceneManager::visualizationMarkerCallback(const visualization_msgs::MarkerConstPtr& marker)
{
  boost::unique_lock<boost::mutex> lock(scene_.mutex_);
  std::string marker_id = getMarkerStringID(*marker);
  int marker_action = marker->action;

  if (marker_action == visualization_msgs::Marker::DELETE) {
    ROS_INFO("Deleting marker with id %s", marker_id.c_str());
    scene_.visualization_markers_.erase(marker_id);
  }
  else if (marker_action == visualization_msgs::Marker::ADD ||
           marker_action == visualization_msgs::Marker::MODIFY ) {
    ROS_INFO("Adding marker with id %s", marker_id.c_str());
    scene_.visualization_markers_.erase(marker_id);
    scene_.visualization_markers_.insert(std::make_pair(marker_id,*marker));
  }
  scene_.is_dirty_ = true;
}

bool SceneManager::addMarker(wviz_scene_manager::AddMarker::Request& req, wviz_scene_manager::AddMarker::Response& resp)
{
  std::string topic = req.topic;
  ROS_INFO("Adding subscriber for %s", topic.c_str());
  visualization_marker_subscribers_[topic] = node_.subscribe(topic, 10, &SceneManager::visualizationMarkerCallback, this);
  return true;
}

bool SceneManager::removeMarker(wviz_scene_manager::RemoveMarker::Request& req, wviz_scene_manager::RemoveMarker::Response& resp)
{
  std::string topic = req.topic;
  ROS_INFO("Removing subscriber for %s", topic.c_str());
  visualization_marker_subscribers_.erase(topic);
  return true;
}

void SceneManager::spin()
{
  ros::Rate r(10); // 100 ms or 10 Hz
  while (node_.ok())
  {
    scene_.mutex_.lock();

    // if scene is dirty publish it!
    if(scene_.is_dirty_) {
      VisualizationScene scene_msg;
      std::map<std::string,visualization_msgs::Marker>::iterator it = scene_.visualization_markers_.begin();
      for(;it!=scene_.visualization_markers_.end();it++) {
        scene_msg.markers.push_back(it->second);
      }
      ROS_INFO("Sending a scene with %d markers.", (int)scene_.visualization_markers_.size());
      scene_pub_.publish(scene_msg);
      scene_.is_dirty_ = false;
    }

    scene_.mutex_.unlock();
    ros::spinOnce();
    r.sleep();
  }
}

std::string SceneManager::getMarkerStringID(const visualization_msgs::Marker& marker)
{
  std::stringstream ss;
  ss << marker.ns << "/" << marker.id;
  return ss.str();
}

}

int main(int argc, char** argv)
{
  ros::init(argc, argv, "wviz_scene_manager");

  ros::NodeHandle nh;
  wviz_scene_manager::SceneManager manager(nh);
  manager.spin();

  return(0);
}


