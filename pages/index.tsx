import NewListForm from '../components/NewListForm'
import NewPage from '../components/NewPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const NewList = () => {
  return (
    <div
      style={{ minHeight: 'calc(100vh - 60px)', backgroundColor: '#E3E3E3' }}
    >
      <NewPage />
    </div>
  )
}

export default NewList

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'newPage'])),
    },
  }
}
