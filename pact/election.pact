(namespace 'n_fd020525c953aa002f20fb81a920982b175cdf1a)

(module election GOVERNANCE
  (defcap GOVERNANCE ()
    (enforce-keyset "n_fd020525c953aa002f20fb81a920982b175cdf1a.admin-keyset"))

  (defschema candidates-schema
      "Candidates table schema"
      name:string
      votes:integer)

  (deftable candidates:{candidates-schema})

  (defun list-candidates ()
    (select candidates (constantly true))
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
