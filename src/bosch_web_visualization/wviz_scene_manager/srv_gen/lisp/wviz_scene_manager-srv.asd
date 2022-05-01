
(cl:in-package :asdf)

(defsystem "wviz_scene_manager-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "AddMarker" :depends-on ("_package_AddMarker"))
    (:file "_package_AddMarker" :depends-on ("_package"))
    (:file "RemoveMarker" :depends-on ("_package_RemoveMarker"))
    (:file "_package_RemoveMarker" :depends-on ("_package"))
  ))