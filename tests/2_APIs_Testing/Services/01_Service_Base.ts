import * as fs from 'fs';
import * as path from 'path';

const OrignalAccountTransactionsPath= path.join(process.cwd(), 'OrignalAccountTransactions.json');

export const Service_Base = {

    async addOrignalAccountTransactions(accountID: string, type: string, amount: string, description: string) {
        try {
            let transactions = [];
            if (fs.existsSync(OrignalAccountTransactionsPath)) {
                const fileContent = fs.readFileSync(OrignalAccountTransactionsPath, 'utf-8');
                transactions = JSON.parse(fileContent);
            }
            transactions.push({ accountId: accountID, type, amount, description });
            fs.writeFileSync(OrignalAccountTransactionsPath, JSON.stringify(transactions, null, 2));
            console.log("Transaction added to list successfully.");
        } catch (err) {
            console.error("Error updating transactions: " + err);
        }
    },

}