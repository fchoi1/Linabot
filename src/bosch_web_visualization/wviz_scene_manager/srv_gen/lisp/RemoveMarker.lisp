; Auto-generated. Do not edit!


(cl:in-package wviz_scene_manager-srv)


;//! \htmlinclude RemoveMarker-request.msg.html

(cl:defclass <RemoveMarker-request> (roslisp-msg-protocol:ros-message)
  ((topic
    :reader topic
    :initarg :topic
    :type cl:string
    :initform ""))
)

(cl:defclass RemoveMarker-request (<RemoveMarker-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <RemoveMarker-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'RemoveMarker-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name wviz_scene_manager-srv:<RemoveMarker-request> is deprecated: use wviz_scene_manager-srv:RemoveMarker-request instead.")))

(cl:ensure-generic-function 'topic-val :lambda-list '(m))
(cl:defmethod topic-val ((m <RemoveMarker-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader wviz_scene_manager-srv:topic-val is deprecated.  Use wviz_scene_manager-srv:topic instead.")
  (topic m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <RemoveMarker-request>) ostream)
  "Serializes a message object of type '<RemoveMarker-request>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'topic))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'topic))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <RemoveMarker-request>) istream)
  "Deserializes a message object of type '<RemoveMarker-request>"
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
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<RemoveMarker-request>)))
  "Returns string type for a service object of type '<RemoveMarker-request>"
  "wviz_scene_manager/RemoveMarkerRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'RemoveMarker-request)))
  "Returns string type for a service object of type 'RemoveMarker-request"
  "wviz_scene_manager/RemoveMarkerRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<RemoveMarker-request>)))
  "Returns md5sum for a message object of type '<RemoveMarker-request>"
  "d8f94bae31b356b24d0427f80426d0c3")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'RemoveMarker-request)))
  "Returns md5sum for a message object of type 'RemoveMarker-request"
  "d8f94bae31b356b24d0427f80426d0c3")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<RemoveMarker-request>)))
  "Returns full string definition for message of type '<RemoveMarker-request>"
  (cl:format cl:nil "string topic~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'RemoveMarker-request)))
  "Returns full string definition for message of type 'RemoveMarker-request"
  (cl:format cl:nil "string topic~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <RemoveMarker-request>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'topic))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <RemoveMarker-request>))
  "Converts a ROS message object to a list"
  (cl:list 'RemoveMarker-request
    (cl:cons ':topic (topic msg))
))
;//! \htmlinclude RemoveMarker-response.msg.html

(cl:defclass <RemoveMarker-response> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass RemoveMarker-response (<RemoveMarker-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <RemoveMarker-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'RemoveMarker-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name wviz_scene_manager-srv:<RemoveMarker-response> is deprecated: use wviz_scene_manager-srv:RemoveMarker-response instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <RemoveMarker-response>) ostream)
  "Serializes a message object of type '<RemoveMarker-response>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <RemoveMarker-response>) istream)
  "Deserializes a message object of type '<RemoveMarker-response>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<RemoveMarker-response>)))
  "Returns string type for a service object of type '<RemoveMarker-response>"
  "wviz_scene_manager/RemoveMarkerResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'RemoveMarker-response)))
  "Returns string type for a service object of type 'RemoveMarker-response"
  "wviz_scene_manager/RemoveMarkerResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<RemoveMarker-response>)))
  "Returns md5sum for a message object of type '<RemoveMarker-response>"
  "d8f94bae31b356b24d0427f80426d0c3")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'RemoveMarker-response)))
  "Returns md5sum for a message object of type 'RemoveMarker-response"
  "d8f94bae31b356b24d0427f80426d0c3")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<RemoveMarker-response>)))
  "Returns full string definition for message of type '<RemoveMarker-response>"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'RemoveMarker-response)))
  "Returns full string definition for message of type 'RemoveMarker-response"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <RemoveMarker-response>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <RemoveMarker-response>))
  "Converts a ROS message object to a list"
  (cl:list 'RemoveMarker-response
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'RemoveMarker)))
  'RemoveMarker-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'RemoveMarker)))
  'RemoveMarker-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'RemoveMarker)))
  "Returns string type for a service object of type '<RemoveMarker>"
  "wviz_scene_manager/RemoveMarker")