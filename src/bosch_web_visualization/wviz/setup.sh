#!/bin/sh

#Path to your rosbridge package
rosbridge_path=/path/to/your/localros/brown-ros-pkg/experimental/rosbridge

#Path to the remote_lab package
remotelab_path=/path/to/your/localros/bosch-ros-pkg/trunk/stacks/remote_lab

ln -sf $remotelab_path/rosjs_common/js/actionlib/ js/ros/rosactionlib
ln -sf $remotelab_path/rosjs_common/js/class.js js/ros/class.js
ln -sf $remotelab_path/rosjs_common/js/common.js js/ros/common.js
ln -sf $remotelab_path/rosjs_common/js/core/ js/ros/core
ln -sf $remotelab_path/rosjs_common/js/math/ js/ros/math
ln -sf $remotelab_path/rosjs_common/js/geometry/ js/ros/geometry
ln -sf $remotelab_path/rosjs_common/js/pcl/ js/ros/pcl
ln -sf $remotelab_path/rosjs_remotelabwidgets/js/remotelabwidgets js/ros/remotelabwidgets
ln -sf $rosbridge_path/ros.js js/ros/ros.js
ln -sf $remotelab_path/rosjs_common/js/roslib js/ros/roslib
ln -sf $remotelab_path/rosjs_common/js/system js/ros/system
ln -sf $remotelab_path/rosjs_common/js/tf js/ros/tf
ln -sf $remotelab_path/rosjs_common/js/urdf js/ros/urdf
ln -sf $remotelab_path/rosjs_visualization/js/visualization js/ros/visualization
ln -sf $remotelab_path/rosjs_visualization/js/binaryparser/ js/ros/binaryparser
ln -sf $remotelab_path/rosjs_common/js/widgets/ js/ros/widgets
ln -sf $remotelab_path/rosjs_pr2interaction/js/pr2interaction/ js/ros/pr2interaction
ln -sf $remotelab_path/rosjs_sharedautonomy/js/sharedautonomy/ js/ros/sharedautonomy

dir=$remotelab_path/rosjs_resources/resources

for file in `ls $dir`; do
   ln -sf $dir/$file resources/$file
done

dir=$remotelab_path/rosjs_resources/images
for file in `ls $dir`; do
   ln -sf $dir/$file images/$file
done

dir=$remotelab_path/rosjs_resources/js
for file in `ls $dir`; do
   ln -sf $dir/$file js/$file
done