(namespace "n_fd020525c953aa002f20fb81a920982b175cdf1a")

(module election GOVERNANCE
  (defcap GOVERNANCE ()
    (enforce-keyset "n_fd020525c953aa002f20fb81a920982b175cdf1a.admin-keyset"))

  (use coin [ details ])

  (defcap ACCOUNT-OWNER (account:string)
    (enforce-guard (at 'guard (coin.details account)))
  )

  (defschema candidates-schema
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
    )
  )

  (defun add-candidate (candidate)
    (with-capability (GOVERNANCE)
      (insert
        candidates
        (at 'key candidate)
        {
          "name": (at 'name candidate),
          "votes": 0
        }
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
)

(if (read-msg "init-candidates")
  [(create-table candidates)]
  []
)

(if (read-msg "init-votes")
  [(create-table votes)]
  []
)
