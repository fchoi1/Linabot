
(cl:in-package :asdf)

(defsystem "wviz_scene_manager-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :std_msgs-msg
               :visualization_msgs-msg
)
  :components ((:file "_package")
    (:file "VisualizationScene" :depends-on ("_package_VisualizationScene"))
    (:file "_package_VisualizationScene" :depends-on ("_package"))
  ))