import { TransactionResponseDto } from '../../dtos/transactions/response/transaction.response.dto';
import { environment } from './../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PayTransactionRequestDto } from 'src/app/dtos/transactions/request/pay-transaction.request.dto';
import { TransactionRequestDto } from 'src/app/dtos/transactions/request/transaction.request.dto';
import { UpdateTransactionRequestDto } from 'src/app/dtos/transactions/request/update-transaction.request.dto';
import { MonthlyResponseDto } from 'src/app/dtos/transactions/response/monthly.response.dto';
import { UpdateTransactionResponseDto } from 'src/app/dtos/transactions/response/update-transaction.response.dto';
import { TransactionCategoryTypeEnum } from 'src/app/enums/transaction-category-type.enum';
import { TransactionTypeEnum } from 'src/app/enums/transaction-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  baseUrl = environment.api.hostBackend;
  transactionControllerUrl = environment.api.transactionsControllerBackend;

  getAllTransactions(): Observable<TransactionResponseDto[]> {
    return this.httpClient.get<TransactionResponseDto[]>(
      `${this.baseUrl +
      this.transactionControllerUrl +
      environment.api.transactionsBackendEndpoints.getAllTransactions
      }`
    )
      .pipe(
        map((transactions: TransactionResponseDto[]) => {
          transactions.forEach((transaction) => {

          })
          return transactions;
        }),
        catchError((erroResponse) => {
          return throwError(erroResponse);
        })
      );
  }

  getTransaction(transactionId: number, transactionType: TransactionTypeEnum): Observable<TransactionResponseDto> {
    return this.httpClient.get<TransactionResponseDto>(
      `${this.baseUrl +
      this.transactionControllerUrl +
      environment.api.transactionsBackendEndpoints.getTransaction
      }/${transactionId
      }?transactionType=${transactionType}`
    )
      .pipe(
        catchError((erroResponse) => {
          return throwError(erroResponse);
        })
      );
  }

  getTransactionByCategoryType(categoryType: TransactionCategoryTypeEnum, date: string): Observable<TransactionResponseDto[]> {
    return this.httpClient.get<TransactionResponseDto[]>(
      `${this.baseUrl +
      this.transactionControllerUrl +
      environment.api.transactionsBackendEndpoints.getTransactionByCategoryType
      }/${categoryType
      }?date=${date}`
    )
      .pipe(
        catchError((erroResponse) => {
          return throwError(erroResponse);
        })
      );
  }

  createTransaction(transactionRequestDto: TransactionRequestDto) {
    const url = this.baseUrl + this.transactionControllerUrl + environment.api.transactionsBackendEndpoints.createTransaction;
    const body = JSON.stringify(transactionRequestDto);
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.post(url, body, { headers }).pipe(
      map(result => {
        return result;
      })
    );
  }

  getTransactionsInMonth(date: string): Observable<MonthlyResponseDto> {
    return this.httpClient.get<MonthlyResponseDto>(
      `${this.baseUrl +
      this.transactionControllerUrl +
      environment.api.transactionsBackendEndpoints.getTransactionsInMonth
      }?date=${date}`
    )
      .pipe(
        catchError((erroResponse) => {
          return throwError(erroResponse);
        })
      );
  }

  updateTransaction(updateTransactionRequestDto: UpdateTransactionRequestDto): Observable<UpdateTransactionResponseDto> {
    const headers = { 'content-type': 'application/json' };
    const body = updateTransactionRequestDto;

    return this.httpClient.put<UpdateTransactionResponseDto>(
      this.baseUrl +
      this.transactionControllerUrl +
      environment.api.transactionsBackendEndpoints.updateTransaction, body, { 'headers': headers })
  }

  updateTransactionPatch(payTransactionRequestDto: PayTransactionRequestDto) {
    const url = this.baseUrl + this.transactionControllerUrl + environment.api.transactionsBackendEndpoints.updateTransactionPatch;
    const body = JSON.stringify(payTransactionRequestDto);
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.patch(url, body, { headers }).pipe(
      map(result => {
        return result;
      })
    );
  }

  deleteByTransactionId(transactionId: number) {
    const url = this.baseUrl + this.transactionControllerUrl + environment.api.transactionsBackendEndpoints.deleteByTransactionId;
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.delete(`${url}/${transactionId}`, { headers }).pipe(
      map(result => {
        return result;
      })
    );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
