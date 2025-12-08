"use client"

import { useState } from 'react';

const ReportLoanUser = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="p-4 border rounded-lg bg-white shadow">
            <h2 className="text-xl font-bold mb-2">Report Loan User</h2>
            <p className="text-gray-600 mb-4">
                This is the CCD Report Loan User component loaded via Module Federation
            </p>

            <div className="mt-4 p-3 bg-blue-50 rounded">
                <p className="text-sm text-gray-700 mb-2">React Hook Test: {count}</p>
                <button
                    onClick={() => setCount(count + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Click me
                </button>
            </div>
        </div>
    );
};

export default ReportLoanUser;