import { ValidationError } from 'yup';

interface Errors {
    [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {

    const validationErrors: Errors = {};
    console.log("Erro interno getvalidate " + err);
    err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;

    });

    return validationErrors;
;
}