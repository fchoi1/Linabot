; Auto-generated. Do not edit!


(cl:in-package wviz_scene_manager-srv)


;//! \htmlinclude AddMarker-request.msg.html

(cl:defclass <AddMarker-request> (roslisp-msg-protocol:ros-message)
  ((topic
    :reader topic
    :initarg :topic
    :type cl:string
    :initform ""))
)

(cl:defclass AddMarker-request (<AddMarker-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <AddMarker-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'AddMarker-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name wviz_scene_manager-srv:<AddMarker-request> is deprecated: use wviz_scene_manager-srv:AddMarker-request instead.")))

(cl:ensure-generic-function 'topic-val :lambda-list '(m))
(cl:defmethod topic-val ((m <AddMarker-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader wviz_scene_manager-srv:topic-val is deprecated.  Use wviz_scene_manager-srv:topic instead.")
  (topic m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <AddMarker-request>) ostream)
  "Serializes a message object of type '<AddMarker-request>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'topic))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'topic))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <AddMarker-request>) istream)
  "Deserializes a message object of type '<AddMarker-request>"
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'topic) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'topic) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<AddMarker-request>)))
  "Returns string type for a service object of type '<AddMarker-request>"
  "wviz_scene_manager/AddMarkerRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddMarker-request)))
  "Returns string type for a service object of type 'AddMarker-request"
  "wviz_scene_manager/AddMarkerRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<AddMarker-request>)))
  "Returns md5sum for a message object of type '<AddMarker-request>"
  "d8f94bae31b356b24d0427f80426d0c3")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'AddMarker-request)))
  "Returns md5sum for a message object of type 'AddMarker-request"
  "d8f94bae31b356b24d0427f80426d0c3")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<AddMarker-request>)))
  "Returns full string definition for message of type '<AddMarker-request>"
  (cl:format cl:nil "string topic~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'AddMarker-request)))
  "Returns full string definition for message of type 'AddMarker-request"
  (cl:format cl:nil "string topic~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <AddMarker-request>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'topic))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <AddMarker-request>))
  "Converts a ROS message object to a list"
  (cl:list 'AddMarker-request
    (cl:cons ':topic (topic msg))
))
;//! \htmlinclude AddMarker-response.msg.html

(cl:defclass <AddMarker-response> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass AddMarker-response (<AddMarker-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <AddMarker-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'AddMarker-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name wviz_scene_manager-srv:<AddMarker-response> is deprecated: use wviz_scene_manager-srv:AddMarker-response instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <AddMarker-response>) ostream)
  "Serializes a message object of type '<AddMarker-response>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <AddMarker-response>) istream)
  "Deserializes a message object of type '<AddMarker-response>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<AddMarker-response>)))
  "Returns string type for a service object of type '<AddMarker-response>"
  "wviz_scene_manager/AddMarkerResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddMarker-response)))
  "Returns string type for a service object of type 'AddMarker-response"
  "wviz_scene_manager/AddMarkerResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<AddMarker-response>)))
  "Returns md5sum for a message object of type '<AddMarker-response>"
  "d8f94bae31b356b24d0427f80426d0c3")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'AddMarker-response)))
  "Returns md5sum for a message object of type 'AddMarker-response"
  "d8f94bae31b356b24d0427f80426d0c3")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<AddMarker-response>)))
  "Returns full string definition for message of type '<AddMarker-response>"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'AddMarker-response)))
  "Returns full string definition for message of type 'AddMarker-response"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <AddMarker-response>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <AddMarker-response>))
  "Converts a ROS message object to a list"
  (cl:list 'AddMarker-response
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'AddMarker)))
  'AddMarker-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'AddMarker)))
  'AddMarker-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddMarker)))
  "Returns string type for a service object of type '<AddMarker>"
  "wviz_scene_manager/AddMarker")