(let ((ns-name (ns.create-principal-namespace (read-keyset "election-admin" ))))
  (define-namespace ns-name (read-keyset "election-admin" ) (read-keyset "election-admin" ))
)

(let ((ns-name (ns.create-principal-namespace (read-keyset "election-admin"))))
  (namespace ns-name)
  (define-keyset (format "{}.{}" [ns-name "election-admin"]) (read-keyset "election-admin" ))
)

(module election GOVERNANCE 
   (defcap GOVERNANCE () 
     ; Replace the principal namespace in the next line
     (enforce-guard (keyset-ref-guard "n_1cc1f83c56f53b8865cc23a61e36d4b17e73ce9e.election-admin"))) 
    
   (defun list-candidates () [1, 2, 3])
)
