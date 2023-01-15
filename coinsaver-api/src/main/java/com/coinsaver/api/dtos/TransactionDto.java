package com.coinsaver.api.dtos;

import com.coinsaver.core.enums.StatusType;
import com.coinsaver.core.enums.TransactionCategoryType;
import com.coinsaver.domain.entities.Transaction;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {

    private Long id;

    @NotNull(message = "Informe o valor")
    private BigDecimal amount;

    @NotBlank
    private LocalDateTime payDay;

    private String description;

    private StatusType status;

    private TransactionCategoryType category;

    private Boolean fixedExpense;

    private Integer repeat;

    public Transaction convertDtoToEntity() {
        return new ModelMapper().map(this, Transaction.class);
    }
}
