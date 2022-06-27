import {Formik, FormikHelpers} from "formik";

interface IGenericFormProps {
  initialValues: {
    [key: string]: any
  },
  validation?: (values: any) => { [errorField: string]: string },
  onSubmit: (values: {[key: string]: any}, formikHelpers: FormikHelpers<{[key: string]: string}>) => any,
  children: any
}

export const GenericForm: React.FC<IGenericFormProps> = ({ initialValues, onSubmit, validation, children}) => {
  return  <Formik
  initialValues={initialValues}
  validate={validation}
  onSubmit={onSubmit}>
    {(...args: any) => {
      return (
      <form onSubmit={args[0].handleSubmit}>

        {children(...args)}
      </form>
    )}}
  </Formik>
}