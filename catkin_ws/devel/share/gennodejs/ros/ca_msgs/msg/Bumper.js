// Auto-generated. Do not edit!

// (in-package ca_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class Bumper {
  constructor() {
    this.header = new std_msgs.msg.Header();
    this.is_left_pressed = false;
    this.is_right_pressed = false;
    this.is_light_left = false;
    this.is_light_front_left = false;
    this.is_light_center_left = false;
    this.is_light_center_right = false;
    this.is_light_front_right = false;
    this.is_light_right = false;
    this.light_signal_left = 0;
    this.light_signal_front_left = 0;
    this.light_signal_center_left = 0;
    this.light_signal_center_right = 0;
    this.light_signal_front_right = 0;
    this.light_signal_right = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type Bumper
    // Serialize message field [header]
    bufferInfo = std_msgs.msg.Header.serialize(obj.header, bufferInfo);
    // Serialize message field [is_left_pressed]
    bufferInfo = _serializer.bool(obj.is_left_pressed, bufferInfo);
    // Serialize message field [is_right_pressed]
    bufferInfo = _serializer.bool(obj.is_right_pressed, bufferInfo);
    // Serialize message field [is_light_left]
    bufferInfo = _serializer.bool(obj.is_light_left, bufferInfo);
    // Serialize message field [is_light_front_left]
    bufferInfo = _serializer.bool(obj.is_light_front_left, bufferInfo);
    // Serialize message field [is_light_center_left]
    bufferInfo = _serializer.bool(obj.is_light_center_left, bufferInfo);
    // Serialize message field [is_light_center_right]
    bufferInfo = _serializer.bool(obj.is_light_center_right, bufferInfo);
    // Serialize message field [is_light_front_right]
    bufferInfo = _serializer.bool(obj.is_light_front_right, bufferInfo);
    // Serialize message field [is_light_right]
    bufferInfo = _serializer.bool(obj.is_light_right, bufferInfo);
    // Serialize message field [light_signal_left]
    bufferInfo = _serializer.uint16(obj.light_signal_left, bufferInfo);
    // Serialize message field [light_signal_front_left]
    bufferInfo = _serializer.uint16(obj.light_signal_front_left, bufferInfo);
    // Serialize message field [light_signal_center_left]
    bufferInfo = _serializer.uint16(obj.light_signal_center_left, bufferInfo);
    // Serialize message field [light_signal_center_right]
    bufferInfo = _serializer.uint16(obj.light_signal_center_right, bufferInfo);
    // Serialize message field [light_signal_front_right]
    bufferInfo = _serializer.uint16(obj.light_signal_front_right, bufferInfo);
    // Serialize message field [light_signal_right]
    bufferInfo = _serializer.uint16(obj.light_signal_right, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type Bumper
    let tmp;
    let len;
    let data = new Bumper();
    // Deserialize message field [header]
    tmp = std_msgs.msg.Header.deserialize(buffer);
    data.header = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [is_left_pressed]
    tmp = _deserializer.bool(buffer);
    data.is_left_pressed = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [is_right_pressed]
    tmp = _deserializer.bool(buffer);
    data.is_right_pressed = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [is_light_left]
    tmp = _deserializer.bool(buffer);
    data.is_light_left = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [is_light_front_left]
    tmp = _deserializer.bool(buffer);
    data.is_light_front_left = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [is_light_center_left]
    tmp = _deserializer.bool(buffer);
    data.is_light_center_left = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [is_light_center_right]
    tmp = _deserializer.bool(buffer);
    data.is_light_center_right = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [is_light_front_right]
    tmp = _deserializer.bool(buffer);
    data.is_light_front_right = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [is_light_right]
    tmp = _deserializer.bool(buffer);
    data.is_light_right = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [light_signal_left]
    tmp = _deserializer.uint16(buffer);
    data.light_signal_left = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [light_signal_front_left]
    tmp = _deserializer.uint16(buffer);
    data.light_signal_front_left = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [light_signal_center_left]
    tmp = _deserializer.uint16(buffer);
    data.light_signal_center_left = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [light_signal_center_right]
    tmp = _deserializer.uint16(buffer);
    data.light_signal_center_right = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [light_signal_front_right]
    tmp = _deserializer.uint16(buffer);
    data.light_signal_front_right = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [light_signal_right]
    tmp = _deserializer.uint16(buffer);
    data.light_signal_right = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'ca_msgs/Bumper';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '18fe5b1d31e6a8db180b924157ac665e';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Header header
    
    # Contact sensors
    bool is_left_pressed
    bool is_right_pressed
    
    # Bumper light sensors (Create 2 only) in order from left to right
    # Value = true if an obstacle detected
    bool is_light_left
    bool is_light_front_left
    bool is_light_center_left
    bool is_light_center_right
    bool is_light_front_right
    bool is_light_right
    
    # Raw light sensor signals
    # Values in range [0, 4095]
    uint16 light_signal_left
    uint16 light_signal_front_left
    uint16 light_signal_center_left
    uint16 light_signal_center_right
    uint16 light_signal_front_right
    uint16 light_signal_right
    
    ================================================================================
    MSG: std_msgs/Header
    # Standard metadata for higher-level stamped data types.
    # This is generally used to communicate timestamped data 
    # in a particular coordinate frame.
    # 
    # sequence ID: consecutively increasing ID 
    uint32 seq
    #Two-integer timestamp that is expressed as:
    # * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')
    # * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')
    # time-handling sugar is provided by the client library
    time stamp
    #Frame this data is associated with
    # 0: no frame
    # 1: global frame
    string frame_id
    
    `;
  }

};

module.exports = Bumper;
