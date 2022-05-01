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
#ifndef SCENE_MANAGER_H_
#define SCENE_MANAGER_H_

#include <map>
#include <ros/ros.h>
#include <boost/thread/mutex.hpp>
#include <visualization_msgs/Marker.h>
#include <wviz_scene_manager/AddMarker.h>
#include <wviz_scene_manager/RemoveMarker.h>

namespace wviz_scene_manager {

/**
 * @class Scene
 * @brief
 */
class Scene {
public:
  Scene();
  std::map<std::string,visualization_msgs::Marker> visualization_markers_;
  boost::mutex mutex_;
  bool is_dirty_;
};

/**
 * @class SceneManager
 * @brief
 */
class SceneManager {
public:
  /**
   * @brief  Constructor
   * @return
   */
  SceneManager(ros::NodeHandle& node);

  /**
   * @brief  Destructor - Cleans up
   */
  virtual ~SceneManager();

  /**
   * @brief  Callback for visualization markers
   */
  void visualizationMarkerCallback(const visualization_msgs::MarkerConstPtr& marker);

  /**
   * @brief  adds a marker topic to the scene manager
   */
  bool addMarker(wviz_scene_manager::AddMarker::Request& req, wviz_scene_manager::AddMarker::Response& resp);

  /**
   * @brief  removes a marker topic from the scene manager
   */
  bool removeMarker(wviz_scene_manager::RemoveMarker::Request& req, wviz_scene_manager::RemoveMarker::Response& resp);

  /**
   * @brief  creates a marker id string from a marker message
   */
  std::string getMarkerStringID(const visualization_msgs::Marker& marker);

  /**
   * @brief  Starts the server and spins
   */
  void spin();
private:
  ros::NodeHandle node_;
  std::map<std::string,ros::Subscriber> visualization_marker_subscribers_;
  ros::Publisher scene_pub_;
  ros::ServiceServer add_marker_srv_;
  ros::ServiceServer remove_marker_srv_;
  Scene scene_;
};

}

#endif

