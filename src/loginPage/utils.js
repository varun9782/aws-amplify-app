/* eslint-disable */
export const validateField = (value, validations) => {
    for (const validation of validations) {
        if (value === undefined || value === "" || value === null) {
            if (validation.type === "Required") {
                return {
                    hasError: true,
                    errorMessage: validation.validationMessage || "The value is required"
                };
            }
            else {
                return {
                    hasError: false
                };
            }
        }
        const validationResult = checkValidation(value, validation);
        if (validationResult?.hasError) {
            return validationResult;
        }
    }
    return { hasError: false };
};
export const parseDateValidator = (dateValidator) => {
    const isTimestamp = `${parseInt(dateValidator)}`.length === dateValidator.length;
    return isTimestamp ? parseInt(dateValidator) : dateValidator;
};
const checkValidation = (value, validation) => {
    if (validation.numValues?.length) {
        switch (validation.type) {
            case "LessThanChar": return {
                hasError: !(value.length <= validation.numValues[0]),
                errorMessage: validation.validationMessage || `The value must be shorter than ${validation.numValues[0]}`
            };
            case "GreaterThanChar": return {
                hasError: !(value.length > validation.numValues[0]),
                errorMessage: validation.validationMessage || `The value must be longer than ${validation.numValues[0]}`
            };
            case "LessThanNum": return {
                hasError: !(value < validation.numValues[0]),
                errorMessage: validation.validationMessage || `The value must be less than ${validation.numValues[0]}`
            };
            case "GreaterThanNum": return {
                hasError: !(value > validation.numValues[0]),
                errorMessage: validation.validationMessage || `The value must be greater than ${validation.numValues[0]}`
            };
            case "EqualTo": return {
                hasError: !validation.numValues.some(el => el === value),
                errorMessage: validation.validationMessage || `The value must be equal to ${validation.numValues.join(" or ")}`
            };
            default:
        }
    }
    else if (validation.strValues?.length) {
        switch (validation.type) {
            case "StartWith": return {
                hasError: !validation.strValues.some((el) => value.startsWith(el)),
                errorMessage: validation.validationMessage || `The value must start with ${validation.strValues.join(", ")}`
            };
            case "EndWith": return {
                hasError: !validation.strValues.some((el) => value.endsWith(el)),
                errorMessage: validation.validationMessage || `The value must end with ${validation.strValues.join(", ")}`
            };
            case "Contains": return {
                hasError: !validation.strValues.some((el) => value.includes(el)),
                errorMessage: validation.validationMessage || `The value must contain ${validation.strValues.join(", ")}`
            };
            case "NotContains": return {
                hasError: !validation.strValues.every((el) => !value.includes(el)),
                errorMessage: validation.validationMessage || `The value must not contain ${validation.strValues.join(", ")}`
            };
            case "BeAfter": return {
                hasError: !(new Date(value) > new Date(parseDateValidator(validation.strValues[0]))),
                errorMessage: validation.validationMessage || `The value must be after ${validation.strValues[0]}`
            };
            case "BeBefore": return {
                hasError: !(new Date(value) < new Date(parseDateValidator(validation.strValues[0]))),
                errorMessage: validation.validationMessage || `The value must be before ${validation.strValues[0]}`
            };
        }
    }
    switch (validation.type) {
        case "Email":
            const EMAIL_ADDRESS_REGEX = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
            return {
                hasError: !EMAIL_ADDRESS_REGEX.test(value),
                errorMessage: validation.validationMessage || "The value must be a valid email address"
            };
        case "JSON":
            let isInvalidJSON = false;
            try {
                JSON.parse(value);
            }
            catch (e) {
                isInvalidJSON = true;
            }
            return {
                hasError: isInvalidJSON,
                errorMessage: validation.validationMessage || "The value must be in a correct JSON format"
            };
        case "IpAddress":
            const IPV_4 = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/;
            const IPV_6 = /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/;
            return {
                hasError: !(IPV_4.test(value) || IPV_6.test(value)),
                errorMessage: validation.validationMessage || "The value must be an IPv4 or IPv6 address"
            };
        case "URL":
            let isInvalidUrl = false;
            try {
                new URL(value);
            }
            catch (e) {
                isInvalidUrl = true;
            }
            return {
                hasError: isInvalidUrl,
                errorMessage: validation.validationMessage || "The value must be a valid URL that begins with a schema (i.e. http:// or mailto:)"
            };
        case "Phone":
            const PHONE = /^\+?\d[\d\s-]+$/;
            return {
                hasError: !PHONE.test(value),
                errorMessage: validation.validationMessage || "The value must be a valid phone number"
            };
        default:
    }
};
export const fetchByPath = (input, path = "", accumlator = []) => {
    const currentPath = path.split(".");
    const head = currentPath.shift();
    if (input && head && input[head] !== undefined) {
        if (!currentPath.length) {
            accumlator.push(input[head]);
        }
        else {
            fetchByPath(input[head], currentPath.join("."), accumlator);
        }
    }
    return accumlator[0];
};
