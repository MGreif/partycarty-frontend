import { Checkbox } from "@mantine/core";
import { Button, Group, Input, InputWrapper, Modal } from "@mantine/core"
import { Select } from "@mantine/core";
import { randomString } from "../libs/mockGenerator";
import { GenericForm } from "./GenericForm";
import { ECategory } from "./ListItem";

type TCreateItemModalProps = {
  open: boolean
  close: () => any
  onSubmit: (...args: any) => any
  defaultValues: {
    [key: string]: any
  }
}

const CreateItemButton = ({open, close, onSubmit, defaultValues}: TCreateItemModalProps) => {
  return (
      <Modal
        opened={open}
        onClose={() => close()}
        title="Create a new Item!"
      >
      <GenericForm
        initialValues={
          {
            category: null,
            fluid: false,
            name: null,
            ...defaultValues
        }}
        validation={(values: any) => {
          const errors: any = {}
          if (!values.name) errors.name = "Please specify a name"
          if (!values.category) errors.category = "Please specify a category"
          return errors
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values)
          resetForm()
          setSubmitting(false)
        }}>
          {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting
        }: any) => (
          <>
          <InputWrapper label="Name" >
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Jim Beam 400ML"
                name="name"
              />
              {errors.name && touched.name && errors.name}
          </InputWrapper>
          <InputWrapper label="category">
              <Select
                onChange={e => {
                  console.log(e)
                  handleChange({
                    target: {
                      name: "category",
                      value: e
                    }
                  })
                }}
                onBlur={handleBlur}
                value={values.category}
                name="category"
                data={Object.keys(ECategory).filter((v) => isNaN(Number(v))).map(cat => ({ value: cat, label: cat.toLocaleLowerCase()}))}
              />
              {errors.category && touched.category && errors.category}
          </InputWrapper>
          <InputWrapper label="Is Fluid">
              <Checkbox
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.fluid}
                name="fluid"
              />
              {errors.fluid && touched.fluid && errors.fluid}
          </InputWrapper>
          <Button type="submit" disabled={isSubmitting} style={{margin: "1em 0"}}>Create</Button>
          </>
        )
        }
      </GenericForm>
      </Modal>
  );
}

export default CreateItemButton