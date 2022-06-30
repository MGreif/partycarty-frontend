import Head from 'next/head'
import { useRouter } from 'next/router'
import List from '../../components/List'
import { fetchShoppingList } from '../../gateway/rest/fetchShoppingList'
import { ListContext } from '../../hooks/useListContext'

const Detail = ({ data }: any) => {
  const router = useRouter()
  const { id }: any = router.query

  if (!id) return null

  return (
    <div
      style={{ minHeight: 'calc(100vh - 60px)', backgroundColor: '#E3E3E3' }}
    >
      <Head>
        <title>PartyCarty | {JSON.parse(data).description}</title>
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
  return { props: { data: JSON.stringify(data.body) } }
}

export default Detail
