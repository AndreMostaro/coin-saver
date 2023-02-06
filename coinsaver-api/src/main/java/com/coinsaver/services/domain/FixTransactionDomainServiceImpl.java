package com.coinsaver.services.domain;

import com.coinsaver.api.dtos.request.TransactionRequestDto;
import com.coinsaver.api.dtos.request.UpdateTransactionRequestDto;
import com.coinsaver.core.validation.messages.ErrorMessages;
import com.coinsaver.domain.entities.FixTransaction;
import com.coinsaver.domain.entities.Transaction;
import com.coinsaver.domain.exceptions.BusinessException;
import com.coinsaver.infra.repositories.FixTransactionRepository;
import com.coinsaver.services.domain.interfaces.FixTransactionDomainService;
import org.springframework.stereotype.Service;

@Service
public class FixTransactionDomainServiceImpl implements FixTransactionDomainService {

    private final FixTransactionRepository fixTransactionRepository;

    public FixTransactionDomainServiceImpl(FixTransactionRepository fixTransactionRepository) {
        this.fixTransactionRepository = fixTransactionRepository;
    }

    @Override
    public void updateFixTransaction(UpdateTransactionRequestDto updateTransactionRequestDto) {
        FixTransaction fixTransaction = fixTransactionRepository.findById(updateTransactionRequestDto.getFixTransactionId())
                .orElseThrow(() -> new BusinessException(ErrorMessages.getErrorMessage("TRANSACTION_NOT_FOUND")));

        fixTransactionRepository.updateFixTransaction(updateTransactionRequestDto.getAmount(),
                updateTransactionRequestDto.getCategory(),
                updateTransactionRequestDto.getPayDay(),
                updateTransactionRequestDto.getStatus(),
                updateTransactionRequestDto.getDescription(),
                fixTransaction.getId());
    }

    @Override
    public void createFixTransaction(TransactionRequestDto transactionRequestDto, Transaction transaction) {
        FixTransaction fixTransaction = transactionRequestDto.convertDtoToFixTransactionEntity();
        fixTransaction.setTransaction(transaction);
        fixTransactionRepository.save(fixTransaction);
    }
}
