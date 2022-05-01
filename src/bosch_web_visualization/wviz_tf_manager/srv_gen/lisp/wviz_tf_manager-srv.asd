
(cl:in-package :asdf)

(defsystem "wviz_tf_manager-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "PublishAllTransforms" :depends-on ("_package_PublishAllTransforms"))
    (:file "_package_PublishAllTransforms" :depends-on ("_package"))
  ))