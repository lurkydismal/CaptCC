/* ------------------------------------------------------------------ */
/* WARNING: relative order of tokens is important.                    */

/* register */

 DEF_ASM(r0)
 DEF_ASM(r1)
 DEF_ASM(r2)
 DEF_ASM(r3)
 DEF_ASM(r4)
 DEF_ASM(r5)
 DEF_ASM(r6)
 DEF_ASM(r7)
 DEF_ASM(r8)
 DEF_ASM(r9)
 DEF_ASM(r10)
 DEF_ASM(r11) /* fp */
 DEF_ASM(r12) /* ip[c] */
 DEF_ASM(r13) /* sp */
 DEF_ASM(r14) /* lr */
 DEF_ASM(r15) /* pc */

/* register macros */

 DEF_ASM(fp) /* alias for r11 */
 DEF_ASM(ip) /* alias for r12 */
 DEF_ASM(sp) /* alias for r13 */
 DEF_ASM(lr) /* alias for r14 */
 DEF_ASM(pc) /* alias for r15 */

#define ARM_INSTRUCTION_GROUP(tok) ((((tok) - TOK_ASM_nopeq) & 0xFFFFFFF0) + TOK_ASM_nopeq)

/* Note: condition code is 4 bits */
#define DEF_ASM_CONDED(x) \
  DEF(TOK_ASM_ ## x ## eq, #x "eq") \
  DEF(TOK_ASM_ ## x ## ne, #x "ne") \
  DEF(TOK_ASM_ ## x ## cs, #x "cs") \
  DEF(TOK_ASM_ ## x ## cc, #x "cc") \
  DEF(TOK_ASM_ ## x ## mi, #x "mi") \
  DEF(TOK_ASM_ ## x ## pl, #x "pl") \
  DEF(TOK_ASM_ ## x ## vs, #x "vs") \
  DEF(TOK_ASM_ ## x ## vc, #x "vc") \
  DEF(TOK_ASM_ ## x ## hi, #x "hi") \
  DEF(TOK_ASM_ ## x ## ls, #x "ls") \
  DEF(TOK_ASM_ ## x ## ge, #x "ge") \
  DEF(TOK_ASM_ ## x ## lt, #x "lt") \
  DEF(TOK_ASM_ ## x ## gt, #x "gt") \
  DEF(TOK_ASM_ ## x ## le, #x "le") \
  DEF(TOK_ASM_ ## x, #x) \
  DEF(TOK_ASM_ ## x ## rsvd, #x "rsvd")

/* Note: add new tokens after nop (MUST always use DEF_ASM_CONDED) */

 DEF_ASM_CONDED(nop)
 DEF_ASM_CONDED(wfe)
 DEF_ASM_CONDED(wfi)
 DEF_ASM_CONDED(swi)

 /* misc */
 DEF_ASM_CONDED(clz)

 /* size conversion */

 DEF_ASM_CONDED(sxtb)
 DEF_ASM_CONDED(sxth)
 DEF_ASM_CONDED(uxtb)
 DEF_ASM_CONDED(uxth)

 /* multiplication */

 DEF_ASM_CONDED(mul)
 DEF_ASM_CONDED(muls)
 DEF_ASM_CONDED(mla)
 DEF_ASM_CONDED(mlas)
 DEF_ASM_CONDED(smull)
 DEF_ASM_CONDED(smulls)
 DEF_ASM_CONDED(umull)
 DEF_ASM_CONDED(umulls)
 DEF_ASM_CONDED(smlal)
 DEF_ASM_CONDED(smlals)
 DEF_ASM_CONDED(umlal)
 DEF_ASM_CONDED(umlals)

 /* load/store */

 DEF_ASM_CONDED(ldr)
 DEF_ASM_CONDED(ldrb)
 DEF_ASM_CONDED(str)
 DEF_ASM_CONDED(strb)

 DEF_ASM_CONDED(stmda)
 DEF_ASM_CONDED(ldmda)
 DEF_ASM_CONDED(stm)
 DEF_ASM_CONDED(ldm)
 DEF_ASM_CONDED(stmia)
 DEF_ASM_CONDED(ldmia)
 DEF_ASM_CONDED(stmdb)
 DEF_ASM_CONDED(ldmdb)
 DEF_ASM_CONDED(stmib)
 DEF_ASM_CONDED(ldmib)

 /* instruction macros */

 DEF_ASM_CONDED(push)
 DEF_ASM_CONDED(pop)