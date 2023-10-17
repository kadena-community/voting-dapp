(namespace "n_fd020525c953aa002f20fb81a920982b175cdf1a")

(module election-gas-station GOVERNANCE
  (defcap GOVERNANCE ()
    (enforce-keyset "n_fd020525c953aa002f20fb81a920982b175cdf1a.admin-keyset")
  )

  (implements gas-payer-v1)

  (use coin)

  (defun chain-gas-price ()
    (at 'gas-price (chain-data))
  )

  (defun enforce-below-or-at-gas-price:bool (gasPrice:decimal)
    (enforce (<= (chain-gas-price) gasPrice)
      (format "Gas Price must be smaller than or equal to {}" [gasPrice]))
  )

  (defcap GAS_PAYER:bool
    ( user:string
      limit:integer
      price:decimal
    )
    (enforce (= "exec" (at "tx-type" (read-msg))) "Can only be used inside an exec")
    (enforce (= 1 (length (at "exec-code" (read-msg)))) "Can only be used to call one pact function")
    (enforce
      (= "(n_fd020525c953aa002f20fb81a920982b175cdf1a.election." (take 53 (at 0 (at "exec-code" (read-msg)))))
      "Only election module calls are allowed"
    )
    (enforce-below-or-at-gas-price 0.000001)
    (compose-capability (ALLOW_GAS))
  )

  (defcap ALLOW_GAS () true)

  (defun create-gas-payer-guard:guard ()
    (create-user-guard (gas-payer-guard))
  )

  (defun gas-payer-guard ()
    (require-capability (GAS))
  )

  (defconst GAS_STATION_ACCOUNT "election-gas-station")

  (defun init ()
    (coin.create-account GAS_STATION_ACCOUNT (create-gas-payer-guard))
  )
)

(if (read-msg "init")
  [(init)]
  ["not creating the gas station account"]
)
