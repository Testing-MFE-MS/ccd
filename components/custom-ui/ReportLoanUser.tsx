"use client"

import { useState, ChangeEvent } from 'react';

interface LoanFormData {
    customerName: string;
    loanAmount: string;
    loanType: string;
    interestRate: string;
    loanTerm: string;
    loanPurpose: string;
    employmentStatus: string;
    monthlyIncome: string;
    email: string;
    phone: string;
    address: string;
    startDate: string;
    collateralType: string;
    notes: string;
}

const ReportLoanUser = () => {
    const [formData, setFormData] = useState<LoanFormData>({
        customerName: '',
        loanAmount: '',
        loanType: 'personal',
        interestRate: '',
        loanTerm: '12',
        loanPurpose: '',
        employmentStatus: 'employed',
        monthlyIncome: '',
        email: '',
        phone: '',
        address: '',
        startDate: '',
        collateralType: 'none',
        notes: ''
    });

    const [files, setFiles] = useState<{
        idDocument: File | null;
        incomeProof: File | null;
        collateralDoc: File | null;
    }>({
        idDocument: null,
        incomeProof: null,
        collateralDoc: null
    });

    const [errors, setErrors] = useState<Partial<Record<keyof LoanFormData, string>>>({});
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof LoanFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileType: keyof typeof files) => {
        const file = e.target.files?.[0] || null;
        setFiles(prev => ({
            ...prev,
            [fileType]: file
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof LoanFormData, string>> = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Customer name is required';
        }

        if (!formData.loanAmount || parseFloat(formData.loanAmount) <= 0) {
            newErrors.loanAmount = 'Valid loan amount is required';
        }

        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        if (!formData.phone.trim() || !/^\d{9,15}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Valid phone number is required';
        }

        if (!formData.monthlyIncome || parseFloat(formData.monthlyIncome) <= 0) {
            newErrors.monthlyIncome = 'Valid monthly income is required';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            setSubmitStatus('error');
            return;
        }

        console.log('Form Data:', formData);
        console.log('Files:', files);

        setSubmitStatus('success');

        setTimeout(() => {
            setSubmitStatus('idle');
        }, 3000);
    };

    const handleReset = () => {
        setFormData({
            customerName: '',
            loanAmount: '',
            loanType: 'personal',
            interestRate: '',
            loanTerm: '12',
            loanPurpose: '',
            employmentStatus: 'employed',
            monthlyIncome: '',
            email: '',
            phone: '',
            address: '',
            startDate: '',
            collateralType: 'none',
            notes: ''
        });
        setFiles({
            idDocument: null,
            incomeProof: null,
            collateralDoc: null
        });
        setErrors({});
        setSubmitStatus('idle');
    };

    const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md ";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
    const errorClasses = "text-red-500 text-xs mt-1";

    return (
        <div className=" w-full p-6 bg-white rounded-lg shadow-lg h-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Loan Application Report</h2>
                <p className="text-gray-600">
                    Complete the form below to submit a loan application report
                </p>
            </div>

            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800 font-medium">✓ Form submitted successfully!</p>
                </div>
            )}

            {submitStatus === 'error' && Object.keys(errors).length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800 font-medium">⚠ Please correct the errors below</p>
                </div>
            )}

            <div className="space-y-6">
                {/* Customer Information Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="customerName" className={labelClasses}>
                                Customer Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleInputChange}
                                className={inputClasses}
                                placeholder="Enter full name"
                            />
                            {errors.customerName && <p className={errorClasses}>{errors.customerName}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className={labelClasses}>
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={inputClasses}
                                placeholder="email@example.com"
                            />
                            {errors.email && <p className={errorClasses}>{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className={labelClasses}>
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={inputClasses}
                                placeholder="+855 12 345 678"
                            />
                            {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
                        </div>

                        <div>
                            <label htmlFor="employmentStatus" className={labelClasses}>
                                Employment Status
                            </label>
                            <select
                                id="employmentStatus"
                                name="employmentStatus"
                                value={formData.employmentStatus}
                                onChange={handleInputChange}
                                className={inputClasses}
                            >
                                <option value="employed">Employed</option>
                                <option value="self-employed">Self-Employed</option>
                                <option value="unemployed">Unemployed</option>
                                <option value="retired">Retired</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="monthlyIncome" className={labelClasses}>
                                Monthly Income (USD) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="monthlyIncome"
                                name="monthlyIncome"
                                value={formData.monthlyIncome}
                                onChange={handleInputChange}
                                className={inputClasses}
                                placeholder="0.00"
                                step="0.01"
                            />
                            {errors.monthlyIncome && <p className={errorClasses}>{errors.monthlyIncome}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="address" className={labelClasses}>
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className={inputClasses}
                                placeholder="Enter complete address"
                            />
                        </div>
                    </div>
                </div>

                {/* Loan Details Section */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="loanType" className={labelClasses}>
                                Loan Type
                            </label>
                            <select
                                id="loanType"
                                name="loanType"
                                value={formData.loanType}
                                onChange={handleInputChange}
                                className={inputClasses}
                            >
                                <option value="personal">Personal Loan</option>
                                <option value="business">Business Loan</option>
                                <option value="home">Home Loan</option>
                                <option value="auto">Auto Loan</option>
                                <option value="education">Education Loan</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="loanAmount" className={labelClasses}>
                                Loan Amount (USD) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="loanAmount"
                                name="loanAmount"
                                value={formData.loanAmount}
                                onChange={handleInputChange}
                                className={inputClasses}
                                placeholder="0.00"
                                step="0.01"
                            />
                            {errors.loanAmount && <p className={errorClasses}>{errors.loanAmount}</p>}
                        </div>

                        <div>
                            <label htmlFor="interestRate" className={labelClasses}>
                                Interest Rate (%)
                            </label>
                            <input
                                type="number"
                                id="interestRate"
                                name="interestRate"
                                value={formData.interestRate}
                                onChange={handleInputChange}
                                className={inputClasses}
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>

                        <div>
                            <label htmlFor="loanTerm" className={labelClasses}>
                                Loan Term (months)
                            </label>
                            <select
                                id="loanTerm"
                                name="loanTerm"
                                value={formData.loanTerm}
                                onChange={handleInputChange}
                                className={inputClasses}
                            >
                                <option value="6">6 months</option>
                                <option value="12">12 months</option>
                                <option value="24">24 months</option>
                                <option value="36">36 months</option>
                                <option value="48">48 months</option>
                                <option value="60">60 months</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="startDate" className={labelClasses}>
                                Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                            {errors.startDate && <p className={errorClasses}>{errors.startDate}</p>}
                        </div>

                        <div>
                            <label htmlFor="collateralType" className={labelClasses}>
                                Collateral Type
                            </label>
                            <select
                                id="collateralType"
                                name="collateralType"
                                value={formData.collateralType}
                                onChange={handleInputChange}
                                className={inputClasses}
                            >
                                <option value="none">None</option>
                                <option value="property">Property</option>
                                <option value="vehicle">Vehicle</option>
                                <option value="savings">Savings Account</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="loanPurpose" className={labelClasses}>
                                Loan Purpose
                            </label>
                            <input
                                type="text"
                                id="loanPurpose"
                                name="loanPurpose"
                                value={formData.loanPurpose}
                                onChange={handleInputChange}
                                className={inputClasses}
                                placeholder="Describe the purpose of this loan"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="notes" className={labelClasses}>
                                Additional Notes
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                rows={4}
                                className={inputClasses}
                                placeholder="Enter any additional information or special requirements"
                            />
                        </div>
                    </div>
                </div>

                {/* Document Upload Section */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Document Upload</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="idDocument" className={labelClasses}>
                                ID Document
                            </label>
                            <input
                                type="file"
                                id="idDocument"
                                onChange={(e) => handleFileChange(e, 'idDocument')}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                accept=".pdf,.jpg,.jpeg,.png"
                            />
                            {files.idDocument && (
                                <p className="text-xs text-green-600 mt-1">
                                    ✓ {files.idDocument.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="incomeProof" className={labelClasses}>
                                Income Proof
                            </label>
                            <input
                                type="file"
                                id="incomeProof"
                                onChange={(e) => handleFileChange(e, 'incomeProof')}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                accept=".pdf,.jpg,.jpeg,.png"
                            />
                            {files.incomeProof && (
                                <p className="text-xs text-green-600 mt-1">
                                    ✓ {files.incomeProof.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="collateralDoc" className={labelClasses}>
                                Collateral Document
                            </label>
                            <input
                                type="file"
                                id="collateralDoc"
                                onChange={(e) => handleFileChange(e, 'collateralDoc')}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                accept=".pdf,.jpg,.jpeg,.png"
                            />
                            {files.collateralDoc && (
                                <p className="text-xs text-green-600 mt-1">
                                    ✓ {files.collateralDoc.name}
                                </p>
                            )}
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Accepted formats: PDF, JPG, PNG (Max 5MB per file)
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-end pt-4 border-t">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    >
                        Reset Form
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm"
                    >
                        Submit Application
                    </button>
                </div>
            </div>

            {/* Summary Section */}
            {formData.customerName && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Form Summary</h3>
                    <div className="text-xs text-gray-600 space-y-1">
                        <p><span className="font-medium">Customer:</span> {formData.customerName}</p>
                        <p><span className="font-medium">Loan Amount:</span> ${formData.loanAmount || '0.00'}</p>
                        <p><span className="font-medium">Loan Type:</span> {formData.loanType}</p>
                        <p><span className="font-medium">Term:</span> {formData.loanTerm} months</p>
                        <p><span className="font-medium">Files Uploaded:</span> {Object.values(files).filter(f => f !== null).length}/3</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportLoanUser;