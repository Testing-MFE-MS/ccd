"use client"

import { useState, ChangeEvent } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

export default function ReportLoanUser(){
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const handleSelectChange = (name: keyof LoanFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
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

    return (
        <div className="w-full p-6 bg-background">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Loan Application Report</CardTitle>
                    <CardDescription>
                        Complete the form below to submit a loan application report
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {submitStatus === 'success' && (
                        <Alert className="bg-green-50 border-green-200">
                            <AlertDescription className="text-green-800 font-medium">
                                ✓ Form submitted successfully!
                            </AlertDescription>
                        </Alert>
                    )}

                    {submitStatus === 'error' && Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                ⚠ Please correct the errors below
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Customer Information Section */}
                    <Card className="bg-gray-50">
                        <CardHeader>
                            <CardTitle className="text-lg">Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="customerName">
                                        Customer Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        id="customerName"
                                        name="customerName"
                                        value={formData.customerName}
                                        onChange={handleInputChange}
                                        placeholder="Enter full name"
                                    />
                                    {errors.customerName && (
                                        <p className="text-red-500 text-xs">{errors.customerName}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        Email Address <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">
                                        Phone Number <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+855 12 345 678"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="employmentStatus">Employment Status</Label>
                                    <Select
                                        value={formData.employmentStatus}
                                        onValueChange={(value) => handleSelectChange('employmentStatus', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select employment status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="employed">Employed</SelectItem>
                                            <SelectItem value="self-employed">Self-Employed</SelectItem>
                                            <SelectItem value="unemployed">Unemployed</SelectItem>
                                            <SelectItem value="retired">Retired</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="monthlyIncome">
                                        Monthly Income (USD) <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type="number"
                                        id="monthlyIncome"
                                        name="monthlyIncome"
                                        value={formData.monthlyIncome}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors.monthlyIncome && (
                                        <p className="text-red-500 text-xs">{errors.monthlyIncome}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter complete address"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Loan Details Section */}
                    <Card className="bg-blue-50">
                        <CardHeader>
                            <CardTitle className="text-lg">Loan Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="loanType">Loan Type</Label>
                                    <Select
                                        value={formData.loanType}
                                        onValueChange={(value) => handleSelectChange('loanType', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select loan type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="personal">Personal Loan</SelectItem>
                                            <SelectItem value="business">Business Loan</SelectItem>
                                            <SelectItem value="home">Home Loan</SelectItem>
                                            <SelectItem value="auto">Auto Loan</SelectItem>
                                            <SelectItem value="education">Education Loan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="loanAmount">
                                        Loan Amount (USD) <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type="number"
                                        id="loanAmount"
                                        name="loanAmount"
                                        value={formData.loanAmount}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors.loanAmount && (
                                        <p className="text-red-500 text-xs">{errors.loanAmount}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                                    <Input
                                        type="number"
                                        id="interestRate"
                                        name="interestRate"
                                        value={formData.interestRate}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="loanTerm">Loan Term (months)</Label>
                                    <Select
                                        value={formData.loanTerm}
                                        onValueChange={(value) => handleSelectChange('loanTerm', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select loan term" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="6">6 months</SelectItem>
                                            <SelectItem value="12">12 months</SelectItem>
                                            <SelectItem value="24">24 months</SelectItem>
                                            <SelectItem value="36">36 months</SelectItem>
                                            <SelectItem value="48">48 months</SelectItem>
                                            <SelectItem value="60">60 months</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="startDate">
                                        Start Date <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                    />
                                    {errors.startDate && (
                                        <p className="text-red-500 text-xs">{errors.startDate}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="collateralType">Collateral Type</Label>
                                    <Select
                                        value={formData.collateralType}
                                        onValueChange={(value) => handleSelectChange('collateralType', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select collateral type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="property">Property</SelectItem>
                                            <SelectItem value="vehicle">Vehicle</SelectItem>
                                            <SelectItem value="savings">Savings Account</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="loanPurpose">Loan Purpose</Label>
                                    <Input
                                        type="text"
                                        id="loanPurpose"
                                        name="loanPurpose"
                                        value={formData.loanPurpose}
                                        onChange={handleInputChange}
                                        placeholder="Describe the purpose of this loan"
                                    />
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="notes">Additional Notes</Label>
                                    <Textarea
                                        id="notes"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Enter any additional information or special requirements"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Document Upload Section */}
                    <Card className="bg-yellow-50">
                        <CardHeader>
                            <CardTitle className="text-lg">Document Upload</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="idDocument">ID Document</Label>
                                    <Input
                                        type="file"
                                        id="idDocument"
                                        onChange={(e) => handleFileChange(e, 'idDocument')}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                    {files.idDocument && (
                                        <p className="text-xs text-green-600 mt-1">
                                            ✓ {files.idDocument.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="incomeProof">Income Proof</Label>
                                    <Input
                                        type="file"
                                        id="incomeProof"
                                        onChange={(e) => handleFileChange(e, 'incomeProof')}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                    {files.incomeProof && (
                                        <p className="text-xs text-green-600 mt-1">
                                            ✓ {files.incomeProof.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="collateralDoc">Collateral Document</Label>
                                    <Input
                                        type="file"
                                        id="collateralDoc"
                                        onChange={(e) => handleFileChange(e, 'collateralDoc')}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                    {files.collateralDoc && (
                                        <p className="text-xs text-green-600 mt-1">
                                            ✓ {files.collateralDoc.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Accepted formats: PDF, JPG, PNG (Max 5MB per file)
                            </p>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-end pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                        >
                            Reset Form
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                        >
                            Submit Application
                        </Button>
                    </div>

                    {/* Summary Section */}
                    {formData.customerName && (
                        <Card className="bg-muted">
                            <CardHeader>
                                <CardTitle className="text-sm">Form Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground space-y-1">
                                    <p><span className="font-medium">Customer:</span> {formData.customerName}</p>
                                    <p><span className="font-medium">Loan Amount:</span> ${formData.loanAmount || '0.00'}</p>
                                    <p><span className="font-medium">Loan Type:</span> {formData.loanType}</p>
                                    <p><span className="font-medium">Term:</span> {formData.loanTerm} months</p>
                                    <p><span className="font-medium">Files Uploaded:</span> {Object.values(files).filter(f => f !== null).length}/3</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};