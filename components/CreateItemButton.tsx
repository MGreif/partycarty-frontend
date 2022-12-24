import { Checkbox } from '@mantine/core'
import { Button, Group, Input, Modal } from '@mantine/core'
import { Select } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { randomString } from '../libs/mockGenerator'
import { GenericForm } from './GenericForm'
import { CATEGORIES } from './List'

type TCreateItemModalProps = {
  open: boolean
  close: () => any
  onSubmit: (...args: any) => any
  defaultValues: {
    [key: string]: any
  }
}

const CreateItemButton = ({
  open,
  close,
  onSubmit,
  defaultValues,
}: TCreateItemModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal opened={open} onClose={() => close()} title="Create a new Item!">
      <GenericForm
        initialValues={{
          category: null,
          fluid: false,
          name: null,
          ...defaultValues,
        }}
        validation={(values: any) => {
          const errors: any = {}
          if (!values.name) errors.name = t('validation.is-required')
          if (values.name && values.name.length <= 3)
            errors.name = t('validation.more-characters', { amount: '3' })
          if (!values.category) errors.category = t('validation.is-required')
          return errors
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values)
          resetForm()
          setSubmitting(false)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }: any) => (
          <>
            <Input.Wrapper label="Name">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Jim Beam 400ML"
                name="name"
                maxLength={50}
              />
              {errors.name && touched.name && errors.name}
            </Input.Wrapper>
            <Input.Wrapper label="category">
              <Select
                onChange={(e) => {
                  handleChange({
                    target: {
                      name: 'category',
                      value: e,
                    },
                  })
                }}
                onBlur={handleBlur}
                value={values.category}
                name="category"
                data={Object.values(CATEGORIES)}
              />
              {errors.category && touched.category && errors.category}
            </Input.Wrapper>
            <Input.Wrapper label="Is Fluid">
              <Checkbox
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.fluid}
                name="fluid"
              />
              {errors.fluid && touched.fluid && errors.fluid}
            </Input.Wrapper>
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{ margin: '1em 0' }}
            >
              Create
            </Button>
          </>
        )}
      </GenericForm>
    </Modal>
  )
}

export default CreateItemButton
