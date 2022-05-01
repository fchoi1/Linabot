; Auto-generated. Do not edit!


(cl:in-package tf_lister-srv)


;//! \htmlinclude TfLister-request.msg.html

(cl:defclass <TfLister-request> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass TfLister-request (<TfLister-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TfLister-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TfLister-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name tf_lister-srv:<TfLister-request> is deprecated: use tf_lister-srv:TfLister-request instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TfLister-request>) ostream)
  "Serializes a message object of type '<TfLister-request>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TfLister-request>) istream)
  "Deserializes a message object of type '<TfLister-request>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TfLister-request>)))
  "Returns string type for a service object of type '<TfLister-request>"
  "tf_lister/TfListerRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TfLister-request)))
  "Returns string type for a service object of type 'TfLister-request"
  "tf_lister/TfListerRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TfLister-request>)))
  "Returns md5sum for a message object of type '<TfLister-request>"
  "71ff2010a39035e42d29fb248b2dd8fd")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TfLister-request)))
  "Returns md5sum for a message object of type 'TfLister-request"
  "71ff2010a39035e42d29fb248b2dd8fd")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TfLister-request>)))
  "Returns full string definition for message of type '<TfLister-request>"
  (cl:format cl:nil "~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TfLister-request)))
  "Returns full string definition for message of type 'TfLister-request"
  (cl:format cl:nil "~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TfLister-request>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TfLister-request>))
  "Converts a ROS message object to a list"
  (cl:list 'TfLister-request
))
;//! \htmlinclude TfLister-response.msg.html

(cl:defclass <TfLister-response> (roslisp-msg-protocol:ros-message)
  ((tf_list
    :reader tf_list
    :initarg :tf_list
    :type (cl:vector cl:string)
   :initform (cl:make-array 0 :element-type 'cl:string :initial-element "")))
)

(cl:defclass TfLister-response (<TfLister-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TfLister-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TfLister-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name tf_lister-srv:<TfLister-response> is deprecated: use tf_lister-srv:TfLister-response instead.")))

(cl:ensure-generic-function 'tf_list-val :lambda-list '(m))
(cl:defmethod tf_list-val ((m <TfLister-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader tf_lister-srv:tf_list-val is deprecated.  Use tf_lister-srv:tf_list instead.")
  (tf_list m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TfLister-response>) ostream)
  "Serializes a message object of type '<TfLister-response>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'tf_list))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let ((__ros_str_len (cl:length ele)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) ele))
   (cl:slot-value msg 'tf_list))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TfLister-response>) istream)
  "Deserializes a message object of type '<TfLister-response>"
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'tf_list) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'tf_list)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:aref vals i) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:aref vals i) __ros_str_idx) (cl:code-char (cl:read-byte istream))))))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TfLister-response>)))
  "Returns string type for a service object of type '<TfLister-response>"
  "tf_lister/TfListerResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TfLister-response)))
  "Returns string type for a service object of type 'TfLister-response"
  "tf_lister/TfListerResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TfLister-response>)))
  "Returns md5sum for a message object of type '<TfLister-response>"
  "71ff2010a39035e42d29fb248b2dd8fd")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TfLister-response)))
  "Returns md5sum for a message object of type 'TfLister-response"
  "71ff2010a39035e42d29fb248b2dd8fd")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TfLister-response>)))
  "Returns full string definition for message of type '<TfLister-response>"
  (cl:format cl:nil "string[] tf_list~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TfLister-response)))
  "Returns full string definition for message of type 'TfLister-response"
  (cl:format cl:nil "string[] tf_list~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TfLister-response>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'tf_list) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4 (cl:length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TfLister-response>))
  "Converts a ROS message object to a list"
  (cl:list 'TfLister-response
    (cl:cons ':tf_list (tf_list msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'TfLister)))
  'TfLister-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'TfLister)))
  'TfLister-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TfLister)))
  "Returns string type for a service object of type '<TfLister>"
  "tf_lister/TfLister")