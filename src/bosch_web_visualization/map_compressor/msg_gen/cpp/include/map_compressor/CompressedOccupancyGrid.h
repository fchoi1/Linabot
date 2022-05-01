/* Auto-generated by genmsg_cpp for file /home/ubuntu/workspace/src/bosch_web_visualization/map_compressor/msg/CompressedOccupancyGrid.msg */
#ifndef MAP_COMPRESSOR_MESSAGE_COMPRESSEDOCCUPANCYGRID_H
#define MAP_COMPRESSOR_MESSAGE_COMPRESSEDOCCUPANCYGRID_H
#include <string>
#include <vector>
#include <map>
#include <ostream>
#include "ros/serialization.h"
#include "ros/builtin_message_traits.h"
#include "ros/message_operations.h"
#include "ros/time.h"

#include "ros/macros.h"

#include "ros/assert.h"

#include "std_msgs/Header.h"
#include "nav_msgs/MapMetaData.h"

namespace map_compressor
{
template <class ContainerAllocator>
struct CompressedOccupancyGrid_ {
  typedef CompressedOccupancyGrid_<ContainerAllocator> Type;

  CompressedOccupancyGrid_()
  : header()
  , info()
  , data()
  {
  }

  CompressedOccupancyGrid_(const ContainerAllocator& _alloc)
  : header(_alloc)
  , info(_alloc)
  , data(_alloc)
  {
  }

  typedef  ::std_msgs::Header_<ContainerAllocator>  _header_type;
   ::std_msgs::Header_<ContainerAllocator>  header;

  typedef  ::nav_msgs::MapMetaData_<ContainerAllocator>  _info_type;
   ::nav_msgs::MapMetaData_<ContainerAllocator>  info;

  typedef std::vector<int64_t, typename ContainerAllocator::template rebind<int64_t>::other >  _data_type;
  std::vector<int64_t, typename ContainerAllocator::template rebind<int64_t>::other >  data;


  typedef boost::shared_ptr< ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator>  const> ConstPtr;
}; // struct CompressedOccupancyGrid
typedef  ::map_compressor::CompressedOccupancyGrid_<std::allocator<void> > CompressedOccupancyGrid;

typedef boost::shared_ptr< ::map_compressor::CompressedOccupancyGrid> CompressedOccupancyGridPtr;
typedef boost::shared_ptr< ::map_compressor::CompressedOccupancyGrid const> CompressedOccupancyGridConstPtr;


template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const  ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> & v)
{
  ros::message_operations::Printer< ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> >::stream(s, "", v);
  return s;}

} // namespace map_compressor

namespace ros
{
namespace message_traits
{
template<class ContainerAllocator> struct IsMessage< ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> > : public TrueType {};
template<class ContainerAllocator> struct IsMessage< ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator>  const> : public TrueType {};
template<class ContainerAllocator>
struct MD5Sum< ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> > {
  static const char* value() 
  {
    return "4a0685de3ed14662c76d0e78e9589b5c";
  }

  static const char* value(const  ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> &) { return value(); } 
  static const uint64_t static_value1 = 0x4a0685de3ed14662ULL;
  static const uint64_t static_value2 = 0xc76d0e78e9589b5cULL;
};

template<class ContainerAllocator>
struct DataType< ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> > {
  static const char* value() 
  {
    return "map_compressor/CompressedOccupancyGrid";
  }

  static const char* value(const  ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> &) { return value(); } 
};

template<class ContainerAllocator>
struct Definition< ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> > {
  static const char* value() 
  {
    return "std_msgs/Header header\n\
nav_msgs/MapMetaData info\n\
int64[] data\n\
================================================================================\n\
MSG: std_msgs/Header\n\
# Standard metadata for higher-level stamped data types.\n\
# This is generally used to communicate timestamped data \n\
# in a particular coordinate frame.\n\
# \n\
# sequence ID: consecutively increasing ID \n\
uint32 seq\n\
#Two-integer timestamp that is expressed as:\n\
# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')\n\
# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')\n\
# time-handling sugar is provided by the client library\n\
time stamp\n\
#Frame this data is associated with\n\
# 0: no frame\n\
# 1: global frame\n\
string frame_id\n\
\n\
================================================================================\n\
MSG: nav_msgs/MapMetaData\n\
# This hold basic information about the characterists of the OccupancyGrid\n\
\n\
# The time at which the map was loaded\n\
time map_load_time\n\
# The map resolution [m/cell]\n\
float32 resolution\n\
# Map width [cells]\n\
uint32 width\n\
# Map height [cells]\n\
uint32 height\n\
# The origin of the map [m, m, rad].  This is the real-world pose of the\n\
# cell (0,0) in the map.\n\
geometry_msgs/Pose origin\n\
================================================================================\n\
MSG: geometry_msgs/Pose\n\
# A representation of pose in free space, composed of position and orientation. \n\
Point position\n\
Quaternion orientation\n\
\n\
================================================================================\n\
MSG: geometry_msgs/Point\n\
# This contains the position of a point in free space\n\
float64 x\n\
float64 y\n\
float64 z\n\
\n\
================================================================================\n\
MSG: geometry_msgs/Quaternion\n\
# This represents an orientation in free space in quaternion form.\n\
\n\
float64 x\n\
float64 y\n\
float64 z\n\
float64 w\n\
\n\
";
  }

  static const char* value(const  ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> &) { return value(); } 
};

template<class ContainerAllocator> struct HasHeader< ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> > : public TrueType {};
template<class ContainerAllocator> struct HasHeader< const ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> > : public TrueType {};
} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

template<class ContainerAllocator> struct Serializer< ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> >
{
  template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
  {
    stream.next(m.header);
    stream.next(m.info);
    stream.next(m.data);
  }

  ROS_DECLARE_ALLINONE_SERIALIZER
}; // struct CompressedOccupancyGrid_
} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const  ::map_compressor::CompressedOccupancyGrid_<ContainerAllocator> & v) 
  {
    s << indent << "header: ";
s << std::endl;
    Printer< ::std_msgs::Header_<ContainerAllocator> >::stream(s, indent + "  ", v.header);
    s << indent << "info: ";
s << std::endl;
    Printer< ::nav_msgs::MapMetaData_<ContainerAllocator> >::stream(s, indent + "  ", v.info);
    s << indent << "data[]" << std::endl;
    for (size_t i = 0; i < v.data.size(); ++i)
    {
      s << indent << "  data[" << i << "]: ";
      Printer<int64_t>::stream(s, indent + "  ", v.data[i]);
    }
  }
};


} // namespace message_operations
} // namespace ros

#endif // MAP_COMPRESSOR_MESSAGE_COMPRESSEDOCCUPANCYGRID_H

