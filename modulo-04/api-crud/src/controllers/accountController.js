import { accountModel } from "../models/accountModel.js";

const accountsController = {

  async register_deposit(request, response) {
    try {
      const { branchCode, accountNumber, depositValue } = request.body;
      const accountExists = await accountModel.find({
        agencia: branchCode,
        conta: accountNumber,
      });

      if (accountExists.length <= 0) {
        const STATUS = 400;
        return response
          .status(STATUS)
          .json({ code: STATUS, message: "account not found!" });
      }
      const balance = accountExists[0].balance + depositValue;

      await accountModel.update(
        { _id: accountExists[0]._id },
        { $set: { balance: balance } }
      );

      return response.status(201).send();
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async register_withdraw(request, response) {
    try {
      const { branchCode, accountNumber, withdrawValue } = request.body;
      const accountExists = await accountModel.find({
        agencia: branchCode,
        conta: accountNumber,
      });

      if (accountExists.length <= 0) {
        const STATUS = 400;
        return response
          .status(STATUS)
          .json({ code: STATUS, message: "account not found!" });
      }
      const balance = accountExists[0].balance - withdrawValue;
      if (balance <= 0) {
        const STATUS = 400;
        return response.status(STATUS).json({
          code: STATUS,
          message: "This account don't have suficient balance to withdraw",
        });
      }
      await accountModel.update(
        { _id: accountExists[0]._id },
        { $set: { balance: balance } }
      );
      return response.status(201).send();
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async get_account(request, response) {
    try {
      const { branchCode, accountNumber } = request.params;
      const account = await accountModel.find({
        agencia: Number(branchCode),
        conta: Number(accountNumber),
      });

      if (account.length <= 0) {
        const STATUS = 400;
        return response
          .status(STATUS)
          .json({ code: STATUS, message: "account not found!" });
      }

      return response.json(account[0]);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async delete_account(request, response) {
    try {
      const { branchCode, accountNumber } = request.params;
      const account = await accountModel.find({
        agencia: Number(branchCode),
        conta: Number(accountNumber),
      });

      if (account.length <= 0) {
        const STATUS = 400;
        return response
          .status(STATUS)
          .json({ code: STATUS, message: "account not found!" });
      }

      await accountModel.deleteOne({ _id: account[0]._id });

      const activeAccounts = await accountModel.find({
        agencia: Number(branchCode),
      });

      return response.json(activeAccounts);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async balance_transfer(request, response) {
    try {
      const { originAccount, destinationAccount, value } = request.body;

      const origin = await accountModel.find({ conta: Number(originAccount) });
      const destination = await accountModel.find({
        conta: Number(destinationAccount),
      });

      if (origin.length <= 0 || destination.length <= 0) {
        return response.status(400).json({
          code: 400,
          message: "Origin or Destination account not found.",
        });
      }
      if (origin[0].balance < value) {
        return response.status(400).json({
          code: 400,
          message: "Origin account doesn't have enough balance to transfer.",
        });
      }
      let originBalance = 0;
      let destinationBalance = 0;

      if (origin[0].agencia == destination[0].agencia) {
        originBalance = origin[0].balance - Number(value);
        destinationBalance = destination[0].balance + Number(value);
      } else {
        originBalance = origin[0].balance - Number(value) - 8;
        destinationBalance = destination[0].balance + Number(value);
      }

      console.log(origin, destination);

      const result = await accountModel.update(
        { conta: Number(originAccount) },
        { $set: { balance: originBalance } }
      );
      await accountModel.update(
        { conta: Number(destinationAccount) },
        { $set: { balance: destinationBalance } }
      );

      return response.json({ origin_balance: originBalance });
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async get_balance_averages_from_branchCode(request, response) {
    try {
      const { branchCode } = request.params;
      const accounts = await accountModel.find({ agencia: Number(branchCode) });

      const balanceAmount = accounts.reduce((acc, account) => account.balance);

      return response.json({ average: balanceAmount / accounts.length });
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async get_customer_with_lower_account_balance(request, response) {
    try {
      const { customers } = request.params;
      const accounts = await accountModel
        .find({})
        .sort({ balance: 1 })
        .limit(Number(customers));
      console.log(accounts);
      return response.json(accounts);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async get_customer_with_highest_account_balance(request, response) {
    try {
      const { customers } = request.params;
      const accounts = await accountModel
        .find({})
        .sort({ balance: -1, name: 1 })
        .limit(Number(customers));
      console.log(accounts);
      return response.json(accounts);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async promote_customer_to_private(_, response) {
    try {
      const accounts = await accountModel.aggregate([
        {
          $sort: {
            agencia: 1,
            balance: -1,
          },
        },
        {
          $group: {
            _id: "$agencia",
            account: {
              $push: "$$ROOT",
            },
          },
        },
        {
          $project: {
            _id: 0,
            agencia: "$_id.agencia",
            data: { $slice: ["$account", 1] },
          },
        },
      ]);

      accounts.forEach(async (account) => {
        account = account.data[0];
        const acc = await accountModel.findById(account._id);
        acc.agencia = 99;
        await acc.save();
      });

      const result = await accountModel.find({agencia: 99});

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
