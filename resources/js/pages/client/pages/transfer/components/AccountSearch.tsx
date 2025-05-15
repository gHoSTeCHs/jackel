import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';

interface Account {
    account_number: string;
    account_holder: string;
    display_text: string;
}

interface AccountSearchProps {
    value: string;
    onChange: (value: string, displayText?: string) => void;
    placeholder?: string;
    required?: boolean;
    label?: string;
}

export const AccountSearch: React.FC<AccountSearchProps> = ({
    value,
    onChange,
    placeholder = 'Enter account number',
    required = false,
    label = 'Account Number',
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [displayText, setDisplayText] = useState('');

    const searchAccounts = debounce(async (query: string) => {
        if (query.length < 3) {
            setAccounts([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(route('client.accounts.search', { query }));
            const data = await response.json();
            setAccounts(data.accounts);
        } catch (error) {
            console.error('Error searching accounts:', error);
            setAccounts([]);
        } finally {
            setIsLoading(false);
        }
    }, 300);

    useEffect(() => {
        if (value && !displayText) {
            const account = accounts.find((a) => a.account_number === value);
            if (account) {
                setDisplayText(account.display_text);
            }
        }
    }, [value, accounts]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        setShowDropdown(true);
        searchAccounts(query);

        if (!query) {
            onChange('', '');
            setDisplayText('');
        }
    };

    const handleAccountSelect = (account: Account) => {
        setSearchQuery('');
        setShowDropdown(false);
        setDisplayText(account.display_text);
        onChange(account.account_number, account.display_text);
    };

    return (
        <div className="relative">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type="text"
                value={displayText || searchQuery}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                className="block w-full text-gray-900 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder={placeholder}
                required={required}
            />
            {showDropdown && (searchQuery.length >= 3 || accounts.length > 0) && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                    <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
                        {isLoading ? (
                            <li className="px-4 py-2 text-gray-800">Searching...</li>
                        ) : accounts.length > 0 ? (
                            accounts.map((account) => (
                                <li
                                    key={account.account_number}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                    onClick={() => handleAccountSelect(account)}
                                >
                                    {account.display_text}
                                </li>
                            ))
                        ) : searchQuery.length >= 3 ? (
                            <li className="px-4 py-2 text-gray-800">No accounts found</li>
                        ) : null}
                    </ul>
                </div>
            )}
        </div>
    );
};
