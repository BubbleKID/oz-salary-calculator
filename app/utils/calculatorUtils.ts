export function calculateTaxBreakDown(income: string): {
  takeHomePay: number;
  totalTaxes: number;
  baseSalary: number;
  medicareLevy: number;
  takeHomePayPercentage: number;
  totalTaxesPercentage: number;
} {
  const salaryNumber = parseInt(income, 10);

  const result = {
    takeHomePay: 0,
    totalTaxes: 0,
    baseSalary: salaryNumber,
    medicareLevy: 0,
    takeHomePayPercentage: 0,
    totalTaxesPercentage: 0,
  };

  // Calculate Medicare Levy
  if (salaryNumber > 18200) {
    result.medicareLevy = salaryNumber * 0.02;
  }

  // Calculate income tax
  if (salaryNumber <= 18200) {
    result.takeHomePay = salaryNumber;
    result.totalTaxes = result.medicareLevy;
  } else if (salaryNumber <= 45000) {
    result.totalTaxes = (salaryNumber - 18200) * 0.19 + result.medicareLevy;
    result.takeHomePay = salaryNumber - result.totalTaxes;
  } else if (salaryNumber <= 120000) {
    result.totalTaxes =
      5092 + (salaryNumber - 45000) * 0.325 + result.medicareLevy;
    result.takeHomePay = salaryNumber - result.totalTaxes;
  } else if (salaryNumber <= 180000) {
    result.totalTaxes =
      29467 + (salaryNumber - 120000) * 0.37 + result.medicareLevy;
    result.takeHomePay = salaryNumber - result.totalTaxes;
  } else {
    result.totalTaxes =
      51667 + (salaryNumber - 180000) * 0.45 + result.medicareLevy;
    result.takeHomePay = salaryNumber - result.totalTaxes;
  }

  // Calculate percentages
  result.takeHomePayPercentage = (result.takeHomePay / result.baseSalary) * 100;
  result.totalTaxesPercentage = (result.totalTaxes / result.baseSalary) * 100;

  return result;
}

interface PayBreakdown {
  takeHomePay: number;
  taxableIncome: number;
  superannuation: number;
  totalTaxes: number;
}

interface PayCalculation {
  annual: PayBreakdown;
  monthly: PayBreakdown;
  fortnightly: PayBreakdown;
  weekly: PayBreakdown;
}

const SUPERANNUATION_RATE = 0.11; // 11% superannuation

export function calculateFullPayBreakdown(income: string): PayCalculation {
  const annualIncome = parseInt(income, 10);

  const calculatePayBreakdown = (annualIncome: number): PayBreakdown => {
    const superannuation = annualIncome * SUPERANNUATION_RATE;
    const taxableIncome = annualIncome - superannuation;
    const { takeHomePay, totalTaxes } = calculateTaxBreakDown(taxableIncome);

    return {
      takeHomePay,
      taxableIncome,
      superannuation,
      totalTaxes,
    };
  };

  const annualBreakdown = calculatePayBreakdown(annualIncome);
  const monthlyBreakdown = calculatePayBreakdown(annualIncome / 12);
  const fortnightlyBreakdown = calculatePayBreakdown(annualIncome / 26);
  const weeklyBreakdown = calculatePayBreakdown(annualIncome / 52);

  return {
    annual: annualBreakdown,
    monthly: monthlyBreakdown,
    fortnightly: fortnightlyBreakdown,
    weekly: weeklyBreakdown,
  };
}
