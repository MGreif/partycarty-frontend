import { Button, Checkbox, Input, InputWrapper } from '@mantine/core'
import { useState } from 'react'
import classes from './NewListForm.module.css'
import { GenericForm } from './GenericForm'
import superagent from 'superagent'
import { buildApiLink, buildLink } from '../libs/linkBuilder'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

type TNewListForm = {
  description: string
  editable: boolean
}

const NewListForm = () => {
  const router = useRouter()
  const { t } = useTranslation('newPage')
  const { t: tcommon } = useTranslation('common')

  return (
    <div className={classes.formContainer}>
      <GenericForm
        initialValues={{ description: '', editable: true }}
        onSubmit={(values, { setSubmitting }) => {
          superagent
            .post(buildApiLink('/shopping-list'))
            .send(values)
            .then((res) => {
              if (res.statusCode === 200) {
                router.push(buildLink('/shared/' + res.body._id))
              }
            })
        }}
        validation={(values) => {
          let errors: any = {}
          if (!values.description)
            errors.description = tcommon('validation.is-required')
          if (values.description.length > 100)
            errors.description = tcommon('validation.less-characters', {
              amount: '100',
            })
          return errors
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
            <InputWrapper label={tcommon('description')}>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder={t('description-placeholder')}
                name="description"
                maxLength={100}
              />
              {errors.description && touched.description && errors.description}
            </InputWrapper>
            {/*
              <InputWrapper label="Editable">
              <Checkbox
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.editable}
                name="editable"
                />
                {errors.editable && touched.editable && errors.editable}
            </InputWrapper>
              */}
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{ margin: '1em 0' }}
            >
              {tcommon('create')}
            </Button>
          </>
        )}
      </GenericForm>
    </div>
  )
}

export default NewListForm
