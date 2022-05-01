; Auto-generated. Do not edit!


(cl:in-package wviz_tf_manager-srv)


;//! \htmlinclude PublishAllTransforms-request.msg.html

(cl:defclass <PublishAllTransforms-request> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass PublishAllTransforms-request (<PublishAllTransforms-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <PublishAllTransforms-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'PublishAllTransforms-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name wviz_tf_manager-srv:<PublishAllTransforms-request> is deprecated: use wviz_tf_manager-srv:PublishAllTransforms-request instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <PublishAllTransforms-request>) ostream)
  "Serializes a message object of type '<PublishAllTransforms-request>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <PublishAllTransforms-request>) istream)
  "Deserializes a message object of type '<PublishAllTransforms-request>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<PublishAllTransforms-request>)))
  "Returns string type for a service object of type '<PublishAllTransforms-request>"
  "wviz_tf_manager/PublishAllTransformsRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'PublishAllTransforms-request)))
  "Returns string type for a service object of type 'PublishAllTransforms-request"
  "wviz_tf_manager/PublishAllTransformsRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<PublishAllTransforms-request>)))
  "Returns md5sum for a message object of type '<PublishAllTransforms-request>"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'PublishAllTransforms-request)))
  "Returns md5sum for a message object of type 'PublishAllTransforms-request"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<PublishAllTransforms-request>)))
  "Returns full string definition for message of type '<PublishAllTransforms-request>"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'PublishAllTransforms-request)))
  "Returns full string definition for message of type 'PublishAllTransforms-request"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <PublishAllTransforms-request>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <PublishAllTransforms-request>))
  "Converts a ROS message object to a list"
  (cl:list 'PublishAllTransforms-request
))
;//! \htmlinclude PublishAllTransforms-response.msg.html

(cl:defclass <PublishAllTransforms-response> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass PublishAllTransforms-response (<PublishAllTransforms-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <PublishAllTransforms-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'PublishAllTransforms-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name wviz_tf_manager-srv:<PublishAllTransforms-response> is deprecated: use wviz_tf_manager-srv:PublishAllTransforms-response instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <PublishAllTransforms-response>) ostream)
  "Serializes a message object of type '<PublishAllTransforms-response>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <PublishAllTransforms-response>) istream)
  "Deserializes a message object of type '<PublishAllTransforms-response>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<PublishAllTransforms-response>)))
  "Returns string type for a service object of type '<PublishAllTransforms-response>"
  "wviz_tf_manager/PublishAllTransformsResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'PublishAllTransforms-response)))
  "Returns string type for a service object of type 'PublishAllTransforms-response"
  "wviz_tf_manager/PublishAllTransformsResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<PublishAllTransforms-response>)))
  "Returns md5sum for a message object of type '<PublishAllTransforms-response>"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'PublishAllTransforms-response)))
  "Returns md5sum for a message object of type 'PublishAllTransforms-response"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<PublishAllTransforms-response>)))
  "Returns full string definition for message of type '<PublishAllTransforms-response>"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'PublishAllTransforms-response)))
  "Returns full string definition for message of type 'PublishAllTransforms-response"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <PublishAllTransforms-response>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <PublishAllTransforms-response>))
  "Converts a ROS message object to a list"
  (cl:list 'PublishAllTransforms-response
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'PublishAllTransforms)))
  'PublishAllTransforms-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'PublishAllTransforms)))
  'PublishAllTransforms-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'PublishAllTransforms)))
  "Returns string type for a service object of type '<PublishAllTransforms>"
  "wviz_tf_manager/PublishAllTransforms")