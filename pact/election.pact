; Replace the principal namespace in the next line
(namespace "n_d5ff15d933b83c1ef691dce3dabacfdfeaeade80")

; Start module declaration
(module election GOVERNANCE 
   (defcap GOVERNANCE () 
     ; Replace the principal namespace in the next line
     (enforce-guard (keyset-ref-guard "n_d5ff15d933b83c1ef691dce3dabacfdfeaeade80.election-admin"))) 
   
   (defun list-candidates () [1, 2, 3])
) 
; End of module declaration
