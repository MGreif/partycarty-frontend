import Head from 'next/head'
import { useRouter } from 'next/router'
import List, { IList } from '../../components/List'
import { fetchShoppingList } from '../../gateway/rest/fetchShoppingList'
import { ListContext } from '../../hooks/useListContext'
import { MissingList } from '../../components/MissingList'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Detail = ({ data }: any) => {
  const { t } = useTranslation('list')
  if (!data || !JSON.parse(data)) {
    return (
      <div style={{ minHeight: 'calc(100vh - 60px)' }}>
        <Head>
          <title>{t('no-list-title')}</title>
        </Head>
        <MissingList />
      </div>
    )
  }

  const title = JSON.parse(data).description

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)' }}>
      <Head>
        <title>PartyCarty | {title || 'Clever Shopping List'}</title>
      </Head>
      <ListContext.Provider value={JSON.parse(data)}>
        <List />
      </ListContext.Provider>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { id }: any = context.params
  const data = await fetchShoppingList(id)

  // Pass data to the page via props
  return {
    props: {
      data: JSON.stringify(data.body),
      ...(await serverSideTranslations(context.locale, ['common', 'list'])),
    },
  }
}

export default Detail
