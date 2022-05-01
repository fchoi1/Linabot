
(cl:in-package :asdf)

(defsystem "tf_lister-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "TfLister" :depends-on ("_package_TfLister"))
    (:file "_package_TfLister" :depends-on ("_package"))
  ))