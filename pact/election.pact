(namespace 'n_fd020525c953aa002f20fb81a920982b175cdf1a)

(module election GOVERNANCE
  (defcap GOVERNANCE ()
    (enforce-keyset "n_fd020525c953aa002f20fb81a920982b175cdf1a.admin-keyset"))

  (defun list-candidates () [1, 2, 3])
)
