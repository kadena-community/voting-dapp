; Define your principal namespace and owner
(let ((ns-name (ns.create-principal-namespace (read-keyset "election-admin" ))))
  (define-namespace ns-name (read-keyset "election-admin" ) (read-keyset "election-admin" ))
)

(let ((ns-name (ns.create-principal-namespace (read-keyset "election-admin"))))
  (namespace ns-name)
  (define-keyset (format "{}.{}" [ns-name "election-admin"]) (read-keyset "election-admin" ))
)
; Replace the sample principal namespace through the module

; Start module declaration
(module election GOVERNANCE 
   (defcap GOVERNANCE () 
     (enforce-guard (keyset-ref-guard "n_d5ff15d933b83c1ef691dce3dabacfdfeaeade80.election-admin")))
   
   (defcap ELECTION-ADMIN () 
     (enforce-guard (keyset-ref-guard "n_d5ff15d933b83c1ef691dce3dabacfdfeaeade80.election-admin")))

   (use coin [ details ])
   
   (defcap ACCOUNT-OWNER (account:string)
     (enforce-guard (at "guard" (coin.details account)))
   )

   (defschema candidates-schema
      "Candidates table schema"
      name:string
      votes:integer)

   (deftable candidates:{candidates-schema})
   
   (defschema votes-schema
    candidateKey:string
  )

  (deftable votes:{votes-schema})

   (defun list-candidates ()
     (fold-db candidates
       (lambda (key columnData) true)
       (lambda (key columnData) (+ { "key": key } columnData))
     ))
   
     (defun add-candidate (candidate:object)
     (with-capability (ELECTION-ADMIN)
       (insert candidates
         (at "key" candidate)
         {
           "name": (at "name" candidate),
           "votes": 0
         }
       )
     )
   )

   (defun vote (account:string candidateKey:string)
     (let ((double-vote (account-voted account)))
       (enforce (= double-vote false) "Multiple voting not allowed"))
   
     (with-default-read candidates candidateKey
       { "name": "", "votes": 0 }
       { "name" := name, "votes" := numberOfVotes }
       (enforce (> (length name) 0) "Candidate does not exist")
       (with-capability (ACCOUNT-OWNER account)
         (update candidates candidateKey { "votes": (+ numberOfVotes 1) })
         (insert votes account { "candidateKey": candidateKey })
       )
     )
   )

   (defun account-voted:bool (account:string)
     (with-default-read votes account
       { "candidateKey": "" }
       { "candidateKey" := candidateKey }
       (> (length candidateKey) 0)
     )
   )
)

; End of module declaration

(if (read-msg "init-candidates")
   [(create-table candidates)]
   []
)
(if (read-msg "init-votes")
     [(create-table votes)]
     []
)