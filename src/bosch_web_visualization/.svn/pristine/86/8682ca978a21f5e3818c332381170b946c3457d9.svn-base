#include <ros/ros.h>
#include <math.h>
#include <sensor_msgs/PointCloud2.h>
#include <pcl/point_types.h>
#include <pcl_ros/point_cloud.h>
#include <pcl/filters/voxel_grid.h>
#include <pointcloud_snapshot_service/PointCloudSnapShot.h>
#include "pcl_ros/transforms.h"
#include <tf/transform_listener.h>

class PclSnapshot{
public:
  ros::NodeHandle nh_;
  
  ros::Publisher snapshot_pub;
  ros::ServiceServer snapshot_server;
  pcl::VoxelGrid<sensor_msgs::PointCloud2> filter;
  tf::TransformListener tf_listener_;

  PclSnapshot():
    nh_("/"), tf_listener_(ros::Duration(20))
  {
    snapshot_pub=nh_.advertise<sensor_msgs::PointCloud2>("/pointcloud_snapshot_service/pointcloud", 1);
    snapshot_server=nh_.advertiseService("pointcloud_snapshot_server/pointcloud_snapshot", &PclSnapshot::take_snapshot, this);
    ros::Duration(1.0).sleep();

   sensor_msgs::PointCloud2ConstPtr cloud2_ptrtemp = ros::topic::waitForMessage<sensor_msgs::PointCloud2>("/camera/rgb/points");
bool found_transform = tf_listener_.waitForTransform(cloud2_ptrtemp->header.frame_id, "/base_link",
	                                                 cloud2_ptrtemp->header.stamp, ros::Duration(10.0));

  }
  bool take_snapshot(pointcloud_snapshot_service::PointCloudSnapShot::Request &req,
		   pointcloud_snapshot_service::PointCloudSnapShot::Response &res)
  {
	
    //sensor_msgs::PointCloud2 cloud; 
    sensor_msgs::PointCloud2 transformed_cloud;   
    sensor_msgs::PointCloud2ConstPtr cloud2_ptr= ros::topic::waitForMessage<sensor_msgs::PointCloud2>(req.message_name.c_str(), ros::Duration(10.0));

    //get the transform between base_link and cloud frame
    

      bool found_transform = tf_listener_.waitForTransform(cloud2_ptr->header.frame_id, "/base_link",
	                                                 cloud2_ptr->header.stamp, ros::Duration(10.0));

      ros::Time n = ros::Time::now();
      ROS_INFO("cloud time %d %d , now %d %d", cloud2_ptr->header.stamp.sec, cloud2_ptr->header.stamp.nsec, n.sec, n.nsec);
      
      
      tf::StampedTransform transform;
      if (found_transform)
	{
	  tf_listener_.lookupTransform("/odom_combined",cloud2_ptr->header.frame_id, cloud2_ptr->header.stamp, transform);
	  pcl_ros::transformPointCloud("/odom_combined", transform, *cloud2_ptr, transformed_cloud);
	}
      else
	{
	  ROS_INFO("[ExtractClusters:] No transform found between %s and base_link", cloud2_ptr->header.frame_id.c_str());
	  res.success=false;
	  return false;
	}
    
    sensor_msgs::PointCloud2 cloud_filtered;

    filter.setInputCloud(boost::make_shared<sensor_msgs::PointCloud2>(transformed_cloud));
    filter.setLeafSize(0.01f, 0.01f, 0.01f);
    filter.filter(cloud_filtered);
    

    snapshot_pub.publish(cloud_filtered);
    res.success=true;
    return true;}

};



int main(int argc, char** argv)
{
	ros::init(argc, argv, "pointcloud_snapshot_server");
	PclSnapshot snapshot;
	ros::Duration(1.0).sleep();
	ros::spin();
}
