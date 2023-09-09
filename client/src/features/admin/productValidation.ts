import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string().required('Please enter then product name'),
    brand: yup.string().required('Please enter then product brand'),
    type: yup.string().required('Please enter then product type'),
    price: yup.number().required('Please enter then product price').moreThan(100),
    quantityInStock: yup.number().required('Please enter then product quantity').min(0),
    description: yup.string().required(),
    file: yup.mixed().when('pictureURL', {
        is: (value:string) => !value,
        then: () => yup.mixed().required('Please provide an image')
    })
})