cmake_minimum_required(VERSION 2.8.0) # Version is important! Use at least 2.8.0
project(remote_lab_examples)

# The following command generates <package-name>-config.cmake and <package-name>-config-version.cmake files and puts them under package-name/catkin directory so that cmake can find them when they are installed.
#
# Put package names that used to be defined in manifest.xml here.
#
# If you will generate messages and services, you should add 'genmsg'.
#
catkin_project(${PROJECT_NAME} DEPENDS catkin rosjs_common rosjs_resources rosjs_visualization rosjs_remotelabwidgets visualization_msgs pr2_pick_and_place_service pointcloud_snapshot_service)

# We list find_package-able ROS packages' names here and skip the ones that are not catkinized yet.
find_package(ROS REQUIRED COMPONENTS catkin rosjs_common rosjs_resources rosjs_visualization rosjs_remotelabwidgets visualization_msgs pr2_pick_and_place_service pointcloud_snapshot_service)

# !!! This package actually requires:
#
# 1. pr2_interactive_manipulation
# 2. rosbridge
# 3. robot_mechanism_controllers
#
# package but since they are not find_package-able (yet) we don't put its name after DEPENDS.

if (NOT ROS_FOUND)
  message(FATAL_ERROR "Didn't manage to find ROS components. Did you put e.g. /opt/ros/fuerte (or wherever) in your CMAKE_PREFIX_PATH?")
endif()

# Build remote_lab_examples
execute_process(COMMAND cmake -E chdir ${PROJECT_SOURCE_DIR} make -f Makefile.remote_lab_examples RESULT_VARIABLE _make_failed)

if(_make_failed)
  message(FATAL_ERROR "Build of wviz failed")
endif(_make_failed)

# Let's install html files
install(FILES cameraview.html
  empty_grid.html
  mjpeg_iframe_web.html
  only_robot.html
  remote_lab_interface.html
  wviz.html
  wviz_3donly.html
  wviz_control.html
  wviz_control_demo.html
  wviz_interactivemanip.html
  wviz_loggingTopics.html
  wviz_puppet.html
  wviz_sim.html
  wviz_vizonly.html DESTINATION share/${PROJECT_NAME})

# Let's install our directories
install(DIRECTORY css/ DESTINATION share/${PROJECT_NAME}/css PATTERN ".svn" EXCLUDE)
install(DIRECTORY data/ DESTINATION share/${PROJECT_NAME}/data PATTERN ".svn" EXCLUDE)
install(DIRECTORY images/ DESTINATION share/${PROJECT_NAME}/images PATTERN ".svn" EXCLUDE)
install(DIRECTORY js/ DESTINATION share/${PROJECT_NAME}/js PATTERN ".svn" EXCLUDE)
install(DIRECTORY launch/ DESTINATION share/${PROJECT_NAME}/launch PATTERN ".svn" EXCLUDE)
install(DIRECTORY mk/ DESTINATION share/${PROJECT_NAME}/mk PATTERN ".svn" EXCLUDE)
install(DIRECTORY resources/ DESTINATION share/${PROJECT_NAME}/resources PATTERN ".svn" EXCLUDE)
install(DIRECTORY scripts/ DESTINATION share/${PROJECT_NAME}/scripts PATTERN ".svn" EXCLUDE)


#Finally let's install our manifest and setup file
install(FILES manifest.xml DESTINATION share/${PROJECT_NAME})

install(FILES setup.sh DESTINATION share/${PROJECT_NAME})