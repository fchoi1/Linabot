// Auto-generated. Do not edit!

// (in-package ca_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class Mode {
  constructor() {
    this.header = new std_msgs.msg.Header();
    this.mode = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type Mode
    // Serialize message field [header]
    bufferInfo = std_msgs.msg.Header.serialize(obj.header, bufferInfo);
    // Serialize message field [mode]
    bufferInfo = _serializer.uint8(obj.mode, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type Mode
    let tmp;
    let len;
    let data = new Mode();
    // Deserialize message field [header]
    tmp = std_msgs.msg.Header.deserialize(buffer);
    data.header = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [mode]
    tmp = _deserializer.uint8(buffer);
    data.mode = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'ca_msgs/Mode';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'b4faf4b68b6555d4656417971bee31a0';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    uint8 MODE_OFF=0
    uint8 MODE_PASSIVE=1
    uint8 MODE_SAFE=2
    uint8 MODE_FULL=3
    
    Header header
    uint8 mode
    
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

// Constants for message
Mode.Constants = {
  MODE_OFF: 0,
  MODE_PASSIVE: 1,
  MODE_SAFE: 2,
  MODE_FULL: 3,
}

module.exports = Mode;
