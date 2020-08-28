import { accountModel } from "../models/accountModel.js";
import accountDepositService from "../services/accountDepositService.js";
import accountWithdrawService from "../services/accountWithdrawService.js";
import accountFindOneService from "../services/accountFindOneService.js";
import accountDeleteService from "../services/accountDeleteService.js";
import accountTransferService from "../services/accountTransferService.js";
import accountBalanceAverageService from "../services/accountBalanceAverageService.js";
import accountLowerBalanceService from "../services/accountLowerBalanceService.js";
import accountHighestBalanceService from "../services/accountHighestBalanceService.js";

const accountsController = {

  async register_deposit(request, response) {
    try {
      const { branchCode, accountNumber, depositValue } = request.body;

      await accountDepositService.execute(branchCode, accountNumber, depositValue);

      return response.status(201).send();
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async register_withdraw(request, response) {
    try {
      const { branchCode, accountNumber, withdrawValue } = request.body;
      await accountWithdrawService.execute(branchCode, accountNumber, withdrawValue);

      return response.status(201).send();
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async get_account(request, response) {
    try {
      const { branchCode, accountNumber } = request.params;
      const account = await accountFindOneService.execute(branchCode, accountNumber);

      return response.json(account);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async delete_account(request, response) {
    try {
      const { branchCode, accountNumber } = request.params;
      const activeAccounts = await accountDeleteService.execute(branchCode, accountNumber);
      
      return response.json(activeAccounts);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async balance_transfer(request, response) {
    try {
      const { originAccount, destinationAccount, value } = request.body;
      const originBalance = await accountTransferService.execute(originAccount, destinationAccount, value);

      return response.json({ origin_balance: originBalance });
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async get_balance_averages_from_branchCode(request, response) {
    try {
      const { branchCode } = request.params;
      const average = await accountBalanceAverageService.execute(branchCode);

      return response.json({ average: average });
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async get_customer_with_lower_account_balance(request, response) {
    try {
      const { customers } = request.params;
      const accounts = await accountLowerBalanceService.execute(customers);

      return response.json(accounts);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async get_customer_with_highest_account_balance(request, response) {
    try {
      const { customers } = request.params;
      const accounts = await accountHighestBalanceService.execute(customers);

      return response.json(accounts);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async promote_customer_to_private(_, response) {
    try {
      const result = await accountTransferService.execute();

      return response.json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async get_accounts(_, response) {
    try {
      const accounts = await accountModel.find({});
      return response.json(accounts);
    } catch (error) {
      return response.status(500).json(error);
    }
  },
};

export default accountsController;
