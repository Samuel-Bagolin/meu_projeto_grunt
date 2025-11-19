const btn = document.querySelector('.calculator-btn');
const form = document.getElementById('age-form');

const inputs = {
    day: document.getElementById('day'),
    month: document.getElementById('month'),
    year: document.getElementById('year'),
};

const results = {
    years: document.getElementById('years'),
    months: document.getElementById('months'),
    days: document.getElementById('days'),
};

const setError = (element, message) => {
    const parent = element.closest('.form-control-item');
    parent.classList.add('error');
    parent.querySelector('.error-message').textContent = message;
};

const clearError = (element) => {
    const parent = element.closest('.form-control-item');
    parent.classList.remove('error');
    parent.querySelector('.error-message').textContent = '';
};

const isValidNumber = (value, min, max) => {
    const n = Number(value);
    return !isNaN(n) && n >= min && n <= max;
};

const validateFields = () => {
    let valid = true;

    Object.entries(inputs).forEach(([key, el]) => {
        if (el.value.trim() === '') {
            valid = false;
            setError(el, 'This field is required');
        } else {
            clearError(el);
        }
    });

    if (!valid) return false;

    if (!isValidNumber(inputs.month.value, 1, 12)) {
        setError(inputs.month, 'Invalid month');
        valid = false;
    }

    if (!isValidNumber(inputs.day.value, 1, 31)) {
        setError(inputs.day, 'Invalid day');
        valid = false;
    }

    const y = Number(inputs.year.value);
    const currentYear = new Date().getFullYear();
    if (!isValidNumber(y, 1, currentYear)) {
        setError(inputs.year, 'Invalid year');
        valid = false;
    }

    const maxDay = new Date(y, Number(inputs.month.value), 0).getDate();
    if (Number(inputs.day.value) > maxDay) {
        setError(inputs.day, 'Invalid date');
        valid = false;
    }

    return valid;
};

const calculateAge = () => {
    const d = Number(inputs.day.value);
    const m = Number(inputs.month.value);
    const y = Number(inputs.year.value);

    const today = new Date();
    const birth = new Date(y, m - 1, d);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        const lastMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += lastMonthDays;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    results.years.textContent = years;
    results.months.textContent = months;
    results.days.textContent = days;

    form.reset();
};

btn.addEventListener('click', () => {
    if (validateFields()) {
        calculateAge();
    }
});
