package com.coinsaver.services.domain.interfaces;

import com.coinsaver.api.dtos.request.TransactionRequestDto;
import com.coinsaver.api.dtos.request.UpdateTransactionRequestDto;
import com.coinsaver.domain.entities.Transaction;

public interface FixTransactionDomainService {
    void updateFixTransaction(UpdateTransactionRequestDto updateTransactionRequestDto);

    void createFixTransaction(TransactionRequestDto transactionRequestDto, Transaction transaction);
}
