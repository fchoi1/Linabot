// Auto-generated. Do not edit!

// (in-package ca_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class ChargingState {
  constructor() {
    this.header = new std_msgs.msg.Header();
    this.state = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type ChargingState
    // Serialize message field [header]
    bufferInfo = std_msgs.msg.Header.serialize(obj.header, bufferInfo);
    // Serialize message field [state]
    bufferInfo = _serializer.uint8(obj.state, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type ChargingState
    let tmp;
    let len;
    let data = new ChargingState();
    // Deserialize message field [header]
    tmp = std_msgs.msg.Header.deserialize(buffer);
    data.header = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [state]
    tmp = _deserializer.uint8(buffer);
    data.state = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'ca_msgs/ChargingState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'e4da1ef814a2def80691224a5e5883ea';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    uint8 CHARGE_NONE=0
    uint8 CHARGE_RECONDITION=1
    uint8 CHARGE_FULL=2
    uint8 CHARGE_TRICKLE=3
    uint8 CHARGE_WAITING=4
    uint8 CHARGE_FAULT=5
    
    Header header
    uint8 state
    
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
ChargingState.Constants = {
  CHARGE_NONE: 0,
  CHARGE_RECONDITION: 1,
  CHARGE_FULL: 2,
  CHARGE_TRICKLE: 3,
  CHARGE_WAITING: 4,
  CHARGE_FAULT: 5,
}

module.exports = ChargingState;
