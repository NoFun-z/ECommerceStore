import * as yup from 'yup'

export const validationSchema = [
    yup.object({
        fullName: yup.string().required('Full name is reuiqred'),
        address1: yup.string().required('Address 1 is reuiqred'),
        address2: yup.string().required('Address 2 is reuiqred'),
        city: yup.string().required('City is reuiqred'),
        state: yup.string().required('State is reuiqred'),
        zip: yup.string().required('ZipCode is reuiqred'),
        country: yup.string().required('Country is reuiqred'),
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required()
    }),
];