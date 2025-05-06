// Form Data Interfaces
export interface SameBankFormData {
    fromAccount: string;
    toAccount: string;
    amount: string;
    reference: string;
    description: string;
    purpose: string;
}

export interface LocalBankFormData {
    fromAccount: string;
    toAccount: string;
    bank: string;
    bankName: string;
    accountNumber: string;
    routingNumber: string;
    beneficiaryName: string;
    amount: string;
    reference: string;
    description: string;
    purpose: string;
}

export interface InternationalFormData {
    fromAccount: string;
    bankName: string;
    bankAddress: string;
    swiftCode: string;
    accountNumber: string;
    beneficiaryName: string;
    beneficiaryAddress: string;
    amount: string;
    currency: string;
    reference: string;
    description: string;
    purpose: string;
}
