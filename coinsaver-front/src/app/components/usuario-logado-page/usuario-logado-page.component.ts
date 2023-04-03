import { TransactionTypeEnum } from './../../enums/transaction-type.enum';
import { Transaction } from './../../dtos/transactions/transaction.dto';
import { TransactionsService } from './../../services/transactions/transactions.service';
import { Component, OnInit } from '@angular/core';
import { DataUtils } from 'src/app/shared/utils/DataUtils.class';
import { TransactionCategoryTypeEnum } from 'src/app/enums/transaction-category-type.enum';

@Component({
  selector: 'app-usuario-logado-page',
  templateUrl: './usuario-logado-page.component.html',
  styleUrls: ['./usuario-logado-page.component.css']
})
export class UsuarioLogadoPageComponent implements OnInit {

  transaction: Transaction | undefined;
  transactionId: number = 0;
  transactionType: TransactionTypeEnum | undefined;
  transactionCategoryType: TransactionCategoryTypeEnum | undefined;
  date: string = '';
  dataUtils = new DataUtils();

  constructor(
    private transactionsService: TransactionsService,
  ) {}

  ngOnInit(): void {
    // this.getAllTransactions();
    this.getTransactionsInMonth();
    this.getTransaction();
    this.getTransactionByCategoryType();
  }

  getAllTransactions() {
    this.transactionsService.getAllTransactions()
      .subscribe((res) => {

        console.log('all', res)
      });
  }

  getTransactionsInMonth() {
    this.date = this.dataUtils.transformaToLocalDateFormat('US');

    this.transactionsService.getTransactionsInMonth(this.date)
      .subscribe((res) => {

        console.log('month', res)
      });
  }

  getTransaction() {
    this.transactionId = 1;
    this.transactionType = TransactionTypeEnum.IN_CASH;

    this.transactionsService.getTransaction(this.transactionId, this.transactionType)
      .subscribe((res) => {
        this.transaction = res;

        console.log('id cat type', this.transaction)
      });
  }

  getTransactionByCategoryType() {
    this.transactionCategoryType = TransactionCategoryTypeEnum.EXPENSE;
    this.date = this.dataUtils.transformaToLocalDateFormat('US');

    this.transactionsService.getTransactionByCategoryType(this.transactionCategoryType, this.date)
      .subscribe((res) => {
        this.transaction = res;

        console.log('transaction cat type', this.transaction)
      });
  }

}
