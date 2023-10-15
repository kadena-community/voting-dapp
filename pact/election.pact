(namespace "n_fd020525c953aa002f20fb81a920982b175cdf1a")

(module election GOVERNANCE
  (defcap GOVERNANCE ()
    (enforce-keyset "n_fd020525c953aa002f20fb81a920982b175cdf1a.admin-keyset"))

  (defschema candidates-schema
      name:string
      votes:integer)

  (deftable candidates:{candidates-schema})

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
)

(if (read-msg "init-candidates")
  [(create-table candidates)]
  []
)
