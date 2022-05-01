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

/**
 * A Module for remotelab widgets.
 * @namespace
 */
ros.remotelabwidgets = ros.remotelabwidgets || {};

// include all urdf files at once
ros.include('js/ros/remotelabwidgets/videowidget');
ros.include('js/ros/remotelabwidgets/mjpegwidget');
ros.include('js/ros/remotelabwidgets/pr2keycontrol');
ros.include('js/ros/remotelabwidgets/batterymonitorwidget');
ros.include('js/ros/remotelabwidgets/motorsmonitorwidget');
ros.include('js/ros/remotelabwidgets/circuitmonitorwidget');
ros.include('js/ros/remotelabwidgets/pr2_pickandplace_widget');
ros.include('js/ros/remotelabwidgets/pr2_pickandplace_widget_controller');
ros.include('js/ros/remotelabwidgets/pr2_interactivepickandplace_widget');
ros.include('js/ros/remotelabwidgets/fpscounterwidget');
ros.include('js/ros/remotelabwidgets/bitratewidget');
ros.include('js/ros/remotelabwidgets/bitrategraphwidget');
ros.include('js/ros/remotelabwidgets/pinggraphwidget');
ros.include('js/ros/remotelabwidgets/topicwidget');
ros.include('js/ros/remotelabwidgets/servicewidget');
ros.include('js/ros/remotelabwidgets/soundwidget');
ros.include('remotelabwidgets/snapshotwidget');
ros.include('js/ros/remotelabwidgets/runstopwidget');
ros.include('js/ros/remotelabwidgets/pr2_marker_control_widget');
ros.include('js/ros/remotelabwidgets/visualization_select_widget');
ros.include('js/ros/remotelabwidgets/loggerwidget');