
(cl:in-package :asdf)

(defsystem "map_compressor-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :nav_msgs-msg
               :std_msgs-msg
)
  :components ((:file "_package")
    (:file "CompressedOccupancyGrid" :depends-on ("_package_CompressedOccupancyGrid"))
    (:file "_package_CompressedOccupancyGrid" :depends-on ("_package"))
  ))