import express from "express";
import accountsController from "../controllers/accountController.js";

const router = express();

router.post("/accounts/deposits", accountsController.register_deposit);

router.post("/accounts/withdraws", accountsController.register_withdraw);

router.get("/accounts/promote-customers", accountsController.promote_customer_to_private)

router.get("/accounts/lower-balances/:customers", accountsController.get_customer_with_lower_account_balance);

router.get("/accounts/highest-balances/:customers", accountsController.get_customer_with_highest_account_balance);

router.get("/accounts/balances-average/:branchCode", accountsController.get_balance_averages_from_branchCode);

router.get("/accounts/:branchCode/:accountNumber", accountsController.get_account);

router.delete("/accounts/:branchCode/:accountNumber", accountsController.delete_account);

router.post("/accounts/transfer", accountsController.balance_transfer);

router.get("/accounts", accountsController.get_accounts);


export { router as accountRouter };
